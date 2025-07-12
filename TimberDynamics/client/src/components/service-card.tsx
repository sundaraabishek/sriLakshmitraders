import { Service } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
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
        return "Sustainable & Quality";
      case "doors":
        return "Custom Crafted";
      case "furniture":
        return "Handcrafted";
      case "interior":
        return "Complete Solutions";
      default:
        return "Professional";
    }
  };

  return (
    <Card className="service-card bg-white rounded-xl shadow-lg overflow-hidden">
      <img 
        src={service.imageUrl || "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"} 
        alt={service.name} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <h3 className="font-semibold text-xl mb-3 warm-gray">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex items-center wood-brown">
          <i className={`${getCategoryIcon(service.category)} mr-2`}></i>
          <span className="font-medium">{getCategoryText(service.category)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
