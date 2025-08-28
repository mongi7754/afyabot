import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Star, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import GoogleMap from './GoogleMap';

interface Clinic {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  services?: string[];
  rating?: number;
  google_place_id?: string;
  operating_hours?: any;
  created_at: string;
  updated_at: string;
}

const ClinicLocator = () => {
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const { data, error } = await supabase
        .from('clinics')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      setClinics(data || []);
      setFilteredClinics(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading clinics",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    if (!location.trim()) {
      setFilteredClinics(clinics);
      setIsSearching(false);
      return;
    }

    // Simple search by name, address, or services
    const filtered = clinics.filter(clinic => 
      clinic.name.toLowerCase().includes(location.toLowerCase()) ||
      clinic.address.toLowerCase().includes(location.toLowerCase()) ||
      clinic.services?.some(service => 
        service.toLowerCase().includes(location.toLowerCase())
      )
    );

    setFilteredClinics(filtered);
    setIsSearching(false);

    if (filtered.length === 0) {
      toast({
        title: "No clinics found",
        description: "Try searching with different keywords or location.",
      });
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in kilometers
    return d.toFixed(1) + ' km';
  };

  return (
    <section id="clinics" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Find Nearby Healthcare</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Locate hospitals, clinics, and pharmacies near you with real-time availability and pricing
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <div className="mb-8">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your location or search for specific services..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="sm:w-auto w-full"
                >
                  {isSearching ? (
                    <>
                      <Search className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search Clinics
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Google Map */}
          <div className="mb-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Clinic Locations</h3>
              <GoogleMap 
                clinics={filteredClinics} 
                onSelectClinic={setSelectedClinic}
              />
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClinics.length > 0 ? (
              filteredClinics.map((clinic) => (
                <Card 
                  key={clinic.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    selectedClinic?.id === clinic.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedClinic(clinic)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{clinic.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {clinic.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{clinic.rating || 'N/A'}</span>
                      </div>
                      {navigator.geolocation && (
                        <Badge variant="secondary">
                          {calculateDistance(-1.2921, 36.8219, clinic.latitude, clinic.longitude)}
                        </Badge>
                      )}
                    </div>
                    
                    {clinic.services && clinic.services.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Services Available:</h4>
                        <div className="flex flex-wrap gap-1">
                          {clinic.services.slice(0, 4).map((service: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {clinic.services.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{clinic.services.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      {clinic.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{clinic.phone}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button className="w-full mt-4">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  {clinics.length === 0 ? 'Loading clinics...' : 'No clinics found'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {clinics.length === 0 
                    ? 'Please wait while we load nearby healthcare facilities'
                    : 'Try searching with different keywords or location'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicLocator;