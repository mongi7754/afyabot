import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Stethoscope, Globe, Shield } from 'lucide-react';
import heroImage from '@/assets/medical-hero-optimized.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="African healthcare professionals providing medical care"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Available in English, Kiswahili & Sheng
            </Badge>
            
            <h1 className="text-medical-title mb-6">
              AI-Powered Healthcare
              <span className="text-primary block">For Every African</span>
            </h1>
            
            <p className="text-medical-subtitle mb-8">
              Get instant medical guidance, find nearby clinics, and connect with healthcare professionals. 
              Your health assistant that speaks your language.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="btn-medical-primary group">
                <Stethoscope className="h-5 w-5 mr-2" />
                Check Symptoms Now
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 hover:bg-accent">
                Find Nearby Clinics
              </Button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-secondary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span>Free Initial Consultation</span>
              <div className="h-4 w-px bg-border" />
              <span>24/7 Available</span>
            </div>
          </div>

          <div className="hidden lg:block">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-medical card-medical-hover p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">50K+</h3>
                <p className="text-sm text-muted-foreground">Patients Helped</p>
              </div>
              <div className="card-medical card-medical-hover p-6">
                <h3 className="text-2xl font-bold text-secondary mb-2">95%</h3>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="card-medical card-medical-hover p-6">
                <h3 className="text-2xl font-bold text-warning mb-2">24/7</h3>
                <p className="text-sm text-muted-foreground">Always Available</p>
              </div>
              <div className="card-medical card-medical-hover p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">500+</h3>
                <p className="text-sm text-muted-foreground">Partner Clinics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;