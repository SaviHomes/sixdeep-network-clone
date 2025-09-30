import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AwinProduct {
  product_id: string;
  product_name: string;
  description: string;
  merchant_id: string;
  merchant_name: string;
  category_id: string;
  category_name: string;
  aw_deep_link: string;
  aw_image_url: string;
  search_price: string;
  currency: string;
  in_stock: string;
  stock_quantity: string;
  advertiser_id: string;
  advertiser_name: string;
  merchant_product_id: string;
  data_feed_id: string;
  commission_group: {
    group_id: string;
    group_name: string;
    group_code: string;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const awinApiToken = Deno.env.get('AWIN_API_TOKEN')!;
    const awinPublisherId = Deno.env.get('AWIN_PUBLISHER_ID')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { 
      categoryId, 
      advertiserId, 
      limit = 100 
    } = await req.json();

    // Get auth user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Verify user is admin
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roles) {
      throw new Error('Unauthorized: Admin access required');
    }

    // Create import log
    const { data: importLog, error: logError } = await supabase
      .from('awin_import_logs')
      .insert({
        status: 'running',
        category_filter: categoryId,
        advertiser_filter: advertiserId,
        created_by: user.id,
      })
      .select()
      .single();

    if (logError) throw logError;

    console.log('Starting Awin product import', { importLogId: importLog.id });

    // Build Awin API URL
    let awinUrl = `https://productdata.awin.com/datafeed/download/apikey/${awinApiToken}/language/en/fid/`;
    
    // Add filters
    const params = new URLSearchParams();
    if (categoryId) params.append('category', categoryId);
    if (advertiserId) params.append('merchant', advertiserId);
    params.append('columns', 'product_id,product_name,description,merchant_id,merchant_name,category_id,category_name,aw_deep_link,aw_image_url,search_price,currency,in_stock,stock_quantity,advertiser_id,advertiser_name,merchant_product_id,data_feed_id');
    params.append('format', 'json');
    params.append('limit', limit.toString());

    const fullUrl = `${awinUrl}?${params.toString()}`;

    // Fetch products from Awin
    const awinResponse = await fetch(fullUrl, {
      headers: {
        'Authorization': `Bearer ${awinApiToken}`,
      },
    });

    if (!awinResponse.ok) {
      throw new Error(`Awin API error: ${awinResponse.status} ${awinResponse.statusText}`);
    }

    const awinData = await awinResponse.json();
    const products: AwinProduct[] = awinData.products || [];

    console.log(`Fetched ${products.length} products from Awin`);

    let imported = 0;
    let updated = 0;
    let failed = 0;

    // Process products
    for (const product of products) {
      try {
        // Check if product already exists
        const { data: existing } = await supabase
          .from('products')
          .select('id')
          .eq('awin_product_id', product.product_id)
          .maybeSingle();

        const productData = {
          name: product.product_name,
          description: product.description,
          price: parseFloat(product.search_price) || 0,
          affiliate_link: product.aw_deep_link,
          image_url: product.aw_image_url,
          awin_product_id: product.product_id,
          awin_advertiser_id: product.advertiser_id,
          awin_advertiser_name: product.advertiser_name,
          merchant_product_id: product.merchant_product_id,
          aw_deep_link: product.aw_deep_link,
          aw_image_url: product.aw_image_url,
          search_price: parseFloat(product.search_price) || 0,
          merchant_name: product.merchant_name,
          merchant_id: product.merchant_id,
          currency: product.currency,
          in_stock: product.in_stock === '1' || product.in_stock === 'true',
          stock_quantity: parseInt(product.stock_quantity) || 0,
          last_synced_at: new Date().toISOString(),
          data_feed_id: product.data_feed_id,
          is_active: true,
        };

        if (existing) {
          // Update existing product
          const { error: updateError } = await supabase
            .from('products')
            .update(productData)
            .eq('id', existing.id);

          if (updateError) {
            console.error('Update error:', updateError);
            failed++;
          } else {
            updated++;
          }
        } else {
          // Insert new product
          const { error: insertError } = await supabase
            .from('products')
            .insert(productData);

          if (insertError) {
            console.error('Insert error:', insertError);
            failed++;
          } else {
            imported++;
          }
        }
      } catch (error) {
        console.error('Product processing error:', error);
        failed++;
      }
    }

    // Update import log
    await supabase
      .from('awin_import_logs')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        products_imported: imported,
        products_updated: updated,
        products_failed: failed,
      })
      .eq('id', importLog.id);

    console.log('Import completed', { imported, updated, failed });

    return new Response(
      JSON.stringify({
        success: true,
        imported,
        updated,
        failed,
        total: products.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Import error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
