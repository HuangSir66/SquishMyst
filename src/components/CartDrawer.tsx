import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag, Check, Truck, ShieldCheck, Heart, ArrowLeft } from 'lucide-react';
import { CartItem, DumplingProduct } from '../types';
import { DUMPLING_PRODUCTS } from '../data/dumplings';
import { DumplingGraphic } from './DumplingGraphic';
import { playPopSound, playSquishSound, playCelebrationChime } from '../utils/sound';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onAddUpsell: (product: DumplingProduct) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddUpsell,
  onClearCart,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [customerName, setCustomerName] = useState('Happy Dim Sum Lover');
  const [shippingAddress, setShippingAddress] = useState('123 Steamer St, San Francisco, CA 94107');

  // Prevent background scrolling when cart drawer is open on mobile/desktop
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 45;
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const totalItemCount = cartItems.reduce((a, c) => a + c.quantity, 0);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'SQUISHY15' || code === 'DIMSUM15') {
      playCelebrationChime();
      setDiscountPercent(15);
      setPromoMessage({ text: '🎉 15% discount applied successfully!', type: 'success' });
    } else if (code === 'DIMSUM20' || code === 'BAOLOVE') {
      playCelebrationChime();
      setDiscountPercent(20);
      setPromoMessage({ text: '✨ 20% Super Squisher discount applied!', type: 'success' });
    } else {
      playPopSound();
      setPromoMessage({ text: 'Invalid code. Try "SQUISHY15" or "DIMSUM20"', type: 'error' });
    }
  };

  const handleStartCheckout = () => {
    playCelebrationChime();
    setIsCheckingOut(true);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    playCelebrationChime();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
    });
    setCheckoutComplete(true);
  };

  const handleFinishAndReset = () => {
    onClearCart();
    setCheckoutComplete(false);
    setIsCheckingOut(false);
    onClose();
  };

  // Upsell suggestion item: Spicy Chili Oil toy or Matcha Bao
  const upsellProduct = DUMPLING_PRODUCTS.find((p) => p.id === 'chili-oil-sauce-squishy') || DUMPLING_PRODUCTS[1];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fadeIn flex justify-end"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-md h-[100dvh] max-h-[100dvh] bg-[#FAF7F2] border-l-0 sm:border-l-2 border-[#E8DAC6] shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Bar Header (Mobile Optimized with large touch targets) */}
        <div className="p-4 sm:p-5 border-b border-[#E8DAC6] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFF0ED] text-[#E25C40] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#2D2A26] leading-tight">
                Your Steamer Basket
              </h3>
              <span className="text-[11px] font-bold text-[#736B60]">
                {totalItemCount} {totalItemCount === 1 ? 'squishy' : 'squishies'} selected
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            {cartItems.length > 0 && !checkoutComplete && !isCheckingOut && (
              <button
                onClick={() => {
                  playPopSound();
                  onClearCart();
                }}
                className="text-[11px] font-bold text-[#8C8276] hover:text-[#E25C40] px-2 py-1.5 rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                title="Empty entire cart"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-[#736B60] hover:text-black rounded-full bg-[#FAF7F2] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FFF8EE] px-4 py-2.5 sm:px-5 sm:py-3 border-b border-[#F0E6D8] text-xs shrink-0">
          <div className="flex items-center justify-between mb-1.5 font-bold text-[#2D2A26]">
            {amountNeededForFreeShipping > 0 ? (
              <span className="flex items-center gap-1.5 text-[#8C5E12] text-[11px] sm:text-xs">
                <Truck className="w-3.5 h-3.5 text-[#E25C40] shrink-0" />
                <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more for <strong>FREE Shipping</strong>!</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[#10B981] text-[11px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>🎉 Unlocked <strong>FREE US Shipping & Bamboo Basket!</strong></span>
              </span>
            )}
          </div>
          <div className="w-full h-2 bg-[#EAE2D5] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FCD87D] to-[#10B981] rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Content Area */}
        {checkoutComplete ? (
          // Order Success View
          <div className="flex-1 p-5 sm:p-6 flex flex-col items-center justify-center text-center space-y-4 overflow-y-auto overscroll-contain">
            <div className="w-16 h-16 rounded-full bg-[#E1F7EC] text-[#10B981] flex items-center justify-center shadow-md animate-bounce shrink-0">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h4 className="font-display font-black text-2xl text-[#2D2A26]">
              Order Confirmed! 🥟
            </h4>

            <p className="text-xs sm:text-sm text-[#61594E] max-w-xs leading-relaxed">
              Thank you, <strong>{customerName}</strong>! Your slow-rising squishies are being packed into their custom bamboo display steamer.
            </p>

            <div className="bg-white p-3.5 rounded-2xl border border-[#E8DAC6] text-xs text-[#2D2A26] font-medium w-full text-left space-y-1">
              <p className="font-bold text-[#1F1C18]">Delivery Destination:</p>
              <p className="text-[#524B43]">📍 {shippingAddress}</p>
              <p className="text-[#8C8276] text-[10px] pt-1 border-t border-[#F0E6D8]">
                Order #SQ-{Math.floor(100000 + Math.random() * 900000)} • Tracked Priority (3-5 Days)
              </p>
            </div>

            <button
              onClick={handleFinishAndReset}
              className="w-full py-4 bg-[#2D2A26] hover:bg-[#E25C40] text-white rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-102"
            >
              Continue Exploring Squishies
            </button>
          </div>
        ) : isCheckingOut ? (
          // Checkout Form Step
          <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DAC6]">
              <h4 className="font-display font-bold text-base text-[#2D2A26] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Express Mobile Checkout</span>
              </h4>
              <button
                onClick={() => setIsCheckingOut(false)}
                className="text-xs text-[#E25C40] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <form onSubmit={handleConfirmOrder} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#4A443D] font-bold mb-1 text-xs">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 bg-white rounded-xl border border-[#D8C7B0] focus:ring-2 focus:ring-[#E25C40] focus:outline-hidden text-sm text-[#2D2A26]"
                />
              </div>

              <div>
                <label className="block text-[#4A443D] font-bold mb-1 text-xs">Shipping Address</label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full p-3 bg-white rounded-xl border border-[#D8C7B0] focus:ring-2 focus:ring-[#E25C40] focus:outline-hidden text-sm text-[#2D2A26]"
                />
              </div>

              <div>
                <label className="block text-[#4A443D] font-bold mb-1 text-xs">Payment Method (Simulated Test)</label>
                <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#86EFAC] flex items-center justify-between font-bold text-[#166534]">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#16A34A]" />
                    <span>Apple Pay / Credit Card</span>
                  </span>
                  <span className="text-[11px] bg-[#DCFCE7] px-2 py-0.5 rounded-md">$0.00 Test</span>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#E8DAC6] space-y-1.5 text-[#61594E] text-xs">
                <div className="flex justify-between">
                  <span>Items Total ({totalItemCount}):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#10B981] font-bold">
                    <span>Discount ({discountPercent}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tracked Shipping:</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="pt-2 border-t border-[#EAE2D5] flex justify-between font-display font-black text-base text-[#2D2A26]">
                  <span>Total to Pay:</span>
                  <span className="text-[#E25C40]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#10B981] hover:bg-[#059669] text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer hover:scale-101 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Order • ${grandTotal.toFixed(2)}</span>
              </button>
            </form>
          </div>
        ) : (
          // Cart Items List
          <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="py-12 sm:py-16 text-center space-y-3 px-4">
                <div className="w-20 h-20 bg-[#FFF2DE] rounded-full flex items-center justify-center mx-auto border-2 border-[#F5D890] shadow-sm">
                  <DumplingGraphic type="classic" className="w-14 h-14" />
                </div>
                <p className="font-display font-black text-lg text-[#2D2A26]">Your Steamer Basket is Empty!</p>
                <p className="text-xs text-[#8C8276] max-w-xs mx-auto leading-relaxed">
                  Adopt your first slow-rising sensory squishy (Capybara, Croissant, Bao, Cat Paw) and get free collector packaging!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#E25C40] text-white font-black text-xs rounded-full cursor-pointer hover:scale-105 transition-all shadow-md mt-2"
                >
                  Explore Squishy Drop
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#E8DAC6] shadow-xs flex items-center gap-3"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] flex items-center justify-center shrink-0">
                      <DumplingGraphic type={item.product.svgArtType} className="w-11 h-11 sm:w-12 sm:h-12" />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-display font-bold text-xs sm:text-sm text-[#2D2A26] truncate">
                        {item.product.name}
                      </h5>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-[#8C8276] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#EAE2D5] truncate max-w-[120px]">
                          {item.selectedVariant.name}
                        </span>
                        {item.product.includesSteamer && (
                          <span className="text-[9px] text-[#B45309] font-bold">
                            + Steamer
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-black text-[#E25C40] mt-1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Touch Stepper (32px+ touch targets) */}
                    <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#E0D2BE] rounded-full p-1 shrink-0">
                      <button
                        onClick={() => {
                          playPopSound();
                          onUpdateQuantity(item.id, -1);
                        }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#736B60] hover:text-black hover:bg-white transition-colors cursor-pointer active:scale-90"
                        aria-label="Decrease quantity"
                      >
                        {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-[#E25C40]" /> : <Minus className="w-3.5 h-3.5" />}
                      </button>
                      <span className="w-5 text-center font-bold text-xs">{item.quantity}</span>
                      <button
                        onClick={() => {
                          playPopSound();
                          onUpdateQuantity(item.id, 1);
                        }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#736B60] hover:text-black hover:bg-white transition-colors cursor-pointer active:scale-90"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Upsell Quick-Add Strip (Mobile Responsive) */}
                <div className="mt-3 p-3 bg-[#FFF9ED] rounded-2xl border-2 border-dashed border-[#F5D890] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <DumplingGraphic type={upsellProduct.svgArtType} className="w-10 h-10 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-[#8C5E12] truncate">
                        Add {upsellProduct.name}
                      </div>
                      <div className="text-[10px] text-[#A8741A] font-semibold">
                        Only ${upsellProduct.price.toFixed(2)} • {upsellProduct.aroma}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playCelebrationChime();
                      onAddUpsell(upsellProduct);
                    }}
                    className="w-full sm:w-auto px-3.5 py-2 bg-[#8C5E12] hover:bg-black text-white rounded-xl sm:rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Quick Add (${upsellProduct.price.toFixed(2)})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Totals & Checkout Trigger (Sticky at bottom with mobile safe area) */}
        {cartItems.length > 0 && !checkoutComplete && !isCheckingOut && (
          <div className="p-4 sm:p-5 border-t border-[#E8DAC6] bg-white space-y-3 shrink-0 shadow-lg pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code (SQUISHY15)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E0D2BE] rounded-xl text-[#2D2A26] placeholder-[#A89E92] focus:outline-hidden focus:ring-2 focus:ring-[#E25C40]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2D2A26] text-white text-xs font-bold rounded-xl hover:bg-[#E25C40] transition-colors cursor-pointer shrink-0"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div
                className={`text-[11px] font-bold ${
                  promoMessage.type === 'success' ? 'text-[#10B981]' : 'text-[#E25C40]'
                }`}
              >
                {promoMessage.text}
              </div>
            )}

            {/* Price Calculation Summary */}
            <div className="space-y-1.5 text-xs text-[#61594E]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[#2D2A26]">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#10B981] font-bold">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping:</span>
                <span>{shippingCost === 0 ? <strong className="text-[#10B981]">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="pt-2 border-t border-[#EAE2D5] flex justify-between items-baseline">
                <span className="font-display font-black text-sm text-[#2D2A26]">Grand Total:</span>
                <span className="font-display font-black text-xl text-[#E25C40]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              id="cart-drawer-checkout-btn"
              onClick={handleStartCheckout}
              className="w-full py-4 bg-[#E25C40] hover:bg-[#CF492D] text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
