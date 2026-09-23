import React, { useState, useMemo } from 'react';
import { Star, Sparkles, Plus, Check, ArrowRight, Lock, Gift, Compass, Sparkle, Search, SlidersHorizontal, Flame, Heart } from 'lucide-react';
import { DumplingProduct, ToyType, ToyTexture, ProductSalesMode } from '../types';
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
  const [selectedToyType, setSelectedToyType] = useState<string>('all');
  const [selectedSalesMode, setSelectedSalesMode] = useState<string>('all');
  const [selectedTexture, setSelectedTexture] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Main category tabs
  const toyTypeTabs = [
    { id: 'all', label: '🌟 All Squishies', desc: 'Full Studio Drop' },
    { id: 'animal', label: '🐾 Animals & Pets', desc: 'Capybara, Shiba, Corgi, Cat Paw' },
    { id: 'bakery', label: '🥐 Bakery & Sweets', desc: 'Croissant, Donut, Toast, Boba' },
    { id: 'fruit', label: '🍑 Fruits & Snacks', desc: 'Velvet Peach, Swiss Cheese' },
    { id: 'dumpling', label: '🥟 Dim Sum & Dumplings', desc: 'Classic Bao, Taro, Matcha' },
    { id: 'accessories', label: '🧺 Care & Revival', desc: 'Steamers & Spa Kit' },
  ];

  // Sales mode filter pills
  const salesModeFilters = [
    { id: 'all', label: 'All Modes' },
    { id: 'blind_box', label: '🎁 Mystery Blind Box', icon: Gift },
    { id: 'direct_purchase', label: '🎯 Direct Choice (Pick Style)', icon: Compass },
    { id: 'chase_exclusive', label: '🔒 Chase Vault (Unbox Only)', icon: Lock },
  ];

  // Texture filter pills
  const textureFilters = [
    { id: 'all', label: 'All Textures' },
    { id: 'slow_rise', label: '⏳ Slow-Rise Memory' },
    { id: 'jelly_water', label: '💧 Jelly Q-Bounce' },
    { id: 'flocked_velvet', label: '🌸 Velvet Flocked' },
    { id: 'sugar_clay', label: '☁️ Sugar Marshmallow' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Filter by Toy Type
      if (selectedToyType !== 'all') {
        if (selectedToyType === 'accessories') {
          if (p.category !== 'accessories' && p.toyType !== 'accessories') return false;
        } else if (p.toyType !== selectedToyType) {
          return false;
        }
      }

      // 2. Filter by Sales Mode
      if (selectedSalesMode !== 'all') {
        if (selectedSalesMode === 'blind_box' && p.salesMode !== 'blind_box') return false;
        if (selectedSalesMode === 'direct_purchase' && (p.salesMode !== 'direct_purchase' || p.category === 'accessories')) return false;
        if (selectedSalesMode === 'chase_exclusive' && !p.isChaseExclusive && p.salesMode !== 'chase_exclusive') return false;
      }

      // 3. Filter by Texture
      if (selectedTexture !== 'all') {
        if (p.textureType !== selectedTexture) return false;
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesAroma = p.aroma.toLowerCase().includes(query);
        const matchesTag = p.tag?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesAroma && !matchesTag) return false;
      }

      return true;
    });
  }, [products, selectedToyType, selectedSalesMode, selectedTexture, searchQuery]);

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

  const getTextureBadgeLabel = (tex?: ToyTexture) => {
    switch (tex) {
      case 'slow_rise':
        return '⏳ 5s Slow-Rise';
      case 'jelly_water':
        return '💧 Jelly Q-Bounce';
      case 'flocked_velvet':
        return '🌸 Velvet Fuzz';
      case 'sugar_clay':
        return '☁️ Sugar Clay';
      default:
        return '✨ Memory Squish';
    }
  };

  return (
    <section id="mystery-pack" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-black tracking-widest text-[#E25C40] uppercase block mb-2">
            OFFICIAL PRODUCT DROP & MULTI-SERIES VAULT
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#1F1C18] tracking-tight">
            Find your squish buddy.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#524B43] font-medium leading-relaxed max-w-2xl mx-auto">
            From viral <strong>Zen Capybaras</strong> and <strong>Butter Croissants</strong> to signature <strong>Dim Sum Steamer Boxes</strong> and secret <strong>24K Gold Chase pulls</strong> — explore our complete stress-relief sensory collection.
          </p>
        </div>

        {/* 1. Main Category Tabs (Toy Type / Shape) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 pt-2 gap-2.5 mb-8 no-scrollbar">
          {toyTypeTabs.map((tab) => {
            const isSelected = selectedToyType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playPopSound();
                  setSelectedToyType(tab.id);
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer flex flex-col items-center gap-0.5 border-2 ${
                  isSelected
                    ? 'bg-[#1F1C18] text-white border-[#1F1C18] shadow-md scale-102 ring-2 ring-[#1F1C18]/10'
                    : 'bg-white text-[#2D2A26] border-[#E5D8C5] hover:border-[#2D2A26] hover:bg-[#FAF7F2]'
                }`}
              >
                <span className="text-sm font-display">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Secondary Filter Toolbar (Sales Mode, Texture & Search) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#E8DAC6] shadow-xs mb-10 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Sales Mode Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <span className="text-[11px] font-black text-[#8C8276] uppercase tracking-wider mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Mode:</span>
            </span>
            {salesModeFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  playPopSound();
                  setSelectedSalesMode(f.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedSalesMode === f.id
                    ? 'bg-[#E25C40] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#524B43] hover:bg-[#F3EDE2] border border-[#E8DAC6]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Texture & Search Bar */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
            
            {/* Texture Selector */}
            <select
              value={selectedTexture}
              onChange={(e) => setSelectedTexture(e.target.value)}
              className="bg-[#FAF7F2] border border-[#E8DAC6] text-xs font-bold text-[#2D2A26] rounded-xl px-3 py-2 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#E25C40]"
            >
              {textureFilters.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* Quick Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-[#8C8276] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scent, pet, flavor..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#E8DAC6] rounded-xl text-[#2D2A26] placeholder-[#A8A29E] focus:outline-hidden focus:ring-2 focus:ring-[#E25C40]"
              />
            </div>

          </div>

        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-xs font-bold text-[#736B60]">
            Showing <span className="text-[#1F1C18] font-black">{filteredProducts.length}</span> squishy products
          </div>
          {(selectedToyType !== 'all' || selectedSalesMode !== 'all' || selectedTexture !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedToyType('all');
                setSelectedSalesMode('all');
                setSelectedTexture('all');
                setSearchQuery('');
              }}
              className="text-xs font-black text-[#E25C40] hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-[#D8C7B0] max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-[#FFF9ED] text-[#E25C40] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#2D2A26] mb-1">No squishies found</h3>
            <p className="text-xs text-[#736B60] mb-4">Try clearing your search or switching to another category tab.</p>
            <button
              onClick={() => {
                setSelectedToyType('all');
                setSelectedSalesMode('all');
                setSelectedTexture('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#1F1C18] text-white rounded-full text-xs font-bold hover:bg-[#E25C40] transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
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
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
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
                      ) : product.category === 'accessories' ? (
                        <span className="px-3 py-1 bg-[#B45309] text-white text-[10px] font-black uppercase rounded-full shadow-xs">
                          ACCESSORIES & CARE
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-[#10B981] text-white text-[10px] font-black uppercase rounded-full shadow-xs">
                          DIRECT CHOICE (OPEN)
                        </span>
                      )}

                      {/* Texture Pill */}
                      {product.textureType && (
                        <span className="px-2.5 py-0.5 bg-white/90 text-[#524B43] text-[9.5px] font-bold rounded-full shadow-2xs border border-[#E8DAC6] w-fit">
                          {getTextureBadgeLabel(product.textureType)}
                        </span>
                      )}
                    </div>

                    {/* Rating score badge */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-[#1F1C18] border border-[#E8DAC6]">
                      <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                      <span>{product.rating}</span>
                      <span className="text-[10px] text-[#736B60]">({product.reviewsCount})</span>
                    </div>

                    {/* Main Product Graphic */}
                    <div className="w-48 h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <DumplingGraphic
                        type={product.svgArtType}
                        showSteamer={product.includesSteamer}
                        className="w-40 h-40 drop-shadow-md"
                      />
                    </div>

                    {/* Quick Scent / Feature Hint */}
                    <span className="text-[11px] font-bold text-[#736B60] mt-2 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF5C38]" />
                      <span>
                        {isChase
                          ? `Drop Chance: ${product.chaseOdds}`
                          : product.aroma
                          ? `Scent: ${product.aroma}`
                          : 'Includes collector display pack'}
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
        )}

      </div>
    </section>
  );
};
