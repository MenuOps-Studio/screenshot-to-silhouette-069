import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, BellRing, Compass, Eye, Handshake, UserCheck } from "lucide-react";

//import consultantImg from "@/assets/consultant.jpg";
import { Button } from "@/components/ui/button";
import { FreeBadge, LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Σχετικά & Υπηρεσίες · Η Σύμβουλος Ενέργειάς σας" },
      {
        name: "description",
        content:
          "Έμπειρη σύμβουλος ενέργειας που συνεργάζεται με όλους τους παρόχους στην Ελλάδα. 100% δωρεάν ενημέρωση και παρακολούθηση της αγοράς.",
      },
      { property: "og:title", content: "Η σωστή επιλογή απαιτεί πάντα και την σωστή ενημέρωση" },
      {
        property: "og:description",
        content: "Δωρεάν ενεργειακή καθοδήγηση, προσαρμοσμένη στις δικές σας ανάγκες.",
      },
    ],
  }),
  component: AboutPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    icon: Compass,
    title: "Πλήρης καθοδήγηση",
    text: "Από την πρώτη επικοινωνία μέχρι την τελική σας επιλογή.",
  },
  {
    icon: Eye,
    title: "Παρακολούθηση αγοράς",
    text: "Δωρεάν και συνεχής, προσαρμοσμένη στις δικές σας ανάγκες.",
  },
  {
    icon: BellRing,
    title: "Άμεση ενημέρωση",
    text: "Την κατάλληλη στιγμή, όταν πρέπει να κάνετε μια κίνηση.",
  },
  {
    icon: UserCheck,
    title: "Το δικό σας προφίλ",
    text: "Κάθε πρόταση βασίζεται στο προφίλ κατανάλωσής σας.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-14 md:pt-20 pb-0">
        
        {/* --- 1. FULL WIDTH BACKGROUND ΣΕ ΟΛΗ ΤΗΝ ΟΘΟΝΗ --- */}
        <div className="absolute inset-0 z-0">
          <img
            src="/office-bg.jpg"
            alt="Φόντο Γραφείο"
            className="h-full w-full object-cover object-center"
          />
          {/* Αφαιρέσαμε το blur. Κρατάμε μόνο ένα λευκό φίλτρο (80%) για να κάνει αντίθεση με τα μαύρα γράμματα */}
          <div className="absolute inset-0 bg-white/80"></div>
        </div>

        {/* Αλλαγή σε items-end για να "καθίσουν" τα στοιχεία στο κάτω μέρος */}
        <div className="container-page relative z-10 grid items-end gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          
          {/* --- 2. ΜΠΛΟΚ ΕΙΚΟΝΑΣ --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative mx-auto w-full max-w-lg flex justify-center items-end"
          >
            {/* Η σιλουέτα (μεγεθυμένη) */}
            <img
              src="/mama.png"
              alt="Κική Καλούδη"
              className="relative z-10 w-[110%] max-w-none h-auto object-contain drop-shadow-2xl"
            />

            {/* Το badge "Όλοι οι πάροχοι" */}
            <div className="absolute bottom-8 -right-4 flex items-center gap-3 rounded-2xl border border-border bg-white/95 backdrop-blur p-4 shadow-lift md:-right-4 z-20">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Handshake className="size-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Όλοι οι πάροχοι</p>
                <p className="text-xs text-muted-foreground">ενέργειας στην Ελλάδα</p>
              </div>
            </div>
          </motion.div>

          {/* --- 3. ΜΠΛΟΚ ΚΕΙΜΕΝΟΥ --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="pb-14 md:pb-20"
          >
            <span className="eyebrow bg-white/80 px-4 py-1.5 rounded-full shadow-sm text-slate-800 font-semibold border border-slate-200">Σχετικά & Υπηρεσίες</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl text-slate-900 drop-shadow-sm">
              Η σωστή επιλογή απαιτεί πάντα και την σωστή ενημέρωση.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-slate-800 font-medium">
              Η σωστή επιλογή απαιτεί πάντα και την σωστή ενημέρωση. Στόχος μου είναι η πλήρης
              καθοδήγησή σας με 100% δωρεάν ενημέρωση. Παρέχω δωρεάν παρακολούθηση της αγοράς,
              προσαρμοσμένη απόλυτα στις δικές σας ανάγκες. Είμαι δίπλα σας για να σας ενημερώνω
              άμεσα, την κατάλληλη στιγμή, όταν πρέπει να κάνετε μια κίνηση για το συμφέρον σας,
              λαμβάνοντας υπόψη το προφίλ κατανάλωσής σας και τη συνεχή κίνηση της αγοράς ενέργειας.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <FreeBadge />
              <span className="text-sm text-slate-900 font-bold bg-white/50 px-3 py-1 rounded-lg">
                Έμπειρη σύμβουλος · Συνεργασία με όλους τους παρόχους
              </span>
            </div>
          </motion.div>
          
        </div>
      </section>

      <section className="container-page pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Τι κάνω για εσάς</span>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Δίπλα σας σε κάθε βήμα</h2>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="container-page pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-[2.25rem] border border-border bg-band px-6 py-16 text-center shadow-lift md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-sun/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-primary/15 blur-3xl" />
          <h2 className="relative mx-auto max-w-3xl text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Πριν αλλάξεις πάροχο, μάθε τι πραγματικά σε συμφέρει.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Συμπληρώστε τη φόρμα και θα σας καλέσω για μια 100% δωρεάν ενημέρωση.
          </p>
          <Button
            asChild
            variant="hero"
            size="xl"
            className="relative mt-8"
          >
            <a href="#contact">
              Στη φόρμα επικοινωνίας
              <ArrowDown />
            </a>
          </Button>
        </motion.div>

        <div id="contact" className="mx-auto mt-12 max-w-xl scroll-mt-28">
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-card md:p-10">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold">Δωρεάν Ενημέρωση</h3>
              <FreeBadge />
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
