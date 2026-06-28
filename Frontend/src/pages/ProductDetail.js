import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CartContext from "../CartContext";
import PublicTopbar from "../components/PublicTopbar";
import { getCategoryById, products } from "../data/catalogue";

const heroImage = `${process.env.PUBLIC_URL}/hardware-hero.jpg`;

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

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((item) => item.id === productId);
  const category = product ? getCategoryById(product.categoryId) : null;
  const isEmbeddedPortal =
    location.pathname.startsWith("/client") || location.pathname.startsWith("/admin");

  useEffect(() => {
    document.title = product
      ? `${product.name} | QuinStock`
      : "Produit introuvable | QuinStock";
  }, [product]);

  const specs = useMemo(() => {
    if (!product) return [];
    return [
      ["Reference", product.id.toUpperCase()],
      ["Marque", product.brand],
      ["Categorie", category?.name || "-"],
      ["Unite", product.unit],
      ["Stock", product.stock],
      ["Delai", product.stock > 30 ? "24h - 48h" : "Sur confirmation"],
    ];
  }, [category, product]);

  if (!product) {
    return (
      <main className={`col-span-12 min-h-screen bg-surface px-4 pb-10 text-on-surface lg:col-span-10 ${isEmbeddedPortal ? "pt-8" : "pt-28"}`}>
        <PublicTopbar />
        <div className="mx-auto max-w-[900px] rounded-xl border border-outline-variant bg-surface-container p-10 text-center">
          <h1 className="text-2xl font-black text-white">Produit introuvable</h1>
          <button onClick={() => navigate(-1)} className="mt-6 rounded bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-on-primary">
            Retour
          </button>
        </div>
      </main>
    );
  }

  const addToCart = () => {
    cart.addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <main className={`col-span-12 min-h-screen bg-surface px-4 pb-8 text-left text-on-surface md:px-8 lg:col-span-10 ${isEmbeddedPortal ? "pt-8" : "pt-28"}`}>
      <PublicTopbar />
      {added && (
        <div className="fixed right-4 top-24 z-50 rounded border border-primary/30 bg-primary-container px-4 py-3 text-sm font-bold text-on-primary-container shadow-2xl">
          Produit ajoute au panier.
        </div>
      )}

      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-on-surface-variant">
          <button
            onClick={() => navigate(-1)}
            className="rounded border-2 border-primary px-4 py-2 font-bold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white"
            type="button"
          >
            &lt; Retour
          </button>
          <span>/</span>
          <Link to="/catalogue" className="uppercase hover:text-primary">Catalogue</Link>
          <span>/</span>
          <span className="truncate text-white">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <section className="lg:col-span-5">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-outline-variant bg-surface-container p-8">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:16px_16px]" />
              <img
                src={product.imageUrl || category?.imageUrl || heroImage}
                alt={`${product.name} - ${category?.imageAlt || "produit quincaillerie professionnelle"}`}
                title={`${product.name} | ${category?.seoTitle || "QuinStock"}`}
                width="520"
                height="520"
                fetchPriority="high"
                decoding="async"
                onError={useFallbackImage}
                className="relative z-10 h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 z-20 rounded border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                {category?.name}
              </span>
              <span className="absolute bottom-4 right-4 z-20 rounded bg-surface-container-low/80 px-2 py-1 font-mono text-[10px] text-on-surface-variant">
                REF: {product.id.toUpperCase()}
              </span>
              <span className="absolute bottom-4 left-4 z-20 rounded bg-primary px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-white">
                Stock: {product.stock}
              </span>
            </div>
          </section>

          <section className="space-y-6 lg:col-span-7">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">{product.brand}</p>
              <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight text-white">
                {product.name}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant">
                Produit professionnel pour commandes B2B. Verifiez la quantite, ajoutez au panier, puis envoyez une demande de devis depuis le recapitulatif.
              </p>
            </div>

            <div className="rounded-xl border border-outline-variant bg-surface-container p-6">
              <div className="mb-5 rounded border border-primary/30 bg-primary/10 px-4 py-3 font-mono text-xs font-black uppercase tracking-widest text-primary">
                Stock disponible pour cette piece: <span className="text-white">{product.stock}</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Quantite
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                    className="w-full rounded border border-outline-variant bg-surface-container-low px-4 py-3 font-mono text-white outline-none focus:border-primary"
                  />
                </div>
                <div className="rounded border border-white/10 bg-surface-container-high/60 p-4 text-right">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Total estime HT</span>
                  <p className="mt-1 font-mono text-2xl font-black text-white">{formatPrice(product.price * quantity)}</p>
                  <p className="font-mono text-[10px] text-primary">{formatPrice(product.price)} / {product.unit}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button onClick={addToCart} className="rounded bg-primary px-6 py-4 text-xs font-black uppercase tracking-widest text-on-primary transition hover:bg-primary-container" type="button" aria-label={`Ajouter ${product.name} au panier`}>
                  Ajouter au panier
                </button>
                <Link to="/cart" className="rounded border border-tertiary px-6 py-4 text-center text-xs font-black uppercase tracking-widest text-tertiary transition hover:bg-tertiary/10">
                  Voir panier
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-outline-variant bg-surface-container-low p-6">
              <h2 className="mb-4 border-b border-white/5 pb-3 font-mono text-xs font-bold uppercase tracking-widest text-white">
                Fiche technique
              </h2>
              <div className="space-y-3 font-mono text-xs">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex items-end">
                    <span className="text-[11px] uppercase text-on-surface-variant">{label}</span>
                    <div className="dots-leader" />
                    <span className="text-right text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
