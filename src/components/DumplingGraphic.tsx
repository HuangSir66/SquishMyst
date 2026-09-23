import React from 'react';

interface DumplingGraphicProps {
  type: string;
  className?: string;
  squishScaleX?: number;
  squishScaleY?: number;
  squishRotation?: number;
  isSquishing?: boolean;
  expression?: 'happy' | 'squished' | 'wink' | 'sleepy' | 'shocked' | 'sparkle';
  showSteamer?: boolean;
}

export const DumplingGraphic: React.FC<DumplingGraphicProps> = ({
  type,
  className = 'w-32 h-32',
  squishScaleX = 1,
  squishScaleY = 1,
  squishRotation = 0,
  isSquishing = false,
  expression = 'happy',
  showSteamer = false,
}) => {
  // Theme palette mapping for dumpling skins
  const palettes: Record<string, { body: string; shadow: string; folds: string; blush: string; cheeks: string; accent: string }> = {
    classic: {
      body: '#FFFDF9',
      shadow: '#EFE7D8',
      folds: '#D8C7B0',
      blush: '#FFB8B8',
      cheeks: '#FFA0A0',
      accent: '#FF8585',
    },
    custard: {
      body: '#FFF2B2',
      shadow: '#FCE07C',
      folds: '#E5C048',
      blush: '#FFAA77',
      cheeks: '#FF8844',
      accent: '#E69500',
    },
    matcha: {
      body: '#D8EED2',
      shadow: '#BDDFB4',
      folds: '#95C288',
      blush: '#FFB8B8',
      cheeks: '#FFA0A0',
      accent: '#6BA85B',
    },
    taro: {
      body: '#EADBFC',
      shadow: '#D2BDF2',
      folds: '#B090DF',
      blush: '#FFB0D0',
      cheeks: '#FA92BC',
      accent: '#9A62DB',
    },
    strawberry: {
      body: '#FFE0EB',
      shadow: '#FFC4D8',
      folds: '#F09CB9',
      blush: '#FF7B9B',
      cheeks: '#F5537B',
      accent: '#E63966',
    },
    charcoal: {
      body: '#423F3D',
      shadow: '#2A2726',
      folds: '#D4AF37', // Gold trimmed
      blush: '#FF7D7D',
      cheeks: '#FF6060',
      accent: '#F3C95A',
    },
    ghost: {
      body: '#E2FBEF',
      shadow: '#B7F1D6',
      folds: '#76E0AE',
      blush: '#80E8C4',
      cheeks: '#4BD8A5',
      accent: '#2CEAA3',
    },
    jumbo: {
      body: '#FFFDF9',
      shadow: '#EFE7D8',
      folds: '#D8C7B0',
      blush: '#FFB8B8',
      cheeks: '#FFA0A0',
      accent: '#FF7070',
    },
    blindbox: {
      body: '#FFE8B8',
      shadow: '#F4C877',
      folds: '#D49D3B',
      blush: '#FF9E9E',
      cheeks: '#FF7777',
      accent: '#9C6AD6',
    },
    chilioil: {
      body: '#FF7752',
      shadow: '#E04E27',
      folds: '#BA310C',
      blush: '#FFA07A',
      cheeks: '#FF4500',
      accent: '#8B0000',
    },
  };

  const currentPalette = palettes[type] || palettes.classic;
  const isDark = type === 'charcoal';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Optional Steamer Base underneath */}
      {showSteamer && (
        <div className="absolute -bottom-4 w-[115%] h-[40%] bg-[#D7A86E] border-2 border-[#8C5E32] rounded-full shadow-md z-0 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#D7A86E_0px,#D7A86E_12px,#C28F54_12px,#C28F54_14px)] opacity-80" />
          <div className="absolute inset-0 bg-black/5" />
        </div>
      )}

      {/* SVG Container with transform physics */}
      <svg
        viewBox="0 0 200 180"
        className="w-full h-full filter drop-shadow-sm transition-transform duration-100 ease-out z-10"
        style={{
          transform: `scale(${squishScaleX}, ${squishScaleY}) rotate(${squishRotation}deg)`,
          transformOrigin: 'bottom center',
        }}
      >
        <defs>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={currentPalette.body} />
            <stop offset="85%" stopColor={currentPalette.body} />
            <stop offset="100%" stopColor={currentPalette.shadow} />
          </linearGradient>
          <radialGradient id={`glow-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A8FEE1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#76E0AE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow halo for ghost type */}
        {type === 'ghost' && (
          <ellipse cx="100" cy="100" rx="90" ry="75" fill={`url(#glow-${type})`} className="animate-pulse" />
        )}

        {/* Soft shadow base */}
        <ellipse cx="100" cy="165" rx="70" ry="12" fill="rgba(0,0,0,0.08)" />

        {/* Main Dumpling Plump Body */}
        <path
          d="M 100 24
             C 125 24, 155 45, 172 75
             C 188 102, 185 138, 160 156
             C 136 172, 64 172, 40 156
             C 15 138, 12 102, 28 75
             C 45 45, 75 24, 100 24 Z"
          fill={`url(#grad-${type})`}
          stroke={currentPalette.shadow}
          strokeWidth="3"
        />

        {/* Top Pleat Crown / Swirl */}
        <path
          d="M 94 20 C 97 12, 103 12, 106 20 C 112 14, 118 18, 114 26 C 110 32, 90 32, 86 26 C 82 18, 88 14, 94 20 Z"
          fill={currentPalette.folds}
        />

        {/* Characteristic Dim Sum Pleat Lines radiating from top */}
        <path
          d="M 100 28 Q 100 65 100 95"
          stroke={currentPalette.folds}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M 96 28 Q 75 58 60 92"
          stroke={currentPalette.folds}
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 104 28 Q 125 58 140 92"
          stroke={currentPalette.folds}
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 92 30 Q 52 64 36 100"
          stroke={currentPalette.folds}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
        <path
          d="M 108 30 Q 148 64 164 100"
          stroke={currentPalette.folds}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* Cute Face Expressions */}
        {isSquishing || expression === 'squished' ? (
          // Squished / Ecstatic Closed Happy Eyes
          <g>
            <path
              d="M 66 112 Q 74 104 82 112"
              stroke={isDark ? '#FFF' : '#3B2818'}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 118 112 Q 126 104 134 112"
              stroke={isDark ? '#FFF' : '#3B2818'}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Open Happy "D" Mouth */}
            <path
              d="M 90 126 Q 100 144 110 126 Z"
              fill={currentPalette.cheeks}
              stroke={isDark ? '#FFF' : '#3B2818'}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>
        ) : expression === 'wink' ? (
          // Winking face
          <g>
            <ellipse cx="74" cy="110" rx="6" ry="7" fill={isDark ? '#FFF' : '#3B2818'} />
            <circle cx="72" cy="108" r="2.5" fill="#FFF" />
            <path
              d="M 118 112 Q 126 104 134 112"
              stroke={isDark ? '#FFF' : '#3B2818'}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cute cat mouth */}
            <path
              d="M 93 124 Q 97 130 100 125 Q 103 130 107 124"
              stroke={isDark ? '#FFF' : '#3B2818'}
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : expression === 'sleepy' ? (
          // Sleepy / Zen face
          <g>
            <path
              d="M 68 112 Q 74 118 80 112"
              stroke={isDark ? '#FFF' : '#3B2818'}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 120 112 Q 126 118 132 112"
              stroke={isDark ? '#FFF' : '#3B2818'}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="100" cy="126" r="3" fill={currentPalette.cheeks} />
          </g>
        ) : expression === 'shocked' ? (
          // Shocked cute O mouth
          <g>
            <circle cx="74" cy="108" r="6" fill={isDark ? '#FFF' : '#3B2818'} />
            <circle cx="126" cy="108" r="6" fill={isDark ? '#FFF' : '#3B2818'} />
            <circle cx="72" cy="106" r="2.5" fill="#FFF" />
            <circle cx="124" cy="106" r="2.5" fill="#FFF" />
            <ellipse cx="100" cy="128" rx="6" ry="9" fill={currentPalette.cheeks} stroke={isDark ? '#FFF' : '#3B2818'} strokeWidth="2" />
          </g>
        ) : (
          // Default ultra-cute shiny boba eyes & warm smile
          <g>
            <ellipse cx="72" cy="110" rx="6" ry="7" fill={isDark ? '#FFF' : '#3B2818'} />
            <ellipse cx="128" cy="110" rx="6" ry="7" fill={isDark ? '#FFF' : '#3B2818'} />
            {/* Sparkle highlights in eyes */}
            <circle cx="70" cy="107" r="2.4" fill="#FFFFFF" />
            <circle cx="74" cy="112" r="1.2" fill="#FFFFFF" />
            <circle cx="126" cy="107" r="2.4" fill="#FFFFFF" />
            <circle cx="130" cy="112" r="1.2" fill="#FFFFFF" />

            {/* Cute smile */}
            <path
              d="M 94 125 Q 100 133 106 125"
              stroke={isDark ? '#FFF' : '#3B2818'}
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* Rosy Blush Cheeks */}
        <ellipse cx="56" cy="120" rx="9" ry="6" fill={currentPalette.blush} opacity="0.85" />
        <ellipse cx="144" cy="120" rx="9" ry="6" fill={currentPalette.blush} opacity="0.85" />

        {/* Special details for specific types */}
        {type === 'charcoal' && (
          // Gold flake sparkles
          <g fill="#FBD561">
            <polygon points="100,50 102,56 108,58 102,60 100,66 98,60 92,58 98,56" opacity="0.9" />
            <polygon points="145,75 146,79 150,80 146,81 145,85 144,81 140,80 144,79" opacity="0.8" />
          </g>
        )}

        {type === 'strawberry' && (
          // Tiny strawberry seeds/hearts
          <g fill="#E63966" opacity="0.6">
            <path d="M 45 90 Q 47 88 49 90 Q 51 92 49 94 Q 47 96 45 94 Z" transform="scale(0.8)" />
            <path d="M 180 90 Q 182 88 184 90 Q 186 92 184 94 Q 182 96 180 94 Z" transform="scale(0.8)" />
          </g>
        )}

        {type === 'blindbox' && (
          // Mystery Question Mark
          <text
            x="100"
            y="72"
            fontFamily="Fredoka, sans-serif"
            fontSize="28"
            fontWeight="bold"
            fill="#9C6AD6"
            textAnchor="middle"
            opacity="0.7"
          >
            ?
          </text>
        )}
      </svg>
    </div>
  );
};
