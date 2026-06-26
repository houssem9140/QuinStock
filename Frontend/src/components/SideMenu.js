import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";

const adminLinks = [
  { label: "Dashboard", href: "/admin", code: "01" },
  { label: "Catalogue", href: "/admin/inventory", code: "02" },
  { label: "Commandes", href: "/admin/purchase-details", code: "03" },
  { label: "Devis", href: "/admin/sales", code: "04" },
  { label: "Clients", href: "/admin/manage-store", code: "05" },
];

const clientLinks = [
  { label: "Accueil", href: "/client", code: "01" },
  { label: "Catalogue", href: "/client/catalogue", code: "02" },
  { label: "Panier", href: "/client/cart", code: "03" },
  { label: "Mes devis", href: "/client/devis", code: "04" },
  { label: "Historique achats", href: "/client/achats", code: "05" },
];

function SideMenu() {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const currentUser = authContext.currentUser || {};
  const links = authContext.isAdmin ? adminLinks : clientLinks;
  const displayName =
    [currentUser.firstName, currentUser.lastName].filter(Boolean).join(" ") ||
    currentUser.companyName ||
    "Client Pro";

  return (
    <div className="flex h-full w-full flex-col justify-between border-r border-white/10 bg-surface-container-lowest px-3 py-6">
      <nav className="flex flex-col gap-2">
        <p className="mb-3 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
          Navigation
        </p>
        {links.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`group rounded border px-3 py-3 transition ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-transparent text-on-surface-variant hover:border-white/10 hover:bg-surface-container hover:text-white"
              }`}
            >
              <span className="mb-2 block font-mono text-[10px] font-bold tracking-widest opacity-70">
                {item.code}
              </span>
              <span className="text-sm font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded border border-white/10 bg-surface-container p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded bg-primary font-black text-on-primary">
          {displayName.slice(0, 1).toUpperCase()}
        </div>
        <p className="truncate text-sm font-bold text-white">{displayName}</p>
        <p className="mt-1 truncate font-mono text-[10px] text-on-surface-variant">
          {currentUser.email}
        </p>
      </div>
    </div>
  );
}

export default SideMenu;
