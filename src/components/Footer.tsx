import React from 'react';
import { Heart, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTracking: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTracking, onOpenContact }) => {
  return (
    <footer className="bg-white border-t border-[#E8DAC6] pt-16 pb-12 text-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#E8DAC6]">
          
          {/* Col 1: Explore */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#1F1C18] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#524B43]">
              <li>
                <button onClick={() => onNavigate('mystery-pack')} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  Mystery Dumpling Drop
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('world-cup')} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  World Cup Flag Series
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('golden-ticket')} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  Golden Ticket 24K Chase
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bundles')} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  Steamer Pack Bundles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('squish-lab')} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  Interactive ASMR Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Dumpling Squishy Official */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#1F1C18] mb-4">
              Dumpling Squishy Official
            </h4>
            <ul className="space-y-2.5 text-xs text-[#524B43]">
              <li>
                <span className="hover:text-[#FF5C38] cursor-pointer" onClick={() => onNavigate('official-drop')}>
                  The Official Drop
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF5C38] cursor-pointer" onClick={() => onNavigate('faq')}>
                  30-Day Squish Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF5C38] cursor-pointer" onClick={() => onNavigate('faq')}>
                  Sensory TPR Formula
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF5C38] cursor-pointer" onClick={() => onNavigate('video-reels')}>
                  Shopper Reveal Clips
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#1F1C18] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#524B43]">
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  FAQ & Care Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#FF5C38] transition-colors cursor-pointer">
                  Free Shipping Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Policies */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#1F1C18] mb-4">
              Store Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-[#524B43]">
              <li><span className="hover:text-[#FF5C38] cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-[#FF5C38] cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-[#FF5C38] cursor-pointer">Refund Policy</span></li>
              <li><span className="hover:text-[#FF5C38] cursor-pointer">Authenticity Promise</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Payment Icons and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-[11px] text-[#736B60] font-bold">
            © 2026, Squishy Dumpling | Sensory Toys. All rights reserved.
          </p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2 text-xs font-bold text-[#736B60]">
            <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DAC6] rounded-md">Apple Pay</span>
            <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DAC6] rounded-md">Google Pay</span>
            <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DAC6] rounded-md">Visa</span>
            <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DAC6] rounded-md">Mastercard</span>
            <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DAC6] rounded-md">Discover</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
