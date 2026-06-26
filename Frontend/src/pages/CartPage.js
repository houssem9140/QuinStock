import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import CartContext from "../CartContext";
import PublicTopbar from "../components/PublicTopbar";

function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function CartPage() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isEmbeddedPortal =
    location.pathname.startsWith("/client") || location.pathname.startsWith("/admin");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [companyName, setCompanyName] = useState(auth.currentUser?.companyName || "Client Demo");
  const [contactEmail, setContactEmail] = useState(auth.currentUser?.email || "client.demo@quincaillerie.test");
  const [successQuote, setSuccessQuote] = useState(null);

  useEffect(() => {
    document.title = "Panier | QuinStock";
  }, []);

  const freightCost = shippingMethod === "express" ? 45 : 15;
  const totalEstimate = cart.subtotal + (cart.items.length ? freightCost : 0);

  const estimatedDates = useMemo(() => {
    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() + (shippingMethod === "express" ? 1 : 3));
    end.setDate(end.getDate() + (shippingMethod === "express" ? 2 : 5));
    return `${start.toLocaleDateString("fr-FR")} - ${end.toLocaleDateString("fr-FR")}`;
  }, [shippingMethod]);

  const submitQuote = (event) => {
    event.preventDefault();
    if (!cart.items.length) return;
    const quote = cart.submitQuote({ companyName, contactEmail, shippingMethod });
    setSuccessQuote(quote);
  };

  if (successQuote) {
    return (
      <main className={`col-span-12 min-h-screen bg-surface px-4 pb-10 text-on-surface md:px-8 lg:col-span-10 ${isEmbeddedPortal ? "pt-8" : "pt-28"}`}>
        <PublicTopbar />
        <div className="mx-auto max-w-[620px] rounded-xl border border-outline-variant bg-surface-container p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-2xl font-black text-primary">
            OK
          </div>
          <h1 className="text-3xl font-black text-white">Demande de devis envoyee</h1>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Reference {successQuote.id}. Votre demande a ete enregistree localement et sera visible dans Mes devis.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/client/devis" className="flex-1 rounded bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-on-primary">
              Mes devis
            </Link>
            <Link to="/catalogue" className="flex-1 rounded border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
              Continuer achats
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`col-span-12 min-h-screen bg-surface px-4 pb-8 text-left text-on-surface md:px-8 lg:col-span-10 ${isEmbeddedPortal ? "pt-8" : "pt-28"}`}>
      <PublicTopbar />
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex items-center rounded border-2 border-primary px-4 py-2 font-mono text-xs font-black uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white"
              type="button"
            >
              &lt; Retour
            </button>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Espace approvisionnement</p>
            <h1 className="mt-2 text-3xl font-black text-white">Panier et demande de devis</h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
              {cart.cartCount} article(s) selectionne(s)
            </p>
          </div>
          <Link to="/catalogue" className="rounded border border-white/10 px-5 py-3 text-center text-xs font-black uppercase tracking-widest text-white hover:border-primary hover:text-primary">
            Ajouter produits
          </Link>
        </div>

        {cart.items.length === 0 ? (
          <section className="mx-auto max-w-xl rounded-xl border border-outline-variant bg-surface-container p-10 text-center">
            <h2 className="text-2xl font-black text-white">Votre panier est vide</h2>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              Ajoutez des articles depuis le catalogue pour generer une demande de devis.
            </p>
            <Link to="/catalogue" className="mt-6 inline-flex rounded bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-on-primary">
              Explorer catalogue
            </Link>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            <section className="space-y-6 lg:col-span-8">
              <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container divide-y divide-white/5">
                {cart.items.map((item) => (
                  <article key={item.product.id} className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded border border-white/10 bg-surface-container-low font-mono text-[10px] text-primary">
                      {item.product.brand}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <Link to={`/product/${item.product.id}`} className="text-lg font-black text-white hover:text-primary">
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-on-surface-variant">{item.product.unit}</p>
                      <p className="mt-2 font-mono text-xs text-primary">{formatPrice(item.product.price)} / unite</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => cart.updateQuantity(item.product.id, event.target.value)}
                        className="w-20 rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-center font-mono text-white outline-none focus:border-primary"
                      />
                      <div className="w-28 text-right font-mono text-sm font-bold text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <button onClick={() => cart.removeItem(item.product.id)} className="rounded border border-white/10 px-3 py-2 text-xs font-bold text-error hover:bg-error/10" type="button">
                        Retirer
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="rounded-xl border border-outline-variant bg-surface-container-low p-6">
                <h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-white">Logistique</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["standard", "Transport standard", "3 a 5 jours ouvrables"],
                    ["express", "Express prioritaire", "24h a 48h"],
                  ].map(([id, title, text]) => (
                    <button
                      key={id}
                      onClick={() => setShippingMethod(id)}
                      className={`rounded-xl border p-4 text-left transition ${
                        shippingMethod === id
                          ? "border-primary bg-primary/10"
                          : "border-outline-variant bg-surface-container hover:border-white/30"
                      }`}
                      type="button"
                    >
                      <span className="block text-sm font-bold text-white">{title}</span>
                      <span className="mt-1 block font-mono text-[11px] text-on-surface-variant">{text}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 rounded border border-white/10 bg-surface-container-lowest p-4 font-mono text-xs text-on-surface-variant">
                  Arrivee estimee: <span className="text-white">{estimatedDates}</span>
                </div>
              </div>
            </section>

            <aside className="lg:col-span-4">
              <form onSubmit={submitQuote} className="sticky top-24 rounded-xl border border-outline-variant bg-surface-container p-6">
                <h2 className="text-xl font-black text-white">Recapitulatif devis</h2>
                <div className="mt-5 space-y-3 border-b border-white/5 pb-5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Sous-total HT</span>
                    <span className="text-white">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Transport estime</span>
                    <span className="text-white">{formatPrice(freightCost)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black">
                    <span className="text-on-surface-variant">Total estime</span>
                    <span className="text-tertiary">{formatPrice(totalEstimate)}</span>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Entreprise</label>
                    <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} required className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-3 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Email contact</label>
                    <input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} required className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-3 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <button className="w-full rounded bg-tertiary px-5 py-4 text-xs font-black uppercase tracking-widest text-on-tertiary transition hover:brightness-110" type="submit">
                    Envoyer demande de devis
                  </button>
                </div>
              </form>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
