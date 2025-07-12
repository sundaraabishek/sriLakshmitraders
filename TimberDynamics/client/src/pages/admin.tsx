import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/admin-sidebar";
import AdminDashboard from "@/components/admin-dashboard";
import AdminServices from "@/components/admin-services";
import AdminAnalytics from "@/components/admin-analytics";
import LoginForm from "@/components/login-form";
import { Loader2 } from "lucide-react";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { isAuthenticated, isLoading } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "services":
        return <AdminServices />;
      case "analytics":
        return <AdminAnalytics />;
      default:
        return <AdminDashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => setActiveTab("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onBackToSite={() => setLocation("/")} 
        />
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
