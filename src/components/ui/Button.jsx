import AnimatedEntrance from "./AnimatedEntrance";

const variants = {
  primary:  'bg-streak text-night font-semibold hover:brightness-95 hover:cursor-pointer',
  secondary: 'bg-streak/10 border border-streak/20 text-streak hover:bg-streak/20 hover:cursor-pointer',
  ghost:    'border border-border text-muted hover:bg-white/5 hover:cursor-pointer',
  danger:   'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:cursor-pointer',
}

const Button = ({
  children, variant = 'ghost', onClick, disabled, className = '', fullWidth = false,
  staggerIndex, type = "generic"
}) => {
    // Ensure layout classes like flex-1 or w-full apply to the animation wrapper
    // so the button actually takes up the intended space in flex containers.
    const wrapperClasses = `
        ${fullWidth ? 'w-full' : ''} 
        ${className.includes('flex-1') ? 'flex-1' : ''}
    `;

    return (
        <AnimatedEntrance staggerIndex={staggerIndex} type={type} className={wrapperClasses}>
            <button
                onClick={onClick}
                disabled={disabled}
                className={`
                    ${fullWidth ? 'w-full' : 'w-auto'}
                    px-3 py-1.5 rounded-lg text-sm transition-all duration-150
                    disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer
                    ${variants[variant]} ${className}
                `}
            >
                {children}
            </button>
        </AnimatedEntrance>
    )
}

export default Button;