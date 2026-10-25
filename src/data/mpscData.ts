import {
  SubdomainNode,
  StudyArticle,
  AffiliateBook,
  SponsoredSlot,
  AdSenseCheckItem,
  CompliancePageDoc,
} from '../types/portal';

export const INITIAL_SUBDOMAINS: SubdomainNode[] = [
  {
    key: 'main',
    host: 'mpscsarathi.online',
    titleMr: 'मुख्य पोर्टल व संपादकीय विभाग',
    titleEn: 'Primary Exam Portal & Strategy Hub',
    description: 'Central authority domain housing exam notifications, Rajyaseva descriptive pattern guides, and pillar articles.',
    dnsType: 'A',
    dnsName: '@',
    dnsTarget: '216.239.32.21',
    sslStatus: 'Active (Auto-SSL)',
    articleCount: 42,
    monthlyViews: 68400,
    adsenseSlotEnabled: true,
    primaryPurpose: 'AdSense Pillar Content & Brand Authority',
  },
  {
    key: 'notes',
    host: 'notes.mpscsarathi.online',
    titleMr: 'सखोल विषयनिहाय मराठी नोट्स',
    titleEn: 'Subject-Wise Long-Form Study Notes',
    description: 'Dedicated subdomain for GS 1 to GS 4 comprehensive Marathi notes: Polity, Maharashtra History, Geography, and Economy.',
    dnsType: 'CNAME',
    dnsName: 'notes',
    dnsTarget: 'cname.mpscsarathi.online',
    sslStatus: 'Active (Auto-SSL)',
    articleCount: 86,
    monthlyViews: 94200,
    adsenseSlotEnabled: true,
    primaryPurpose: 'High-Retention Organic Search & In-Article AdSense',
  },
  {
    key: 'pyq',
    host: 'pyq.mpscsarathi.online',
    titleMr: 'मागील वर्षांच्या प्रश्नपत्रिका व विश्लेषण',
    titleEn: 'Previous Year Question (PYQ) Archive & Quiz',
    description: 'Topic-wise solved MPSC Rajyaseva and Combine Group B & C question papers from 2013 to 2025 with detailed explanations.',
    dnsType: 'CNAME',
    dnsName: 'pyq',
    dnsTarget: 'cname.mpscsarathi.online',
    sslStatus: 'Active (Auto-SSL)',
    articleCount: 64,
    monthlyViews: 112500,
    adsenseSlotEnabled: true,
    primaryPurpose: 'High Pageviews per Session & Coaching Sponsorships',
  },
  {
    key: 'currentaffairs',
    host: 'currentaffairs.mpscsarathi.online',
    titleMr: 'दैनंदिन चालू घडामोडी व संपादकीय विश्लेषण',
    titleEn: 'Daily Current Affairs & PIB/Yojana Digest',
    description: 'Daily Maharashtra & National current affairs, Lokrajya magazine summaries, Economic Survey highlights, and government schemes.',
    dnsType: 'CNAME',
    dnsName: 'currentaffairs',
    dnsTarget: 'cname.mpscsarathi.online',
    sslStatus: 'Active (Auto-SSL)',
    articleCount: 118,
    monthlyViews: 81900,
    adsenseSlotEnabled: true,
    primaryPurpose: 'Daily Returning Aspirant Traffic & Google Discover',
  },
  {
    key: 'books',
    host: 'books.mpscsarathi.online',
    titleMr: 'संदर्भ ग्रंथालय व बुकलिस्ट (Affiliate Hub)',
    titleEn: 'Verified MPSC Booklist & Resource Reviews',
    description: 'Topper-verified book reviews, chapter breakdowns, and direct Amazon/Flipkart comparison links for passive affiliate income.',
    dnsType: 'CNAME',
    dnsName: 'books',
    dnsTarget: 'cname.mpscsarathi.online',
    sslStatus: 'Active (Auto-SSL)',
    articleCount: 29,
    monthlyViews: 47300,
    adsenseSlotEnabled: false,
    primaryPurpose: 'High-Conversion Affiliate Commissions (Amazon & Flipkart)',
  },
];

export const INITIAL_BOOKS: AffiliateBook[] = [
  {
    id: 'book-laxmikanth-mr',
    titleMr: 'भारताची राज्यघटना आणि प्रशासन (Indian Polity in Marathi)',
    titleEn: 'Indian Polity – 7th Revised Marathi Edition',
    author: 'M. Laxmikanth (अनुवाद: के’सागर प्रकाशन)',
    publisher: "K'Sagar Publications, Pune",
    subject: 'Polity & Constitution',
    examRelevance: 'MPSC राज्यसेवा पूर्व व मुख्य (GS-II) आणि कम्बाईन साठी १००% उपयुक्त',
    editionYear: '2026 Revised',
    pages: 892,
    mrpInr: 895,
    dealPriceInr: 645,
    commissionPercent: 9,
    amazonTag: 'mpscsarathi-21',
    flipkartAffId: 'mpscsarathi_fk',
    coverTheme: 'navy',
    editorReview:
      'MPSC राज्यसेवा आणि संयुक्त परीक्षेत राज्यव्यवस्था (Polity) या विषयावर पडणाऱ्या १५ पैकी किमान १२-१३ प्रश्न थेट एम. लक्ष्मीकांत यांच्या या संदर्भग्रंथातून कव्हर होतात. कलम ३७०, नवीन घटनादुरुस्त्या आणि निवडणूक आयोगाच्या अद्ययावत प्रकरणांचा यात समावेश आहे.',
    monthlyClicks: 1840,
  },
  {
    id: 'book-kathare-history',
    titleMr: 'आधुनिक महाराष्ट्राचा इतिहास (१८१८ ते १९६०)',
    titleEn: 'History of Modern Maharashtra & Social Reformers',
    author: 'डॉ. अनिल कठारे / गाठाळ सर संदर्भ संच',
    publisher: 'Vidya Books / K’Sagar Pune',
    subject: 'Maharashtra History',
    examRelevance: 'राज्यसेवा GS-I व कम्बाईन गट ब-क मधील समाजसुधारक व चळवळींसाठी अनिवार्य',
    editionYear: '2026 Edition',
    pages: 640,
    mrpInr: 580,
    dealPriceInr: 420,
    commissionPercent: 10,
    amazonTag: 'mpscsarathi-21',
    flipkartAffId: 'mpscsarathi_fk',
    coverTheme: 'terracotta',
    editorReview:
      'महाराष्ट्रातील सामाजिक प्रबोधन, महात्मा फुले, राजर्षी शाहू महाराज, डॉ. बाबासाहेब आंबेडकर यांचे कार्य, तसेच १८५७ चा उठाव आणि संयुक्त महाराष्ट्र चळवळ याचे अचूक सनावळीसह विश्लेषण या पुस्तकात दिले आहे.',
    monthlyClicks: 1490,
  },
  {
    id: 'book-kolambe-economy',
    titleMr: 'भारतीय अर्थव्यवस्था आणि नियोजन (Indian Economy)',
    titleEn: 'Indian Economy & Sustainable Development',
    author: 'रंजन कोळंबे (Ranjan Kolambe) / किरण देसले',
    publisher: 'Bhagirath Publications, Pune',
    subject: 'Economy & Planning',
    examRelevance: 'पूर्व परीक्षा (आर्थिक व सामाजिक विकास) आणि मुख्य परीक्षा GS-III व GS-IV साठी सर्वोत्तम',
    editionYear: '2026 Updated',
    pages: 720,
    mrpInr: 750,
    dealPriceInr: 530,
    commissionPercent: 9,
    amazonTag: 'mpscsarathi-21',
    flipkartAffId: 'mpscsarathi_fk',
    coverTheme: 'forest',
    editorReview:
      'राष्ट्रीय उत्पन्न, सार्वजनिक वित्त, रिझर्व्ह बँकेचे मौद्रिक धोरण, GST सुधारणा, बहुआयामी दारिद्र्य निर्देशांक आणि शाश्वत विकास उद्दिष्टे (SDGs) अतिशय सोप्या मराठी भाषेत समजून घेण्यासाठी हे पुस्तक प्रत्येक विद्यार्थ्याकडे असावे.',
    monthlyClicks: 1620,
  },
  {
    id: 'book-savadi-geography',
    titleMr: 'महाराष्ट्राचा समग्र भूगोल (Mega Geography of Maharashtra)',
    titleEn: 'Comprehensive Geography of Maharashtra & India',
    author: 'प्रा. ए. बी. सवदी (Prof. A. B. Savadi)',
    publisher: 'Nirali Prakashan, Pune',
    subject: 'Geography & Environment',
    examRelevance: 'प्राकृतिक रचना, नदीप्रणाली, खनिज संपत्ती आणि जनगणना आकडेवारीसाठी प्रमाण ग्रंथ',
    editionYear: '2026 Edition',
    pages: 810,
    mrpInr: 820,
    dealPriceInr: 590,
    commissionPercent: 8,
    amazonTag: 'mpscsarathi-21',
    flipkartAffId: 'mpscsarathi_fk',
    coverTheme: 'bronze',
    editorReview:
      'सह्याद्री पर्वतरांग, कोकण किनारपट्टी, गोदावरी-कृष्णा-भीमा नदीखोरे, महाराष्ट्रातील मृदा प्रकार आणि वनसंपत्ती नकाशांसह अभ्यासण्यासाठी प्रा. ए. बी. सवदी यांचे पुस्तक MPSC परीक्षेत सर्वाधिक विश्वासार्ह मानले जाते.',
    monthlyClicks: 1310,
  },
];

export const INITIAL_ARTICLES: StudyArticle[] = [
  {
    id: 'art-panchayati-raj-73rd',
    subdomain: 'notes',
    slug: '73rd-constitutional-amendment-panchayat-raj-maharashtra-notes',
    titleMr: '७३ वी घटनादुरुस्ती आणि महाराष्ट्रातील त्रिस्तरीय पंचायत राज व्यवस्था: सखोल विश्लेषण',
    titleEn: '73rd Constitutional Amendment Act 1992 & Three-Tier Panchayati Raj in Maharashtra',
    subject: 'Polity',
    examTarget: 'MPSC Rajyaseva',
    paperCode: 'GS Paper II · भारतीय संविधान व स्थानिक स्वराज्य संस्था',
    wordCount: 1640,
    readTimeMinutes: 8,
    publishedDate: '18 October 2026',
    lastUpdated: '24 October 2026',
    author: 'संपादकीय विभाग, MPSC Sarathi',
    authorCredential: 'राज्यसेवा मुख्य परीक्षा विश्लेषक (पुणे)',
    excerpt:
      'भारतीय राज्यघटनेतील भाग ९ (कलम २४३ ते २४३-O), ११ वी अनुसूची आणि महाराष्ट्रातील वसंतराव नाईक व पी. बी. पाटील समितीच्या शिफारशींचे परीक्षभिमुख सविस्तर विश्लेषण.',
    keyTakeaways: [
      '७३ वी घटनादुरुस्ती कायदा १९९२ हा २४ एप्रिल १९९३ पासून संपूर्ण देशभरात लागू झाला; त्यामुळे २४ एप्रिल हा "राष्ट्रीय पंचायत राज दिन" म्हणून साजरा केला जातो.',
      'महाराष्ट्र शासनाने १ मे १९६२ रोजी वसंतराव नाईक समितीच्या शिफारशीनुसार त्रिस्तरीय पंचायत राज व्यवस्था स्वीकारली (जिल्हा परिषद, पंचायत समिती व ग्रामपंचायत).',
      'कलम २४३-D नुसार पंचायत राज संस्थांमध्ये महिलांसाठी किमान १/३ (महाराष्ट्रात ५०%) जागा राखीव ठेवण्याची ऐतिहासिक तरतूद करण्यात आली आहे.',
      '११ व्या अनुसूचीमध्ये एकूण २९ विषयांचा समावेश असून कलम २४३-I अंतर्गत दर पाच वर्षांनी राज्य वित्त आयोग आणि २४३-K अंतर्गत राज्य निवडणूक आयोगाची स्थापना केली जाते.',
    ],
    sections: [
      {
        heading: '१. ऐतिहासिक पार्श्वभूमी आणि समितींची उत्क्रांती',
        body: 'भारतात लोकशाही विकेंद्रीकरणाचा पाया घालण्यासाठी १९५७ मध्ये बलवंतराय मेहता समिती नेमण्यात आली. या समितीने "लोकशाही विकेंद्रीकरण" (Democratic Decentralization) ही संकल्पना मांडून त्रिस्तरीय रचनेची शिफारस केली. तथापि, महाराष्ट्राने स्वतःची स्वतंत्र प्रशासकीय गरज लक्षात घेऊन तत्कालीन महसूल मंत्री वसंतराव नाईक यांच्या अध्यक्षतेखाली १९६० मध्ये समिती नियुक्त केली. नाईक समितीने गटाऐवजी (Block) "जिल्हा" हा नियोजनाचा केंद्रबिंदू मानून जिल्हा परिषदेला अधिक सक्षम करण्याची शिफारस केली. त्यानुसार महाराष्ट्र जिल्हा परिषद व पंचायत समिती कायदा १९६१ संमत होऊन १ मे १९६२ पासून राज्यात प्रभावीपणे लागू झाला.',
        examNote:
          'MPSC परीक्षेत समित्यांचा कालानुक्रम वारंवार विचारला जातो: १) बलवंतराय मेहता (१९५७) → २) अशोक मेहता (१९७७) → ३) जी. व्ही. के. राव (१९८५) → ४) एल. एम. सिंघवी (१९८६ - घटनात्मक दर्जाची प्रथम शिफारस).',
      },
      {
        heading: '२. ७३ व्या घटनादुरुस्तीतील अनिवार्य (Mandatory) व ऐच्छिक (Voluntary) तरतुदी',
        body: '७३ व्या घटनादुरुस्तीने राज्यघटनेत भाग ९ समाविष्ट केला आणि कलम २४३ ते २४३-O दरम्यान १६ नवीन कलमे जोडली. यामध्ये काही तरतुदी सर्व घटक राज्यांवर बंधनकारक (Mandatory) आहेत, तर काही तरतुदी राज्यांच्या विधानमंडळाच्या स्वेच्छाधिकारावर (Voluntary) सोडल्या आहेत. ग्रामसभेची स्थापना (कलम २४३-A), तीन स्तरांवर प्रत्यक्ष निवडणूक, उमेदवाराचे किमान वय २१ वर्षे असणे (कलम २४३-F), अनुसूचित जाती-जमातींना लोकसंख्येच्या प्रमाणात आरक्षण आणि महिलांसाठी किमान १/३ आरक्षण या अनिवार्य तरतुदी आहेत. याउलट, इतर मागासवर्गीयांना (OBC) आरक्षण देणे, आमदार-खासदारांना पंचायतीत प्रतिनिधित्व देणे आणि २९ विषयांपैकी किती अधिकार प्रत्यक्ष हस्तांतरित करायचे, या बाबी ऐच्छिक ठेवण्यात आल्या आहेत.',
      },
      {
        heading: '३. महाराष्ट्रातील ग्रामसभा, सरपंच निवड आणि सध्याचे बदल',
        body: 'मुंबई ग्रामपंचायत अधिनियम १९५८ (आता महाराष्ट्र ग्रामपंचायत अधिनियम) नुसार प्रत्येक आर्थिक वर्षात ग्रामसभेच्या किमान ४ बैठका होणे कायद्याने बंधनकारक आहे (महाराष्ट्र शासनाच्या नियमानुसार ६ बैठका घेतल्या जातात, ज्यात महिला ग्रामसभेचाही समावेश असतो). दोन ग्रामसभांमधील अंतर ३ महिन्यांपेक्षा जास्त नसावे. ग्रामपंचायतीचा कार्यकाळ पहिल्या बैठकीपासून ५ वर्षांचा असतो; जर ग्रामपंचायत मुदतीपूर्वी विसर्जित झाली, तर ६ महिन्यांच्या आत नव्याने निवडणुका घेणे कलम २४३-E नुसार बंधनकारक आहे.',
        examNote:
          'लक्षात ठेवा: मुदतपूर्व विसर्जनानंतर निवडून आलेली नवीन ग्रामपंचायत संपूर्ण ५ वर्षे काम करत नाही, तर केवळ "उर्वरित कालावधीसाठी" (Remainder of the period) अस्तित्वात राहते.',
      },
    ],
    pyqQuestion: {
      year: 'MPSC राज्यसेवा पूर्व परीक्षा २०२४',
      question: '७३ व्या घटनादुरुस्ती कायद्यानुसार खालीलपैकी कोणती तरतूद घटक राज्यांसाठी "ऐच्छिक" (Voluntary) स्वरूपाची आहे?',
      options: [
        'गावाच्या पातळीवर ग्रामसभेची स्थापना करणे',
        'पंचायतीच्या निवडणुकीसाठी किमान वयोमर्यादा २१ वर्षे निश्चित करणे',
        'मागासवर्गीय नागरिकांसाठी (OBC) जागा किंवा अध्यक्षांची पदे राखीव ठेवणे',
        'दर पाच वर्षांनी राज्य वित्त आयोगाची स्थापना करणे',
      ],
      correctIndex: 2,
      explanation:
        'अचूक उत्तर (३): SC/ST आणि महिलांचे १/३ आरक्षण ही ७३ व्या घटनादुरुस्तीची अनिवार्य तरतूद आहे; परंतु कलम २४३-D (६) नुसार नागरिकांच्या मागास प्रवर्गासाठी (OBC) आरक्षण देण्याचा निर्णय राज्य विधानमंडळाच्या ऐच्छिक अधिकारात ठेवण्यात आला आहे.',
    },
    recommendedBookIds: ['book-laxmikanth-mr'],
  },
  {
    id: 'art-maharashtra-social-reformers',
    subdomain: 'notes',
    slug: 'mahatma-phule-satyashodhak-samaj-maharashtra-history-mpsc',
    titleMr: 'महात्मा जोतीराव फुले आणि सत्यशोधक समाजाचे वैचारिक व शैक्षणिक योगदान',
    titleEn: 'Mahatma Jotirao Phule & Satyashodhak Samaj: Educational & Agrarian Reforms',
    subject: 'History',
    examTarget: 'Combine Group B & C',
    paperCode: 'GS Paper I · आधुनिक महाराष्ट्राचा इतिहास व समाजसुधारक',
    wordCount: 1520,
    readTimeMinutes: 7,
    publishedDate: '15 October 2026',
    lastUpdated: '23 October 2026',
    author: 'डॉ. एस. कुलकर्णी (इतिहास विभाग)',
    authorCredential: 'पीएच.डी. आधुनिक महाराष्ट्राचा इतिहास',
    excerpt:
      '१८४८ मधील भारतातील पहिली मुलींची शाळा, २४ सप्टेंबर १८७३ रोजी स्थापन झालेला सत्यशोधक समाज, गुलामगिरी व शेतकऱ्यांचा आसूड या ग्रंथांचे सखोल परीक्षभिमुख टिपण.',
    keyTakeaways: [
      'ऑगस्ट १८४८ मध्ये पुण्यातील बुधवार पेठेत भिडे वाड्यात महात्मा फुले आणि सावित्रीबाई फुले यांनी मुलींची पहिली शाळा सुरू केली.',
      '२४ सप्टेंबर १८७३ रोजी पुणे येथे "सत्यशोधक समाजाची" स्थापना झाली; "सर्वसाक्षी जगत्पती । त्याला नकोच मध्यस्थी ॥" हे समाजाचे ब्रीदवाक्य होते.',
      '१८८२ च्या हंटर शिक्षण आयोगापुढे (Hunter Commission) महात्मा फुले यांनी १२ वर्षांखालील मुला-मुलींना मोफत व सक्तीचे प्राथमिक शिक्षण देण्याची ऐतिहासिक मागणी केली.',
      '११ मे १८८८ रोजी मुंबईतील कोळीवाडा (मांडवी) येथील जनतेने रावबहादूर विठ्ठलराव कृष्णाजी वंडेकर यांच्या हस्ते जोतीरावांना "महात्मा" ही पदवी बहाल केली.',
    ],
    sections: [
      {
        heading: '१. स्त्री-शिक्षण आणि शूद्रातिशूद्रांच्या शिक्षणाची मुहूर्तमेढ',
        body: 'महाराष्ट्राच्या सामाजिक इतिहासात १८४८ हे वर्ष क्रांतिकारी ठरले. थॉमस पेन यांच्या "Rights of Man" या ग्रंथातून प्रेरणा घेऊन महात्मा फुले यांनी मानवी समता आणि स्वातंत्र्याचा पुरस्कार केला. १८४८ मध्ये भिडे वाड्यात मुलींची पहिली शाळा काढल्यानंतर १८५१ मध्ये रास्ता पेठ आणि वेताळ पेठेत आणखी शाळा सुरू केल्या. अस्पृश्यांच्या मुलांसाठी त्यांनी स्वतःच्या घरातील पाण्याचा हौद खुला केला आणि १८५२ मध्ये "पूना फीमेल स्कूल" व अस्पृश्यता निवारणाच्या कार्याबद्दल ब्रिटिश सरकारने विश्रामबाग वाड्यात त्यांचा मेजर कॅन्डी यांच्या हस्ते जाहीर सत्कार केला.',
        examNote:
          'MPSC मुख्य परीक्षेत महात्मा फुले यांच्या साहित्यकृतींचा कालानुक्रम विचारला जातो: तृतीय रत्न (१८५५ - नाटक), छत्रपती शिवाजीराजे भोसले यांचा पोवाडा (१८६९), ब्राह्मणांचे कसब (१८६९), गुलामगिरी (१८७३), शेतकऱ्यांचा आसूड (१८८३), इशारा (१८८५), सार्वजनिक सत्यधर्म (१८९१ - मरणोत्तर प्रकाशित).',
      },
      {
        heading: '२. शेतकऱ्यांचा आसूड आणि कृषी अर्थव्यवस्थेचे वास्तववादी विश्लेषण',
        body: '"विद्येविना मती गेली, मतीविना नीती गेली, नीतीविना गती गेली, गतीविना वित्त गेले, वित्ताविना शूद्र खचले, इतके अनर्थ एका अविद्येने केले!" या शब्दांत शिक्षणाचे महत्त्व सांगतानाच महात्मा फुले यांनी १८८३ मध्ये "शेतकऱ्यांचा आसूड" या ग्रंथातून ब्रिटिश महसूल व्यवस्था, जंगल कायदे आणि सावकारी पाश यांमुळे होणाऱ्या शेतकऱ्यांच्या शोषणाचे भेदक चित्रण केले. शेतकऱ्यांच्या मुलांसाठी कृषी व तांत्रिक शिक्षण, पाटबंधारे व धरणे बांधणे, आणि पशुसंवर्धन यांवर त्यांनी दिलेला भर आजच्या कृषी धोरणाचा पाया मानला जातो.',
      },
    ],
    pyqQuestion: {
      year: 'MPSC संयुक्त गट ब पूर्व परीक्षा २०२३',
      question: 'महात्मा जोतीराव फुले यांनी खालीलपैकी कोणता ग्रंथ अमेरिकेतील कृष्णवर्णीयांना गुलामगिरीतून मुक्त करणाऱ्या सदाचरणी लोकांना अर्पण केला होता?',
      options: [
        'शेतकऱ्यांचा आसूड (१८८३)',
        'गुलामगिरी (१८७३)',
        'सार्वजनिक सत्यधर्म पुस्तक (१८९१)',
        'तृतीय रत्न (१८५५)',
      ],
      correctIndex: 1,
      explanation:
        'अचूक उत्तर (२): १८७३ मध्ये प्रकाशित झालेला "गुलामगिरी" हा ग्रंथ महात्मा फुले यांनी अमेरिकेतील निग्रो लोकांना गुलामगिरीतून मुक्त करणाऱ्या अमेरिकन जनतेस सस्नेह अर्पण केला होता.',
    },
    recommendedBookIds: ['book-kathare-history'],
  },
  {
    id: 'art-maharashtra-economic-survey',
    subdomain: 'currentaffairs',
    slug: 'maharashtra-economic-survey-budget-highlights-mpsc-2026',
    titleMr: 'महाराष्ट्राची आर्थिक पाहणी आणि अर्थसंकल्पीय ठळक वैशिष्ट्ये: १ ट्रिलियन डॉलर अर्थव्यवस्थेचे उद्दिष्ट',
    titleEn: 'Maharashtra Economic Survey & Fiscal Deficit Indicators for MPSC Prelims & Mains',
    subject: 'Economy',
    examTarget: 'MPSC Rajyaseva',
    paperCode: 'GS Paper IV · भारतीय व महाराष्ट्राची अर्थव्यवस्था',
    wordCount: 1480,
    readTimeMinutes: 7,
    publishedDate: '20 October 2026',
    lastUpdated: '24 October 2026',
    author: 'अर्थशास्त्र संशोधन कक्ष, MPSC Sarathi',
    authorCredential: 'M.A. Economics (Gokhale Institute Alumni)',
    excerpt:
      'राज्याचे स्थूल राज्य उत्पन्न (GSDP), कृषी-उद्योग-सेवा क्षेत्रांचा वाटा, राजकोषीय तूट (Fiscal Deficit) आणि थेट परकीय गुंतवणुकीमध्ये (FDI) महाराष्ट्राचे अव्वल स्थान.',
    keyTakeaways: [
      'देशाच्या एकूण स्थूल राष्ट्रीय उत्पन्नात (GDP) महाराष्ट्राचा वाटा सर्वाधिक म्हणजेच सुमारे १३.५% ते १४% इतका कायम आहे.',
      'राज्याच्या GSDP मध्ये सेवा क्षेत्राचा (Services Sector) वाटा सर्वाधिक (सुमारे ५६%), त्याखालोखाल उद्योग क्षेत्र (२७%) आणि कृषी व संलग्न क्षेत्राचा वाटा सुमारे १२-१३% आहे.',
      'भारतात येणाऱ्या एकूण थेट परकीय गुंतवणुकीपैकी (FDI Equity Inflows) सुमारे ३०% पेक्षा अधिक गुंतवणूक एकट्या महाराष्ट्र राज्यात आकर्षित होते.',
      'राजकोषीय उत्तरदायित्व व अर्थसंकल्पीय व्यवस्थापन (FRBM) कायद्यानुसार राजकोषीय तूट GSDP च्या ३% च्या मर्यादेत राखण्याचे उद्दिष्ट निश्चित केले आहे.',
    ],
    sections: [
      {
        heading: '१. क्षेत्रीय योगदान आणि दरडोई उत्पन्नाचा कल',
        body: 'महाराष्ट्र हे भारतातील सर्वाधिक औद्योगिकीकरण झालेले आणि सेवा क्षेत्रात आघाडीवर असलेले राज्य आहे. राज्याच्या आर्थिक पाहणी अहवालानुसार पुणे, ठाणे, मुंबई आणि नागपूर या जिल्ह्यांचा राज्याच्या उत्पन्नात मोठा वाटा आहे. तथापि, प्रादेशिक असमतोल दूर करण्यासाठी विदर्भ आणि मराठवाड्यात सिंचन प्रकल्प, समृद्धी महामार्ग संलग्न लॉजिस्टिक्स पार्क्स आणि टेक्सटाईल क्लस्टर्स विकसित करण्यावर भर दिला जात आहे.',
        examNote:
          'परीक्षेसाठी अत्यंत महत्त्वाचे: महाराष्ट्राचे दरडोई राज्य उत्पन्न (Per Capita State Income) राष्ट्रीय सरासरीपेक्षा सुमारे १.५ पटीने जास्त आहे; परंतु मोठ्या राज्यांच्या यादीत तेलंगणा, कर्नाटक व हरियाणा यांच्यासोबत महाराष्ट्राची स्पर्धा कायम राहते.',
      },
      {
        heading: '२. महिला सक्षमीकरण, कृषी सौर वाहिनी आणि पायाभूत प्रकल्प',
        body: 'मुख्यमंत्री माझी लाडकी बहीण योजना, लेक लाडकी योजना, आणि मुख्यमंत्री बळीराजा मोफत वीज योजना या सामाजिक व कृषी कल्याणकारी योजनांसोबतच "मुख्यमंत्री सौर कृषी वाहिनी योजना २.०" अंतर्गत २०२६ पर्यंत कृषी पंपांना दिवसा वीजपुरवठा करण्यासाठी सौर ऊर्जेचे विकेंद्रीत जाळे उभारण्यात येत आहे. MPSC मुख्य परीक्षेत सामाजिक क्षेत्रावरील खर्च आणि भांडवली खर्च (Capital Expenditure) यांचे गुणोत्तर विचारले जाते.',
      },
    ],
    pyqQuestion: {
      year: 'MPSC राज्यसेवा मुख्य परीक्षा २०२४',
      question: 'महाराष्ट्राच्या स्थूल राज्य उत्पन्नात (GSDP) खालीलपैकी कोणत्या क्षेत्रांचा वाटा "उतरत्या क्रमाने" (Descending Order) अचूक आहे?',
      options: [
        'उद्योग क्षेत्र > सेवा क्षेत्र > कृषी व संलग्न क्षेत्र',
        'सेवा क्षेत्र > उद्योग क्षेत्र > कृषी व संलग्न क्षेत्र',
        'कृषी व संलग्न क्षेत्र > उद्योग क्षेत्र > सेवा क्षेत्र',
        'सेवा क्षेत्र > कृषी व संलग्न क्षेत्र > उद्योग क्षेत्र',
      ],
      correctIndex: 1,
      explanation:
        'अचूक उत्तर (२): महाराष्ट्राच्या अर्थव्यवस्थेत सेवा क्षेत्राचा वाटा सर्वाधिक (~५६%), त्यानंतर उद्योग क्षेत्र (~२७%) आणि तिसऱ्या क्रमांकावर कृषी व संलग्न क्षेत्र (~१२-१३%) येते.',
    },
    recommendedBookIds: ['book-kolambe-economy'],
  },
  {
    id: 'art-western-ghats-maharashtra-geography',
    subdomain: 'pyq',
    slug: 'sahydri-western-ghats-mountain-passes-rivers-maharashtra-pyq',
    titleMr: 'सह्याद्री पर्वतरांग (पश्चिम घाट), महत्त्वाचे घाटमार्ग आणि महाराष्ट्रातील प्रमुख नदीप्रणाली',
    titleEn: 'Western Ghats Physiography, Mountain Passes (Ghats) & River Basins of Maharashtra',
    subject: 'Geography',
    examTarget: 'Combine Group B & C',
    paperCode: 'PYQ Analysis · महाराष्ट्राचा प्राकृतिक भूगोल',
    wordCount: 1390,
    readTimeMinutes: 6,
    publishedDate: '12 October 2026',
    lastUpdated: '22 October 2026',
    author: 'प्रा. व्ही. देशमुख (भूगोल विभाग)',
    authorCredential: 'NET/SET Geography · १० वर्षे अध्यापन अनुभव',
    excerpt:
      'सह्याद्रीतील सर्वोच्च शिखरे (कळसूबाई, साल्हेर, महाबळेश्वर), उत्तरेकडून दक्षिणेकडे घाटमार्गांचा क्रम आणि गोदावरी व कृष्णा खोऱ्यातील जलविभाजक डोंगररांगा.',
    keyTakeaways: [
      'महाराष्ट्रातील सर्वोच्च शिखरांचा उतरता क्रम ("क-सा-मी-ह-स-त"): कळसूबाई (१६४६ मी.), साल्हेर (१५६७ मी.), महाबळेश्वर (१४३८ मी.), हरिश्चंद्रगड (१४२४ मी.), सप्तशृंगी (१४१६ मी.), तोरणा (१४०४ मी.).',
      'सह्याद्री पर्वतामुळे महाराष्ट्रातील नद्यांचे "पूर्ववाहिनी" (गोदावरी, भीमा, कृष्णा, तापी-पूर्णा - एकंदर तापी पश्चिमवाहिनी) आणि "पश्चिमवाहिनी" (कोकणातील उल्हास, वैतरणा, सावित्री, वशिष्ठी) असे दोन गट पडतात.',
      'सातमाळा-अजिंठा डोंगररांग ही तापी आणि गोदावरी खोऱ्या दरम्यान, हरिश्चंद्र-बालाघाट ही गोदावरी आणि भीमा खोऱ्या दरम्यान, तर शंभू महादेव डोंगररांग ही भीमा आणि कृष्णा खोऱ्या दरम्यान मुख्य जलविभाजक आहे.',
    ],
    sections: [
      {
        heading: '१. सह्याद्रीतील प्रमुख घाटमार्ग (उत्तरेकडून दक्षिणेकडे क्रम)',
        body: 'कोकण किनारपट्टीला महाराष्ट्र पठाराशी (देशाशी) जोडणाऱ्या सह्याद्रीतील खिंडींना "घाट" म्हणतात. MPSC च्या प्रत्येक पूर्व व मुख्य परीक्षेत घाटांच्या जोड्या किंवा त्यांचा उत्तरेकडून दक्षिणेकडे क्रम विचारला जातो. थळ घाट (कसारा घाट) मुंबई-नाशिक महामार्गावर, माळशेज घाट ठाणे (कल्याण)-अहिल्यानगर मार्गावर, बोर घाट मुंबई (खोपोली)-पुणे (खंडाळा) मार्गावर, वरंधा घाट भोर-महाड मार्गावर, आंबेनळी घाट महाबळेश्वर-पोलादपूर मार्गावर, कुंभार्ली घाट कराड-चिपळूण मार्गावर, आंबा घाट कोल्हापूर-रत्नागिरी मार्गावर, फोंडा घाट कोल्हापूर-पणजी मार्गावर आणि आंबोली घाट सावंतवाडी-बेळगाव/कोल्हापूर मार्गावर स्थित आहे.',
        examNote:
          'उत्तरेकडून दक्षिणेकडे अचूक क्रम: थळ घाट → माळशेज घाट → बोर घाट → वरंधा घाट → कुंभार्ली घाट → आंबा घाट → फोंडा घाट → आंबोली घाट.',
      },
      {
        heading: '२. गोदावरी नदीखोरे: भारतातील व महाराष्ट्रातील सर्वात मोठे खोरे',
        body: 'गोदावरी नदीचा उगम नाशिक जिल्ह्यातील त्र्यंबकेश्वर जवळ ब्रह्मगिरी डोंगरावर होतो. गोदावरी नदीची एकूण लांबी १,४६५ किमी असून महाराष्ट्रातील लांबी ६६८ किमी आहे. गोदावरी खोऱ्याने महाराष्ट्राच्या एकूण क्षेत्रफळापैकी सुमारे ४९% क्षेत्र व्यापले आहे. दारणा, प्रवरा, सिंदफणा, बिंदुसरा या उजव्या तीरावरील, तर कादवा, दक्षिण पूर्णा, प्राणहिता (वर्धा-वैनगंगा-पैनगंगा संयुक्त प्रवाह) आणि इंद्रावती या डाव्या तीरावरील प्रमुख उपनद्या आहेत.',
      },
    ],
    pyqQuestion: {
      year: 'MPSC कम्बाईन गट क पूर्व परीक्षा २०२४',
      question: 'खालीलपैकी कोणती डोंगररांग "गोदावरी नदीखोरे" आणि "भीमा नदीखोरे" यांना एकमेकांपासून अलग करते?',
      options: [
        'सातमाळा - अजिंठा डोंगररांग',
        'हरिश्चंद्र - बालाघाट डोंगररांग',
        'शंभू महादेव डोंगररांग',
        'सातपुडा पर्वतरांग',
      ],
      correctIndex: 1,
      explanation:
        'अचूक उत्तर (२): हरिश्चंद्र-बालाघाट डोंगररांग उत्तरेकडील गोदावरी खोरे आणि दक्षिणेकडील भीमा खोरे यांदरम्यान जलविभाजक म्हणून कार्य करते.',
    },
    recommendedBookIds: ['book-savadi-geography'],
  },
  {
    id: 'art-rajyaseva-descriptive-strategy-sponsored',
    subdomain: 'main',
    slug: 'mpsc-rajyaseva-new-descriptive-pattern-answer-writing-strategy',
    titleMr: 'MPSC राज्यसेवा मुख्य परीक्षा नवीन वर्णनात्मक (Descriptive) पॅटर्न: १७५० गुणांचे उत्तरलेखन तंत्र',
    titleEn: 'MPSC Rajyaseva Mains New Descriptive Pattern: GS I-IV, Essay & Ethics Strategy',
    subject: 'Exam Strategy',
    examTarget: 'MPSC Rajyaseva',
    paperCode: 'Strategy Guide · राज्यसेवा वर्णनात्मक मुख्य परीक्षा',
    wordCount: 1790,
    readTimeMinutes: 9,
    publishedDate: '22 October 2026',
    lastUpdated: '24 October 2026',
    author: 'सह्याद्री आयएएस व एमपीएससी अभ्यास मंडळ (पुणे)',
    authorCredential: 'प्रायोजित विशेष मार्गदर्शन लेख (Sponsored Educational Feature)',
    excerpt:
      'UPSC च्या धर्तीवर लागू झालेल्या MPSC राज्यसेवा वर्णनात्मक मुख्य परीक्षेतील एकूण ९ पेपर्स (१७५० लेखी गुण + २७५ मुलाखत = २०२५ गुण), मराठीतून उत्तरलेखनाची रचना आणि निबंध व नीतिशास्त्र (GS-IV) विषयात सर्वाधिक गुण मिळवण्याचे सूत्र.',
    keyTakeaways: [
      'नवीन वर्णनात्मक रचनेत भाषा पेपर्स १ व २ (मराठी व इंग्रजी - प्रत्येकी ३०० गुण) हे केवळ पात्रता (Qualifying - २५% गुण आवश्यक) स्वरूपाचे आहेत.',
      'गुणवत्ता यादीसाठी (Merit List) निबंध (२५० गुण), सामान्य अध्ययन १ ते ४ (प्रत्येकी २५० गुण = १००० गुण) आणि वैकल्पिक विषयाचे २ पेपर्स (प्रत्येकी २५० गुण = ५०० गुण) असे एकूण १७५० गुण ग्राह्य धरले जातात.',
      'प्रत्येक १० गुणांच्या प्रश्नासाठी दीडशे (१५०) शब्द आणि १५ गुणांच्या प्रश्नासाठी अडीचशे (२५०) शब्दांची मर्यादा पाळून ७ ते ८ मिनिटांत उत्तर पूर्ण करण्याचा सराव आवश्यक आहे.',
      'उत्तराची रचना: १) अचूक प्रास्ताविक (व्याख्या किंवा ऐतिहासिक/घटनात्मक संदर्भ), २) मुख्य गाभा (उपमुद्दे, प्रवाह तक्ते, महाराष्ट्राचा नकाशा), ३) सकारात्मक व संविधानशील निष्कर्ष.',
    ],
    sections: [
      {
        heading: '१. सामान्य अध्ययन (GS १ ते ४) मध्ये महाराष्ट्राचा विशेष संदर्भ कसा जोडावा?',
        body: 'UPSC आणि MPSC च्या वर्णनात्मक अभ्यासक्रमात मूलभूत साम्य असले तरी MPSC च्या प्रत्येक पेपरमध्ये महाराष्ट्राचा इतिहास, भूगोल, राजकारण आणि अर्थव्यवस्था यांना विशेष भारांश (Weightage) दिला आहे. कोणत्याही राष्ट्रीय प्रश्नाचे उत्तर लिहिताना—उदाहरणार्थ महिला सक्षमीकरण, कृषी संकट किंवा शहरीकरण—त्यामध्ये महाराष्ट्राच्या आर्थिक पाहणीतील आकडेवारी, राज्यातील यशस्वी प्रशासकीय उपक्रम (उदा. हिवरे बाजार, राळेगणसिद्धी जलसंधारण मॉडेल, किंवा गडचिरोलीतील आरोग्य उपक्रम) यांचा उल्लेख केल्यास परीक्षकावर उत्तम प्रभाव पडतो.',
        examNote:
          'महत्त्वाची टीप: वैकल्पिक विषय (Optional Subject) निवडताना मागील ३ महिन्यांत ज्या विषयाचे दर्जेदार मराठी संदर्भ साहित्य आणि मागील प्रश्नपत्रिका उपलब्ध आहेत (उदा. इतिहास, भूगोल, राज्यशास्त्र, समाजशास्त्र, मराठी साहित्य किंवा लोकप्रशासन) त्याचीच निवड करावी.',
      },
      {
        heading: '२. नीतिशास्त्र (GS Paper IV - Ethics) व केस स्टडीज सोडवण्याची पद्धत',
        body: 'सामान्य अध्ययन पेपर ४ हा कमी अभ्यासात सर्वाधिक गुण (१२० ते १४०+) मिळवून देणारा पेपर मानला जातो. यामध्ये सत्यनिष्ठा (Integrity), वस्तुनिष्ठता, समानुभूती (Empathy) आणि प्रशासकीय नैतिकता या संकल्पनांच्या स्वतःच्या शब्दांतील सोप्या व्याख्या आणि छत्रपती शिवाजी महाराज, राजर्षी शाहू महाराज, महात्मा गांधी, डॉ. ए.पी.जे. अब्दुल कलाम यांच्या जीवनातील प्रत्यक्ष उदाहरणे तयार ठेवावीत.',
      },
    ],
    recommendedBookIds: ['book-laxmikanth-mr', 'book-kolambe-economy'],
    isSponsored: true,
    sponsorName: 'ज्ञानेश्वर करिअर अकादमी, सदाशिव पेठ, पुणे (MPSC राज्यसेवा मुख्य टेस्ट सिरीज २०२६)',
    sponsorCtaText: 'मोफत उत्तरलेखन नमुना पुस्तिका (Model Answer Booklet PDF) पहा',
    sponsorCtaUrl: 'https://notes.mpscsarathi.online/descriptive-model-answers',
  },
];

export const INITIAL_SPONSORED_SLOTS: SponsoredSlot[] = [
  {
    id: 'slot-1',
    slotName: 'संपादकीय भागीदार लेख (Native Sponsored Study Article)',
    placementLocation: 'Main Portal (mpscsarathi.online) + Notes Subdomain Top Feed',
    subdomainTarget: 'mpscsarathi.online / notes.mpscsarathi.online',
    monthlyRateInr: 6500,
    currentSponsor: 'ज्ञानेश्वर करिअर अकादमी, पुणे',
    status: 'Booked',
    deliverables: [
      '१५००+ शब्दांचा कायमस्वरूपी SEO-ऑप्टिमाइझ्ड शैक्षणिक लेख',
      'लेखाच्या सुरुवातीस व शेवटी स्पष्ट "Sponsored / भागीदार लेख" लेबल (rel="sponsored" सह)',
      'मासिक २५,०००+ राज्यसेवा व कम्बाईन विद्यार्थ्यांपर्यंत थेट पोहोच',
    ],
    disclosureTag: 'Sponsored',
  },
  {
    id: 'slot-2',
    slotName: 'सराव प्रश्नपत्रिका विभाग प्रायोजकत्व (PYQ Subdomain Header Partner)',
    placementLocation: 'pyq.mpscsarathi.online – प्रत्येक प्रश्नपत्रिका विश्लेषणाखाली',
    subdomainTarget: 'pyq.mpscsarathi.online',
    monthlyRateInr: 4800,
    currentSponsor: 'सह्याद्री टेस्ट सिरीज (छत्रपती संभाजीनगर)',
    status: 'Booked',
    deliverables: [
      'सर्व ६४+ PYQ पेजेसवर टेस्ट सिरीजची अधिकृत माहिती व सराव लिंक',
      'मोबाईल व डेस्कटॉपवर AdSense धोरणांचे १००% पालन करणारी स्वच्छ मांडणी',
    ],
    disclosureTag: 'Partner Post',
  },
  {
    id: 'slot-3',
    slotName: 'चालू घडामोडी मासिक विशेषांक स्पॉन्सरशिप (Current Affairs Digest Slot)',
    placementLocation: 'currentaffairs.mpscsarathi.online – दैनंदिन चालू घडामोडी विभाग',
    subdomainTarget: 'currentaffairs.mpscsarathi.online',
    monthlyRateInr: 4200,
    currentSponsor: null,
    status: 'Available',
    deliverables: [
      'दैनंदिन चालू घडामोडी वाचणाऱ्या ८०,०००+ विद्यार्थ्यांसमोर प्रकाशनाची ओळख',
      'पुणे, नाशिक, नागपूर व कोल्हापूरमधील नामांकित प्रकाशन संस्थांसाठी राखीव',
    ],
    disclosureTag: 'Sponsored',
  },
  {
    id: 'slot-4',
    slotName: 'संदर्भ ग्रंथालय फीचर्ड प्रकाशन स्लॉट (Bookstore Featured Publisher)',
    placementLocation: 'books.mpscsarathi.online – टॉप बुकलिस्ट तुलना तक्ता',
    subdomainTarget: 'books.mpscsarathi.online',
    monthlyRateInr: 3500,
    currentSponsor: null,
    status: 'Available',
    deliverables: [
      'नवीन आवृत्तीच्या पुस्तकाचे सखोल परीक्षण (Editorial Book Review)',
      'Amazon व Flipkart सोबत प्रकाशकाच्या थेट खरेदी लिंकचा समावेश',
    ],
    disclosureTag: 'Partner Post',
  },
];

export const INITIAL_ADSENSE_CHECKS: AdSenseCheckItem[] = [
  {
    id: 'chk-1',
    category: 'Content Quality',
    title: 'Original Long-Form Marathi & Bilingual Content (१२००+ शब्द प्रति लेख)',
    descriptionMr:
      'AdSense च्या "Low Value Content" किंवा "Thin Content" त्रुटी टाळण्यासाठी प्रत्येक लेखात किमान १,००० ते १,६०० शब्दांचे मूळ, कॉपी-न-केलेले व परीक्षभिमुख विश्लेषण असणे आवश्यक आहे.',
    status: 'Passed',
    metricValue: '1,564 avg words/post',
    targetValue: '≥ 1,000 words/post',
  },
  {
    id: 'chk-2',
    category: 'Mandatory Pages',
    title: 'AdSense Mandatory Trust Pages (About, Contact, Privacy Policy, Disclaimer, Terms)',
    descriptionMr:
      'Google AdSense रिव्ह्यू टीम सर्वात आधी वेबसाईटच्या फुटरमध्ये About Us, Contact Us, Privacy Policy (DART Cookie उल्लेखासह) आणि Disclaimer पेजेस कार्यरत आहेत का हे तपासते.',
    status: 'Passed',
    metricValue: '5 / 5 Pages Live',
    targetValue: 'All 5 Required',
    actionButtonLabel: 'Inspect Legal Pages',
    targetTab: 'compliance',
  },
  {
    id: 'chk-3',
    category: 'Technical & SEO',
    title: 'Subdomain Verification & Root ads.txt Configuration',
    descriptionMr:
      'एकदा मुख्य डोमेन (mpscsarathi.online) AdSense वर अप्रूव्ह झाले की, सर्व सबडोमेन्स (notes, pyq, currentaffairs) साठी वेगळे अप्रूव्हल लागत नाही; फक्त AdSense Sites पॅनेलमध्ये सबडोमेन जोडावे लागतात.',
    status: 'Passed',
    metricValue: '5 Subdomains Mapped',
    targetValue: 'Root Domain + CNAMEs',
    actionButtonLabel: 'Configure DNS & Subdomains',
    targetTab: 'subdomains',
  },
  {
    id: 'chk-4',
    category: 'Traffic & Policy',
    title: 'Affiliate & Sponsored Link Attributes (rel="sponsored nofollow")',
    descriptionMr:
      'Google Search आणि AdSense नियमांनुसार सर्व Amazon/Flipkart Affiliate लिंक्स आणि Sponsored पोस्ट्सना स्पष्ट डिस्क्लोजर आणि rel="sponsored nofollow" टॅग असणे बंधनकारक आहे.',
    status: 'Passed',
    metricValue: '100% Compliant',
    targetValue: 'Strict ASCI & Google Policy',
    actionButtonLabel: 'View Monetization Hub',
    targetTab: 'monetization',
  },
  {
    id: 'chk-5',
    category: 'Content Quality',
    title: 'Target 35+ Pillar Articles Across Core MPSC Subjects',
    descriptionMr:
      'नवीन पेजेस व ताज्या चालू घडामोडींचे लेख नियमितपणे अपडेट केल्याने Google क्रॉलरला वेबसाईट सक्रिय असल्याचा सिग्नल मिळतो आणि अप्रूव्हल जलद होते.',
    status: 'Action Needed',
    metricValue: 'Publish New Articles',
    targetValue: '2–3 New Posts / Week',
    actionButtonLabel: 'Create New Study Page',
    targetTab: 'publish',
  },
];

export const COMPLIANCE_PAGES: CompliancePageDoc[] = [
  {
    id: 'about',
    titleMr: 'आमच्याविषयी (About MPSC Sarathi)',
    titleEn: 'About Us – Mission, Editorial Standards & Subdomain Network',
    slug: 'https://mpscsarathi.online/about-us',
    lastRevised: '24 October 2026',
    summary:
      'Official institutional overview of mpscsarathi.online, our subject-matter educators, editorial verification process, and mission to empower rural and urban Maharashtra civil service aspirants.',
    contentBlocks: [
      {
        heading: '१. आमचे ध्येय आणि स्थापना (Our Mission)',
        paragraphs: [
          'MPSC Sarathi (mpscsarathi.online) हे महाराष्ट्रातील स्पर्धा परीक्षांची तयारी करणाऱ्या लाखो विद्यार्थ्यांसाठी तयार करण्यात आलेले एक विश्वासार्ह, सखोल आणि विनामूल्य शैक्षणिक व्यासपीठ आहे. महाराष्ट्र लोकसेवा आयोगामार्फत (MPSC) घेतल्या जाणाऱ्या राज्यसेवा (वर्णनात्मक पॅटर्न), संयुक्त गट ब व गट क (PSI, STI, ASO, SR) तसेच तांत्रिक व सरळसेवा परीक्षांसाठी दर्जेदार मराठी संदर्भ साहित्य ग्रामीण भागातील शेवटच्या विद्यार्थ्यापर्यंत पोहोचवणे हा आमचा मुख्य उद्देश आहे.',
          'पुणे, छत्रपती संभाजीनगर, नाशिक, नागपूर, कोल्हापूर आणि अमरावती यांसारख्या शैक्षणिक केंद्रांमधील अनुभवी मार्गदर्शक आणि मुख्य परीक्षा दिलेल्या अभ्यासकांच्या मदतीने आम्ही प्रत्येक विषयाच्या नोट्स प्रमाण संदर्भग्रंथांच्या आधारे तयार करतो.',
        ],
      },
      {
        heading: '२. आमचे सबडोमेन नेटवर्क (Specialized Subdomain Ecosystem)',
        paragraphs: [
          'विद्यार्थ्यांना विषयानुसार अचूक माहिती जलद मिळावी यासाठी mpscsarathi.online ने विशेष सबडोमेन विभाग विकसित केले आहेत: notes.mpscsarathi.online (विषयनिहाय सखोल नोट्स), pyq.mpscsarathi.online (मागील प्रश्नपत्रिकांचे अचूक स्पष्टीकरण), currentaffairs.mpscsarathi.online (दैनंदिन चालू घडामोडी व शासकीय योजना), आणि books.mpscsarathi.online (प्रमाण संदर्भ पुस्तकांचे परीक्षण).',
        ],
      },
      {
        heading: '३. संपादकीय अचूकता धोरण (Editorial Verification Policy)',
        paragraphs: [
          'आमच्या पोर्टलवर प्रकाशित होणारा प्रत्येक लेख हा महाराष्ट्र शासनाचे अधिकृत राजपत्र, आर्थिक पाहणी अहवाल, लोकराज्य मासिक, पीआयबी (PIB) आणि एनसीईआरटी/स्टेट बोर्डाच्या पाठ्यपुस्तकांच्या आधारे तपासला जातो. कोणतीही माहिती कॉपी-पेस्ट न करता विद्यार्थ्यांना परीक्षेत थेट फायदा होईल अशा मुद्द्यांच्या स्वरूपात मांडली जाते.',
        ],
      },
    ],
  },
  {
    id: 'privacy',
    titleMr: 'गोपनीयता धोरण (Privacy Policy – AdSense Compliant)',
    titleEn: 'Privacy Policy, Cookies & Google DoubleClick DART Disclosure',
    slug: 'https://mpscsarathi.online/privacy-policy',
    lastRevised: '24 October 2026',
    summary:
      'Mandatory Google AdSense Privacy Policy detailing user data protection, log files, Google DoubleClick DART cookies, and Affiliate tracking disclosures.',
    contentBlocks: [
      {
        heading: '1. Information Collection & Log Files',
        paragraphs: [
          'At mpscsarathi.online (accessible from https://mpscsarathi.online and all its official subdomains), one of our main priorities is the privacy of our visitors. Like most standard educational websites, mpscsarathi.online uses log files containing anonymized IP addresses, browser type, Internet Service Provider (ISP), date/time stamp, and referring/exit pages strictly to analyze reading trends and improve study material accessibility.',
        ],
      },
      {
        heading: '2. Google DoubleClick DART Cookie (Mandatory AdSense Clause)',
        paragraphs: [
          'Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve advertisements to our site visitors based upon their visit to www.mpscsarathi.online and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: https://policies.google.com/technologies/ads',
        ],
      },
      {
        heading: '3. Affiliate Links & Third-Party Privacy Policies',
        paragraphs: [
          'mpscsarathi.online participates in the Amazon Associates Program and Flipkart Affiliate Program. When you click on recommended textbook links on books.mpscsarathi.online, third-party retailers may use cookies to track referral attribution at zero additional cost to the student.',
        ],
      },
    ],
  },
  {
    id: 'disclaimer',
    titleMr: 'अस्वीकरण व संलग्न प्रकटीकरण (Disclaimer & Affiliate Disclosure)',
    titleEn: 'Non-Government Affiliation & FTC/ASCI Monetization Disclosure',
    slug: 'https://mpscsarathi.online/disclaimer',
    lastRevised: '24 October 2026',
    summary:
      'Clear legal separation from the official Maharashtra Public Service Commission (mpsc.gov.in) alongside transparent Affiliate & Sponsored Post disclosures.',
    contentBlocks: [
      {
        heading: '१. शासकीय संस्थेशी संबंध नसल्याबाबत स्पष्टीकरण (Non-Official Portal Notice)',
        paragraphs: [
          'mpscsarathi.online हे पूर्णपणे खाजगी शैक्षणिक मार्गदर्शन पोर्टल आहे. आमचा महाराष्ट्र लोकसेवा आयोग (MPSC - mpsc.gov.in) किंवा महाराष्ट्र शासनाच्या कोणत्याही विभागाशी अधिकृत संबंध नाही. परीक्षेच्या अधिकृत जाहिराती, अर्ज आणि निकालांसाठी विद्यार्थ्यांनी सदैव आयोगाच्या अधिकृत संकेतस्थळाला भेट द्यावी.',
        ],
      },
      {
        heading: '२. अ‍ॅफिलिएट मार्केटिंग व प्रायोजित लेख प्रकटीकरण (Affiliate & Sponsored Disclosure)',
        paragraphs: [
          'वेबसाईटचा सर्व्हर खर्च आणि मोफत शैक्षणिक नोट्सची निर्मिती सुरू ठेवण्यासाठी आम्ही Amazon India Affiliate Program आणि निवडक शैक्षणिक संस्थांच्या प्रायोजित लेखांची (Sponsored Educational Posts) मदत घेतो. जेव्हा तुम्ही आमच्या बुकलिस्टवरील लिंकवरून पुस्तक खरेदी करता, तेव्हा तुम्हाला कोणत्याही अतिरिक्त शुल्काशिवाय आम्हाला अल्प कमिशन प्राप्त होते. आम्ही केवळ परीक्षेसाठी सर्वोत्तम असलेल्याच प्रमाण पुस्तकांची शिफारस करतो.',
        ],
      },
    ],
  },
  {
    id: 'contact',
    titleMr: 'संपर्क व जाहिरात चौकशी (Contact Us & Media Inquiries)',
    titleEn: 'Contact Editorial Desk, Report Corrections & Sponsored Post Inquiries',
    slug: 'https://mpscsarathi.online/contact-us',
    lastRevised: '24 October 2026',
    summary:
      'Direct communication channels for aspirants, educators, book publishers, and coaching institutes looking to partner with mpscsarathi.online.',
    contentBlocks: [
      {
        heading: '१. संपादकीय कक्ष व विद्यार्थी सहाय्य (Student & Editorial Desk)',
        paragraphs: [
          'तुम्हाला आमच्या कोणत्याही लेखात किंवा प्रश्नपत्रिका विश्लेषणात सुधारणा सुचवायची असल्यास किंवा नवीन विषयाच्या नोट्सची मागणी करायची असल्यास आम्हाला ईमेलद्वारे संपर्क साधा.',
          'अधिकृत ईमेल: contact@mpscsarathi.online | संपादकीय विभाग: सदाशिव पेठ शैक्षणिक संकुल परिसर, पुणे – ४११०३० (महाराष्ट्र).',
        ],
      },
      {
        heading: '२. प्रायोजित लेख व प्रकाशन भागीदारी (Sponsored Posts & Book Reviews)',
        paragraphs: [
          'जर तुमचे MPSC मार्गदर्शनाशी संबंधित कोचिंग इन्स्टिट्यूट, टेस्ट सिरीज किंवा पुस्तक प्रकाशन असेल आणि तुम्हाला mpscsarathi.online वर शैक्षणिक प्रायोजित लेख (Sponsored Article) किंवा बुक रिव्ह्यू प्रकाशित करायचा असेल, तर partners@mpscsarathi.online वर संपर्क साधा.',
        ],
      },
    ],
  },
  {
    id: 'terms',
    titleMr: 'वापराच्या अटी व शर्ती (Terms and Conditions)',
    titleEn: 'Terms of Use, Intellectual Property & Academic Fair Use',
    slug: 'https://mpscsarathi.online/terms-and-conditions',
    lastRevised: '24 October 2026',
    summary:
      'Copyright protection for original Marathi study notes published on mpscsarathi.online and guidelines for student usage.',
    contentBlocks: [
      {
        heading: '१. बौद्धिक संपदा व कॉपीराइट (Copyright & Original Content)',
        paragraphs: [
          'mpscsarathi.online वरील सर्व लेख, तक्ते, प्रश्नपत्रिका स्पष्टीकरणे आणि संपादकीय टिपणे यांचे कॉपीराइट सुरक्षित आहेत. विद्यार्थ्यांना वैयक्तिक अभ्यासासाठी या नोट्स वाचण्याची व संदर्भासह लिंक शेअर करण्याची पूर्ण मुभा आहे; तथापि, आमच्या पूर्वपरवानगीशिवाय संपूर्ण लेख इतर वेबसाईट किंवा टेलिग्राम चॅनेलवर व्यावसायिक कारणासाठी कॉपी-पेस्ट करण्यास सक्त मनाई आहे.',
        ],
      },
    ],
  },
];
