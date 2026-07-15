import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Menu, X, Cloud, Gauge, Search, ShieldCheck,
  ShoppingBag, MoveRight, Sparkles, LifeBuoy, Layers, Flame, Quote,
} from 'lucide-react';
import Logo from '@/components/Logo';

function useCountUp(target, duration = 2000) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}

function useScrollBackground() {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 80], ['bg-background/80', 'bg-background/95']);
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const nav = [
  { label: 'Approach', href: '#approach' },
  { label: 'Services', href: '#services' },
  { label: 'Fit', href: '#fit' },
  { label: 'Why us', href: '#why' },
];

const services = [
  { icon: ShoppingBag, title: 'Bespoke ecommerce platforms', desc: 'Storefronts built around your catalogue and margins — not a template.' },
  { icon: MoveRight, title: 'Migration from templated platforms', desc: 'Move off Shopify and page builders without losing traffic or revenue.' },
  { icon: Cloud, title: 'AWS cloud hosting & management', desc: 'Enterprise-grade infrastructure, provisioned and maintained by us.' },
  { icon: Gauge, title: 'Performance optimisation', desc: 'Fast, resilient pages that convert and rank.' },
  { icon: Search, title: 'Technical SEO improvements', desc: 'Clean architecture search engines and customers both reward.' },
  { icon: ShieldCheck, title: 'Security & resilience', desc: 'Hardened, monitored platforms that stay online under load.' },
  { icon: Layers, title: 'Ongoing platform development', desc: 'A roadmap that keeps shipping value long after launch.' },
  { icon: Sparkles, title: 'AI-powered enhancements', desc: 'Practical AI woven into the experiences your customers use.' },
  { icon: LifeBuoy, title: 'Continuous support & maintenance', desc: "We don't disappear after launch — we become part of your team." },
];

const fit = [
  'Growing rapidly and beginning to outgrow your current website.',
  'Looking for a more distinctive online presence.',
  'Frustrated by platform limitations or escalating app costs.',
  'Wanting a trusted technology partner instead of another web agency.',
  'Looking for long-term support rather than a one-off project.',
];

const why = [
  { k: 'Faster delivery', v: 'AI-assisted development that ships in weeks, not quarters.' },
  { k: 'Greater flexibility', v: 'A platform that bends to your business, not the reverse.' },
  { k: 'Lower long-term costs', v: 'Fewer third-party apps, less workaround debt.' },
  { k: 'Enterprise-grade cloud', v: 'AWS infrastructure with real resilience built in.' },
  { k: 'Ongoing improvements', v: 'A partnership, not a hand-off. We keep improving.' },
];

const marqueeWords = ['Cloud-native', 'AI-assisted', 'Bespoke', 'Scalable', 'Secure', 'Fast', 'Enterprise-grade'];

const stats = [
  { v: '50+', l: 'Platforms delivered' },
  { v: '99.99%', l: 'Average uptime' },
  { v: '3×', l: 'Faster load times' },
  { v: '40+', l: 'AWS certifications' },
];

const testimonials = [
  { q: 'Next Foundry took us from a slow Shopify store to a blazing-fast custom platform. Our conversion rate jumped 34% in the first month.', a: 'CTO, Premium Home Goods', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80' },
  { q: 'They don\'t just build and disappear. Two years on, they\'re still shipping improvements. Genuine partnership.', a: 'Founder, Artisan Coffee Co.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80' },
  { q: 'Our old platform needed six third-party apps to do what our custom build does natively. Costs halved, performance tripled.', a: 'Head of Digital, EcoWear', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80' },
];

const trusted = [
  'Premium Home Goods', 'Artisan Coffee Co.', 'EcoWear', 'NovaTech Solutions',
  'The London Distillery', 'PureForm Fitness', 'Heritage Books', 'Verdant Energy',
];

const projects = [
  { title: 'Premium Home Goods', tag: 'Ecommerce', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { title: 'Artisan Coffee Co.', tag: 'Subscription platform', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80' },
  { title: 'EcoWear', tag: 'Sustainable fashion', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80' },
];

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-[72rem] px-6 ${className}`}>
      {children}
    </section>
  );
}

function GridPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const headerBg = useScrollBackground();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <motion.header style={{ '--header-bg': headerBg }} className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md [background:var(--header-bg)]">
        <div className="mx-auto flex h-16 max-w-[72rem] items-center justify-between px-6">
          <Logo size="md" />
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#talk" className="hidden items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-px active:scale-[0.98] md:inline-flex">
            Let's talk <ArrowRight className="h-4 w-4" />
          </a>
          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-background px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-base text-muted-foreground">{n.label}</a>
              ))}
              <a href="#talk" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                Let's talk <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </motion.header>

      {/* Hero */}
      <div id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
        <motion.img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
          alt=""
          className="absolute inset-0 h-[120%] w-full object-cover opacity-30"
          style={{ y: useTransform(useScroll().scrollY, [0, 800], [0, 120]) }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <GridPattern />
        <div className="absolute inset-0 grain opacity-60" />
        <Section className="relative z-10 py-24">
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <motion.span className="relative h-1.5 w-1.5 rounded-full bg-primary" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />  <span className="ember-text font-semibold">Next Foundry</span> — Cloud-Native Digital Platform Partners
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="max-w-[18ch] font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
            Your business has grown. Your <span className="ember-text">digital platform</span> should too.
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            More than an online brochure or a templated store. <span className="text-foreground font-semibold">Next Foundry</span> designs, builds and manages bespoke digital experiences powered by modern cloud technology and AI — built around your business, not forcing it to fit the platform.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="#talk"
              className="relative inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ boxShadow: ['0 0 0 0 hsl(24 92% 56% / 0.4)', '0 0 0 12px hsl(24 92% 56% / 0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Start a conversation <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
            <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary">
              What we do
            </a>
          </motion.div>
        </Section>
      </div>

      {/* Marquee */}
      <div className="border-y border-border/60 bg-secondary/30 py-4">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {w} <motion.span animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><Flame className="h-3.5 w-3.5 text-primary" /></motion.span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <Section className="py-16 md:py-20">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => {
            const num = parseInt(s.v);
            const { ref, count } = useCountUp(isNaN(num) ? 100 : num);
            return (
              <motion.div
                key={s.l}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                className="rounded-xl border border-border/60 bg-card/50 p-6 text-center"
              >
                <p ref={ref} className="font-display text-3xl font-extrabold text-primary md:text-4xl">
                  {isNaN(num) ? s.v : `${count}${s.v.includes('×') ? '×' : s.v.includes('%') ? '%' : '+'}`}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.l}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Trusted by */}
      <div className="border-y border-border/40 bg-secondary/10">
        <Section className="py-12">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Trusted by ambitious teams</p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {trusted.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
                className="font-display text-sm font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground"
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
        </Section>
      </div>

      {/* Technology that grows */}
      <Section id="approach" className="py-24 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="ember-text font-bold">Next Foundry</span> — Technology that grows with you
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Many growing businesses reach a point where their website no longer keeps pace with their ambitions.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>You may be relying on dozens of third-party apps, battling performance issues, or finding that every new feature requires another workaround.</p>
              <p>That's where <span className="text-foreground font-semibold">Next Foundry</span> comes in. We believe technology should enable growth — not limit it. That's why we build cloud-native platforms that are fast, secure, scalable and designed specifically for your business.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative">
            <div className="overflow-hidden rounded-2xl border border-border">
              <motion.img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                alt="Modern server room with blue LED lighting"
                className="h-full w-full object-cover"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card px-5 py-4 shadow-xl shadow-black/40 sm:block">
              <p className="font-display text-2xl font-bold text-primary">Cloud-native</p>
              <p className="text-xs text-muted-foreground">Fast · Secure · Scalable</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* A different approach */}
      <div className="relative overflow-hidden border-y border-border/60 bg-secondary/20">
        <GridPattern />
        <div className="absolute inset-0 bg-background/70" />
        <Section className="relative z-10 py-24 md:py-32">
          <div className="max-w-[62rem]">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="ember-text font-bold">Next Foundry</span> — A different approach
            </p>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Traditional agencies charge large upfront fees before you see any value. <span className="ember-text">Next Foundry</span> builds long-term partnerships instead.
            </motion.h2>
            <div className="mt-8 grid gap-6 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
              <p>Using modern AI-assisted development and cloud technologies, <span className="text-foreground font-semibold">Next Foundry</span> delivers bespoke digital platforms more efficiently than ever before. Instead of one-off projects, we continuously improve your platform as your business evolves.</p>
              <p className="font-display text-2xl font-semibold leading-snug text-foreground">
                We don't disappear after launch.<br />
                <span className="ember-text">We become part of your team.</span>
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* What we do */}
      <Section id="services" className="py-24 md:py-32">
        <div className="mb-14 max-w-[42rem]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">What we do</p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Everything your platform needs — designed, built and managed under one roof.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i % 3}
              className="group relative bg-card p-8 transition-colors hover:bg-secondary/50"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.span
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: 'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), hsl(24 92% 56% / 0.06), transparent)' }}
              />
              <s.icon className="mb-5 h-6 w-6 text-primary" strokeWidth={1.8} />
              <h3 className="font-display text-lg font-semibold leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Recent work */}
      <Section className="py-24 md:py-32">
        <div className="mb-14 max-w-[42rem]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Recent work</p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Platforms we've built for ambitious businesses.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{p.tag}</span>
                <h3 className="mt-1 font-display text-lg font-bold">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <div className="border-y border-border/60 bg-gradient-to-br from-secondary/20 to-background">
        <Section className="py-24 md:py-32">
          <div className="mb-14 max-w-[42rem]">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">What our clients say</p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Real results from real partnerships.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.a}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="relative flex flex-col rounded-2xl border border-border bg-card p-7"
              >
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <Quote className="mb-4 h-6 w-6 text-primary/30" strokeWidth={1.5} />
                </motion.div>
                <p className="flex-1 text-sm leading-relaxed text-foreground/85">{t.q}</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.img} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-border" />
                  <p className="text-xs font-medium text-muted-foreground">— {t.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Built for ambitious businesses */}
      <Section id="fit" className="py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Built for ambitious businesses</p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              We're a great fit if you're...
            </h2>
          </div>
          <ul className="divide-y divide-border border-t border-border">
            {fit.map((f, i) => (
              <motion.li
                key={f}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="flex items-start gap-5 py-6"
              >
                <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
                <span className="text-lg leading-snug text-foreground/90">{f}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Why Next Foundry */}
      <div id="why" className="border-y border-border/60 bg-secondary/20">
        <Section className="py-24 md:py-32">
          <div className="mb-14 max-w-[46rem]">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why Next Foundry</p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Enterprise technology experience, delivered with modern AI-assisted development.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Our focus isn't simply building websites. It's building digital platforms that help businesses grow with confidence.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <motion.div
                key={w.k}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={i % 3}
              className="rounded-xl border border-border bg-card p-7"
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <p className="font-display text-xl font-semibold text-primary">{w.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.v}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Let's talk */}
      <Section id="talk" className="py-24 md:py-36">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/40 px-8 py-16 text-center md:px-16 md:py-24"
        >
          <GridPattern />
          <div className="absolute inset-0 grain opacity-40" />
          <div className="relative z-10 mx-auto max-w-[46rem]">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Let's talk</p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              The best technology decisions start with understanding your business.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Wondering whether your current platform is still the right fit? We'd be happy to have an honest conversation. Sometimes the answer is to stay exactly where you are — and if there's a better path forward, we'll help you understand your options, without pressure or jargon.
            </p>
            <a href="mailto:hello@nextfoundry.com" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
              hello@nextfoundry.com <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <Section className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            Bespoke digital platforms · Cloud-native · AI-assisted
          </p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Next Foundry. All rights reserved.</p>
        </Section>
      </footer>
    </div>
  );
}
