import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Github, Linkedin, Instagram, ArrowUpRight, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Simulate direct mail dispatch
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-14 sm:py-16 border-b border-border/70 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Direct Inquiries"
          title="Initiate Technical Dialogue"
          subtitle="Whether you require Spring Boot backend engineering, scalable web platforms, or full-stack software development, connect directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Direct Contact & Availability (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Status Card */}
            <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                  Current Availability
                </span>
              </div>

              <h3 className="font-mono text-lg font-bold text-foreground">
                {PERSONAL_INFO.availabilityDetails}
              </h3>

              <div className="space-y-2 pt-1 font-sans text-xs text-muted-foreground">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <GraduationCap className="w-4 h-4 text-accent shrink-0" />
                  <span>{PERSONAL_INFO.education}</span>
                </div>
              </div>

              {/* Direct Email with Quick Copy */}
              <div className="pt-2">
                <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  Direct Verified Email
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#121927] border border-slate-800">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-mono text-xs sm:text-sm text-slate-200 hover:text-accent truncate transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-card text-muted-foreground hover:text-foreground hover:bg-slate-700 transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedEmail && (
                  <p className="text-xs font-mono text-emerald-400 mt-1.5 animate-fadeIn">
                    ✓ Email copied to clipboard!
                  </p>
                )}
              </div>

              {/* Direct Phone */}
              <div className="pt-1">
                <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  Direct Phone / WhatsApp
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#121927] border border-slate-800">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-mono text-xs sm:text-sm text-slate-200 hover:text-accent truncate transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-card text-muted-foreground hover:text-foreground hover:bg-slate-700 transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy phone to clipboard"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedPhone && (
                  <p className="text-xs font-mono text-emerald-400 mt-1.5 animate-fadeIn">
                    ✓ Phone number copied to clipboard!
                  </p>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-border/60 space-y-2">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block">
                  Professional Channels
                </span>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted border border-border text-slate-300 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-accent" />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted border border-border text-slate-300 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-accent" />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                  </a>

                  <a
                    href={PERSONAL_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted border border-border text-slate-300 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-accent" />
                      <span>Insta</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-card rounded-2xl border border-border p-5 sm:p-6">
            <div className="mb-4">
              <h3 className="font-mono text-xl font-bold text-foreground">
                Send Direct Inquiry
              </h3>
              <p className="font-mono text-xs text-muted-foreground mt-1">
                Typical response time: Within 24 hours.
              </p>
            </div>

            {/* Status Alert Banner */}
            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/30 border border-accent/50 text-emerald-300 text-xs font-mono flex items-start gap-3">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Transmission Successfully Received</div>
                  <div className="mt-0.5 text-slate-300">
                    Thank you for reaching out, Omar Torbi will review your message and reply promptly.
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-800/50 text-red-300 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="font-mono text-xs text-muted-foreground">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g., Sarah Chen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121927] border border-slate-800 text-sm font-sans text-foreground placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-mono text-xs text-muted-foreground">
                    Your Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121927] border border-slate-800 text-sm font-sans text-foreground placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="font-mono text-xs text-muted-foreground">
                  Project Domain / Role
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g., 3D CAD Web Development, Spring Boot Backend Engineering"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#121927] border border-slate-800 text-sm font-sans text-foreground placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="font-mono text-xs text-muted-foreground">
                  Message Details <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Share details regarding your technical requirements, project timeline, or role description..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#121927] border border-slate-800 text-sm font-sans text-foreground placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-accent resize-y"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'submitting'}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  {status === 'submitting' ? 'Transmitting Message...' : 'Send Message'}
                </Button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
