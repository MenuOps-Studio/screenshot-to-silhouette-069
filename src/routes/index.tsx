import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Home, Quote, ShieldCheck, Sparkles, Zap } from "lucide-react";

import heroImg from "@/assets/hero-home.jpg";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "@/components/site/LeadDialog";
import { FreeBadge } from "@/components/site/LeadForm";
import { LeadSection } from "@/components/site/LeadSection";
import { ScrollTimeline } from "@/components/site/ScrollTimeline";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Βρες το ρεύμα που σε συμφέρει · Δωρεάν Σύμβουλος Ενέργειας" },
      {
        name: "description",
        content:
          "100% δωρεάν σύγκριση προγραμμάτων και χρεώσεων ρεύματος από όλους τους παρόχους στην Ελλάδα. Αφήστε τα στοιχεία σας και βρείτε την καλύτερη προσφορά.",
      },
      { property: "og:title", content: "Βρες το ρεύμα που σε συμφέρει" },
      {
        property: "og:description",
        content: "100% δωρεάν σύγκριση προγραμμάτων ρεύματος από όλους τους παρόχους στην Ελλάδα.",
      },
    ],
  }),
  component: Index,
});

const ease = [0.22, 1, 0.36, 1] as const;

function Index() {
  const { openLead } = useLeadDialog();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="container-page grid items-center gap-12 pb-20 pt-12 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <FreeBadge />
              <span className="text-sm text-muted-foreground">Για σπίτια & επιχειρήσεις</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="mt-6 text-5xl font-semibold leading-[1.05] text-foreground md:text-6xl lg:text-7xl"
            >
              Βρες το ρεύμα που{" "}
              <span className="relative whitespace-nowrap text-primary">
                σε συμφέρει
                <svg
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 left-0 h-3 w-full text-sun"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 9 C 80 2, 200 2, 298 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease }}
                  />
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              Σύγκριση προγραμμάτων και χρεώσεων για την σωστή επιλογή που σας αξίζει. Προσωπική
              καθοδήγηση από έμπειρη σύμβουλο — εντελώς δωρεάν για εσάς.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button variant="hero" size="xl" onClick={openLead}>
                Δωρεάν Ενημέρωση
                <ArrowRight />
              </Button>
              <Button variant="outlineSoft" size="xl" asChild>
                <Link to="/advantages">Δείτε τα πλεονεκτήματα</Link>
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              {["Όλοι οι πάροχοι στην Ελλάδα", "Χωρίς δέσμευση", "Προσωπική εξυπηρέτηση"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
              <img
                src={heroImg}
                alt="Φωτεινό σπίτι με θέα στη θάλασσα"
                width={1536}
                height={1152}
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 pr-6 shadow-lift backdrop-blur md:-left-8"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-sun-soft text-sun-foreground">
                <Zap className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Δωρεάν παρακολούθηση</p>
                <p className="text-xs text-muted-foreground">της αγοράς ενέργειας</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease }}
              className="absolute -right-3 top-6 hidden items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2 text-sm font-medium shadow-soft backdrop-blur sm:flex md:-right-6"
            >
              <Sparkles className="size-4 text-primary" />
              100% Δωρεάν
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <section className="container-page py-16">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <Quote className="size-8 text-sun" />
          <p className="mt-4 font-display text-3xl leading-snug text-foreground md:text-4xl">
            Η σωστή επιλογή απαιτεί πάντα και την σωστή ενημέρωση.
          </p>
        </motion.blockquote>
      </section>

      {/* TIMELINE */}
      <section className="bg-surface py-24">
        <div className="container-page">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="eyebrow">Πώς λειτουργεί</span>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Τρία απλά βήματα</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Σύγκριση προγραμμάτων και χρεώσεων για την σωστή επιλογή που σας αξίζει.
            </p>
          </div>
          <ScrollTimeline />
        </div>
      </section>

      {/* AUDIENCE CARDS */}
      <section className="container-page pt-24">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Home,
              title: "Για το Σπίτι",
              text: "Χαμηλότεροι λογαριασμοί και προγράμματα που ταιριάζουν στην καθημερινότητα της οικογένειάς σας.",
            },
            {
              icon: Building2,
              title: "Για την Επιχείρηση",
              text: "Έλεγχος ενεργειακού κόστους και επαγγελματικά τιμολόγια προσαρμοσμένα στη λειτουργία σας.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <Link
                to="/advantages"
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <c.icon className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 flex-1 text-muted-foreground">{c.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Δείτε τα πλεονεκτήματα
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <LeadSection title="Κάνε την έξυπνη επιλογή χωρίς να σου κοστίσει." />
    </>
  );
}
