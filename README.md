# 🛡️ ParcelGuard — Smart Courier Intelligence & Fraud Prevention

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Analytics-Recharts-22c55e?style=for-the-badge)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**ParcelGuard** is a next-generation logistics intelligence and courier fraud prevention SaaS tailored for Bangladeshi E-Commerce & F-Commerce merchants. It integrates multi-courier APIs (**Steadfast, Pathao, RedX, Paperfly**), scores customer return risks in real-time, automates Cash on Delivery (COD) payment reconciliation, and generates thermal shipping labels in bulk.

---

## 🌟 Key Features

### 🔍 1. Real-Time Customer Fraud Scoring Engine
- Evaluates Bangladeshi mobile numbers (`013–019`) against cross-merchant delivery histories.
- Visual risk gauge (0–100 score) categorized into **Safe**, **Moderate**, and **High Risk**.
- Actionable delivery strategy recommendations (e.g. advance delivery charge requirement).
- Batch phone risk scanner via CSV / multiline text input.

### 📦 2. Multi-Step Parcel Booking & Live Rate Comparison
- 4-step wizard with real-time recipient phone risk scoring.
- Live carrier fee comparison across **Steadfast (৳110)**, **Pathao (৳120)**, **RedX (৳130)**, and **Paperfly (৳115)**.
- Instant tracking number generation & dispatch simulation.

### 🖨️ 3. Bulk 4x6 Thermal Barcode Label Generation
- High-resolution 4x6 thermal barcode labels formatted for packing and dispatch.
- Supports single and multi-parcel batch selection with instant printable layout (`window.print`).

### 📊 4. Bulk CSV Order Import & Automated Validation
- Drag-and-drop CSV / Excel spreadsheet order importer.
- Instant data validation checking for 11-digit phone formats, address presence, and COD values.
- Built-in modal for quick inline cell editing and one-click bulk booking.

### 📍 5. Live Tracking & Rider Milestone Timeline
- Step-by-step parcel movement tracking from pickup to doorstep delivery.
- Assigned rider contact card with direct call capability and carrier badge.

### 💰 6. COD Reconciliation & Shortage Dispute Desk
- Bi-weekly settlement cycle auditing comparing expected COD vs. received payouts.
- Automatic detection of uncredited deductions or missing remittances.
- 1-click dispute ticket submission with courier finance desks.

### 👥 7. Customer Directory & Merchant Watchlist
- Merchant customer database tracking lifetime orders, success rate (%), and returns.
- Custom internal merchant notes and flagged watchlist management.

### 👑 8. Super Admin Platform Console (`/admin`)
- Dark-themed command center with real-time MRR telemetry and transaction ledgers.
- Merchant tenant directory with instant tier switching (**Starter, Growth, Enterprise**) and account suspension.
- Courier API health monitor with latency and failover simulation.
- Central nationwide blacklist fraud database with manual and automated addition tools.
- System push broadcast dispatcher and global maintenance mode toggle.

---

## 🏗️ Architecture & Clean Code Standards

- **App Router Standard**: Built with Next.js 16 App Router using route groups `(auth)`, `(app)`, and `admin`.
- **Strict File Size Limits**: **100% of files are strictly under 200 lines of code** for maximum maintainability.
- **Client/Server Boundary**: React Server Components leveraged for layouts with targeted `'use client'` boundaries for interactive states.
- **Type Safety**: End-to-end TypeScript interfaces covering parcels, settlements, couriers, fraud checks, and admin models.

---

## 📁 Directory Structure

```text
src/
├── app/
│   ├── (auth)/                  # Public auth views (Login, Signup, Forgot Password)
│   ├── (app)/                   # Merchant portal routes (Dashboard, Booking, Labels, etc.)
│   ├── admin/                   # Super Admin command center & platform telemetry
│   ├── globals.css              # Tailwind v4 theme & ParcelGuard design tokens
│   └── layout.tsx               # Root layout with Inter font and AppProviders
├── components/
│   ├── admin/                   # Admin KPI cards, MRR chart, blacklist & merchant modals
│   ├── auth/                    # Auth branding panels & fast-login widgets
│   ├── booking/                 # Multi-step booking headers, steps & success modal
│   ├── bulk-upload/             # Dropzone, validation tables, inline edit modal
│   ├── couriers/                # Courier API key connection modal & cards
│   ├── customers/               # Customer intelligence drawer & directory
│   ├── dashboard/               # KPIs, weekly performance bar chart, pipeline card
│   ├── fraud/                   # Risk report card, gauge meter, batch scan modal
│   ├── help/                    # Support ticket modal & FAQ accordion
│   ├── labels/                  # 4x6 thermal shipping labels & batch selector
│   ├── layout/                  # SidebarNav, GlobalTopSearch, MobileBottomNav, Header
│   ├── parcels/                 # Parcels toolbar, filterable table, slide-over drawer
│   ├── payments/                # Settlement modal & discrepancy dispute modal
│   ├── providers/               # AppProviders wrapper (Auth, Data, Admin contexts)
│   ├── reports/                 # Analytics area, pie, and horizontal bar charts
│   ├── settings/                # Store profile, API keys, and notification toggles
│   ├── subscription/            # Plan tier cards & bKash/Nagad/Card checkout modal
│   ├── tracking/                # Live timeline milestones & rider sidebar
│   └── ui/                      # Base design system primitives (pg-ui tokens & Shadcn)
├── context/                     # AuthContext, DataContext, AdminContext
├── hooks/                       # Custom hooks (useAuth, useData, useAdmin, use-mobile)
├── data/                        # Initial mock data for merchant & admin consoles
├── lib/                         # SSR-safe dataStorage, risk evaluator, CSV export
├── config/                      # Site metadata & navigation links
└── types/                       # Shared TypeScript interfaces (index.ts, admin.ts)
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nadib-Rana/Next_PareclGyard.git
cd Next_PareclGyard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🔑 Demo Access & Fast Login

For quick testing, use the 1-click login buttons on `/login` or enter the following credentials:

| Role | Email | Password | Access Area |
| :--- | :--- | :--- | :--- |
| **Merchant** | `merchant@store.bd` | `merchant123` | Merchant Portal (`/`) |
| **Super Admin** | `admin@parcelguard.com` | `admin123` | Admin Console (`/admin`) |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Runtime**: React 19 + React DOM 19
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS v4 + PostCSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Persistence**: LocalStorage with SSR safety guards

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
