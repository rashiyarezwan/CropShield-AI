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
  { code: "en", native: "English", name: "English", voice: "en-IN" },
  { code: "mr", native: "मराठी", name: "Marathi", voice: "mr-IN" },
  { code: "hi", native: "हिन्दी", name: "Hindi", voice: "hi-IN" },
  { code: "te", native: "తెలుగు", name: "Telugu", voice: "te-IN" },
  { code: "kn", native: "ಕನ್ನಡ", name: "Kannada", voice: "kn-IN" },
  { code: "gu", native: "ગુજરાતી", name: "Gujarati", voice: "gu-IN" },
  { code: "ta", native: "தமிழ்", name: "Tamil", voice: "ta-IN" },
  { code: "bn", native: "বাংলা", name: "Bengali", voice: "bn-IN" },
  { code: "ml", native: "മലയാളം", name: "Malayalam", voice: "ml-IN" },
  { code: "pa", native: "ਪੰਜਾਬੀ", name: "Punjabi", voice: "pa-IN" },
];

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {
  en: {
    diagnosis: "Diagnosis",
    risk: "Risk Forecast",
    hotspots: "Hotspots",
    advisories: "Advisories",
    language: "Language",

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
    rainfall: "Rainfall",
    pestActivity: "Pest activity",
    cropStage: "Crop stage",
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
    backToDiagnosis: "Back to Diagnosis",

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

    errors: {
      prediction: "Prediction failed",
      server:
        "Unable to connect to the AI server. Make sure the FastAPI backend is running.",
    },

    footer: "Built for smarter, safer farming",
  },

  mr: {
    diagnosis: "निदान",
    risk: "जोखीम अंदाज",
    hotspots: "हॉटस्पॉट्स",
    advisories: "सल्ला",
    language: "भाषा",

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
    warningTitle:
      "रोगाच्या वाढीसाठी सध्याची परिस्थिती अनुकूल आहे.",
    warningText:
      "हे नमुना जोखीम इंजिन पर्यावरणीय परिस्थिती, पिकाची अवस्था आणि कीड क्रियाशीलता एकत्र करून संभाव्य प्रादुर्भावाला प्राधान्य देते.",
    recommendedActionRisk: "शिफारस केलेली कृती",
    recommendedActionText:
      "शेतातील निरीक्षण वाढवा, जवळपासच्या रोपांची तपासणी करा आणि योग्य एकात्मिक कीड व्यवस्थापन मार्गदर्शक तत्त्वांचे पालन करा.",
    pestTrap: "कीड सापळा संकेत",
    pestTrapText:
      "नमुना सेन्सर फीड निरीक्षण क्षेत्रात वाढलेली कीड क्रियाशीलता दर्शवते.",
    nextUpdate: "पुढील अद्यतन",
    nextUpdateText:
      "नवीन हवामान, पिकाची अवस्था किंवा कीड निरीक्षणे मिळाल्यावर जोखीम पुन्हा मोजली जावी.",
    backToDiagnosis: "निदानाकडे परत जा",

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
    hotspotValidation:
      "प्रोटोटाइप हॉटस्पॉट नोंदी प्रात्यक्षिकासाठी आहेत. प्रत्यक्ष निर्णय घेण्यापूर्वी शेत अहवालांची पडताळणी करावी.",
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
      "CropShield निर्णय सहाय्य देते. कृती करण्यापूर्वी शेतातील लक्षणे, पिकाची जात, स्थानिक परिस्थिती आणि अधिकृत कृषी मार्गदर्शन विचारात घ्यावे.",
    fieldRoutine: "शेतातील दिनचर्या",
    scoutConsistently: "नियमित पाहणी करा",
    scoutText:
      "नियमित निरीक्षणामुळे रोग लवकर ओळखता येतो.",
    recordKeeping: "नोंद ठेवणे",
    captureLocation: "स्थान नोंदवा",
    recordText:
      "फील्ड अहवाल हॉटस्पॉट नकाशासाठी वापरा.",
    escalation: "तज्ज्ञ मदत",
    askExpert: "तज्ज्ञांचा सल्ला घ्या",
    escalationText:
      "अनिश्चित किंवा वाढणारी प्रकरणे तज्ज्ञांकडे पाठवा.",

    errors: {
      prediction: "निदान अयशस्वी झाले",
      server:
        "AI सर्व्हरशी कनेक्ट होता आले नाही. FastAPI बॅकएंड चालू आहे का ते तपासा.",
    },

    footer: "अधिक स्मार्ट आणि सुरक्षित शेतीसाठी",
  },

  hi: {
    diagnosis: "निदान",
    risk: "जोखिम पूर्वानुमान",
    hotspots: "हॉटस्पॉट",
    advisories: "सलाह",
    language: "भाषा",
    systemOnline: "AI सिस्टम ऑनलाइन",
    heroTitle: "अपनी फसलों की रक्षा करें",
    heroSubtitle: "बहुत देर होने से पहले।",
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
    warningTitle:
      "मौजूदा परिस्थितियाँ रोग विकास के लिए अनुकूल हैं।",
    warningText:
      "यह प्रोटोटाइप जोखिम इंजन पर्यावरणीय परिस्थितियों, फसल अवस्था और कीट गतिविधि को मिलाकर संभावित प्रकोपों को प्राथमिकता देता है।",
    recommendedActionRisk: "अनुशंसित कार्रवाई",
    recommendedActionText:
      "खेत की निगरानी बढ़ाएं, आसपास के पौधों का निरीक्षण करें और उचित एकीकृत कीट प्रबंधन दिशानिर्देशों का पालन करें।",
    pestTrap: "कीट ट्रैप संकेत",
    pestTrapText:
      "प्रोटोटाइप सेंसर फीड निगरानी क्षेत्र में बढ़ी हुई कीट गतिविधि दिखाता है।",
    nextUpdate: "अगला अपडेट",
    nextUpdateText:
      "नए मौसम, फसल-अवस्था, या कीट अवलोकन मिलने पर जोखिम की पुनर्गणना की जानी चाहिए।",
    backToDiagnosis: "निदान पर वापस जाएं",

    hotspotsKicker: "भौगोलिक जानकारी",
    hotspotTitle: "रोग हॉटस्पॉट",
    hotspotsDescription:
      "रिपोर्ट किए गए फसल-स्वास्थ्य मामलों को देखें, क्लस्टर पहचानें और खेत निरीक्षण को प्राथमिकता दें।",
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
    hotspotValidation:
      "प्रोटोटाइप हॉटस्पॉट रिकॉर्ड केवल प्रदर्शन के लिए हैं। वास्तविक निर्णय से पहले खेत की रिपोर्ट सत्यापित करें।",
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
      "CropShield निर्णय सहायता देता है। कार्रवाई से पहले खेत के लक्षण, फसल की किस्म, स्थानीय परिस्थितियों और आधिकारिक कृषि मार्गदर्शन पर विचार करें।",
    fieldRoutine: "खेत की दिनचर्या",
    scoutConsistently: "नियमित निरीक्षण करें",
    scoutText:
      "नियमित निरीक्षण से रोग का जल्दी पता लगाने में मदद मिलती है।",
    recordKeeping: "रिकॉर्ड रखना",
    captureLocation: "स्थान दर्ज करें",
    recordText:
      "हॉटस्पॉट मैपिंग में खेत की रिपोर्ट का उपयोग करें।",
    escalation: "विशेषज्ञ सहायता",
    askExpert: "विशेषज्ञ से पूछें",
    escalationText:
      "अनिश्चित या फैलते मामलों को विशेषज्ञ के पास भेजें.",

    errors: {
      prediction: "निदान विफल हुआ",
      server:
        "AI सर्वर से कनेक्ट नहीं हो सका। FastAPI बैकएंड चल रहा है या नहीं जांचें।",
    },

    footer: "अधिक स्मार्ट और सुरक्षित खेती के लिए",
  },

  te: {
    diagnosis: "నిర్ధారణ",
    risk: "ప్రమాద అంచనా",
    hotspots: "హాట్‌స్పాట్‌లు",
    advisories: "సలహాలు",
    language: "భాష",
    systemOnline: "AI వ్యవస్థ ఆన్‌లైన్‌లో ఉంది",
    heroTitle: "మీ పంటలను రక్షించండి",
    heroSubtitle: "చాలా ఆలస్యం కాకముందే.",
    startDiagnosis: "నిర్ధారణ ప్రారంభించండి",
    aiDiagnosis: "AI ఆధారిత నిర్ధారణ",
    riskInsights: "రియల్-టైమ్ ప్రమాద సమాచారం",
    cropHealth: "పంట ఆరోగ్యం",
    diagnosisTitle: "AI నిర్ధారణ",
    detectedCondition: "గుర్తించిన పరిస్థితి",
    analyzingLeaf: "ఆకును విశ్లేషిస్తోంది...",
    ready: "విశ్లేషణకు సిద్ధంగా ఉంది",
    uploadHint: "పంట ఆకు యొక్క స్పష్టమైన చిత్రాన్ని అప్లోడ్ చేయండి",
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
    highConfidence: "అధిక నమ్మకంతో AI నిర్ధారణ",
    expertValidation: "నిపుణుల ధృవీకరణ సిఫారసు",
    analyzingButton: "విశ్లేషిస్తోంది...",
    analyzeAnother: "మరో ఆకును విశ్లేషించండి",
    uploadLeaf: "ఆకు చిత్రాన్ని అప్లోడ్ చేయండి",
    scan: "AI విశ్లేషిస్తోంది...",
    riskTitle: "పంట ప్రమాద అంచనా",
    overallRisk: "మొత్తం ప్రమాదం",
    currentConditions: "ప్రస్తుత పరిస్థితులు",
    fieldEnvironment: "పొల వాతావరణం",
    earlyWarning: "ముందస్తు హెచ్చరిక",
    riskKicker: "ముందస్తు హెచ్చరిక వ్యవస్థ",
    riskDescription: "దీని కోసం నమూనా ప్రమాద అంచనా:",
    sevenDayOutlook: "7-రోజుల అంచనా",
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    rainfall: "వర్షపాతం",
    pestActivity: "పురుగు కార్యకలాపం",
    cropStage: "పంట దశ",
    warningTitle:
      "ప్రస్తుత పరిస్థితులు వ్యాధి అభివృద్ధికి అనుకూలంగా ఉన్నాయి.",
    warningText:
      "ఈ నమూనా రిస్క్ ఇంజిన్ పర్యావరణ పరిస్థితులు, పంట దశ మరియు పురుగు కార్యకలాపాలను కలిపి సంభావ్య వ్యాప్తికి ప్రాధాన్యత ఇస్తుంది.",
    recommendedActionRisk: "సిఫారసు చేసిన చర్య",
    recommendedActionText:
      "పొలం పర్యవేక్షణ పెంచండి, సమీప మొక్కలను పరిశీలించండి మరియు తగిన సమీకృత పురుగు నిర్వహణ మార్గదర్శకాలను అనుసరించండి.",
    pestTrap: "పురుగు ఉచ్చు సంకేతం",
    pestTrapText:
      "నమూనా సెన్సార్ ఫీడ్ పర్యవేక్షిత ప్రాంతంలో పెరిగిన పురుగు కార్యకలాపాన్ని సూచిస్తుంది.",
    nextUpdate: "తదుపరి నవీకరణ",
    nextUpdateText:
      "కొత్త వాతావరణం, పంట దశ లేదా పురుగు పరిశీలనలు అందినప్పుడు ప్రమాదాన్ని తిరిగి లెక్కించాలి.",
    backToDiagnosis: "నిర్ధారణకు తిరిగి వెళ్లండి",

    hotspotsKicker: "భౌగోళిక సమాచారం",
    hotspotTitle: "వ్యాధి హాట్‌స్పాట్‌లు",
    hotspotsDescription:
      "నివేదించబడిన పంట ఆరోగ్య కేసులను చూడండి, క్లస్టర్లను గుర్తించండి మరియు పొల పరిశీలనకు ప్రాధాన్యత ఇవ్వండి.",
    prototypeData: "ప్రోటోటైప్ డేటా",
    reportedClusters: "నివేదించిన క్లస్టర్లు",
    highCritical: "అధిక / తీవ్రమైన",
    affectedReports: "ప్రభావిత నివేదికలు",
    fieldMap: "పొల మ్యాప్",
    reportedActivity: "నివేదించిన వ్యాధి కార్యకలాపం",
    searchField: "పొలం శోధించండి",
    resetView: "మ్యాప్ రీసెట్",
    mapHint: "కదపండి • జూమ్ చేయండి • హాట్‌స్పాట్‌ను నొక్కండి",
    recentReports: "ఇటీవలి నివేదికలు",
    priorityAreas: "ప్రాధాన్య ప్రాంతాలు",
    reportedCases: "నివేదించిన కేసులు",
    mapRisk: "ప్రమాదం",
    mapReports: "నివేదికలు",
    hotspotValidation:
      "ప్రోటోటైప్ హాట్‌స్పాట్ రికార్డులు ప్రదర్శన కోసం మాత్రమే. వాస్తవ నిర్ణయాలకు ముందు ఫీల్డ్ నివేదికలను ధృవీకరించాలి.",
    critical: "తీవ్రమైన",
    high: "అధిక",
    medium: "మధ్యస్థ",
    low: "తక్కువ",

    advisoriesKicker: "రైతు చర్య కేంద్రం",
    advisoriesTitle: "పంట సలహాలు",
    advisoriesDescription:
      "AI నిర్ధారణను స్పష్టమైన తదుపరి చర్యలు, నివారణ మరియు పర్యవేక్షణ మార్గదర్శకంగా మార్చండి.",
    aiAssisted: "AI సహాయక మార్గదర్శకం",
    currentCondition: "ప్రస్తుత పరిస్థితి",
    noDiagnosis: "ఇంకా నిర్ధారణ లేదు",
    status: "స్థితి",
    immediateAction: "తక్షణ చర్య",
    whatToDoNow: "ఇప్పుడు ఏమి చేయాలి",
    prevention: "నివారణ",
    reduceFutureRisk: "భవిష్యత్ ప్రమాదాన్ని తగ్గించండి",
    monitoring: "పర్యవేక్షణ",
    keepWatching: "గమనిస్తూ ఉండండి",
    expertTitle:
      "AI సహాయక మార్గదర్శకం — నిపుణుల ధృవీకరణ సిఫారసు చేయబడింది",
    expertText:
      "CropShield నిర్ణయ సహాయాన్ని అందిస్తుంది. చర్యకు ముందు పొల లక్షణాలు, పంట రకం, స్థానిక పరిస్థితులు మరియు అధికారిక వ్యవసాయ మార్గదర్శకాలను పరిగణించాలి.",
    fieldRoutine: "పొల దినచర్య",
    scoutConsistently: "క్రమం తప్పకుండా పరిశీలించండి",
    scoutText:
      "నిరంతర పరిశీలన వ్యాధిని ముందుగానే గుర్తించడంలో సహాయపడుతుంది.",
    recordKeeping: "రికార్డు నిర్వహణ",
    captureLocation: "స్థానాన్ని నమోదు చేయండి",
    recordText:
      "హాట్‌స్పాట్ మ్యాపింగ్ కోసం ఫీల్డ్ నివేదికలను ఉపయోగించండి.",
    escalation: "నిపుణుల సహాయం",
    askExpert: "నిపుణుడిని అడగండి",
    escalationText:
      "అనిశ్చిత లేదా వ్యాప్తి చెందుతున్న కేసులను నిపుణులకు పంపండి.",

    errors: {
      prediction: "నిర్ధారణ విఫలమైంది",
      server:
        "AI సర్వర్‌కు కనెక్ట్ కాలేకపోయింది. FastAPI బ్యాకెండ్ నడుస్తుందో లేదో చూడండి.",
    },

    footer: "మరింత తెలివైన, సురక్షితమైన వ్యవసాయం కోసం",
  },

  kn: {
    diagnosis: "ರೋಗನಿರ್ಣಯ",
    risk: "ಅಪಾಯದ ಮುನ್ಸೂಚನೆ",
    hotspots: "ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",
    advisories: "ಸಲಹೆಗಳು",
    language: "ಭಾಷೆ",
    systemOnline: "AI ವ್ಯವಸ್ಥೆ ಆನ್‌ಲೈನ್",
    heroTitle: "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ",
    heroSubtitle: "ತಡವಾಗುವ ಮೊದಲು.",
    startDiagnosis: "ರೋಗನಿರ್ಣಯ ಪ್ರಾರಂಭಿಸಿ",
    aiDiagnosis: "AI ಆಧಾರಿತ ರೋಗನಿರ್ಣಯ",
    riskInsights: "ರಿಯಲ್-ಟೈಮ್ ಅಪಾಯ ಮಾಹಿತಿ",
    cropHealth: "ಬೆಳೆ ಆರೋಗ್ಯ",
    diagnosisTitle: "AI ರೋಗನಿರ್ಣಯ",
    detectedCondition: "ಗುರುತಿಸಿದ ಸ್ಥಿತಿ",
    analyzingLeaf: "ಎಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    ready: "ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧ",
    uploadHint: "ಬೆಳೆಯ ಎಲೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    confidence: "ವಿಶ್ವಾಸ",
    aiConfidence: "AI ವಿಶ್ವಾಸ",
    severity: "ತೀವ್ರತೆ",
    riskLevel: "ಅಪಾಯದ ಮಟ್ಟ",
    cropHealthStatus: "ಬೆಳೆ ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
    recommendedAction: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
    whatShouldIDo: "ಏನು ಮಾಡಬೇಕು?",
    cropAdvisory: "ಬೆಳೆ ಸಲಹೆ",
    listen: "ಸಲಹೆ ಕೇಳಿ",
    speaking: "ಸಲಹೆಯನ್ನು ಓದಲಾಗುತ್ತಿದೆ...",
    highConfidence: "ಹೆಚ್ಚಿನ ವಿಶ್ವಾಸದ AI ರೋಗನಿರ್ಣಯ",
    expertValidation: "ತಜ್ಞರ ಪರಿಶೀಲನೆ ಶಿಫಾರಸು",
    analyzingButton: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    analyzeAnother: "ಮತ್ತೊಂದು ಎಲೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    uploadLeaf: "ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    scan: "AI ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    riskTitle: "ಬೆಳೆ ಅಪಾಯದ ಮುನ್ಸೂಚನೆ",
    overallRisk: "ಒಟ್ಟು ಅಪಾಯ",
    currentConditions: "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳು",
    fieldEnvironment: "ಹೊಲದ ಪರಿಸರ",
    earlyWarning: "ಮುನ್ನೆಚ್ಚರಿಕೆ",
    riskKicker: "ಮುನ್ನೆಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ",
    riskDescription: "ಇದಕ್ಕಾಗಿ ಮಾದರಿ ಅಪಾಯ ಅಂದಾಜು:",
    sevenDayOutlook: "7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
    temperature: "ಉಷ್ಣತೆ",
    humidity: "ಆರ್ದ್ರತೆ",
    rainfall: "ಮಳೆ",
    pestActivity: "ಕೀಟ ಚಟುವಟಿಕೆ",
    cropStage: "ಬೆಳೆ ಹಂತ",
    warningTitle:
      "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳು ರೋಗ ಬೆಳವಣಿಗೆಗೆ ಅನುಕೂಲಕರವಾಗಿವೆ.",
    warningText:
      "ಈ ಮಾದರಿ ಅಪಾಯ ಎಂಜಿನ್ ಪರಿಸರ ಪರಿಸ್ಥಿತಿಗಳು, ಬೆಳೆ ಹಂತ ಮತ್ತು ಕೀಟ ಚಟುವಟಿಕೆಯನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ.",
    recommendedActionRisk: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
    recommendedActionText:
      "ಹೊಲದ ಮೇಲ್ವಿಚಾರಣೆ ಹೆಚ್ಚಿಸಿ, ಹತ್ತಿರದ ಸಸ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸೂಕ್ತ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಅನುಸರಿಸಿ.",
    pestTrap: "ಕೀಟ ಬಲೆ ಸಂಕೇತ",
    pestTrapText:
      "ಮಾದರಿ ಸೆನ್ಸಾರ್ ಫೀಡ್ ಮೇಲ್ವಿಚಾರಣೆ ಪ್ರದೇಶದಲ್ಲಿ ಹೆಚ್ಚಿದ ಕೀಟ ಚಟುವಟಿಕೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    nextUpdate: "ಮುಂದಿನ ನವೀಕರಣ",
    nextUpdateText:
      "ಹೊಸ ಹವಾಮಾನ ಅಥವಾ ಕೀಟ ಅವಲೋಕನಗಳು ಬಂದಾಗ ಅಪಾಯವನ್ನು ಮರು ಲೆಕ್ಕಾಚಾರ ಮಾಡಬೇಕು.",
    backToDiagnosis: "ರೋಗನಿರ್ಣಯಕ್ಕೆ ಹಿಂತಿರುಗಿ",

    hotspotsKicker: "ಭೌಗೋಳಿಕ ಮಾಹಿತಿ",
    hotspotTitle: "ರೋಗ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",
    hotspotsDescription:
      "ಬೆಳೆ ಆರೋಗ್ಯ ಪ್ರಕರಣಗಳನ್ನು ನೋಡಿ, ಗುಂಪುಗಳನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ಹೊಲ ಪರಿಶೀಲನೆಗೆ ಆದ್ಯತೆ ನೀಡಿ.",
    prototypeData: "ಪ್ರೋಟೋಟೈಪ್ ಡೇಟಾ",
    reportedClusters: "ವರದಿಯಾದ ಗುಂಪುಗಳು",
    highCritical: "ಹೆಚ್ಚು / ತೀವ್ರ",
    affectedReports: "ಪರಿಣಾಮಿತ ವರದಿಗಳು",
    fieldMap: "ಹೊಲ ನಕ್ಷೆ",
    reportedActivity: "ವರದಿಯಾದ ರೋಗ ಚಟುವಟಿಕೆ",
    searchField: "ಹೊಲ ಹುಡುಕಿ",
    resetView: "ನಕ್ಷೆ ಮರುಹೊಂದಿಸಿ",
    mapHint: "ಸರಿಸಿ • ಜೂಮ್ ಮಾಡಿ • ಹಾಟ್‌ಸ್ಪಾಟ್ ಒತ್ತಿರಿ",
    recentReports: "ಇತ್ತೀಚಿನ ವರದಿಗಳು",
    priorityAreas: "ಪ್ರಾಥಮ್ಯ ಪ್ರದೇಶಗಳು",
    reportedCases: "ವರದಿಯಾದ ಪ್ರಕರಣಗಳು",
    mapRisk: "ಅಪಾಯ",
    mapReports: "ವರದಿಗಳು",
    hotspotValidation:
      "ಪ್ರೋಟೋಟೈಪ್ ಹಾಟ್‌ಸ್ಪಾಟ್ ದಾಖಲೆಗಳು ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ.",
    critical: "ತೀವ್ರ",
    high: "ಹೆಚ್ಚು",
    medium: "ಮಧ್ಯಮ",
    low: "ಕಡಿಮೆ",

    advisoriesKicker: "ರೈತ ಕಾರ್ಯ ಕೇಂದ್ರ",
    advisoriesTitle: "ಬೆಳೆ ಸಲಹೆಗಳು",
    advisoriesDescription:
      "AI ರೋಗನಿರ್ಣಯವನ್ನು ಸ್ಪಷ್ಟ ಕ್ರಮಗಳು ಮತ್ತು ಮೇಲ್ವಿಚಾರಣಾ ಮಾರ್ಗದರ್ಶನವಾಗಿ ಪರಿವರ್ತಿಸಿ.",
    aiAssisted: "AI ಸಹಾಯಕ ಮಾರ್ಗದರ್ಶನ",
    currentCondition: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
    noDiagnosis: "ಇನ್ನೂ ರೋಗನಿರ್ಣಯವಿಲ್ಲ",
    status: "ಸ್ಥಿತಿ",
    immediateAction: "ತಕ್ಷಣದ ಕ್ರಮ",
    whatToDoNow: "ಈಗ ಏನು ಮಾಡಬೇಕು",
    prevention: "ತಡೆಗಟ್ಟುವಿಕೆ",
    reduceFutureRisk: "ಭವಿಷ್ಯದ ಅಪಾಯ ಕಡಿಮೆ ಮಾಡಿ",
    monitoring: "ಮೇಲ್ವಿಚಾರಣೆ",
    keepWatching: "ಗಮನಿಸುತ್ತಿರಿ",
    expertTitle:
      "AI ಸಹಾಯಕ ಮಾರ್ಗದರ್ಶನ — ತಜ್ಞರ ಪರಿಶೀಲನೆ ಶಿಫಾರಸು",
    expertText:
      "ಕ್ರಮಕ್ಕೆ ಮೊದಲು ಸ್ಥಳೀಯ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ಅಧಿಕೃತ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪರಿಗಣಿಸಬೇಕು.",
    fieldRoutine: "ಹೊಲದ ದಿನಚರಿ",
    scoutConsistently: "ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ",
    scoutText:
      "ನಿಯಮಿತ ಗಮನವು ರೋಗವನ್ನು ಬೇಗ ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    recordKeeping: "ದಾಖಲೆ ನಿರ್ವಹಣೆ",
    captureLocation: "ಸ್ಥಳ ದಾಖಲಿಸಿ",
    recordText:
      "ಹಾಟ್‌ಸ್ಪಾಟ್ ಮ್ಯಾಪಿಂಗ್‌ಗೆ ಕ್ಷೇತ್ರ ವರದಿಗಳನ್ನು ಬಳಸಿ.",
    escalation: "ತಜ್ಞರ ಸಹಾಯ",
    askExpert: "ತಜ್ಞರನ್ನು ಕೇಳಿ",
    escalationText:
      "ಅನಿಶ್ಚಿತ ಪ್ರಕರಣಗಳನ್ನು ತಜ್ಞರಿಗೆ ಕಳುಹಿಸಿ.",

    errors: {
      prediction: "ರೋಗನಿರ್ಣಯ ವಿಫಲವಾಗಿದೆ",
      server:
        "AI ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    },

    footer: "ಹೆಚ್ಚು ಸ್ಮಾರ್ಟ್ ಮತ್ತು ಸುರಕ್ಷಿತ ಕೃಷಿಗಾಗಿ",
  },

  gu: {
    diagnosis: "નિદાન",
    risk: "જોખમ આગાહી",
    hotspots: "હોટસ્પોટ્સ",
    advisories: "સલાહ",
    language: "ભાષા",
    systemOnline: "AI સિસ્ટમ ઓનલાઈન",
    heroTitle: "તમારા પાકનું રક્ષણ કરો",
    heroSubtitle: "ખૂબ મોડું થાય તે પહેલાં.",
    startDiagnosis: "નિદાન શરૂ કરો",
    aiDiagnosis: "AI આધારિત નિદાન",
    riskInsights: "રિયલ-ટાઇમ જોખમ માહિતી",
    cropHealth: "પાક આરોગ્ય",
    diagnosisTitle: "AI નિદાન",
    detectedCondition: "ઓળખાયેલી સ્થિતિ",
    analyzingLeaf: "પાનનું વિશ્લેષણ થઈ રહ્યું છે...",
    ready: "વિશ્લેષણ માટે તૈયાર",
    uploadHint: "પાકના પાનનો સ્પષ્ટ ફોટો અપલોડ કરો",
    confidence: "વિશ્વાસ",
    aiConfidence: "AI વિશ્વાસ",
    severity: "તીવ્રતા",
    riskLevel: "જોખમ સ્તર",
    cropHealthStatus: "પાક આરોગ્ય સ્થિતિ",
    recommendedAction: "ભલામણ કરેલ પગલું",
    whatShouldIDo: "શું કરવું?",
    cropAdvisory: "પાક સલાહ",
    listen: "સલાહ સાંભળો",
    speaking: "સલાહ વાંચી રહ્યા છીએ...",
    highConfidence: "ઉચ્ચ વિશ્વાસવાળું AI નિદાન",
    expertValidation: "નિષ્ણાત ચકાસણીની ભલામણ",
    analyzingButton: "વિશ્લેષણ થઈ રહ્યું છે...",
    analyzeAnother: "બીજું પાન તપાસો",
    uploadLeaf: "પાનની તસવીર અપલોડ કરો",
    scan: "AI વિશ્લેષણ કરી રહ્યું છે...",
    riskTitle: "પાક જોખમ આગાહી",
    overallRisk: "કુલ જોખમ",
    currentConditions: "વર્તમાન પરિસ્થિતિ",
    fieldEnvironment: "ખેતરનું વાતાવરણ",
    earlyWarning: "પૂર્વ ચેતવણી",
    riskKicker: "પૂર્વ ચેતવણી પ્રણાલી",
    riskDescription: "આ માટે નમૂના જોખમ અંદાજ:",
    sevenDayOutlook: "7-દિવસનો અંદાજ",
    temperature: "તાપમાન",
    humidity: "ભેજ",
    rainfall: "વરસાદ",
    pestActivity: "જીવાત પ્રવૃત્તિ",
    cropStage: "પાકનો તબક્કો",
    warningTitle:
      "હાલની પરિસ્થિતિઓ રોગ વિકાસ માટે અનુકૂળ છે.",
    warningText:
      "આ નમૂના જોખમ એન્જિન પર્યાવરણીય પરિસ્થિતિઓ, પાકનો તબક્કો અને જીવાત પ્રવૃત્તિને જોડે છે.",
    recommendedActionRisk: "ભલામણ કરેલ પગલું",
    recommendedActionText:
      "ખેતરની દેખરેખ વધારો અને નજીકના છોડની તપાસ કરો.",
    pestTrap: "જીવાત ટ્રેપ સંકેત",
    pestTrapText:
      "નમૂના સેન્સર ફીડ વધેલી જીવાત પ્રવૃત્તિ દર્શાવે છે.",
    nextUpdate: "આગલું અપડેટ",
    nextUpdateText:
      "નવી માહિતી મળ્યા પછી જોખમ ફરી ગણતરી કરવી જોઈએ.",
    backToDiagnosis: "નિદાન પર પાછા જાઓ",

    hotspotsKicker: "ભૌગોલિક માહિતી",
    hotspotTitle: "રોગ હોટસ્પોટ્સ",
    hotspotsDescription:
      "નોંધાયેલા પાક આરોગ્ય કેસો જુઓ, ક્લસ્ટરો ઓળખો અને ખેતર તપાસને પ્રાથમિકતા આપો.",
    prototypeData: "પ્રોટોટાઇપ ડેટા",
    reportedClusters: "નોંધાયેલા ક્લસ્ટરો",
    highCritical: "ઉચ્ચ / ગંભીર",
    affectedReports: "અસરગ્રસ્ત અહેવાલો",
    fieldMap: "ખેતર નકશો",
    reportedActivity: "નોંધાયેલી રોગ પ્રવૃત્તિ",
    searchField: "ખેતર શોધો",
    resetView: "નકશો રીસેટ",
    mapHint: "ખસેડો • ઝૂમ કરો • હોટસ્પોટ દબાવો",
    recentReports: "તાજેતરના અહેવાલો",
    priorityAreas: "પ્રાથમિક વિસ્તારો",
    reportedCases: "નોંધાયેલા કેસો",
    mapRisk: "જોખમ",
    mapReports: "અહેવાલો",
    hotspotValidation:
      "પ્રોટોટાઇપ હોટસ્પોટ રેકોર્ડ પ્રદર્શન માટે છે.",
    critical: "ગંભીર",
    high: "ઉચ્ચ",
    medium: "મધ્યમ",
    low: "નીચું",

    advisoriesKicker: "ખેડૂત કાર્ય કેન્દ્ર",
    advisoriesTitle: "પાક સલાહ",
    advisoriesDescription:
      "AI નિદાનને સ્પષ્ટ આગળના પગલાં અને દેખરેખ માર્ગદર્શનમાં ફેરવો.",
    aiAssisted: "AI સહાયિત માર્ગદર્શન",
    currentCondition: "વર્તમાન સ્થિતિ",
    noDiagnosis: "હજુ નિદાન નથી",
    status: "સ્થિતિ",
    immediateAction: "તાત્કાલિક પગલું",
    whatToDoNow: "હવે શું કરવું",
    prevention: "નિવારણ",
    reduceFutureRisk: "ભવિષ્યનું જોખમ ઘટાડો",
    monitoring: "દેખરેખ",
    keepWatching: "નજર રાખો",
    expertTitle:
      "AI સહાયિત માર્ગદર્શન — નિષ્ણાત ચકાસણીની ભલામણ",
    expertText:
      "સ્થાનિક પરિસ્થિતિ અને સત્તાવાર કૃષિ માર્ગદર્શન ધ્યાનમાં લો.",
    fieldRoutine: "ખેતરની દિનચર્યા",
    scoutConsistently: "નિયમિત તપાસ કરો",
    scoutText: "નિયમિત દેખરેખથી રોગ વહેલો ઓળખી શકાય છે.",
    recordKeeping: "રેકોર્ડ રાખવું",
    captureLocation: "સ્થાન નોંધો",
    recordText: "હોટસ્પોટ નકશા માટે ક્ષેત્ર અહેવાલોનો ઉપયોગ કરો.",
    escalation: "નિષ્ણાત સહાય",
    askExpert: "નિષ્ણાતને પૂછો",
    escalationText: "અનિશ્ચિત કેસોને નિષ્ણાત પાસે મોકલો.",

    errors: {
      prediction: "નિદાન નિષ્ફળ થયું",
      server: "AI સર્વર સાથે જોડાઈ શકાઈ નથી.",
    },

    footer: "વધુ સ્માર્ટ અને સુરક્ષિત ખેતી માટે",
  },

  ta: {
    diagnosis: "நோயறிதல்",
    risk: "ஆபத்து கணிப்பு",
    hotspots: "ஹாட்ஸ்பாட்கள்",
    advisories: "ஆலோசனைகள்",
    language: "மொழி",
    systemOnline: "AI அமைப்பு செயல்பாட்டில்",
    heroTitle: "உங்கள் பயிர்களை பாதுகாக்குங்கள்",
    heroSubtitle: "தாமதமாகும் முன்.",
    startDiagnosis: "நோயறிதலை தொடங்கவும்",
    aiDiagnosis: "AI அடிப்படையிலான நோயறிதல்",
    riskInsights: "நேரடி ஆபத்து தகவல்",
    cropHealth: "பயிர் ஆரோக்கியம்",
    diagnosisTitle: "AI நோயறிதல்",
    detectedCondition: "கண்டறியப்பட்ட நிலை",
    analyzingLeaf: "இலை பகுப்பாய்வு செய்யப்படுகிறது...",
    ready: "பகுப்பாய்வுக்கு தயார்",
    uploadHint: "பயிர் இலையின் தெளிவான படத்தை பதிவேற்றுங்கள்",
    confidence: "நம்பிக்கை",
    aiConfidence: "AI நம்பிக்கை",
    severity: "தீவிரம்",
    riskLevel: "ஆபத்து நிலை",
    cropHealthStatus: "பயிர் ஆரோக்கிய நிலை",
    recommendedAction: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    whatShouldIDo: "என்ன செய்ய வேண்டும்?",
    cropAdvisory: "பயிர் ஆலோசனை",
    listen: "ஆலோசனையை கேளுங்கள்",
    speaking: "ஆலோசனை வாசிக்கப்படுகிறது...",
    highConfidence: "உயர் நம்பிக்கை AI நோயறிதல்",
    expertValidation: "நிபுணர் சரிபார்ப்பு பரிந்துரைக்கப்படுகிறது",
    analyzingButton: "பகுப்பாய்வு செய்யப்படுகிறது...",
    analyzeAnother: "மற்றொரு இலையை ஆய்வு செய்யுங்கள்",
    uploadLeaf: "இலைப் படத்தை பதிவேற்றுங்கள்",
    scan: "AI பகுப்பாய்வு செய்கிறது...",
    riskTitle: "பயிர் ஆபத்து கணிப்பு",
    overallRisk: "மொத்த ஆபத்து",
    currentConditions: "தற்போதைய நிலை",
    fieldEnvironment: "வயல் சூழல்",
    earlyWarning: "முன்னெச்சரிக்கை",
    riskKicker: "முன்னெச்சரிக்கை அமைப்பு",
    riskDescription: "இதற்கான முன்மாதிரி ஆபத்து மதிப்பீடு:",
    sevenDayOutlook: "7-நாள் முன்னறிவிப்பு",
    temperature: "வெப்பநிலை",
    humidity: "ஈரப்பதம்",
    rainfall: "மழைப்பொழிவு",
    pestActivity: "பூச்சி செயல்பாடு",
    cropStage: "பயிர் நிலை",
    warningTitle:
      "தற்போதைய நிலைமைகள் நோய் வளர்ச்சிக்கு சாதகமாக உள்ளன.",
    warningText:
      "மாதிரி ஆபத்து அமைப்பு சுற்றுச்சூழல் நிலைமைகள், பயிர் நிலை மற்றும் பூச்சி செயல்பாட்டை இணைக்கிறது.",
    recommendedActionRisk: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    recommendedActionText:
      "வயல் கண்காணிப்பை அதிகரிக்கவும் மற்றும் அருகிலுள்ள செடிகளை ஆய்வு செய்யவும்.",
    pestTrap: "பூச்சி பொறி சமிக்ஞை",
    pestTrapText:
      "முன்மாதிரி சென்சார் அதிகரித்த பூச்சி செயல்பாட்டைக் காட்டுகிறது.",
    nextUpdate: "அடுத்த புதுப்பிப்பு",
    nextUpdateText:
      "புதிய தரவு கிடைக்கும்போது ஆபத்து மீண்டும் கணக்கிடப்பட வேண்டும்.",
    backToDiagnosis: "நோயறிதலுக்குத் திரும்பு",

    hotspotsKicker: "புவியியல் தகவல்",
    hotspotTitle: "நோய் ஹாட்ஸ்பாட்கள்",
    hotspotsDescription:
      "பதிவான பயிர் ஆரோக்கிய வழக்குகளைப் பார்த்து வயல் ஆய்வுக்கு முன்னுரிமை அளிக்கவும்.",
    prototypeData: "முன்மாதிரி தரவு",
    reportedClusters: "பதிவான குழுக்கள்",
    highCritical: "உயர் / தீவிர",
    affectedReports: "பாதிக்கப்பட்ட அறிக்கைகள்",
    fieldMap: "வயல் வரைபடம்",
    reportedActivity: "பதிவான நோய் செயல்பாடு",
    searchField: "வயலைத் தேடு",
    resetView: "வரைபடத்தை மீட்டமை",
    mapHint: "நகர்த்தவும் • பெரிதாக்கவும் • ஹாட்ஸ்பாட்டைத் தட்டவும்",
    recentReports: "சமீபத்திய அறிக்கைகள்",
    priorityAreas: "முன்னுரிமைப் பகுதிகள்",
    reportedCases: "பதிவான வழக்குகள்",
    mapRisk: "ஆபத்து",
    mapReports: "அறிக்கைகள்",
    hotspotValidation:
      "முன்மாதிரி ஹாட்ஸ்பாட் பதிவுகள் விளக்கத்திற்காக மட்டுமே.",
    critical: "தீவிர",
    high: "உயர்",
    medium: "மிதமான",
    low: "குறைந்த",

    advisoriesKicker: "விவசாயி நடவடிக்கை மையம்",
    advisoriesTitle: "பயிர் ஆலோசனைகள்",
    advisoriesDescription:
      "AI நோயறிதலை அடுத்த நடவடிக்கைகள் மற்றும் கண்காணிப்பு வழிகாட்டுதலாக மாற்றுங்கள்.",
    aiAssisted: "AI உதவியுடன் வழிகாட்டுதல்",
    currentCondition: "தற்போதைய நிலை",
    noDiagnosis: "இன்னும் நோயறிதல் இல்லை",
    status: "நிலை",
    immediateAction: "உடனடி நடவடிக்கை",
    whatToDoNow: "இப்போது என்ன செய்ய வேண்டும்",
    prevention: "தடுப்பு",
    reduceFutureRisk: "எதிர்கால ஆபத்தை குறைக்கவும்",
    monitoring: "கண்காணிப்பு",
    keepWatching: "கவனித்துக்கொண்டிருங்கள்",
    expertTitle:
      "AI உதவியுடன் வழிகாட்டுதல் — நிபுணர் சரிபார்ப்பு பரிந்துரைக்கப்படுகிறது",
    expertText:
      "உள்ளூர் நிலைமைகள் மற்றும் அதிகாரப்பூர்வ வேளாண் வழிகாட்டுதலை கருத்தில் கொள்ளுங்கள்.",
    fieldRoutine: "வயல் நடைமுறை",
    scoutConsistently: "தொடர்ந்து ஆய்வு செய்யுங்கள்",
    scoutText: "தொடர்ச்சியான கண்காணிப்பு ஆரம்பகால கண்டறிதலை மேம்படுத்துகிறது.",
    recordKeeping: "பதிவு பராமரிப்பு",
    captureLocation: "இடத்தை பதிவு செய்யுங்கள்",
    recordText: "ஹாட்ஸ்பாட் வரைபடத்திற்கு வயல் அறிக்கைகளைப் பயன்படுத்தவும்.",
    escalation: "நிபுணர் உதவி",
    askExpert: "நிபுணரை கேளுங்கள்",
    escalationText: "நிச்சயமற்ற வழக்குகளை நிபுணரிடம் அனுப்பவும்.",

    errors: {
      prediction: "நோயறிதல் தோல்வியடைந்தது",
      server: "AI சேவையகத்துடன் இணைக்க முடியவில்லை.",
    },

    footer: "மேலும் புத்திசாலி மற்றும் பாதுகாப்பான விவசாயத்திற்காக",
  },

  bn: {
    diagnosis: "রোগ নির্ণয়",
    risk: "ঝুঁকি পূর্বাভাস",
    hotspots: "হটস্পট",
    advisories: "পরামর্শ",
    language: "ভাষা",
    systemOnline: "AI সিস্টেম অনলাইন",
    heroTitle: "আপনার ফসল রক্ষা করুন",
    heroSubtitle: "অনেক দেরি হওয়ার আগে।",
    startDiagnosis: "রোগ নির্ণয় শুরু করুন",
    aiDiagnosis: "AI-চালিত রোগ নির্ণয়",
    riskInsights: "রিয়েল-টাইম ঝুঁকি তথ্য",
    cropHealth: "ফসলের স্বাস্থ্য",
    diagnosisTitle: "AI রোগ নির্ণয়",
    detectedCondition: "শনাক্ত অবস্থা",
    analyzingLeaf: "পাতা বিশ্লেষণ করা হচ্ছে...",
    ready: "বিশ্লেষণের জন্য প্রস্তুত",
    uploadHint: "ফসলের পাতার স্পষ্ট ছবি আপলোড করুন",
    confidence: "বিশ্বাস",
    aiConfidence: "AI বিশ্বাসযোগ্যতা",
    severity: "তীব্রতা",
    riskLevel: "ঝুঁকির স্তর",
    cropHealthStatus: "ফসলের স্বাস্থ্য অবস্থা",
    recommendedAction: "প্রস্তাবিত পদক্ষেপ",
    whatShouldIDo: "কী করবেন?",
    cropAdvisory: "ফসল পরামর্শ",
    listen: "পরামর্শ শুনুন",
    speaking: "পরামর্শ পড়া হচ্ছে...",
    highConfidence: "উচ্চ-আত্মবিশ্বাসী AI রোগ নির্ণয়",
    expertValidation: "বিশেষজ্ঞ যাচাইয়ের পরামর্শ",
    analyzingButton: "বিশ্লেষণ করা হচ্ছে...",
    analyzeAnother: "আরেকটি পাতা পরীক্ষা করুন",
    uploadLeaf: "পাতার ছবি আপলোড করুন",
    scan: "AI বিশ্লেষণ করছে...",
    riskTitle: "ফসলের ঝুঁকি পূর্বাভাস",
    overallRisk: "মোট ঝুঁকি",
    currentConditions: "বর্তমান পরিস্থিতি",
    fieldEnvironment: "ক্ষেতের পরিবেশ",
    earlyWarning: "প্রাথমিক সতর্কতা",
    riskKicker: "প্রাথমিক সতর্কতা ব্যবস্থা",
    riskDescription: "এর জন্য প্রোটোটাইপ ঝুঁকি অনুমান:",
    sevenDayOutlook: "৭-দিনের পূর্বাভাস",
    temperature: "তাপমাত্রা",
    humidity: "আর্দ্রতা",
    rainfall: "বৃষ্টিপাত",
    pestActivity: "পোকামাকড়ের কার্যকলাপ",
    cropStage: "ফসলের পর্যায়",
    warningTitle:
      "বর্তমান পরিস্থিতি রোগ বিকাশের জন্য অনুকূল।",
    warningText:
      "এই প্রোটোটাইপ ঝুঁকি ইঞ্জিন পরিবেশগত পরিস্থিতি, ফসলের পর্যায় এবং পোকামাকড়ের কার্যকলাপকে একত্রিত করে।",
    recommendedActionRisk: "প্রস্তাবিত পদক্ষেপ",
    recommendedActionText:
      "ক্ষেতের পর্যবেক্ষণ বাড়ান এবং আশেপাশের গাছ পরীক্ষা করুন।",
    pestTrap: "পোকা ফাঁদ সংকেত",
    pestTrapText:
      "প্রোটোটাইপ সেন্সর ফিড বর্ধিত পোকামাকড়ের কার্যকলাপ নির্দেশ করে।",
    nextUpdate: "পরবর্তী আপডেট",
    nextUpdateText:
      "নতুন তথ্য পাওয়া গেলে ঝুঁকি পুনরায় গণনা করা উচিত।",
    backToDiagnosis: "নির্ণয়ে ফিরে যান",

    hotspotsKicker: "ভৌগোলিক তথ্য",
    hotspotTitle: "রোগের হটস্পট",
    hotspotsDescription:
      "রিপোর্ট করা ফসলের স্বাস্থ্য কেস দেখুন এবং ক্ষেত্র পরিদর্শনকে অগ্রাধিকার দিন।",
    prototypeData: "প্রোটোটাইপ ডেটা",
    reportedClusters: "রিপোর্ট করা ক্লাস্টার",
    highCritical: "উচ্চ / গুরুতর",
    affectedReports: "প্রভাবিত রিপোর্ট",
    fieldMap: "ক্ষেত্রের মানচিত্র",
    reportedActivity: "রিপোর্ট করা রোগ কার্যকলাপ",
    searchField: "ক্ষেত্র অনুসন্ধান",
    resetView: "মানচিত্র রিসেট",
    mapHint: "সরান • জুম করুন • হটস্পটে ট্যাপ করুন",
    recentReports: "সাম্প্রতিক রিপোর্ট",
    priorityAreas: "অগ্রাধিকার এলাকা",
    reportedCases: "রিপোর্ট করা কেস",
    mapRisk: "ঝুঁকি",
    mapReports: "রিপোর্ট",
    hotspotValidation:
      "প্রোটোটাইপ হটস্পট রেকর্ড প্রদর্শনের জন্য।",
    critical: "গুরুতর",
    high: "উচ্চ",
    medium: "মাঝারি",
    low: "কম",

    advisoriesKicker: "কৃষক কর্ম কেন্দ্র",
    advisoriesTitle: "ফসল পরামর্শ",
    advisoriesDescription:
      "AI রোগ নির্ণয়কে পরবর্তী পদক্ষেপ এবং পর্যবেক্ষণ নির্দেশিকায় রূপান্তর করুন।",
    aiAssisted: "AI-সহায়িত নির্দেশনা",
    currentCondition: "বর্তমান অবস্থা",
    noDiagnosis: "এখনও রোগ নির্ণয় নেই",
    status: "অবস্থা",
    immediateAction: "তাৎক্ষণিক পদক্ষেপ",
    whatToDoNow: "এখন কী করবেন",
    prevention: "প্রতিরোধ",
    reduceFutureRisk: "ভবিষ্যতের ঝুঁকি কমান",
    monitoring: "পর্যবেক্ষণ",
    keepWatching: "নজর রাখুন",
    expertTitle:
      "AI-সহায়িত নির্দেশনা — বিশেষজ্ঞ যাচাইয়ের পরামর্শ",
    expertText:
      "স্থানীয় পরিস্থিতি এবং সরকারি কৃষি নির্দেশিকা বিবেচনা করুন।",
    fieldRoutine: "ক্ষেতের রুটিন",
    scoutConsistently: "নিয়মিত পরিদর্শন করুন",
    scoutText: "নিয়মিত পর্যবেক্ষণ প্রাথমিকভাবে রোগ শনাক্ত করতে সাহায্য করে।",
    recordKeeping: "রেকর্ড রাখা",
    captureLocation: "অবস্থান নথিভুক্ত করুন",
    recordText: "হটস্পট ম্যাপিংয়ের জন্য ক্ষেতের রিপোর্ট ব্যবহার করুন।",
    escalation: "বিশেষজ্ঞ সহায়তা",
    askExpert: "বিশেষজ্ঞকে জিজ্ঞাসা করুন",
    escalationText: "অনিশ্চিত কেস বিশেষজ্ঞের কাছে পাঠান।",

    errors: {
      prediction: "রোগ নির্ণয় ব্যর্থ হয়েছে",
      server: "AI সার্ভারের সাথে সংযোগ করা যায়নি।",
    },

    footer: "আরও স্মার্ট ও নিরাপদ কৃষির জন্য",
  },

  ml: {
    diagnosis: "രോഗനിർണയം",
    risk: "അപകട പ്രവചനം",
    hotspots: "ഹോട്ട്‌സ്‌പോട്ടുകൾ",
    advisories: "ഉപദേശങ്ങൾ",
    language: "ഭാഷ",
    systemOnline: "AI സിസ്റ്റം ഓൺലൈനിലാണ്",
    heroTitle: "നിങ്ങളുടെ വിളകൾ സംരക്ഷിക്കുക",
    heroSubtitle: "വളരെ വൈകുന്നതിന് മുമ്പ്.",
    startDiagnosis: "രോഗനിർണയം ആരംഭിക്കുക",
    aiDiagnosis: "AI അധിഷ്ഠിത രോഗനിർണയം",
    riskInsights: "തത്സമയ അപകട വിവരങ്ങൾ",
    cropHealth: "വിളയുടെ ആരോഗ്യം",
    diagnosisTitle: "AI രോഗനിർണയം",
    detectedCondition: "കണ്ടെത്തിയ സ്ഥിതി",
    analyzingLeaf: "ഇല വിശകലനം ചെയ്യുന്നു...",
    ready: "വിശകലനത്തിന് തയ്യാറാണ്",
    uploadHint: "വിളയുടെ ഇലയുടെ വ്യക്തമായ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    confidence: "വിശ്വാസം",
    aiConfidence: "AI വിശ്വാസ്യത",
    severity: "തീവ്രത",
    riskLevel: "അപകടനില",
    cropHealthStatus: "വിളയുടെ ആരോഗ്യസ്ഥിതി",
    recommendedAction: "ശുപാർശ ചെയ്യുന്ന നടപടി",
    whatShouldIDo: "എന്ത് ചെയ്യണം?",
    cropAdvisory: "വിള ഉപദേശം",
    listen: "ഉപദേശം കേൾക്കുക",
    speaking: "ഉപദേശം വായിക്കുന്നു...",
    highConfidence: "ഉയർന്ന വിശ്വാസ്യതയുള്ള AI രോഗനിർണയം",
    expertValidation: "വിദഗ്ധ പരിശോധന ശുപാർശ ചെയ്യുന്നു",
    analyzingButton: "വിശകലനം ചെയ്യുന്നു...",
    analyzeAnother: "മറ്റൊരു ഇല പരിശോധിക്കുക",
    uploadLeaf: "ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    scan: "AI വിശകലനം ചെയ്യുന്നു...",
    riskTitle: "വിള അപകട പ്രവചനം",
    overallRisk: "ആകെ അപകടം",
    currentConditions: "നിലവിലെ സാഹചര്യങ്ങൾ",
    fieldEnvironment: "വയൽ പരിസ്ഥിതി",
    earlyWarning: "മുൻകൂർ മുന്നറിയിപ്പ്",
    riskKicker: "മുൻകൂർ മുന്നറിയിപ്പ് സംവിധാനം",
    riskDescription: "ഇതിനുള്ള മാതൃകാ അപകട അനുമാനം:",
    sevenDayOutlook: "7-ദിവസത്തെ പ്രവചനം",
    temperature: "താപനില",
    humidity: "ആർദ്രത",
    rainfall: "മഴ",
    pestActivity: "കീട പ്രവർത്തനം",
    cropStage: "വിള ഘട്ടം",
    warningTitle:
      "നിലവിലെ സാഹചര്യങ്ങൾ രോഗവളർച്ചയ്ക്ക് അനുകൂലമാണ്.",
    warningText:
      "ഈ മാതൃകാ റിസ്ക് എഞ്ചിൻ പാരിസ്ഥിതിക സാഹചര്യങ്ങൾ, വിള ഘട്ടം, കീട പ്രവർത്തനം എന്നിവ സംയോജിപ്പിക്കുന്നു.",
    recommendedActionRisk: "ശുപാർശ ചെയ്യുന്ന നടപടി",
    recommendedActionText:
      "വയൽ നിരീക്ഷണം വർദ്ധിപ്പിച്ച് സമീപത്തെ ചെടികൾ പരിശോധിക്കുക.",
    pestTrap: "കീട കെണി സിഗ്നൽ",
    pestTrapText:
      "മാതൃകാ സെൻസർ ഫീഡ് വർദ്ധിച്ച കീട പ്രവർത്തനം സൂചിപ്പിക്കുന്നു.",
    nextUpdate: "അടുത്ത അപ്ഡേറ്റ്",
    nextUpdateText:
      "പുതിയ വിവരങ്ങൾ ലഭിക്കുമ്പോൾ അപകടസാധ്യത വീണ്ടും കണക്കാക്കണം.",
    backToDiagnosis: "രോഗനിർണയത്തിലേക്ക് മടങ്ങുക",

    hotspotsKicker: "ഭൗമ വിവരങ്ങൾ",
    hotspotTitle: "രോഗ ഹോട്ട്‌സ്‌പോട്ടുകൾ",
    hotspotsDescription:
      "റിപ്പോർട്ട് ചെയ്ത വിള ആരോഗ്യ കേസുകൾ കാണുകയും വയൽ പരിശോധനയ്ക്ക് മുൻഗണന നൽകുകയും ചെയ്യുക.",
    prototypeData: "പ്രോട്ടോടൈപ്പ് ഡാറ്റ",
    reportedClusters: "റിപ്പോർട്ട് ചെയ്ത ക്ലസ്റ്ററുകൾ",
    highCritical: "ഉയർന്ന / ഗുരുതര",
    affectedReports: "ബാധിച്ച റിപ്പോർട്ടുകൾ",
    fieldMap: "വയൽ മാപ്പ്",
    reportedActivity: "റിപ്പോർട്ട് ചെയ്ത രോഗ പ്രവർത്തനം",
    searchField: "വയൽ തിരയുക",
    resetView: "മാപ്പ് റീസെറ്റ്",
    mapHint: "നീക്കുക • സൂം ചെയ്യുക • ഹോട്ട്‌സ്‌പോട്ട് അമർത്തുക",
    recentReports: "സമീപകാല റിപ്പോർട്ടുകൾ",
    priorityAreas: "മുൻഗണനാ മേഖലകൾ",
    reportedCases: "റിപ്പോർട്ട് ചെയ്ത കേസുകൾ",
    mapRisk: "അപകടം",
    mapReports: "റിപ്പോർട്ടുകൾ",
    hotspotValidation:
      "പ്രോട്ടോടൈപ്പ് ഹോട്ട്‌സ്‌പോട്ട് രേഖകൾ പ്രദർശനത്തിനായി മാത്രമാണ്.",
    critical: "ഗുരുതരം",
    high: "ഉയർന്ന",
    medium: "മിതമായ",
    low: "കുറഞ്ഞ",

    advisoriesKicker: "കർഷക പ്രവർത്തന കേന്ദ്രം",
    advisoriesTitle: "വിള ഉപദേശങ്ങൾ",
    advisoriesDescription:
      "AI രോഗനിർണയത്തെ അടുത്ത നടപടികളും നിരീക്ഷണ മാർഗ്ഗനിർദ്ദേശവുമാക്കി മാറ്റുക.",
    aiAssisted: "AI സഹായമുള്ള മാർഗ്ഗനിർദ്ദേശം",
    currentCondition: "നിലവിലെ സ്ഥിതി",
    noDiagnosis: "ഇനിയും രോഗനിർണയം ഇല്ല",
    status: "സ്ഥിതി",
    immediateAction: "തൽക്ഷണ നടപടി",
    whatToDoNow: "ഇപ്പോൾ എന്ത് ചെയ്യണം",
    prevention: "പ്രതിരോധം",
    reduceFutureRisk: "ഭാവിയിലെ അപകടസാധ്യത കുറയ്ക്കുക",
    monitoring: "നിരീക്ഷണം",
    keepWatching: "ശ്രദ്ധിക്കുക",
    expertTitle:
      "AI സഹായമുള്ള മാർഗ്ഗനിർദ്ദേശം — വിദഗ്ധ പരിശോധന ശുപാർശ ചെയ്യുന്നു",
    expertText:
      "പ്രാദേശിക സാഹചര്യങ്ങളും ഔദ്യോഗിക കാർഷിക മാർഗ്ഗനിർദ്ദേശങ്ങളും പരിഗണിക്കുക.",
    fieldRoutine: "വയൽ ദിനചര്യ",
    scoutConsistently: "സ്ഥിരമായി പരിശോധിക്കുക",
    scoutText: "സ്ഥിരമായ നിരീക്ഷണം രോഗം നേരത്തെ കണ്ടെത്താൻ സഹായിക്കുന്നു.",
    recordKeeping: "രേഖ സൂക്ഷിക്കൽ",
    captureLocation: "സ്ഥാനം രേഖപ്പെടുത്തുക",
    recordText: "ഹോട്ട്‌സ്‌പോട്ട് മാപ്പിംഗിനായി ഫീൽഡ് റിപ്പോർട്ടുകൾ ഉപയോഗിക്കുക.",
    escalation: "വിദഗ്ധ സഹായം",
    askExpert: "വിദഗ്ധരോട് ചോദിക്കുക",
    escalationText: "അനിശ്ചിത കേസുകൾ വിദഗ്ധരിലേക്ക് അയയ്ക്കുക.",

    errors: {
      prediction: "രോഗനിർണയം പരാജയപ്പെട്ടു",
      server: "AI സെർവറുമായി ബന്ധിപ്പിക്കാൻ കഴിഞ്ഞില്ല.",
    },

    footer: "കൂടുതൽ സ്മാർട്ടും സുരക്ഷിതവുമായ കൃഷിക്കായി",
  },

  pa: {
    diagnosis: "ਨਿਦਾਨ",
    risk: "ਖਤਰੇ ਦੀ ਪੇਸ਼ਗੋਈ",
    hotspots: "ਹਾਟਸਪਾਟ",
    advisories: "ਸਲਾਹ",
    language: "ਭਾਸ਼ਾ",
    systemOnline: "AI ਸਿਸਟਮ ਆਨਲਾਈਨ",
    heroTitle: "ਆਪਣੀਆਂ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ",
    heroSubtitle: "ਦੇਰ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ।",
    startDiagnosis: "ਨਿਦਾਨ ਸ਼ੁਰੂ ਕਰੋ",
    aiDiagnosis: "AI ਆਧਾਰਿਤ ਨਿਦਾਨ",
    riskInsights: "ਰੀਅਲ-ਟਾਈਮ ਖਤਰਾ ਜਾਣਕਾਰੀ",
    cropHealth: "ਫਸਲ ਦੀ ਸਿਹਤ",
    diagnosisTitle: "AI ਨਿਦਾਨ",
    detectedCondition: "ਪਛਾਣੀ ਗਈ ਸਥਿਤੀ",
    analyzingLeaf: "ਪੱਤੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",
    ready: "ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਤਿਆਰ",
    uploadHint: "ਫਸਲ ਦੇ ਪੱਤੇ ਦੀ ਸਾਫ਼ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    confidence: "ਭਰੋਸਾ",
    aiConfidence: "AI ਭਰੋਸਾ",
    severity: "ਗੰਭੀਰਤਾ",
    riskLevel: "ਖਤਰੇ ਦਾ ਪੱਧਰ",
    cropHealthStatus: "ਫਸਲ ਦੀ ਸਿਹਤ ਦੀ ਸਥਿਤੀ",
    recommendedAction: "ਸਿਫਾਰਸ਼ੀ ਕਾਰਵਾਈ",
    whatShouldIDo: "ਕੀ ਕਰਨਾ ਹੈ?",
    cropAdvisory: "ਫਸਲ ਸਲਾਹ",
    listen: "ਸਲਾਹ ਸੁਣੋ",
    speaking: "ਸਲਾਹ ਪੜ੍ਹੀ ਜਾ ਰਹੀ ਹੈ...",
    highConfidence: "ਉੱਚ ਭਰੋਸੇ ਵਾਲਾ AI ਨਿਦਾਨ",
    expertValidation: "ਮਾਹਰ ਜਾਂਚ ਦੀ ਸਿਫਾਰਸ਼",
    analyzingButton: "ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",
    analyzeAnother: "ਹੋਰ ਪੱਤਾ ਜਾਂਚੋ",
    uploadLeaf: "ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    scan: "AI ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
    riskTitle: "ਫਸਲ ਖਤਰੇ ਦੀ ਪੇਸ਼ਗੋਈ",
    overallRisk: "ਕੁੱਲ ਖਤਰਾ",
    currentConditions: "ਮੌਜੂਦਾ ਹਾਲਾਤ",
    fieldEnvironment: "ਖੇਤ ਦਾ ਵਾਤਾਵਰਣ",
    earlyWarning: "ਪਹਿਲਾਂ ਤੋਂ ਚੇਤਾਵਨੀ",
    riskKicker: "ਪਹਿਲਾਂ ਤੋਂ ਚੇਤਾਵਨੀ ਪ੍ਰਣਾਲੀ",
    riskDescription: "ਇਸ ਲਈ ਨਮੂਨਾ ਖਤਰਾ ਅਨੁਮਾਨ:",
    sevenDayOutlook: "7-ਦਿਨਾਂ ਦੀ ਭਵਿੱਖਬਾਣੀ",
    temperature: "ਤਾਪਮਾਨ",
    humidity: "ਨਮੀ",
    rainfall: "ਬਾਰਿਸ਼",
    pestActivity: "ਕੀੜੇ ਦੀ ਗਤੀਵਿਧੀ",
    cropStage: "ਫਸਲ ਦਾ ਪੜਾਅ",
    warningTitle:
      "ਮੌਜੂਦਾ ਹਾਲਾਤ ਬਿਮਾਰੀ ਦੇ ਵਿਕਾਸ ਲਈ ਅਨੁਕੂਲ ਹਨ।",
    warningText:
      "ਇਹ ਨਮੂਨਾ ਖਤਰਾ ਇੰਜਣ ਵਾਤਾਵਰਣਕ ਹਾਲਾਤ, ਫਸਲ ਦੇ ਪੜਾਅ, ਅਤੇ ਕੀੜੇ ਦੀ ਗਤੀਵਿਧੀ ਨੂੰ ਜੋੜਦਾ ਹੈ।",
    recommendedActionRisk: "ਸਿਫਾਰਸ਼ੀ ਕਾਰਵਾਈ",
    recommendedActionText:
      "ਖੇਤ ਦੀ ਨਿਗਰਾਨੀ ਵਧਾਓ ਅਤੇ ਨੇੜਲੇ ਪੌਦਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।",
    pestTrap: "ਕੀੜੇ ਟਰੈਪ ਸੰਕੇਤ",
    pestTrapText:
      "ਨਮੂਨਾ ਸੈਂਸਰ ਫੀਡ ਵਧੀ ਹੋਈ ਕੀੜੇ ਦੀ ਗਤੀਵਿਧੀ ਦਰਸਾਉਂਦੀ ਹੈ।",
    nextUpdate: "ਅਗਲਾ ਅੱਪਡੇਟ",
    nextUpdateText:
      "ਨਵੀਂ ਜਾਣਕਾਰੀ ਮਿਲਣ 'ਤੇ ਖਤਰੇ ਦੀ ਮੁੜ ਗਣਨਾ ਕੀਤੀ ਜਾਵੇਗੀ।",
    backToDiagnosis: "ਨਿਦਾਨ 'ਤੇ ਵਾਪਸ ਜਾਓ",

    hotspotsKicker: "ਭੂਗੋਲਿਕ ਜਾਣਕਾਰੀ",
    hotspotTitle: "ਰੋਗ ਹਾਟਸਪਾਟ",
    hotspotsDescription:
      "ਰਿਪੋਰਟ ਕੀਤੇ ਫਸਲ ਸਿਹਤ ਮਾਮਲੇ ਵੇਖੋ ਅਤੇ ਖੇਤ ਜਾਂਚ ਨੂੰ ਤਰਜੀਹ ਦਿਓ।",
    prototypeData: "ਪ੍ਰੋਟੋਟਾਈਪ ਡਾਟਾ",
    reportedClusters: "ਰਿਪੋਰਟ ਕੀਤੇ ਕਲੱਸਟਰ",
    highCritical: "ਉੱਚ / ਗੰਭੀਰ",
    affectedReports: "ਪ੍ਰਭਾਵਿਤ ਰਿਪੋਰਟਾਂ",
    fieldMap: "ਖੇਤ ਦਾ ਨਕਸ਼ਾ",
    reportedActivity: "ਰਿਪੋਰਟ ਕੀਤੀ ਰੋਗ ਗਤੀਵਿਧੀ",
    searchField: "ਖੇਤ ਖੋਜੋ",
    resetView: "ਨਕਸ਼ਾ ਰੀਸੈਟ",
    mapHint: "ਹਿਲਾਓ • ਜ਼ੂਮ ਕਰੋ • ਹਾਟਸਪਾਟ ਦਬਾਓ",
    recentReports: "ਹਾਲੀਆ ਰਿਪੋਰਟਾਂ",
    priorityAreas: "ਤਰਜੀਹੀ ਖੇਤਰ",
    reportedCases: "ਰਿਪੋਰਟ ਕੀਤੇ ਕੇਸ",
    mapRisk: "ਖਤਰਾ",
    mapReports: "ਰਿਪੋਰਟਾਂ",
    hotspotValidation:
      "ਪ੍ਰੋਟੋਟਾਈਪ ਹਾਟਸਪਾਟ ਰਿਕਾਰਡ ਪ੍ਰਦਰਸ਼ਨ ਲਈ ਹਨ।",
    critical: "ਗੰਭੀਰ",
    high: "ਉੱਚ",
    medium: "ਦਰਮਿਆਨਾ",
    low: "ਘੱਟ",

    advisoriesKicker: "ਕਿਸਾਨ ਕਾਰਵਾਈ ਕੇਂਦਰ",
    advisoriesTitle: "ਫਸਲ ਸਲਾਹ",
    advisoriesDescription:
      "AI ਨਿਦਾਨ ਨੂੰ ਸਪਸ਼ਟ ਅਗਲੇ ਕਦਮਾਂ ਅਤੇ ਨਿਗਰਾਨੀ ਮਾਰਗਦਰਸ਼ਨ ਵਿੱਚ ਬਦਲੋ।",
    aiAssisted: "AI-ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਮਾਰਗਦਰਸ਼ਨ",
    currentCondition: "ਮੌਜੂਦਾ ਸਥਿਤੀ",
    noDiagnosis: "ਅਜੇ ਨਿਦਾਨ ਨਹੀਂ",
    status: "ਸਥਿਤੀ",
    immediateAction: "ਤੁਰੰਤ ਕਾਰਵਾਈ",
    whatToDoNow: "ਹੁਣ ਕੀ ਕਰਨਾ ਹੈ",
    prevention: "ਰੋਕਥਾਮ",
    reduceFutureRisk: "ਭਵਿੱਖ ਦਾ ਖਤਰਾ ਘਟਾਓ",
    monitoring: "ਨਿਗਰਾਨੀ",
    keepWatching: "ਨਜ਼ਰ ਰੱਖੋ",
    expertTitle:
      "AI-ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਮਾਰਗਦਰਸ਼ਨ — ਮਾਹਰ ਜਾਂਚ ਦੀ ਸਿਫਾਰਸ਼",
    expertText:
      "ਸਥਾਨਕ ਹਾਲਾਤ ਅਤੇ ਅਧਿਕਾਰਤ ਖੇਤੀਬਾੜੀ ਮਾਰਗਦਰਸ਼ਨ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ।",
    fieldRoutine: "ਖੇਤ ਰੁਟੀਨ",
    scoutConsistently: "ਨਿਯਮਿਤ ਜਾਂਚ ਕਰੋ",
    scoutText: "ਨਿਯਮਿਤ ਨਿਗਰਾਨੀ ਨਾਲ ਰੋਗ ਜਲਦੀ ਪਛਾਣਿਆ ਜਾ ਸਕਦਾ ਹੈ।",
    recordKeeping: "ਰਿਕਾਰਡ ਰੱਖਣਾ",
    captureLocation: "ਸਥਾਨ ਦਰਜ ਕਰੋ",
    recordText: "ਹਾਟਸਪਾਟ ਮੈਪਿੰਗ ਲਈ ਖੇਤ ਰਿਪੋਰਟਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    escalation: "ਮਾਹਰ ਸਹਾਇਤਾ",
    askExpert: "ਮਾਹਰ ਨੂੰ ਪੁੱਛੋ",
    escalationText: "ਅਨਿਸ਼ਚਿਤ ਮਾਮਲੇ ਮਾਹਰ ਨੂੰ ਭੇਜੋ।",

    errors: {
      prediction: "ਨਿਦਾਨ ਅਸਫਲ ਹੋਇਆ",
      server: "AI ਸਰਵਰ ਨਾਲ ਕਨੈਕਟ ਨਹੀਂ ਹੋ ਸਕਿਆ।",
    },

    footer: "ਹੋਰ ਸਮਾਰਟ ਅਤੇ ਸੁਰੱਖਿਅਤ ਖੇਤੀ ਲਈ",
  },
};

/* =========================================================
   DISEASE TRANSLATION
========================================================= */

const translateDiseaseName = (name, language) => {
  if (!name) return "";

  const cleanName = name
    .replace("Tomato___", "")
    .replaceAll("_", " ")
    .toLowerCase();

  if (cleanName.includes("early blight")) {
    const values = {
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
    };

    return values[language] || values.en;
  }

  if (cleanName.includes("late blight")) {
    const values = {
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
    };

    return values[language] || values.en;
  }

  if (cleanName.includes("leaf mold")) {
    const values = {
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
    };

    return values[language] || values.en;
  }

  if (cleanName.includes("healthy")) {
    const values = {
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
    };

    return values[language] || values.en;
  }

  return name;
};

/* =========================================================
   RISK LEVEL TRANSLATION
========================================================= */

const localizeLevel = (value, language) => {
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

  return maps[language]?.[value] || value;
};

/* =========================================================
   MAP RESET VIEW
========================================================= */

function MapResetView({
  center,
  zoom,
  label,
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
    });
  }, [map, center, zoom]);

  const reset = () => {
    map.setView(center, zoom, {
      animate: true,
    });
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
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [activePage, setActivePage] =
    useState("diagnosis");

  const [language, setLanguage] =
    useState("mr");

  const [showLanguageMenu, setShowLanguageMenu] =
    useState(false);

  /* =======================================================
     MAHARASHTRA DISTRICTS
  ======================================================= */

  const [selectedDistrict, setSelectedDistrict] =
    useState("Pune");

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
      center: [16.7050, 74.2433],
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
      center: [19.0948, 74.7480],
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
     TRANSLATION FALLBACK
  ======================================================= */

  const t = {
    ...translations.en,
    ...(translations[language] || {}),
  };

  /* =======================================================
     API
  ======================================================= */

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";

  /* =======================================================
     LANGUAGE EFFECT
  ======================================================= */

  useEffect(() => {
    document.documentElement.lang =
      language;
  }, [language]);

  /* =======================================================
     FILE PICKER
  ======================================================= */

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  /* =======================================================
     IMAGE SELECTION
  ======================================================= */

  const handleImageSelect = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith("image/")
    ) {
      setError(
        "Please select a valid image file."
      );
      return;
    }

    setError("");
    setResult(null);

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);

    await analyzeImage(file);

    event.target.value = "";
  };

  /* =======================================================
     AI PREDICTION
  ======================================================= */

  const analyzeImage = async (
    file
  ) => {
    setLoading(true);

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
          const errorData =
            await response.json();

          message =
            errorData.detail ||
            message;
        } catch {
          // Keep default message.
        }

        throw new Error(message);
      }

      const data =
        await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        t.errors.server
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     DISEASE INFO
  ======================================================= */

  const getDiseaseInfo = (
    disease
  ) => {
    const name =
      disease
        ?.replace(
          "Tomato___",
          ""
        )
        ?.replaceAll(
          "_",
          " "
        )
        ?.toLowerCase();

    if (
      name?.includes(
        "early blight"
      )
    ) {
      return {
        severity: "Moderate",
        severityLevel: 2,
        risk: "Medium",

        action:
          "Remove visibly affected leaves and monitor nearby plants closely.",

        advice:
          "Improve airflow around plants, avoid prolonged leaf wetness, and follow locally approved crop-protection guidance.",
      };
    }

    if (
      name?.includes(
        "late blight"
      )
    ) {
      return {
        severity: "High",
        severityLevel: 3,
        risk: "High",

        action:
          "Isolate affected plants and inspect surrounding plants immediately.",

        advice:
          "Monitor the crop frequently and follow locally approved disease-management recommendations.",
      };
    }

    if (
      name?.includes(
        "leaf mold"
      )
    ) {
      return {
        severity: "Moderate",
        severityLevel: 2,
        risk: "Medium",

        action:
          "Remove severely affected leaves and improve ventilation.",

        advice:
          "Reduce prolonged humidity around foliage and monitor new growth for further symptoms.",
      };
    }

    if (
      name?.includes(
        "healthy"
      )
    ) {
      return {
        severity: "Low",
        severityLevel: 1,
        risk: "Low",

        action:
          "Continue regular crop monitoring.",

        advice:
          "The uploaded image appears healthy. Continue good irrigation, nutrition, and field hygiene practices.",
      };
    }

    return {
      severity: "Unknown",
      severityLevel: 0,
      risk: "Review",

      action:
        "Send the case for expert validation.",

      advice:
        "The AI could not confidently determine the condition. Capture a clearer image and consult an agriculture expert.",
    };
  };

  const diseaseInfo =
    result
      ? getDiseaseInfo(
          result.class
        )
      : null;

  /* =======================================================
     VOICE ADVISORY
  ======================================================= */

  const speakAdvice = () => {
    if (
      !result ||
      typeof window ===
        "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const info =
      getDiseaseInfo(
        result.class
      );

    const diseaseName =
      translateDiseaseName(
        result.class,
        language
      );

    const text = `
      CropShield diagnosis.
      Detected condition: ${diseaseName}.
      Confidence: ${result.confidence} percent.
      Risk level: ${localizeLevel(
        info.risk,
        language
      )}.
      Recommended action: ${info.action}.
      Advisory: ${info.advice}.
    `;

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    const activeLanguage =
      languages.find(
        (item) =>
          item.code === language
      );

    utterance.lang =
      activeLanguage?.voice ||
      "en-IN";

    utterance.rate = 0.9;

    utterance.onstart = () =>
      setSpeaking(true);

    utterance.onend = () =>
      setSpeaking(false);

    utterance.onerror = () =>
      setSpeaking(false);

    window.speechSynthesis.speak(
      utterance
    );
  };

  /* =======================================================
     ADVISORY DATA
  ======================================================= */

  const getAdvisoryInfo = (
    disease
  ) => {
    const name =
      disease
        ?.replace(
          "Tomato___",
          ""
        )
        ?.replaceAll(
          "_",
          " "
        )
        ?.toLowerCase();

    if (
      name?.includes(
        "early blight"
      )
    ) {
      return {
        title:
          "Early Blight Advisory",

        urgency:
          "Monitor closely",

        summary:
          "The AI detected a pattern consistent with Early Blight. Confirm symptoms in the field before taking operational action.",

        immediate: [
          "Inspect nearby tomato plants for similar symptoms.",
          "Remove visibly affected foliage and keep the field area clean.",
          "Improve airflow and avoid prolonged leaf wetness where practical.",
        ],

        prevention: [
          "Continue regular crop scouting.",
          "Track new symptoms and affected plant areas.",
          "Use locally approved crop-management guidance when treatment decisions are needed.",
        ],

        monitoring:
          "Recheck the crop regularly and seek expert validation if symptoms spread rapidly.",
      };
    }

    if (
      name?.includes(
        "late blight"
      )
    ) {
      return {
        title:
          "Late Blight Advisory",

        urgency:
          "Priority inspection",

        summary:
          "The AI detected a pattern consistent with Late Blight. Because disease spread can be rapid, prioritize field inspection and expert confirmation.",

        immediate: [
          "Inspect surrounding plants and nearby field sections promptly.",
          "Separate or flag visibly affected plants for closer inspection.",
          "Follow locally approved disease-management guidance after confirmation.",
        ],

        prevention: [
          "Increase scouting frequency during favorable conditions.",
          "Monitor field areas with persistent moisture or humidity.",
          "Record new cases to support hotspot and risk tracking.",
        ],

        monitoring:
          "Escalate for expert review if affected areas increase or symptoms become widespread.",
      };
    }

    if (
      name?.includes(
        "leaf mold"
      )
    ) {
      return {
        title:
          "Leaf Mold Advisory",

        urgency:
          "Monitor closely",

        summary:
          "The AI detected a pattern consistent with Leaf Mold. Focus on ventilation, moisture management, and continued scouting.",

        immediate: [
          "Inspect the underside and nearby foliage for additional symptoms.",
          "Remove severely affected leaves where appropriate.",
          "Improve ventilation around the crop canopy.",
        ],

        prevention: [
          "Avoid prolonged moisture on foliage.",
          "Keep monitoring new growth after corrective field actions.",
          "Use locally approved agricultural guidance for further management.",
        ],

        monitoring:
          "Recheck high-humidity sections of the field and validate uncertain cases with an expert.",
      };
    }

    if (
      name?.includes(
        "healthy"
      )
    ) {
      return {
        title:
          "Healthy Crop Advisory",

        urgency:
          "Routine monitoring",

        summary:
          "The AI found no strong visual indication of the four trained disease classes in this image.",

        immediate: [
          "Continue regular crop scouting.",
          "Maintain good irrigation and field hygiene practices.",
          "Capture another image if new symptoms appear.",
        ],

        prevention: [
          "Watch new growth for changes.",
          "Track crop conditions through the season.",
          "Use local agricultural guidance when unusual symptoms appear.",
        ],

        monitoring:
          "Routine observation remains appropriate; recheck the crop after major weather or field-condition changes.",
      };
    }

    return {
      title:
        "Expert Review Advisory",

      urgency:
        "Review required",

      summary:
        "The AI result should be reviewed by an agriculture expert before operational decisions are made.",

      immediate: [
        "Capture a clearer image with the affected area centered.",
        "Inspect nearby plants for similar symptoms.",
        "Record the location and crop stage for follow-up.",
      ],

      prevention: [
        "Continue routine crop monitoring.",
        "Avoid making treatment decisions from an uncertain AI result alone.",
        "Use locally approved agricultural guidance.",
      ],

      monitoring:
        "Repeat the diagnosis with a clearer image and seek expert validation when uncertainty remains.",
    };
  };

  const advisoryInfo =
    result
      ? getAdvisoryInfo(
          result.class
        )
      : {
          title:
            "Crop Advisory Center",

          urgency:
            "Awaiting diagnosis",

          summary:
            "Upload a leaf image first. CropShield will tailor this advisory to the detected condition.",

          immediate: [
            "Upload a clear crop-leaf image.",
            "Wait for the AI diagnosis.",
            "Review the advisory before field action.",
          ],

          prevention: [
            "Scout crops regularly.",
            "Capture clear images when symptoms appear.",
            "Use expert confirmation for uncertain cases.",
          ],

          monitoring:
            "No diagnosis is available yet.",
        };

  const currentAdvisory =
    advisoryInfo;

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

    temperature: "28°C",
    humidity: "84%",
    rainfall: "32 mm",
    pestActivity: "High",
    cropStage: "Flowering",
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

  const getDayLabel = (
    day
  ) => {
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

      kn: {
        Today: "ಇಂದು",
        Tue: "ಮಂಗಳ",
        Wed: "ಬುಧ",
        Thu: "ಗುರು",
        Fri: "ಶುಕ್ರ",
        Sat: "ಶನಿ",
        Sun: "ಭಾನು",
      },

      gu: {
        Today: "આજે",
        Tue: "મંગળ",
        Wed: "બુધ",
        Thu: "ગુરુ",
        Fri: "શુક્ર",
        Sat: "શનિ",
        Sun: "રવિ",
      },

      ta: {
        Today: "இன்று",
        Tue: "செவ்",
        Wed: "புத",
        Thu: "வியா",
        Fri: "வெள்",
        Sat: "சனி",
        Sun: "ஞாயி",
      },

      bn: {
        Today: "আজ",
        Tue: "মঙ্গল",
        Wed: "বুধ",
        Thu: "বৃহস্পতি",
        Fri: "শুক্র",
        Sat: "শনি",
        Sun: "রবি",
      },

      ml: {
        Today: "ഇന്ന്",
        Tue: "ചൊവ്വ",
        Wed: "ബുധൻ",
        Thu: "വ്യാഴം",
        Fri: "വെള്ളി",
        Sat: "ശനി",
        Sun: "ഞായർ",
      },

      pa: {
        Today: "ਅੱਜ",
        Tue: "ਮੰਗਲ",
        Wed: "ਬੁੱਧ",
        Thu: "ਵੀਰ",
        Fri: "ਸ਼ੁੱਕਰ",
        Sat: "ਸ਼ਨੀ",
        Sun: "ਐਤ",
      },
    };

    return (
      labels[language]?.[day] ||
      labels.en[day]
    );
  };

  /* =======================================================
     MAHARASHTRA HOTSPOT CENTER
  ======================================================= */

  const hotspotCenter =
    maharashtraDistricts[
      selectedDistrict
    ].center;

  const hotspotZoom =
    maharashtraDistricts[
      selectedDistrict
    ].zoom;

  /* =======================================================
     HOTSPOT DATA
  ======================================================= */

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

      level: "High",

      count: 18,

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

      level: "Critical",

      count: 31,

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

      level: "Medium",

      count: 11,

      lat:
        hotspotCenter[0] +
        0.040,

      lng:
        hotspotCenter[1] -
        0.020,
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

      level: "Medium",

      count: 8,

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
        language === "mr"
          ? "निरोगी / निरीक्षण"
          : language === "hi"
          ? "स्वस्थ / निगरानी"
          : language === "te"
          ? "ఆరోగ్యకరమైన / పర్యవేక్షణ"
          : language === "kn"
          ? "ಆರೋಗ್ಯಕರ / ಮೇಲ್ವಿಚಾರಣೆ"
          : language === "gu"
          ? "સ્વસ્થ / દેખરેખ"
          : language === "ta"
          ? "ஆரோக்கியமான / கண்காணிப்பு"
          : language === "bn"
          ? "সুস্থ / পর্যবেক্ষণ"
          : language === "ml"
          ? "ആരോഗ്യമുള്ള / നിരീക്ഷണം"
          : language === "pa"
          ? "ਤੰਦਰੁਸਤ / ਨਿਗਰਾਨੀ"
          : "Healthy / Monitoring",

      level: "Low",

      count: 5,

      lat:
        hotspotCenter[0] +
        0.050,

      lng:
        hotspotCenter[1] +
        0.025,
    },
  ];

  const getHotspotClass = (
    level
  ) => {
    if (
      level === "Critical"
    ) {
      return "critical";
    }

    if (
      level === "High"
    ) {
      return "high";
    }

    if (
      level === "Medium"
    ) {
      return "medium";
    }

    return "low";
  };

  const getHotspotLabel = (
    level
  ) => {
    if (
      level === "Critical"
    ) {
      return t.critical;
    }

    if (
      level === "High"
    ) {
      return t.high;
    }

    if (
      level === "Medium"
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
              onClick={openFilePicker}
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
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={
                handleImageSelect
              }
              style={{
                display: "none",
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
                  src={preview}
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
                        {t.severity}
                      </span>

                      <strong>
                        {localizeLevel(
                          diseaseInfo.severity,
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
                          diseaseInfo.risk,
                          language
                        )}
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
                      {t.cropHealthStatus}
                    </span>

                    <span>
                      {localizeLevel(
                        diseaseInfo.severity,
                        language
                      )}
                    </span>

                  </div>


                  <div className="severity-bars">

                    {[1, 2, 3].map(
                      (level) => (

                        <div
                          key={level}
                          className={`severity-bar ${
                            level <=
                            diseaseInfo.severityLevel
                              ? "filled"
                              : ""
                          }`}
                        ></div>

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
                      {t.recommendedAction}
                    </span>

                    <h4>
                      {t.whatShouldIDo}
                    </h4>

                    <p>
                      {diseaseInfo.action}
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
                      {t.cropAdvisory}
                    </span>

                  </div>

                  <p>
                    {diseaseInfo.advice}
                  </p>

                </div>

              )}


            {result && (

              <button
                className="voice-btn"
                onClick={speakAdvice}
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
              disabled={loading}
            >

              {loading ? (

                <>
                  <LoaderCircle
                    size={18}
                    className="spin"
                  />

                  {t.analyzingButton}
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
                Visualize confirmed disease
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
                  (item) => (

                    <div
                      className="chart-column"
                      key={item.day}
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

          <div className="forecast-card action-card">

            <div className="feature-icon">
              <Sprout />
            </div>

            <h3>
              {t.recommendedActionRisk}
            </h3>

            <p>
              {t.recommendedActionText}
            </p>

          </div>


          <div className="forecast-card action-card">

            <div className="feature-icon">
              <Bug />
            </div>

            <h3>
              {t.pestTrap}
            </h3>

            <p>
              {t.pestTrapText}
            </p>

          </div>


          <div className="forecast-card action-card">

            <div className="feature-icon">
              <Activity />
            </div>

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
              {currentAdvisory.summary}
            </p>

          </div>


          <div className="advisory-status-side">

            <span>
              {t.status}
            </span>

            <strong>
              {currentAdvisory.urgency}
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

              {currentAdvisory.immediate.map(
                (item, index) => (

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

              {currentAdvisory.prevention.map(
                (item, index) => (

                  <div
                    className="advisory-step"
                    key={`${item}-${index}`}
                  >

                    <span>
                      ✓
                    </span>

                    <p>
                      {item}
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
              {t.monitoring}
            </span>

            <h3>
              {t.keepWatching}
            </h3>

            <p>
              {currentAdvisory.monitoring}
            </p>


            <button
              className="voice-btn advisory-voice-btn"
              onClick={
                speakAdvice
              }
              disabled={!result}
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


          <div className="mini-advisory-card">

            <Users
              size={19}
            />

            <div>

              <span>
                {t.escalation}
              </span>

              <strong>
                {t.askExpert}
              </strong>

              <p>
                {t.escalationText}
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

                  gap: "10px",

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
                  aria-label="Select Maharashtra district"
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
     FINAL RETURN
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
              {language === "mr"
                ? "AI पीक बुद्धिमत्ता"
                : language === "hi"
                ? "AI फसल बुद्धिमत्ता"
                : language === "te"
                ? "AI పంట మేధస్సు"
                : language === "kn"
                ? "AI ಬೆಳೆ ಬುದ್ಧಿಮತ್ತೆ"
                : language === "gu"
                ? "AI પાક બુદ્ધિ"
                : language === "ta"
                ? "AI பயிர் நுண்ணறிவு"
                : language === "bn"
                ? "AI ফসল বুদ্ধিমত্তা"
                : language === "ml"
                ? "AI വിള ബുദ്ധിശക്തി"
                : language === "pa"
                ? "AI ਫਸਲ ਬੁੱਧੀ"
                : "AI Crop Intelligence"}
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
            {t.diagnosis}
          </button>


          <button
            className={`nav-link ${
              activePage === "risk"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "risk"
              )
            }
          >
            {t.risk}
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
            {t.hotspots}
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
            {t.advisories}
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
                (value) =>
                  !value
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
                  "0.2s ease",
              }}
            />

          </button>


          {showLanguageMenu && (

            <div className="language-menu">

              {languages.map(
                (item) => (

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

                      setShowLanguageMenu(
                        false
                      );

                    }}
                  >

                    <span>
                      {item.native}
                    </span>

                    <small>
                      {item.name}
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

            {language === "mr"
              ? "स्मार्ट कृषी बुद्धिमत्ता"
              : language === "hi"
              ? "स्मार्ट कृषि बुद्धिमत्ता"
              : language === "te"
              ? "స్మార్ట్ వ్యవసాయ మేధస్సు"
              : language === "kn"
              ? "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಬುದ್ಧಿಮತ್ತೆ"
              : language === "gu"
              ? "સ્માર્ટ કૃષિ બુદ્ધિ"
              : language === "ta"
              ? "ஸ்மார்ட் விவசாய நுண்ணறிவு"
              : language === "bn"
              ? "স্মার্ট কৃষি বুদ্ধিমত্তা"
              : language === "ml"
              ? "സ്മാർട്ട് കാർഷിക ബുദ്ധിശക്തി"
              : language === "pa"
              ? "ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਬੁੱਧੀ"
              : "Smart agriculture intelligence"}

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