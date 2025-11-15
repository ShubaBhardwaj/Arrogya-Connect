'use client'; 

import React, { useState, useCallback } from 'react';

// Define the component structure
const Trimester2Dashboard: React.FC = () => {
  // --- State for Main Sidebar Navigation ---
  const [activeModule, setActiveModule] = useState<'dosdonts' | 'diet' | 'reminders' | 'resources'>('dosdonts');

  // --- States for Inner Tab Navigation ---
  const [activeDosDontsTab, setActiveDosDontsTab] = useState<'dos' | 'donts'>('dos');
  const [activeDietTab, setActiveDietTab] = useState<'breakfast' | 'lunch' | 'snacks' | 'dinner'>('breakfast');
  const [activeResourcesTab, setActiveResourcesTab] = useState<'guides' | 'audio'>('guides');

  // --- Handlers ---

  const showContent = useCallback((id: typeof activeModule) => {
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

  // --- Common Tailwind Classes ---
  const moduleBtnBase = "w-full p-3 my-2 rounded-xl font-semibold cursor-pointer transition-all duration-300 shadow-md text-base";
  const innerTabBtnBase = "flex-1 py-3 px-2 rounded-lg cursor-pointer font-semibold text-sm transition-all duration-300";
  const cardBase = "bg-white p-6 rounded-3xl shadow-xl transition-all duration-400";
  const innerCard = "bg-[#fffaf8] rounded-xl p-5 shadow-sm";
  
  // Custom list style to emulate the '🌸 ' emoji from original CSS
  const customListClasses = "list-[none] [&>li:before]:content-['🌸_'] [&>li:before]:mr-2 [&>li:before]:text-xl [&>li:before]:font-normal [&>li]:py-1.5 [&>li]:leading-relaxed";


  return (
    // Equivalent to original body/html styles
    <div className="min-h-screen flex bg-gradient-to-br from-[#fff8f2] to-[#ffe6da] text-gray-700 font-['Poppins',_sans-serif]">
      
      {/* 1. Sidebar */}
      <div className="w-64 bg-[#f3b6a5] text-white p-6 flex flex-col rounded-r-3xl shadow-2xl z-20">
        <h2 className="text-center mb-8 text-3xl font-bold tracking-wider">
          2nd Trimester
        </h2>

        <button 
          className={`${moduleBtnBase} ${activeModule === 'dosdonts' 
            ? 'bg-[#f37a5d] text-white scale-[1.04] shadow-lg shadow-[#f37a5d]/40' 
            : 'bg-white text-[#f37a5d] hover:bg-[#f37a5d] hover:text-white hover:scale-[1.04] hover:shadow-lg hover:shadow-[#f37a5d]/40'
          }`}
          onClick={() => showContent('dosdonts')}
        >
          ✅ Do's & ❌ Don'ts
        </button>
        <button 
          className={`${moduleBtnBase} ${activeModule === 'diet' 
            ? 'bg-[#f37a5d] text-white scale-[1.04] shadow-lg shadow-[#f37a5d]/40' 
            : 'bg-white text-[#f37a5d] hover:bg-[#f37a5d] hover:text-white hover:scale-[1.04] hover:shadow-lg hover:shadow-[#f37a5d]/40'
          }`}
          onClick={() => showContent('diet')}
        >
          🥗 Diet Plan
        </button>
        <button 
          className={`${moduleBtnBase} ${activeModule === 'reminders' 
            ? 'bg-[#f37a5d] text-white scale-[1.04] shadow-lg shadow-[#f37a5d]/40' 
            : 'bg-white text-[#f37a5d] hover:bg-[#f37a5d] hover:text-white hover:scale-[1.04] hover:shadow-lg hover:shadow-[#f37a5d]/40'
          }`}
          onClick={() => showContent('reminders')}
        >
          ⏰ Reminders
        </button>
        <button 
          className={`${moduleBtnBase} ${activeModule === 'resources' 
            ? 'bg-[#f37a5d] text-white scale-[1.04] shadow-lg shadow-[#f37a5d]/40' 
            : 'bg-white text-[#f37a5d] hover:bg-[#f37a5d] hover:text-white hover:scale-[1.04] hover:shadow-lg hover:shadow-[#f37a5d]/40'
          }`}
          onClick={() => showContent('resources')}
        >
          📚 Resources
        </button>
        <button 
          className={`${moduleBtnBase} bg-white text-[#f37a5d] mt-auto hover:bg-[#f37a5d] hover:text-white hover:scale-[1.04]`}
          onClick={goBack}
        >
          ⬅️ Back to Dashboard
        </button>
      </div>

      {/* 2. Content Area */}
      <div className="flex-1 p-10 md:p-14 overflow-y-auto">
        
        {/* --- Do's & Don'ts Module --- */}
        {activeModule === 'dosdonts' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              ✅ Do's & ❌ Don'ts for 2nd Trimester
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6"></div>

            {/* Inner Tabs for Do's & Don'ts */}
            <div className="flex bg-[#fffaf8] p-1 rounded-xl shadow-inner mb-6">
              <button 
                className={`${innerTabBtnBase} ${activeDosDontsTab === 'dos' 
                  ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' 
                  : 'text-[#f37a5d] hover:bg-white'
                }`}
                onClick={() => showInnerTab('dosdonts', 'dos')}
              >
                ✅ Do's
              </button>
              <button 
                className={`${innerTabBtnBase} ${activeDosDontsTab === 'donts' 
                  ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' 
                  : 'text-[#f37a5d] hover:bg-white'
                }`}
                onClick={() => showInnerTab('dosdonts', 'donts')}
              >
                ❌ Don'ts
              </button>
            </div>

            {/* Content for Do's */}
            {activeDosDontsTab === 'dos' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li><strong>Do:</strong> Eat protein-rich meals and include calcium and iron daily.</li>
                  <li><strong>Do:</strong> Sleep on your **left side** to aid blood flow to the baby.</li>
                  <li><strong>Do:</strong> Practice prenatal yoga or light stretching regularly.</li>
                  <li><strong>Do:</strong> Start talking to your baby! They can begin to hear you now.</li>
                  <li><strong>Do:</strong> Moisturize your belly to help with itchiness from stretching skin.</li>
                </ul>
              </div>
            )}

            {/* Content for Don'ts */}
            {activeDosDontsTab === 'donts' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li><strong>Don’t:</strong> Lie flat on your back for long periods.</li>
                  <li><strong>Don’t:</strong> Ignore swelling, dizziness, or blurred vision — consult your doctor immediately.</li>
                  <li><strong>Don’t:</strong> Engage in high-impact sports or heavy lifting.</li>
                  <li><strong>Don’t:</strong> Forget your anomaly scan (usually weeks 18-22).</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* --- Diet Module --- */}
        {activeModule === 'diet' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              🥗 Healthy Diet Plan (Weeks 14–27)
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6"></div>
            
            {/* Inner Tabs for Diet */}
            <div className="flex bg-[#fffaf8] p-1 rounded-xl shadow-inner mb-6">
              <button 
                className={`${innerTabBtnBase} ${activeDietTab === 'breakfast' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`}
                onClick={() => showInnerTab('diet', 'breakfast')}
              >
                Breakfast
              </button>
              <button 
                className={`${innerTabBtnBase} ${activeDietTab === 'lunch' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`}
                onClick={() => showInnerTab('diet', 'lunch')}
              >
                Lunch
              </button>
              <button 
                className={`${innerTabBtnBase} ${activeDietTab === 'snacks' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`}
                onClick={() => showInnerTab('diet', 'snacks')}
              >
                Snacks
              </button>
              <button 
                className={`${innerTabBtnBase} ${activeDietTab === 'dinner' ? 'bg-[#f37a5d] text-white shadow-lg shadow-[#f37a5d]/30' : 'text-[#f37a5d] hover:bg-white'}`}
                onClick={() => showInnerTab('diet', 'dinner')}
              >
                Dinner
              </button>
            </div>

            {activeDietTab === 'breakfast' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Oatmeal with fruit and milk or vegetable poha.</li>
                  <li>Whole-wheat toast with avocado and seeds.</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'lunch' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Brown rice, dal, spinach, paneer, and salad.</li>
                  <li>Chapati with chicken curry (well-cooked) and a side of raita.</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'snacks' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Fresh fruit and a handful of nuts.</li>
                  <li>Yogurt smoothie or vegetable soup.</li>
                  <li>A small bowl of sprouts salad (chana, moong).</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'dinner' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Chapati, lentil curry, sautéed vegetables.</li>
                  <li>Quinoa with grilled vegetables and paneer.</li>
                  <li><strong>Before Bed:</strong> Warm milk with a pinch of turmeric.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* --- Reminders Module --- */}
        {activeModule === 'reminders' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              ⏰ Pregnancy Reminders
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6"></div>
            
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>💊 Take prenatal vitamins daily</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>💧 Drink at least 8–10 glasses of water</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>🩺 Attend anomaly scan between weeks 18–22</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>🧘 Practice breathing or prenatal yoga</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>🛌 Sleep 8 hours for better recovery</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
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
                  <li>📘 <em>“The Second Trimester Guide to Wellness”</em> – covers body and emotional changes.</li>
                  <li>🧘 <a href="https://www.youtube.com/watch?v=k1dNL03Ic_8&utm_source=chatgpt.com" target="_blank" className="text-[#f37a5d] hover:underline">Yoga for 2nd Trimester</a> – gentle stretching videos.</li>
                  <li>💡 <a href="https://www.whattoexpect.com/pregnancy/week-by-week" target="_blank" className="text-[#f37a5d] hover:underline">What to Expect: Week-by-Week</a></li>
                </ul>
              </div>
            )}
            
            {activeResourcesTab === 'audio' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>🎧 <em>Relaxing Pregnancy Meditation</em> – reduce stress with calming audios.</li>
                  <li>🎧 <em>Guided Meditation for Connecting with Baby</em> – take 10 minutes to bond.</li>
                  <li>🎧 <em>Positive Affirmations for 2nd Trimester</em> – for a confident and calm mindset.</li>
                  <li>🎧 <a href="#" target="_blank" className="text-[#f37a5d] hover:underline">Podcast: Navigating the "Honeymoon" Trimester</a></li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trimester2Dashboard;