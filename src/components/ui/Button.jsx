
const variants = {
  primary:  'bg-streak text-night font-semibold hover:brightness-95 hover:cursor-pointer',
  ghost:    'border border-border text-muted hover:bg-white/5 hover:cursor-pointer',
  danger:   'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:cursor-pointer',
}

const Button = ({
  children, variant = 'ghost', onClick, disabled, className = ''
}) => {
    return (
        <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1.5 rounded-lg text-sm transition-all duration-150
        disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </button>
    )
}

export default Button;