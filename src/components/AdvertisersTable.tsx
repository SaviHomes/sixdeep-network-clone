import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Building2, Globe, Phone } from 'lucide-react';

interface AdvertiserWithProfile {
  id: string;
  company_name: string;
  first_name: string;
  last_name: string;
  email: string;
  website: string | null;
  contact_number: string;
  position: string;
  created_at: string;
  username: string | null;
}

const AdvertisersTable = () => {
  const [advertisers, setAdvertisers] = useState<AdvertiserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalAdvertisers: 0,
    withWebsite: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    fetchAdvertisers();
  }, []);

  const fetchAdvertisers = async () => {
    try {
      // Fetch advertisers
      const { data: advertisers, error: advertisersError } = await supabase
        .from('advertisers')
        .select(`
          id,
          company_name,
          first_name,
          last_name,
          email,
          website,
          contact_number,
          position,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (advertisersError) throw advertisersError;

      // Fetch profiles separately
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username');

      if (profilesError) throw profilesError;

      const advertisersWithProfile = advertisers?.map(advertiser => ({
        ...advertiser,
        username: profiles?.find(profile => profile.id === advertiser.user_id)?.username || null,
      })) || [];

      setAdvertisers(advertisersWithProfile);
      
      // Calculate stats
      const totalAdvertisers = advertisersWithProfile.length;
      const withWebsite = advertisersWithProfile.filter(adv => adv.website).length;
      
      // Count advertisers registered this month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonth = advertisersWithProfile.filter(adv => {
        const created = new Date(adv.created_at);
        return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
      }).length;
      
      setStats({ totalAdvertisers, withWebsite, thisMonth });
    } catch (error) {
      console.error('Error fetching advertisers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdvertisers = advertisers.filter(advertiser =>
    advertiser.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advertiser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${advertiser.first_name} ${advertiser.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (advertiser.username && advertiser.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Advertisers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalAdvertisers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>With Website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.withWebsite}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.thisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search advertisers by company, name, email, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Advertisers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Registered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdvertisers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No advertisers found
                </TableCell>
              </TableRow>
            ) : (
              filteredAdvertisers.map((advertiser) => (
                <TableRow key={advertiser.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {advertiser.company_name}
                    </div>
                  </TableCell>
                  <TableCell>{`${advertiser.first_name} ${advertiser.last_name}`}</TableCell>
                  <TableCell>{advertiser.email}</TableCell>
                  <TableCell>{advertiser.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {advertiser.contact_number}
                    </div>
                  </TableCell>
                  <TableCell>
                    {advertiser.website ? (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={advertiser.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Visit
                        </a>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {advertiser.username ? (
                      <Badge variant="outline">{advertiser.username}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(advertiser.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdvertisersTable;