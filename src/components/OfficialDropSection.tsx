import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface OfficialDropSectionProps {
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
  onOpenMysteryModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const OfficialDropSection: React.FC<OfficialDropSectionProps> = ({
  onSelectCategory,
  activeCategory,
  onOpenMysteryModal,
  onNavigate,
}) => {
  const cards = [
    {
      id: 'mystery',
      title: 'Mystery Pulls',
      desc: 'Open one surprise steamer box.',
      target: 'mystery-pack',
      renderVisual: () => (
        <div className="w-full h-36 bg-[#FDF8EE] rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
          <svg viewBox="0 0 140 100" className="w-28 h-28">
            <ellipse cx="70" cy="65" rx="50" ry="20" fill="#C89B65" stroke="#734E24" strokeWidth="3" />
            <rect x="20" y="45" width="100" height="20" fill="#DEB887" stroke="#734E24" strokeWidth="3" />
            <ellipse cx="70" cy="45" rx="50" ry="18" fill="#F4D9B6" stroke="#734E24" strokeWidth="3" />
            {/* Sealed Tape Label */}
            <rect x="52" y="32" width="36" height="32" rx="4" fill="#FFDF40" stroke="#734E24" strokeWidth="2" />
            <text x="70" y="48" fontSize="6.5" fontWeight="bold" fill="#734E24" textAnchor="middle">SQUISHY</text>
            <text x="70" y="56" fontSize="5.5" fontWeight="bold" fill="#734E24" textAnchor="middle">DUMPLINGS</text>
          </svg>
        </div>
      ),
    },
    {
      id: 'glitter',
      title: 'Rare Glitter',
      desc: 'Chase the sparkle pull.',
      target: 'golden-ticket',
      renderVisual: () => (
        <div className="w-full h-36 bg-[#FFF9ED] rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
          <svg viewBox="0 0 140 100" className="w-32 h-28">
            <g transform="translate(10, 10)">
              {/* 3 Gold Steamer Rings */}
              <ellipse cx="30" cy="30" rx="22" ry="10" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
              <ellipse cx="70" cy="24" rx="22" ry="10" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
              {/* 3 Glitter Dumplings */}
              <circle cx="30" cy="55" r="14" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
              <circle cx="60" cy="58" r="15" fill="#FDE047" stroke="#A16207" strokeWidth="2" />
              <circle cx="90" cy="55" r="14" fill="#F472B6" stroke="#9D174D" strokeWidth="2" />
              {/* Faces */}
              <circle cx="27" cy="53" r="1.5" fill="#FFF" />
              <circle cx="33" cy="53" r="1.5" fill="#FFF" />
              <circle cx="56" cy="56" r="1.5" fill="#2D2A26" />
              <circle cx="64" cy="56" r="1.5" fill="#2D2A26" />
              <circle cx="87" cy="53" r="1.5" fill="#FFF" />
              <circle cx="93" cy="53" r="1.5" fill="#FFF" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      id: 'bundles',
      title: 'Bundles',
      desc: 'More boxes, bigger reveal.',
      target: 'bundles',
      renderVisual: () => (
        <div className="w-full h-36 bg-[#FBF7F0] rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
          <svg viewBox="0 0 140 100" className="w-32 h-28">
            <g transform="translate(20, 10)">
              {/* 6 Stacked Mini Steamers */}
              <ellipse cx="30" cy="30" rx="20" ry="9" fill="#DEB887" stroke="#734E24" strokeWidth="2" />
              <ellipse cx="70" cy="30" rx="20" ry="9" fill="#DEB887" stroke="#734E24" strokeWidth="2" />
              <ellipse cx="30" cy="50" rx="20" ry="9" fill="#DEB887" stroke="#734E24" strokeWidth="2" />
              <ellipse cx="70" cy="50" rx="20" ry="9" fill="#DEB887" stroke="#734E24" strokeWidth="2" />
              <ellipse cx="50" cy="70" rx="22" ry="10" fill="#DEB887" stroke="#734E24" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      id: 'worldcup',
      title: 'World Cup',
      desc: 'Pick your flag dumpling.',
      target: 'world-cup',
      renderVisual: () => (
        <div className="w-full h-36 bg-[#F0FDF4] rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
          <svg viewBox="0 0 140 100" className="w-32 h-28">
            <g transform="translate(15, 10)">
              {/* Box frame */}
              <rect x="15" y="10" width="80" height="75" rx="6" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
              {/* Flag Dumplings Inside */}
              <circle cx="35" cy="32" r="10" fill="#FFF" stroke="#DC2626" strokeWidth="2" />
              <circle cx="55" cy="32" r="10" fill="#EF4444" stroke="#1E3A8A" strokeWidth="2" />
              <circle cx="75" cy="32" r="10" fill="#EAB308" stroke="#15803D" strokeWidth="2" />
              <circle cx="35" cy="58" r="10" fill="#60A5FA" stroke="#FFF" strokeWidth="2" />
              <circle cx="55" cy="58" r="10" fill="#18181B" stroke="#DC2626" strokeWidth="2" />
              <circle cx="75" cy="58" r="10" fill="#22C55E" stroke="#EAB308" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
  ];

  const filterTabs = [
    { id: 'all', label: 'Shop all' },
    { id: 'mystery', label: 'Mystery' },
    { id: 'glitter', label: 'Glitter' },
    { id: 'bundles', label: 'Bundles' },
    { id: 'worldcup', label: 'World Cup' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Grid: Matches Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="lg:col-span-8">
            <span className="text-xs font-black tracking-widest text-[#EAB308] uppercase mb-2 block">
              THE OFFICIAL DROP
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#1F1C18] leading-[1.02] tracking-tight">
              Open the<br />
              tiny<br />
              steamer.<br />
              Chase the<br />
              squish.
            </h2>
          </div>

          {/* Yellow Squishy Dumpling Card on Right */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            <div className="bg-[#FFDF40] rounded-3xl p-6 sm:p-8 flex items-center justify-center border-2 border-[#734E24] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-1 border-2 border-[#734E24]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <ellipse cx="50" cy="72" rx="38" ry="14" fill="#C89B65" stroke="#734E24" strokeWidth="4" />
                    <rect x="12" y="60" width="76" height="14" fill="#DEB887" stroke="#734E24" strokeWidth="4" />
                    <path d="M 24 64 C 20 44, 34 26, 50 24 C 66 26, 80 44, 76 64 Z" fill="#FFFDF9" stroke="#734E24" strokeWidth="4" />
                    <circle cx="42" cy="46" r="3.5" fill="#2D2A26" />
                    <circle cx="58" cy="46" r="3.5" fill="#2D2A26" />
                  </svg>
                </div>
                <span className="font-display font-black text-2xl text-[#6B4219] leading-tight">
                  Squishy<br />Dumpling
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#524B43] font-medium leading-relaxed">
              Each Dumpling Squishy arrives packed for the reveal: a soft, slow-rising dumpling in a mini steamer-style box, with classic colors, bundle options, and rare glitter-style pulls for collectors.
            </p>
          </div>

        </div>

        {/* 4 Official Drop Category Cards Grid: Matches Screenshot 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                playPopSound();
                onNavigate(card.target);
              }}
              className="bg-white rounded-3xl p-5 border-2 border-[#E8DAC6] hover:border-[#1F1C18] transition-all hover:shadow-lg cursor-pointer group flex flex-col justify-between"
            >
              {card.renderVisual()}

              <div className="pt-4 flex items-end justify-between">
                <div>
                  <h3 className="font-display font-black text-lg text-[#1F1C18] group-hover:text-[#FF5C38] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#736B60] mt-0.5">
                    {card.desc}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Shop by drop." Bar: Matches Screenshot 2 */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#E8DAC6]">
          <h3 className="font-display font-black text-xl sm:text-2xl text-[#1F1C18]">
            Shop by drop.
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playPopSound();
                  onSelectCategory(tab.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#1F1C18] text-white shadow-xs'
                    : 'bg-white text-[#2D2A26] border border-[#D8C7B0] hover:bg-[#FAF7F2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
