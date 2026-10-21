
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Package,
  ChevronDown,
  X,
  Boxes,
  AlertTriangle,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Premium Rice 25kg",
    category: "Groceries",
    supplier: "Rahman Traders",
    price: 1850,
    stock: 120,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=160&h=160&fit=crop",
  },
  {
    id: 2,
    name: "Sunflower Oil 5L",
    category: "Beverages & Oils",
    supplier: "Fresh Distributors",
    price: 950,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=160&h=160&fit=crop",
  },
  {
    id: 3,
    name: "Washing Powder 2kg",
    category: "Household",
    supplier: "Global Supply Co.",
    price: 420,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=160&h=160&fit=crop",
  },
  {
    id: 4,
    name: "Mineral Water 1.5L",
    category: "Beverages",
    supplier: "Blue Water Ltd.",
    price: 35,
    stock: 240,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=160&h=160&fit=crop",
  },
  {
    id: 5,
    name: "Bathing Soap Pack",
    category: "Personal Care",
    supplier: "Care Distributors",
    price: 280,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=160&h=160&fit=crop",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);

function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
        <span className="size-1.5 rounded-full bg-red-500" />
        Out of stock
      </span>
    );
  }

  if (stock <= 15) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
        <span className="size-1.5 rounded-full bg-amber-500" />
        Low stock · {stock}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      <span className="size-1.5 rounded-full bg-emerald-500" />
      In stock · {stock}
    </span>
  );
}

const emptyForm = {
  name: "",
  category: "",
  supplier: "",
  price: "",
  stock: "",
  image: "",
};

export default function ProductList({ onAddProduct, onEditProduct }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = [
        product.name,
        product.category,
        product.supplier,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesCategory =
        category === "All categories" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= 15
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  function openEdit(product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      supplier: product.supplier,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image,
    });
  }

  function saveProduct(event) {
    event.preventDefault();

    const updatedProduct = {
      ...editingProduct,
      name: form.name.trim(),
      category: form.category.trim(),
      supplier: form.supplier.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image.trim() || editingProduct.image,
    };

    setProducts((current) =>
      current.map((product) =>
        product.id === editingProduct.id
          ? updatedProduct
          : product
      )
    );

    onEditProduct?.(updatedProduct);
    setEditingProduct(null);
  }

  function handleAddProduct() {
    if (onAddProduct) {
      onAddProduct();
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: "New Product",
      category: "Uncategorized",
      supplier: "Add supplier",
      price: 0,
      stock: 0,
      image: "",
    };

    setProducts((current) => [newProduct, ...current]);
    openEdit(newProduct);
  }

  return (
    <section className="min-w-0 space-y-5 text-gray-900">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Products
            </h1>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              {products.length} items
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Manage your products, suppliers, pricing and inventory.
          </p>
        </div>

        <button
          onClick={handleAddProduct}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          <Plus size={17} />
          Add product
        </button>
      </div>

      {/* Inventory summary */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          icon={Package}
          label="Total products"
          value={products.length}
          description="Products in your catalog"
        />
        <SummaryCard
          icon={AlertTriangle}
          label="Low stock"
          value={lowStock}
          description="15 units or fewer"
          warning
        />
        <SummaryCard
          icon={Boxes}
          label="Out of stock"
          value={outOfStock}
          description="Needs replenishment"
          danger
        />
      </div>

      {/* Search and filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, suppliers..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          <div className="relative sm:w-56">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm text-gray-700 outline-none focus:border-gray-400"
            >
              <option>All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50/80">
              <tr>
                {[
                  "Product",
                  "Category",
                  "Supplier",
                  "Price",
                  "Stock status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <ProductIdentity product={product} />
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {product.supplier}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold tabular-nums">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-5 py-4">
                    <StockBadge stock={product.stock} />
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => openEdit(product)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ListFooter count={filteredProducts.length} total={products.length} />
      </div>

      {/* Responsive mobile cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <ProductImage product={product} large />
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {product.category}
                </p>
                <p className="mt-2 break-words text-xs text-gray-500">
                  Supplier: {product.supplier}
                </p>
              </div>
              <button
                onClick={() => openEdit(product)}
                aria-label={`Edit ${product.name}`}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-medium hover:bg-gray-50"
              >
                <Pencil size={13} />
                Edit
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-gray-500">Selling price</p>
                <p className="mt-1 text-base font-semibold">
                  {formatPrice(product.price)}
                </p>
              </div>
              <StockBadge stock={product.stock} />
            </div>
          </article>
        ))}

        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 text-xs text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
          <Package className="mx-auto text-gray-400" size={30} />
          <h3 className="mt-3 font-medium">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try a different product name or category.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All categories");
            }}
            className="mt-4 text-sm font-medium underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Edit product modal */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setEditingProduct(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-product-title"
            className="max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  id="edit-product-title"
                  className="text-lg font-semibold"
                >
                  Edit product
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your product information.
                </p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                aria-label="Close edit form"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={saveProduct} className="space-y-4">
              {[
                { label: "Product name", key: "name", required: true },
                { label: "Category", key: "category", required: true },
                { label: "Supplier", key: "supplier", required: true },
                { label: "Image URL", key: "image", required: false },
              ].map((field) => (
                <label key={field.key} className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    {field.label}
                  </span>
                  <input
                    required={field.required}
                    value={form[field.key]}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </label>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    Price (৳)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={form.price}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        price: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                  />
                </label>

                <label>
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    Stock quantity
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={form.stock}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        stock: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                  />
                </label>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  warning,
  danger,
}) {
  const iconStyle = danger
    ? "bg-red-50 text-red-600"
    : warning
    ? "bg-amber-50 text-amber-600"
    : "bg-gray-100 text-gray-700";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">
            {value}
          </p>
        </div>
        <div className={`rounded-lg p-2.5 ${iconStyle}`}>
          <Icon size={19} />
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function ProductImage({ product, large = false }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 ${
        large ? "size-[76px]" : "size-12"
      }`}
    >
      {product.image && !imageFailed ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <Package size={large ? 26 : 20} className="text-gray-400" />
      )}
    </div>
  );
}

function ProductIdentity({ product }) {
  return (
    <div className="flex min-w-[200px] items-center gap-3">
      <ProductImage product={product} />
      <div className="min-w-0">
        <p className="max-w-[220px] truncate text-sm font-medium text-gray-900">
          {product.name}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          SKU: PRD-{String(product.id).padStart(4, "0")}
        </p>
      </div>
    </div>
  );
}

function ListFooter({ count, total }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 text-xs text-gray-500">
      <span>
        Showing {count} of {total} products
      </span>
      <span>Inventory management</span>
    </div>
  );
}
