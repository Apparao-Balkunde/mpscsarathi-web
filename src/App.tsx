import React, { useState, useMemo } from 'react';
import {
  SubdomainKey,
  SubdomainNode,
  StudyArticle,
  AffiliateBook,
  SponsoredSlot,
} from './types/portal';
import {
  INITIAL_SUBDOMAINS,
  INITIAL_ARTICLES,
  INITIAL_BOOKS,
  INITIAL_SPONSORED_SLOTS,
  INITIAL_ADSENSE_CHECKS,
} from './data/mpscData';
import { BookCoverIllustration, EditorialStudyDeskGraphic } from './components/BookCoverIllustration';
import { ArticleReaderView } from './components/ArticleReaderView';
import { SubdomainHubView } from './components/SubdomainHubView';
import { MonetizationSuiteView } from './components/MonetizationSuiteView';
import { CompliancePagesView } from './components/CompliancePagesView';
import { ContentPublisherModal } from './components/ContentPublisherModal';
import { Search, ArrowRight, ExternalLink, FileEdit, Plus } from 'lucide-react';

type ActiveTab = 'editorial' | 'subdomains' | 'bookstore' | 'monetization' | 'compliance';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('editorial');
  const [activeSubdomain, setActiveSubdomain] = useState<SubdomainKey | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Core Application State
  const [subdomains, setSubdomains] = useState<SubdomainNode[]>(INITIAL_SUBDOMAINS);
  const [articles, setArticles] = useState<StudyArticle[]>(INITIAL_ARTICLES);
  const [books, setBooks] = useState<AffiliateBook[]>(INITIAL_BOOKS);
  const [sponsoredSlots, setSponsoredSlots] = useState<SponsoredSlot[]>(INITIAL_SPONSORED_SLOTS);

  // Reader & Publisher Modal State
  const [readingArticleId, setReadingArticleId] = useState<string | null>(null);
  const [isPublisherOpen, setIsPublisherOpen] = useState(false);
  const [publisherSubdomain, setPublisherSubdomain] = useState<SubdomainKey>('notes');
  const [editingArticle, setEditingArticle] = useState<StudyArticle | null>(null);

  const currentReadingArticle = useMemo(
    () => articles.find((a) => a.id === readingArticleId) || null,
    [articles, readingArticleId]
  );

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesSub = activeSubdomain === 'all' || art.subdomain === activeSubdomain;
      const matchesSubj = selectedSubject === 'All' || art.subject === selectedSubject;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        art.titleMr.toLowerCase().includes(q) ||
        art.titleEn.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.paperCode.toLowerCase().includes(q);
      return matchesSub && matchesSubj && matchesQuery;
    });
  }, [articles, activeSubdomain, selectedSubject, searchQuery]);

  const activeHostLabel = useMemo(() => {
    if (activeSubdomain === 'all' || activeSubdomain === 'main') return 'mpscsarathi.online';
    return `${activeSubdomain}.mpscsarathi.online`;
  }, [activeSubdomain]);

  const handleSaveArticle = (saved: StudyArticle, isEdit: boolean) => {
    if (isEdit) {
      setArticles((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
    } else {
      setArticles((prev) => [saved, ...prev]);
      setSubdomains((prev) =>
        prev.map((s) => (s.key === saved.subdomain ? { ...s, articleCount: s.articleCount + 1 } : s))
      );
    }
    setReadingArticleId(saved.id);
    setEditingArticle(null);
  };

  const handleOpenCreateModal = (sub: SubdomainKey = 'notes') => {
    setEditingArticle(null);
    setPublisherSubdomain(sub);
    setIsPublisherOpen(true);
  };

  const handleOpenEditModal = (article: StudyArticle) => {
    setEditingArticle(article);
    setPublisherSubdomain(article.subdomain);
    setIsPublisherOpen(true);
  };

  const handleBookClick = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, monthlyClicks: b.monthlyClicks + 1 } : b))
    );
  };

  const handleUpdateSlotSponsor = (slotId: string, sponsorName: string | null) => {
    setSponsoredSlots((prev) =>
      prev.map((s) =>
        s.id === slotId
          ? {
              ...s,
              currentSponsor: sponsorName,
              status: sponsorName ? 'Booked' : 'Available',
            }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setReadingArticleId(null);
            setActiveTab('editorial');
            setActiveSubdomain('all');
          }}
          className="font-editorial text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          mpscsarathi.online
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => {
              setReadingArticleId(null);
              setActiveTab('editorial');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'editorial' ? 'text-[#9A3412] underline underline-offset-8 font-semibold' : ''
            }`}
          >
            Editorial Hub
          </button>
          <button
            onClick={() => {
              setReadingArticleId(null);
              setActiveTab('subdomains');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'subdomains' ? 'text-[#9A3412] underline underline-offset-8 font-semibold' : ''
            }`}
          >
            Subdomains
          </button>
          <button
            onClick={() => {
              setReadingArticleId(null);
              setActiveTab('bookstore');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'bookstore' ? 'text-[#9A3412] underline underline-offset-8 font-semibold' : ''
            }`}
          >
            Bookstore
          </button>
          <button
            onClick={() => {
              setReadingArticleId(null);
              setActiveTab('monetization');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'monetization' ? 'text-[#9A3412] underline underline-offset-8 font-semibold' : ''
            }`}
          >
            Monetization
          </button>
          <button
            onClick={() => {
              setReadingArticleId(null);
              setActiveTab('compliance');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'compliance' ? 'text-[#9A3412] underline underline-offset-8 font-semibold' : ''
            }`}
          >
            Legal Pages
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleOpenCreateModal(activeSubdomain === 'all' ? 'notes' : activeSubdomain)}
            className="px-4 py-2 text-xs font-medium text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Publish Content
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar (visible only on small screens) */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 py-2.5 bg-[#F4F0EA] border-b border-stone-200 text-xs font-medium">
        {(
          [
            { id: 'editorial', label: 'Editorial Hub' },
            { id: 'subdomains', label: 'Subdomains' },
            { id: 'bookstore', label: 'Bookstore' },
            { id: 'monetization', label: 'Monetization' },
            { id: 'compliance', label: 'Legal Pages' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setReadingArticleId(null);
              setActiveTab(item.id);
            }}
            className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${
              activeTab === item.id ? 'bg-stone-900 text-white' : 'text-stone-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {currentReadingArticle ? (
          <ArticleReaderView
            article={currentReadingArticle}
            books={books}
            onBack={() => setReadingArticleId(null)}
            onEditArticle={handleOpenEditModal}
            onBookClick={handleBookClick}
          />
        ) : activeTab === 'subdomains' ? (
          <SubdomainHubView
            subdomains={subdomains}
            activeSubdomain={activeSubdomain === 'all' ? 'main' : activeSubdomain}
            onSelectSubdomain={(key) => {
              setActiveSubdomain(key);
              setActiveTab('editorial');
            }}
            onAddSubdomain={(newSub) => setSubdomains((prev) => [...prev, newSub])}
            onOpenPublisherForSubdomain={(key) => handleOpenCreateModal(key)}
          />
        ) : activeTab === 'monetization' || activeTab === 'bookstore' ? (
          <MonetizationSuiteView
            books={books}
            sponsoredSlots={sponsoredSlots}
            adsenseChecks={INITIAL_ADSENSE_CHECKS}
            onAddBook={(newBook) => setBooks((prev) => [newBook, ...prev])}
            onUpdateSlotSponsor={handleUpdateSlotSponsor}
            onNavigateTab={(tab) => {
              if (tab === 'publish') {
                handleOpenCreateModal('notes');
              } else if (tab === 'compliance' || tab === 'subdomains' || tab === 'monetization') {
                setActiveTab(tab as ActiveTab);
              }
            }}
            onBookClick={handleBookClick}
          />
        ) : activeTab === 'compliance' ? (
          <CompliancePagesView />
        ) : (
          /* Default Editorial Hub View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-12">
            {/* Subdomain Switcher & Operational Utility Strip */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EBE6DF] rounded-lg w-fit">
                {[
                  { key: 'all', label: 'All Subdomains (Network)' },
                  { key: 'main', label: 'mpscsarathi.online' },
                  { key: 'notes', label: 'notes.mpscsarathi' },
                  { key: 'pyq', label: 'pyq.mpscsarathi' },
                  { key: 'currentaffairs', label: 'currentaffairs.mpscsarathi' },
                  { key: 'books', label: 'books.mpscsarathi' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveSubdomain(tab.key as SubdomainKey | 'all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeSubdomain === tab.key
                        ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-stone-600 font-mono">
                <span>Active Portal: </span>
                <strong className="text-[#9A3412]">https://{activeHostLabel}</strong>
                <span className="mx-2">·</span>
                <span>AdSense Ready</span>
              </div>
            </div>

            {/* 2-Column Hero Split with Equal Height Balance */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-stone-200 rounded-lg p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                    <span className="text-[#9A3412] font-semibold uppercase tracking-wider">
                      महाराष्ट्र लोकसेवा आयोग मार्गदर्शन पोर्टल
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>राज्यसेवा व कम्बाईन २०२६</span>
                  </div>

                  <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[40px] font-semibold text-stone-900 leading-[1.18] text-balance">
                    MPSC सारथी: सखोल मराठी अभ्यास साहित्य, सबडोमेन नेटवर्क आणि संदर्भ ग्रंथालय
                  </h1>

                  <p className="text-base text-stone-600 leading-relaxed max-w-2xl">
                    <code className="font-mono text-stone-900">mpscsarathi.online</code> वर राज्यसेवा (नवीन वर्णनात्मक पॅटर्न), संयुक्त गट ब व क पूर्व आणि मुख्य परीक्षेसाठी १५००+ शब्दांचे मूळ संपादकीय लेख, मागील प्रश्नपत्रिकांचे अचूक विश्लेषण आणि प्रमाण संदर्भ पुस्तकांचे परीक्षण एकाच छताखाली उपलब्ध आहे.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setReadingArticleId(articles[0]?.id || null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] hover:bg-stone-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>मुख्य संपादकीय लेख वाचा</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenCreateModal('notes')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F4F0EA] hover:bg-stone-200 text-stone-900 border border-stone-300 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4 text-[#9A3412]" />
                    <span>नवीन पेज व कंटेंट जोडा</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('subdomains')}
                    className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#9A3412] hover:underline cursor-pointer whitespace-nowrap"
                  >
                    सबडोमेन DNS सेटअप पहा →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex">
                <EditorialStudyDeskGraphic activeHost={activeHostLabel} />
              </div>
            </section>

            {/* Full-Width 4-Column KPI & Monetization Proof Strip Below Hero Split */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  kicker: 'SUBDOMAIN ECOSYSTEM',
                  metric: `${subdomains.length} Connected Portals`,
                  detail: 'notes · pyq · currentaffairs · books',
                  actionLabel: 'Manage Subdomains',
                  onClick: () => setActiveTab('subdomains'),
                },
                {
                  kicker: 'ADSENSE CONTENT QUALITY',
                  metric: '1,560+ Avg Words',
                  detail: 'Original bilingual Marathi & English notes',
                  actionLabel: 'Add New Study Page',
                  onClick: () => handleOpenCreateModal('notes'),
                },
                {
                  kicker: 'AFFILIATE BOOKSTORE',
                  metric: '8% – 10% Commission',
                  detail: 'Amazon & Flipkart verified MPSC textbooks',
                  actionLabel: 'Open Bookstore Hub',
                  onClick: () => setActiveTab('bookstore'),
                },
                {
                  kicker: 'SPONSORED PARTNERSHIPS',
                  metric: '₹11,300/mo Booked',
                  detail: 'Direct Pune & Sambhajinagar coaching tie-ups',
                  actionLabel: 'View Rate Card',
                  onClick: () => setActiveTab('monetization'),
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-stone-200 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                      {stat.kicker}
                    </p>
                    <p className="font-mono-tabular text-xl font-bold text-stone-900 mt-1">
                      {stat.metric}
                    </p>
                    <p className="text-xs text-stone-600 mt-1">{stat.detail}</p>
                  </div>
                  <button
                    onClick={stat.onClick}
                    className="mt-4 pt-2.5 border-t border-stone-100 text-left text-xs font-semibold text-[#9A3412] hover:underline cursor-pointer"
                  >
                    {stat.actionLabel} →
                  </button>
                </div>
              ))}
            </section>

            {/* Filter & Search Toolbar for Study Pages */}
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <h2 className="font-editorial text-2xl font-semibold text-stone-900">
                    नवीनतम परीक्षभिमुख लेख आणि विषयनिहाय पेजेस ({filteredArticles.length})
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    प्रत्येक लेख AdSense च्या High-Value Content निकषांनुसार सविस्तर मुद्दे, PYQ सराव आणि संदर्भ पुस्तकांसह तयार केला आहे.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Live Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="विषय किंवा घटक शोधा (उदा. पंचायत राज)..."
                      className="pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412] w-64"
                    />
                  </div>

                  {/* Interactive Subject Filter */}
                  <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg overflow-x-auto">
                    {['All', 'Polity', 'History', 'Economy', 'Geography', 'Exam Strategy'].map((subj) => (
                      <button
                        key={subj}
                        onClick={() => setSelectedSubject(subj)}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedSubject === subj
                            ? 'bg-white text-stone-900 shadow-2xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length === 0 ? (
                <div className="p-12 bg-white border border-stone-200 rounded-lg text-center space-y-3">
                  <p className="font-editorial text-lg text-stone-800">
                    या फिल्टरसाठी कोणताही लेख आढळला नाही.
                  </p>
                  <button
                    onClick={() => {
                      setActiveSubdomain('all');
                      setSelectedSubject('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded-md cursor-pointer"
                  >
                    सर्व लेख पुन्हा दाखवा (Reset Filters)
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      className="bg-white border border-stone-200 rounded-lg p-6 flex flex-col justify-between hover:border-stone-300 transition-colors"
                    >
                      <div>
                        {/* Unboxed Metadata with Typographic Separators */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                          <span className="text-[#9A3412] font-semibold">
                            {art.subdomain === 'main'
                              ? 'mpscsarathi.online'
                              : `${art.subdomain}.mpscsarathi.online`}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{art.subject}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">{art.wordCount} words</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">{art.readTimeMinutes} min read</span>
                          {art.isSponsored && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-amber-800 font-semibold">Sponsored</span>
                            </>
                          )}
                        </div>

                        <h3
                          onClick={() => setReadingArticleId(art.id)}
                          className="font-editorial text-xl font-semibold text-stone-900 mt-3 leading-snug hover:text-[#9A3412] transition-colors cursor-pointer"
                        >
                          {art.titleMr}
                        </h3>
                        <p className="text-xs text-stone-500 mt-1">{art.titleEn}</p>

                        <p className="text-sm text-stone-700 mt-3 leading-relaxed line-clamp-3">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                        <div className="text-xs text-stone-500 font-mono-tabular">
                          <span>Updated: {art.lastUpdated}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenEditModal(art)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer whitespace-nowrap"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setReadingArticleId(art.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <span>संपूर्ण लेख वाचा</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Featured MPSC Affiliate Bookstore Section (books.mpscsarathi.online) */}
            <section className="pt-6 border-t border-stone-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#9A3412]">
                    BOOKS.MPSCSARATHI.ONLINE · VERIFIED AFFILIATE BOOKLIST
                  </p>
                  <h2 className="font-editorial text-2xl font-semibold text-stone-900 mt-1">
                    टॉपर्सनी शिफारस केलेली MPSC संदर्भ पुस्तके (Affiliate Store)
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('bookstore')}
                  className="text-xs font-semibold text-[#9A3412] hover:underline cursor-pointer whitespace-nowrap"
                >
                  सर्व पुस्तके आणि कमिशन डॅशबोर्ड पहा →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="w-32 mx-auto pt-2">
                        <BookCoverIllustration
                          theme={book.coverTheme}
                          titleMr={book.titleMr}
                          subject={book.subject}
                          author={book.author}
                          editionYear={book.editionYear}
                        />
                      </div>
                      <div>
                        <p className="text-[11px] font-mono text-stone-500">{book.subject}</p>
                        <h3 className="font-editorial text-sm font-semibold text-stone-900 mt-0.5 line-clamp-2">
                          {book.titleMr}
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 truncate">{book.author}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 space-y-2.5">
                      <div className="flex items-baseline justify-between font-mono-tabular">
                        <span className="text-base font-bold text-stone-900">₹{book.dealPriceInr}</span>
                        <span className="text-xs text-stone-400 line-through">₹{book.mrpInr}</span>
                      </div>
                      <a
                        href={`https://www.amazon.in/s?k=${encodeURIComponent(book.titleEn)}&tag=${book.amazonTag}`}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        onClick={() => handleBookClick(book.id)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors whitespace-nowrap"
                      >
                        <span>Amazon वर सवलतीत पहा</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Institutional Editorial Footer with AdSense Mandatory Links */}
      <footer className="bg-[#F4F0EA] border-t border-stone-300/80 mt-16 py-10 px-4 sm:px-8 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-300/80">
          <div className="space-y-2">
            <p className="font-editorial text-base font-bold text-stone-900">mpscsarathi.online</p>
            <p className="leading-relaxed">
              महाराष्ट्र लोकसेवा आयोग (MPSC) राज्यसेवा, संयुक्त गट ब व क परीक्षेसाठी स्वतंत्र शैक्षणिक मार्गदर्शन पोर्टल.
            </p>
            <p className="text-[11px] text-stone-500">
              Non-Government Educational Portal · Pune, Maharashtra
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-stone-900 uppercase tracking-wider font-mono">
              Subdomain Network
            </p>
            <ul className="space-y-1.5 font-mono">
              {subdomains.slice(0, 5).map((s) => (
                <li key={s.host}>
                  <button
                    onClick={() => {
                      setReadingArticleId(null);
                      setActiveSubdomain(s.key);
                      setActiveTab('editorial');
                    }}
                    className="hover:text-[#9A3412] cursor-pointer"
                  >
                    https://{s.host}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-stone-900 uppercase tracking-wider font-mono">
              Monetization & Partners
            </p>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    setReadingArticleId(null);
                    setActiveTab('monetization');
                  }}
                  className="hover:text-[#9A3412] cursor-pointer"
                >
                  Google AdSense Readiness Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setReadingArticleId(null);
                    setActiveTab('bookstore');
                  }}
                  className="hover:text-[#9A3412] cursor-pointer"
                >
                  Affiliate Reference Bookstore
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setReadingArticleId(null);
                    setActiveTab('monetization');
                  }}
                  className="hover:text-[#9A3412] cursor-pointer"
                >
                  Sponsored Post Rate Card & Media Kit
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-stone-900 uppercase tracking-wider font-mono">
              Mandatory AdSense Legal Pages
            </p>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    setReadingArticleId(null);
                    setActiveTab('compliance');
                  }}
                  className="hover:text-[#9A3412] cursor-pointer"
                >
                  About Us (आमच्याविषयी)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setReadingArticleId(null);
                    setActiveTab('compliance');
                  }}
                  className="hover:text-[#9A3412] cursor-pointer"
                >
                  Privacy Policy (DART Cookie Clause)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setReadingArticleId(null);
                    setActiveTab('compliance');
                  }}
                  className="hover:text-[#9A3412] cursor-pointer"
                >
                  Disclaimer & Affiliate Disclosure
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setReadingArticleId(null);
                    setActiveTab('compliance');
                  }}
                  className="hover:text-[#9A3412] cursor-pointer"
                >
                  Contact Us & Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 mpscsarathi.online · All Rights Reserved. Amazon Associates & Flipkart Affiliate Disclosure.</p>
          <p>अस्वीकरण: या वेबसाईटचा महाराष्ट्र लोकसेवा आयोगाशी (mpsc.gov.in) कोणताही अधिकृत शासकीय संबंध नाही.</p>
        </div>
      </footer>

      {/* New Page / Update Content Modal */}
      <ContentPublisherModal
        isOpen={isPublisherOpen}
        initialSubdomain={publisherSubdomain}
        editingArticle={editingArticle}
        books={books}
        onClose={() => {
          setIsPublisherOpen(false);
          setEditingArticle(null);
        }}
        onSaveArticle={handleSaveArticle}
      />
    </div>
  );
}
