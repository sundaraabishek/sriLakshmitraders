import { useLocation } from "wouter";
import HeroSection from "@/components/hero-section";
import ServiceCard from "@/components/service-card";
import ContactForm from "@/components/contact-form";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-wood-brown rounded-lg flex items-center justify-center">
                <i className="fas fa-tree text-white"></i>
              </div>
              <div>
                <h1 className="font-bold text-xl warm-gray">Srilakhmi Traders</h1>
                <p className="text-sm text-gray-600">Wood & Interior Solutions</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#services" className="text-gray-700 hover:text-wood-brown transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-wood-brown transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-wood-brown transition-colors">Contact</a>
              <button 
                onClick={() => setLocation("/client")}
                className="bg-wood-brown text-white px-4 py-2 rounded-lg font-medium hover:bg-wood-light transition-colors"
              >
                View Portfolio
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection onAdminClick={() => setLocation("/admin")} onClientClick={() => setLocation("/client")} />

      {/* Services Overview */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl warm-gray mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive wood and interior solutions for homes and businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl warm-gray mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to transform your space? Contact us today</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="font-semibold text-2xl mb-6 warm-gray">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt wood-brown mr-4"></i>
                  <span>Dindigul, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone wood-brown mr-4"></i>
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope wood-brown mr-4"></i>
                  <span>info@srilakhmitraders.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-2xl mb-6 warm-gray">Send Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
