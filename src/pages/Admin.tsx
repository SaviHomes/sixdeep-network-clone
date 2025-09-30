import { useAdmin } from '@/hooks/useAdmin';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Database, Mail } from 'lucide-react';
import UserManagement from '@/components/UserManagement';

const Admin = () => {
  const { isLoading } = useAdmin();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          </div>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>Backend Access</CardTitle>
              </div>
              <CardDescription>
                Securely manage your application's backend, database, and infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  As an administrator, you have secure access to view and manage the backend systems, including:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
                  <li>Database tables and records</li>
                  <li>User authentication and profiles</li>
                  <li>Storage buckets and files</li>
                  <li>Backend functions and logs</li>
                  <li>Security policies and settings</li>
                </ul>
                <div className="pt-2">
                  <p className="text-sm font-medium text-foreground">
                    To access the backend dashboard, use the "View Backend" button in the Lovable editor sidebar.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <UserManagement />

          <Card className="mt-6 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Email Template System</CardTitle>
              </div>
              <CardDescription>
                Manage automated email templates and event-based triggers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Configure and manage email templates that are automatically sent based on system events like user signups, bio link creation, and commission earnings.
                </p>
                <Button onClick={() => navigate('/admin/email-templates')} className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Manage Email Templates
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Overview of your administrative privileges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium text-foreground">Administrator</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Access Level:</span>
                  <span className="font-medium text-foreground">Full Access</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Backend Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
