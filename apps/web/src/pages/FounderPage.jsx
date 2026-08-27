import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import Seo from '@/components/Seo';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FounderPage() {
  return (
    <div className="page-background relative min-h-screen text-foreground antialiased">
      <Seo
        title="Meet the Founder | Next Foundry"
        description="Meet Andy Hopla, founder of Next Foundry, and learn how decades of enterprise technology and cloud transformation experience shape practical business-first advice."
        path="/founder"
      />
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="relative z-0">
        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[72rem] items-center justify-between px-6">
            <Link to="/">
              <Logo size="md" />
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to home
            </Link>
          </div>
        </header>

        {/* Hero */}
        <div className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
          <motion.img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
            alt=""
            className="absolute inset-0 h-[120%] w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 grain opacity-60" />
          <div className="relative z-10 mx-auto max-w-[72rem] px-6 py-24">
            <motion.p variants={fadeUp} initial="hidden" animate="show" className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Meet the founder
            </motion.p>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1} className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              Andy has spent decades leading enterprise technology and cloud transformation programmes before creating Next Foundry.
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-10 text-lg leading-relaxed text-muted-foreground">
              His focus is simple:
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-6 max-w-[46ch] text-2xl font-bold leading-snug tracking-tight text-foreground">
              help businesses buy less technology...
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-4 max-w-[46ch] text-2xl font-bold leading-snug tracking-tight text-foreground">
              and get more value from the technology they already have.
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={5} className="mt-10">
              <a
                href="https://www.linkedin.com/in/andyhopla/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Connect on LinkedIn
              </a>
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6} className="mt-6">
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-base font-bold text-primary-foreground"
              >
                Let's talk
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
