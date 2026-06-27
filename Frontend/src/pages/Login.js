import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import { login } from "../api/authApi";
import PublicTopbar from "../components/PublicTopbar";

const heroImage = `${process.env.PUBLIC_URL}/hardware-hero.jpg`;

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Connexion | QuinStock";
  }, []);

  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginUser = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Veuillez saisir votre email et votre mot de passe.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await login(form);
      const redirectPath = data.user?.role === "admin" ? "/admin" : "/";

      authContext.signin(data, () => {
        navigate(redirectPath);
      });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <PublicTopbar />

      <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-10 pt-32 md:px-16">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/70" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[1fr_480px] lg:items-center">
          <div className="hidden lg:block">
            <span className="mb-6 inline-block rounded-sm border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              Acces securise B2B
            </span>
            <h1 className="max-w-2xl text-6xl font-black leading-none tracking-tight text-white">
              Connectez votre equipe a QuinStock.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-on-surface-variant">
              Commandez vos pieces, demandez un devis et organisez vos livraisons rapides partout en Tunisie.
            </p>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {[
                ["24H", "Livraison rapide"],
                ["TN", "Toute la Tunisie"],
                ["B2B", "Devis pro"],
              ].map(([value, label]) => (
                <div key={value} className="rounded border border-white/10 bg-surface-container/80 p-4">
                  <p className="font-mono text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-surface-container/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
            <div className="mb-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Login Portal</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Connexion</h2>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                Entrez vos identifiants pour acceder a votre espace client ou admin.
              </p>
            </div>

            <form className="space-y-5" onSubmit={loginUser}>
              <div>
                <label htmlFor="email-address" className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Email professionnel
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-white outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary"
                  placeholder="client.demo@quincaillerie.test"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded border border-outline-variant bg-surface-container-low px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary"
                    placeholder="Votre mot de passe"
                    value={form.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition hover:text-primary"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <label htmlFor="remember-me" className="flex items-center gap-2 text-on-surface-variant">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary"
                  />
                  Se souvenir de moi
                </label>
                <span className="text-primary">Mot de passe oublie ?</span>
              </div>

              {error && (
                <p className="rounded border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded bg-primary px-6 py-4 text-xs font-black uppercase tracking-widest text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="mt-6 rounded border border-white/10 bg-surface-container-low p-4 font-mono text-[11px] text-on-surface-variant">
              <p className="mb-2 font-bold uppercase tracking-widest text-primary">Compte demo client</p>
              <p>client.demo@quincaillerie.test</p>
              <p>client123</p>
            </div>

            <p className="mt-6 text-center text-sm text-on-surface-variant">
              Nouveau client pro ?{" "}
              <Link to="/register" className="font-bold text-primary hover:underline">
                Creer un compte
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
