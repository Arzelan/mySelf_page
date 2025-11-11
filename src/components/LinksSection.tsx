import { motion } from "framer-motion";
import { Github, Book, Cloud, Hammer, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

type LinksSectionProps = {
  content: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
};

const linkDetails = [
  {
    icon: Book,
    iconBg: "bg-emerald-50 dark:bg-slate-800",
    iconColor: "text-emerald-600 dark:text-slate-300",
  },
  {
    icon: Cloud,
    iconBg: "bg-sky-50 dark:bg-slate-800",
    iconColor: "text-sky-600 dark:text-slate-300",
  },
  {
    icon: Hammer,
    iconBg: "bg-amber-50 dark:bg-slate-800",
    iconColor: "text-amber-600 dark:text-slate-300",
  },
];

const placeholderLinks = ["https://blog.starrain.vip/", "#cloud", "#toolbox"];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export const LinksSection = ({ content }: LinksSectionProps) => {
  return (
    <>
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight text-[color:var(--page-foreground)] sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 text-lg text-muted">
          {content.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {content.items.map((link, i) => {
          const Icon = linkDetails[i]?.icon || Book;
          const iconBg = linkDetails[i]?.iconBg || "bg-gray-100 dark:bg-slate-800";
          const iconColor = linkDetails[i]?.iconColor || "text-gray-600 dark:text-slate-300";
          return (
            <motion.a
              key={link.title}
              href={placeholderLinks[i] || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 rounded-2xl bg-white dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-700 shadow-md hover:shadow-lg dark:hover:border-slate-600 transition-all duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={i}
            >
              <div className={`flex items-center justify-center h-16 w-16 rounded-xl mb-6 transition-colors duration-300 ${iconBg}`}>
                <Icon className={`h-8 w-8 transition-colors duration-300 ${iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-[color:var(--page-foreground)] mb-2">
                {link.title}
              </h3>
              <p className="text-muted">{link.description}</p>
            </motion.a>
          );
        })}
      </div>
    </>
  );
};
