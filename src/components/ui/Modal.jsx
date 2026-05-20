import { useEffect } from 'react';
import Button from './Button';
import { X, AlertTriangle, Info } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, variant = 'info', confirmText = 'Confirm', onConfirm }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const variants = {
        info: {
            icon: <Info className="text-streak" size={24} />,
            header: 'text-[#e8eaf0]',
            border: 'border-streak/20',
            btn: 'primary'
        },
        warning: {
            icon: <AlertTriangle className="text-red-400" size={24} />,
            header: 'text-red-400',
            border: 'border-red-500/20',
            btn: 'danger'
        }
    };

    const current = variants[variant];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
            
            {/* Modal Container */}
            <div className={`relative w-full max-w-md bg-[#1e1e2f] border ${current.border} rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        {current.icon}
                        <h2 className={`text-xl font-bold ${current.header}`}>{title}</h2>
                    </div>
                    <button onClick={onClose} aria-label="Close modal" className="p-1 hover:bg-white/5 rounded-lg transition-colors text-gray-500">
                        <X size={20} />
                    </button>
                </div>
                <div className="mb-6 text-gray-400 text-sm leading-relaxed">{children}</div>
                <div className="flex justify-end space-x-3">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button variant={current.btn} onClick={() => { onConfirm?.(); onClose(); }}>{confirmText}</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;