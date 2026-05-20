const Input = ({ value, placeholder, onChange, onKeyDown, autoFocus, ariaLabel }) => {
    return (
        <input 
    type="text"
    aria-label={ariaLabel}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    autoFocus={autoFocus}
    className="w-full px-3 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-streak transition-all duration-150"
    />
    )
}

export default Input;