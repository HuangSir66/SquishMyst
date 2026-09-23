import React from 'react';
import { Gift, Sparkles, Trophy, Star, ArrowRight } from 'lucide-react';
import { MYSTERY_POOL } from '../data/dumplings';
import { DumplingGraphic } from './DumplingGraphic';
import { playPopSound } from '../utils/sound';

interface MysteryBoxSectionProps {
  onOpenMysteryModal: () => void;
}

export const MysteryBoxSection: React.FC<MysteryBoxSectionProps> = ({ onOpenMysteryModal }) => {
  return (
    <section id="mystery-box" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F6EEFA] to-[#FAF7F2] border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          
          {/* Background decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full filter blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-[#F472B6]/20 rounded-full filter blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-[#FDE047] border border-white/20">
                <Gift className="w-3.5 h-3.5" />
                <span>Mystery Dim Sum Series 3</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Can You Find the Secret 24K Gold Dragon Dumpling?
              </h2>

              <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
                Every sealed blind box contains a surprise slow-rising dumpling in an authentic mini bamboo steamer. 
                Collect all 8 unique styles or try the interactive simulator right now!
              </p>

              {/* Rarity checklist preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
                {MYSTERY_POOL.map((item) => (
                  <div key={item.id} className="bg-black/25 backdrop-blur-xs p-2.5 rounded-xl border border-white/15">
                    <div className="font-extrabold text-white truncate">{item.name.split(' ')[0]} {item.name.split(' ')[1]}</div>
                    <div className="text-[11px] font-bold text-[#FDE047] mt-0.5">{item.rarity}</div>
                    <div className="text-[10px] text-white/70">{item.chance} odds</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  id="mystery-box-section-open-btn"
                  onClick={() => {
                    playPopSound();
                    onOpenMysteryModal();
                  }}
                  className="px-8 py-4 bg-[#FDE047] hover:bg-[#FACC15] text-[#4C1D95] font-extrabold text-sm rounded-full shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto lg:mx-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Mystery Unboxing Simulator &rarr;</span>
                </button>
              </div>
            </div>

            {/* Right Visual Teaser */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-72 h-72 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border-2 border-white/25 p-6 shadow-2xl animate-float">
                <DumplingGraphic type="blindbox" className="w-56 h-56" showSteamer={true} />
                <div className="absolute -bottom-2 bg-[#FDE047] text-[#4C1D95] text-xs font-black px-4 py-1.5 rounded-full shadow-md">
                  100% Sealed Surprise
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
