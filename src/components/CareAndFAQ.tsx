import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/dumplings';
import { playPopSound } from '../utils/sound';

export const CareAndFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    playPopSound();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact match 2-column layout from Screenshot 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-black tracking-widest text-[#EAB308] uppercase block">
              FAQ
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#1F1C18] tracking-tight leading-[1.05]">
              Quick answers<br />
              before the<br />
              first reveal.
            </h2>
            <p className="text-xs sm:text-sm text-[#524B43] font-medium leading-relaxed max-w-md pt-2">
              No fluff, just the details shoppers check before opening a tiny steamer box.
            </p>
          </div>

          {/* Right Column: Accordion with Golden Dumpling Dots */}
          <div className="lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF7F2] rounded-3xl border-2 border-[#E8DAC6] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Gold dumpling circle icon */}
                      <span className="w-6 h-6 rounded-full bg-[#FFDF40] border border-[#734E24] flex items-center justify-center text-[10px] shrink-0 shadow-xs">
                        🥟
                      </span>
                      <h3 className="font-display font-black text-base sm:text-lg text-[#1F1C18]">
                        {item.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-[#1F1C18] text-white rotate-180' : 'bg-white border border-[#D8C7B0] text-[#1F1C18]'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-7 sm:px-7 text-xs sm:text-sm text-[#524B43] leading-relaxed border-t border-[#E8DAC6]/60 pt-4 animate-fadeIn">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
