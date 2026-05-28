import { useState, useRef, useEffect } from 'react';

/**
 * AnimatedEntrance
 * A professional wrapper for scroll-triggered fade animations.
 * 
 * Props:
 * - delay: Base delay in ms
 * - staggerIndex: Index in a sequence for step-by-step loading (0, 1, 2...)
 * - staggerStep: Incremental delay added per index (default 100ms)
 * - type: 'text' (slow/smooth), 'card' (snappy), or 'generic'
 */
const AnimatedEntrance = ({ 
    children, 
    delay = 0, 
    duration, 
    staggerIndex = 0, 
    staggerStep = 100,
    threshold = 0.1,
    className = "",
    type = "generic" 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    const typeConfigs = {
        text: { duration: 800, baseDelay: 0 },
        card: { duration: 500, baseDelay: 100 },
        generic: { duration: 600, baseDelay: 0 }
    };

    const config = typeConfigs[type] || typeConfigs.generic;
    const finalDuration = duration || config.duration;
    const finalDelay = delay + config.baseDelay + (staggerIndex * staggerStep);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin: '0px 0px -40px 0px' }
        );

        const current = elementRef.current;
        if (current) observer.observe(current);
        return () => current && observer.unobserve(current);
    }, [threshold]);

    return (
        <div
            ref={elementRef}
            className={`transition-all ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                transitionDuration: `${finalDuration}ms`,
                transitionDelay: `${finalDelay}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedEntrance;