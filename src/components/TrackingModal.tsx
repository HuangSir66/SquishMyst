import React, { useState } from 'react';
import { X, Search, Package, CheckCircle, Truck, MapPin } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [result, setResult] = useState<{ status: string; location: string; eta: string; steps: string[] } | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    playPopSound();
    setResult({
      status: 'Out for Delivery (In Transit)',
      location: 'Regional Postal Hub, CA',
      eta: 'Tomorrow by 4:00 PM',
      steps: [
        'Order Placed & Dim Sum Steamers Packed',
        'USPS Priority Tracking Assigned (SQD-89421-US)',
        'Arrived at Sorting Facility',
        'Out for Delivery to Your Doorstep',
      ],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#1F1C18] shadow-2xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DAC6]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#FF5C38]" />
            <h3 className="font-display font-black text-xl text-[#1F1C18]">
              Track Your Dumpling Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#736B60] hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-black text-[#1F1C18] block mb-1">
              Order # or USPS Tracking Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. SQD-9042 or 9400 1000 0000"
                className="flex-1 px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DAC6] text-xs font-bold text-[#1F1C18] focus:outline-none focus:border-[#FF5C38]"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-[#1F1C18] hover:bg-[#FF5C38] text-white text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Track</span>
              </button>
            </div>
          </div>
        </form>

        {result && (
          <div className="mt-6 p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8DAC6] space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full">
                {result.status}
              </span>
              <span className="text-xs font-bold text-[#736B60]">ETA: {result.eta}</span>
            </div>

            <div className="space-y-2 pt-2">
              {result.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#2D2A26]">
                  <CheckCircle className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className={idx === result.steps.length - 1 ? 'font-black' : 'text-[#736B60]'}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-[11px] text-[#A8A29E] text-center mt-6">
          Need assistance? Email support@squishydumplings.co
        </p>

      </div>
    </div>
  );
};
