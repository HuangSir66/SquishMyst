import React, { useState } from 'react';
import { X, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { playCelebrationChime, playPopSound } from '../utils/sound';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Order Inquiry', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playCelebrationChime();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#1F1C18] shadow-2xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DAC6]">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#FF5C38]" />
            <h3 className="font-display font-black text-xl text-[#1F1C18]">
              Contact Squishy Dumpling Support
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#736B60] hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#DCFCE7] text-[#15803D] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display font-black text-xl text-[#1F1C18]">Message Received!</h4>
            <p className="text-xs text-[#524B43] max-w-sm mx-auto">
              Thanks for reaching out! Our sensory support team responds within 12 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#1F1C18] text-white text-xs font-black rounded-full cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-black text-[#1F1C18] block mb-1">Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Alex Smith"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DAC6] text-xs font-bold text-[#1F1C18] focus:outline-none focus:border-[#FF5C38]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#1F1C18] block mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="alex@example.com"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DAC6] text-xs font-bold text-[#1F1C18] focus:outline-none focus:border-[#FF5C38]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#1F1C18] block mb-1">Topic</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DAC6] text-xs font-bold text-[#1F1C18] focus:outline-none"
              >
                <option>Order & Tracking Question</option>
                <option>Golden Ticket Claim</option>
                <option>Wholesale & Retail Inquiries</option>
                <option>General Feedback</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-[#1F1C18] block mb-1">Message</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help your squishy experience?"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DAC6] text-xs font-bold text-[#1F1C18] focus:outline-none focus:border-[#FF5C38]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FF5C38] hover:bg-[#E04826] text-white text-xs font-black rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
