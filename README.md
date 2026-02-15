# Catalyst E-Commerce

A modern, full-stack e-commerce application built with Next.js 15, featuring server-side rendering, Redux state management, and secure authentication.

## 🚀 Features

- **Authentication**: Secure login/logout with HTTP-only cookies
- **Server-Side Rendering (SSR)**: SEO-friendly product catalog with dynamic metadata
- **Shopping Cart**: Redux Toolkit state management with localStorage persistence
- **Responsive Design**: Mobile-first with touch-friendly controls (44px minimum)
- **TypeScript**: Full type safety across the application
- **Testing**: Unit tests with Jest and React Testing Library

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **State Management**: Redux Toolkit 2.5
- **Styling**: CSS Modules
- **Forms**: React Hook Form 7.54  
- **Testing**: Jest 29.7 + React Testing Library 14
- **API**: DummyJSON

## 🔧 Installation

1. Clone and install:
   ```bash
   git clone https://github.com/yourusername/catalyst-ecommerce.git
   cd catalyst-ecommerce
   npm install
   ```

2. Set up environment:
   ```bash
   cp .env.example .env.local
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

**Test Credentials:** Username: `emilys` / Password: `emilyspass`

## 🚀 Deployment (Vercel)

1. Connect repository to Vercel
2. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://dummyjson.com
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   ```
3. Deploy (auto-deploys on push to main)

## 📱 Features Overview

- **Authentication**: HTTP-only cookies, middleware route protection
- **Cart**: Add/remove items, quantity controls, localStorage persistence
- **SEO**: OpenGraph, Twitter cards, dynamic metadata, sitemap
- **Responsive**: Tablet (768-1024px), Mobile (<768px), Touch-friendly (44px)

## 📄 License

MIT License
