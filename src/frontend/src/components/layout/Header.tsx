import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Droplets,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useCart } from "../../hooks/use-cart";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
] as const;

export function Header() {
  const { itemCount } = useCart();
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isAdmin,
    login,
    logout,
  } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="header.logo_link"
          >
            <div className="bg-primary rounded-xl p-1.5">
              <Droplets className="size-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              SuperSip
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                activeProps={{ className: "text-foreground bg-muted" }}
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                activeProps={{ className: "text-foreground bg-muted" }}
                data-ocid="nav.admin_link"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => navigate({ to: "/cart" })}
              aria-label={`Cart, ${itemCount} items`}
              data-ocid="header.cart_button"
            >
              <ShoppingCart className="size-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-[10px] font-bold rounded-full bg-primary text-primary-foreground border-0">
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </Button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full gap-1.5 font-body"
                  onClick={() => navigate({ to: "/account" })}
                  data-ocid="header.account_button"
                >
                  <User className="size-4" />
                  Account
                </Button>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => navigate({ to: "/admin" })}
                    aria-label="Admin dashboard"
                    data-ocid="header.admin_button"
                  >
                    <LayoutDashboard className="size-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:text-destructive"
                  onClick={logout}
                  aria-label="Logout"
                  data-ocid="header.logout_button"
                >
                  <LogOut className="size-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="rounded-full px-5 gap-2 font-body"
                onClick={login}
                disabled={isInitializing || isLoggingIn}
                data-ocid="header.login_button"
              >
                <User className="size-4" />
                {isInitializing
                  ? "Loading..."
                  : isLoggingIn
                    ? "Signing in..."
                    : "Sign in"}
              </Button>
            )}
          </div>

          {/* Mobile: cart + burger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => navigate({ to: "/cart" })}
              aria-label={`Cart, ${itemCount} items`}
              data-ocid="mobile.cart_button"
            >
              <ShoppingCart className="size-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-[10px] font-bold rounded-full bg-primary text-primary-foreground border-0">
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-ocid="mobile.menu_button"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => setMobileOpen(false)}
              data-ocid={`mobile.nav.${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => setMobileOpen(false)}
              data-ocid="mobile.nav.admin_link"
            >
              Admin Dashboard
            </Link>
          )}
          <div className={cn("pt-2 border-t border-border mt-2")}>
            {isAuthenticated ? (
              <div className="flex flex-col gap-1">
                <Link
                  to="/account"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="mobile.nav.account_link"
                >
                  <User className="size-4" />
                  My Account
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-smooth w-full text-left"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  data-ocid="mobile.logout_button"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <Button
                size="sm"
                className="w-full rounded-xl gap-2 font-body"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                disabled={isInitializing || isLoggingIn}
                data-ocid="mobile.login_button"
              >
                <User className="size-4" />
                {isInitializing
                  ? "Loading..."
                  : "Sign in with Internet Identity"}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
