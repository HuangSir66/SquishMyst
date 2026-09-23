import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Play, Sparkles } from 'lucide-react';
import { MOCK_REVIEWS } from '../data/dumplings';
import { playPopSound } from '../utils/sound';

export const ReviewsSection: React.FC = () => {
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'photos'>('all');

  const handleHelpful = (id: string, initial: number) => {
    playPopSound();
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initial) + 1,
    }));
  };

  const videoClips = [
    {
      title: '5-Second Rebound Test 🥟',
      views: '2.4M views',
      author: '@dimsumfidgets',
      color: 'bg-[#FFE27A]',
    },
    {
      title: 'Opening The 6-Bao Steamer Feast!',
      views: '1.8M views',
      author: '@kawaiidesk',
      color: 'bg-[#FFC4D8]',
    },
    {
      title: 'Washing my squishy dumpling with soap 🧼',
      views: '920K views',
      author: '@satisfyingbao',
      color: 'bg-[#BDDFB4]',
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with overall rating summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#E25C40] bg-[#FFEDE8] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-[#FFD5CC]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Customer Love</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2D2A26] tracking-tight">
              Over 500,000+ Happy Squishers
            </h2>
            <p className="text-sm text-[#736B60] mt-1">
              Read reviews from desk workers, students, fidget enthusiasts, and dim sum lovers worldwide.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#E8DAC6] shadow-sm">
            <div className="text-center pr-4 border-r border-[#EAE2D5]">
              <div className="font-display font-black text-3xl text-[#2D2A26]">4.96</div>
              <div className="flex text-[#F59E0B] text-xs mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="text-[10px] text-[#8C8276] mt-0.5">12,400+ Total Reviews</div>
            </div>

            <div className="text-xs space-y-1 text-[#61594E]">
              <div className="flex items-center gap-2">
                <span className="w-12">5 Stars</span>
                <div className="w-24 h-2 bg-[#F2ECE1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] w-[95%]" />
                </div>
                <span className="text-[10px] font-bold">95%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12">4 Stars</span>
                <div className="w-24 h-2 bg-[#F2ECE1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] w-[4%]" />
                </div>
                <span className="text-[10px] font-bold">4%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12">3 Stars</span>
                <div className="w-24 h-2 bg-[#F2ECE1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] w-[1%]" />
                </div>
                <span className="text-[10px] font-bold">1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Viral Video Clips Carousel */}
        <div className="mb-12">
          <h3 className="font-display font-bold text-base text-[#2D2A26] mb-4 flex items-center gap-2">
            <span>🔥 Trending on TikTok & Instagram</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {videoClips.map((clip, idx) => (
              <div
                key={idx}
                className="group relative h-40 rounded-3xl overflow-hidden p-5 flex flex-col justify-between border-2 border-[#E8DAC6] shadow-xs cursor-pointer hover:shadow-md transition-all hover:scale-101"
                style={{ backgroundColor: '#FFFDF9' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E25C40] bg-white px-2.5 py-1 rounded-full border border-[#EAE2D5] shadow-xs flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" /> {clip.views}
                  </span>
                  <span className="text-xs text-[#8C8276] font-medium">{clip.author}</span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm text-[#2D2A26] group-hover:text-[#E25C40] transition-colors">
                    {clip.title}
                  </h4>
                  <p className="text-[11px] text-[#736B60] mt-0.5">Click to watch slow-rise test</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((review) => {
            const count = helpfulCounts[review.id] ?? review.helpfulCount;
            return (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-6 border-2 border-[#E8DAC6] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-[#2D2A26] border border-black/10 shadow-xs"
                        style={{ backgroundColor: review.avatarColor }}
                      >
                        {review.author[0]}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#2D2A26] flex items-center gap-1">
                          <span>{review.author}</span>
                          {review.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#8C8276]">{review.date}</span>
                      </div>
                    </div>

                    <div className="flex text-[#F59E0B]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-sm text-[#2D2A26]">
                    {review.title}
                  </h4>

                  <p className="text-xs text-[#6E6457] mt-1.5 leading-relaxed">
                    "{review.content}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {review.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[#FAF7F2] text-[#736B60] px-2 py-0.5 rounded-md border border-[#EAE2D5]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] text-[#8C8276]">
                  <span className="truncate max-w-[160px]">
                    Item: <strong>{review.productName}</strong>
                  </span>

                  <button
                    onClick={() => handleHelpful(review.id, review.helpfulCount)}
                    className="flex items-center gap-1 hover:text-[#2D2A26] transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({count})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
