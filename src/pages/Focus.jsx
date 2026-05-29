import { useState, useEffect, useCallback, useRef } from 'react';
import { useTimer } from '../hooks/useTimer';
import TimerDisplay from '../components/ui/TimerDisplay';
import TimerControls from '../hooks/TimerControls';
import CurrentTask from './CurrentTask';
import DurationPicker from '../components/ui/DurationPicker';
import Card from '../components/ui/Card';

export function meta() {
  return [
    { title: "Focus Session | LevelGit - Deep Work Timer" },
    { name: "description", content: "Start a distraction-free focus session with LevelGit's Pomodoro-style timer. Lock in and boost your productivity." },
  ];
}
import AnimatedEntrance from '../components/ui/AnimatedEntrance';

const Focus = () => {
    const { 
        seconds, isRunning, toggle, reset, 
        changeDuration, duration, totalSeconds 
    } = useTimer(25);


    const [selectedTask, setSelectedTask] = useState(null);
    const notificationShownRef = useRef(false);

    // Timer is "free" only if it's at the starting position and not running
    const isTimerFree = seconds === totalSeconds && !isRunning;
    const canStart = !!selectedTask;

    // Function to request and show notification
    const showNotification = useCallback(() => {
        if (!("Notification" in window)) {
            console.warn("This browser does not support desktop notification");
            return;
        }

        const fire = () => {
            new Notification("Timer Session Ended!", {
                body: selectedTask ? `"${selectedTask.text}" is complete!` : "Your focus session has ended.",
                icon: '/logo.png', // Make sure you have a logo.png in your public folder
                vibrate: [200, 100, 200], // Example vibration pattern
            });
            notificationShownRef.current = true;
        };

        if (Notification.permission === "granted") {
            fire();
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    fire();
                }
            });
        }
    }, [selectedTask]);

    // Effect to trigger notification when timer ends
    useEffect(() => {
        if (seconds === 0 && !isRunning && !notificationShownRef.current) {
            showNotification();
        }
    }, [seconds, isRunning, showNotification]);

    // Effect to reset notification state when timer is reset or a new task is selected
    useEffect(() => {
        // Reset the notification flag as soon as the timer is no longer at 0
        if (seconds > 0) {
            notificationShownRef.current = false;
        }
    }, [seconds]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <AnimatedEntrance type="text" className="text-center mb-6">
                <header>
                    <p className="text-xs uppercase tracking-wider text-streak/80 font-semibold">focus session</p>
                    <h1 className="mt-3 text-2xl font-bold text-white">Lock in</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        {selectedTask ? `Working on: ${selectedTask.text}` : "No commits added — head to Today first"}
                    </p>
                </header>
            </AnimatedEntrance>

            <div className='flex flex-col items-center gap-4 w-full max-w-md px-4'>
                <AnimatedEntrance staggerIndex={1} className="w-full">
                    <CurrentTask onTaskSelect={setSelectedTask} selectedTask={selectedTask} isLocked={!isTimerFree} />
                </AnimatedEntrance>

                <AnimatedEntrance staggerIndex={2} className="w-full">
                    <Card className="flex flex-col items-center gap-6 w-full">
                        <TimerDisplay // Now importing from ui/TimerDisplay
                            seconds={selectedTask ? seconds : totalSeconds}
                            totalSeconds={totalSeconds}
                            isRunning={isRunning}
                            onToggle={toggle}
                            onReset={reset}
                        />
                        <TimerControls
                            isRunning={isRunning}
                            onToggle={canStart ? toggle : () => alert("No commits added yet — go to Today")}
                            onReset={reset}
                        />
                    </Card>
                </AnimatedEntrance>

                <AnimatedEntrance staggerIndex={3} className="w-full">
                    <DurationPicker
                        duration={duration}
                        onSelect={changeDuration}
                        disabled={isRunning}
                    />
                </AnimatedEntrance>
                
                <AnimatedEntrance staggerIndex={4} className="mt-4 text-xs text-muted-foreground text-center">
                    <p>close every tab. just this.</p>
                </AnimatedEntrance>
            </div>
        </div>
    )
}

export default Focus;