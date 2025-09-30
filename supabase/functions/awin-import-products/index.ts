import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AwinProduct {
  product_id?: string;
  product_name?: string;
  title?: string;
  description?: string;
  merchant_id?: string;
  merchant_name?: string;
  brand?: string;
  category_id?: string;
  category_name?: string;
  aw_deep_link?: string;
  link?: string;
  aw_image_url?: string;
  image_link?: string;
  search_price?: string;
  price?: string;
  currency?: string;
  in_stock?: string;
  availability?: string;
  stock_quantity?: string;
  advertiser_id?: string;
  advertiser_name?: string;
  merchant_product_id?: string;
  id?: string;
  gtin?: string;
  mpn?: string;
  data_feed_id?: string;
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

    // Validate required parameters
    if (!advertiserId) {
      throw new Error('Advertiser ID is required for Awin product import');
    }

    // Build Awin API URL - correct format from Awin documentation
    // https://api.awin.com/publishers/{PUBLISHER_ID}/awinfeeds/download/{ADVERTISER_ID}-{VERTICAL}-{LOCALE}
    const vertical = 'retail';
    const locale = 'en_GB';
    const awinUrl = `https://api.awin.com/publishers/${awinPublisherId}/awinfeeds/download/${advertiserId}-${vertical}-${locale}.jsonl`;

    console.log('Fetching from Awin API:', awinUrl);

    // Fetch products from Awin using correct Bearer token authentication
    const awinResponse = await fetch(awinUrl, {
      headers: {
        'Authorization': `Bearer ${awinApiToken}`,
      },
    });

    if (!awinResponse.ok) {
      const errorText = await awinResponse.text();
      console.error('Awin API error response:', errorText);
      throw new Error(`Awin API error: ${awinResponse.status} ${awinResponse.statusText} - ${errorText}`);
    }

    // Parse JSONL format (JSON Lines - one JSON object per line)
    const responseText = await awinResponse.text();
    const lines = responseText.trim().split('\n');
    const products: AwinProduct[] = lines
      .filter(line => line.trim())
      .map(line => JSON.parse(line))
      .slice(0, limit); // Apply limit

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

        // Handle both standard and Google format field names
        const productData = {
          name: product.product_name || product.title || 'Unknown Product',
          description: product.description || '',
          price: parseFloat(product.search_price || product.price || '0') || 0,
          affiliate_link: product.aw_deep_link || product.link || '',
          image_url: product.aw_image_url || product.image_link || '',
          awin_product_id: product.product_id || product.id || '',
          awin_advertiser_id: product.advertiser_id || advertiserId,
          awin_advertiser_name: product.advertiser_name || product.brand || '',
          merchant_product_id: product.merchant_product_id || product.id || '',
          aw_deep_link: product.aw_deep_link || product.link || '',
          aw_image_url: product.aw_image_url || product.image_link || '',
          search_price: parseFloat(product.search_price || product.price || '0') || 0,
          merchant_name: product.merchant_name || product.brand || '',
          merchant_id: product.merchant_id || advertiserId,
          currency: product.currency || 'GBP',
          in_stock: product.in_stock === '1' || product.in_stock === 'true' || product.availability === 'in stock',
          stock_quantity: parseInt(product.stock_quantity || '0') || 0,
          last_synced_at: new Date().toISOString(),
          data_feed_id: product.data_feed_id || '',
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
