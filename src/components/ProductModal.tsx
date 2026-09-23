import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, CheckCircle, ShieldCheck, Sparkles, Plus, Minus, Droplets, Lock, Gift, Compass } from 'lucide-react';
import { DumplingProduct, ProductVariant } from '../types';
import { DumplingGraphic } from './DumplingGraphic';
import { playSquishSound, playPopSound, playCelebrationChime } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ProductModalProps {
  product: DumplingProduct | null;
  onClose: () => void;
  onAddToCart: (product: DumplingProduct, variant: ProductVariant, quantity: number) => void;
  onOpenMysteryModal?: () => void;
}

const DEFAULT_VARIANT: ProductVariant = {
  id: 'default',
  title: 'Standard',
  name: 'Standard',
  colorHex: '#FFF',
  inStock: true,
  price: 24.95,
  sku: 'SQ-DEF',
};

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenMysteryModal,
}) => {
  // All Hooks declared at top level unconditionally
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => {
    return product?.variants?.[0] || DEFAULT_VARIANT;
  });
  const [quantity, setQuantity] = useState(1);
  const [isSquishing, setIsSquishing] = useState(false);
  const [added, setAdded] = useState(false);

  // Sync state when selected product changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.[0] || DEFAULT_VARIANT);
      setQuantity(1);
      setIsSquishing(false);
      setAdded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const isChase = product.salesMode === 'chase_exclusive' || product.isChaseExclusive;
  const isBlindBox = product.salesMode === 'blind_box';
  const currentPrice = selectedVariant.price || product.price;

  const handleSquish = () => {
    setIsSquishing(true);
    playSquishSound(1.2);
    setTimeout(() => {
      setIsSquishing(false);
      playPopSound();
    }, 500);
  };

  const handleAdd = () => {
    if (isChase) {
      playCelebrationChime();
      onClose();
      if (onOpenMysteryModal) {
        onOpenMysteryModal();
      }
      return;
    }

    playCelebrationChime();
    onAddToCart(product, selectedVariant, quantity);
    setAdded(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border-3 sm:border-4 shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col ${
          isChase ? 'border-[#F59E0B]' : 'border-[#C89B65]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 text-[#736B60] hover:text-black bg-white rounded-full border border-[#E0D2BE] shadow-xs flex items-center justify-center cursor-pointer z-30 transition-transform active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto overscroll-contain p-4 sm:p-7 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 items-center">
            
            {/* Left: Product Visual Stage */}
            <div
              onClick={handleSquish}
              className={`relative w-full aspect-square rounded-3xl border-2 p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer shadow-inner group select-none ${
                isChase ? 'bg-gradient-to-b from-[#FEFCE8] to-[#FEF08A]/30 border-[#FDE047]' : 'bg-white border-[#E8DAC6]'
              }`}
              title="Tap to squish this specimen!"
            >
              <div className="absolute top-3 left-3 text-[10px] font-bold text-[#E25C40] bg-[#FFEDE8] px-2.5 py-1 rounded-full border border-[#FFD5CC]">
                ✨ Tap to Squeeze
              </div>

              <DumplingGraphic
                type={product.svgArtType}
                className="w-40 h-40 sm:w-48 sm:h-48"
                squishScaleX={isSquishing ? 1.4 : 1}
                squishScaleY={isSquishing ? 0.65 : 1}
                isSquishing={isSquishing}
                showSteamer={product.includesSteamer}
                expression={isSquishing ? 'squished' : 'happy'}
              />

              <div className="mt-2 text-[10px] sm:text-[11px] font-bold text-[#8C5E12] bg-[#FFF8E7] px-3 py-0.5 rounded-full border border-[#F5E0A3]">
                🎋 Collector Bamboo Steamer Included
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="space-y-3.5 sm:space-y-4">
              <div>
                {/* Tag Badge */}
                {isChase ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF3C7] text-[#92400E] text-[10px] font-black uppercase rounded-full border border-[#FDE68A] mb-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>CHASE SECRET • BLIND BOX ONLY</span>
                  </span>
                ) : isBlindBox ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3E8FF] text-[#7E22CE] text-[10px] font-black uppercase rounded-full border border-[#D8B4FE] mb-1.5">
                    <Gift className="w-3.5 h-3.5" />
                    <span>SURPRISE COLOR REVEAL</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-black uppercase rounded-full border border-[#BFDBFE] mb-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>DIRECT CHOICE GUARANTEED</span>
                  </span>
                )}

                <div className="flex items-center gap-1 text-xs text-[#F59E0B] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="font-bold text-[#2D2A26] ml-1">{product.rating}</span>
                  <span className="text-[#8C8276]">({product.reviewsCount} reviews)</span>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#2D2A26] leading-tight">
                  {product.title}
                </h3>
                <p className="text-xs text-[#E25C40] font-bold mt-0.5">{product.tagline}</p>
              </div>

              {/* Price or Chase Rate Notice */}
              {isChase ? (
                <div className="p-3 bg-[#FEF3C7] rounded-2xl border border-[#FDE68A] text-xs">
                  <div className="text-[11px] font-black text-[#B45309] uppercase">
                    Official Pull Chance:
                  </div>
                  <div className="text-base font-black text-[#92400E] mt-0.5">
                    {product.chaseOdds}
                  </div>
                  <p className="text-[11px] text-[#78350F] mt-1">
                    This rare chase edition is randomly inserted inside factory-sealed Mystery Steamer Boxes!
                  </p>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-2xl text-[#2D2A26]">
                    ${currentPrice.toFixed(2)}
                  </span>
                  {selectedVariant.compareAtPrice && (
                    <span className="text-xs sm:text-sm text-[#9C9286] line-through">
                      ${selectedVariant.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                  {selectedVariant.compareAtPrice && (
                    <span className="text-xs text-[#10B981] font-bold ml-1">
                      Save {Math.round(((selectedVariant.compareAtPrice - currentPrice) / selectedVariant.compareAtPrice) * 100)}%
                    </span>
                  )}
                </div>
              )}

              <p className="text-xs text-[#61594E] leading-relaxed">
                {product.description}
              </p>

              {/* Sensory Highlights Bar */}
              <div className="bg-white p-3 rounded-2xl border border-[#E8DAC6] grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#8C8276] text-[10px] block">Rebound Speed</span>
                  <strong className="text-[#2D2A26]">{product.slowRiseSeconds}s Slow-Rise</strong>
                </div>
                <div>
                  <span className="text-[#8C8276] text-[10px] block">Aroma Infusion</span>
                  <strong className="text-[#2D2A26] truncate block">{product.aroma}</strong>
                </div>
              </div>

              {/* Variant Selector for Direct Pick or Blind Box Pack Sizes */}
              {!isChase && product.variants && product.variants.length > 1 && (
                <div>
                  <label className="text-xs font-bold text-[#2D2A26] block mb-1.5">
                    {isBlindBox ? 'Choose Pack Configuration:' : 'Select Style:'}{' '}
                    <span className="text-[#736B60] font-normal">{selectedVariant.title}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          playPopSound();
                          setSelectedVariant(v);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                          selectedVariant.id === v.id
                            ? 'border-[#E25C40] bg-[#FFEDE8] text-[#2D2A26] shadow-xs ring-1 ring-[#E25C40]'
                            : 'border-[#E8DAC6] bg-white text-[#524B43] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <span className="truncate mr-2">{v.title}</span>
                        <span className="text-[#E25C40] shrink-0 font-black">${v.price.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Button */}
              <div className="pt-2 flex items-center gap-2 sm:gap-3">
                {!isChase && (
                  <div className="flex items-center bg-white border border-[#E0D2BE] rounded-full p-1 shadow-xs shrink-0">
                    <button
                      onClick={() => {
                        playPopSound();
                        setQuantity(Math.max(1, quantity - 1));
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#FAF7F2] text-[#2D2A26] cursor-pointer active:scale-90"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-bold text-xs">{quantity}</span>
                    <button
                      onClick={() => {
                        playPopSound();
                        setQuantity(quantity + 1);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#FAF7F2] text-[#2D2A26] cursor-pointer active:scale-90"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-4 sm:px-6 rounded-full font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isChase
                      ? 'bg-[#D97706] hover:bg-[#B45309] text-white hover:scale-101 active:scale-98'
                      : added
                      ? 'bg-[#10B981] text-white scale-101'
                      : 'bg-[#E25C40] hover:bg-[#CF492D] text-white hover:scale-101 active:scale-98'
                  }`}
                >
                  {isChase ? (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FEF08A]" />
                      <span>Pull in Mystery Box</span>
                    </>
                  ) : added ? (
                    <span>Added to Cart!</span>
                  ) : isBlindBox ? (
                    <>
                      <Gift className="w-4 h-4 text-[#FFE8B8]" />
                      <span>Adopt Mystery • ${(currentPrice * quantity).toFixed(2)}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#FFE27A]" />
                      <span>Add to Cart • ${(currentPrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Specs & Care Highlights */}
          <div className="border-t border-[#EAE2D5] pt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs text-[#736B60]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Dimensions: {product.dimensions}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3B82F6] shrink-0" />
              <span>Weight: {product.weight}</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#E25C40] shrink-0" />
              <span>Washable with warm water</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
