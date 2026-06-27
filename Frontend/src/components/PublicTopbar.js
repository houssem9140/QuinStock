import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, LanguageIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import CartContext from "../CartContext";
import LanguageContext from "../LanguageContext";

function PublicTopbar() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const languageContext = useContext(LanguageContext);
  const { language, t, toggleLanguage } = languageContext;
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (location.pathname.startsWith("/client") || location.pathname.startsWith("/admin")) {
    return null;
  }

  const accountLink = auth.isAdmin ? "/admin" : "/client";
  const accountLabel = auth.isAdmin ? t.adminDashboard : t.clientSpace;
  const isLoggedIn = auth.isAdmin || auth.isClient;
  const navItems = [
    { to: "/", label: t.home },
    { to: "/catalogue", label: t.catalogue },
    { to: "/cart", label: t.orders },
    { to: "/contact", label: t.contact },
  ];
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[84px] max-w-[1600px] items-center justify-between gap-3 px-3 sm:h-[96px] sm:px-6 md:px-16">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/15 text-off-white transition hover:border-primary hover:text-primary lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            <Link to="/" className="truncate font-display text-2xl tracking-[0.1em] text-off-white min-[380px]:text-3xl sm:text-4xl sm:tracking-[0.12em]">
              QUIN<span className="text-primary">STOCK</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`border-b-2 py-2 text-sm font-bold uppercase tracking-[0.18em] transition ${
                  isActive(item.to)
                    ? "border-primary text-primary"
                    : "border-transparent text-off-white/65 hover:border-white/30 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
            <button
              onClick={toggleLanguage}
              className="hidden items-center gap-1.5 rounded border border-white/15 px-2.5 py-2.5 text-[11px] font-black uppercase tracking-widest text-off-white transition hover:border-primary hover:bg-primary hover:text-white min-[420px]:flex sm:gap-2 sm:px-3 sm:py-3 sm:text-xs"
              type="button"
              title={t.language}
            >
              <LanguageIcon className="h-4 w-4" />
              {language.toUpperCase()}
            </button>
            <Link to="/cart" className={`cart-link relative flex items-center gap-1.5 overflow-visible rounded border px-2.5 py-2.5 text-[11px] font-black uppercase tracking-widest transition sm:gap-2 sm:px-4 sm:py-3 sm:text-xs ${
              isActive("/cart")
                ? "border-primary bg-primary text-white"
                : "border-white/15 text-off-white hover:border-primary hover:bg-primary hover:text-white"
            }`}>
              <ShoppingCartIcon key={`cart-icon-${cart.cartAnimationId}`} className="cart-bounce h-4 w-4" />
              {cart.cartCount}
              {cart.cartAnimationId > 0 && (
                <span key={cart.cartAnimationId} className="cart-fly-badge" aria-hidden="true">
                  +1
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <Link to={accountLink} className="rounded bg-primary px-3 py-2.5 text-[11px] font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-charcoal sm:px-5 sm:py-3 sm:text-sm md:px-8">
                {accountLabel}
              </Link>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link to="/login" className={`rounded border px-2.5 py-2.5 text-[11px] font-black uppercase tracking-widest transition sm:px-4 sm:py-3 sm:text-xs ${
                  isActive("/login")
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/15 text-off-white hover:border-primary hover:bg-primary hover:text-white"
                }`}>
                  Login
                </Link>
                <Link to="/register" className={`hidden rounded px-2.5 py-2.5 text-[11px] font-black uppercase tracking-widest transition min-[420px]:inline-flex sm:px-4 sm:py-3 sm:text-xs md:px-6 ${
                  isActive("/register")
                    ? "bg-white text-charcoal"
                    : "bg-primary text-white hover:bg-white hover:text-charcoal"
                }`}>
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm lg:hidden"
          onClick={closeMenu}
          aria-label="Fermer le menu"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-[70] w-[82vw] max-w-[330px] border-r border-white/10 bg-surface-container-lowest shadow-2xl shadow-black/50 transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[84px] items-center justify-between border-b border-white/10 px-5">
            <Link to="/" onClick={closeMenu} className="font-display text-3xl tracking-[0.12em] text-off-white">
              QUIN<span className="text-primary">STOCK</span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded border border-white/15 text-off-white transition hover:border-primary hover:text-primary"
              aria-label="Fermer le menu"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-5 py-8">
            <p className="mb-5 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-primary">Navigation</p>
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded border px-4 py-4 text-sm font-black uppercase tracking-[0.16em] transition ${
                    isActive(item.to)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-white/10 bg-surface-container text-off-white hover:border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] text-primary">{String(index + 1).padStart(2, "0")}</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t border-white/10 p-5">
            <button
              onClick={toggleLanguage}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-widest text-off-white transition hover:border-primary hover:bg-primary hover:text-white"
              type="button"
            >
              <LanguageIcon className="h-4 w-4" />
              {language.toUpperCase()}
            </button>
            {isLoggedIn ? (
              <Link onClick={closeMenu} to={accountLink} className="flex w-full justify-center rounded bg-primary px-4 py-3 text-xs font-black uppercase tracking-widest text-white">
                {accountLabel}
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link onClick={closeMenu} to="/login" className="flex justify-center rounded border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-widest text-off-white">
                  Login
                </Link>
                <Link onClick={closeMenu} to="/register" className="flex justify-center rounded bg-primary px-4 py-3 text-xs font-black uppercase tracking-widest text-white">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default PublicTopbar;
