import React, { useState } from 'react';
import { X, Check, ShoppingBag, Trophy } from 'lucide-react';
import { DumplingProduct } from '../types';
import { playPopSound, playCelebrationChime } from '../utils/sound';

interface FlagSelectorModalProps {
  product: DumplingProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: DumplingProduct, variantId: string) => void;
}

export const FlagSelectorModal: React.FC<FlagSelectorModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedFlag, setSelectedFlag] = useState('flag-usa');

  if (!isOpen || !product) return null;

  const flags = [
    { id: 'flag-usa', name: 'USA', flag: '🇺🇸', color: 'bg-red-500' },
    { id: 'flag-brazil', name: 'Brazil', flag: '🇧🇷', color: 'bg-yellow-500' },
    { id: 'flag-argentina', name: 'Argentina', flag: '🇦🇷', color: 'bg-blue-400' },
    { id: 'flag-france', name: 'France', flag: '🇫🇷', color: 'bg-blue-600' },
    { id: 'flag-england', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'bg-red-600' },
    { id: 'flag-japan', name: 'Japan', flag: '🇯🇵', color: 'bg-blue-800' },
    { id: 'flag-germany', name: 'Germany', flag: '🇩🇪', color: 'bg-zinc-800' },
    { id: 'flag-mexico', name: 'Mexico', flag: '🇲🇽', color: 'bg-emerald-600' },
  ];

  const handleConfirm = () => {
    playCelebrationChime();
    onAddToCart(product, selectedFlag);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#1F1C18] shadow-2xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DAC6]">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="font-display font-black text-xl text-[#1F1C18]">
              Choose Your Flag Dumpling
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#736B60] hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#524B43] mt-4">
          Each World Cup dumpling comes with official nation crest pleats and an international tournament steamer basket.
        </p>

        {/* Flag Selection Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {flags.map((item) => {
            const isSelected = selectedFlag === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playPopSound();
                  setSelectedFlag(item.id);
                }}
                className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#3B82F6] bg-[#EFF6FF] shadow-xs'
                    : 'border-[#E8DAC6] hover:bg-[#FAF7F2]'
                }`}
              >
                <span className="text-2xl">{item.flag}</span>
                <span className="font-display font-black text-xs text-[#1F1C18]">{item.name}</span>
                {isSelected && <Check className="w-4 h-4 text-[#3B82F6] ml-auto" />}
              </button>
            );
          })}
        </div>

        <div className="pt-6 mt-6 border-t border-[#E8DAC6] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#736B60] block font-bold">Total</span>
            <span className="font-display font-black text-xl text-[#1F1C18]">${product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleConfirm}
            className="px-6 py-3 rounded-full bg-[#1F1C18] hover:bg-[#3B82F6] text-white font-black text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Flag to Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
};
