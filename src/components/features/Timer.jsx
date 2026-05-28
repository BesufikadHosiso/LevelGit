import { useState, useEffect } from 'react';
import useApp from '../../context/useApp';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import AnimatedEntrance from '../ui/AnimatedEntrance';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

const Timer = () => {
    const { state, dispatch } = useApp();
    const { timer } = state;

    // Calculate initial display seconds immediately to avoid flicker on page shift
    const calculateRemaining = () => {
        if (timer.isActive && timer.targetTime) {
            return Math.max(0, Math.floor((timer.targetTime - Date.now()) / 1000));
        }
        return timer.duration;
    };

    const [displaySeconds, setDisplaySeconds] = useState(calculateRemaining);

    // Update the local display state based on the global target timestamp
    useEffect(() => {
        let interval;
        
        const updateDisplay = () => {
            if (timer.isActive && timer.targetTime) {
                const diff = Math.max(0, Math.floor((timer.targetTime - Date.now()) / 1000));
                setDisplaySeconds(diff);
            } else {
                setDisplaySeconds(timer.duration);
            }
        };

        updateDisplay();
        if (timer.isActive) {
            interval = setInterval(updateDisplay, 1000);
        }

        return () => clearInterval(interval);
    }, [timer.isActive, timer.targetTime, timer.duration]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleToggle = () => {
        if (timer.isActive) {
            dispatch({ type: 'STOP_TIMER' });
        } else {
            dispatch({ type: 'START_TIMER', payload: displaySeconds });
        }
    };

    return (
        <div className="w-full">
        <AnimatedEntrance type="card" className="w-full">
            <Card className="p-8 flex flex-col items-center justify-center space-y-10 border-border/50 bg-surface/50 backdrop-blur-sm shadow-xl relative overflow-hidden">
                {/* Session Indicator */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-streak/60 px-3 py-1 rounded-full border border-streak/20 bg-streak/5">
                        <TimerIcon size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Focus Mode</span>
                    </div>
                    <div className="text-7xl font-black font-mono tracking-tighter text-white tabular-nums drop-shadow-2xl">
                        {formatTime(displaySeconds)}
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full pt-2">
                    <div className="flex-1">
                        <Button 
                            variant={timer.isActive ? "secondary" : "primary"} 
                            className="py-5 shadow-lg shadow-streak/5"
                            fullWidth
                            onClick={handleToggle}
                        >
                            {timer.isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                        </Button>
                    </div>
                    <div className="flex-1">
                        <Button 
                            variant="ghost" 
                            className="py-5 flex items-center justify-center hover:bg-white/5 transition-colors"
                            fullWidth
                            onClick={() => dispatch({ type: 'RESET_TIMER' })}
                        >
                            <RotateCcw size={18} />
                        </Button>
                    </div>
                </div>
            </Card>
        </AnimatedEntrance>

        <Modal
            isOpen={timer.showModal}
            onClose={() => dispatch({ type: 'CLOSE_TIMER_MODAL' })}
            title="Session Complete!"
            confirmText="Yes, Done!"
            onConfirm={() => dispatch({ type: 'CLOSE_TIMER_MODAL' })}
        >
            <p className="text-muted-foreground">Great work staying focused. Did you complete the task you set out to do?</p>
        </Modal>
        </div>
    );
};

export default Timer;