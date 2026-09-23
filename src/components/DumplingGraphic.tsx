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
  // Theme palette mapping for classic dumpling skins
  const dumplingPalettes: Record<
    string,
    { body: string; shadow: string; folds: string; blush: string; cheeks: string; accent: string }
  > = {
    classic: { body: '#FFFDF9', shadow: '#EFE7D8', folds: '#D8C7B0', blush: '#FFB8B8', cheeks: '#FFA0A0', accent: '#FF8585' },
    custard: { body: '#FFF2B2', shadow: '#FCE07C', folds: '#E5C048', blush: '#FFAA77', cheeks: '#FF8844', accent: '#E69500' },
    matcha: { body: '#D8EED2', shadow: '#BDDFB4', folds: '#95C288', blush: '#FFB8B8', cheeks: '#FFA0A0', accent: '#6BA85B' },
    taro: { body: '#EADBFC', shadow: '#D2BDF2', folds: '#B090DF', blush: '#FFB0D0', cheeks: '#FA92BC', accent: '#9A62DB' },
    strawberry: { body: '#FFE0EB', shadow: '#FFC4D8', folds: '#F09CB9', blush: '#FF7B9B', cheeks: '#F5537B', accent: '#E63966' },
    charcoal: { body: '#423F3D', shadow: '#2A2726', folds: '#D4AF37', blush: '#FF7D7D', cheeks: '#FF6060', accent: '#F3C95A' },
    ghost: { body: '#E2FBEF', shadow: '#B7F1D6', folds: '#76E0AE', blush: '#80E8C4', cheeks: '#4BD8A5', accent: '#2CEAA3' },
    jumbo: { body: '#FFFDF9', shadow: '#EFE7D8', folds: '#D8C7B0', blush: '#FFB8B8', cheeks: '#FFA0A0', accent: '#FF7070' },
    blindbox: { body: '#FFE8B8', shadow: '#F4C877', folds: '#D49D3B', blush: '#FF9E9E', cheeks: '#FF7777', accent: '#9C6AD6' },
    chilioil: { body: '#FF7752', shadow: '#E04E27', folds: '#BA310C', blush: '#FFA07A', cheeks: '#FF4500', accent: '#8B0000' },
  };

  const isDark = type === 'charcoal';
  const effectiveExpression = isSquishing ? 'squished' : expression;

  // Render specific toy types
  const renderToyVisual = () => {
    switch (type) {
      // 1. CAPYBARA (水豚君 - 顶着可爱小柚子)
      case 'capybara':
        return (
          <g>
            {/* Capybara Body */}
            <rect x="40" y="55" width="120" height="95" rx="36" fill="#A87343" stroke="#784820" strokeWidth="3.5" />
            {/* Belly highlight */}
            <ellipse cx="100" cy="118" rx="42" ry="24" fill="#C49262" />
            {/* Capybara Snout */}
            <rect x="58" y="76" width="84" height="42" rx="20" fill="#885528" />
            {/* Nose Nostrils */}
            <ellipse cx="90" cy="94" rx="4" ry="6" fill="#3D200E" />
            <ellipse cx="110" cy="94" rx="4" ry="6" fill="#3D200E" />
            <path d="M 94 104 Q 100 108 106 104" stroke="#3D200E" strokeWidth="2.5" fill="none" />
            {/* Relaxed Zen Eyes */}
            {effectiveExpression === 'squished' ? (
              <g stroke="#3D200E" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M 68 76 Q 74 70 80 76" />
                <path d="M 120 76 Q 126 70 132 76" />
              </g>
            ) : (
              <g stroke="#3D200E" strokeWidth="3.5" fill="none" strokeLinecap="round">
                <line x1="68" y1="74" x2="80" y2="74" />
                <line x1="120" y1="74" x2="132" y2="74" />
              </g>
            )}
            {/* Capybara Ears */}
            <circle cx="48" cy="58" r="10" fill="#784820" />
            <circle cx="48" cy="58" r="5" fill="#C49262" />
            <circle cx="152" cy="58" r="10" fill="#784820" />
            <circle cx="152" cy="58" r="5" fill="#C49262" />
            {/* Little Yuzu Fruit on Head */}
            <g transform="translate(85, 24)">
              <circle cx="15" cy="18" r="14" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
              <ellipse cx="18" cy="6" rx="6" ry="3" fill="#16A34A" />
              <circle cx="12" cy="16" r="1.5" fill="#EAB308" />
            </g>
            {/* Rosy blush */}
            <ellipse cx="56" cy="90" rx="8" ry="5" fill="#F472B6" opacity="0.6" />
            <ellipse cx="144" cy="90" rx="8" ry="5" fill="#F472B6" opacity="0.6" />
          </g>
        );

      // 2. SHIBA INU (柴犬萌宝)
      case 'shiba':
        return (
          <g>
            {/* Shiba Pointed Ears */}
            <polygon points="44,70 60,30 84,65" fill="#E08338" stroke="#A84E10" strokeWidth="3" />
            <polygon points="48,65 60,40 76,62" fill="#FFF4E6" />
            <polygon points="156,70 140,30 116,65" fill="#E08338" stroke="#A84E10" strokeWidth="3" />
            <polygon points="152,65 140,40 124,62" fill="#FFF4E6" />
            {/* Head */}
            <ellipse cx="100" cy="102" rx="64" ry="54" fill="#E08338" stroke="#A84E10" strokeWidth="3.5" />
            {/* Shiba White Cheeks Mask */}
            <path
              d="M 50 115 C 50 140, 75 148, 100 148 C 125 148, 150 140, 150 115 C 150 95, 130 90, 100 102 C 70 90, 50 95, 50 115 Z"
              fill="#FFF8F0"
            />
            {/* White Eyebrow Dots */}
            <circle cx="75" cy="80" r="5.5" fill="#FFF8F0" />
            <circle cx="125" cy="80" r="5.5" fill="#FFF8F0" />
            {/* Nose & Cute Mouth */}
            <ellipse cx="100" cy="112" rx="6.5" ry="5" fill="#261A14" />
            <path d="M 92 118 Q 100 125 100 117 Q 100 125 108 118" stroke="#261A14" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Eyes */}
            {effectiveExpression === 'squished' ? (
              <g stroke="#261A14" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M 68 94 Q 75 88 82 94" />
                <path d="M 118 94 Q 125 88 132 94" />
              </g>
            ) : (
              <g>
                <circle cx="75" cy="94" r="5" fill="#261A14" />
                <circle cx="73" cy="92" r="1.8" fill="#FFF" />
                <circle cx="125" cy="94" r="5" fill="#261A14" />
                <circle cx="123" cy="92" r="1.8" fill="#FFF" />
              </g>
            )}
            {/* Soft pink blush */}
            <circle cx="58" cy="112" r="8" fill="#FF8BA7" opacity="0.6" />
            <circle cx="142" cy="112" r="8" fill="#FF8BA7" opacity="0.6" />
          </g>
        );

      // 3. CAT PAW (治愈粉嫩猫爪)
      case 'cat_paw':
        return (
          <g>
            {/* Big Main Paw Base */}
            <path
              d="M 50 85 C 40 135, 60 165, 100 165 C 140 165, 160 135, 150 85 C 140 45, 60 45, 50 85 Z"
              fill="#FFFDFB"
              stroke="#F3D1DC"
              strokeWidth="3.5"
            />
            {/* Central Heart Jelly Pad */}
            <path
              d="M 100 110 C 85 92, 65 106, 75 128 C 85 146, 100 152, 100 152 C 100 152, 115 146, 125 128 C 135 106, 115 92, 100 110 Z"
              fill="#FF70A6"
              stroke="#E04D84"
              strokeWidth="2.5"
            />
            {/* 4 Jelly Toe Beans */}
            <ellipse cx="60" cy="74" rx="12" ry="15" transform="rotate(-20 60 74)" fill="#FF85B3" stroke="#E04D84" strokeWidth="2" />
            <ellipse cx="86" cy="56" rx="12" ry="16" transform="rotate(-5 86 56)" fill="#FF85B3" stroke="#E04D84" strokeWidth="2" />
            <ellipse cx="114" cy="56" rx="12" ry="16" transform="rotate(5 114 56)" fill="#FF85B3" stroke="#E04D84" strokeWidth="2" />
            <ellipse cx="140" cy="74" rx="12" ry="15" transform="rotate(20 140 74)" fill="#FF85B3" stroke="#E04D84" strokeWidth="2" />
            {/* Jelly Gloss Highlighting */}
            <ellipse cx="94" cy="116" rx="6" ry="3" fill="#FFF" opacity="0.6" />
            <circle cx="84" cy="52" r="3" fill="#FFF" opacity="0.6" />
            <circle cx="112" cy="52" r="3" fill="#FFF" opacity="0.6" />
          </g>
        );

      // 4. CORGI BUTT (柯基蜜桃臀 / 萌宠)
      case 'corgi':
        return (
          <g>
            {/* Peach Round Corgi Buttocks */}
            <ellipse cx="76" cy="100" rx="38" ry="42" fill="#E69535" stroke="#B86C14" strokeWidth="3" />
            <ellipse cx="124" cy="100" rx="38" ry="42" fill="#E69535" stroke="#B86C14" strokeWidth="3" />
            {/* White Heart Fluff */}
            <path
              d="M 100 80 C 85 65, 60 75, 70 105 C 80 125, 100 138, 100 138 C 100 138, 120 125, 130 105 C 140 75, 115 65, 100 80 Z"
              fill="#FFFDF7"
              stroke="#E8DCB8"
              strokeWidth="2"
            />
            {/* Tiny Nub Tail with Heart */}
            <circle cx="100" cy="68" r="9" fill="#E69535" stroke="#B86C14" strokeWidth="2.5" />
            <circle cx="100" cy="68" r="4" fill="#FFFDF7" />
            {/* Cute Little Paws at bottom */}
            <ellipse cx="64" cy="142" rx="14" ry="9" fill="#FFFDF7" stroke="#B86C14" strokeWidth="2" />
            <ellipse cx="136" cy="142" rx="14" ry="9" fill="#FFFDF7" stroke="#B86C14" strokeWidth="2" />
            {/* Paw pads */}
            <circle cx="64" cy="142" r="3" fill="#FF85B3" />
            <circle cx="136" cy="142" r="3" fill="#FF85B3" />
          </g>
        );

      // 5. BUNNY (长耳雪兔)
      case 'bunny':
        return (
          <g>
            {/* Long Ears */}
            <ellipse cx="70" cy="40" rx="14" ry="32" transform="rotate(-10 70 40)" fill="#FFFDF9" stroke="#E5D8C5" strokeWidth="3" />
            <ellipse cx="70" cy="42" rx="7" ry="22" transform="rotate(-10 70 42)" fill="#FFB0D0" />
            <ellipse cx="130" cy="40" rx="14" ry="32" transform="rotate(10 130 40)" fill="#FFFDF9" stroke="#E5D8C5" strokeWidth="3" />
            <ellipse cx="130" cy="42" rx="7" ry="22" transform="rotate(10 130 42)" fill="#FFB0D0" />
            {/* Round Bunny Body */}
            <ellipse cx="100" cy="112" rx="55" ry="46" fill="#FFFDF9" stroke="#E5D8C5" strokeWidth="3.5" />
            {/* Rosy Cheeks */}
            <circle cx="65" cy="118" r="8" fill="#FF85B3" opacity="0.6" />
            <circle cx="135" cy="118" r="8" fill="#FF85B3" opacity="0.6" />
            {/* Eyes */}
            {effectiveExpression === 'squished' ? (
              <g stroke="#3D200E" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M 72 106 Q 80 100 88 106" />
                <path d="M 112 106 Q 120 100 128 106" />
              </g>
            ) : (
              <g fill="#3D200E">
                <ellipse cx="80" cy="106" rx="4.5" ry="5.5" />
                <circle cx="78" cy="104" r="1.6" fill="#FFF" />
                <ellipse cx="120" cy="106" rx="4.5" ry="5.5" />
                <circle cx="118" cy="104" r="1.6" fill="#FFF" />
              </g>
            )}
            {/* Bunny Y-nose mouth */}
            <polygon points="98,114 102,114 100,117" fill="#FF70A6" />
            <path d="M 96 119 Q 100 124 100 118 Q 100 124 104 119" stroke="#3D200E" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        );

      // 6. PANDA (国宝大熊猫)
      case 'panda':
        return (
          <g>
            {/* Black Ears */}
            <circle cx="55" cy="55" r="18" fill="#242120" />
            <circle cx="145" cy="55" r="18" fill="#242120" />
            {/* White Chubby Head */}
            <ellipse cx="100" cy="105" rx="58" ry="50" fill="#FFFDF9" stroke="#E2DAD0" strokeWidth="3.5" />
            {/* Black Eye Patches */}
            <ellipse cx="74" cy="98" rx="14" ry="18" transform="rotate(-15 74 98)" fill="#242120" />
            <ellipse cx="126" cy="98" rx="14" ry="18" transform="rotate(15 126 98)" fill="#242120" />
            {/* White Sparkle Eyes */}
            <circle cx="75" cy="97" r="4.5" fill="#FFF" />
            <circle cx="76" cy="98" r="2" fill="#242120" />
            <circle cx="125" cy="97" r="4.5" fill="#FFF" />
            <circle cx="124" cy="98" r="2" fill="#242120" />
            {/* Cute Black Nose & Smile */}
            <ellipse cx="100" cy="116" rx="6" ry="4" fill="#242120" />
            <path d="M 94 122 Q 100 128 106 122" stroke="#242120" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Pink Cheeks */}
            <circle cx="58" cy="118" r="7" fill="#FF85B3" opacity="0.6" />
            <circle cx="142" cy="118" r="7" fill="#FF85B3" opacity="0.6" />
            {/* Bamboo Leaf */}
            <g transform="translate(130, 115) rotate(20)">
              <ellipse cx="12" cy="0" rx="14" ry="4" fill="#22C55E" />
            </g>
          </g>
        );

      // 7. CROISSANT (法式金黄可颂牛角包)
      case 'croissant':
        return (
          <g>
            {/* Layered Golden Croissant Crescent */}
            <path
              d="M 30 115 C 20 80, 50 45, 100 45 C 150 45, 180 80, 170 115 C 155 105, 145 100, 130 110 C 115 120, 85 120, 70 110 C 55 100, 45 105, 30 115 Z"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="3.5"
            />
            {/* Butter Flaky Ridges */}
            <path d="M 75 48 C 65 70, 68 95, 70 110" stroke="#B45309" strokeWidth="3" fill="none" />
            <path d="M 125 48 C 135 70, 132 95, 130 110" stroke="#B45309" strokeWidth="3" fill="none" />
            <path d="M 100 45 C 96 75, 104 90, 100 118" stroke="#D97706" strokeWidth="2.5" fill="none" />
            {/* Shiny butter glaze highlight */}
            <ellipse cx="100" cy="62" rx="35" ry="8" fill="#FDE68A" opacity="0.8" />
            {/* Kawaii Face on Croissant */}
            <circle cx="86" cy="85" r="4" fill="#451A03" />
            <circle cx="84" cy="83" r="1.5" fill="#FFF" />
            <circle cx="114" cy="85" r="4" fill="#451A03" />
            <circle cx="112" cy="83" r="1.5" fill="#FFF" />
            <path d="M 96 92 Q 100 97 104 92" stroke="#451A03" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <circle cx="75" cy="90" r="5" fill="#F472B6" opacity="0.7" />
            <circle cx="125" cy="90" r="5" fill="#F472B6" opacity="0.7" />
          </g>
        );

      // 8. DONUT (草莓糖霜甜甜圈)
      case 'donut':
        return (
          <g>
            {/* Golden Dough Base */}
            <circle cx="100" cy="100" r="60" fill="#F59E0B" stroke="#B45309" strokeWidth="3.5" />
            {/* Strawberry Pink Icing with Drips */}
            <path
              d="M 45 100 C 45 68, 70 45, 100 45 C 130 45, 155 68, 155 100 C 150 115, 140 110, 130 125 C 120 115, 110 125, 100 115 C 90 125, 80 115, 70 125 C 60 110, 50 115, 45 100 Z"
              fill="#F472B6"
              stroke="#DB2777"
              strokeWidth="2.5"
            />
            {/* Center Hole */}
            <circle cx="100" cy="100" r="20" fill="#FFFDF9" stroke="#B45309" strokeWidth="3" />
            {/* Colorful Sprinkles */}
            <rect x="70" y="60" width="8" height="3" rx="1.5" transform="rotate(30 70 60)" fill="#60A5FA" />
            <rect x="120" y="65" width="8" height="3" rx="1.5" transform="rotate(-25 120 65)" fill="#FACC15" />
            <rect x="65" y="90" width="8" height="3" rx="1.5" transform="rotate(15 65 90)" fill="#34D399" />
            <rect x="130" y="92" width="8" height="3" rx="1.5" transform="rotate(45 130 92)" fill="#FFF" />
            <rect x="95" y="52" width="8" height="3" rx="1.5" fill="#A78BFA" />
            {/* Kawaii Face */}
            <circle cx="85" cy="78" r="3.5" fill="#831843" />
            <circle cx="115" cy="78" r="3.5" fill="#831843" />
            <path d="M 97 84 Q 100 88 103 84" stroke="#831843" strokeWidth="2" fill="none" />
          </g>
        );

      // 9. TOAST (黄油蜂蜜吐司)
      case 'toast':
        return (
          <g>
            {/* Toast Bread Crust */}
            <rect x="45" y="45" width="110" height="110" rx="28" fill="#DEB887" stroke="#8B5A2B" strokeWidth="3.5" />
            {/* Fluffy Soft White Crumb Center */}
            <rect x="54" y="54" width="92" height="92" rx="22" fill="#FFF8DC" stroke="#E6D3A3" strokeWidth="2" />
            {/* Melting Butter Cube */}
            <rect x="84" y="68" width="32" height="24" rx="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
            <path d="M 88 92 Q 100 102 112 92" fill="#FDE047" opacity="0.8" />
            {/* Kawaii Eyes & Smile */}
            <circle cx="78" cy="112" r="4" fill="#5C3A21" />
            <circle cx="76" cy="110" r="1.5" fill="#FFF" />
            <circle cx="122" cy="112" r="4" fill="#5C3A21" />
            <circle cx="120" cy="110" r="1.5" fill="#FFF" />
            <path d="M 94 122 Q 100 130 106 122" stroke="#5C3A21" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="68" cy="120" r="6" fill="#FF85B3" opacity="0.6" />
            <circle cx="132" cy="120" r="6" fill="#FF85B3" opacity="0.6" />
          </g>
        );

      // 10. PEACH (水蜜桃粉嫩解压捏捏)
      case 'peach':
        return (
          <g>
            {/* Peach Top Green Leaves */}
            <g transform="translate(100, 30)">
              <ellipse cx="-15" cy="-8" rx="18" ry="7" transform="rotate(-30)" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
              <ellipse cx="15" cy="-8" rx="18" ry="7" transform="rotate(30)" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
              <circle cx="0" cy="2" r="3" fill="#854D0E" />
            </g>
            {/* Plump Heart-shaped Peach Body */}
            <path
              d="M 100 45 C 130 30, 165 60, 160 105 C 155 145, 120 165, 100 170 C 80 165, 45 145, 40 105 C 35 60, 70 30, 100 45 Z"
              fill="#FFB5C5"
              stroke="#E06D85"
              strokeWidth="3.5"
            />
            {/* Peach Center Crease */}
            <path d="M 100 48 Q 100 95 100 135" stroke="#E06D85" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />
            {/* Yellow/Peach Gradient Tint */}
            <ellipse cx="100" cy="110" rx="35" ry="30" fill="#FFE4B5" opacity="0.45" />
            {/* Kawaii Face */}
            <circle cx="76" cy="108" r="4" fill="#4A1521" />
            <circle cx="74" cy="106" r="1.5" fill="#FFF" />
            <circle cx="124" cy="108" r="4" fill="#4A1521" />
            <circle cx="122" cy="106" r="1.5" fill="#FFF" />
            <path d="M 95 118 Q 100 124 105 118" stroke="#4A1521" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <circle cx="64" cy="116" r="7" fill="#FF4D6D" opacity="0.5" />
            <circle cx="136" cy="116" r="7" fill="#FF4D6D" opacity="0.5" />
          </g>
        );

      // 11. CHEESE (大孔瑞士奶酪芝士)
      case 'cheese':
        return (
          <g>
            {/* 3D Triangle Cheese Wedge */}
            <polygon points="35,135 165,135 155,60 100,50" fill="#FACC15" stroke="#CA8A04" strokeWidth="3.5" />
            <polygon points="100,50 155,60 165,135" fill="#EAB308" opacity="0.6" />
            {/* Cheese Holes */}
            <ellipse cx="65" cy="115" rx="14" ry="9" fill="#CA8A04" opacity="0.35" />
            <circle cx="115" cy="85" r="10" fill="#CA8A04" opacity="0.35" />
            <ellipse cx="140" cy="118" rx="8" ry="6" fill="#CA8A04" opacity="0.35" />
            <circle cx="85" cy="75" r="6" fill="#CA8A04" opacity="0.35" />
            {/* Cute Cheerful Eyes & Smile */}
            <circle cx="75" cy="98" r="4" fill="#451A03" />
            <circle cx="73" cy="96" r="1.5" fill="#FFF" />
            <circle cx="105" cy="98" r="4" fill="#451A03" />
            <circle cx="103" cy="96" r="1.5" fill="#FFF" />
            <path d="M 86 108 Q 90 114 94 108" stroke="#451A03" strokeWidth="2.2" fill="none" />
            <circle cx="62" cy="104" r="5" fill="#F472B6" opacity="0.7" />
            <circle cx="118" cy="104" r="5" fill="#F472B6" opacity="0.7" />
          </g>
        );

      // 12. BOBA (珍珠奶茶杯)
      case 'boba':
        return (
          <g>
            {/* Straw */}
            <rect x="94" y="20" width="12" height="40" rx="3" transform="rotate(-10 94 20)" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
            {/* Cup Body */}
            <path d="M 60 55 L 70 155 Q 100 165 130 155 L 140 55 Z" fill="#FBBF24" opacity="0.85" stroke="#D97706" strokeWidth="3" />
            {/* Milk Tea Foam Cap */}
            <ellipse cx="100" cy="55" rx="42" ry="12" fill="#FFFDF9" stroke="#D97706" strokeWidth="2.5" />
            {/* Black Tapioca Boba Pearls */}
            <circle cx="80" cy="140" r="7" fill="#1C1917" />
            <circle cx="98" cy="145" r="7.5" fill="#1C1917" />
            <circle cx="118" cy="138" r="7" fill="#1C1917" />
            <circle cx="88" cy="126" r="6.5" fill="#1C1917" />
            <circle cx="108" cy="128" r="6.5" fill="#1C1917" />
            {/* Kawaii Face */}
            <circle cx="85" cy="92" r="3.5" fill="#451A03" />
            <circle cx="115" cy="92" r="3.5" fill="#451A03" />
            <path d="M 97 98 Q 100 102 103 98" stroke="#451A03" strokeWidth="2" fill="none" />
          </g>
        );

      // 13. MOCHI (日式软糯麻薯大福)
      case 'mochi':
        return (
          <g>
            <ellipse cx="100" cy="110" rx="65" ry="46" fill="#DDD6FE" stroke="#A78BFA" strokeWidth="3.5" />
            <ellipse cx="100" cy="100" rx="45" ry="24" fill="#EDE9FE" />
            {/* Kawaii Face */}
            <circle cx="80" cy="108" r="4" fill="#4C1D95" />
            <circle cx="78" cy="106" r="1.5" fill="#FFF" />
            <circle cx="120" cy="108" r="4" fill="#4C1D95" />
            <circle cx="118" cy="106" r="1.5" fill="#FFF" />
            <path d="M 95 116 Q 100 122 105 116" stroke="#4C1D95" strokeWidth="2" fill="none" />
            <circle cx="68" cy="115" r="7" fill="#F472B6" opacity="0.6" />
            <circle cx="132" cy="115" r="7" fill="#F472B6" opacity="0.6" />
          </g>
        );

      // 14. DEFAULT: DIM SUM DUMPLING BAO FAMILY
      default: {
        const palette = dumplingPalettes[type] || dumplingPalettes.classic;
        return (
          <g>
            {/* Main Dumpling Plump Body */}
            <path
              d="M 100 24
                 C 125 24, 155 45, 172 75
                 C 188 102, 185 138, 160 156
                 C 136 172, 64 172, 40 156
                 C 15 138, 12 102, 28 75
                 C 45 45, 75 24, 100 24 Z"
              fill={palette.body}
              stroke={palette.shadow}
              strokeWidth="3.5"
            />
            {/* Top Pleat Crown / Swirl */}
            <path
              d="M 94 20 C 97 12, 103 12, 106 20 C 112 14, 118 18, 114 26 C 110 32, 90 32, 86 26 C 82 18, 88 14, 94 20 Z"
              fill={palette.folds}
            />
            {/* Radiating Pleats */}
            <path d="M 100 28 Q 100 65 100 95" stroke={palette.folds} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
            <path d="M 96 28 Q 75 58 60 92" stroke={palette.folds} strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 104 28 Q 125 58 140 92" stroke={palette.folds} strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 92 30 Q 52 64 36 100" stroke={palette.folds} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
            <path d="M 108 30 Q 148 64 164 100" stroke={palette.folds} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />

            {/* Expressions */}
            {effectiveExpression === 'squished' ? (
              <g stroke={isDark ? '#FFF' : '#3B2818'} strokeWidth="3.5" fill="none" strokeLinecap="round">
                <path d="M 66 112 Q 74 104 82 112" />
                <path d="M 118 112 Q 126 104 134 112" />
                <path d="M 90 126 Q 100 144 110 126 Z" fill={palette.cheeks} strokeWidth="2" />
              </g>
            ) : effectiveExpression === 'wink' ? (
              <g>
                <ellipse cx="74" cy="110" rx="6" ry="7" fill={isDark ? '#FFF' : '#3B2818'} />
                <circle cx="72" cy="108" r="2.5" fill="#FFF" />
                <path d="M 118 112 Q 126 104 134 112" stroke={isDark ? '#FFF' : '#3B2818'} strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 93 124 Q 97 130 100 125 Q 103 130 107 124" stroke={isDark ? '#FFF' : '#3B2818'} strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              <g>
                <ellipse cx="72" cy="110" rx="6" ry="7" fill={isDark ? '#FFF' : '#3B2818'} />
                <ellipse cx="128" cy="110" rx="6" ry="7" fill={isDark ? '#FFF' : '#3B2818'} />
                <circle cx="70" cy="107" r="2.4" fill="#FFFFFF" />
                <circle cx="74" cy="112" r="1.2" fill="#FFFFFF" />
                <circle cx="126" cy="107" r="2.4" fill="#FFFFFF" />
                <circle cx="130" cy="112" r="1.2" fill="#FFFFFF" />
                <path d="M 94 125 Q 100 133 106 125" stroke={isDark ? '#FFF' : '#3B2818'} strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Blush */}
            <ellipse cx="56" cy="120" rx="9" ry="6" fill={palette.blush} opacity="0.85" />
            <ellipse cx="144" cy="120" rx="9" ry="6" fill={palette.blush} opacity="0.85" />

            {/* Blindbox ? mark */}
            {type === 'blindbox' && (
              <text x="100" y="72" fontFamily="Fredoka, sans-serif" fontSize="28" fontWeight="bold" fill="#9C6AD6" textAnchor="middle" opacity="0.8">
                ?
              </text>
            )}
          </g>
        );
      }
    }
  };

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
        {/* Soft shadow base */}
        <ellipse cx="100" cy="165" rx="70" ry="12" fill="rgba(0,0,0,0.08)" />

        {/* Dynamic visual */}
        {renderToyVisual()}
      </svg>
    </div>
  );
};
