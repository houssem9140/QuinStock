import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import CartContext from "../CartContext";
import LanguageContext from "../LanguageContext";
import PublicTopbar from "../components/PublicTopbar";
import { categories, getCategoryById, products } from "../data/catalogue";

const heroImage = `${process.env.PUBLIC_URL}/hardware-hero.jpg`;

function useFallbackImage(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = heroImage;
}

const tickerItems = [
  "Boulonnerie",
  "Serrurerie",
  "Menuiserie",
  "Soudure",
  "Visserie",
  "Outillage",
  "Plomberie",
  "Electricite",
  "Peinture",
  "Fixation",
  "Robinetterie",
  "Quincaillerie",
];

const stats = [
  { value: "15K+", label: "References produits" },
  { value: "24H", label: "Preparation express" },
  { value: "98%", label: "Taux de disponibilite" },
  { value: "TN", label: "Livraison nationale" },
];

const premiumProducts = products.slice(0, 4);

const features = [
  ["Livraison rapide toute la Tunisie", "Preparez vos commandes pro et recevez vos pieces chantier avec un suivi clair de la demande."],
  ["Devis pro en quelques clics", "Ajoutez les articles au panier, envoyez la demande et recuperez un devis propre pour validation."],
  ["Stock visible par piece", "Chaque produit affiche sa disponibilite pour connecter le portail a votre outil de gestion de stock."],
  ["Suivi client centralise", "Clients, devis, commandes et historique d'achat restent lisibles depuis un espace simple et rapide."],
];

function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function Home() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { t } = useContext(LanguageContext);
  const accountLink = auth.isAdmin ? "/admin" : "/client";
  const isLoggedIn = auth.isAdmin || auth.isClient;

  useEffect(() => {
    document.title = "QuinStock";
  }, []);

  const tickerLoop = [...tickerItems, ...tickerItems];

  return (
    <main className="min-h-screen bg-surface text-on-surface selection:bg-primary/40 selection:text-white">
      <PublicTopbar />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden px-4 pb-10 pt-[104px] min-[380px]:px-5 sm:px-6 sm:pb-14 sm:pt-[120px] md:min-h-screen md:px-16 md:pb-24">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Pieces de quincaillerie et boulonnerie"
            width="1600"
            height="900"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[980px]">
          <span className="mb-4 inline-block max-w-full rounded-sm bg-primary px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white sm:mb-5 sm:px-4 sm:text-xs sm:tracking-[0.22em]">
            {t.professionalHardware}
          </span>
          <h1 className="max-w-full break-words font-display text-[clamp(3.45rem,17vw,4.75rem)] leading-[0.9] tracking-[0.025em] text-off-white sm:text-[110px] sm:tracking-[0.035em] lg:text-[150px]">
            {t.heroTitle1}<br />
            {t.heroTitle2} <span className="text-primary">{t.heroTitleAccent}</span><br />
            {t.heroTitle3}
          </h1>
          <p className="mt-5 max-w-xl text-base font-light leading-7 text-off-white/75 sm:mt-8 sm:text-xl sm:leading-9">
            {t.heroSubtitle}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link to="/catalogue" className="rounded bg-primary px-6 py-3.5 text-center text-sm font-black uppercase tracking-widest text-white transition hover:bg-primary-container sm:px-9 sm:py-4 sm:text-base">
              {t.viewCatalogue}
            </Link>
            <Link to="/cart" className="rounded border-2 border-off-white/30 px-6 py-3.5 text-center text-sm font-black uppercase tracking-widest text-white transition hover:border-off-white sm:px-9 sm:py-4 sm:text-base">
              {t.requestQuote}
            </Link>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-primary py-4">
        <div className="ticker-track flex">
          {tickerLoop.map((item, index) => (
            <span key={`${item}-${index}`} className="font-display whitespace-nowrap px-8 text-2xl tracking-[0.18em] text-white">
              {item} <span className="opacity-45">{"//"}</span>
            </span>
          ))}
        </div>
      </div>

      <section id="stock" className="grid border-b border-white/10 bg-surface md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-b border-r border-white/10 px-8 py-12 md:border-b-0 lg:px-12">
            <div className="font-display text-7xl tracking-wide text-primary">{stat.value}</div>
            <div className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-steel">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="bg-off-white px-6 py-20 text-charcoal md:px-16 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Notre catalogue</p>
          <h2 className="mt-4 font-display text-6xl leading-none tracking-wide md:text-8xl">
            TOUT CE DONT<br />VOUS AVEZ BESOIN.
          </h2>

          <div className="mt-14 grid gap-px bg-[#E8E6E1] md:grid-cols-3">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/catalogue?category=${category.id}`} className="group relative min-h-[280px] overflow-hidden bg-charcoal p-8 transition md:p-10">
                <img
                  src={category.imageUrl}
                  alt={category.imageAlt}
                  title={category.seoTitle}
                  width="760"
                  height="520"
                  loading="lazy"
                  decoding="async"
                  onError={useFallbackImage}
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <span className="relative z-10 text-xs font-black uppercase tracking-[0.22em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span className="absolute right-8 top-8 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-off-white transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  &gt;
                </span>
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <h3 className="font-display text-4xl tracking-wide text-off-white">{t.categoryLabels[category.id]}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-off-white/75">{t.categoryDescriptions[category.id]}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">{t.featured}</p>
              <h2 className="mt-4 font-display text-6xl leading-none tracking-wide text-off-white md:text-8xl">
                {t.featuredTitle1}<br />{t.featuredTitle2}
              </h2>
            </div>
            <Link to="/catalogue" className="w-fit rounded border-2 border-primary px-7 py-4 text-sm font-black uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white">
              {t.seeAll}
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {premiumProducts.map((product) => (
              <article key={product.id} className="group bg-surface p-5 transition hover:bg-surface-container">
                <Link to={`/product/${product.id}`} className="relative flex aspect-square items-center justify-center overflow-hidden rounded bg-surface-container-low">
                  <img
                    src={product.imageUrl || getCategoryById(product.categoryId)?.imageUrl || heroImage}
                    alt={`${product.name} - ${getCategoryById(product.categoryId)?.imageAlt || "produit quincaillerie professionnelle"}`}
                    title={`${product.name} | ${getCategoryById(product.categoryId)?.seoTitle || "QuinStock"}`}
                    width="520"
                    height="520"
                    loading="lazy"
                    decoding="async"
                    onError={useFallbackImage}
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded bg-primary px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-white">
                    {product.brand}
                  </span>
                </Link>
                <div className="pt-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    {getCategoryById(product.categoryId)?.name}
                  </p>
                  <Link to={`/product/${product.id}`} className="mt-2 block min-h-[58px] text-xl font-black leading-tight text-off-white transition hover:text-primary">
                    {product.name}
                  </Link>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="font-mono text-lg font-black text-white">{formatPrice(product.price)}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-steel">{product.unit}</p>
                    </div>
                    <button
                      onClick={() => cart.addItem(product, 1)}
                      className="flex h-11 w-11 items-center justify-center rounded border-2 border-primary text-primary transition hover:bg-primary hover:text-white"
                      type="button"
                      title="Ajouter au panier"
                      aria-label={`Ajouter ${product.name} au panier`}
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="livraison" className="bg-surface px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Pourquoi QuinStock</p>
          <h2 className="mt-4 font-display text-6xl leading-none tracking-wide text-off-white md:text-8xl">
            LIVRAISON ET DEVIS<br />POUR LES PROS.
          </h2>
          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">
            {features.map(([title, description], index) => (
              <div key={title} className="bg-surface p-8 transition hover:bg-surface-container-high md:p-12">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded bg-primary/15 font-display text-3xl text-primary">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-4xl tracking-wide text-off-white">{title}</h3>
                <p className="mt-4 max-w-lg text-base font-light leading-8 text-steel">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="flex flex-col gap-10 border-t-[3px] border-primary bg-rust px-6 py-20 md:flex-row md:items-center md:justify-between md:px-16 md:py-28">
        <h2 className="font-display text-6xl leading-none tracking-wide text-off-white md:text-8xl">
          PRET A<br /><span className="text-primary">OPTIMISER</span><br />VOTRE STOCK ?
        </h2>
        <div className="max-w-md">
          <p className="text-lg font-light leading-8 text-off-white/65">
            Commandes B2B, devis rapides et livraison organisee partout en Tunisie. Demo gratuite, sans engagement.
          </p>
          <Link to={isLoggedIn ? accountLink : "/register"} className="mt-8 inline-flex rounded bg-primary px-9 py-4 text-base font-black uppercase tracking-widest text-white">
            Demarrer gratuitement
          </Link>
        </div>
      </section>

      <footer className="bg-surface-container-lowest px-6 py-14 md:px-16">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-10 border-b border-white/10 pb-10 md:flex-row md:justify-between">
          <div>
            <div className="font-display text-5xl tracking-[0.12em] text-off-white">QUIN<span className="text-primary">STOCK</span></div>
            <p className="mt-2 text-sm text-steel">Commande, devis et livraison pour la quincaillerie professionnelle.</p>
          </div>
          <div className="grid gap-8 text-sm text-steel sm:grid-cols-3">
            <div><h4 className="mb-4 text-xs font-black uppercase tracking-widest text-primary">Produit</h4><p>Catalogue</p><p>Stock par piece</p><p>Commandes</p></div>
            <div><h4 className="mb-4 text-xs font-black uppercase tracking-widest text-primary">Livraison</h4><p>Toute la Tunisie</p><p>Suivi commande</p><p>Support</p></div>
            <div><h4 className="mb-4 text-xs font-black uppercase tracking-widest text-primary">Portail</h4><p>Clients</p><p>Admin</p><p>Devis</p></div>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1500px] flex-col gap-3 text-xs text-steel/60 md:flex-row md:justify-between">
          <span>2026 QuinStock. Tous droits reserves.</span>
          <span>Concu pour les professionnels du batiment.</span>
        </div>
      </footer>
    </main>
  );
}

export default Home;
