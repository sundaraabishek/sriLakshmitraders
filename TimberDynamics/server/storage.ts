import { 
  users, 
  services, 
  analytics, 
  inquiries,
  type User, 
  type InsertUser,
  type Service,
  type InsertService,
  type Analytics,
  type InsertAnalytics,
  type Inquiry,
  type InsertInquiry
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(username: string, password: string): Promise<User | null>;
  
  // Service operations
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Analytics operations
  getAnalytics(): Promise<Analytics[]>;
  getAnalyticsByService(serviceId: number): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  updateAnalytics(id: number, analytics: Partial<InsertAnalytics>): Promise<Analytics | undefined>;
  
  // Inquiry operations
  getAllInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private analytics: Map<number, Analytics>;
  private inquiries: Map<number, Inquiry>;
  private currentUserId: number;
  private currentServiceId: number;
  private currentAnalyticsId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.analytics = new Map();
    this.inquiries = new Map();
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentAnalyticsId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with default admin user and services
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default admin user
    this.createUser({
      username: "admin",
      password: "srilakhmi123",
      role: "admin"
    });

    const defaultServices: InsertService[] = [
      {
        name: "Raw Wood Supply",
        description: "Premium quality raw wood sourced from sustainable forests. Perfect for construction and furniture making.",
        category: "Materials",
        imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "Wooden Doors",
        description: "Custom crafted wooden doors designed to enhance your home's aesthetic and security.",
        category: "Doors",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "Wood Furniture",
        description: "Handcrafted furniture pieces that combine traditional craftsmanship with modern design.",
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "PVC Doors",
        description: "Durable and weather-resistant PVC doors perfect for modern homes and offices.",
        category: "Doors",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "Bedroom Modern Doors",
        description: "Contemporary bedroom doors with sleek designs and premium finishes.",
        category: "Doors",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "Interior Furnishing",
        description: "Complete interior design solutions from concept to completion.",
        category: "Interior",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "Aluminium Channel Works",
        description: "Professional aluminium channel installations for modern architectural needs.",
        category: "Materials",
        imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
    ];

    defaultServices.forEach(service => {
      this.createService(service);
    });

    // Initialize analytics data
    const currentYear = new Date().getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Create analytics for each service
    this.services.forEach((service, serviceId) => {
      months.forEach((month, index) => {
        const views = Math.floor(Math.random() * 100) + 50;
        const inquiries = Math.floor(Math.random() * 20) + 5;
        
        this.createAnalytics({
          serviceId,
          views,
          inquiries,
          month,
          year: currentYear,
        });
      });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      role: insertUser.role || "admin"
    };
    this.users.set(id, user);
    return user;
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = Array.from(this.users.values()).find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  }

  // Service operations
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { 
      ...insertService, 
      id, 
      createdAt: new Date(),
      imageUrl: insertService.imageUrl || null,
      isActive: insertService.isActive ?? true
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: number, updateData: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    
    const updatedService = { ...service, ...updateData };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Analytics operations
  async getAnalytics(): Promise<Analytics[]> {
    return Array.from(this.analytics.values());
  }

  async getAnalyticsByService(serviceId: number): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(
      (analytics) => analytics.serviceId === serviceId
    );
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = this.currentAnalyticsId++;
    const analytics: Analytics = { 
      ...insertAnalytics, 
      id,
      serviceId: insertAnalytics.serviceId || null,
      views: insertAnalytics.views || 0,
      inquiries: insertAnalytics.inquiries || 0
    };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async updateAnalytics(id: number, updateData: Partial<InsertAnalytics>): Promise<Analytics | undefined> {
    const analytics = this.analytics.get(id);
    if (!analytics) return undefined;
    
    const updatedAnalytics = { ...analytics, ...updateData };
    this.analytics.set(id, updatedAnalytics);
    return updatedAnalytics;
  }

  // Inquiry operations
  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date(),
      serviceId: insertInquiry.serviceId || null
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
