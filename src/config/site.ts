// src/config/site.ts

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export const siteConfig = {
  name: "ParcelGuard",
  description:
    "Smart Courier Intelligence & Fraud Prevention Platform for E-Commerce Merchants in Bangladesh.",
  url: "https://parcelguard.bd",
  ogImage: "https://parcelguard.bd/og.png",
  links: {
    github: "https://github.com",
    docs: "https://parcelguard.bd/docs",
  },
  navItems: [
    { title: "Dashboard", href: "/" },
    { title: "Fraud Checker", href: "/fraud-checker" },
    { title: "Parcels", href: "/parcels" },
    { title: "Book Parcel", href: "/book-parcel" },
    { title: "Bulk Labels", href: "/bulk-labels" },
    { title: "Admin Console", href: "/admin" },
  ] as NavItem[],
};
