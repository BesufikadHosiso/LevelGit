import Button from '../components/ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const TimerControls = ({ isRunning, onToggle, onReset }) => (
    <div className="w-full px-8 pb-6">
        <div className="flex items-center gap-3 w-full">
            <Button 
                staggerIndex={0}
                variant={isRunning ? "secondary" : "primary"} 
                onClick={onToggle}
                fullWidth
                className="flex-1 py-5 flex items-center justify-center gap-3 text-base shadow-lg shadow-streak/5"
            >
                {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                <span className="font-bold">{isRunning ? 'Stop' : 'Start'}</span>
            </Button>

            <Button 
                staggerIndex={1}
                variant="ghost" 
                onClick={onReset}
                fullWidth
                className="flex-1 py-5 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
                <RotateCcw size={20} />
                <span className="ml-2 font-bold">Reset</span>
            </Button>
        </div>
    </div>
);

export default TimerControls;