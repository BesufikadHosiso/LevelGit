const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-surface/10 border border-border rounded-xl p-4 transition-all duration-150 hover:cursor-pointer hover:shadow-lg hover:shadow-surface/10 ${className}`}>
         {children}   
        </div>
    )
}

export default Card