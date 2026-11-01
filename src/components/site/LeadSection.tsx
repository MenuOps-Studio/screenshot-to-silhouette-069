import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { FreeBadge, LeadForm } from "./LeadForm";

const POINTS = [
  "Σύγκριση όλων των παρόχων της αγοράς",
  "Ανάλυση του δικού σας προφίλ κατανάλωσης",
  "Ενημέρωση την κατάλληλη στιγμή",
];

export function LeadSection({
  id = "contact",
  title = "Πριν αλλάξεις πάροχο, μάθε τι πραγματικά σε συμφέρει.",
  subtitle = "Σύγκριση προγραμμάτων και χρεώσεων για την σωστή επιλογή που σας αξίζει.",
}: {
  id?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section id={id} className="container-page scroll-mt-24 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid overflow-hidden rounded-[2rem] border border-border bg-band shadow-card lg:grid-cols-[1.1fr_1fr]"
      >
        <div className="flex flex-col justify-center p-8 md:p-12">
          <FreeBadge className="self-start" />
          <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">{subtitle}</p>
          <ul className="mt-8 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-foreground">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card/80 p-8 backdrop-blur md:p-12">
          <LeadForm />
        </div>
      </motion.div>
    </section>
  );
}
