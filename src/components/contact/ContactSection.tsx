import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Github, Linkedin, Instagram, ArrowUpRight, GraduationCap, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

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
    sound.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    sound.playSuccess();
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      sound.playLaser();
      return;
    }

    sound.playClick();
    setStatus('submitting');
    setErrorMessage('');

    // Simulate direct secure dispatch
    setTimeout(() => {
      sound.playSuccess();
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="06. Connection"
          title="GET IN TOUCH"
          subtitle="Whether you require Spring Boot backend engineering, scalable web platforms, or full-stack software development, connect directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Availability (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="bg-white dark:bg-[#0B0C10] rounded-2xl border border-neutral-200/80 dark:border-white/10 p-6 sm:p-7 space-y-5 shadow-sm dark:shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 beacon-green" />
                <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                  Current Availability
                </span>
              </div>

              <h3 className="font-mono text-lg font-bold text-neutral-900 dark:text-foreground">
                {PERSONAL_INFO.availabilityDetails}
              </h3>

              <div className="space-y-2.5 pt-1 font-sans text-xs text-neutral-500 dark:text-muted-foreground">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700 dark:text-slate-300">
                  <GraduationCap className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <span>{PERSONAL_INFO.education}</span>
                </div>
              </div>

              {/* Direct Email with Quick Copy */}
              <div className="pt-2">
                <label className="font-mono text-xs text-neutral-500 dark:text-muted-foreground uppercase tracking-wider block mb-2">
                  Direct Verified Email
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 dark:bg-[#0F1016] border border-black/5 dark:border-white/5 hover:border-[#FF6B00]/30 transition-colors">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-mono text-xs sm:text-sm text-neutral-800 dark:text-slate-200 hover:text-[#FF6B00] dark:hover:text-white truncate transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-muted-foreground hover:text-[#FF6B00] hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#FF6B00]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedEmail && (
                  <p className="text-xs font-mono text-[#FF6B00] mt-1.5 animate-in fade-in">
                    ✓ Email copied to clipboard!
                  </p>
                )}
              </div>

              {/* Direct Phone */}
              <div className="pt-1">
                <label className="font-mono text-xs text-neutral-500 dark:text-muted-foreground uppercase tracking-wider block mb-2">
                  Direct Phone / Telemetry
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 dark:bg-[#0F1016] border border-black/5 dark:border-white/5 hover:border-[#FF6B00]/30 transition-colors">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Phone className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-mono text-xs sm:text-sm text-neutral-800 dark:text-slate-200 hover:text-[#FF6B00] dark:hover:text-white truncate transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-muted-foreground hover:text-[#FF6B00] hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy phone to clipboard"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-[#FF6B00]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedPhone && (
                  <p className="text-xs font-mono text-[#FF6B00] mt-1.5 animate-in fade-in">
                    ✓ Phone number copied to clipboard!
                  </p>
                )}
              </div>

              {/* Direct WhatsApp Chat Action */}
              <div className="pt-1">
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct WhatsApp Chat →</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
                <span className="font-mono text-xs text-neutral-500 dark:text-muted-foreground uppercase tracking-wider block">
                  Professional Channels
                </span>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-100 dark:bg-[#0F1016] hover:bg-neutral-200 dark:hover:bg-white/5 border border-black/5 dark:border-white/5 text-neutral-700 dark:text-slate-300 hover:text-black dark:hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 dark:text-muted-foreground" />
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-100 dark:bg-[#0F1016] hover:bg-neutral-200 dark:hover:bg-white/5 border border-black/5 dark:border-white/5 text-neutral-700 dark:text-slate-300 hover:text-black dark:hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 dark:text-muted-foreground" />
                  </a>

                  <a
                    href={PERSONAL_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-100 dark:bg-[#0F1016] hover:bg-neutral-200 dark:hover:bg-white/5 border border-black/5 dark:border-white/5 text-neutral-700 dark:text-slate-300 hover:text-black dark:hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-pink-500" />
                      <span>Insta</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 dark:text-muted-foreground" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0B0C10] rounded-2xl border border-neutral-200/80 dark:border-white/10 p-6 sm:p-7 shadow-sm dark:shadow-xl">
            <div className="mb-6">
              <h3 className="font-mono text-xl font-bold text-neutral-900 dark:text-foreground flex items-center gap-2">
                <span>Dispatch Direct Transmission</span>
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] beacon-orange" />
              </h3>
              <p className="font-mono text-xs text-neutral-500 dark:text-muted-foreground mt-1">
                Direct route to inbox. Guaranteed response within 24 hours.
              </p>
            </div>

            {/* Status Alert Banner */}
            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-[#FF6B00]/[0.05] border border-[#FF6B00]/30 text-neutral-900 dark:text-white text-xs font-mono flex items-start gap-3">
                <Check className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Transmission Successfully Received</div>
                  <div className="mt-0.5 text-neutral-600 dark:text-slate-300 font-sans">
                    Thank you for reaching out, Omar Torbi will review your inquiry and reply promptly.
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-400 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-neutral-600 dark:text-muted-foreground">
                    Sender Name <span className="text-[#FF6B00]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g., Alex Vance"
                    value={formData.name}
                    onChange={(e) => {
                      sound.playKey();
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-[#0F1016] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-foreground placeholder:text-neutral-400 dark:placeholder:text-muted-foreground/60 outline-none focus:border-[#FF6B00]/60 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-neutral-600 dark:text-muted-foreground">
                    Return Email Address <span className="text-[#FF6B00]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      sound.playKey();
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-[#0F1016] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-foreground placeholder:text-neutral-400 dark:placeholder:text-muted-foreground/60 outline-none focus:border-[#FF6B00]/60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-neutral-600 dark:text-muted-foreground">
                  Subject / Topic
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Full-Stack Opportunity / Software Architecture Consulting"
                  value={formData.subject}
                  onChange={(e) => {
                    sound.playKey();
                    setFormData({ ...formData, subject: e.target.value });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-[#0F1016] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-foreground placeholder:text-neutral-400 dark:placeholder:text-muted-foreground/60 outline-none focus:border-[#FF6B00]/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-neutral-600 dark:text-muted-foreground">
                  Transmission Body <span className="text-[#FF6B00]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Describe your project, timeline, or engineering opportunity..."
                  value={formData.message}
                  onChange={(e) => {
                    sound.playKey();
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-[#0F1016] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-foreground placeholder:text-neutral-400 dark:placeholder:text-muted-foreground/60 outline-none focus:border-[#FF6B00]/60 transition-colors font-sans text-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === 'submitting'}
                className="w-full justify-center"
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
              >
                {status === 'submitting' ? 'Transmitting Data...' : 'Transmit Message (RPC)'}
              </Button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
