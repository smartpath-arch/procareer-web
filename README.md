# SmartPath - Frontend Application

<div align="center">
  <img src="public/assets/common/navbar/logo-smartpath.svg" alt="SmartPath Logo" width="200"/>

  <p align="center">
    <strong>One-Stop Solution for Successful Education and Career Guidance</strong>
  </p>

  <p align="center">
    A comprehensive career development and e-learning platform empowering Indonesian students and professionals to advance their education and careers.
  </p>

  <p align="center">
    <a href="#key-features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#api-documentation">API Docs</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running The Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development Guidelines](#development-guidelines)
- [Build and Deployment](#build-and-deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About The Project

**SmartPath** is a cutting-edge educational technology platform designed to bridge the gap between academic learning and professional career success. The platform serves as a comprehensive ecosystem for:

- **Students** seeking to enhance their skills and prepare for the job market
- **Professionals** looking to upskill or switch careers
- **Corporations** requiring customized training solutions for their teams

### Mission

To democratize access to quality education and career development resources across Indonesia, helping individuals achieve their professional goals through structured learning paths, mentorship, and industry connections.

### Impact

- 📊 **300,000+** students reached
- 🎓 **40+** scholarship recipients
- 🏢 **Top Companies** - Alumni placed at Shopee, P&G, Astra, BNI, Indofood, and more
- 📰 **Media Recognition** - Featured in CNBC Indonesia, CNN Indonesia, Tribun News, and other major outlets

---

## Key Features

### 🎯 E-Learning Platform

- **Course Catalog** - Browse 100+ self-paced online courses
- **Category Filtering** - Organized by professional domains:
  - Data Science & Data Analytics
  - Digital Marketing
  - UI/UX Research & Design
  - Product & Project Management
  - Microsoft Office Suite
- **Multi-tier Packages** - Exclusive, Premium, and Basic access levels
- **Search Functionality** - Real-time course search
- **Progress Tracking** - Monitor learning journey

### 🚀 Bootcamp & Webinar Programs

- **Intensive Bootcamps** - Job-ready training programs
- **Expert Webinars** - Knowledge sharing sessions with industry leaders
- **Program Management** - Track registration deadlines and availability

### 💼 Career Development

- **Professional Mentorship** - One-on-one guidance from industry experts
- **Job Placement Support** - Interview preparation and career counseling
- **Scholarship Opportunities** - Financial aid for qualified candidates
- **Corporate Training** - Customized B2B solutions (coming soon)

### 🌐 Platform Features

- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Real-time Updates** - Live program availability and notifications
- **Social Proof** - Alumni testimonials and success stories

---

## Tech Stack

### Core Framework

- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### State Management & Data Fetching

- **[@tanstack/react-query 5.90.2](https://tanstack.com/query)** - Server state management
- **[React Hook Form 7.63.0](https://react-hook-form.com/)** - Form handling
- **[Zod 4.1.11](https://zod.dev/)** - Schema validation

### Styling & UI Components

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Icon library (550+ icons)
- **[Class Variance Authority](https://cva.style/)** - Component variants
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Intelligent class merging

### Interactions & Animations

- **[Swiper 12.0.3](https://swiperjs.com/)** - Touch-enabled carousels
- **[Lottie React 2.4.1](https://github.com/Gamote/lottie-react)** - JSON animations
- **[Sonner 2.0.7](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Next Themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Theme management

### Authentication (Configured)

- **[NextAuth.js 4.24.11](https://next-auth.js.org/)** - Authentication framework

### Development Tools

- **[ESLint 9](https://eslint.org/)** - Code linting
- **[Prettier 3.6.2](https://prettier.io/)** - Code formatting
- **[Husky 8.0.0](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged 16.2.3](https://github.com/lint-staged/lint-staged)** - Pre-commit linting

### Package Manager

- **[pnpm 9.15.9](https://pnpm.io/)** - Fast, efficient package manager

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** `>= 20.18.0` - [Download](https://nodejs.org/)
- **pnpm** `>= 9.0.0` - [Installation Guide](https://pnpm.io/installation)
- **Git** - [Download](https://git-scm.com/)

Verify installations:

```bash
node --version   # Should output v20.18.0 or higher
pnpm --version   # Should output 9.x.x or higher
git --version    # Should output git version
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/daniadrian/fesmartpath.git
cd smartpath-web
```

2. **Install dependencies**

```bash
pnpm install
```

This will install all required packages defined in `package.json`.

3. **Set up Git hooks**

```bash
pnpm run prepare
```

This configures Husky for pre-commit linting.

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Configure the following environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-change-me
```

#### Environment Variable Descriptions

| Variable              | Description                                                            | Required | Default                 |
| --------------------- | ---------------------------------------------------------------------- | -------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL                                                   | Yes      | `http://localhost:4000` |
| `NEXTAUTH_URL`        | Frontend application URL for auth callbacks                            | Yes      | `http://localhost:3000` |
| `NEXTAUTH_SECRET`     | Secret key for session encryption (use random 32+ chars in production) | Yes      | -                       |

**⚠️ Production Note:**

- Change `NEXT_PUBLIC_API_URL` to your production backend URL (e.g., `https://core.smartpath.id`)
- Generate a secure `NEXTAUTH_SECRET` using: `openssl rand -base64 32`

### Running The Application

#### Development Mode

Start the development server with hot-reload:

```bash
pnpm dev
```

The application will be available at:

- **Local:** [http://localhost:3000](http://localhost:3000)
- **Network:** `http://<your-local-ip>:3000` (accessible from other devices on the same network)

#### Production Build

Build the application for production:

```bash
pnpm build
```

This creates an optimized production build in the `.next` directory.

#### Production Server

Start the production server:

```bash
pnpm start
```

Runs the built application on [http://localhost:3000](http://localhost:3000).

#### Other Commands

```bash
# Run ESLint
pnpm lint

# Format code with Prettier
pnpm format

# Type checking (no build)
npx tsc --noEmit
```

---

## Project Structure

```
smartpath-web/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── globals.css               # Global styles
│   │   └── (public)/                 # Public route group
│   │       ├── layout.tsx            # Public pages layout
│   │       ├── page.tsx              # Homepage
│   │       ├── bootcamp-webinar/     # Bootcamp & Webinar page
│   │       ├── e-learning/           # E-Learning catalog
│   │       │   ├── page.tsx
│   │       │   └── [slug]/           # Course detail (dynamic)
│   │       ├── event/                # Events (under development)
│   │       ├── for-corporate/        # Corporate solutions (under development)
│   │       ├── clarify/              # Transparency/clarification page
│   │       ├── loading.tsx           # Global loading state
│   │       └── not-found.tsx         # 404 page
│   │
│   ├── api/                          # Next.js API routes
│   │   ├── bootcamps/route.ts        # Bootcamp data endpoint
│   │   ├── elearning/route.ts        # E-learning data endpoint
│   │   └── webinars/route.ts         # Webinar data endpoint
│   │
│   ├── components/                   # React components
│   │   ├── common/                   # Shared components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/                     # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AlumniCompaniesSection.tsx
│   │   │   ├── programsection.tsx
│   │   │   ├── mentor.tsx
│   │   │   ├── AlumniTestimonial.tsx
│   │   │   └── PublishedAndPartnership.tsx
│   │   ├── bootcamp-webinar/         # Bootcamp page components
│   │   ├── e-learning/               # E-learning page components
│   │   ├── clarify/                  # Clarification page components
│   │   └── provider.tsx              # Client providers wrapper
│   │
│   ├── lib/                          # Utilities and configurations
│   │   ├── utils.ts                  # Helper functions (cn utility)
│   │   └── testimonials/             # Testimonial data
│   │       ├── bootcampTestimonials.ts
│   │       └── eLearningTestimonials.ts
│   │
│   └── global.d.ts                   # TypeScript global declarations
│
├── public/                           # Static assets
│   ├── assets/
│   │   ├── home/                     # Homepage images
│   │   ├── bootcamp-webinar/         # Bootcamp images
│   │   ├── e-learning/               # E-learning images
│   │   ├── clarify/                  # Clarification page assets
│   │   ├── common/navbar/            # Logo and navigation assets
│   │   ├── mobile/                   # Mobile-optimized assets
│   │   └── icon/                     # Icons and favicons
│   ├── favicon.ico
│   └── site.webmanifest
│
├── .github/                          # GitHub configuration
│   └── workflows/                    # CI/CD workflows
│       ├── deploy-prod.yml           # Production deployment (main branch)
│       └── deploy-dev.yml            # Development deployment (dev branch)
│
├── .husky/                           # Git hooks
│   └── pre-commit                    # Pre-commit linting
│
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── eslint.config.mjs                 # ESLint configuration
├── postcss.config.mjs                # PostCSS configuration
├── components.json                   # shadcn/ui configuration
│
├── .env.local                        # Environment variables (not in git)
├── .gitignore                        # Git ignore rules
├── package.json                      # Dependencies and scripts
├── pnpm-lock.yaml                    # Lockfile
├── README.md                         # This file
└── TODO.md                           # Development todos
```

### Key Directories

- **`src/app/`** - Next.js 15 App Router pages using file-based routing
- **`src/api/`** - Backend integration layer (Next.js API routes)
- **`src/components/`** - Reusable React components organized by feature
- **`src/lib/`** - Utility functions, constants, and shared logic
- **`public/`** - Static files served directly (images, fonts, manifests)

---

## API Documentation

### API Routes (Frontend)

The application provides internal API routes that communicate with the backend:

#### 1. Bootcamp Programs

```http
GET /api/bootcamps
```

**Response:**

```typescript
[
  {
    id: string;
    title: string;
    type: "Bootcamp" | "Webinar";
    slug: string;
    dateISO: string | null;
    dateText: string;
    poster: string;
    linkMayar: string | null;
  }
]
```

**Example:**

```json
[
  {
    "id": "1",
    "title": "Data Science Bootcamp",
    "type": "Bootcamp",
    "slug": "data-science-bootcamp",
    "dateISO": "2025-12-31T23:59:59Z",
    "dateText": "Hingga 31 Desember 2025",
    "poster": "https://core.smartpath.id/uploads/bootcamp-poster.jpg",
    "linkMayar": "https://mayar.link/smartpath/bootcamp"
  }
]
```

#### 2. E-Learning Courses

```http
GET /api/elearning
```

**Response:**

```typescript
{
  items: [
    {
      id: string;
      title: string;
      category: string;
      type: "Exclusive" | "Premium" | "Basic";
      participants: string;
      duration: string;
      href: string;
      poster: { url?: string };
    }
  ]
}
```

**Example:**

```json
{
  "items": [
    {
      "id": "1",
      "title": "Introduction to Data Analysis",
      "category": "Data Science",
      "type": "Premium",
      "participants": "250 Peserta",
      "duration": "12 jam",
      "href": "https://mayar.link/smartpath/data-analysis",
      "poster": { "url": "/uploads/course-poster.jpg" }
    }
  ]
}
```

#### 3. Webinar Programs

```http
GET /api/webinars
```

**Response:** Same structure as `/api/bootcamps`, filtered for webinars only.

### Backend API Integration

The frontend communicates with a separate backend service:

**Base URLs:**

- Development: `http://localhost:4000`
- Production: `https://core.smartpath.id`

**Required Backend Endpoints:**

| Endpoint                                      | Method | Description                                   |
| --------------------------------------------- | ------ | --------------------------------------------- |
| `/bootcamps?page=1&limit=50&status=published` | GET    | Fetch published bootcamp and webinar programs |
| `/elearning?status=PUBLISHED`                 | GET    | Fetch published e-learning courses            |
| `/categories`                                 | GET    | Fetch course categories                       |
| `/courses/:slug`                              | GET    | Fetch individual course details by slug       |

**Expected Response Format:**

Backend should return JSON in one of these formats:

```typescript
// Format 1
{ success: true, data: { items: [...] } }

// Format 2
{ items: [...] }

// Format 3
{ data: [...] }
```

The frontend normalizes all formats automatically.

**Image URLs:**

All image paths returned by the backend are automatically converted to absolute URLs using the configured `NEXT_PUBLIC_API_URL`.

**Example:**

- Backend returns: `/uploads/image.jpg`
- Frontend converts to: `http://localhost:4000/uploads/image.jpg`

---

## Development Guidelines

### Code Style

This project enforces consistent code style through automated tools:

- **ESLint** - Identifies code issues and enforces best practices
- **Prettier** - Automatic code formatting
- **Husky + lint-staged** - Pre-commit hooks ensure all committed code is formatted

### Commit Workflow

```bash
# 1. Make your changes
git add .

# 2. Commit (pre-commit hooks run automatically)
git commit -m "feat: add new feature"

# If linting fails, fix issues and recommit
pnpm format  # Format all files
git add .
git commit -m "feat: add new feature"
```

### Component Development

**File Naming:**

- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)
- Pages: Next.js conventions (`page.tsx`, `layout.tsx`)

**Component Structure:**

```tsx
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  // ... other props
}

export function Component({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* Component content */}
    </div>
  );
}
```

### Adding New Features

1. **Create Component**

   ```bash
   # Create component file
   touch src/components/feature/NewComponent.tsx
   ```

2. **Define Types**

   ```typescript
   // Add to global.d.ts or component file
   interface NewFeatureData {
     id: string;
     // ... fields
   }
   ```

3. **Add API Route (if needed)**

   ```bash
   mkdir -p src/api/new-endpoint
   touch src/api/new-endpoint/route.ts
   ```

4. **Create Page**

   ```bash
   mkdir -p src/app/\(public\)/new-page
   touch src/app/\(public\)/new-page/page.tsx
   ```

5. **Test Locally**
   ```bash
   pnpm dev
   # Visit http://localhost:3000/new-page
   ```

### Image Optimization

**Always use Next.js Image component:**

```tsx
import Image from "next/image";

<Image
  src="/assets/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority // For above-the-fold images
  className="rounded-lg"
/>;
```

**Remote Images:**

Remote image domains must be configured in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "your-cdn.com",
    },
  ],
}
```

### Styling Guidelines

**Use Tailwind CSS utilities:**

```tsx
// Good
<div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4">

// Avoid inline styles
<div style={{ display: 'flex' }}>
```

**For conditional classes, use `cn()` utility:**

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-class"
)}>
```

### Performance Best Practices

1. **Use React Query for data fetching**

   ```tsx
   import { useQuery } from "@tanstack/react-query";

   const { data } = useQuery({
     queryKey: ["courses"],
     queryFn: fetchCourses,
   });
   ```

2. **Lazy load components**

   ```tsx
   import dynamic from "next/dynamic";

   const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
     loading: () => <LoadingSpinner />,
   });
   ```

3. **Optimize fonts**

   ```tsx
   import { Plus_Jakarta_Sans } from "next/font/google";

   const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
   ```

---

## Build and Deployment

### Production Build

```bash
# Create optimized production build
pnpm build

# Output will be in .next/ directory
# Build includes:
# - Minified JavaScript
# - Optimized images
# - Static HTML generation
# - CSS optimization
```

### Deployment Workflow

This project uses **automated CI/CD deployment** to VPS via **GitHub Actions**.

#### For Developers - Simple Deployment Process

Developers don't need to worry about manual deployment. Simply follow this workflow:

1. **Make your changes and commit**

   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

2. **Push to the appropriate branch**

   **For Development/Testing:**

   ```bash
   git push origin dev
   ```

   **For Production:**

   ```bash
   git push origin main
   ```

3. **Automatic deployment**
   - GitHub Actions will automatically trigger
   - CI/CD pipeline will SSH to VPS and run deployment scripts
   - PM2 will restart the application
   - Health check verifies deployment success
   - Monitor deployment progress in **GitHub Actions** tab

**That's it!** The deployment is fully automated.

#### Deployment Architecture

**Infrastructure:**

- **Hosting:** VPS (Virtual Private Server)
- **CI/CD:** GitHub Actions
- **Process Manager:** PM2
- **Deployment Method:** SSH-based automated deployment

**Environments:**

| Environment | Branch | Port | Process Name        | Workflow File     |
| ----------- | ------ | ---- | ------------------- | ----------------- |
| Development | `dev`  | 3000 | `smartpath-fe-dev`  | `deploy-dev.yml`  |
| Production  | `main` | 3001 | `smartpath-fe-prod` | `deploy-prod.yml` |

**Deployment Flow:**

1. Developer pushes to `dev` or `main` branch
2. GitHub Actions runner checks out code
3. SSH connection established to VPS server
4. Deployment script executed on server (`~/scripts/deploy-[env].sh`)
5. Application built and restarted with PM2
6. Health check performed to verify deployment
7. Notification sent on success/failure

#### Monitoring Deployment

**Check Deployment Status:**

1. Go to GitHub repository
2. Click on **Actions** tab
3. View the latest workflow run
4. Check logs for each step

**Common Deployment Checks:**

```bash
# Check if app is running on VPS (DevOps only)
pm2 list

# View application logs
pm2 logs smartpath-fe-prod  # for production
pm2 logs smartpath-fe-dev   # for development

# Check application health
curl -I http://localhost:3001  # production
curl -I http://localhost:3000  # development
```

#### Troubleshooting Deployment Issues

**If deployment fails:**

1. **Check GitHub Actions logs**
   - Go to Actions tab → Select failed workflow
   - Review error messages in each step

2. **Common Issues:**

   | Issue                 | Possible Cause            | Solution                                   |
   | --------------------- | ------------------------- | ------------------------------------------ |
   | SSH connection failed | Invalid credentials       | Contact DevOps team                        |
   | Build failed          | Code errors, dependencies | Check build logs, fix errors locally first |
   | PM2 restart failed    | Port already in use       | Contact DevOps team                        |
   | Health check failed   | App crashed, wrong port   | Check application logs                     |

3. **Before Contacting Support:**
   - Verify your code builds locally (`pnpm build`)
   - Check for TypeScript errors (`pnpm lint`)
   - Review commit for breaking changes

#### Deployment Support

If you encounter any issues during deployment or need assistance:

**Contact DevOps Support:**

- **WhatsApp:** [+62 822-7749-2956](https://wa.me/6282277492956)

**Please provide:**

- Commit hash or PR number
- Error logs from GitHub Actions (screenshot or copy-paste)
- What you've tried to fix the issue
- Description of the issue

#### Environment-Specific Builds

**Production:**

```bash
NEXT_PUBLIC_API_URL=https://core.smartpath.id pnpm build
```

**Note:** Environment variables are configured in GitHub Secrets for production deployment.

---

## Contributing

Please follow these guidelines:

### Branching Strategy

This project follows a **Git Flow** branching model:

**Main Branches:**

- **`main`** - Production-ready code. Auto-deploys to production VPS (port 3001)
- **`dev`** - Development/staging branch. Auto-deploys to development VPS (port 3000)

**Supporting Branches:**

- **`feature/*`** - New features (e.g., `feature/user-authentication`)
- **`fix/*`** - Bug fixes (e.g., `fix/login-error`)
- **`hotfix/*`** - Urgent production fixes (e.g., `hotfix/critical-bug`)

**Workflow:**

```
feature/my-feature → dev → main
     ↓                ↓       ↓
  Testing         Staging  Production
```

### Getting Started

1. **Fork the repository** (for external contributors)
2. **Clone the repository**

   ```bash
   git clone https://github.com/daniadrian/fesmartpath.git
   cd smartpath-web
   ```

3. **Create a feature branch from `dev`**

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

### Development Process

1. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add comments for complex logic

2. **Test your changes**

   ```bash
   pnpm dev
   # Test all affected pages
   ```

3. **Lint and format**

   ```bash
   pnpm lint
   pnpm format
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   **Commit Message Convention:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push your feature branch**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request to `dev` branch**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - **Base branch:** `dev` (not `main`)
   - **Compare branch:** `feature/your-feature-name`
   - Add clear title and description
   - Link related issues if any
   - Request review from team members

7. **Merge and Deploy**
   - After PR approval and merge to `dev`, changes auto-deploy to development server
   - Test on development environment (port 3000)
   - When ready for production, create PR from `dev` to `main`
   - After merge to `main`, auto-deploys to production (port 3001)

### Pull Request Guidelines

- **Title:** Clear, descriptive title
- **Description:** Explain what and why
- **Screenshots:** Include for UI changes
- **Testing:** Describe how you tested
- **Breaking Changes:** Clearly document any breaking changes

### Code Review Process

1. Maintainers review your PR
2. Address feedback and comments
3. Once approved, your PR will be merged
4. Your contribution will be in the next release!

---

## License

This project is proprietary and confidential.

**Copyright © 2025 SmartPath. All rights reserved.**

Unauthorized copying, distribution, modification, or use of this software, via any medium, is strictly prohibited without explicit written permission from SmartPath.

---

## Contact

### SmartPath

- **Website:** [https://smartpath.id](https://smartpath.id)
- **Email:** admin@smartpath.id
- **Instagram:** [@smartpath.id](https://www.instagram.com/smartpath.id/)
- **LinkedIn:** [SmartPath](https://www.linkedin.com/company/smartpath-id)

### Development Team

For technical questions or bug reports:

- **Technical Support:** [WA Support](https://wa.me/6282277492956)

---

## Acknowledgments

- **SmartPath Team** - For building an impactful education platform

---

<div align="center">
  <p>Empowering Careers, Transforming Lives</p>
</div>
