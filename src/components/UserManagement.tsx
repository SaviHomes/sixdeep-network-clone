import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2 } from 'lucide-react';
import UsersTable from './UsersTable';
import AdvertisersTable from './AdvertisersTable';

const UserManagement = () => {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>User Management</CardTitle>
        </div>
        <CardDescription>
          Manage users, affiliates, and advertisers in your platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users & Affiliates
            </TabsTrigger>
            <TabsTrigger value="advertisers" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Advertisers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-6">
            <UsersTable />
          </TabsContent>
          
          <TabsContent value="advertisers" className="mt-6">
            <AdvertisersTable />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserManagement;