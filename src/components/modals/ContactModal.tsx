"use client";

import React, { useState } from "react";
import { sound } from "@/utils/sound";
import { useToast } from "../common/Toast";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { X, Send, Check, Mail, Phone, MapPin } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    sound.playSuccess();
    setSubmitted(true);
    showToast("Message initiated! Opening email client...");

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, "_blank");

    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
          <div>
            <h3 className="text-xl font-serif font-black text-black uppercase">
              Initiate Contact
            </h3>
            <p className="font-sans text-xs text-zinc-500 mt-0.5">
              Direct dispatch to {PERSONAL_INFO.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div className="font-serif font-bold text-lg text-black">Message Prepared</div>
            <div className="text-xs font-sans text-zinc-500">
              Email client opened for direct sending. Omar Torbi will reply promptly.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            <div>
              <label className="block text-zinc-600 font-medium mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  sound.playKey();
                  setName(e.target.value);
                }}
                placeholder="e.g. Alex Vance"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-black text-xs outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-zinc-600 font-medium mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  sound.playKey();
                  setEmail(e.target.value);
                }}
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-black text-xs outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-zinc-600 font-medium mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => {
                  sound.playKey();
                  setMessage(e.target.value);
                }}
                placeholder="Tell me about your engineering project, team, or opportunity..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-black text-xs outline-none focus:border-black transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-black hover:bg-zinc-800 text-white font-sans font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <span>SEND INQUIRY</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
