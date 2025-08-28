import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Shield, 
  Clock, 
  Globe, 
  BarChart3,
  FileText,
  Bell
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Stethoscope,
      title: 'AI Symptom Checker',
      description: 'Get instant medical guidance based on your symptoms using advanced AI technology.',
      badges: ['Multi-language', 'AI-Powered', '95% Accuracy'],
      color: 'text-primary'
    },
    {
      icon: MapPin,
      title: 'Clinic & Hospital Locator',
      description: 'Find nearby healthcare facilities with real-time availability, ratings, and pricing.',
      badges: ['Real-time', 'GPS-enabled', '500+ Facilities'],
      color: 'text-secondary'
    },
    {
      icon: Phone,
      title: 'Tele-consultation',
      description: 'Book virtual consultations with qualified doctors via WhatsApp, video calls, or phone.',
      badges: ['Video Calls', 'WhatsApp', 'Licensed Doctors'],
      color: 'text-warning'
    },
    {
      icon: MessageSquare,
      title: 'Multi-Channel Access',
      description: 'Access healthcare through WhatsApp, Telegram, web app, and USSD for rural areas.',
      badges: ['WhatsApp', 'USSD', 'Web App'],
      color: 'text-primary'
    },
    {
      icon: Shield,
      title: 'Secure Health Records',
      description: 'Store your medical history securely with patient-controlled access and sharing.',
      badges: ['HIPAA Compliant', 'Encrypted', 'Patient-Controlled'],
      color: 'text-secondary'
    },
    {
      icon: Bell,
      title: 'Health Reminders',
      description: 'Get personalized health tips, medication reminders, and preventive care alerts.',
      badges: ['Personalized', 'Medication', 'Preventive Care'],
      color: 'text-warning'
    }
  ];

  const additionalFeatures = [
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Available in English, Kiswahili, and Sheng for better accessibility'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock access to health guidance and emergency support'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Healthcare providers get insights on patient trends and health patterns'
    },
    {
      icon: FileText,
      title: 'Medical Reports',
      description: 'Generate and download comprehensive health reports for your records'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-medical-title mb-4">Comprehensive Healthcare Platform</h2>
          <p className="text-medical-subtitle max-w-3xl mx-auto">
            Everything you need for better health management, from AI-powered diagnosis to connecting with healthcare professionals
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="card-medical card-medical-hover group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-medical-body">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="border-t border-border pt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Additional Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-3xl font-bold text-primary mb-2">50K+</h4>
              <p className="text-sm text-muted-foreground">Patients Served</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-secondary mb-2">95%</h4>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-warning mb-2">500+</h4>
              <p className="text-sm text-muted-foreground">Partner Clinics</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-primary mb-2">24/7</h4>
              <p className="text-sm text-muted-foreground">Always Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;