import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialMinutes = 25) => {
    const [duration, setDuration] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;
        const id = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [isRunning]);

    const toggle = useCallback(() => setIsRunning(prev => !prev), []);
    const reset = useCallback(() => {
        setIsRunning(false);
        setSeconds(duration * 60);
    }, [duration]);

    const changeDuration = useCallback((mins) => {
        setDuration(mins);
        setSeconds(mins * 60);
        setIsRunning(false);
    }, []);

    return {
        seconds, isRunning, duration, toggle, reset, changeDuration,
        totalSeconds: duration * 60
    };
};