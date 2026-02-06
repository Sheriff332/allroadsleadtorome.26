
import React, { useState, useCallback, useMemo } from 'react';
import { FLOWCHART_STEPS } from './constants';
import { StepId } from './types';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState<StepId>('start');
  const [isPanning, setIsPanning] = useState(false);

  const currentStep = FLOWCHART_STEPS[currentStepId];

  const handleStepChange = useCallback((nextId: StepId) => {
    setIsPanning(true);
    setCurrentStepId(nextId);
    setTimeout(() => setIsPanning(false), 800);
  }, []);

  const getButtonClass = (variant?: string, isActive?: boolean) => {
    const base = "px-6 py-3 rounded-full font-bold transition-all duration-300 text-sm md:text-base border-2 active:scale-95";
    if (variant === 'primary') {
      return `${base} bg-pink-500 border-pink-500 text-white hover:bg-pink-600 hover:border-pink-600 shadow-lg shadow-pink-200`;
    }
    if (variant === 'danger') {
      return `${base} bg-white border-slate-200 text-slate-400 hover:border-pink-200 hover:text-pink-400`;
    }
    return `${base} bg-white border-pink-100 text-pink-500 hover:bg-pink-50`;
  };

  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
    Object.values(FLOWCHART_STEPS).forEach((step) => {
      step.options.forEach((opt, idx) => {
        const nextStep = FLOWCHART_STEPS[opt.next];
        if (nextStep) {
          lines.push({
            x1: step.position.x,
            y1: step.position.y,
            x2: nextStep.position.x,
            y2: nextStep.position.y,
            id: `${step.id}-${opt.next}-${idx}`
          });
        }
      });
    });
    return lines;
  }, []);

  const cameraTransform = {
    transform: `translate(calc(50vw - ${currentStep.position.x}px), calc(50vh - ${currentStep.position.y}px))`,
    transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
  };

  return (
    <div className="fixed inset-0 bg-[#fff5f7] overflow-hidden select-none">
      <FloatingHearts />
      
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none" 
        style={cameraTransform}
      >
        <svg className="absolute overflow-visible w-full h-full opacity-20">
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          {connections.map((line) => (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#heartGradient)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}
        </svg>

        {Object.values(FLOWCHART_STEPS).map((step) => {
          const isActive = step.id === currentStepId;
          return (
            <div
              key={step.id}
              className={`absolute transition-all duration-700 pointer-events-auto w-[320px] md:w-[400px]
                ${isActive ? 'opacity-100 scale-100 z-50' : 'opacity-25 scale-75 z-10'}`}
              style={{
                left: step.position.x - 200,
                top: step.position.y - 150,
              }}
            >
              <div className={`p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white transition-all duration-500
                ${isActive ? 'ring-4 ring-pink-100' : ''}`}>
                
                {/* Content Wrapper for Blur Effect */}
                <div className={`transition-all duration-500 ${!isActive ? 'blur-md grayscale' : 'blur-0'}`}>
                  {step.id === 'success' && (
                    <div className="mb-6 rounded-3xl overflow-hidden h-48 w-full bg-pink-100">
                      <img 
                        src="WhatsApp Image 2025-12-20 at 5.47.57 PM.jpeg" 
                        className="w-full h-full object-cover" 
                        alt="Our Special Moment"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                        }}
                      />
                    </div>
                  )}

                  <h2 className={`text-2xl font-black text-slate-800 leading-tight mb-3 ${step.id === 'success' ? 'font-cursive text-3xl text-pink-600' : ''}`}>
                    {step.question}
                  </h2>

                  {step.description && (
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {step.description}
                    </p>
                  )}

                  <div className="flex flex-col gap-3">
                    {step.options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={!isActive || isPanning}
                        onClick={() => handleStepChange(opt.next)}
                        className={getButtonClass(opt.variant, isActive)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="px-6 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white/50 text-pink-500 font-bold text-sm tracking-tight flex items-center gap-3 shadow-sm">
          Made with 💖 by yours truly
        </div>
      </div>

      <footer className="fixed bottom-6 w-full text-center z-50 pointer-events-none">
        <p className="text-pink-300 text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
          made with heart by yours truly
        </p>
      </footer>
    </div>
  );
};

export default App;
