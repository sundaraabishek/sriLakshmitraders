import { useLocation } from "wouter";
import ClientServices from "@/components/client-services";

export default function Client() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Client Header */}
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
            <button 
              onClick={() => setLocation("/")}
              className="bg-wood-brown text-white px-4 py-2 rounded-lg font-medium hover:bg-wood-light transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>Back to Home
            </button>
          </div>
        </div>
      </header>

      <ClientServices />
    </div>
  );
}
