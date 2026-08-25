import React from "react";
import { siteConfig } from "@/config/site";
import { Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              {siteConfig.name}
            </span>
          </div>

          <p className="text-center text-xs text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Built with Next.js 16, React 19, TypeScript & Tailwind CSS.
          </p>

          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
