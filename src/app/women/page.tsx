'use client';
// page.tsx (or any component file)
import React from 'react';

// Define the component structure
const PregnancyDashboard: React.FC = () => {
  // Event handler for navigation
  const goToTrimester = (page: string) => {
    // Check if window is defined (for server-side rendering in Next.js)
    if (typeof window !== 'undefined') {
      window.location.href = page;
    }
  };

  // Common Tailwind classes for the card elements
  const cardClasses = "bg-white rounded-3xl shadow-md p-5 flex items-center justify-between mb-5 transition-all duration-300 ease-in-out cursor-pointer " +
                      "hover:shadow-xl hover:-translate-y-1";

  // Common Tailwind classes for the icon container
  const iconClasses = "w-[60px] h-[60px] rounded-full bg-[#FFE2D2] border-2 border-[#F9B6A1] p-2 flex items-center justify-center flex-shrink-0 ml-4";
  
  return (
    // Equivalent to original body styles: background, center content, min-height
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFE2D2] relative font-['Poppins',_sans-serif] p-5">
      
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-center text-3xl font-semibold text-[#3b2f2f] mb-10">
          Pregnancy Wellness Dashboard
        </h1>

        {/* --- First Trimester Card --- */}
        <div 
          className={cardClasses}
          onClick={() => goToTrimester('women/trimester1')}
        >
          <div className="flex-1 mr-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Pregnancy Week 01 - 13
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This is the beautiful beginning of your motherhood journey — your body is preparing to nurture new life. Every heartbeat, every small change, is a step toward creating something magical.
            </p>
          </div>
          <div className={iconClasses}>
            <img 
              src="https://static.vecteezy.com/system/resources/previews/047/246/245/large_2x/embryo-3d-illustration-png.png" 
              alt="Embryo" 
              className="w-10 h-10"
            />
          </div>
        </div>

        {/* --- Second Trimester Card --- */}
        <div 
          className={cardClasses}
          onClick={() => goToTrimester('women/trimester2')}
        >
          <div className="flex-1 mr-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Pregnancy Week 14 - 27
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Welcome to the golden middle — where your energy returns, and you begin to truly feel your baby’s presence. Your little one is growing stronger every day, and so are you.
            </p>
          </div>
          <div className={iconClasses}>
            <img src="233.jpeg" alt="Fetus" className="w-10 h-10" />
          </div>
        </div>

        {/* --- Third Trimester Card --- */}
        <div 
          className={cardClasses}
          onClick={() => goToTrimester('women/trimester3')}
        >
          <div className="flex-1 mr-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Pregnancy Week 28 - 40
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              The final stretch — filled with anticipation, love, and a bit of restlessness. Every moment brings you closer to meeting your little miracle. Breathe deeply and trust the process.
            </p>
          </div>
          <div className={iconClasses}>
            <img src="223.jpeg" alt="Baby" className="w-10 h-10" />
          </div>
        </div>
      </div>

      {/* --- Pregnant Woman Image (Absolute Positioned) --- */}
      <img 
        src="12.png" 
        alt="Pregnant woman" 
        className="absolute bottom-8 right-10 w-[230px] hidden md:block" // Hidden on small screens (original @media)
      />
    </div>
  );
};

export default PregnancyDashboard;