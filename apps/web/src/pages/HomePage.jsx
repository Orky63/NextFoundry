import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, ArrowDown, Menu, X, Cloud, Gauge, Search, ShieldCheck,
  ShoppingBag, MoveRight, Sparkles, LifeBuoy, Layers, Quote, Zap, RefreshCw,
  Brain, Lightbulb, Binary,
} from 'lucide-react';
import Logo from '@/components/Logo';

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
  { icon: Brain, title: 'AI Opportunity Review', desc: 'Identify where AI can drive real productivity gains in your business — no hype, just practical applications.' },
  { icon: Cloud, title: 'Cloud Platform Engineering', desc: 'Cloud-native platforms designed for scale, security and long-term maintainability.' },
  { icon: Lightbulb, title: 'Digital Process Improvement', desc: 'Review your existing workflows and systems to find faster, smarter ways of working.' },
  { icon: MoveRight, title: 'Legacy Platform Migration', desc: 'Move off outdated or templated platforms without disrupting your business.' },
  { icon: Gauge, title: 'Performance Optimisation', desc: 'Make your existing technology run faster, cost less and work harder for you.' },
  { icon: Search, title: 'Technical Discovery & Audit', desc: 'A clear-eyed assessment of your current technology stack and where it can improve.' },
  { icon: ShieldCheck, title: 'Security & Resilience', desc: 'Hardened, monitored platforms that protect your business and your customers.' },
  { icon: Layers, title: 'Ongoing Platform Evolution', desc: 'Continuous improvement that keeps your technology aligned with your business goals.' },
  { icon: LifeBuoy, title: 'Technology Partnership', desc: "We become part of your team — not an external agency you have to manage." },
];

const fit = [
  'Wondering whether AI could actually be useful for your business.',
  'Running platforms that feel outdated or expensive to maintain.',
  'Frustrated by technology that slows your team down instead of helping them.',
  'Looking for a partner who understands both business and technology.',
  'Wanting to modernise without the risk of a big-bang rebuild.',
];

const why = [
  { k: 'Practical, not theoretical', v: 'We focus on technology that delivers measurable value — not the latest trend.' },
  { k: 'Business-first approach', v: 'We start with your problems, not a solution looking for one.' },
  { k: 'Vendor-independent', v: 'We recommend what\'s right for you — not what earns us commission.' },
  { k: 'Enterprise-grade cloud', v: 'AWS infrastructure with real resilience, security and support built in.' },
  { k: 'Ongoing partnership', v: 'A relationship, not a project. We stay and keep improving.' },
];

const stats = [
  { v: '100+', l: 'Technology reviews completed' },
  { v: '99.99%', l: 'Average platform uptime' },
  { v: '40%', l: 'Average productivity improvement' },
  { v: '15+', l: 'Years cloud engineering experience' },
];

const testimonials = [
  { q: "Next Foundry helped us see where AI could actually make a difference — not just because it's trendy, but because it genuinely improved how we work.", a: 'CTO, Premium Home Goods', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80' },
  { q: "They didn't try to sell us a rebuild. They showed us where our current platform was working and where it wasn't. That honesty built trust from day one.", a: 'Founder, Artisan Coffee Co.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80' },
  { q: "Our old platform needed six apps to do what our custom cloud-native system does natively. Costs halved, performance tripled, and our team can actually get work done.", a: 'Head of Digital, EcoWear', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80' },
];

const trusted = [
  'Premium Home Goods', 'Artisan Coffee Co.', 'EcoWear', 'NovaTech Solutions',
  'The London Distillery', 'PureForm Fitness', 'Heritage Books', 'Verdant Energy',
];

const projects = [
  { title: 'Premium Home Goods', tag: 'AI Review & Platform Modernisation', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { title: 'Artisan Coffee Co.', tag: 'Cloud Migration & Process Improvement', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80' },
  { title: 'EcoWear', tag: 'Digital Platform Transformation', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80' },
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
            <motion.span className="relative h-1.5 w-1.5 rounded-full bg-primary" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />  <span className="ember-text font-semibold">Next Foundry</span> — Unlocking Practical Value
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="max-w-[18ch] font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
            Technology should help your business grow.<br /><span className="ember-text">Not slow it down.</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            Helping businesses unlock the practical value of AI, cloud and modern digital platforms.<br /><br />We help organisations identify opportunities to improve productivity, modernise technology and apply AI where it delivers real business value.
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
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-8 max-w-[60ch] rounded-xl border-l-4 border-border bg-card px-6 py-6">
            <p className="text-base font-semibold leading-relaxed text-card-foreground">
              Not every business needs a full rebuild. Sometimes the smartest move is improving what you already have.
            </p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              We start with your business problems, not a pitch. Our role is to help you make the right technology decisions — whether that's a full transformation or a series of practical improvements.
            </p>
          </motion.div>
        </Section>
      </div>

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

      {/* Our approach */}
      <Section id="approach" className="py-24 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="ember-text font-bold">Next Foundry</span> — Our approach
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              We start with your business problems — not a solution looking for one.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>Too many technology engagements start with a predetermined answer. AI. Cloud migration. A new platform. But the right answer depends entirely on where your business is today.</p>
              <p>That's why <span className="text-foreground font-semibold">Next Foundry</span> starts with understanding your business, your challenges and your goals. Only then do we identify the opportunities — whether that's applying AI to a specific workflow, migrating from a legacy platform, or rebuilding entirely.</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-16 overflow-hidden"
        >
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold text-muted-foreground">
              Common signals that it's time to take stock:
            </p>
          </div>
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, -900] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[
              'Technology feels like a bottleneck',
              "Not sure if AI is actually useful",
              'Too many tools that don\'t work together',
              'Platform costs keep rising',
              'Your team is spending time on manual work',
              'Technology feels like a bottleneck',
              "Not sure if AI is actually useful",
              'Too many tools that don\'t work together',
              'Platform costs keep rising',
              'Your team is spending time on manual work',
            ].map((label, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-6 py-4"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="whitespace-nowrap text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          <div className="flex flex-col rounded-xl border border-border bg-secondary p-6" style={{ borderColor: 'hsl(var(--primary))' }}>
            <h3 className="font-display text-lg font-bold text-foreground">1. Discover & Assess</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We review your business processes, technology stack and goals to identify where improvements will have the greatest impact.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Technology audit
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Process review
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                AI opportunity identification
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Roadmap creation
              </li>
            </ul>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-secondary p-6" style={{ borderColor: 'hsl(var(--primary))' }}>
            <h3 className="font-display text-lg font-bold text-foreground">2. Build & Modernise</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Whether it's applying AI to a workflow, migrating to the cloud or rebuilding a platform, we deliver practical, measurable improvements.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Cloud-native platforms
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                AI integration
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Legacy migration
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Process automation
              </li>
            </ul>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-secondary p-6" style={{ borderColor: 'hsl(var(--primary))' }}>
            <h3 className="font-display text-lg font-bold text-foreground">3. Evolve & Optimise</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Technology shouldn't stand still. We provide ongoing partnership to keep your platforms secure, fast and aligned with your business.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Continuous improvement
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Performance monitoring
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Security management
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Ongoing support
              </li>
            </ul>
          </div>
        </motion.div>
      </Section>

      {/* Practical value */}
      <Section className="border-y border-border/60 bg-secondary/20 py-24 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="ember-text font-bold">Next Foundry</span> — Practical value
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              AI, cloud and modern platforms should make your business work better.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                There's no shortage of technology promises. But the question that matters is simple: does this actually help your business?
              </p>
              <p>
                Our background is in enterprise cloud engineering, AI-assisted development and service management. We bring the disciplines used by large organisations and apply them pragmatically to businesses that want to work smarter.
              </p>
              <p>
                We don't sell technology for its own sake. We sell better ways of working.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="mb-6 font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">
              The practical value we deliver:
            </p>
            <ul className="space-y-4">
              {['Improved productivity', 'Reduced technology costs', 'Faster time to market', 'Better customer experiences', 'Long-term maintainability'].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-lg font-medium text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Four pillars */}
      <Section className="py-20 md:py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { icon: Brain, label: 'AI that works', desc: 'Practical AI applied to real business problems — not technology looking for a use case.' },
            { icon: Cloud, label: 'Cloud-native', desc: 'Enterprise-grade infrastructure that scales with your business without locking you in.' },
            { icon: Zap, label: 'Fast & efficient', desc: 'Modern platforms that perform, convert and don\'t waste your team\'s time.' },
            { icon: RefreshCw, label: 'Built to evolve', desc: 'Technology that improves continuously rather than requiring periodic rebuilds.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      {/* Helping businesses work smarter */}
      <Section className="py-24 md:py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-[58rem]"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="ember-text font-bold">Next Foundry</span> — Helping businesses work smarter
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            The right technology, applied in the right places,<br />
            <span className="text-muted-foreground">transforms how your business operates.</span>
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              At Next Foundry, we combine enterprise cloud engineering, AI-assisted development and practical business thinking to help organisations get more from their technology.
            </p>
            <p>
              Whether that's reviewing your business processes, migrating from legacy platforms or building cloud-native solutions, our focus is always the same:
            </p>
          </div>
          <p className="mt-6 text-xl font-semibold leading-relaxed text-foreground">
            Helping businesses work smarter.
          </p>

          <div className="mt-14 grid grid-cols-5 gap-0">
            {[
              { step: 'Understand', delay: 0 },
              { step: 'Identify', delay: 0.15 },
              { step: 'Build', delay: 0.3 },
              { step: 'Launch', delay: 0.45 },
              { step: 'Improve', delay: 0.6 },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <span className="font-display text-lg font-bold text-primary">{i + 1}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{item.step}</p>
                {i < 4 && (
                  <ArrowDown className="mt-2 h-4 w-4 text-primary/60" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
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
              Many technology consultancies sell you a solution first. <span className="ember-text">We start with your problem.</span>
            </motion.h2>
            <div className="mt-8 grid gap-6 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
              <p>We believe the best technology decisions start with understanding your business — not with a pitch deck. That's why our engagements often begin with a discovery phase that helps us understand where the real opportunities lie.</p>
              <p className="font-display text-2xl font-semibold leading-snug text-foreground">
                We don't sell technology for its own sake.<br />
                <span className="ember-text">We sell better ways of working.</span>
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
            Practical technology services that help your business work smarter.
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
            Practical improvements that made a real difference.
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

      {/* Who this is for */}
      <Section id="fit" className="py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Who this is for</p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              You might be a good fit if you're...
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
              Enterprise experience, practical delivery, long-term thinking.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Our focus isn't selling technology. It's helping businesses work smarter with the right technology, applied in the right places.
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
              Not sure whether you need AI, a new platform or just a fresh perspective?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We'd be happy to have an honest conversation. Sometimes the right answer is improving what you already have — and if there's a better path forward, we'll help you understand your options without pressure or jargon.
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
            Practical AI · Cloud-native · Helping businesses work smarter
          </p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Next Foundry. All rights reserved.</p>
        </Section>
      </footer>
    </div>
  );
}
