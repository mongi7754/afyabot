import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, FileText, User, Calendar, Stethoscope, Pill, TestTube, Syringe, Eye, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';

interface HealthRecord {
  id: string;
  record_type: string;
  title: string;
  description: string | null;
  doctor_name: string | null;
  clinic_name: string | null;
  date_recorded: string;
  created_at: string;
}

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
}

const PatientPortal = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [recordForm, setRecordForm] = useState({
    record_type: '',
    title: '',
    description: '',
    doctor_name: '',
    clinic_name: '',
    date_recorded: new Date().toISOString().split('T')[0]
  });
  const { toast } = useToast();

  const recordTypeIcons: Record<string, any> = {
    diagnosis: Stethoscope,
    medication: Pill,
    lab_result: TestTube,
    vaccination: Syringe,
    visit: Calendar,
    allergy: AlertCircle
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchHealthRecords();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user!.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setProfile(data);
    }
  };

  const fetchHealthRecords = async () => {
    const { data, error } = await supabase
      .from('health_records')
      .select('*')
      .eq('user_id', user!.id)
      .order('date_recorded', { ascending: false });

    if (error) {
      toast({
        title: "Error loading health records",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setHealthRecords(data || []);
    }
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('health_records')
      .insert([{
        ...recordForm,
        user_id: user!.id
      }]);

    if (error) {
      toast({
        title: "Error adding record",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Record added successfully",
        description: "Your health record has been saved."
      });
      setIsAddingRecord(false);
      setRecordForm({
        record_type: '',
        title: '',
        description: '',
        doctor_name: '',
        clinic_name: '',
        date_recorded: new Date().toISOString().split('T')[0]
      });
      fetchHealthRecords();
    }
  };

  const updateProfile = async (updatedData: Partial<Profile>) => {
    const { error } = await supabase
      .from('profiles')
      .update(updatedData)
      .eq('id', user!.id);

    if (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
      fetchProfile();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your health portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Patient Portal</h1>
          <p className="text-muted-foreground">Manage your health records and profile</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="records">Health Records</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthRecords.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Records</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {healthRecords.filter(record => 
                      new Date(record.date_recorded) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    ).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {profile?.phone && profile?.date_of_birth ? 'Complete' : 'Incomplete'}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Health Records</CardTitle>
              </CardHeader>
              <CardContent>
                {healthRecords.slice(0, 5).map((record) => {
                  const Icon = recordTypeIcons[record.record_type];
                  return (
                    <div key={record.id} className="flex items-center space-x-4 py-3 border-b last:border-b-0">
                      <Icon className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{record.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(record.date_recorded).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {record.record_type.replace('_', ' ')}
                      </Badge>
                    </div>
                  );
                })}
                {healthRecords.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No health records found. Add your first record to get started.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Health Records</h2>
              <Button onClick={() => setIsAddingRecord(!isAddingRecord)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Record
              </Button>
            </div>

            {isAddingRecord && (
              <Card>
                <CardHeader>
                  <CardTitle>Add Health Record</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddRecord} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="record_type">Record Type</Label>
                        <Select 
                          value={recordForm.record_type} 
                          onValueChange={(value) => setRecordForm(prev => ({ ...prev, record_type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select record type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diagnosis">Diagnosis</SelectItem>
                            <SelectItem value="medication">Medication</SelectItem>
                            <SelectItem value="lab_result">Lab Result</SelectItem>
                            <SelectItem value="vaccination">Vaccination</SelectItem>
                            <SelectItem value="visit">Visit</SelectItem>
                            <SelectItem value="allergy">Allergy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="date_recorded">Date</Label>
                        <Input
                          type="date"
                          value={recordForm.date_recorded}
                          onChange={(e) => setRecordForm(prev => ({ ...prev, date_recorded: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        placeholder="Enter record title"
                        value={recordForm.title}
                        onChange={(e) => setRecordForm(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        placeholder="Enter record description"
                        value={recordForm.description}
                        onChange={(e) => setRecordForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="doctor_name">Doctor Name</Label>
                        <Input
                          placeholder="Enter doctor's name"
                          value={recordForm.doctor_name}
                          onChange={(e) => setRecordForm(prev => ({ ...prev, doctor_name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="clinic_name">Clinic Name</Label>
                        <Input
                          placeholder="Enter clinic name"
                          value={recordForm.clinic_name}
                          onChange={(e) => setRecordForm(prev => ({ ...prev, clinic_name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Save Record</Button>
                      <Button type="button" variant="outline" onClick={() => setIsAddingRecord(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {healthRecords.map((record) => {
                const Icon = recordTypeIcons[record.record_type];
                return (
                  <Card key={record.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{record.title}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {record.record_type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardDescription>
                        {new Date(record.date_recorded).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    {(record.description || record.doctor_name || record.clinic_name) && (
                      <CardContent>
                        {record.description && (
                          <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                        )}
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          {record.doctor_name && <span>Dr. {record.doctor_name}</span>}
                          {record.clinic_name && <span>{record.clinic_name}</span>}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile?.full_name || ''}
                      onChange={(e) => setProfile(prev => prev ? { ...prev, full_name: e.target.value } : null)}
                      onBlur={(e) => updateProfile({ full_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile?.email || ''}
                      disabled
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile?.phone || ''}
                      onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                      onBlur={(e) => updateProfile({ phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={profile?.date_of_birth || ''}
                      onChange={(e) => setProfile(prev => prev ? { ...prev, date_of_birth: e.target.value } : null)}
                      onBlur={(e) => updateProfile({ date_of_birth: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={profile?.gender || ''} 
                    onValueChange={(value) => {
                      setProfile(prev => prev ? { ...prev, gender: value } : null);
                      updateProfile({ gender: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>Person to contact in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                  <Input
                    id="emergency_contact_name"
                    value={profile?.emergency_contact_name || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, emergency_contact_name: e.target.value } : null)}
                    onBlur={(e) => updateProfile({ emergency_contact_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                  <Input
                    id="emergency_contact_phone"
                    value={profile?.emergency_contact_phone || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, emergency_contact_phone: e.target.value } : null)}
                    onBlur={(e) => updateProfile({ emergency_contact_phone: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PatientPortal;