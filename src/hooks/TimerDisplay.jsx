import Badge from '../components/ui/Badge';

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
    <div className="w-64 h-64 flex items-center justify-center relative">
      <svg
        role="button"
        tabIndex={0}
        onKeyDown={handleKey}
        onClick={onToggle}
        className="w-64 h-64 cursor-pointer outline-none"
        viewBox="0 0 100 100"
        aria-label="Timer"
      >
        <g transform={`rotate(-90 50 50) ${clockwise ? '' : 'scale(-1,1) translate(-100,0)'}`}>
          <circle cx="50" cy="50" r={radius} stroke="var(--streak-track, rgba(255,255,255,0.12))" strokeWidth="2" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="var(--streak, #6ee7b7)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            className="transition-all duration-300 ease-linear"
          />
        </g>
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="800" fill="white">
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </text>
      </svg>
      <Badge color="streak" className="absolute bottom-10 left-1/2 -translate-x-1/2">
        {isRunning ? 'Running' : 'Paused'}
      </Badge>
    </div>
  );
};

export default TimerDisplay;