import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CartContext from "../CartContext";

function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function QuotesPage() {
  const cart = useContext(CartContext);

  useEffect(() => {
    document.title = "Mes devis | QuinStock";
  }, []);

  return (
    <main className="col-span-12 min-h-screen bg-surface px-4 py-8 text-on-surface md:px-8 lg:col-span-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Historique</p>
            <h1 className="mt-2 text-3xl font-black text-white">Mes demandes de devis</h1>
          </div>
          <Link to="/client/catalogue" className="rounded bg-primary px-5 py-3 text-center text-xs font-black uppercase tracking-widest text-on-primary">
            Nouveau devis
          </Link>
        </div>

        {cart.quotes.length === 0 ? (
          <section className="rounded-xl border border-outline-variant bg-surface-container p-10 text-center">
            <h2 className="text-2xl font-black text-white">Aucun devis pour le moment</h2>
            <p className="mt-3 text-sm text-on-surface-variant">Ajoutez des produits au panier puis envoyez une demande.</p>
          </section>
        ) : (
          <div className="space-y-4">
            {cart.quotes.map((quote) => (
              <article key={quote.id} className="rounded-xl border border-outline-variant bg-surface-container p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">{quote.id}</p>
                    <h2 className="mt-2 text-xl font-black text-white">{quote.companyName}</h2>
                    <p className="mt-1 text-sm text-on-surface-variant">{quote.contactEmail}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="rounded border border-tertiary/30 bg-tertiary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-tertiary">
                      En analyse
                    </span>
                    <p className="mt-3 font-mono text-lg font-black text-white">{formatPrice(quote.subtotal)}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-2 border-t border-white/5 pt-5 md:grid-cols-2">
                  {quote.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between rounded border border-white/5 bg-surface-container-low px-3 py-2 font-mono text-xs">
                      <span className="truncate text-on-surface-variant">{item.product.name}</span>
                      <span className="pl-3 text-white">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default QuotesPage;
