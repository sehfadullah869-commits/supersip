import { Link } from "@tanstack/react-router";
import { Droplets } from "lucide-react";
import { SiInstagram, SiX } from "react-icons/si";

const year = new Date().getFullYear();
const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-xl p-1.5">
                <Droplets className="size-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                SuperSip
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Premium beverages crafted from natural ingredients. Refreshingly
              bright, every sip.
            </p>
            <div className="flex gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SuperSip on X"
                className="bg-muted hover:bg-muted/70 text-foreground rounded-full p-2 transition-smooth"
              >
                <SiX className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SuperSip on Instagram"
                className="bg-muted hover:bg-muted/70 text-foreground rounded-full p-2 transition-smooth"
              >
                <SiInstagram className="size-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground text-sm">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/products"
                  search={{}}
                  className="hover:text-foreground transition-colors"
                  data-ocid="footer.products_link"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  search={{ category: "ColdDrink" }}
                  className="hover:text-foreground transition-colors"
                >
                  Cold Drinks
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  search={{ category: "MineralWater" }}
                  className="hover:text-foreground transition-colors"
                >
                  Mineral Water
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  search={{ category: "Juice" }}
                  className="hover:text-foreground transition-colors"
                >
                  Juices
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground text-sm">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/account"
                  className="hover:text-foreground transition-colors"
                  data-ocid="footer.account_link"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-foreground transition-colors"
                  data-ocid="footer.cart_link"
                >
                  Cart
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/60 text-xs">
                  hello@supersip.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} SuperSip. All rights reserved.</span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
