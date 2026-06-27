import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import { register } from "../api/authApi";
import PublicTopbar from "../components/PublicTopbar";

const heroImage = `${process.env.PUBLIC_URL}/hardware-hero.webp`;

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  companyName: "",
  taxId: "",
  address: "",
};

function Register() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const passwordRules = [
    { label: "8 caracteres minimum", valid: form.password.length >= 8 },
    { label: "1 lettre majuscule", valid: /[A-Z]/.test(form.password) },
    { label: "1 lettre minuscule", valid: /[a-z]/.test(form.password) },
    { label: "1 chiffre", valid: /\d/.test(form.password) },
  ];
  const isPasswordValid = passwordRules.every((rule) => rule.valid);

  useEffect(() => {
    document.title = "Signup | QuinStock";
  }, []);

  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerUser = async (event) => {
    event.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Le mot de passe doit contenir au moins 8 caracteres, 1 majuscule, 1 minuscule et 1 chiffre.");
      return;
    }

    setIsSubmitting(true);

    try {
      const authPayload = await register({ ...form, role: "client" });
      authContext.signin(authPayload, () => {
        navigate("/");
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <PublicTopbar />

      <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-32 md:px-16">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" width="1600" height="900" fetchPriority="high" decoding="async" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/80" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="hidden pt-12 lg:block">
            <span className="mb-6 inline-block rounded-sm border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              Onboarding B2B
            </span>
            <h1 className="text-5xl font-black leading-none tracking-tight text-white">
              Creez votre compte professionnel.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-on-surface-variant">
              Votre compte donne acces au catalogue, aux devis et aux commandes avec livraison rapide sur toute la Tunisie.
            </p>
          </div>

          <form onSubmit={registerUser} className="rounded-xl border border-white/10 bg-surface-container/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
            <div className="mb-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Compte client</p>
              <h2 className="mt-3 text-3xl font-black text-white">Inscription</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Creez un compte B2B ou B2C. La societe et le matricule fiscal sont optionnels.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["firstName", "Prenom", "text", true],
                ["lastName", "Nom", "text", true],
                ["email", "Email professionnel", "email", true],
                ["password", "Mot de passe", "password", true],
                ["companyName", "Societe (optionnel)", "text", false],
                ["phoneNumber", "Telephone", "tel", true],
                ["taxId", "Matricule fiscal (optionnel)", "text", false],
              ].map(([name, label, type, required]) => (
                <div key={name} className={name === "taxId" ? "md:col-span-2" : ""}>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    {label}
                  </label>
                  <div className={name === "password" ? "relative" : ""}>
                    <input
                      name={name}
                      type={name === "password" ? (showPassword ? "text" : "password") : type}
                      required={required}
                      value={form[name]}
                      onChange={handleInputChange}
                      className={`w-full rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-white outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary ${name === "password" ? "pr-12" : ""}`}
                    />
                    {name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((visible) => !visible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition hover:text-primary"
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    )}
                  </div>
                  {name === "password" && (
                    <div className="mt-3 grid gap-1">
                      {passwordRules.map((rule) => (
                        <p key={rule.label} className={`font-mono text-[10px] uppercase tracking-widest ${rule.valid ? "text-primary" : "text-on-surface-variant"}`}>
                          {rule.valid ? "OK" : "--"} {rule.label}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Adresse facturation / livraison
                </label>
                <textarea
                  name="address"
                  rows="3"
                  value={form.address}
                  onChange={handleInputChange}
                  className="w-full rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-white outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary"
                />
              </div>
            </div>

            <label className="mt-5 flex items-center gap-2 text-sm text-on-surface-variant">
              <input required type="checkbox" className="h-4 w-4 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary" />
              J'accepte les conditions professionnelles.
            </label>

            {error && <p className="mt-4 rounded border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">{error}</p>}

            <button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded bg-primary px-6 py-4 text-xs font-black uppercase tracking-widest text-on-primary transition hover:bg-primary-container disabled:opacity-60">
              {isSubmitting ? "Creation..." : "Creer le compte"}
            </button>

            <p className="mt-6 text-center text-sm text-on-surface-variant">
              Deja inscrit ? <Link to="/login" className="font-bold text-primary hover:underline">Se connecter</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
