const Input = ({ label, textarea, className = '', ...props }) => {
  // Dynamically switch between 'textarea' and 'input'
  const Component = textarea ? 'textarea' : 'input';
  
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
          {label}
        </label>
      )}
      <Component
        className={`
          w-full bg-surface-20 border border-border/50 rounded-xl px-4 py-3 
          text-sm text-white placeholder:text-muted-foreground 
          focus:outline-none focus:border-streak/40 focus:ring-1 focus:ring-streak/20 
          transition-all duration-200
          ${textarea ? 'min-h-30 resize-none' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;