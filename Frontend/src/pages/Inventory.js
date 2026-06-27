import React, { useEffect, useMemo, useState } from "react";
import { categories, getCategoryById, products } from "../data/catalogue";

function Inventory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    document.title = "Catalogue Admin | QuinStock";
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesCategory = category === "all" || product.categoryId === category;
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.id.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStock = products.filter((product) => product.stock < 35).length;
  const stockValue = products.reduce((sum, product) => sum + product.stock * product.price, 0);

  const stats = [
    { label: "References", value: products.length, detail: `${categories.length} familles produit` },
    { label: "Stock total", value: totalStock, detail: "Unites disponibles" },
    { label: "Stock faible", value: lowStock, detail: "Articles a surveiller" },
    { label: "Valeur stock", value: `${stockValue.toFixed(0)} EUR`, detail: "Estimation catalogue" },
  ];

  return (
    <main className="col-span-12 bg-surface px-4 py-8 text-on-surface md:px-8 lg:col-span-10">
      <div className="mx-auto max-w-[1500px]">
        <section className="rounded-xl border border-white/10 bg-surface-container p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Catalogue Admin</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-6xl leading-none tracking-wide text-off-white md:text-7xl">
                STOCK<br /><span className="text-primary">PRODUITS</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant">
                Controlez les references, les stocks disponibles et les familles catalogue visibles par les clients.
              </p>
            </div>
            <button className="h-12 rounded border border-primary bg-primary px-6 text-xs font-black uppercase tracking-widest text-white transition hover:bg-primary-container">
              Ajouter produit
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="bg-surface-container p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-steel">{stat.label}</p>
              <p className="mt-3 font-display text-5xl leading-none text-primary">{stat.value}</p>
              <p className="mt-2 text-sm text-on-surface-variant">{stat.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-xl border border-white/10 bg-surface-container p-4 md:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <input
              className="h-12 rounded border border-white/10 bg-surface-container-low px-4 font-mono text-sm text-white outline-none transition placeholder:text-on-surface-variant focus:border-primary"
              placeholder="Rechercher par reference, marque, designation..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setCategory("all")}
                className={`h-12 shrink-0 rounded border px-4 text-xs font-black uppercase tracking-widest transition ${
                  category === "all"
                    ? "border-primary bg-primary text-white"
                    : "border-white/10 bg-surface-container-low text-on-surface-variant hover:border-primary hover:text-white"
                }`}
              >
                Tous
              </button>
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={`h-12 shrink-0 rounded border px-4 text-xs font-black uppercase tracking-widest transition ${
                    category === item.id
                      ? "border-primary bg-primary text-white"
                      : "border-white/10 bg-surface-container-low text-on-surface-variant hover:border-primary hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-surface-container">
          <div className="hidden grid-cols-[1.4fr_0.8fr_0.6fr_0.6fr_0.7fr_auto] gap-4 border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-steel lg:grid">
            <span>Produit</span>
            <span>Famille</span>
            <span>Marque</span>
            <span>Stock</span>
            <span>Prix</span>
            <span>Statut</span>
          </div>
          {filteredProducts.map((product) => {
            const productCategory = getCategoryById(product.categoryId);
            const isLow = product.stock < 35;

            return (
              <article
                key={product.id}
                className="grid gap-4 border-b border-white/5 p-5 last:border-b-0 lg:grid-cols-[1.4fr_0.8fr_0.6fr_0.6fr_0.7fr_auto] lg:items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    width="64"
                    height="64"
                    className="h-16 w-16 rounded border border-white/10 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="text-sm font-black text-white">{product.name}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-steel">#{product.id}</p>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant">{productCategory?.name}</p>
                <p className="text-sm font-bold text-white">{product.brand}</p>
                <p className="font-display text-4xl text-primary">{product.stock}</p>
                <p className="font-mono text-sm font-bold text-white">{product.price.toFixed(2)} EUR</p>
                <span className={`w-fit rounded border px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest ${
                  isLow
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                }`}>
                  {isLow ? "A recharger" : "En stock"}
                </span>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default Inventory;
