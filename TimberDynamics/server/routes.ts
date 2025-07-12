import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceSchema, insertInquirySchema, loginSchema } from "@shared/schema";
import { z } from "zod";

// Simple session management
const sessions = new Map<string, { userId: number; expires: Date }>();

// Generate random session ID
function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Authentication middleware
const requireAuth = (req: any, res: any, next: any) => {
  const sessionId = req.headers.authorization?.replace('Bearer ', '');
  
  if (!sessionId) {
    return res.status(401).json({ message: "No authentication token provided" });
  }

  const session = sessions.get(sessionId);
  if (!session || session.expires < new Date()) {
    if (session) sessions.delete(sessionId);
    return res.status(401).json({ message: "Invalid or expired session" });
  }

  req.userId = session.userId;
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.authenticateUser(username, password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const sessionId = generateSessionId();
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      sessions.set(sessionId, { userId: user.id, expires });

      res.json({ 
        token: sessionId, 
        user: { 
          id: user.id, 
          username: user.username, 
          role: user.role 
        } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid login data", errors: error.errors });
      }
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/logout", requireAuth, async (req: any, res) => {
    const sessionId = req.headers.authorization?.replace('Bearer ', '');
    if (sessionId) {
      sessions.delete(sessionId);
    }
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/auth/user", requireAuth, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ 
        id: user.id, 
        username: user.username, 
        role: user.role 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Service routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.post("/api/services", requireAuth, async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  app.put("/api/services/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const serviceData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, serviceData);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.delete("/api/services/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteService(id);
      if (!deleted) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Analytics routes (protected)
  app.get("/api/analytics", requireAuth, async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get("/api/analytics/services/:serviceId", requireAuth, async (req, res) => {
    try {
      const serviceId = parseInt(req.params.serviceId);
      const analytics = await storage.getAnalyticsByService(serviceId);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service analytics" });
    }
  });

  // Inquiry routes (protected)
  app.get("/api/inquiries", requireAuth, async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Dashboard stats (protected)
  app.get("/api/dashboard/stats", requireAuth, async (req, res) => {
    try {
      const services = await storage.getAllServices();
      const inquiries = await storage.getAllInquiries();
      const analytics = await storage.getAnalytics();
      
      const totalServices = services.length;
      const totalInquiries = inquiries.length;
      const totalViews = analytics.reduce((sum, item) => sum + (item.views || 0), 0);
      const activeProjects = Math.floor(Math.random() * 20) + 5; // Mock active projects
      
      res.json({
        totalServices,
        totalInquiries,
        totalViews,
        activeProjects,
        revenue: "₹2.5L" // Mock revenue
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
