import AnimatedEntrance from './AnimatedEntrance';

const EmptyState = ({ 
    icon: Icon, 
    title, 
    description, 
    action, 
    className = "",
    showBox = true 
}) => {
    return (
        <AnimatedEntrance 
            type="card" 
            className={`
                w-full flex flex-col items-center justify-center p-12 text-center rounded-3xl
                ${showBox ? 'bg-surface/50 border-2 border-dashed border-border/20 backdrop-blur-sm shadow-xl' : ''}
                ${className}
            `}
        >
            {Icon && (
                <div className="p-4 rounded-full bg-streak/5 text-streak/60 mb-6 border border-streak/10">
                    <Icon size={32} strokeWidth={1.5} />
                </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed text-center">
                {description}
            </p>
            {action && (
                <div className="w-full max-w-60">
                    {action}
                </div>
            )}
        </AnimatedEntrance>
    );
};

export default EmptyState;