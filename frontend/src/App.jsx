import { useEffect, useRef, useState } from "react";

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
   BASE ENGLISH TRANSLATIONS
========================================================= */

const english = {
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
  rainfall: "Today's rainfall",
  pestActivity: "Pest activity",
  cropStage: "Crop stage",

  weatherLive: "LIVE WEATHER",
  weatherUpdated: "Weather updated",
  fetchingWeather: "Fetching live weather...",
  weatherUnavailable: "Live weather unavailable",
  refreshWeather: "Refresh weather",

  warningTitle:
    "Conditions are favorable for disease development.",

  warningText:
    "The prototype risk engine combines environmental conditions, crop stage, and pest activity to prioritize potential outbreaks.",

  recommendedActionRisk: "Recommended action",

  recommendedActionText:
    "Increase field monitoring, inspect nearby plants, and follow appropriate integrated pest-management guidance.",

  pestTrap: "Pest trap signal",

  pestTrapText:
    "Prototype sensor feed indicates elevated pest activity in the monitored area.",

  nextUpdate: "Next update",

  nextUpdateText:
    "Risk should be recalculated when new weather, crop-stage, or pest observations are received.",

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

  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  selectDistrict: "Select Maharashtra district",

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
    "CropShield provides decision support. Field symptoms, crop variety, local conditions, and official agricultural guidance should be considered before operational treatment decisions.",

  fieldRoutine: "FIELD ROUTINE",
  scoutConsistently: "Scout consistently",

  scoutText:
    "Regular observation improves early detection.",

  recordKeeping: "RECORD KEEPING",
  captureLocation: "Capture location",

  recordText:
    "Use field reports to support hotspot mapping.",

  escalation: "ESCALATION",
  askExpert: "Ask an expert",

  escalationText:
    "Escalate uncertain or spreading cases.",

  backToDiagnosis: "Back to Diagnosis",

  footer: "Built for smarter, safer farming",

  errors: {
    prediction: "Prediction failed",
    server:
      "Unable to connect to the AI server. Make sure the FastAPI backend is running.",
  },
};

/* =========================================================
   LANGUAGE OVERRIDES
========================================================= */

const translations = {
  en: english,

  mr: {
    ...english,

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
    startDiagnosis: "निदान सुरू करा",

    aiDiagnosis: "AI-आधारित निदान",
    riskInsights: "रिअल-टाइम जोखीम माहिती",

    cropHealth: "पीक आरोग्य",
    diagnosisTitle: "AI निदान",
    detectedCondition: "ओळखलेली स्थिती",
    analyzingLeaf: "पानाचे विश्लेषण सुरू आहे...",
    ready: "विश्लेषणासाठी तयार",

    uploadHint:
      "पिकाच्या पानाचा स्पष्ट फोटो अपलोड करा",

    confidence: "विश्वास",
    aiConfidence: "AI विश्वास पातळी",
    severity: "तीव्रता",
    riskLevel: "जोखीम पातळी",
    cropHealthStatus: "पीक आरोग्य स्थिती",

    recommendedAction:
      "शिफारस केलेली कृती",

    whatShouldIDo: "काय करावे?",
    cropAdvisory: "पीक सल्ला",
    listen: "सल्ला ऐका",
    speaking: "सल्ला वाचला जात आहे...",

    highConfidence:
      "उच्च-विश्वास AI निदान",

    expertValidation:
      "तज्ज्ञ पडताळणीची शिफारस",

    analyzingButton:
      "विश्लेषण करत आहे...",

    analyzeAnother:
      "दुसरे पान तपासा",

    uploadLeaf:
      "पानाचा फोटो अपलोड करा",

    scan: "AI विश्लेषण करत आहे...",

    riskTitle: "पीक जोखीम अंदाज",
    overallRisk: "एकूण जोखीम",
    currentConditions: "सध्याची परिस्थिती",
    fieldEnvironment: "शेतातील परिस्थिती",
    earlyWarning: "पूर्वसूचना",

    riskKicker:
      "पूर्वसूचना प्रणाली",

    riskDescription:
      "यासाठी नमुना जोखीम अंदाज:",

    sevenDayOutlook:
      "७-दिवसांचा अंदाज",

    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "आजचे पर्जन्यमान",
    pestActivity: "कीड क्रियाशीलता",
    cropStage: "पिकाची अवस्था",

    weatherLive: "थेट हवामान",
    weatherUpdated: "हवामान अद्यतन",
    fetchingWeather:
      "थेट हवामान मिळवत आहे...",
    weatherUnavailable:
      "थेट हवामान उपलब्ध नाही",
    refreshWeather:
      "हवामान अद्यतनित करा",

    fieldIntelligence:
      "शेत बुद्धिमत्ता",

    sensorPanelTitle:
      "कीड सापळा आणि सेन्सर",

    sensorPanelText:
      "निरीक्षण केलेल्या शेतासाठी नमुना सेन्सर फीड.",

    pestTrapCount:
      "कीड सापळा संख्या",

    soilMoisture:
      "मातीतील आर्द्रता",

    sensorStatus:
      "सेन्सर स्थिती",

    refreshSensor:
      "सेन्सर अद्यतनित करा",

    lastUpdate:
      "शेवटचे अद्यतन",

    expertValidationTitle:
      "तज्ज्ञ पडताळणी",

    expertReviewTitle:
      "तज्ज्ञ पुनरावलोकन",

    expertReviewText:
      "अनिश्चित AI निकाल तज्ज्ञ पडताळणीसाठी पाठवता येतात.",

    sendForExpert:
      "तज्ज्ञ पडताळणीसाठी पाठवा",

    requestExpert:
      "तज्ज्ञ पडताळणी मागवा",

    caseSubmitted:
      "प्रकरण पाठवले",

    waitingValidation:
      "तज्ज्ञ पडताळणीची प्रतीक्षा",

    uploadFirst:
      "प्रथम पानाचा फोटो अपलोड करा.",

    hotspotsKicker:
      "भौगोलिक माहिती",

    hotspotTitle:
      "रोग हॉटस्पॉट्स",

    hotspotsDescription:
      "नोंदवलेली पीक-आरोग्य प्रकरणे पहा, समूह ओळखा आणि शेत तपासणीला प्राधान्य द्या.",

    prototypeData:
      "प्रोटोटाइप डेटा",

    reportedClusters:
      "नोंदवलेले समूह",

    highCritical:
      "उच्च / गंभीर",

    affectedReports:
      "प्रभावित अहवाल",

    fieldMap:
      "शेत नकाशा",

    reportedActivity:
      "नोंदवलेली रोग क्रियाशीलता",

    searchField:
      "शेत शोधा",

    resetView:
      "नकाशा रीसेट",

    mapHint:
      "हलवा • झूम करा • हॉटस्पॉटवर टॅप करा",

    recentReports:
      "अलीकडील अहवाल",

    priorityAreas:
      "प्राधान्य क्षेत्रे",

    reportedCases:
      "नोंदवलेली प्रकरणे",

    mapRisk:
      "जोखीम",

    mapReports:
      "अहवाल",

    hotspotValidation:
      "प्रोटोटाइप हॉटस्पॉट नोंदी प्रात्यक्षिकासाठी आहेत. प्रत्यक्ष निर्णय घेण्यापूर्वी शेत अहवालांची पडताळणी करावी.",

    critical: "गंभीर",
    high: "उच्च",
    medium: "मध्यम",
    low: "कमी",

    selectDistrict:
      "महाराष्ट्रातील जिल्हा निवडा",

    advisoriesKicker:
      "शेतकरी कृती केंद्र",

    advisoriesTitle:
      "पीक सल्ला",

    advisoriesDescription:
      "AI निदानाचे स्पष्ट पुढील टप्पे, प्रतिबंध आणि निरीक्षण मार्गदर्शनात रूपांतर करा.",

    aiAssisted:
      "AI-सहाय्यित मार्गदर्शन",

    currentCondition:
      "सध्याची स्थिती",

    noDiagnosis:
      "अद्याप निदान नाही",

    status: "स्थिती",

    immediateAction:
      "तात्काळ कृती",

    whatToDoNow:
      "आता काय करावे",

    prevention:
      "प्रतिबंध",

    reduceFutureRisk:
      "भविष्यातील जोखीम कमी करा",

    monitoring:
      "निरीक्षण",

    keepWatching:
      "लक्ष ठेवा",

    expertTitle:
      "AI-सहाय्यित मार्गदर्शन — तज्ज्ञ पडताळणीची शिफारस",

    expertText:
      "CropShield निर्णय सहाय्य देते. कृती करण्यापूर्वी शेतातील लक्षणे, पिकाची जात, स्थानिक परिस्थिती आणि अधिकृत कृषी मार्गदर्शन विचारात घ्यावे.",

    fieldRoutine:
      "शेतातील दिनचर्या",

    scoutConsistently:
      "नियमित पाहणी करा",

    scoutText:
      "नियमित निरीक्षणामुळे रोग लवकर ओळखता येतो.",

    recordKeeping:
      "नोंद ठेवणे",

    captureLocation:
      "स्थान नोंदवा",

    recordText:
      "फील्ड अहवाल हॉटस्पॉट नकाशासाठी वापरा.",

    escalation:
      "तज्ज्ञ मदत",

    askExpert:
      "तज्ज्ञांचा सल्ला घ्या",

    escalationText:
      "अनिश्चित किंवा वाढणारी प्रकरणे तज्ज्ञांकडे पाठवा.",

    backToDiagnosis:
      "निदानाकडे परत जा",

    footer:
      "अधिक स्मार्ट आणि सुरक्षित शेतीसाठी",
  },

  hi: {
    ...english,

    nav: {
      diagnosis: "निदान",
      risk: "जोखिम पूर्वानुमान",
      hotspots: "हॉटस्पॉट",
      advisories: "सलाह",
      language: "भाषा",
    },

    systemOnline:
      "AI सिस्टम ऑनलाइन",

    heroTitle:
      "अपनी फसलों की रक्षा करें",

    heroSubtitle:
      "बहुत देर होने से पहले।",

    startDiagnosis:
      "निदान शुरू करें",

    aiDiagnosis:
      "AI-संचालित निदान",

    riskInsights:
      "रियल-टाइम जोखिम जानकारी",

    cropHealth:
      "फसल स्वास्थ्य",

    diagnosisTitle:
      "AI निदान",

    detectedCondition:
      "पहचानी गई स्थिति",

    analyzingLeaf:
      "पत्ती का विश्लेषण हो रहा है...",

    ready:
      "विश्लेषण के लिए तैयार",

    uploadHint:
      "फसल की पत्ती की साफ तस्वीर अपलोड करें",

    confidence:
      "विश्वास",

    aiConfidence:
      "AI विश्वास",

    severity:
      "गंभीरता",

    riskLevel:
      "जोखिम स्तर",

    cropHealthStatus:
      "फसल स्वास्थ्य स्थिति",

    recommendedAction:
      "अनुशंसित कार्रवाई",

    whatShouldIDo:
      "क्या करें?",

    cropAdvisory:
      "फसल सलाह",

    listen:
      "सलाह सुनें",

    speaking:
      "सलाह सुनाई जा रही है...",

    highConfidence:
      "उच्च-विश्वास AI निदान",

    expertValidation:
      "विशेषज्ञ सत्यापन की सलाह",

    analyzingButton:
      "विश्लेषण हो रहा है...",

    analyzeAnother:
      "दूसरी पत्ती जांचें",

    uploadLeaf:
      "पत्ती की तस्वीर अपलोड करें",

    scan:
      "AI विश्लेषण कर रहा है...",

    riskTitle:
      "फसल जोखिम पूर्वानुमान",

    overallRisk:
      "कुल जोखिम",

    currentConditions:
      "वर्तमान स्थिति",

    fieldEnvironment:
      "खेत का वातावरण",

    earlyWarning:
      "पूर्व चेतावनी",

    riskKicker:
      "पूर्व चेतावनी प्रणाली",

    riskDescription:
      "इसके लिए प्रोटोटाइप जोखिम अनुमान:",

    sevenDayOutlook:
      "7-दिन का पूर्वानुमान",

    temperature:
      "तापमान",

    humidity:
      "नमी",

    rainfall:
      "आज की वर्षा",

    pestActivity:
      "कीट गतिविधि",

    cropStage:
      "फसल अवस्था",

    weatherLive:
      "लाइव मौसम",

    weatherUpdated:
      "मौसम अपडेट",

    fetchingWeather:
      "लाइव मौसम प्राप्त हो रहा है...",

    weatherUnavailable:
      "लाइव मौसम उपलब्ध नहीं है",

    refreshWeather:
      "मौसम अपडेट करें",

    fieldIntelligence:
      "खेत की जानकारी",

    sensorPanelTitle:
      "कीट ट्रैप और सेंसर",

    sensorPanelText:
      "निगरानी किए गए खेत के लिए प्रोटोटाइप सेंसर फीड।",

    pestTrapCount:
      "कीट ट्रैप संख्या",

    soilMoisture:
      "मिट्टी की नमी",

    sensorStatus:
      "सेंसर स्थिति",

    refreshSensor:
      "सेंसर अपडेट करें",

    lastUpdate:
      "अंतिम अपडेट",

    expertValidationTitle:
      "विशेषज्ञ सत्यापन",

    expertReviewTitle:
      "विशेषज्ञ समीक्षा",

    expertReviewText:
      "अनिश्चित AI परिणाम विशेषज्ञ सत्यापन के लिए भेजे जा सकते हैं।",

    sendForExpert:
      "विशेषज्ञ समीक्षा के लिए भेजें",

    requestExpert:
      "विशेषज्ञ सत्यापन का अनुरोध करें",

    caseSubmitted:
      "केस भेजा गया",

    waitingValidation:
      "विशेषज्ञ सत्यापन की प्रतीक्षा",

    uploadFirst:
      "पहले पत्ती की तस्वीर अपलोड करें।",

    hotspotsKicker:
      "भौगोलिक जानकारी",

    hotspotTitle:
      "रोग हॉटस्पॉट",

    hotspotsDescription:
      "रिपोर्ट किए गए फसल स्वास्थ्य मामलों को देखें और खेत निरीक्षण को प्राथमिकता दें।",

    prototypeData:
      "प्रोटोटाइप डेटा",

    reportedClusters:
      "रिपोर्ट किए गए क्लस्टर",

    highCritical:
      "उच्च / गंभीर",

    affectedReports:
      "प्रभावित रिपोर्ट",

    fieldMap:
      "खेत का नक्शा",

    reportedActivity:
      "रिपोर्ट की गई रोग गतिविधि",

    searchField:
      "खेत खोजें",

    resetView:
      "नक्शा रीसेट",

    mapHint:
      "स्थान बदलें • ज़ूम करें • हॉटस्पॉट दबाएं",

    recentReports:
      "हाल की रिपोर्ट",

    priorityAreas:
      "प्राथमिक क्षेत्र",

    reportedCases:
      "रिपोर्ट किए गए मामले",

    mapRisk:
      "जोखिम",

    mapReports:
      "रिपोर्ट",

    hotspotValidation:
      "प्रोटोटाइप हॉटस्पॉट रिकॉर्ड केवल प्रदर्शन के लिए हैं।",

    critical:
      "गंभीर",

    high:
      "उच्च",

    medium:
      "मध्यम",

    low:
      "कम",

    selectDistrict:
      "महाराष्ट्र जिला चुनें",

    advisoriesKicker:
      "किसान कार्रवाई केंद्र",

    advisoriesTitle:
      "फसल सलाह",

    advisoriesDescription:
      "AI निदान को स्पष्ट अगले कदम, रोकथाम और निगरानी मार्गदर्शन में बदलें।",

    aiAssisted:
      "AI-सहायता प्राप्त मार्गदर्शन",

    currentCondition:
      "वर्तमान स्थिति",

    noDiagnosis:
      "अभी निदान नहीं",

    status:
      "स्थिति",

    immediateAction:
      "तत्काल कार्रवाई",

    whatToDoNow:
      "अभी क्या करें",

    prevention:
      "रोकथाम",

    reduceFutureRisk:
      "भविष्य का जोखिम कम करें",

    monitoring:
      "निगरानी",

    keepWatching:
      "नज़र रखें",

    expertTitle:
      "AI-सहायता प्राप्त मार्गदर्शन — विशेषज्ञ सत्यापन की सलाह",

    expertText:
      "कार्रवाई से पहले खेत के लक्षण, फसल की किस्म, स्थानीय परिस्थितियों और आधिकारिक कृषि मार्गदर्शन पर विचार करें।",

    fieldRoutine:
      "खेत की दिनचर्या",

    scoutConsistently:
      "नियमित निरीक्षण करें",

    scoutText:
      "नियमित निरीक्षण से रोग का जल्दी पता लगाने में मदद मिलती है।",

    recordKeeping:
      "रिकॉर्ड रखना",

    captureLocation:
      "स्थान दर्ज करें",

    recordText:
      "हॉटस्पॉट मैपिंग में खेत की रिपोर्ट का उपयोग करें।",

    escalation:
      "विशेषज्ञ सहायता",

    askExpert:
      "विशेषज्ञ से पूछें",

    escalationText:
      "अनिश्चित मामलों को विशेषज्ञ के पास भेजें।",

    backToDiagnosis:
      "निदान पर वापस जाएं",

    footer:
      "अधिक स्मार्ट और सुरक्षित खेती के लिए",
  },

  te: {
    ...english,

    nav: {
      diagnosis: "నిర్ధారణ",
      risk: "ప్రమాద అంచనా",
      hotspots: "హాట్‌స్పాట్‌లు",
      advisories: "సలహాలు",
      language: "భాష",
    },

    systemOnline:
      "AI వ్యవస్థ ఆన్‌లైన్‌లో ఉంది",

    heroTitle:
      "మీ పంటలను రక్షించండి",

    heroSubtitle:
      "చాలా ఆలస్యం కాకముందే.",

    startDiagnosis:
      "నిర్ధారణ ప్రారంభించండి",

    aiDiagnosis:
      "AI ఆధారిత నిర్ధారణ",

    riskInsights:
      "రియల్-టైమ్ ప్రమాద సమాచారం",

    cropHealth:
      "పంట ఆరోగ్యం",

    diagnosisTitle:
      "AI నిర్ధారణ",

    detectedCondition:
      "గుర్తించిన పరిస్థితి",

    analyzingLeaf:
      "ఆకును విశ్లేషిస్తోంది...",

    ready:
      "విశ్లేషణకు సిద్ధంగా ఉంది",

    uploadHint:
      "పంట ఆకు యొక్క స్పష్టమైన చిత్రాన్ని అప్లోడ్ చేయండి",

    confidence:
      "నమ్మకం",

    aiConfidence:
      "AI నమ్మక స్థాయి",

    severity:
      "తీవ్రత",

    riskLevel:
      "ప్రమాద స్థాయి",

    cropHealthStatus:
      "పంట ఆరోగ్య స్థితి",

    recommendedAction:
      "సిఫారసు చేసిన చర్య",

    whatShouldIDo:
      "ఏం చేయాలి?",

    cropAdvisory:
      "పంట సలహా",

    listen:
      "సలహా వినండి",

    speaking:
      "సలహా చదువుతోంది...",

    highConfidence:
      "అధిక నమ్మకంతో AI నిర్ధారణ",

    expertValidation:
      "నిపుణుల ధృవీకరణ సిఫారసు",

    analyzingButton:
      "విశ్లేషిస్తోంది...",

    analyzeAnother:
      "మరో ఆకును విశ్లేషించండి",

    uploadLeaf:
      "ఆకు చిత్రాన్ని అప్లోడ్ చేయండి",

    scan:
      "AI విశ్లేషిస్తోంది...",

    riskTitle:
      "పంట ప్రమాద అంచనా",

    overallRisk:
      "మొత్తం ప్రమాదం",

    currentConditions:
      "ప్రస్తుత పరిస్థితులు",

    fieldEnvironment:
      "పొల వాతావరణం",

    earlyWarning:
      "ముందస్తు హెచ్చరిక",

    riskKicker:
      "ముందస్తు హెచ్చరిక వ్యవస్థ",

    riskDescription:
      "దీని కోసం నమూనా ప్రమాద అంచనా:",

    sevenDayOutlook:
      "7-రోజుల అంచనా",

    temperature:
      "ఉష్ణోగ్రత",

    humidity:
      "తేమ",

    rainfall:
      "ఈరోజు వర్షపాతం",

    pestActivity:
      "పురుగు కార్యకలాపం",

    cropStage:
      "పంట దశ",

    weatherLive:
      "ప్రత్యక్ష వాతావరణం",

    weatherUpdated:
      "వాతావరణ నవీకరణ",

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

    hotspotValidation:
      "ప్రోటోటైప్ హాట్‌స్పాట్ రికార్డులు ప్రదర్శన కోసం మాత్రమే.",

    critical:
      "తీవ్రమైన",

    high:
      "అధిక",

    medium:
      "మధ్యస్థ",

    low:
      "తక్కువ",

    selectDistrict:
      "మహారాష్ట్ర జిల్లాను ఎంచుకోండి",

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

    askExpert:
      "నిపుణుడిని అడగండి",

    escalationText:
      "అనిశ్చిత కేసులను నిపుణులకు పంపండి.",

    backToDiagnosis:
      "నిర్ధారణకు తిరిగి వెళ్లండి",

    footer:
      "మరింత తెలివైన, సురక్షితమైన వ్యవసాయం కోసం",
  },

  kn: {
    ...english,

    nav: {
      diagnosis: "ರೋಗನಿರ್ಣಯ",
      risk: "ಅಪಾಯದ ಮುನ್ಸೂಚನೆ",
      hotspots: "ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",
      advisories: "ಸಲಹೆಗಳು",
      language: "ಭಾಷೆ",
    },

    systemOnline:
      "AI ವ್ಯವಸ್ಥೆ ಆನ್‌ಲೈನ್",

    heroTitle:
      "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ",

    heroSubtitle:
      "ತಡವಾಗುವ ಮೊದಲು.",

    startDiagnosis:
      "ರೋಗನಿರ್ಣಯ ಪ್ರಾರಂಭಿಸಿ",

    aiDiagnosis:
      "AI ಆಧಾರಿತ ರೋಗನಿರ್ಣಯ",

    riskInsights:
      "ರಿಯಲ್-ಟೈಮ್ ಅಪಾಯ ಮಾಹಿತಿ",

    cropHealth:
      "ಬೆಳೆ ಆರೋಗ್ಯ",

    diagnosisTitle:
      "AI ರೋಗನಿರ್ಣಯ",

    detectedCondition:
      "ಗುರುತಿಸಿದ ಸ್ಥಿತಿ",

    analyzingLeaf:
      "ಎಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",

    ready:
      "ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧ",

    uploadHint:
      "ಬೆಳೆಯ ಎಲೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",

    confidence:
      "ವಿಶ್ವಾಸ",

    aiConfidence:
      "AI ವಿಶ್ವಾಸ",

    severity:
      "ತೀವ್ರತೆ",

    riskLevel:
      "ಅಪಾಯದ ಮಟ್ಟ",

    cropHealthStatus:
      "ಬೆಳೆ ಆರೋಗ್ಯ ಸ್ಥಿತಿ",

    recommendedAction:
      "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",

    whatShouldIDo:
      "ಏನು ಮಾಡಬೇಕು?",

    cropAdvisory:
      "ಬೆಳೆ ಸಲಹೆ",

    listen:
      "ಸಲಹೆ ಕೇಳಿ",

    speaking:
      "ಸಲಹೆಯನ್ನು ಓದಲಾಗುತ್ತಿದೆ...",

    highConfidence:
      "ಹೆಚ್ಚಿನ ವಿಶ್ವಾಸದ AI ರೋಗನಿರ್ಣಯ",

    expertValidation:
      "ತಜ್ಞರ ಪರಿಶೀಲನೆ ಶಿಫಾರಸು",

    analyzingButton:
      "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",

    analyzeAnother:
      "ಮತ್ತೊಂದು ಎಲೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",

    uploadLeaf:
      "ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",

    scan:
      "AI ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",

    riskTitle:
      "ಬೆಳೆ ಅಪಾಯದ ಮುನ್ಸೂಚನೆ",

    overallRisk:
      "ಒಟ್ಟು ಅಪಾಯ",

    currentConditions:
      "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳು",

    fieldEnvironment:
      "ಹೊಲದ ಪರಿಸರ",

    earlyWarning:
      "ಮುನ್ನೆಚ್ಚರಿಕೆ",

    riskKicker:
      "ಮುನ್ನೆಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ",

    riskDescription:
      "ಇದಕ್ಕಾಗಿ ಮಾದರಿ ಅಪಾಯ ಅಂದಾಜು:",

    sevenDayOutlook:
      "7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ",

    temperature:
      "ಉಷ್ಣತೆ",

    humidity:
      "ಆರ್ದ್ರತೆ",

    rainfall:
      "ಇಂದಿನ ಮಳೆ",

    pestActivity:
      "ಕೀಟ ಚಟುವಟಿಕೆ",

    cropStage:
      "ಬೆಳೆ ಹಂತ",

    weatherLive:
      "ನೇರ ಹವಾಮಾನ",

    weatherUpdated:
      "ಹವಾಮಾನ ನವೀಕರಣ",

    fetchingWeather:
      "ನೇರ ಹವಾಮಾನ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",

    weatherUnavailable:
      "ನೇರ ಹವಾಮಾನ ಲಭ್ಯವಿಲ್ಲ",

    refreshWeather:
      "ಹವಾಮಾನ ನವೀಕರಿಸಿ",

    fieldIntelligence:
      "ಫೀಲ್ಡ್ ಇಂಟೆಲಿಜೆನ್ಸ್",

    sensorPanelTitle:
      "ಕೀಟ ಬಲೆ ಮತ್ತು ಸೆನ್ಸರ್",

    sensorPanelText:
      "ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿದ ಹೊಲಕ್ಕೆ ಮಾದರಿ ಸೆನ್ಸರ್ ಫೀಡ್.",

    pestTrapCount:
      "ಕೀಟ ಬಲೆ ಸಂಖ್ಯೆ",

    soilMoisture:
      "ಮಣ್ಣಿನ ತೇವಾಂಶ",

    sensorStatus:
      "ಸೆನ್ಸರ್ ಸ್ಥಿತಿ",

    refreshSensor:
      "ಸೆನ್ಸರ್ ನವೀಕರಿಸಿ",

    lastUpdate:
      "ಕೊನೆಯ ನವೀಕರಣ",

    expertValidationTitle:
      "ತಜ್ಞರ ಪರಿಶೀಲನೆ",

    expertReviewTitle:
      "ತಜ್ಞರ ವಿಮರ್ಶೆ",

    expertReviewText:
      "ಅನಿಶ್ಚಿತ AI ಫಲಿತಾಂಶಗಳನ್ನು ತಜ್ಞರ ಪರಿಶೀಲನೆಗೆ ಕಳುಹಿಸಬಹುದು.",

    sendForExpert:
      "ತಜ್ಞರ ಪರಿಶೀಲನೆಗೆ ಕಳುಹಿಸಿ",

    requestExpert:
      "ತಜ್ಞರ ಪರಿಶೀಲನೆ ವಿನಂತಿಸಿ",

    caseSubmitted:
      "ಕೇಸ್ ಕಳುಹಿಸಲಾಗಿದೆ",

    waitingValidation:
      "ತಜ್ಞರ ಪರಿಶೀಲನೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ",

    uploadFirst:
      "ಮೊದಲು ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",

    hotspotsKicker:
      "ಭೌಗೋಳಿಕ ಮಾಹಿತಿ",

    hotspotTitle:
      "ರೋಗ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",

    hotspotsDescription:
      "ಬೆಳೆ ಆರೋಗ್ಯ ಪ್ರಕರಣಗಳನ್ನು ನೋಡಿ ಮತ್ತು ಹೊಲ ಪರಿಶೀಲನೆಗೆ ಆದ್ಯತೆ ನೀಡಿ.",

    prototypeData:
      "ಪ್ರೋಟೋಟೈಪ್ ಡೇಟಾ",

    reportedClusters:
      "ವರದಿಯಾದ ಗುಂಪುಗಳು",

    highCritical:
      "ಹೆಚ್ಚು / ತೀವ್ರ",

    affectedReports:
      "ಪರಿಣಾಮಿತ ವರದಿಗಳು",

    fieldMap:
      "ಹೊಲ ನಕ್ಷೆ",

    reportedActivity:
      "ವರದಿಯಾದ ರೋಗ ಚಟುವಟಿಕೆ",

    searchField:
      "ಹೊಲ ಹುಡುಕಿ",

    resetView:
      "ನಕ್ಷೆ ಮರುಹೊಂದಿಸಿ",

    mapHint:
      "ಸರಿಸಿ • ಜೂಮ್ ಮಾಡಿ • ಹಾಟ್‌ಸ್ಪಾಟ್ ಒತ್ತಿರಿ",

    recentReports:
      "ಇತ್ತೀಚಿನ ವರದಿಗಳು",

    priorityAreas:
      "ಪ್ರಾಥಮ್ಯ ಪ್ರದೇಶಗಳು",

    reportedCases:
      "ವರದಿಯಾದ ಪ್ರಕರಣಗಳು",

    mapRisk:
      "ಅಪಾಯ",

    mapReports:
      "ವರದಿಗಳು",

    hotspotValidation:
      "ಪ್ರೋಟೋಟೈಪ್ ಹಾಟ್‌ಸ್ಪಾಟ್ ದಾಖಲೆಗಳು ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ.",

    critical:
      "ತೀವ್ರ",

    high:
      "ಹೆಚ್ಚು",

    medium:
      "ಮಧ್ಯಮ",

    low:
      "ಕಡಿಮೆ",

    selectDistrict:
      "ಮಹಾರಾಷ್ಟ್ರ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",

    advisoriesKicker:
      "ರೈತ ಕಾರ್ಯ ಕೇಂದ್ರ",

    advisoriesTitle:
      "ಬೆಳೆ ಸಲಹೆಗಳು",

    advisoriesDescription:
      "AI ರೋಗನಿರ್ಣಯವನ್ನು ಕ್ರಮಗಳು ಮತ್ತು ಮೇಲ್ವಿಚಾರಣಾ ಮಾರ್ಗದರ್ಶನವಾಗಿ ಪರಿವರ್ತಿಸಿ.",

    aiAssisted:
      "AI ಸಹಾಯಕ ಮಾರ್ಗದರ್ಶನ",

    currentCondition:
      "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",

    noDiagnosis:
      "ಇನ್ನೂ ರೋಗನಿರ್ಣಯವಿಲ್ಲ",

    status:
      "ಸ್ಥಿತಿ",

    immediateAction:
      "ತಕ್ಷಣದ ಕ್ರಮ",

    whatToDoNow:
      "ಈಗ ಏನು ಮಾಡಬೇಕು",

    prevention:
      "ತಡೆಗಟ್ಟುವಿಕೆ",

    reduceFutureRisk:
      "ಭವಿಷ್ಯದ ಅಪಾಯ ಕಡಿಮೆ ಮಾಡಿ",

    monitoring:
      "ಮೇಲ್ವಿಚಾರಣೆ",

    keepWatching:
      "ಗಮನಿಸುತ್ತಿರಿ",

    expertTitle:
      "AI ಸಹಾಯಕ ಮಾರ್ಗದರ್ಶನ — ತಜ್ಞರ ಪರಿಶೀಲನೆ ಶಿಫಾರಸು",

    expertText:
      "ಸ್ಥಳೀಯ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ಅಧಿಕೃತ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪರಿಗಣಿಸಿ.",

    fieldRoutine:
      "ಹೊಲದ ದಿನಚರಿ",

    scoutConsistently:
      "ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ",

    scoutText:
      "ನಿಯಮಿತ ಗಮನವು ರೋಗವನ್ನು ಬೇಗ ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",

    recordKeeping:
      "ದಾಖಲೆ ನಿರ್ವಹಣೆ",

    captureLocation:
      "ಸ್ಥಳ ದಾಖಲಿಸಿ",

    recordText:
      "ಹಾಟ್‌ಸ್ಪಾಟ್ ಮ್ಯಾಪಿಂಗ್‌ಗೆ ಕ್ಷೇತ್ರ ವರದಿಗಳನ್ನು ಬಳಸಿ.",

    escalation:
      "ತಜ್ಞರ ಸಹಾಯ",

    askExpert:
      "ತಜ್ಞರನ್ನು ಕೇಳಿ",

    escalationText:
      "ಅನಿಶ್ಚಿತ ಪ್ರಕರಣಗಳನ್ನು ತಜ್ಞರಿಗೆ ಕಳುಹಿಸಿ.",

    backToDiagnosis:
      "ರೋಗನಿರ್ಣಯಕ್ಕೆ ಹಿಂತಿರುಗಿ",

    footer:
      "ಹೆಚ್ಚು ಸ್ಮಾರ್ಟ್ ಮತ್ತು ಸುರಕ್ಷಿತ ಕೃಷಿಗಾಗಿ",
  },

  gu: {
    ...english,

    nav: {
      diagnosis: "નિદાન",
      risk: "જોખમ આગાહી",
      hotspots: "હોટસ્પોટ્સ",
      advisories: "સલાહ",
      language: "ભાષા",
    },

    systemOnline:
      "AI સિસ્ટમ ઓનલાઈન",

    heroTitle:
      "તમારા પાકનું રક્ષણ કરો",

    heroSubtitle:
      "ખૂબ મોડું થાય તે પહેલાં.",

    startDiagnosis:
      "નિદાન શરૂ કરો",

    aiDiagnosis:
      "AI આધારિત નિદાન",

    riskInsights:
      "રિયલ-ટાઇમ જોખમ માહિતી",

    cropHealth:
      "પાક આરોગ્ય",

    diagnosisTitle:
      "AI નિદાન",

    detectedCondition:
      "ઓળખાયેલી સ્થિતિ",

    analyzingLeaf:
      "પાનનું વિશ્લેષણ થઈ રહ્યું છે...",

    ready:
      "વિશ્લેષણ માટે તૈયાર",

    uploadHint:
      "પાકના પાનનો સ્પષ્ટ ફોટો અપલોડ કરો",

    confidence:
      "વિશ્વાસ",

    aiConfidence:
      "AI વિશ્વાસ",

    severity:
      "તીવ્રતા",

    riskLevel:
      "જોખમ સ્તર",

    cropHealthStatus:
      "પાક આરોગ્ય સ્થિતિ",

    recommendedAction:
      "ભલામણ કરેલ પગલું",

    whatShouldIDo:
      "શું કરવું?",

    cropAdvisory:
      "પાક સલાહ",

    listen:
      "સલાહ સાંભળો",

    speaking:
      "સલાહ વાંચી રહ્યા છીએ...",

    highConfidence:
      "ઉચ્ચ વિશ્વાસવાળું AI નિદાન",

    expertValidation:
      "નિષ્ણાત ચકાસણીની ભલામણ",

    analyzingButton:
      "વિશ્લેષણ થઈ રહ્યું છે...",

    analyzeAnother:
      "બીજું પાન તપાસો",

    uploadLeaf:
      "પાનની તસવીર અપલોડ કરો",

    scan:
      "AI વિશ્લેષણ કરી રહ્યું છે...",

    riskTitle:
      "પાક જોખમ આગાહી",

    overallRisk:
      "કુલ જોખમ",

    currentConditions:
      "વર્તમાન પરિસ્થિતિ",

    fieldEnvironment:
      "ખેતરનું વાતાવરણ",

    earlyWarning:
      "પૂર્વ ચેતવણી",

    riskKicker:
      "પૂર્વ ચેતવણી પ્રણાલી",

    riskDescription:
      "આ માટે નમૂના જોખમ અંદાજ:",

    sevenDayOutlook:
      "7-દિવસનો અંદાજ",

    temperature:
      "તાપમાન",

    humidity:
      "ભેજ",

    rainfall:
      "આજનો વરસાદ",

    pestActivity:
      "જીવાત પ્રવૃત્તિ",

    cropStage:
      "પાકનો તબક્કો",

    weatherLive:
      "લાઇવ હવામાન",

    weatherUpdated:
      "હવામાન અપડેટ",

    fetchingWeather:
      "લાઇવ હવામાન મેળવી રહ્યા છીએ...",

    weatherUnavailable:
      "લાઇવ હવામાન ઉપલબ્ધ નથી",

    refreshWeather:
      "હવામાન અપડેટ કરો",

    fieldIntelligence:
      "ફીલ્ડ ઇન્ટેલિજન્સ",

    sensorPanelTitle:
      "જીવાત ટ્રેપ અને સેન્સર",

    sensorPanelText:
      "નિરીક્ષણ હેઠળના ખેતર માટે પ્રોટોટાઇપ સેન્સર ફીડ.",

    pestTrapCount:
      "જીવાત ટ્રેપ સંખ્યા",

    soilMoisture:
      "માટીનો ભેજ",

    sensorStatus:
      "સેન્સર સ્થિતિ",

    refreshSensor:
      "સેન્સર અપડેટ કરો",

    lastUpdate:
      "છેલ્લું અપડેટ",

    expertValidationTitle:
      "નિષ્ણાત ચકાસણી",

    expertReviewTitle:
      "નિષ્ણાત સમીક્ષા",

    expertReviewText:
      "અનિશ્ચિત AI પરિણામો નિષ્ણાત ચકાસણી માટે મોકલી શકાય છે.",

    sendForExpert:
      "નિષ્ણાત સમીક્ષા માટે મોકલો",

    requestExpert:
      "નિષ્ણાત ચકાસણીની વિનંતી કરો",

    caseSubmitted:
      "કેસ મોકલાયો",

    waitingValidation:
      "નિષ્ણાત ચકાસણીની રાહ જોઈ રહ્યા છીએ",

    uploadFirst:
      "પહેલા પાનની તસવીર અપલોડ કરો.",

    hotspotsKicker:
      "ભૌગોલિક માહિતી",

    hotspotTitle:
      "રોગ હોટસ્પોટ્સ",

    hotspotsDescription:
      "નોંધાયેલા પાક આરોગ્ય કેસો જુઓ અને ખેતર તપાસને પ્રાથમિકતા આપો.",

    prototypeData:
      "પ્રોટોટાઇપ ડેટા",

    reportedClusters:
      "નોંધાયેલા ક્લસ્ટરો",

    highCritical:
      "ઉચ્ચ / ગંભીર",

    affectedReports:
      "અસરગ્રસ્ત અહેવાલો",

    fieldMap:
      "ખેતર નકશો",

    reportedActivity:
      "નોંધાયેલી રોગ પ્રવૃત્તિ",

    searchField:
      "ખેતર શોધો",

    resetView:
      "નકશો રીસેટ",

    mapHint:
      "ખસેડો • ઝૂમ કરો • હોટસ્પોટ દબાવો",

    recentReports:
      "તાજેતરના અહેવાલો",

    priorityAreas:
      "પ્રાથમિક વિસ્તારો",

    reportedCases:
      "નોંધાયેલા કેસો",

    mapRisk:
      "જોખમ",

    mapReports:
      "અહેવાલો",

    hotspotValidation:
      "પ્રોટોટાઇપ હોટસ્પોટ રેકોર્ડ પ્રદર્શન માટે છે.",

    critical:
      "ગંભીર",

    high:
      "ઉચ્ચ",

    medium:
      "મધ્યમ",

    low:
      "નીચું",

    selectDistrict:
      "મહારાષ્ટ્ર જિલ્લો પસંદ કરો",

    advisoriesKicker:
      "ખેડૂત કાર્ય કેન્દ્ર",

    advisoriesTitle:
      "પાક સલાહ",

    advisoriesDescription:
      "AI નિદાનને સ્પષ્ટ આગળના પગલાં અને દેખરેખ માર્ગદર્શનમાં ફેરવો.",

    aiAssisted:
      "AI સહાયિત માર્ગદર્શન",

    currentCondition:
      "વર્તમાન સ્થિતિ",

    noDiagnosis:
      "હજુ નિદાન નથી",

    status:
      "સ્થિતિ",

    immediateAction:
      "તાત્કાલિક પગલું",

    whatToDoNow:
      "હવે શું કરવું",

    prevention:
      "નિવારણ",

    reduceFutureRisk:
      "ભવિષ્યનું જોખમ ઘટાડો",

    monitoring:
      "દેખરેખ",

    keepWatching:
      "નજર રાખો",

    expertTitle:
      "AI સહાયિત માર્ગદર્શન — નિષ્ણાત ચકાસણીની ભલામણ",

    expertText:
      "સ્થાનિક પરિસ્થિતિ અને સત્તાવાર કૃષિ માર્ગદર્શન ધ્યાનમાં રાખો.",

    fieldRoutine:
      "ખેતરની દિનચર્યા",

    scoutConsistently:
      "નિયમિત તપાસ કરો",

    scoutText:
      "નિયમિત દેખરેખથી રોગ વહેલો ઓળખી શકાય છે.",

    recordKeeping:
      "રેકોર્ડ રાખવું",

    captureLocation:
      "સ્થાન નોંધો",

    recordText:
      "હોટસ્પોટ નકશા માટે ક્ષેત્ર અહેવાલોનો ઉપયોગ કરો.",

    escalation:
      "નિષ્ણાત સહાય",

    askExpert:
      "નિષ્ણાતને પૂછો",

    escalationText:
      "અનિશ્ચિત કેસોને નિષ્ણાત પાસે મોકલો.",

    backToDiagnosis:
      "નિદાન પર પાછા જાઓ",

    footer:
      "વધુ સ્માર્ટ અને સુરક્ષિત ખેતી માટે",
  },

  ta: {
    ...english,

    nav: {
      diagnosis: "நோயறிதல்",
      risk: "ஆபத்து கணிப்பு",
      hotspots: "ஹாட்ஸ்பாட்கள்",
      advisories: "ஆலோசனைகள்",
      language: "மொழி",
    },

    systemOnline:
      "AI அமைப்பு செயல்பாட்டில்",

    heroTitle:
      "உங்கள் பயிர்களை பாதுகாக்குங்கள்",

    heroSubtitle:
      "தாமதமாகும் முன்.",

    startDiagnosis:
      "நோயறிதலை தொடங்கவும்",

    aiDiagnosis:
      "AI அடிப்படையிலான நோயறிதல்",

    riskInsights:
      "நேரடி ஆபத்து தகவல்",

    cropHealth:
      "பயிர் ஆரோக்கியம்",

    diagnosisTitle:
      "AI நோயறிதல்",

    detectedCondition:
      "கண்டறியப்பட்ட நிலை",

    analyzingLeaf:
      "இலை பகுப்பாய்வு செய்யப்படுகிறது...",

    ready:
      "பகுப்பாய்வுக்கு தயார்",

    uploadHint:
      "பயிர் இலையின் தெளிவான படத்தை பதிவேற்றுங்கள்",

    confidence:
      "நம்பிக்கை",

    aiConfidence:
      "AI நம்பிக்கை",

    severity:
      "தீவிரம்",

    riskLevel:
      "ஆபத்து நிலை",

    cropHealthStatus:
      "பயிர் ஆரோக்கிய நிலை",

    recommendedAction:
      "பரிந்துரைக்கப்பட்ட நடவடிக்கை",

    whatShouldIDo:
      "என்ன செய்ய வேண்டும்?",

    cropAdvisory:
      "பயிர் ஆலோசனை",

    listen:
      "ஆலோசனையை கேளுங்கள்",

    speaking:
      "ஆலோசனை வாசிக்கப்படுகிறது...",

    highConfidence:
      "உயர் நம்பிக்கை AI நோயறிதல்",

    expertValidation:
      "நிபுணர் சரிபார்ப்பு பரிந்துரைக்கப்படுகிறது",

    analyzingButton:
      "பகுப்பாய்வு செய்யப்படுகிறது...",

    analyzeAnother:
      "மற்றொரு இலையை ஆய்வு செய்யுங்கள்",

    uploadLeaf:
      "இலைப் படத்தை பதிவேற்றுங்கள்",

    scan:
      "AI பகுப்பாய்வு செய்கிறது...",

    riskTitle:
      "பயிர் ஆபத்து கணிப்பு",

    overallRisk:
      "மொத்த ஆபத்து",

    currentConditions:
      "தற்போதைய நிலை",

    fieldEnvironment:
      "வயல் சூழல்",

    earlyWarning:
      "முன்னெச்சரிக்கை",

    riskKicker:
      "முன்னெச்சரிக்கை அமைப்பு",

    riskDescription:
      "இதற்கான முன்மாதிரி ஆபத்து மதிப்பீடு:",

    sevenDayOutlook:
      "7-நாள் முன்னறிவிப்பு",

    temperature:
      "வெப்பநிலை",

    humidity:
      "ஈரப்பதம்",

    rainfall:
      "இன்றைய மழைப்பொழிவு",

    pestActivity:
      "பூச்சி செயல்பாடு",

    cropStage:
      "பயிர் நிலை",

    weatherLive:
      "நேரடி வானிலை",

    weatherUpdated:
      "வானிலை புதுப்பிப்பு",

    fetchingWeather:
      "நேரடி வானிலையைப் பெறுகிறது...",

    weatherUnavailable:
      "நேரடி வானிலை கிடைக்கவில்லை",

    refreshWeather:
      "வானிலையைப் புதுப்பிக்கவும்",

    fieldIntelligence:
      "வயல் நுண்ணறிவு",

    sensorPanelTitle:
      "பூச்சி பொறி மற்றும் சென்சார்",

    sensorPanelText:
      "கண்காணிக்கப்படும் வயலுக்கான முன்மாதிரி சென்சார் தரவு.",

    pestTrapCount:
      "பூச்சி பொறி எண்ணிக்கை",

    soilMoisture:
      "மண் ஈரப்பதம்",

    sensorStatus:
      "சென்சார் நிலை",

    refreshSensor:
      "சென்சார் புதுப்பிக்கவும்",

    lastUpdate:
      "கடைசி புதுப்பிப்பு",

    expertValidationTitle:
      "நிபுணர் சரிபார்ப்பு",

    expertReviewTitle:
      "நிபுணர் மதிப்பாய்வு",

    expertReviewText:
      "நிச்சயமற்ற AI முடிவுகளை நிபுணர் சரிபார்ப்புக்காக அனுப்பலாம்.",

    sendForExpert:
      "நிபுணர் மதிப்பாய்வுக்கு அனுப்பவும்",

    requestExpert:
      "நிபுணர் சரிபார்ப்பை கோரவும்",

    caseSubmitted:
      "வழக்கு அனுப்பப்பட்டது",

    waitingValidation:
      "நிபுணர் சரிபார்ப்புக்காக காத்திருக்கிறது",

    uploadFirst:
      "முதலில் இலைப் படத்தைப் பதிவேற்றவும்.",

    hotspotsKicker:
      "புவியியல் தகவல்",

    hotspotTitle:
      "நோய் ஹாட்ஸ்பாட்கள்",

    hotspotsDescription:
      "பதிவான பயிர் ஆரோக்கிய வழக்குகளைப் பார்த்து வயல் ஆய்வுக்கு முன்னுரிமை அளிக்கவும்.",

    prototypeData:
      "முன்மாதிரி தரவு",

    reportedClusters:
      "பதிவான குழுக்கள்",

    highCritical:
      "உயர் / தீவிர",

    affectedReports:
      "பாதிக்கப்பட்ட அறிக்கைகள்",

    fieldMap:
      "வயல் வரைபடம்",

    reportedActivity:
      "பதிவான நோய் செயல்பாடு",

    searchField:
      "வயலைத் தேடு",

    resetView:
      "வரைபடத்தை மீட்டமை",

    mapHint:
      "நகர்த்தவும் • பெரிதாக்கவும் • ஹாட்ஸ்பாட்டைத் தட்டவும்",

    recentReports:
      "சமீபத்திய அறிக்கைகள்",

    priorityAreas:
      "முன்னுரிமைப் பகுதிகள்",

    reportedCases:
      "பதிவான வழக்குகள்",

    mapRisk:
      "ஆபத்து",

    mapReports:
      "அறிக்கைகள்",

    hotspotValidation:
      "முன்மாதிரி ஹாட்ஸ்பாட் பதிவுகள் விளக்கத்திற்காக மட்டுமே.",

    critical:
      "தீவிர",

    high:
      "உயர்",

    medium:
      "மிதமான",

    low:
      "குறைந்த",

    selectDistrict:
      "மகாராஷ்டிரா மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",

    advisoriesKicker:
      "விவசாயி நடவடிக்கை மையம்",

    advisoriesTitle:
      "பயிர் ஆலோசனைகள்",

    advisoriesDescription:
      "AI நோயறிதலை அடுத்த நடவடிக்கைகள் மற்றும் கண்காணிப்பு வழிகாட்டுதலாக மாற்றுங்கள்.",

    aiAssisted:
      "AI உதவியுடன் வழிகாட்டுதல்",

    currentCondition:
      "தற்போதைய நிலை",

    noDiagnosis:
      "இன்னும் நோயறிதல் இல்லை",

    status:
      "நிலை",

    immediateAction:
      "உடனடி நடவடிக்கை",

    whatToDoNow:
      "இப்போது என்ன செய்ய வேண்டும்",

    prevention:
      "தடுப்பு",

    reduceFutureRisk:
      "எதிர்கால ஆபத்தை குறைக்கவும்",

    monitoring:
      "கண்காணிப்பு",

    keepWatching:
      "கவனித்துக்கொண்டிருங்கள்",

    expertTitle:
      "AI உதவியுடன் வழிகாட்டுதல் — நிபுணர் சரிபார்ப்பு பரிந்துரைக்கப்படுகிறது",

    expertText:
      "உள்ளூர் நிலைமைகள் மற்றும் அதிகாரப்பூர்வ வேளாண் வழிகாட்டுதலை கருத்தில் கொள்ளுங்கள்.",

    fieldRoutine:
      "வயல் நடைமுறை",

    scoutConsistently:
      "தொடர்ந்து ஆய்வு செய்யுங்கள்",

    scoutText:
      "தொடர்ச்சியான கண்காணிப்பு ஆரம்பகால கண்டறிதலை மேம்படுத்துகிறது.",

    recordKeeping:
      "பதிவு பராமரிப்பு",

    captureLocation:
      "இடத்தை பதிவு செய்யுங்கள்",

    recordText:
      "ஹாட்ஸ்பாட் வரைபடத்திற்கு வயல் அறிக்கைகளைப் பயன்படுத்தவும்.",

    escalation:
      "நிபுணர் உதவி",

    askExpert:
      "நிபுணரை கேளுங்கள்",

    escalationText:
      "நிச்சயமற்ற வழக்குகளை நிபுணரிடம் அனுப்பவும்.",

    backToDiagnosis:
      "நோயறிதலுக்குத் திரும்பு",

    footer:
      "மேலும் புத்திசாலி மற்றும் பாதுகாப்பான விவசாயத்திற்காக",
  },

  bn: {
    ...english,

    nav: {
      diagnosis: "রোগ নির্ণয়",
      risk: "ঝুঁকি পূর্বাভাস",
      hotspots: "হটস্পট",
      advisories: "পরামর্শ",
      language: "ভাষা",
    },

    systemOnline:
      "AI সিস্টেম অনলাইন",

    heroTitle:
      "আপনার ফসল রক্ষা করুন",

    heroSubtitle:
      "অনেক দেরি হওয়ার আগে।",

    startDiagnosis:
      "রোগ নির্ণয় শুরু করুন",

    cropHealth:
      "ফসলের স্বাস্থ্য",

    diagnosisTitle:
      "AI রোগ নির্ণয়",

    detectedCondition:
      "শনাক্ত অবস্থা",

    analyzingLeaf:
      "পাতা বিশ্লেষণ করা হচ্ছে...",

    ready:
      "বিশ্লেষণের জন্য প্রস্তুত",

    uploadHint:
      "ফসলের পাতার স্পষ্ট ছবি আপলোড করুন",

    confidence:
      "বিশ্বাস",

    aiConfidence:
      "AI বিশ্বাসযোগ্যতা",

    listen:
      "পরামর্শ শুনুন",

    speaking:
      "পরামর্শ পড়া হচ্ছে...",

    uploadLeaf:
      "পাতার ছবি আপলোড করুন",

    analyzeAnother:
      "আরেকটি পাতা পরীক্ষা করুন",

    riskTitle:
      "ফসলের ঝুঁকি পূর্বাভাস",

    overallRisk:
      "মোট ঝুঁকি",

    currentConditions:
      "বর্তমান পরিস্থিতি",

    fieldEnvironment:
      "ক্ষেতের পরিবেশ",

    earlyWarning:
      "প্রাথমিক সতর্কতা",

    temperature:
      "তাপমাত্রা",

    humidity:
      "আর্দ্রতা",

    rainfall:
      "আজকের বৃষ্টিপাত",

    pestActivity:
      "পোকামাকড়ের কার্যকলাপ",

    cropStage:
      "ফসলের পর্যায়",

    weatherLive:
      "লাইভ আবহাওয়া",

    fetchingWeather:
      "লাইভ আবহাওয়া সংগ্রহ করা হচ্ছে...",

    weatherUnavailable:
      "লাইভ আবহাওয়া পাওয়া যাচ্ছে না",

    refreshWeather:
      "আবহাওয়া আপডেট করুন",

    fieldIntelligence:
      "ক্ষেত্র বুদ্ধিমত্তা",

    sensorPanelTitle:
      "পোকা ফাঁদ এবং সেন্সর",

    sensorPanelText:
      "পর্যবেক্ষণ করা ক্ষেত্রের জন্য প্রোটোটাইপ সেন্সর ফিড।",

    pestTrapCount:
      "পোকা ফাঁদের সংখ্যা",

    soilMoisture:
      "মাটির আর্দ্রতা",

    sensorStatus:
      "সেন্সর অবস্থা",

    refreshSensor:
      "সেন্সর আপডেট করুন",

    lastUpdate:
      "শেষ আপডেট",

    expertValidationTitle:
      "বিশেষজ্ঞ যাচাই",

    expertReviewTitle:
      "বিশেষজ্ঞ পর্যালোচনা",

    expertReviewText:
      "অনিশ্চিত AI ফলাফল বিশেষজ্ঞ যাচাইয়ের জন্য পাঠানো যেতে পারে।",

    sendForExpert:
      "বিশেষজ্ঞ পর্যালোচনার জন্য পাঠান",

    requestExpert:
      "বিশেষজ্ঞ যাচাইয়ের অনুরোধ করুন",

    caseSubmitted:
      "কেস পাঠানো হয়েছে",

    waitingValidation:
      "বিশেষজ্ঞ যাচাইয়ের অপেক্ষায়",

    uploadFirst:
      "প্রথমে পাতার ছবি আপলোড করুন।",

    hotspotsKicker:
      "ভৌগোলিক তথ্য",

    hotspotTitle:
      "রোগের হটস্পট",

    hotspotsDescription:
      "রিপোর্ট করা ফসলের স্বাস্থ্য কেস দেখুন এবং ক্ষেত্র পরিদর্শনকে অগ্রাধিকার দিন।",

    prototypeData:
      "প্রোটোটাইপ ডেটা",

    reportedClusters:
      "রিপোর্ট করা ক্লাস্টার",

    highCritical:
      "উচ্চ / গুরুতর",

    affectedReports:
      "প্রভাবিত রিপোর্ট",

    fieldMap:
      "ক্ষেত্রের মানচিত্র",

    reportedActivity:
      "রিপোর্ট করা রোগ কার্যকলাপ",

    searchField:
      "ক্ষেত্র অনুসন্ধান",

    resetView:
      "মানচিত্র রিসেট",

    mapHint:
      "সরান • জুম করুন • হটস্পটে ট্যাপ করুন",

    recentReports:
      "সাম্প্রতিক রিপোর্ট",

    priorityAreas:
      "অগ্রাধিকার এলাকা",

    reportedCases:
      "রিপোর্ট করা কেস",

    mapRisk:
      "ঝুঁকি",

    mapReports:
      "রিপোর্ট",

    critical:
      "গুরুতর",

    high:
      "উচ্চ",

    medium:
      "মাঝারি",

    low:
      "কম",

    selectDistrict:
      "মহারাষ্ট্র জেলা নির্বাচন করুন",

    advisoriesKicker:
      "কৃষক কর্ম কেন্দ্র",

    advisoriesTitle:
      "ফসল পরামর্শ",

    advisoriesDescription:
      "AI রোগ নির্ণয়কে পরবর্তী পদক্ষেপ এবং পর্যবেক্ষণ নির্দেশিকায় রূপান্তর করুন।",

    aiAssisted:
      "AI-সহায়িত নির্দেশনা",

    currentCondition:
      "বর্তমান অবস্থা",

    noDiagnosis:
      "এখনও রোগ নির্ণয় নেই",

    status:
      "অবস্থা",

    immediateAction:
      "তাৎক্ষণিক পদক্ষেপ",

    whatToDoNow:
      "এখন কী করবেন",

    prevention:
      "প্রতিরোধ",

    reduceFutureRisk:
      "ভবিষ্যতের ঝুঁকি কমান",

    monitoring:
      "পর্যবেক্ষণ",

    keepWatching:
      "নজর রাখুন",

    expertTitle:
      "AI-সহায়িত নির্দেশনা — বিশেষজ্ঞ যাচাইয়ের পরামর্শ",

    expertText:
      "স্থানীয় পরিস্থিতি এবং সরকারি কৃষি নির্দেশিকা বিবেচনা করুন।",

    fieldRoutine:
      "ক্ষেতের রুটিন",

    scoutConsistently:
      "নিয়মিত পরিদর্শন করুন",

    scoutText:
      "নিয়মিত পর্যবেক্ষণ প্রাথমিকভাবে রোগ শনাক্ত করতে সাহায্য করে।",

    recordKeeping:
      "রেকর্ড রাখা",

    captureLocation:
      "অবস্থান নথিভুক্ত করুন",

    recordText:
      "হটস্পট ম্যাপিংয়ের জন্য ক্ষেতের রিপোর্ট ব্যবহার করুন।",

    escalation:
      "বিশেষজ্ঞ সহায়তা",

    askExpert:
      "বিশেষজ্ঞকে জিজ্ঞাসা করুন",

    escalationText:
      "অনিশ্চিত কেস বিশেষজ্ঞের কাছে পাঠান।",

    backToDiagnosis:
      "নির্ণয়ে ফিরে যান",

    footer:
      "আরও স্মার্ট ও নিরাপদ কৃষির জন্য",
  },

  ml: {
    ...english,

    nav: {
      diagnosis: "രോഗനിർണയം",
      risk: "അപകട പ്രവചനം",
      hotspots: "ഹോട്ട്‌സ്‌പോട്ടുകൾ",
      advisories: "ഉപദേശങ്ങൾ",
      language: "ഭാഷ",
    },

    systemOnline:
      "AI സിസ്റ്റം ഓൺലൈനിലാണ്",

    heroTitle:
      "നിങ്ങളുടെ വിളകൾ സംരക്ഷിക്കുക",

    heroSubtitle:
      "വളരെ വൈകുന്നതിന് മുമ്പ്.",

    startDiagnosis:
      "രോഗനിർണയം ആരംഭിക്കുക",

    cropHealth:
      "വിളയുടെ ആരോഗ്യം",

    diagnosisTitle:
      "AI രോഗനിർണയം",

    detectedCondition:
      "കണ്ടെത്തിയ സ്ഥിതി",

    analyzingLeaf:
      "ഇല വിശകലനം ചെയ്യുന്നു...",

    ready:
      "വിശകലനത്തിന് തയ്യാറാണ്",

    uploadHint:
      "വിളയുടെ ഇലയുടെ വ്യക്തമായ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",

    confidence:
      "വിശ്വാസം",

    aiConfidence:
      "AI വിശ്വാസ്യത",

    listen:
      "ഉപദേശം കേൾക്കുക",

    speaking:
      "ഉപദേശം വായിക്കുന്നു...",

    uploadLeaf:
      "ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",

    analyzeAnother:
      "മറ്റൊരു ഇല പരിശോധിക്കുക",

    riskTitle:
      "വിള അപകട പ്രവചനം",

    overallRisk:
      "ആകെ അപകടം",

    currentConditions:
      "നിലവിലെ സാഹചര്യങ്ങൾ",

    fieldEnvironment:
      "വയൽ പരിസ്ഥിതി",

    earlyWarning:
      "മുൻകൂർ മുന്നറിയിപ്പ്",

    temperature:
      "താപനില",

    humidity:
      "ആർദ്രത",

    rainfall:
      "ഇന്നത്തെ മഴ",

    pestActivity:
      "കീട പ്രവർത്തനം",

    cropStage:
      "വിള ഘട്ടം",

    weatherLive:
      "തത്സമയ കാലാവസ്ഥ",

    fetchingWeather:
      "തത്സമയ കാലാവസ്ഥ ലഭ്യമാക്കുന്നു...",

    weatherUnavailable:
      "തത്സമയ കാലാവസ്ഥ ലഭ്യമല്ല",

    refreshWeather:
      "കാലാവസ്ഥ പുതുക്കുക",

    fieldIntelligence:
      "വയൽ ബുദ്ധിശക്തി",

    sensorPanelTitle:
      "കീട കെണിയും സെൻസറും",

    sensorPanelText:
      "നിരീക്ഷിക്കുന്ന വയലിനുള്ള മാതൃകാ സെൻസർ ഫീഡ്.",

    pestTrapCount:
      "കീട കെണി എണ്ണം",

    soilMoisture:
      "മണ്ണിലെ ഈർപ്പം",

    sensorStatus:
      "സെൻസർ നില",

    refreshSensor:
      "സെൻസർ പുതുക്കുക",

    lastUpdate:
      "അവസാന അപ്ഡേറ്റ്",

    expertValidationTitle:
      "വിദഗ്ധ പരിശോധന",

    expertReviewTitle:
      "വിദഗ്ധ അവലോകനം",

    expertReviewText:
      "അനിശ്ചിത AI ഫലങ്ങൾ വിദഗ്ധ പരിശോധനയ്ക്ക് അയയ്ക്കാം.",

    sendForExpert:
      "വിദഗ്ധ അവലോകനത്തിന് അയയ്ക്കുക",

    requestExpert:
      "വിദഗ്ധ പരിശോധന അഭ്യർത്ഥിക്കുക",

    caseSubmitted:
      "കേസ് അയച്ചു",

    waitingValidation:
      "വിദഗ്ധ പരിശോധനയ്ക്കായി കാത്തിരിക്കുന്നു",

    uploadFirst:
      "ആദ്യം ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",

    hotspotsKicker:
      "ഭൗമ വിവരങ്ങൾ",

    hotspotTitle:
      "രോഗ ഹോട്ട്‌സ്‌പോട്ടുകൾ",

    hotspotsDescription:
      "റിപ്പോർട്ട് ചെയ്ത വിള ആരോഗ്യ കേസുകൾ കാണുകയും വയൽ പരിശോധനയ്ക്ക് മുൻഗണന നൽകുകയും ചെയ്യുക.",

    prototypeData:
      "പ്രോട്ടോടൈപ്പ് ഡാറ്റ",

    reportedClusters:
      "റിപ്പോർട്ട് ചെയ്ത ക്ലസ്റ്ററുകൾ",

    highCritical:
      "ഉയർന്ന / ഗുരുതര",

    affectedReports:
      "ബാധിച്ച റിപ്പോർട്ടുകൾ",

    fieldMap:
      "വയൽ മാപ്പ്",

    reportedActivity:
      "റിപ്പോർട്ട് ചെയ്ത രോഗ പ്രവർത്തനം",

    searchField:
      "വയൽ തിരയുക",

    resetView:
      "മാപ്പ് റീസെറ്റ്",

    mapHint:
      "നീക്കുക • സൂം ചെയ്യുക • ഹോട്ട്‌സ്‌പോട്ട് അമർത്തുക",

    recentReports:
      "സമീപകാല റിപ്പോർട്ടുകൾ",

    priorityAreas:
      "മുൻഗണനാ മേഖലകൾ",

    reportedCases:
      "റിപ്പോർട്ട് ചെയ്ത കേസുകൾ",

    mapRisk:
      "അപകടം",

    mapReports:
      "റിപ്പോർട്ടുകൾ",

    critical:
      "ഗുരുതരം",

    high:
      "ഉയർന്ന",

    medium:
      "മിതമായ",

    low:
      "കുറഞ്ഞ",

    selectDistrict:
      "മഹാരാഷ്ട്ര ജില്ല തിരഞ്ഞെടുക്കുക",

    advisoriesKicker:
      "കർഷക പ്രവർത്തന കേന്ദ്രം",

    advisoriesTitle:
      "വിള ഉപദേശങ്ങൾ",

    advisoriesDescription:
      "AI രോഗനിർണയത്തെ അടുത്ത നടപടികളും നിരീക്ഷണ മാർഗ്ഗനിർദ്ദേശവുമാക്കി മാറ്റുക.",

    aiAssisted:
      "AI സഹായമുള്ള മാർഗ്ഗനിർദ്ദേശം",

    currentCondition:
      "നിലവിലെ സ്ഥിതി",

    noDiagnosis:
      "ഇനിയും രോഗനിർണയം ഇല്ല",

    status:
      "സ്ഥിതി",

    immediateAction:
      "തൽക്ഷണ നടപടി",

    whatToDoNow:
      "ഇപ്പോൾ എന്ത് ചെയ്യണം",

    prevention:
      "പ്രതിരോധം",

    reduceFutureRisk:
      "ഭാവിയിലെ അപകടസാധ്യത കുറയ്ക്കുക",

    monitoring:
      "നിരീക്ഷണം",

    keepWatching:
      "ശ്രദ്ധിക്കുക",

    expertTitle:
      "AI സഹായമുള്ള മാർഗ്ഗനിർദ്ദേശം — വിദഗ്ധ പരിശോധന ശുപാർശ ചെയ്യുന്നു",

    expertText:
      "പ്രാദേശിക സാഹചര്യങ്ങളും ഔദ്യോഗിക കാർഷിക മാർഗ്ഗനിർദ്ദേശങ്ങളും പരിഗണിക്കുക.",

    fieldRoutine:
      "വയൽ ദിനചര്യ",

    scoutConsistently:
      "സ്ഥിരമായി പരിശോധിക്കുക",

    scoutText:
      "സ്ഥിരമായ നിരീക്ഷണം രോഗം നേരത്തെ കണ്ടെത്താൻ സഹായിക്കുന്നു.",

    recordKeeping:
      "രേഖ സൂക്ഷിക്കൽ",

    captureLocation:
      "സ്ഥാനം രേഖപ്പെടുത്തുക",

    recordText:
      "ഹോട്ട്‌സ്‌പോട്ട് മാപ്പിംഗിനായി ഫീൽഡ് റിപ്പോർട്ടുകൾ ഉപയോഗിക്കുക.",

    escalation:
      "വിദഗ്ധ സഹായം",

    askExpert:
      "വിദഗ്ധരോട് ചോദിക്കുക",

    escalationText:
      "അനിശ്ചിത കേസുകൾ വിദഗ്ധരിലേക്ക് അയയ്ക്കുക.",

    backToDiagnosis:
      "രോഗനിർണയത്തിലേക്ക് മടങ്ങുക",

    footer:
      "കൂടുതൽ സ്മാർട്ടും സുരക്ഷിതവുമായ കൃഷിക്കായി",
  },

  pa: {
    ...english,

    nav: {
      diagnosis: "ਨਿਦਾਨ",
      risk: "ਖਤਰੇ ਦੀ ਪੇਸ਼ਗੋਈ",
      hotspots: "ਹਾਟਸਪਾਟ",
      advisories: "ਸਲਾਹ",
      language: "ਭਾਸ਼ਾ",
    },

    systemOnline:
      "AI ਸਿਸਟਮ ਆਨਲਾਈਨ",

    heroTitle:
      "ਆਪਣੀਆਂ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ",

    heroSubtitle:
      "ਦੇਰ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ।",

    startDiagnosis:
      "ਨਿਦਾਨ ਸ਼ੁਰੂ ਕਰੋ",

    cropHealth:
      "ਫਸਲ ਦੀ ਸਿਹਤ",

    diagnosisTitle:
      "AI ਨਿਦਾਨ",

    detectedCondition:
      "ਪਛਾਣੀ ਗਈ ਸਥਿਤੀ",

    analyzingLeaf:
      "ਪੱਤੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",

    ready:
      "ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਤਿਆਰ",

    uploadHint:
      "ਫਸਲ ਦੇ ਪੱਤੇ ਦੀ ਸਾਫ਼ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",

    confidence:
      "ਭਰੋਸਾ",

    aiConfidence:
      "AI ਭਰੋਸਾ",

    listen:
      "ਸਲਾਹ ਸੁਣੋ",

    speaking:
      "ਸਲਾਹ ਪੜ੍ਹੀ ਜਾ ਰਹੀ ਹੈ...",

    uploadLeaf:
      "ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",

    analyzeAnother:
      "ਹੋਰ ਪੱਤਾ ਜਾਂਚੋ",

    riskTitle:
      "ਫਸਲ ਖਤਰੇ ਦੀ ਪੇਸ਼ਗੋਈ",

    overallRisk:
      "ਕੁੱਲ ਖਤਰਾ",

    currentConditions:
      "ਮੌਜੂਦਾ ਹਾਲਾਤ",

    fieldEnvironment:
      "ਖੇਤ ਦਾ ਵਾਤਾਵਰਣ",

    earlyWarning:
      "ਪਹਿਲਾਂ ਤੋਂ ਚੇਤਾਵਨੀ",

    temperature:
      "ਤਾਪਮਾਨ",

    humidity:
      "ਨਮੀ",

    rainfall:
      "ਅੱਜ ਦੀ ਬਾਰਿਸ਼",

    pestActivity:
      "ਕੀੜੇ ਦੀ ਗਤੀਵਿਧੀ",

    cropStage:
      "ਫਸਲ ਦਾ ਪੜਾਅ",

    weatherLive:
      "ਲਾਈਵ ਮੌਸਮ",

    fetchingWeather:
      "ਲਾਈਵ ਮੌਸਮ ਪ੍ਰਾਪਤ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",

    weatherUnavailable:
      "ਲਾਈਵ ਮੌਸਮ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",

    refreshWeather:
      "ਮੌਸਮ ਅਪਡੇਟ ਕਰੋ",

    fieldIntelligence:
      "ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ",

    sensorPanelTitle:
      "ਕੀੜੇ ਟਰੈਪ ਅਤੇ ਸੈਂਸਰ",

    sensorPanelText:
      "ਨਿਗਰਾਨੀ ਕੀਤੇ ਖੇਤ ਲਈ ਪ੍ਰੋਟੋਟਾਈਪ ਸੈਂਸਰ ਫੀਡ।",

    pestTrapCount:
      "ਕੀੜੇ ਟਰੈਪ ਗਿਣਤੀ",

    soilMoisture:
      "ਮਿੱਟੀ ਦੀ ਨਮੀ",

    sensorStatus:
      "ਸੈਂਸਰ ਸਥਿਤੀ",

    refreshSensor:
      "ਸੈਂਸਰ ਅਪਡੇਟ ਕਰੋ",

    lastUpdate:
      "ਆਖਰੀ ਅਪਡੇਟ",

    expertValidationTitle:
      "ਮਾਹਰ ਜਾਂਚ",

    expertReviewTitle:
      "ਮਾਹਰ ਸਮੀਖਿਆ",

    expertReviewText:
      "ਅਨਿਸ਼ਚਿਤ AI ਨਤੀਜਿਆਂ ਨੂੰ ਮਾਹਰ ਜਾਂਚ ਲਈ ਭੇਜਿਆ ਜਾ ਸਕਦਾ ਹੈ।",

    sendForExpert:
      "ਮਾਹਰ ਸਮੀਖਿਆ ਲਈ ਭੇਜੋ",

    requestExpert:
      "ਮਾਹਰ ਜਾਂਚ ਦੀ ਬੇਨਤੀ ਕਰੋ",

    caseSubmitted:
      "ਕੇਸ ਭੇਜਿਆ ਗਿਆ",

    waitingValidation:
      "ਮਾਹਰ ਜਾਂਚ ਦੀ ਉਡੀਕ",

    uploadFirst:
      "ਪਹਿਲਾਂ ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ।",

    hotspotsKicker:
      "ਭੂਗੋਲਿਕ ਜਾਣਕਾਰੀ",

    hotspotTitle:
      "ਰੋਗ ਹਾਟਸਪਾਟ",

    hotspotsDescription:
      "ਰਿਪੋਰਟ ਕੀਤੇ ਫਸਲ ਸਿਹਤ ਮਾਮਲੇ ਵੇਖੋ ਅਤੇ ਖੇਤ ਜਾਂਚ ਨੂੰ ਤਰਜੀਹ ਦਿਓ।",

    prototypeData:
      "ਪ੍ਰੋਟੋਟਾਈਪ ਡਾਟਾ",

    reportedClusters:
      "ਰਿਪੋਰਟ ਕੀਤੇ ਕਲੱਸਟਰ",

    highCritical:
      "ਉੱਚ / ਗੰਭੀਰ",

    affectedReports:
      "ਪ੍ਰਭਾਵਿਤ ਰਿਪੋਰਟਾਂ",

    fieldMap:
      "ਖੇਤ ਦਾ ਨਕਸ਼ਾ",

    reportedActivity:
      "ਰਿਪੋਰਟ ਕੀਤੀ ਰੋਗ ਗਤੀਵਿਧੀ",

    searchField:
      "ਖੇਤ ਖੋਜੋ",

    resetView:
      "ਨਕਸ਼ਾ ਰੀਸੈਟ",

    mapHint:
      "ਹਿਲਾਓ • ਜ਼ੂਮ ਕਰੋ • ਹਾਟਸਪਾਟ ਦਬਾਓ",

    recentReports:
      "ਹਾਲੀਆ ਰਿਪੋਰਟਾਂ",

    priorityAreas:
      "ਤਰਜੀਹੀ ਖੇਤਰ",

    reportedCases:
      "ਰਿਪੋਰਟ ਕੀਤੇ ਕੇਸ",

    mapRisk:
      "ਖਤਰਾ",

    mapReports:
      "ਰਿਪੋਰਟਾਂ",

    critical:
      "ਗੰਭੀਰ",

    high:
      "ਉੱਚ",

    medium:
      "ਦਰਮਿਆਨਾ",

    low:
      "ਘੱਟ",

    selectDistrict:
      "ਮਹਾਰਾਸ਼ਟਰ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",

    advisoriesKicker:
      "ਕਿਸਾਨ ਕਾਰਵਾਈ ਕੇਂਦਰ",

    advisoriesTitle:
      "ਫਸਲ ਸਲਾਹ",

    advisoriesDescription:
      "AI ਨਿਦਾਨ ਨੂੰ ਸਪਸ਼ਟ ਅਗਲੇ ਕਦਮਾਂ ਅਤੇ ਨਿਗਰਾਨੀ ਮਾਰਗਦਰਸ਼ਨ ਵਿੱਚ ਬਦਲੋ।",

    aiAssisted:
      "AI-ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਮਾਰਗਦਰਸ਼ਨ",

    currentCondition:
      "ਮੌਜੂਦਾ ਸਥਿਤੀ",

    noDiagnosis:
      "ਅਜੇ ਨਿਦਾਨ ਨਹੀਂ",

    status:
      "ਸਥਿਤੀ",

    immediateAction:
      "ਤੁਰੰਤ ਕਾਰਵਾਈ",

    whatToDoNow:
      "ਹੁਣ ਕੀ ਕਰਨਾ ਹੈ",

    prevention:
      "ਰੋਕਥਾਮ",

    reduceFutureRisk:
      "ਭਵਿੱਖ ਦਾ ਖਤਰਾ ਘਟਾਓ",

    monitoring:
      "ਨਿਗਰਾਨੀ",

    keepWatching:
      "ਨਜ਼ਰ ਰੱਖੋ",

    expertTitle:
      "AI-ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਮਾਰਗਦਰਸ਼ਨ — ਮਾਹਰ ਜਾਂਚ ਦੀ ਸਿਫਾਰਸ਼",

    expertText:
      "ਸਥਾਨਕ ਹਾਲਾਤ ਅਤੇ ਅਧਿਕਾਰਤ ਖੇਤੀਬਾੜੀ ਮਾਰਗਦਰਸ਼ਨ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ।",

    fieldRoutine:
      "ਖੇਤ ਰੁਟੀਨ",

    scoutConsistently:
      "ਨਿਯਮਿਤ ਜਾਂਚ ਕਰੋ",

    scoutText:
      "ਨਿਯਮਿਤ ਨਿਗਰਾਨੀ ਨਾਲ ਰੋਗ ਜਲਦੀ ਪਛਾਣਿਆ ਜਾ ਸਕਦਾ ਹੈ।",

    recordKeeping:
      "ਰਿਕਾਰਡ ਰੱਖਣਾ",

    captureLocation:
      "ਸਥਾਨ ਦਰਜ ਕਰੋ",

    recordText:
      "ਹਾਟਸਪਾਟ ਮੈਪਿੰਗ ਲਈ ਖੇਤ ਰਿਪੋਰਟਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ.",

    escalation:
      "ਮਾਹਰ ਸਹਾਇਤਾ",

    askExpert:
      "ਮਾਹਰ ਨੂੰ ਪੁੱਛੋ",

    escalationText:
      "ਅਨਿਸ਼ਚਿਤ ਮਾਮਲੇ ਮਾਹਰ ਨੂੰ ਭੇਜੋ।",

    backToDiagnosis:
      "ਨਿਦਾਨ 'ਤੇ ਵਾਪਸ ਜਾਓ",

    footer:
      "ਹੋਰ ਸਮਾਰਟ ਅਤੇ ਸੁਰੱਖਿਅਤ ਖੇਤੀ ਲਈ",
  },
};

/* =========================================================
   DISEASE HELPERS
========================================================= */

const normalizeDisease = (name) =>
  String(name || "")
    .replace("Tomato___", "")
    .replaceAll("_", " ")
    .toLowerCase();

const formatDisease = (name) =>
  String(name || "")
    .replace("Tomato___", "")
    .replaceAll("_", " ");

const translateDiseaseName = (
  name,
  language
) => {
  const clean = normalizeDisease(name);

  const diseaseTranslations = {
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

  if (clean.includes("early blight")) {
    return (
      diseaseTranslations.early[language] ||
      diseaseTranslations.early.en
    );
  }

  if (clean.includes("late blight")) {
    return (
      diseaseTranslations.late[language] ||
      diseaseTranslations.late.en
    );
  }

  if (clean.includes("leaf mold")) {
    return (
      diseaseTranslations.mold[language] ||
      diseaseTranslations.mold.en
    );
  }

  if (clean.includes("healthy")) {
    return (
      diseaseTranslations.healthy[language] ||
      diseaseTranslations.healthy.en
    );
  }

  return formatDisease(name);
};

const localizeLevel = (
  value,
  language
) => {
  const maps = {
    mr: {
      Moderate: "मध्यम",
      Medium: "मध्यम",
      High: "उच्च",
      Low: "कमी",
      Critical: "गंभीर",
      Review: "पडताळणी",
    },

    hi: {
      Moderate: "मध्यम",
      Medium: "मध्यम",
      High: "उच्च",
      Low: "कम",
      Critical: "गंभीर",
      Review: "समीक्षा",
    },

    te: {
      Moderate: "మధ్యస్థ",
      Medium: "మధ్యస్థ",
      High: "అధిక",
      Low: "తక్కువ",
      Critical: "తీవ్రమైన",
      Review: "సమీక్ష",
    },

    kn: {
      Moderate: "ಮಧ್ಯಮ",
      Medium: "ಮಧ್ಯಮ",
      High: "ಹೆಚ್ಚು",
      Low: "ಕಡಿಮೆ",
      Critical: "ತೀವ್ರ",
      Review: "ಪರಿಶೀಲನೆ",
    },

    gu: {
      Moderate: "મધ્યમ",
      Medium: "મધ્યમ",
      High: "ઉચ્ચ",
      Low: "ઓછું",
      Critical: "ગંભીર",
      Review: "સમીક્ષા",
    },

    ta: {
      Moderate: "மிதமான",
      Medium: "மிதமான",
      High: "உயர்",
      Low: "குறைவு",
      Critical: "தீவிரம்",
      Review: "மதிப்பாய்வு",
    },

    bn: {
      Moderate: "মাঝারি",
      Medium: "মাঝারি",
      High: "উচ্চ",
      Low: "কম",
      Critical: "গুরুতর",
      Review: "পর্যালোচনা",
    },

    ml: {
      Moderate: "മിതമായ",
      Medium: "മിതമായ",
      High: "ഉയർന്ന",
      Low: "കുറഞ്ഞ",
      Critical: "ഗുരുതരം",
      Review: "പരിശോധന",
    },

    pa: {
      Moderate: "ਦਰਮਿਆਨਾ",
      Medium: "ਦਰਮਿਆਨਾ",
      High: "ਉੱਚ",
      Low: "ਘੱਟ",
      Critical: "ਗੰਭੀਰ",
      Review: "ਸਮੀਖਿਆ",
    },
  };

  return (
    maps[language]?.[value] ||
    value
  );
};

/* =========================================================
   MAP RESET BUTTON
========================================================= */

function MapResetView({
  center,
  zoom,
  label,
}) {
  const map = useMap();

  const reset = () => {
    map.setView(
      center,
      zoom,
      {
        animate: true,
      }
    );
  };

  return (
    <button
      className="map-reset-btn"
      onClick={reset}
      type="button"
    >
      <Navigation size={15} />
      {label}
    </button>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const fileInputRef =
    useRef(null);

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

  const [language, setLanguage] =
    useState("mr");

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
      status: "ONLINE",
      lastUpdate: "2 min ago",
    });

  const [
    expertSubmitted,
    setExpertSubmitted,
  ] = useState(false);

  /* =======================================================
     API URL
  ======================================================= */

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://cropshield-ai-frbi.onrender.com";

  /* =======================================================
     DISTRICTS
  ======================================================= */

  const maharashtraDistricts = {
    Pune: {
      center: [18.5204, 73.8567],
      zoom: 11,
    },

    Nashik: {
      center: [19.9975, 73.7898],
      zoom: 11,
    },

    Nagpur: {
      center: [21.1458, 79.0882],
      zoom: 11,
    },

    Kolhapur: {
      center: [16.705, 74.2433],
      zoom: 11,
    },

    Sangli: {
      center: [16.8524, 74.5815],
      zoom: 11,
    },

    Satara: {
      center: [17.6805, 74.0183],
      zoom: 11,
    },

    Solapur: {
      center: [17.6599, 75.9064],
      zoom: 11,
    },

    Ahmednagar: {
      center: [19.0948, 74.748],
      zoom: 11,
    },

    Jalgaon: {
      center: [21.0077, 75.5626],
      zoom: 11,
    },

    Amravati: {
      center: [20.9374, 77.7796],
      zoom: 11,
    },
  };

  /* =======================================================
     TRANSLATION
  ======================================================= */

  const t = {
    ...english,
    ...(translations[language] ||
      {}),
    nav: {
      ...english.nav,
      ...(
        translations[
          language
        ]?.nav || {}
      ),
    },
    errors: {
      ...english.errors,
      ...(
        translations[
          language
        ]?.errors || {}
      ),
    },
  };

  /* =======================================================
     DOCUMENT LANGUAGE
  ======================================================= */

  useEffect(() => {
    document.documentElement.lang =
      language;
  }, [language]);

  /* =======================================================
     LOAD NATIVE VOICES
  ======================================================= */

  useEffect(() => {
    if (
      typeof window ===
        "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const loadVoices = () => {
      const voices =
        window.speechSynthesis.getVoices();

      setAvailableVoices(
        voices
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
     FILE PICKER
  ======================================================= */

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  /* =======================================================
     AI IMAGE ANALYSIS
  ======================================================= */

  const analyzeImage =
    async (file) => {
      setLoading(true);
      setError("");
      setSpeechError("");
      setExpertSubmitted(false);

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
              method: "POST",
              body: formData,
            }
          );

        if (!response.ok) {
          let message =
            t.errors.prediction;

          try {
            const data =
              await response.json();

            message =
              data.detail ||
              message;
          } catch {
            // Keep default.
          }

          throw new Error(
            message
          );
        }

        const data =
          await response.json();

        setResult(data);
      } catch (err) {
        console.error(
          "Prediction error:",
          err
        );

        setError(
          err.message ||
            t.errors.server
        );
      } finally {
        setLoading(false);
      }
    };

  const handleImageSelect =
    async (event) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (
        ![
          "image/jpeg",
          "image/png",
          "image/jpg",
        ].includes(file.type)
      ) {
        setError(
          "Please upload a JPG or PNG image."
        );

        return;
      }

      setError("");
      setResult(null);
      setSpeechError("");
      setExpertSubmitted(false);

      const imageUrl =
        URL.createObjectURL(
          file
        );

      setPreview(imageUrl);

      await analyzeImage(
        file
      );

      event.target.value = "";
    };

  /* =======================================================
     WEATHER
  ======================================================= */

  const fetchWeather =
    async () => {
      const district =
        maharashtraDistricts[
          selectedDistrict
        ];

      if (!district) {
        return;
      }

      const [
        latitude,
        longitude,
      ] = district.center;

      setWeatherLoading(true);
      setWeatherError("");

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${latitude}` +
          `&longitude=${longitude}` +
          `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code` +
          `&daily=precipitation_sum` +
          `&forecast_days=7` +
          `&timezone=auto`;

        const response =
          await fetch(url);

        if (!response.ok) {
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
            data.daily
              ?.precipitation_sum?.[0] ??
            0,

          weatherCode:
            data.current
              ?.weather_code,

          updatedAt:
            data.current?.time,
        });
      } catch (err) {
        console.error(
          "Weather error:",
          err
        );

        setWeatherError(
          t.weatherUnavailable
        );
      } finally {
        setWeatherLoading(false);
      }
    };

  useEffect(() => {
    fetchWeather();
  }, [selectedDistrict]);

  /* =======================================================
     SENSOR
  ======================================================= */

  const refreshSensorData =
    () => {
      setSensorData({
        pestCount:
          Math.floor(
            Math.random() *
              15 +
              10
          ),

        soilMoisture:
          Math.floor(
            Math.random() *
              20 +
              55
          ),

        status:
          "ONLINE",

        lastUpdate:
          "Just now",
      });
    };

  /* =======================================================
     EXPERT REVIEW
  ======================================================= */

  const submitExpertReview =
    () => {
      if (!result) {
        setActivePage(
          "diagnosis"
        );

        return;
      }

      setExpertSubmitted(
        true
      );
    };

  /* =======================================================
     ADVISORY DATA
  ======================================================= */

  const getDiseaseInfo =
    (disease) => {
      const name =
        normalizeDisease(
          disease
        );

      if (
        name.includes(
          "early blight"
        )
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
        name.includes(
          "late blight"
        )
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
        name.includes(
          "leaf mold"
        )
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
        name.includes(
          "healthy"
        )
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

  const advisoryInfo =
    result
      ? getDiseaseInfo(
          result.class
        )
      : {
          severity:
            "Unknown",

          severityLevel: 0,

          risk:
            "Review",

          action:
            "Upload a leaf image first.",

          advice:
            "Upload a clear crop-leaf image for analysis.",
        };

  /* =======================================================
     SPEECH CONTENT
  ======================================================= */

  const getSpeechContent =
    () => {
      if (!result) {
        return "";
      }

      const disease =
        translateDiseaseName(
          result.class,
          language
        );

      const className =
        String(
          result.class || ""
        ).toLowerCase();

      const isEarly =
        className.includes(
          "early_blight"
        );

      const isLate =
        className.includes(
          "late_blight"
        );

      const isMold =
        className.includes(
          "leaf_mold"
        );

      const isHealthy =
        className.includes(
          "healthy"
        );

      const speech = {
        en: {
          intro:
            "CropShield diagnosis.",

          condition:
            `Detected condition: ${disease}.`,

          confidence:
            `Confidence: ${result.confidence} percent.`,

          risk:
            `Risk level: ${advisoryInfo.risk}.`,

          action:
            isEarly
              ? "Remove visibly affected leaves and monitor nearby plants closely."
              : isLate
              ? "Isolate affected plants and inspect surrounding plants immediately."
              : isMold
              ? "Remove severely affected leaves and improve ventilation."
              : isHealthy
              ? "Continue regular crop monitoring."
              : "Send this case for expert validation.",

          advice:
            isEarly
              ? "Improve airflow and avoid prolonged leaf wetness."
              : isLate
              ? "Monitor the crop frequently and follow local agricultural guidance."
              : isMold
              ? "Reduce prolonged humidity around foliage."
              : isHealthy
              ? "Continue good irrigation, nutrition and field hygiene."
              : "Capture a clearer image and consult an agriculture expert.",
        },

        mr: {
          intro:
            "क्रॉपशील्ड निदान.",

          condition:
            `ओळखलेली स्थिती: ${disease}.`,

          confidence:
            `विश्वास पातळी ${result.confidence} टक्के आहे.`,

          risk:
            `जोखीम पातळी ${localizeLevel(
              advisoryInfo.risk,
              "mr"
            )} आहे.`,

          action:
            isEarly
              ? "प्रभावित पाने काढा आणि जवळच्या झाडांचे निरीक्षण करा."
              : isLate
              ? "प्रभावित झाडे वेगळी करा आणि आजूबाजूच्या झाडांची त्वरित तपासणी करा."
              : isMold
              ? "जास्त प्रभावित पाने काढा आणि पिकामध्ये हवा खेळती ठेवा."
              : isHealthy
              ? "पिकाचे नियमित निरीक्षण सुरू ठेवा."
              : "हे प्रकरण तज्ज्ञ पडताळणीसाठी पाठवा.",

          advice:
            isEarly
              ? "झाडांभोवती हवा खेळती ठेवा आणि पानांवर जास्त काळ ओलावा राहू देऊ नका."
              : isLate
              ? "पिकाची वारंवार तपासणी करा आणि स्थानिक कृषी मार्गदर्शनाचे पालन करा."
              : isMold
              ? "पानांभोवती जास्त आर्द्रता कमी करा."
              : isHealthy
              ? "योग्य पाणी, पोषण आणि शेत स्वच्छता सुरू ठेवा."
              : "स्पष्ट फोटो घ्या आणि कृषी तज्ज्ञांचा सल्ला घ्या.",
        },

        hi: {
          intro:
            "क्रॉपशील्ड निदान.",

          condition:
            `पहचानी गई स्थिति: ${disease}.`,

          confidence:
            `विश्वास स्तर ${result.confidence} प्रतिशत है.`,

          risk:
            `जोखिम स्तर ${localizeLevel(
              advisoryInfo.risk,
              "hi"
            )} है.`,

          action:
            isEarly
              ? "प्रभावित पत्तियों को हटाएं और आसपास के पौधों की निगरानी करें."
              : isLate
              ? "प्रभावित पौधों को अलग करें और आसपास के पौधों की तुरंत जांच करें."
              : isMold
              ? "बहुत प्रभावित पत्तियों को हटाएं और हवा का प्रवाह बेहतर करें."
              : isHealthy
              ? "फसल की नियमित निगरानी जारी रखें."
              : "इस मामले को विशेषज्ञ सत्यापन के लिए भेजें.",

          advice:
            isEarly
              ? "पौधों के आसपास हवा का प्रवाह बेहतर रखें और पत्तियों पर लंबे समय तक नमी न रहने दें."
              : isLate
              ? "फसल की बार-बार निगरानी करें और स्थानीय कृषि मार्गदर्शन का पालन करें."
              : isMold
              ? "पत्तियों के आसपास अत्यधिक नमी कम करें."
              : isHealthy
              ? "उचित सिंचाई, पोषण और खेत की स्वच्छता जारी रखें."
              : "एक साफ तस्वीर लें और कृषि विशेषज्ञ से सलाह लें.",
        },

        te: {
          intro:
            "క్రాప్‌షీల్డ్ నిర్ధారణ.",

          condition:
            `గుర్తించిన పరిస్థితి: ${disease}.`,

          confidence:
            `నమ్మక స్థాయి ${result.confidence} శాతం.`,

          risk:
            `ప్రమాద స్థాయి ${localizeLevel(
              advisoryInfo.risk,
              "te"
            )}.`,

          action:
            isEarly
              ? "ప్రభావిత ఆకులను తొలగించి సమీపంలోని మొక్కలను పరిశీలించండి."
              : isLate
              ? "ప్రభావిత మొక్కలను వేరు చేసి చుట్టుపక్కల మొక్కలను వెంటనే పరిశీలించండి."
              : isMold
              ? "తీవ్రంగా ప్రభావితమైన ఆకులను తొలగించి గాలి ప్రసరణ మెరుగుపరచండి."
              : isHealthy
              ? "పంటను క్రమం తప్పకుండా పర్యవేక్షించండి."
              : "ఈ కేసును నిపుణుల ధృవీకరణ కోసం పంపండి.",

          advice:
            isEarly
              ? "మొక్కల చుట్టూ గాలి ప్రసరణ మెరుగుపరచండి మరియు ఆకులపై ఎక్కువసేపు తేమ ఉండకుండా చూడండి."
              : isLate
              ? "పంటను తరచుగా పరిశీలించి స్థానిక వ్యవసాయ మార్గదర్శకాలను అనుసరించండి."
              : isMold
              ? "ఆకుల చుట్టూ అధిక తేమను తగ్గించండి."
              : isHealthy
              ? "సరైన నీరు, పోషణ మరియు పొల శుభ్రత కొనసాగించండి."
              : "స్పష్టమైన చిత్రాన్ని తీసి వ్యవసాయ నిపుణుడిని సంప్రదించండి.",
        },

        kn: {
          intro:
            "ಕ್ರಾಪ್‌ಶೀಲ್ಡ್ ರೋಗನಿರ್ಣಯ.",

          condition:
            `ಗುರುತಿಸಿದ ಸ್ಥಿತಿ: ${disease}.`,

          confidence:
            `ವಿಶ್ವಾಸ ಮಟ್ಟ ${result.confidence} ಶೇಕಡಾ.`,

          risk:
            `ಅಪಾಯದ ಮಟ್ಟ ${localizeLevel(
              advisoryInfo.risk,
              "kn"
            )}.`,

          action:
            isEarly
              ? "ಪೀಡಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಹತ್ತಿರದ ಸಸ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."
              : isLate
              ? "ಪೀಡಿತ ಸಸ್ಯಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಸಸ್ಯಗಳನ್ನು ತಕ್ಷಣ ಪರಿಶೀಲಿಸಿ."
              : isMold
              ? "ತೀವ್ರವಾಗಿ ಪೀಡಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಗಾಳಿಯ ಹರಿವನ್ನು ಸುಧಾರಿಸಿ."
              : isHealthy
              ? "ಬೆಳೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ."
              : "ಈ ಪ್ರಕರಣವನ್ನು ತಜ್ಞರ ಪರಿಶೀಲನೆಗೆ ಕಳುಹಿಸಿ.",

          advice:
            isEarly
              ? "ಸಸ್ಯಗಳ ಸುತ್ತ ಗಾಳಿಯ ಹರಿವನ್ನು ಸುಧಾರಿಸಿ ಮತ್ತು ಎಲೆಗಳ ಮೇಲೆ ಹೆಚ್ಚು ಸಮಯ ತೇವಾಂಶ ಇರದಂತೆ ನೋಡಿಕೊಳ್ಳಿ."
              : isLate
              ? "ಬೆಳೆಯನ್ನು ಆಗಾಗ್ಗೆ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸ್ಥಳೀಯ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನವನ್ನು ಅನುಸರಿಸಿ."
              : isMold
              ? "ಎಲೆಗಳ ಸುತ್ತಲಿನ ಹೆಚ್ಚಿನ ತೇವಾಂಶವನ್ನು ಕಡಿಮೆ ಮಾಡಿ."
              : isHealthy
              ? "ಸರಿಯಾದ ನೀರಾವರಿ, ಪೋಷಣೆ ಮತ್ತು ಹೊಲದ ಸ್ವಚ್ಛತೆಯನ್ನು ಮುಂದುವರಿಸಿ."
              : "ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ತೆಗೆದು ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        },

        gu: {
          intro:
            "ક્રોપશીલ્ડ નિદાન.",

          condition:
            `ઓળખાયેલી સ્થિતિ: ${disease}.`,

          confidence:
            `વિશ્વાસ સ્તર ${result.confidence} ટકા છે.`,

          risk:
            `જોખમ સ્તર ${localizeLevel(
              advisoryInfo.risk,
              "gu"
            )} છે.`,

          action:
            isEarly
              ? "અસરગ્રસ્ત પાંદડા દૂર કરો અને નજીકના છોડની તપાસ કરો."
              : isLate
              ? "અસરગ્રસ્ત છોડને અલગ કરો અને આસપાસના છોડની તરત તપાસ કરો."
              : isMold
              ? "ખૂબ અસરગ્રસ્ત પાંદડા દૂર કરો અને હવાની અવરજવર સુધારો."
              : isHealthy
              ? "પાકની નિયમિત દેખરેખ રાખો."
              : "આ કેસને નિષ્ણાત ચકાસણી માટે મોકલો.",

          advice:
            isEarly
              ? "છોડની આસપાસ હવાની અવરજવર સુધારો અને પાંદડા લાંબા સમય સુધી ભીના ન રહે તે સુનિશ્ચિત કરો."
              : isLate
              ? "પાકની વારંવાર તપાસ કરો અને સ્થાનિક કૃષિ માર્ગદર્શનનું પાલન કરો."
              : isMold
              ? "પાંદડાની આસપાસનો વધુ ભેજ ઘટાડો."
              : isHealthy
              ? "યોગ્ય સિંચાઈ, પોષણ અને ખેતરની સ્વચ્છતા ચાલુ રાખો."
              : "સ્પષ્ટ તસવીર લો અને કૃષિ નિષ્ણાતની સલાહ લો.",
        },

        ta: {
          intro:
            "கிராப்ஷீல்ட் நோயறிதல்.",

          condition:
            `கண்டறியப்பட்ட நிலை: ${disease}.`,

          confidence:
            `நம்பிக்கை நிலை ${result.confidence} சதவீதம்.`,

          risk:
            `ஆபத்து நிலை ${localizeLevel(
              advisoryInfo.risk,
              "ta"
            )}.`,

          action:
            isEarly
              ? "பாதிக்கப்பட்ட இலைகளை அகற்றி அருகிலுள்ள செடிகளை கண்காணிக்கவும்."
              : isLate
              ? "பாதிக்கப்பட்ட செடிகளை தனிமைப்படுத்தி சுற்றியுள்ள செடிகளை உடனடியாக ஆய்வு செய்யவும்."
              : isMold
              ? "கடுமையாக பாதிக்கப்பட்ட இலைகளை அகற்றி காற்றோட்டத்தை மேம்படுத்தவும்."
              : isHealthy
              ? "பயிரை தொடர்ந்து கண்காணிக்கவும்."
              : "இந்த வழக்கை நிபுணர் சரிபார்ப்புக்கு அனுப்பவும்.",

          advice:
            isEarly
              ? "செடிகளுக்கு நல்ல காற்றோட்டத்தை வழங்கி இலைகளில் நீண்ட நேரம் ஈரப்பதம் இருக்காமல் பார்த்துக்கொள்ளவும்."
              : isLate
              ? "பயிரை அடிக்கடி கண்காணித்து உள்ளூர் வேளாண் வழிகாட்டுதலைப் பின்பற்றவும்."
              : isMold
              ? "இலைகளைச் சுற்றியுள்ள அதிக ஈரப்பதத்தை குறைக்கவும்."
              : isHealthy
              ? "சரியான நீர்ப்பாசனம், ஊட்டச்சத்து மற்றும் வயல் சுகாதாரத்தை தொடரவும்."
              : "தெளிவான படத்தை எடுத்து வேளாண் நிபுணரை அணுகவும்.",
        },

        bn: {
          intro:
            "ক্রপশিল্ড রোগ নির্ণয়.",

          condition:
            `শনাক্ত অবস্থা: ${disease}.`,

          confidence:
            `বিশ্বাসের মাত্রা ${result.confidence} শতাংশ.`,

          risk:
            `ঝুঁকির স্তর ${localizeLevel(
              advisoryInfo.risk,
              "bn"
            )}.`,

          action:
            isEarly
              ? "আক্রান্ত পাতা সরিয়ে কাছের গাছগুলো পর্যবেক্ষণ করুন."
              : isLate
              ? "আক্রান্ত গাছ আলাদা করুন এবং আশেপাশের গাছ পরীক্ষা করুন."
              : isMold
              ? "অতিরিক্ত আক্রান্ত পাতা সরিয়ে বাতাস চলাচল বাড়ান."
              : isHealthy
              ? "ফসল নিয়মিত পর্যবেক্ষণ করুন."
              : "এই কেসটি বিশেষজ্ঞ যাচাইয়ের জন্য পাঠান.",

          advice:
            isEarly
              ? "গাছের চারপাশে বাতাস চলাচল বাড়ান এবং পাতায় দীর্ঘ সময় আর্দ্রতা থাকতে দেবেন না."
              : isLate
              ? "ফসল ঘন ঘন পর্যবেক্ষণ করুন এবং স্থানীয় কৃষি নির্দেশিকা অনুসরণ করুন."
              : isMold
              ? "পাতার চারপাশের অতিরিক্ত আর্দ্রতা কমান."
              : isHealthy
              ? "সঠিক সেচ, পুষ্টি এবং ক্ষেতের পরিচ্ছন্নতা বজায় রাখুন."
              : "একটি পরিষ্কার ছবি নিন এবং কৃষি বিশেষজ্ঞের পরামর্শ নিন.",
        },

        ml: {
          intro:
            "ക്രോപ്പ്‌ഷീൽഡ് രോഗനിർണയം.",

          condition:
            `കണ്ടെത്തിയ സ്ഥിതി: ${disease}.`,

          confidence:
            `വിശ്വാസ നില ${result.confidence} ശതമാനം.`,

          risk:
            `അപകടനില ${localizeLevel(
              advisoryInfo.risk,
              "ml"
            )}.`,

          action:
            isEarly
              ? "ബാധിച്ച ഇലകൾ നീക്കം ചെയ്ത് സമീപത്തെ ചെടികൾ പരിശോധിക്കുക."
              : isLate
              ? "ബാധിച്ച ചെടികൾ വേർതിരിച്ച് ചുറ്റുമുള്ള ചെടികൾ പരിശോധിക്കുക."
              : isMold
              ? "ഗുരുതരമായി ബാധിച്ച ഇലകൾ നീക്കം ചെയ്ത് വായുസഞ്ചാരം മെച്ചപ്പെടുത്തുക."
              : isHealthy
              ? "വിള സ്ഥിരമായി നിരീക്ഷിക്കുക."
              : "ഈ കേസ് വിദഗ്ധ പരിശോധനയ്ക്കായി അയയ്ക്കുക.",

          advice:
            isEarly
              ? "ചെടികൾക്കിടയിൽ നല്ല വായുസഞ്ചാരം ഉറപ്പാക്കുകയും ഇലകളിൽ ദീർഘനേരം ഈർപ്പം നിലനിൽക്കാതിരിക്കുകയും ചെയ്യുക."
              : isLate
              ? "വിള പതിവായി പരിശോധിക്കുകയും പ്രാദേശിക കാർഷിക മാർഗ്ഗനിർദ്ദേശങ്ങൾ പാലിക്കുകയും ചെയ്യുക."
              : isMold
              ? "ഇലകളുടെ ചുറ്റുമുള്ള അധിക ഈർപ്പം കുറയ്ക്കുക."
              : isHealthy
              ? "ശരിയായ ജലസേചനം, പോഷണം, വയൽ ശുചിത്വം എന്നിവ തുടരുക."
              : "വ്യക്തമായ ചിത്രം എടുത്ത് കാർഷിക വിദഗ്ധനെ സമീപിക്കുക.",
        },

        pa: {
          intro:
            "ਕ੍ਰਾਪਸ਼ੀਲਡ ਨਿਦਾਨ।",

          condition:
            `ਪਛਾਣੀ ਗਈ ਸਥਿਤੀ: ${disease}.`,

          confidence:
            `ਭਰੋਸੇ ਦਾ ਪੱਧਰ ${result.confidence} ਪ੍ਰਤੀਸ਼ਤ ਹੈ.`,

          risk:
            `ਖਤਰੇ ਦਾ ਪੱਧਰ ${localizeLevel(
              advisoryInfo.risk,
              "pa"
            )} ਹੈ.`,

          action:
            isEarly
              ? "ਪ੍ਰਭਾਵਿਤ ਪੱਤੇ ਹਟਾਓ ਅਤੇ ਨੇੜਲੇ ਪੌਦਿਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ."
              : isLate
              ? "ਪ੍ਰਭਾਵਿਤ ਪੌਦਿਆਂ ਨੂੰ ਵੱਖ ਕਰੋ ਅਤੇ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਪੌਦਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ."
              : isMold
              ? "ਜ਼ਿਆਦਾ ਪ੍ਰਭਾਵਿਤ ਪੱਤੇ ਹਟਾਓ ਅਤੇ ਹਵਾ ਦਾ ਪ੍ਰਵਾਹ ਸੁਧਾਰੋ."
              : isHealthy
              ? "ਫਸਲ ਦੀ ਨਿਯਮਿਤ ਨਿਗਰਾਨੀ ਕਰੋ."
              : "ਇਸ ਕੇਸ ਨੂੰ ਮਾਹਰ ਜਾਂਚ ਲਈ ਭੇਜੋ.",

          advice:
            isEarly
              ? "ਪੌਦਿਆਂ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਹਵਾ ਦਾ ਪ੍ਰਵਾਹ ਸੁਧਾਰੋ ਅਤੇ ਪੱਤਿਆਂ ਨੂੰ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਗਿੱਲਾ ਨਾ ਰਹਿਣ ਦਿਓ."
              : isLate
              ? "ਫਸਲ ਦੀ ਵਾਰ-ਵਾਰ ਨਿਗਰਾਨੀ ਕਰੋ ਅਤੇ ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਮਾਰਗਦਰਸ਼ਨ ਦੀ ਪਾਲਣਾ ਕਰੋ."
              : isMold
              ? "ਪੱਤਿਆਂ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਵੱਧ ਨਮੀ ਘਟਾਓ."
              : isHealthy
              ? "ਸਹੀ ਸਿੰਚਾਈ, ਪੋਸ਼ਣ ਅਤੇ ਖੇਤ ਦੀ ਸਫਾਈ ਜਾਰੀ ਰੱਖੋ."
              : "ਸਾਫ਼ ਤਸਵੀਰ ਲਓ ਅਤੇ ਖੇਤੀਬਾੜੀ ਮਾਹਰ ਦੀ ਸਲਾਹ ਲਓ.",
        },
      };

      const selected =
        speech[language] ||
        speech.en;

      return [
        selected.intro,
        selected.condition,
        selected.confidence,
        selected.risk,
        selected.action,
        selected.advice,
      ].join(" ");
    };

  /* =======================================================
     SPEECH
  ======================================================= */

  const speakAdvice = () => {
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

    setSpeaking(false);
    setSpeechError("");

    const selectedLanguage =
      languages.find(
        (item) =>
          item.code === language
      );

    const desiredLang =
      selectedLanguage?.voice ||
      "en-IN";

    const text =
      getSpeechContent();

    if (!text.trim()) {
      setSpeechError(
        "No advisory text is available."
      );

      return;
    }

    const findVoice = () => {
      const voices =
        synth.getVoices();

      if (!voices.length) {
        return null;
      }

      const wanted =
        desiredLang.toLowerCase();

      const base =
        wanted
          .split("-")[0]
          .toLowerCase();

      return (
        voices.find(
          (voice) =>
            voice.lang?.toLowerCase() ===
            wanted
        ) ||

        voices.find(
          (voice) =>
            voice.lang
              ?.toLowerCase()
              .startsWith(base)
        ) ||

        voices.find(
          (voice) =>
            voice.name
              ?.toLowerCase()
              .includes(base)
        ) ||

        availableVoices.find(
          (voice) =>
            voice.lang
              ?.toLowerCase()
              .startsWith(base)
        ) ||

        null
      );
    };

    const startSpeaking =
      () => {
        const voice =
          findVoice();

        const chunks =
          text.match(
            /[^.!?।]+[.!?।]*/g
          ) || [text];

        let index = 0;

        const speakNext =
          () => {
            if (
              index >=
              chunks.length
            ) {
              setSpeaking(false);
              return;
            }

            const chunk =
              chunks[index]
                .trim();

            index += 1;

            if (!chunk) {
              speakNext();
              return;
            }

            const utterance =
              new SpeechSynthesisUtterance(
                chunk
              );

            utterance.lang =
              desiredLang;

            if (voice) {
              utterance.voice =
                voice;
            }

            utterance.rate =
              0.85;

            utterance.pitch =
              1;

            utterance.volume =
              1;

            utterance.onstart =
              () => {
                setSpeaking(
                  true
                );
                setSpeechError(
                  ""
                );
              };

            utterance.onend =
              () => {
                setTimeout(
                  speakNext,
                  100
                );
              };

            utterance.onerror =
              (event) => {
                console.error(
                  "Speech error:",
                  event
                );

                setSpeaking(
                  false
                );

                if (
                  event.error ===
                  "language-unavailable"
                ) {
                  setSpeechError(
                    `${desiredLang} voice is not available on this device.`
                  );
                } else {
                  setSpeechError(
                    "Unable to play the advisory voice."
                  );
                }
              };

            synth.speak(
              utterance
            );
          };

        synth.resume();

        setTimeout(
          speakNext,
          100
        );
      };

    const currentVoices =
      synth.getVoices();

    if (
      currentVoices.length >
      0
    ) {
      startSpeaking();
      return;
    }

    const handleVoicesChanged =
      () => {
        synth.removeEventListener(
          "voiceschanged",
          handleVoicesChanged
        );

        startSpeaking();
      };

    synth.addEventListener(
      "voiceschanged",
      handleVoicesChanged
    );

    setTimeout(() => {
      synth.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      if (!synth.speaking) {
        startSpeaking();
      }
    }, 1500);
  };

  /* =======================================================
     RISK DATA
  ======================================================= */

  const forecastDisease =
    result
      ? translateDiseaseName(
          result.class,
          language
        )
      : "Disease";

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
      forecastDisease,

    temperature:
      weather?.temperature != null
        ? `${weather.temperature}°C`
        : "—",

    humidity:
      weather?.humidity != null
        ? `${weather.humidity}%`
        : "—",

    rainfall:
      weather?.precipitation != null
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
     MAP
  ======================================================= */

  const hotspotCenter =
    maharashtraDistricts[
      selectedDistrict
    ].center;

  const hotspotZoom =
    maharashtraDistricts[
      selectedDistrict
    ].zoom;

  const hotspotCases = [
    {
      id: 1,

      name:
        `${selectedDistrict} Field Cluster A`,

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

      name:
        `${selectedDistrict} Field Cluster B`,

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

      name:
        `${selectedDistrict} Field Cluster C`,

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

      name:
        `${selectedDistrict} Field Cluster D`,

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

      name:
        `${selectedDistrict} Field Cluster E`,

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
      ) {
        return "critical";
      }

      if (
        level ===
        "High"
      ) {
        return "high";
      }

      if (
        level ===
        "Medium"
      ) {
        return "medium";
      }

      return "low";
    };

  const getHotspotLabel =
    (level) => {
      if (
        level ===
        "Critical"
      ) {
        return t.critical;
      }

      if (
        level ===
        "High"
      ) {
        return t.high;
      }

      if (
        level ===
        "Medium"
      ) {
        return t.medium;
      }

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

              {t.systemOnline}

            </div>


            <h1>

              {t.heroTitle}

              <br />

              <span>
                {t.heroSubtitle}
              </span>

            </h1>


            <p>
              Upload a leaf image and let
              CropShield's AI detect crop
              diseases instantly, assess risk,
              and guide you toward the right
              action.
            </p>


            <button
              className="primary-btn"
              onClick={
                openFilePicker
              }
            >

              {t.startDiagnosis}

              <ChevronRight
                size={20}
              />

            </button>


            <div className="trust-row">

              <div>

                <ShieldCheck
                  size={19}
                />

                {t.aiDiagnosis}

              </div>


              <div>

                <Activity
                  size={19}
                />

                {t.riskInsights}

              </div>

            </div>

          </div>


          <div className="diagnosis-card">

            <div className="card-top">

              <div>

                <span className="small-label">

                  {t.cropHealth}

                </span>


                <h3>

                  {t.diagnosisTitle}

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
              accept="image/jpeg,image/png,image/jpg"
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
                    size={
                      110
                    }
                    strokeWidth={
                      1.2
                    }
                  />

                  <div className="scan-line"></div>

                </>

              )}


              {loading && (

                <div className="scanning-overlay">

                  <LoaderCircle
                    size={
                      42
                    }
                    className="spin"
                  />

                  <span>

                    {t.scan}

                  </span>

                </div>

              )}

            </div>


            <div className="diagnosis-result">

              <div>

                <span className="result-label">

                  {t.detectedCondition}

                </span>


                {loading ? (

                  <h3>

                    {t.analyzingLeaf}

                  </h3>

                ) : result ? (

                  <>

                    <h3>

                      {translateDiseaseName(
                        result.class,
                        language
                      )}

                    </h3>

                    <p>

                      {result.status}

                    </p>

                  </>

                ) : (

                  <>

                    <h3>

                      {t.ready}

                    </h3>

                    <p>

                      {t.uploadHint}

                    </p>

                  </>

                )}

              </div>


              <div className="confidence">

                {result ? (

                  <>

                    <span>

                      {result.confidence}%

                    </span>

                    <small>

                      {t.confidence}

                    </small>

                  </>

                ) : (

                  <>

                    <span>
                      —
                    </span>

                    <small>

                      {t.confidence}

                    </small>

                  </>

                )}

              </div>

            </div>


            {result && (

              <div className="confidence-panel">

                <div className="confidence-header">

                  <span>

                    {t.aiConfidence}

                  </span>

                  <strong>

                    {result.confidence}%

                  </strong>

                </div>


                <div className="confidence-track">

                  <div
                    className="confidence-fill"
                    style={{
                      width:
                        `${result.confidence}%`,
                    }}
                  ></div>

                </div>

              </div>

            )}


            {result && (

              <div className="risk-grid">

                <div className="risk-box">

                  <div className="risk-box-icon">

                    <ThermometerSun
                      size={18}
                    />

                  </div>


                  <div>

                    <span>

                      {t.severity}

                    </span>


                    <strong>

                      {localizeLevel(
                        advisoryInfo.severity,
                        language
                      )}

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

                      {t.riskLevel}

                    </span>


                    <strong>

                      {localizeLevel(
                        advisoryInfo.risk,
                        language
                      )}

                    </strong>

                  </div>

                </div>

              </div>

            )}


            {result && (

              <div className="severity-section">

                <div className="severity-header">

                  <span>

                    {t.cropHealthStatus}

                  </span>


                  <span>

                    {localizeLevel(
                      advisoryInfo.severity,
                      language
                    )}

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
                          advisoryInfo.severityLevel
                            ? "filled"
                            : ""
                        }`}
                      ></div>

                    )
                  )}

                </div>

              </div>

            )}


            {result && (

              <div className="recommendation-card">

                <div className="recommendation-icon">

                  <Sprout
                    size={20}
                  />

                </div>


                <div>

                  <span className="recommendation-label">

                    {t.recommendedAction}

                  </span>


                  <h4>

                    {t.whatShouldIDo}

                  </h4>


                  <p>

                    {
                      advisoryInfo.action
                    }

                  </p>

                </div>

              </div>

            )}


            {result && (

              <div className="advisory-box">

                <div>

                  <ShieldCheck
                    size={18}
                  />

                  <span>

                    {t.cropAdvisory}

                  </span>

                </div>


                <p>

                  {
                    advisoryInfo.advice
                  }

                </p>

              </div>

            )}


            {result && (

              <button
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

                    {t.speaking}

                  </>

                ) : (

                  <>

                    <Volume2
                      size={18}
                    />

                    {t.listen}

                  </>

                )}

              </button>

            )}


            {speechError && (

              <div
                className="error-message"
                style={{
                  marginTop:
                    "10px",
                }}
              >

                <AlertTriangle
                  size={17}
                />

                {speechError}

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

                  {result.confidence >=
                  80
                    ? t.highConfidence
                    : t.expertValidation}

                </span>

              </div>

            )}


            {error && (

              <div className="error-message">

                <AlertTriangle
                  size={17}
                />

                {error}

              </div>

            )}


            <button
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

                  {preview
                    ? t.analyzeAnother
                    : t.uploadLeaf}

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
                using our trained computer
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
                Combine weather, crop stage,
                and pest activity to identify
                emerging risks.
              </p>


              <button
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

          {t.backToDiagnosis}

        </button>


        <div className="risk-hero">

          <div>

            <span className="dashboard-kicker">

              {t.riskKicker}

            </span>


            <h1>

              {t.riskTitle}

            </h1>


            <p>

              {t.riskDescription}{" "}

              {riskData.disease}

            </p>

          </div>


          <div className="risk-score-card">

            <span>

              {t.overallRisk}

            </span>


            <strong>

              {riskData.overall}%

            </strong>


            <div className="risk-score-level">

              {localizeLevel(
                riskData.level,
                language
              )}

            </div>

          </div>

        </div>


        {/* LIVE WEATHER */}

        <div
          style={{
            marginBottom:
              "20px",

            padding:
              "15px 18px",

            borderRadius:
              "14px",

            background:
              "rgba(255,255,255,0.78)",

            border:
              "1px solid rgba(18,55,42,0.08)",

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
                  "11px",

                fontWeight:
                  700,

                letterSpacing:
                  "0.08em",

                opacity:
                  0.65,
              }}
            >

              {t.weatherLive}

            </span>


            <strong
              style={{
                display:
                  "block",

                marginTop:
                  "4px",
              }}
            >

              {selectedDistrict},
              Maharashtra

            </strong>


            <div
              style={{
                marginTop:
                  "4px",

                fontSize:
                  "12px",

                opacity:
                  0.68,
              }}
            >

              {weatherLoading
                ? t.fetchingWeather
                : weather?.updatedAt
                ? `${t.weatherUpdated}: ${weather.updatedAt}`
                : weatherError ||
                  t.weatherUnavailable}

            </div>

          </div>


          <button
            type="button"
            onClick={
              fetchWeather
            }
            disabled={
              weatherLoading
            }
            className="feature-button"
            style={{
              padding:
                "10px 14px",

              borderRadius:
                "10px",

              cursor:
                weatherLoading
                  ? "not-allowed"
                  : "pointer",
            }}
          >

            {weatherLoading
              ? t.fetchingWeather
              : t.refreshWeather}

          </button>

        </div>


        <div
          style={{
            marginBottom:
              "16px",

            fontSize:
              "12px",

            opacity:
              0.65,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              "8px",
          }}
        >

          <Bug
            size={14}
          />

          {t.fieldIntelligence}

        </div>


        <div className="risk-main-grid">

          <div className="forecast-card large">

            <div className="forecast-header">

              <div>

                <span className="small-label">

                  {t.sevenDayOutlook}

                </span>


                <h3>

                  {riskData.disease}

                </h3>

              </div>


              <div className="high-risk-pill">

                {localizeLevel(
                  riskData.level,
                  language
                )}

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
                  (
                    item
                  ) => (

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
                      ></div>


                      <small>

                        {getDayLabel(
                          item.day
                        )}

                      </small>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>


          <div className="forecast-card">

            <span className="small-label">

              {t.currentConditions}

            </span>


            <h3>

              {t.fieldEnvironment}

            </h3>


            <div className="condition-list">

              <div className="condition-row">

                <div className="condition-icon">

                  <ThermometerSun
                    size={18}
                  />

                </div>


                <div>

                  <span>
                    {t.temperature}
                  </span>

                  <strong>

                    {riskData.temperature}

                  </strong>

                </div>

              </div>


              <div className="condition-row">

                <div className="condition-icon">

                  <Droplets
                    size={18}
                  />

                </div>


                <div>

                  <span>
                    {t.humidity}
                  </span>

                  <strong>

                    {riskData.humidity}

                  </strong>

                </div>

              </div>


              <div className="condition-row">

                <div className="condition-icon">

                  <CloudSun
                    size={18}
                  />

                </div>


                <div>

                  <span>
                    {t.rainfall}
                  </span>

                  <strong>

                    {riskData.rainfall}

                  </strong>

                </div>

              </div>


              <div className="condition-row">

                <div className="condition-icon">

                  <Bug
                    size={18}
                  />

                </div>


                <div>

                  <span>
                    {t.pestActivity}
                  </span>

                  <strong>

                    {localizeLevel(
                      riskData.pestActivity,
                      language
                    )}

                  </strong>

                </div>

              </div>


              <div className="condition-row">

                <div className="condition-icon">

                  <CalendarDays
                    size={18}
                  />

                </div>


                <div>

                  <span>
                    {t.cropStage}
                  </span>

                  <strong>

                    {riskData.cropStage}

                  </strong>

                </div>

              </div>

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

              {t.earlyWarning}

            </span>


            <h3>

              {t.warningTitle}

            </h3>


            <p>

              {t.warningText}

            </p>

          </div>

        </div>


        <div className="forecast-action-grid">

          {/* SENSOR */}

          <div className="forecast-card action-card">

            <div className="feature-icon">

              <Bug />

            </div>


            <span className="small-label">

              {t.fieldIntelligence}

            </span>


            <h3>

              {t.sensorPanelTitle}

            </h3>


            <p>

              {t.sensorPanelText}

            </p>


            <div
              style={{
                display:
                  "grid",

                gap:
                  "10px",

                marginTop:
                  "16px",
              }}
            >

              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  padding:
                    "10px 12px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(18,55,42,0.05)",
                }}
              >

                <span>

                  {t.pestTrapCount}

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
                    "10px 12px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(18,55,42,0.05)",
                }}
              >

                <span>

                  {t.soilMoisture}

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
                    "10px 12px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(18,55,42,0.05)",
                }}
              >

                <span>

                  {t.sensorStatus}

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
                  "14px",

                padding:
                  "10px 14px",

                borderRadius:
                  "10px",

                cursor:
                  "pointer",
              }}
            >

              {t.refreshSensor}

            </button>


            <small
              style={{
                display:
                  "block",

                marginTop:
                  "10px",

                opacity:
                  0.65,
              }}
            >

              {t.lastUpdate}:{" "}

              {
                sensorData.lastUpdate
              }

            </small>

          </div>


          {/* EXPERT */}

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

              {t.expertReviewTitle}

            </h3>


            <p>

              {t.expertReviewText}

            </p>


            {expertSubmitted ? (

              <div
                style={{
                  marginTop:
                    "18px",

                  padding:
                    "14px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(46,125,50,0.08)",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "10px",
                }}
              >

                <CheckCircle2
                  size={21}
                />


                <div>

                  <strong>

                    {t.caseSubmitted}

                  </strong>


                  <div
                    style={{
                      fontSize:
                        "12px",

                      marginTop:
                        "4px",

                      opacity:
                        0.72,
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
                  submitExpertReview
                }
                disabled={
                  !result
                }
                style={{
                  marginTop:
                    "18px",

                  padding:
                    "11px 15px",

                  borderRadius:
                    "10px",

                  cursor:
                    result
                      ? "pointer"
                      : "not-allowed",

                  opacity:
                    result
                      ? 1
                      : 0.55,
                }}
              >

                {result
                  ? result.confidence <
                    80
                    ? t.sendForExpert
                    : t.requestExpert
                  : t.uploadFirst}

              </button>

            )}

          </div>


          {/* NEXT UPDATE */}

          <div className="forecast-card action-card">

            <div className="feature-icon">

              <Activity />

            </div>


            <span className="small-label">

              {t.nextUpdate}

            </span>


            <h3>

              {t.nextUpdate}

            </h3>


            <p>

              {t.nextUpdateText}

            </p>

          </div>

        </div>

      </section>
    );

  /* =======================================================
     ADVISORIES PAGE
  ======================================================= */

  const renderAdvisoriesPage =
    () => (
      <section className="advisories-dashboard">

        <div className="advisory-hero">

          <div>

            <span className="dashboard-kicker">

              {t.advisoriesKicker}

            </span>


            <h1>

              {t.advisoriesTitle}

            </h1>


            <p>

              {t.advisoriesDescription}

            </p>

          </div>


          <div className="advisory-badge">

            <ShieldCheck
              size={15}
            />

            {t.aiAssisted}

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

              {t.currentCondition}

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
                ? advisoryInfo.advice
                : "Upload a leaf image first. CropShield will tailor this advisory to the detected condition."}

            </p>

          </div>


          <div className="advisory-status-side">

            <span>

              {t.status}

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

              {t.immediateAction}

            </span>


            <h3>

              {t.whatToDoNow}

            </h3>


            <div className="advisory-steps">

              {(result
                ? [
                    advisoryInfo.action,
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

                      {index + 1}

                    </span>


                    <p>

                      {item}

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

              {t.prevention}

            </span>


            <h3>

              {t.reduceFutureRisk}

            </h3>


            <div className="advisory-steps">

              <div className="advisory-step">

                <span>
                  ✓
                </span>

                <p>
                  Scout crops regularly.
                </p>

              </div>


              <div className="advisory-step">

                <span>
                  ✓
                </span>

                <p>
                  Track new symptoms and affected areas.
                </p>

              </div>


              <div className="advisory-step">

                <span>
                  ✓
                </span>

                <p>
                  Use locally approved agricultural guidance.
                </p>

              </div>

            </div>

          </div>


          <div className="advisory-action-card advisory-monitor-card">

            <div className="advisory-card-icon forest">

              <Activity
                size={20}
              />

            </div>


            <span className="small-label">

              {t.monitoring}

            </span>


            <h3>

              {t.keepWatching}

            </h3>


            <p>

              {result
                ? "Recheck the crop regularly and seek expert validation if symptoms spread rapidly."
                : "No diagnosis is available yet."}

            </p>


            <button
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

                  {t.speaking}

                </>

              ) : (

                <>

                  <Volume2
                    size={18}
                  />

                  {t.listen}

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

              {t.expertTitle}

            </strong>


            <p>

              {t.expertText}

            </p>

          </div>

        </div>


        <div className="advisory-footer-grid">

          <div className="mini-advisory-card">

            <CalendarDays
              size={19}
            />


            <div>

              <span>

                {t.fieldRoutine}

              </span>


              <strong>

                {t.scoutConsistently}

              </strong>


              <p>

                {t.scoutText}

              </p>

            </div>

          </div>


          <div className="mini-advisory-card">

            <MapPin
              size={19}
            />


            <div>

              <span>

                {t.recordKeeping}

              </span>


              <strong>

                {t.captureLocation}

              </strong>


              <p>

                {t.recordText}

              </p>

            </div>

          </div>


          {/* CLICKABLE ASK EXPERT */}

          <div
            className="mini-advisory-card"
            onClick={
              submitExpertReview
            }
            style={{
              cursor:
                result
                  ? "pointer"
                  : "default",
            }}
          >

            <Users
              size={19}
            />


            <div>

              <span>

                {t.escalation}

              </span>


              <button
                type="button"
                className="feature-button"
                onClick={(
                  event
                ) => {

                  event.stopPropagation();

                  submitExpertReview();

                }}
                disabled={
                  !result
                }
                style={{
                  marginTop:
                    "6px",

                  padding:
                    "8px 12px",

                  borderRadius:
                    "9px",

                  cursor:
                    result
                      ? "pointer"
                      : "not-allowed",

                  opacity:
                    result
                      ? 1
                      : 0.55,
                }}
              >

                {expertSubmitted
                  ? t.waitingValidation
                  : t.askExpert}

              </button>


              <p>

                {expertSubmitted
                  ? t.waitingValidation
                  : t.escalationText}

              </p>

            </div>

          </div>

        </div>

      </section>
    );

  /* =======================================================
     HOTSPOTS PAGE
  ======================================================= */

  const renderHotspotsPage =
    () => (
      <section className="hotspots-dashboard">

        <div className="hotspot-header">

          <div>

            <span className="dashboard-kicker">

              {t.hotspotsKicker}

            </span>


            <h1>

              {t.hotspotTitle}

            </h1>


            <p>

              {t.hotspotsDescription}

            </p>

          </div>


          <div className="prototype-badge">

            <MapPin
              size={15}
            />

            {t.prototypeData}

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

                {t.reportedClusters}

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

                {t.highCritical}

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

                {t.affectedReports}

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

                  {t.fieldMap}

                </span>


                <h3>

                  {t.reportedActivity}

                </h3>

              </div>


              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "10px",

                  flexWrap:
                    "wrap",
                }}
              >

                <div className="map-search">

                  <Search
                    size={15}
                  />

                  {t.searchField}

                </div>


                <select
                  value={
                    selectedDistrict
                  }
                  onChange={(
                    event
                  ) =>
                    setSelectedDistrict(
                      event.target.value
                    )
                  }
                  aria-label={
                    t.selectDistrict
                  }
                  style={{
                    padding:
                      "10px 12px",

                    borderRadius:
                      "10px",

                    border:
                      "1px solid #e3e9e4",

                    background:
                      "white",

                    color:
                      "#12372a",

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
                    maharashtraDistricts
                  ).map(
                    (
                      district
                    ) => (

                      <option
                        key={
                          district
                        }
                        value={
                          district
                        }
                      >

                        {district}

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
                zoom={
                  hotspotZoom
                }
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
                  zoom={
                    hotspotZoom
                  }
                  label={
                    t.resetView
                  }
                />


                {hotspotCases.map(
                  (
                    spot
                  ) => (

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
                            ? "#b23b37"
                            : spot.level ===
                              "High"
                            ? "#c9821e"
                            : spot.level ===
                              "Medium"
                            ? "#2e7d32"
                            : "#6b8f77",

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

                          {spot.name}

                        </strong>


                        <br />


                        {spot.disease}


                        <br />


                        {t.mapRisk}:{" "}

                        {getHotspotLabel(
                          spot.level
                        )}


                        <br />


                        {t.mapReports}:{" "}

                        {spot.count}

                      </Popup>

                    </CircleMarker>

                  )
                )}

              </MapContainer>


              <div className="map-control-hint">

                <Navigation
                  size={14}
                />

                {t.mapHint}

              </div>


              <div className="map-legend">

                <span className="legend-title">

                  {t.mapRisk}

                </span>


                <span>

                  <i className="legend-dot critical"></i>

                  {t.critical}

                </span>


                <span>

                  <i className="legend-dot high"></i>

                  {t.high}

                </span>


                <span>

                  <i className="legend-dot medium"></i>

                  {t.medium}

                </span>


                <span>

                  <i className="legend-dot low"></i>

                  {t.low}

                </span>

              </div>

            </div>

          </div>


          <div className="hotspot-list-card">

            <div className="map-card-head compact">

              <div>

                <span className="small-label">

                  {t.recentReports}

                </span>


                <h3>

                  {t.priorityAreas}

                </h3>

              </div>

            </div>


            <div className="hotspot-list">

              {hotspotCases.map(
                (
                  spot
                ) => (

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

                          {spot.name}

                        </strong>


                        <span
                          className={`hotspot-level ${
                            getHotspotClass(
                              spot.level
                            )
                          }`}
                        >

                          {getHotspotLabel(
                            spot.level
                          )}

                        </span>

                      </div>


                      <span>

                        {spot.disease}

                      </span>


                      <small>

                        {spot.count}{" "}

                        {t.reportedCases}

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

                {t.hotspotValidation}

              </p>

            </div>

          </div>

        </div>

      </section>
    );

  /* =======================================================
     RETURN
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

            {t.nav.diagnosis}

          </button>


          <button
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

            {t.nav.risk}

          </button>


          <button
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

            {t.nav.hotspots}

          </button>


          <button
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

            {t.nav.advisories}

          </button>

        </div>


        <div
          className="language-switcher"
          style={{
            position:
              "relative",
          }}
        >

          <button
            className="language-btn"
            type="button"
            onClick={() =>
              setShowLanguageMenu(
                (
                  value
                ) =>
                  !value
              )
            }
          >

            <Languages
              size={17}
            />


            {
              languages.find(
                (
                  item
                ) =>
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
                  "0.2s ease",
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
                    key={
                      item.code
                    }
                    type="button"
                    className={
                      language ===
                      item.code
                        ? "language-option active"
                        : "language-option"
                    }
                    onClick={() => {

                      setLanguage(
                        item.code
                      );

                      setSpeechError(
                        ""
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

                      setShowLanguageMenu(
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

          {t.footer}

        </span>

      </footer>

    </div>
  );
}

export default App;