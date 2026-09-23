import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { DUMPLING_PRODUCTS } from '../data/dumplings';
import { DumplingProduct } from '../types';
import { DumplingGraphic } from './DumplingGraphic';
import { playPopSound } from '../utils/sound';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: DumplingProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = DUMPLING_PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.aroma.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl border-4 border-[#C89B65] shadow-2xl overflow-hidden">
        
        {/* Search Input Header */}
        <div className="p-4 bg-white border-b border-[#E8DAC6] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C8276] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search flavor, aroma, slow-rise squishies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-semibold text-[#2D2A26] placeholder-[#A89E92] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B60] hover:text-black rounded-full hover:bg-[#FAF7F2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#FFF8EE] border-b border-[#F0E6D8] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#8C5E12] font-bold shrink-0">Popular:</span>
          {['Original Bao', 'Golden Custard', 'Matcha Mochi', 'Blind Box', 'Jumbo 15cm'].map((term) => (
            <button
              key={term}
              onClick={() => {
                playPopSound();
                setQuery(term);
              }}
              className="px-2.5 py-1 bg-white hover:bg-[#F2ECE1] text-[#2D2A26] rounded-full border border-[#E0D2BE] text-[11px] font-medium whitespace-nowrap cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[380px] overflow-y-auto p-4 space-y-2.5">
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  playPopSound();
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 bg-white hover:bg-[#FFF8EE] rounded-2xl border border-[#E8DAC6] hover:border-[#E25C40] transition-all flex items-center gap-3.5 cursor-pointer shadow-xs"
              >
                <div className="w-12 h-12 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] flex items-center justify-center shrink-0">
                  <DumplingGraphic type={product.svgArtType} className="w-10 h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-[#2D2A26] truncate">
                      {product.name}
                    </span>
                    <span className="text-xs font-black text-[#E25C40]">${product.price}</span>
                  </div>
                  <p className="text-[11px] text-[#736B60] truncate">{product.subtitle}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-xs text-[#8C8276]">
              No dumplings found matching "{query}"
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
