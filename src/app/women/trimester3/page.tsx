'use client'; 

import React, { useState, useCallback, useEffect, useRef } from 'react';

// Define types for clean state management
type ModuleType = 'kick-counter' | 'dosdonts' | 'diet' | 'reminders' | 'resources';
type KickStatusType = 'ready' | 'logging' | 'done';

const Trimester3Dashboard: React.FC = () => {
  // --- Global Navigation States ---
  const [activeModule, setActiveModule] = useState<ModuleType>('kick-counter');
  const [activeDosDontsTab, setActiveDosDontsTab] = useState<'dos' | 'donts'>('dos');
  const [activeDietTab, setActiveDietTab] = useState<'breakfast' | 'lunch' | 'snacks' | 'dinner'>('breakfast');
  const [activeResourcesTab, setActiveResourcesTab] = useState<'guides' | 'audio'>('guides');

  // --- Kick Counter States ---
  const [kickCount, setKickCount] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [kickStatus, setKickStatus] = useState<KickStatusType>('ready'); // ready, logging, done
  const [logMessage, setLogMessage] = useState({ time: '', status: '', type: 'none' });

  // Use a ref for the interval ID so it can be cleared easily across renders
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Handlers ---

  const showContent = useCallback((id: ModuleType) => {
    setActiveModule(id);
  }, []);

  const showInnerTab = useCallback((moduleId: string, tabId: string) => {
    if (moduleId === 'dosdonts') {
      setActiveDosDontsTab(tabId as 'dos' | 'donts');
    } else if (moduleId === 'diet') {
      setActiveDietTab(tabId as 'breakfast' | 'lunch' | 'snacks' | 'dinner');
    } else if (moduleId === 'resources') {
      setActiveResourcesTab(tabId as 'guides' | 'audio');
    }
  }, []);

  const goBack = () => {
    if (typeof window !== 'undefined') {
      // Redirects to /women as requested
      window.location.href = "/women"; 
    }
  };

  // --- Kick Counter Logic ---

  const stopKickCounter = useCallback(() => {
    // 1. Stop the timer
    if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
    }
    
    // 2. Set status to done
    setKickStatus('done');
    
    // 3. Calculate time message
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const finalTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    
    // 4. Determine status message
    let statusText = "";
    let statusType: 'good' | 'ok' | 'bad' = 'good';
    
    if (timerSeconds <= 3600) { // 1 hour
        statusText = "✅ This is a great, active time! This pattern is a reassuring sign of your baby's well-being.";
        statusType = 'good';
    } else if (timerSeconds <= 7200) { // 2 hours
        statusText = "👍 This is a normal time (under 2 hours). It's a good idea to monitor again tomorrow.";
        statusType = 'ok';
    } else { // Over 2 hours
        statusText = "⚠️ This session took over 2 hours. This is slower than usual. Please try again after a meal. If it's still slow, it is highly recommended to call your doctor for advice.";
        statusType = 'bad';
    }
    
    setLogMessage({
        time: `Great job! Logged 10 kicks in ${finalTime}.`,
        status: statusText,
        type: statusType,
    });

  }, [timerSeconds]);

  const startKickCounter = useCallback(() => {
    // 1. Clear any existing timer
    if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
    }
    
    // 2. Reset states
    setKickCount(0);
    setTimerSeconds(0);
    setKickStatus('logging');
    setLogMessage({ time: '', status: '', type: 'none' });

    // 3. Start new timer interval
    timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
    }, 1000);

  }, []);

  const logKick = useCallback(() => {
    setKickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 10) {
            // Use a slight delay to ensure setTimerSeconds in useEffect has run one last time
            setTimeout(stopKickCounter, 0); 
        }
        return newCount;
    });
  }, [stopKickCounter]);


  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
    };
  }, []);

  // --- Helper Functions for Formatting ---

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // --- Common Tailwind Classes ---
  const moduleBtnBase = "w-full p-3 my-2 rounded-xl font-semibold cursor-pointer transition-all duration-300 shadow-md text-base";
  const innerTabBtnBase = "flex-1 py-3 px-2 rounded-lg cursor-pointer font-semibold text-sm transition-all duration-300";
  const cardBase = "bg-white p-6 rounded-3xl shadow-xl transition-all duration-400";
  const innerCard = "bg-[#fffaf8] rounded-xl p-5 shadow-sm";
  const reminderBox = "bg-[#fff3ed] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-4 shadow-sm";
  
  // Custom list style to emulate the '🌸 ' emoji from original CSS
  const customListClasses = "list-[none] [&>li:before]:content-['🌸_'] [&>li:before]:mr-2 [&>li:before]:text-xl [&>li:before]:font-normal [&>li]:py-1.5 [&>li]:leading-relaxed";
  
  // Dynamic Kick Counter Button Classes
  const kickBtnClasses = `w-full py-5 text-lg font-bold border-none rounded-xl cursor-pointer mt-5 transition-all duration-200 
    ${kickStatus === 'ready' && 'bg-[#fce9e3] text-[#f37a5d] hover:bg-[#f37a5d] hover:text-white hover:-translate-y-0.5'}
    ${kickStatus === 'logging' && 'bg-green-600 text-white shadow-lg shadow-green-600/50'}
    ${kickStatus === 'done' && 'bg-gray-500 text-white cursor-not-allowed'}
  `;

  return (
    // Equivalent to original body styles (background is #fff8f2)
    <div className="min-h-screen flex bg-[#fff8f2] text-gray-700 font-['Poppins',_sans-serif]">
      
      {/* 1. Sidebar */}
      <div className="w-[250px] bg-[#f3b6a5] text-white p-5 flex flex-col rounded-r-xl shadow-2xl z-20">
        <h2 className="text-center mb-8 text-3xl font-bold tracking-wider">
          3rd Trimester
        </h2>

        {/* Sidebar Buttons (Mapping logic simplified for brevity) */}
        {([
          { id: 'kick-counter', label: '👶 Kick Counter' },
          { id: 'dosdonts', label: '✅ Do\'s & ❌ Don\'ts' },
          { id: 'diet', label: '🥗 Diet Plan' },
          { id: 'reminders', label: '⏰ Reminders' },
          { id: 'resources', label: '📚 Resources' },
        ] as { id: ModuleType, label: string }[]).map(btn => (
          <button 
            key={btn.id}
            className={`${moduleBtnBase} ${activeModule === btn.id 
              ? 'bg-[#f37a5d] text-white scale-[1.04] shadow-lg shadow-[#f37a5d]/40' 
              : 'bg-white text-[#f37a5d] hover:bg-[#f37a5d] hover:text-white hover:scale-[1.04] hover:shadow-lg hover:shadow-[#f37a5d]/40'
            }`}
            onClick={() => showContent(btn.id)}
          >
            {btn.label}
          </button>
        ))}
        
        <button 
          className={`${moduleBtnBase} bg-white text-[#f37a5d] mt-auto hover:bg-[#f37a5d] hover:text-white hover:scale-[1.04]`}
          onClick={goBack}
        >
          ⬅️ Back to Dashboard
        </button>
      </div>

      {/* 2. Content Area */}
      <div className="flex-1 p-10 md:p-14 overflow-y-auto">
        
        {/* --- Kick Counter Module --- */}
        {activeModule === 'kick-counter' && (
          <div className={`${cardBase} text-center`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              👶 Baby Kick Counter
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6 mx-auto"></div>
            
            <p className="text-gray-600 text-lg mb-4">
              Press 'Start', then tap 'Log Kick' every time you feel a movement.
            </p>
            
            <div className="flex justify-around my-5">
                <div className="flex-1">
                    <div className="text-xl text-gray-500">Kicks</div>
                    <div className="text-6xl font-extrabold text-[#f37a5d]">{kickCount}</div>
                </div>
                <div className="flex-1">
                    <div className="text-xl text-gray-500">Timer</div>
                    <div className="text-6xl font-extrabold text-[#f37a5d]">{formatTime(timerSeconds)}</div>
                </div>
            </div>
            
            <button 
              className={kickBtnClasses} 
              onClick={kickStatus === 'logging' ? logKick : startKickCounter}
              disabled={kickStatus === 'done'}
            >
              {kickStatus === 'ready' && 'Start Kick Counter'}
              {kickStatus === 'logging' && 'Log Kick 🦶'}
              {kickStatus === 'done' && 'Start Over'}
            </button>

            {/* Kick Log Time Message */}
            {logMessage.time && (
                <div className="bg-[#fffaf8] p-4 rounded-lg font-semibold mt-5 text-lg">
                    {logMessage.time}
                </div>
            )}
            
            {/* Kick Status Message */}
            {logMessage.status && (
                <div className={`p-4 rounded-lg font-bold mt-3 text-base leading-relaxed 
                    ${logMessage.type === 'good' && 'bg-green-100 text-green-700'}
                    ${logMessage.type === 'ok' && 'bg-yellow-100 text-yellow-700'}
                    ${logMessage.type === 'bad' && 'bg-red-100 text-red-700'}
                `}>
                    {logMessage.status}
                </div>
            )}
          </div>
        )}

        {/* --- Do's & Don'ts Module --- */}
        {activeModule === 'dosdonts' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              ✅ Do's & ❌ Don'ts (Weeks 28–40)
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6"></div>

            {/* Inner Tabs */}
            <div className="flex bg-[#fffaf8] p-1 rounded-xl shadow-inner mb-6">
              <button 
                className={`${innerTabBtnBase} ${activeDosDontsTab === 'dos' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`}
                onClick={() => showInnerTab('dosdonts', 'dos')}
              >
                ✅ Do's
              </button>
              <button 
                className={`${innerTabBtnBase} ${activeDosDontsTab === 'donts' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`}
                onClick={() => showInnerTab('dosdonts', 'donts')}
              >
                ❌ Don'ts
              </button>
            </div>

            {activeDosDontsTab === 'dos' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li><strong>Do:</strong> Practice gentle stretches and breathing exercises to prepare for labor.</li>
                  <li><strong>Do:</strong> Sleep on your **left side** to improve blood circulation.</li>
                  <li><strong>Do:</strong> Stay hydrated and eat smaller, frequent meals to reduce heartburn.</li>
                  <li><strong>Do:</strong> Pack your hospital bag early and plan your delivery logistics.</li>
                  <li><strong>Do:</strong> Attend prenatal classes and communicate with your partner for emotional support.</li>
                </ul>
              </div>
            )}

            {activeDosDontsTab === 'donts' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li><strong>Don’t:</strong> Stand or sit for long periods — elevate your feet when resting.</li>
                  <li><strong>Don’t:</strong> Ignore signs of labor such as regular contractions or fluid leakage.</li>
                  <li><strong>Don’t:</strong> Consume processed or very salty foods — it may worsen swelling.</li>
                  <li><strong>Don’t:</strong> Skip your doctor visits; your baby's growth needs close monitoring.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* --- Diet Module --- */}
        {activeModule === 'diet' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              🥗 Diet Plan (Weeks 28–40)
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6"></div>
            
            {/* Inner Tabs for Diet */}
            <div className="flex bg-[#fffaf8] p-1 rounded-xl shadow-inner mb-6">
              <button className={`${innerTabBtnBase} ${activeDietTab === 'breakfast' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`} onClick={() => showInnerTab('diet', 'breakfast')}>Breakfast</button>
              <button className={`${innerTabBtnBase} ${activeDietTab === 'lunch' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`} onClick={() => showInnerTab('diet', 'lunch')}>Lunch</button>
              <button className={`${innerTabBtnBase} ${activeDietTab === 'snacks' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`} onClick={() => showInnerTab('diet', 'snacks')}>Snacks</button>
              <button className={`${innerTabBtnBase} ${activeDietTab === 'dinner' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`} onClick={() => showInnerTab('diet', 'dinner')}>Dinner</button>
            </div>

            {activeDietTab === 'breakfast' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Boiled eggs or poha with veggies, and a glass of milk.</li>
                  <li>Oats porridge with dates and walnuts.</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'lunch' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Brown rice with dal, leafy vegetables, and grilled chicken or paneer.</li>
                  <li>Roti with mixed vegetable curry and a bowl of curd.</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'snacks' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Handful of almonds, walnuts, and fresh fruit juice.</li>
                  <li>Whole-grain toast with peanut butter or a smoothie.</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'dinner' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Soup, chapati with vegetables, and curd.</li>
                  <li>Lightly spiced khichdi with a side of steamed vegetables.</li>
                  <li><strong>Before Bed:</strong> Warm milk with saffron or turmeric.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* --- Reminders Module --- */}
        {activeModule === 'reminders' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              ⏰ Daily & Weekly Reminders
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6"></div>

            <div className={reminderBox}>
              <h4 className="text-[#f37a5d] font-bold text-xl mb-2">🩺 Health Check</h4>
              <ul className="list-disc list-inside text-base">
                <li>Monitor your baby's movements daily. (Use our Kick Counter tool!)</li>
                <li>Track weight gain and swelling — report sudden changes.</li>
                <li>Attend weekly prenatal visits after week 36.</li>
              </ul>
            </div>

            <div className={reminderBox}>
              <h4 className="text-[#f37a5d] font-bold text-xl mb-2">🥦 Nutrition Goals</h4>
              <ul className="list-disc list-inside text-base">
                <li>Take iron, calcium, and vitamin D supplements as prescribed.</li>
                <li>Stay hydrated — aim for 10 glasses of water per day.</li>
                <li>Eat fiber-rich foods to avoid constipation.</li>
              </ul>
            </div>

            <div className={reminderBox}>
              <h4 className="text-[#f37a5d] font-bold text-xl mb-2">💤 Self-Care</h4>
              <ul className="list-disc list-inside text-base">
                <li>Practice deep breathing or meditation before sleep.</li>
                <li>Use pillows for back and belly support.</li>
                <li>Go for short, slow walks to ease stiffness.</li>
              </ul>
            </div>
          </div>
        )}

        {/* --- Resources Module --- */}
        {activeModule === 'resources' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              📚 Helpful Resources
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6"></div>

            {/* Inner Tabs for Resources */}
            <div className="flex bg-[#fffaf8] p-1 rounded-xl shadow-inner mb-6">
              <button 
                className={`${innerTabBtnBase} ${activeResourcesTab === 'guides' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`}
                onClick={() => showInnerTab('resources', 'guides')}
              >
                📚 Guides & Links
              </button>
              <button 
                className={`${innerTabBtnBase} ${activeResourcesTab === 'audio' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`}
                onClick={() => showInnerTab('resources', 'audio')}
              >
                🎧 Audio & Meditation
              </button>
            </div>
            
            {activeResourcesTab === 'guides' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>📘 “What to Expect When You’re Expecting” - Final Chapters</li>
                  <li>🧘 <a href="https://www.youtube.com/watch?v=Eadzp6T-em4&utm_source=chatgpt.com" target="_blank" className="text-[#f37a5d] hover:underline">Prenatal Yoga for 3rd Trimester</a></li>
                  <li>📺 <a href="https://www.youtube.com/watch?v=1K0K4kYObR4" target="_blank" className="text-[#f37a5d] hover:underline">Breathing Techniques for Labor</a></li>
                  <li>💡 <a href="#" target="_blank" className="text-[#f37a5d] hover:underline">Packing Your Hospital Bag: A Checklist</a></li>
                </ul>
              </div>
            )}
            
            {activeResourcesTab === 'audio' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>🎧 “Relaxing Music for Labor Preparation”</li>
                  <li>🎧 “Guided Meditation for Labor Confidence”</li>
                  <li>🎧 “Positive Affirmations for a Safe Delivery”</li>
                  <li>🎧 <a href="#" target="_blank" className="text-[#f37a5d] hover:underline">Podcast: Understanding the First Signs of Labor</a></li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trimester3Dashboard;