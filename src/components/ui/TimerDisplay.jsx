import AnimatedEntrance from './AnimatedEntrance';
import Badge from './Badge';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const TimerDisplay = ({ 
  seconds, 
  totalSeconds, 
  isRunning, 
  onToggle, 
  onReset,
  clockwise = true 
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, seconds / totalSeconds || 0));
  const dashoffset = Math.max(0, circumference * (1 - progress));

  const handleKey = (e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle(); }
    if (e.key.toLowerCase() === 'r') onReset();
  };

  return (
    <AnimatedEntrance type="generic" className="w-full flex justify-center py-6">
        <div className="w-64 h-64 flex items-center justify-center relative group">
            {/* Ambient Glow */}
            <div className={`absolute inset-0 rounded-full bg-streak/5 blur-3xl transition-opacity duration-1000 ${isRunning ? 'opacity-100' : 'opacity-0'}`} />
            
            <svg
                role="button"
                tabIndex={0}
                onKeyDown={handleKey}
                onClick={onToggle}
                className="w-full h-full cursor-pointer outline-none drop-shadow-2xl"
                viewBox="0 0 100 100"
                aria-label="Timer"
            >
                <g transform={`rotate(-90 50 50) ${clockwise ? '' : 'scale(-1,1) translate(-100,0)'}`}>
                    <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="3" fill="none" className="text-white/5" />
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="var(--streak, #6ee7b7)"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffset}
                        className="transition-all duration-500 ease-out"
                    />
                </g>
            </svg>

            {/* Center Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <span className="text-6xl font-black font-mono tracking-tighter text-white tabular-nums drop-shadow-sm">
                    {formatTime(seconds)}
                </span>
                <Badge color="streak" className={`mt-3 transition-transform duration-300 ${isRunning ? 'scale-110' : 'scale-100 opacity-60'}`}>
                    {isRunning ? 'Running' : 'Paused'}
                </Badge>
            </div>
        </div>
    </AnimatedEntrance>
  );
};

export default TimerDisplay;