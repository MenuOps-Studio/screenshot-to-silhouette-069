import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BellRing,
  Building2,
  FileSearch,
  Gauge,
  HandCoins,
  Handshake,
  Home,
  Layers,
  LineChart,
  PiggyBank,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import businessImg from "@/assets/business.jpg";
import heroImg from "@/assets/hero-home.jpg";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "@/components/site/LeadDialog";
import { FreeBadge } from "@/components/site/LeadForm";
import { LeadSection } from "@/components/site/LeadSection";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/advantages")({
  head: () => ({
    meta: [
      { title: "Πλεονεκτήματα για Σπίτι & Επιχείρηση · Σωστή Επιλογή" },
      {
        name: "description",
        content:
          "Δείτε πώς η δωρεάν ενεργειακή συμβουλευτική βοηθά νοικοκυριά και επιχειρήσεις να επιλέξουν το πρόγραμμα που τους συμφέρει.",
      },
      { property: "og:title", content: "Κάνε την έξυπνη επιλογή χωρίς να σου κοστίσει" },
      {
        property: "og:description",
        content: "Πλεονεκτήματα δωρεάν ενεργειακής συμβουλευτικής για σπίτια και επιχειρήσεις.",
      },
    ],
  }),
  component: AdvantagesPage,
});

type Mode = "home" | "business";
type Advantage = { icon: LucideIcon; title: string; text: string };

const CONTENT: Record<
  Mode,
  { eyebrow: string; title: string; intro: string; image: string; imageAlt: string; items: Advantage[] }
> = {
  home: {
    eyebrow: "Για νοικοκυριά",
    title: "Ένας λογαριασμός που βγάζει νόημα",
    intro:
      "Συγκρίνουμε τα οικιακά προγράμματα όλων των παρόχων και σας προτείνουμε αυτό που ταιριάζει στην κατανάλωση του σπιτιού σας.",
    image: heroImg,
    imageAlt: "Φωτεινό σαλόνι σπιτιού",
    items: [
      {
        icon: PiggyBank,
        title: "Χαμηλότερος λογαριασμός",
        text: "Εντοπίζουμε το πρόγραμμα με το καλύτερο κόστος για τη δική σας κατανάλωση.",
      },
      {
        icon: FileSearch,
        title: "Χωρίς ψιλά γράμματα",
        text: "Σας εξηγούμε απλά πάγια, ρήτρες και εκπτώσεις, ώστε να ξέρετε ακριβώς τι πληρώνετε.",
      },
      {
        icon: Gauge,
        title: "Ανάλυση κατανάλωσης",
        text: "Μελετάμε το προφίλ σας (ημερήσιο, νυχτερινό, εποχικό) για ρεαλιστική σύγκριση.",
      },
      {
        icon: BellRing,
        title: "Ενημέρωση τη σωστή στιγμή",
        text: "Σας ειδοποιούμε όταν η αγορά αλλάζει και αξίζει να κάνετε κίνηση.",
      },
      {
        icon: ShieldCheck,
        title: "Ομαλή μετάβαση",
        text: "Σας καθοδηγούμε σε όλη τη διαδικασία αλλαγής παρόχου, βήμα προς βήμα.",
      },
      {
        icon: HandCoins,
        title: "Μηδενικό κόστος για εσάς",
        text: "Η ενημέρωση και η παρακολούθηση είναι 100% δωρεάν, χωρίς καμία δέσμευση.",
      },
    ],
  },
  business: {
    eyebrow: "Για επιχειρήσεις",
    title: "Έλεγχος του ενεργειακού σας κόστους",
    intro:
      "Η ενέργεια είναι από τα μεγαλύτερα λειτουργικά έξοδα. Σας βοηθάμε να επιλέξετε επαγγελματικό τιμολόγιο με γνώμονα τη λειτουργία της επιχείρησής σας.",
    image: businessImg,
    imageAlt: "Σύγχρονη επιχείρηση με φωτοβολταϊκά",
    items: [
      {
        icon: BarChart3,
        title: "Μείωση λειτουργικού κόστους",
        text: "Σύγκριση επαγγελματικών προγραμμάτων για το προφίλ κατανάλωσης της επιχείρησης.",
      },
      {
        icon: Layers,
        title: "Σταθερά ή κυμαινόμενα",
        text: "Σας βοηθάμε να επιλέξετε ανάμεσα σε σταθερή ή κυμαινόμενη χρέωση ανάλογα με το ρίσκο που θέλετε.",
      },
      {
        icon: LineChart,
        title: "Παρακολούθηση αγοράς",
        text: "Συνεχής παρακολούθηση της αγοράς ενέργειας για να κινηθείτε την κατάλληλη στιγμή.",
      },
      {
        icon: Building2,
        title: "Πολλαπλές παροχές",
        text: "Ενιαία εικόνα για καταστήματα, γραφεία ή εγκαταστάσεις σε διαφορετικές τοποθεσίες.",
      },
      {
        icon: Handshake,
        title: "Συνεργασία με όλους τους παρόχους",
        text: "Αντικειμενική σύγκριση χωρίς δέσμευση σε έναν μόνο πάροχο.",
      },
      {
        icon: HandCoins,
        title: "Χωρίς κόστος συμβουλευτικής",
        text: "Η ενημέρωση είναι 100% δωρεάν και για τις επιχειρήσεις.",
      },
    ],
  },
};

function AdvantagesPage() {
  const [mode, setMode] = useState<Mode>("home");
  const { openLead } = useLeadDialog();
  const data = CONTENT[mode];

  return (
    <>
      <section className="bg-hero">
        <div className="container-page pb-10 pt-14 text-center md:pt-20">
          <FreeBadge />
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Κάνε την έξυπνη επιλογή χωρίς να σου κοστίσει.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Επιλέξτε τι σας ενδιαφέρει και δείτε πώς μπορούμε να βοηθήσουμε.
          </p>

          <ModeToggle mode={mode} onChange={setMode} />
        </div>
      </section>

      <section className="container-page pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="eyebrow">{data.eyebrow}</span>
                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{data.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{data.intro}</p>
                <Button variant="hero" size="xl" className="mt-8" onClick={openLead}>
                  Δωρεάν Ενημέρωση
                </Button>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-border shadow-card">
                <img
                  src={data.image}
                  alt={data.imageAlt}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </div>

            <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
                >
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl transition-colors",
                      mode === "home"
                        ? "bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                        : "bg-sun-soft text-sun-foreground group-hover:bg-sun group-hover:text-foreground",
                    )}
                  >
                    <item.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </section>

      <LeadSection
        title="Βρες το ρεύμα που σε συμφέρει."
        subtitle="Σύγκριση προγραμμάτων και χρεώσεων για την σωστή επιλογή που σας αξίζει."
      />
    </>
  );
}

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  const options: { value: Mode; label: string; icon: LucideIcon }[] = [
    { value: "home", label: "Για το Σπίτι", icon: Home },
    { value: "business", label: "Για την Επιχείρηση", icon: Building2 },
  ];
  return (
    <div
      role="tablist"
      aria-label="Επιλογή κατηγορίας"
      className="mx-auto mt-10 inline-flex rounded-full border border-border bg-card p-1.5 shadow-card"
    >
      {options.map((o) => {
        const active = mode === o.value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:px-7 sm:text-base",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 rounded-full bg-gradient-primary shadow-lift"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <o.icon className="relative size-4.5" />
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
