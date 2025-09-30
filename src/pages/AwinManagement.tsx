import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ImportLog {
  id: string;
  started_at: string;
  completed_at: string | null;
  status: string;
  products_imported: number;
  products_updated: number;
  products_failed: number;
  category_filter: string | null;
  advertiser_filter: string | null;
}

export default function AwinManagement() {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [advertiserId, setAdvertiserId] = useState("");
  const [limit, setLimit] = useState("1000");
  const [importLogs, setImportLogs] = useState<ImportLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      loadImportLogs();
    }
  }, [isAdmin]);

  const loadImportLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const { data, error } = await supabase
        .from('awin_import_logs')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setImportLogs(data || []);
    } catch (error: any) {
      console.error('Error loading logs:', error);
      toast({
        title: "Error",
        description: "Failed to load import logs",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const handleImport = async () => {
    if (!advertiserId.trim()) {
      toast({
        title: "Missing Advertiser ID",
        description: "Please enter an Advertiser ID to import products",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    try {
      const { data, error } = await supabase.functions.invoke('awin-import-products', {
        body: {
          categoryId: categoryId.trim() || null,
          advertiserId: advertiserId.trim(),
          limit: parseInt(limit) || 1000,
        },
      });

      if (error) {
        const errorMsg = data?.error || error.message;
        const errorDetails = data?.details || '';
        throw new Error(`${errorMsg}${errorDetails ? '\n\n' + errorDetails : ''}`);
      }

      toast({
        title: "Import Completed",
        description: `Imported: ${data.productsImported}, Updated: ${data.productsUpdated}, Failed: ${data.productsFailed}`,
      });

      setCategoryId("");
      setAdvertiserId("");
      setLimit("1000");
      await loadImportLogs();
    } catch (error: any) {
      console.error('Import error:', error);
      const errorMessage = error.message || "Failed to import products from Awin";
      toast({
        title: "Import Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need admin privileges to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Awin Product Management</h1>
        <p className="text-muted-foreground">Automated product imports from Awin affiliate network</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Automated Product Import
          </CardTitle>
          <CardDescription>
            Automatically fetch and import products from Awin advertisers using their API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
            <p className="font-medium">How it works:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Connects directly to Awin's Product Feed API</li>
              <li>Fetches up to 1000 products per import from the specified advertiser</li>
              <li>Automatically updates existing products or adds new ones</li>
              <li>Supports both Enhanced Feed and standard Product Data APIs</li>
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="advertiserId">
                Advertiser ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="advertiserId"
                placeholder="e.g., 5678"
                value={advertiserId}
                onChange={(e) => setAdvertiserId(e.target.value)}
                disabled={isImporting}
                required
              />
              <p className="text-xs text-muted-foreground">
                Find in Awin dashboard under "My Programmes"
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category ID (Optional)</Label>
              <Input
                id="categoryId"
                placeholder="e.g., 1234"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={isImporting}
              />
              <p className="text-xs text-muted-foreground">
                Filter by Awin category
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="limit">Product Limit</Label>
              <Input
                id="limit"
                type="number"
                placeholder="1000"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                disabled={isImporting}
              />
              <p className="text-xs text-muted-foreground">
                Max products per import
              </p>
            </div>
          </div>

          <Button 
            onClick={handleImport} 
            disabled={isImporting || !advertiserId}
            className="w-full md:w-auto"
          >
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing Products...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Start Automated Import
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Import History</CardTitle>
              <CardDescription>Recent product import operations</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadImportLogs}
              disabled={isLoadingLogs}
            >
              <RefreshCw className={`h-4 w-4 ${isLoadingLogs ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingLogs ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : importLogs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No import history yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Started</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Imported</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Failed</TableHead>
                  <TableHead>Filters</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {new Date(log.started_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === 'completed' ? 'default' :
                          log.status === 'running' ? 'secondary' :
                          'destructive'
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.products_imported}</TableCell>
                    <TableCell>{log.products_updated}</TableCell>
                    <TableCell>{log.products_failed}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {log.category_filter && `Cat: ${log.category_filter}`}
                      {log.category_filter && log.advertiser_filter && ', '}
                      {log.advertiser_filter && `Adv: ${log.advertiser_filter}`}
                      {!log.category_filter && !log.advertiser_filter && 'All'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
