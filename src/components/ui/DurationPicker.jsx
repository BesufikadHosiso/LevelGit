// This file is intended to be used from src/components/features/focus/
import Button from './Button';

// Receives duration (current selected) and onSelect (function to call when user picks one). No state inside. No useEffect. Just renders 3 buttons and highlights the active one. Disabled when timer is running — you can't change duration mid-session.
const DurationPicker = ({ duration, onSelect, disabled, staggerIndex = 0 }) => {
    const options = [15, 25, 45];
    return (
        <div className="flex gap-3 w-full mt-2">
            {options.map((option, idx) => (
                <Button
                    key={option}
                    staggerIndex={staggerIndex + idx}
                    variant={option === duration ? 'primary' : 'ghost'}
                    fullWidth={true}
                    onClick={() => onSelect(option)}
                    disabled={disabled}
                    className="flex-1 py-3 text-base"
                >
                    {option} min
                </Button>
            ))}
        </div>
    );
}

export default DurationPicker;