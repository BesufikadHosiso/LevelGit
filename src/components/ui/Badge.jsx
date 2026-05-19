const Badge = ({ label, color = "green" }) => {
    const colors = {
        green: 'bg-green-100 text-green-800',
        purple: 'bg-purple-100 text-purple-800',
        amber: 'bg-amber-100 text-amber-800'
    }

    return (
       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
        {label}
       </span>
    )
}

export default Badge;