import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service, Analytics } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartComponent } from "@/components/ui/chart";
import { Loader2 } from "lucide-react";

export default function ClientServices() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics[]>({
    queryKey: ["/api/analytics"],
  });

  if (servicesLoading || analyticsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const categories = ["all", ...new Set(services?.map(s => s.category.toLowerCase()) || [])];
  const filteredServices = selectedCategory === "all" 
    ? services 
    : services?.filter(s => s.category.toLowerCase() === selectedCategory);

  // Process analytics data for chart
  const servicePopularityData = services?.map(service => {
    const serviceAnalytics = analytics?.filter(a => a.serviceId === service.id) || [];
    const totalViews = serviceAnalytics.reduce((sum, a) => sum + (a.views || 0), 0);
    return {
      name: service.name,
      views: totalViews,
    };
  }) || [];

  const chartConfig = {
    type: 'doughnut' as const,
    data: {
      labels: servicePopularityData.map(item => item.name),
      datasets: [{
        data: servicePopularityData.map(item => item.views),
        backgroundColor: [
          '#8B4513',
          '#D2691E',
          '#2C5530',
          '#1E40AF',
          '#059669',
          '#DC2626',
          '#7C3AED'
        ],
        borderWidth: 3,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            padding: 20,
            font: {
              family: 'Inter'
            }
          }
        }
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "materials":
        return "fas fa-leaf";
      case "doors":
        return "fas fa-door-open";
      case "furniture":
        return "fas fa-couch";
      case "interior":
        return "fas fa-home";
      default:
        return "fas fa-cog";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category.toLowerCase()) {
      case "materials":
        return "Sustainable";
      case "doors":
        return "Custom Made";
      case "furniture":
        return "Handcrafted";
      case "interior":
        return "Complete";
      default:
        return "Professional";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="font-bold text-4xl warm-gray mb-4">Our Premium Services</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive range of wood and interior solutions designed to transform your space
        </p>
      </div>

      {/* Service Categories Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? "bg-wood-brown text-white hover:bg-wood-light"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category === "all" ? "All Services" : category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Enhanced Service Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredServices?.map((service) => (
          <Card key={service.id} className="service-card bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={service.imageUrl || "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"} 
              alt={service.name} 
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="font-semibold text-xl mb-3 warm-gray">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center wood-brown">
                  <i className={`${getCategoryIcon(service.category)} mr-2`}></i>
                  <span className="font-medium">{getCategoryText(service.category)}</span>
                </div>
                <Button className="bg-wood-brown text-white hover:bg-wood-light">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Analytics Display */}
      <Card className="bg-white rounded-xl shadow-lg mb-8">
        <CardContent className="p-8">
          <h3 className="font-semibold text-2xl mb-6 warm-gray text-center">Service Popularity</h3>
          <div className="h-96">
            <ChartComponent config={chartConfig} className="w-full h-full" />
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="bg-wood-brown rounded-xl p-8 text-center text-white">
        <h3 className="font-bold text-2xl mb-4">Ready to Transform Your Space?</h3>
        <p className="text-lg mb-6 opacity-90">Get in touch with us today for a personalized consultation</p>
        <Button className="bg-white text-wood-brown hover:bg-gray-100">
          Contact Us Now
        </Button>
      </div>
    </div>
  );
}
