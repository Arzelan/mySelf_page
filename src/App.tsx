import { useEffect, useMemo, useState, useCallback, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LinksSection } from "./components/LinksSection";
import { Globe2, Menu, X, ArrowUpRight, Languages, Mail, ExternalLink, SunMedium, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./i18n";
import logo from "./assets/youware-bg.png";

const LANGUAGES = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
];

type ThemeMode = "light" | "dark";

type WorkItem = {
  title: string;
  description: string;
  url: string;
  tags: string[];
};

type TranslationShape = {
  nav: {
    home: string;
    works: string;
    links: string;
    contact: string;
    language: string;
    theme: string;
  };
  themeToggle: {
    darkLabel: string;
    lightLabel: string;
    switchToDark: string;
    switchToLight: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  works: {
    title: string;
    subtitle: string;
    items: WorkItem[];
  };
  links: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: {
      label: string;
      value: string;
    };
    socials: {
      label: string;
      dribbble: string;
      github: string;
      linkedin: string;
    };
  };
  footer: {
    rights: string;
  };
};

const navLinks = [
  { id: "home" },
  { id: "works" },
  { id: "links" },
  { id: "contact" },
] as const;

const revealVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const interactiveSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 26,
  mass: 0.8,
};

const THEME_STORAGE_KEY = "personal-navigator-theme";

const SectionWrapper = ({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) => (
  <section id={id} className={`relative py-24 sm:py-32 ${className ?? ""}`}>
    <div className="section-container">{children}</div>
  </section>
);

const Header = ({
  onToggleLang,
  currentLang,
  onToggleTheme,
  theme,
  strings,
  themeStrings,
}: {
  onToggleLang: (lng: string) => void;
  currentLang: string;
  onToggleTheme: () => void;
  theme: ThemeMode;
  strings: TranslationShape["nav"];
  themeStrings: TranslationShape["themeToggle"];
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-mobile-nav]") && !target.closest("[data-mobile-toggle]")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[color-mix(in_srgb,var(--page-foreground)_14%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_78%,var(--glass-overlay))] backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          <motion.a
            href="#home"
            className="inline-flex items-center gap-3 rounded-full border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_70%,var(--glass-overlay))] px-4 py-2 text-sm font-medium text-[color:var(--page-foreground)] shadow-sm transition hover:border-[color-mix(in_srgb,var(--page-foreground)_20%,transparent)]"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--page-foreground)_10%,transparent)] text-[color:var(--page-foreground)]">
              <Globe2 className="h-4 w-4" />
            </span>
            <span>Chen Li Studio</span>
          </motion.a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map(({ id }, index) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="text-sm font-medium text-muted transition hover:text-[color:var(--page-foreground)]"
                initial="hidden"
                animate="visible"
                custom={index}
                variants={revealVariant}
              >
                {strings[id as keyof typeof strings]}
              </motion.a>
            ))}
            <div className="h-5 w-px bg-[color-mix(in_srgb,var(--page-foreground)_10%,transparent)]" />
            <ThemeToggle mode={theme} onToggle={onToggleTheme} strings={themeStrings} />
            <LanguageSwitcher
              currentLang={currentLang}
              onToggleLang={onToggleLang}
              label={strings.language}
            />
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle mode={theme} onToggle={onToggleTheme} strings={themeStrings} condensed />
            <LanguageSwitcher
              currentLang={currentLang}
              onToggleLang={onToggleLang}
              label={strings.language}
              condensed
            />
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--page-foreground)_8%,transparent)] text-[color:var(--page-foreground)] transition hover:bg-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)]"
              aria-label="Toggle navigation"
              data-mobile-toggle
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden"
            data-mobile-nav
          >
            <div className="section-container space-y-3 pb-6">
                <div className="flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_70%,var(--glass-overlay))] px-5 py-3">
                <span className="text-sm font-medium text-[color:var(--page-foreground)]">{strings.theme}</span>
                <ThemeToggle mode={theme} onToggle={onToggleTheme} strings={themeStrings} condensed />
              </div>
              {navLinks.map(({ id }, index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center justify-between rounded-2xl bg-[color-mix(in_srgb,var(--page-foreground)_6%,transparent)]/10 px-5 py-4 text-base font-medium text-[color:var(--page-foreground)] transition hover:bg-[color-mix(in_srgb,var(--page-foreground)_10%,transparent)]/12"
                  onClick={() => setOpen(false)}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  variants={revealVariant}
                >
                  <span>{strings[id as keyof typeof strings]}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const ThemeToggle = ({
  mode,
  onToggle,
  strings,
  condensed = false,
}: {
  mode: ThemeMode;
  onToggle: () => void;
  strings: TranslationShape["themeToggle"];
  condensed?: boolean;
}) => {
  const iconClass = condensed ? "h-4 w-4" : "h-5 w-5";
  const textLabel = mode === "dark" ? strings.darkLabel : strings.lightLabel;
  const ariaLabel = mode === "dark" ? strings.switchToLight : strings.switchToDark;
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_70%,var(--glass-overlay))] text-[color:var(--page-foreground)] shadow-sm transition hover:border-[color-mix(in_srgb,var(--page-foreground)_20%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--ring-color)] focus-visible:ring-offset-[color:var(--page-bg)] ${
        condensed ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm font-medium"
      }`}
      aria-label={ariaLabel}
    >
      {mode === "dark" ? (
        <SunMedium className={iconClass} />
      ) : (
        <Moon className={iconClass} />
      )}
      {!condensed && <span>{textLabel}</span>}
    </button>
  );
};

const LanguageSwitcher = ({
  currentLang,
  onToggleLang,
  label,
  condensed = false,
}: {
  currentLang: string;
  onToggleLang: (lng: string) => void;
  label: string;
  condensed?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-lang-switcher]") && !target.closest("[data-lang-toggle]")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [open]);

  return (
    <div className="relative" data-lang-switcher>
      <button
        className={`inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_70%,var(--glass-overlay))] text-[color:var(--page-foreground)] shadow-sm transition hover:border-[color-mix(in_srgb,var(--page-foreground)_20%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page-bg)] ${
          condensed ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm font-medium"
        }`}
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        data-lang-toggle
      >
        <Languages className={condensed ? "h-4 w-4" : "h-5 w-5"} />
        {!condensed && <span>{label}</span>}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_75%,var(--glass-overlay))] shadow-xl"
          >
            {LANGUAGES.map(({ code, label: langLabel }) => (
              <button
                key={code}
                onClick={() => {
                  onToggleLang(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-sm transition hover:bg-[color-mix(in_srgb,var(--page-foreground)_10%,transparent)]/15 ${
                  currentLang === code ? "text-[color:var(--page-foreground)]" : "text-muted"
                }`}
                type="button"
              >
                <span>{langLabel}</span>
                {currentLang === code && <span className="text-xs uppercase">•</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HeroSection = ({
  content,
}: {
  content: TranslationShape["hero"];
}) => (
  <SectionWrapper id="home" className="hero-gradient">
    <div className="hero-surface relative overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--accent-emerald)_18%,transparent)] px-4 py-2 text-sm font-medium text-[color:var(--accent-emerald)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="h-6 w-6 rounded-full bg-[color-mix(in_srgb,var(--accent-emerald)_22%,transparent)]" />
            {content.badge}
          </motion.span>

          <motion.h1
            className="text-3xl font-semibold leading-tight text-[color:var(--page-foreground)] sm:text-4xl lg:text-5xl"
            initial="hidden"
            animate="visible"
            variants={revealVariant}
          >
            {content.title}
          </motion.h1>

          <motion.p
            className="text-base leading-relaxed text-muted sm:text-lg"
            initial="hidden"
            animate="visible"
            variants={revealVariant}
            custom={1}
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial="hidden"
            animate="visible"
            variants={revealVariant}
            custom={2}
          >
            <motion.a
              href="#works"
              className="gradient-border inline-flex items-center gap-2 rounded-full bg-[color:var(--page-foreground)] px-6 py-3 text-sm font-semibold text-[color:var(--page-bg)] transition"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={interactiveSpring}
            >
              {content.primaryCta}
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--page-foreground)_20%,transparent)] px-6 py-3 text-sm font-semibold text-[color:var(--page-foreground)] transition"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={interactiveSpring}
            >
              {content.secondaryCta}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="gradient-border overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_70%,var(--glass-overlay))]">
            <img
              src={logo}
              alt="Portfolio preview"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[color-mix(in_srgb,var(--page-foreground)_10%,transparent)]" />
        </motion.div>
      </div>

      <div className="hero-particles pointer-events-none" aria-hidden="true" />
      <div className="hero-sparkles pointer-events-none" aria-hidden="true">
        <span className="hero-sparkle" />
        <span className="hero-sparkle" />
        <span className="hero-sparkle" />
        <span className="hero-sparkle" />
        <span className="hero-sparkle" />
        <span className="hero-sparkle" />
      </div>
    </div>
  </SectionWrapper>
);

const WorksSection = ({
  content,
}: {
  content: TranslationShape["works"];
}) => (
  <SectionWrapper id="works" className="bg-[radial-gradient(circle_at_top,_color-mix(in_srgb,var(--accent-sky)_18%,transparent),transparent_60%)]">
    <div className="space-y-12">
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <motion.span
          className="inline-flex items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent-sky)_20%,transparent)] px-4 py-2 text-sm font-medium text-[color-mix(in_srgb,var(--accent-sky)_85%,var(--page-foreground))]"
          initial="hidden"
          animate="visible"
          variants={revealVariant}
        >
          {content.title}
        </motion.span>
        <motion.p
          className="text-base leading-relaxed text-muted sm:text-lg"
          initial="hidden"
          animate="visible"
          variants={revealVariant}
          custom={1}
        >
          {content.subtitle}
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {content.items.map((item, index) => (
          <motion.article
            key={item.title}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--page-foreground)_6%,transparent)] bg-[color-mix(in_srgb,var(--card-bg)_80%,transparent)]/90 p-6 shadow-[0_18px_35px_-28px_rgba(15,23,42,0.45)] transition"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariant}
            custom={index}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={interactiveSpring}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[color:var(--page-foreground)]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span
                    key={`${item.title}-${tag}`}
                    className="rounded-full border border-[color-mix(in_srgb,var(--page-foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--card-bg)_85%,transparent)] px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <motion.a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent-emerald)] transition"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {item.url}
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </motion.article>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

const ContactSection = ({
  content,
}: {
  content: TranslationShape["contact"];
}) => (
  <SectionWrapper id="contact">
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div
        className="space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={revealVariant}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--accent-sky)_18%,transparent)] px-4 py-2 text-sm font-medium text-[color:var(--accent-sky)]">
          {content.title}
        </span>
        <h2 className="text-3xl font-semibold text-[color:var(--page-foreground)] sm:text-4xl">{content.subtitle}</h2>
        <div className="mt-8 space-y-6">
          <motion.div className="glass-card rounded-3xl p-6" whileHover={{ y: -6 }} transition={interactiveSpring}>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[color:var(--page-foreground)]/80">
              <Mail className="h-4 w-4" />
              {content.email.label}
            </h3>
            <motion.a
              href={`mailto:${content.email.value}`}
              className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-[color:var(--accent-emerald)] transition"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {content.email.value}
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div className="glass-card rounded-3xl p-6" whileHover={{ y: -6 }} transition={interactiveSpring}>
            <h3 className="text-sm font-semibold text-[color:var(--page-foreground)]/80">{content.socials.label}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <motion.a
                  href="https://dribbble.com/chenli"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_68%,var(--glass-overlay))] px-4 py-3 text-sm font-medium text-[color:var(--page-foreground)] transition"
                  whileHover={{ scale: 1.015, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={interactiveSpring}
                >
                  {content.socials.dribbble}
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://github.com/chenli"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_68%,var(--glass-overlay))] px-4 py-3 text-sm font-medium text-[color:var(--page-foreground)] transition"
                  whileHover={{ scale: 1.015, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={interactiveSpring}
                >
                  {content.socials.github}
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://www.linkedin.com/in/chenli"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_68%,var(--glass-overlay))] px-4 py-3 text-sm font-medium text-[color:var(--page-foreground)] transition"
                  whileHover={{ scale: 1.015, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={interactiveSpring}
                >
                  {content.socials.linkedin}
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_70%,var(--glass-overlay))] shadow-[0_24px_48px_-36px_rgba(15,23,42,0.55)]"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_color-mix(in_srgb,var(--accent-emerald)_18%,transparent),_transparent_55%)]" />
        <div className="relative space-y-6 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--page-foreground)]/60">Profile Snapshot</p>
          <h3 className="text-2xl font-semibold text-[color:var(--page-foreground)]">Chen Li</h3>
          <p className="text-sm leading-relaxed text-muted">
            Product designer & front-end developer crafting immersive narratives for digital-first brands. Based in Shanghai, working with teams worldwide.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_68%,var(--glass-overlay))] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--page-foreground)]/60">Focus</p>
              <p className="mt-2 text-sm font-medium text-[color:var(--page-foreground)]">
                Brand design, Interactive storytelling, Design systems
              </p>
            </div>
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_68%,var(--glass-overlay))] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--page-foreground)]/60">Currently</p>
              <p className="mt-2 text-sm font-medium text-[color:var(--page-foreground)]">
                Available for collaborations from Jan 2026
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);

const Footer = ({ content }: { content: TranslationShape["footer"] }) => (
  <footer
    className="border-t border-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_80%,var(--glass-overlay))]"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="section-container flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>{content.rights.replace("{{year}}", String(new Date().getFullYear()))}</p>
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--page-foreground)]/50">
        <span>Design · Code · Narrative</span>
        <span className="hidden h-3 w-px bg-[color-mix(in_srgb,var(--page-foreground)_12%,transparent)] sm:inline" />
        <span>Shanghai · Remote Ready</span>
      </div>
    </div>
  </footer>
);

function App() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "zh");
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      return stored;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error("Failed to persist theme", error);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  }, []);

  const strings = useMemo<TranslationShape>(
    () => ({
      nav: t("nav", { returnObjects: true }),
      themeToggle: t("themeToggle", { returnObjects: true }),
      hero: t("hero", { returnObjects: true }),
      works: t("works", { returnObjects: true }),
      links: t("links", { returnObjects: true }),
      contact: t("contact", { returnObjects: true }),
      footer: t("footer", { returnObjects: true }),
    }),
    [t]
  );

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
      document.documentElement.lang = lng;
    };

    i18n.on("languageChanged", handleLanguageChanged);
    handleLanguageChanged(currentLang);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [currentLang, i18n]);

  const handleToggleLang = (lng: string) => {
    if (lng !== currentLang) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--page-foreground)] transition-colors duration-300">
      <Header
        strings={strings.nav}
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onToggleTheme={toggleTheme}
        theme={theme}
        themeStrings={strings.themeToggle}
      />
      <main className="flex flex-col gap-16 pt-32 transition-colors duration-300">
        <HeroSection content={strings.hero} />
        <WorksSection content={strings.works} />
        <SectionWrapper id="links">
          <LinksSection content={strings.links} />
        </SectionWrapper>
        <ContactSection content={strings.contact} />
      </main>
      <Footer content={strings.footer} />
    </div>
  );
}

export default App;
