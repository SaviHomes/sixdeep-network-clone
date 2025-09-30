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
  merchant_image_url?: string;
  merchant_product_id?: string;
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
  id?: string;
  gtin?: string;
  mpn?: string;
  data_feed_id?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  let importLog: any = null;
  let supabase: any = null;

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const awinApiToken = Deno.env.get('AWIN_API_TOKEN')!;
    const awinPublisherId = Deno.env.get('AWIN_PUBLISHER_ID')!;

    supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { categoryId, advertiserId, limit = 1000 } = await req.json();

    if (!advertiserId) {
      throw new Error('Advertiser ID is required');
    }

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
    const { data: logData, error: logError } = await supabase
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
    importLog = logData;

    console.log('Starting Awin product import', { importLogId: importLog.id });

    let products: AwinProduct[] = [];

    // Try Enhanced Feed API first (Google Shopping format)
    console.log(`Attempting Enhanced Feed API for advertiser ${advertiserId}...`);
    let apiUrl = `https://api.awin.com/publishers/${awinPublisherId}/enhanced-feeds/${advertiserId}`;
    
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${awinApiToken}`,
          'Accept': 'application/json',
        },
      });

      console.log(`Enhanced Feed API response: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        products = Array.isArray(data) ? data : (data.products || data.items || []);
        console.log(`Successfully fetched ${products.length} products from Enhanced Feed API`);
      } else if (response.status === 404 || response.status === 403) {
        // Enhanced feed not available, try Product Data API
        console.log('Enhanced Feed not available, trying Product Data API...');
        
        apiUrl = `https://api.awin.com/publishers/${awinPublisherId}/productdata`;
        const params = new URLSearchParams({
          advertiserId: advertiserId,
          limit: limit.toString(),
        });
        
        if (categoryId) {
          params.append('categoryId', categoryId);
        }

        const fallbackResponse = await fetch(`${apiUrl}?${params}`, {
          headers: {
            'Authorization': `Bearer ${awinApiToken}`,
            'Accept': 'application/json',
          },
        });

        console.log(`Product Data API response: ${fallbackResponse.status}`);

        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          products = Array.isArray(fallbackData) ? fallbackData : (fallbackData.products || fallbackData.items || []);
          console.log(`Successfully fetched ${products.length} products from Product Data API`);
        } else {
          const errorText = await fallbackResponse.text();
          console.error('Product Data API error:', errorText);
          throw new Error(
            `Unable to fetch products from Awin API (status ${fallbackResponse.status}). ` +
            `Please verify:\n` +
            `1. Advertiser ID ${advertiserId} is correct\n` +
            `2. You have access to this advertiser program\n` +
            `3. Your API credentials are valid\n\n` +
            `Error: ${errorText}`
          );
        }
      } else {
        const errorText = await response.text();
        console.error('Enhanced Feed API error:', errorText);
        throw new Error(
          `Awin API returned status ${response.status}. ` +
          `Please check your API credentials and advertiser access. ` +
          `Error: ${errorText}`
        );
      }
    } catch (error) {
      console.error('Error fetching from Awin API:', error);
      throw error;
    }

    // Apply limit if needed
    if (limit && products.length > limit) {
      products = products.slice(0, limit);
      console.log(`Limited products to ${limit}`);
    }

    if (products.length === 0) {
      console.log('No products found');
      throw new Error(
        `No products found for advertiser ${advertiserId}. ` +
        `This could mean:\n` +
        `1. The advertiser has no products in their feed\n` +
        `2. The advertiser ID is incorrect\n` +
        `3. You don't have access to this advertiser's program`
      );
    }

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
          .eq('awin_product_id', product.product_id || product.id)
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

    // Update import log with success
    await supabase
      .from('awin_import_logs')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        products_imported: imported,
        products_updated: updated,
        products_failed: failed,
        error_message: null,
      })
      .eq('id', importLog.id);

    console.log('Import completed successfully', { 
      imported, 
      updated, 
      failed, 
      total: products.length
    });

    return new Response(
      JSON.stringify({
        success: true,
        productsImported: imported,
        productsUpdated: updated,
        productsFailed: failed,
        total: products.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Import error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Update import log with failure if it exists
    try {
      if (importLog?.id && supabase) {
        await supabase
          .from('awin_import_logs')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            error_message: errorMessage,
          })
          .eq('id', importLog.id);
      }
    } catch (logError) {
      console.error('Failed to update error log:', logError);
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Check the edge function logs for more information.'
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
