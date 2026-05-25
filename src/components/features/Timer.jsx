import { useState, useEffect } from 'react';
import useApp from '../../context/useApp';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
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
        <Card className="p-6 flex flex-col items-center justify-center space-y-6 border-border/50 bg-surface/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-streak mb-2">
                <TimerIcon size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Focus Session</span>
            </div>

            <div className="text-6xl font-black font-mono tracking-tighter text-white">
                {formatTime(displaySeconds)}
            </div>

            <div className="flex items-center gap-3 w-full">
                <Button 
                    variant={timer.isActive ? "secondary" : "primary"} 
                    className="flex-1 py-3"
                    onClick={handleToggle}
                >
                    {timer.isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </Button>
                <Button 
                    variant="ghost" 
                    className="px-4"
                    onClick={() => dispatch({ type: 'RESET_TIMER' })}
                >
                    <RotateCcw size={18} />
                </Button>
            </div>

            <Modal
                isOpen={timer.showModal}
                onClose={() => {}} // Disable closing by clicking outside to force a choice
                title="Session Complete!"
                confirmText="Yes, Done!"
                onConfirm={() => dispatch({ type: 'CLOSE_TIMER_MODAL' })}
            >
                <div className="space-y-4">
                    <p className="text-muted-foreground">Great work staying focused. Did you complete the task you set out to do?</p>
                    <div className="flex justify-end pt-2">
                        <Button variant="ghost" onClick={() => dispatch({ type: 'CLOSE_TIMER_MODAL' })}>Not quite yet</Button>
                    </div>
                </div>
            </Modal>
        </Card>
    );
};

export default Timer;