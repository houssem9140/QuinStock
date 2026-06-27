import { useContext, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import LanguageContext from "../LanguageContext";
import PublicTopbar from "../components/PublicTopbar";

const heroImage = `${process.env.PUBLIC_URL}/hardware-hero.webp`;

const contactLinks = [
  {
    label: "Telephone",
    value: "+216 00 000 000",
    href: "tel:+21600000000",
    icon: PhoneIcon,
  },
  {
    label: "WhatsApp",
    value: "+216 00 000 000",
    href: "https://wa.me/21600000000",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    label: "Email",
    value: "contact@quinstock.test",
    href: "mailto:contact@quinstock.test",
    icon: EnvelopeIcon,
  },
  {
    label: "Adresse",
    value: "Tunis, Tunisie",
    href: "https://maps.google.com/?q=Tunis%20Tunisie",
    icon: MapPinIcon,
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/quinstock" },
  { label: "Instagram", href: "https://instagram.com/quinstock" },
  { label: "TikTok", href: "https://tiktok.com/@quinstock" },
  { label: "LinkedIn", href: "https://linkedin.com/company/quinstock" },
];

const mapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=10.8239%2C35.7752%2C10.8359%2C35.7832&layer=mapnik&marker=35.7792%2C10.8299";
const mapOpenUrl =
  "https://www.openstreetmap.org/?mlat=35.7792&mlon=10.8299#map=17/35.7792/10.8299";

function ContactPage() {
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    document.title = `${t.contact} | QuinStock`;
  }, [t.contact]);

  return (
    <main className="min-h-screen bg-surface px-4 pb-16 pt-28 text-on-surface md:px-16">
      <PublicTopbar />
      <div className="mx-auto max-w-[1500px]">
        <section className="relative overflow-hidden rounded-xl border border-white/10 bg-surface-container-low p-8 md:p-12">
          <div className="absolute inset-0">
            <img src={heroImage} alt="" width="1600" height="900" decoding="async" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/90 to-surface-container-low/50" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Contact QuinStock</p>
            <h1 className="mt-4 font-display text-6xl leading-none tracking-wide text-off-white md:text-8xl">
              PARLONS<br /><span className="text-primary">COMMANDES</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-on-surface-variant">
              Besoin d'un devis, d'un accompagnement technique ou d'une information sur vos commandes B2B ? Ces liens sont provisoires et seront remplaces par les vrais contacts.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {contactLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="group bg-surface-container p-6 transition hover:bg-surface-container-high"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="font-mono text-[10px] font-black uppercase tracking-widest text-primary">{item.label}</p>
                <p className="mt-3 text-lg font-black text-white group-hover:text-primary">{item.value}</p>
              </a>
            );
          })}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="rounded-xl border border-white/10 bg-surface-container p-6 md:p-8 lg:col-span-7">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Message rapide</p>
            <h2 className="mt-3 font-display text-5xl tracking-wide text-off-white">DEMANDE CONTACT.</h2>
            <form className="mt-6 grid gap-4">
              <input className="rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-white outline-none focus:border-primary" placeholder="Nom / Societe" />
              <input className="rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-white outline-none focus:border-primary" placeholder="Email" />
              <textarea className="min-h-[140px] rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-white outline-none focus:border-primary" placeholder="Votre message" />
              <button className="w-fit rounded bg-primary px-8 py-4 text-xs font-black uppercase tracking-widest text-white" type="button">
                Envoyer plus tard
              </button>
            </form>
          </div>

          <aside className="rounded-xl border border-white/10 bg-rust p-6 md:p-8 lg:col-span-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Reseaux sociaux</p>
            <h2 className="mt-3 font-display text-5xl tracking-wide text-off-white">SUIVEZ-NOUS.</h2>
            <div className="mt-6 grid gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded border border-white/10 bg-black/15 px-4 py-4 text-sm font-black uppercase tracking-widest text-off-white transition hover:border-primary hover:text-primary"
                >
                  {item.label}
                  <span>&gt;</span>
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-surface-container">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-6 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Localisation</p>
              <h2 className="mt-3 font-display text-5xl tracking-wide text-off-white">AVENUE HABIB BOURGUIBA.</h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                Adresse provisoire precisee au centre de Monastir : Avenue Habib Bourguiba, Monastir 5000. Le marqueur rouge indique l'emplacement temporaire.
              </p>
              <a
                href={mapOpenUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-white"
              >
                Ouvrir dans Maps
              </a>
            </div>
            <div className="min-h-[360px] border-t border-white/10 lg:border-l lg:border-t-0">
              <iframe
                title="Carte QuinStock Monastir Centre"
                src={mapUrl}
                className="h-full min-h-[360px] w-full bg-white"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ContactPage;
