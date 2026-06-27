import React, { useEffect } from "react";

const orders = [
  { id: "CMD-2401", client: "Client Demo", date: "27/06/2026", items: 8, status: "A traiter", delivery: "Standard", amount: "428,30 EUR" },
  { id: "CMD-2402", client: "Batipro Nord", date: "26/06/2026", items: 14, status: "Preparation", delivery: "Express", amount: "1 284,90 EUR" },
  { id: "CMD-2403", client: "Atelier Central", date: "25/06/2026", items: 6, status: "Devis envoye", delivery: "Standard", amount: "739,10 EUR" },
  { id: "CMD-2404", client: "Société Monastir Pro", date: "24/06/2026", items: 11, status: "Livraison", delivery: "Express", amount: "912,60 EUR" },
];

function PurchaseDetails() {
  useEffect(() => {
    document.title = "Commandes Admin | QuinStock";
  }, []);

  const stats = [
    { label: "Commandes", value: orders.length, detail: "Cette semaine" },
    { label: "A traiter", value: orders.filter((order) => order.status === "A traiter").length, detail: "Priorite admin" },
    { label: "Express", value: orders.filter((order) => order.delivery === "Express").length, detail: "Livraisons rapides" },
    { label: "Delai moyen", value: "24h", detail: "Traitement devis" },
  ];

  return (
    <main className="col-span-12 bg-surface px-4 py-8 text-on-surface md:px-8 lg:col-span-10">
      <div className="mx-auto max-w-[1500px]">
        <section className="rounded-xl border border-white/10 bg-surface-container p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Commandes</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-6xl leading-none tracking-wide text-off-white md:text-7xl">
                SUIVI<br /><span className="text-primary">COMMANDES</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant">
                Pilotez les commandes clients, les priorites de preparation et les livraisons partout en Tunisie.
              </p>
            </div>
            <button className="h-12 rounded border border-primary bg-primary px-6 text-xs font-black uppercase tracking-widest text-white transition hover:bg-primary-container">
              Exporter
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

        <section className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-surface-container">
          <div className="hidden grid-cols-[0.7fr_1.1fr_0.7fr_0.6fr_0.8fr_0.7fr_auto] gap-4 border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-steel lg:grid">
            <span>Reference</span>
            <span>Client</span>
            <span>Date</span>
            <span>Articles</span>
            <span>Livraison</span>
            <span>Montant</span>
            <span>Statut</span>
          </div>
          {orders.map((order) => (
            <article
              key={order.id}
              className="grid gap-4 border-b border-white/5 p-5 last:border-b-0 lg:grid-cols-[0.7fr_1.1fr_0.7fr_0.6fr_0.8fr_0.7fr_auto] lg:items-center"
            >
              <span className="font-mono text-xs font-black text-primary">{order.id}</span>
              <span className="text-sm font-black text-white">{order.client}</span>
              <span className="font-mono text-xs text-on-surface-variant">{order.date}</span>
              <span className="font-display text-4xl text-primary">{order.items}</span>
              <span className="text-sm text-on-surface-variant">{order.delivery}</span>
              <span className="font-mono text-sm font-bold text-white">{order.amount}</span>
              <span className="w-fit rounded border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-primary">
                {order.status}
              </span>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default PurchaseDetails;
