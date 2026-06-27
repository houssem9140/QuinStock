import React, { lazy, Suspense } from "react";
import Home from "./pages/Home";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./AuthContext";
import CartContext from "./CartContext";
import LanguageContext, { translations } from "./LanguageContext";
import ProtectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";
import { createQuote } from "./api/quoteApi";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Layout = lazy(() => import("./components/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ClientDashboard = lazy(() => import("./pages/ClientDashboard"));
const ClientCatalogue = lazy(() => import("./pages/ClientCatalogue"));
const Inventory = lazy(() => import("./pages/Inventory"));
const NoPageFound = lazy(() => import("./pages/NoPageFound"));
const Store = lazy(() => import("./pages/Store"));
const Sales = lazy(() => import("./pages/Sales"));
const PurchaseDetails = lazy(() => import("./pages/PurchaseDetails"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const QuotesPage = lazy(() => import("./pages/QuotesPage"));
const PurchaseHistory = lazy(() => import("./pages/PurchaseHistory"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface">
      <div className="rounded border border-white/10 bg-surface-container px-6 py-4 font-mono text-xs font-black uppercase tracking-widest text-primary">
        Chargement
      </div>
    </div>
  );
}

const App = () => {
  const [auth, setAuth] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartAnimationId, setCartAnimationId] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [language, setLanguage] = useState("fr");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    const storedCart = JSON.parse(localStorage.getItem("b2b_cart") || "[]");
    const storedQuotes = JSON.parse(localStorage.getItem("b2b_quotes") || "[]");
    const storedLanguage = localStorage.getItem("language");

    if (storedAuth?.token && storedAuth?.user) {
      setAuth(storedAuth);
    }

    if (Array.isArray(storedCart)) {
      setCartItems(storedCart);
    }

    if (Array.isArray(storedQuotes)) {
      setQuotes(storedQuotes);
    }

    if (storedLanguage && translations[storedLanguage]) {
      setLanguage(storedLanguage);
    }

    setLoader(false);
  }, []);

  const signin = (newAuth, callback) => {
    localStorage.setItem("auth", JSON.stringify(newAuth));
    setAuth(newAuth);
    callback?.();
  };

  const signout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  const value = {
    auth,
    user: auth?.user?._id || null,
    currentUser: auth?.user || null,
    token: auth?.token || null,
    signin,
    signout,
    isAdmin: auth?.user?.role === "admin",
    isClient: auth?.user?.role === "client",
  };

  const persistCart = (nextItems) => {
    setCartItems(nextItems);
    localStorage.setItem("b2b_cart", JSON.stringify(nextItems));
  };

  const persistQuotes = (nextQuotes) => {
    setQuotes(nextQuotes);
    localStorage.setItem("b2b_quotes", JSON.stringify(nextQuotes));
  };

  const addItem = (product, quantity = 1) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    const existing = cartItems.find((item) => item.product.id === product.id);
    setCartAnimationId(Date.now());

    if (existing) {
      persistCart(
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        )
      );
      return;
    }

    persistCart([...cartItems, { product, quantity: safeQuantity }]);
  };

  const updateQuantity = (productId, quantity) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    persistCart(
      cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: safeQuantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    persistCart(cartItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    persistCart([]);
  };

  const submitQuote = async ({ companyName, contactEmail, shippingMethod }) => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const payload = {
      items: cartItems,
      shippingMethod,
      companyName,
      contactEmail,
    };

    const response = await createQuote(payload);
    const quote = {
      ...response.quote,
      subtotal: response.quote?.subtotal ?? subtotal,
      items: response.quote?.items || cartItems,
    };

    persistQuotes([quote, ...quotes]);
    clearCart();
    return quote;
  };

  const cartValue = {
    items: cartItems,
    quotes,
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    cartAnimationId,
    subtotal: cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    submitQuote,
  };

  const toggleLanguage = () => {
    const languageOrder = ["fr", "en", "ar"];
    const currentIndex = languageOrder.indexOf(language);
    const nextLanguage = languageOrder[(currentIndex + 1) % languageOrder.length];
    setLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const languageValue = {
    language,
    t: translations[language],
    toggleLanguage,
  };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Chargement...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <CartContext.Provider value={cartValue}>
        <LanguageContext.Provider value={languageValue}>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<ClientCatalogue />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedWrapper roles={["admin"]}>
                      <Layout />
                    </ProtectedWrapper>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="purchase-details" element={<PurchaseDetails />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="manage-store" element={<Store />} />
                </Route>
                <Route
                  path="/client"
                  element={
                    <ProtectedWrapper roles={["client"]}>
                      <Layout />
                    </ProtectedWrapper>
                  }
                >
                  <Route index element={<ClientDashboard />} />
                  <Route path="catalogue" element={<ClientCatalogue />} />
                  <Route path="product/:productId" element={<ProductDetail />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="devis" element={<QuotesPage />} />
                  <Route path="achats" element={<PurchaseHistory />} />
                </Route>
                <Route path="*" element={<NoPageFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LanguageContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
