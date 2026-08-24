import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
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

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'We could not send your message. Please try again shortly.');
      }

      setForm({ name: '', email: '', message: '', website: '' });
      setStatus({ type: 'success', message: payload.message });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'We could not send your message. Please try again shortly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-background relative min-h-screen text-foreground antialiased">
      <Seo
        title="Contact Next Foundry | Book a Free Business Review"
        description="Contact Next Foundry to book a free business and technology review covering AI opportunities, cloud platforms, process improvement and practical next steps."
        path="/contact"
      />
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="relative z-0">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[72rem] items-center justify-between px-6">
            <Link to="/">
              <Logo size="md" />
            </Link>
            <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Back to home
            </Link>
          </div>
        </header>

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
              Contact
            </motion.p>
            <div className="mb-10 max-w-[2rem] border-t-2 border-primary" />

            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Let's talk.
            </motion.h1>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <Phone className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</p>
                  <a href="tel:07710211223" className="text-lg font-semibold text-foreground transition-colors hover:text-primary">07710 211223</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <Mail className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href="mailto:andy.hopla4@outlook.com" className="text-lg font-semibold text-foreground transition-colors hover:text-primary">andy.hopla4@outlook.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/andyhopla/" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-foreground transition-colors hover:text-primary">Andy Hopla</a>
                </div>
              </div>
            </motion.div>

            <motion.form
              id="contact-form"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              onSubmit={submitForm}
              className="mt-12 max-w-xl rounded-xl border border-border/70 bg-card/60 p-6 shadow-2xl backdrop-blur-sm"
            >
              <h2 className="font-display text-xl font-bold">Send a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">I’ll get back to you as soon as I can.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Name
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    maxLength={100}
                    autoComplete="name"
                    className="contact-field rounded-md border px-3 py-2.5 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    maxLength={254}
                    autoComplete="email"
                    className="contact-field rounded-md border px-3 py-2.5 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
                  />
                </label>
              </div>

              <label className="mt-4 grid gap-2 text-sm font-medium">
                Message
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  maxLength={1000}
                  rows={5}
                  className="contact-field resize-y rounded-md border px-3 py-2.5 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
              </label>

              <label className="hidden" aria-hidden="true">
                Website
                <input name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" />
              </label>

              {status.message && (
                <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-destructive'}`} role="status">
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </motion.form>

            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-12 text-sm text-muted-foreground">
              Based in the UK. Available for remote and on-site engagements.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
