# Srilakhmi Traders - Wood & Interior Solutions

A professional business website for Srilakhmi Traders, specializing in wood and interior solutions in Dindigul, Tamil Nadu.

## Features

- **Professional Business Showcase**: Modern, responsive design with wood-themed UI
- **Admin Panel**: Password-protected admin interface for managing services and content
- **Client View**: Public showcase of services with interactive charts and contact form
- **Analytics Dashboard**: Business insights with pie charts and statistics
- **Service Management**: Full CRUD operations for managing business services
- **Contact System**: Customer inquiry handling with form submissions

## Services Offered

- Raw Wood Supply
- Wooden Doors & Furniture
- PVC Doors & Modern Bedroom Doors
- Interior Furnishing Solutions
- Aluminium Channel Works

## Admin Access

- Username: `admin`
- Password: `srilakhmi123`

Access the admin panel via the subtle dot button on the homepage.

## Tech Stack

- **Frontend**: React 18 + TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js + Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Chart.js for analytics
- **Authentication**: Session-based auth with secure tokens

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Start production server:
   ```bash
   npm start
   ```

## Deployment

This application is configured for deployment on multiple free hosting platforms:

### Netlify
- Deploy directly from your Git repository
- Automatic builds and deployments
- Free SSL certificates

### Vercel
- Seamless Node.js hosting
- Automatic deployments from Git
- Built-in analytics

### Render
- Full-stack application hosting
- Free tier available
- PostgreSQL database support

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
├── server/               # Express backend
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema definitions
└── dist/                 # Build output
```

## Environment Variables

For production deployment, configure these environment variables:

- `NODE_ENV=production`
- `DATABASE_URL` (if using PostgreSQL)
- `SESSION_SECRET` (for session encryption)

## Business Information

**Srilakhmi Traders**
Wood & Interior Solutions
Dindigul, Tamil Nadu

Specializing in premium wood products and complete interior solutions for residential and commercial spaces.

---

Built with ❤️ for quality craftsmanship and customer satisfaction.