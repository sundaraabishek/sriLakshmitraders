import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBackToSite: () => void;
}

export default function AdminSidebar({ activeTab, onTabChange, onBackToSite }: AdminSidebarProps) {
  const { logout, user } = useAuth();
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
    { id: "services", label: "Manage Services", icon: "fas fa-cog" },
    { id: "analytics", label: "Analytics", icon: "fas fa-chart-pie" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onBackToSite();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="admin-sidebar w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-6 border-b">
        <h2 className="font-bold text-xl warm-gray">Admin Panel</h2>
        <p className="text-gray-600 text-sm">Welcome, {user?.username}</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onTabChange(item.id);
            }}
            className={`admin-nav-item block px-6 py-3 transition-colors ${
              activeTab === item.id
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <i className={`${item.icon} mr-3`}></i>
            {item.label}
          </a>
        ))}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBackToSite();
          }}
          className="admin-nav-item block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <i className="fas fa-arrow-left mr-3"></i>
          Back to Site
        </a>
        <div className="border-t mt-6 pt-6 px-6">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
}
