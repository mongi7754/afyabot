import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SymptomChecker from '@/components/SymptomChecker';
import ClinicLocator from '@/components/ClinicLocator';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <SymptomChecker />
        <ClinicLocator />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
