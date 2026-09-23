import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Plus, Trash2, CheckCircle2, Gift, Award } from 'lucide-react';
import { DumplingProduct } from '../types';
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
  const [selectedDumplings, setSelectedDumplings] = useState<DumplingProduct[]>([
    DUMPLING_PRODUCTS[0],
    DUMPLING_PRODUCTS[1],
    DUMPLING_PRODUCTS[2],
  ]);

  const availableDumplings = DUMPLING_PRODUCTS.filter(
    (p) => !p.isChaseExclusive && p.salesMode !== 'chase_exclusive' && p.category !== 'accessories'
  );

  const discountRate = bundleSize === 3 ? 0.15 : 0.25;

  const handleSelectSize = (size: 3 | 6) => {
    playPopSound();
    setBundleSize(size);
    if (size === 6 && selectedDumplings.length < 6) {
      // Fill up remaining slots with popular dumplings
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
      title: bundleSize === 3 ? 'Classic 3-Bao Dim Sum Steamer Bundle' : 'Imperial 6-Bao Double-Tier Feast Bundle',
      dumplings: selectedDumplings,
      tierName: `${bundleSize}-Bao Steamer (${Math.round(discountRate * 100)}% OFF)`,
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
            <span>Interactive Custom Steamer Builder</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2D2A26] tracking-tight">
            Build Your Own Dim Sum Steamer
          </h2>
          <p className="text-sm text-[#736B60] mt-2">
            Pick your favorite flavors, pack them into a custom bamboo steamer, and unlock up to <strong>25% OFF</strong> instantly!
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
              <span>3-Bao Trio Steamer</span>
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
              <span>6-Bao Double-Tier Feast</span>
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
                  {bundleSize === 3 ? 'Classic Bamboo Steamer (3 Slots)' : 'Double-Tier Grand Steamer (6 Slots)'}
                </h3>
                <p className="text-xs text-[#8C8276]">
                  {selectedDumplings.length} of {bundleSize} spots filled
                </p>
              </div>
              <span className="text-xs font-bold text-[#E25C40] bg-[#FFEDE8] px-3 py-1 rounded-full">
                🎋 Bamboo Steamer Included Free
              </span>
            </div>

            {/* Steamer Visual Container */}
            <div className="my-6 relative p-6 bg-[#FBF8F3] rounded-3xl border-4 border-[#C89B65] shadow-inner">
              {/* Steamer bamboo texture rings */}
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
                            title="Remove from steamer"
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
                  <span>Includes FREE Spicy Chili Oil Dipping Squishy Toy ($12 value)!</span>
                </div>
              )}
            </div>

            {/* Price Summary & Checkout Button */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DAC6] space-y-3">
              <div className="flex justify-between text-xs text-[#736B60]">
                <span>Original Individual Price:</span>
                <span className="line-through">${rawTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#10B981] font-bold">
                <span>Bundle Savings ({Math.round(discountRate * 100)}% OFF):</span>
                <span>-${savings.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#E0D2BE] flex justify-between items-baseline">
                <span className="font-display font-extrabold text-base text-[#2D2A26]">Bundle Price:</span>
                <span className="font-display font-extrabold text-2xl text-[#E25C40]">
                  ${discountedTotal.toFixed(2)}
                </span>
              </div>

              <button
                id="bundle-add-to-cart-btn"
                disabled={!isFull}
                onClick={handleFinishBundle}
                className={`w-full py-4 rounded-2xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isFull
                    ? 'bg-[#E25C40] hover:bg-[#CF492D] text-white hover:scale-102'
                    : 'bg-[#D5C7B4] text-[#7A7165] cursor-not-allowed opacity-75'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isFull
                    ? `Add ${bundleSize}-Bao Bundle to Steamer ($${discountedTotal})`
                    : `Pick ${bundleSize - selectedDumplings.length} more dumpling(s)`}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Menu Picker Options */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-[#2D2A26]">
                Click Flavors to Add
              </h3>
              <span className="text-xs text-[#8C8276]">
                Tap any bao to fill your next open slot
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1">
              {availableDumplings.map((dumpling) => {
                const countInBundle = selectedDumplings.filter((d) => d.id === dumpling.id).length;
                const canAdd = selectedDumplings.length < bundleSize;

                return (
                  <div
                    key={dumpling.id}
                    onClick={() => canAdd && handleAddDumpling(dumpling)}
                    className={`p-3.5 bg-white rounded-2xl border-2 transition-all flex items-center gap-3 select-none ${
                      canAdd
                        ? 'border-[#EAE2D5] hover:border-[#E25C40] hover:shadow-md cursor-pointer hover:scale-101'
                        : 'border-[#F0E6D8] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8DAC6] flex items-center justify-center shrink-0">
                      <DumplingGraphic type={dumpling.svgArtType} className="w-10 h-10" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#2D2A26] truncate">
                          {dumpling.name}
                        </span>
                        {countInBundle > 0 && (
                          <span className="text-[10px] font-extrabold bg-[#E25C40] text-white px-1.5 py-0.2 rounded-full">
                            ×{countInBundle}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#736B60] truncate">{dumpling.subtitle}</p>
                      <span className="text-[11px] font-bold text-[#E25C40] mt-0.5 inline-block">
                        ${dumpling.price}
                      </span>
                    </div>

                    <button
                      disabled={!canAdd}
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        canAdd
                          ? 'bg-[#FAF7F2] hover:bg-[#E25C40] hover:text-white text-[#2D2A26] border border-[#D8C7B0]'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
