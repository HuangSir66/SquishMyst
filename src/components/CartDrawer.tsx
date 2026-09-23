import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag, Check, Truck, ShieldCheck, Heart } from 'lucide-react';
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

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 45;
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l-2 border-[#E8DAC6] shadow-2xl flex flex-col justify-between">
          
          {/* Top Bar Header */}
          <div className="p-5 border-b border-[#E8DAC6] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E25C40]" />
              <h3 className="font-display font-extrabold text-lg text-[#2D2A26]">
                Your Steamer Basket ({cartItems.reduce((a, c) => a + c.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#736B60] hover:text-black rounded-full hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FFF8EE] p-3.5 border-b border-[#F0E6D8] text-xs">
            <div className="flex items-center justify-between mb-1.5 font-bold text-[#2D2A26]">
              {amountNeededForFreeShipping > 0 ? (
                <span className="flex items-center gap-1.5 text-[#8C5E12]">
                  <Truck className="w-4 h-4 text-[#E25C40]" />
                  Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more for FREE Shipping!
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[#10B981]">
                  <Sparkles className="w-4 h-4 text-[#10B981]" />
                  🎉 You unlocked <strong>FREE US Delivery & Steamer Basket!</strong>
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

          {/* Main Content: Checkout Flow vs Item List */}
          {checkoutComplete ? (
            // Order Success View
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-[#E1F7EC] text-[#10B981] flex items-center justify-center shadow-md animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h4 className="font-display font-black text-2xl text-[#2D2A26]">
                Order Confirmed! 🥟
              </h4>

              <p className="text-xs text-[#61594E] max-w-xs leading-relaxed">
                Thank you, <strong>{customerName}</strong>! Your slow-rising squishy dumplings are being gently packed into their bamboo steamers and dispatched to:
              </p>

              <div className="bg-white p-3 rounded-2xl border border-[#E8DAC6] text-xs text-[#2D2A26] font-medium w-full text-left">
                <p>📍 {shippingAddress}</p>
                <p className="text-[#8C8276] text-[10px] mt-1">Order #SQ-{Math.floor(100000 + Math.random() * 900000)} • Standard Tracked (3-5 Days)</p>
              </div>

              <button
                onClick={handleFinishAndReset}
                className="w-full py-3.5 bg-[#2D2A26] hover:bg-[#E25C40] text-white rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Continue Squishing
              </button>
            </div>
          ) : isCheckingOut ? (
            // Checkout Form Step
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DAC6]">
                <h4 className="font-display font-bold text-base text-[#2D2A26]">
                  Express Checkout
                </h4>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#E25C40] font-bold hover:underline"
                >
                  &larr; Back to cart
                </button>
              </div>

              <form onSubmit={handleConfirmOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#4A443D] font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#D8C7B0] focus:ring-2 focus:ring-[#E25C40] focus:outline-none text-[#2D2A26]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A443D] font-bold mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#D8C7B0] focus:ring-2 focus:ring-[#E25C40] focus:outline-none text-[#2D2A26]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A443D] font-bold mb-1">Payment Method (Simulated)</label>
                  <div className="p-3 bg-white rounded-xl border border-[#10B981] flex items-center justify-between font-bold text-[#0D6838]">
                    <span>🔒 Apple Pay / Credit Card Ready</span>
                    <span>$0.00 Test Fee</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DAC6] space-y-1 text-[#61594E]">
                  <div className="flex justify-between">
                    <span>Items Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#10B981] font-bold">
                      <span>Discount ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="pt-2 border-t border-[#EAE2D5] flex justify-between font-black text-sm text-[#2D2A26]">
                    <span>Grand Total:</span>
                    <span className="text-[#E25C40]">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#10B981] hover:bg-[#059669] text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer hover:scale-102 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order • ${grandTotal.toFixed(2)}</span>
                </button>
              </form>
            </div>
          ) : (
            // Cart Items List
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-16 h-16 bg-[#FFF2DE] rounded-full flex items-center justify-center mx-auto border border-[#F5D890]">
                    <DumplingGraphic type="classic" className="w-12 h-12" />
                  </div>
                  <p className="font-display font-bold text-base text-[#2D2A26]">Your Steamer is Empty!</p>
                  <p className="text-xs text-[#8C8276] max-w-xs mx-auto">
                    Adopt your first slow-rising bao and enjoy free bamboo steamer packaging!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#E25C40] text-white font-bold text-xs rounded-full cursor-pointer hover:scale-105 transition-all shadow-xs"
                  >
                    Browse Dumplings
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3.5 rounded-2xl border border-[#E8DAC6] shadow-xs flex items-center gap-3.5"
                    >
                      <div className="w-14 h-14 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] flex items-center justify-center shrink-0">
                        <DumplingGraphic type={item.product.svgArtType} className="w-12 h-12" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-display font-bold text-xs text-[#2D2A26] truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[10px] text-[#8C8276] truncate">
                          Style: {item.selectedVariant.name}
                        </p>
                        <div className="text-xs font-black text-[#E25C40] mt-0.5">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E0D2BE] rounded-full p-1">
                        <button
                          onClick={() => {
                            playPopSound();
                            onUpdateQuantity(item.id, -1);
                          }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#736B60] hover:text-black cursor-pointer"
                        >
                          {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-[#E25C40]" /> : <Minus className="w-3 h-3" />}
                        </button>
                        <span className="w-4 text-center font-bold text-xs">{item.quantity}</span>
                        <button
                          onClick={() => {
                            playPopSound();
                            onUpdateQuantity(item.id, 1);
                          }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#736B60] hover:text-black cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Upsell Quick-Add Strip */}
                  <div className="mt-4 p-3.5 bg-[#FFF9ED] rounded-2xl border-2 border-dashed border-[#F5D890] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <DumplingGraphic type={upsellProduct.svgArtType} className="w-10 h-10 shrink-0" />
                      <div>
                        <div className="text-[11px] font-bold text-[#8C5E12]">
                          Add {upsellProduct.name.split(' ')[0]} {upsellProduct.name.split(' ')[1]}
                        </div>
                        <div className="text-[10px] text-[#A8741A] font-semibold">
                          Only ${upsellProduct.price}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playCelebrationChime();
                        onAddUpsell(upsellProduct);
                      }}
                      className="px-3 py-1.5 bg-[#8C5E12] hover:bg-black text-white rounded-full text-[10px] font-bold transition-all shrink-0 cursor-pointer"
                    >
                      + Quick Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Totals & Checkout Trigger */}
          {cartItems.length > 0 && !checkoutComplete && !isCheckingOut && (
            <div className="p-5 border-t border-[#E8DAC6] bg-white space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. SQUISHY15)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E0D2BE] rounded-xl text-[#2D2A26] placeholder-[#A89E92] focus:outline-none focus:ring-2 focus:ring-[#E25C40]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2D2A26] text-white text-xs font-bold rounded-xl hover:bg-[#E25C40] transition-colors cursor-pointer"
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

              {/* Price Calculation */}
              <div className="space-y-1 text-xs text-[#61594E]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#10B981] font-bold">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="pt-2 border-t border-[#EAE2D5] flex justify-between font-display font-black text-lg text-[#2D2A26]">
                  <span>Total:</span>
                  <span className="text-[#E25C40]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="cart-drawer-checkout-btn"
                onClick={handleStartCheckout}
                className="w-full py-4 bg-[#E25C40] hover:bg-[#CF492D] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
