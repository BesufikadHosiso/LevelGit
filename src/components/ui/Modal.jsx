import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import { X, AlertTriangle, Info } from 'lucide-react';

const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    variant = 'info', 
    confirmText = 'Confirm', 
    onConfirm, 
    confirmDisabled 
}) => {
    // Professional scroll-lock and escape key management
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
            header: 'text-white',
            border: 'border-border',
            btn: 'primary'
        },
        warning: {
            icon: <AlertTriangle className="text-red-400" size={24} />,
            header: 'text-red-400',
            border: 'border-border',
            btn: 'danger'
        }
    };

    const current = variants[variant];

    // Portals are the standard professional way to render modals 
    // to avoid z-index or stacking context issues site-wide.
    return createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 isolate">
            {/* Backdrop: Intense blur satisfying the "everything gets blurred" requirement */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl animate-in fade-in duration-500" onClick={onClose} />
            
            {/* Modal Container: Solid opaque background */}
            <div className={`relative w-full max-w-md bg-surface border-2 ${current.border} rounded-3xl p-6 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        {current.icon}
                        <h2 className={`text-lg font-bold ${current.header}`}>{title}</h2>
                    </div>
                    <button onClick={onClose} aria-label="Close modal" className="p-1 hover:bg-white/5 rounded-lg transition-colors text-gray-500">
                        <X size={20} />
                    </button>
                </div>
                <div className="mb-6 text-gray-400 text-sm leading-relaxed">{children}</div>
                <div className="flex gap-3 mt-8">
                    <Button variant="ghost" onClick={onClose} fullWidth className="py-3 font-bold">
                        Cancel
                    </Button>
                    <Button variant={current.btn} onClick={() => { onConfirm?.(); onClose(); }} disabled={confirmDisabled} fullWidth className="py-3 font-bold">
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;