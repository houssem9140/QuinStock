import React, { useContext, useEffect } from "react";
import AuthContext from "../AuthContext";
import { categories, products } from "../data/catalogue";

const recentOrders = [
  { id: "CMD-2401", client: "Client Demo", status: "A traiter", amount: "428,30 EUR" },
  { id: "CMD-2402", client: "Batipro Nord", status: "Preparation", amount: "1 284,90 EUR" },
  { id: "CMD-2403", client: "Atelier Central", status: "Devis envoye", amount: "739,10 EUR" },
];

function Dashboard() {
  const authContext = useContext(AuthContext);
  const lowStock = products.filter((product) => product.stock < 35);
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  useEffect(() => {
    document.title = "Dashboard Admin | QuinStock";
  }, []);

  const adminName =
    [authContext.currentUser?.firstName, authContext.currentUser?.lastName]
      .filter(Boolean)
      .join(" ") || "Administrateur";

  const kpis = [
    { label: "Produits", value: products.length, detail: `${categories.length} categories actives` },
    { label: "Stock total", value: totalStock, detail: "Unites demo disponibles" },
    { label: "Stock faible", value: lowStock.length, detail: "Articles a surveiller" },
    { label: "Devis", value: "24h", detail: "Delai moyen de traitement" },
  ];

  return (
    <main className="col-span-12 bg-surface px-4 py-8 text-on-surface md:px-8 lg:col-span-10">
      <div className="mx-auto max-w-[1500px]">
        <section className="relative overflow-hidden rounded-xl border border-white/10 bg-surface-container-low p-8 md:p-10">
          <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(212,130,10,0.24),transparent_45%)] lg:block" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Admin Console</p>
            <h1 className="mt-4 font-display text-6xl leading-none tracking-wide text-off-white md:text-8xl">
              PILOTAGE<br /><span className="text-primary">QUINSTOCK</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-on-surface-variant">
              Bonjour {adminName}. Suivez les commandes, le stock, les clients et les demandes de devis depuis ce tableau de bord.
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4">
          {kpis.map((kpi) => (
            <article key={kpi.label} className="bg-surface-container p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-steel">{kpi.label}</p>
              <p className="mt-4 font-display text-6xl leading-none text-primary">{kpi.value}</p>
              <p className="mt-3 text-sm text-on-surface-variant">{kpi.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Commandes</p>
                <h2 className="mt-2 font-display text-5xl tracking-wide text-white">Dernieres activites</h2>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-container">
              {recentOrders.map((order) => (
                <div key={order.id} className="grid gap-3 border-b border-white/5 p-5 last:border-b-0 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
                  <span className="font-mono text-xs font-bold text-primary">{order.id}</span>
                  <span className="text-sm font-bold text-white">{order.client}</span>
                  <span className="text-sm text-on-surface-variant">{order.status}</span>
                  <span className="font-mono text-sm font-bold text-white">{order.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="xl:col-span-4">
            <div className="rounded-xl border border-white/10 bg-surface-container p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Stock faible</p>
              <h2 className="mt-2 font-display text-5xl tracking-wide text-white">A recharger</h2>
              <div className="mt-5 space-y-3">
                {lowStock.slice(0, 5).map((product) => (
                  <div key={product.id} className="rounded border border-white/10 bg-surface-container-low p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-white">{product.name}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-steel">{product.brand}</p>
                      </div>
                      <span className="font-display text-3xl text-primary">{product.stock}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
