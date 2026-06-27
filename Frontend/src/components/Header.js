import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, LanguageIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";
import CartContext from "../CartContext";
import LanguageContext from "../LanguageContext";

const adminNavigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Catalogue", href: "/admin/inventory" },
  { name: "Commandes", href: "/admin/purchase-details" },
  { name: "Devis", href: "/admin/sales" },
  { name: "Clients", href: "/admin/manage-store" },
];

const clientNavigation = [
  { name: "Accueil", href: "/client" },
  { name: "Catalogue", href: "/client/catalogue" },
  { name: "Mes devis", href: "/client/devis" },
  { name: "Achats", href: "/client/achats" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const authContext = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { language, t, toggleLanguage } = useContext(LanguageContext);
  const location = useLocation();
  const currentUser = authContext.currentUser || {};
  const menuItems = authContext.isAdmin ? adminNavigation : clientNavigation;
  const isActiveRoute = (href) =>
    href === "/admin" || href === "/client"
      ? location.pathname === href
      : location.pathname.startsWith(href);
  const displayName =
    [currentUser.firstName, currentUser.lastName].filter(Boolean).join(" ") ||
    currentUser.companyName ||
    "Compte pro";

  return (
    <Disclosure as="header" className="sticky top-0 z-50 border-b border-white/10 bg-surface/95 backdrop-blur-xl">
      {({ open }) => (
        <>
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-8">
            <Link to={authContext.isAdmin ? "/admin" : "/client"} className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_24px_rgba(170,199,255,0.65)]" />
              <div className="leading-none">
                <span className="block text-sm font-black tracking-tight text-white md:text-lg">
                  QUIN<span className="text-primary">STOCK</span>
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-widest text-primary md:block">
                  {authContext.isAdmin ? "ADMIN_CONSOLE" : "CLIENT_PORTAL"}
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {menuItems.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={classNames(
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-transparent text-on-surface-variant hover:border-primary hover:bg-primary hover:text-white",
                      "rounded border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 rounded border border-white/10 bg-surface-container px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-on-surface-variant transition hover:border-primary hover:bg-primary hover:text-white"
                type="button"
                title={t.language}
              >
                <LanguageIcon className="h-4 w-4" />
                {language.toUpperCase()}
              </button>
              <Link
                to={authContext.isAdmin ? "/admin/sales" : "/client/cart"}
                className="cart-link relative flex items-center gap-2 overflow-visible rounded border border-white/10 bg-surface-container px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <ShoppingCartIcon key={`private-cart-icon-${cart.cartAnimationId}`} className="cart-bounce h-4 w-4" />
                <span>{cart.cartCount}</span>
                {cart.cartAnimationId > 0 && (
                  <span key={cart.cartAnimationId} className="cart-fly-badge" aria-hidden="true">
                    +1
                  </span>
                )}
              </Link>
              <button
                type="button"
                className="rounded border border-white/10 bg-surface-container p-2 text-on-surface-variant transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <span className="sr-only">Notifications</span>
                <BellIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-3 rounded border border-white/10 bg-surface-container px-3 py-2 text-left transition hover:border-primary hover:bg-surface-container-high">
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-black text-on-primary">
                    {displayName.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="hidden leading-tight lg:block">
                    <span className="block text-xs font-bold text-white">{displayName}</span>
                    <span className="block max-w-[180px] truncate font-mono text-[10px] text-on-surface-variant">
                      {currentUser.email}
                    </span>
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded border border-white/10 bg-surface-container-high py-1 shadow-2xl focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/login"
                          onClick={() => authContext.signout()}
                          className={classNames(
                            active ? "bg-surface-container-highest text-white" : "text-on-surface-variant",
                            "block px-4 py-3 text-sm"
                          )}
                        >
                          Deconnexion
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <Disclosure.Button className="inline-flex items-center justify-center rounded border border-white/10 bg-surface-container p-2 text-on-surface-variant transition hover:border-primary hover:bg-primary hover:text-white md:hidden">
              <span className="sr-only">Menu</span>
              {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </Disclosure.Button>
          </div>

          <Disclosure.Panel className="border-t border-white/10 bg-surface-container md:hidden">
            <div className="space-y-1 px-4 py-4">
              {menuItems.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Disclosure.Button
                    key={item.href}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/10 text-on-surface-variant hover:border-primary hover:bg-primary hover:text-white",
                      "block rounded border px-4 py-3 text-sm font-bold transition"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
              <Disclosure.Button
                as="button"
                onClick={toggleLanguage}
                className="flex w-full items-center gap-2 rounded border border-white/10 px-4 py-3 text-sm font-bold text-on-surface-variant transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <LanguageIcon className="h-5 w-5" />
                {t.language}: {language.toUpperCase()}
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to={authContext.isAdmin ? "/admin/sales" : "/client/cart"}
                className="cart-link relative flex items-center gap-2 overflow-visible rounded border border-white/10 px-4 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <ShoppingCartIcon key={`mobile-cart-icon-${cart.cartAnimationId}`} className="cart-bounce h-5 w-5" />
                Panier ({cart.cartCount})
                {cart.cartAnimationId > 0 && (
                  <span key={cart.cartAnimationId} className="cart-fly-badge" aria-hidden="true">
                    +1
                  </span>
                )}
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/login"
                onClick={() => authContext.signout()}
                className="block rounded border border-white/10 px-4 py-3 text-sm font-bold text-primary"
              >
                Deconnexion
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
