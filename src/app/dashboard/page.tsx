'use client';

import React, { useState, useEffect } from 'react';

// Using inline SVGs for icons for a single-file solution
const IconSchedule = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 fill-[#3498db]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
);
const IconHistory = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 fill-[#3498db]" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L10 12H7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5c-1.46 0-2.82-.64-3.79-1.59L8 16c1.19 1.49 3.09 2.5 5 2.5 4.14 0 7.5-3.36 7.5-7.5S17.14 3 13 3z"/></svg>
);
const IconScore = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 fill-[#3498db]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 12H9v-2h2v2zm-2 4v-2h2v2H9z"/></svg>
);
const IconMedications = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 fill-[#3498db]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6h-2c0-2.21-1.79-4-4-4S9 3.79 9 6H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z"/></svg>
);
const IconVitals = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 fill-[#3498db]" viewBox="0 0 24 24" fill="currentColor"><path d="M22 10.999h-3V7.999a1 1 0 00-1-1h-2v4a1 1 0 01-1 1h-2v-4a1 1 0 00-1-1h-2v4a1 1 0 01-1 1H5.999a1 1 0 01-1-1v-4h-2a1 1 0 00-1 1v3h-3a1 1 0 00-1 1v2a1 1 0 001 1h3v3a1 1 0 001 1h2v-4a1 1 0 011-1h2v4a1 1 0 001 1h2v-4a1 1 0 011-1h2v3a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1z"/></svg>
);
const IconAppointments = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 fill-[#3498db]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm.5 13.5h-1v-4h-2v-1h3v5zm-1-8h-1v-1h2v1z"/></svg>
);
const IconRecords = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 fill-white" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v4h4v12H6z"/></svg>
);
const IconInsights = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 fill-[#8e44ad]" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-9V7h-2v2h2zm0 4h-2v-2h2v2z"/></svg>
);


const translations = {
    en: {
        welcome_message: "Welcome back, Ramesh!", your: "Your", health_dashboard: "Health Dashboard",
        todays_schedule: "Today's Schedule", morning: "☀️ Morning", afternoon: "☀️ Afternoon", night: "🌙 Night", take_now: "Take Now ✅", taken: "Taken 👍",
        consistency_history: "Recent Consistency",
        consistency_score: "Consistency Score", consistency_start: "Let's start your day right!", consistency_progress: "Great progress, keep it up!", consistency_complete: "Excellent! You've completed your schedule.",
        my_medications: "My Medications", med_freq_3: "3 times a day", med_rem_2: "2 days remaining", med_freq_1: "1 time a day", med_rem_5: "5 days remaining", refill_soon: "Refill Soon",
        log_vitals: "Log Health Vitals", bp_placeholder: "BP (e.g., 120/80)", glucose_placeholder: "Glucose", log_vitals_button: "Log Vitals",
        upcoming_appointments: "Upcoming Appointments", appointment_dr: "Follow-up with Dr. Priya Sharma",
        proactive_insights: "Unlock Proactive Health Insights", proactive_desc: "Let ArogyaConnect's AI analyze your past health records to predict potential risks and suggest personalized preventive measures.", upload_button: "Upload Past Records & Analyze", analysis_loader: "Analyzing your records using AI... Please wait.",
        health_insights_title: "Personalized Health Insights",
        risk_1_title: "Potential Risk: Iron Deficiency", preventive_measure: "Preventive Measure:", risk_1_desc: "Your past reports indicate borderline low hemoglobin. We recommend incorporating iron-rich foods like spinach and lentils.",
        risk_2_title: "Potential Risk: Vitamin D Fluctuation", risk_2_desc: "Your Vitamin D levels have varied. Aim for 15 minutes of daily sun exposure and consider adding fortified milk.",
        risk_3_title: "Observation: Stable Blood Pressure", keep_it_up: "Keep it up!", risk_3_desc: "Your blood pressure readings are consistently healthy. Continue your current lifestyle habits.",
        yesterday: "Yesterday", day_before: "Day Before", days_ago: "days ago", uploaded_docs: "Uploaded Documents", view: "View", delete: "Delete"
    },
    hi: {
        welcome_message: "वापसी पर स्वागत है, रमेश!", your: "आपका", health_dashboard: "स्वास्थ्य डैशबोर्ड",
        todays_schedule: "आज का शेड्यूल", morning: "☀️ सुबह", afternoon: "☀️ दोपहर", night: "🌙 रात", take_now: "अभी लें ✅", taken: "ले लिया 👍",
        consistency_history: "हाल की निरंतरता",
        consistency_score: "निरंतरता स्कोर", consistency_start: "आइए अपने दिन की सही शुरुआत करें!", consistency_progress: "बढ़िया प्रगति, जारी रखें!", consistency_complete: "उत्कृष्ट! आपने अपना शेड्यूल पूरा कर लिया है।",
        my_medications: "मेरी दवाएं", med_freq_3: "दिन में 3 बार", med_rem_2: "2 दिन शेष", med_freq_1: "दिन में 1 बार", med_rem_5: "5 दिन शेष", refill_soon: "जल्द ही फिर से भरें",
        log_vitals: "स्वास्थ्य पैरामीटर लॉग करें", bp_placeholder: "बीपी (उदा. 120/80)", glucose_placeholder: "ग्लूकोज", log_vitals_button: "पैरामीटर लॉग करें",
        upcoming_appointments: "आगामी अपॉइंटमेंट्स", appointment_dr: "डॉ. प्रिया शर्मा के साथ फॉलो-अप",
        proactive_insights: "सक्रिय स्वास्थ्य जानकारी अनलॉक करें", proactive_desc: "संभावित जोखिमों की भविष्यवाणी करने और व्यक्तिगत निवारक उपायों का सुझाव देने के लिए आरोग्यकनेक्ट के AI को अपने पिछले स्वास्थ्य रिकॉर्ड का विश्लेषण करने दें।", upload_button: "पुराने रिकॉर्ड अपलोड और विश्लेषण करें", analysis_loader: "AI का उपयोग करके आपके रिकॉर्ड का विश्लेषण किया जा रहा है... कृपया प्रतीक्षा करें।",
        health_insights_title: "व्यक्तिगत स्वास्थ्य जानकारी",
        risk_1_title: "संभावित जोखिम: आयरन की कमी", preventive_measure: "निवारक उपाय:", risk_1_desc: "आपकी पिछली रिपोर्टों में हीमोग्लोबिन की कमी का संकेत है। हम पालक और दाल जैसे आयरन युक्त खाद्य पदार्थों को शामिल करने की सलाह देते हैं।",
        risk_2_title: "संभावित जोखिम: विटामिन डी में उतार-चढ़ाव", risk_2_desc: "आपके विटामिन डी के स्तर में उतार-चढ़ाव आया है। प्रतिदिन 15 मिनट धूप लेने का लक्ष्य रखें।",
        risk_3_title: "अवलोकन: स्थिर रक्तचाप", keep_it_up: "बहुत बढ़िया!", risk_3_desc: "आपका रक्तचाप लगातार स्वस्थ सीमा में है। अपनी वर्तमान जीवनशैली की आदतें जारी रखें।",
        yesterday: "कल", day_before: "परसों", days_ago: "दिन पहले", uploaded_docs: "अपलोड किए गए दस्तावेज़", view: "देखें", delete: "हटाएं"
    },
    or: {
        welcome_message: "ପୁଣି ସ୍ୱାଗତ, ରମେଶ!", your: "ଆପଣଙ୍କର", health_dashboard: "ସ୍ୱାସ୍ଥ୍ୟ ଡ୍ୟାସବୋର୍ଡ",
        todays_schedule: "ଆଜିର ସୂଚୀ", morning: "☀️ ସକାଳ", afternoon: "☀️ ଅପରାହ୍ନ", night: "🌙 ରାତି", take_now: "ଏବେ ନିଅନ୍ତୁ ✅", taken: "ନିଆଯାଇଛି 👍",
        consistency_history: "ନିକଟସ୍ଥ ନିରନ୍ତରତା",
        consistency_score: "ନିରନ୍ତରତା ସ୍କୋର", consistency_start: "ଆସନ୍ତୁ ଆପଣଙ୍କ ଦିନର ସଠିକ୍ ଆରମ୍ଭ କରିବା!", consistency_progress: "ଉତ୍ତମ ଅଗ୍ରଗତି, ଏହାକୁ ଜାରି ରଖନ୍ତୁ!", consistency_complete: "ଉତ୍କୃଷ୍ଟ! ଆପଣ ଆପଣଙ୍କର ସୂଚୀ ସମ୍ପୂର୍ଣ୍ଣ କରିଛନ୍ତି।",
        my_medications: "ମୋର ଔଷଧ", med_freq_3: "ଦିନକୁ 3 ଥର", med_rem_2: "2 ଦିନ ବାକି ଅଛି", med_freq_1: "1 ଦିନକୁ 1 ଥର", med_rem_5: "5 ଦିନ ବାକି ଅଛି", refill_soon: "ଶୀଘ୍ର ପୁଣି ଭରନ୍ତୁ",
        log_vitals: "ସ୍ୱାସ୍ଥ୍ୟ ଭାଇଟାଲ୍ ଲଗ୍ କରନ୍ତୁ", bp_placeholder: "ବିପି (ଉଦା. 120/80)", glucose_placeholder: "ଗ୍ଲୁକୋଜ୍", log_vitals_button: "ଭାଇଟାଲ୍ ଲଗ୍ କରନ୍ତୁ",
        upcoming_appointments: "ଆଗାମୀ ଆପଏଣ୍ଟମେଣ୍ଟ", appointment_dr: "ଡାକ୍ତର ପ୍ରିୟା ଶର୍ମାଙ୍କ ସହିତ ଫଲୋ-ଅପ୍",
        proactive_insights: "ପ୍ରୋଆକ୍ଟିଭ୍ ସ୍ୱାସ୍ଥ୍ୟ ଅନ୍ତର୍ଦୃଷ୍ଟି", proactive_desc: "ସମ୍ଭାବ୍ୟ ବିପଦର ଭବିଷ୍ୟବାଣୀ କରିବାକୁ ଆରୋଗ୍ୟ କନେକ୍ଟର AI କୁ ଆପଣଙ୍କର ଅତୀତର ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ବିଶ୍ଳେଷଣ କରିବାକୁ ଦିଅନ୍ତୁ।", upload_button: "ପୁରୁଣା ରେକର୍ଡ ଅପଲୋଡ୍ କରନ୍ତୁ", analysis_loader: "AI ବ୍ୟବହାର କରି ଆପଣଙ୍କର ରେକର୍ଡ ବିଶ୍ଳେଷଣ କରାଯାଉଛି...",
        health_insights_title: "ବ୍ୟକ୍ତିଗତ ସ୍ୱାସ୍ଥ୍ୟ ଅନ୍ତର୍ଦୃଷ୍ଟି",
        risk_1_title: "ସମ୍ଭାବ୍ୟ ବିପଦ: ଆଇରନ୍ ଅଭାବ", preventive_measure: "ପ୍ରତିଷେଧକ ବ୍ୟବସ୍ଥା:", risk_1_desc: "ଆପଣଙ୍କର ପୂର୍ବ ରିପୋର୍ଟଗୁଡିକ ସୀମାନ୍ତ କମ୍ ହିମୋଗ୍ଲୋବିନ୍ ସୂଚିତ କରେ।",
        risk_2_title: "ସମ୍ଭାବ୍ୟ ବିପଦ: ଭିଟାମିନ୍ ଡି ପରିବର୍ତ୍ତନ", risk_2_desc: "ଆପଣଙ୍କର ଭିଟାମିନ୍ ଡି ସ୍ତର ଭିନ୍ନ ହୋଇଛି। ଦୈନିକ 15 ମିନିଟ୍ ସୂର୍ଯ୍ୟ କିରଣ ପାଇଁ ଲକ୍ଷ୍ୟ ରଖନ୍ତୁ।",
        risk_3_title: "ପର୍ଯ୍ୟବେକ୍ଷଣ: ସ୍ଥିର ରକ୍ତଚାପ", keep_it_up: "ଏହାକୁ ଜାରି ରଖନ୍ତୁ!", risk_3_desc: "ଆପଣଙ୍କର ରକ୍ତଚାପ ପଠନ କ୍ରମାଗତ ଭାବରେ ସୁସ୍ଥ ସୀମା ମଧ୍ୟରେ ରହିଛି।",
        yesterday: "ଗତକାଲି", day_before: "ପରଦିନ", days_ago: "ଦିନ ପୂର୍ବରୁ", uploaded_docs: "ଅପଲୋଡ୍ ହୋଇଥିବା ଡକ୍ୟୁମେଣ୍ଟ୍", view: "ଦେଖନ୍ତୁ", delete: "ଡିଲିଟ୍ କରନ୍ତୁ"
    }
};

const mockSchedule = [
    { timeKey: 'morning', name: 'Paracetamol 500mg' },
    { timeKey: 'afternoon', name: 'Paracetamol 500mg' },
    { timeKey: 'night', name: 'Paracetamol 500mg, Amoxicillin 250mg' },
];

const mockHistory = [
    { day: 1, morning: 'taken', afternoon: 'taken', night: 'skipped' },
    { day: 2, morning: 'taken', afternoon: 'taken', night: 'taken' },
    { day: 3, morning: 'taken', afternoon: 'skipped', night: 'skipped' },
];

const mockDocuments = [
    { id: 1, name: 'blood_report_2024.pdf' },
];


const DashboardPage = () => {
    const [lang, setLang] = useState('en');
    const [takenDoses, setTakenDoses] = useState(0);
    const totalDoses = mockSchedule.length;
    const [showInsights, setShowInsights] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState(mockDocuments);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const getTranslation = (key: string, currentLang: string) => {
        return (translations as any)[currentLang][key] || key;
    };

    const updateConsistencyScore = () => {
        const percentage = Math.round((takenDoses / totalDoses) * 100);
        let textKey = 'consistency_start';
        if (percentage > 0 && percentage < 100) {
            textKey = 'consistency_progress';
        } else if (percentage === 100) {
            textKey = 'consistency_complete';
        }
        return { percentage, text: getTranslation(textKey, lang) };
    };

    const markDose = () => {
        if (takenDoses < totalDoses) {
            setTakenDoses(takenDoses + 1);
        }
    };

    const simulateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setTimeout(() => {
            setUploadedDocs([...uploadedDocs, { id: Date.now(), name: file.name }]);
            setIsUploading(false);
            setShowInsights(true);
        }, 3000);
    };

    const handleDeleteDocument = (docId: number) => {
        setUploadedDocs(uploadedDocs.filter(doc => doc.id !== docId));
    };

    const handleViewDocument = (fileName: string) => {
        alert(`Simulating view for: ${fileName}\nIn a real app, this would open the document.`);
    };

    return (
        <div className="bg-gray-100 min-h-screen text-gray-800 font-poppins p-4 sm:p-6 lg:p-8">
            <style>{`
                :root {
                    --primary-color: #3498db;
                    --secondary-color: #2c3e50;
                    --success-color: #2ecc71;
                    --warning-color: #f1c40f;
                    --danger-color: #e74c3c;
                    --info-color: #8e44ad;
                    --light-bg: #f4f7f9;
                    --white-bg: #ffffff;
                    --text-color: #34495e;
                    --text-light: #7f8c8d;
                    --border-color: #e1e5e8;
                    --shadow: 0 6px 20px rgba(0,0,0,0.07);
                    --card-radius: 12px;
                }
                .widget h3 svg {
                    fill: var(--primary-color);
                }
                .widget.health-records h3 svg { fill: white; }
                .widget.health-records h3, .widget.health-records p { color: white; }
                .btn-take { background: var(--primary-color); color: white; }
                .btn-taken { background: var(--success-color); color: white; cursor: not-allowed; }
                .refill-badge { background: var(--warning-color); color: var(--text-color); }
                .btn-log { background: var(--secondary-color); color: white; }
                .upload-button { background: var(--primary-color); color: white; }
                .insight-card { border-left: 5px solid var(--info-color); background: var(--light-bg); }
                .status-taken { color: var(--success-color); }
                .status-skipped { color: var(--danger-color); }
                .view-button { background: var(--white-bg); color: var(--secondary-color); }
                .delete-button { background-color: var(--danger-color); color: white; }
            `}</style>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
                            {getTranslation('welcome_message', lang)}
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 mt-1">
                            {getTranslation('your', lang)} <span className="text-blue-600 font-bold">Arogya</span>Connect {getTranslation('health_dashboard', lang)}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="text-gray-500 font-medium text-sm sm:text-base">
                            {formattedDate}
                        </div>
                        <div className="rounded-md">
                            <select
                                id="language-switcher"
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                                className="p-2 rounded-lg border border-gray-300 bg-white font-medium text-sm sm:text-base cursor-pointer"
                            >
                                <option value="en">English</option>
                                <option value="hi">हिन्दी (Hindi)</option>
                                <option value="or">ଓଡ଼ିଆ (Odia)</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Today's Schedule */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <IconSchedule /> {getTranslation('todays_schedule', lang)}
                        </h3>
                        <div>
                            {mockSchedule.map((dose, index) => (
                                <div key={index} className="flex justify-between items-center py-4 border-b last:border-b-0 border-gray-200">
                                    <div>
                                        <span className="block font-semibold text-lg">{getTranslation(dose.timeKey, lang)}</span>
                                        <span className="block text-sm text-gray-500 mt-1">{dose.name}</span>
                                    </div>
                                    <button
                                        onClick={markDose}
                                        disabled={takenDoses > index}
                                        className={`btn-take text-white py-2 px-4 rounded-full font-medium transition-colors duration-300 ${takenDoses > index ? 'btn-taken' : ''}`}
                                    >
                                        {takenDoses > index ? getTranslation('taken', lang) : getTranslation('take_now', lang)}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Consistency */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <IconHistory /> {getTranslation('consistency_history', lang)}
                        </h3>
                        <div>
                            {mockHistory.map((item, index) => {
                                const date = new Date();
                                date.setDate(date.getDate() - item.day);
                                const dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                                let dayLabel = `${item.day} ${getTranslation('days_ago', lang)}`;
                                if (item.day === 1) dayLabel = getTranslation('yesterday', lang);
                                if (item.day === 2) dayLabel = getTranslation('day_before', lang);

                                return (
                                    <details key={index} className="mb-2 last:mb-0">
                                        <summary className="cursor-pointer p-3 bg-gray-100 rounded-lg font-semibold relative list-none">
                                            {dayLabel}, {dateString}
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 transform transition-transform duration-200 details-icon">▼</span>
                                        </summary>
                                        <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
                                            <div className="flex justify-between py-1">
                                                <span>{getTranslation('morning', lang)}</span>
                                                <span className={`status-${item.morning} font-medium`}>{getTranslation(item.morning, lang) || item.morning}</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>{getTranslation('afternoon', lang)}</span>
                                                <span className={`status-${item.afternoon} font-medium`}>{getTranslation(item.afternoon, lang) || item.afternoon}</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>{getTranslation('night', lang)}</span>
                                                <span className={`status-${item.night} font-medium`}>{getTranslation(item.night, lang) || item.night}</span>
                                            </div>
                                        </div>
                                    </details>
                                );
                            })}
                        </div>
                    </div>

                    {/* Consistency Score */}
                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-xl font-semibold mb-4 flex items-center self-start">
                            <IconScore /> {getTranslation('consistency_score', lang)}
                        </h3>
                        <div className="relative w-36 h-36 rounded-full flex items-center justify-center">
                            <div className="absolute w-full h-full rounded-full" style={{
                                background: `conic-gradient(#2ecc71 ${updateConsistencyScore().percentage * 3.6}deg, #f4f7f9 ${updateConsistencyScore().percentage * 3.6}deg)`
                            }}></div>
                            <div className="absolute w-[120px] h-[120px] bg-white rounded-full"></div>
                            <div className="absolute font-bold text-2xl text-gray-800">{updateConsistencyScore().percentage}%</div>
                        </div>
                        <p className="mt-4 font-medium text-center text-sm sm:text-base">{updateConsistencyScore().text}</p>
                    </div>

                    {/* My Medications */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <IconMedications /> {getTranslation('my_medications', lang)}
                        </h3>
                        <div className="divide-y divide-gray-200">
                            <div className="flex justify-between items-center py-4">
                                <div>
                                    <strong className="text-base sm:text-lg">Paracetamol 500mg</strong>
                                    <div className="text-sm text-gray-500 mt-1">{getTranslation('med_freq_3', lang)} - {getTranslation('med_rem_2', lang)}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-4">
                                <div>
                                    <strong className="text-base sm:text-lg">Amoxicillin 250mg</strong>
                                    <div className="text-sm text-gray-500 mt-1">{getTranslation('med_freq_1', lang)} - {getTranslation('med_rem_5', lang)}</div>
                                </div>
                                <span className="refill-badge text-gray-800 py-1 px-3 rounded-full text-xs sm:text-sm font-semibold">
                                    {getTranslation('refill_soon', lang)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Log Vitals */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <IconVitals /> {getTranslation('log_vitals', lang)}
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
                            <input
                                type="text"
                                placeholder={getTranslation('bp_placeholder', lang)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            <input
                                type="text"
                                placeholder={getTranslation('glucose_placeholder', lang)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <button onClick={() => alert('Vitals logged successfully!')} className="btn-log w-full text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-700">
                            {getTranslation('log_vitals_button', lang)}
                        </button>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <IconAppointments /> {getTranslation('upcoming_appointments', lang)}
                        </h3>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="font-semibold text-gray-800 text-sm sm:text-base">
                                {getTranslation('appointment_dr', lang)}
                            </div>
                            <div className="text-blue-600 font-medium text-sm mt-1">
                                Sept 20, 2025 - 11:30 AM
                            </div>
                        </div>
                    </div>

                    {/* Health Records Widget */}
                    <div className="lg:col-span-3 bg-gray-800 text-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.005]">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <IconRecords /> {getTranslation('proactive_insights', lang)}
                        </h3>
                        {isUploading ? (
                            <div className="text-center font-semibold italic text-sm sm:text-base">
                                {getTranslation('analysis_loader', lang)}
                            </div>
                        ) : uploadedDocs.length > 0 && showInsights ? (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-white">
                                    {getTranslation('uploaded_docs', lang)}
                                </h3>
                                <ul className="list-none p-0 m-0">
                                    {uploadedDocs.map((doc) => (
                                        <li key={doc.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg mb-2">
                                            <span className="text-sm sm:text-base">{doc.name}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleViewDocument(doc.name)}
                                                    className="bg-white text-gray-800 py-1 px-3 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors duration-200"
                                                >
                                                    {getTranslation('view', lang)}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDocument(doc.id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded-full text-xs font-semibold hover:bg-red-600 transition-colors duration-200"
                                                >
                                                    {getTranslation('delete', lang)}
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm sm:text-base text-gray-300 mb-6">
                                    {getTranslation('proactive_desc', lang)}
                                </p>
                                <label className="cursor-pointer">
                                    <input type="file" className="hidden" onChange={simulateUpload} />
                                    <div className="upload-button py-3 px-6 rounded-full font-semibold transition-transform duration-300 hover:scale-105 inline-block text-center">
                                        {getTranslation('upload_button', lang)}
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Health Insights Widget */}
                    {showInsights && (
                        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <IconInsights /> {getTranslation('health_insights_title', lang)}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="insight-card rounded-lg p-5">
                                    <div className="font-semibold text-gray-800 mb-1">
                                        {getTranslation('risk_1_title', lang)}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <strong className="text-blue-600">{getTranslation('preventive_measure', lang)}</strong> {getTranslation('risk_1_desc', lang)}
                                    </div>
                                </div>
                                <div className="insight-card rounded-lg p-5">
                                    <div className="font-semibold text-gray-800 mb-1">
                                        {getTranslation('risk_2_title', lang)}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <strong className="text-blue-600">{getTranslation('preventive_measure', lang)}</strong> {getTranslation('risk_2_desc', lang)}
                                    </div>
                                </div>
                                <div className="insight-card rounded-lg p-5">
                                    <div className="font-semibold text-gray-800 mb-1">
                                        {getTranslation('risk_3_title', lang)}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <strong className="text-green-600">{getTranslation('keep_it_up', lang)}</strong> {getTranslation('risk_3_desc', lang)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
