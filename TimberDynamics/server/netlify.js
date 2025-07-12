import serverless from 'serverless-http';
import express from 'express';
import { registerRoutes } from './routes.js';
import { log } from './vite.js';

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
registerRoutes(app);

// Export serverless handler
export const handler = serverless(app);