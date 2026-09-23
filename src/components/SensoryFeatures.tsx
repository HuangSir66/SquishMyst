import React from 'react';
import { Sparkles, Clock, ShieldCheck, HeartHandshake, Smile, Droplets } from 'lucide-react';

export const SensoryFeatures: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: '4.8s Ultra Slow-Rise TPR',
      desc: 'Formulated with dense memory micro-cells that compress smoothly and slowly inflate back to plump perfection.',
      color: 'bg-[#FFF3D6] text-[#8C5E12] border-[#F5D890]',
    },
    {
      icon: Droplets,
      title: '100% Washable & Dust-Proof',
      desc: 'Gathers dust on your desk? Rinse under lukewarm water with mild soap and dust with cornstarch to restore silky matte grip.',
      color: 'bg-[#E1F7EC] text-[#0D6838] border-[#BAEDD3]',
    },
    {
      icon: ShieldCheck,
      title: 'Safe, Non-Toxic & Hypoallergenic',
      desc: '100% BPA-free, Phthalate-free, and Latex-free. Strictly tested for skin-friendly daily sensory fidgeting.',
      color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    },
    {
      icon: Sparkles,
      title: 'Collectible Bamboo Steamer Included',
      desc: 'Every bao arrives nested in its own authentic mini bamboo steamer basket with a fitted lid for charming desk display.',
      color: 'bg-[#FFEDE8] text-[#B8381D] border-[#FFD5CC]',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFF8EE] text-[#8C410F] px-4 py-1.5 rounded-full border border-[#D8C7B0] text-xs font-extrabold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#E25C40]" />
            <span>The Squishy Dumpling Difference</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2D2A26] tracking-tight">
            Crafted for Sensory Happiness
          </h2>
          <p className="text-sm text-[#736B60] mt-2">
            Why our dumplings went viral across TikTok & Instagram: unmatched tactile craftsmanship and irresistible charm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border-2 border-[#E8DAC6] shadow-sm hover:shadow-md transition-all hover:scale-102 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#2D2A26] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#736B60] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
