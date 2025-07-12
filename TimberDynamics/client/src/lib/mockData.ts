// Mock data for static deployment
export const mockServices = [
  {
    id: 1,
    name: "Raw Wood Supply",
    description: "Premium quality raw wood materials for all your construction and furniture needs",
    category: "raw-wood",
    price: "Competitive rates",
    image: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: 2,
    name: "Wooden Doors",
    description: "Handcrafted wooden doors in various designs and finishes",
    category: "doors",
    price: "Starting from ₹8,000",
    image: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: 3,
    name: "Wood Furniture",
    description: "Custom furniture made from premium wood with excellent craftsmanship",
    category: "furniture",
    price: "Custom pricing",
    image: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17")
  },
  {
    id: 4,
    name: "PVC Doors",
    description: "Modern PVC doors with excellent durability and weather resistance",
    category: "doors",
    price: "Starting from ₹5,000",
    image: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: 5,
    name: "Bedroom Modern Doors",
    description: "Contemporary bedroom doors with stylish designs and smooth finishes",
    category: "doors",
    price: "Starting from ₹12,000",
    image: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19")
  },
  {
    id: 6,
    name: "Interior Furnishing",
    description: "Complete interior furnishing solutions for homes and offices",
    category: "interior",
    price: "Package deals available",
    image: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: 7,
    name: "Aluminium Channel Works",
    description: "Professional aluminium channel installation and fabrication services",
    category: "aluminium",
    price: "Competitive rates",
    image: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-21")
  }
];

export const mockAnalytics = [
  {
    id: 1,
    serviceId: 1,
    views: 150,
    month: "January",
    year: 2024,
    createdAt: new Date("2024-01-31"),
    updatedAt: new Date("2024-01-31")
  },
  {
    id: 2,
    serviceId: 2,
    views: 200,
    month: "January",
    year: 2024,
    createdAt: new Date("2024-01-31"),
    updatedAt: new Date("2024-01-31")
  },
  {
    id: 3,
    serviceId: 3,
    views: 180,
    month: "January",
    year: 2024,
    createdAt: new Date("2024-01-31"),
    updatedAt: new Date("2024-01-31")
  },
  {
    id: 4,
    serviceId: 4,
    views: 120,
    month: "January",
    year: 2024,
    createdAt: new Date("2024-01-31"),
    updatedAt: new Date("2024-01-31")
  },
  {
    id: 5,
    serviceId: 5,
    views: 90,
    month: "January",
    year: 2024,
    createdAt: new Date("2024-01-31"),
    updatedAt: new Date("2024-01-31")
  },
  {
    id: 6,
    serviceId: 6,
    views: 110,
    month: "January",
    year: 2024,
    createdAt: new Date("2024-01-31"),
    updatedAt: new Date("2024-01-31")
  },
  {
    id: 7,
    serviceId: 7,
    views: 85,
    month: "January",
    year: 2024,
    createdAt: new Date("2024-01-31"),
    updatedAt: new Date("2024-01-31")
  }
];

export const mockInquiries = [
  {
    id: 1,
    name: "Raj Kumar",
    email: "raj.kumar@email.com",
    phone: "9876543210",
    message: "Interested in wooden doors for my new home. Please provide a quote.",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25")
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "9876543211",
    message: "Looking for complete interior furnishing for my office space.",
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-26")
  },
  {
    id: 3,
    name: "Suresh Patel",
    email: "suresh.patel@email.com",
    phone: "9876543212",
    message: "Need raw wood materials for furniture making. What varieties do you have?",
    createdAt: new Date("2024-01-27"),
    updatedAt: new Date("2024-01-27")
  }
];

export const mockDashboardStats = {
  totalServices: mockServices.length,
  totalInquiries: mockInquiries.length,
  totalViews: mockAnalytics.reduce((sum, item) => sum + item.views, 0),
  activeProjects: 12,
  revenue: "₹2,45,000"
};