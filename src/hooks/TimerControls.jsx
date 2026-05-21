import Button from '../components/ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const TimerControls = ({ isRunning, onToggle, onReset }) => (
    <div className="flex gap-4 w-full px-8">
        <Button 
            variant={isRunning ? "secondary" : "primary"} 
            onClick={onToggle}
            className="flex-1 py-4 flex items-center justify-center gap-3 text-base"
        >
            {isRunning ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
            {isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button 
            variant="ghost" 
            onClick={onReset}
            className="flex-1 py-4 flex items-center justify-center gap-3 text-base"
        >
            <RotateCcw size={20} /> Reset
        </Button>
    </div>
);

export default TimerControls;