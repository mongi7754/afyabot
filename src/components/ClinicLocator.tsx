import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, Navigation, Loader2 } from 'lucide-react';

const ClinicLocator = () => {
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [clinics, setClinics] = useState<any[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setClinics([
        {
          id: 1,
          name: 'Nairobi Hospital',
          type: 'Hospital',
          distance: '2.1 km',
          rating: 4.8,
          address: 'Argwings Kodhek Road, Nairobi',
          phone: '+254 20 2845000',
          hours: '24/7',
          services: ['Emergency', 'General Medicine', 'Surgery', 'Maternity'],
          consultationFee: 'KSh 2,500'
        },
        {
          id: 2,
          name: 'Aga Khan University Hospital',
          type: 'Hospital',
          distance: '3.5 km',
          rating: 4.9,
          address: '3rd Parklands Avenue, Nairobi',
          phone: '+254 20 3662000',
          hours: '24/7',
          services: ['Specialist Care', 'Diagnostics', 'Emergency', 'ICU'],
          consultationFee: 'KSh 3,000'
        },
        {
          id: 3,
          name: 'Kenyatta University Hospital',
          type: 'Public Hospital',
          distance: '5.2 km',
          rating: 4.2,
          address: 'Thika Road, Nairobi',
          phone: '+254 20 8711000',
          hours: '24/7',
          services: ['General Medicine', 'Emergency', 'Surgery', 'Pediatrics'],
          consultationFee: 'KSh 500'
        }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <section id="clinic-locator" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-medical-title mb-4">Find Nearby Healthcare</h2>
          <p className="text-medical-subtitle max-w-2xl mx-auto">
            Locate hospitals, clinics, and pharmacies near you with real-time availability and pricing
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="card-medical mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="icon-medical mr-2" />
                Search Healthcare Facilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter your location (e.g., Nairobi, Mombasa, Kisumu)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-medical"
                />
                <Button
                  onClick={handleSearch}
                  disabled={!location.trim() || isSearching}
                  className="btn-medical-primary min-w-32"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Navigation className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {clinics.length > 0 && (
            <div className="grid gap-6">
              {clinics.map((clinic) => (
                <Card key={clinic.id} className="card-medical card-medical-hover">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{clinic.name}</h3>
                            <p className="text-muted-foreground flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {clinic.address}
                            </p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {clinic.type}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-sm">
                            <Navigation className="h-4 w-4 mr-2 text-primary" />
                            <span>{clinic.distance}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 mr-2 text-warning fill-current" />
                            <span>{clinic.rating}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-secondary" />
                            <span>{clinic.hours}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-primary" />
                            <span className="truncate">{clinic.phone}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Services:</p>
                          <div className="flex flex-wrap gap-2">
                            {clinic.services.map((service: string) => (
                              <Badge key={service} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between">
                        <div className="mb-4">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Consultation Fee
                          </p>
                          <p className="text-lg font-semibold text-primary">
                            {clinic.consultationFee}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full btn-medical-primary">
                            Book Appointment
                          </Button>
                          <Button variant="outline" className="w-full">
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!clinics.length && !isSearching && (
            <div className="text-center py-12 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter your location to find nearby healthcare facilities</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClinicLocator;