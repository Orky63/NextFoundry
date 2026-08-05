import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Menu, X, Cloud, Gauge, Search, ShieldCheck,
  MoveRight, LifeBuoy, Layers,
  Brain, Lightbulb,
} from 'lucide-react';
import Logo from '@/components/Logo';

const MotionLink = motion.create(Link);

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
  { label: 'Why us', href: '#why' },
  { label: 'Meet the founder', href: '/founder' },
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

function Section({ id, children, className = '', withBackground = true }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-[72rem] px-6 ${withBackground ? 'subtle-page-background' : ''} ${className}`}>
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
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="relative z-0">
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
          <MotionLink
            to="/contact"
            className="hidden text-xl font-semibold md:inline"
            style={{ color: 'hsl(24 100% 62%)' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Let's talk
          </MotionLink>          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-background px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-base text-muted-foreground">{n.label}</a>
              ))}
              <MotionLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex text-2xl font-semibold"
                style={{ color: 'hsl(24 100% 62%)' }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Let's talk <ArrowRight className="ml-1 h-4 w-4" />
              </MotionLink>
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
          initial={{ scale: 1.08 }}
          animate={{ scale: [1.08, 1.16, 1.08] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <GridPattern />
        <div className="absolute inset-0 grain opacity-60" />
        <Section withBackground={false} className="relative z-10 py-24">
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <motion.span className="relative h-1.5 w-1.5 rounded-full bg-primary" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />  <span className="ember-text font-semibold">NEXT FOUNDRY</span>
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="max-w-[18ch] font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
            We help growing businesses remove friction,<br />
            <span className="ember-text">reduce costs and use technology properly.</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            Most businesses already own the technology they need.<br /><br />They simply aren't getting the best from it.<br /><br />We identify where AI, cloud and process improvement can genuinely increase productivity and profitability.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="#talk"
              className="relative inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-base font-bold text-primary-foreground"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-primary"
                animate={{
                  boxShadow: [
                    '0 0 0 0 hsl(24 92% 56% / 0.5)',
                    '0 0 0 20px hsl(24 92% 56% / 0)',
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Book a Business Review <ArrowRight className="h-5 w-5" />
              </span>
            </motion.a>
          </motion.div>
        </Section>
      </div>

      {/* Value props */}
      <div className="border-y border-border/60 bg-secondary/20">
        <Section className="py-10 md:py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Independent advice', d: 'We recommend what\'s right for your business — not what earns us commission.' },
              { t: 'Business-first thinking', d: 'We start with your problems and goals, not a predetermined solution.' },
              { t: 'Enterprise experience', d: 'Decades of cloud engineering and service management expertise.' },
              { t: 'Practical recommendations', d: 'Clear, actionable advice you can implement with confidence.' },
            ].map((item, i) => (
              <motion.div
                key={item.t}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.t}</p>
                  <p className="text-xs text-muted-foreground">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Familiar */}
      <Section id="approach" className="py-24 md:py-32 bg-secondary/20">
        <div className="mb-12 border-t border-border/40 pt-12 text-center">
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Does any of this sound familiar?</span>
          </motion.p>
          <div className="mt-4 border-b border-border/40" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Your team spends too much time on repetitive admin.",
            "Technology doesn't work together properly.",
            "Platform costs keep increasing every year.",
            "You're curious whether AI could genuinely help.",
            "You don't know whether rebuilding is worth it.",
            "Nobody has looked at the whole business objectively.",
          ].map((item, i) => (
            <motion.div
              key={item}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className="rounded-xl border border-border bg-card p-6"
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <p className="mt-4 text-base leading-snug text-foreground/90">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Flagship service */}
      <Section className="py-24 md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">Our flagship service</p>
          <h2 className="text-center font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Business &amp; Technology Review
          </h2>
          <div className="mx-auto mt-6 max-w-[2rem] border-t-2 border-primary" />
        </motion.div>

        <div className="mx-auto mt-16 flex max-w-[28rem] flex-col items-center gap-0">
          {[
            'Discovery',
            'Business Process Review',
            'Technology Assessment',
            'AI Opportunity Identification',
            '90-Day Roadmap',
            'Optional Implementation',
          ].map((step, i) => (
            <motion.div
              key={step}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="flex w-full flex-col items-center"
            >
              <div className="flex w-full items-center gap-4 rounded-xl border border-border bg-card px-6 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <span className="font-display text-sm font-bold text-primary">{i + 1}</span>
                </span>
                <span className="text-base font-medium text-foreground">{step}</span>
              </div>
              {i < 5 && (
                <div className="flex flex-col items-center py-2">
                  <svg className="h-5 w-5 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What you'll receive */}
      <div className="border-y border-border/60 bg-secondary/20">
        <Section className="py-24 md:py-32">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">What you'll receive</p>
            <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
              className="rounded-xl border border-border bg-card p-8"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3 className="font-display text-xl font-bold text-foreground">Current State Assessment</h3>
              <p className="mt-1 text-sm text-muted-foreground">What's working? What's not?</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A clear-eyed view of your current technology, processes and where the real bottlenecks are.</p>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="rounded-xl border border-border bg-card p-8"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3 className="font-display text-xl font-bold text-foreground">AI Opportunity Report</h3>
              <p className="mt-1 text-sm text-muted-foreground">Where AI genuinely adds value.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Practical, specific opportunities to apply AI in your business — not generic use cases.</p>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
              className="rounded-xl border border-border bg-card p-8"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3 className="font-display text-xl font-bold text-foreground">Platform Assessment</h3>
              <p className="mt-1 text-sm text-muted-foreground">Keep it? Improve it? Replace it?</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Honest recommendation on your current platform — no bias toward rebuilding.</p>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={3}
              className="rounded-xl border border-border bg-card p-8"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3 className="font-display text-xl font-bold text-foreground">Business Roadmap</h3>
              <p className="mt-1 text-sm text-muted-foreground">Quick wins · Medium-term · Long-term</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A phased plan with clear priorities, timelines and expected outcomes.</p>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* What happens next */}
      <Section className="py-24 md:py-32 bg-secondary/20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">What happens next?</p>
          <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="mx-auto max-w-[48rem] text-center text-lg leading-relaxed text-muted-foreground">
          Instead of trying to sell services, we recommend what's right for your business — not what's most profitable for us.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Keep your existing platform', desc: 'Sometimes the smartest move is improving what you already have.' },
            { label: 'Improve your workflows', desc: 'Small changes that make a big difference to productivity.' },
            { label: 'Apply AI', desc: 'Where it genuinely adds value — not for the sake of it.' },
            { label: 'Move to the cloud', desc: 'Enterprise-grade infrastructure without the overhead.' },
            { label: 'Build something new', desc: 'When the best option is a clean start.' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-6"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={6} className="mx-auto mt-12 max-w-[36rem] text-center text-base font-semibold text-foreground">
          That's a huge trust builder.
        </motion.p>
      </Section>

      {/* How we help */}
      <Section className="py-24 md:py-32 bg-secondary/20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">How we help</p>
          <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
        </motion.div>

        <div className="mx-auto flex max-w-[28rem] flex-col items-center gap-0">
          {[
            'Business & Technology Review',
            'Digital Process Improvement',
            'Legacy Platform Migration',
            'Cloud Engineering',
            'AI Implementation',
            'Managed Platforms',
          ].map((step, i) => (
            <motion.div
              key={step}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="flex w-full flex-col items-center"
            >
              <div className="flex w-full items-center gap-4 rounded-xl border border-border bg-card px-6 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <span className="font-display text-sm font-bold text-primary">{i + 1}</span>
                </span>
                <span className="text-base font-medium text-foreground">{step}</span>
              </div>
              {i < 5 && (
                <div className="flex flex-col items-center py-2">
                  <svg className="h-5 w-5 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What we do */}
      <Section id="services" className="py-24 md:py-32 bg-secondary/20">
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


      {/* Why clients work with us */}
      <div id="why" className="border-y border-border/60 bg-secondary/20">
        <Section className="py-24 md:py-32">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why even bother contacting us</p>
            <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
          </motion.div>

          <div className="mx-auto grid max-w-[40rem] gap-6">
            {[
              { t: '25+ years enterprise technology experience', d: 'Decades of hands-on engineering and leadership across the public and private sectors.' },
              { t: 'NHS digital leadership', d: 'Experience delivering technology strategy and platforms at a national health service scale.' },
              { t: 'AWS certified', d: 'Validated expertise in cloud architecture, migration and modernisation on AWS.' },
              { t: 'Cloud engineering expertise', d: 'Deep knowledge of cloud-native platforms, infrastructure-as-code and DevOps.' },
              { t: 'AI implementation', d: 'Practical AI deployment — not theory, but real systems delivering measurable outcomes.' },
              { t: 'Worked with organisations supporting thousands of staff', d: 'Enterprise-grade thinking, applied to businesses of every size.' },
            ].map((item, i) => (
              <motion.div
                key={item.t}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-6"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.t}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Testimonials */}
      <Section className="py-24 md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">What clients say</p>
          <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
        </motion.div>

        <div className="mx-auto grid max-w-[40rem] gap-8">
          {[
            { q: 'Next Foundry identified three workflow improvements we implemented within two weeks.' },
            { q: 'Saved us building an entire website unnecessarily.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-xl border border-border bg-card p-8"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <svg className="mb-4 h-6 w-6 text-primary/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-base leading-relaxed text-foreground italic">&ldquo;{item.q}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Founding Partner Programme */}
      <Section withBackground={false} className="py-24 md:py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/40 px-8 py-16 text-center md:px-16 md:py-24"
        >
          <GridPattern />
          <div className="absolute inset-0 grain opacity-40" />
          <div className="relative z-10 mx-auto max-w-[48rem]">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Founding Partner Programme</p>
            <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
              Become one of our Founding Partners.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              As a Founding Partner, you'll receive the same strategic review we'll offer future clients.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Together we'll identify:
            </p>
            <ul className="mt-6 space-y-2 text-left text-base leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Where your business is losing time
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Where AI can genuinely help
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Which technology is worth keeping
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Which investments you should avoid
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                A prioritised roadmap for improvement
              </li>
            </ul>
            <p className="mt-8 text-base font-semibold text-foreground">
              All we ask in return is honest feedback.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Final CTA */}
      <Section id="talk" withBackground={false} className="pb-24 md:pb-36">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/40 px-8 py-16 text-center md:px-16 md:py-24"
        >
          <GridPattern />
          <motion.img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
            alt=""
            className="absolute inset-0 h-[120%] w-full object-cover opacity-25"
            initial={{ scale: 1.08 }}
            animate={{ scale: [1.08, 1.16, 1.08] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-secondary/40 to-background/60" />
          <div className="absolute inset-0 grain opacity-40" />
          <div className="relative z-10 mx-auto max-w-[46rem]">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Let's talk</p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Not sure whether you need AI,<br />a new platform,<br />or simply a fresh perspective?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Let's find out together.
            </p>
            <motion.a
              href="mailto:andy.hopla4@outlook.com"
              className="relative inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-base font-bold text-primary-foreground"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-primary"
                animate={{
                  boxShadow: [
                    '0 0 0 0 hsl(24 92% 56% / 0.5)',
                    '0 0 0 20px hsl(24 92% 56% / 0)',
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Book your free Technology Review <ArrowRight className="h-5 w-5" />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </Section>

      {/* Logos */}
      <Section className="py-16 md:py-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Experience across
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          <span className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-[2.1rem] w-auto" viewBox="0 0 48 48" fill="none"><path d="M12 4l-8 8v24l8 8h24l8-8V12l-8-8H12z" fill="#FF9900"/><path d="M18 20l6-8 6 8v8l-6 8-6-8v-8z" fill="#fff"/></svg>
            <span className="text-xs font-semibold uppercase tracking-wider">AWS</span>
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-[2.1rem] w-auto" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="#333"/><path d="M24 12c-6.627 0-12 5.163-12 11.533 0 5.095 3.434 9.411 8.2 10.936.6.106.82-.25.82-.556 0-.275-.01-1.005-.016-1.972-3.338.693-4.042-1.547-4.042-1.547-.546-1.33-1.332-1.684-1.332-1.684-1.089-.715.082-.7.082-.7 1.204.08 1.838 1.188 1.838 1.188 1.07 1.76 2.81 1.252 3.495.957.108-.744.418-1.252.762-1.54-2.664-.29-5.466-1.28-5.466-5.696 0-1.258.466-2.287 1.232-3.094-.123-.292-.534-1.463.116-3.05 0 0 1.005-.31 3.292 1.182.954-.255 1.977-.382 2.994-.386 1.018.004 2.041.131 2.997.386 2.285-1.492 3.288-1.182 3.288-1.182.652 1.587.241 2.758.118 3.05.768.807 1.23 1.836 1.23 3.094 0 4.428-2.807 5.403-5.48 5.689.43.358.814 1.062.814 2.14 0 1.546-.014 2.792-.014 3.17 0 .309.216.667.828.554 4.762-1.528 8.19-5.842 8.19-10.935C36 17.163 30.627 12 24 12z" fill="#fff"/></svg>
            <span className="text-xs font-semibold uppercase tracking-wider">GitHub</span>
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-[2.1rem] w-auto" viewBox="0 0 48 24" fill="none"><rect width="48" height="24" rx="3" fill="#005EB8"/><text x="24" y="16" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial">NHS</text></svg>
            <span className="text-xs font-semibold uppercase tracking-wider">NHS</span>
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-[2.1rem] w-auto" viewBox="0 0 48 48" fill="none"><path d="M24 4L44 16v16L24 44 4 32V16L24 4z" fill="#7C42FF"/><path d="M24 12l10 6v12l-10 6-10-6V18l10-6z" fill="#fff"/></svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Terraform</span>
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-[2.1rem] w-auto" viewBox="0 0 48 48" fill="none"><path d="M36 28c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12z" fill="#888"/><path d="M24 18c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-8 10c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="#555"/></svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Cloud</span>
          </span>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <Section withBackground={false} className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            Practical AI · Cloud-native · Helping businesses work smarter
          </p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Next Foundry. All rights reserved.</p>
        </Section>
      </footer>
      </div>
    </div>
  );
}
