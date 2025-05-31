import React, { useState, useRef, useEffect } from 'react';

const mockData = {
  quotes: [
    "The Earth does not belong to us; we belong to the Earth. - Chief Seattle",
    "Be the change you wish to see in the world. - Gandhi", 
    "The greatest threat to our planet is the belief that someone else will save it. - Robert Swan"
  ],
  thoughts: [
    "Every small action ripples through the web of life, creating waves of change we may never see but always feel.",
    "Sustainability isn't about perfection—it's about progress, one mindful choice at a time.",
    "The most revolutionary thing you can do today is to deeply connect with the natural world around you."
  ],
  actions: [
    "Take a 10-minute walk outside without your phone and notice 3 things in nature you've never seen before.",
    "Use only what you need today—pause before every purchase and ask 'Do I really need this?'",
    "Reach out to one person and share something you learned about sustainability this week."
  ],
  news: [
    "Renewable energy capacity grows 50% globally, led by solar and wind innovations.",
    "New study reveals urban forests can reduce city temperatures by up to 9°F.",
    "Ocean cleanup project successfully removes 200,000 pounds of plastic from Pacific."
  ],
  questions: [
    "If you could change one habit today that would benefit the planet, what would it be and why?",
    "What does 'living in harmony with nature' mean to you personally?",
    "How might your great-grandchildren describe the world you're helping to create?"
  ],
  jokes: [
    "Why don't climate scientists ever get cold? Because they're always surrounded by warming trends! 🌡️",
    "What did the solar panel say to the fossil fuel? 'Your time in the sun is over!' ☀️",
    "Why did the tree go to therapy? It had too many deep roots issues! 🌳"
  ]
};

const inspirationalQuotes = [
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous",
  "The future belongs to those who act today. — Environmental Activist"
];

const slotSymbols = ['●', '▲', '■', '◆', '★', '♦', '▼', '◀', '▶', '♠', '♣', '♥', '⬢', '⬟', '⚡', '☀', '🌙', '⭐', '🔥', '💧'];

// PART 1 COMPONENTS: Opening + Drawing

const OpeningSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState('initial');
  const [shapeScale, setShapeScale] = useState(0.1);
  const [breatheScale, setBreatheScale] = useState(1);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Phase 1: Small shape appears (0.5s)
    setTimeout(() => setPhase('growing'), 500);

    // Phase 2: Shape grows smoothly over 3 seconds
    const growthDuration = 3000;
    const growthSteps = 60;
    const stepDuration = growthDuration / growthSteps;
    
    setTimeout(() => {
      let currentStep = 0;
      const growInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / growthSteps;
        const newScale = 0.1 + (0.9 * progress);
        setShapeScale(newScale);
        
        if (currentStep >= growthSteps) {
          clearInterval(growInterval);
          setPhase('breathing');
          
          // Start breathing animation
          const breatheInterval = setInterval(() => {
            setBreatheScale(prev => prev === 1 ? 1.1 : 1);
          }, 1500);
          
          // Show text after breathing starts
          setTimeout(() => setShowText(true), 1000);
          
          // Complete sequence
          setTimeout(() => {
            clearInterval(breatheInterval);
            onComplete();
          }, 4000);
        }
      }, stepDuration);
    }, 500);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-hidden">
      {/* Morphing Shape */}
      <div className="relative flex items-center justify-center">
        <div 
          className="bg-black transition-all duration-100 ease-out"
          style={{
            width: `${20 + shapeScale * 100}px`,
            height: `${20 + shapeScale * 100}px`,
            clipPath: shapeScale < 0.3 ? 'circle(50%)' :
                     shapeScale < 0.7 ? `polygon(50% 0%, ${70 + shapeScale * 15}% 35%, 65% 90%, 35% 90%, ${30 - shapeScale * 15}% 35%)` :
                     'polygon(50% 0%, 85% 35%, 65% 90%, 35% 90%, 15% 35%)',
            transform: `scale(${phase === 'breathing' ? breatheScale : 1})`,
            opacity: Math.min(shapeScale + 0.3, 1)
          }}
        />
        
        <div 
          className="absolute bg-black opacity-5 blur-lg"
          style={{
            width: `${30 + shapeScale * 120}px`,
            height: `${30 + shapeScale * 120}px`,
            transform: `scale(${phase === 'breathing' ? breatheScale * 1.1 : 1.1})`,
          }}
        />
      </div>

      {/* Welcome Text Overlay */}
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95">
          <div className="text-center slide-up-animation">
            <h1 className="text-6xl font-thin text-gray-900 mb-8 tracking-tight">Ora</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-4">Welcome to Ora.</p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                One breath. One shape. One shift.<br/>
                This is your moment at the edge of change.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up-gentle {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        .slide-up-animation {
          animation: slide-up-gentle 1s ease-out;
        }
      `}</style>
    </div>
  );
};

const RandomQuote = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  
  useEffect(() => {
    if (Math.random() < 0.3) {
      const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }
  }, []);

  if (!currentQuote) return null;

  return (
    <div className="text-center mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
      <p className="text-gray-700 italic font-light text-sm leading-relaxed">
        {currentQuote}
      </p>
    </div>
  );
};

const DrawingCanvas = ({ onDrawingChange, onDrawingCapture }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: ((e.clientX || e.touches?.[0]?.clientX) - rect.left) * scaleX / (window.devicePixelRatio || 1),
      y: ((e.clientY || e.touches?.[0]?.clientY) - rect.top) * scaleY / (window.devicePixelRatio || 1)
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    setHasDrawn(true);
    const pos = getMousePos(e);
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const pos = getMousePos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    onDrawingChange(hasDrawn);
    
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    onDrawingCapture(dataURL);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onDrawingChange(false);
    onDrawingCapture(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-96 border-2 border-gray-200 rounded-lg cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{ touchAction: 'none' }}
      />
      <button
        onClick={clearCanvas}
        className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        Clear Canvas
      </button>
    </div>
  );
};

const EvolvingShape = ({ isActive }) => {
  const [breatheScale, setBreatheScale] = useState(1);
  
  useEffect(() => {
    if (!isActive) return;
    
    const breatheInterval = setInterval(() => {
      setBreatheScale(prev => prev === 1 ? 1.15 : 1);
    }, 1200);
    
    return () => clearInterval(breatheInterval);
  }, [isActive]);

  return (
    <div className="flex justify-center my-8">
      <div className="relative">
        <div className={`absolute top-2 left-0 w-16 h-16 bg-black opacity-20 rounded-full blur-sm transition-all duration-300 ${
          isActive ? 'scale-110' : 'scale-100'
        }`} style={{
          transform: `scale(${breatheScale * (isActive ? 1.1 : 1)}) translateY(2px)`,
        }} />
        
        <div 
          className={`w-16 h-16 bg-black transition-all duration-300 ${
            isActive ? 'opacity-90' : 'opacity-100'
          }`} 
          style={{
            clipPath: isActive ? 'polygon(50% 0%, 85% 35%, 65% 90%, 35% 90%, 15% 35%)' : 'circle(50%)',
            transform: `scale(${breatheScale * (isActive ? 1.1 : 1)})`,
          }} 
        />
      </div>
    </div>
  );
};

// PART 2 COMPONENTS: AI Animation + Story Mode

const MatrixRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 text-green-400 text-xs font-mono whitespace-nowrap matrix-rain"
          style={{
            left: `${i * 7}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          {Array.from({length: 20}, () => 
            Math.random() > 0.5 ? String.fromCharCode(0x30A0 + Math.random() * 96) : Math.floor(Math.random() * 10)
          ).join('')}
        </div>
      ))}
      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .matrix-rain {
          animation: matrix-fall linear infinite;
          animation-duration: ${4 + Math.random() * 6}s;
        }
      `}</style>
    </div>
  );
};

const AIWaveform = () => {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-96 h-20">
      <svg width="100%" height="100%" className="opacity-60">
        <path
          d={`M0,40 ${Array.from({length: 50}, (_, i) => 
            `L${i * 8},${40 + Math.sin(phase + i * 0.3) * 15 + Math.sin(phase * 2 + i * 0.1) * 5}`
          ).join(' ')}`}
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="50%" stopColor="#0088ff" />
            <stop offset="100%" stopColor="#8800ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const SlotMachine = ({ finalSymbols }) => {
  const [currentSymbols, setCurrentSymbols] = useState(['●', '●', '●', '●', '●', '●']);
  const [isSpinning, setIsSpinning] = useState(true);
  
  useEffect(() => {
    if (!isSpinning) return;
    
    const spinInterval = setInterval(() => {
      setCurrentSymbols(prev => prev.map(() => 
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)]
      ));
    }, 150);
    
    const stopTimer = setTimeout(() => {
      setIsSpinning(false);
      setCurrentSymbols(finalSymbols);
    }, 5000);
    
    return () => {
      clearInterval(spinInterval);
      clearTimeout(stopTimer);
    };
  }, [finalSymbols]);
  
  return (
    <div className="flex justify-center items-center space-x-6 my-12">
      {currentSymbols.map((symbol, index) => (
        <div
          key={index}
          className={`w-20 h-20 bg-black bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all duration-300 ${
            isSpinning ? 'animate-pulse' : 'animate-bounce'
          }`}
          style={{ 
            animationDelay: `${index * 200}ms`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}
        >
          <span className="text-white drop-shadow-lg">{symbol}</span>
        </div>
      ))}
    </div>
  );
};

const ModernAIAnimation = ({ onComplete, finalSymbols }) => {
  const [phase, setPhase] = useState('initializing');
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Phase 1: Initializing (2s)
    const phase1Timer = setTimeout(() => setPhase('processing'), 2000);
    
    // Phase 2: Processing with progress (5s)
    const phase2Timer = setTimeout(() => {
      setPhase('finalizing');
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setPhase('countdown');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }, 2000);
    
    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
    };
  }, []);
  
  useEffect(() => {
    if (phase === 'countdown') {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setTimeout(onComplete, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1500);
    }
  }, [phase, onComplete]);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center z-50">
      <MatrixRain />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-70 floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-cyan-400 rotating-shape"
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl px-8">
        {phase === 'initializing' && (
          <div className="fade-in-animation">
            <h2 className="text-5xl font-thin text-white mb-8 tracking-wide">
              Awakening AI Consciousness
            </h2>
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
          </div>
        )}
        
        {phase === 'processing' && (
          <div className="fade-in-animation">
            <h2 className="text-4xl font-thin text-white mb-12 tracking-wide">
              Quantum Processing Your Drawing
            </h2>
            <SlotMachine finalSymbols={finalSymbols} />
            <AIWaveform />
          </div>
        )}
        
        {phase === 'finalizing' && (
          <div className="fade-in-animation">
            <h2 className="text-4xl font-thin text-white mb-8 tracking-wide">
              Crystallizing Insights
            </h2>
            <div className="w-96 h-2 bg-gray-800 rounded-full mx-auto mb-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-cyan-300 text-lg">{progress}% Complete</p>
          </div>
        )}
        
        {phase === 'countdown' && (
          <div className="fade-in-animation">
            <h2 className="text-4xl font-thin text-white mb-12 tracking-wide">
              Your Ora Manifests
            </h2>
            <SlotMachine finalSymbols={finalSymbols} />
            {countdown > 0 ? (
              <div className="text-8xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
                {countdown}
              </div>
            ) : (
              <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-bounce">
                ✦ Consciousness Aligned ✦
              </div>
            )}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-animation {
          animation: fade-in 1s ease-out;
        }
        .floating-particle {
          animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        }
        .rotating-shape {
          animation: rotate ${8 + Math.random() * 12}s linear infinite;
        }
      `}</style>
    </div>
  );
};

const StoryMode = ({ isOpen, onClose, cardData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAutoStarted, setIsAutoStarted] = useState(false);
  const [storyTimer, setStoryTimer] = useState(null);

  // Auto-start the journey after a brief delay
  useEffect(() => {
    if (isOpen && !isAutoStarted) {
      const autoStartTimer = setTimeout(() => {
        setIsAutoStarted(true);
      }, 1000);
      return () => clearTimeout(autoStartTimer);
    }
  }, [isOpen, isAutoStarted]);

  // Main story progression timer
  useEffect(() => {
    if (!isOpen || !isPlaying || !isAutoStarted) return;

    const timer = setTimeout(() => {
      setCurrentIndex(prev => {
        if (prev >= cardData.length - 1) {
          setIsPlaying(false);
          setTimeout(() => onClose(), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 4000); // 4 seconds per story

    setStoryTimer(timer);
    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, cardData.length, isAutoStarted, currentIndex, onClose]);

  // Cleanup timer when component unmounts or modal closes
  useEffect(() => {
    if (!isOpen) {
      if (storyTimer) {
        clearTimeout(storyTimer);
        setStoryTimer(null);
      }
      setCurrentIndex(0);
      setIsPlaying(true);
      setIsAutoStarted(false);
    }
  }, [isOpen, storyTimer]);

  const handleNext = () => {
    if (storyTimer) {
      clearTimeout(storyTimer);
      setStoryTimer(null);
    }
    
    if (currentIndex < cardData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (storyTimer) {
      clearTimeout(storyTimer);
      setStoryTimer(null);
    }
    
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const togglePlay = () => {
    if (storyTimer) {
      clearTimeout(storyTimer);
      setStoryTimer(null);
    }
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const currentCard = cardData[currentIndex];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 z-50 flex flex-col overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-200 to-purple-200 gentle-float"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full drift-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Date at top */}
      <div className="text-center py-6 relative z-10">
        <p className="text-sm font-light text-gray-500 tracking-wide uppercase">
          {today}
        </p>
      </div>

      {/* Progress bars */}
      <div className="flex space-x-1 px-6 mb-4 relative z-10">
        {cardData.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-gray-700 to-gray-900 transition-all ${
                index < currentIndex ? 'w-full' : 
                index === currentIndex && isPlaying ? 'w-full progress-animation' : 
                index === currentIndex ? 'w-1/2' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 relative z-10">
        <h2 className="text-xl font-light text-gray-900 tracking-wide">Your Ora Journey</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
        >
          ×
        </button>
      </div>

      {/* Story Content with fade animations */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div 
          key={currentIndex}
          className="max-w-3xl text-center story-content"
        >
          <div className="text-7xl mb-8 opacity-20 symbol-float">
            {currentCard.symbol}
          </div>
          <h3 className="text-4xl font-light text-gray-900 mb-8 tracking-tight leading-tight slide-up">
            {currentCard.title}
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto slide-up-delay">
            {currentCard.content}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-8 p-8 relative z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
        >
          <span className="text-gray-700">←</span>
        </button>
        
        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-lg transition-all duration-200 backdrop-blur-sm"
        >
          <span className="text-gray-700">→</span>
        </button>
      </div>

      {/* Tap zones for mobile navigation */}
      <div className="absolute inset-0 flex z-20">
        <div className="flex-1" onClick={handlePrev} />
        <div className="flex-1" onClick={handleNext} />
      </div>

      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
          66% { transform: translateY(10px) translateX(-15px) rotate(240deg); }
        }
        
        @keyframes drift {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }
        
        @keyframes story-fade {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        
        @keyframes symbol-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        
        @keyframes progress-slow {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .gentle-float {
          animation: float-gentle ${6 + Math.random() * 8}s ease-in-out infinite;
        }
        
        .drift-particle {
          animation: drift ${8 + Math.random() * 12}s linear infinite;
        }
        
        .story-content {
          animation: story-fade 0.8s ease-out;
        }
        
        .symbol-float {
          animation: symbol-float 3s ease-in-out infinite;
        }
        
        .slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        
        .slide-up-delay {
          animation: slide-up 0.6s ease-out 0.4s both;
        }
        
        .progress-animation {
          animation: progress-slow 4s linear;
        }
      `}</style>
    </div>
  );
};

const ResultCard = ({ title, content, symbol, isLight = true }) => {
  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
      isLight ? 'bg-white border border-gray-100' : 'bg-gray-900 text-white'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`text-2xl ${isLight ? 'opacity-40' : 'opacity-60'}`}>{symbol}</div>
        <div>
          <h3 className="font-medium mb-2">{title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showStoryMode, setShowStoryMode] = useState(false);
  const [drawingData, setDrawingData] = useState(null);
  const [results, setResults] = useState({});

  const generateResults = () => {
    const seed = Date.now();
    const getRandomItem = (arr, offset = 0) => {
      const index = Math.floor((Math.sin(seed + offset) * 10000) % arr.length);
      return arr[Math.abs(index)];
    };
    
    const symbols = [];
    for (let i = 0; i < 6; i++) {
      symbols.push(slotSymbols[Math.floor((seed + i) % slotSymbols.length)]);
    }
    
    const content = {
      quote: getRandomItem(mockData.quotes, 1),
      thought: getRandomItem(mockData.thoughts, 2),
      action: getRandomItem(mockData.actions, 3),
      news: getRandomItem(mockData.news, 4),
      question: getRandomItem(mockData.questions, 5),
      joke: getRandomItem(mockData.jokes, 6),
      symbols
    };
    
    setResults(content);
    setShowAnimation(true); // Show AI animation first
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setShowAnimation(false);
    setHasDrawn(false);
    setDrawingData(null);
  };

  if (showOpening) {
    return <OpeningSequence onComplete={() => setShowOpening(false)} />;
  }

  const cardData = [
    { title: "Ora Light", content: results.quote, symbol: results.symbols?.[0] },
    { title: "Ora Thought", content: results.thought, symbol: results.symbols?.[1] },
    { title: "Ora Act", content: results.action, symbol: results.symbols?.[2] },
    { title: "Ora Signal", content: results.news, symbol: results.symbols?.[3] },
    { title: "Ora Ask", content: results.question, symbol: results.symbols?.[4] },
    { title: "Ora Smile", content: results.joke, symbol: results.symbols?.[5] }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-thin text-gray-900 mb-6 tracking-tight">Ora</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-4">Welcome to Ora.</p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                One breath. One shape. One shift.<br/>
                This is your moment at the edge of change.
              </p>
            </div>
            <RandomQuote />
          </div>

          {!showResults ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-700 mb-2">Express yourself</h2>
                <p className="text-gray-500 mb-6 font-light">Draw something to get your personalized Ora</p>
                <DrawingCanvas onDrawingChange={setHasDrawn} onDrawingCapture={setDrawingData} />
              </div>

              <EvolvingShape isActive={hasDrawn} />

              <div className="text-center mb-12">
                <button
                  onClick={generateResults}
                  className="px-12 py-4 bg-black text-white rounded-full text-xl font-light hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Begin Your Ora
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">Your Ora</h2>
                <p className="text-gray-500 text-lg font-light mb-8">Discover insights crafted just for you</p>
                <EvolvingShape isActive={true} />
              </div>

              {/* Play Button for Story Mode */}
              <div className="text-center mb-12">
                <button
                  onClick={() => setShowStoryMode(true)}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                >
                  <span>▶</span>
                  <span className="font-light">Play Your Journey</span>
                </button>
              </div>

              {drawingData && (
                <div className="mb-16">
                  <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 max-w-md mx-auto">
                    <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">Your Expression</h3>
                    <div className="flex justify-center mb-6">
                      <img src={drawingData} alt="Your drawing" className="max-w-full h-32 object-contain rounded-2xl shadow-sm" />
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.download = 'my-ora-drawing.png';
                          link.href = drawingData;
                          link.click();
                        }}
                        className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                <ResultCard title={cardData[0].title} content={cardData[0].content} symbol={cardData[0].symbol} isLight={true} />
                <ResultCard title={cardData[1].title} content={cardData[1].content} symbol={cardData[1].symbol} isLight={false} />
                <ResultCard title={cardData[2].title} content={cardData[2].content} symbol={cardData[2].symbol} isLight={true} />
                <ResultCard title={cardData[3].title} content={cardData[3].content} symbol={cardData[3].symbol} isLight={false} />
                <ResultCard title={cardData[4].title} content={cardData[4].content} symbol={cardData[4].symbol} isLight={true} />
                <ResultCard title={cardData[5].title} content={cardData[5].content} symbol={cardData[5].symbol} isLight={false} />
              </div>

              <div className="text-center pb-8">
                <button
                  onClick={handleReset}
                  className="px-12 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all duration-300 transform hover:scale-105 text-lg font-light tracking-wide shadow-lg"
                >
                  Create Again
                </button>
              </div>
            </>
          )}
          
          {/* AI Animation Overlay */}
          {showAnimation && (
            <ModernAIAnimation 
              onComplete={handleAnimationComplete} 
              finalSymbols={results.symbols || []}
            />
          )}

          {/* Story Mode Overlay */}
          <StoryMode 
            isOpen={showStoryMode} 
            onClose={() => setShowStoryMode(false)}
            cardData={cardData}
          />
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            Ora is a K2A assignment submitted by{' '}
            <a href="http://linkedin.com/in/arjunshrivatsan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Arjun Shrivatsan
            </a>
            {' '}from{' '}
            <a href="http://innocencetheory.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Innocence Theory Podcast