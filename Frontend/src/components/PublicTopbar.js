import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import CartContext from "../CartContext";
import LanguageContext from "../LanguageContext";

function PublicTopbar() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const languageContext = useContext(LanguageContext);
  const { language, t, toggleLanguage } = languageContext;
  const location = useLocation();

  if (location.pathname.startsWith("/client") || location.pathname.startsWith("/admin")) {
    return null;
  }

  const accountLink = auth.isAdmin ? "/admin" : "/client";
  const accountLabel = auth.isAdmin ? t.adminDashboard : t.clientSpace;
  const isLoggedIn = auth.isAdmin || auth.isClient;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[96px] max-w-[1600px] items-center justify-between px-6 md:px-16">
        <Link to="/" className="font-display text-4xl tracking-[0.12em] text-off-white">
          QUIN<span className="text-primary">STOCK</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.18em] text-off-white/65 hover:text-primary">{t.home}</Link>
          <Link to="/catalogue" className="text-sm font-bold uppercase tracking-[0.18em] text-off-white/65 hover:text-primary">{t.catalogue}</Link>
          <Link to="/cart" className="text-sm font-bold uppercase tracking-[0.18em] text-off-white/65 hover:text-primary">{t.orders}</Link>
          <Link to="/contact" className="text-sm font-bold uppercase tracking-[0.18em] text-off-white/65 hover:text-primary">{t.contact}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded border border-white/15 px-3 py-3 text-xs font-black uppercase tracking-widest text-off-white transition hover:border-primary hover:text-primary"
            type="button"
            title={t.language}
          >
            <LanguageIcon className="h-4 w-4" />
            {language.toUpperCase()}
          </button>
          <Link to="/cart" className="flex items-center gap-2 rounded border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-widest text-off-white hover:border-primary hover:text-primary">
            <ShoppingCartIcon className="h-4 w-4" />
            {cart.cartCount}
          </Link>
          {isLoggedIn ? (
            <Link to={accountLink} className="rounded bg-primary px-5 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-primary-container md:px-8">
              {accountLabel}
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="rounded border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-widest text-off-white transition hover:border-primary hover:text-primary">
                Login
              </Link>
              <Link to="/register" className="rounded bg-primary px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-primary-container md:px-6">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default PublicTopbar;
