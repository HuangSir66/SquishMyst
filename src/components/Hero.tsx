import React, { useState } from 'react';
import { Sparkles, Play, ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';
import { playSquishSound, playPopSound, playCelebrationChime } from '../utils/sound';

interface HeroProps {
  onShopDrop: () => void;
  onWatchBuzz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopDrop, onWatchBuzz }) => {
  const [activeSquish, setActiveSquish] = useState<number | null>(null);

  const dumplings = [
    { id: 1, name: 'Blush Pink', color: '#FFB8D2', eyes: 'happy', pos: 'left-4 sm:left-12 bottom-12' },
    { id: 2, name: 'Obsidian Black', color: '#3A3837', eyes: 'cute', pos: 'right-16 sm:right-32 top-8' },
    { id: 3, name: 'Original White', color: '#FFFDF9', eyes: 'center', pos: 'center' },
    { id: 4, name: 'Sweet Taro Purple', color: '#D4B8F5', eyes: 'sleepy', pos: 'right-2 sm:right-10 bottom-16' },
    { id: 5, name: 'Crimson Red', color: '#EF4444', eyes: 'happy', pos: 'right-28 sm:right-48 bottom-4' },
    { id: 6, name: 'Ocean Cyan', color: '#38BDF8', eyes: 'wink', pos: 'left-16 sm:left-32 bottom-2' },
    { id: 7, name: 'Sun Yellow', color: '#FACC15', eyes: 'happy', pos: 'left-1/3 bottom-1' },
    { id: 8, name: 'Matcha Green', color: '#86EFAC', eyes: 'cute', pos: 'right-1/3 bottom-1' },
    { id: 9, name: 'Rare Sparkle Glitter', color: 'url(#glitterGradient)', eyes: 'star', pos: 'right-8 bottom-0' },
  ];

  const handleSquish = (id: number) => {
    setActiveSquish(id);
    playSquishSound(1.2);
    setTimeout(() => {
      setActiveSquish(null);
      playPopSound();
    }, 450);
  };

  return (
    <section id="hero" className="relative w-full bg-[#FAF7F2] overflow-hidden">
      
      {/* Visual Stage Container: Real Dim Sum Steamer Photo Backdrop Simulation */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F5E6D3] via-[#FAF0E6] to-[#FAF7F2]">
        
        {/* Ambient Steam & Sakura Blossom Effects */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-white/60 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-[#FFD1DC]/40 rounded-full filter blur-3xl" />
        </div>

        {/* Bamboo Steamers & Multicolored Squishies Visual Grid (Matching Screenshot 1) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto">
          <svg viewBox="0 0 1200 650" className="w-full h-full object-cover select-none">
            <defs>
              <linearGradient id="steamerWood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DEB887" />
                <stop offset="50%" stopColor="#C89B65" />
                <stop offset="100%" stopColor="#A87948" />
              </linearGradient>
              <linearGradient id="woodLid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E6C294" />
                <stop offset="100%" stopColor="#BA8A54" />
              </linearGradient>
              <linearGradient id="glitterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFC4D8" />
                <stop offset="30%" stopColor="#FFE27A" />
                <stop offset="60%" stopColor="#A7F3D0" />
                <stop offset="100%" stopColor="#C4B5FD" />
              </linearGradient>
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Background Steamers Layer */}
            {/* Steamer Left open with lid */}
            <g transform="translate(80, 220)" className="cursor-pointer hover:scale-102 transition-transform" onClick={() => handleSquish(1)}>
              {/* Leaning Lid */}
              <ellipse cx="60" cy="18" rx="80" ry="40" fill="url(#woodLid)" stroke="#8C5E2D" strokeWidth="4" transform="rotate(-25 60 18)" />
              <ellipse cx="60" cy="18" rx="72" ry="34" fill="none" stroke="#BA8A54" strokeWidth="2" strokeDasharray="6 4" transform="rotate(-25 60 18)" />
              {/* Basket */}
              <ellipse cx="160" cy="160" rx="95" ry="38" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="5" />
              <rect x="65" y="120" width="190" height="42" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="4" />
              <ellipse cx="160" cy="120" rx="95" ry="36" fill="#D2A679" stroke="#8C5E2D" strokeWidth="4" />
              {/* Pink Bao */}
              <g transform={activeSquish === 1 ? 'scale(1.2, 0.75) translate(-25, 40)' : ''} className="transition-transform duration-300">
                <path d="M 115 130 C 105 75, 140 45, 160 40 C 180 45, 215 75, 205 130 C 190 142, 130 142, 115 130 Z" fill="#FFAEC9" stroke="#5C381E" strokeWidth="4" filter="url(#softShadow)" />
                {/* Pleat Top */}
                <path d="M 152 40 C 158 32, 162 32, 168 40" fill="none" stroke="#5C381E" strokeWidth="3" strokeLinecap="round" />
                {/* Face */}
                <circle cx="148" cy="98" r="4.5" fill="#2D2A26" />
                <circle cx="172" cy="98" r="4.5" fill="#2D2A26" />
                <circle cx="149" cy="96" r="1.5" fill="#FFF" />
                <circle cx="173" cy="96" r="1.5" fill="#FFF" />
                <ellipse cx="142" cy="106" rx="5" ry="3" fill="#FF7096" opacity="0.8" />
                <ellipse cx="178" cy="106" rx="5" ry="3" fill="#FF7096" opacity="0.8" />
                <path d="M 155 106 Q 160 112 165 106" fill="none" stroke="#5C381E" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>

            {/* Steamer Center - White Master Bao */}
            <g transform="translate(460, 140)" className="cursor-pointer hover:scale-102 transition-transform" onClick={() => handleSquish(3)}>
              <ellipse cx="140" cy="200" rx="120" ry="46" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="6" />
              <rect x="20" y="150" width="240" height="52" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="5" />
              <ellipse cx="140" cy="150" rx="120" ry="44" fill="#D2A679" stroke="#8C5E2D" strokeWidth="5" />
              {/* White Bao */}
              <g transform={activeSquish === 3 ? 'scale(1.25, 0.7) translate(-28, 55)' : ''} className="transition-transform duration-300">
                <path d="M 80 155 C 70 85, 115 45, 140 38 C 165 45, 210 85, 200 155 C 180 170, 100 170, 80 155 Z" fill="#FFFDF9" stroke="#5C381E" strokeWidth="5" filter="url(#softShadow)" />
                <path d="M 130 38 C 138 28, 142 28, 150 38" fill="none" stroke="#5C381E" strokeWidth="4" strokeLinecap="round" />
                <circle cx="125" cy="115" r="5.5" fill="#2D2A26" />
                <circle cx="155" cy="115" r="5.5" fill="#2D2A26" />
                <circle cx="126" cy="112.5" r="2" fill="#FFF" />
                <circle cx="156" cy="112.5" r="2" fill="#FFF" />
                <ellipse cx="116" cy="125" rx="6.5" ry="4" fill="#FFAEC9" opacity="0.8" />
                <ellipse cx="164" cy="125" rx="6.5" ry="4" fill="#FFAEC9" opacity="0.8" />
                <path d="M 134 125 Q 140 132 146 125" fill="none" stroke="#5C381E" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            </g>

            {/* Steamer Right Upper - Black Obsidian Bao */}
            <g transform="translate(760, 110)" className="cursor-pointer hover:scale-102 transition-transform" onClick={() => handleSquish(2)}>
              <ellipse cx="130" cy="170" rx="100" ry="40" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="5" />
              <rect x="30" y="125" width="200" height="46" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="4" />
              <ellipse cx="130" cy="125" rx="100" ry="38" fill="#D2A679" stroke="#8C5E2D" strokeWidth="4" />
              {/* Obsidian Black Bao */}
              <g transform={activeSquish === 2 ? 'scale(1.2, 0.75) translate(-22, 38)' : ''} className="transition-transform duration-300">
                <path d="M 80 135 C 70 80, 110 50, 130 45 C 150 50, 190 80, 180 135 C 165 146, 95 146, 80 135 Z" fill="#3D3A38" stroke="#1F1D1C" strokeWidth="4" filter="url(#softShadow)" />
                <path d="M 122 45 C 128 36, 132 36, 138 45" fill="none" stroke="#1F1D1C" strokeWidth="3" strokeLinecap="round" />
                <circle cx="118" cy="102" r="4.5" fill="#FFF" />
                <circle cx="142" cy="102" r="4.5" fill="#FFF" />
                <circle cx="119" cy="101" r="1.5" fill="#2D2A26" />
                <circle cx="143" cy="101" r="1.5" fill="#2D2A26" />
                <ellipse cx="110" cy="110" rx="5" ry="3" fill="#FF7096" opacity="0.8" />
                <ellipse cx="150" cy="110" rx="5" ry="3" fill="#FF7096" opacity="0.8" />
                <path d="M 126 110 Q 130 116 134 110" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </g>

            {/* Steamer Foreground Cluster: Purple, Red, Cyan, Yellow, Green, Sparkle Glitter */}
            {/* Purple Taro Bao */}
            <g transform="translate(630, 310)" className="cursor-pointer hover:scale-105 transition-transform" onClick={() => handleSquish(4)}>
              <ellipse cx="80" cy="120" rx="75" ry="30" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="4" />
              <rect x="5" y="85" width="150" height="36" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="3" />
              <ellipse cx="80" cy="85" rx="75" ry="28" fill="#D2A679" stroke="#8C5E2D" strokeWidth="3" />
              <path d="M 45 92 C 38 52, 65 30, 80 25 C 95 30, 122 52, 115 92 C 105 100, 55 100, 45 92 Z" fill="#D6BAF7" stroke="#5C381E" strokeWidth="3.5" filter="url(#softShadow)" />
              <circle cx="70" cy="68" r="3.5" fill="#2D2A26" />
              <circle cx="90" cy="68" r="3.5" fill="#2D2A26" />
              <ellipse cx="64" cy="74" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <ellipse cx="96" cy="74" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <path d="M 76 74 Q 80 78 84 74" fill="none" stroke="#5C381E" strokeWidth="2" />
            </g>

            {/* Crimson Red Bao */}
            <g transform="translate(840, 260)" className="cursor-pointer hover:scale-105 transition-transform" onClick={() => handleSquish(5)}>
              <ellipse cx="80" cy="120" rx="75" ry="30" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="4" />
              <rect x="5" y="85" width="150" height="36" fill="url(#steamerWood)" stroke="#8C5E2D" strokeWidth="3" />
              <ellipse cx="80" cy="85" rx="75" ry="28" fill="#D2A679" stroke="#8C5E2D" strokeWidth="3" />
              <path d="M 45 92 C 38 52, 65 30, 80 25 C 95 30, 122 52, 115 92 C 105 100, 55 100, 45 92 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3.5" filter="url(#softShadow)" />
              <circle cx="70" cy="68" r="3.5" fill="#2D2A26" />
              <circle cx="90" cy="68" r="3.5" fill="#2D2A26" />
              <ellipse cx="64" cy="74" rx="4" ry="2.5" fill="#FEF08A" opacity="0.9" />
              <ellipse cx="96" cy="74" rx="4" ry="2.5" fill="#FEF08A" opacity="0.9" />
              <path d="M 76 74 Q 80 78 84 74" fill="none" stroke="#2D2A26" strokeWidth="2" />
            </g>

            {/* Sparkle Glitter Bao */}
            <g transform="translate(930, 370)" className="cursor-pointer hover:scale-105 transition-transform" onClick={() => handleSquish(9)}>
              <path d="M 40 85 C 32 45, 62 25, 78 20 C 94 25, 124 45, 116 85 C 106 95, 50 95, 40 85 Z" fill="url(#glitterGradient)" stroke="#8B5CF6" strokeWidth="3.5" filter="url(#softShadow)" />
              <circle cx="68" cy="62" r="3.5" fill="#2D2A26" />
              <circle cx="88" cy="62" r="3.5" fill="#2D2A26" />
              <ellipse cx="62" cy="68" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <ellipse cx="94" cy="68" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <path d="M 74 68 Q 78 72 82 68" fill="none" stroke="#2D2A26" strokeWidth="2" />
            </g>

            {/* Cyan Ocean Bao */}
            <g transform="translate(280, 390)" className="cursor-pointer hover:scale-105 transition-transform" onClick={() => handleSquish(6)}>
              <path d="M 40 85 C 32 45, 62 25, 78 20 C 94 25, 124 45, 116 85 C 106 95, 50 95, 40 85 Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="3.5" filter="url(#softShadow)" />
              <circle cx="68" cy="62" r="3.5" fill="#2D2A26" />
              <circle cx="88" cy="62" r="3.5" fill="#2D2A26" />
              <ellipse cx="62" cy="68" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <ellipse cx="94" cy="68" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <path d="M 74 68 Q 78 72 82 68" fill="none" stroke="#2D2A26" strokeWidth="2" />
            </g>

            {/* Matcha Green Bao */}
            <g transform="translate(710, 420)" className="cursor-pointer hover:scale-105 transition-transform" onClick={() => handleSquish(8)}>
              <path d="M 40 85 C 32 45, 62 25, 78 20 C 94 25, 124 45, 116 85 C 106 95, 50 95, 40 85 Z" fill="#86EFAC" stroke="#15803D" strokeWidth="3.5" filter="url(#softShadow)" />
              <circle cx="68" cy="62" r="3.5" fill="#2D2A26" />
              <circle cx="88" cy="62" r="3.5" fill="#2D2A26" />
              <ellipse cx="62" cy="68" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <ellipse cx="94" cy="68" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <path d="M 74 68 Q 78 72 82 68" fill="none" stroke="#2D2A26" strokeWidth="2" />
            </g>

            {/* Golden Honey Bao */}
            <g transform="translate(480, 440)" className="cursor-pointer hover:scale-105 transition-transform" onClick={() => handleSquish(7)}>
              <path d="M 40 85 C 32 45, 62 25, 78 20 C 94 25, 124 45, 116 85 C 106 95, 50 95, 40 85 Z" fill="#FDE047" stroke="#A16207" strokeWidth="3.5" filter="url(#softShadow)" />
              <circle cx="68" cy="62" r="3.5" fill="#2D2A26" />
              <circle cx="88" cy="62" r="3.5" fill="#2D2A26" />
              <ellipse cx="62" cy="68" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <ellipse cx="94" cy="68" rx="4" ry="2.5" fill="#FF7096" opacity="0.8" />
              <path d="M 74 68 Q 78 72 82 68" fill="none" stroke="#2D2A26" strokeWidth="2" />
            </g>

          </svg>
        </div>

        {/* Foreground Massive High-Impact Bold Typography Overlay: Exact match to Screenshot 1 */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-8 pb-16 pointer-events-none">
          
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight uppercase leading-[0.88] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            MYSTERY<br />
            DUMPLING.<br />
            SQUISHY
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg font-bold text-white max-w-2xl mx-auto leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            The viral mini steamer-box squishy made for color reveals, desk squeezes, gifting, and rare-pull collector energy.
          </p>

          {/* CTA Buttons: Exact match to Screenshot 1 */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
            
            {/* Yellow Shop the drop button */}
            <button
              id="hero-shop-drop-btn"
              onClick={() => {
                playPopSound();
                onShopDrop();
              }}
              className="px-8 py-3.5 sm:py-4 bg-[#FFDF40] hover:bg-[#FACC15] text-[#2D2A26] font-black text-sm sm:text-base rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer border border-[#734E24]/20"
            >
              Shop the drop
            </button>

            {/* White Watch the buzz button */}
            <button
              id="hero-watch-buzz-btn"
              onClick={() => {
                playPopSound();
                onWatchBuzz();
              }}
              className="px-8 py-3.5 sm:py-4 bg-white/95 hover:bg-white text-[#2D2A26] font-black text-sm sm:text-base rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer border-2 border-[#2D2A26]/80 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch the buzz</span>
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};
