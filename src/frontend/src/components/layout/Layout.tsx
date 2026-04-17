import { Toaster } from "@/components/ui/sonner";
import type React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  /** If true, removes the max-width container from main (for full-bleed layouts) */
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className={fullWidth ? "flex-1" : "flex-1"}>{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
