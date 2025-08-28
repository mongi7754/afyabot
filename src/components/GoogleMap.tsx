import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Info } from 'lucide-react';

// Mapbox configuration - you'll need to add your token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTNrdDNxbGUwMzByMm1xdGxiZ3I4aXBiIn0.WhHrJvIzNdUz5W3Pnl97AQ';

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

interface GoogleMapProps {
  clinics: Clinic[];
  onSelectClinic?: (clinic: Clinic) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ clinics, onSelectClinic }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.log('Location access denied, using default location');
          setUserLocation([36.8219, -1.2921]); // Default to Nairobi
        }
      );
    } else {
      setUserLocation([36.8219, -1.2921]); // Default to Nairobi
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    // Initialize map
    const mapboxgl = (window as any).mapboxgl;
    if (!mapboxgl) {
      // Dynamically load Mapbox GL JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js';
      script.onload = () => initializeMap();
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    } else {
      initializeMap();
    }

    function initializeMap() {
      const mapboxgl = (window as any).mapboxgl;
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add user location marker
      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(userLocation!)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
        .addTo(map.current);

      // Add clinic markers
      clinics.forEach((clinic) => {
        const marker = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([clinic.longitude, clinic.latitude])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <h3 class="font-bold text-sm">${clinic.name}</h3>
                <p class="text-xs text-gray-600">${clinic.address}</p>
                ${clinic.phone ? `<p class="text-xs"><strong>Phone:</strong> ${clinic.phone}</p>` : ''}
                ${clinic.rating ? `<p class="text-xs"><strong>Rating:</strong> ${clinic.rating}⭐</p>` : ''}
                ${clinic.services ? `<p class="text-xs"><strong>Services:</strong> ${clinic.services.slice(0, 2).join(', ')}</p>` : ''}
              </div>
            `)
          )
          .addTo(map.current);

        marker.getElement().addEventListener('click', () => {
          setSelectedClinic(clinic);
          onSelectClinic?.(clinic);
        });
      });
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [userLocation, clinics, onSelectClinic]);

  const fitToMarkers = () => {
    if (!map.current || clinics.length === 0) return;

    const bounds = new (window as any).mapboxgl.LngLatBounds();
    
    // Add user location to bounds
    if (userLocation) {
      bounds.extend(userLocation);
    }
    
    // Add all clinic locations to bounds
    clinics.forEach((clinic) => {
      bounds.extend([clinic.longitude, clinic.latitude]);
    });

    map.current.fitBounds(bounds, { padding: 50 });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={fitToMarkers} variant="outline" size="sm">
          <MapPin className="mr-2 h-4 w-4" />
          Show All Clinics
        </Button>
      </div>
      
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="w-full h-[400px] rounded-lg border"
          style={{ minHeight: '400px' }}
        />
        
        {selectedClinic && (
          <Card className="absolute top-4 right-4 w-80 max-w-[calc(100%-2rem)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-sm">{selectedClinic.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{selectedClinic.address}</p>
                  {selectedClinic.phone && (
                    <p className="text-xs mb-1">
                      <strong>Phone:</strong> {selectedClinic.phone}
                    </p>
                  )}
                  {selectedClinic.rating && (
                    <p className="text-xs mb-2">
                      <strong>Rating:</strong> {selectedClinic.rating}⭐
                    </p>
                  )}
                  {selectedClinic.services && (
                    <div className="text-xs">
                      <strong>Services:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedClinic.services.slice(0, 3).map((service, index) => (
                          <span 
                            key={index}
                            className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Your Location</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Healthcare Facilities</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;