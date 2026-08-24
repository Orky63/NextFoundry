import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
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

      {/* Business friction */}
      <Section id="approach" className="py-24 md:py-32 bg-secondary/20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[48rem]">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Is technology helping your business — or getting in the way?
          </h2>
          <div className="mt-8 max-w-[2rem] border-t-2 border-primary" />
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
          <div className="mx-auto mt-6 max-w-[2rem] border-t-2 border-primary" />
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
              desc: 'We identify where AI, automation, cloud technology or platform improvements could make a practical difference.',
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
            <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
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
                desc: 'A practical starting point showing what you could realistically achieve over the next three months.',
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
      <Section className="py-24 md:py-32 bg-secondary/20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">What happens next?</p>
          <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="mx-auto max-w-[48rem] space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>Sometimes the best recommendation is to change nothing.</p>
          <p>We don't believe every business needs AI.</p>
          <p>We don't believe every website needs rebuilding.</p>
          <p>And we certainly don't believe every business needs bespoke technology.</p>
          <p>Sometimes we'll recommend:</p>
          <p className="font-semibold text-foreground">Keep what you have.</p>
          <p>Sometimes:</p>
          <p className="font-semibold text-foreground">Improve an existing process.</p>
          <p>Sometimes:</p>
          <p className="font-semibold text-foreground">Automate repetitive work.</p>
          <p>Sometimes:</p>
          <p className="font-semibold text-foreground">Introduce AI.</p>
          <p>Sometimes:</p>
          <p className="font-semibold text-foreground">Modernise or replace a digital platform.</p>
          <p>And sometimes:</p>
          <p className="font-semibold text-foreground">Build something completely new.</p>
          <p>The recommendation should be driven by the business problem — not by the technology we happen to sell.</p>
        </motion.div>

      </Section>

      {/* Founding Partner Callout */}
      <Section className="py-24 md:py-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[46rem] text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Founding Partners</p>
          <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
          <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
            We're looking for our first Founding Partners.
          </h2>
          <p className="mx-auto mt-6 max-w-[40rem] text-lg leading-relaxed text-muted-foreground">
            If you're a growing business that wants practical, independent advice on AI, cloud and digital process improvement, we'd like to work with you.
          </p>
          <MotionLink
            to="/contact#contact-form"
            className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-base font-bold text-primary-foreground"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            Apply <ArrowRight className="h-5 w-5" />
          </MotionLink>
        </motion.div>
      </Section>

      {/* How we help */}
      <Section className="py-24 md:py-32 bg-secondary/20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[48rem] text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">How we help</p>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            From recommendation to implementation.
          </h2>
          <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
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

      {/* Why clients work with us */}
      <div id="why" className="border-y border-border/60 bg-secondary/20">
        <Section className="py-24 md:py-32">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why Next Foundry</p>
            <div className="mx-auto mb-12 max-w-[2rem] border-t-2 border-primary" />
          </motion.div>

          <div className="mx-auto grid max-w-[40rem] gap-6">
            {[
              { t: '25+ years enterprise technology experience', d: 'Decades of hands-on engineering and leadership across the public and private sectors.' },
              { t: 'NHS digital leadership', d: 'Experience delivering technology strategy and platforms at a national health service scale.' },
              { t: 'AWS certified', d: 'Validated expertise in cloud architecture, migration and modernisation on AWS.' },
              { t: 'Cloud engineering expertise', d: 'Deep knowledge of cloud-native platforms, infrastructure-as-code and DevOps.' },
              { t: 'Practical AI thinking', d: 'Identifying where AI and automation can deliver meaningful improvements to real business processes.' },
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
            className="absolute inset-0 h-[120%] w-full object-cover opacity-45"
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
            <MotionLink
              to="/contact#contact-form"
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
            </MotionLink>
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
