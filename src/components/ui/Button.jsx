
const variants = {
  primary:  'bg-streak text-night font-semibold hover:bg-streak/90 hover:cursor-pointer',
  ghost:    'border border-white/10 text-muted hover:bg-white/5 hover:cursor-pointer',
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
        px-4 py-2 rounded-lg text-sm transition-all duration-150
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </button>
    )
}

export default Button;