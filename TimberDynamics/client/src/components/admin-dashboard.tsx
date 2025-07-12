import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface DashboardStats {
  totalServices: number;
  totalInquiries: number;
  totalViews: number;
  activeProjects: number;
  revenue: string;
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="admin-content">
      <div className="mb-8">
        <h1 className="font-bold text-3xl warm-gray mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Services</p>
                <p className="text-2xl font-bold warm-gray">{stats?.totalServices || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-cog text-blue-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Projects</p>
                <p className="text-2xl font-bold warm-gray">{stats?.activeProjects || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-project-diagram text-green-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Inquiries</p>
                <p className="text-2xl font-bold warm-gray">{stats?.totalInquiries || 0}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-envelope text-orange-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-2xl font-bold warm-gray">{stats?.revenue || "₹0"}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-rupee-sign text-purple-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <i className="fas fa-plus mr-2"></i>Add New Service
              </button>
              <button className="w-full bg-forest-green text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                <i className="fas fa-upload mr-2"></i>Upload Images
              </button>
              <button className="w-full bg-wood-brown text-white py-3 rounded-lg font-medium hover:bg-wood-light transition-colors">
                <i className="fas fa-eye mr-2"></i>Preview Site
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <i className="fas fa-plus text-green-600 mr-3"></i>
                <div>
                  <p className="font-medium text-sm">New service added</p>
                  <p className="text-xs text-gray-600">Aluminum Channel Works</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <i className="fas fa-envelope text-blue-600 mr-3"></i>
                <div>
                  <p className="font-medium text-sm">New inquiry received</p>
                  <p className="text-xs text-gray-600">Wooden door project</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <i className="fas fa-image text-purple-600 mr-3"></i>
                <div>
                  <p className="font-medium text-sm">Images updated</p>
                  <p className="text-xs text-gray-600">Furniture gallery</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
