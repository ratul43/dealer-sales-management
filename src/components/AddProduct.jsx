
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Check,
  ImagePlus,
  X,
  FileText,
  Tag,
  Package,
  Upload,
  Save,
} from "lucide-react";
import Link from "next/link";

const initialCategories = [
  "Jacket",
  "T-Shirts",
  "Shirts",
  "Pants",
  "Shoes",
  "Accessories",
];

const sizes = ["XS", "S", "M", "XL", "XXL"];

const inputClass =
  "w-full rounded-xl border border-transparent bg-[#F0F0F0] px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-green-100";

const labelClass = "mb-1.5 block text-xs font-medium text-gray-800";

export default function AddProduct({
  onSubmitProduct,
  onSaveDraft,
}) {
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [gender, setGender] = useState("Men");
  const [category, setCategory] = useState("Jacket");

  const [form, setForm] = useState({
    name: "Puffer Jacket With Pocket Detail",
    description:
      "Cropped puffer jacket made of technical fabric. High neck and long sleeves. Flap pocket at the chest and in-seam side pockets at the hip. Inside pocket detail. Hem with elastic interior. Zip-up front.",
    basePrice: "47.55",
    stock: "77",
    discount: "10",
    discountType: "Chinese New Year Discount",
  });

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImageUpload(event) {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    const remaining = Math.max(0, 5 - images.length);
    const newImages = validFiles.slice(0, remaining).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((previous) => [...previous, ...newImages]);

    if (images.length === 0 && newImages.length > 0) {
      setSelectedImage(0);
    }

    event.target.value = "";
  }

  function removeImage(id) {
    setImages((previous) => {
      const removedIndex = previous.findIndex((image) => image.id === id);
      const removed = previous[removedIndex];

      if (removed) URL.revokeObjectURL(removed.url);

      const next = previous.filter((image) => image.id !== id);

      setSelectedImage((current) => {
        if (next.length === 0) return 0;
        if (removedIndex < current) return current - 1;
        return Math.min(current, next.length - 1);
      });

      return next;
    });
  }

  function toggleSize(size) {
    setSelectedSizes((previous) =>
      previous.includes(size)
        ? previous.filter((item) => item !== size)
        : [...previous, size]
    );
  }

  function addCategory() {
    const value = newCategory.trim();

    if (!value) return;

    const existing = categories.find(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    if (existing) {
      setCategory(existing);
    } else {
      setCategories((previous) => [...previous, value]);
      setCategory(value);
    }

    setNewCategory("");
    setShowCategoryInput(false);
  }

  function getProductData() {
    return {
      ...form,
      basePrice: Number(form.basePrice),
      stock: Number(form.stock),
      discount: Number(form.discount),
      category,
      gender,
      sizes: selectedSizes,
      images: images.map((image) => image.file),
    };
  }

  async function handleDraft() {
    setNotice("");

    try {
      if (onSaveDraft) {
        await onSaveDraft(getProductData());
      }

      setNotice(
        onSaveDraft
          ? "Draft saved successfully."
          : "Draft prepared. Connect onSaveDraft to save it permanently."
      );
    } catch {
      setNotice("Could not save the draft. Please try again.");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    if (!form.name.trim()) {
      setNotice("Please enter a product name.");
      return;
    }

    if (!category) {
      setNotice("Please select a category.");
      return;
    }

    if (!Number.isFinite(Number(form.basePrice)) || Number(form.basePrice) < 0) {
      setNotice("Enter a valid product price.");
      return;
    }

    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
      setNotice("Stock must be a non-negative whole number.");
      return;
    }

    if (
      form.discount !== "" &&
      (!Number.isFinite(Number(form.discount)) ||
        Number(form.discount) < 0 ||
        Number(form.discount) > 100)
    ) {
      setNotice("Discount must be between 0 and 100.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmitProduct) {
        await onSubmitProduct(getProductData());
        setNotice("Product submitted successfully.");
      } else {
        setNotice(
          "Product details are ready. Connect onSubmitProduct to save them to your database."
        );
      }
    } catch {
      setNotice("Could not add the product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-gray-900">
      {/* Page heading */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
            <Package size={19} />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Add New Product
            </h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Create and manage your product inventory.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          <button
            type="button"
            onClick={handleDraft}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
          >
            <Save size={16} />
            Save Draft
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#9BE8A6] px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-[#83D990] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Check size={17} />
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </header>

      {notice && (
        <div
          role="status"
          className="flex items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main responsive grid */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-5">
        {/* Left column */}
        <div className="space-y-5 xl:col-span-3">
          {/* General information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <FileText size={18} className="text-gray-500" />
              <h2 className="text-sm font-semibold sm:text-base">
                General Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="product-name" className={labelClass}>
                  Product Name
                </label>
                <input
                  id="product-name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter product name"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="product-description" className={labelClass}>
                  Product Description
                </label>
                <textarea
                  id="product-description"
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  placeholder="Describe your product..."
                  rows={5}
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Sizes */}
                <fieldset>
                  <legend className={labelClass}>Size</legend>
                  <p className="mb-2 text-[11px] text-gray-400">
                    Pick available sizes
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {sizes.map((size) => {
                      const active = selectedSizes.includes(size);

                      return (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleSize(size)}
                          className={`min-w-10 rounded-md border px-3 py-2 text-xs font-medium transition ${
                            active
                              ? "border-[#9BE8A6] bg-[#9BE8A6] text-gray-900"
                              : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Gender */}
                <fieldset>
                  <legend className={labelClass}>Gender</legend>
                  <p className="mb-3 text-[11px] text-gray-400">
                    Pick available gender
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {["Men", "Woman", "Unisex"].map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-1.5 text-xs text-gray-700"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={gender === option}
                          onChange={() => setGender(option)}
                          className="size-3.5 accent-[#8ADB98]"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </section>

          {/* Pricing and stock */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Tag size={18} className="text-gray-500" />
              <h2 className="text-sm font-semibold sm:text-base">
                Pricing and Stock
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="base-price" className={labelClass}>
                  Base Price (৳)
                </label>
                <input
                  id="base-price"
                  type="number"
                  name="basePrice"
                  min="0"
                  step="0.01"
                  value={form.basePrice}
                  onChange={updateField}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="stock" className={labelClass}>
                  Stock Quantity
                </label>
                <input
                  id="stock"
                  type="number"
                  name="stock"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={updateField}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="discount" className={labelClass}>
                  Discount (%)
                </label>
                <input
                  id="discount"
                  type="number"
                  name="discount"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form.discount}
                  onChange={updateField}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="discount-type" className={labelClass}>
                  Discount Type
                </label>
                <select
                  id="discount-type"
                  name="discountType"
                  value={form.discountType}
                  onChange={updateField}
                  className={inputClass}
                >
                  <option value="No Discount">No Discount</option>
                  <option value="Seasonal Discount">Seasonal Discount</option>
                  <option value="Chinese New Year Discount">
                    Chinese New Year Discount
                  </option>
                  <option value="Wholesale Discount">
                    Wholesale Discount
                  </option>
                  <option value="Promotional Discount">
                    Promotional Discount
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-500">
                  Price after discount
                </span>
                <span className="text-lg font-semibold">
                  ৳
                  {(
                    Math.max(0, Number(form.basePrice) || 0) *
                    (1 -
                      Math.min(
                        100,
                        Math.max(0, Number(form.discount) || 0)
                      ) /
                        100)
                  ).toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-5 xl:col-span-2">
          {/* Image uploader */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold sm:text-base">
                Upload Images
              </h2>
              <span className="text-xs text-gray-400">
                {images.length}/5 images
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-[#F1F1F1] transition hover:bg-gray-100"
            >
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]?.url || images[0].url}
                  alt="Selected product preview"
                  className="h-full w-full object-contain p-3"
                />
              ) : (
                <div className="flex flex-col items-center px-4 text-center">
                  <ImagePlus
                    size={35}
                    strokeWidth={1.4}
                    className="mb-3 text-gray-400"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    Upload product image
                  </span>
                  <span className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP
                  </span>
                </div>
              )}

              {images.length > 0 && (
                <span className="absolute bottom-3 right-3 rounded-lg bg-white/90 p-2 text-gray-700 shadow-sm">
                  <Upload size={16} />
                </span>
              )}
            </button>

            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`group relative aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index
                      ? "border-gray-500"
                      : "border-gray-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Preview image ${index + 1}`}
                    className="size-full bg-gray-50"
                  >
                    <img
                      src={image.url}
                      alt={`Product thumbnail ${index + 1}`}
                      className="size-full object-cover"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute right-1 top-1 rounded-full bg-white p-1 text-gray-700 opacity-100 shadow-sm transition sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {images.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Add another product image"
                  className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400 transition hover:border-gray-500 hover:text-gray-700"
                >
                  <Plus size={21} />
                </button>
              )}
            </div>

            <p className="mt-3 text-xs leading-5 text-gray-400">
              Upload up to 5 product images. Select a thumbnail to preview it.
            </p>
          </section>

          {/* Category */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Tag size={18} className="text-gray-500" />
              <h2 className="text-sm font-semibold sm:text-base">
                Category
              </h2>
            </div>

            <label htmlFor="product-category" className={labelClass}>
              Product Category
            </label>

            <select
              id="product-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={inputClass}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                setShowCategoryInput((previous) => !previous)
              }
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#9BE8A6] px-4 py-2.5 text-xs font-semibold text-gray-900 transition hover:bg-[#83D990]"
            >
              <Plus size={15} />
              Add Category
            </button>

            {showCategoryInput && (
              <div className="mt-4 space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <label
                  htmlFor="new-category"
                  className={labelClass}
                >
                  New category name
                </label>

                <input
                  id="new-category"
                  value={newCategory}
                  onChange={(event) =>
                    setNewCategory(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addCategory();
                    }
                  }}
                  placeholder="e.g. Winter Wear"
                  className={inputClass}
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={addCategory}
                    className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-700"
                  >
                    Save Category
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryInput(false);
                      setNewCategory("");
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Summary */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-sm font-semibold">Product Summary</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Category</span>
                <span className="font-medium">{category}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Sizes selected</span>
                <span className="font-medium">
                  {selectedSizes.length
                    ? selectedSizes.join(", ")
                    : "None"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Gender</span>
                <span className="font-medium">{gender}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Images</span>
                <span className="font-medium">{images.length} / 5</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
