import React, { useState } from 'react';
import { SubdomainNode, SubdomainKey } from '../types/portal';
import { Globe, Copy, Check, Plus, ArrowUpRight, Server, ShieldCheck } from 'lucide-react';

interface SubdomainHubViewProps {
  subdomains: SubdomainNode[];
  activeSubdomain: SubdomainKey;
  onSelectSubdomain: (key: SubdomainKey) => void;
  onAddSubdomain: (newSub: SubdomainNode) => void;
  onOpenPublisherForSubdomain: (key: SubdomainKey) => void;
}

export const SubdomainHubView: React.FC<SubdomainHubViewProps> = ({
  subdomains,
  activeSubdomain,
  onSelectSubdomain,
  onAddSubdomain,
  onOpenPublisherForSubdomain,
}) => {
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<'hostinger' | 'cloudflare' | 'godaddy'>('hostinger');

  // New Subdomain Form State
  const [prefix, setPrefix] = useState('');
  const [titleMr, setTitleMr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [purpose, setPurpose] = useState('');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleCopyDns = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRecord(id);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  const handleCreateSubdomain = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPrefix = prefix.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!cleanPrefix || !titleMr.trim()) {
      setFormFeedback('कृपया सबडोमेनचे नाव (उदा. testseries) आणि मराठी शीर्षक भरा.');
      return;
    }

    const newNode: SubdomainNode = {
      key: 'notes', // maps to custom node view
      host: `${cleanPrefix}.mpscsarathi.online`,
      titleMr: titleMr.trim(),
      titleEn: titleEn.trim() || `${cleanPrefix.toUpperCase()} Portal`,
      description: purpose.trim() || `Dedicated MPSC micro-portal on ${cleanPrefix}.mpscsarathi.online`,
      dnsType: 'CNAME',
      dnsName: cleanPrefix,
      dnsTarget: 'cname.mpscsarathi.online',
      sslStatus: 'Active (Auto-SSL)',
      articleCount: 1,
      monthlyViews: 1200,
      adsenseSlotEnabled: true,
      primaryPurpose: purpose.trim() || 'Specialized Exam Content & AdSense',
    };

    onAddSubdomain(newNode);
    setPrefix('');
    setTitleMr('');
    setTitleEn('');
    setPurpose('');
    setFormFeedback(`नवीन सबडोमेन "${cleanPrefix}.mpscsarathi.online" यशस्वीरित्या जोडले गेले आहे!`);
    setTimeout(() => setFormFeedback(null), 4000);
  };

  const providerInstructions = {
    hostinger: {
      name: 'Hostinger hPanel',
      steps: [
        'Hostinger लॉगिन करा → Domains → mpscsarathi.online → DNS / Nameservers निवडा.',
        'DNS Records विभागात Type मध्ये "CNAME" निवडा.',
        'Name (Host) मध्ये फक्त सबडोमेनचा शब्द टाका (उदा. notes, pyq, books) आणि Target मध्ये तुमचे मुख्य होस्टिंग/क्लाउड टार्गेट टाका.',
        'TTL 14400 किंवा 3600 ठेवून "Add Record" वर क्लिक करा. १५ मिनिटांत सबडोमेन लाईव्ह होईल.',
      ],
    },
    cloudflare: {
      name: 'Cloudflare DNS (Recommended for Free SSL & Speed)',
      steps: [
        'Cloudflare डॅशबोर्डवर mpscsarathi.online निवडा → डाव्या मेनूतून "DNS" → "Records" वर क्लिक करा.',
        '"Add Record" दाबा → Type: CNAME, Name: notes (किंवा pyq / books), Target: mpscsarathi.online.',
        'Proxy Status (Orange Cloud) ON ठेवा, ज्यामुळे सर्व सबडोमेन्सना मोफत HTTPS SSL आणि कॅशिंग मिळेल.',
        'Google AdSense मध्ये Sites → mpscsarathi.online → "Show details" → "Add subdomain" मधून हे सबडोमेन जोडा.',
      ],
    },
    godaddy: {
      name: 'GoDaddy Domain Manager',
      steps: [
        'GoDaddy My Products → mpscsarathi.online शेजारील "DNS" बटनावर क्लिक करा.',
        'DNS Records तक्त्यात "Add New Record" निवडा.',
        'Type: CNAME, Name: notes (पूर्ण डोमेन लिहू नका, फक्त प्रीफिक्स लिहा), Value: @ किंवा मुख्य सर्व्हर पत्ता.',
        'Save करा. आता प्रत्येक सबडोमेनवर स्वतंत्र विषयनिहाय डेटा अपलोड करता येईल.',
      ],
    },
  }[selectedProvider];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Section Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#9A3412]">
            MULTI-SUBDOMAIN ARCHITECTURE · MPSCSARATHI.ONLINE
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-stone-900 mt-2">
            सबडोमेन नेटवर्क आणि DNS कनेक्शन व्यवस्थापन
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
            एकाच वेबसाईटवर सर्व विषय गर्दी करून ठेवण्यापेक्षा विषयनिहाय सबडोमेन्स (उदा. <code className="font-mono text-stone-900">notes.mpscsarathi.online</code>, <code className="font-mono text-stone-900">pyq.mpscsarathi.online</code>) जोडल्यामुळे Google SEO रँकिंग सुधारते आणि AdSense वर एकदा मुख्य डोमेन अप्रूव्ह झाले की सर्व सबडोमेन्सवर जाहिराती आपोआप सुरू होतात.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 bg-white border border-stone-200 rounded-md text-xs font-mono-tabular">
            <span className="text-stone-500">एकूण जोडलेले सबडोमेन्स: </span>
            <strong className="text-stone-900">{subdomains.length} Nodes</strong>
          </div>
        </div>
      </div>

      {/* Connected Subdomain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subdomains.map((sub, idx) => {
          const isCurrent = activeSubdomain === sub.key && idx < 5;
          return (
            <div
              key={sub.host}
              className={`p-6 rounded-lg border transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'bg-white border-[#9A3412] shadow-xs'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-stone-500 pb-3 border-b border-stone-100">
                  <span className="inline-flex items-center gap-1.5 text-stone-900 font-semibold truncate">
                    <Globe className="w-3.5 h-3.5 text-[#9A3412] shrink-0" />
                    {sub.host}
                  </span>
                  <span className="text-emerald-700 shrink-0">{sub.sslStatus}</span>
                </div>

                <h3 className="font-editorial text-lg font-semibold text-stone-900 mt-4">
                  {sub.titleMr}
                </h3>
                <p className="text-xs font-medium text-stone-500 mt-0.5">{sub.titleEn}</p>
                <p className="text-sm text-stone-600 mt-3 leading-relaxed">{sub.description}</p>

                {/* Metrics Strip */}
                <div className="grid grid-cols-2 gap-3 my-4 pt-3 border-t border-stone-100 font-mono-tabular text-xs">
                  <div>
                    <span className="text-stone-400 block">एकूण पेजेस / लेख</span>
                    <span className="text-sm font-semibold text-stone-900">{sub.articleCount} Pages</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">मासिक वाचक (Views)</span>
                    <span className="text-sm font-semibold text-stone-900">
                      {sub.monthlyViews.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectSubdomain(sub.key)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A3412] hover:underline cursor-pointer whitespace-nowrap"
                >
                  <span>या सबडोमेनचा डेटा पहा</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenPublisherForSubdomain(sub.key)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap"
                >
                  + नवीन पेज जोडा
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DNS Configuration Table & Registrar Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DNS CNAME / A Record Generator Table */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-lg p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h2 className="font-editorial text-xl font-semibold text-stone-900 flex items-center gap-2">
                <Server className="w-5 h-5 text-[#9A3412]" />
                <span>DNS Records तक्ता (Copy-Paste for Domain Panel)</span>
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                तुमच्या डोमेन प्रोव्हायडरमध्ये (Hostinger / GoDaddy / Cloudflare) खालील रेकॉर्ड्स अचूक जोडा:
              </p>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse text-xs font-mono-tabular">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase">
                  <th className="py-2.5 pr-3">Type</th>
                  <th className="py-2.5 px-3">Host / Name</th>
                  <th className="py-2.5 px-3">Points To / Target</th>
                  <th className="py-2.5 pl-3 text-right">Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {subdomains.map((sub) => (
                  <tr key={sub.host} className="hover:bg-stone-50/80">
                    <td className="py-3 pr-3 font-semibold text-[#1E3A8A]">{sub.dnsType}</td>
                    <td className="py-3 px-3 font-semibold text-stone-900">{sub.dnsName}</td>
                    <td className="py-3 px-3 text-stone-600">{sub.dnsTarget}</td>
                    <td className="py-3 pl-3 text-right">
                      <button
                        onClick={() =>
                          handleCopyDns(`${sub.dnsType} | Host: ${sub.dnsName} | Target: ${sub.dnsTarget}`, sub.host)
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-[11px] transition-colors cursor-pointer"
                      >
                        {copiedRecord === sub.host ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Step-by-Step Registrar Tabs */}
          <div className="mt-6 pt-5 border-t border-stone-200">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-stone-700">
                डोमेन कुठे घेतले आहे? (Select Your DNS Provider):
              </span>
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-md">
                {(['hostinger', 'cloudflare', 'godaddy'] as const).map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvider(prov)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer capitalize ${
                      selectedProvider === prov
                        ? 'bg-white text-stone-900 shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#FBF9F5] border border-stone-200 rounded-md">
              <h4 className="text-xs font-semibold text-stone-900 mb-2">{providerInstructions.name} स्टेप्स:</h4>
              <ol className="space-y-1.5 text-xs text-stone-700 list-decimal list-inside leading-relaxed">
                {providerInstructions.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Connect New Subdomain Form + AdSense Subdomain Rule Box */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={handleCreateSubdomain}
            className="bg-white border border-stone-200 rounded-lg p-6 space-y-4"
          >
            <div>
              <h3 className="font-editorial text-lg font-semibold text-stone-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#9A3412]" />
                <span>नवीन सबडोमेन कनेक्ट करा (Add New Subdomain)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                उदा. <code className="font-mono">testseries.mpscsarathi.online</code> किंवा <code className="font-mono">jobs.mpscsarathi.online</code> तयार करा:
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Subdomain Prefix (इंग्रजी अक्षरे)
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="testseries"
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] border border-stone-300 rounded-l-md focus:outline-none focus:border-[#9A3412] font-mono"
                />
                <span className="px-3 py-2 text-xs font-mono bg-stone-100 border border-l-0 border-stone-300 rounded-r-md text-stone-600 whitespace-nowrap">
                  .mpscsarathi.online
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                विभागाचे मराठी नाव (Subdomain Title in Marathi)
              </label>
              <input
                type="text"
                value={titleMr}
                onChange={(e) => setTitleMr(e.target.value)}
                placeholder="उदा. राज्यसेवा व कम्बाईन ऑनलाइन टेस्ट सिरीज"
                className="w-full px-3 py-2 text-sm bg-[#FBF9F5] border border-stone-300 rounded-md focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                मुख्य उद्देश व डेटा प्रकार (Content & Monetization Purpose)
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="उदा. सराव प्रश्नसंच, निकाल आणि स्पॉन्सर्ड कोचिंग बॅचेस"
                className="w-full px-3 py-2 text-sm bg-[#FBF9F5] border border-stone-300 rounded-md focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            {formFeedback && (
              <p className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded">
                {formFeedback}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-medium rounded-md transition-colors cursor-pointer"
            >
              सबडोमेन जनरेट करा आणि DNS यादीत जोडा
            </button>
          </form>

          {/* AdSense Subdomain Golden Rule Card */}
          <div className="p-5 bg-[#F4F0EA] border border-stone-300/80 rounded-lg space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#14532D] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Google AdSense Subdomain Rule</span>
            </div>
            <h4 className="font-editorial text-base font-semibold text-stone-900">
              सबडोमेन्ससाठी वेगळे AdSense अप्रूव्हल लागते का?
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              <strong>नाही!</strong> एकदा तुमचे मुख्य डोमेन (<code className="font-mono">mpscsarathi.online</code>) Google AdSense वर अप्रूव्ह झाले की, तुम्हाला <code className="font-mono">notes.mpscsarathi.online</code> किंवा <code className="font-mono">pyq.mpscsarathi.online</code> साठी पुन्हा रिव्ह्यूची गरज नसते. फक्त AdSense डॅशबोर्डमध्ये <strong>Sites → mpscsarathi.online → Add Subdomain</strong> करा आणि तीच AdSense स्क्रिप्ट सबडोमेनच्या <code className="font-mono">&lt;head&gt;</code> मध्ये पेस्ट करा.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
