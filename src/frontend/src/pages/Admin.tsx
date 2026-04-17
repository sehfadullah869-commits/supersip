import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShoppingBag,
  ToggleRight,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import {
  LoadingSpinner,
  ProductCardSkeleton,
} from "../components/ui/LoadingSpinner";
import {
  useAllOrders,
  useAllProductsAdmin,
  useCreateProduct,
  useDeleteProduct,
  useUpdateOrderStatus,
  useUpdateProduct,
} from "../hooks/use-backend";
import { Category, OrderStatus } from "../types";
import type { Product, UpdateProductInput } from "../types";
import { formatDate, formatOrderStatus, formatPrice } from "../utils/format";

// ── Product Form ──────────────────────────────────────────────────────────────
const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  imageUrl: "",
  category: Category.ColdDrink,
  isActive: true,
};

function ProductFormDialog({
  open,
  onClose,
  product,
}: { open: boolean; onClose: () => void; product?: Product }) {
  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          description: product.description,
          price: (Number(product.price) / 100).toFixed(2),
          stock: product.stock.toString(),
          imageUrl: product.imageUrl,
          category: product.category,
          isActive: product.isActive,
        }
      : emptyForm,
  );
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isEditing = !!product;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const price = BigInt(Math.round(Number.parseFloat(form.price) * 100));
      const stock = BigInt(Number.parseInt(form.stock));
      if (isEditing && product) {
        await updateProduct.mutateAsync({
          id: product.id,
          name: form.name,
          description: form.description,
          price,
          stock,
          imageUrl: form.imageUrl,
          category: form.category,
          isActive: form.isActive,
        } as UpdateProductInput);
        toast.success("Product updated");
      } else {
        await createProduct.mutateAsync({
          name: form.name,
          description: form.description,
          price,
          stock,
          imageUrl: form.imageUrl,
          category: form.category,
        });
        toast.success("Product created");
      }
      onClose();
    } catch {
      toast.error(
        isEditing ? "Failed to update product" : "Failed to create product",
      );
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg" data-ocid="admin.product_dialog">
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                data-ocid="admin.product_name_input"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="resize-none"
                rows={2}
                data-ocid="admin.product_description_textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                data-ocid="admin.product_price_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
                data-ocid="admin.product_stock_input"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                data-ocid="admin.product_image_input"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm({ ...form, category: v as Category })
                }
              >
                <SelectTrigger data-ocid="admin.product_category_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Category.ColdDrink}>Cold Drink</SelectItem>
                  <SelectItem value={Category.MineralWater}>
                    Mineral Water
                  </SelectItem>
                  <SelectItem value={Category.Juice}>Juice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="admin.product_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="admin.product_submit_button"
            >
              {isPending ? (
                <LoadingSpinner size="sm" />
              ) : isEditing ? (
                "Save changes"
              ) : (
                "Create product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleteConfirmId, setDeleteConfirmId] = useState<bigint | null>(null);
  const [productSearch, setProductSearch] = useState("");

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useAllProductsAdmin();
  const {
    data: orders = [],
    isLoading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useAllOrders(true);
  const deleteProduct = useDeleteProduct();
  const updateOrderStatus = useUpdateOrderStatus();

  const filteredProducts = productSearch.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()),
      )
    : products;

  const handleDelete = async (id: bigint) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
      setDeleteConfirmId(null);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateOrderStatus.mutateAsync({ id: orderId, status });
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update order status");
    }
  };

  const stats = [
    {
      icon: Package,
      label: "Total Products",
      value: products.length,
      color: "text-primary",
    },
    {
      icon: ToggleRight,
      label: "Active Products",
      value: products.filter((p) => p.isActive).length,
      color: "text-secondary",
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: orders.length,
      color: "text-accent-foreground",
    },
    {
      icon: TrendingUp,
      label: "Revenue",
      value: formatPrice(orders.reduce((sum, o) => sum + o.total, 0n)),
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-display-lg text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage products and orders
            </p>
          </div>
          <Button
            className="rounded-full gap-2 font-body"
            onClick={() => {
              setEditingProduct(undefined);
              setProductDialogOpen(true);
            }}
            data-ocid="admin.add_product_button"
          >
            <Plus className="size-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="bg-card rounded-2xl p-5 border border-border/50 shadow-card"
            >
              <div className={`${stat.color} mb-2`}>
                <stat.icon className="size-5" />
              </div>
              <div className="font-display font-bold text-foreground text-xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs mt-0.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="rounded-full h-10" data-ocid="admin.tabs">
            <TabsTrigger
              value="products"
              className="rounded-full"
              data-ocid="admin.products_tab"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="rounded-full"
              data-ocid="admin.orders_tab"
            >
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products…"
                  className="pl-9 rounded-full"
                  data-ocid="admin.products_search_input"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => refetchProducts()}
                aria-label="Refresh products"
              >
                <RefreshCw className="size-4" />
              </Button>
            </div>

            {productsError ? (
              <ErrorMessage onRetry={() => refetchProducts()} />
            ) : productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
                  <ProductCardSkeleton key={`admin-sk-${k}`} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No products found"
                description="Add your first product to get started."
                action={{
                  label: "Add product",
                  onClick: () => setProductDialogOpen(true),
                }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id.toString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
                    data-ocid={`admin.product.item.${i + 1}`}
                  >
                    <div className="bg-muted h-40 relative">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="size-10 text-muted-foreground/40" />
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className={`absolute top-2 right-2 text-xs rounded-full ${product.isActive ? "bg-card border-primary/30 text-primary" : "bg-card border-muted-foreground/30 text-muted-foreground"}`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-display font-semibold text-foreground text-sm truncate">
                            {product.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {product.category} · Stock:{" "}
                            {product.stock.toString()}
                          </p>
                        </div>
                        <span className="font-display font-bold text-foreground text-sm shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 rounded-full gap-1 font-body text-xs"
                          onClick={() => {
                            setEditingProduct(product);
                            setProductDialogOpen(true);
                          }}
                          data-ocid={`admin.product.edit_button.${i + 1}`}
                        >
                          <Edit className="size-3" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 rounded-full gap-1 font-body text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteConfirmId(product.id)}
                          data-ocid={`admin.product.delete_button.${i + 1}`}
                        >
                          <Trash2 className="size-3" /> Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-3">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => refetchOrders()}
                aria-label="Refresh orders"
              >
                <RefreshCw className="size-4" />
              </Button>
            </div>
            {ordersError ? (
              <ErrorMessage onRetry={() => refetchOrders()} />
            ) : ordersLoading ? (
              <LoadingSpinner size="lg" className="py-12" />
            ) : orders.length === 0 ? (
              <EmptyState
                icon={ShoppingBag}
                title="No orders yet"
                description="Orders from customers will appear here."
              />
            ) : (
              <div className="space-y-3">
                {orders.map((order, i) => (
                  <div
                    key={order.id.toString()}
                    className="bg-card rounded-2xl p-5 border border-border/50 shadow-card"
                    data-ocid={`admin.order.item.${i + 1}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-display font-semibold text-foreground text-sm">
                            Order #{order.id.toString()}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-xs rounded-full px-2"
                          >
                            {order.items.length} items
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {formatDate(order.createdAt)} ·{" "}
                          {formatPrice(order.total)}
                        </p>
                        <p className="text-muted-foreground text-xs truncate max-w-sm">
                          {order.deliveryAddress}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Select
                          value={order.status}
                          onValueChange={(v) =>
                            handleStatusChange(order.id, v as OrderStatus)
                          }
                        >
                          <SelectTrigger
                            className="w-36 h-8 text-xs rounded-full"
                            data-ocid={`admin.order.status_select.${i + 1}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(OrderStatus).map((s) => (
                              <SelectItem key={s} value={s} className="text-xs">
                                {formatOrderStatus(s)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Form Dialog */}
      <ProductFormDialog
        open={productDialogOpen}
        onClose={() => {
          setProductDialogOpen(false);
          setEditingProduct(undefined);
        }}
        product={editingProduct}
      />

      {/* Delete Confirm Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={(v) => !v && setDeleteConfirmId(null)}
      >
        <DialogContent data-ocid="admin.delete_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              data-ocid="admin.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteConfirmId !== null && handleDelete(deleteConfirmId)
              }
              disabled={deleteProduct.isPending}
              data-ocid="admin.delete_confirm_button"
            >
              {deleteProduct.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
