'use client'; 

import React, { useState, useCallback } from 'react';

// Define the component structure
const Trimester1Dashboard: React.FC = () => {
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
      // Assuming 'index.html' is the main dashboard page
      window.location.href = "index.html"; 
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
          1st Trimester
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
              ✅ Do's & ❌ Don'ts for 1st Trimester
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
                  <li><strong>Do:</strong> Take prescribed folic acid daily to prevent birth defects.</li>
                  <li><strong>Do:</strong> Eat fresh fruits, veggies, and protein-rich foods like lentils and paneer.</li>
                  <li><strong>Do:</strong> Sleep at least 8 hours and rest whenever you feel tired.</li>
                  <li><strong>Do:</strong> Stay hydrated and keep light physical activity like walking.</li>
                  <li><strong>Do:</strong> Talk to your doctor before starting any new exercise.</li>
                </ul>
              </div>
            )}

            {/* Content for Don'ts */}
            {activeDosDontsTab === 'donts' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li><strong>Don’t:</strong> Consume caffeine, alcohol, or smoke—these can harm the baby.</li>
                  <li><strong>Don’t:</strong> Eat raw or undercooked meat, fish, or eggs.</li>
                  <li><strong>Don’t:</strong> Take unprescribed medicines or supplements.</li>
                  <li><strong>Don’t:</strong> Sit in a hot tub or sauna, as overheating can be dangerous.</li>
                  <li><strong>Don’t:</strong> Clean a cat's litter box due to the risk of toxoplasmosis.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* --- Diet Module --- */}
        {activeModule === 'diet' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              🥗 Healthy Diet Plan (Weeks 1–13)
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
                  <li>Oatmeal with banana and milk.</li>
                  <li>Whole-grain toast with boiled eggs.</li>
                  <li>Poha or Upma with added vegetables.</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'lunch' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Brown rice, dal (lentils), mixed vegetables, and a small bowl of curd.</li>
                  <li>Chapati with a paneer and vegetable curry.</li>
                  <li>Quinoa salad with chickpeas and fresh veggies.</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'snacks' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Coconut water and a handful of almonds.</li>
                  <li>Smoothie with fruits and spinach.</li>
                  <li>A bowl of fresh fruit salad.</li>
                  <li>Yogurt or Buttermilk (Chaas).</li>
                </ul>
              </div>
            )}
            {activeDietTab === 'dinner' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>Vegetable soup, chapati, and light paneer curry.</li>
                  <li>Khichdi with vegetables and a side of curd.</li>
                  <li>Grilled fish (low-mercury) with steamed vegetables.</li>
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
              ⏰ Daily Wellness Reminders
            </h3>
            <div className="h-[3px] w-32 bg-gradient-to-r from-[#f37a5d] to-[#f7c5b4] rounded-full mb-6"></div>
            
            {/* Note: I'm not adding state for checkboxes, as that would require too much complexity for this conversion, but the structure is correct. */}
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>💊 Take folic acid after breakfast</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>💧 Drink at least 8 glasses of water</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>🥗 Eat a fruit every 3 hours</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>🧘 15 mins of deep breathing or light yoga</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
            <div className="bg-[#fffaf8] border-l-6 border-[#f37a5d] p-4 rounded-xl mb-3 flex items-center justify-between transition-all duration-300 hover:bg-[#fff1eb]">
              <span>💤 Sleep 8–9 hours for recovery</span>
              <input type="checkbox" className="scale-125 accent-[#f37a5d] cursor-pointer" />
            </div>
          </div>
        )}

        {/* --- Resources Module --- */}
        {activeModule === 'resources' && (
          <div className={`${cardBase}`}>
            <h3 className="text-[#f37a5d] text-3xl font-bold mb-4">
              📚 Gentle Resources for You
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
                  <li>📘 <em>“Mayo Clinic Guide to a Healthy Pregnancy”</em> – a must-read guide for new moms.</li>
                  <li>🧘 <a href="https://www.youtube.com/watch?v=3VHnnpBJVsk&utm_source=chatgpt.com" target="_blank" className="text-[#f37a5d] hover:underline">Prenatal Yoga for 1st Trimester</a> – gentle stretches for relaxation.</li>
                  <li>💡 <a href="https://www.babycenter.in" target="_blank" className="text-[#f37a5d] hover:underline">BabyCenter India</a> – weekly updates on baby growth.</li>
                </ul>
              </div>
            )}
            
            {activeResourcesTab === 'audio' && (
              <div className={innerCard}>
                <ul className={customListClasses}>
                  <li>🎧 <em>First Trimester Relaxation Audio</em> – calming affirmations to ease your mornings.</li>
                  <li>🎧 <em>Guided Meditation for Morning Sickness</em> – helps you breathe through nausea.</li>
                  <li>🎧 <em>Positive Affirmations for a Healthy Baby</em> – fill your mind with positive thoughts.</li>
                  <li>🎧 <a href="#" target="_blank" className="text-[#f37a5d] hover:underline">Podcast: Pregnancy Nutrition in India</a></li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trimester1Dashboard;