import React, { useEffect } from "react";

const quotes = [
  { id: "DEV-1028", client: "Client Demo", email: "client.demo@quincaillerie.test", date: "27/06/2026", status: "Nouveau", total: "428,30 EUR" },
  { id: "DEV-1027", client: "BatiCore Services", email: "achat@baticore.test", date: "26/06/2026", status: "PDF envoye", total: "1 284,90 EUR" },
  { id: "DEV-1026", client: "Atelier Central", email: "contact@atelier.test", date: "25/06/2026", status: "En revision", total: "739,10 EUR" },
  { id: "DEV-1025", client: "ProTech Monastir", email: "commande@protech.test", date: "24/06/2026", status: "Valide", total: "912,60 EUR" },
];

function Sales() {
  useEffect(() => {
    document.title = "Devis Admin | QuinStock";
  }, []);

  const stats = [
    { label: "Devis", value: quotes.length, detail: "Demandes visibles" },
    { label: "Nouveaux", value: quotes.filter((quote) => quote.status === "Nouveau").length, detail: "A repondre" },
    { label: "PDF", value: quotes.filter((quote) => quote.status.includes("PDF")).length, detail: "Envoyes par email" },
    { label: "SLA", value: "24h", detail: "Reponse cible" },
  ];

  return (
    <main className="col-span-12 bg-surface px-4 py-8 text-on-surface md:px-8 lg:col-span-10">
      <div className="mx-auto max-w-[1500px]">
        <section className="rounded-xl border border-white/10 bg-surface-container p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Demandes de devis</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-6xl leading-none tracking-wide text-off-white md:text-7xl">
                DEVIS<br /><span className="text-primary">CLIENTS</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant">
                Suivez les demandes recues depuis le panier, les PDF generes et les emails envoyes aux clients.
              </p>
            </div>
            <button className="h-12 rounded border border-primary bg-primary px-6 text-xs font-black uppercase tracking-widest text-white transition hover:bg-primary-container">
              Relancer email
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
          <div className="hidden grid-cols-[0.7fr_1fr_1.2fr_0.7fr_0.8fr_auto] gap-4 border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-steel lg:grid">
            <span>Reference</span>
            <span>Client</span>
            <span>Email</span>
            <span>Date</span>
            <span>Total</span>
            <span>Statut</span>
          </div>
          {quotes.map((quote) => (
            <article
              key={quote.id}
              className="grid gap-4 border-b border-white/5 p-5 last:border-b-0 lg:grid-cols-[0.7fr_1fr_1.2fr_0.7fr_0.8fr_auto] lg:items-center"
            >
              <span className="font-mono text-xs font-black text-primary">{quote.id}</span>
              <span className="text-sm font-black text-white">{quote.client}</span>
              <span className="break-all font-mono text-xs text-on-surface-variant">{quote.email}</span>
              <span className="font-mono text-xs text-on-surface-variant">{quote.date}</span>
              <span className="font-mono text-sm font-bold text-white">{quote.total}</span>
              <span className="w-fit rounded border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-primary">
                {quote.status}
              </span>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Sales;
