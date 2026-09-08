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

    riskTitle: "Crop Risk Forecast",
    overallRisk: "OVERALL RISK",
    currentConditions: "CURRENT CONDITIONS",
    fieldEnvironment: "Field Environment",
    earlyWarning: "EARLY WARNING",

    hotspotTitle: "Disease Hotspots",
    advisoriesTitle: "Crop Advisories",

    riskKicker: "EARLY WARNING SYSTEM",
    riskDescription: "Prototype risk estimate for",
    sevenDayOutlook: "7-DAY OUTLOOK",
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",
    pestActivity: "Pest activity",
    cropStage: "Crop stage",
    warningTitle: "Conditions are favorable for disease development.",
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

    footer: "Built for smarter, safer farming",
  },

  mr: {
    hotspotsKicker: "भौगोलिक माहिती",
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
healthyMonitoring: "निरोगी / निरीक्षण",
critical: "गंभीर",
high: "उच्च",
medium: "मध्यम",
low: "कमी",

advisoriesKicker: "शेतकरी कृती केंद्र",
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
scoutText: "नियमित निरीक्षणामुळे रोग लवकर ओळखता येतो.",
recordKeeping: "नोंद ठेवणे",
captureLocation: "स्थान नोंदवा",
recordText: "फील्ड अहवाल हॉटस्पॉट नकाशासाठी वापरा.",
escalation: "तज्ज्ञ मदत",
askExpert: "तज्ज्ञांचा सल्ला घ्या",
escalationText:
  "अनिश्चित किंवा वाढणारी प्रकरणे तज्ज्ञांकडे पाठवा.",
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

    riskTitle: "पीक जोखीम अंदाज",
    overallRisk: "एकूण जोखीम",
    currentConditions: "सध्याची परिस्थिती",
    fieldEnvironment: "शेतातील परिस्थिती",
    earlyWarning: "पूर्वसूचना",

    hotspotTitle: "रोग हॉटस्पॉट्स",
    advisoriesTitle: "पीक सल्ला",

    riskKicker: "पूर्व चेतावणी प्रणाली",
    riskDescription: "यासाठी नमुना जोखीम अंदाज:",
    sevenDayOutlook: "७-दिवसांचा अंदाज",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "पर्जन्यमान",
    pestActivity: "कीड क्रियाशीलता",
    cropStage: "पिकाची अवस्था",
    warningTitle: "रोगाच्या वाढीसाठी सध्याची परिस्थिती अनुकूल आहे.",
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

    riskTitle: "फसल जोखिम पूर्वानुमान",
    overallRisk: "कुल जोखिम",
    currentConditions: "वर्तमान स्थिति",
    fieldEnvironment: "खेत का वातावरण",
    earlyWarning: "पूर्व चेतावनी",

    hotspotTitle: "रोग हॉटस्पॉट",
    advisoriesTitle: "फसल सलाह",

    riskKicker: "पूर्व चेतावनी प्रणाली",
    riskDescription: "इसके लिए प्रोटोटाइप जोखिम अनुमान:",
    sevenDayOutlook: "7-दिन का पूर्वानुमान",
    temperature: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा",
    pestActivity: "कीट गतिविधि",
    cropStage: "फसल अवस्था",
    warningTitle: "मौजूदा परिस्थितियाँ रोग विकास के लिए अनुकूल हैं।",
    warningText:
      "यह प्रोटोटाइप जोखिम इंजन पर्यावरणीय परिस्थितियों, फसल अवस्था और कीट गतिविधि को मिलाकर संभावित प्रकोपों को प्राथमिकता देता है।",
    recommendedActionRisk: "अनुशंसित कार्रवाई",
    recommendedActionText:
      "खेत की निगरानी बढ़ाएं, आसपास के पौधों का निरीक्षण करें, और उचित एकीकृत कीट प्रबंधन दिशानिर्देशों का पालन करें।",
    pestTrap: "कीट ट्रैप संकेत",
    pestTrapText:
      "प्रोटोटाइप सेंसर फीड निगरानी क्षेत्र में बढ़ी हुई कीट गतिविधि दिखाता है।",
    nextUpdate: "अगला अपडेट",
    nextUpdateText:
      "नए मौसम, फसल-अवस्था, या कीट अवलोकन मिलने पर जोखिम की पुनर्गणना की जानी चाहिए।",
    backToDiagnosis: "निदान पर वापस जाएं",

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

    riskTitle: "పంట ప్రమాద అంచనా",
    overallRisk: "మొత్తం ప్రమాదం",
    currentConditions: "ప్రస్తుత పరిస్థితులు",
    fieldEnvironment: "పొల వాతావరణం",
    earlyWarning: "ముందస్తు హెచ్చరిక",

    hotspotTitle: "వ్యాధి హాట్‌స్పాట్‌లు",
    advisoriesTitle: "పంట సలహాలు",

    riskKicker: "ముందస్తు హెచ్చరిక వ్యవస్థ",
    riskDescription: "దీని కోసం నమూనా ప్రమాద అంచనా:",
    sevenDayOutlook: "7-రోజుల అంచనా",
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    rainfall: "వర్షపాతం",
    pestActivity: "పురుగు కార్యకలాపం",
    cropStage: "పంట దశ",
    warningTitle: "ప్రస్తుత పరిస్థితులు వ్యాధి అభివృద్ధికి అనుకూలంగా ఉన్నాయి.",
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

    riskTitle: "ಬೆಳೆ ಅಪಾಯದ ಮುನ್ಸೂಚನೆ",
    overallRisk: "ಒಟ್ಟು ಅಪಾಯ",
    currentConditions: "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳು",
    fieldEnvironment: "ಹೊಲದ ಪರಿಸರ",
    earlyWarning: "ಮುನ್ನೆಚ್ಚರಿಕೆ",

    hotspotTitle: "ರೋಗ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",
    advisoriesTitle: "ಬೆಳೆ ಸಲಹೆಗಳು",

    riskKicker: "ಮುನ್ನೆಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ",
    riskDescription: "ಇದಕ್ಕಾಗಿ ಮಾದರಿ ಅಪಾಯ ಅಂದಾಜು:",
    sevenDayOutlook: "7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
    temperature: "ಉಷ್ಣತೆ",
    humidity: "ಆರ್ದ್ರತೆ",
    rainfall: "ಮಳೆ",
    pestActivity: "ಕೀಟ ಚಟುವಟಿಕೆ",
    cropStage: "ಬೆಳೆ ಹಂತ",
    warningTitle: "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳು ರೋಗ ಬೆಳವಣಿಗೆಗೆ ಅನುಕೂಲಕರವಾಗಿವೆ.",
    warningText:
      "ಈ ಮಾದರಿ ಅಪಾಯ ಎಂಜಿನ್ ಪರಿಸರ ಪರಿಸ್ಥಿತಿಗಳು, ಬೆಳೆ ಹಂತ ಮತ್ತು ಕೀಟ ಚಟುವಟಿಕೆಯನ್ನು ಸಂಯೋಜಿಸಿ ಸಂಭಾವ್ಯ ಏಕಾಏಕಿಗಳಿಗೆ ಆದ್ಯತೆ ನೀಡುತ್ತದೆ.",
    recommendedActionRisk: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
    recommendedActionText:
      "ಹೊಲದ ಮೇಲ್ವಿಚಾರಣೆ ಹೆಚ್ಚಿಸಿ, ಹತ್ತಿರದ ಸಸ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸೂಕ್ತ ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣಾ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಅನುಸರಿಸಿ.",
    pestTrap: "ಕೀಟ ಬಲೆ ಸಂಕೇತ",
    pestTrapText:
      "ಮಾದರಿ ಸೆನ್ಸಾರ್ ಫೀಡ್ ಮೇಲ್ವಿಚಾರಣೆ ಪ್ರದೇಶದಲ್ಲಿ ಹೆಚ್ಚಿದ ಕೀಟ ಚಟುವಟಿಕೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    nextUpdate: "ಮುಂದಿನ ನವೀಕರಣ",
    nextUpdateText:
      "ಹೊಸ ಹವಾಮಾನ, ಬೆಳೆ-ಹಂತ ಅಥವಾ ಕೀಟ ಅವಲೋಕನಗಳು ಬಂದಾಗ ಅಪಾಯವನ್ನು ಮರು ಲೆಕ್ಕಾಚಾರ ಮಾಡಬೇಕು.",
    backToDiagnosis: "ರೋಗನಿರ್ಣಯಕ್ಕೆ ಹಿಂತಿರುಗಿ",

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

    riskTitle: "પાક જોખમ આગાહી",
    overallRisk: "કુલ જોખમ",
    currentConditions: "વર્તમાન પરિસ્થિતિ",
    fieldEnvironment: "ખેતરનું વાતાવરણ",
    earlyWarning: "પૂર્વ ચેતવણી",

    hotspotTitle: "રોગ હોટસ્પોટ્સ",
    advisoriesTitle: "પાક સલાહ",

    riskKicker: "પૂર્વ ચેતવણી પ્રણાલી",
    riskDescription: "આ માટે નમૂના જોખમ અંદાજ:",
    sevenDayOutlook: "7-દિવસનો અંદાજ",
    temperature: "તાપમાન",
    humidity: "ભેજ",
    rainfall: "વરસાદ",
    pestActivity: "જીવાત પ્રવૃત્તિ",
    cropStage: "પાકનો તબક્કો",
    warningTitle: "હાલની પરિસ્થિતિઓ રોગ વિકાસ માટે અનુકૂળ છે.",
    warningText:
      "આ નમૂના જોખમ એન્જિન પર્યાવરણીય પરિસ્થિતિઓ, પાકનો તબક્કો અને જીવાત પ્રવૃત્તિને જોડીને સંભવિત ફાટી નીકળવાની બાબતોને પ્રાધાન્ય આપે છે.",
    recommendedActionRisk: "ભલામણ કરેલ પગલું",
    recommendedActionText:
      "ખેતરની દેખરેખ વધારો, નજીકના છોડની તપાસ કરો, અને યોગ્ય સંકલિત જીવાત વ્યવસ્થાપન માર્ગદર્શિકાનું પાલન કરો.",
    pestTrap: "જીવાત ટ્રેપ સંકેત",
    pestTrapText:
      "નમૂના સેન્સર ફીડ દેખરેખ વિસ્તારમાં વધેલી જીવાત પ્રવૃત્તિ દર્શાવે છે.",
    nextUpdate: "આગલું અપડેટ",
    nextUpdateText:
      "નવું હવામાન, પાક-તબક્કો અથવા જીવાત અવલોકનો મળે ત્યારે જોખમની ફરી ગણતરી કરવી જોઈએ.",
    backToDiagnosis: "નિદાન પર પાછા જાઓ",

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

    riskTitle: "பயிர் ஆபத்து கணிப்பு",
    overallRisk: "மொத்த ஆபத்து",
    currentConditions: "தற்போதைய நிலை",
    fieldEnvironment: "வயல் சூழல்",
    earlyWarning: "முன்னெச்சரிக்கை",

    hotspotTitle: "நோய் ஹாட்ஸ்பாட்கள்",
    advisoriesTitle: "பயிர் ஆலோசனைகள்",

    riskKicker: "முன்னெச்சரிக்கை அமைப்பு",
    riskDescription: "இதற்கான முன்மாதிரி ஆபத்து மதிப்பீடு:",
    sevenDayOutlook: "7-நாள் முன்னறிவிப்பு",
    temperature: "வெப்பநிலை",
    humidity: "ஈரப்பதம்",
    rainfall: "மழைப்பொழிவு",
    pestActivity: "பூச்சி செயல்பாடு",
    cropStage: "பயிர் நிலை",
    warningTitle: "தற்போதைய நிலைமைகள் நோய் வளர்ச்சிக்கு சாதகமாக உள்ளன.",
    warningText:
      "இந்த முன்மாதிரி ஆபத்து இயந்திரம் சுற்றுச்சூழல் நிலைமைகள், பயிர் நிலை மற்றும் பூச்சி செயல்பாட்டை இணைத்து சாத்தியமான பரவல்களுக்கு முன்னுரிமை அளிக்கிறது.",
    recommendedActionRisk: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    recommendedActionText:
      "வயல் கண்காணிப்பை அதிகரிக்கவும், அருகிலுள்ள செடிகளை ஆய்வு செய்யவும், பொருத்தமான ஒருங்கிணைந்த பூச்சி மேலாண்மை வழிகாட்டுதல்களைப் பின்பற்றவும்.",
    pestTrap: "பூச்சி பொறி சமிக்ஞை",
    pestTrapText:
      "முன்மாதிரி சென்சார் ஊட்டம் கண்காணிக்கப்படும் பகுதியில் அதிகரித்த பூச்சி செயல்பாட்டைக் காட்டுகிறது.",
    nextUpdate: "அடுத்த புதுப்பிப்பு",
    nextUpdateText:
      "புதிய வானிலை, பயிர்-நிலை அல்லது பூச்சி அவதானிப்புகள் கிடைக்கும்போது ஆபத்து மீண்டும் கணக்கிடப்பட வேண்டும்.",
    backToDiagnosis: "நோயறிதலுக்குத் திரும்பு",

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

    riskTitle: "ফসলের ঝুঁকি পূর্বাভাস",
    overallRisk: "মোট ঝুঁকি",
    currentConditions: "বর্তমান পরিস্থিতি",
    fieldEnvironment: "ক্ষেতের পরিবেশ",
    earlyWarning: "প্রাথমিক সতর্কতা",

    hotspotTitle: "রোগের হটস্পট",
    advisoriesTitle: "ফসল পরামর্শ",

    riskKicker: "প্রাথমিক সতর্কতা ব্যবস্থা",
    riskDescription: "এর জন্য প্রোটোটাইপ ঝুঁকি অনুমান:",
    sevenDayOutlook: "৭-দিনের পূর্বাভাস",
    temperature: "তাপমাত্রা",
    humidity: "আর্দ্রতা",
    rainfall: "বৃষ্টিপাত",
    pestActivity: "পোকামাকড়ের কার্যকলাপ",
    cropStage: "ফসলের পর্যায়",
    warningTitle: "বর্তমান পরিস্থিতি রোগ বিকাশের জন্য অনুকূল।",
    warningText:
      "এই প্রোটোটাইপ ঝুঁকি ইঞ্জিন পরিবেশগত পরিস্থিতি, ফসলের পর্যায় এবং পোকামাকড়ের কার্যকলাপকে একত্রিত করে সম্ভাব্য প্রাদুর্ভাবকে অগ্রাধিকার দেয়।",
    recommendedActionRisk: "প্রস্তাবিত পদক্ষেপ",
    recommendedActionText:
      "ক্ষেতের পর্যবেক্ষণ বাড়ান, আশেপাশের গাছ পরীক্ষা করুন এবং উপযুক্ত সমন্বিত পোকামাকড় ব্যবস্থাপনা নির্দেশিকা অনুসরণ করুন।",
    pestTrap: "পোকা ফাঁদ সংকেত",
    pestTrapText:
      "প্রোটোটাইপ সেন্সর ফিড পর্যবেক্ষণ এলাকায় বর্ধিত পোকামাকড়ের কার্যকলাপ নির্দেশ করে।",
    nextUpdate: "পরবর্তী আপডেট",
    nextUpdateText:
      "নতুন আবহাওয়া, ফসলের পর্যায়, বা পোকামাকড়ের পর্যবেক্ষণ পাওয়া গেলে ঝুঁকি পুনরায় গণনা করা উচিত।",
    backToDiagnosis: "নির্ণয়ে ফিরে যান",

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

    riskTitle: "വിള അപകട പ്രവചനം",
    overallRisk: "ആകെ അപകടം",
    currentConditions: "നിലവിലെ സാഹചര്യങ്ങൾ",
    fieldEnvironment: "വയൽ പരിസ്ഥിതി",
    earlyWarning: "മുൻകൂർ മുന്നറിയിപ്പ്",

    hotspotTitle: "രോഗ ഹോട്ട്‌സ്‌പോട്ടുകൾ",
    advisoriesTitle: "വിള ഉപദേശങ്ങൾ",

    riskKicker: "മുൻകൂർ മുന്നറിയിപ്പ് സംവിധാനം",
    riskDescription: "ഇതിനുള്ള മാതൃകാ അപകട അനുമാനം:",
    sevenDayOutlook: "7-ദിവസത്തെ പ്രവചനം",
    temperature: "താപനില",
    humidity: "ആർദ്രത",
    rainfall: "മഴ",
    pestActivity: "കീട പ്രവർത്തനം",
    cropStage: "വിള ഘട്ടം",
    warningTitle: "നിലവിലെ സാഹചര്യങ്ങൾ രോഗവളർച്ചയ്ക്ക് അനുകൂലമാണ്.",
    warningText:
      "ഈ മാതൃകാ റിസ്ക് എഞ്ചിൻ പാരിസ്ഥിതിക സാഹചര്യങ്ങൾ, വിള ഘട്ടം, കീട പ്രവർത്തനം എന്നിവ സംയോജിപ്പിച്ച് സാധ്യതയുള്ള വ്യാപനങ്ങൾക്ക് മുൻഗണന നൽകുന്നു.",
    recommendedActionRisk: "ശുപാർശ ചെയ്യുന്ന നടപടി",
    recommendedActionText:
      "വയൽ നിരീക്ഷണം വർദ്ധിപ്പിക്കുക, സമീപത്തെ ചെടികൾ പരിശോധിക്കുക, ഉചിതമായ സംയോജിത കീട നിയന്ത്രണ മാർഗ്ഗനിർദ്ദേശങ്ങൾ പിന്തുടരുക.",
    pestTrap: "കീട കെണി സിഗ്നൽ",
    pestTrapText:
      "മാതൃകാ സെൻസർ ഫീഡ് നിരീക്ഷിക്കുന്ന പ്രദേശത്ത് വർദ്ധിച്ച കീട പ്രവർത്തനം സൂചിപ്പിക്കുന്നു.",
    nextUpdate: "അടുത്ത അപ്ഡേറ്റ്",
    nextUpdateText:
      "പുതിയ കാലാവസ്ഥ, വിള-ഘട്ടം, അല്ലെങ്കിൽ കീട നിരീക്ഷണങ്ങൾ ലഭിക്കുമ്പോൾ അപകടസാധ്യത വീണ്ടും കണക്കാക്കണം.",
    backToDiagnosis: "രോഗനിർണയത്തിലേക്ക് മടങ്ങുക",

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

    riskTitle: "ਫਸਲ ਖਤਰੇ ਦੀ ਪੇਸ਼ਗੋਈ",
    overallRisk: "ਕੁੱਲ ਖਤਰਾ",
    currentConditions: "ਮੌਜੂਦਾ ਹਾਲਾਤ",
    fieldEnvironment: "ਖੇਤ ਦਾ ਵਾਤਾਵਰਣ",
    earlyWarning: "ਪਹਿਲਾਂ ਤੋਂ ਚੇਤਾਵਨੀ",

    hotspotTitle: "ਰੋਗ ਹਾਟਸਪਾਟ",
    advisoriesTitle: "ਫਸਲ ਸਲਾਹ",

    riskKicker: "ਪਹਿਲਾਂ ਤੋਂ ਚੇਤਾਵਨੀ ਪ੍ਰਣਾਲੀ",
    riskDescription: "ਇਸ ਲਈ ਨਮੂਨਾ ਖਤਰਾ ਅਨੁਮਾਨ:",
    sevenDayOutlook: "7-ਦਿਨਾਂ ਦੀ ਭਵਿੱਖਬਾਣੀ",
    temperature: "ਤਾਪਮਾਨ",
    humidity: "ਨਮੀ",
    rainfall: "ਬਾਰਿਸ਼",
    pestActivity: "ਕੀੜੇ ਦੀ ਗਤੀਵਿਧੀ",
    cropStage: "ਫਸਲ ਦਾ ਪੜਾਅ",
    warningTitle: "ਮੌਜੂਦਾ ਹਾਲਾਤ ਬਿਮਾਰੀ ਦੇ ਵਿਕਾਸ ਲਈ ਅਨੁਕੂਲ ਹਨ।",
    warningText:
      "ਇਹ ਨਮੂਨਾ ਖਤਰਾ ਇੰਜਣ ਵਾਤਾਵਰਣਕ ਹਾਲਾਤ, ਫਸਲ ਦੇ ਪੜਾਅ, ਅਤੇ ਕੀੜੇ ਦੀ ਗਤੀਵਿਧੀ ਨੂੰ ਜੋੜ ਕੇ ਸੰਭਾਵੀ ਪ੍ਰਕੋਪਾਂ ਨੂੰ ਤਰਜੀਹ ਦਿੰਦਾ ਹੈ।",
    recommendedActionRisk: "ਸਿਫਾਰਸ਼ੀ ਕਾਰਵਾਈ",
    recommendedActionText:
      "ਖੇਤ ਦੀ ਨਿਗਰਾਨੀ ਵਧਾਓ, ਨੇੜਲੇ ਪੌਦਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ, ਅਤੇ ਢੁਕਵੇਂ ਏਕੀਕ੍ਰਿਤ ਕੀਟ ਪ੍ਰਬੰਧਨ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।",
    pestTrap: "ਕੀੜੇ ਟਰੈਪ ਸੰਕੇਤ",
    pestTrapText:
      "ਨਮੂਨਾ ਸੈਂਸਰ ਫੀਡ ਨਿਗਰਾਨੀ ਖੇਤਰ ਵਿੱਚ ਵਧੀ ਹੋਈ ਕੀੜੇ ਦੀ ਗਤੀਵਿਧੀ ਦਰਸਾਉਂਦੀ ਹੈ।",
    nextUpdate: "ਅਗਲਾ ਅੱਪਡੇਟ",
    nextUpdateText:
      "ਨਵਾਂ ਮੌਸਮ, ਫਸਲ-ਪੜਾਅ, ਜਾਂ ਕੀੜੇ ਨਿਰੀਖਣ ਮਿਲਣ 'ਤੇ ਖਤਰੇ ਦੀ ਮੁੜ ਗਣਨਾ ਕੀਤੀ ਜਾਣੀ ਚਾਹੀਦੀ ਹੈ।",
    backToDiagnosis: "ਨਿਦਾਨ 'ਤੇ ਵਾਪਸ ਜਾਓ",

    footer: "ਹੋਰ ਸਮਾਰਟ ਅਤੇ ਸੁਰੱਖਿਅਤ ਖੇਤੀ ਲਈ",
  },
};


function MapResetView({ center, zoom }) {
  const map = useMap();

  const reset = () => {
    map.setView(center, zoom, { animate: true });
  };

  return (
    <button className="map-reset-btn" onClick={reset} type="button">
      <Navigation size={15} />
      Reset view
    </button>
  );
}


function App() {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [activePage, setActivePage] = useState("diagnosis");
  const [language, setLanguage] = useState("mr");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const t = {
    ...translations[language],
    diagnosisTitle: translations[language].diagnosisTitle || translations[language].diagnosis,
    scan: translations[language].scan || translations[language].analyzingLeaf,
    errors: translations[language].errors || {
      prediction: "Prediction failed",
      server:
        "Unable to connect to the AI server. Make sure the FastAPI backend is running.",
    },
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setResult(null);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    await analyzeImage(file);
  };

  const analyzeImage = async (file) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = t.errors.prediction;

        try {
          const errorData = await response.json();
          message = errorData.detail || message;
        } catch {
          // Keep default message.
        }

        throw new Error(message);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(t.errors.server);
    } finally {
      setLoading(false);
    }
  };

  const formatDisease = (name) => {
    if (!name) return "";

    return name
      .replace("Tomato___", "")
      .replaceAll("_", " ");
  };

  const translateDiseaseName = (name, lang) => {
    const cleanName = formatDisease(name).toLowerCase();

    if (cleanName.includes("early blight")) {
      return lang === "mr"
        ? "अर्ली ब्लाइट"
        : lang === "hi"
        ? "अर्ली ब्लाइट"
        : lang === "te"
        ? "ఎర్లీ బ్లైట్"
        : lang === "kn"
        ? "ಅರ್ಲಿ ಬ್ಲೈಟ್"
        : lang === "gu"
        ? "અર્લી બ્લાઈટ"
        : lang === "ta"
        ? "எர்லி ப்ளைட்"
        : lang === "bn"
        ? "আর্লি ব্লাইট"
        : lang === "ml"
        ? "ഏർലി ബ്ലൈറ്റ്"
        : lang === "pa"
        ? "ਅਰਲੀ ਬਲਾਈਟ"
        : "Early Blight";
    }

    if (cleanName.includes("late blight")) {
      return lang === "mr"
        ? "लेट ब्लाइट"
        : lang === "hi"
        ? "लेट ब्लाइट"
        : lang === "te"
        ? "లేట్ బ్లైట్"
        : lang === "kn"
        ? "ಲೇಟ್ ಬ್ಲೈಟ್"
        : lang === "gu"
        ? "લેટ બ્લાઈટ"
        : lang === "ta"
        ? "லேட் ப்ளைட்"
        : lang === "bn"
        ? "লেট ব্লাইট"
        : lang === "ml"
        ? "ലേറ്റ് ബ്ലൈറ്റ്"
        : lang === "pa"
        ? "ਲੇਟ ਬਲਾਈਟ"
        : "Late Blight";
    }

    if (cleanName.includes("leaf mold")) {
      return lang === "mr"
        ? "लीफ मोल्ड"
        : lang === "hi"
        ? "लीफ मोल्ड"
        : lang === "te"
        ? "లీఫ్ మోల్డ్"
        : lang === "kn"
        ? "ಲೀಫ್ ಮೋಲ್ಡ್"
        : lang === "gu"
        ? "લીફ મોલ્ડ"
        : lang === "ta"
        ? "லீஃப் மோல்ட்"
        : lang === "bn"
        ? "লিফ মোল্ড"
        : lang === "ml"
        ? "ലീഫ് മോൾഡ്"
        : lang === "pa"
        ? "ਲੀਫ ਮੋਲਡ"
        : "Leaf Mold";
    }

    if (cleanName.includes("healthy")) {
      return lang === "mr"
        ? "निरोगी"
        : lang === "hi"
        ? "स्वस्थ"
        : lang === "te"
        ? "ఆరోగ్యంగా ఉంది"
        : lang === "kn"
        ? "ಆರೋಗ್ಯಕರ"
        : lang === "gu"
        ? "સ્વસ્થ"
        : lang === "ta"
        ? "ஆரோக்கியமானது"
        : lang === "bn"
        ? "সুস্থ"
        : lang === "ml"
        ? "ആരോഗ്യമുണ്ട്"
        : lang === "pa"
        ? "ਤੰਦਰੁਸਤ"
        : "Healthy";
    }

    return cleanName;
  };

  const getDayLabel = (day) => {
    const labels = {
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

      en: {
        Today: "Today",
        Tue: "Tue",
        Wed: "Wed",
        Thu: "Thu",
        Fri: "Fri",
        Sat: "Sat",
        Sun: "Sun",
      },
    };

    return labels[language]?.[day] || labels.en[day];
  };

  const getDiseaseInfo = (disease) => {
    const name = formatDisease(disease).toLowerCase();

    if (name.includes("early blight")) {
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

    if (name.includes("late blight")) {
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

    if (name.includes("leaf mold")) {
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

    if (name.includes("healthy")) {
      return {
        severity: "Low",
        severityLevel: 1,
        risk: "Low",
        action: "Continue regular crop monitoring.",
        advice:
          "The uploaded image appears healthy. Continue good irrigation, nutrition, and field hygiene practices.",
      };
    }

    return {
      severity: "Unknown",
      severityLevel: 0,
      risk: "Review",
      action: "Send the case for expert validation.",
      advice:
        "The AI could not confidently determine the condition. Capture a clearer image and consult an agriculture expert.",
    };
  };

  const speakAdvice = () => {
    if (!result || !window.speechSynthesis) return;

    const info = getDiseaseInfo(result.class);

    const text = `
      CropShield diagnosis.
      Detected condition: ${translateDiseaseName(result.class, language)}.
      Confidence: ${result.confidence} percent.
      Risk level: ${info.risk}.
      Recommended action: ${info.action}.
      Advisory: ${info.advice}.
    `;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const activeLanguage = languages.find((item) => item.code === language);
    utterance.lang = activeLanguage?.voice || "en-IN";
    utterance.rate = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const diseaseInfo = result ? getDiseaseInfo(result.class) : null;

  const getAdvisoryInfo = (disease) => {
    const name = formatDisease(disease).toLowerCase();

    if (name.includes("early blight")) {
      return {
        title: "Early Blight Advisory",
        urgency: "Monitor closely",
        summary:
          "The AI detected a pattern consistent with Early Blight. Confirm symptoms in the field before taking operational action.",
        immediate: [
          "Inspect nearby tomato plants for similar symptoms.",
          "Remove visibly affected foliage and keep the field area clean.",
          "Improve airflow and avoid prolonged leaf wetness where practical."
        ],
        prevention: [
          "Continue regular crop scouting.",
          "Track new symptoms and affected plant areas.",
          "Use locally approved crop-management guidance when treatment decisions are needed."
        ],
        monitoring: "Recheck the crop regularly and seek expert validation if symptoms spread rapidly."
      };
    }

    if (name.includes("late blight")) {
      return {
        title: "Late Blight Advisory",
        urgency: "Priority inspection",
        summary:
          "The AI detected a pattern consistent with Late Blight. Because disease spread can be rapid, prioritize field inspection and expert confirmation.",
        immediate: [
          "Inspect surrounding plants and nearby field sections promptly.",
          "Separate or flag visibly affected plants for closer inspection.",
          "Follow locally approved disease-management guidance after confirmation."
        ],
        prevention: [
          "Increase scouting frequency during favorable conditions.",
          "Monitor field areas with persistent moisture or humidity.",
          "Record new cases to support hotspot and risk tracking."
        ],
        monitoring: "Escalate for expert review if affected areas increase or symptoms become widespread."
      };
    }

    if (name.includes("leaf mold")) {
      return {
        title: "Leaf Mold Advisory",
        urgency: "Monitor closely",
        summary:
          "The AI detected a pattern consistent with Leaf Mold. Focus on ventilation, moisture management, and continued scouting.",
        immediate: [
          "Inspect the underside and nearby foliage for additional symptoms.",
          "Remove severely affected leaves where appropriate.",
          "Improve ventilation around the crop canopy."
        ],
        prevention: [
          "Avoid prolonged moisture on foliage.",
          "Keep monitoring new growth after corrective field actions.",
          "Use locally approved agricultural guidance for further management."
        ],
        monitoring: "Recheck high-humidity sections of the field and validate uncertain cases with an expert."
      };
    }

    if (name.includes("healthy")) {
      return {
        title: "Healthy Crop Advisory",
        urgency: "Routine monitoring",
        summary:
          "The AI found no strong visual indication of the four trained disease classes in this image.",
        immediate: [
          "Continue regular crop scouting.",
          "Maintain good irrigation and field hygiene practices.",
          "Capture another image if new symptoms appear."
        ],
        prevention: [
          "Watch new growth for changes.",
          "Track crop conditions through the season.",
          "Use local agricultural guidance when unusual symptoms appear."
        ],
        monitoring: "Routine observation remains appropriate; recheck the crop after major weather or field-condition changes."
      };
    }

    return {
      title: "Expert Review Advisory",
      urgency: "Review required",
      summary:
        "The AI result should be reviewed by an agriculture expert before operational decisions are made.",
      immediate: [
        "Capture a clearer image with the affected area centered.",
        "Inspect nearby plants for similar symptoms.",
        "Record the location and crop stage for follow-up."
      ],
      prevention: [
        "Continue routine crop monitoring.",
        "Avoid making treatment decisions from an uncertain AI result alone.",
        "Use locally approved agricultural guidance."
      ],
      monitoring: "Repeat the diagnosis with a clearer image and seek expert validation when uncertainty remains."
    };
  };

  const advisoryInfo = result
    ? getAdvisoryInfo(result.class)
    : {
        title: "Crop Advisory Center",
        urgency: "Awaiting diagnosis",
        summary:
          "Upload a leaf image first. CropShield will tailor this advisory to the detected condition.",
        immediate: [
          "Upload a clear crop-leaf image.",
          "Wait for the AI diagnosis.",
          "Review the advisory before field action."
        ],
        prevention: [
          "Scout crops regularly.",
          "Capture clear images when symptoms appear.",
          "Use expert confirmation for uncertain cases."
        ],
        monitoring: "No diagnosis is available yet."
      };

  const forecastDisease = result
    ? translateDiseaseName(result.class, language)
    : "Disease";

  const riskData = {
    overall: result?.class?.includes("healthy") ? 18 : 64,
    level: result?.class?.includes("healthy") ? "Low" : "Medium",
    disease: forecastDisease,
    temperature: "28°C",
    humidity: "84%",
    rainfall: "32 mm",
    pestActivity: "High",
    cropStage: "Flowering",
  };

  const riskTrend = [
    { day: "Today", value: 58 },
    { day: "Tue", value: 61 },
    { day: "Wed", value: 65 },
    { day: "Thu", value: 69 },
    { day: "Fri", value: 73 },
    { day: "Sat", value: 68 },
    { day: "Sun", value: 63 },
  ];

  const hotspotCenter = [16.3067, 80.4365];
  const hotspotZoom = 11;

  const hotspotCases = [
    {
      id: 1,
      name: "Field Cluster A",
      disease: t.diseases.early,
      level: "High",
      count: 18,
      lat: 16.315,
      lng: 80.455,
    },
    {
      id: 2,
      name: "Field Cluster B",
      disease: t.diseases.late,
      level: "Critical",
      count: 31,
      lat: 16.278,
      lng: 80.405,
    },
    {
      id: 3,
      name: "Field Cluster C",
      disease: t.diseases.leafMold,
      level: "Medium",
      count: 11,
      lat: 16.342,
      lng: 80.425,
    },
    {
      id: 4,
      name: "Field Cluster D",
      disease: t.diseases.early,
      level: "Medium",
      count: 8,
      lat: 16.291,
      lng: 80.472,
    },
    {
      id: 5,
      name: "Field Cluster E",
      disease: t.healthyMonitoring,
      level: "Low",
      count: 5,
      lat: 16.358,
      lng: 80.454,
    },
  ];

  const getHotspotClass = (level) => {
    if (level === "Critical") return "critical";
    if (level === "High") return "high";
    if (level === "Medium") return "medium";
    return "low";
  };

  const getHotspotLabel = (level) => {
    if (level === "Critical") return t.critical;
    if (level === "High") return t.high;
    if (level === "Medium") return t.medium;
    return t.low;
  };

  const renderDiagnosisPage = () => (
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
            <span>{t.heroSubtitle}</span>
          </h1>

          <p>
            Upload a leaf image and let CropShield's AI detect crop diseases
            instantly, assess risk, and guide you toward the right action.
          </p>

          <button className="primary-btn" onClick={openFilePicker}>
            {t.startDiagnosis}
            <ChevronRight size={20} />
          </button>

          <div className="trust-row">
            <div>
              <ShieldCheck size={19} />
              {t.aiDiagnosis}
            </div>

            <div>
              <Activity size={19} />
              {t.riskInsights}
            </div>
          </div>
        </div>

        <div className="diagnosis-card">
          <div className="card-top">
            <div>
              <span className="small-label">{t.cropHealth}</span>
              <h3>{t.diagnosisTitle}</h3>
            </div>

            <div className="ai-badge">
              <Activity size={15} />
              AI
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageSelect}
            style={{ display: "none" }}
          />

          <div
            className={`leaf-preview ${preview ? "has-image" : ""}`}
            onClick={openFilePicker}
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
                <Leaf size={110} strokeWidth={1.2} />
                <div className="scan-line"></div>
              </>
            )}

            {loading && (
              <div className="scanning-overlay">
                <LoaderCircle size={42} className="spin" />
                <span>{t.scan}</span>
              </div>
            )}
          </div>

          <div className="diagnosis-result">
            <div>
              <span className="result-label">{t.detectedCondition}</span>

              {loading ? (
                <h3>{t.analyzingLeaf || "Analyzing leaf..."}</h3>
              ) : result ? (
                <>
                  <h3>{translateDiseaseName(result.class, language)}</h3>
                  <p>{result.status}</p>
                </>
              ) : (
                <>
                  <h3>{t.ready || "Ready for analysis"}</h3>
                  <p>
                    {t.uploadHint || "Upload a clear image of a crop leaf"}
                  </p>
                </>
              )}
            </div>

            <div className="confidence">
              {result ? (
                <>
                  <span>{result.confidence}%</span>
                  <small>{t.confidence}</small>
                </>
              ) : (
                <>
                  <span>—</span>
                  <small>{t.confidence}</small>
                </>
              )}
            </div>
          </div>

          {result && (
            <div className="confidence-panel">
              <div className="confidence-header">
                <span>{t.aiConfidence}</span>
                <strong>{result.confidence}%</strong>
              </div>

              <div className="confidence-track">
                <div
                  className="confidence-fill"
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>
          )}

          {result && diseaseInfo && (
            <div className="risk-grid">
              <div className="risk-box">
                <div className="risk-box-icon">
                  <ThermometerSun size={18} />
                </div>

                <div>
                  <span>{t.severity}</span>
                  <strong>{diseaseInfo.severity}</strong>
                </div>
              </div>

              <div className="risk-box">
                <div className="risk-box-icon">
                  <Activity size={18} />
                </div>

                <div>
                  <span>{t.riskLevel}</span>
                  <strong>{diseaseInfo.risk}</strong>
                </div>
              </div>
            </div>
          )}

          {result && diseaseInfo && (
            <div className="severity-section">
              <div className="severity-header">
                <span>{t.cropHealthStatus}</span>
                <span>{diseaseInfo.severity}</span>
              </div>

              <div className="severity-bars">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`severity-bar ${
                      level <= diseaseInfo.severityLevel ? "filled" : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {result && diseaseInfo && (
            <div className="recommendation-card">
              <div className="recommendation-icon">
                <Sprout size={20} />
              </div>

              <div>
                <span className="recommendation-label">
                  {t.recommendedAction}
                </span>

                <h4>{t.whatShouldIDo}</h4>

                <p>{diseaseInfo.action}</p>
              </div>
            </div>
          )}

          {result && diseaseInfo && (
            <div className="advisory-box">
              <div>
                <ShieldCheck size={18} />
                <span>{t.cropAdvisory}</span>
              </div>

              <p>{diseaseInfo.advice}</p>
            </div>
          )}

          {result && (
            <button className="voice-btn" onClick={speakAdvice}>
              {speaking ? (
                <>
                  <Activity size={18} />
                  {t.speaking || "Speaking advisory..."}
                </>
              ) : (
                <>
                  <Volume2 size={18} />
                  {t.listen}
                </>
              )}
            </button>
          )}

          {result && (
            <div
              className={`result-status ${
                result.confidence >= 80 ? "success" : "warning"
              }`}
            >
              {result.confidence >= 80 ? (
                <CheckCircle2 size={17} />
              ) : (
                <AlertTriangle size={17} />
              )}

              <span>
                {result.confidence >= 80
                  ? t.highConfidence
                  : t.expertValidation}
              </span>
            </div>
          )}

          {error && (
            <div className="error-message">
              <AlertTriangle size={17} />
              {error}
            </div>
          )}

          <button
            className="upload-btn"
            onClick={openFilePicker}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="spin" />
                {t.analyzingButton || "Analyzing..."}
              </>
            ) : (
              <>
                <Upload size={18} />
                {preview ? t.analyzeAnother : t.uploadLeaf}
              </>
            )}
          </button>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <span>ONE PLATFORM</span>
          <h2>From detection to action.</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Leaf />
            </div>
            <h3>AI Disease Detection</h3>
            <p>
              Analyze crop leaf images using our trained computer vision model.
            </p>
            <span className="feature-link">
              Instant diagnosis
              <ChevronRight size={16} />
            </span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <CloudSun />
            </div>
            <h3>Risk Forecasting</h3>
            <p>
              Combine weather, crop stage, and pest activity to identify
              emerging risks.
            </p>
            <button
              className="feature-link feature-button"
              onClick={() => setActivePage("risk")}
            >
              Predict outbreaks
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Map />
            </div>
            <h3>Geospatial Hotspots</h3>
            <p>
              Visualize confirmed disease cases and prioritize field-level
              intervention.
            </p>
            <button
              className="feature-link feature-button"
              onClick={() => setActivePage("hotspots")}
            >
              View hotspots
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </>
  );

  const renderRiskPage = () => (
    <section className="risk-dashboard">
      <button
        className="back-btn"
        onClick={() => setActivePage("diagnosis")}
      >
        <ArrowLeft size={17} />
        {t.backToDiagnosis}
      </button>

      <div className="risk-hero">
        <div>
          <span className="dashboard-kicker">
            {t.riskKicker}
          </span>
          <h1>{t.riskTitle}</h1>
          <p>
            {t.riskDescription} {riskData.disease}
          </p>
        </div>

        <div className="risk-score-card">
          <span>{t.overallRisk}</span>
          <strong>{riskData.overall}%</strong>
          <div className="risk-score-level">
            {riskData.level}
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
              {riskData.level}
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
              {riskTrend.map((item) => (
                <div className="chart-column" key={item.day}>
                  <div
                    className="chart-value"
                    style={{ height: `${item.value * 0.65}px` }}
                  ></div>
                  <small>{getDayLabel(item.day)}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="forecast-card">
          <span className="small-label">
            {t.currentConditions}
          </span>
          <h3>{t.fieldEnvironment}</h3>

          <div className="condition-list">
            <div className="condition-row">
              <div className="condition-icon">
                <ThermometerSun size={18} />
              </div>
              <div>
                <span>{t.temperature}</span>
                <strong>{riskData.temperature}</strong>
              </div>
            </div>

            <div className="condition-row">
              <div className="condition-icon">
                <Droplets size={18} />
              </div>
              <div>
                <span>{t.humidity}</span>
                <strong>{riskData.humidity}</strong>
              </div>
            </div>

            <div className="condition-row">
              <div className="condition-icon">
                <CloudSun size={18} />
              </div>
              <div>
                <span>{t.rainfall}</span>
                <strong>{riskData.rainfall}</strong>
              </div>
            </div>

            <div className="condition-row">
              <div className="condition-icon">
                <Bug size={18} />
              </div>
              <div>
                <span>{t.pestActivity}</span>
                <strong>{riskData.pestActivity}</strong>
              </div>
            </div>

            <div className="condition-row">
              <div className="condition-icon">
                <CalendarDays size={18} />
              </div>
              <div>
                <span>{t.cropStage}</span>
                <strong>{riskData.cropStage}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="warning-panel">
        <div className="warning-icon">
          <AlertTriangle size={21} />
        </div>
        <div>
          <span>{t.earlyWarning}</span>
          <h3>{t.warningTitle}</h3>
          <p>{t.warningText}</p>
        </div>
      </div>

      <div className="forecast-action-grid">
        <div className="forecast-card action-card">
          <div className="feature-icon">
            <Sprout />
          </div>
          <h3>{t.recommendedActionRisk}</h3>
          <p>{t.recommendedActionText}</p>
        </div>

        <div className="forecast-card action-card">
          <div className="feature-icon">
            <Bug />
          </div>
          <h3>{t.pestTrap}</h3>
          <p>{t.pestTrapText}</p>
        </div>

        <div className="forecast-card action-card">
          <div className="feature-icon">
            <Activity />
          </div>
          <h3>{t.nextUpdate}</h3>
          <p>{t.nextUpdateText}</p>
        </div>
      </div>
    </section>
  );

  const renderAdvisoriesPage = () => (
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

        <ShieldCheck size={15} />

        {t.aiAssisted}

      </div>

    </div>


    <div className="advisory-status-card">

      <div className="advisory-status-icon">
        <Sprout size={22} />
      </div>


      <div className="advisory-status-main">

        <span>
          {t.currentCondition}
        </span>

        <h2>
          {result
            ? formatDisease(result.class)
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
          <CheckCircle2 size={20} />
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
          <ShieldCheck size={20} />
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
          <Activity size={20} />
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
          onClick={speakAdvice}
          disabled={!result}
        >

          {speaking ? (
            <>
              <Activity size={18} />
              {t.speaking}
            </>
          ) : (
            <>
              <Volume2 size={18} />
              {t.listen}
            </>
          )}

        </button>

      </div>

    </div>


    <div className="expert-note">

      <AlertTriangle size={18} />

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

        <CalendarDays size={19} />

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

        <MapPin size={19} />

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

        <Users size={19} />

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

  const renderHotspotsPage = () => (
  <section className="hotspots-dashboard">

    <div className="hotspot-header">

      <div>

        <span className="dashboard-kicker">
          {t.hotspotsKicker}
        </span>

        <h1>
          {t.hotspotsTitle}
        </h1>

        <p>
          {t.hotspotsDescription}
        </p>

      </div>

      <div className="prototype-badge">

        <MapPin size={15} />

        {t.prototypeData}

      </div>

    </div>


    <div className="hotspot-stats">

      <div className="hotspot-stat-card">

        <div className="hotspot-stat-icon">
          <MapPin size={19} />
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
          <AlertTriangle size={19} />
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
          <Users size={19} />
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

          <div className="map-search">

            <Search size={15} />

            {t.searchField}

          </div>

        </div>


        <div className="map-shell">

          <MapContainer
            center={hotspotCenter}
            zoom={hotspotZoom}
            scrollWheelZoom={true}
            className="hotspot-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <MapResetView
              center={hotspotCenter}
              zoom={hotspotZoom}
              label={t.resetView}
            />


            {hotspotCases.map((spot) => (
              <CircleMarker
                key={spot.id}
                center={[
                  spot.lat,
                  spot.lng,
                ]}
                radius={
                  spot.level === "Critical"
                    ? 17
                    : 13
                }
                pathOptions={{
                  color:
                    spot.level === "Critical"
                      ? "#b23b37"
                      : spot.level === "High"
                      ? "#c9821e"
                      : spot.level === "Medium"
                      ? "#2e7d32"
                      : "#6b8f77",

                  fillColor:
                    spot.level === "Critical"
                      ? "#d9534f"
                      : spot.level === "High"
                      ? "#e3a23b"
                      : spot.level === "Medium"
                      ? "#4b9b55"
                      : "#91ad9a",

                  fillOpacity: 0.72,
                  weight: 3,
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
                  {getHotspotLabel(spot.level)}

                  <br />

                  {t.mapReports}:{" "}
                  {spot.count}

                </Popup>

              </CircleMarker>
            ))}

          </MapContainer>


          <div className="map-control-hint">

            <Navigation size={14} />

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

          {hotspotCases.map((spot) => (

            <div
              className="hotspot-item"
              key={spot.id}
            >

              <div
                className={`hotspot-marker ${
                  getHotspotClass(
                    spot.level
                  )
                }`}
              >

                <MapPin size={16} />

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
                    {getHotspotLabel(spot.level)}
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

          ))}

        </div>


        <div className="hotspot-note">

          <ShieldCheck size={17} />

          <p>
            {t.hotspotValidation}
          </p>

        </div>

      </div>

    </div>

  </section>
);
}

export default App;
