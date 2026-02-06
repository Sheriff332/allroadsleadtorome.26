import React, { useState, useCallback, useMemo } from 'react';
import { FLOWCHART_STEPS } from './constants';
import { StepId } from './types';
import FloatingHearts from './components/FloatingHearts';
import specialMomentImage from './WhatsApp Image 2025-12-20 at 5.47.57 PM.jpeg';

const App: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState<StepId>('start');
  const [isPanning, setIsPanning] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<StepId>>(new Set(['start']));

  const currentStep = FLOWCHART_STEPS[currentStepId];

  const handleStepChange = useCallback((nextId: StepId) => {
    setIsPanning(true);
    setCurrentStepId(nextId);
    setVisitedSteps((prev) => {
      const updated = new Set(prev);
      updated.add(nextId);
      return updated;
    });

    setTimeout(() => setIsPanning(false), 800);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentStepId('start');
    setVisitedSteps(new Set(['start']));
    setShowCelebration(false);
    setHasGameStarted(false);
  }, []);

  const getButtonClass = (variant?: string) => {
    const base = 'px-6 py-3 rounded-full font-bold transition-all duration-300 text-sm md:text-base border active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed';
    if (variant === 'primary') {
      return `${base} bg-fuchsia-600 border-fuchsia-500/90 text-white hover:bg-fuchsia-500 shadow-[0_8px_28px_rgba(232,121,249,0.35)]`;
    }
    if (variant === 'danger') {
      return `${base} bg-slate-900/70 border-sky-900 text-slate-300 hover:border-sky-700 hover:text-sky-200`;
    }
    return `${base} bg-slate-900/70 border-fuchsia-900 text-fuchsia-300 hover:border-fuchsia-600 hover:text-fuchsia-200`;
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
    <div className="fixed inset-0 overflow-hidden select-none bg-[radial-gradient(circle_at_top,#350012_0%,#1a000a_40%,#09020a_100%)] text-slate-100">
      <FloatingHearts />

      {!hasGameStarted && (
        <button
          onClick={() => setHasGameStarted(true)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/25 backdrop-blur-md text-fuchsia-200 text-lg md:text-xl font-bold tracking-wide transition-colors hover:text-fuchsia-100"
        >
          Press anywhere to start 💌
        </button>
      )}

      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${hasGameStarted ? 'blur-0' : 'blur-sm'}`}
        style={cameraTransform}
      >
        <svg className="absolute overflow-visible w-full h-full opacity-30">
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#be185d" />
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
              strokeDasharray="5 6"
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
              <div className={`p-8 bg-slate-900/75 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)] border border-fuchsia-200/10 transition-all duration-500
                ${isActive ? 'ring-2 ring-fuchsia-500/25' : ''}`}>
                <div className={`transition-all duration-500 ${!isActive ? 'blur-md grayscale' : 'blur-0'}`}>
                  {step.id === 'success' && (
                    <div className="mb-6 rounded-3xl overflow-hidden h-48 w-full bg-slate-800 border border-fuchsia-400/20">
                      <img
                        src={specialMomentImage}
                        className="w-full h-full object-cover"
                        alt="Our Special Moment"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                        }}
                      />
                    </div>
                  )}

                  <h2 className={`text-2xl font-black text-slate-100 leading-tight mb-3 ${step.id === 'success' ? 'font-cursive text-3xl text-fuchsia-300' : ''}`}>
                    {step.question}
                  </h2>

                  {step.description && (
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                      {step.description}
                    </p>
                  )}

                  <div className="flex flex-col gap-3">
                    {step.options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={!isActive || isPanning || !hasGameStarted}
                        onClick={() => handleStepChange(opt.next)}
                        className={getButtonClass(opt.variant)}
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
        <div className="px-6 py-2 bg-slate-950/60 backdrop-blur-md rounded-full border border-fuchsia-100/15 text-fuchsia-300 font-bold text-sm tracking-tight shadow-sm">
          Mission Progress: {visitedSteps.size}/{Object.keys(FLOWCHART_STEPS).length} nodes discovered
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <div className="px-4 py-2 bg-slate-950/60 backdrop-blur-md rounded-full border border-fuchsia-100/15 text-fuchsia-300 font-semibold text-xs md:text-sm tracking-tight shadow-sm">
          Nodes discovered: {visitedSteps.size}/{Object.keys(FLOWCHART_STEPS).length}
        </div>
      </div>
    </div>
  );
};

export default App;
