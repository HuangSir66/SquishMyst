import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OfficialDropSection } from './components/OfficialDropSection';
import { GoldenTicketSection } from './components/GoldenTicketSection';
import { VideoRailSection } from './components/VideoRailSection';
import { ProductCatalog } from './components/ProductCatalog';
import { SquishLab } from './components/SquishLab';
import { BundleBuilder } from './components/BundleBuilder';
import { MysteryBoxModal } from './components/MysteryBoxModal';
import { ReviewsSection } from './components/ReviewsSection';
import { CareAndFAQ } from './components/CareAndFAQ';
import { HelpfulGuidesSection } from './components/HelpfulGuidesSection';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { SearchModal } from './components/SearchModal';
import { TrackingModal } from './components/TrackingModal';
import { ContactModal } from './components/ContactModal';
import { FlagSelectorModal } from './components/FlagSelectorModal';
import { Footer } from './components/Footer';
import { DumplingProduct, ProductVariant, CartItem } from './types';
import { DUMPLING_PRODUCTS } from './data/dumplings';
import { playPopSound, playCelebrationChime } from './utils/sound';

export default function App() {
  // Cart state persisted locally
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('squishy_dumplings_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default starting item: 1 Mystery Dumpling Squishy
    const initProd = DUMPLING_PRODUCTS[0];
    const initVar = initProd.variants[0];
    return [
      {
        id: 'cart-init-mystery',
        variantId: initVar.id,
        product: initProd,
        selectedVariant: initVar,
        quantity: 1,
        price: initVar.price || initProd.price,
        originalPrice: initVar.compareAtPrice || initProd.originalPrice,
        linePrice: initVar.price || initProd.price,
        properties: {
          _sales_mode: initProd.salesMode,
          _steamer_included: initProd.includesSteamer,
          _is_mystery: true,
        },
      },
    ];
  });

  // Modal & Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMysteryOpen, setIsMysteryOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<DumplingProduct | null>(null);
  const [flagProductForModal, setFlagProductForModal] = useState<DumplingProduct | null>(null);

  // Filter & Navigation states
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('hero');

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('squishy_dumplings_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product: DumplingProduct, variantIdOrObj?: string | ProductVariant, quantity = 1) => {
    let chosenVariant: ProductVariant;
    if (typeof variantIdOrObj === 'string') {
      const found = product.variants.find((v) => v.id === variantIdOrObj);
      chosenVariant = found || product.variants[0] || {
        id: 'default',
        title: 'Standard',
        name: 'Standard',
        colorHex: '#FFF',
        inStock: true,
        price: product.price,
        sku: 'SQ-DEF',
      };
    } else if (variantIdOrObj) {
      chosenVariant = variantIdOrObj;
    } else {
      chosenVariant = product.variants[0] || {
        id: 'default',
        title: 'Standard',
        name: 'Standard',
        colorHex: '#FFF',
        inStock: true,
        price: product.price,
        sku: 'SQ-DEF',
      };
    }

    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.selectedVariant.id === chosenVariant.id
    );

    const itemPrice = chosenVariant.price || product.price;

    if (existingIndex > -1) {
      setCartItems((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        next[existingIndex].linePrice = next[existingIndex].quantity * itemPrice;
        return next;
      });
    } else {
      const newItem: CartItem = {
        id: `cart-${product.id}-${chosenVariant.id}-${Date.now()}`,
        variantId: chosenVariant.id,
        product,
        selectedVariant: chosenVariant,
        quantity,
        price: itemPrice,
        originalPrice: chosenVariant.compareAtPrice || product.originalPrice,
        linePrice: itemPrice * quantity,
        properties: {
          _sales_mode: product.salesMode,
          _steamer_included: product.includesSteamer,
          _is_mystery: product.salesMode === 'blind_box',
        },
      };
      setCartItems((prev) => [newItem, ...prev]);
    }
  };

  const handleAddBundleToCart = (bundle: {
    title: string;
    dumplings: DumplingProduct[];
    tierName: string;
    totalPrice: number;
    originalPrice: number;
  }) => {
    const bundleProduct: DumplingProduct = {
      id: `bundle-${Date.now()}`,
      handle: 'custom-steamer-bundle',
      name: bundle.title,
      title: bundle.title,
      slug: 'custom-steamer-bundle',
      subtitle: `Includes ${bundle.dumplings.length} handcrafted squishies + bamboo steamer`,
      tagline: bundle.tierName,
      price: bundle.totalPrice,
      originalPrice: bundle.originalPrice,
      rating: 5.0,
      reviewsCount: 1,
      tag: 'Bestseller',
      category: 'sets',
      salesMode: 'direct_purchase',
      isChaseExclusive: false,
      squishScore: 10.0,
      slowRiseSeconds: 5.0,
      aroma: 'Assorted Bakery Aromas',
      colorTheme: 'Custom Steamer Pack',
      accentColor: '#E25C40',
      bgGradient: 'from-[#FFFDF9] to-[#F5ECE0]',
      includesSteamer: true,
      inStock: true,
      description: 'Custom created Dim Sum Steamer Basket Bundle.',
      features: bundle.dumplings.map((d) => `1× ${d.name}`),
      dimensions: 'Custom Steamer Set',
      weight: `${bundle.dumplings.length * 110}g`,
      material: 'Slow-Rise TPR',
      variants: [
        {
          id: 'bundle-var',
          title: bundle.tierName,
          name: bundle.tierName,
          price: bundle.totalPrice,
          colorHex: '#C89B65',
          inStock: true,
          sku: 'SQ-BUN-CUSTOM',
        },
      ],
      svgArtType: 'classic',
    };

    handleAddToCart(bundleProduct, bundleProduct.variants[0], 1);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2A26] relative selection:bg-[#FFE27A] selection:text-[#3B2818]">
      
      {/* Top Banner & Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenMysteryModal={() => setIsMysteryOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        
        {/* 1. Hero Section: MYSTERY DUMPLING. SQUISHY */}
        <Hero
          onShopDrop={() => handleNavigate('mystery-pack')}
          onWatchBuzz={() => handleNavigate('video-reels')}
        />

        {/* 2. Official Drop Section: "Open the tiny steamer. Chase the squish." */}
        <OfficialDropSection
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            handleNavigate('mystery-pack');
          }}
          onOpenMysteryModal={() => setIsMysteryOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* 3. Press Spotlight: Golden Ticket Mystery Dumpling ($1,000 Prize, 1 of 1 Gold Chase) */}
        <GoldenTicketSection
          onShopMystery={() => handleNavigate('mystery-pack')}
          onOpenMysteryModal={() => setIsMysteryOpen(true)}
        />

        {/* 4. Real Reveal Clips: "What shoppers are opening." Video Rail */}
        <VideoRailSection />

        {/* 5. Our Range: "Choose your mystery pack." */}
        <ProductCatalog
          products={DUMPLING_PRODUCTS}
          onSelectProduct={(prod) => setSelectedProductForModal(prod)}
          onAddToCart={(prod, variantId) => {
            handleAddToCart(prod, variantId);
            setIsCartOpen(true);
          }}
          onOpenMysteryModal={() => setIsMysteryOpen(true)}
          onOpenFlagModal={(prod) => setFlagProductForModal(prod)}
        />

        {/* 6. Interactive ASMR Squeeze Lab */}
        <SquishLab
          onAddToCart={(product) => {
            handleAddToCart(product);
            setIsCartOpen(true);
          }}
        />

        {/* 7. Steamer Bundle Builder */}
        <BundleBuilder onAddBundleToCart={handleAddBundleToCart} />

        {/* 8. Shopper Reviews */}
        <ReviewsSection />

        {/* 9. FAQ: "Quick answers before the first reveal." */}
        <CareAndFAQ />

        {/* 10. Helpful Guides & Drop Alerts Newsletter */}
        <HelpfulGuidesSection onNavigate={handleNavigate} />

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddUpsell={(prod) => handleAddToCart(prod)}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={(prod, variant, qty) => {
          handleAddToCart(prod, variant, qty);
          setIsCartOpen(true);
        }}
      />

      {/* World Cup Flag Selection Modal */}
      <FlagSelectorModal
        product={flagProductForModal}
        isOpen={!!flagProductForModal}
        onClose={() => setFlagProductForModal(null)}
        onAddToCart={(prod, variantId) => {
          handleAddToCart(prod, variantId);
          setIsCartOpen(true);
        }}
      />

      {/* Mystery Blind Box Unboxing Simulator Modal */}
      <MysteryBoxModal
        isOpen={isMysteryOpen}
        onClose={() => setIsMysteryOpen(false)}
        onAddToCart={(prod) => {
          handleAddToCart(prod);
          setIsCartOpen(true);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProductForModal(prod)}
      />

      {/* Order Tracking Modal */}
      <TrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* Customer Contact Support Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
