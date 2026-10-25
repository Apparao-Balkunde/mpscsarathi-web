import React from 'react';

interface BookCoverProps {
  theme: 'navy' | 'terracotta' | 'forest' | 'bronze';
  titleMr: string;
  subject: string;
  author: string;
  editionYear: string;
}

export const BookCoverIllustration: React.FC<BookCoverProps> = ({
  theme,
  titleMr,
  subject,
  author,
  editionYear,
}) => {
  const themeStyles = {
    navy: {
      bg: 'bg-[#172554]',
      spine: 'bg-[#0F172A]',
      border: 'border-[#D4AF37]/40',
      accentText: 'text-[#FDE68A]',
      badgeText: 'text-[#93C5FD]',
    },
    terracotta: {
      bg: 'bg-[#7C2D12]',
      spine: 'bg-[#431407]',
      border: 'border-[#FDBA74]/35',
      accentText: 'text-[#FFEDD5]',
      badgeText: 'text-[#FDBA74]',
    },
    forest: {
      bg: 'bg-[#14532D]',
      spine: 'bg-[#052E16]',
      border: 'border-[#86EFAC]/35',
      accentText: 'text-[#DCFCE7]',
      badgeText: 'text-[#86EFAC]',
    },
    bronze: {
      bg: 'bg-[#451A03]',
      spine: 'bg-[#290F02]',
      border: 'border-[#FCD34D]/35',
      accentText: 'text-[#FEF3C7]',
      badgeText: 'text-[#FDE68A]',
    },
  }[theme];

  return (
    <div
      className={`relative w-full aspect-[3/4] ${themeStyles.bg} rounded-r-md rounded-l-xs overflow-hidden shadow-md flex select-none border border-stone-900/20`}
      role="img"
      aria-label={`${titleMr} - ${author}`}
    >
      {/* Book Spine Binding */}
      <div className={`w-4 h-full ${themeStyles.spine} border-r border-white/15 shrink-0 flex flex-col justify-between py-4 items-center`}>
        <div className="w-full h-px bg-white/20" />
        <div className="w-full h-px bg-white/20" />
      </div>

      {/* Main Cover Frame */}
      <div className="flex-1 p-4 flex flex-col justify-between relative">
        <div className={`inset-2.5 border ${themeStyles.border} pointer-events-none flex-1 flex flex-col justify-between p-3`}>
          {/* Top Kicker */}
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <span className={`text-[10px] uppercase tracking-widest font-mono ${themeStyles.badgeText}`}>
              {subject}
            </span>
            <span className="text-[10px] font-mono text-white/70">{editionYear}</span>
          </div>

          {/* Center Emblem & Title */}
          <div className="my-auto py-2">
            <svg
              className={`w-7 h-7 mb-2.5 ${themeStyles.accentText} opacity-80`}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.2" />
              <path d="M16 3V29M3 16H29" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" />
            </svg>
            <h4 className={`font-editorial text-sm sm:text-base font-semibold leading-snug ${themeStyles.accentText} line-clamp-3`}>
              {titleMr}
            </h4>
          </div>

          {/* Author Footer */}
          <div className="border-t border-white/15 pt-2">
            <p className="text-[11px] text-white/85 font-medium truncate">{author}</p>
            <p className="text-[9px] uppercase tracking-wider text-white/50 mt-0.5">
              MPSC प्रमाण संदर्भ ग्रंथ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditorialStudyDeskGraphic: React.FC<{ activeHost: string }> = ({ activeHost }) => {
  return (
    <div className="relative w-full h-full min-h-[320px] bg-[#1C1917] text-[#FBF9F5] rounded-lg overflow-hidden border border-stone-800 p-6 sm:p-8 flex flex-col justify-between">
      {/* Subtle Architectural Grid SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="editorial-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D6CEBE" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#editorial-grid)" />
      </svg>

      {/* Top Archival Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-stone-700/80 pb-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#D6CEBE] font-mono">
            DOMAIN ARCHITECTURE · LIVE NODE
          </p>
          <p className="text-sm font-mono text-amber-200/90 mt-1">https://{activeHost}</p>
        </div>
        <div className="text-right font-mono-tabular">
          <span className="text-xs text-stone-400">SSL / DNS</span>
          <p className="text-xs text-emerald-300 font-medium">TLS 1.3 Verified</p>
        </div>
      </div>

      {/* Center Subdomain Tree Diagram */}
      <div className="relative z-10 my-6 space-y-3">
        <div className="text-xs uppercase tracking-wider text-stone-400">
          Connected Subdomain Content Network
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { sub: 'notes.mpscsarathi.online', label: 'GS I–IV सखोल मराठी नोट्स', count: '86 पेजेस' },
            { sub: 'pyq.mpscsarathi.online', label: '२०१३–२०२५ प्रश्नपत्रिका विश्लेषण', count: '64 पेजेस' },
            { sub: 'currentaffairs.mpscsarathi.online', label: 'दैनंदिन चालू घडामोडी व योजना', count: '118 पेजेस' },
            { sub: 'books.mpscsarathi.online', label: 'संदर्भ पुस्तके (Affiliate Store)', count: '29 पेजेस' },
          ].map((item) => {
            const isCurrent = activeHost === item.sub;
            return (
              <div
                key={item.sub}
                className={`p-3 rounded border transition-colors ${
                  isCurrent
                    ? 'bg-[#9A3412]/30 border-amber-400/60 text-white'
                    : 'bg-stone-900/90 border-stone-800 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-amber-200 truncate">{item.sub}</span>
                  <span className="font-mono-tabular text-[11px] text-stone-400 shrink-0">{item.count}</span>
                </div>
                <p className="text-xs text-stone-300 mt-1">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Monetization & AdSense Readiness Strip */}
      <div className="relative z-10 pt-4 border-t border-stone-700/80 grid grid-cols-3 gap-4 font-mono-tabular">
        <div>
          <p className="text-[11px] text-stone-400">एकूण संपादकीय लेख</p>
          <p className="text-lg font-semibold text-[#FBF9F5]">339 Pages</p>
        </div>
        <div>
          <p className="text-[11px] text-stone-400">सरासरी शब्दसंख्या</p>
          <p className="text-lg font-semibold text-amber-300">1,560+ Words</p>
        </div>
        <div>
          <p className="text-[11px] text-stone-400">उत्पन्न स्रोत (Streams)</p>
          <p className="text-lg font-semibold text-emerald-300">AdSense + Affiliate + Sponsor</p>
        </div>
      </div>
    </div>
  );
};
