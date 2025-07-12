# Replit Configuration

## Overview

This is a full-stack web application for a wood and interior solutions business called "Srilakhmi Traders" built with React, Express, and PostgreSQL. The application features both admin and client interfaces with service management, analytics, and inquiry handling capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.
Deployment preference: Free hosting solutions for business website.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom wood-themed design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: React Query for server state management
- **Routing**: Wouter for client-side routing
- **Charts**: Chart.js for analytics visualization
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API with JSON responses
- **Development**: Hot module replacement with Vite integration

### Database Schema
- **Users**: Authentication and user management
- **Services**: Business services with categories and descriptions
- **Analytics**: Service view tracking and monthly statistics
- **Inquiries**: Customer contact form submissions
- **Database Provider**: Neon Database (serverless PostgreSQL)

## Key Components

### Frontend Components
1. **Pages**:
   - Home page with hero section and service showcase
   - Admin panel with dashboard, service management, and analytics
   - Client view with service catalog and charts
   - 404 error page

2. **Reusable Components**:
   - Service cards with category-based styling
   - Contact form with validation
   - Admin sidebar navigation
   - Analytics charts and dashboards
   - UI components library (buttons, dialogs, forms, etc.)

3. **Features**:
   - Responsive design with mobile-first approach
   - Wood-themed color scheme and styling
   - Interactive charts for data visualization
   - Form validation with React Hook Form and Zod

### Backend Components
1. **API Routes**:
   - `/api/services` - CRUD operations for services
   - `/api/analytics` - Analytics data retrieval
   - `/api/inquiries` - Customer inquiry handling
   - `/api/dashboard/stats` - Dashboard statistics

2. **Storage Layer**:
   - Memory storage implementation for development
   - Database storage interface ready for production
   - Type-safe database operations with Drizzle ORM

3. **Middleware**:
   - Request logging with timing
   - JSON parsing and URL encoding
   - Error handling with proper HTTP status codes

## Data Flow

1. **Service Management**:
   - Admin creates/updates services via form
   - Data validated with Zod schemas
   - Stored in PostgreSQL via Drizzle ORM
   - Real-time updates via React Query

2. **Analytics Tracking**:
   - Service views tracked automatically
   - Monthly aggregation of statistics
   - Chart visualization on both admin and client sides

3. **Customer Inquiries**:
   - Contact form submissions stored in database
   - Admin can view and manage inquiries
   - Email notifications (implementation ready)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **chart.js**: Data visualization
- **wouter**: Lightweight routing
- **react-hook-form**: Form handling
- **zod**: Runtime type validation

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tailwindcss**: Utility-first CSS framework
- **drizzle-kit**: Database migrations and introspection

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend
- Express server with TypeScript compilation
- Database migrations with Drizzle Kit
- Environment variables for database configuration

### Production Build
- Frontend built with Vite to `dist/public`
- Backend compiled with esbuild to `dist/index.js`
- Static file serving from Express
- Database connection via environment variables

### Key Configuration Files
- `vite.config.ts`: Frontend build configuration
- `drizzle.config.ts`: Database connection and migration settings
- `tsconfig.json`: TypeScript compilation options
- `tailwind.config.ts`: Styling configuration with custom theme

The application follows a monorepo structure with shared schema definitions and clear separation between client and server code. The architecture supports both development and production environments with proper error handling, logging, and type safety throughout the stack.

## Deployment Configuration

The application is configured for free hosting on multiple platforms:

### Hosting Platforms
- **Netlify**: Full-stack deployment with serverless functions
- **Vercel**: React frontend with Node.js API routes
- **Render**: Complete full-stack hosting with database support
- **Railway**: Simple deployment with auto-detection

### Security Features
- Password-protected admin panel (admin/srilakhmi123)
- Session-based authentication with secure tokens
- Hidden admin access via subtle UI element
- Protected API routes requiring authentication

### Deployment Files
- `netlify.toml`: Netlify configuration with build settings
- `vercel.json`: Vercel serverless function configuration
- `render.yaml`: Render service configuration
- `DEPLOYMENT_GUIDE.md`: Step-by-step deployment instructions
- `README.md`: Complete project documentation

The website is production-ready with comprehensive documentation for easy deployment to any free hosting platform.