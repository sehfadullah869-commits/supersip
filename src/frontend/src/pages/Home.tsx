import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Droplets, Leaf, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { ProductCardSkeleton } from "../components/ui/LoadingSpinner";
import { ProductCard } from "../components/ui/ProductCard";
import { useProducts } from "../hooks/use-backend";
import { Category } from "../types";

const features = [
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description:
      "Every sip is crafted from the finest natural ingredients, no artificial additives.",
  },
  {
    icon: Zap,
    title: "Energizing Blends",
    description:
      "Cold brews and juices designed to refresh and energize your day.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Rigorously tested to ensure premium quality in every bottle.",
  },
  {
    icon: Droplets,
    title: "Pure Hydration",
    description:
      "Mountain-sourced mineral water for the purest hydration experience.",
  },
];

const categories = [
  {
    value: Category.ColdDrink,
    label: "Cold Drinks",
    emoji: "🧃",
    color: "bg-secondary/10 border-secondary/20",
  },
  {
    value: Category.MineralWater,
    label: "Mineral Water",
    emoji: "💧",
    color: "bg-primary/10 border-primary/20",
  },
  {
    value: Category.Juice,
    label: "Fresh Juices",
    emoji: "🍊",
    color: "bg-accent/10 border-accent/20",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { data: products = [], isLoading, error, refetch } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative bg-card overflow-hidden min-h-[70vh] flex items-center">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/15 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <Badge
              variant="outline"
              className="text-primary border-primary/40 bg-primary/5 font-body px-3 py-1 rounded-full"
            >
              🌿 100% Natural Beverages
            </Badge>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              Refreshingly <span className="text-primary">Bright.</span>
              <br />
              Everyday.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Experience vibrant flavors crafted from natural ingredients. From
              icy cold drinks to pure mineral water — SuperSip has your perfect
              sip.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full px-8 gap-2 font-body text-base shadow-elevated"
                onClick={() => navigate({ to: "/products", search: {} })}
                data-ocid="hero.shop_button"
              >
                Shop All Drinks
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-body text-base"
                onClick={() => {
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                data-ocid="hero.explore_button"
              >
                Explore Categories
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex justify-center"
          >
            <img
              src="/assets/generated/hero-beverages.dim_800x800.png"
              alt="SuperSip premium beverages collection"
              className="w-full max-w-lg rounded-3xl shadow-elevated object-cover aspect-square"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="categories" className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-display-md text-foreground mb-3">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Pick your favorite type of refreshment
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to="/products"
                  search={{ category: cat.value, q: undefined }}
                  className={`flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 ${cat.color} hover:shadow-elevated transition-smooth group`}
                  data-ocid={`category.${cat.value.toLowerCase()}_link`}
                >
                  <span className="text-5xl group-hover:scale-110 transition-smooth">
                    {cat.emoji}
                  </span>
                  <span className="font-display font-semibold text-foreground">
                    {cat.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-display-md text-foreground mb-1">
                Featured Drinks
              </h2>
              <p className="text-muted-foreground text-sm">
                Our most-loved refreshments
              </p>
            </motion.div>
            <Button
              variant="ghost"
              className="rounded-full gap-1.5 font-body hidden sm:flex"
              onClick={() => navigate({ to: "/products" })}
              data-ocid="featured.view_all_button"
            >
              View all <ArrowRight className="size-4" />
            </Button>
          </div>

          {error ? (
            <ErrorMessage onRetry={() => refetch()} />
          ) : isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["a", "b", "c", "d"] as const).map((k) => (
                <ProductCardSkeleton key={`home-sk-${k}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button
              variant="outline"
              className="rounded-full px-8 font-body"
              onClick={() => navigate({ to: "/products" })}
              data-ocid="featured.view_all_mobile_button"
            >
              View all products
            </Button>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md text-foreground mb-3">
              Why SuperSip?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We believe every drink should be an experience worth savoring.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
              >
                <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
                  <feat.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <h2 className="font-display text-4xl font-extrabold text-primary-foreground leading-tight">
              Ready to sip something amazing?
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Discover our full range of natural beverages and find your perfect
              drink.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-10 font-body text-base shadow-elevated"
              onClick={() => navigate({ to: "/products" })}
              data-ocid="cta.shop_button"
            >
              Shop Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
