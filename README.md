# Portfolio - Sebastian Golab

A modern, performant portfolio website showcasing projects, experience, and professional journey. Built with Next.js 13 App Router, TypeScript, and DatoCMS for dynamic content management.

**Live Site:** [sebastiangolab.pl](http://sebastiangolab.pl/)

## 🚀 Tech Stack

### Core

- **[Next.js 13.4.7](https://nextjs.org/)** - React framework with App Router
- **[React 18.2.0](https://react.dev/)** - UI library
- **[TypeScript 5.1.6](https://www.typescriptlang.org/)** - Type safety with strict mode
- **[Node.js 20.17.0](https://nodejs.org/)** - Runtime environment

### Styling

- **[Sass](https://sass-lang.com/)** - CSS preprocessor with global variables
- **Custom Design System** - Consistent colors, typography, and spacing tokens

### Data & Services

- **[DatoCMS](https://www.datocms.com/)** - Headless CMS with GraphQL API
- **[Nodemailer](https://nodemailer.com/)** - Server-side email sending via SMTP

### Testing

- **[Vitest 2.1.8](https://vitest.dev/)** - Fast unit test runner
- **[React Testing Library 16.1.0](https://testing-library.com/)** - Component testing
- **[MSW 2.8.0](https://mswjs.io/)** - API mocking
- **[Happy DOM 17.0.0](https://github.com/capricorn86/happy-dom)** - Lightweight DOM simulation

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js 13 App Router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── about-me/     # About page
│   │   ├── projects/     # Projects listing
│   │   ├── contact/      # Contact page
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable UI components
│   ├── sections/         # Page-specific sections
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and API clients
│   ├── styles/           # Global styles and variables
│   ├── assets/           # Images and icons
│   └── tests/             # Test setup and mocks
├── public/               # Static files
├── dist/                 # Production build output
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js 20.17.0** - Use [nvm](https://github.com/nvm-sh/nvm) for version management:
   ```bash
   nvm use
   ```
- **npm** - Package manager (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sebastiangolab/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # DatoCMS Configuration
   DATOCMS_API_TOKEN=your_datocms_token
   DATOCMS_ENVIRONMENT=main

   # Nodemailer SMTP Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=admin@example.com
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production (outputs to dist/)
npm start           # Run production build

# Code Quality
npm run lint        # Run ESLint checks

# Testing
npm test            # Run all tests once (CI mode)
npm run test:watch  # Run tests in watch mode
npm run test:ui     # Open Vitest UI in browser
npm run test:coverage  # Generate coverage report
```

## 🧪 Testing

For detailed testing guidelines, see [src/tests/README.md](src/tests/README.md).

## 🏗️ Key Architecture Patterns

### Component Structure

- Each component has its own folder with `index.tsx` and `.scss`
- Co-located tests (e.g., `Button/index.test.tsx`)
- Props exported as interfaces for reusability

### Data Fetching

- DatoCMS integration via GraphQL
- Custom hooks for data management ([useRealizations.ts](src/hooks/useRealizations.ts))
- React cache for optimal performance

### Styling

- Sass modules with global variables
- Design tokens for consistency (colors, fonts, breakpoints)
- Mobile-first responsive approach

## 🌍 Environment Variables

Server-side environment variables (used in API routes):

### DatoCMS Configuration

| Variable              | Description                 | Required |
| --------------------- | --------------------------- | -------- |
| `DATOCMS_API_TOKEN`   | DatoCMS read-only API token | Yes      |
| `DATOCMS_ENVIRONMENT` | DatoCMS environment name    | No       |

### Email Configuration (Nodemailer SMTP)

| Variable      | Description                                          | Required |
| ------------- | ---------------------------------------------------- | -------- |
| `SMTP_HOST`   | SMTP server hostname (e.g., `smtp.gmail.com`)        | Yes      |
| `SMTP_PORT`   | SMTP server port (587 for TLS, 465 for SSL)          | Yes      |
| `SMTP_SECURE` | Use SSL connection (`true` for 465, `false` for 587) | Yes      |
| `SMTP_USER`   | SMTP authentication username                         | Yes      |
| `SMTP_PASS`   | SMTP authentication password                         | Yes      |
| `EMAIL_FROM`  | Sender email address (must be verified)              | Yes      |
| `EMAIL_TO`    | Recipient email for contact form submissions         | Yes      |

## 📧 Contact

**Sebastian Golab**

- Email: sebagolab97@gmail.com
- Website: [sebastiangolab.pl](http://sebastiangolab.pl/)
- GitHub: [@sebastiangolab](https://github.com/sebastiangolab)

## 📄 License

This project is private and proprietary.

---

Built with ❤️
