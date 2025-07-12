import { useQuery } from "@tanstack/react-query";
import { Service, Analytics } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { ChartComponent } from "@/components/ui/chart";
import { Loader2 } from "lucide-react";

export default function AdminAnalytics() {
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

  // Process analytics data for charts
  const servicePopularityData = services?.map(service => {
    const serviceAnalytics = analytics?.filter(a => a.serviceId === service.id) || [];
    const totalViews = serviceAnalytics.reduce((sum, a) => sum + (a.views || 0), 0);
    return {
      name: service.name,
      views: totalViews,
    };
  }) || [];

  const monthlyData = analytics?.reduce((acc, item) => {
    const month = item.month;
    if (!acc[month]) {
      acc[month] = { views: 0, inquiries: 0 };
    }
    acc[month].views += item.views || 0;
    acc[month].inquiries += item.inquiries || 0;
    return acc;
  }, {} as Record<string, { views: number; inquiries: number }>) || {};

  const serviceChartConfig = {
    type: 'pie' as const,
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
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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

  const monthlyChartConfig = {
    type: 'bar' as const,
    data: {
      labels: Object.keys(monthlyData),
      datasets: [{
        label: 'Views',
        data: Object.values(monthlyData).map(item => item.views),
        backgroundColor: '#8B4513',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  return (
    <div className="admin-content">
      <div className="mb-8">
        <h1 className="font-bold text-3xl warm-gray mb-2">Analytics</h1>
        <p className="text-gray-600">Insights into your business performance and service popularity.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Service Popularity</h3>
            <div className="h-80">
              <ChartComponent config={serviceChartConfig} className="w-full h-full" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Monthly Views</h3>
            <div className="h-80">
              <ChartComponent config={monthlyChartConfig} className="w-full h-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
