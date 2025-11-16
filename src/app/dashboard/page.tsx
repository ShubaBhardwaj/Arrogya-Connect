// app/dashboard/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function DashboardPage() {
  // Navbar
  const [menuOpen, setMenuOpen] = useState(false);

  // Charts refs & lifecycle
  const pie1 = useRef<HTMLCanvasElement | null>(null);
  const pie2 = useRef<HTMLCanvasElement | null>(null);
  const pie3 = useRef<HTMLCanvasElement | null>(null);
  const pie4 = useRef<HTMLCanvasElement | null>(null);
  const growth = useRef<HTMLCanvasElement | null>(null);
  const charts = useRef<any[]>([]);

  // Scheduler / consistency state
  const [lang, setLang] = useState<"en" | "hi" | "or">("en");
  const [takenCount, setTakenCount] = useState<number>(0);
  const schedule = useRef([
    { timeKey: "morning", name: "Paracetamol 500mg" },
    { timeKey: "afternoon", name: "Paracetamol 500mg" },
    { timeKey: "night", name: "Paracetamol 500mg, Amoxicillin 250mg" },
  ]).current;
  const totalDoses = schedule.length;

  // Upload/docs
  const [docs, setDocs] = useState<Array<{ id: number; name: string }>>([
    { id: 1, name: "blood_report_2024.pdf" },
  ]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showUploaded, setShowUploaded] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  // translations (kept same as your HTML)
  const t: any = {
    en: {
      schedule: "Today's Schedule",
      recent: "Recent Consistency",
      score: "Consistency Score",
      morning: "☀ Morning",
      afternoon: "☀ Afternoon",
      night: "🌙 Night",
      taken: "Taken 👍",
      takeNow: "Take Now  ✅",
      meds: "Chat on Whatsapp",
      three: "3 times a day",
      one: "1 time a day",
      rem2: "2 days remaining",
      rem5: "5 days remaining",
      refill: "Refill Soon",
      log: "Log Health Vitals",
      uploadBtn: "Upload Past Records & Analyze",
      yesterday: "Yesterday",
      dayBefore: "Day Before",
      threeDays: "3 days ago",
      greatStart: "Let's start your day right!",
      progress: "Great progress, keep it up!",
      complete: "Excellent! You've completed your schedule.",
    },
    hi: {
      schedule: "आज का शेड्यूल",
      recent: "हाल की निरंतरता",
      score: "निरंतरता स्कोर",
      morning: "☀ सुबह",
      afternoon: "☀ दोपहर",
      night: "🌙 रात",
      taken: "ले लिया 👍",
      takeNow: "अभी लें ✅",
      meds: "मेरी दवाएं",
      three: "दिन में 3 बार",
      one: "दिन में 1 बार",
      rem2: "2 दिन शेष",
      rem5: "5 दिन शेष",
      refill: "जल्द ही फिर से भरें",
      log: "स्वास्थ्य पैरामीटर लॉग करें",
      uploadBtn: "पुराने रिकॉर्ड अपलोड और विश्लेषण करें",
      yesterday: "कल",
      dayBefore: "परसों",
      threeDays: "3 दिन पहले",
      greatStart: "आइए दिन की सही शुरुआत करें!",
      progress: "बढ़िया प्रगति, जारी रखें!",
      complete: "उत्कृष्ट! आपने शेड्यूल पूरा कर लिया है।",
    },
    or: {
      schedule: "ଆଜିର ସୂଚୀ",
      recent: "ନିକଟସ୍ଥ ନିରନ୍ତରତା",
      score: "ନିରନ୍ତରତା ସ୍କୋର",
      morning: "☀ ସକାଳ",
      afternoon: "☀ ଅପରାହ୍ନ",
      night: "🌙 ରାତି",
      taken: "ନିଆଯାଇଛି 👍",
      takeNow: "ଏବେ ନିଅନ୍ତୁ ✅",
      meds: "ମୋର ଔଷଧ",
      three: "ଦିନକୁ 3 ଥର",
      one: "ଦିନକୁ 1 ଥର",
      rem2: "2 ଦିନ ବାକି",
      rem5: "5 ଦିନ ବାକି",
      refill: "ଶୀଘ୍ର ପୁଣି ଭରନ୍ତୁ",
      log: "ସ୍ୱାସ୍ଥ୍ୟ ଭାଇଟାଲ୍ ଲଗ୍ କରନ୍ତୁ",
      uploadBtn: "ପୁରୁଣା ରେକର୍ଡ ଅପଲୋଡ୍ କରନ୍ତୁ",
      yesterday: "ଗତକାଲି",
      dayBefore: "ପରଦିନ",
      threeDays: "3 ଦିନ ପୂର୍ବରୁ",
      greatStart: "ଦିନର ସଠିକ୍ ଆରମ୍ଭ କରନ୍ତୁ!",
      progress: "ଉତ୍ତମ ଅଗ୍ରଗତି, ଜାରି ରଖନ୍ତୁ!",
      complete: "ଉତ୍କୃଷ୍ଟ! ଆପଣ ସୂଚୀ ସମ୍ପୂର୍ଣ୍ଣ କରିଛନ୍ତି।",
    },
  };

  // Chart setup (same pastel look)
  useEffect(() => {
    const pastel = (hex: string, alpha = 0.85) => {
      const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
      const r = parseInt(c[1], 16),
        g = parseInt(c[2], 16),
        b = parseInt(c[3], 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const pies = [
      {
        ref: pie1,
        labels: ["Adult Female (40%)", "Adult Male (35%)", "Children (<18) (15%)", "Elderly (60+) (10%)"],
        values: [40, 35, 15, 10],
        colors: [pastel("#E91E63"), pastel("#4A90E2"), pastel("#FFA726"), pastel("#757575")],
      },
      {
        ref: pie2,
        labels: ["Odia (71%)", "English (15%)", "Hindi (9%)", "Other (5%)"],
        values: [71, 15, 9, 5],
        colors: [pastel("#26A69A"), pastel("#42A5F5"), pastel("#FFCA28"), pastel("#B0BEC5")],
      },
      {
        ref: pie3,
        labels: ["WhatsApp (85%)", "SMS (15%)"],
        values: [85, 15],
        colors: [pastel("#AB47BC"), pastel("#455A64")],
      },
      {
        ref: pie4,
        labels: ["Positive (75%)", "Neutral (15%)", "Negative (10%)"],
        values: [75, 15, 10],
        colors: [pastel("#66BB6A"), pastel("#FFCA28"), pastel("#EF5350")],
      },
    ];

    pies.forEach((cfg) => {
      if (!cfg.ref.current) return;
      const ctx = cfg.ref.current.getContext("2d");
      if (!ctx) return;
      const chart = new Chart(ctx, {
        type: "doughnut",
        data: { labels: cfg.labels, datasets: [{ data: cfg.values, backgroundColor: cfg.colors, borderWidth: 0 }] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "52%",
          plugins: {
            legend: { position: "right", labels: { boxWidth: 12, color: "#374151", padding: 14, usePointStyle: true } },
            tooltip: { callbacks: { label: (ctx: any) => `${ctx.label}: ${ctx.parsed}%` } },
          },
        },
      });
      charts.current.push(chart);
    });

    if (growth.current) {
      const ctx = growth.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            datasets: [
              {
                label: "Users (in thousands)",
                data: [4.5, 6.2, 7.8, 9.1, 11.5, 13.7],
                backgroundColor: [
                  pastel("#AB47BC"),
                  pastel("#4A5568"),
                  pastel("#22C55E"),
                  pastel("#3B82F6"),
                  pastel("#14B8A6"),
                  pastel("#F59E0B"),
                ],
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, title: { display: true, text: "Users (in thousands)" }, grid: { color: "rgba(0,0,0,.05)" } },
              x: { grid: { display: false } },
            },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (ctx: any) => `${ctx.parsed.y}k Users` } },
            },
          },
        });
        charts.current.push(chart);
      }
    }

    return () => {
      charts.current.forEach((c) => c.destroy());
      charts.current = [];
    };
  }, []);

  // Consistency helpers
  const todayFmt = () =>
    new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const takeDose = (idx: number) => {
    if (takenCount > idx) return; // already taken
    setTakenCount((c) => Math.min(c + 1, totalDoses));
  };

  // ring style for consistency score
  const pct = Math.round((takenCount / totalDoses) * 100);
  const deg = pct * 3.6;
  const ringStyle: React.CSSProperties = { background: `conic-gradient(var(--success) ${deg}deg, var(--ringBg) ${deg}deg)` };

  // date formatter for history rows
  const fmtShort = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const getHistoryDates = () => {
    const d = new Date();
    const d1 = new Date(d);
    d1.setDate(d.getDate() - 1);
    const d2 = new Date(d);
    d2.setDate(d.getDate() - 2);
    const d3 = new Date(d);
    d3.setDate(d.getDate() - 3);
    return [fmtShort(d1), fmtShort(d2), fmtShort(d3)];
  };
  const [d1, d2, d3] = getHistoryDates();

  // File upload simulation
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAnalyzing(true);
    // simulate analysis
    setTimeout(() => {
      setDocs((prev) => [...prev, { id: Date.now(), name: f.name }]);
      setAnalyzing(false);
      setShowUploaded(true);
      setShowInsights(true);
    }, 1600);
  };

  const removeDoc = (id: number) => setDocs((prev) => prev.filter((d) => d.id !== id));

  useEffect(() => {
    document.title = "ArogyaConnect — Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-poppins">
      {/* inline small CSS to keep your exact variables & small utility classes */}
      <style>{`
        :root{ --primary:#10b981; --blue:#3498db; --indigo:#8e44ad; --success:#2ecc71; --warn:#f1c40f; --danger:#e74c3c; --ringBg:#f4f7f9; --shadow:0 6px 20px rgba(0,0,0,.07); }
        .card{background:#fff;border-radius:16px;box-shadow:var(--shadow);} .pill{background:var(--primary);color:#fff;border-radius:9999px;} .btn-take{background:var(--blue);color:#fff;} .btn-taken{background:var(--success)!important;cursor:not-allowed;} .refill{background:var(--warn);color:#111827;} .upload-btn{background:var(--blue);color:#fff;} .insight{border-left:5px solid var(--indigo);background:#f6f5fb;} .status-taken{color:var(--success)} .status-skipped{color:var(--danger)}
      `}</style>

      {/* Top bar */}

      {/* added pb to avoid footer crowding */}
      <main className="max-w-7xl mx-auto px-5 py-6 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Welcome to <span className="text-emerald-600">Arogya</span>Connect
            </h2>
            <p className="text-gray-500 mt-1">Your <span className="text-emerald-600 font-semibold">Arogya</span>Connect Health Dashboard</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-gray-500 font-medium">{todayFmt()}</div>
            <select value={lang} onChange={(e) => setLang(e.target.value as any)} className="p-2 rounded-lg border bg-white">
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <section className="card p-6 transition duration-300 hover:scale-[1.01]">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-[var(--blue)]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <span>{t[lang].schedule}</span>
            </h3>

            <div id="scheduleList">
              {schedule.map((dose, idx) => {
                const disabled = takenCount > idx;
                return (
                  <div key={idx} className="flex justify-between items-center py-4 border-b last:border-b-0 border-gray-200">
                    <div>
                      <div className="block font-semibold text-lg">{t[lang][dose.timeKey]}</div>
                      <div className="block text-sm text-gray-500 mt-1">{dose.name}</div>
                    </div>
                    <button
                      onClick={() => takeDose(idx)}
                      disabled={disabled}
                      className={`px-5 py-2 font-medium rounded-full ${disabled ? "bg-emerald-500 text-white cursor-not-allowed" : "bg-[var(--blue)] text-white"}`}
                    >
                      {disabled ? t[lang].taken : t[lang].takeNow}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Consistency (collapsible) */}
          <section className="card p-6 transition duration-300 hover:scale-[1.01]">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-[var(--blue)]" viewBox="0 0 24 24">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L10 12H7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5c-1.46 0-2.82-.64-3.79-1.59L8 16c1.19 1.49 3.09 2.5 5 2.5 4.14 0 7.5-3.36 7.5-7.5S17.14 3 13 3z" />
              </svg>
              <span>{t[lang].recent}</span>
            </h3>

            <details className="mb-2">
              <summary className="cursor-pointer p-3 bg-gray-100 rounded-lg font-semibold relative">
                <span>{t[lang].yesterday}</span>, <span>{d1}</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2">▾</span>
              </summary>
              <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
                <div className="flex justify-between py-1">
                  <span>{t[lang].morning}</span>
                  <span className="status-taken font-medium">{t[lang].taken}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{t[lang].afternoon}</span>
                  <span className="status-taken font-medium">{t[lang].taken}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{t[lang].night}</span>
                  <span className="status-skipped font-medium">skipped</span>
                </div>
              </div>
            </details>

            <details className="mb-2">
              <summary className="cursor-pointer p-3 bg-gray-100 rounded-lg font-semibold relative">
                <span>{t[lang].dayBefore}</span>, <span>{d2}</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2">▾</span>
              </summary>
              <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
                <div className="flex justify-between py-1">
                  <span>{t[lang].morning}</span>
                  <span className="status-taken font-medium">{t[lang].taken}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{t[lang].afternoon}</span>
                  <span className="status-taken font-medium">{t[lang].taken}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{t[lang].night}</span>
                  <span className="status-taken font-medium">{t[lang].taken}</span>
                </div>
              </div>
            </details>

            <details>
              <summary className="cursor-pointer p-3 bg-gray-100 rounded-lg font-semibold relative">
                <span>{t[lang].threeDays}</span>, <span>{d3}</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2">▾</span>
              </summary>
              <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
                <div className="flex justify-between py-1">
                  <span>☀ Morning</span>
                  <span className="status-taken font-medium">taken</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>☀ Afternoon</span>
                  <span className="status-skipped font-medium">skipped</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>🌙 Night</span>
                  <span className="status-skipped font-medium">skipped</span>
                </div>
              </div>
            </details>
          </section>

          {/* Consistency Score */}
          <section className="card p-6 flex flex-col items-center justify-center transition duration-300 hover:scale-[1.01]">
            <h3 className="text-xl font-semibold mb-4 self-start flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-[var(--blue)]" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 12H9v-2h2v2zm-2 4v-2h2v2H9z" />
              </svg>
              <span>{t[lang].score}</span>
            </h3>
            <div className="relative w-40 h-40 rounded-full flex items-center justify-center">
              <div id="ring" className="absolute w-full h-full rounded-full" style={ringStyle}></div>
              <div className="absolute w-28 h-28 bg-white rounded-full" />
              <div id="percent" className="absolute font-bold text-2xl">{pct}%</div>
            </div>
            <p id="scoreText" className="mt-4 font-medium text-center text-sm sm:text-base">
              {pct === 0 ? t[lang].greatStart : pct === 100 ? t[lang].complete : t[lang].progress}
            </p>
          </section>

          {/* Chat on Whatsapp (Final Safe Version) */}
          <section className="card p-6 transition duration-300 hover:scale-[1.01]">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-[var(--blue)]" viewBox="0 0 24 24">
                <path d="M19 6h-2c0-2.21-1.79-4-4-4S9 3.79 9 6H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z" />
              </svg>
              <span>{t[lang].meds}</span>
            </h3>
            <p className="text-gray-700 font-medium mb-1">Just one step away</p>
            <p className="text-gray-500 text-sm mb-4">Get notified daily</p>
            <a
              href="https://wa.me/+14155238886"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[var(--blue)] text-white py-2 px-6 rounded-full font-semibold text-sm hover:bg-blue-600 transition"
            >
              Click Here
            </a>
          </section>

          {/* AI Image Analyzer */}
          <section className="card p-6 transition duration-300 hover:scale-[1.01]">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-[var(--blue)]" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>AI Image Analyzer</span>
            </h3>
            <p className="text-gray-700 font-medium mb-1">Calorie Analyzer</p>
            <p className="text-gray-500 text-sm mb-5">Prescription Reader</p>
            <input id="bp" type="hidden" value="" />
            <input id="glu" type="hidden" value="" />
            <button onClick={() => (window.location.href = "/imageanalize")} className="bg-[var(--blue)] text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
              Go to Analyzer
            </button>
          </section>

          {/* Women Medicos */}
          <section className="card p-6 transition duration-300 hover:scale-[1.01]">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-[var(--blue)]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3a7 7 0 110 14 7 7 0 010-14zm0 2a5 5 0 100 10A5 5 0 0012 7zm-1 2h2v3h-2V9zm0 5h2v2h-2v-2z" />
              </svg>
              <span>Women Medicos</span>
            </h3>
            <p className="text-gray-700 font-medium mb-1">Analyze the period flow</p>
            <p className="text-gray-500 text-sm mb-5">and PCOD symptoms</p>
            <button onClick={() => (window.location.href = "/women")} className="bg-[var(--blue)] text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
              Go to Tracker
            </button>
          </section>

          {/* Proactive Records Upload (span full width) - changed to white card for readable text */}
          <section className="lg:col-span-3 card p-6 bg-white text-gray-800 transition duration-300 hover:scale-[1.005]">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-[var(--indigo)]" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v4h4v12H6z" />
              </svg>
              <span>Unlock Proactive Health Insights</span>
            </h3>

            {!showUploaded && (
              <div id="recordsArea">
                {/* changed text color so it's visible on white card */}
                <p className="text-gray-700 mb-6">
                  Let ArogyaConnect's AI analyze your past health records to predict potential risks and suggest personalized preventive measures.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="cursor-pointer inline-block">
                    <input ref={fileInputRef} onChange={onFileChange} id="fileInput" type="file" className="hidden" />
                    <div className="upload-btn py-3 px-6 rounded-full font-semibold transition-transform duration-300 hover:scale-105 inline-block text-center bg-[var(--blue)] text-white">
                      {t[lang].uploadBtn}
                    </div>
                  </label>

                  <button
                    id="viewDocsBtn"
                    onClick={() => {
                      setShowUploaded(true);
                      setShowInsights(true);
                    }}
                    className="py-3 px-6 rounded-full font-semibold inline-block text-center bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    View Documents
                  </button>
                </div>
              </div>
            )}

            {analyzing && (
              <div id="loader" className="text-center font-semibold italic mt-4">
                Analyzing your records using AI... Please wait.
              </div>
            )}

            {showUploaded && (
              <div id="uploadedWrap" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">Uploaded Documents</h4>
                <ul id="docList">
                  {docs.map((doc) => (
                    <li key={doc.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2">
                      <span className="text-sm text-gray-800">{doc.name}</span>
                      <div className="flex gap-2">
                        <button onClick={() => alert(`Simulating view for: ${doc.name}`)} className="bg-white text-gray-800 py-1 px-3 rounded-full text-xs font-semibold hover:bg-gray-100">
                          View
                        </button>
                        <button onClick={() => removeDoc(doc.id)} className="bg-red-500 text-white py-1 px-3 rounded-full text-xs font-semibold hover:bg-red-600">
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Insights */}
          {showInsights && (
            <section id="insights" className="lg:col-span-3 card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-[var(--indigo)]" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-9V7h-2v2h2zm0 4h-2v-2h2v2z" />
                </svg>
                Personalized Health Insights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="insight rounded-lg p-5">
                  <div className="font-semibold text-gray-800 mb-1">Potential Risk: Iron Deficiency</div>
                  <div className="text-sm text-gray-700">
                    <strong className="text-blue-600">Preventive Measure:</strong> Past reports indicate borderline low hemoglobin. Add iron-rich foods like spinach and lentils.
                  </div>
                </div>
                <div className="insight rounded-lg p-5">
                  <div className="font-semibold text-gray-800 mb-1">Potential Risk: Vitamin D Fluctuation</div>
                  <div className="text-sm text-gray-700">
                    <strong className="text-blue-600">Preventive Measure:</strong> Aim for 15 minutes of daily sunlight and consider fortified milk.
                  </div>
                </div>
                <div className="insight rounded-lg p-5">
                  <div className="font-semibold text-gray-800 mb-1">Observation: Stable Blood Pressure</div>
                  <div className="text-sm text-gray-700">
                    <strong className="text-green-600">Keep it up!</strong> Readings are consistently healthy — maintain your routine.
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <footer className="text-center text-sm text-gray-600 mt-8 pb-8">
          &copy; 2025 Developed by <a className="text-emerald-400" href="#">
            ArogyaCoders
          </a> for Electronics &amp; IT Department, Government of Odisha. All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}
