import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Sparkles, Check, Lock, Gift, Compass } from 'lucide-react';
import { DumplingProduct, ProductVariant } from '../types';
import { DumplingGraphic } from './DumplingGraphic';
import { playSquishSound, playPopSound, playCelebrationChime } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ProductCardProps {
  product: DumplingProduct;
  onAddToCart: (product: DumplingProduct, variant: ProductVariant) => void;
  onQuickView: (product: DumplingProduct) => void;
  onOpenMysteryModal?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onOpenMysteryModal,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { id: 'default', title: 'Standard', name: 'Standard', colorHex: '#FFF', inStock: true, price: product.price, sku: 'SQ-DEF' }
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isSquishing, setIsSquishing] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isChase = product.salesMode === 'chase_exclusive' || product.isChaseExclusive;
  const isBlindBox = product.salesMode === 'blind_box';

  const handleCardSquish = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSquishing(true);
    playSquishSound(1.1);
    setTimeout(() => {
      setIsSquishing(false);
      playPopSound();
    }, 450);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isChase) {
      // Cannot buy directly - open mystery unboxing modal
      playCelebrationChime();
      if (onOpenMysteryModal) {
        onOpenMysteryModal();
      } else {
        onQuickView(product);
      }
      return;
    }

    playCelebrationChime();
    onAddToCart(product, selectedVariant);
    setAddedAnimation(true);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
    });
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
      className={`group relative bg-white rounded-3xl p-5 border-2 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
        isChase
          ? 'border-[#F59E0B] bg-gradient-to-b from-[#FFFDF5] to-white hover:border-[#D97706]'
          : isBlindBox
          ? 'border-[#E8DAC6] hover:border-[#E25C40]/80'
          : 'border-[#E8DAC6] hover:border-[#3B82F6]/80'
      }`}
    >
      {/* Top Tag Badges & Sales Mode Indicator */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {isChase ? (
          <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] flex items-center gap-1 shadow-xs animate-pulse">
            <Lock className="w-3 h-3 text-[#D97706]" />
            <span>Blind Box Chase Only</span>
          </span>
        ) : isBlindBox ? (
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#F3E8FF] text-[#7E22CE] border border-[#D8B4FE] flex items-center gap-1 shadow-xs">
            <Gift className="w-3 h-3" />
            <span>Mystery Surprise</span>
          </span>
        ) : (
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] flex items-center gap-1 shadow-xs">
            <Compass className="w-3 h-3" />
            <span>Direct Choice</span>
          </span>
        )}

        {product.includesSteamer && (
          <span className="text-[10px] font-bold text-[#8C5E12] bg-[#FFF8E7] px-2 py-0.5 rounded-md border border-[#F5E0A3]">
            🎋 Steamer Included
          </span>
        )}
      </div>

      {/* Main Interactive Product Visual Display */}
      <div
        onClick={handleCardSquish}
        className={`relative w-full h-44 rounded-2xl flex items-center justify-center overflow-hidden border transition-colors ${
          isChase
            ? 'bg-gradient-to-b from-[#FEF9C3]/50 to-[#FEF08A]/30 border-[#FDE047]'
            : 'bg-gradient-to-b from-[#FAF7F2] to-[#F2ECE1] border-[#EAE2D5] group-hover:bg-[#FFF8EE]'
        }`}
        title={isChase ? "Chase Secret — Click to preview squish!" : "Click to squish!"}
      >
        {/* Steam animation on hover */}
        {isHovered && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-white/80 animate-steam-1" />
            <div className="w-4 h-4 rounded-full bg-white/90 animate-steam-2" />
          </div>
        )}

        {/* Chase Glow Ring */}
        {isChase && (
          <div className="absolute inset-0 bg-radial from-amber-300/20 to-transparent pointer-events-none" />
        )}

        {/* The SVG Artwork */}
        <DumplingGraphic
          type={product.svgArtType}
          className="w-36 h-36"
          squishScaleX={isSquishing ? 1.35 : 1}
          squishScaleY={isSquishing ? 0.68 : 1}
          isSquishing={isSquishing}
          showSteamer={product.includesSteamer}
          expression={isSquishing ? 'squished' : isHovered ? 'wink' : 'happy'}
        />

        {/* Floating Quick View action pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playPopSound();
            onQuickView(product);
          }}
          className="absolute bottom-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-[#2D2A26] rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Information Body */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating */}
          <div className="flex items-center gap-1 text-xs mb-1.5">
            <div className="flex text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-[#2D2A26]">{product.rating}</span>
            <span className="text-[#8C8276]">({product.reviewsCount.toLocaleString()})</span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base text-[#2D2A26] group-hover:text-[#E25C40] transition-colors leading-snug">
            {product.title}
          </h3>

          <p className="text-xs text-[#736B60] mt-1 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Sensory Metrics & Odds Badge */}
        {isChase ? (
          <div className="my-3 py-2 px-3 bg-[#FEF3C7] rounded-xl border border-[#FDE68A] flex items-center justify-between text-[11px] text-[#92400E] font-bold">
            <span>🔥 Pull Chance:</span>
            <span className="text-[#B45309]">{product.chaseOdds || '1 in 24 Boxes'}</span>
          </div>
        ) : (
          <div className="my-3 py-2 px-3 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] flex items-center justify-between text-[11px] text-[#6E6457]">
            <span>
              Rebound: <strong className="text-[#2D2A26]">{product.slowRiseSeconds}s</strong>
            </span>
            <span className="text-[#D5C7B4]">•</span>
            <span>
              Squish: <strong className="text-[#E25C40]">{product.squishScore}/10</strong>
            </span>
          </div>
        )}

        {/* Variant color selection dots (if multiple and not chase) */}
        {!isChase && product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] text-[#8C8276] mr-1">Style:</span>
            {product.variants.slice(0, 5).map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  playPopSound();
                  setSelectedVariant(v);
                }}
                className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                  selectedVariant.id === v.id
                    ? 'ring-2 ring-[#E25C40] ring-offset-1 scale-110'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: v.colorHex }}
                title={v.title}
              />
            ))}
          </div>
        )}

        {/* Price & Add to Cart Footer */}
        <div className="pt-2 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
          {isChase ? (
            <div>
              <div className="text-[11px] font-black text-[#D97706] uppercase tracking-wider">
                Unbox Only
              </div>
              <span className="text-[10px] text-[#92400E] font-semibold">Not Sold Directly</span>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-extrabold text-lg text-[#2D2A26]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#9C9286] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#10B981] font-semibold">In Stock • Fast Ship</span>
            </div>
          )}

          {isChase ? (
            <button
              id={`unbox-chase-btn-${product.id}`}
              onClick={handleAdd}
              className="px-3.5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-xs rounded-2xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102"
              title="This rare edition cannot be purchased directly. Tap to try unboxing in the Mystery Box!"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FEF08A]" />
              <span>Pull in Mystery Box</span>
            </button>
          ) : (
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={handleAdd}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                addedAnimation
                  ? 'bg-[#10B981] text-white scale-105'
                  : isBlindBox
                  ? 'bg-[#E25C40] hover:bg-[#C9472C] text-white hover:scale-102'
                  : 'bg-[#2D2A26] hover:bg-[#E25C40] text-white hover:scale-102'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added!</span>
                </>
              ) : isBlindBox ? (
                <>
                  <Gift className="w-3.5 h-3.5 text-[#FFE8B8]" />
                  <span>Unbox Mystery</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#FFE27A]" />
                  <span>Adopt Bao</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
