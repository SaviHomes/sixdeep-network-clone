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

  let importLog: any = null;
  let supabase: any = null;

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const awinApiToken = Deno.env.get('AWIN_API_TOKEN')!;
    const awinPublisherId = Deno.env.get('AWIN_PUBLISHER_ID')!;

    supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    // Validate required parameters
    if (!advertiserId) {
      throw new Error('Advertiser ID is required for Awin product import');
    }

    // Build Awin API URL - correct format from Awin documentation
    // https://api.awin.com/publishers/{PUBLISHER_ID}/awinfeeds/download/{ADVERTISER_ID}-{VERTICAL}-{LOCALE}
    const vertical = 'retail';
    const locale = 'en_GB';
    
    // Try multiple format variations to find available feed
    const formats = ['.jsonl', '.json', '.csv', ''];
    let awinResponse: Response | null = null;
    let successfulFormat = '';
    let lastError = '';

    console.log(`Attempting to fetch feed for advertiser ${advertiserId}...`);

    // Try each format until one works
    for (const format of formats) {
      const awinUrl = `https://api.awin.com/publishers/${awinPublisherId}/awinfeeds/download/${advertiserId}-${vertical}-${locale}${format}`;
      
      console.log(`Trying format: ${format || 'no extension'} - URL: ${awinUrl}`);
      
      try {
        const response = await fetch(awinUrl, {
          headers: {
            'Authorization': `Bearer ${awinApiToken}`,
          },
        });

        if (response.ok) {
          awinResponse = response;
          successfulFormat = format;
          console.log(`Success! Feed found with format: ${format || 'no extension'}`);
          break;
        } else {
          const errorText = await response.text();
          lastError = `${response.status} ${response.statusText} - ${errorText}`;
          console.log(`Format ${format || 'no extension'} failed: ${lastError}`);
        }
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error';
        console.log(`Format ${format || 'no extension'} failed with exception: ${lastError}`);
      }
    }

    if (!awinResponse || !awinResponse.ok) {
      console.error('All format attempts failed. Last error:', lastError);
      throw new Error(`Unable to fetch feed for advertiser ${advertiserId}. Please verify:\n1. Advertiser ID is correct\n2. You have access to this advertiser's program\n3. The advertiser has an active product feed\n\nLast error: ${lastError}`);
    }

    // Parse response based on format
    const responseText = await awinResponse.text();
    let products: AwinProduct[] = [];

    if (successfulFormat === '.jsonl' || successfulFormat === '') {
      // Parse JSONL format (JSON Lines - one JSON object per line)
      const lines = responseText.trim().split('\n');
      products = lines
        .filter(line => line.trim())
        .map(line => {
          try {
            return JSON.parse(line);
          } catch (e) {
            console.error('Failed to parse line:', line);
            return null;
          }
        })
        .filter(p => p !== null)
        .slice(0, limit);
    } else if (successfulFormat === '.json') {
      // Parse standard JSON array
      try {
        const jsonData = JSON.parse(responseText);
        products = (Array.isArray(jsonData) ? jsonData : jsonData.products || []).slice(0, limit);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('Invalid JSON format in response');
      }
    } else if (successfulFormat === '.csv') {
      throw new Error('CSV format is not yet supported. Please contact support to enable CSV parsing.');
    }

    console.log(`Successfully parsed ${products.length} products from Awin feed (format: ${successfulFormat})`);

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

    // Update import log with success
    const logUpdate = {
      status: 'completed',
      completed_at: new Date().toISOString(),
      products_imported: imported,
      products_updated: updated,
      products_failed: failed,
      error_message: null,
    };

    await supabase
      .from('awin_import_logs')
      .update(logUpdate)
      .eq('id', importLog.id);

    console.log('Import completed successfully', { 
      imported, 
      updated, 
      failed, 
      total: products.length,
      format: successfulFormat 
    });

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
    
    // Update import log with failure if it exists
    try {
      if (importLog?.id) {
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
        details: 'Check the logs for more information. Ensure your API credentials are correct and you have access to the advertiser program.'
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
