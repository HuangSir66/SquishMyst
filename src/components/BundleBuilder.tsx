import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Plus, Trash2, CheckCircle2, Gift, Award, Filter } from 'lucide-react';
import { DumplingProduct, ToyType } from '../types';
import { DUMPLING_PRODUCTS } from '../data/dumplings';
import { DumplingGraphic } from './DumplingGraphic';
import { playPopSound, playSquishSound, playCelebrationChime } from '../utils/sound';
import confetti from 'canvas-confetti';

interface BundleBuilderProps {
  onAddBundleToCart: (bundleItem: {
    title: string;
    dumplings: DumplingProduct[];
    tierName: string;
    totalPrice: number;
    originalPrice: number;
  }) => void;
}

export const BundleBuilder: React.FC<BundleBuilderProps> = ({ onAddBundleToCart }) => {
  const [bundleSize, setBundleSize] = useState<3 | 6>(3);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedDumplings, setSelectedDumplings] = useState<DumplingProduct[]>([
    DUMPLING_PRODUCTS[0],
    DUMPLING_PRODUCTS[1],
    DUMPLING_PRODUCTS[2],
  ]);

  const availableDumplings = DUMPLING_PRODUCTS.filter(
    (p) => !p.isChaseExclusive && p.salesMode !== 'chase_exclusive' && p.category !== 'accessories'
  );

  const displayedList = availableDumplings.filter((p) => {
    if (selectedCategoryFilter === 'all') return true;
    return p.toyType === selectedCategoryFilter;
  });

  const discountRate = bundleSize === 3 ? 0.15 : 0.25;

  const handleSelectSize = (size: 3 | 6) => {
    playPopSound();
    setBundleSize(size);
    if (size === 6 && selectedDumplings.length < 6) {
      const needed = 6 - selectedDumplings.length;
      const extras = availableDumplings.slice(0, needed);
      setSelectedDumplings((prev) => [...prev, ...extras]);
    } else if (size === 3 && selectedDumplings.length > 3) {
      setSelectedDumplings((prev) => prev.slice(0, 3));
    }
  };

  const handleAddDumpling = (dumpling: DumplingProduct) => {
    if (selectedDumplings.length < bundleSize) {
      playSquishSound(1.0);
      setSelectedDumplings((prev) => [...prev, dumpling]);
    }
  };

  const handleRemoveIndex = (index: number) => {
    playPopSound();
    setSelectedDumplings((prev) => prev.filter((_, i) => i !== index));
  };

  const rawTotal = selectedDumplings.reduce((acc, curr) => acc + curr.price, 0);
  const discountedTotal = Number((rawTotal * (1 - discountRate)).toFixed(2));
  const savings = Number((rawTotal - discountedTotal).toFixed(2));
  const isFull = selectedDumplings.length === bundleSize;

  const handleFinishBundle = () => {
    if (!isFull) return;
    playCelebrationChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.75 },
    });

    onAddBundleToCart({
      title: bundleSize === 3 ? 'Classic 3-Piece Squishy Studio Gift Bundle' : 'Deluxe 6-Piece Squishy Studio Grand Feast',
      dumplings: selectedDumplings,
      tierName: `${bundleSize}-Piece Bundle (${Math.round(discountRate * 100)}% OFF)`,
      totalPrice: discountedTotal,
      originalPrice: rawTotal,
    });
  };

  return (
    <section id="bundles" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DAC6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFF3D6] text-[#8C5E12] px-4 py-1.5 rounded-full border border-[#F5D890] text-xs font-extrabold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-[#E25C40]" />
            <span>Interactive Custom Gift Box Builder</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2D2A26] tracking-tight">
            Mix & Match Custom Squishy Bundle
          </h2>
          <p className="text-sm text-[#736B60] mt-2">
            Combine any animals, pastries, fruits, and dim sum dumplings into a custom gift presentation box and save up to <strong>25% OFF</strong>!
          </p>
        </div>

        {/* Steamer Size Selector Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#EAE2D5] rounded-3xl border border-[#D8C9B5] shadow-inner gap-2">
            <button
              onClick={() => handleSelectSize(3)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                bundleSize === 3
                  ? 'bg-white text-[#2D2A26] shadow-md scale-102 font-extrabold'
                  : 'text-[#61594E] hover:text-black'
              }`}
            >
              <span>3-Squishy Trio Box</span>
              <span className="text-[11px] bg-[#10B981] text-white px-2 py-0.5 rounded-full font-bold">
                Save 15%
              </span>
            </button>

            <button
              onClick={() => handleSelectSize(6)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                bundleSize === 6
                  ? 'bg-white text-[#2D2A26] shadow-md scale-102 font-extrabold'
                  : 'text-[#61594E] hover:text-black'
              }`}
            >
              <span>6-Squishy Grand Feast</span>
              <span className="text-[11px] bg-[#E25C40] text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                Save 25% + Free Gift
              </span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Steamer Basket Canvas */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E0D2BE] shadow-lg relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8]">
              <div>
                <h3 className="font-display font-bold text-lg text-[#2D2A26]">
                  {bundleSize === 3 ? 'Classic Collector Box (3 Slots)' : 'Grand Double-Tier Feast (6 Slots)'}
                </h3>
                <p className="text-xs text-[#8C8276]">
                  {selectedDumplings.length} of {bundleSize} spots filled
                </p>
              </div>
              <span className="text-xs font-bold text-[#E25C40] bg-[#FFEDE8] px-3 py-1 rounded-full">
                🎋 Display Steamer & Tray Included
              </span>
            </div>

            {/* Steamer Visual Container */}
            <div className="my-6 relative p-6 bg-[#FBF8F3] rounded-3xl border-4 border-[#C89B65] shadow-inner">
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 bg-[radial-gradient(#C89B65_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="grid grid-cols-3 gap-3 relative z-10 min-h-[220px]">
                {[...Array(bundleSize)].map((_, idx) => {
                  const dumpling = selectedDumplings[idx];
                  return (
                    <div
                      key={idx}
                      className={`relative aspect-square rounded-2xl border-2 transition-all flex flex-col items-center justify-center p-2 text-center ${
                        dumpling
                          ? 'bg-white border-[#E25C40]/40 shadow-sm'
                          : 'bg-white/40 border-dashed border-[#D8C7B0]'
                      }`}
                    >
                      {dumpling ? (
                        <>
                          <button
                            onClick={() => handleRemoveIndex(idx)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-[#E25C40] hover:bg-black text-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer z-20"
                            title="Remove item"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <DumplingGraphic type={dumpling.svgArtType} className="w-16 h-16" />
                          <span className="text-[11px] font-bold text-[#2D2A26] truncate w-full mt-1">
                            {dumpling.name.split(' ')[0]} {dumpling.name.split(' ')[1]}
                          </span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-[#A89E92]">
                          <Plus className="w-6 h-6 mb-1 opacity-50" />
                          <span className="text-[10px] font-semibold">Slot {idx + 1}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {bundleSize === 6 && (
                <div className="mt-4 pt-3 border-t border-[#EAE2D5] flex items-center justify-center gap-2 text-xs font-bold text-[#10B981]">
                  <Award className="w-4 h-4" />
                  <span>Includes FREE Velvet Revival Care Dusting Kit ($15 value)!</span>
                </div>
              )}
            </div>

            {/* Price Summary Bar & Add CTA */}
            <div className="pt-4 border-t border-[#F0E6D8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-3xl text-[#2D2A26]">
                    ${discountedTotal}
                  </span>
                  <span className="text-sm text-[#8C8276] line-through font-bold">
                    ${rawTotal.toFixed(2)}
                  </span>
                  <span className="text-xs bg-[#10B981] text-white px-2 py-0.5 rounded-full font-bold">
                    Save ${savings}
                  </span>
                </div>
                <p className="text-xs text-[#8C8276] mt-0.5">
                  Free Tracked Shipping automatically applied!
                </p>
              </div>

              <button
                onClick={handleFinishBundle}
                disabled={!isFull}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-black text-sm transition-all flex items-center justify-center gap-2 ${
                  isFull
                    ? 'bg-[#E25C40] hover:bg-[#C94A30] text-white shadow-lg hover:scale-105 cursor-pointer'
                    : 'bg-[#E5D8C5] text-[#8C8276] cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isFull ? 'Add Custom Bundle to Cart' : `Add ${bundleSize - selectedDumplings.length} more`}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Specimen Selection Grid */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E0D2BE] shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F0E6D8]">
              <div>
                <h3 className="font-display font-bold text-lg text-[#2D2A26]">
                  Available Squishy Specimens
                </h3>
                <p className="text-xs text-[#8C8276]">
                  Tap to add to your custom bundle box
                </p>
              </div>

              {/* Category Filter Pills in builder */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'animal', label: '🐾 Animals' },
                  { id: 'bakery', label: '🥐 Bakery' },
                  { id: 'fruit', label: '🍑 Fruits' },
                  { id: 'dumpling', label: '🥟 Dim Sum' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      playPopSound();
                      setSelectedCategoryFilter(c.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCategoryFilter === c.id
                        ? 'bg-[#1F1C18] text-white'
                        : 'bg-[#FAF7F2] text-[#524B43] hover:bg-[#EAE2D5]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Choices */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 max-h-[380px] overflow-y-auto pr-1">
              {displayedList.map((d) => {
                const countInBundle = selectedDumplings.filter((item) => item.id === d.id).length;
                const canAdd = selectedDumplings.length < bundleSize;

                return (
                  <button
                    key={d.id}
                    onClick={() => handleAddDumpling(d)}
                    disabled={!canAdd}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center relative group cursor-pointer ${
                      canAdd
                        ? 'bg-[#FAF7F2] hover:bg-white hover:border-[#E25C40] hover:shadow-md'
                        : 'bg-[#FAF7F2] opacity-60 cursor-not-allowed border-[#EAE2D5]'
                    }`}
                  >
                    {countInBundle > 0 && (
                      <span className="absolute top-2 right-2 w-5 h-5 bg-[#E25C40] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                        {countInBundle}
                      </span>
                    )}

                    <DumplingGraphic type={d.svgArtType} className="w-16 h-16 group-hover:scale-105 transition-transform" />
                    
                    <span className="font-bold text-xs text-[#2D2A26] mt-2 line-clamp-1 w-full">
                      {d.name}
                    </span>
                    <span className="text-[10px] text-[#736B60] mt-0.5">
                      ${d.price.toFixed(2)}
                    </span>
                    
                    <span className="mt-2 w-full py-1 bg-white group-hover:bg-[#E25C40] group-hover:text-white border border-[#E0D2BE] rounded-lg text-[10px] font-bold text-[#2D2A26] transition-colors flex items-center justify-center gap-1">
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
