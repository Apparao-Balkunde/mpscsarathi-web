import React, { useState } from 'react';
import { StudyArticle, AffiliateBook } from '../types/portal';
import { BookCoverIllustration } from './BookCoverIllustration';
import { ArrowLeft, CheckCircle2, ExternalLink, BookOpen, Copy, Check, FileEdit } from 'lucide-react';

interface ArticleReaderViewProps {
  article: StudyArticle;
  books: AffiliateBook[];
  onBack: () => void;
  onEditArticle: (article: StudyArticle) => void;
  onBookClick: (bookId: string) => void;
}

export const ArticleReaderView: React.FC<ArticleReaderViewProps> = ({
  article,
  books,
  onBack,
  onEditArticle,
  onBookClick,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const recommendedBooks = books.filter((b) => article.recommendedBookIds.includes(b.id));

  const handleCopyArticleHtml = () => {
    const htmlContent = `<!-- Published on https://${article.subdomain === 'main' ? 'mpscsarathi.online' : `${article.subdomain}.mpscsarathi.online`}/${article.slug} -->
<article>
  <h1>${article.titleMr}</h1>
  <p><strong>Subject:</strong> ${article.paperCode} | <strong>Updated:</strong> ${article.lastUpdated}</p>
  <p>${article.excerpt}</p>
  <h2>महत्त्वाचे मुद्दे (Key Takeaways)</h2>
  <ul>
${article.keyTakeaways.map((k) => `    <li>${k}</li>`).join('\n')}
  </ul>
${article.sections
  .map(
    (s) => `  <h2>${s.heading}</h2>\n  <p>${s.body}</p>${
      s.examNote ? `\n  <p><em>परीक्षा टीप: ${s.examNote}</em></p>` : ''
    }`
  )
  .join('\n\n')}
</article>`;
    navigator.clipboard.writeText(htmlContent);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Action Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-[#9A3412] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>सर्व लेखांकडे परत जा (Back to Articles)</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEditArticle(article)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>हा लेख अपडेट करा (Update Content)</span>
          </button>
          <button
            onClick={handleCopyArticleHtml}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#1C1917] hover:bg-stone-800 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedHtml ? 'HTML Copied!' : 'Export SEO HTML'}</span>
          </button>
        </div>
      </div>

      {/* Asymmetric Editorial Grid (70% Main Column / 30% Margin Rail) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        <article className="lg:col-span-8">
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-mono">
            <span className="text-[#9A3412] font-semibold">
              {article.subdomain === 'main'
                ? 'mpscsarathi.online'
                : `${article.subdomain}.mpscsarathi.online`}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.examTarget}</span>
            <span aria-hidden="true">·</span>
            <span>{article.paperCode}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{article.wordCount} words</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{article.readTimeMinutes} min read</span>
          </div>

          {/* Sponsored Disclosure Notice if Sponsored */}
          {article.isSponsored && (
            <div className="mt-4 p-3.5 bg-amber-50/80 border border-amber-200/90 rounded text-xs text-stone-700">
              <span className="font-semibold text-amber-900">प्रायोजित शैक्षणिक लेख (Sponsored Feature): </span>
              हा मार्गदर्शन लेख <strong>{article.sponsorName}</strong> यांच्या शैक्षणिक सहकार्याने प्रकाशित करण्यात आला आहे.
            </div>
          )}

          {/* Primary Marathi Headline */}
          <h1 className="font-editorial text-2xl sm:text-4xl font-semibold text-stone-900 leading-tight mt-4 text-balance">
            {article.titleMr}
          </h1>
          <p className="text-sm text-stone-500 mt-2 font-medium">{article.titleEn}</p>

          {/* Author & Revision Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-6 border-y border-stone-200 text-xs text-stone-600">
            <div>
              <span className="font-semibold text-stone-900">{article.author}</span>
              <span className="mx-1.5">·</span>
              <span>{article.authorCredential}</span>
            </div>
            <div className="font-mono-tabular">
              <span>Published: {article.publishedDate}</span>
              <span className="mx-1.5">·</span>
              <span className="text-emerald-800 font-medium">Updated: {article.lastUpdated}</span>
            </div>
          </div>

          {/* Lead Summary */}
          <p className="text-base sm:text-lg text-stone-800 leading-relaxed font-medium mb-8">
            {article.excerpt}
          </p>

          {/* Key Exam Takeaways Box */}
          <div className="p-6 bg-[#F4F0EA] border border-stone-300/80 rounded-lg mb-8">
            <h2 className="font-editorial text-lg font-semibold text-stone-900 mb-3">
              परीक्षेसाठी ठळक मुद्दे (High-Yield Exam Points)
            </h2>
            <ul className="space-y-2.5 text-sm sm:text-base text-stone-800 leading-relaxed">
              {article.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="font-mono-tabular text-xs font-semibold text-[#9A3412] mt-1 shrink-0">
                    0{index + 1}.
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Long-Form Editorial Sections */}
          <div className="space-y-8">
            {article.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-stone-900">
                  {sec.heading}
                </h2>
                <p
                  className={`text-base text-stone-800 leading-relaxed max-w-prose ${
                    idx === 0
                      ? 'first-letter:text-4xl first-letter:font-editorial first-letter:font-bold first-letter:text-[#9A3412] first-letter:mr-2 first-letter:float-left first-letter:leading-none'
                      : ''
                  }`}
                >
                  {sec.body}
                </p>
                {sec.examNote && (
                  <div className="p-4 bg-white border border-stone-200 rounded-md text-sm text-stone-700 mt-3">
                    <span className="font-semibold text-[#1E3A8A]">MPSC परीक्षा विशेष टीप: </span>
                    {sec.examNote}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive PYQ Self-Assessment Widget */}
          {article.pyqQuestion && (
            <div className="mt-10 p-6 bg-white border border-stone-300 rounded-lg">
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-200">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9A3412] font-semibold">
                  मागील प्रश्नपत्रिका सराव (Interactive PYQ Check)
                </span>
                <span className="text-xs font-mono text-stone-500">{article.pyqQuestion.year}</span>
              </div>
              <p className="text-base font-semibold text-stone-900 mb-4 leading-snug">
                प्रश्न: {article.pyqQuestion.question}
              </p>
              <div className="space-y-2.5">
                {article.pyqQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === article.pyqQuestion?.correctIndex;
                  const showResult = selectedOption !== null;

                  let btnStyle = 'bg-[#FBF9F5] border-stone-300 text-stone-800 hover:border-stone-500';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-600 text-emerald-950 font-medium';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-red-50 border-red-500 text-red-900';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left px-4 py-3 rounded border text-sm transition-colors flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span>
                        <strong className="font-mono mr-2">({idx + 1})</strong> {opt}
                      </span>
                      {showResult && isCorrect && (
                        <span className="text-xs font-mono text-emerald-700 shrink-0">अचूक पर्याय</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedOption !== null && (
                <div className="mt-4 p-4 bg-stone-100 rounded text-sm text-stone-800 leading-relaxed">
                  <p className="font-semibold text-stone-900 mb-1">स्पष्टीकरण (Official Answer Analysis):</p>
                  <p>{article.pyqQuestion.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Sponsored Partner CTA Box (if applicable) */}
          {article.isSponsored && article.sponsorName && (
            <div className="mt-8 p-6 bg-[#1C1917] text-[#FBF9F5] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-amber-300">
                  SPONSORED ACADEMIC PARTNER · rel="sponsored"
                </p>
                <h3 className="font-editorial text-lg font-semibold mt-1">{article.sponsorName}</h3>
                <p className="text-xs text-stone-300 mt-1">
                  राज्यसेवा वर्णनात्मक पॅटर्न आणि कम्बाईन परीक्षेसाठी तज्ज्ञांचे मार्गदर्शन व उत्तरपत्रिका मूल्यमापन.
                </p>
              </div>
              <a
                href={article.sponsorCtaUrl || '#'}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="px-4 py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors"
              >
                {article.sponsorCtaText || 'अधिक माहिती पहा'}
              </a>
            </div>
          )}
        </article>

        {/* Right Margin Rail (30% Sidebar for AdSense Placement Preview & Contextual Affiliate Books) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* AdSense Compliance & Quality Scorecard for this Article */}
          <div className="p-5 bg-white border border-stone-200 rounded-lg">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500">
              AdSense Content Quality Metrics
            </h3>
            <div className="mt-3 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">Originality & Depth</span>
                <span className="font-mono-tabular font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Unique
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">Subdomain Canonical</span>
                <span className="font-mono text-stone-800 truncate max-w-[170px]">
                  {article.subdomain === 'main' ? 'mpscsarathi.online' : `${article.subdomain}.mpscsarathi.online`}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">Structured Headings</span>
                <span className="font-mono-tabular text-stone-800">{article.sections.length + 2} H2/H3 Blocks</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-600">AdSense Slot Density</span>
                <span className="font-mono text-emerald-700">Optimal (≤ 30% View)</span>
              </div>
            </div>
          </div>

          {/* Contextual Affiliate Book Recommendation (Passive Income Engine) */}
          {recommendedBooks.length > 0 && (
            <div className="p-5 bg-[#F4F0EA] border border-stone-300/80 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9A3412] font-semibold">
                  या विषयासाठी संदर्भ पुस्तके
                </span>
                <span className="text-[11px] text-stone-500">Affiliate Disclosure</span>
              </div>
              {recommendedBooks.map((book) => (
                <div key={book.id} className="bg-white p-4 rounded border border-stone-200 space-y-3">
                  <div className="flex gap-3.5">
                    <div className="w-20 shrink-0">
                      <BookCoverIllustration
                        theme={book.coverTheme}
                        titleMr={book.titleMr}
                        subject={book.subject}
                        author={book.author}
                        editionYear={book.editionYear}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-editorial text-sm font-semibold text-stone-900 leading-snug">
                        {book.titleMr}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1">{book.author}</p>
                      <div className="mt-2 flex items-baseline gap-2 font-mono-tabular">
                        <span className="text-base font-bold text-stone-900">₹{book.dealPriceInr}</span>
                        <span className="text-xs text-stone-400 line-through">₹{book.mrpInr}</span>
                        <span className="text-[11px] text-emerald-700 font-medium">
                          ({Math.round(((book.mrpInr - book.dealPriceInr) / book.mrpInr) * 100)}% सूट)
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{book.editorReview}</p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`https://www.amazon.in/s?k=${encodeURIComponent(book.titleEn)}&tag=${book.amazonTag}`}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      onClick={() => onBookClick(book.id)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors whitespace-nowrap"
                    >
                      <span>Amazon वर पहा</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://www.flipkart.com/search?q=${encodeURIComponent(book.titleEn)}&affid=${book.flipkartAffId}`}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      onClick={() => onBookClick(book.id)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 text-xs font-medium rounded transition-colors whitespace-nowrap"
                    >
                      <span>Flipkart वर पहा</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-stone-500 leading-normal">
                टीप: वरील संलग्न (Affiliate) लिंकवरून पुस्तक खरेदी केल्यास तुम्हाला कोणत्याही अतिरिक्त शुल्काशिवाय MPSC Sarathi ला अल्प कमिशन मिळते.
              </p>
            </div>
          )}

          {/* Native AdSense Responsive Unit Preview */}
          <div className="p-5 bg-stone-100/80 border border-dashed border-stone-300 rounded-lg text-center space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
              ADVERTISEMENT · GOOGLE ADSENSE IN-ARTICLE SLOT
            </p>
            <div className="py-6 px-4 bg-white border border-stone-200 rounded">
              <BookOpen className="w-5 h-5 text-stone-400 mx-auto mb-1.5" />
              <p className="text-xs font-medium text-stone-700">
                Responsive Display Ad Unit (300×250 / Auto)
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5 font-mono">
                data-ad-client="ca-pub-mpscsarathi"
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
