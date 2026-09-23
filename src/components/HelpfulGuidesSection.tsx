import React, { useState } from 'react';
import { ArrowRight, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { HELPFUL_GUIDES } from '../data/dumplings';
import { playPopSound, playCelebrationChime } from '../utils/sound';

interface HelpfulGuidesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HelpfulGuidesSection: React.FC<HelpfulGuidesSectionProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    playCelebrationChime();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Exact match to Screenshot 3 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black tracking-widest text-[#EAB308] uppercase block mb-2">
            HELPFUL GUIDES
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#1F1C18] tracking-tight">
            Know what you are buying before the reveal.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#524B43] font-medium leading-relaxed max-w-xl mx-auto">
            Clear product, bundle, and shipping details to help you pick the right mystery squishy experience.
          </p>
        </div>

        {/* 6 Helpful Guides Grid: Exact match to Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {HELPFUL_GUIDES.map((guide, idx) => (
            <div
              key={idx}
              onClick={() => {
                playPopSound();
                onNavigate(guide.actionTarget);
              }}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E8DAC6] hover:border-[#1F1C18] transition-all hover:shadow-lg flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-black mb-4 ${guide.tagBg}`}>
                  {guide.tag}
                </span>

                <h3 className="font-display font-black text-lg sm:text-xl text-[#1F1C18] group-hover:text-[#FF5C38] transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-[#524B43] mt-3 leading-relaxed">
                  {guide.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0E6D8] flex items-center justify-between">
                <span className="text-xs font-black text-[#1F1C18] group-hover:text-[#FF5C38] transition-colors">
                  {guide.linkText}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D8C7B0] group-hover:bg-[#1F1C18] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drop Alerts Newsletter Banner: Exact match to Screenshot 3 */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#DB2777] via-[#E11D48] to-[#EA580C] text-white shadow-xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
            <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Get first dibs on rare pulls, bundles, and discounts.
            </h3>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Drop alerts, restock updates, and bundle deals sent straight to your inbox.
            </p>

            {/* Newsletter Input Card */}
            <div className="mt-8 bg-white rounded-3xl p-4 sm:p-6 text-left border-2 border-white/40 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-[11px] font-black tracking-widest text-[#DB2777] uppercase">
                  DROP ALERTS
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE7F3] text-[#9D174D]">Rare restocks</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E]">Bundle deals</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DBEAFE] text-[#1E40AF]">New color drops</span>
                </div>
              </div>

              {subscribed ? (
                <div className="p-4 bg-[#DCFCE7] text-[#166534] rounded-2xl flex items-center gap-3 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>You're on the VIP drop alert list! We just sent your 15% welcome code.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for drop alerts..."
                    className="flex-1 px-5 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DAC6] text-xs font-bold text-[#1F1C18] placeholder-[#A8A29E] focus:outline-none focus:border-[#DB2777]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-2xl bg-[#1F1C18] hover:bg-[#DB2777] text-white font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Get drop alerts</span>
                    <ArrowRight className="w-4 h-4" />
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
