"use client";

import React, { useState } from "react";
import { sound } from "@/utils/sound";
import { useToast } from "../common/Toast";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Download,
  MapPin,
  ExternalLink,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../common/SocialIcons";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export const ReachOutSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { showToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sentName, setSentName] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    sound.playSuccess();
    showToast(`Copied ${PERSONAL_INFO.email} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    sound.playSuccess();
    showToast(`Copied ${PERSONAL_INFO.phone} to clipboard!`);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      let isSuccess = false;

      // 1. Try Next.js serverless route
      try {
        const res = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            isSuccess = true;
          }
        }
      } catch {
        // Fall back to direct client submission
      }

      // 2. Client-side direct fallback if server route returned an error
      if (!isSuccess) {
        const accessKey =
          process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
          "9cc52726-2085-4a72-9421-2b644a6d0c9b";
        const fallbackRes = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim() || `Portfolio Inquiry from ${name.trim()}`,
            message: message.trim(),
            from_name: `${name.trim()} (Portfolio)`,
          }),
        });
        if (fallbackRes.ok) {
          const fbData = await fallbackRes.json().catch(() => ({}));
          if (fbData.success) {
            isSuccess = true;
          }
        }
      }

      if (isSuccess) {
        sound.playSuccess();
        try {
          const confetti = (await import("canvas-confetti")).default;
          confetti({
            particleCount: 65,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore confetti if canvas unsupported
        }
        setSentName(name.trim());
        setSubmitted(true);
        showToast("Inquiry successfully sent to Omar Torbi!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setErrorMessage(
          "Could not deliver message right now. Please try again or reach out directly at " +
            PERSONAL_INFO.email
        );
        showToast("Delivery encountered an issue. Please retry.", "info");
      }
    } catch {
      setErrorMessage("Network issue. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 border-b border-zinc-200/90 dark:border-white/10 bg-[#fcfcfc] dark:bg-[#000000] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-medium mb-3 shadow-2xs">
            <span className="text-accent font-bold">05.</span>
            <MessageSquare className="w-3.5 h-3.5 text-accent" />
            <span>{t.contact.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-neutral-950 dark:text-white uppercase mb-3 transition-colors">
            {t.contact.title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Grid: Contact Information & Direct Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Channels & Telemetry (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card (Copies to clipboard and triggers inquiry form without opening mail app) */}
            <div
              onClick={handleCopyEmail}
              className="cursor-target p-5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 flex items-center justify-between shadow-2xs hover:border-accent/40 transition-colors cursor-pointer group"
              data-cursor-label="Copy Email"
              title="Click to copy email address"
            >
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 group-hover:bg-accent/10 flex items-center justify-center text-black dark:text-white group-hover:text-accent shrink-0 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Direct Email</span>
                    <span className="text-[9px] text-zinc-600 dark:text-zinc-400 font-sans">(Click to copy)</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-black dark:text-white group-hover:text-accent group-hover:underline truncate block transition-colors">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>
              <div
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer shrink-0 ml-2 transition-colors"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 flex items-center justify-between shadow-2xs hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                    Phone &amp; WhatsApp
                  </div>
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target font-mono text-xs sm:text-sm font-bold text-black dark:text-white hover:text-accent hover:underline truncate block transition-colors"
                    data-cursor-label="WhatsApp"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="cursor-target p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer shrink-0 ml-2 transition-colors"
                data-cursor-label="Copy Phone"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location & Status Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Rabat / Béni Mellal, Morocco</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-black dark:text-white font-medium">
                <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse shadow-[0_0_8px_var(--accent-glow)]" />
                <span>Available for immediate interviews &amp; 2027 PFE</span>
              </div>
            </div>

            {/* Official CVs & Dossiers */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 shadow-2xs space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block font-bold">
                Official CV &amp; Dossiers
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={PERSONAL_INFO.resumeUrlEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSuccess()}
                  className="cursor-target p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white bg-zinc-50 dark:bg-zinc-900 text-xs font-mono font-medium text-black dark:text-white flex items-center justify-between transition-colors"
                  data-cursor-label="PDF (EN)"
                >
                  <span>Resume (EN)</span>
                  <Download className="w-3 h-3 text-zinc-400" />
                </a>
                <a
                  href={PERSONAL_INFO.resumeUrlFr}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSuccess()}
                  className="cursor-target p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white bg-zinc-50 dark:bg-zinc-900 text-xs font-mono font-medium text-black dark:text-white flex items-center justify-between transition-colors"
                  data-cursor-label="PDF (FR)"
                >
                  <span>CV (FR)</span>
                  <Download className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-850 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-transparent dark:border-zinc-800">
                  Java SE 17 Pro
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-transparent dark:border-zinc-800">
                  OCI DevOps Pro
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-transparent dark:border-zinc-800">
                  OCI Architect Pro
                </span>
              </div>
            </div>

            {/* Social Network Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="cursor-target p-3.5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 flex items-center justify-between hover:border-black dark:hover:border-white transition-colors"
                data-cursor-label="GitHub"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-black dark:text-white" />
                  <span className="font-mono text-xs font-bold text-black dark:text-white">GitHub</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="cursor-target p-3.5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 flex items-center justify-between hover:border-black dark:hover:border-white transition-colors"
                data-cursor-label="LinkedIn"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-black dark:text-white" />
                  <span className="font-mono text-xs font-bold text-black dark:text-white">LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>

          </div>

          {/* Right Column: Direct Message Dispatch Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-3xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 shadow-xs transition-colors">
              <h3 className="font-sans text-xl font-bold text-black dark:text-white mb-1 transition-colors">
                Send a Direct Message
              </h3>
              <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                All messages route straight to Omar Torbi&apos;s verified inbox.
              </p>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/40 text-accent flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xl text-black dark:text-white">
                      Inquiry Dispatched Successfully
                    </h4>
                    <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you, <span className="font-semibold text-accent">{sentName || "there"}</span>! Your inquiry has been routed straight to Omar Torbi&apos;s verified inbox (<span className="font-mono text-zinc-900 dark:text-zinc-200">{PERSONAL_INFO.email}</span>). A prompt response will follow.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-sans font-medium border border-accent/30 hover:bg-accent/10 text-accent transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                        {language === "fr" ? "Votre Nom *" : "Your Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={name}
                        onChange={(e) => {
                          sound.playKey();
                          setName(e.target.value);
                        }}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121214] text-black dark:text-white text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 disabled:opacity-60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                        {language === "fr" ? "Votre Email *" : "Your Email *"}
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => {
                          sound.playKey();
                          setEmail(e.target.value);
                        }}
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121214] text-black dark:text-white text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 disabled:opacity-60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                      {language === "fr" ? "Objet" : "Subject"}
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      value={subject}
                      onChange={(e) => {
                        sound.playKey();
                        setSubject(e.target.value);
                      }}
                      placeholder={
                        language === "fr"
                          ? "ex: Opportunité Ingénierie Logicielle / PFE"
                          : "e.g. Software Engineering Opportunity / PFE"
                      }
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121214] text-black dark:text-white text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 disabled:opacity-60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                      {language === "fr" ? "Message *" : "Message *"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      disabled={isSubmitting}
                      value={message}
                      onChange={(e) => {
                        sound.playKey();
                        setMessage(e.target.value);
                      }}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121214] text-black dark:text-white text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 disabled:opacity-60 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-target w-full py-3.5 rounded-full bg-black dark:bg-white hover:bg-accent hover:text-white dark:hover:text-neutral-950 disabled:opacity-60 disabled:cursor-not-allowed text-white dark:text-black font-sans font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md uppercase"
                    data-cursor-label={language === "fr" ? "Envoyer" : "Send"}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{language === "fr" ? "ENVOI EN COURS..." : "DISPATCHING INQUIRY..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.contact.sendMessage}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
