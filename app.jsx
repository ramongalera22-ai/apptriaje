const { useState, useEffect, useRef } = React;


/* TriajeSalud v3
   SET / SMS Murcia · NHS 111 Pathways model · Mediktor-style AI
   Gemini 2.0 Flash · Full i18n · No emojis · RGPD compliant */

// ─── i18n ───
const T = {
  es: {
    appName: "TriajeSalud", subtitle: "Sistema Espanol de Triaje — Area II Cartagena",
    startTriage: "Iniciar autotriaje", voiceTriage: "Triaje por voz",
    voiceAI: "Gemini AI — Multiidioma", selectSymptom: "Cual es el motivo de consulta?",
    selectSymptomSub: "Seleccione el que mejor describe su problema principal",
    disclaimer: "Aviso importante", disclaimerText: "Esta herramienta es orientativa y NO sustituye la valoracion de un profesional sanitario. Ante una emergencia vital, llame inmediatamente al 112.",
    accept: "He leido y acepto que este resultado es orientativo",
    continue_: "Continuar", yes: "Si", no: "No",
    discriminatorTitle: "Discriminador de gravedad",
    painTitle: "Escala de dolor (EVA)", painSub: "Indique la intensidad de su dolor",
    noPain: "Sin dolor", maxPain: "Maximo dolor",
    question: "Pregunta", of: "de",
    noneNext: "Ninguno — Continuar", selected: "seleccionados",
    resultTitle: "Resultado del triaje", level: "Nivel", timeLabel: "Tiempo de atencion",
    call112: "Llamar al 112", qrTitle: "QR para el profesional sanitario",
    qrSub: "Datos del triaje para acelerar la atencion",
    summaryTitle: "Resumen del triaje",
    legalFooter: "Herramienta orientativa basada en el SET. No constituye diagnostico medico. En emergencias: 112. Ley 41/2002.",
    newConsult: "Nueva consulta", lastConsults: "Ultimas consultas",
    setLevels: "Niveles SET",
    voiceTitle: "Triaje por voz", voiceSub: "Hable en cualquier idioma. Gemini analizara sus sintomas, traducira y clasificara segun el SET.",
    voiceLangLabel: "Idioma de captura de voz", geminiKeyLabel: "Gemini API Key",
    geminiConfig: "Configurar", geminiHide: "Ocultar",
    geminiGetKey: "Obten tu key gratis en", geminiNoKey: "Sin API key — Se usara analisis local",
    geminiReady: "Gemini configurado — Triaje IA activo",
    voiceExample: "Ejemplo: Me duele mucho el pecho desde esta manana, es como una presion, y me cuesta respirar al subir escaleras",
    startSpeaking: "Empezar a hablar", recording: "Grabando",
    describeSym: "Describe todos sus sintomas", transcript: "Transcripcion",
    listening: "Escuchando...", analyzeBtn: "Analizar sintomas",
    speakToContinue: "Hable para continuar...", analyzing: "Analizando con Gemini...",
    analyzingSub: "Triaje SET — Traduccion automatica", analyzingLocal: "Analizando sintomas...",
    analyzingLocalSub: "Analisis local de sintomas", detectedSymptoms: "Sintomas detectados",
    followupQ: "Pregunta", writeAnswer: "Escriba su respuesta...",
    nextQuestion: "Siguiente pregunta", seeResult: "Ver resultado",
    noAnswer: "Sin respuesta", patientNarrative: "Relato del paciente",
    langDetected: "Idioma", detectedSymptomsLabel: "Sintomas detectados",
    clinicalSummary: "Resumen clinico",
    consultReason: "Motivo de consulta", painEVA: "Dolor (EVA)",
    dest1: "Llame al 112 o acuda a Urgencias INMEDIATAMENTE",
    dest2: "Acuda a Urgencias hospitalarias — Sera atendido con prioridad",
    dest3: "Acuda a Urgencias o SUAP en las proximas horas",
    dest4: "Pida cita con su medico de cabecera o acuda al Centro de Salud",
    dest5: "Consulte en farmacia o pida cita ordinaria con su medico",
    browserNoVoice: "Su navegador no soporta reconocimiento de voz. Pruebe con Chrome.",
    poweredBy: "Powered by Google Gemini 2.0 Flash",
    localMode: "Analisis local — Configure Gemini para IA avanzada",
    lang: "Idioma de la interfaz",
    nhsNote: "Principio NHS Pathways: cuantas menos preguntas, mas grave es la situacion. Si su caso es critico, sera derivado rapidamente.",
    resuscitation: "Resucitacion", emergency: "Emergencia", urgency: "Urgencia", standard: "Estandar", nonUrgent: "No urgente",
    immediate: "Inmediato",
    timerGlobal: "Tiempo total", timerQuestion: "Tiempo para responder",
    timerExpired: "Tiempo agotado — triaje finalizado con los datos disponibles",
    autoFinish: "Sin respuesta — continuando automaticamente",
    secondsLeft: "s",
  },
  en: {
    appName: "TriageSalud", subtitle: "Spanish Triage System — Area II Cartagena",
    startTriage: "Start self-triage", voiceTriage: "Voice triage",
    voiceAI: "Gemini AI — Multilingual", selectSymptom: "What is the reason for your visit?",
    selectSymptomSub: "Select the one that best describes your main problem",
    disclaimer: "Important notice", disclaimerText: "This tool is for guidance only and does NOT replace professional medical assessment. In case of a life-threatening emergency, call 112 immediately.",
    accept: "I have read and accept that this result is for guidance only",
    continue_: "Continue", yes: "Yes", no: "No",
    discriminatorTitle: "Severity discriminator",
    painTitle: "Pain scale (VAS)", painSub: "Indicate the intensity of your pain",
    noPain: "No pain", maxPain: "Maximum pain",
    question: "Question", of: "of",
    noneNext: "None — Continue", selected: "selected",
    resultTitle: "Triage result", level: "Level", timeLabel: "Response time",
    call112: "Call 112", qrTitle: "QR for healthcare professional",
    qrSub: "Triage data to speed up care",
    summaryTitle: "Triage summary",
    legalFooter: "Guidance tool based on SET. Not a medical diagnosis. Emergencies: 112.",
    newConsult: "New consultation", lastConsults: "Recent consultations",
    setLevels: "SET Levels",
    voiceTitle: "Voice triage", voiceSub: "Speak in any language. Gemini will analyze your symptoms, translate and classify according to SET.",
    voiceLangLabel: "Voice capture language", geminiKeyLabel: "Gemini API Key",
    geminiConfig: "Configure", geminiHide: "Hide",
    geminiGetKey: "Get your free key at", geminiNoKey: "No API key — Local analysis will be used",
    geminiReady: "Gemini configured — AI triage active",
    voiceExample: "Example: I have a strong chest pain since this morning, like pressure, and I struggle to breathe when climbing stairs",
    startSpeaking: "Start speaking", recording: "Recording",
    describeSym: "Describe all your symptoms", transcript: "Transcript",
    listening: "Listening...", analyzeBtn: "Analyze symptoms",
    speakToContinue: "Speak to continue...", analyzing: "Analyzing with Gemini...",
    analyzingSub: "SET triage — Automatic translation", analyzingLocal: "Analyzing symptoms...",
    analyzingLocalSub: "Local symptom analysis", detectedSymptoms: "Detected symptoms",
    followupQ: "Question", writeAnswer: "Write your answer...",
    nextQuestion: "Next question", seeResult: "See result",
    noAnswer: "No answer", patientNarrative: "Patient narrative",
    langDetected: "Language", detectedSymptomsLabel: "Detected symptoms",
    clinicalSummary: "Clinical summary",
    consultReason: "Reason for consultation", painEVA: "Pain (VAS)",
    dest1: "Call 112 or go to the Emergency Department IMMEDIATELY",
    dest2: "Go to Emergency — You will be attended with priority",
    dest3: "Go to Emergency or walk-in clinic within hours",
    dest4: "Book an appointment with your GP or go to your Health Centre",
    dest5: "Consult your pharmacy or book a routine GP appointment",
    browserNoVoice: "Your browser does not support voice recognition. Try Chrome.",
    poweredBy: "Powered by Google Gemini 2.0 Flash",
    localMode: "Local analysis — Configure Gemini for advanced AI",
    lang: "Interface language",
    nhsNote: "NHS Pathways principle: the fewer questions asked, the more serious the condition. If your case is critical, you will be referred quickly.",
    resuscitation: "Resuscitation", emergency: "Emergency", urgency: "Urgency", standard: "Standard", nonUrgent: "Non-urgent",
    immediate: "Immediate",
    timerGlobal: "Total time", timerQuestion: "Time to answer",
    timerExpired: "Time expired — triage completed with available data",
    autoFinish: "No response — continuing automatically",
    secondsLeft: "s",
  },
  fr: {
    appName: "TriageSalud", subtitle: "Systeme Espagnol de Triage — Zone II Cartagena",
    startTriage: "Demarrer l'autotriage", voiceTriage: "Triage vocal",
    voiceAI: "Gemini AI — Multilingue", selectSymptom: "Quel est le motif de consultation ?",
    selectSymptomSub: "Selectionnez celui qui decrit le mieux votre probleme principal",
    disclaimer: "Avis important", disclaimerText: "Cet outil est indicatif et NE remplace PAS l'evaluation d'un professionnel de sante. En cas d'urgence vitale, appelez le 112.",
    accept: "J'ai lu et j'accepte que ce resultat est indicatif",
    continue_: "Continuer", yes: "Oui", no: "Non",
    discriminatorTitle: "Discriminateur de gravite",
    painTitle: "Echelle de douleur (EVA)", painSub: "Indiquez l'intensite de votre douleur",
    noPain: "Sans douleur", maxPain: "Douleur maximale",
    question: "Question", of: "sur",
    noneNext: "Aucun — Continuer", selected: "selectionnes",
    resultTitle: "Resultat du triage", level: "Niveau", timeLabel: "Delai de prise en charge",
    call112: "Appeler le 112", qrTitle: "QR pour le professionnel de sante",
    qrSub: "Donnees de triage pour accelerer la prise en charge",
    summaryTitle: "Resume du triage",
    legalFooter: "Outil indicatif base sur le SET. Ne constitue pas un diagnostic medical. Urgences : 112.",
    newConsult: "Nouvelle consultation", lastConsults: "Consultations recentes",
    setLevels: "Niveaux SET",
    voiceTitle: "Triage vocal", voiceSub: "Parlez dans n'importe quelle langue. Gemini analysera vos symptomes, traduira et classifiera selon le SET.",
    voiceLangLabel: "Langue de capture vocale", geminiKeyLabel: "Cle API Gemini",
    geminiConfig: "Configurer", geminiHide: "Masquer",
    geminiGetKey: "Obtenez votre cle gratuite sur", geminiNoKey: "Pas de cle API — Analyse locale utilisee",
    geminiReady: "Gemini configure — Triage IA actif",
    voiceExample: "Exemple : J'ai une forte douleur a la poitrine depuis ce matin, comme une pression, et j'ai du mal a respirer en montant les escaliers",
    startSpeaking: "Commencer a parler", recording: "Enregistrement",
    describeSym: "Decrivez tous vos symptomes", transcript: "Transcription",
    listening: "Ecoute...", analyzeBtn: "Analyser les symptomes",
    speakToContinue: "Parlez pour continuer...", analyzing: "Analyse avec Gemini...",
    analyzingSub: "Triage SET — Traduction automatique", analyzingLocal: "Analyse des symptomes...",
    analyzingLocalSub: "Analyse locale", detectedSymptoms: "Symptomes detectes",
    followupQ: "Question", writeAnswer: "Ecrivez votre reponse...",
    nextQuestion: "Question suivante", seeResult: "Voir le resultat",
    noAnswer: "Pas de reponse", patientNarrative: "Recit du patient",
    langDetected: "Langue", detectedSymptomsLabel: "Symptomes detectes",
    clinicalSummary: "Resume clinique",
    consultReason: "Motif de consultation", painEVA: "Douleur (EVA)",
    dest1: "Appelez le 112 ou allez aux Urgences IMMEDIATEMENT",
    dest2: "Allez aux Urgences — Vous serez pris en charge en priorite",
    dest3: "Allez aux Urgences ou au centre de soins dans les prochaines heures",
    dest4: "Prenez rendez-vous avec votre medecin ou allez au centre de sante",
    dest5: "Consultez votre pharmacie ou prenez un rendez-vous ordinaire",
    browserNoVoice: "Votre navigateur ne supporte pas la reconnaissance vocale. Essayez Chrome.",
    poweredBy: "Powered by Google Gemini 2.0 Flash",
    localMode: "Analyse locale — Configurez Gemini pour l'IA avancee",
    lang: "Langue de l'interface",
    nhsNote: "Principe NHS Pathways : moins le systeme pose de questions, plus la situation est grave. Si votre cas est critique, vous serez oriente rapidement.",
    resuscitation: "Reanimation", emergency: "Urgence vitale", urgency: "Urgence", standard: "Standard", nonUrgent: "Non urgent",
    immediate: "Immediat",
    timerGlobal: "Temps total", timerQuestion: "Temps pour repondre",
    timerExpired: "Temps ecoule — triage termine avec les donnees disponibles",
    autoFinish: "Pas de reponse — continuation automatique",
    secondsLeft: "s",
  },
  ar: {
    appName: "TriajeSalud", subtitle: "نظام الفرز الاسباني — المنطقة الثانية قرطاجنة",
    startTriage: "بدء الفرز الذاتي", voiceTriage: "الفرز الصوتي",
    voiceAI: "Gemini AI — متعدد اللغات", selectSymptom: "ما سبب الاستشارة؟",
    selectSymptomSub: "اختر ما يصف مشكلتك الرئيسية بشكل أفضل",
    disclaimer: "تنبيه مهم", disclaimerText: "هذه الأداة إرشادية ولا تغني عن تقييم المختص الصحي. في حالة الطوارئ اتصل بالرقم 112.",
    accept: "قرأت وأوافق على أن هذه النتيجة إرشادية",
    continue_: "متابعة", yes: "نعم", no: "لا",
    discriminatorTitle: "مؤشر الخطورة",
    painTitle: "مقياس الألم (EVA)", painSub: "حدد شدة ألمك",
    noPain: "بدون ألم", maxPain: "أقصى ألم",
    question: "سؤال", of: "من",
    noneNext: "لا شيء — متابعة", selected: "محدد",
    resultTitle: "نتيجة الفرز", level: "المستوى", timeLabel: "وقت الاستجابة",
    call112: "اتصل بـ 112", qrTitle: "رمز QR للمختص الصحي",
    qrSub: "بيانات الفرز لتسريع الرعاية",
    summaryTitle: "ملخص الفرز",
    legalFooter: "أداة إرشادية. ليست تشخيصا طبيا. الطوارئ: 112.",
    newConsult: "استشارة جديدة", lastConsults: "الاستشارات الأخيرة",
    setLevels: "مستويات SET",
    voiceTitle: "الفرز الصوتي", voiceSub: "تحدث بأي لغة. سيحلل Gemini أعراضك ويترجم ويصنف حسب SET.",
    voiceLangLabel: "لغة الالتقاط الصوتي", geminiKeyLabel: "مفتاح Gemini API",
    geminiConfig: "إعداد", geminiHide: "إخفاء",
    geminiGetKey: "احصل على مفتاحك المجاني من", geminiNoKey: "بدون مفتاح API — سيتم استخدام التحليل المحلي",
    geminiReady: "Gemini جاهز — فرز الذكاء الاصطناعي نشط",
    voiceExample: "مثال: أعاني من ألم شديد في الصدر منذ هذا الصباح مثل الضغط وأجد صعوبة في التنفس عند صعود الدرج",
    startSpeaking: "ابدأ بالتحدث", recording: "جاري التسجيل",
    describeSym: "صف جميع أعراضك", transcript: "النص",
    listening: "الاستماع...", analyzeBtn: "تحليل الأعراض",
    speakToContinue: "تحدث للمتابعة...", analyzing: "...جاري التحليل بـ Gemini",
    analyzingSub: "فرز SET — ترجمة تلقائية", analyzingLocal: "جاري تحليل الأعراض...",
    analyzingLocalSub: "تحليل محلي", detectedSymptoms: "الأعراض المكتشفة",
    followupQ: "سؤال", writeAnswer: "...اكتب إجابتك",
    nextQuestion: "السؤال التالي", seeResult: "عرض النتيجة",
    noAnswer: "بدون إجابة", patientNarrative: "رواية المريض",
    langDetected: "اللغة", detectedSymptomsLabel: "الأعراض المكتشفة",
    clinicalSummary: "ملخص سريري",
    consultReason: "سبب الاستشارة", painEVA: "(EVA) الألم",
    dest1: "اتصل بـ 112 أو اذهب إلى الطوارئ فوراً",
    dest2: "اذهب إلى طوارئ المستشفى — ستحظى بالأولوية",
    dest3: "اذهب إلى الطوارئ أو مركز الرعاية خلال ساعات",
    dest4: "احجز موعداً مع طبيبك أو اذهب إلى المركز الصحي",
    dest5: "استشر الصيدلية أو احجز موعداً عادياً مع طبيبك",
    browserNoVoice: "متصفحك لا يدعم التعرف على الصوت. جرب Chrome.",
    poweredBy: "Powered by Google Gemini 2.0 Flash",
    localMode: "تحليل محلي — قم بإعداد Gemini للذكاء الاصطناعي المتقدم",
    lang: "لغة الواجهة",
    nhsNote: "مبدأ NHS Pathways: كلما قل عدد الأسئلة، زادت خطورة الحالة.",
    resuscitation: "إنعاش", emergency: "طوارئ", urgency: "مستعجل", standard: "عادي", nonUrgent: "غير مستعجل",
    immediate: "فوري",
    timerGlobal: "الوقت الكلي", timerQuestion: "وقت الإجابة",
    timerExpired: "انتهى الوقت — تم الفرز بالبيانات المتاحة",
    autoFinish: "بدون إجابة — متابعة تلقائية",
    secondsLeft: "ث",
  },
};

const LANG_OPTIONS = [
  { code: "es", label: "Espanol" }, { code: "en", label: "English" },
  { code: "fr", label: "Francais" }, { code: "ar", label: "العربية" },
];

const VOICE_LANGS = [
  { code: "es-ES", label: "ES Espanol" }, { code: "en-US", label: "EN English" },
  { code: "fr-FR", label: "FR Francais" }, { code: "ar-SA", label: "AR العربية" },
  { code: "de-DE", label: "DE Deutsch" }, { code: "zh-CN", label: "ZH 中文" },
  { code: "ro-RO", label: "RO Romana" }, { code: "uk-UA", label: "UK Українська" },
  { code: "pt-BR", label: "PT Portugues" }, { code: "ru-RU", label: "RU Русский" },
  { code: "it-IT", label: "IT Italiano" },
];

// ─── SET 5 Levels ───
const SET_LEVELS = (t) => ({
  1: { n: t.resuscitation, c: "#dc2626", bg: "#fef2f2", tm: t.immediate, tag: "I", bd: "#fca5a5" },
  2: { n: t.emergency, c: "#ea580c", bg: "#fff7ed", tm: "10 min", tag: "II", bd: "#fdba74" },
  3: { n: t.urgency, c: "#ca8a04", bg: "#fefce8", tm: "60 min", tag: "III", bd: "#fde047" },
  4: { n: t.standard, c: "#0369a1", bg: "#f0f9ff", tm: "120 min", tag: "IV", bd: "#7dd3fc" },
  5: { n: t.nonUrgent, c: "#15803d", bg: "#f0fdf4", tm: "240 min", tag: "V", bd: "#86efac" },
});

// ─── CATEGORIES (no emojis, just medical labels) ───
const CATS = [
  { id: "dolor_toracico", es: "Dolor toracico", en: "Chest pain", fr: "Douleur thoracique", ar: "ألم في الصدر" },
  { id: "disnea", es: "Dificultad respiratoria", en: "Breathing difficulty", fr: "Difficulte respiratoire", ar: "صعوبة في التنفس" },
  { id: "dolor_abdominal", es: "Dolor abdominal", en: "Abdominal pain", fr: "Douleur abdominale", ar: "ألم في البطن" },
  { id: "cefalea", es: "Dolor de cabeza", en: "Headache", fr: "Cephalee", ar: "صداع" },
  { id: "fiebre", es: "Fiebre", en: "Fever", fr: "Fievre", ar: "حمى" },
  { id: "traumatismo_ext", es: "Traumatismo extremidades", en: "Limb injury", fr: "Traumatisme des membres", ar: "إصابة الأطراف" },
  { id: "dolor_lumbar", es: "Dolor de espalda", en: "Back pain", fr: "Douleur dorsale", ar: "ألم في الظهر" },
  { id: "mareo_vertigo", es: "Mareo / Vertigo", en: "Dizziness / Vertigo", fr: "Vertige", ar: "دوار" },
  { id: "odinofagia", es: "Dolor de garganta", en: "Sore throat", fr: "Mal de gorge", ar: "التهاب الحلق" },
  { id: "disuria", es: "Molestias al orinar", en: "Urinary problems", fr: "Problemes urinaires", ar: "مشاكل في التبول" },
  { id: "erupcion_cutanea", es: "Problemas en la piel", en: "Skin problems", fr: "Problemes cutanes", ar: "مشاكل جلدية" },
  { id: "vomitos", es: "Nauseas / Vomitos", en: "Nausea / Vomiting", fr: "Nausees / Vomissements", ar: "غثيان / قيء" },
  { id: "ojo_rojo", es: "Problema ocular", en: "Eye problem", fr: "Probleme oculaire", ar: "مشكلة في العين" },
  { id: "ansiedad", es: "Ansiedad / Crisis", en: "Anxiety / Crisis", fr: "Anxiete / Crise", ar: "قلق / أزمة" },
  { id: "herida", es: "Herida / Corte", en: "Wound / Cut", fr: "Plaie / Coupure", ar: "جرح / قطع" },
  { id: "sincope", es: "Desmayo", en: "Fainting", fr: "Malaise / Syncope", ar: "إغماء" },
  { id: "palpitaciones", es: "Palpitaciones", en: "Palpitations", fr: "Palpitations", ar: "خفقان" },
  { id: "tos", es: "Tos persistente", en: "Persistent cough", fr: "Toux persistante", ar: "سعال مستمر" },
  { id: "otros", es: "Otro motivo", en: "Other reason", fr: "Autre motif", ar: "سبب آخر" },
];

// ─── TRIAGE FLOWS: NHS Pathways model — fewer questions = more severe ───
// Discriminators checked first (critical safety net), then focused questions
const FLOWS = {
  dolor_toracico: { painScale: true,
    disc: [
      "Compromiso via aerea, no respira o inconsciente?",
      "Dolor opresivo que irradia a brazo izquierdo, mandibula o espalda?",
      "Sudoracion fria, nauseas o sensacion de muerte inminente?",
      "Aparicion subita (minutos)?",
      "Antecedentes de enfermedad cardiaca?",
    ],
    qs: [
      { q: "Desde cuando tiene el dolor?", opts: [{ t: "Minutos / Ahora mismo", v: 3 },{ t: "Horas", v: 2 },{ t: "Dias", v: 1 },{ t: "Recurrente", v: 0 }]},
      { q: "Aumenta al respirar profundo o moverse?", opts: [{ t: "Si", v: 1 },{ t: "No", v: 0 }]},
      { q: "Tiene fiebre?", opts: [{ t: "No", v: 0 },{ t: "< 38C", v: 1 },{ t: "38-39C", v: 2 },{ t: "> 39C", v: 3 }]},
    ]},
  disnea: { painScale: false,
    disc: [
      "Labios o dedos azulados (cianosis)?",
      "No puede hablar frases completas por falta de aire?",
      "Aparicion brusca, en minutos?",
      "Estridor o sibilancias intensas?",
    ],
    qs: [
      { q: "Desde cuando nota la dificultad?", opts: [{ t: "Minutos", v: 3 },{ t: "Horas", v: 2 },{ t: "Dias", v: 1 },{ t: "Semanas", v: 0 }]},
      { q: "Tiene fiebre o tos?", opts: [{ t: "No", v: 0 },{ t: "Solo tos", v: 1 },{ t: "Fiebre y tos", v: 2 },{ t: "Fiebre alta >38.5C", v: 3 }]},
    ]},
  dolor_abdominal: { painScale: true,
    disc: [
      "Abdomen rigido como una tabla?",
      "Vomitos con sangre o heces negras/con sangre?",
      "Embarazada con sangrado vaginal?",
      "Dolor tan intenso que no puede moverse?",
    ],
    qs: [
      { q: "Donde le duele mas?", opts: [{ t: "Superior central", v: 1 },{ t: "Derecho superior", v: 2 },{ t: "Inferior derecho", v: 2 },{ t: "Inferior izquierdo", v: 1 },{ t: "Todo el abdomen", v: 2 }]},
      { q: "Desde cuando?", opts: [{ t: "Horas", v: 2 },{ t: "1-3 dias", v: 1 },{ t: "> 1 semana", v: 1 },{ t: "Recurrente", v: 0 }]},
      { q: "Otros sintomas?", multi: true, opts: [{ t: "Nauseas/Vomitos", v: 1 },{ t: "Fiebre", v: 2 },{ t: "Diarrea", v: 1 },{ t: "Estrenimiento >3 dias", v: 1 }]},
    ]},
  cefalea: { painScale: true,
    disc: [
      "Perdida de conocimiento?",
      "El peor dolor de cabeza de su vida, inicio subito?",
      "Rigidez de nuca con fiebre?",
      "Debilidad en extremidades o dificultad para hablar?",
    ],
    qs: [
      { q: "Como es el dolor?", opts: [{ t: "Opresivo (como un casco)", v: 0 },{ t: "Pulsatil (un lado)", v: 1 },{ t: "Punzante intenso", v: 2 },{ t: "Tras golpe/traumatismo", v: 3 }]},
      { q: "Sintomas asociados?", multi: true, opts: [{ t: "Nauseas/Vomitos", v: 1 },{ t: "Fiebre", v: 2 },{ t: "Vision borrosa o doble", v: 2 },{ t: "Confusion", v: 3 }]},
    ]},
  fiebre: { painScale: false,
    disc: [
      "Inconsciente, muy somnoliento o no responde?",
      "Manchas rojas que NO desaparecen al presionar (petequias)?",
      "Rigidez de nuca?",
      "Temperatura > 39C con escalofrios intensos?",
    ],
    qs: [
      { q: "Cuanta temperatura?", opts: [{ t: "37-37.5C", v: 0 },{ t: "37.5-38.5C", v: 1 },{ t: "38.5-39.5C", v: 2 },{ t: "> 39.5C", v: 3 }]},
      { q: "Desde cuando?", opts: [{ t: "Hoy", v: 1 },{ t: "1-3 dias", v: 1 },{ t: "> 3 dias", v: 2 },{ t: "> 1 semana", v: 3 }]},
    ]},
  traumatismo_ext: { painScale: true,
    disc: [
      "Hueso visible a traves de la piel (fractura abierta)?",
      "Extremidad deformada, acortada o rotada?",
      "Sin sensibilidad o no puede mover los dedos?",
    ],
    qs: [
      { q: "Como ocurrio?", opts: [{ t: "Caida desde mi altura", v: 0 },{ t: "Caida desde altura >2m", v: 2 },{ t: "Accidente de trafico", v: 2 },{ t: "Golpe/torcedura", v: 0 }]},
      { q: "Puede mover la zona?", opts: [{ t: "Si, normal", v: 0 },{ t: "Si, con dolor", v: 1 },{ t: "No puedo", v: 2 }]},
    ]},
  dolor_lumbar: { painScale: true,
    disc: [
      "Perdida control esfinteres?",
      "Perdida fuerza o sensibilidad en ambas piernas?",
      "Fiebre alta con dolor de espalda?",
    ],
    qs: [
      { q: "Desde cuando?", opts: [{ t: "Agudo/Hoy", v: 2 },{ t: "Dias", v: 1 },{ t: "Semanas", v: 1 },{ t: "Cronico", v: 0 }]},
      { q: "Irradia a la pierna?", opts: [{ t: "No", v: 0 },{ t: "Hasta rodilla", v: 1 },{ t: "Hasta pie", v: 2 }]},
    ]},
  mareo_vertigo: { painScale: false,
    disc: [
      "Perdida de conocimiento?",
      "Debilidad en un lado del cuerpo o dificultad para hablar?",
      "Vision doble o perdida de vision?",
    ],
    qs: [
      { q: "Como es el mareo?", opts: [{ t: "Todo gira", v: 1 },{ t: "Inestabilidad", v: 0 },{ t: "Sensacion de desmayo", v: 2 }]},
    ]},
  odinofagia: { painScale: true,
    disc: [ "No puede tragar ni saliva?", "Dificultad para respirar o babea?" ],
    qs: [
      { q: "Tiene fiebre?", opts: [{ t: "No", v: 0 },{ t: "< 38C", v: 0 },{ t: "38-39C", v: 1 },{ t: "> 39C", v: 2 }]},
    ]},
  disuria: { painScale: true,
    disc: [ "Fiebre alta >38.5C con escalofrios?", "No puede orinar en absoluto?", "Sangre abundante con coagulos?" ],
    qs: [
      { q: "Sintomas?", multi: true, opts: [{ t: "Ardor al orinar", v: 0 },{ t: "Muy frecuente", v: 0 },{ t: "Sangre en orina", v: 1 },{ t: "Dolor lumbar", v: 1 }]},
    ]},
  erupcion_cutanea: { painScale: false,
    disc: [ "Hinchazon labios, lengua o garganta?", "Manchas rojas + fiebre que NO desaparecen al presionar?", "Ampollas extensas o piel se despega?" ],
    qs: [
      { q: "Tipo?", opts: [{ t: "Erupcion/Sarpullido", v: 0 },{ t: "Urticaria", v: 1 },{ t: "Herida infectada", v: 1 },{ t: "Quemadura", v: 2 }]},
    ]},
  vomitos: { painScale: false,
    disc: [ "Vomita sangre roja o posos de cafe?", "Mas de 24h sin tolerar liquidos?", "Muy debil, no puede mantenerse en pie?" ],
    qs: [
      { q: "Desde cuando?", opts: [{ t: "Horas", v: 1 },{ t: "1-2 dias", v: 1 },{ t: "> 3 dias", v: 2 }]},
      { q: "Tolera liquidos?", opts: [{ t: "Si", v: 0 },{ t: "Con dificultad", v: 1 },{ t: "Nada", v: 3 }]},
    ]},
  ojo_rojo: { painScale: true,
    disc: [ "Perdida brusca de vision?", "Contacto con quimico?", "Herida penetrante en ojo?" ],
    qs: [
      { q: "Que le pasa?", opts: [{ t: "Ojo rojo sin dolor", v: 0 },{ t: "Ojo rojo con dolor", v: 1 },{ t: "Vision borrosa", v: 2 },{ t: "Cuerpo extrano", v: 1 }]},
    ]},
  ansiedad: { painScale: false,
    disc: [ "Pensamientos de hacerse dano?", "Muy agitado y no puede controlarse?" ],
    qs: [
      { q: "Que siente?", opts: [{ t: "Nerviosismo", v: 0 },{ t: "Crisis de panico", v: 1 },{ t: "Tristeza profunda", v: 1 },{ t: "No puedo hacer vida normal", v: 2 }]},
    ]},
  herida: { painScale: true,
    disc: [ "Hemorragia incontrolable con presion directa?", "Estructuras profundas visibles (tendon, hueso)?", "Herida por arma?" ],
    qs: [
      { q: "Tamano?", opts: [{ t: "Pequena <2cm", v: 0 },{ t: "Mediana 2-5cm", v: 1 },{ t: "Grande >5cm o profunda", v: 2 }]},
    ]},
  sincope: { painScale: false,
    disc: [ "Sigue inconsciente?", "Dolor toracico o palpitaciones antes del desmayo?", "Ocurrio durante ejercicio fisico?", "Antecedentes cardiacos?" ],
    qs: [
      { q: "Se recupero completamente?", opts: [{ t: "Si, estoy bien", v: 0 },{ t: "Algo confuso", v: 2 },{ t: "Sigo mareado", v: 1 }]},
    ]},
  palpitaciones: { painScale: false,
    disc: [ "Dolor toracico o dificultad respiratoria?", "Perdida de conocimiento?", "Corazon muy rapido >150 lpm, no cede?" ],
    qs: [
      { q: "Como son?", opts: [{ t: "Rapidos, ceden solos", v: 0 },{ t: "Irregulares", v: 1 },{ t: "Rapidos + mareo", v: 2 }]},
    ]},
  tos: { painScale: false,
    disc: [ "Tose sangre?", "No puede respirar por la tos?" ],
    qs: [
      { q: "Tipo de tos?", opts: [{ t: "Seca", v: 0 },{ t: "Con flema clara", v: 0 },{ t: "Flema amarilla/verde", v: 1 },{ t: "Con sangre", v: 3 }]},
      { q: "Duracion?", opts: [{ t: "< 1 semana", v: 0 },{ t: "1-3 semanas", v: 1 },{ t: "> 3 semanas", v: 2 }]},
    ]},
  otros: { painScale: true,
    disc: [ "Dificultad para respirar?", "Perdida de conocimiento?", "Dolor insoportable?" ],
    qs: [
      { q: "Desde cuando?", opts: [{ t: "Horas", v: 2 },{ t: "Dias", v: 1 },{ t: "Semanas", v: 0 },{ t: "Meses", v: 0 }]},
    ]},
};

// ─── QR ───
function QRBox({ data, size=160 }) {
  const s=Math.max(21,Math.min(57,21+Math.ceil(data.length/20)*4));
  const g=Array.from({length:s},()=>Array(s).fill(0));
  const f=(r,c)=>{for(let i=0;i<7;i++)for(let j=0;j<7;j++)if(r+i<s&&c+j<s)g[r+i][c+j]=(i===0||i===6||j===0||j===6||(i>=2&&i<=4&&j>=2&&j<=4))?1:0;};
  f(0,0);f(0,s-7);f(s-7,0);
  let idx=0;for(let i=8;i<s-8;i++)for(let j=8;j<s-8;j++){g[i][j]=(data.charCodeAt(idx%data.length)>>(idx%8))&1;idx++;}
  const cs=size/s;
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{borderRadius:8,background:"#fff",boxShadow:"0 1px 6px rgba(0,0,0,0.06)"}}>
    {g.map((row,y)=>row.map((c,x)=>c?<rect key={`${x}-${y}`} x={x*cs} y={y*cs} width={cs} height={cs} fill="#0c4a6e" rx={cs*0.1}/>:null))}
  </svg>;
}

// ─── EVA ───
function PainScale({value,onChange,t}) {
  const cl=["#22c55e","#4ade80","#84cc16","#a3e635","#facc15","#f59e0b","#f97316","#ef4444","#dc2626","#b91c1c","#7f1d1d"];
  return <div style={{marginBottom:20}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
      <span style={{fontSize:12,color:"#64748b"}}>{t.noPain}</span>
      <span style={{fontSize:14,fontWeight:700,color:cl[value]}}>EVA: {value}/10</span>
      <span style={{fontSize:12,color:"#64748b"}}>{t.maxPain}</span>
    </div>
    <input type="range" min={0} max={10} value={value} onChange={e=>onChange(+e.target.value)} style={{width:"100%",accentColor:cl[value],height:8}}/>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
      {[0,1,2,3,4,5,6,7,8,9,10].map(n=><div key={n} onClick={()=>onChange(n)} style={{width:22,height:22,borderRadius:"50%",background:value===n?cl[n]:"#f1f5f9",color:value===n?"#fff":"#94a3b8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,cursor:"pointer"}}>{n}</div>)}
    </div>
  </div>;
}

function MultiQ({q,onDone,t}) {
  const [ck,setCk]=useState([]);
  return <div>
    {q.opts.map((o,i)=><label key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",background:ck.includes(i)?"#f0f9ff":"#fff",border:`1.5px solid ${ck.includes(i)?"#7dd3fc":"#e2e8f0"}`,borderRadius:10,marginBottom:6,cursor:"pointer"}}>
      <input type="checkbox" checked={ck.includes(i)} onChange={()=>setCk(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i])} style={{accentColor:"#0077B6",width:17,height:17}}/>
      <span style={{fontSize:14,color:"#1e293b"}}>{o.t}</span>
    </label>)}
    <button onClick={()=>{onDone(ck.map(i=>q.opts[i].t),ck.reduce((a,i)=>a+q.opts[i].v,0));}} style={{width:"100%",marginTop:6,padding:"13px",background:"#0077B6",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer"}}>
      {ck.length===0?t.noneNext:`${t.continue_} (${ck.length} ${t.selected})`}
    </button>
  </div>;
}

// ════════════════════════════════════════
// MAIN
// ════════════════════════════════════════
function App() {
  const [lang,setLang]=useState("es");
  const t=T[lang]||T.es;
  const SET_L=SET_LEVELS(t);
  const DEST_L={1:t.dest1,2:t.dest2,3:t.dest3,4:t.dest4,5:t.dest5};

  const [scr,setScr]=useState("home");
  const [cat,setCat]=useState(null);
  const [dI,setDI]=useState(0);
  const [dLv,setDLv]=useState(null);
  const [qI,setQI]=useState(0);
  const [pain,setPain]=useState(0);
  const [qS,setQS]=useState(0);
  const [ans,setAns]=useState([]);
  const [fLv,setFLv]=useState(null);
  const [hist,setHist]=useState([]);
  const [accepted,setAccepted]=useState(false);

  // Timers
  const [globalTime,setGlobalTime]=useState(30);
  const [questionTime,setQuestionTime]=useState(7);
  const [triageStarted,setTriageStarted]=useState(false);
  const globalTimerRef=useRef(null);
  const questionTimerRef=useRef(null);
  const triageFinishedRef=useRef(false);

  // Voice
  const [vP,setVP]=useState("idle");
  const [tx,setTx]=useState("");
  const [itm,setItm]=useState("");
  const [vA,setVA]=useState(null);
  const [vFu,setVFu]=useState([]);
  const [vFi,setVFi]=useState(0);
  const [vFa,setVFa]=useState([]);
  const [pulse,setPulse]=useState(0);
  const [gemK,setGemK]=useState(()=>{try{return localStorage.getItem("gk")||"";}catch(e){return"";}});
  const [showKey,setShowKey]=useState(false);
  const [vLang,setVLang]=useState("es-ES");
  const recRef=useRef(null);
  const animRef=useRef(null);
  const scrollRef=useRef(null);

  useEffect(()=>{scrollRef.current?.scrollTo(0,0);},[scr,dI,qI,vP,vFi]);

  // Global 30s timer — starts when triage begins, ends the triage when it hits 0
  useEffect(()=>{
    if(triageStarted&&scr==="triage"&&!triageFinishedRef.current){
      clearInterval(globalTimerRef.current);
      globalTimerRef.current=setInterval(()=>{
        setGlobalTime(prev=>{
          if(prev<=1){
            clearInterval(globalTimerRef.current);
            clearInterval(questionTimerRef.current);
            if(!triageFinishedRef.current){triageFinishedRef.current=true;forceFinish();}
            return 0;
          }
          return prev-1;
        });
      },1000);
      return ()=>clearInterval(globalTimerRef.current);
    }
  },[triageStarted,scr]);

  // Per-question 7s timer — resets on each new question/discriminator step
  useEffect(()=>{
    if(triageStarted&&scr==="triage"&&!triageFinishedRef.current){
      setQuestionTime(7);
      clearInterval(questionTimerRef.current);
      questionTimerRef.current=setInterval(()=>{
        setQuestionTime(prev=>{
          if(prev<=1){
            clearInterval(questionTimerRef.current);
            if(!triageFinishedRef.current){autoAdvance();}
            return 0;
          }
          return prev-1;
        });
      },1000);
      return ()=>clearInterval(questionTimerRef.current);
    }
  },[dI,qI,triageStarted,scr,ans.length]);

  // Force finish with whatever data we have
  const forceFinish=()=>{
    clearInterval(globalTimerRef.current);
    clearInterval(questionTimerRef.current);
    const lv=computeLevel();
    finish(lv);
  };

  // Auto-advance: skip current question with neutral answer
  const autoAdvance=()=>{
    const flow=FLOWS[cat];if(!flow)return;
    const discs=flow.disc||[];const qs=flow.qs||[];
    // If on discriminators, treat as "No"
    if(dI<discs.length&&!dLv){
      setAns(a=>[...a,{q:discs[dI],a:t.autoFinish}]);
      setDI(prev=>prev+1);
      return;
    }
    // If on pain scale, skip with current value
    if(flow.painScale&&!ans.find(a=>a.q===t.painEVA)){
      setAns(a=>[...a,{q:t.painEVA,a:`${pain}/10`}]);
      return;
    }
    // If on questions, skip with first (least severe) option
    if(qI<qs.length){
      const cq=qs[qI];
      const first=cq.opts[0];
      setAns(a=>[...a,{q:cq.q,a:t.autoFinish}]);
      setQS(s=>s+(first?first.v:0));
      setQI(qi=>qi+1);
      return;
    }
    // Otherwise finish
    if(!triageFinishedRef.current){triageFinishedRef.current=true;forceFinish();}
  };

  const saveK=(k)=>{setGemK(k);try{localStorage.setItem("gk",k);}catch(e){}};

  const reset=()=>{
    clearInterval(globalTimerRef.current);clearInterval(questionTimerRef.current);
    triageFinishedRef.current=false;
    setCat(null);setDI(0);setDLv(null);setQI(0);setPain(0);setQS(0);
    setAns([]);setFLv(null);setScr("home");setAccepted(false);
    setGlobalTime(30);setQuestionTime(7);setTriageStarted(false);
    setVP("idle");setTx("");setItm("");setVA(null);setVFu([]);setVFi(0);setVFa([]);
  };

  const finish=(level,a)=>{
    clearInterval(globalTimerRef.current);clearInterval(questionTimerRef.current);
    triageFinishedRef.current=true;setTriageStarted(false);
    const e={date:new Date().toLocaleString(lang==="ar"?"ar-SA":lang+"-"+lang.toUpperCase(),{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}),cat:cat?CATS.find(c=>c.id===cat)?.[lang]||CATS.find(c=>c.id===cat)?.es:"Voice AI",level,answers:a||ans};
    setFLv(level);setHist(p=>[e,...p]);setScr("result");
  };

  const computeLevel=()=>{
    if(dLv)return dLv;
    let s=qS;
    if(pain>=8)return 2;
    if(pain>=5)s+=2;
    if(pain>=3)s+=1;
    if(s>=6)return 3;
    if(s>=3)return 4;
    return 5;
  };

  // ─── GEMINI VOICE ───
  const startVoice=()=>{setScr("voice");setVP("idle");setTx("");setItm("");};

  const startRec=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){alert(t.browserNoVoice);return;}
    const r=new SR();r.lang=vLang;r.continuous=true;r.interimResults=true;
    let ft="";
    r.onresult=e=>{let fin="",int="";for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)fin+=e.results[i][0].transcript+" ";else int=e.results[i][0].transcript;}if(fin){ft+=fin;setTx(ft);}setItm(int);};
    r.onerror=()=>setVP("idle");r.onend=()=>{};
    recRef.current=r;r.start();setVP("recording");
    animRef.current=setInterval(()=>setPulse(p=>(p+1)%100),60);
  };

  const stopRec=()=>{
    if(recRef.current)try{recRef.current.stop();}catch(e){}
    clearInterval(animRef.current);
    if(!tx.trim()){setVP("idle");return;}
    setVP("analyzing");callGemini(tx.trim());
  };

  const TPROMPT=(text)=>`You are a medical triage system from the Servicio Murciano de Salud (SMS) based on the Sistema Espanol de Triaje (SET) with 5 priority levels, following the NHS Pathways conservative principle.

STRICT INSTRUCTIONS:
1. Detect the patient's language
2. If NOT Spanish, translate to Spanish for the healthcare professional
3. Classify according to SET levels I(Resuscitation) II(Emergency) III(Urgency) IV(Standard) V(Non-urgent)
4. Identify positive severity discriminators
5. If you need more info, generate 1-2 questions IN THE PATIENT'S LANGUAGE
6. Generate clinical summary in Spanish

Respond ONLY with valid JSON, no markdown, no backticks:
{"idioma":"string","traduccion_es":"string","nivel_set":1-5,"categoria":"string","sintomas":["s1"],"discriminadores":["d1"],"dolor_eva":0-10,"resumen_clinico":"string in Spanish","preguntas":["question in patient language"],"destino":"urgencias|suap|centro_salud|farmacia","especialidad":"string"}

Patient says: "${text}"`;

  const callGemini=async(text)=>{
    if(gemK){
      try{
        const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${gemK}`,{
          method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({contents:[{parts:[{text:TPROMPT(text)}]}],generationConfig:{temperature:0.2,maxOutputTokens:1024,responseMimeType:"application/json"}})
        });
        const d=await r.json();const raw=d?.candidates?.[0]?.content?.parts?.[0]?.text||"";
        const parsed=JSON.parse(raw.replace(/```json|```/g,"").trim());
        return handleAI(parsed);
      }catch(e){console.warn("Gemini fail:",e);}
    }
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:TPROMPT(text)}]})});
      const d=await r.json();const txt=d.content?.map(b=>b.text||"").join("")||"";
      return handleAI(JSON.parse(txt.replace(/```json|```/g,"").trim()));
    }catch(e){console.warn("Anthropic fail:",e);}
    handleAI(localFallback(text));
  };

  const localFallback=(text)=>{
    const lo=text.toLowerCase();let lv=4;
    if(["no responde","inconsciente","no respira","convulsion"].some(a=>lo.includes(a)))lv=1;
    else if(["pecho","infarto","sangre mucha","desmayo","subito","no puedo respirar"].some(a=>lo.includes(a)))lv=2;
    else if(lo.match(/fiebre alta|39|vomit|no para/))lv=3;
    else if(lo.match(/dolor|fiebre|tos|molest/))lv=4;else lv=5;
    return{idioma:"es",traduccion_es:text,nivel_set:lv,categoria:"General",sintomas:[text.slice(0,60)],discriminadores:[],dolor_eva:lv<=2?8:3,resumen_clinico:text.slice(0,150),preguntas:lv>2?["Tiene fiebre?","Desde cuando tiene estos sintomas?"]:[],destino:lv<=2?"urgencias":"centro_salud",especialidad:"Medicina de Familia"};
  };

  const handleAI=(p)=>{setVA(p);if(p.preguntas?.length>0){setVFu(p.preguntas.slice(0,3));setVP("followup");}else finishVoice(p,[]);};

  const finishVoice=(a,fua)=>{
    const allAns=[
      {q:t.patientNarrative,a:tx.trim()},
      ...(a.idioma&&a.idioma!=="es"&&a.idioma!=="espanol"?[{q:t.langDetected+": "+a.idioma,a:a.traduccion_es}]:[]),
      {q:t.detectedSymptomsLabel,a:(a.sintomas||[]).join(", ")},
      {q:t.clinicalSummary,a:a.resumen_clinico||""},
      ...fua.map((a2,i)=>({q:vFu[i]||`${t.followupQ} ${i+1}`,a:a2})),
    ];
    setCat(null);setAns(allAns);finish(a.nivel_set||4,allAns);
  };

  // ─── STYLES ───
  const F="'DM Sans',-apple-system,system-ui,sans-serif";
  const isRTL=lang==="ar";
  const dir=isRTL?"rtl":"ltr";
  const btnS=(bg,c="#fff")=>({width:"100%",padding:"15px",background:bg,color:c,border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:F,transition:"all .12s"});

  // ─── RENDER SCREENS ───
  const renderHome=()=><div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
    <div style={{textAlign:"center",padding:"24px 0 20px"}}>
      <div style={{width:64,height:64,borderRadius:16,background:"linear-gradient(135deg,#0077B6,#023E8A)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",boxShadow:"0 6px 20px rgba(0,119,182,0.2)"}}>
        <span style={{fontSize:26,color:"#fff",fontWeight:800,fontFamily:F}}>SET</span>
      </div>
      <h1 style={{margin:"0 0 2px",fontSize:22,fontFamily:F,color:"#0c4a6e",fontWeight:800}}>{t.appName}</h1>
      <p style={{color:"#64748b",fontSize:12,margin:0}}>{t.subtitle}</p>
    </div>
    {/* Lang selector */}
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:16}}>
      {LANG_OPTIONS.map(l=><button key={l.code} onClick={()=>setLang(l.code)} style={{padding:"5px 12px",borderRadius:8,border:`1.5px solid ${lang===l.code?"#0077B6":"#e2e8f0"}`,background:lang===l.code?"#f0f9ff":"#fff",color:lang===l.code?"#0077B6":"#64748b",fontSize:12,fontWeight:lang===l.code?700:500,cursor:"pointer",fontFamily:F}}>{l.label}</button>)}
    </div>
    <button onClick={()=>setScr("disclaimer")} style={{...btnS("linear-gradient(135deg,#0077B6,#0096C7)"),marginBottom:8,boxShadow:"0 3px 12px rgba(0,119,182,0.2)"}}>{t.startTriage}</button>
    <button onClick={startVoice} style={{...btnS("linear-gradient(135deg,#7c3aed,#6d28d9)"),marginBottom:20,boxShadow:"0 3px 12px rgba(124,58,237,0.2)",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
      <span>{t.voiceTriage}</span>
      <span style={{fontSize:10,fontWeight:600,background:"rgba(255,255,255,0.2)",padding:"2px 7px",borderRadius:6}}>{t.voiceAI}</span>
    </button>
    {/* NHS note */}
    <div style={{background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:10,padding:12,marginBottom:14,fontSize:12,color:"#0369a1",lineHeight:1.5}}>{t.nhsNote}</div>
    {/* SET reference */}
    <div style={{background:"#fff",borderRadius:12,padding:14,border:"1px solid #e2e8f0",marginBottom:14}}>
      <h3 style={{margin:"0 0 10px",fontSize:13,fontFamily:F,color:"#334155"}}>{t.setLevels}</h3>
      {Object.entries(SET_L).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:+k<5?"1px solid #f8fafc":"none"}}>
        <div style={{width:26,height:26,borderRadius:6,background:v.bg,border:`2px solid ${v.bd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:v.c}}>{v.tag}</div>
        <span style={{flex:1,fontSize:12,fontWeight:600,color:v.c}}>{v.n}</span>
        <span style={{fontSize:11,color:"#94a3b8"}}>{v.tm}</span>
      </div>)}
    </div>
    {hist.length>0&&<div style={{background:"#fff",borderRadius:12,padding:14,border:"1px solid #e2e8f0"}}>
      <h3 style={{margin:"0 0 8px",fontSize:13,fontFamily:F,color:"#334155"}}>{t.lastConsults}</h3>
      {hist.slice(0,5).map((h,i)=>{const lv=SET_L[h.level]||SET_L[4];return <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:i<Math.min(hist.length,5)-1?"1px solid #f8fafc":"none"}}>
        <div><div style={{fontSize:12,fontWeight:600,color:"#1e293b"}}>{h.cat}</div><div style={{fontSize:10,color:"#94a3b8"}}>{h.date}</div></div>
        <div style={{padding:"3px 8px",borderRadius:6,fontSize:10,fontWeight:700,color:lv.c,background:lv.bg,border:`1px solid ${lv.bd}`}}>{t.level} {lv.tag}</div>
      </div>;})}
    </div>}
  </div>;

  const renderDisclaimer=()=><div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
    <div style={{background:"#fef3c7",border:"1.5px solid #fbbf24",borderRadius:14,padding:18,marginBottom:18}}>
      <h3 style={{margin:"0 0 10px",color:"#92400e",fontFamily:F,fontSize:16}}>{t.disclaimer}</h3>
      <p style={{fontSize:13,color:"#78350f",lineHeight:1.6,margin:0}}>{t.disclaimerText}</p>
    </div>
    <label style={{display:"flex",alignItems:"flex-start",gap:10,padding:12,background:"#f8fafc",borderRadius:10,cursor:"pointer",fontSize:13,color:"#334155"}}>
      <input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} style={{marginTop:2,accentColor:"#0077B6",width:17,height:17}}/>
      {t.accept}
    </label>
    <button onClick={()=>{if(accepted)setScr("cat");}} disabled={!accepted} style={{...btnS(accepted?"#0077B6":"#cbd5e1"),marginTop:16}}>{t.continue_}</button>
  </div>;

  const renderCat=()=><div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
    <h2 style={{margin:"0 0 4px",fontSize:18,fontFamily:F,color:"#0c4a6e"}}>{t.selectSymptom}</h2>
    <p style={{color:"#64748b",fontSize:12,margin:"0 0 14px"}}>{t.selectSymptomSub}</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
      {CATS.map(c=><button key={c.id} onClick={()=>{setCat(c.id);setDI(0);setDLv(null);setQI(0);setPain(0);setQS(0);setAns([{q:t.consultReason,a:c[lang]||c.es}]);setGlobalTime(30);setQuestionTime(7);triageFinishedRef.current=false;setTriageStarted(true);setScr("triage");}}
        style={{padding:"12px 10px",background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,color:"#1e293b",textAlign:"left",fontFamily:F,transition:"all .1s",lineHeight:1.3}}
        onMouseOver={e=>{e.currentTarget.style.borderColor="#0077B6";e.currentTarget.style.background="#f0f9ff";}}
        onMouseOut={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.background="#fff";}}>
        {c[lang]||c.es}
      </button>)}
    </div>
  </div>;

  const renderTriage=()=>{
    const flow=FLOWS[cat];if(!flow)return null;
    const discs=flow.disc||[];const qs=flow.qs||[];

    // Timer bar component
    const TimerBars=()=><div style={{marginBottom:14}}>
      {/* Global 30s bar */}
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
        <span style={{fontSize:10,color:globalTime<=10?"#dc2626":"#64748b",fontWeight:600,whiteSpace:"nowrap",minWidth:70}}>{t.timerGlobal}: {globalTime}{t.secondsLeft}</span>
        <div style={{flex:1,height:6,background:"#e2e8f0",borderRadius:3,overflow:"hidden"}}>
          <div style={{width:`${(globalTime/30)*100}%`,height:"100%",borderRadius:3,transition:"width 1s linear",background:globalTime<=10?"#dc2626":globalTime<=20?"#f59e0b":"#0077B6"}}/>
        </div>
      </div>
      {/* Per-question 7s bar */}
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:10,color:questionTime<=3?"#dc2626":"#94a3b8",fontWeight:600,whiteSpace:"nowrap",minWidth:70}}>{t.timerQuestion}: {questionTime}{t.secondsLeft}</span>
        <div style={{flex:1,height:4,background:"#e2e8f0",borderRadius:2,overflow:"hidden"}}>
          <div style={{width:`${(questionTime/7)*100}%`,height:"100%",borderRadius:2,transition:"width 1s linear",background:questionTime<=3?"#dc2626":questionTime<=5?"#f59e0b":"#22c55e"}}/>
        </div>
      </div>
    </div>;

    // Discriminators
    if(dI<discs.length&&!dLv){
      return <div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
        <TimerBars/>
        <div style={{background:"#fef2f2",border:"1.5px solid #fca5a5",borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:"#dc2626",textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>{t.discriminatorTitle}</div>
          <p style={{fontSize:14,color:"#7f1d1d",margin:0,lineHeight:1.5,fontWeight:500}}>{discs[dI]}</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{setDLv(2);setAns(a=>[...a,{q:discs[dI],a:t.yes}]);}} style={{...btnS("#dc2626"),flex:1,fontSize:17}}>{t.yes}</button>
          <button onClick={()=>{setAns(a=>[...a,{q:discs[dI],a:t.no}]);setDI(dI+1);}} style={{...btnS("#e2e8f0","#475569"),flex:1,fontSize:17}}>{t.no}</button>
        </div>
        <div style={{marginTop:14,display:"flex",gap:3}}>
          {discs.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=dI?"#0077B6":"#e2e8f0"}}/>)}
        </div>
      </div>;
    }
    if(dLv){if(scr==="triage")finish(dLv);return null;}
    // Pain
    if(flow.painScale&&!ans.find(a=>a.q===t.painEVA)){
      return <div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
        <TimerBars/>
        <h3 style={{margin:"0 0 4px",fontSize:16,fontFamily:F,color:"#0c4a6e"}}>{t.painTitle}</h3>
        <p style={{color:"#64748b",fontSize:12,margin:"0 0 14px"}}>{t.painSub}</p>
        <PainScale value={pain} onChange={setPain} t={t}/>
        <button onClick={()=>setAns(a=>[...a,{q:t.painEVA,a:`${pain}/10`}])} style={btnS("linear-gradient(135deg,#0077B6,#0096C7)")}>{t.continue_}</button>
      </div>;
    }
    // Questions
    if(qI<qs.length){
      const cq=qs[qI];
      return <div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
        <TimerBars/>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <div style={{flex:1,height:4,background:"#e2e8f0",borderRadius:2}}>
            <div style={{width:`${((qI+1)/qs.length)*100}%`,height:"100%",background:"#0077B6",borderRadius:2,transition:"width .3s"}}/>
          </div>
          <span style={{fontSize:11,color:"#64748b"}}>{t.question} {qI+1} {t.of} {qs.length}</span>
        </div>
        <h3 style={{margin:"0 0 12px",fontSize:15,fontFamily:F,color:"#0c4a6e"}}>{cq.q}</h3>
        {cq.multi?<MultiQ q={cq} t={t} onDone={(sel,v)=>{setAns(a=>[...a,{q:cq.q,a:sel.join(", ")||"-"}]);setQS(s=>s+v);setQI(i=>i+1);}}/>:
          cq.opts.map((o,i)=><button key={i} onClick={()=>{setAns(a=>[...a,{q:cq.q,a:o.t}]);setQS(s=>s+o.v);setQI(qi=>qi+1);}}
            style={{width:"100%",textAlign:"left",padding:"12px 14px",background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:10,marginBottom:6,cursor:"pointer",fontSize:13,color:"#1e293b",fontFamily:F,transition:"all .1s"}}
            onMouseOver={e=>{e.currentTarget.style.borderColor="#0077B6";e.currentTarget.style.background="#f0f9ff";}}
            onMouseOut={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.background="#fff";}}>{o.t}</button>)}
      </div>;
    }
    const lv=computeLevel();if(scr==="triage")finish(lv);return null;
  };

  const renderResult=()=>{
    const lv=SET_L[fLv]||SET_L[4];const dest=DEST_L[fLv]||DEST_L[4];
    const qrData=JSON.stringify({app:"TriajeSalud",v:3,ts:Date.now(),set:fLv,cat:cat?CATS.find(c=>c.id===cat)?.es:"VoiceAI",ans:ans.slice(0,10)});
    return <div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
      <div style={{background:lv.bg,border:`2px solid ${lv.bd}`,borderRadius:16,padding:22,textAlign:"center",marginBottom:14}}>
        <div style={{width:56,height:56,borderRadius:14,background:lv.c,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",boxShadow:`0 4px 14px ${lv.c}30`}}>
          <span style={{fontSize:24,color:"#fff",fontWeight:800,fontFamily:F}}>{lv.tag}</span>
        </div>
        <div style={{fontSize:20,fontWeight:800,color:lv.c,fontFamily:F}}>{lv.n}</div>
        <div style={{fontSize:12,color:"#475569",margin:"4px 0"}}>{t.timeLabel}: {lv.tm}</div>
        <p style={{fontSize:13,color:"#334155",margin:"10px 0 0",lineHeight:1.5}}>{dest}</p>
      </div>
      {fLv<=2&&<a href="tel:112" style={{display:"block",padding:"14px",background:"#dc2626",color:"#fff",borderRadius:12,fontSize:17,fontWeight:800,textAlign:"center",textDecoration:"none",marginBottom:10,fontFamily:F}}>{t.call112}</a>}
      {fLv<=4&&<div style={{background:"#fff",borderRadius:14,padding:18,border:"1px solid #e2e8f0",textAlign:"center",marginBottom:10}}>
        <p style={{fontSize:12,color:"#64748b",margin:"0 0 10px"}}>{t.qrTitle}</p>
        <QRBox data={qrData} size={170}/>
        <p style={{fontSize:10,color:"#94a3b8",margin:"8px 0 0"}}>{t.qrSub}</p>
      </div>}
      <div style={{background:"#fff",borderRadius:14,padding:14,border:"1px solid #e2e8f0",marginBottom:10}}>
        <h4 style={{margin:"0 0 8px",fontSize:13,fontFamily:F,color:"#334155"}}>{t.summaryTitle}</h4>
        {ans.map((a,i)=><div key={i} style={{padding:"5px 0",borderBottom:i<ans.length-1?"1px solid #f8fafc":"none"}}>
          <div style={{fontSize:10,color:"#64748b"}}>{a.q}</div>
          <div style={{fontSize:12,color:"#1e293b",fontWeight:500}}>{a.a}</div>
        </div>)}
      </div>
      <div style={{background:"#f8fafc",borderRadius:8,padding:10,fontSize:10,color:"#64748b",lineHeight:1.5,marginBottom:14}}>{t.legalFooter}</div>
      <button onClick={reset} style={btnS("#f1f5f9","#475569")}>{t.newConsult}</button>
    </div>;
  };

  const renderVoice=()=>{
    const hasSR=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
    const ps=1+Math.sin(pulse*0.12)*0.12;

    if(vP==="idle")return <div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
      <div style={{textAlign:"center",padding:"20px 0 14px"}}>
        <div style={{width:80,height:80,borderRadius:20,background:"linear-gradient(135deg,#7c3aed,#6d28d9)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",boxShadow:"0 6px 20px rgba(124,58,237,0.25)"}}>
          <span style={{fontSize:20,color:"#fff",fontWeight:800,fontFamily:F}}>VOZ</span>
        </div>
        <h2 style={{fontSize:20,fontFamily:F,color:"#1e293b",margin:"0 0 6px"}}>{t.voiceTitle}</h2>
        <p style={{color:"#64748b",fontSize:13,margin:"0 0 14px",lineHeight:1.5,textAlign:"center"}}>{t.voiceSub}</p>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:600,color:"#475569",marginBottom:6}}>{t.voiceLangLabel}</div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {VOICE_LANGS.map(l=><button key={l.code} onClick={()=>setVLang(l.code)} style={{padding:"5px 9px",borderRadius:8,border:`1.5px solid ${vLang===l.code?"#7c3aed":"#e2e8f0"}`,background:vLang===l.code?"#f5f3ff":"#fff",color:vLang===l.code?"#6d28d9":"#475569",fontSize:11,fontWeight:vLang===l.code?700:500,cursor:"pointer",fontFamily:F}}>{l.label}</button>)}
        </div>
      </div>
      <div style={{background:"#f8fafc",borderRadius:10,padding:12,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:11,fontWeight:600,color:"#475569"}}>{t.geminiKeyLabel} {gemK&&<span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block",marginLeft:4}}/>}</span>
          <button onClick={()=>setShowKey(!showKey)} style={{background:"none",border:"none",color:"#7c3aed",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:F}}>{showKey?t.geminiHide:t.geminiConfig}</button>
        </div>
        {showKey&&<div>
          <input type="password" value={gemK} onChange={e=>saveK(e.target.value)} placeholder="AIzaSy..." style={{width:"100%",padding:"9px 10px",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:"monospace",marginBottom:5}}/>
          <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.4}}>{t.geminiGetKey} <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style={{color:"#7c3aed",fontWeight:600}}>aistudio.google.com/apikey</a></div>
        </div>}
        {!showKey&&!gemK&&<div style={{fontSize:10,color:"#ca8a04"}}>{t.geminiNoKey}</div>}
        {!showKey&&gemK&&<div style={{fontSize:10,color:"#16a34a"}}>{t.geminiReady}</div>}
      </div>
      <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:12,marginBottom:14,fontSize:12,color:"#166534",lineHeight:1.5,fontStyle:"italic"}}>{t.voiceExample}</div>
      {!hasSR&&<div style={{background:"#fef2f2",borderRadius:8,padding:10,marginBottom:12,fontSize:11,color:"#dc2626"}}>{t.browserNoVoice}</div>}
      <button onClick={startRec} disabled={!hasSR} style={{...btnS(hasSR?"linear-gradient(135deg,#7c3aed,#6d28d9)":"#e2e8f0",hasSR?"#fff":"#94a3b8"),fontSize:17}}>{t.startSpeaking}</button>
      <div style={{fontSize:10,color:"#94a3b8",marginTop:6,textAlign:"center"}}>{gemK?t.poweredBy:t.localMode}</div>
    </div>;

    if(vP==="recording")return <div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto",textAlign:"center"}}>
      <div style={{position:"relative",width:110,height:110,margin:"16px auto"}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"rgba(124,58,237,0.07)",transform:`scale(${ps*1.4})`}}/>
        <div style={{position:"absolute",inset:10,borderRadius:"50%",background:"rgba(124,58,237,0.1)",transform:`scale(${ps*1.2})`}}/>
        <div style={{position:"absolute",inset:22,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#dc2626)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{color:"#fff",fontWeight:800,fontSize:14,fontFamily:F}}>REC</span>
        </div>
      </div>
      <h3 style={{color:"#dc2626",fontFamily:F,fontSize:16,margin:"0 0 4px"}}>{t.recording}</h3>
      <p style={{color:"#64748b",fontSize:12,margin:"0 0 14px"}}>{t.describeSym}</p>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:2,height:36,marginBottom:14}}>
        {Array.from({length:18}).map((_,i)=>{const h=Math.abs(Math.sin((pulse+i*10)*0.07))*24+3;
          return <div key={i} style={{width:3,height:h,borderRadius:2,background:`hsl(${270-i*4},55%,55%)`,transition:"height .06s"}}/>;
        })}
      </div>
      <div style={{background:"#fff",borderRadius:12,padding:12,border:"1.5px solid #e9d5ff",minHeight:70,textAlign:"left",marginBottom:14}}>
        <div style={{fontSize:10,color:"#7c3aed",fontWeight:600,marginBottom:4}}>{t.transcript}</div>
        <p style={{fontSize:13,color:"#1e293b",lineHeight:1.5,margin:0}}>
          {tx}{itm&&<span style={{color:"#a5b4fc",fontStyle:"italic"}}>{itm}</span>}
          {!tx&&!itm&&<span style={{color:"#d4d4d8",fontStyle:"italic"}}>{t.listening}</span>}
        </p>
      </div>
      <button onClick={stopRec} style={btnS(tx.trim()?"linear-gradient(135deg,#0077B6,#0096C7)":"#e2e8f0",tx.trim()?"#fff":"#94a3b8")}>
        {tx.trim()?t.analyzeBtn:t.speakToContinue}
      </button>
    </div>;

    if(vP==="analyzing")return <div style={{padding:"50px 16px",maxWidth:480,margin:"0 auto",textAlign:"center"}}>
      <div style={{width:60,height:60,borderRadius:16,background:gemK?"linear-gradient(135deg,#4285f4,#ea4335,#fbbc04,#34a853)":"linear-gradient(135deg,#7c3aed,#0077B6)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",animation:"sp 1.5s linear infinite"}}>
        <span style={{color:"#fff",fontWeight:800,fontSize:13,fontFamily:F}}>AI</span>
      </div>
      <style>{`@keyframes sp{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}`}</style>
      <h3 style={{fontFamily:F,color:"#1e293b",margin:"0 0 4px",fontSize:17}}>{gemK?t.analyzing:t.analyzingLocal}</h3>
      <p style={{color:"#64748b",fontSize:12}}>{gemK?t.analyzingSub:t.analyzingLocalSub}</p>
      <div style={{background:"#f8fafc",borderRadius:8,padding:12,marginTop:18,fontSize:12,color:"#475569",fontStyle:"italic",textAlign:"left",lineHeight:1.5}}>
        "{tx.trim().slice(0,180)}{tx.length>180?"...":""}"
      </div>
    </div>;

    if(vP==="followup"&&vFu.length>0){
      const fq=vFu[vFi];
      return <div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
        {vA&&<div style={{background:"#faf5ff",borderRadius:10,padding:10,marginBottom:12}}>
          {vA.idioma&&vA.idioma!=="es"&&vA.idioma!=="espanol"&&<div style={{fontSize:11,color:"#7c3aed",marginBottom:3}}>{t.langDetected}: {vA.idioma}</div>}
          <div style={{fontSize:11,color:"#6b21a8"}}>{t.detectedSymptoms}: {(vA.sintomas||[]).join(", ")}</div>
        </div>}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <div style={{flex:1,height:4,background:"#e2e8f0",borderRadius:2}}>
            <div style={{width:`${((vFi+1)/vFu.length)*100}%`,height:"100%",background:"#7c3aed",borderRadius:2}}/>
          </div>
          <span style={{fontSize:10,color:"#64748b"}}>{t.followupQ} {vFi+1}/{vFu.length}</span>
        </div>
        <h3 style={{margin:"0 0 12px",fontSize:15,fontFamily:F,color:"#0c4a6e"}}>{fq}</h3>
        <textarea placeholder={t.writeAnswer} rows={3} id={`vf-${vFi}`}
          style={{width:"100%",padding:"10px",border:"1.5px solid #e2e8f0",borderRadius:10,fontSize:13,fontFamily:F,resize:"none",outline:"none",boxSizing:"border-box",marginBottom:8}}/>
        <button onClick={()=>{
          const el=document.getElementById(`vf-${vFi}`);const val=el?.value?.trim()||t.noAnswer;
          const na=[...vFa,val];setVFa(na);
          if(vFi+1<vFu.length)setVFi(vFi+1);else finishVoice(vA,na);
        }} style={btnS("linear-gradient(135deg,#7c3aed,#6d28d9)")}>
          {vFi+1<vFu.length?t.nextQuestion:t.seeResult}
        </button>
      </div>;
    }
    return null;
  };

  return <div dir={dir} style={{fontFamily:F,background:"#f8fafc",minHeight:"100vh",display:"flex",flexDirection:"column",maxWidth:"100vw",overflow:"hidden"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{background:"#fff",padding:"9px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e2e8f0",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {scr!=="home"&&<button onClick={reset} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",padding:4,color:"#0077B6",fontFamily:F}}>&#8592;</button>}
        <span style={{fontSize:15,fontWeight:800,color:"#023E8A",fontFamily:F}}>{t.appName}</span>
      </div>
      <span style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>SET v3</span>
    </div>
    <div ref={scrollRef} style={{flex:1,overflowY:"auto",paddingBottom:20}}>
      {scr==="home"&&renderHome()}
      {scr==="disclaimer"&&renderDisclaimer()}
      {scr==="cat"&&renderCat()}
      {scr==="triage"&&renderTriage()}
      {scr==="result"&&renderResult()}
      {scr==="voice"&&renderVoice()}
    </div>
  </div>;
}
