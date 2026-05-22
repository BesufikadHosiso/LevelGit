import { useState, useEffect, useCallback, useRef } from 'react';
import { useTimer } from '../hooks/useTimer';
import TimerDisplay from '../hooks/TimerDisplay';
import TimerControls from '../hooks/TimerControls';
import CurrentTask from './CurrentTask';
import DurationPicker from '../components/ui/DurationPicker';
import Card from '../components/ui/Card';

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
        <div className="flex flex-col justify-center items-center min-h-screen p-4">
            <div className='flex flex-col items-center gap-4 w-full max-w-md'>
                <CurrentTask onTaskSelect={setSelectedTask} selectedTask={selectedTask} isLocked={!isTimerFree} />
                <Card className="flex flex-col items-center gap-6 w-full">
                    <TimerDisplay
                        seconds={selectedTask ? seconds : totalSeconds}
                        totalSeconds={totalSeconds}
                        isRunning={isRunning}
                        onToggle={toggle}
                        onReset={reset}
                    />
                    <TimerControls
                        isRunning={isRunning}
                        onToggle={canStart ? toggle : () => alert("Please select a task first")}
                        onReset={reset}
                    />
                </Card>

                <DurationPicker
                    duration={duration}
                    onSelect={changeDuration}
                    disabled={isRunning}
                />
            </div>
        </div>
    )
}

export default Focus;