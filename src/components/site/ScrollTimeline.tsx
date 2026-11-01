import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { BadgeCheck, ClipboardList, SearchCheck, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Step = {
  n: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Αφήνετε τα στοιχεία σας",
    text: "Συμπληρώνετε όνομα και τηλέφωνο. Χρειάζεται λιγότερο από ένα λεπτό και είναι 100% δωρεάν.",
    icon: ClipboardList,
  },
  {
    n: "02",
    title: "Ελέγχουμε την αγορά",
    text: "Σύγκριση προγραμμάτων και χρεώσεων όλων των παρόχων, με βάση το δικό σας προφίλ κατανάλωσης.",
    icon: SearchCheck,
  },
  {
    n: "03",
    title: "Επιλέγετε την καλύτερη προσφορά",
    text: "Σας παρουσιάζουμε καθαρά τις επιλογές και αποφασίζετε εσείς — χωρίς πίεση, χωρίς δέσμευση.",
    icon: BadgeCheck,
  },
];

export function ScrollTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const sparkTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      {/* Track */}
      <div className="absolute bottom-0 left-6 top-0 w-[3px] -translate-x-1/2 rounded-full bg-border md:left-1/2" />
      {/* Animated fill */}
      <motion.div
        style={{ scaleY: progress }}
        className="absolute bottom-0 left-6 top-0 w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-primary md:left-1/2"
      />
      {/* Travelling spark */}
      <motion.div
        style={{ top: sparkTop }}
        className="absolute left-6 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
      >
        <span className="block size-4 rounded-full bg-sun shadow-lift ring-4 ring-sun-soft" />
      </motion.div>

      <ol className="relative flex flex-col gap-16 md:gap-24">
        {STEPS.map((step, i) => (
          <TimelineItem
            key={step.n}
            step={step}
            index={i}
            progress={progress}
            threshold={(i + 0.15) / STEPS.length}
          />
        ))}
      </ol>
    </div>
  );
}

function TimelineItem({
  step,
  index,
  progress,
  threshold,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
  threshold: number;
}) {
  const left = index % 2 === 0;
  const Icon = step.icon;
  const active = useTransform(progress, [threshold - 0.08, threshold], [0, 1]);
  const dotScale = useTransform(active, [0, 1], [0.8, 1]);
  const ringOpacity = useTransform(active, [0, 1], [0, 1]);

  return (
    <li className="relative grid items-center pl-16 md:grid-cols-2 md:gap-16 md:pl-0">
      {/* Node */}
      <motion.div
        style={{ scale: dotScale }}
        className="absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
      >
        <span className="relative flex size-12 items-center justify-center rounded-full border border-border bg-card shadow-card">
          <motion.span
            style={{ opacity: ringOpacity }}
            className="absolute inset-0 rounded-full bg-gradient-primary"
          />
          <Icon className="relative size-5 text-primary-deep" />
          <motion.span style={{ opacity: ringOpacity }} className="absolute inset-0 flex items-center justify-center">
            <Icon className="size-5 text-primary-foreground" />
          </motion.span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: left ? -40 : 40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(left ? "md:col-start-1 md:pr-4 md:text-right" : "md:col-start-2 md:pl-4")}
      >
        <div className="rounded-3xl border border-border bg-card p-7 shadow-card transition-shadow hover:shadow-lift">
          <span className="font-display text-5xl font-semibold text-primary/20">{step.n}</span>
          <h3 className="mt-2 text-2xl font-semibold">{step.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{step.text}</p>
        </div>
      </motion.div>
    </li>
  );
}
