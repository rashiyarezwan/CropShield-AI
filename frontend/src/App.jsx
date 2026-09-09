import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Leaf,
  ShieldCheck,
  CloudSun,
  Map,
  Languages,
  ChevronRight,
  Activity,
  Upload,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  ThermometerSun,
  Sprout,
  Volume2,
  Droplets,
  Bug,
  CalendarDays,
  ArrowLeft,
  MapPin,
  Users,
  Search,
  Navigation,
  LogOut,
  MessageCircle,
  X,
} from "lucide-react";

import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";

/* =========================================================
   LANGUAGES
========================================================= */

const languages = [
  {
    code: "en",
    native: "English",
    name: "English",
    voice: "en-IN",
  },
  {
    code: "mr",
    native: "मराठी",
    name: "Marathi",
    voice: "mr-IN",
  },
  {
    code: "hi",
    native: "हिन्दी",
    name: "Hindi",
    voice: "hi-IN",
  },
  {
    code: "te",
    native: "తెలుగు",
    name: "Telugu",
    voice: "te-IN",
  },
  {
    code: "kn",
    native: "ಕನ್ನಡ",
    name: "Kannada",
    voice: "kn-IN",
  },
  {
    code: "gu",
    native: "ગુજરાતી",
    name: "Gujarati",
    voice: "gu-IN",
  },
  {
    code: "ta",
    native: "தமிழ்",
    name: "Tamil",
    voice: "ta-IN",
  },
  {
    code: "bn",
    native: "বাংলা",
    name: "Bengali",
    voice: "bn-IN",
  },
  {
    code: "ml",
    native: "മലയാളം",
    name: "Malayalam",
    voice: "ml-IN",
  },
  {
    code: "pa",
    native: "ਪੰਜਾਬੀ",
    name: "Punjabi",
    voice: "pa-IN",
  },
];

/* =========================================================
   TRANSLATIONS
========================================================= */

const base = {
  nav: {
    diagnosis: "Diagnosis",
    risk: "Risk Forecast",
    hotspots: "Hotspots",
    advisories: "Advisories",
    language: "Language",
  },

  systemOnline: "AI SYSTEM ONLINE",
  heroTitle: "Protect your crops",
  heroSubtitle: "before it's too late.",
  heroDescription:
    "Upload a leaf image and let CropShield's AI detect crop diseases, assess risk, and guide you toward the right action.",
  startDiagnosis: "Start Diagnosis",

  aiDiagnosis: "AI-powered diagnosis",
  riskInsights: "Real-time risk insights",

  cropHealth: "CROP HEALTH",
  diagnosisTitle: "AI Diagnosis",
  detectedCondition: "DETECTED CONDITION",
  analyzingLeaf: "Analyzing leaf...",
  ready: "Ready for analysis",
  uploadHint: "Upload a clear image of a crop leaf",

  confidence: "confidence",
  aiConfidence: "AI CONFIDENCE",
  severity: "SEVERITY",
  riskLevel: "RISK LEVEL",
  cropHealthStatus: "CROP HEALTH STATUS",

  recommendedAction: "RECOMMENDED ACTION",
  whatShouldIDo: "What should I do?",
  cropAdvisory: "CROP ADVISORY",

  listen: "Listen to advisory",
  speaking: "Speaking advisory...",

  highConfidence: "High-confidence AI diagnosis",
  expertValidation: "Expert validation recommended",

  analyzingButton: "Analyzing...",
  analyzeAnother: "Analyze Another Leaf",
  uploadLeaf: "Upload Leaf Image",
  scan: "AI is analyzing...",

  notLeaf:
    "This image does not appear to be a crop leaf. Please upload a clear tomato-leaf image.",

  riskTitle: "Crop Risk Forecast",
  overallRisk: "OVERALL RISK",
  currentConditions: "CURRENT CONDITIONS",
  fieldEnvironment: "Field Environment",
  earlyWarning: "EARLY WARNING",
  riskKicker: "EARLY WARNING SYSTEM",
  riskDescription: "Prototype risk estimate for",
  sevenDayOutlook: "7-DAY OUTLOOK",

  temperature: "Temperature",
  humidity: "Humidity",
  rainfall: "Rainfall",
  pestActivity: "Pest activity",
  cropStage: "Crop stage",

  weatherLive: "LIVE WEATHER",
  weatherUpdated: "Weather updated",
  fetchingWeather: "Fetching live weather...",
  weatherUnavailable: "Live weather unavailable",
  refreshWeather: "Refresh weather",

  fieldIntelligence: "FIELD INTELLIGENCE",
  sensorPanelTitle: "Pest Trap & Sensor",
  sensorPanelText:
    "Prototype sensor feed for the monitored field.",
  pestTrapCount: "Pest trap count",
  soilMoisture: "Soil moisture",
  sensorStatus: "Sensor status",
  refreshSensor: "Refresh sensor",
  lastUpdate: "Last update",

  expertValidationTitle: "EXPERT VALIDATION",
  expertReviewTitle: "Expert Review",
  expertReviewText:
    "Uncertain AI results can be submitted for agriculture-expert validation.",
  sendForExpert: "Send for Expert Review",
  requestExpert: "Request Expert Validation",
  caseSubmitted: "Case submitted",
  waitingValidation: "Waiting for expert validation",
  uploadFirst: "Upload a leaf image first.",

  askExpert: "Ask an expert",
  expertModalTitle: "Ask an Agriculture Expert",
  expertModalDescription:
    "Submit this case for expert review and add any field observations.",
  expertQuestionPlaceholder:
    "Describe the symptoms or add your question...",
  cancel: "Cancel",
  submitQuestion: "Submit for Review",
  questionSubmitted: "Expert request submitted.",

  hotspotsKicker: "GEOSPATIAL INTELLIGENCE",
  hotspotTitle: "Disease Hotspots",
  hotspotsDescription:
    "Visualize reported crop-health cases, identify clusters, and prioritize field inspection.",
  prototypeData: "PROTOTYPE DATA",
  reportedClusters: "REPORTED CLUSTERS",
  highCritical: "HIGH / CRITICAL",
  affectedReports: "AFFECTED REPORTS",
  fieldMap: "FIELD MAP",
  reportedActivity: "Reported Disease Activity",
  searchField: "Search field",
  resetView: "Reset view",
  mapHint: "Pan • zoom • tap a hotspot",
  recentReports: "RECENT REPORTS",
  priorityAreas: "Priority Areas",
  reportedCases: "reported cases",
  mapRisk: "RISK",
  mapReports: "Reports",
  hotspotValidation:
    "Prototype hotspot records are for demonstration. Field reports should be validated before operational decisions are made.",
  selectDistrict: "Select district",

  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",

  advisoriesKicker: "FARMER ACTION CENTER",
  advisoriesTitle: "Crop Advisories",
  advisoriesDescription:
    "Translate the AI diagnosis into clear field-level next steps, prevention habits, and monitoring guidance.",
  aiAssisted: "AI-ASSISTED GUIDANCE",
  currentCondition: "CURRENT CONDITION",
  noDiagnosis: "No diagnosis yet",
  status: "STATUS",
  immediateAction: "IMMEDIATE ACTION",
  whatToDoNow: "What to do now",
  prevention: "PREVENTION",
  reduceFutureRisk: "Reduce future risk",
  monitoring: "MONITORING",
  keepWatching: "Keep watching",

  expertTitle:
    "AI-assisted guidance — expert validation recommended",
  expertText:
    "CropShield provides decision support. Field symptoms, crop variety, local conditions, and official agricultural guidance should be considered before operational decisions.",

  fieldRoutine: "FIELD ROUTINE",
  scoutConsistently: "Scout consistently",
  scoutText:
    "Regular observation improves early detection.",
  recordKeeping: "RECORD KEEPING",
  captureLocation: "Capture location",
  recordText:
    "Use field reports to support hotspot mapping.",
  escalation: "ESCALATION",
  escalationText:
    "Escalate uncertain or spreading cases.",

  backToDiagnosis: "Back to Diagnosis",

  footer: "Built for smarter, safer farming",

  loginTitle: "Welcome to CropShield",
  loginDescription:
    "Sign in to access AI crop diagnosis, risk forecasting and field intelligence.",
  email: "Email",
  password: "Password",
  signIn: "Sign In",
  signInGoogle: "Sign in with Google",
  demoAccount: "Demo account",
  invalidCredentials:
    "Invalid demo credentials. Please check your email and password.",
  signOut: "Sign out",

  errors: {
    prediction: "Prediction failed.",
    server:
      "Unable to connect to the AI server. Please try again.",
  },
};

const translations = {
  en: base,

  mr: {
    ...base,
    nav: {
      diagnosis: "निदान",
      risk: "जोखीम अंदाज",
      hotspots: "हॉटस्पॉट्स",
      advisories: "सल्ला",
      language: "भाषा",
    },
    systemOnline: "AI प्रणाली कार्यरत",
    heroTitle: "तुमची पिके जपा",
    heroSubtitle: "उशीर होण्यापूर्वी.",
    heroDescription:
      "पिकाच्या पानाचा फोटो अपलोड करा आणि CropShield AI च्या मदतीने रोग ओळखा, जोखीम समजा आणि योग्य कृती मिळवा.",
    startDiagnosis: "निदान सुरू करा",
    aiDiagnosis: "AI-आधारित निदान",
    riskInsights: "रिअल-टाइम जोखीम माहिती",
    cropHealth: "पीक आरोग्य",
    diagnosisTitle: "AI निदान",
    detectedCondition: "ओळखलेली स्थिती",
    analyzingLeaf: "पानाचे विश्लेषण सुरू आहे...",
    ready: "विश्लेषणासाठी तयार",
    uploadHint: "पिकाच्या पानाचा स्पष्ट फोटो अपलोड करा",
    confidence: "विश्वास",
    aiConfidence: "AI विश्वास पातळी",
    severity: "तीव्रता",
    riskLevel: "जोखीम पातळी",
    cropHealthStatus: "पीक आरोग्य स्थिती",
    recommendedAction: "शिफारस केलेली कृती",
    whatShouldIDo: "काय करावे?",
    cropAdvisory: "पीक सल्ला",
    listen: "सल्ला ऐका",
    speaking: "सल्ला वाचला जात आहे...",
    highConfidence: "उच्च-विश्वास AI निदान",
    expertValidation: "तज्ज्ञ पडताळणीची शिफारस",
    analyzingButton: "विश्लेषण करत आहे...",
    analyzeAnother: "दुसरे पान तपासा",
    uploadLeaf: "पानाचा फोटो अपलोड करा",
    scan: "AI विश्लेषण करत आहे...",
    notLeaf:
      "हा फोटो पिकाच्या पानाचा दिसत नाही. कृपया टोमॅटोच्या पानाचा स्पष्ट फोटो अपलोड करा.",
    riskTitle: "पीक जोखीम अंदाज",
    overallRisk: "एकूण जोखीम",
    currentConditions: "सध्याची परिस्थिती",
    fieldEnvironment: "शेतातील परिस्थिती",
    earlyWarning: "पूर्वसूचना",
    riskKicker: "पूर्वसूचना प्रणाली",
    riskDescription: "यासाठी नमुना जोखीम अंदाज:",
    sevenDayOutlook: "७-दिवसांचा अंदाज",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "पर्जन्यमान",
    pestActivity: "कीड क्रियाशीलता",
    cropStage: "पिकाची अवस्था",
    weatherLive: "थेट हवामान",
    weatherUpdated: "हवामान अद्यतन",
    fetchingWeather: "थेट हवामान मिळवत आहे...",
    weatherUnavailable: "थेट हवामान उपलब्ध नाही",
    refreshWeather: "हवामान अद्यतनित करा",
    fieldIntelligence: "शेत बुद्धिमत्ता",
    sensorPanelTitle: "कीड सापळा आणि सेन्सर",
    sensorPanelText:
      "निरीक्षण केलेल्या शेतासाठी नमुना सेन्सर फीड.",
    pestTrapCount: "कीड सापळा संख्या",
    soilMoisture: "मातीतील आर्द्रता",
    sensorStatus: "सेन्सर स्थिती",
    refreshSensor: "सेन्सर अद्यतनित करा",
    lastUpdate: "शेवटचे अद्यतन",
    expertValidationTitle: "तज्ज्ञ पडताळणी",
    expertReviewTitle: "तज्ज्ञ पुनरावलोकन",
    expertReviewText:
      "अनिश्चित AI निकाल तज्ज्ञ पडताळणीसाठी पाठवता येतात.",
    sendForExpert: "तज्ज्ञ पडताळणीसाठी पाठवा",
    requestExpert: "तज्ज्ञ पडताळणी मागवा",
    caseSubmitted: "प्रकरण पाठवले",
    waitingValidation: "तज्ज्ञ पडताळणीची प्रतीक्षा",
    uploadFirst: "प्रथम पानाचा फोटो अपलोड करा.",
    askExpert: "तज्ज्ञांचा सल्ला घ्या",
    expertModalTitle: "कृषी तज्ज्ञांना विचारा",
    expertModalDescription:
      "हे प्रकरण तज्ज्ञांच्या पुनरावलोकनासाठी पाठवा आणि शेतातील निरीक्षणे जोडा.",
    expertQuestionPlaceholder:
      "लक्षणे किंवा तुमचा प्रश्न येथे लिहा...",
    cancel: "रद्द करा",
    submitQuestion: "पडताळणीसाठी पाठवा",
    questionSubmitted: "तज्ज्ञ विनंती पाठवली.",
    hotspotsKicker: "भौगोलिक माहिती",
    hotspotTitle: "रोग हॉटस्पॉट्स",
    hotspotsDescription:
      "नोंदवलेली पीक-आरोग्य प्रकरणे पहा, समूह ओळखा आणि शेत तपासणीला प्राधान्य द्या.",
    prototypeData: "प्रोटोटाइप डेटा",
    reportedClusters: "नोंदवलेले समूह",
    highCritical: "उच्च / गंभीर",
    affectedReports: "प्रभावित अहवाल",
    fieldMap: "शेत नकाशा",
    reportedActivity: "नोंदवलेली रोग क्रियाशीलता",
    searchField: "शेत शोधा",
    resetView: "नकाशा रीसेट",
    mapHint: "हलवा • झूम करा • हॉटस्पॉटवर टॅप करा",
    recentReports: "अलीकडील अहवाल",
    priorityAreas: "प्राधान्य क्षेत्रे",
    reportedCases: "नोंदवलेली प्रकरणे",
    mapRisk: "जोखीम",
    mapReports: "अहवाल",
    selectDistrict: "जिल्हा निवडा",
    critical: "गंभीर",
    high: "उच्च",
    medium: "मध्यम",
    low: "कमी",
    advisoriesKicker: "शेतकरी कृती केंद्र",
    advisoriesTitle: "पीक सल्ला",
    advisoriesDescription:
      "AI निदानाचे स्पष्ट पुढील टप्पे, प्रतिबंध आणि निरीक्षण मार्गदर्शनात रूपांतर करा.",
    aiAssisted: "AI-सहाय्यित मार्गदर्शन",
    currentCondition: "सध्याची स्थिती",
    noDiagnosis: "अद्याप निदान नाही",
    status: "स्थिती",
    immediateAction: "तात्काळ कृती",
    whatToDoNow: "आता काय करावे",
    prevention: "प्रतिबंध",
    reduceFutureRisk: "भविष्यातील जोखीम कमी करा",
    monitoring: "निरीक्षण",
    keepWatching: "लक्ष ठेवा",
    expertTitle:
      "AI-सहाय्यित मार्गदर्शन — तज्ज्ञ पडताळणीची शिफारस",
    expertText:
      "कृती करण्यापूर्वी शेतातील लक्षणे, पिकाची जात, स्थानिक परिस्थिती आणि अधिकृत कृषी मार्गदर्शन विचारात घ्यावे.",
    fieldRoutine: "शेतातील दिनचर्या",
    scoutConsistently: "नियमित पाहणी करा",
    scoutText:
      "नियमित निरीक्षणामुळे रोग लवकर ओळखता येतो.",
    recordKeeping: "नोंद ठेवणे",
    captureLocation: "स्थान नोंदवा",
    recordText:
      "फील्ड अहवाल हॉटस्पॉट नकाशासाठी वापरा.",
    escalation: "तज्ज्ञ मदत",
    escalationText:
      "अनिश्चित किंवा वाढणारी प्रकरणे तज्ज्ञांकडे पाठवा.",
    backToDiagnosis: "निदानाकडे परत जा",
    footer: "अधिक स्मार्ट आणि सुरक्षित शेतीसाठी",
    loginTitle: "CropShield मध्ये स्वागत आहे",
    loginDescription:
      "AI पीक निदान, जोखीम अंदाज आणि शेत बुद्धिमत्ता वापरण्यासाठी साइन इन करा.",
    email: "ईमेल",
    password: "पासवर्ड",
    signIn: "साइन इन",
    signInGoogle: "Google सह साइन इन करा",
    demoAccount: "डेमो खाते",
    invalidCredentials: "डेमो खाते तपशील चुकीचे आहेत.",
    signOut: "साइन आउट",
  },

  hi: {
    ...base,
    nav: {
      diagnosis: "निदान",
      risk: "जोखिम पूर्वानुमान",
      hotspots: "हॉटस्पॉट",
      advisories: "सलाह",
      language: "भाषा",
    },
    systemOnline: "AI सिस्टम ऑनलाइन",
    heroTitle: "अपनी फसलों की रक्षा करें",
    heroSubtitle: "बहुत देर होने से पहले।",
    heroDescription:
      "पत्ती की तस्वीर अपलोड करें और CropShield AI से रोग की पहचान, जोखिम और आगे की कार्रवाई जानें।",
    startDiagnosis: "निदान शुरू करें",
    aiDiagnosis: "AI-संचालित निदान",
    riskInsights: "रियल-टाइम जोखिम जानकारी",
    cropHealth: "फसल स्वास्थ्य",
    diagnosisTitle: "AI निदान",
    detectedCondition: "पहचानी गई स्थिति",
    analyzingLeaf: "पत्ती का विश्लेषण हो रहा है...",
    ready: "विश्लेषण के लिए तैयार",
    uploadHint: "फसल की पत्ती की साफ तस्वीर अपलोड करें",
    confidence: "विश्वास",
    aiConfidence: "AI विश्वास",
    severity: "गंभीरता",
    riskLevel: "जोखिम स्तर",
    cropHealthStatus: "फसल स्वास्थ्य स्थिति",
    recommendedAction: "अनुशंसित कार्रवाई",
    whatShouldIDo: "क्या करें?",
    cropAdvisory: "फसल सलाह",
    listen: "सलाह सुनें",
    speaking: "सलाह सुनाई जा रही है...",
    highConfidence: "उच्च-विश्वास AI निदान",
    expertValidation: "विशेषज्ञ सत्यापन की सलाह",
    analyzingButton: "विश्लेषण हो रहा है...",
    analyzeAnother: "दूसरी पत्ती जांचें",
    uploadLeaf: "पत्ती की तस्वीर अपलोड करें",
    scan: "AI विश्लेषण कर रहा है...",
    notLeaf:
      "यह तस्वीर फसल की पत्ती जैसी नहीं लगती। कृपया साफ टमाटर-पत्ती की तस्वीर अपलोड करें।",
    riskTitle: "फसल जोखिम पूर्वानुमान",
    overallRisk: "कुल जोखिम",
    currentConditions: "वर्तमान स्थिति",
    fieldEnvironment: "खेत का वातावरण",
    earlyWarning: "पूर्व चेतावनी",
    riskKicker: "पूर्व चेतावनी प्रणाली",
    riskDescription: "इसके लिए प्रोटोटाइप जोखिम अनुमान:",
    sevenDayOutlook: "7-दिन का पूर्वानुमान",
    temperature: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा",
    pestActivity: "कीट गतिविधि",
    cropStage: "फसल अवस्था",
    weatherLive: "लाइव मौसम",
    weatherUpdated: "मौसम अपडेट",
    fetchingWeather: "लाइव मौसम प्राप्त हो रहा है...",
    weatherUnavailable: "लाइव मौसम उपलब्ध नहीं है",
    refreshWeather: "मौसम अपडेट करें",
    fieldIntelligence: "खेत की जानकारी",
    sensorPanelTitle: "कीट ट्रैप और सेंसर",
    sensorPanelText:
      "निगरानी किए गए खेत के लिए प्रोटोटाइप सेंसर फीड।",
    pestTrapCount: "कीट ट्रैप संख्या",
    soilMoisture: "मिट्टी की नमी",
    sensorStatus: "सेंसर स्थिति",
    refreshSensor: "सेंसर अपडेट करें",
    lastUpdate: "अंतिम अपडेट",
    expertValidationTitle: "विशेषज्ञ सत्यापन",
    expertReviewTitle: "विशेषज्ञ समीक्षा",
    expertReviewText:
      "अनिश्चित AI परिणाम विशेषज्ञ सत्यापन के लिए भेजे जा सकते हैं।",
    sendForExpert: "विशेषज्ञ समीक्षा के लिए भेजें",
    requestExpert: "विशेषज्ञ सत्यापन का अनुरोध करें",
    caseSubmitted: "केस भेजा गया",
    waitingValidation: "विशेषज्ञ सत्यापन की प्रतीक्षा",
    uploadFirst: "पहले पत्ती की तस्वीर अपलोड करें।",
    askExpert: "विशेषज्ञ से पूछें",
    expertModalTitle: "कृषि विशेषज्ञ से पूछें",
    expertModalDescription:
      "इस केस को विशेषज्ञ समीक्षा के लिए भेजें और खेत की जानकारी जोड़ें।",
    expertQuestionPlaceholder:
      "लक्षण या अपना प्रश्न लिखें...",
    cancel: "रद्द करें",
    submitQuestion: "समीक्षा के लिए भेजें",
    questionSubmitted: "विशेषज्ञ अनुरोध भेजा गया।",
    hotspotsKicker: "भौगोलिक जानकारी",
    hotspotTitle: "रोग हॉटस्पॉट",
    hotspotsDescription:
      "रिपोर्ट किए गए फसल स्वास्थ्य मामलों को देखें और खेत निरीक्षण को प्राथमिकता दें।",
    prototypeData: "प्रोटोटाइप डेटा",
    reportedClusters: "रिपोर्ट किए गए क्लस्टर",
    highCritical: "उच्च / गंभीर",
    affectedReports: "प्रभावित रिपोर्ट",
    fieldMap: "खेत का नक्शा",
    reportedActivity: "रिपोर्ट की गई रोग गतिविधि",
    searchField: "खेत खोजें",
    resetView: "नक्शा रीसेट",
    mapHint: "स्थान बदलें • ज़ूम करें • हॉटस्पॉट दबाएं",
    recentReports: "हाल की रिपोर्ट",
    priorityAreas: "प्राथमिक क्षेत्र",
    reportedCases: "रिपोर्ट किए गए मामले",
    mapRisk: "जोखिम",
    mapReports: "रिपोर्ट",
    selectDistrict: "जिला चुनें",
    critical: "गंभीर",
    high: "उच्च",
    medium: "मध्यम",
    low: "कम",
    advisoriesKicker: "किसान कार्रवाई केंद्र",
    advisoriesTitle: "फसल सलाह",
    advisoriesDescription:
      "AI निदान को स्पष्ट अगले कदम, रोकथाम और निगरानी मार्गदर्शन में बदलें।",
    aiAssisted: "AI-सहायता प्राप्त मार्गदर्शन",
    currentCondition: "वर्तमान स्थिति",
    noDiagnosis: "अभी निदान नहीं",
    status: "स्थिति",
    immediateAction: "तत्काल कार्रवाई",
    whatToDoNow: "अभी क्या करें",
    prevention: "रोकथाम",
    reduceFutureRisk: "भविष्य का जोखिम कम करें",
    monitoring: "निगरानी",
    keepWatching: "नज़र रखें",
    expertTitle:
      "AI-सहायता प्राप्त मार्गदर्शन — विशेषज्ञ सत्यापन की सलाह",
    expertText:
      "कार्रवाई से पहले खेत के लक्षण, फसल की किस्म, स्थानीय परिस्थितियों और आधिकारिक कृषि मार्गदर्शन पर विचार करें।",
    fieldRoutine: "खेत की दिनचर्या",
    scoutConsistently: "नियमित निरीक्षण करें",
    scoutText:
      "नियमित निरीक्षण से रोग का जल्दी पता लगाने में मदद मिलती है।",
    recordKeeping: "रिकॉर्ड रखना",
    captureLocation: "स्थान दर्ज करें",
    recordText:
      "हॉटस्पॉट मैपिंग में खेत की रिपोर्ट का उपयोग करें।",
    escalation: "विशेषज्ञ सहायता",
    escalationText:
      "अनिश्चित मामलों को विशेषज्ञ के पास भेजें।",
    backToDiagnosis: "निदान पर वापस जाएं",
    footer: "अधिक स्मार्ट और सुरक्षित खेती के लिए",
    loginTitle: "CropShield में आपका स्वागत है",
    loginDescription:
      "AI फसल निदान, जोखिम पूर्वानुमान और खेत की जानकारी के लिए साइन इन करें।",
    email: "ईमेल",
    password: "पासवर्ड",
    signIn: "साइन इन",
    signInGoogle: "Google से साइन इन करें",
    demoAccount: "डेमो खाता",
    invalidCredentials: "डेमो खाता विवरण गलत हैं।",
    signOut: "साइन आउट",
  },

  te: {
    ...base,
    nav: {
      diagnosis: "నిర్ధారణ",
      risk: "ప్రమాద అంచనా",
      hotspots: "హాట్‌స్పాట్‌లు",
      advisories: "సలహాలు",
      language: "భాష",
    },
    systemOnline:
      "AI వ్యవస్థ ఆన్‌లైన్‌లో ఉంది",
    heroTitle: "మీ పంటలను రక్షించండి",
    heroSubtitle: "చాలా ఆలస్యం కాకముందే.",
    startDiagnosis: "నిర్ధారణ ప్రారంభించండి",
    cropHealth: "పంట ఆరోగ్యం",
    diagnosisTitle: "AI నిర్ధారణ",
    detectedCondition: "గుర్తించిన పరిస్థితి",
    analyzingLeaf: "ఆకును విశ్లేషిస్తోంది...",
    ready: "విశ్లేషణకు సిద్ధంగా ఉంది",
    uploadHint:
      "పంట ఆకు యొక్క స్పష్టమైన చిత్రాన్ని అప్లోడ్ చేయండి",
    confidence: "నమ్మకం",
    aiConfidence: "AI నమ్మక స్థాయి",
    severity: "తీవ్రత",
    riskLevel: "ప్రమాద స్థాయి",
    cropHealthStatus: "పంట ఆరోగ్య స్థితి",
    recommendedAction: "సిఫారసు చేసిన చర్య",
    whatShouldIDo: "ఏం చేయాలి?",
    cropAdvisory: "పంట సలహా",
    listen: "సలహా వినండి",
    speaking: "సలహా చదువుతోంది...",
    highConfidence:
      "అధిక నమ్మకంతో AI నిర్ధారణ",
    expertValidation:
      "నిపుణుల ధృవీకరణ సిఫారసు",
    analyzingButton: "విశ్లేషిస్తోంది...",
    analyzeAnother:
      "మరో ఆకును విశ్లేషించండి",
    uploadLeaf:
      "ఆకు చిత్రాన్ని అప్లోడ్ చేయండి",
    scan:
      "AI విశ్లేషిస్తోంది...",
    notLeaf:
      "ఈ చిత్రం పంట ఆకు లాగా కనిపించడం లేదు. స్పష్టమైన టమాటా ఆకు చిత్రాన్ని అప్లోడ్ చేయండి.",
    riskTitle: "పంట ప్రమాద అంచనా",
    overallRisk: "మొత్తం ప్రమాదం",
    currentConditions: "ప్రస్తుత పరిస్థితులు",
    fieldEnvironment: "పొల వాతావరణం",
    earlyWarning: "ముందస్తు హెచ్చరిక",
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    rainfall: "వర్షపాతం",
    pestActivity: "పురుగు కార్యకలాపం",
    cropStage: "పంట దశ",
    weatherLive: "ప్రత్యక్ష వాతావరణం",
    weatherUpdated: "వాతావరణ నవీకరణ",
    fetchingWeather:
      "ప్రత్యక్ష వాతావరణాన్ని పొందుతోంది...",
    weatherUnavailable:
      "ప్రత్యక్ష వాతావరణం అందుబాటులో లేదు",
    refreshWeather:
      "వాతావరణాన్ని నవీకరించండి",
    fieldIntelligence:
      "ఫీల్డ్ ఇంటెలిజెన్స్",
    sensorPanelTitle:
      "పురుగు ఉచ్చు మరియు సెన్సర్",
    sensorPanelText:
      "పర్యవేక్షిత పొలానికి నమూనా సెన్సర్ ఫీడ్.",
    pestTrapCount:
      "పురుగు ఉచ్చు సంఖ్య",
    soilMoisture:
      "మట్టి తేమ",
    sensorStatus:
      "సెన్సర్ స్థితి",
    refreshSensor:
      "సెన్సర్ నవీకరించండి",
    lastUpdate:
      "చివరి నవీకరణ",
    expertValidationTitle:
      "నిపుణుల ధృవీకరణ",
    expertReviewTitle:
      "నిపుణుల సమీక్ష",
    expertReviewText:
      "అనిశ్చిత AI ఫలితాలను నిపుణుల ధృవీకరణ కోసం పంపవచ్చు.",
    sendForExpert:
      "నిపుణుల సమీక్షకు పంపండి",
    requestExpert:
      "నిపుణుల ధృవీకరణ అభ్యర్థించండి",
    caseSubmitted:
      "కేసు పంపబడింది",
    waitingValidation:
      "నిపుణుల ధృవీకరణ కోసం వేచి ఉంది",
    uploadFirst:
      "ముందుగా ఆకు చిత్రాన్ని అప్లోడ్ చేయండి.",
    askExpert:
      "నిపుణుడిని అడగండి",
    expertModalTitle:
      "వ్యవసాయ నిపుణుడిని అడగండి",
    expertModalDescription:
      "ఈ కేసును నిపుణుల సమీక్షకు పంపండి మరియు పొల వివరాలను జోడించండి.",
    expertQuestionPlaceholder:
      "లక్షణాలు లేదా మీ ప్రశ్నను రాయండి...",
    cancel:
      "రద్దు చేయండి",
    submitQuestion:
      "సమీక్ష కోసం పంపండి",
    questionSubmitted:
      "నిపుణుల అభ్యర్థన పంపబడింది.",
    hotspotsKicker:
      "భౌగోళిక సమాచారం",
    hotspotTitle:
      "వ్యాధి హాట్‌స్పాట్‌లు",
    hotspotsDescription:
      "నివేదించిన పంట ఆరోగ్య కేసులను చూడండి మరియు పొల పరిశీలనకు ప్రాధాన్యత ఇవ్వండి.",
    prototypeData:
      "ప్రోటోటైప్ డేటా",
    reportedClusters:
      "నివేదించిన క్లస్టర్లు",
    highCritical:
      "అధిక / తీవ్రమైన",
    affectedReports:
      "ప్రభావిత నివేదికలు",
    fieldMap:
      "పొల మ్యాప్",
    reportedActivity:
      "నివేదించిన వ్యాధి కార్యకలాపం",
    searchField:
      "పొలం శోధించండి",
    resetView:
      "మ్యాప్ రీసెట్",
    mapHint:
      "కదపండి • జూమ్ చేయండి • హాట్‌స్పాట్‌ను నొక్కండి",
    recentReports:
      "ఇటీవలి నివేదికలు",
    priorityAreas:
      "ప్రాధాన్య ప్రాంతాలు",
    reportedCases:
      "నివేదించిన కేసులు",
    mapRisk:
      "ప్రమాదం",
    mapReports:
      "నివేదికలు",
    selectDistrict:
      "జిల్లాను ఎంచుకోండి",
    critical:
      "తీవ్రమైన",
    high:
      "అధిక",
    medium:
      "మధ్యస్థ",
    low:
      "తక్కువ",
    advisoriesKicker:
      "రైతు చర్య కేంద్రం",
    advisoriesTitle:
      "పంట సలహాలు",
    advisoriesDescription:
      "AI నిర్ధారణను స్పష్టమైన తదుపరి చర్యలు, నివారణ మరియు పర్యవేక్షణ మార్గదర్శకంగా మార్చండి.",
    aiAssisted:
      "AI సహాయక మార్గదర్శకం",
    currentCondition:
      "ప్రస్తుత పరిస్థితి",
    noDiagnosis:
      "ఇంకా నిర్ధారణ లేదు",
    status:
      "స్థితి",
    immediateAction:
      "తక్షణ చర్య",
    whatToDoNow:
      "ఇప్పుడు ఏమి చేయాలి",
    prevention:
      "నివారణ",
    reduceFutureRisk:
      "భవిష్యత్ ప్రమాదాన్ని తగ్గించండి",
    monitoring:
      "పర్యవేక్షణ",
    keepWatching:
      "గమనిస్తూ ఉండండి",
    expertTitle:
      "AI సహాయక మార్గదర్శకం — నిపుణుల ధృవీకరణ సిఫారసు చేయబడింది",
    expertText:
      "చర్యకు ముందు పొల లక్షణాలు, పంట రకం, స్థానిక పరిస్థితులు మరియు అధికారిక వ్యవసాయ మార్గదర్శకాలను పరిగణించాలి.",
    fieldRoutine:
      "పొల దినచర్య",
    scoutConsistently:
      "క్రమం తప్పకుండా పరిశీలించండి",
    scoutText:
      "నిరంతర పరిశీలన వ్యాధిని ముందుగానే గుర్తించడంలో సహాయపడుతుంది.",
    recordKeeping:
      "రికార్డు నిర్వహణ",
    captureLocation:
      "స్థానాన్ని నమోదు చేయండి",
    recordText:
      "హాట్‌స్పాట్ మ్యాపింగ్ కోసం ఫీల్డ్ నివేదికలను ఉపయోగించండి.",
    escalation:
      "నిపుణుల సహాయం",
    escalationText:
      "అనిశ్చిత కేసులను నిపుణులకు పంపండి.",
    backToDiagnosis:
      "నిర్ధారణకు తిరిగి వెళ్లండి",
    footer:
      "మరింత తెలివైన, సురక్షితమైన వ్యవసాయం కోసం",
    loginTitle:
      "CropShield కు స్వాగతం",
    loginDescription:
      "AI పంట నిర్ధారణ, ప్రమాద అంచనా మరియు ఫీల్డ్ ఇంటెలిజెన్స్ కోసం సైన్ ఇన్ చేయండి.",
    email:
      "ఈమెయిల్",
    password:
      "పాస్వర్డ్",
    signIn:
      "సైన్ ఇన్",
    signInGoogle:
      "Google తో సైన్ ఇన్ చేయండి",
    demoAccount:
      "డెమో ఖాతా",
    invalidCredentials:
      "డెమో ఖాతా వివరాలు తప్పుగా ఉన్నాయి.",
    signOut:
      "సైన్ అవుట్",
  },

  /* Other languages inherit the English UI where a key
     isn't explicitly translated. */

  kn: {
    ...base,
    nav: {
      diagnosis: "ರೋಗನಿರ್ಣಯ",
      risk: "ಅಪಾಯದ ಮುನ್ಸೂಚನೆ",
      hotspots: "ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",
      advisories: "ಸಲಹೆಗಳು",
      language: "ಭಾಷೆ",
    },
    loginTitle: "CropShield ಗೆ ಸ್ವಾಗತ",
    loginDescription:
      "AI ಬೆಳೆ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಅಪಾಯ ಮಾಹಿತಿಗಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ.",
    email: "ಇಮೇಲ್",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    signIn: "ಸೈನ್ ಇನ್",
    signInGoogle: "Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    demoAccount: "ಡೆಮೋ ಖಾತೆ",
    invalidCredentials:
      "ಡೆಮೋ ಖಾತೆ ವಿವರಗಳು ತಪ್ಪಾಗಿದೆ.",
    signOut: "ಸೈನ್ ಔಟ್",
    hotspotTitle: "ರೋಗ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",
    advisoriesTitle: "ಬೆಳೆ ಸಲಹೆಗಳು",
    askExpert: "ತಜ್ಞರನ್ನು ಕೇಳಿ",
  },

  gu: {
    ...base,
    nav: {
      diagnosis: "નિદાન",
      risk: "જોખમ આગાહી",
      hotspots: "હોટસ્પોટ્સ",
      advisories: "સલાહ",
      language: "ભાષા",
    },
    loginTitle: "CropShield માં આપનું સ્વાગત છે",
    loginDescription:
      "AI પાક નિદાન અને જોખમ માહિતી માટે સાઇન ઇન કરો.",
    email: "ઇમેઇલ",
    password: "પાસવર્ડ",
    signIn: "સાઇન ઇન",
    signInGoogle: "Google સાથે સાઇન ઇન કરો",
    demoAccount: "ડેમો એકાઉન્ટ",
    invalidCredentials:
      "ડેમો એકાઉન્ટ વિગતો ખોટી છે.",
    signOut: "સાઇન આઉટ",
    hotspotTitle: "રોગ હોટસ્પોટ્સ",
    advisoriesTitle: "પાક સલાહ",
    askExpert: "નિષ્ણાતને પૂછો",
  },

  ta: {
    ...base,
    nav: {
      diagnosis: "நோயறிதல்",
      risk: "ஆபத்து கணிப்பு",
      hotspots: "ஹாட்ஸ்பாட்கள்",
      advisories: "ஆலோசனைகள்",
      language: "மொழி",
    },
    loginTitle: "CropShield க்கு வரவேற்கிறோம்",
    loginDescription:
      "AI பயிர் நோயறிதல் மற்றும் ஆபத்து தகவலுக்காக உள்நுழையவும்.",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    signIn: "உள்நுழைக",
    signInGoogle: "Google மூலம் உள்நுழைக",
    demoAccount: "டெமோ கணக்கு",
    invalidCredentials:
      "டெமோ கணக்கு விவரங்கள் தவறாக உள்ளன.",
    signOut: "வெளியேறு",
    hotspotTitle: "நோய் ஹாட்ஸ்பாட்கள்",
    advisoriesTitle: "பயிர் ஆலோசனைகள்",
    askExpert: "நிபுணரிடம் கேளுங்கள்",
  },

  bn: {
    ...base,
    nav: {
      diagnosis: "রোগ নির্ণয়",
      risk: "ঝুঁকি পূর্বাভাস",
      hotspots: "হটস্পট",
      advisories: "পরামর্শ",
      language: "ভাষা",
    },
    loginTitle: "CropShield-এ স্বাগতম",
    loginDescription:
      "AI ফসল রোগ নির্ণয় এবং ঝুঁকি তথ্যের জন্য সাইন ইন করুন।",
    email: "ইমেল",
    password: "পাসওয়ার্ড",
    signIn: "সাইন ইন",
    signInGoogle: "Google দিয়ে সাইন ইন করুন",
    demoAccount: "ডেমো অ্যাকাউন্ট",
    invalidCredentials:
      "ডেমো অ্যাকাউন্টের তথ্য ভুল।",
    signOut: "সাইন আউট",
    hotspotTitle: "রোগের হটস্পট",
    advisoriesTitle: "ফসল পরামর্শ",
    askExpert: "বিশেষজ্ঞকে জিজ্ঞাসা করুন",
  },

  ml: {
    ...base,
    nav: {
      diagnosis: "രോഗനിർണയം",
      risk: "അപകട പ്രവചനം",
      hotspots: "ഹോട്ട്‌സ്‌പോട്ടുകൾ",
      advisories: "ഉപദേശങ്ങൾ",
      language: "ഭാഷ",
    },
    loginTitle: "CropShield-ലേക്ക് സ്വാഗതം",
    loginDescription:
      "AI വിള രോഗനിർണയത്തിനും അപകട വിവരങ്ങൾക്കും സൈൻ ഇൻ ചെയ്യുക.",
    email: "ഇമെയിൽ",
    password: "പാസ്‌വേഡ്",
    signIn: "സൈൻ ഇൻ",
    signInGoogle: "Google ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക",
    demoAccount: "ഡെമോ അക്കൗണ്ട്",
    invalidCredentials:
      "ഡെമോ അക്കൗണ്ട് വിവരങ്ങൾ തെറ്റാണ്.",
    signOut: "സൈൻ ഔട്ട്",
    hotspotTitle: "രോഗ ഹോട്ട്‌സ്‌പോട്ടുകൾ",
    advisoriesTitle: "വിള ഉപദേശങ്ങൾ",
    askExpert: "വിദഗ്ധരോട് ചോദിക്കുക",
  },

  pa: {
    ...base,
    nav: {
      diagnosis: "ਨਿਦਾਨ",
      risk: "ਖਤਰੇ ਦੀ ਪੇਸ਼ਗੋਈ",
      hotspots: "ਹਾਟਸਪਾਟ",
      advisories: "ਸਲਾਹ",
      language: "ਭਾਸ਼ਾ",
    },
    loginTitle: "CropShield ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
    loginDescription:
      "AI ਫਸਲ ਨਿਦਾਨ ਅਤੇ ਜੋਖਮ ਜਾਣਕਾਰੀ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ।",
    email: "ਈਮੇਲ",
    password: "ਪਾਸਵਰਡ",
    signIn: "ਸਾਈਨ ਇਨ",
    signInGoogle: "Google ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ",
    demoAccount: "ਡੈਮੋ ਖਾਤਾ",
    invalidCredentials:
      "ਡੈਮੋ ਖਾਤੇ ਦੇ ਵੇਰਵੇ ਗਲਤ ਹਨ।",
    signOut: "ਸਾਈਨ ਆਊਟ",
    hotspotTitle: "ਰੋਗ ਹਾਟਸਪਾਟ",
    advisoriesTitle: "ਫਸਲ ਸਲਾਹ",
    askExpert: "ਮਾਹਰ ਨੂੰ ਪੁੱਛੋ",
  },
};

/* =========================================================
   DISTRICTS
========================================================= */

const districts = {
  Pune: [18.5204, 73.8567],
  Nashik: [19.9975, 73.7898],
  Nagpur: [21.1458, 79.0882],
  Kolhapur: [16.705, 74.2433],
  Sangli: [16.8524, 74.5815],
  Satara: [17.6805, 74.0183],
  Solapur: [17.6599, 75.9064],
  Ahmednagar: [19.0948, 74.748],
  Jalgaon: [21.0077, 75.5626],
  Amravati: [20.9374, 77.7796],
};

/* =========================================================
   GOOGLE SIGN-IN BUTTON
========================================================= */

function GoogleSignInButton({
  clientId,
  onSuccess,
}) {
  const containerRef =
    useRef(null);

  const [libraryReady, setLibraryReady] =
    useState(
      typeof window !== "undefined" &&
        !!window.google?.accounts?.id
    );

  useEffect(() => {
    if (
      typeof window ===
        "undefined"
    ) {
      return;
    }

    if (
      window.google?.accounts?.id
    ) {
      setLibraryReady(true);
      return;
    }

    const existing =
      document.getElementById(
        "google-gsi-script"
      );

    const script =
      existing ||
      document.createElement(
        "script"
      );

    if (!existing) {
      script.id =
        "google-gsi-script";

      script.src =
        "https://accounts.google.com/gsi/client";

      script.async = true;
      script.defer = true;

      script.onload = () => {
        setLibraryReady(true);
      };

      document.head.appendChild(
        script
      );
    } else {
      const timer =
        setInterval(() => {
          if (
            window.google?.accounts?.id
          ) {
            clearInterval(timer);
            setLibraryReady(true);
          }
        }, 100);

      return () =>
        clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    if (
      !libraryReady ||
      !clientId ||
      !containerRef.current
    ) {
      return;
    }

    const googleId =
      window.google?.accounts?.id;

    if (!googleId) {
      return;
    }

    containerRef.current.innerHTML =
      "";

    googleId.initialize({
      client_id:
        clientId,

      callback: (
        response
      ) => {
        onSuccess(
          response
        );
      },

      auto_select: false,
      cancel_on_tap_outside:
        true,
    });

    googleId.renderButton(
      containerRef.current,
      {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: 355,
        logo_alignment: "left",
      }
    );
  }, [
    libraryReady,
    clientId,
    onSuccess,
  ]);

  if (!clientId) {
    return (
      <div
        style={{
          marginTop:
            "14px",
          padding:
            "12px",
          borderRadius:
            "10px",
          background:
            "#fff7ed",
          border:
            "1px solid #ead9bd",
          color:
            "#795c2a",
          fontSize:
            "11px",
          lineHeight:
            1.5,
        }}
      >
        Google Sign-In is not configured yet.
        Add <strong>VITE_GOOGLE_CLIENT_ID</strong>
        to your Vercel/local environment variables.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        marginTop:
          "14px",
        width:
          "100%",
        minHeight:
          "44px",
        display:
          "flex",
        justifyContent:
          "center",
      }}
    >
      {!libraryReady && (
        <div
          style={{
            fontSize:
              "11px",
            color:
              "#66746d",
            padding:
              "10px",
          }}
        >
          Loading Google Sign-In...
        </div>
      )}
    </div>
  );
}

/* =========================================================
   LOGIN SCREEN
========================================================= */

function LoginScreen({
  language,
  onLanguageChange,
  onLogin,
  onGoogleSuccess,
  googleClientId,
}) {
  const t =
    translations[language] ||
    base;

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit =
    (event) => {
      event.preventDefault();

      const demoEmail =
        "farmer@cropshield.ai";

      const demoPassword =
        "CropShield@123";

      if (
        email
          .trim()
          .toLowerCase() ===
          demoEmail &&
        password ===
          demoPassword
      ) {
        sessionStorage.setItem(
          "cropshield_logged_in",
          "true"
        );

        setError("");

        onLogin();

        return;
      }

      setError(
        t.invalidCredentials
      );
    };

  return (
    <div
      style={{
        minHeight:
          "100vh",
        display:
          "flex",
        alignItems:
          "center",
        justifyContent:
          "center",
        padding:
          "24px",
        position:
          "relative",
        background:
          "radial-gradient(circle at 85% 10%, rgba(199,217,205,.30), transparent 28%), #f5f6f3",
      }}
    >
      {/* LOGIN LANGUAGE */}

      <div
        style={{
          position:
            "absolute",
          top:
            "22px",
          right:
            "24px",
          zIndex:
            20,
        }}
      >
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            gap:
              "8px",
            padding:
              "8px 11px",
            borderRadius:
              "9px",
            background:
              "#ffffff",
            border:
              "1px solid #dfe5e1",
            boxShadow:
              "0 6px 18px rgba(16,47,37,.06)",
          }}
        >
          <Languages
            size={16}
            color="#2f7a4f"
          />

          <select
            value={
              language
            }
            onChange={(event) =>
              onLanguageChange(
                event.target
                  .value
              )
            }
            aria-label="Language"
            style={{
              border:
                "none",
              outline:
                "none",
              background:
                "transparent",
              color:
                "#102f25",
              fontFamily:
                "inherit",
              fontSize:
                "12px",
              fontWeight:
                600,
              cursor:
                "pointer",
            }}
          >
            {languages.map(
              (item) => (
                <option
                  key={
                    item.code
                  }
                  value={
                    item.code
                  }
                >
                  {
                    item.native
                  }
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* LOGIN CARD */}

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          width:
            "100%",
          maxWidth:
            "420px",
          padding:
            "32px",
          background:
            "#ffffff",
          border:
            "1px solid #dfe5e1",
          borderRadius:
            "18px",
          boxShadow:
            "0 20px 55px rgba(16,47,37,.11)",
        }}
      >
        <div
          style={{
            width:
              "50px",
            height:
              "50px",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            borderRadius:
              "12px",
            background:
              "#102f25",
            color:
              "#ffffff",
            marginBottom:
              "18px",
          }}
        >
          <Leaf size={26} />
        </div>

        <span className="small-label">
          CROP INTELLIGENCE
        </span>

        <h1
          style={{
            marginTop:
              "8px",
            fontFamily:
              "Manrope, sans-serif",
            color:
              "#102f25",
            fontSize:
              "30px",
            lineHeight:
              1.1,
          }}
        >
          {
            t.loginTitle
          }
        </h1>

        <p
          style={{
            marginTop:
              "9px",
            color:
              "#66746d",
            fontSize:
              "13px",
            lineHeight:
              1.6,
          }}
        >
          {
            t.loginDescription
          }
        </p>

        <label
          style={{
            display:
              "block",
            marginTop:
              "22px",
            marginBottom:
              "6px",
            fontSize:
              "11px",
            fontWeight:
              700,
            color:
              "#53635b",
          }}
        >
          {t.email}
        </label>

        <input
          type="email"
          value={
            email
          }
          onChange={(event) =>
            setEmail(
              event.target
                .value
            )
          }
          placeholder="farmer@cropshield.ai"
          autoComplete="username"
          required
          style={{
            width:
              "100%",
            padding:
              "12px 13px",
            borderRadius:
              "9px",
            border:
              "1px solid #dfe5e1",
            fontSize:
              "13px",
            outline:
              "none",
          }}
        />

        <label
          style={{
            display:
              "block",
            marginTop:
              "14px",
            marginBottom:
              "6px",
            fontSize:
              "11px",
            fontWeight:
              700,
            color:
              "#53635b",
          }}
        >
          {t.password}
        </label>

        <input
          type="password"
          value={
            password
          }
          onChange={(event) =>
            setPassword(
              event.target
                .value
            )
          }
          placeholder="Enter password"
          autoComplete="current-password"
          required
          style={{
            width:
              "100%",
            padding:
              "12px 13px",
            borderRadius:
              "9px",
            border:
              "1px solid #dfe5e1",
            fontSize:
              "13px",
            outline:
              "none",
          }}
        />

        {error && (
          <div
            className="error-message"
            style={{
              marginTop:
                "12px",
            }}
          >
            <AlertTriangle
              size={16}
            />

            {error}
          </div>
        )}

        <button
          type="submit"
          className="upload-btn"
          style={{
            marginTop:
              "18px",
          }}
        >
          {
            t.signIn
          }

          <ChevronRight
            size={17}
          />
        </button>

        {/* OR */}

        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            gap:
              "10px",
            marginTop:
              "18px",
            marginBottom:
              "10px",
          }}
        >
          <div
            style={{
              flex:
                1,
              height:
                "1px",
              background:
                "#e1e6e2",
            }}
          />

          <span
            style={{
              fontSize:
                "10px",
              color:
                "#7d8a83",
              fontWeight:
                600,
            }}
          >
            OR
          </span>

          <div
            style={{
              flex:
                1,
              height:
                "1px",
              background:
                "#e1e6e2",
            }}
          />
        </div>

        {/* GOOGLE SIGN IN */}

        <GoogleSignInButton
          clientId={
            googleClientId
          }
          onSuccess={
            onGoogleSuccess
          }
        />

        {/* DEMO ACCOUNT */}

        <div
          style={{
            marginTop:
              "17px",
            padding:
              "12px",
            borderRadius:
              "10px",
            background:
              "#f5f7f5",
            border:
              "1px solid #e4e9e5",
            color:
              "#66746d",
            fontSize:
              "10px",
            lineHeight:
              1.7,
          }}
        >
          <strong
            style={{
              color:
                "#102f25",
            }}
          >
            {
              t.demoAccount
            }
          </strong>

          <br />

          Email:
          {" "}
          farmer@cropshield.ai

          <br />

          Password:
          {" "}
          CropShield@123
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   MAP RESET
========================================================= */

function MapResetView({
  center,
  zoom,
  label,
}) {
  const map =
    useMap();

  return (
    <button
      type="button"
      className="map-reset-btn"
      onClick={() =>
        map.setView(
          center,
          zoom,
          {
            animate:
              true,
          }
        )
      }
    >
      <Navigation
        size={15}
      />

      {
        label
      }
    </button>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const fileInputRef =
    useRef(null);

  const [language, setLanguage] =
    useState("en");

  const [isLoggedIn, setIsLoggedIn] =
    useState(() =>
      typeof window !==
        "undefined" &&
      sessionStorage.getItem(
        "cropshield_logged_in"
      ) === "true"
    );

  const [preview, setPreview] =
    useState(null);

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [activePage, setActivePage] =
    useState("diagnosis");

  const [
    showLanguageMenu,
    setShowLanguageMenu,
  ] = useState(false);

  const [
    speaking,
    setSpeaking,
  ] = useState(false);

  const [
    speechError,
    setSpeechError,
  ] = useState("");

  const [
    availableVoices,
    setAvailableVoices,
  ] = useState([]);

  const [
    selectedDistrict,
    setSelectedDistrict,
  ] = useState("Pune");

  const [weather, setWeather] =
    useState(null);

  const [
    weatherLoading,
    setWeatherLoading,
  ] = useState(false);

  const [
    weatherError,
    setWeatherError,
  ] = useState("");

  const [sensorData, setSensorData] =
    useState({
      pestCount: 18,
      soilMoisture: 64,
      status:
        "ONLINE",
      lastUpdate:
        "2 min ago",
    });

  const [
    expertSubmitted,
    setExpertSubmitted,
  ] = useState(false);

  const [
    expertModalOpen,
    setExpertModalOpen,
  ] = useState(false);

  const [
    expertQuestion,
    setExpertQuestion,
  ] = useState("");

  const [
    expertMessage,
    setExpertMessage,
  ] = useState("");

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://cropshield-ai-frbi.onrender.com";

  const GOOGLE_CLIENT_ID =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "";

  const t = useMemo(() => {
    const selected =
      translations[
        language
      ] || base;

    return {
      ...base,
      ...selected,
      nav: {
        ...base.nav,
        ...(selected.nav || {}),
      },
      errors: {
        ...base.errors,
        ...(selected.errors || {}),
      },
    };
  }, [language]);

  /* =======================================================
     LANGUAGE
  ======================================================= */

  useEffect(() => {
    document.documentElement.lang =
      language;
  }, [language]);

  /* =======================================================
     VOICES
  ======================================================= */

  useEffect(() => {
    if (
      typeof window ===
        "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const loadVoices =
      () => {
        setAvailableVoices(
          window.speechSynthesis.getVoices()
        );
      };

    loadVoices();

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      loadVoices
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        loadVoices
      );
    };
  }, []);

  /* =======================================================
     HELPERS
  ======================================================= */

  const openFilePicker =
    () => {
      fileInputRef.current?.click();
    };

  const formatDisease =
    (name) =>
      String(name || "")
        .replace(
          "Tomato___",
          ""
        )
        .replaceAll(
          "_",
          " "
        );

  const getDiseaseType =
    (name) => {
      const clean =
        formatDisease(
          name
        ).toLowerCase();

      if (
        clean.includes(
          "early blight"
        )
      )
        return "early";

      if (
        clean.includes(
          "late blight"
        )
      )
        return "late";

      if (
        clean.includes(
          "leaf mold"
        )
      )
        return "mold";

      if (
        clean.includes(
          "healthy"
        )
      )
        return "healthy";

      return "unknown";
    };

  const translateDiseaseName =
    (
      name,
      lang
    ) => {
      const type =
        getDiseaseType(
          name
        );

      const names = {
        early: {
          en: "Early Blight",
          mr: "अर्ली ब्लाइट",
          hi: "अर्ली ब्लाइट",
          te: "ఎర్లీ బ్లైట్",
          kn: "ಅರ್ಲಿ ಬ್ಲೈಟ್",
          gu: "અર્લી બ્લાઈટ",
          ta: "எர்லி ப்ளைட்",
          bn: "আর্লি ব্লাইট",
          ml: "ഏർലി ബ്ലൈറ്റ്",
          pa: "ਅਰਲੀ ਬਲਾਈਟ",
        },

        late: {
          en: "Late Blight",
          mr: "लेट ब्लाइट",
          hi: "लेट ब्लाइट",
          te: "లేట్ బ్లైట్",
          kn: "ಲೇಟ್ ಬ್ಲೈಟ್",
          gu: "લેટ બ્લાઈટ",
          ta: "லேட் ப்ளைட்",
          bn: "লেট ব্লাইট",
          ml: "ലേറ്റ് ബ്ലൈറ്റ്",
          pa: "ਲੇਟ ਬਲਾਈਟ",
        },

        mold: {
          en: "Leaf Mold",
          mr: "लीफ मोल्ड",
          hi: "लीफ मोल्ड",
          te: "లీఫ్ మోల్డ్",
          kn: "ಲೀಫ್ ಮೋಲ್ಡ್",
          gu: "લીફ મોલ્ડ",
          ta: "லீஃப் மோல்ட்",
          bn: "লিফ মোল্ড",
          ml: "ലീഫ് മോൾഡ്",
          pa: "ਲੀਫ ਮੋਲਡ",
        },

        healthy: {
          en: "Healthy",
          mr: "निरोगी",
          hi: "स्वस्थ",
          te: "ఆరోగ్యంగా ఉంది",
          kn: "ಆರೋಗ್ಯಕರ",
          gu: "સ્વસ્થ",
          ta: "ஆரோக்கியமானது",
          bn: "সুস্থ",
          ml: "ആരോഗ്യമുണ്ട്",
          pa: "ਤੰਦਰੁਸਤ",
        },
      };

      return (
        names[type]?.[
          lang
        ] ||
        names[type]?.en ||
        formatDisease(name)
      );
    };

  const getDiseaseInfo =
    (disease) => {
      const type =
        getDiseaseType(
          disease
        );

      if (
        type ===
        "early"
      ) {
        return {
          severity:
            "Moderate",
          severityLevel: 2,
          risk:
            "Medium",
          action:
            "Remove visibly affected leaves and monitor nearby plants closely.",
          advice:
            "Improve airflow around plants, avoid prolonged leaf wetness, and follow locally approved crop-protection guidance.",
        };
      }

      if (
        type ===
        "late"
      ) {
        return {
          severity:
            "High",
          severityLevel: 3,
          risk:
            "High",
          action:
            "Isolate affected plants and inspect surrounding plants immediately.",
          advice:
            "Monitor the crop frequently and follow locally approved disease-management recommendations.",
        };
      }

      if (
        type ===
        "mold"
      ) {
        return {
          severity:
            "Moderate",
          severityLevel: 2,
          risk:
            "Medium",
          action:
            "Remove severely affected leaves and improve ventilation.",
          advice:
            "Reduce prolonged humidity around foliage and monitor new growth for further symptoms.",
        };
      }

      if (
        type ===
        "healthy"
      ) {
        return {
          severity:
            "Low",
          severityLevel: 1,
          risk:
            "Low",
          action:
            "Continue regular crop monitoring.",
          advice:
            "The uploaded image appears healthy. Continue good irrigation, nutrition, and field hygiene practices.",
        };
      }

      return {
        severity:
          "Unknown",
        severityLevel: 0,
        risk:
          "Review",
        action:
          "Send the case for expert validation.",
        advice:
          "The AI could not confidently determine the condition. Capture a clearer image and consult an agriculture expert.",
      };
    };

  const localizeLevel =
    (
      value,
      lang
    ) => {
      const values = {
        mr: {
          Moderate:
            "मध्यम",
          Medium:
            "मध्यम",
          High:
            "उच्च",
          Low:
            "कमी",
          Critical:
            "गंभीर",
          Review:
            "पडताळणी",
        },

        hi: {
          Moderate:
            "मध्यम",
          Medium:
            "मध्यम",
          High:
            "उच्च",
          Low:
            "कम",
          Critical:
            "गंभीर",
          Review:
            "समीक्षा",
        },

        te: {
          Moderate:
            "మధ్యస్థ",
          Medium:
            "మధ్యస్థ",
          High:
            "అధిక",
          Low:
            "తక్కువ",
          Critical:
            "తీవ్రమైన",
          Review:
            "సమీక్ష",
        },

        kn: {
          Moderate:
            "ಮಧ್ಯಮ",
          Medium:
            "ಮಧ್ಯಮ",
          High:
            "ಹೆಚ್ಚು",
          Low:
            "ಕಡಿಮೆ",
          Critical:
            "ತೀವ್ರ",
          Review:
            "ಪರಿಶೀಲನೆ",
        },

        gu: {
          Moderate:
            "મધ્યમ",
          Medium:
            "મધ્યમ",
          High:
            "ઉચ્ચ",
          Low:
            "ઓછું",
          Critical:
            "ગંભીર",
          Review:
            "સમીક્ષા",
        },

        ta: {
          Moderate:
            "மிதமான",
          Medium:
            "மிதமான",
          High:
            "உயர்",
          Low:
            "குறைவு",
          Critical:
            "தீவிரம்",
          Review:
            "மதிப்பாய்வு",
        },

        bn: {
          Moderate:
            "মাঝারি",
          Medium:
            "মাঝারি",
          High:
            "উচ্চ",
          Low:
            "কম",
          Critical:
            "গুরুতর",
          Review:
            "পর্যালোচনা",
        },

        ml: {
          Moderate:
            "മിതമായ",
          Medium:
            "മിതമായ",
          High:
            "ഉയർന്ന",
          Low:
            "കുറഞ്ഞ",
          Critical:
            "ഗുരുതരം",
          Review:
            "പരിശോധന",
        },

        pa: {
          Moderate:
            "ਦਰਮਿਆਨਾ",
          Medium:
            "ਦਰਮਿਆਨਾ",
          High:
            "ਉੱਚ",
          Low:
            "ਘੱਟ",
          Critical:
            "ਗੰਭੀਰ",
          Review:
            "ਸਮੀਖਿਆ",
        },
      };

      return (
        values[lang]?.[
          value
        ] || value
      );
    };

  /* =======================================================
     PREDICTION
  ======================================================= */

  const analyzeImage =
    async (file) => {
      setLoading(
        true
      );

      setError(
        ""
      );

      setResult(
        null
      );

      setExpertSubmitted(
        false
      );

      try {
        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await fetch(
            `${API_URL}/predict`,
            {
              method:
                "POST",
              body:
                formData,
            }
          );

        let data =
          null;

        try {
          data =
            await response.json();
        } catch {
          data =
            null;
        }

        if (
          !response.ok
        ) {
          throw new Error(
            data?.detail ||
              t.errors
                .prediction
          );
        }

        if (
          data?.valid_image ===
            false ||
          data?.error_type ===
            "not_leaf"
        ) {
          setResult(
            null
          );

          setError(
            data?.message ||
              t.notLeaf
          );

          return;
        }

        setResult(
          data
        );
      } catch (err) {
        console.error(
          err
        );

        setError(
          err.message ||
            t.errors
              .server
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  const handleImageSelect =
    async (
      event
    ) => {
      const file =
        event.target.files?.[0];

      if (!file)
        return;

      setError("");
      setResult(null);

      const allowed = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

      if (
        !allowed.includes(
          file.type
        )
      ) {
        setError(
          "Please upload a JPG, PNG, or WEBP image."
        );

        event.target.value =
          "";

        return;
      }

      const url =
        URL.createObjectURL(
          file
        );

      setPreview(
        url
      );

      await analyzeImage(
        file
      );

      event.target.value =
        "";
    };

  /* =======================================================
     WEATHER
  ======================================================= */

  const fetchWeather =
    async () => {
      const center =
        districts[
          selectedDistrict
        ];

      if (!center)
        return;

      const [
        latitude,
        longitude,
      ] = center;

      setWeatherLoading(
        true
      );

      setWeatherError(
        ""
      );

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${latitude}` +
          `&longitude=${longitude}` +
          `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code` +
          `&forecast_days=7` +
          `&timezone=auto`;

        const response =
          await fetch(
            url
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "Weather request failed"
          );
        }

        const data =
          await response.json();

        setWeather({
          temperature:
            data.current
              ?.temperature_2m,

          humidity:
            data.current
              ?.relative_humidity_2m,

          precipitation:
            data.current
              ?.precipitation ??
            0,

          updatedAt:
            data.current?.time,
        });
      } catch (err) {
        console.error(
          err
        );

        setWeatherError(
          t.weatherUnavailable
        );
      } finally {
        setWeatherLoading(
          false
        );
      }
    };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWeather();
    }
  }, [
    selectedDistrict,
    isLoggedIn,
  ]);

  /* =======================================================
     SENSOR
  ======================================================= */

  const refreshSensorData =
    () => {
      setSensorData({
        pestCount:
          Math.floor(
            Math.random() *
              15
          ) + 10,

        soilMoisture:
          Math.floor(
            Math.random() *
              20
          ) + 55,

        status:
          "ONLINE",

        lastUpdate:
          "Just now",
      });
    };

  /* =======================================================
     EXPERT
  ======================================================= */

  const openExpertReview =
    () => {
      if (!result) {
        setError(
          t.uploadFirst
        );

        setActivePage(
          "diagnosis"
        );

        return;
      }

      setExpertMessage(
        ""
      );

      setExpertModalOpen(
        true
      );
    };

  const submitExpertReview =
    () => {
      if (!result) {
        setExpertModalOpen(
          false
        );

        setError(
          t.uploadFirst
        );

        return;
      }

      setExpertSubmitted(
        true
      );

      setExpertModalOpen(
        false
      );

      setExpertMessage(
        t.questionSubmitted
      );
    };

  /* =======================================================
     SPEECH
  ======================================================= */

  const speakAdvice =
    () => {
      if (
        !result ||
        typeof window ===
          "undefined" ||
        !window.speechSynthesis
      ) {
        setSpeechError(
          "Speech synthesis is not available in this browser."
        );

        return;
      }

      const synth =
        window.speechSynthesis;

      synth.cancel();

      setSpeechError(
        ""
      );

      const activeLanguage =
        languages.find(
          (item) =>
            item.code ===
            language
        );

      const desiredLang =
        activeLanguage?.voice ||
        "en-IN";

      const voices =
        synth.getVoices();

      const baseLang =
        desiredLang
          .split("-")[0]
          .toLowerCase();

      const selectedVoice =
        voices.find(
          (voice) =>
            voice.lang?.toLowerCase() ===
            desiredLang.toLowerCase()
        ) ||
        voices.find(
          (voice) =>
            voice.lang
              ?.toLowerCase()
              .startsWith(
                baseLang
              )
        ) ||
        availableVoices.find(
          (voice) =>
            voice.lang
              ?.toLowerCase()
              .startsWith(
                baseLang
              )
        ) ||
        null;

      const info =
        getDiseaseInfo(
          result.class
        );

      const disease =
        translateDiseaseName(
          result.class,
          language
        );

      const text =
        language === "mr"
          ? `क्रॉपशील्ड निदान. ओळखलेली स्थिती ${disease}. विश्वास पातळी ${result.confidence} टक्के. जोखीम पातळी ${localizeLevel(
              info.risk,
              "mr"
            )}. शिफारस केलेली कृती: ${info.action}. सल्ला: ${info.advice}.`
          : language === "hi"
          ? `क्रॉपशील्ड निदान. पहचानी गई स्थिति ${disease}. विश्वास स्तर ${result.confidence} प्रतिशत है. जोखिम स्तर ${localizeLevel(
              info.risk,
              "hi"
            )} है. अनुशंसित कार्रवाई: ${info.action}. सलाह: ${info.advice}.`
          : language === "te"
          ? `క్రాప్‌షీల్డ్ నిర్ధారణ. గుర్తించిన పరిస్థితి ${disease}. నమ్మక స్థాయి ${result.confidence} శాతం. ప్రమాద స్థాయి ${localizeLevel(
              info.risk,
              "te"
            )}. సిఫారసు చేసిన చర్య: ${info.action}. సలహా: ${info.advice}.`
          : language === "ta"
          ? `கிராப்ஷீல்ட் நோயறிதல். கண்டறியப்பட்ட நிலை ${disease}. நம்பிக்கை நிலை ${result.confidence} சதவீதம். ஆபத்து நிலை ${info.risk}. பரிந்துரைக்கப்பட்ட நடவடிக்கை: ${info.action}. ஆலோசனை: ${info.advice}.`
          : `CropShield diagnosis. Detected condition: ${disease}. Confidence: ${result.confidence} percent. Risk level: ${info.risk}. Recommended action: ${info.action}. Advisory: ${info.advice}.`;

      const utterance =
        new SpeechSynthesisUtterance(
          text
        );

      utterance.lang =
        desiredLang;

      if (
        selectedVoice
      ) {
        utterance.voice =
          selectedVoice;
      }

      utterance.rate =
        0.85;

      utterance.pitch =
        1;

      utterance.volume =
        1;

      utterance.onstart =
        () =>
          setSpeaking(
            true
          );

      utterance.onend =
        () =>
          setSpeaking(
            false
          );

      utterance.onerror =
        () => {
          setSpeaking(
            false
          );

          setSpeechError(
            `${desiredLang} voice may not be available on this device.`
          );
        };

      setSpeaking(
        true
      );

      synth.resume();

      synth.speak(
        utterance
      );
    };

  /* =======================================================
     GOOGLE SUCCESS
  ======================================================= */

  const handleGoogleSuccess =
    useCallback(
      (response) => {
        if (
          !response?.credential
        ) {
          setError(
            "Google sign-in did not return a credential."
          );

          return;
        }

        console.log(
          "Google credential received."
        );

        /*
         * Hackathon prototype:
         * Successful Google Identity Services
         * callback = logged in.
         *
         * Production:
         * send response.credential to FastAPI
         * and verify the ID token server-side.
         */

        sessionStorage.setItem(
          "cropshield_logged_in",
          "true"
        );

        setError(
          ""
        );

        setIsLoggedIn(
          true
        );
      },
      []
    );

  /* =======================================================
     DISEASE INFO
  ======================================================= */

  const diseaseInfo =
    result
      ? getDiseaseInfo(
          result.class
        )
      : null;

  /* =======================================================
     RISK DATA
  ======================================================= */

  const riskData = {
    overall:
      result?.class?.includes(
        "healthy"
      )
        ? 18
        : 64,

    level:
      result?.class?.includes(
        "healthy"
      )
        ? "Low"
        : "Medium",

    disease:
      result
        ? translateDiseaseName(
            result.class,
            language
          )
        : "Disease",

    temperature:
      weather?.temperature !=
      null
        ? `${weather.temperature}°C`
        : "—",

    humidity:
      weather?.humidity !=
      null
        ? `${weather.humidity}%`
        : "—",

    rainfall:
      weather?.precipitation !=
      null
        ? `${weather.precipitation} mm`
        : "—",

    pestActivity:
      "High",

    cropStage:
      "Flowering",
  };

  const riskTrend = [
    {
      day: "Today",
      value: 58,
    },
    {
      day: "Tue",
      value: 61,
    },
    {
      day: "Wed",
      value: 65,
    },
    {
      day: "Thu",
      value: 69,
    },
    {
      day: "Fri",
      value: 73,
    },
    {
      day: "Sat",
      value: 68,
    },
    {
      day: "Sun",
      value: 63,
    },
  ];

  const getDayLabel =
    (day) => {
      const labels = {
        en: {
          Today: "Today",
          Tue: "Tue",
          Wed: "Wed",
          Thu: "Thu",
          Fri: "Fri",
          Sat: "Sat",
          Sun: "Sun",
        },

        mr: {
          Today: "आज",
          Tue: "मंगळ",
          Wed: "बुध",
          Thu: "गुरु",
          Fri: "शुक्र",
          Sat: "शनि",
          Sun: "रवि",
        },

        hi: {
          Today: "आज",
          Tue: "मंगल",
          Wed: "बुध",
          Thu: "गुरु",
          Fri: "शुक्र",
          Sat: "शनि",
          Sun: "रवि",
        },

        te: {
          Today: "ఈరోజు",
          Tue: "మంగళ",
          Wed: "బుధ",
          Thu: "గురు",
          Fri: "శుక్ర",
          Sat: "శని",
          Sun: "ఆది",
        },
      };

      return (
        labels[language]?.[
          day
        ] ||
        labels.en[day]
      );
    };

  /* =======================================================
     HOTSPOTS
  ======================================================= */

  const hotspotCenter =
    districts[
      selectedDistrict
    ];

  const hotspotCases = [
    {
      id: 1,
      name: `${selectedDistrict} Field Cluster A`,
      disease:
        translateDiseaseName(
          "Tomato___Early_blight",
          language
        ),
      level:
        "High",
      count:
        18,
      lat:
        hotspotCenter[0] +
        0.025,
      lng:
        hotspotCenter[1] +
        0.035,
    },

    {
      id: 2,
      name: `${selectedDistrict} Field Cluster B`,
      disease:
        translateDiseaseName(
          "Tomato___Late_blight",
          language
        ),
      level:
        "Critical",
      count:
        31,
      lat:
        hotspotCenter[0] -
        0.028,
      lng:
        hotspotCenter[1] -
        0.025,
    },

    {
      id: 3,
      name: `${selectedDistrict} Field Cluster C`,
      disease:
        translateDiseaseName(
          "Tomato___Leaf_Mold",
          language
        ),
      level:
        "Medium",
      count:
        11,
      lat:
        hotspotCenter[0] +
        0.04,
      lng:
        hotspotCenter[1] -
        0.02,
    },

    {
      id: 4,
      name: `${selectedDistrict} Field Cluster D`,
      disease:
        translateDiseaseName(
          "Tomato___Early_blight",
          language
        ),
      level:
        "Medium",
      count:
        8,
      lat:
        hotspotCenter[0] -
        0.018,
      lng:
        hotspotCenter[1] +
        0.045,
    },

    {
      id: 5,
      name: `${selectedDistrict} Field Cluster E`,
      disease:
        translateDiseaseName(
          "Tomato___healthy",
          language
        ),
      level:
        "Low",
      count:
        5,
      lat:
        hotspotCenter[0] +
        0.05,
      lng:
        hotspotCenter[1] +
        0.025,
    },
  ];

  const getHotspotClass =
    (level) => {
      if (
        level ===
        "Critical"
      )
        return "critical";

      if (
        level ===
        "High"
      )
        return "high";

      if (
        level ===
        "Medium"
      )
        return "medium";

      return "low";
    };

  const getHotspotLabel =
    (level) => {
      if (
        level ===
        "Critical"
      )
        return t.critical;

      if (
        level ===
        "High"
      )
        return t.high;

      if (
        level ===
        "Medium"
      )
        return t.medium;

      return t.low;
    };

  /* =======================================================
     DIAGNOSIS PAGE
  ======================================================= */

  const renderDiagnosisPage =
    () => (
      <>
        <section className="hero">

          <div className="hero-content">

            <div className="status-pill">

              <span className="status-dot"></span>

              {
                t.systemOnline
              }

            </div>


            <h1>

              {
                t.heroTitle
              }

              <br />

              <span>
                {
                  t.heroSubtitle
                }
              </span>

            </h1>


            <p>

              {
                t.heroDescription
              }

            </p>


            <button
              type="button"
              className="primary-btn"
              onClick={
                openFilePicker
              }
            >

              {
                t.startDiagnosis
              }

              <ChevronRight
                size={20}
              />

            </button>


            <div className="trust-row">

              <div>

                <ShieldCheck
                  size={19}
                />

                {
                  t.aiDiagnosis
                }

              </div>


              <div>

                <Activity
                  size={19}
                />

                {
                  t.riskInsights
                }

              </div>

            </div>

          </div>


          <div className="diagnosis-card">

            <div className="card-top">

              <div>

                <span className="small-label">

                  {
                    t.cropHealth
                  }

                </span>


                <h3>

                  {
                    t.diagnosisTitle
                  }

                </h3>

              </div>


              <div className="ai-badge">

                <Activity
                  size={15}
                />

                AI

              </div>

            </div>


            <input
              ref={
                fileInputRef
              }
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={
                handleImageSelect
              }
              style={{
                display:
                  "none",
              }}
            />


            <div
              className={`leaf-preview ${
                preview
                  ? "has-image"
                  : ""
              }`}
              onClick={
                openFilePicker
              }
            >

              {preview ? (

                <img
                  src={
                    preview
                  }
                  alt="Selected crop leaf"
                  className="uploaded-image"
                />

              ) : (

                <>

                  <div className="preview-glow"></div>

                  <Leaf
                    size={110}
                    strokeWidth={1.2}
                  />

                  <div className="scan-line"></div>

                </>

              )}


              {loading && (

                <div className="scanning-overlay">

                  <LoaderCircle
                    size={42}
                    className="spin"
                  />

                  <span>

                    {
                      t.scan
                    }

                  </span>

                </div>

              )}

            </div>


            <div className="diagnosis-result">

              <div>

                <span className="result-label">

                  {
                    t.detectedCondition
                  }

                </span>


                {loading ? (

                  <h3>

                    {
                      t.analyzingLeaf
                    }

                  </h3>

                ) : result ? (

                  <>

                    <h3>

                      {
                        translateDiseaseName(
                          result.class,
                          language
                        )
                      }

                    </h3>


                    <p>

                      {
                        result.status
                      }

                    </p>

                  </>

                ) : (

                  <>

                    <h3>

                      {
                        t.ready
                      }

                    </h3>


                    <p>

                      {
                        t.uploadHint
                      }

                    </p>

                  </>

                )}

              </div>


              <div className="confidence">

                {result ? (

                  <>

                    <span>

                      {
                        result.confidence
                      }%

                    </span>


                    <small>

                      {
                        t.confidence
                      }

                    </small>

                  </>

                ) : (

                  <>

                    <span>
                      —
                    </span>


                    <small>

                      {
                        t.confidence
                      }

                    </small>

                  </>

                )}

              </div>

            </div>


            {result && (

              <div className="confidence-panel">

                <div className="confidence-header">

                  <span>
                    {
                      t.aiConfidence
                    }
                  </span>


                  <strong>

                    {
                      result.confidence
                    }%

                  </strong>

                </div>


                <div className="confidence-track">

                  <div
                    className="confidence-fill"
                    style={{
                      width:
                        `${result.confidence}%`,
                    }}
                  />

                </div>

              </div>

            )}


            {result &&
              diseaseInfo && (

                <div className="risk-grid">

                  <div className="risk-box">

                    <div className="risk-box-icon">

                      <ThermometerSun
                        size={18}
                      />

                    </div>


                    <div>

                      <span>

                        {
                          t.severity
                        }

                      </span>


                      <strong>

                        {
                          localizeLevel(
                            diseaseInfo.severity,
                            language
                          )
                        }

                      </strong>

                    </div>

                  </div>


                  <div className="risk-box">

                    <div className="risk-box-icon">

                      <Activity
                        size={18}
                      />

                    </div>


                    <div>

                      <span>

                        {
                          t.riskLevel
                        }

                      </span>


                      <strong>

                        {
                          localizeLevel(
                            diseaseInfo.risk,
                            language
                          )
                        }

                      </strong>

                    </div>

                  </div>

                </div>

              )}


            {result &&
              diseaseInfo && (

                <div className="severity-section">

                  <div className="severity-header">

                    <span>

                      {
                        t.cropHealthStatus
                      }

                    </span>


                    <span>

                      {
                        localizeLevel(
                          diseaseInfo.severity,
                          language
                        )
                      }

                    </span>

                  </div>


                  <div className="severity-bars">

                    {[1, 2, 3].map(
                      (level) => (

                        <div
                          key={
                            level
                          }
                          className={`severity-bar ${
                            level <=
                            diseaseInfo.severityLevel
                              ? "filled"
                              : ""
                          }`}
                        />

                      )
                    )}

                  </div>

                </div>

              )}


            {result &&
              diseaseInfo && (

                <div className="recommendation-card">

                  <div className="recommendation-icon">

                    <Sprout
                      size={20}
                    />

                  </div>


                  <div>

                    <span className="recommendation-label">

                      {
                        t.recommendedAction
                      }

                    </span>


                    <h4>

                      {
                        t.whatShouldIDo
                      }

                    </h4>


                    <p>

                      {
                        diseaseInfo.action
                      }

                    </p>

                  </div>

                </div>

              )}


            {result &&
              diseaseInfo && (

                <div className="advisory-box">

                  <div>

                    <ShieldCheck
                      size={18}
                    />

                    <span>

                      {
                        t.cropAdvisory
                      }

                    </span>

                  </div>


                  <p>

                    {
                      diseaseInfo.advice
                    }

                  </p>

                </div>

              )}


            {result && (

              <button
                type="button"
                className="voice-btn"
                onClick={
                  speakAdvice
                }
                disabled={
                  speaking
                }
              >

                {speaking ? (

                  <>
                    <Activity
                      size={18}
                    />

                    {
                      t.speaking
                    }
                  </>

                ) : (

                  <>
                    <Volume2
                      size={18}
                    />

                    {
                      t.listen
                    }
                  </>

                )}

              </button>

            )}


            {speechError && (

              <div className="error-message">

                <AlertTriangle
                  size={17}
                />

                {
                  speechError
                }

              </div>

            )}


            {error && (

              <div className="error-message">

                <AlertTriangle
                  size={17}
                />

                {
                  error
                }

              </div>

            )}


            {result && (

              <div
                className={`result-status ${
                  result.confidence >=
                  80
                    ? "success"
                    : "warning"
                }`}
              >

                {result.confidence >=
                80 ? (

                  <CheckCircle2
                    size={17}
                  />

                ) : (

                  <AlertTriangle
                    size={17}
                  />

                )}


                <span>

                  {
                    result.confidence >=
                    80
                      ? t.highConfidence
                      : t.expertValidation
                  }

                </span>

              </div>

            )}


            <button
              type="button"
              className="upload-btn"
              onClick={
                openFilePicker
              }
              disabled={
                loading
              }
            >

              {loading ? (

                <>
                  <LoaderCircle
                    size={18}
                    className="spin"
                  />

                  {
                    t.analyzingButton
                  }

                </>

              ) : (

                <>
                  <Upload
                    size={18}
                  />

                  {
                    preview
                      ? t.analyzeAnother
                      : t.uploadLeaf
                  }

                </>

              )}

            </button>

          </div>

        </section>


        <section className="features">

          <div className="section-heading">

            <span>
              ONE PLATFORM
            </span>


            <h2>
              From detection to action.
            </h2>

          </div>


          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon">

                <Leaf />

              </div>


              <h3>
                AI Disease Detection
              </h3>


              <p>
                Analyze crop leaf images
                using the trained computer
                vision model.
              </p>


              <span className="feature-link">

                Instant diagnosis

                <ChevronRight
                  size={16}
                />

              </span>

            </div>


            <div className="feature-card">

              <div className="feature-icon">

                <CloudSun />

              </div>


              <h3>
                Risk Forecasting
              </h3>


              <p>
                Combine weather, crop
                stage, and pest activity
                to identify emerging risks.
              </p>


              <button
                type="button"
                className="feature-link feature-button"
                onClick={() =>
                  setActivePage(
                    "risk"
                  )
                }
              >

                Predict outbreaks

                <ChevronRight
                  size={16}
                />

              </button>

            </div>


            <div className="feature-card">

              <div className="feature-icon">

                <Map />

              </div>


              <h3>
                Geospatial Hotspots
              </h3>


              <p>
                Visualize reported disease
                cases and prioritize
                field-level intervention.
              </p>


              <button
                type="button"
                className="feature-link feature-button"
                onClick={() =>
                  setActivePage(
                    "hotspots"
                  )
                }
              >

                View hotspots

                <ChevronRight
                  size={16}
                />

              </button>

            </div>

          </div>

        </section>
      </>
    );

  /* =======================================================
     RISK PAGE
  ======================================================= */

  const renderRiskPage =
    () => (
      <section className="risk-dashboard">

        <button
          type="button"
          className="back-btn"
          onClick={() =>
            setActivePage(
              "diagnosis"
            )
          }
        >

          <ArrowLeft
            size={17}
          />

          {
            t.backToDiagnosis
          }

        </button>


        <div className="risk-hero">

          <div>

            <span className="dashboard-kicker">

              {
                t.riskKicker
              }

            </span>


            <h1>

              {
                t.riskTitle
              }

            </h1>


            <p>

              {
                t.riskDescription
              }{" "}

              {
                riskData.disease
              }

            </p>


            <div
              style={{
                marginTop:
                  "14px",
                display:
                  "flex",
                alignItems:
                  "center",
                gap:
                  "8px",
              }}
            >

              <MapPin
                size={16}
              />


              <select
                value={
                  selectedDistrict
                }
                onChange={(event) =>
                  setSelectedDistrict(
                    event.target.value
                  )
                }
                style={{
                  padding:
                    "9px 12px",
                  borderRadius:
                    "9px",
                  border:
                    "1px solid #dfe5e1",
                  background:
                    "#fff",
                  color:
                    "#102f25",
                  fontFamily:
                    "inherit",
                  fontSize:
                    "12px",
                  fontWeight:
                    600,
                  cursor:
                    "pointer",
                }}
              >

                {Object.keys(
                  districts
                ).map(
                  (district) => (

                    <option
                      key={
                        district
                      }
                      value={
                        district
                      }
                    >

                      {
                        district
                      }, Maharashtra

                    </option>

                  )
                )}

              </select>

            </div>

          </div>


          <div className="risk-score-card">

            <span>

              {
                t.overallRisk
              }

            </span>


            <strong>

              {
                riskData.overall
              }%

            </strong>


            <div className="risk-score-level">

              {
                localizeLevel(
                  riskData.level,
                  language
                )
              }

            </div>

          </div>

        </div>


        <div
          style={{
            marginTop:
              "20px",
            marginBottom:
              "18px",
            padding:
              "15px 18px",
            borderRadius:
              "14px",
            background:
              "rgba(255,255,255,.78)",
            border:
              "1px solid rgba(18,55,42,.08)",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            gap:
              "14px",
            flexWrap:
              "wrap",
          }}
        >

          <div>

            <span
              style={{
                display:
                  "block",
                fontSize:
                  "9px",
                fontWeight:
                  800,
                letterSpacing:
                  ".08em",
                opacity:
                  .65,
              }}
            >

              {
                t.weatherLive
              }

            </span>


            <strong
              style={{
                display:
                  "block",
                marginTop:
                  "4px",
              }}
            >

              {
                selectedDistrict
              }, Maharashtra

            </strong>


            <div
              style={{
                marginTop:
                  "4px",
                fontSize:
                  "11px",
                opacity:
                  .68,
              }}
            >

              {
                weatherLoading
                  ? t.fetchingWeather
                  : weather?.updatedAt
                  ? `${t.weatherUpdated}: ${weather.updatedAt}`
                  : weatherError ||
                    t.weatherUnavailable
              }

            </div>

          </div>


          <button
            type="button"
            className="feature-button"
            onClick={
              fetchWeather
            }
            style={{
              padding:
                "9px 13px",
              borderRadius:
                "9px",
            }}
          >

            {
              weatherLoading
                ? t.fetchingWeather
                : t.refreshWeather
            }

          </button>

        </div>


        <div className="risk-main-grid">

          <div className="forecast-card large">

            <div className="forecast-header">

              <div>

                <span className="small-label">

                  {
                    t.sevenDayOutlook
                  }

                </span>


                <h3>

                  {
                    riskData.disease
                  }

                </h3>

              </div>


              <div className="high-risk-pill">

                {
                  localizeLevel(
                    riskData.level,
                    language
                  )
                }

              </div>

            </div>


            <div className="forecast-chart">

              <div className="chart-lines">

                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              <div className="chart-bars">

                {riskTrend.map(
                  (item) => (

                    <div
                      className="chart-column"
                      key={
                        item.day
                      }
                    >

                      <div
                        className="chart-value"
                        style={{
                          height:
                            `${item.value * 0.65}px`,
                        }}
                      />

                      <small>

                        {
                          getDayLabel(
                            item.day
                          )
                        }

                      </small>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>


          <div className="forecast-card">

            <span className="small-label">

              {
                t.currentConditions
              }

            </span>


            <h3>

              {
                t.fieldEnvironment
              }

            </h3>


            <div className="condition-list">

              {[
                [
                  ThermometerSun,
                  t.temperature,
                  riskData.temperature,
                ],
                [
                  Droplets,
                  t.humidity,
                  riskData.humidity,
                ],
                [
                  CloudSun,
                  t.rainfall,
                  riskData.rainfall,
                ],
                [
                  Bug,
                  t.pestActivity,
                  localizeLevel(
                    riskData.pestActivity,
                    language
                  ),
                ],
                [
                  CalendarDays,
                  t.cropStage,
                  riskData.cropStage,
                ],
              ].map(
                (
                  [
                    Icon,
                    label,
                    value,
                  ],
                  index
                ) => (

                  <div
                    className="condition-row"
                    key={
                      index
                    }
                  >

                    <div className="condition-icon">

                      <Icon
                        size={18}
                      />

                    </div>


                    <div>

                      <span>
                        {
                          label
                        }
                      </span>


                      <strong>
                        {
                          value
                        }
                      </strong>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>


        <div className="warning-panel">

          <div className="warning-icon">

            <AlertTriangle
              size={21}
            />

          </div>


          <div>

            <span>

              {
                t.earlyWarning
              }

            </span>


            <h3>

              Conditions are favorable for
              disease development.

            </h3>


            <p>

              The prototype risk engine
              combines environmental
              conditions, crop stage,
              and pest activity to
              prioritize potential outbreaks.

            </p>

          </div>

        </div>


        <div className="forecast-action-grid">

          <div className="forecast-card action-card">

            <div className="feature-icon">

              <Bug />

            </div>


            <span className="small-label">

              {
                t.fieldIntelligence
              }

            </span>


            <h3>

              {
                t.sensorPanelTitle
              }

            </h3>


            <p>

              {
                t.sensorPanelText
              }

            </p>


            <div
              style={{
                display:
                  "grid",
                gap:
                  "9px",
                marginTop:
                  "14px",
              }}
            >

              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  padding:
                    "9px 11px",
                  borderRadius:
                    "9px",
                  background:
                    "rgba(18,55,42,.05)",
                }}
              >

                <span>

                  {
                    t.pestTrapCount
                  }

                </span>


                <strong>

                  {
                    sensorData.pestCount
                  }

                </strong>

              </div>


              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  padding:
                    "9px 11px",
                  borderRadius:
                    "9px",
                  background:
                    "rgba(18,55,42,.05)",
                }}
              >

                <span>

                  {
                    t.soilMoisture
                  }

                </span>


                <strong>

                  {
                    sensorData.soilMoisture
                  }%

                </strong>

              </div>


              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  padding:
                    "9px 11px",
                  borderRadius:
                    "9px",
                  background:
                    "rgba(18,55,42,.05)",
                }}
              >

                <span>

                  {
                    t.sensorStatus
                  }

                </span>


                <strong>

                  {
                    sensorData.status
                  }

                </strong>

              </div>

            </div>


            <button
              type="button"
              className="feature-button"
              onClick={
                refreshSensorData
              }
              style={{
                marginTop:
                  "13px",
                padding:
                  "9px 12px",
                borderRadius:
                  "9px",
              }}
            >

              {
                t.refreshSensor
              }

            </button>

          </div>


          <div className="forecast-card action-card">

            <div className="feature-icon">

              <ShieldCheck />

            </div>


            <span className="small-label">

              {
                t.expertValidationTitle
              }

            </span>


            <h3>

              {
                t.expertReviewTitle
              }

            </h3>


            <p>

              {
                t.expertReviewText
              }

            </p>


            {expertSubmitted ? (

              <div
                style={{
                  marginTop:
                    "15px",
                  padding:
                    "13px",
                  borderRadius:
                    "10px",
                  background:
                    "rgba(46,125,50,.08)",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap:
                    "9px",
                }}
              >

                <CheckCircle2
                  size={20}
                />


                <div>

                  <strong>

                    {
                      t.caseSubmitted
                    }

                  </strong>


                  <div
                    style={{
                      fontSize:
                        "10px",
                      marginTop:
                        "3px",
                    }}
                  >

                    {
                      t.waitingValidation
                    }

                  </div>

                </div>

              </div>

            ) : (

              <button
                type="button"
                className="feature-button"
                onClick={
                  openExpertReview
                }
                style={{
                  marginTop:
                    "16px",
                  padding:
                    "10px 13px",
                  borderRadius:
                    "9px",
                  cursor:
                    "pointer",
                }}
              >

                {
                  result
                    ? t.requestExpert
                    : t.uploadFirst
                }

              </button>

            )}

          </div>


          <div className="forecast-card action-card">

            <div className="feature-icon">

              <Activity />

            </div>


            <span className="small-label">

              {
                t.nextUpdate
              }

            </span>


            <h3>

              {
                t.nextUpdate
              }

            </h3>


            <p>

              {
                t.nextUpdateText ||
                "Risk should be recalculated when new observations are received."
              }

            </p>

          </div>

        </div>

      </section>
    );

  /* =======================================================
     ADVISORIES
  ======================================================= */

  const renderAdvisoriesPage =
    () => (
      <section className="advisories-dashboard">

        <div className="advisory-hero">

          <div>

            <span className="dashboard-kicker">

              {
                t.advisoriesKicker
              }

            </span>


            <h1>

              {
                t.advisoriesTitle
              }

            </h1>


            <p>

              {
                t.advisoriesDescription
              }

            </p>

          </div>


          <div className="advisory-badge">

            <ShieldCheck
              size={15}
            />

            {
              t.aiAssisted
            }

          </div>

        </div>


        <div className="advisory-status-card">

          <div className="advisory-status-icon">

            <Sprout
              size={22}
            />

          </div>


          <div className="advisory-status-main">

            <span>

              {
                t.currentCondition
              }

            </span>


            <h2>

              {result
                ? translateDiseaseName(
                    result.class,
                    language
                  )
                : t.noDiagnosis}

            </h2>


            <p>

              {result
                ? diseaseInfo?.advice
                : "Upload a leaf image first. CropShield will tailor this advisory to the detected condition."}

            </p>

          </div>


          <div className="advisory-status-side">

            <span>

              {
                t.status
              }

            </span>


            <strong>

              {result
                ? result.status
                : t.noDiagnosis}

            </strong>

          </div>

        </div>


        <div className="advisory-grid">

          <div className="advisory-action-card">

            <div className="advisory-card-icon green">

              <CheckCircle2
                size={20}
              />

            </div>


            <span className="small-label">

              {
                t.immediateAction
              }

            </span>


            <h3>

              {
                t.whatToDoNow
              }

            </h3>


            <div className="advisory-steps">

              {(result
                ? [
                    diseaseInfo.action,
                    "Inspect nearby plants for similar symptoms.",
                    "Continue regular crop scouting.",
                  ]
                : [
                    "Upload a clear crop-leaf image.",
                    "Wait for the AI diagnosis.",
                    "Review the advisory before field action.",
                  ]
              ).map(
                (
                  item,
                  index
                ) => (

                  <div
                    className="advisory-step"
                    key={`${item}-${index}`}
                  >

                    <span>

                      {
                        index +
                        1
                      }

                    </span>


                    <p>

                      {
                        item
                      }

                    </p>

                  </div>

                )
              )}

            </div>

          </div>


          <div className="advisory-action-card">

            <div className="advisory-card-icon amber">

              <ShieldCheck
                size={20}
              />

            </div>


            <span className="small-label">

              {
                t.prevention
              }

            </span>


            <h3>

              {
                t.reduceFutureRisk
              }

            </h3>


            <div className="advisory-steps">

              {[
                "Scout crops regularly.",
                "Track new symptoms and affected areas.",
                "Use locally approved agricultural guidance.",
              ].map(
                (
                  item
                ) => (

                  <div
                    className="advisory-step"
                    key={
                      item
                    }
                  >

                    <span>
                      ✓
                    </span>


                    <p>
                      {
                        item
                      }
                    </p>

                  </div>

                )
              )}

            </div>

          </div>


          <div className="advisory-action-card advisory-monitor-card">

            <div className="advisory-card-icon forest">

              <Activity
                size={20}
              />

            </div>


            <span className="small-label">

              {
                t.monitoring
              }

            </span>


            <h3>

              {
                t.keepWatching
              }

            </h3>


            <p>

              {result
                ? "Recheck the crop regularly and seek expert validation if symptoms spread rapidly."
                : "No diagnosis is available yet."}

            </p>


            <button
              type="button"
              className="voice-btn advisory-voice-btn"
              onClick={
                speakAdvice
              }
              disabled={
                !result ||
                speaking
              }
            >

              {speaking ? (

                <>
                  <Activity
                    size={18}
                  />

                  {
                    t.speaking
                  }
                </>

              ) : (

                <>
                  <Volume2
                    size={18}
                  />

                  {
                    t.listen
                  }

                </>

              )}

            </button>

          </div>

        </div>


        <div className="expert-note">

          <AlertTriangle
            size={18}
          />


          <div>

            <strong>

              {
                t.expertTitle
              }

            </strong>


            <p>

              {
                t.expertText
              }

            </p>

          </div>

        </div>


        {expertMessage && (

          <div
            className="result-status success"
            style={{
              marginTop:
                "15px",
            }}
          >

            <CheckCircle2
              size={17}
            />

            {
              expertMessage
            }

          </div>

        )}


        <div className="advisory-footer-grid">

          <div className="mini-advisory-card">

            <CalendarDays
              size={19}
            />

            <div>

              <span>

                {
                  t.fieldRoutine
                }

              </span>


              <strong>

                {
                  t.scoutConsistently
                }

              </strong>


              <p>

                {
                  t.scoutText
                }

              </p>

            </div>

          </div>


          <div className="mini-advisory-card">

            <MapPin
              size={19}
            />

            <div>

              <span>

                {
                  t.recordKeeping
                }

              </span>


              <strong>

                {
                  t.captureLocation
                }

              </strong>


              <p>

                {
                  t.recordText
                }

              </p>

            </div>

          </div>


          <div
            className="mini-advisory-card"
            onClick={
              openExpertReview
            }
            style={{
              cursor:
                "pointer",
            }}
          >

            <Users
              size={19}
            />


            <div>

              <span>

                {
                  t.escalation
                }

              </span>


              <button
                type="button"
                className="feature-button"
                onClick={(event) => {
                  event.stopPropagation();

                  openExpertReview();
                }}
                style={{
                  marginTop:
                    "6px",
                  padding:
                    "8px 11px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                }}
              >

                {
                  expertSubmitted
                    ? t.waitingValidation
                    : t.askExpert
                }

              </button>


              <p>

                {
                  expertSubmitted
                    ? t.waitingValidation
                    : t.escalationText
                }

              </p>

            </div>

          </div>

        </div>

      </section>
    );

  /* =======================================================
     HOTSPOTS
  ======================================================= */

  const renderHotspotsPage =
    () => (
      <section className="hotspots-dashboard">

        <div className="hotspot-header">

          <div>

            <span className="dashboard-kicker">

              {
                t.hotspotsKicker
              }

            </span>


            <h1>

              {
                t.hotspotTitle
              }

            </h1>


            <p>

              {
                t.hotspotsDescription
              }

            </p>

          </div>


          <div className="prototype-badge">

            <MapPin
              size={15}
            />

            {
              t.prototypeData
            }

          </div>

        </div>


        <div className="hotspot-stats">

          <div className="hotspot-stat-card">

            <div className="hotspot-stat-icon">

              <MapPin
                size={19}
              />

            </div>


            <div>

              <span>

                {
                  t.reportedClusters
                }

              </span>


              <strong>
                5
              </strong>

            </div>

          </div>


          <div className="hotspot-stat-card">

            <div className="hotspot-stat-icon">

              <AlertTriangle
                size={19}
              />

            </div>


            <div>

              <span>

                {
                  t.highCritical
                }

              </span>


              <strong>
                2
              </strong>

            </div>

          </div>


          <div className="hotspot-stat-card">

            <div className="hotspot-stat-icon">

              <Users
                size={19}
              />

            </div>


            <div>

              <span>

                {
                  t.affectedReports
                }

              </span>


              <strong>
                73
              </strong>

            </div>

          </div>

        </div>


        <div className="hotspot-layout">

          <div className="map-card">

            <div className="map-card-head">

              <div>

                <span className="small-label">

                  {
                    t.fieldMap
                  }

                </span>


                <h3>

                  {
                    t.reportedActivity
                  }

                </h3>

              </div>


              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap:
                    "8px",
                  flexWrap:
                    "wrap",
                }}
              >

                <div className="map-search">

                  <Search
                    size={15}
                  />

                  {
                    t.searchField
                  }

                </div>


                <select
                  value={
                    selectedDistrict
                  }
                  onChange={(event) =>
                    setSelectedDistrict(
                      event.target.value
                    )
                  }
                  style={{
                    padding:
                      "9px 10px",
                    borderRadius:
                      "9px",
                    border:
                      "1px solid #dfe5e1",
                    background:
                      "#fff",
                    color:
                      "#102f25",
                    fontFamily:
                      "inherit",
                    fontSize:
                      "11px",
                    fontWeight:
                      600,
                    cursor:
                      "pointer",
                  }}
                >

                  {Object.keys(
                    districts
                  ).map(
                    (district) => (

                      <option
                        key={
                          district
                        }
                        value={
                          district
                        }
                      >

                        {
                          district
                        }

                      </option>

                    )
                  )}

                </select>

              </div>

            </div>


            <div className="map-shell">

              <MapContainer
                key={
                  selectedDistrict
                }
                center={
                  hotspotCenter
                }
                zoom={11}
                scrollWheelZoom={
                  true
                }
                className="hotspot-map"
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                <MapResetView
                  center={
                    hotspotCenter
                  }
                  zoom={11}
                  label={
                    t.resetView
                  }
                />


                {hotspotCases.map(
                  (spot) => (

                    <CircleMarker
                      key={
                        spot.id
                      }
                      center={[
                        spot.lat,
                        spot.lng,
                      ]}
                      radius={
                        spot.level ===
                        "Critical"
                          ? 17
                          : 13
                      }
                      pathOptions={{
                        color:
                          spot.level ===
                          "Critical"
                            ? "#a8433d"
                            : spot.level ===
                              "High"
                            ? "#c9963f"
                            : spot.level ===
                              "Medium"
                            ? "#2f7a4f"
                            : "#8ea296",

                        fillColor:
                          spot.level ===
                          "Critical"
                            ? "#d9534f"
                            : spot.level ===
                              "High"
                            ? "#e3a23b"
                            : spot.level ===
                              "Medium"
                            ? "#4b9b55"
                            : "#91ad9a",

                        fillOpacity:
                          0.72,

                        weight:
                          3,
                      }}
                    >

                      <Popup>

                        <strong>

                          {
                            spot.name
                          }

                        </strong>


                        <br />


                        {
                          spot.disease
                        }


                        <br />


                        {
                          t.mapRisk
                        }:


                        {" "}


                        {
                          getHotspotLabel(
                            spot.level
                          )
                        }


                        <br />


                        {
                          t.mapReports
                        }:


                        {" "}


                        {
                          spot.count
                        }

                      </Popup>

                    </CircleMarker>

                  )
                )}

              </MapContainer>


              <div className="map-control-hint">

                <Navigation
                  size={14}
                />

                {
                  t.mapHint
                }

              </div>


              <div className="map-legend">

                <span className="legend-title">

                  {
                    t.mapRisk
                  }

                </span>


                <span>

                  <i className="legend-dot critical"></i>

                  {
                    t.critical
                  }

                </span>


                <span>

                  <i className="legend-dot high"></i>

                  {
                    t.high
                  }

                </span>


                <span>

                  <i className="legend-dot medium"></i>

                  {
                    t.medium
                  }

                </span>


                <span>

                  <i className="legend-dot low"></i>

                  {
                    t.low
                  }

                </span>

              </div>

            </div>

          </div>


          <div className="hotspot-list-card">

            <div className="map-card-head compact">

              <div>

                <span className="small-label">

                  {
                    t.recentReports
                  }

                </span>


                <h3>

                  {
                    t.priorityAreas
                  }

                </h3>

              </div>

            </div>


            <div className="hotspot-list">

              {hotspotCases.map(
                (spot) => (

                  <div
                    className="hotspot-item"
                    key={
                      spot.id
                    }
                  >

                    <div
                      className={`hotspot-marker ${
                        getHotspotClass(
                          spot.level
                        )
                      }`}
                    >

                      <MapPin
                        size={16}
                      />

                    </div>


                    <div className="hotspot-item-main">

                      <div className="hotspot-item-top">

                        <strong>

                          {
                            spot.name
                          }

                        </strong>


                        <span
                          className={`hotspot-level ${
                            getHotspotClass(
                              spot.level
                            )
                          }`}
                        >

                          {
                            getHotspotLabel(
                              spot.level
                            )
                          }

                        </span>

                      </div>


                      <span>

                        {
                          spot.disease
                        }

                      </span>


                      <small>

                        {
                          spot.count
                        }{" "}

                        {
                          t.reportedCases
                        }

                      </small>

                    </div>

                  </div>

                )
              )}

            </div>


            <div className="hotspot-note">

              <ShieldCheck
                size={17}
              />

              <p>

                {
                  t.hotspotValidation
                }

              </p>

            </div>

          </div>

        </div>

      </section>
    );

  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout =
    () => {
      sessionStorage.removeItem(
        "cropshield_logged_in"
      );

      if (
        typeof window !==
          "undefined" &&
        window.speechSynthesis
      ) {
        window.speechSynthesis.cancel();
      }

      setSpeaking(
        false
      );

      setIsLoggedIn(
        false
      );
    };

  /* =======================================================
     LOGIN
  ======================================================= */

  if (!isLoggedIn) {
    return (
      <LoginScreen
        language={
          language
        }
        onLanguageChange={
          setLanguage
        }
        onLogin={() =>
          setIsLoggedIn(
            true
          )
        }
        onGoogleSuccess={
          handleGoogleSuccess
        }
        googleClientId={
          GOOGLE_CLIENT_ID
        }
      />
    );
  }

  /* =======================================================
     MAIN APP
  ======================================================= */

  return (
    <div className="app">

      <nav className="navbar">

        <div className="brand">

          <div className="brand-icon">

            <Leaf
              size={22}
            />

          </div>


          <div>

            <h2>
              CropShield
            </h2>


            <span>
              AI Crop Intelligence
            </span>

          </div>

        </div>


        <div className="nav-links">

          <button
            type="button"
            className={`nav-link ${
              activePage ===
              "diagnosis"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "diagnosis"
              )
            }
          >

            {
              t.nav.diagnosis
            }

          </button>


          <button
            type="button"
            className={`nav-link ${
              activePage ===
              "risk"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "risk"
              )
            }
          >

            {
              t.nav.risk
            }

          </button>


          <button
            type="button"
            className={`nav-link ${
              activePage ===
              "hotspots"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "hotspots"
              )
            }
          >

            {
              t.nav.hotspots
            }

          </button>


          <button
            type="button"
            className={`nav-link ${
              activePage ===
              "advisories"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "advisories"
              )
            }
          >

            {
              t.nav.advisories
            }

          </button>

        </div>


        <div className="language-switcher">

          <button
            type="button"
            className="language-btn"
            onClick={() =>
              setShowLanguageMenu(
                (current) =>
                  !current
              )
            }
          >

            <Languages
              size={17}
            />


            {
              languages.find(
                (item) =>
                  item.code ===
                  language
              )?.native
            }


            <ChevronRight
              size={15}
              style={{
                transform:
                  showLanguageMenu
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                transition:
                  ".2s ease",
              }}
            />

          </button>


          {showLanguageMenu && (

            <div className="language-menu">

              {languages.map(
                (
                  item
                ) => (

                  <button
                    type="button"
                    key={
                      item.code
                    }
                    className={`language-option ${
                      language ===
                      item.code
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {

                      setLanguage(
                        item.code
                      );

                      setShowLanguageMenu(
                        false
                      );

                      setSpeechError(
                        ""
                      );

                      if (
                        window.speechSynthesis
                      ) {
                        window.speechSynthesis.cancel();
                      }

                      setSpeaking(
                        false
                      );

                    }}
                  >

                    <span>

                      {
                        item.native
                      }

                    </span>


                    <small>

                      {
                        item.name
                      }

                    </small>

                  </button>

                )
              )}

            </div>

          )}

        </div>


        <button
          type="button"
          onClick={
            logout
          }
          title={
            t.signOut
          }
          style={{
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            width:
              "34px",
            height:
              "34px",
            borderRadius:
              "8px",
            background:
              "transparent",
            color:
              "#65736c",
            cursor:
              "pointer",
          }}
        >

          <LogOut
            size={15}
          />

        </button>

      </nav>


      <main>

        {activePage ===
          "diagnosis" &&
          renderDiagnosisPage()}

        {activePage ===
          "risk" &&
          renderRiskPage()}

        {activePage ===
          "hotspots" &&
          renderHotspotsPage()}

        {activePage ===
          "advisories" &&
          renderAdvisoriesPage()}

      </main>


      <footer>

        <div>

          <strong>
            CropShield AI
          </strong>

          <span>
            {" "}•{" "}
            Smart agriculture intelligence
          </span>

        </div>


        <span>

          {
            t.footer
          }

        </span>

      </footer>


      {/* =================================================
          EXPERT MODAL
      ================================================= */}

      {expertModalOpen && (

        <div
          style={{
            position:
              "fixed",
            inset:
              0,
            zIndex:
              1000,
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            padding:
              "20px",
            background:
              "rgba(16,47,37,.45)",
            backdropFilter:
              "blur(5px)",
          }}
          onClick={() =>
            setExpertModalOpen(
              false
            )
          }
        >

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width:
                "100%",
              maxWidth:
                "490px",
              background:
                "#ffffff",
              borderRadius:
                "16px",
              padding:
                "24px",
              border:
                "1px solid #dfe5e1",
              boxShadow:
                "0 25px 70px rgba(16,47,37,.20)",
            }}
          >

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                gap:
                  "12px",
              }}
            >

              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap:
                    "10px",
                }}
              >

                <div
                  style={{
                    width:
                      "38px",
                    height:
                      "38px",
                    borderRadius:
                      "9px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    background:
                      "#edf3ee",
                    color:
                      "#2f7a4f",
                  }}
                >

                  <MessageCircle
                    size={19}
                  />

                </div>


                <div>

                  <span className="small-label">

                    {
                      t.expertValidationTitle
                    }

                  </span>


                  <h3
                    style={{
                      marginTop:
                        "3px",
                      fontFamily:
                        "Manrope, sans-serif",
                      color:
                        "#102f25",
                      fontSize:
                        "18px",
                    }}
                  >

                    {
                      t.expertModalTitle
                    }

                  </h3>

                </div>

              </div>


              <button
                type="button"
                onClick={() =>
                  setExpertModalOpen(
                    false
                  )
                }
                style={{
                  width:
                    "32px",
                  height:
                    "32px",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  borderRadius:
                    "8px",
                  background:
                    "#f3f5f3",
                  color:
                    "#65736c",
                  cursor:
                    "pointer",
                }}
              >

                <X
                  size={17}
                />

              </button>

            </div>


            {result && (

              <div
                style={{
                  marginTop:
                    "18px",
                  padding:
                    "12px",
                  borderRadius:
                    "10px",
                  background:
                    "#f5f7f5",
                  border:
                    "1px solid #e0e5e1",
                  fontSize:
                    "11px",
                  color:
                    "#66746d",
                }}
              >

                <strong
                  style={{
                    color:
                      "#102f25",
                  }}
                >

                  {
                    translateDiseaseName(
                      result.class,
                      language
                    )
                  }

                </strong>


                <br />

                Confidence:
                {" "}

                {
                  result.confidence
                }%

              </div>

            )}


            <p
              style={{
                marginTop:
                  "15px",
                color:
                  "#66746d",
                fontSize:
                  "12px",
                lineHeight:
                  1.6,
              }}
            >

              {
                t.expertModalDescription
              }

            </p>


            <textarea
              value={
                expertQuestion
              }
              onChange={(event) =>
                setExpertQuestion(
                  event.target
                    .value
                )
              }
              placeholder={
                t.expertQuestionPlaceholder
              }
              rows={5}
              style={{
                width:
                  "100%",
                marginTop:
                  "15px",
                padding:
                  "12px",
                resize:
                  "vertical",
                borderRadius:
                  "9px",
                border:
                  "1px solid #dfe5e1",
                fontFamily:
                  "inherit",
                fontSize:
                  "12px",
                lineHeight:
                  1.5,
                outline:
                  "none",
              }}
            />


            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "flex-end",
                gap:
                  "9px",
                marginTop:
                  "15px",
              }}
            >

              <button
                type="button"
                onClick={() =>
                  setExpertModalOpen(
                    false
                  )
                }
                style={{
                  padding:
                    "10px 13px",
                  borderRadius:
                    "9px",
                  background:
                    "#f3f5f3",
                  color:
                    "#53635b",
                  fontWeight:
                    600,
                  fontSize:
                    "11px",
                  cursor:
                    "pointer",
                }}
              >

                {
                  t.cancel
                }

              </button>


              <button
                type="button"
                onClick={
                  submitExpertReview
                }
                style={{
                  padding:
                    "10px 14px",
                  borderRadius:
                    "9px",
                  background:
                    "#102f25",
                  color:
                    "#fff",
                  fontWeight:
                    700,
                  fontSize:
                    "11px",
                  cursor:
                    "pointer",
                }}
              >

                {
                  t.submitQuestion
                }

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;