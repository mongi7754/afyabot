import { Heart, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AfriHealth AI</h3>
                <p className="text-xs opacity-80">Smart Healthcare Assistant</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Making healthcare accessible across Africa through AI-powered medical guidance and local clinic networks.
            </p>
            <div className="flex space-x-2">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                <Globe className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                <Phone className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                <Mail className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>AI Symptom Checker</li>
              <li>Clinic Locator</li>
              <li>Tele-consultation</li>
              <li>Health Records</li>
              <li>Medication Reminders</li>
              <li>Emergency Support</li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-semibold mb-4">Languages</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>🇬🇧 English</li>
              <li>🇰🇪 Kiswahili</li>
              <li>🗣️ Sheng</li>
              <li>📞 USSD (Rural Access)</li>
            </ul>
            <div className="mt-4">
              <h5 className="font-medium mb-2">Access Channels</h5>
              <ul className="space-y-1 text-xs opacity-80">
                <li>WhatsApp Bot</li>
                <li>Telegram Bot</li>
                <li>Web Application</li>
                <li>USSD Code</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact & Support</h4>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Emergency: *544#</p>
                  <p>Support: +254 700 000 000</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>help@afrihealth.ai</p>
                  <p>emergency@afrihealth.ai</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Nairobi, Kenya</p>
                  <p>Serving all of East Africa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 AfriHealth AI. All rights reserved.</p>
              <p className="text-xs mt-1">Licensed healthcare technology platform</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Medical Disclaimer</a>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-center opacity-60">
            <p>⚠️ This platform provides health information and guidance but is not a substitute for professional medical advice, diagnosis, or treatment.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;