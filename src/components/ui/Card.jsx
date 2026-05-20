const Card = ({ children, className = '', onClick }) => {
    return (
        <div className={`bg-surface-10 border border-border rounded-card p-3 transition-all duration-150 hover:cursor-pointer hover:shadow-md ${className}`} onClick={onClick}>
         {children}
        </div>
    )
}

export default Card