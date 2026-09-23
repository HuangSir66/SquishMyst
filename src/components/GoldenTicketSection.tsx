import React, { useState } from 'react';
import { Sparkles, Trophy, Gift, ArrowRight } from 'lucide-react';
import { playCelebrationChime, playPopSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface GoldenTicketSectionProps {
  onShopMystery: () => void;
  onOpenMysteryModal: () => void;
}

export const GoldenTicketSection: React.FC<GoldenTicketSectionProps> = ({
  onShopMystery,
  onOpenMysteryModal,
}) => {
  const [showPressModal, setShowPressModal] = useState(false);

  const handleRevealGold = () => {
    playCelebrationChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onOpenMysteryModal();
  };

  return (
    <section id="golden-ticket" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: Press Spotlight (Exact match to Screenshot 2) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#1F1C18] flex flex-col justify-between shadow-sm">
            
            <div className="space-y-6">
              
              <div>
                <span className="text-xs font-black tracking-widest text-[#EC4899] uppercase block mb-2">
                  PRESS SPOTLIGHT
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1F1C18] tracking-tight leading-tight">
                  Golden Ticket<br />
                  Mystery<br />
                  Dumpling
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#524B43] leading-relaxed">
                The Mystery Dumpling hunt got even bigger with the Golden Ticket Edition: a collector-focused drop built around rare finds, real-time unboxings, and the chase for surprise dumpling pulls.
              </p>

              {/* 3 Stat / Benefit Blocks (Exact match to Screenshot 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DAC6]">
                  <span className="font-display font-black text-base text-[#1F1C18] block">
                    1 of 1
                  </span>
                  <p className="text-[11px] text-[#736B60] mt-1 leading-snug">
                    Ultra-rare gold dumpling with a grand-prize ticket.
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DAC6]">
                  <span className="font-display font-black text-base text-[#EC4899] block">
                    $1,000
                  </span>
                  <p className="text-[11px] text-[#736B60] mt-1 leading-snug">
                    Shopping-spree prize announced for the Golden Ticket reveal.
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DAC6]">
                  <span className="font-display font-black text-base text-[#1F1C18] block">
                    Silver chase
                  </span>
                  <p className="text-[11px] text-[#736B60] mt-1 leading-snug">
                    Super-rare silver dumplings were also part of the collector hunt.
                  </p>
                </div>

              </div>

              <p className="text-xs text-[#736B60] leading-relaxed">
                The press release announced the Golden Ticket Edition as a May 16 Five Below drop and positioned Mystery Dumpling as a social-first collector phenomenon built on suspense, color reveals, and rare-pull reactions.
              </p>

            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-wrap gap-3">
              <button
                id="golden-ticket-shop-btn"
                onClick={() => {
                  playPopSound();
                  onShopMystery();
                }}
                className="px-6 py-3.5 bg-[#FFDF40] hover:bg-[#FACC15] text-[#1F1C18] font-black text-xs rounded-full shadow-sm hover:scale-102 transition-all cursor-pointer border border-[#734E24]/20"
              >
                Shop mystery dumplings
              </button>

              <button
                id="golden-ticket-press-btn"
                onClick={() => {
                  playPopSound();
                  setShowPressModal(true);
                }}
                className="px-6 py-3.5 bg-white hover:bg-[#FAF7F2] text-[#1F1C18] font-black text-xs rounded-full border-2 border-[#1F1C18] transition-all cursor-pointer"
              >
                Read the press release
              </button>
            </div>

          </div>

          {/* Right Card: Glowing Golden Ticket Mystery Dumpling Visual Stage */}
          <div
            onClick={handleRevealGold}
            className="lg:col-span-6 bg-gradient-to-br from-[#D946EF] via-[#A855F7] to-[#7E22CE] rounded-3xl p-6 sm:p-8 border-4 border-[#F0ABFC] shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer"
          >
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FDE047]/30 rounded-full filter blur-3xl pointer-events-none" />

            {/* Visual Gold Dumpling & Certificate Ticket */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6">
              
              <div className="relative w-64 h-64 flex items-center justify-center">
                
                {/* Bamboo Steamer Base */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                  {/* Steamer basket */}
                  <ellipse cx="100" cy="155" rx="85" ry="32" fill="#DEB887" stroke="#8C5E2D" strokeWidth="4" />
                  <rect x="15" y="125" width="170" height="30" fill="#C89B65" stroke="#8C5E2D" strokeWidth="4" />
                  <ellipse cx="100" cy="125" rx="85" ry="30" fill="#E6C294" stroke="#8C5E2D" strokeWidth="3" />
                  
                  {/* 24K Gold Glowing Dumpling */}
                  <g className="animate-pulse">
                    <path
                      d="M 45 130 C 35 60, 75 25, 100 20 C 125 25, 165 60, 155 130 C 140 145, 60 145, 45 130 Z"
                      fill="url(#goldGradient)"
                      stroke="#A16207"
                      strokeWidth="5"
                    />
                    {/* Dollar sign eyes */}
                    <text x="82" y="86" fontSize="18" fontWeight="black" fill="#15803D" textAnchor="middle">$</text>
                    <text x="118" y="86" fontSize="18" fontWeight="black" fill="#15803D" textAnchor="middle">$</text>
                    {/* Blush */}
                    <ellipse cx="72" cy="94" rx="7" ry="4" fill="#FF7096" opacity="0.9" />
                    <ellipse cx="128" cy="94" rx="7" ry="4" fill="#FF7096" opacity="0.9" />
                    {/* Smile */}
                    <path d="M 92 95 Q 100 102 108 95" fill="none" stroke="#2D2A26" strokeWidth="3" strokeLinecap="round" />
                  </g>

                  {/* Sparkle effects */}
                  <circle cx="50" cy="40" r="3" fill="#FFF" className="animate-ping" />
                  <circle cx="150" cy="50" r="4" fill="#FFF" className="animate-pulse" />
                  <circle cx="100" cy="10" r="3" fill="#FFE27A" />

                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF9C4" />
                      <stop offset="30%" stopColor="#FACC15" />
                      <stop offset="70%" stopColor="#EAB308" />
                      <stop offset="100%" stopColor="#CA8A04" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Golden Ticket Winner Certificate Ribbon (Exact match to Screenshot 2) */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#FEF08A] via-[#FACC15] to-[#EAB308] text-[#1F1C18] p-3 rounded-2xl border-2 border-white shadow-xl rotate-6 group-hover:rotate-0 transition-transform">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#854D0E]">WINNER</div>
                  <div className="font-display font-black text-xs text-[#1F1C18]">GOLDEN TICKET</div>
                  <div className="text-[9px] text-[#713F12] font-bold mt-0.5">$1,000 Shopping Spree</div>
                </div>

              </div>

            </div>

            {/* Bottom Badge: Exact match to Screenshot 2 */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/20">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-black text-[#8B5CF6] shadow-md">
                <span className="text-[#A855F7] text-[10px]">RARE DROP</span>
                <span className="text-[#1F1C18]">GOLD CHASE</span>
              </div>

              <span className="text-xs font-black text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Tap to simulate pull</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Press Release Details Modal */}
      {showPressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#1F1C18] shadow-2xl">
            <h3 className="font-display font-black text-xl text-[#1F1C18] mb-2">
              📰 Official Press Release: Golden Ticket Edition
            </h3>
            <div className="text-xs text-[#524B43] space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
              <p>
                <strong>PHILADELPHIA / LOS ANGELES</strong> — Squishy Dumpling Co. today officially announced the nationwide retail rollout of the Limited Golden Ticket Mystery Steamer drop.
              </p>
              <p>
                As part of this viral drop, one lucky shopper will discover the 1-of-1 Ultra-Rare 24K Gold Dragon Dumpling containing an official certificate for a $1,000 shopping spree.
              </p>
              <p>
                Additional rare pulls include diamond-infused glitter editions and collectible silver-chase variants. Every single box comes enclosed in a food-safe authentic mini bamboo steamer.
              </p>
            </div>
            <button
              onClick={() => setShowPressModal(false)}
              className="mt-6 w-full py-3 bg-[#1F1C18] text-white font-black text-xs rounded-full hover:bg-[#FF5C38] transition-colors cursor-pointer"
            >
              Close Press Release
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
