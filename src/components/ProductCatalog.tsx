import React, { useState } from 'react';
import { Star, Sparkles, Plus, Check, ArrowRight, Lock, Gift, Compass, ShieldAlert, Sparkle } from 'lucide-react';
import { DumplingProduct } from '../types';
import { playPopSound, playCelebrationChime } from '../utils/sound';
import { DumplingGraphic } from './DumplingGraphic';

interface ProductCatalogProps {
  products: DumplingProduct[];
  onSelectProduct: (product: DumplingProduct) => void;
  onAddToCart: (product: DumplingProduct, variantId?: string) => void;
  onOpenMysteryModal: () => void;
  onOpenFlagModal: (product: DumplingProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenMysteryModal,
  onOpenFlagModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filters = [
    { id: 'all', label: 'All Range', icon: null },
    { id: 'blindbox', label: '🎁 Mystery Blind Boxes', icon: Gift },
    { id: 'direct_pick', label: '🎯 Direct Choice (Pick Flavors)', icon: Compass },
    { id: 'chase_vault', label: '🔒 Chase Vault (Unbox Only)', icon: Lock },
    { id: 'accessories', label: '🎋 Steamer Accessories', icon: null },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'blindbox') return p.salesMode === 'blind_box';
    if (selectedFilter === 'direct_pick') return p.salesMode === 'direct_purchase' && p.category !== 'accessories';
    if (selectedFilter === 'chase_vault') return p.salesMode === 'chase_exclusive' || p.isChaseExclusive;
    if (selectedFilter === 'accessories') return p.category === 'accessories';
    return true;
  });

  const handleAction = (p: DumplingProduct, e: React.MouseEvent) => {
    e.stopPropagation();

    // 1. Chase items cannot be purchased directly
    if (p.salesMode === 'chase_exclusive' || p.isChaseExclusive) {
      playCelebrationChime();
      onOpenMysteryModal();
      return;
    }

    // 2. World Cup Flag edition
    if (p.id === 'world-cup-dumpling-squishy') {
      onOpenFlagModal(p);
      return;
    }

    // 3. Blind box product detail or quick add
    if (p.salesMode === 'blind_box') {
      onSelectProduct(p);
      return;
    }

    // 4. Direct Purchase add to cart
    playPopSound();
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="mystery-pack" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-black tracking-widest text-[#E25C40] uppercase block mb-2">
            OFFICIAL PRODUCT DROP & VAULT
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#1F1C18] tracking-tight">
            Choose your dumpling.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#524B43] font-medium leading-relaxed max-w-2xl mx-auto">
            Experience the thrill of <strong>Mystery Blind Boxes</strong> with secret rare pull rates, or directly select your favorite <strong>Direct Choice Flavors</strong> with guaranteed styles!
          </p>
        </div>

        {/* Dual Mode Guidance Banner */}
        <div className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#FFF8EE] to-[#FFF0D4] p-4.5 rounded-2xl border-2 border-[#F5D890] flex items-start gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FFDF40] text-[#734E24] flex items-center justify-center shrink-0 font-bold shadow-xs">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm text-[#2D2A26] flex items-center gap-1.5">
                <span>Mystery Blind Box Drops</span>
                <span className="text-[10px] bg-[#E25C40] text-white px-2 py-0.5 rounded-full uppercase font-bold">Surprise</span>
              </h4>
              <p className="text-xs text-[#736B60] mt-1 leading-relaxed">
                Factory-sealed bamboo steamers. Random colorway reveal with official chances to pull the <strong>24K Golden Ticket ($1,000 prize)</strong>!
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-4.5 rounded-2xl border-2 border-[#BFDBFE] flex items-start gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm text-[#2D2A26] flex items-center gap-1.5">
                <span>Direct Choice (Open Editions)</span>
                <span className="text-[10px] bg-[#10B981] text-white px-2 py-0.5 rounded-full uppercase font-bold">Guaranteed</span>
              </h4>
              <p className="text-xs text-[#736B60] mt-1 leading-relaxed">
                Skip the surprise! Pick the exact flavor you love (Taro, Matcha, Strawberry, World Cup Flags) and receive 100% guaranteed delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                playPopSound();
                setSelectedFilter(f.id);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === f.id
                  ? 'bg-[#1F1C18] text-white shadow-md scale-105'
                  : 'bg-white text-[#2D2A26] border border-[#D8C7B0] hover:bg-[#FAF7F2]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isChase = product.salesMode === 'chase_exclusive' || product.isChaseExclusive;
            const isBlindBox = product.salesMode === 'blind_box';

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`bg-white rounded-3xl overflow-hidden border-2 transition-all hover:shadow-xl group flex flex-col justify-between cursor-pointer ${
                  isChase
                    ? 'border-[#F59E0B] hover:border-[#D97706] shadow-sm'
                    : 'border-[#E8DAC6] hover:border-[#1F1C18]'
                }`}
              >
                {/* Product Top Visual Frame */}
                <div
                  className={`relative p-6 flex flex-col items-center justify-center min-h-[260px] ${
                    isChase
                      ? 'bg-gradient-to-b from-[#FEFCE8] to-[#FEF08A]/40'
                      : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF3E8]'
                  }`}
                >
                  
                  {/* Tag Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    {isChase ? (
                      <span className="px-3 py-1 bg-[#FEF3C7] text-[#B45309] text-[10px] font-black uppercase rounded-full shadow-xs border border-[#FDE68A] flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#D97706]" />
                        <span>CHASE SECRET • UNBOX ONLY</span>
                      </span>
                    ) : isBlindBox ? (
                      <span className="px-3 py-1 bg-[#FFDF40] text-[#734E24] text-[10px] font-black uppercase rounded-full shadow-xs border border-[#734E24]/20 flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        <span>MYSTERY BLIND BOX</span>
                      </span>
                    ) : product.id === 'world-cup-dumpling-squishy' ? (
                      <span className="px-3 py-1 bg-[#3B82F6] text-white text-[10px] font-black uppercase rounded-full shadow-xs">
                        WORLD CUP FLAGS
                      </span>
                    ) : product.category === 'accessories' ? (
                      <span className="px-3 py-1 bg-[#B45309] text-white text-[10px] font-black uppercase rounded-full shadow-xs">
                        ACCESSORIES
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-[#10B981] text-white text-[10px] font-black uppercase rounded-full shadow-xs">
                        DIRECT CHOICE (OPEN)
                      </span>
                    )}
                  </div>

                  {/* Rating score badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-[#1F1C18] border border-[#E8DAC6]">
                    <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                    <span>{product.rating}</span>
                    <span className="text-[10px] text-[#736B60]">({product.reviewsCount})</span>
                  </div>

                  {/* Main Product Graphic in Steamer */}
                  <div className="w-48 h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <DumplingGraphic type={product.svgArtType} showSteamer={product.includesSteamer} className="w-40 h-40 drop-shadow-md" />
                  </div>

                  {/* Quick Hint */}
                  <span className="text-[11px] font-bold text-[#736B60] mt-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF5C38]" />
                    <span>
                      {isChase
                        ? `Official Pull Rate: ${product.chaseOdds}`
                        : 'Includes mini bamboo steamer box'}
                    </span>
                  </span>
                </div>

                {/* Product Info & Action Card Bottom */}
                <div className="p-6 border-t border-[#E8DAC6] bg-white flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display font-black text-xl text-[#1F1C18] group-hover:text-[#FF5C38] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#524B43] mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#F0E6D8] flex items-center justify-between gap-3">
                    {isChase ? (
                      <div>
                        <span className="text-[10px] text-[#B45309] font-black uppercase block">
                          Chase Probability
                        </span>
                        <div className="font-display font-black text-base text-[#D97706]">
                          {product.chaseOdds || '1:24 Rate'}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[11px] text-[#736B60] font-bold block">Price</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display font-black text-2xl text-[#1F1C18]">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#A8A29E] line-through font-bold">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Dynamic CTA Button matching salesMode */}
                    <button
                      id={`catalog-action-${product.id}`}
                      onClick={(e) => handleAction(product, e)}
                      className={`px-5 py-3 rounded-full font-black text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 ${
                        isChase
                          ? 'bg-[#D97706] hover:bg-[#B45309] text-white'
                          : isBlindBox
                          ? 'bg-[#FFDF40] hover:bg-[#FACC15] text-[#1F1C18] border border-[#734E24]/20'
                          : 'bg-[#2D2A26] hover:bg-[#E25C40] text-white'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-4 h-4 text-[#15803D]" />
                          <span>Added to Cart!</span>
                        </>
                      ) : isChase ? (
                        <>
                          <Sparkle className="w-3.5 h-3.5 text-[#FEF08A]" />
                          <span>Pull in Mystery Box</span>
                        </>
                      ) : isBlindBox ? (
                        <>
                          <span>Choose Mystery Pack</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : product.id === 'world-cup-dumpling-squishy' ? (
                        <>
                          <span>Select Flag ($24.95)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Add to Cart</span>
                          <Plus className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
