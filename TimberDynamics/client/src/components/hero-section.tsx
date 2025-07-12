interface HeroSectionProps {
  onAdminClick: () => void;
  onClientClick: () => void;
}

export default function HeroSection({ onAdminClick, onClientClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-wood-light to-wood-brown">
      {/* Beautiful wood workshop background */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className="absolute inset-0 opacity-30"
      />
      
      <div className="relative z-10 text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold text-4xl md:text-6xl mb-6 fade-in">
            Premium Wood & Interior Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 fade-in">
            From Raw Wood to Finished Furniture - Your Complete Interior Partner in Dindigul
          </p>
          
          {/* Call to Action */}
          <div className="max-w-2xl mx-auto mt-12">
            <div 
              className="glass-morphism rounded-xl p-8 service-card cursor-pointer"
              onClick={onClientClick}
            >
              <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-eye text-white text-2xl"></i>
              </div>
              <h3 className="font-semibold text-xl mb-3">Explore Our Services</h3>
              <p className="text-gray-200 mb-4">Discover our premium wood and interior solutions crafted with precision</p>
              <div className="bg-forest-green text-white px-8 py-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                View Our Portfolio
              </div>
            </div>
          </div>
          
          {/* Subtle admin access - hidden text link */}
          <div className="mt-8 text-center">
            <button
              onClick={onAdminClick}
              className="text-xs text-gray-400 hover:text-white opacity-30 hover:opacity-100 transition-opacity"
            >
              •
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
