export type SubdomainKey = 'main' | 'notes' | 'pyq' | 'currentaffairs' | 'books';

export interface SubdomainNode {
  key: SubdomainKey;
  host: string;
  titleMr: string;
  titleEn: string;
  description: string;
  dnsType: 'CNAME' | 'A';
  dnsName: string;
  dnsTarget: string;
  sslStatus: 'Active (Auto-SSL)' | 'Pending Verification';
  articleCount: number;
  monthlyViews: number;
  adsenseSlotEnabled: boolean;
  primaryPurpose: string;
}

export interface StudyArticle {
  id: string;
  subdomain: SubdomainKey;
  slug: string;
  titleMr: string;
  titleEn: string;
  subject: 'Polity' | 'History' | 'Economy' | 'Geography' | 'Current Affairs' | 'Exam Strategy' | 'PYQ Analysis';
  examTarget: 'MPSC Rajyaseva' | 'Combine Group B & C' | 'Saralseva & Talathi';
  paperCode: string;
  wordCount: number;
  readTimeMinutes: number;
  publishedDate: string;
  lastUpdated: string;
  author: string;
  authorCredential: string;
  excerpt: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string;
    examNote?: string;
  }[];
  pyqQuestion?: {
    year: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  recommendedBookIds: string[];
  isSponsored?: boolean;
  sponsorName?: string;
  sponsorCtaText?: string;
  sponsorCtaUrl?: string;
}

export interface AffiliateBook {
  id: string;
  titleMr: string;
  titleEn: string;
  author: string;
  publisher: string;
  subject: string;
  examRelevance: string;
  editionYear: string;
  pages: number;
  mrpInr: number;
  dealPriceInr: number;
  commissionPercent: number;
  amazonTag: string;
  flipkartAffId: string;
  coverTheme: 'navy' | 'terracotta' | 'forest' | 'bronze';
  editorReview: string;
  monthlyClicks: number;
}

export interface SponsoredSlot {
  id: string;
  slotName: string;
  placementLocation: string;
  subdomainTarget: string;
  monthlyRateInr: number;
  currentSponsor: string | null;
  status: 'Booked' | 'Available';
  deliverables: string[];
  disclosureTag: 'Sponsored' | 'Partner Post';
}

export interface AdSenseCheckItem {
  id: string;
  category: 'Content Quality' | 'Mandatory Pages' | 'Technical & SEO' | 'Traffic & Policy';
  title: string;
  descriptionMr: string;
  status: 'Passed' | 'Action Needed';
  metricValue: string;
  targetValue: string;
  actionButtonLabel?: string;
  targetTab?: string;
}

export interface CompliancePageDoc {
  id: 'about' | 'contact' | 'privacy' | 'disclaimer' | 'terms';
  titleMr: string;
  titleEn: string;
  slug: string;
  lastRevised: string;
  summary: string;
  contentBlocks: {
    heading: string;
    paragraphs: string[];
  }[];
}
