import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Box,
  Building2,
  CheckCircle2,
  Cloud,
  Crosshair,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Monitor,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  UsersRound,
  X,
} from 'lucide-react';
import Logo from '@/components/Logo';
import Seo from '@/components/Seo';

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
  { label: 'Why us', href: '#why' },
  { label: 'Meet the founder', href: '/founder' },
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
    <div className="page-background relative min-h-screen text-foreground antialiased">
      <Seo
        title="Next Foundry | Practical AI, Cloud & Digital Process Improvement"
        description="Next Foundry helps growing UK businesses reduce costs, remove workflow friction and use AI, cloud platforms and digital process improvement properly."
        path="/"
      />
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
          className="absolute inset-0 h-[120%] w-full object-cover opacity-50"
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
            Helping businesses work smarter.
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            We help growing businesses identify where AI, automation, cloud and modern technology can reduce manual work, improve customer experience and create opportunities for growth.
            <br /><br />
            We don't start with technology.
            <br /><br />
            We start by understanding your business.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-9 flex flex-wrap items-center gap-4">
            <MotionLink
              to="/contact#contact-form"
              className="relative inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground"
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
                    '0 0 0 16px hsl(24 92% 56% / 0)',
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Apply for a Free Business &amp; Technology Review <ArrowRight className="h-4 w-4" />
              </span>
            </MotionLink>
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
              { t: 'Enterprise experience', d: 'Decades of technology and service management experience, combined with modern cloud expertise.' },
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

      {/* Promo video */}
      <Section className="py-20 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Watch the overview</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Practical technology improvement starts with understanding the business.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A short look at how Next Foundry helps growing businesses find useful opportunities for AI, automation, cloud and digital process improvement.
            </p>
            <MotionLink
              to="/contact#contact-form"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply for a Free Business &amp; Technology Review <ArrowRight className="h-4 w-4" />
            </MotionLink>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            custom={1}
            className="relative overflow-hidden rounded-xl border border-primary/25 bg-card/70 shadow-2xl shadow-black/30"
          >
            <video
              className="aspect-square w-full bg-background object-cover"
              src="/videos/nextfoundry-linkedin-promo.mp4"
              poster="/videos/nextfoundry-linkedin-promo-poster.jpg"
              controls
              loop
              playsInline
              preload="metadata"
              aria-label="Next Foundry promotional overview video"
            />
          </motion.div>
        </div>
      </Section>

      {/* Business friction */}
      <Section id="approach" className="py-24 md:py-32 bg-secondary/20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[48rem]">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Is technology helping your business — or getting in the way?
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>As businesses grow, technology often grows with them.</p>
            <div className="space-y-3 font-semibold text-foreground">
              <p>Another system.</p>
              <p>Another spreadsheet.</p>
              <p>Another plugin.</p>
              <p>Another manual workaround.</p>
            </div>
            <p>Eventually, people spend more time working around technology than benefiting from it.</p>
            <p>Perhaps your team is spending too much time on repetitive administration.</p>
            <p>Perhaps systems don't communicate properly.</p>
            <p>Perhaps your website or ecommerce platform no longer supports the way your business operates.</p>
            <p>Or perhaps you're simply wondering:</p>
            <p className="font-semibold text-foreground">Could AI help us work differently?</p>
            <p>That's where we start.</p>
          </div>
        </motion.div>
      </Section>

      {/* Flagship service */}
      <Section className="py-24 md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[48rem] text-center">
          <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Business &amp; Technology Review
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>Before recommending AI, cloud services or new platforms, we take time to understand how your business actually works.</p>
            <p>We look at your processes, systems, customer experience and technology to identify where improvements could deliver genuine value.</p>
          </div>
        </motion.div>

        <div className="mx-auto mt-16 flex max-w-[42rem] flex-col items-center gap-0">
          {[
            {
              title: 'Discover',
              desc: "We talk to you and your team about how the business operates, where you're heading and what's getting in the way.",
            },
            {
              title: 'Understand',
              desc: 'We examine key workflows, systems and digital platforms to identify friction, duplication and unnecessary manual work.',
            },
            {
              title: 'Explore',
              desc: 'We identify where process improvement, AI, automation, cloud technology or platform changes could make a practical difference.',
            },
            {
              title: 'Prioritise',
              desc: 'Not every opportunity is worth pursuing. We identify the improvements likely to deliver the greatest value.',
            },
            {
              title: 'Roadmap',
              desc: "You receive a practical, prioritised roadmap showing what we'd do now, what we'd consider next and what we'd leave alone.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="flex w-full flex-col items-center"
            >
              <div className="flex w-full items-start gap-4 rounded-xl border border-border bg-card px-6 py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <span className="font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {String(i + 1).padStart(2, '0')} — {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </div>
              {i < 4 && (
                <div className="flex flex-col items-center py-2">
                  <svg className="h-5 w-5 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={5}
            className="mt-10 text-center"
          >
            <p className="text-lg font-semibold leading-relaxed text-foreground">
              Interested in seeing what this could uncover in your business?
            </p>
            <MotionLink
              to="/contact#contact-form"
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply for a Free Business &amp; Technology Review <ArrowRight className="h-4 w-4" />
            </MotionLink>
          </motion.div>
        </div>
      </Section>

      {/* What you'll receive */}
      <div className="border-y border-border/60 bg-secondary/20">
        <Section className="py-24 md:py-32">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[48rem] text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">What you'll receive</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Practical recommendations. Not a technology shopping list.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Current State Assessment',
                desc: 'A clear view of how technology currently supports your business — and where it creates friction.',
              },
              {
                title: 'AI & Automation Opportunities',
                desc: 'Practical opportunities where AI or automation could save time, improve consistency or enhance customer experience.',
              },
              {
                title: 'Digital Platform Assessment',
                desc: 'An objective view of your current website, ecommerce platform and other customer-facing technology.',
                note: 'Keep it. Improve it. Integrate it. Or replace it.',
              },
              {
                title: 'Process Improvement Opportunities',
                desc: 'Identification of repetitive work, duplicated activity and unnecessary manual processes.',
              },
              {
                title: 'Prioritised Recommendations',
                desc: 'Opportunities ranked according to potential business value, complexity and effort.',
              },
              {
                title: '90-Day Roadmap',
                desc: 'A practical, prioritised plan showing what to do first, what can wait, and what you could realistically achieve over the next 90 days.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="rounded-xl border border-border bg-card p-8"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                {item.note && <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground">{item.note}</p>}
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* What happens next */}
      <Section className="py-24 md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[56rem]">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.32em] text-primary">What happens next?</p>
          <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Sometimes the best recommendation is to change nothing.
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="mx-auto mt-10 max-w-[56rem] space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>We don't believe every business needs AI.</p>
          <p>We don't believe every website needs rebuilding.</p>
          <p>And we certainly don't believe every business needs bespoke technology.</p>
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2} className="mx-auto mt-12 max-w-[56rem] text-2xl font-bold text-foreground">
          Our recommendation might simply be:
        </motion.p>

        <div className="mx-auto mt-8 grid max-w-[56rem] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Keep what you have',
              desc: "If it's doing the job, there's no reason to replace it.",
              Icon: CheckCircle2,
            },
            {
              title: 'Improve a process',
              desc: 'Sometimes the biggest gains come from changing how work gets done.',
              Icon: TrendingUp,
            },
            {
              title: 'Automate repetitive work',
              desc: 'Remove manual tasks that consume time without adding value.',
              Icon: Settings,
            },
            {
              title: 'Introduce AI',
              desc: "Where there's a genuine business case — not simply because AI is fashionable.",
              Icon: Sparkles,
            },
            {
              title: 'Modernise a platform',
              desc: "Improve, integrate or replace technology that's holding the business back.",
              Icon: Monitor,
            },
            {
              title: 'Build something new',
              desc: "Where existing platforms genuinely can't deliver what the business needs.",
              Icon: Box,
            },
          ].map(({ title, desc, Icon }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="min-h-[16.5rem] rounded-xl border border-primary/25 bg-card/60 p-8"
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-7 text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={3}
          className="mx-auto mt-8 flex max-w-[56rem] items-center gap-6 rounded-xl border border-primary/25 bg-card/60 px-8 py-8"
        >
          <span className="font-display text-6xl font-extrabold leading-none text-primary">“</span>
          <p className="border-l border-primary pl-6 text-2xl font-bold leading-snug text-foreground">
            We recommend what makes sense for your business — even when the answer is to <span className="text-primary">change nothing</span>.
          </p>
        </motion.div>
      </Section>

      {/* Founding Partner Callout */}
      <Section className="py-24 md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[58rem] text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-primary">Founding Partner Programme</p>
          <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            We're inviting <span className="ember-text">three businesses</span>
            <br />
            to become Next Foundry Founding Partners.
          </h2>
          <div className="mx-auto mt-8 max-w-[50rem] space-y-7 text-lg leading-relaxed text-muted-foreground">
            <p>
              We're offering three growing businesses a complimentary Business &amp; Technology Review to identify practical opportunities to improve how they work.
            </p>
            <p>
              We'll look at your processes, digital platforms and customer experience, and explore where AI, automation, cloud or simpler ways of working could create measurable value.
            </p>
            <p className="font-bold text-foreground">
              No sales pitch. No obligation to implement anything with us.
            </p>
          </div>
          <MotionLink
            to="/contact#contact-form"
            className="relative mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-base font-bold text-primary-foreground"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            Apply for a Founding Partner Review <ArrowRight className="h-5 w-5" />
          </MotionLink>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={1}
          className="mx-auto mt-16 flex max-w-[52rem] flex-col gap-6 border-t border-primary/30 pt-10 md:flex-row md:items-start"
        >
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-primary/60 bg-primary/10 text-primary">
            <Users className="h-9 w-9" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">What's involved?</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              We'll ask for your time, openness about how your business works and honest feedback on our recommendations.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              In return, the review is provided at no cost.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* How we help */}
      <Section className="py-24 md:py-32 bg-secondary/20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[48rem] text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">How we help</p>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            From recommendation to implementation.
          </h2>
          <p className="mx-auto max-w-[42rem] text-lg leading-relaxed text-muted-foreground">
            If the review identifies opportunities you'd like to pursue, Next Foundry can help turn those recommendations into working solutions.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'AI & Automation',
              desc: 'Practical applications of AI and automation designed around real business processes.',
            },
            {
              title: 'Digital Process Improvement',
              desc: 'Simplifying workflows, reducing duplication and connecting systems more effectively.',
            },
            {
              title: 'Digital Platform Modernisation',
              desc: 'Improving or replacing websites, ecommerce systems and customer-facing platforms that no longer support the business.',
            },
            {
              title: 'Cloud Engineering',
              desc: 'Modern, scalable cloud infrastructure with a particular focus on AWS.',
            },
            {
              title: 'Platform Migration',
              desc: "Helping businesses move beyond legacy or templated platforms when there's a genuine business case for doing so.",
            },
            {
              title: 'Managed Technology',
              desc: 'Ongoing monitoring, optimisation, support and continuous improvement after implementation.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-xl border border-border bg-card p-8"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Next Foundry */}
      <div id="why" className="border-y border-border/60 bg-background/40">
        <Section className="py-20 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto max-w-[62rem] text-center"
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-primary">Why Next Foundry</p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
              Enterprise experience.
              <br />
              Modern technology. <span className="ember-text">Business-first thinking.</span>
            </h2>
            <div className="mx-auto mt-7 max-w-[57rem] space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Next Foundry brings together decades of experience improving and managing critical technology services with practical, hands-on experience of modern cloud, automation and AI.
              </p>
              <p>
                That means we look at technology from both sides:
                <br className="hidden sm:block" />
                <span className="text-primary"> how it's built</span>, and <span className="text-primary">how it actually works</span> for the people and businesses that depend on it.
              </p>
            </div>
          </motion.div>

          <div className="mx-auto mt-8 grid max-w-[56rem] gap-4 md:grid-cols-2">
            {[
              {
                eyebrow: '25+ years',
                title: 'Technology experience',
                desc: 'Experience delivering, managing and improving critical technology services across complex public and private-sector environments.',
                Icon: Users,
              },
              {
                eyebrow: 'Enterprise leadership',
                title: 'Complex services & transformation',
                desc: 'Leadership across digital services, suppliers, operations and change in environments supporting thousands of users.',
                Icon: UsersRound,
              },
              {
                eyebrow: 'AWS certified',
                title: 'Modern cloud capability',
                desc: 'Hands-on experience with AWS, cloud-native architecture, Infrastructure as Code, CI/CD and automation.',
                Icon: Cloud,
              },
              {
                eyebrow: 'Business first',
                title: 'Technology with a purpose',
                desc: 'Technology decisions grounded in business outcomes, operational reality and measurable improvement, not technology for its own sake.',
                Icon: Crosshair,
              },
            ].map(({ eyebrow, title, desc, Icon }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="flex min-h-[11.25rem] items-start gap-6 rounded-lg border border-primary/25 bg-card/70 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                whileHover={{ y: -4, borderColor: 'hsl(24 100% 62% / 0.45)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" strokeWidth={1.7} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">{eyebrow}</p>
                  <h3 className="mt-4 text-xl font-bold leading-tight text-foreground">{title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={4}
            className="mx-auto mt-4 flex max-w-[56rem] flex-col gap-5 rounded-lg border border-border bg-card/75 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:flex-row sm:items-center"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center text-primary">
              <Building2 className="h-12 w-12" strokeWidth={1.7} />
            </span>
            <div className="hidden h-14 border-l border-primary/70 sm:block" />
            <div>
              <h3 className="text-2xl font-bold leading-tight text-foreground">Enterprise thinking doesn't have to mean enterprise complexity.</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                We bring the disciplines used in large organisations and apply them pragmatically to growing businesses.
              </p>
            </div>
          </motion.div>
        </Section>
      </div>

      {/* Final CTA */}
      <Section id="talk" withBackground={false} className="py-12 md:py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 px-6 py-16 text-center shadow-[0_22px_80px_rgba(0,0,0,0.28)] md:min-h-[40rem] md:px-16 md:py-20"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
            alt=""
            className="absolute inset-0 h-[115%] w-full object-cover opacity-70"
            initial={{ scale: 1.08 }}
            animate={{ scale: [1.08, 1.16, 1.08] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/35 to-background/78" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-background/35" />
          <div className="absolute inset-0 grain opacity-50" />
          <div className="relative z-10 mx-auto flex min-h-[30rem] max-w-[58rem] flex-col items-center justify-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-primary">Let's talk</p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Not sure whether you need AI,
              <br />
              a new platform,
              <br />
              or simply a fresh perspective?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Let's find out together.
            </p>
            <MotionLink
              to="/contact#contact-form"
              className="relative mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-lg font-bold text-primary-foreground shadow-[0_12px_45px_hsl(24_100%_62%_/_0.28)]"
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
            </MotionLink>

            <div className="mt-16 flex w-full flex-col items-center justify-center gap-6 text-left sm:flex-row sm:gap-8">
              {[
                { label: 'Practical advice', Icon: CheckCircle2 },
                { label: 'No obligation', Icon: ShieldCheck },
                { label: 'Focused on your business', Icon: Users },
              ].map(({ label, Icon }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div className="hidden h-8 border-l border-border sm:block" />}
                  <div className="flex items-center gap-4 text-lg font-medium text-foreground">
                    <Icon className="h-8 w-8 text-primary" strokeWidth={1.8} />
                    <span>{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Experience */}
      <Section className="pb-14 pt-2 md:pb-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-9 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">Experience across</p>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {[
            {
              title: 'AWS',
              desc: 'Cloud architecture, migration and modernisation',
              icon: <svg className="h-16 w-20" viewBox="0 0 80 64" fill="none"><path d="M13 18L32 7l19 11v22L32 51 13 40V18z" fill="#FF9900"/><path d="M25 24l7-4 7 4v10l-7 4-7-4V24z" fill="white"/><path d="M48 45c7.4 1.7 14 1.1 20.5-2.9 1-.6 1.8.4.9 1.3-5.5 6.2-16.9 8.7-25.6 5.4-.8-.3-.6-1.1.2-.9 1.3.3 2.6.7 4 1.1z" fill="#FF9900"/><path d="M62.7 41.1c1.9-.2 6.1-.6 6.9.3.8.9-.8 4.5-1.5 6.2-.2.5.2.7.6.3 2.7-2.3 3.4-7.2 2.9-7.8-.5-.6-5.4-1.1-8.3.9-.5.3-.4.7.4.6z" fill="#FF9900"/></svg>,
            },
            {
              title: 'GitHub',
              desc: 'Modern development and collaboration',
              icon: <svg className="h-16 w-16" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="white"/><path d="M24 12c-6.627 0-12 5.163-12 11.533 0 5.095 3.434 9.411 8.2 10.936.6.106.82-.25.82-.556 0-.275-.01-1.005-.016-1.972-3.338.693-4.042-1.547-4.042-1.547-.546-1.33-1.332-1.684-1.332-1.684-1.089-.715.082-.7.082-.7 1.204.08 1.838 1.188 1.838 1.188 1.07 1.76 2.81 1.252 3.495.957.108-.744.418-1.252.762-1.54-2.664-.29-5.466-1.28-5.466-5.696 0-1.258.466-2.287 1.232-3.094-.123-.292-.534-1.463.116-3.05 0 0 1.005-.31 3.292 1.182.954-.255 1.977-.382 2.994-.386 1.018.004 2.041.131 2.997.386 2.285-1.492 3.288-1.182 3.288-1.182.652 1.587.241 2.758.118 3.05.768.807 1.23 1.836 1.23 3.094 0 4.428-2.807 5.403-5.48 5.689.43.358.814 1.062.814 2.14 0 1.546-.014 2.792-.014 3.17 0 .309.216.667.828.554 4.762-1.528 8.19-5.842 8.19-10.935C36 17.163 30.627 12 24 12z" fill="#111"/></svg>,
            },
            {
              title: 'NHS',
              desc: 'Digital leadership and critical service delivery',
              icon: <svg className="h-16 w-24" viewBox="0 0 96 64" fill="none"><rect x="10" y="17" width="76" height="36" rx="3" fill="#005EB8"/><text x="48" y="42" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold" fontFamily="Arial">NHS</text></svg>,
            },
            {
              title: 'Terraform',
              desc: 'Infrastructure as Code and automation',
              icon: <svg className="h-16 w-16" viewBox="0 0 48 48" fill="none"><path d="M24 4L44 16v16L24 44 4 32V16L24 4z" fill="#7C42FF"/><path d="M24 12l10 6v12l-10 6-10-6V18l10-6z" fill="#fff" opacity=".9"/></svg>,
            },
            {
              title: 'Cloud',
              desc: 'Cloud-native platforms and DevOps',
              icon: <Cloud className="h-16 w-16 text-muted-foreground" strokeWidth={1.6} />,
            },
            {
              title: 'Enterprise',
              desc: 'Complex environments and scale',
              icon: <Building2 className="h-16 w-16 text-muted-foreground/55" strokeWidth={1.5} />,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="flex min-h-[17rem] flex-col items-center justify-start rounded-lg border border-border bg-card/55 px-4 py-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.16)]"
              whileHover={{ y: -4, borderColor: 'hsl(24 100% 62% / 0.38)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <div className="flex h-20 items-center justify-center">{item.icon}</div>
              <h3 className="mt-5 text-lg font-extrabold uppercase text-foreground">{item.title}</h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="mt-10 flex flex-col gap-6 rounded-xl border border-primary/25 bg-card/70 px-8 py-9 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:flex-row sm:items-center md:px-14"
        >
          <MessageCircle className="h-16 w-16 shrink-0 text-primary" strokeWidth={1.7} />
          <div className="hidden h-20 border-l-2 border-primary sm:block" />
          <div>
            <h3 className="text-2xl font-extrabold leading-tight text-foreground">No predetermined solution. No technology for technology's sake.</h3>
            <p className="mt-2 text-2xl leading-snug text-muted-foreground">
              Just a practical conversation about where technology could make your business work better.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background/75">
        <Section withBackground={false} className="py-8 md:py-10">
          <div className="grid gap-10 md:grid-cols-[1.5fr_0.9fr_1.25fr_1.35fr]">
            <div>
              <Logo size="sm" />
              <p className="mt-5 max-w-[14rem] text-base leading-relaxed text-muted-foreground">
                Practical technology advice. Real business impact.
              </p>
            </div>
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">Pages</p>
              <div className="flex flex-col gap-2 text-base text-muted-foreground">
                <a href="#approach" className="transition-colors hover:text-foreground">Approach</a>
                <a href="#why" className="transition-colors hover:text-foreground">Why us</a>
                <Link to="/founder" className="transition-colors hover:text-foreground">Meet the founder</Link>
              </div>
            </div>
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">Get in touch</p>
              <div className="flex flex-col gap-3 text-base text-muted-foreground">
                <a href="mailto:hello@nextfoundry.co.uk" className="inline-flex items-center gap-3 transition-colors hover:text-foreground">
                  <Mail className="h-5 w-5" />
                  hello@nextfoundry.co.uk
                </a>
                <a href="https://www.linkedin.com" className="inline-flex items-center gap-3 transition-colors hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </div>
            </div>
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">Based in the UK</p>
              <p className="max-w-[16rem] text-base leading-relaxed text-muted-foreground">
                Working with businesses across the UK.
              </p>
            </div>
          </div>
          <div className="mt-9 flex flex-col justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <p>© 2025 Next Foundry. All rights reserved.</p>
            <div className="flex gap-5">
              <span>Privacy Policy</span>
              <span className="text-border">|</span>
              <span>Terms</span>
            </div>
          </div>
        </Section>
      </footer>
      </div>
    </div>
  );
}
