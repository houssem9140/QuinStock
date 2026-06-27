import React, { useContext, useEffect } from "react";
import AuthContext from "../AuthContext";

const clients = [
  { id: "CLI-001", name: "Client Demo", email: "client.demo@quincaillerie.test", type: "B2C", city: "Monastir", orders: 4, status: "Actif" },
  { id: "CLI-002", name: "Batipro Nord", email: "achat@baticore.test", type: "B2B", city: "Tunis", orders: 12, status: "Actif" },
  { id: "CLI-003", name: "Atelier Central", email: "contact@atelier.test", type: "B2B", city: "Sousse", orders: 7, status: "Suivi" },
  { id: "CLI-004", name: "ProTech Monastir", email: "commande@protech.test", type: "B2B", city: "Monastir", orders: 9, status: "Actif" },
];

function Store() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = "Clients Admin | QuinStock";
  }, []);

  const adminClient = {
    id: "ADM-001",
    name: `${authContext.currentUser?.firstName || "Admin"} ${authContext.currentUser?.lastName || "QuinStock"}`,
    email: authContext.currentUser?.email || "admin@quinstock.test",
    type: "Admin",
    city: "Monastir",
    orders: "-",
    status: "Console",
  };

  const rows = [adminClient, ...clients];
  const stats = [
    { label: "Comptes", value: rows.length, detail: "Admin + clients" },
    { label: "B2B", value: clients.filter((client) => client.type === "B2B").length, detail: "Clients professionnels" },
    { label: "B2C", value: clients.filter((client) => client.type === "B2C").length, detail: "Clients particuliers" },
    { label: "Villes", value: new Set(clients.map((client) => client.city)).size, detail: "Zones actives" },
  ];

  return (
    <main className="col-span-12 bg-surface px-4 py-8 text-on-surface md:px-8 lg:col-span-10">
      <div className="mx-auto max-w-[1500px]">
        <section className="rounded-xl border border-white/10 bg-surface-container p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Clients</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-6xl leading-none tracking-wide text-off-white md:text-7xl">
                COMPTES<br /><span className="text-primary">CLIENTS</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant">
                Centralisez les comptes B2B/B2C, les contacts, les zones de livraison et l'activite commande.
              </p>
            </div>
            <button className="h-12 rounded border border-primary bg-primary px-6 text-xs font-black uppercase tracking-widest text-white transition hover:bg-primary-container">
              Ajouter client
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
          <div className="hidden grid-cols-[0.7fr_1fr_1.3fr_0.5fr_0.7fr_0.6fr_auto] gap-4 border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-steel lg:grid">
            <span>Code</span>
            <span>Nom</span>
            <span>Email</span>
            <span>Type</span>
            <span>Ville</span>
            <span>Achats</span>
            <span>Statut</span>
          </div>
          {rows.map((client) => (
            <article
              key={client.id}
              className="grid gap-4 border-b border-white/5 p-5 last:border-b-0 lg:grid-cols-[0.7fr_1fr_1.3fr_0.5fr_0.7fr_0.6fr_auto] lg:items-center"
            >
              <span className="font-mono text-xs font-black text-primary">{client.id}</span>
              <span className="text-sm font-black text-white">{client.name}</span>
              <span className="break-all font-mono text-xs text-on-surface-variant">{client.email}</span>
              <span className="font-mono text-xs font-black text-white">{client.type}</span>
              <span className="text-sm text-on-surface-variant">{client.city}</span>
              <span className="font-display text-4xl text-primary">{client.orders}</span>
              <span className="w-fit rounded border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-primary">
                {client.status}
              </span>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Store;
