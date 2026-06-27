import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import CartContext from "../CartContext";
import { categories } from "../data/catalogue";

const heroImage = `${process.env.PUBLIC_URL}/hardware-hero.jpg`;

const purchasePreview = [
  { id: "ACH-2401", date: "12/06/2026", label: "Fixation chantier", amount: "428,30 EUR" },
  { id: "ACH-2398", date: "04/06/2026", label: "Outillage atelier", amount: "212,80 EUR" },
  { id: "ACH-2387", date: "28/05/2026", label: "Plomberie maintenance", amount: "96,40 EUR" },
];

function ClientDashboard() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const currentUser = auth.currentUser || {};
  const displayName =
    currentUser.companyName ||
    [currentUser.firstName, currentUser.lastName].filter(Boolean).join(" ") ||
    "Client Pro";

  useEffect(() => {
    document.title = "Espace client | QuinStock";
  }, []);

  const privateStats = [
    { value: cart.quotes.length, label: "Devis enregistres" },
    { value: cart.cartCount, label: "Articles panier" },
    { value: purchasePreview.length, label: "Achats recents" },
    { value: "24H", label: "Delai reponse" },
  ];

  return (
    <main className="col-span-12 bg-surface text-on-surface lg:col-span-10">
      <section className="relative flex min-h-[560px] items-end overflow-hidden px-4 pb-12 pt-10 md:px-8 md:pb-16">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" width="1600" height="900" decoding="async" className="h-full w-full object-cover brightness-[0.38]" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-surface/35 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[980px]">
          <span className="mb-5 inline-block rounded-sm bg-primary px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white">
            Espace Client Pro
          </span>
          <h1 className="font-display text-[64px] leading-[0.9] tracking-[0.035em] text-off-white sm:text-[96px] xl:text-[128px]">
            VOTRE<br />
            <span className="text-primary">PORTAIL</span><br />
            QUINSTOCK.
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-off-white/75">
            Bonjour {displayName}. Retrouvez le meme catalogue, vos demandes de devis, votre panier et votre historique d'achats dans un espace prive.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/client/catalogue" className="rounded bg-primary px-9 py-4 text-center text-sm font-black uppercase tracking-widest text-white transition hover:bg-primary-container">
              Voir le catalogue
            </Link>
            <Link to="/client/devis" className="rounded border-2 border-off-white/30 px-9 py-4 text-center text-sm font-black uppercase tracking-widest text-white transition hover:border-off-white">
              Mes devis
            </Link>
            <Link to="/client/achats" className="rounded border-2 border-primary px-9 py-4 text-center text-sm font-black uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white">
              Historique achats
            </Link>
          </div>
        </div>
      </section>

      <section className="grid border-b border-white/10 bg-surface md:grid-cols-4">
        {privateStats.map((stat) => (
          <div key={stat.label} className="border-b border-r border-white/10 px-8 py-10 md:border-b-0 lg:px-12">
            <div className="font-display text-6xl tracking-wide text-primary">{stat.value}</div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-steel">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-px bg-white/10 md:grid-cols-3">
        {[
          {
            title: "Panier actif",
            text: `${cart.cartCount} article(s) en attente de devis`,
            href: "/client/cart",
            icon: ShoppingCartIcon,
          },
          {
            title: "Mes devis",
            text: `${cart.quotes.length} demande(s) sauvegardee(s)`,
            href: "/client/devis",
            icon: ClipboardDocumentListIcon,
          },
          {
            title: "Historique achats",
            text: "Consultez vos derniers achats et commandes",
            href: "/client/achats",
            icon: ClockIcon,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} to={item.href} className="group bg-surface-container-low p-8 transition hover:bg-surface-container md:p-10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="font-display text-4xl tracking-wide text-off-white group-hover:text-primary">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">{item.text}</p>
            </Link>
          );
        })}
      </section>

      <section className="bg-off-white px-4 py-16 text-charcoal md:px-8 md:py-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Catalogue client</p>
              <h2 className="mt-4 font-display text-6xl leading-none tracking-wide md:text-8xl">
                COMMANDER<br />PAR FAMILLE.
              </h2>
            </div>
            <Link to="/client/catalogue" className="w-fit rounded border-2 border-primary px-7 py-4 text-sm font-black uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white">
              Tous les produits
            </Link>
          </div>

          <div className="grid gap-px bg-[#E8E6E1] md:grid-cols-3">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/client/catalogue?category=${category.id}`} className="group relative min-h-[250px] overflow-hidden bg-charcoal p-8 transition md:p-10">
                <img
                  src={category.imageUrl}
                  alt={category.imageAlt}
                  title={category.seoTitle}
                  width="760"
                  height="520"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <span className="relative z-10 text-xs font-black uppercase tracking-[0.22em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span className="absolute right-8 top-8 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-off-white transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  &gt;
                </span>
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <h3 className="font-display text-4xl tracking-wide text-off-white">{category.name}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-off-white/75">{category.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 px-4 py-16 md:px-8 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Derniers devis</p>
          <h2 className="mt-3 font-display text-5xl tracking-wide text-off-white">Suivi des demandes</h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-surface-container">
            {(cart.quotes.length ? cart.quotes.slice(0, 3) : [
              { id: "DV-DEMO", companyName: displayName, status: "pending", subtotal: 0, items: [] },
            ]).map((quote) => (
              <div key={quote.id} className="grid gap-3 border-b border-white/5 p-5 last:border-b-0 md:grid-cols-[1fr_1fr_auto] md:items-center">
                <span className="font-mono text-xs font-bold text-primary">{quote.id}</span>
                <span className="text-sm text-on-surface-variant">{quote.companyName || displayName}</span>
                <span className="rounded border border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">En analyse</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="xl:col-span-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Achats recents</p>
          <h2 className="mt-3 font-display text-5xl tracking-wide text-off-white">Historique rapide</h2>
          <div className="mt-6 space-y-3">
            {purchasePreview.map((purchase) => (
              <div key={purchase.id} className="rounded border border-white/10 bg-surface-container p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs font-bold text-primary">{purchase.id}</p>
                    <p className="mt-1 text-sm font-bold text-white">{purchase.label}</p>
                    <p className="mt-1 text-xs text-on-surface-variant">{purchase.date}</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-white">{purchase.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

export default ClientDashboard;
