import React, { useState } from 'react';
import { Play, X, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { VIDEO_RAIL_CLIPS } from '../data/dumplings';
import { playPopSound, playCelebrationChime, playSquishSound } from '../utils/sound';

export const VideoRailSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<typeof VIDEO_RAIL_CLIPS[0] | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleOpenClip = (clip: typeof VIDEO_RAIL_CLIPS[0]) => {
    playCelebrationChime();
    setActiveVideo(clip);
  };

  const handleLike = (id: string) => {
    playPopSound();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 1240) + 1,
    }));
  };

  return (
    <section id="video-reels" className="py-16 sm:py-20 bg-[#FF6A00] text-white overflow-hidden border-b border-[#E85C00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Exact match to Screenshot 2 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black tracking-widest text-white/90 uppercase block mb-2">
            REAL REVEAL CLIPS
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.95]">
            What<br />
            shoppers<br />
            are opening.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-white/90 font-bold max-w-md mx-auto leading-relaxed">
            A swipeable video rail for the store hunt, first open, color reveal, and rare-pull moment.
          </p>
        </div>

        {/* Swipeable Video Cards Rail */}
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory">
          {VIDEO_RAIL_CLIPS.map((clip) => (
            <div
              key={clip.id}
              onClick={() => handleOpenClip(clip)}
              className="flex-shrink-0 w-56 sm:w-64 h-80 sm:h-96 bg-[#1A1816] rounded-3xl overflow-hidden relative group cursor-pointer shadow-xl border-2 border-white/20 hover:scale-103 transition-all snap-center flex flex-col justify-between p-4"
            >
              {/* Card visual background simulation with SVG */}
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              
              {/* Top Bar: Badge & Views */}
              <div className="relative z-10 flex items-center justify-between">
                <span className={`text-[10px] font-black text-white px-2.5 py-1 rounded-full ${clip.badgeColor} shadow-md`}>
                  {clip.badge}
                </span>
                <span className="text-[11px] font-bold text-white/80 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                  <Play className="w-3 h-3 fill-current" /> {clip.views}
                </span>
              </div>

              {/* Center Play Button Icon */}
              <div className="relative z-10 self-center w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white group-hover:scale-115 transition-transform shadow-lg">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 space-y-1">
                <span className="text-[11px] font-bold text-[#FFDF40] block">{clip.author}</span>
                <h4 className="font-display font-black text-sm text-white leading-snug">
                  {clip.title}
                </h4>
                <div className="text-[10px] text-white/70 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#FFDF40]" />
                  <span>{clip.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Playback & Slow-Rise Reveal Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm bg-[#1F1C18] rounded-3xl overflow-hidden border-2 border-[#FF6A00] shadow-2xl flex flex-col">
            
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#FFDF40]">{activeVideo.author}</span>
                <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full">{activeVideo.badge}</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 text-white/70 hover:text-white rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Viral Video Stage */}
            <div className="relative h-96 bg-gradient-to-b from-[#2D2A26] to-[#121110] flex flex-col items-center justify-center p-6 text-center">
              
              <div
                onClick={() => playSquishSound(1.3)}
                className="w-44 h-44 bg-white/5 rounded-full border-2 border-dashed border-[#FFDF40] flex flex-col items-center justify-center p-4 cursor-pointer hover:scale-105 transition-transform"
                title="Tap to squish!"
              >
                <svg viewBox="0 0 100 100" className="w-32 h-32 animate-bounce">
                  <ellipse cx="50" cy="75" rx="40" ry="15" fill="#C89B65" stroke="#734E24" strokeWidth="3" />
                  <rect x="10" y="62" width="80" height="15" fill="#DEB887" stroke="#734E24" strokeWidth="3" />
                  <path d="M 22 65 C 18 45, 32 28, 50 25 C 68 28, 82 45, 78 65 Z" fill="#FFAEC9" stroke="#734E24" strokeWidth="3.5" />
                  <circle cx="42" cy="48" r="3.5" fill="#2D2A26" />
                  <circle cx="58" cy="48" r="3.5" fill="#2D2A26" />
                  <ellipse cx="36" cy="54" rx="4" ry="2" fill="#FF7096" />
                  <ellipse cx="64" cy="54" rx="4" ry="2" fill="#FF7096" />
                </svg>
                <span className="text-[10px] text-[#FFDF40] font-bold mt-1">✨ Tap to Test Squeeze</span>
              </div>

              <div className="mt-4 text-xs font-black text-white">
                {activeVideo.title}
              </div>
              <p className="text-[11px] text-white/70 mt-1">
                "The slow rise on this is crazy!! Watch it puff back up."
              </p>
            </div>

            {/* Video Social Actions Footer */}
            <div className="p-4 bg-[#141312] flex items-center justify-between border-t border-white/10">
              <button
                onClick={() => handleLike(activeVideo.id)}
                className="flex items-center gap-1.5 text-xs text-white hover:text-[#EC4899] cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current text-[#EC4899]" />
                <span>{(likes[activeVideo.id] || 2420).toLocaleString()}</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> 184</span>
                <span className="flex items-center gap-1"><Share2 className="w-4 h-4" /> 890</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
