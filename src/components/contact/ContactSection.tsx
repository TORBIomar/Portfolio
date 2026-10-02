import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Github, Linkedin, Instagram, ArrowUpRight, GraduationCap, Download } from 'lucide-react';
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

    // Open mailto fallback and show success
    setTimeout(() => {
      sound.playSuccess();
      setStatus('success');
      const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, '_blank');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-b border-neutral-300 dark:border-neutral-800 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="05. Direct Channels"
          title="GET IN TOUCH"
          subtitle="Whether discussing software engineering, cloud infrastructure & DevOps, or final-year internship opportunities, get in touch directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Availability (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="bg-white dark:bg-[#09090B] rounded-md border border-neutral-300 dark:border-neutral-800 p-6 sm:p-7 space-y-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white beacon-white" />
                <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                  Professional Availability
                </span>
              </div>

              <h3 className="font-sans text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
                {PERSONAL_INFO.workAuthorization}
              </h3>

              <div className="space-y-2.5 pt-1 font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                  <MapPin className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                  <GraduationCap className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
                  <span>{PERSONAL_INFO.education}</span>
                </div>
              </div>

              {/* Direct Email with Quick Copy */}
              <div className="pt-2">
                <label className="font-sans text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
                  Direct Email
                </label>
                <div className="flex items-center justify-between p-3 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white/50 transition-colors">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-sans text-xs sm:text-sm text-neutral-900 dark:text-white hover:underline transition-colors truncate"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-sm hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-neutral-900 dark:text-white" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="font-sans text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
                  Phone &amp; WhatsApp
                </label>
                <div className="flex items-center justify-between p-3 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
                    <a
                      href={PERSONAL_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs sm:text-sm text-neutral-900 dark:text-white hover:underline transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-sm hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy phone to clipboard"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-neutral-900 dark:text-white" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Download CV Options */}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div className="font-sans text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2.5">
                  Official Resumes
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans font-medium">
                  <a
                    href={PERSONAL_INFO.resumeUrlEn}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playSuccess()}
                    className="flex items-center justify-between p-2.5 rounded-md bg-neutral-100 dark:bg-white/5 hover:border-neutral-900 dark:hover:border-white/50 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <span>Resume (EN)</span>
                    <Download className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  </a>
                  <a
                    href={PERSONAL_INFO.resumeUrlFr}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playSuccess()}
                    className="flex items-center justify-between p-2.5 rounded-md bg-neutral-100 dark:bg-white/5 hover:border-neutral-900 dark:hover:border-white/50 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <span>CV (FR)</span>
                    <Download className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div className="grid grid-cols-3 gap-2 font-sans text-xs font-medium">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-between p-2.5 rounded-md bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-between p-2.5 rounded-md bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </a>

                  <a
                    href={PERSONAL_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-between p-2.5 rounded-md bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                      <span>Instagram</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#09090B] rounded-md border border-neutral-300 dark:border-neutral-800 p-6 sm:p-7 shadow-2xl">
            <div className="mb-6">
              <h3 className="font-mono text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span>Send a Message</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Direct to inbox. Inquiries regarding roles or engineering projects are typically answered within 24 hours.
              </p>
            </div>

            {/* Status Alert Banner */}
            {status === 'success' && (
              <div className="mb-6 p-4 rounded-md bg-neutral-900/5 dark:bg-white/5 border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white text-xs font-sans flex items-start gap-3">
                <Check className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Message Initiated</div>
                  <div className="mt-0.5 text-neutral-600 dark:text-neutral-300 font-sans">
                    Email dispatch opened. Omar Torbi will review and respond promptly.
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-md bg-rose-950/30 border border-rose-800/50 text-rose-400 text-xs font-sans">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-neutral-600 dark:text-neutral-400 font-medium">
                    Your Name <span className="text-neutral-900 dark:text-white">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={formData.name}
                    onChange={(e) => {
                      sound.playKey();
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-md bg-neutral-50 dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors font-sans text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-neutral-600 dark:text-neutral-400 font-medium">
                    Your Email <span className="text-neutral-900 dark:text-white">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      sound.playKey();
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-md bg-neutral-50 dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-neutral-600 dark:text-neutral-400 font-medium">
                  Subject / Topic
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Software / DevOps Engineering Opportunity"
                  value={formData.subject}
                  onChange={(e) => {
                    sound.playKey();
                    setFormData({ ...formData, subject: e.target.value });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-md bg-neutral-50 dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors font-sans text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-neutral-600 dark:text-neutral-400 font-medium">
                  Message <span className="text-neutral-900 dark:text-white">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me about your team, tech stack, or engineering project..."
                  value={formData.message}
                  onChange={(e) => {
                    sound.playKey();
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-md bg-neutral-50 dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors font-sans text-sm resize-none"
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
                {status === 'submitting' ? 'Sending Message...' : 'Send Message →'}
              </Button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
