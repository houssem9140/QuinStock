import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartContext from "../CartContext";
import LanguageContext from "../LanguageContext";
import PublicTopbar from "../components/PublicTopbar";
import { categories, getCategoryById, products } from "../data/catalogue";

const heroImage = `${process.env.PUBLIC_URL}/hardware-hero.webp`;

function useFallbackImage(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = heroImage;
}

function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function ClientCatalogue() {
  const cart = useContext(CartContext);
  const { t } = useContext(LanguageContext);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("alpha");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [stockOnly, setStockOnly] = useState(false);
  const selectedCategory = searchParams.get("category") || "all";
  const category = getCategoryById(selectedCategory);
  const isEmbeddedPortal =
    location.pathname.startsWith("/client") || location.pathname.startsWith("/admin");
  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))).sort(),
    []
  );

  useEffect(() => {
    document.title = category
      ? `${t.categoryLabels[category.id]} | QuinStock`
      : `${t.catalogue} | QuinStock`;
  }, [category, t]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return products
      .filter((product) => {
        if (selectedCategory !== "all" && product.categoryId !== selectedCategory) {
          return false;
        }

        if (selectedBrand !== "all" && product.brand !== selectedBrand) {
          return false;
        }

        if (maxPrice && product.price > Number(maxPrice)) {
          return false;
        }

        if (stockOnly && product.stock <= 0) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        return (
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.brand.toLowerCase().includes(normalizedQuery) ||
          product.unit.toLowerCase().includes(normalizedQuery)
        );
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [maxPrice, searchQuery, selectedBrand, selectedCategory, sortBy, stockOnly]);

  const setCategory = (categoryId) => {
    if (categoryId === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category: categoryId });
  };

  return (
    <main className={`col-span-12 min-h-screen bg-surface px-4 pb-8 text-left text-on-surface md:px-16 lg:col-span-10 ${isEmbeddedPortal ? "pt-8" : "pt-28"}`}>
      <PublicTopbar />
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-primary">
              {t.technicalHardware}
            </span>
            <h1 className="mb-3 text-3xl font-black leading-none tracking-tight text-white">
              {category ? t.categoryLabels[category.id] : t.catalogueTitle}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant">
              {t.catalogueIntro}
            </p>
          </div>
          <Link to="/cart" className="flex items-center justify-center gap-2 rounded border-2 border-primary px-5 py-3 text-center font-mono text-xs font-black uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white">
            <ShoppingCartIcon className="h-4 w-4" />
            {cart.cartCount}
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="relative md:col-span-6">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded border border-outline-variant bg-surface-container px-11 py-3 font-mono text-sm text-white placeholder-on-surface-variant/50 transition focus:border-primary focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">?</span>
          </div>

          <div className="relative md:col-span-3">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full appearance-none rounded border border-outline-variant bg-surface-container px-4 py-3 font-mono text-sm text-white transition focus:border-primary focus:outline-none"
            >
              <option value="alpha">{t.sortAlpha}</option>
              <option value="price_asc">{t.sortPriceAsc}</option>
              <option value="price_desc">{t.sortPriceDesc}</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">v</span>
          </div>

          <button
            onClick={() => setShowAdvancedFilters((value) => !value)}
            className={`flex items-center justify-center gap-2.5 rounded border px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest transition active:scale-95 md:col-span-3 ${
              showAdvancedFilters
                ? "border-primary bg-primary text-white"
                : "border-outline-variant bg-surface-container-high text-white hover:bg-surface-container-highest"
            }`}
            type="button"
          >
            <span className="text-primary">=</span> {t.advancedFilters}
          </button>
        </div>

        {showAdvancedFilters && (
          <div className="mb-6 grid gap-4 rounded-xl border border-primary/40 bg-surface-container p-5 md:grid-cols-4">
            <div>
              <label className="mb-2 block font-mono text-[10px] font-black uppercase tracking-widest text-primary">
                {t.brand}
              </label>
              <select
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-3 font-mono text-sm text-white outline-none focus:border-primary"
              >
                <option value="all">{t.allBrands}</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] font-black uppercase tracking-widest text-primary">
                {t.maxPrice}
              </label>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="Ex: 25"
                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-3 font-mono text-sm text-white outline-none placeholder:text-on-surface-variant/50 focus:border-primary"
              />
            </div>
            <label className="flex items-center gap-3 rounded border border-outline-variant bg-surface-container-low px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <input
                checked={stockOnly}
                onChange={(event) => setStockOnly(event.target.checked)}
                type="checkbox"
                className="h-4 w-4 rounded border-outline-variant bg-surface text-primary focus:ring-primary"
              />
              {t.inStockOnly}
            </label>
            <button
              onClick={() => {
                setSelectedBrand("all");
                setMaxPrice("");
                setStockOnly(false);
              }}
              className="rounded border-2 border-primary px-4 py-3 font-mono text-xs font-black uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white"
              type="button"
            >
              {t.reset}
            </button>
          </div>
        )}

        <div className="scrollbar-none mb-8 flex gap-2.5 overflow-x-auto border-b border-white/5 pb-4">
          <button
            onClick={() => setCategory("all")}
            className={`rounded border px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition ${
              selectedCategory === "all"
                ? "border-primary bg-primary text-on-primary"
                : "border-white/5 bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-white"
            }`}
            type="button"
          >
            {t.all}
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => setCategory(item.id)}
              className={`whitespace-nowrap rounded border px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition ${
                selectedCategory === item.id
                  ? "border-primary bg-primary text-on-primary"
                  : "border-white/5 bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-white"
              }`}
              type="button"
            >
              {t.categoryLabels[item.id]}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-outline-variant bg-surface-container-low p-16 text-center">
            <h2 className="mb-2 font-mono text-lg font-bold text-white">{t.noProducts}</h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-on-surface-variant">
              {t.adjustFilters}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container transition duration-300 hover:border-primary/50">
                <Link to={`/product/${product.id}`} className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden bg-surface-container-low/50 p-8">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25" />
                  <img
                    className="relative z-10 h-full w-full object-cover mix-blend-lighten transition duration-500 group-hover:scale-110"
                    src={product.imageUrl || getCategoryById(product.categoryId)?.imageUrl || heroImage}
                    alt={`${product.name} - ${getCategoryById(product.categoryId)?.imageAlt || "produit quincaillerie professionnelle"}`}
                    title={`${product.name} | ${getCategoryById(product.categoryId)?.seoTitle || "QuinStock"}`}
                    width="520"
                    height="520"
                    loading="lazy"
                    decoding="async"
                    onError={useFallbackImage}
                  />
                  <div className="absolute left-4 top-4 z-20 flex flex-col gap-1.5">
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                        product.stock < 30
                          ? "border-tertiary/20 bg-tertiary-container/20 text-tertiary"
                          : "border-primary/20 bg-primary/5 text-primary"
                      }`}
                    >
                      {product.stock < 30 ? t.lowStock : t.inStock}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20 rounded bg-surface-container-low/80 px-2 py-0.5 font-mono text-[10px] text-on-surface-variant">
                    #{product.id.toUpperCase()}
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 rounded bg-primary px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white">
                    {t.stock}: {product.stock}
                  </div>
                </Link>

                <div className="flex flex-grow flex-col p-6">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                    {t.categoryLabels[product.categoryId]}
                  </p>
                  <Link to={`/product/${product.id}`} className="mb-4 block h-[48px] overflow-hidden text-base font-bold text-white transition hover:text-primary">
                    {product.name}
                  </Link>

                  <div className="mb-6 flex flex-col gap-1.5 font-mono text-xs">
                    {[
                      [`${t.brand}:`, product.brand],
                      [`${t.unit}:`, product.unit],
                      [`${t.stock}:`, product.stock],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-end">
                        <span className="text-[11px] uppercase text-on-surface-variant">{label}</span>
                        <div className="dots-leader" />
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 font-mono">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
                      <span className="text-[10px] text-on-surface-variant">/ {product.unit}</span>
                    </div>
                    <button
                      onClick={() => cart.addItem(product, 1)}
                      className="rounded bg-surface-container-high p-2.5 text-primary transition hover:bg-primary hover:text-on-primary active:scale-90"
                      title="Ajouter au panier"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-6 font-mono text-xs text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
          <span>{t.displayCount} {filteredProducts.length} {t.on} {filteredProducts.length} {t.articles}</span>
          <div className="flex items-center gap-1.5">
            <button className="flex h-8 w-8 items-center justify-center rounded border border-white/5 hover:bg-surface-container" type="button">&lt;</button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-primary bg-primary font-bold text-on-primary" type="button">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-white/5 hover:bg-surface-container" type="button">2</button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-white/5 hover:bg-surface-container" type="button">3</button>
            <span>...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-white/5 hover:bg-surface-container" type="button">12</button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-white/5 hover:bg-surface-container" type="button">&gt;</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ClientCatalogue;
