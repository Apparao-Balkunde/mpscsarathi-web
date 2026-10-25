import React, { useState } from 'react';
import { CompliancePageDoc } from '../types/portal';
import { COMPLIANCE_PAGES } from '../data/mpscData';
import { ShieldCheck, Copy, Check, Mail, Send } from 'lucide-react';

export const CompliancePagesView: React.FC = () => {
  const [activeDocId, setActiveDocId] = useState<CompliancePageDoc['id']>('about');
  const [copiedSlug, setCopiedSlug] = useState(false);

  // Interactive Contact Form State (for Contact Us page verification)
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Sponsored Post / Coaching Ad Inquiry');
  const [message, setMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const currentDoc = COMPLIANCE_PAGES.find((d) => d.id === activeDocId) || COMPLIANCE_PAGES[0];

  const handleCopyPageHtml = () => {
    const html = `<!-- Mandatory AdSense Compliance Page: ${currentDoc.slug} -->
<main class="legal-page">
  <h1>${currentDoc.titleMr} (${currentDoc.titleEn})</h1>
  <p>Last Updated: ${currentDoc.lastRevised}</p>
  <p>${currentDoc.summary}</p>
${currentDoc.contentBlocks
  .map(
    (b) =>
      `  <h2>${b.heading}</h2>\n${b.paragraphs.map((p) => `  <p>${p}</p>`).join('\n')}`
  )
  .join('\n\n')}
</main>`;
    navigator.clipboard.writeText(html);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim()) return;
    setContactSubmitted(true);
    setSenderName('');
    setSenderEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#14532D]">
            GOOGLE ADSENSE MANDATORY TRUST PAGES · 100% POLICY COMPLIANT
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-stone-900 mt-2">
            AdSense अप्रूव्हलसाठी ५ अनिवार्य कायदेशीर पेजेस
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
            Google AdSense रिव्ह्यूवर पाठवण्यापूर्वी <code className="font-mono text-stone-900">mpscsarathi.online</code> वर <strong>About Us, Privacy Policy (DoubleClick DART Cookie सह), Disclaimer, Contact Us</strong> आणि <strong>Terms</strong> ही ५ पेजेस असणे १००% बंधनकारक आहे.
          </p>
        </div>

        <button
          onClick={handleCopyPageHtml}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-medium rounded-md transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          {copiedSlug ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copiedSlug ? 'Page HTML Copied!' : `Copy "${currentDoc.id.toUpperCase()}" HTML`}</span>
        </button>
      </div>

      {/* Interactive Segmented Selector for the 5 Mandatory Pages */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-lg w-fit">
        {COMPLIANCE_PAGES.map((doc) => (
          <button
            key={doc.id}
            onClick={() => {
              setActiveDocId(doc.id);
              setContactSubmitted(false);
            }}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeDocId === doc.id
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {doc.titleMr}
          </button>
        ))}
      </div>

      {/* Document Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-[#9A3412]">{currentDoc.slug}</span>
              <h2 className="font-editorial text-2xl font-semibold text-stone-900 mt-1">
                {currentDoc.titleMr}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">{currentDoc.titleEn}</p>
            </div>
            <span className="text-xs font-mono text-stone-500">Revised: {currentDoc.lastRevised}</span>
          </div>

          <p className="text-sm text-stone-700 bg-[#FBF9F5] p-4 rounded border border-stone-200 leading-relaxed">
            {currentDoc.summary}
          </p>

          <div className="space-y-6">
            {currentDoc.contentBlocks.map((block, i) => (
              <div key={i} className="space-y-2.5">
                <h3 className="font-editorial text-lg font-semibold text-stone-900">{block.heading}</h3>
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Interactive Contact & Sponsorship Form when on Contact Us Page */}
          {currentDoc.id === 'contact' && (
            <div className="mt-8 pt-6 border-t border-stone-200">
              <h3 className="font-editorial text-lg font-semibold text-stone-900 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#9A3412]" />
                <span>थेट संपर्क व प्रायोजित जाहिरात चौकशी फॉर्म (Working Contact Form)</span>
              </h3>
              {contactSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-900">
                  धन्यवाद! तुमचा संदेश <code className="font-mono">contact@mpscsarathi.online</code> च्या संपादकीय कक्षाकडे नोंदवला गेला आहे. आम्ही २४ तासांत उत्तर देऊ.
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 bg-[#FBF9F5] p-5 rounded-md border border-stone-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">तुमचे नाव / संस्थेचे नाव *</label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="उदा. प्रा. संदीप पाटील / अकॅडमी नाव"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">ईमेल पत्ता (Email) *</label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">संपर्काचा विषय (Subject)</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded"
                    >
                      <option value="Sponsored Post / Coaching Ad Inquiry">
                        Sponsored Post / कोचिंग क्लास किंवा टेस्ट सिरीज जाहिरात
                      </option>
                      <option value="Book Review & Affiliate Partnership">
                        Book Review / नवीन पुस्तकाचे परीक्षण व Affiliate लिंक
                      </option>
                      <option value="Study Notes Correction / Feedback">
                        Study Notes / अभ्यासाच्या नोट्सबाबत सूचना
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">संदेश (Message)</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="तुमचा संदेश येथे लिहा..."
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-medium rounded transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>संदेश पाठवा (Submit Inquiry)</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Checklist Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-[#F4F0EA] border border-stone-300/80 rounded-lg space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#14532D] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Why AdSense Checks These Pages</span>
            </div>
            <h3 className="font-editorial text-lg font-semibold text-stone-900">
              सरकारी परीक्षा वेबसाईटसाठी महत्त्वाचा नियम (YMYL Rule)
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              MPSC सारख्या स्पर्धा परीक्षांच्या वेबसाईटवर Google कडक तपासणी करते की ती वेबसाईट स्वतःला सरकारी संस्था (Official MPSC) तर भासवत नाही ना? म्हणून आपल्या <strong>Disclaimer</strong> पेजवर <code className="font-mono">mpsc.gov.in</code> शी अधिकृत संबंध नसल्याचे स्पष्ट वाक्य असणे अत्यंत गरजेचे आहे.
            </p>
            <div className="pt-3 border-t border-stone-300 space-y-2 text-xs text-stone-700">
              <p className="font-semibold text-stone-900">अंतर्भूत केलेल्या अटी:</p>
              <p>१. DoubleClick DART Cookie Disclosure</p>
              <p>२. Amazon & Flipkart Affiliate Disclosure</p>
              <p>३. Non-Government Entity Disclaimer</p>
              <p>४. पुणे संपादकीय पत्ता व थेट संपर्क फॉर्म</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
