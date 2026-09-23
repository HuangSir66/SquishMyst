import React, { useState } from 'react';
import { ShoppingBag, Search, User, ChevronDown, Sparkles, Truck, Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';
import { isSoundMuted, toggleSoundMute, playPopSound } from '../utils/sound';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenTracking: () => void;
  onOpenContact: () => void;
  onOpenMysteryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onNavigate,
  activeSection,
  onOpenTracking,
  onOpenContact,
  onOpenMysteryModal,
}) => {
  const [muted, setMuted] = useState(isSoundMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rangeDropdownOpen, setRangeDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState('Australia | USD $');

  const handleToggleSound = () => {
    const next = toggleSoundMute();
    setMuted(next);
  };

  const handleNavClick = (sectionId: string) => {
    playPopSound();
    onNavigate(sectionId);
    setMobileMenuOpen(false);
    setRangeDropdownOpen(false);
  };

  const currencies = [
    'Australia | USD $',
    'United States | USD $',
    'Canada | CAD $',
    'United Kingdom | GBP £',
    'European Union | EUR €',
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8DAC6] shadow-xs">
      
      {/* Top Banner: Exact match to Screenshot 1 */}
      <div className="bg-gradient-to-r from-[#FF5C38] via-[#FF6A3D] to-[#FF8A3D] text-white text-xs font-black py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-opacity"
        onClick={() => handleNavClick('mystery-pack')}
      >
        <span>LIMITED DUMPLING SQUISHY DROP | FREE US SHIPPING OVER $50</span>
        <ArrowRight className="w-3.5 h-3.5 inline" />
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand: Exact match with Mascot + "Squishy Dumpling" rounded wordmark */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            {/* Mascot in bamboo steamer badge */}
            <div className="w-12 h-12 bg-[#FFDF40] rounded-2xl flex items-center justify-center p-1 border-2 border-[#734E24] shadow-xs group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Steamer basket */}
                <ellipse cx="50" cy="72" rx="38" ry="14" fill="#C89B65" stroke="#734E24" strokeWidth="4" />
                <rect x="12" y="60" width="76" height="14" fill="#DEB887" stroke="#734E24" strokeWidth="4" />
                {/* Dumpling bun */}
                <path
                  d="M 24 64 C 20 44, 34 26, 50 24 C 66 26, 80 44, 76 64 C 70 70, 30 70, 24 64 Z"
                  fill="#FFFDF9"
                  stroke="#734E24"
                  strokeWidth="4"
                />
                {/* Pleats top swirl */}
                <path d="M 46 24 C 48 18, 52 18, 54 24" fill="none" stroke="#734E24" strokeWidth="3" strokeLinecap="round" />
                {/* Eyes */}
                <circle cx="42" cy="46" r="3.5" fill="#2D2A26" />
                <circle cx="58" cy="46" r="3.5" fill="#2D2A26" />
                <circle cx="43" cy="44.5" r="1.2" fill="#FFF" />
                <circle cx="59" cy="44.5" r="1.2" fill="#FFF" />
                {/* Blush */}
                <ellipse cx="37" cy="52" rx="4" ry="2.5" fill="#FF9EAA" opacity="0.8" />
                <ellipse cx="63" cy="52" rx="4" ry="2.5" fill="#FF9EAA" opacity="0.8" />
                {/* Smile */}
                <path d="M 47 52 Q 50 56 53 52" fill="none" stroke="#734E24" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#6B4219] tracking-tight leading-none">
                Squishy<br />
                <span className="text-[#8B5625] text-xl sm:text-2xl">Dumpling</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-[#2D2A26]">
            
            {/* Our Range with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRangeDropdownOpen(!rangeDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#FF5C38] transition-colors py-2 cursor-pointer"
              >
                <span>Our Range</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${rangeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {rangeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl border-2 border-[#E8DAC6] shadow-xl py-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => handleNavClick('mystery-pack')}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-[#FFF8EE] text-[#2D2A26] hover:text-[#FF5C38] transition-colors flex items-center justify-between"
                  >
                    <span>Mystery Dumpling Squishy</span>
                    <span className="text-[10px] bg-[#FFE27A] text-[#734E24] px-1.5 py-0.5 rounded font-black">DROP</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('world-cup')}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-[#FFF8EE] text-[#2D2A26] hover:text-[#FF5C38] transition-colors flex items-center justify-between"
                  >
                    <span>World Cup Flag Series</span>
                    <span className="text-[10px] bg-[#DBEAFE] text-[#1E40AF] px-1.5 py-0.5 rounded font-black">FLAGS</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('golden-ticket')}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-[#FFF8EE] text-[#2D2A26] hover:text-[#FF5C38] transition-colors flex items-center justify-between"
                  >
                    <span>Golden Ticket 24K Chase</span>
                    <span className="text-[10px] bg-[#FEF08A] text-[#854D0E] px-1.5 py-0.5 rounded font-black">1 of 1</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('bundles')}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-[#FFF8EE] text-[#2D2A26] hover:text-[#FF5C38] transition-colors"
                  >
                    Steamer Pack Bundles
                  </button>
                  <button
                    onClick={() => handleNavClick('squish-lab')}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-[#FFF8EE] text-[#2D2A26] hover:text-[#FF5C38] transition-colors"
                  >
                    Interactive ASMR Squeeze Lab
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('faq')}
              className="hover:text-[#FF5C38] transition-colors cursor-pointer"
            >
              FAQ
            </button>

            <button
              onClick={() => {
                playPopSound();
                onOpenTracking();
              }}
              className="hover:text-[#FF5C38] transition-colors cursor-pointer"
            >
              Tracking
            </button>

            <button
              onClick={() => {
                playPopSound();
                onOpenContact();
              }}
              className="hover:text-[#FF5C38] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Icons & Currency Selector */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Currency Selector (Exact match to Australia | USD $ ∨ in Screenshot 1) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#4A443D] hover:text-black py-1.5 px-3 rounded-full border border-[#E0D2BE] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl border border-[#E8DAC6] shadow-lg py-1.5 z-50 text-xs font-semibold">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#FFF8EE] text-[#2D2A26]"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 text-[#736B60] hover:text-black rounded-full hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              title={muted ? 'Unmute ASMR Sound Effects' : 'Mute ASMR Sound Effects'}
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#FF5C38]" />}
            </button>

            {/* Search Icon */}
            <button
              id="header-search-btn"
              onClick={() => {
                playPopSound();
                onOpenSearch();
              }}
              className="p-2 text-[#2D2A26] hover:text-[#FF5C38] rounded-full hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="Search dumplings"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Profile / Tracking Quick Icon */}
            <button
              onClick={() => {
                playPopSound();
                onOpenTracking();
              }}
              className="p-2 text-[#2D2A26] hover:text-[#FF5C38] rounded-full hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="User account or tracking"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button with Counter */}
            <button
              id="header-cart-btn"
              onClick={() => {
                playPopSound();
                onOpenCart();
              }}
              className="relative p-2 text-[#2D2A26] hover:text-[#FF5C38] rounded-full hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF5C38] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scaleUp">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2D2A26] hover:text-black rounded-full hover:bg-[#FAF7F2] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8DAC6] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick('mystery-pack')}
            className="block w-full text-left font-bold text-sm py-2 text-[#2D2A26] hover:text-[#FF5C38]"
          >
            Our Range (Mystery Squishy Drop)
          </button>
          <button
            onClick={() => handleNavClick('world-cup')}
            className="block w-full text-left font-bold text-sm py-2 text-[#2D2A26] hover:text-[#FF5C38]"
          >
            World Cup Flag Series
          </button>
          <button
            onClick={() => handleNavClick('golden-ticket')}
            className="block w-full text-left font-bold text-sm py-2 text-[#2D2A26] hover:text-[#FF5C38]"
          >
            Golden Ticket 24K Chase
          </button>
          <button
            onClick={() => handleNavClick('video-reels')}
            className="block w-full text-left font-bold text-sm py-2 text-[#2D2A26] hover:text-[#FF5C38]"
          >
            Real Reveal Videos
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="block w-full text-left font-bold text-sm py-2 text-[#2D2A26] hover:text-[#FF5C38]"
          >
            FAQ
          </button>
          <button
            onClick={() => {
              playPopSound();
              onOpenTracking();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left font-bold text-sm py-2 text-[#2D2A26] hover:text-[#FF5C38]"
          >
            Tracking
          </button>
          <button
            onClick={() => {
              playPopSound();
              onOpenContact();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left font-bold text-sm py-2 text-[#2D2A26] hover:text-[#FF5C38]"
          >
            Contact Us
          </button>
        </div>
      )}

    </header>
  );
};
