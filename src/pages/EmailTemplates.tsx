import { useState, useEffect } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Plus, Eye, Edit, Trash2, Send, FileText, Activity } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string | null;
  category: string;
  status: string;
  created_at: string;
}

interface EmailEvent {
  id: string;
  event_name: string;
  event_description: string | null;
  available_variables: any;
  is_active: boolean;
}

interface EmailLog {
  id: string;
  template_id: string | null;
  recipient_email: string;
  subject: string;
  status: string;
  sent_at: string;
  email_templates?: { name: string } | null;
}

const EmailTemplates = () => {
  const { isLoading } = useAdmin();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [events, setEvents] = useState<EmailEvent[]>([]);
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [isEditorDialogOpen, setIsEditorDialogOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [status, setStatus] = useState('draft');
  const [htmlContent, setHtmlContent] = useState('');
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    if (!isLoading) {
      loadTemplates();
      loadEvents();
      loadLogs();
    }
  }, [isLoading]);

  const loadTemplates = async () => {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error loading templates', description: error.message, variant: 'destructive' });
    } else {
      setTemplates(data || []);
    }
  };

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('email_events')
      .select('*')
      .order('event_name');

    if (error) {
      toast({ title: 'Error loading events', description: error.message, variant: 'destructive' });
    } else {
      setEvents(data || []);
    }
  };

  const loadLogs = async () => {
    const { data, error } = await supabase
      .from('email_logs')
      .select('*, email_templates(name)')
      .order('sent_at', { ascending: false })
      .limit(50);

    if (error) {
      toast({ title: 'Error loading logs', description: error.message, variant: 'destructive' });
    } else {
      setLogs(data || []);
    }
  };

  const resetForm = () => {
    setName('');
    setSubject('');
    setDescription('');
    setCategory('general');
    setStatus('draft');
    setHtmlContent('');
    setTextContent('');
    setEditingTemplate(null);
  };

  const handleCreateTemplate = async () => {
    if (!name || !subject) {
      toast({ title: 'Error', description: 'Name and subject are required', variant: 'destructive' });
      return;
    }

    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .insert({ name, subject, description, category, status })
      .select()
      .single();

    if (templateError) {
      toast({ title: 'Error creating template', description: templateError.message, variant: 'destructive' });
      return;
    }

    const { error: contentError } = await supabase
      .from('email_template_content')
      .insert({
        template_id: template.id,
        html_content: htmlContent || '<p>Default template content</p>',
        text_content: textContent,
        version: 1,
        is_current: true
      });

    if (contentError) {
      toast({ title: 'Error creating template content', description: contentError.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Email template created successfully' });
      setIsCreateDialogOpen(false);
      resetForm();
      loadTemplates();
    }
  };

  const handleUpdateTemplate = async () => {
    if (!editingTemplate || !name || !subject) {
      toast({ title: 'Error', description: 'Name and subject are required', variant: 'destructive' });
      return;
    }

    const { error: templateError } = await supabase
      .from('email_templates')
      .update({ name, subject, description, category, status })
      .eq('id', editingTemplate.id);

    if (templateError) {
      toast({ title: 'Error updating template', description: templateError.message, variant: 'destructive' });
      return;
    }

    const { data: currentContent } = await supabase
      .from('email_template_content')
      .select('version')
      .eq('template_id', editingTemplate.id)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    await supabase
      .from('email_template_content')
      .update({ is_current: false })
      .eq('template_id', editingTemplate.id);

    const { error: contentError } = await supabase
      .from('email_template_content')
      .insert({
        template_id: editingTemplate.id,
        html_content: htmlContent || '<p>Default template content</p>',
        text_content: textContent,
        version: (currentContent?.version || 0) + 1,
        is_current: true
      });

    if (contentError) {
      toast({ title: 'Error updating template content', description: contentError.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Email template updated successfully' });
      setIsEditorDialogOpen(false);
      resetForm();
      loadTemplates();
    }
  };

  const handleEditTemplate = async (template: EmailTemplate) => {
    setEditingTemplate(template);
    setName(template.name);
    setSubject(template.subject);
    setDescription(template.description || '');
    setCategory(template.category);
    setStatus(template.status);

    const { data: content } = await supabase
      .from('email_template_content')
      .select('*')
      .eq('template_id', template.id)
      .eq('is_current', true)
      .single();

    if (content) {
      setHtmlContent(content.html_content);
      setTextContent(content.text_content || '');
    }

    setIsEditorDialogOpen(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    const { error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', templateId);

    if (error) {
      toast({ title: 'Error deleting template', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Email template deleted successfully' });
      loadTemplates();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Email Templates</h1>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Email Template</DialogTitle>
                  <DialogDescription>Create a new email template for automated emails</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Template Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Welcome Email" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Welcome to our platform!" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the template" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="transactional">Transactional</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="notification">Notification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="htmlContent">HTML Content</Label>
                    <Textarea 
                      id="htmlContent" 
                      value={htmlContent} 
                      onChange={(e) => setHtmlContent(e.target.value)} 
                      placeholder="<html>...</html>"
                      rows={8}
                    />
                  </div>
                  <div>
                    <Label htmlFor="textContent">Plain Text Content (Optional)</Label>
                    <Textarea 
                      id="textContent" 
                      value={textContent} 
                      onChange={(e) => setTextContent(e.target.value)} 
                      placeholder="Plain text version"
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleCreateTemplate} className="w-full">Create Template</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="events">
                <Send className="h-4 w-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="logs">
                <Activity className="h-4 w-4 mr-2" />
                Email Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              {templates.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No email templates yet. Create your first template!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {templates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CardTitle>{template.name}</CardTitle>
                            <Badge className={getStatusColor(template.status)}>{template.status}</Badge>
                            <Badge variant="outline">{template.category}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(template)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardDescription>{template.subject}</CardDescription>
                      </CardHeader>
                      {template.description && (
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="grid gap-4">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{event.event_name}</CardTitle>
                        <Badge variant={event.is_active ? 'default' : 'secondary'}>
                          {event.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <CardDescription>{event.event_description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <p className="text-sm font-medium mb-2">Available Variables:</p>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(event.available_variables) ? event.available_variables : []).map((variable: string) => (
                            <Badge key={variable} variant="outline">{`{{${variable}}}`}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              {logs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No email logs yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {logs.map((log) => (
                    <Card key={log.id}>
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{log.subject}</p>
                            <p className="text-sm text-muted-foreground">To: {log.recipient_email}</p>
                            {log.email_templates && (
                              <p className="text-sm text-muted-foreground">Template: {log.email_templates.name}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(log.sent_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Dialog open={isEditorDialogOpen} onOpenChange={setIsEditorDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
            <DialogDescription>Update your email template</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Template Name</Label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="edit-subject">Email Subject</Label>
              <Input id="edit-subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-htmlContent">HTML Content</Label>
              <Textarea 
                id="edit-htmlContent" 
                value={htmlContent} 
                onChange={(e) => setHtmlContent(e.target.value)} 
                rows={8}
              />
            </div>
            <div>
              <Label htmlFor="edit-textContent">Plain Text Content (Optional)</Label>
              <Textarea 
                id="edit-textContent" 
                value={textContent} 
                onChange={(e) => setTextContent(e.target.value)} 
                rows={4}
              />
            </div>
            <Button onClick={handleUpdateTemplate} className="w-full">Update Template</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailTemplates;