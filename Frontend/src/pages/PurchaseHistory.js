import { useEffect } from "react";
import { Link } from "react-router-dom";

const purchases = [
  { id: "ACH-2401", date: "12/06/2026", category: "Fixation", items: 8, amount: "428,30 EUR", status: "Livre" },
  { id: "ACH-2398", date: "04/06/2026", category: "Outillage", items: 3, amount: "212,80 EUR", status: "Livre" },
  { id: "ACH-2387", date: "28/05/2026", category: "Plomberie", items: 5, amount: "96,40 EUR", status: "Facture" },
  { id: "ACH-2375", date: "17/05/2026", category: "Electricite", items: 11, amount: "318,00 EUR", status: "Livre" },
];

function PurchaseHistory() {
  useEffect(() => {
    document.title = "Historique achats | QuinStock";
  }, []);

  return (
    <main className="col-span-12 min-h-screen bg-surface px-4 py-8 text-on-surface md:px-8 lg:col-span-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Espace Client</p>
            <h1 className="mt-3 font-display text-6xl leading-none tracking-wide text-off-white md:text-8xl">
              HISTORIQUE<br />D'ACHATS.
            </h1>
          </div>
          <Link to="/client/catalogue" className="w-fit rounded bg-primary px-7 py-4 text-sm font-black uppercase tracking-widest text-white">
            Commander encore
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-container">
          {purchases.map((purchase) => (
            <article key={purchase.id} className="grid gap-4 border-b border-white/5 p-5 last:border-b-0 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-center">
              <span className="font-mono text-xs font-bold text-primary">{purchase.id}</span>
              <span className="text-sm font-bold text-white">{purchase.category}</span>
              <span className="text-sm text-on-surface-variant">{purchase.items} article(s)</span>
              <span className="font-mono text-sm text-on-surface-variant">{purchase.date}</span>
              <div className="text-left md:text-right">
                <p className="font-mono text-sm font-bold text-white">{purchase.amount}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-primary">{purchase.status}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default PurchaseHistory;
