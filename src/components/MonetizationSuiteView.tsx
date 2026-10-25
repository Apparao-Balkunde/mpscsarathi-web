import React, { useState } from 'react';
import { AffiliateBook, SponsoredSlot, AdSenseCheckItem } from '../types/portal';
import { BookCoverIllustration } from './BookCoverIllustration';
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Calculator,
  Megaphone,
  ShoppingBag,
  FileCode,
} from 'lucide-react';

interface MonetizationSuiteViewProps {
  books: AffiliateBook[];
  sponsoredSlots: SponsoredSlot[];
  adsenseChecks: AdSenseCheckItem[];
  onAddBook: (book: AffiliateBook) => void;
  onUpdateSlotSponsor: (slotId: string, sponsorName: string | null) => void;
  onNavigateTab: (tab: string) => void;
  onBookClick: (bookId: string) => void;
}

export const MonetizationSuiteView: React.FC<MonetizationSuiteViewProps> = ({
  books,
  sponsoredSlots,
  adsenseChecks,
  onAddBook,
  onUpdateSlotSponsor,
  onNavigateTab,
  onBookClick,
}) => {
  // Interactive Passive Income Estimator State
  const [monthlyPageviews, setMonthlyPageviews] = useState(150000);
  const [adsenseRpmInr, setAdsenseRpmInr] = useState(95); // ₹95 per 1000 views for education niche in India
  const [affiliateCtrPercent, setAffiliateCtrPercent] = useState(3.2);
  const [affiliateConvPercent, setAffiliateConvPercent] = useState(4.5);

  // Affiliate Tag Configurator State
  const [amazonTag, setAmazonTag] = useState('mpscsarathi-21');
  const [flipkartId, setFlipkartId] = useState('mpscsarathi_fk');
  const [adsensePubId, setAdsensePubId] = useState('pub-8492017492018452');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Add New Affiliate Book Form State
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBookTitleMr, setNewBookTitleMr] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookSubject, setNewBookSubject] = useState('CSAT & Maths');
  const [newBookPrice, setNewBookPrice] = useState('460');
  const [newBookReview, setNewBookReview] = useState('');

  // Book Sponsorship Slot State
  const [bookingSlotId, setBookingSlotId] = useState<string | null>(null);
  const [newSponsorInput, setNewSponsorInput] = useState('');

  // Passive Income Math
  const estimatedAdsenseInr = Math.round((monthlyPageviews / 1000) * adsenseRpmInr);
  const monthlyAffiliateClicks = Math.round(monthlyPageviews * (affiliateCtrPercent / 100));
  const monthlyBookSales = Math.round(monthlyAffiliateClicks * (affiliateConvPercent / 100));
  const avgCommissionPerBookInr = 52; // ~9% of ₹580 avg MPSC book order
  const estimatedAffiliateInr = monthlyBookSales * avgCommissionPerBookInr;
  const bookedSponsorsInr = sponsoredSlots
    .filter((s) => s.status === 'Booked')
    .reduce((acc, s) => acc + s.monthlyRateInr, 0);
  const totalMonthlyPassiveInr = estimatedAdsenseInr + estimatedAffiliateInr + bookedSponsorsInr;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitleMr.trim() || !newBookAuthor.trim()) return;
    const priceNum = Number(newBookPrice) || 450;
    const created: AffiliateBook = {
      id: `book-${Date.now()}`,
      titleMr: newBookTitleMr.trim(),
      titleEn: newBookTitleMr.trim(),
      author: newBookAuthor.trim(),
      publisher: 'Pune Exam Prakashan',
      subject: newBookSubject,
      examRelevance: 'MPSC राज्यसेवा व कम्बाईन परीक्षेसाठी उपयुक्त संदर्भ',
      editionYear: '2026 Edition',
      pages: 560,
      mrpInr: Math.round(priceNum * 1.3),
      dealPriceInr: priceNum,
      commissionPercent: 9,
      amazonTag,
      flipkartAffId: flipkartId,
      coverTheme: 'navy',
      editorReview:
        newBookReview.trim() ||
        'स्पर्धा परीक्षेच्या नवीन अभ्यासक्रमानुसार अचूक स्पष्टीकरण आणि सराव प्रश्नांचा समावेश असलेले उपयुक्त पुस्तक.',
      monthlyClicks: 420,
    };
    onAddBook(created);
    setNewBookTitleMr('');
    setNewBookAuthor('');
    setNewBookReview('');
    setShowAddBook(false);
  };

  const adsTxtSnippet = `google.com, ${adsensePubId}, DIRECT, f08c47fec0942fa0`;

  const mediaKitPitch = `नमस्कार,
आम्ही mpscsarathi.online (आणि notes / pyq / currentaffairs सबडोमेन नेटवर्क) द्वारे दरमहा लाखो MPSC राज्यसेवा व कम्बाईन विद्यार्थ्यांपर्यंत दर्जेदार मराठी अभ्यास साहित्य पोहोचवतो.
तुमच्या अकादमीची नवीन बॅच, टेस्ट सिरीज किंवा नवीन पुस्तकाची माहिती आमच्या विद्यार्थ्यांपर्यंत पोहोचवण्यासाठी आमच्याकडे खालील Sponsored Educational Post पर्याय उपलब्ध आहेत:
1. कायमस्वरूपी १५००+ शब्दांचा शैक्षणिक प्रायोजित लेख (Main + Notes Subdomain)
2. PYQ प्रश्नपत्रिका सराव विभागातील प्रायोजकत्व (pyq.mpscsarathi.online)
3. संदर्भ पुस्तक परीक्षण व थेट खरेदी लिंक (books.mpscsarathi.online)
संपर्क: partners@mpscsarathi.online | https://mpscsarathi.online`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#9A3412]">
            MONETIZATION & PASSIVE INCOME ENGINE · MPSCSARATHI.ONLINE
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-stone-900 mt-2">
            Google AdSense अप्रूव्हल, Affiliate स्टोअर आणि Sponsored Posts
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
            केवळ एकाच उत्पन्नाच्या स्रोतावर अवलंबून न राहता <strong>१) Google AdSense Display Ads</strong>, <strong>२) Amazon/Flipkart MPSC Book Affiliate Marketing</strong>, आणि <strong>३) कोचिंग क्लासेस व प्रकाशनांचे Sponsored Posts</strong> या तिन्ही माध्यमांतून शाश्वत मासिक उत्पन्न (Passive Income) मिळवा.
          </p>
        </div>

        <div className="p-4 bg-[#1C1917] text-[#FBF9F5] rounded-lg font-mono-tabular shrink-0">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
            अंदाजित एकूण मासिक उत्पन्न (Projected Monthly)
          </span>
          <span className="text-2xl font-bold text-emerald-400">
            ₹{totalMonthlyPassiveInr.toLocaleString('en-IN')} / महिना
          </span>
        </div>
      </div>

      {/* Part 1: Interactive Passive Income Calculator + AdSense Approval Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Cols: Interactive Revenue Calculator */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-lg p-6 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="font-editorial text-xl font-semibold text-stone-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#9A3412]" />
              <span>मासिक उत्पन्नाचे गणित (Interactive Revenue Simulator)</span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              तुमच्या सर्व सबडोमेन्सवरील एकत्रित ट्रॅफिकनुसार उत्पन्नाचा अंदाज तपासा:
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-stone-700">एकूण मासिक पेजव्ह्यूज (All Subdomains Pageviews)</span>
                <span className="font-mono-tabular font-semibold text-stone-900">
                  {monthlyPageviews.toLocaleString('en-IN')} views
                </span>
              </div>
              <input
                type="range"
                min={20000}
                max={500000}
                step={10000}
                value={monthlyPageviews}
                onChange={(e) => setMonthlyPageviews(Number(e.target.value))}
                className="w-full accent-[#9A3412] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-stone-700">Google AdSense Page RPM (शैक्षणिक वेबसाईट दर / १००० व्ह्यूज)</span>
                <span className="font-mono-tabular font-semibold text-stone-900">₹{adsenseRpmInr}</span>
              </div>
              <input
                type="range"
                min={45}
                max={220}
                step={5}
                value={adsenseRpmInr}
                onChange={(e) => setAdsenseRpmInr(Number(e.target.value))}
                className="w-full accent-[#9A3412] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-stone-700">Affiliate Book CTR (%)</span>
                  <span className="font-mono-tabular font-semibold text-stone-900">{affiliateCtrPercent}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={0.2}
                  value={affiliateCtrPercent}
                  onChange={(e) => setAffiliateCtrPercent(Number(e.target.value))}
                  className="w-full accent-[#9A3412] cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-stone-700">Book Purchase Conversion (%)</span>
                  <span className="font-mono-tabular font-semibold text-stone-900">{affiliateConvPercent}%</span>
                </div>
                <input
                  type="range"
                  min={1.5}
                  max={10}
                  step={0.5}
                  value={affiliateConvPercent}
                  onChange={(e) => setAffiliateConvPercent(Number(e.target.value))}
                  className="w-full accent-[#9A3412] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3-Stream Revenue Breakdown Table */}
          <div className="pt-4 border-t border-stone-200 space-y-2.5 font-mono-tabular text-xs">
            <div className="flex items-center justify-between p-3 bg-[#FBF9F5] rounded border border-stone-200">
              <div>
                <span className="font-sans font-semibold text-stone-900 block">
                  1. Google AdSense (In-Article & Auto Ads)
                </span>
                <span className="text-stone-500">
                  {monthlyPageviews.toLocaleString('en-IN')} views × ₹{adsenseRpmInr} RPM
                </span>
              </div>
              <span className="text-base font-bold text-stone-900">
                ₹{estimatedAdsenseInr.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#FBF9F5] rounded border border-stone-200">
              <div>
                <span className="font-sans font-semibold text-stone-900 block">
                  2. Affiliate Book Sales (books.mpscsarathi.online)
                </span>
                <span className="text-stone-500">
                  {monthlyAffiliateClicks.toLocaleString('en-IN')} clicks → ~{monthlyBookSales} पुस्तक विक्री (9% कमिशन)
                </span>
              </div>
              <span className="text-base font-bold text-[#9A3412]">
                ₹{estimatedAffiliateInr.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#FBF9F5] rounded border border-stone-200">
              <div>
                <span className="font-sans font-semibold text-stone-900 block">
                  3. Sponsored Posts & Coaching Tie-Ups
                </span>
                <span className="text-stone-500">
                  {sponsoredSlots.filter((s) => s.status === 'Booked').length} Active Sponsored Slots
                </span>
              </div>
              <span className="text-base font-bold text-[#14532D]">
                ₹{bookedSponsorsInr.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Google AdSense Approval Readiness Audit & ads.txt Generator */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-lg p-6 space-y-5">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="font-editorial text-xl font-semibold text-stone-900">
              Google AdSense Approval Checklist (mpscsarathi.online)
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              "Low Value Content" रिजेक्शन टाळून पहिल्याच प्रयत्नात AdSense मिळवण्यासाठी ५ मुख्य निकष:
            </p>
          </div>

          <div className="space-y-3">
            {adsenseChecks.map((chk) => (
              <div
                key={chk.id}
                className="p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {chk.status === 'Passed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    <h4 className="text-xs font-semibold text-stone-900">{chk.title}</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-6">{chk.descriptionMr}</p>
                </div>

                <div className="pl-6 sm:pl-0 sm:text-right shrink-0 space-y-1.5">
                  <span className="block font-mono-tabular text-xs font-semibold text-stone-800">
                    {chk.metricValue}
                  </span>
                  {chk.actionButtonLabel && chk.targetTab && (
                    <button
                      onClick={() => onNavigateTab(chk.targetTab!)}
                      className="px-2.5 py-1 bg-stone-900 hover:bg-stone-700 text-white text-[11px] font-medium rounded transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {chk.actionButtonLabel}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Root ads.txt Generator */}
          <div className="pt-4 border-t border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#9A3412]" />
                <span>Root Domain ads.txt फाईल जनरेटर (mpscsarathi.online/ads.txt)</span>
              </label>
              <input
                type="text"
                value={adsensePubId}
                onChange={(e) => setAdsensePubId(e.target.value)}
                className="px-2 py-1 text-xs font-mono bg-stone-100 border border-stone-300 rounded w-48"
                aria-label="AdSense Publisher ID"
              />
            </div>
            <div className="flex items-center justify-between gap-2 p-2.5 bg-stone-900 text-stone-100 rounded font-mono text-xs">
              <span className="truncate">{adsTxtSnippet}</span>
              <button
                onClick={() => copyText(adsTxtSnippet, 'adstxt')}
                className="px-2.5 py-1 bg-stone-700 hover:bg-stone-600 text-white rounded text-[11px] shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'adstxt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'adstxt' ? 'Copied' : 'Copy ads.txt'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Affiliate Marketing Bookstore & Tracking Tag Manager */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A3412]">
              <ShoppingBag className="w-4 h-4" />
              <span>AFFILIATE BOOKSTORE ENGINE · BOOKS.MPSCSARATHI.ONLINE</span>
            </div>
            <h2 className="font-editorial text-2xl font-semibold text-stone-900 mt-1">
              MPSC संदर्भ पुस्तके Affiliate मार्केटिंग स्टोअर (८% ते १०% कमिशन)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              प्रत्येक विषयाच्या नोट्सखाली संबंधित पुस्तकाची Amazon Associates व Flipkart Affiliate लिंक दिल्याने विद्यार्थी थेट खरेदी करतात.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#FBF9F5] border border-stone-300 px-3 py-1.5 rounded text-xs">
              <span className="text-stone-500">Amazon Tag:</span>
              <input
                type="text"
                value={amazonTag}
                onChange={(e) => setAmazonTag(e.target.value)}
                className="font-mono font-semibold text-stone-900 bg-transparent focus:outline-none w-32"
              />
            </div>
            <button
              onClick={() => setShowAddBook(!showAddBook)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>नवीन Affiliate पुस्तक जोडा</span>
            </button>
          </div>
        </div>

        {/* Add New Book Collapsible Form */}
        {showAddBook && (
          <form
            onSubmit={handleCreateBook}
            className="p-5 bg-[#F4F0EA] border border-stone-300 rounded-lg grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"
          >
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-800 mb-1">पुस्तकाचे नाव (Book Title) *</label>
              <input
                type="text"
                required
                value={newBookTitleMr}
                onChange={(e) => setNewBookTitleMr(e.target.value)}
                placeholder="उदा. सुगम मराठी व्याकरण व शब्दसंग्रह - मो. रा. वाळिंबे"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-800 mb-1">लेखक / प्रकाशन *</label>
              <input
                type="text"
                required
                value={newBookAuthor}
                onChange={(e) => setNewBookAuthor(e.target.value)}
                placeholder="मो. रा. वाळिंबे"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-800 mb-1">किंमत (₹ Deal Price)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newBookPrice}
                  onChange={(e) => setNewBookPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded shrink-0 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => {
            const amzUrl = `https://www.amazon.in/s?k=${encodeURIComponent(book.titleEn)}&tag=${amazonTag}`;
            const embedCode = `<div class="mpsc-affiliate-box"><h4>${book.titleMr} (${book.author})</h4><p>${book.editorReview}</p><a href="${amzUrl}" target="_blank" rel="sponsored nofollow">Amazon वर सवलतीत पहा (₹${book.dealPriceInr})</a></div>`;
            const estCommissionInr = Math.round((book.dealPriceInr * book.commissionPercent) / 100);

            return (
              <div
                key={book.id}
                className="p-5 bg-[#FBF9F5] border border-stone-200 rounded-lg flex flex-col justify-between gap-4"
              >
                <div className="flex gap-4">
                  <div className="w-24 sm:w-28 shrink-0">
                    <BookCoverIllustration
                      theme={book.coverTheme}
                      titleMr={book.titleMr}
                      subject={book.subject}
                      author={book.author}
                      editionYear={book.editionYear}
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                      <span>{book.subject}</span>
                      <span>·</span>
                      <span>{book.pages} पृष्ठे</span>
                    </div>
                    <h3 className="font-editorial text-base sm:text-lg font-semibold text-stone-900 leading-snug">
                      {book.titleMr}
                    </h3>
                    <p className="text-xs text-stone-600">{book.author}</p>
                    <p className="text-xs text-[#9A3412] font-medium">{book.examRelevance}</p>

                    <div className="pt-1 flex flex-wrap items-baseline gap-3 font-mono-tabular">
                      <span className="text-lg font-bold text-stone-900">₹{book.dealPriceInr}</span>
                      <span className="text-xs text-stone-400 line-through">MRP ₹{book.mrpInr}</span>
                      <span className="text-xs text-emerald-800 font-semibold">
                        कमिशन: ₹{estCommissionInr}/प्रत ({book.commissionPercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed border-t border-stone-200/80 pt-3">
                  {book.editorReview}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/80">
                  <div className="flex items-center gap-2">
                    <a
                      href={amzUrl}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      onClick={() => onBookClick(book.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors"
                    >
                      <span>Amazon Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => copyText(embedCode, book.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-medium rounded transition-colors cursor-pointer"
                    >
                      {copiedKey === book.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Widget Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy HTML Box</span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-[11px] font-mono-tabular text-stone-500">
                    {book.monthlyClicks.toLocaleString('en-IN')} clicks/mo
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 3: Sponsored Posts & Coaching Rate Card Manager */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#14532D]">
              <Megaphone className="w-4 h-4" />
              <span>SPONSORED POSTS & COACHING TIE-UPS · DIRECT REVENUE</span>
            </div>
            <h2 className="font-editorial text-2xl font-semibold text-stone-900 mt-1">
              प्रायोजित लेख (Sponsored Posts) व जाहिरात स्लॉट व्यवस्थापन
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              पुणे, छत्रपती संभाजीनगर, नाशिक व नागपूरमधील MPSC कोचिंग क्लासेस, टेस्ट सिरीज आणि पुस्तक प्रकाशकांना तुमचा स्पॉन्सरशिप रेट कार्ड पाठवा:
            </p>
          </div>

          <button
            onClick={() => copyText(mediaKitPitch, 'mediakit')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-medium rounded-md transition-colors cursor-pointer shrink-0 whitespace-nowrap"
          >
            {copiedKey === 'mediakit' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>मराठी स्पॉन्सरशिप पिच कॉपी झाले!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Coaching Sponsorship Pitch (WhatsApp/Email)</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsoredSlots.map((slot) => (
            <div
              key={slot.id}
              className="p-5 bg-[#FBF9F5] border border-stone-200 rounded-lg flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono pb-2 border-b border-stone-200">
                  <span className="text-stone-600 truncate">{slot.subdomainTarget}</span>
                  <span
                    className={`font-semibold shrink-0 ${
                      slot.status === 'Booked' ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {slot.status === 'Booked' ? 'Status: Booked (Active)' : 'Status: Available for Booking'}
                  </span>
                </div>

                <h3 className="font-editorial text-lg font-semibold text-stone-900 mt-3">{slot.slotName}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{slot.placementLocation}</p>

                <ul className="mt-3 space-y-1.5 text-xs text-stone-700">
                  {slot.deliverables.map((d, idx) => (
                    <li key={idx}>• {d}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono-tabular">
                  <span className="text-xs text-stone-500 block">मासिक दर (Rate Card)</span>
                  <span className="text-base font-bold text-stone-900">
                    ₹{slot.monthlyRateInr.toLocaleString('en-IN')} / महिना
                  </span>
                </div>

                {slot.status === 'Booked' ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-700 font-medium truncate max-w-[180px]">
                      प्रायोजक: {slot.currentSponsor}
                    </span>
                    <button
                      onClick={() => onUpdateSlotSponsor(slot.id, null)}
                      className="px-2.5 py-1 text-[11px] bg-stone-200 hover:bg-stone-300 text-stone-800 rounded cursor-pointer"
                    >
                      Mark Available
                    </button>
                  </div>
                ) : bookingSlotId === slot.id ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newSponsorInput}
                      onChange={(e) => setNewSponsorInput(e.target.value)}
                      placeholder="अकादमी / प्रकाशनाचे नाव..."
                      className="px-2.5 py-1 text-xs bg-white border border-stone-300 rounded w-40"
                    />
                    <button
                      onClick={() => {
                        if (newSponsorInput.trim()) {
                          onUpdateSlotSponsor(slot.id, newSponsorInput.trim());
                          setBookingSlotId(null);
                          setNewSponsorInput('');
                        }
                      }}
                      className="px-2.5 py-1 bg-[#9A3412] text-white text-xs rounded cursor-pointer"
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setBookingSlotId(slot.id)}
                    className="px-3 py-1.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-medium rounded transition-colors cursor-pointer"
                  >
                    + प्रायोजक जोडा (Assign Sponsor)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
