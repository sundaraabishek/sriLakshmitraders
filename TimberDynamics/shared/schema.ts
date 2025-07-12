import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin"),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id),
  views: integer("views").default(0),
  inquiries: integer("inquiries").default(0),
  month: text("month").notNull(),
  year: integer("year").notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  serviceId: integer("service_id").references(() => services.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
