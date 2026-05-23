import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListTodo, CheckCircle, Circle } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import useApp from '../context/useApp';


const CurrentTask = ({ onTaskSelect, selectedTask, isLocked }) => {
    const { state } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelection, setTempSelection] = useState(null);

    // Safely retrieve and filter tasks from the real application state
    const undoneTasks = (state?.tasks || []).filter(t => !t.done);

    const handleConfirmSelection = () => {
        if (tempSelection) {
            onTaskSelect(tempSelection);
            setIsModalOpen(false);
        }
    };

    const handleOpenModal = () => {
        if (isLocked) return;
        setTempSelection(selectedTask);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full max-w-md px-4">
            <button 
                onClick={handleOpenModal}
                disabled={isLocked}
                className={`w-full group flex items-center justify-between p-4 rounded-xl border border-border/50 bg-surface/50 transition-all hover:cursor-pointer active:scale-[0.98] ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:border-streak/30 hover:bg-surface'}`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full transition-colors ${selectedTask ? 'bg-streak/20' : 'bg-muted/10 group-hover:bg-streak/10'}`}>
                        <ListTodo size={20} className="text-streak" />
                    </div>
                    <span className={`font-medium transition-colors truncate max-w-55 ${selectedTask ? 'text-white' : 'text-muted-foreground group-hover:text-white'}`}>
                        {selectedTask ? selectedTask.text : 'Ready to start?'}
                    </span>
                </div>
                {!isLocked && (
                    <span className="text-streak text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        {selectedTask ? 'Change' : 'Choose One'}
                    </span>
                )}
            </button>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleConfirmSelection}
                confirmDisabled={!tempSelection}
                title="What is your priority?"
            >
                {undoneTasks.length > 0 ? (
                    <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                        {undoneTasks.map(task => {
                            const isSelected = tempSelection?.id === task.id;
                            return (
                                <Button
                                    key={task.id}
                                    variant={isSelected ? "primary" : "ghost"}
                                    onClick={() => setTempSelection(task)}
                                    className={`w-full justify-start flex items-center gap-3 py-5 px-4 transition-all duration-200 border active:scale-[0.99] ${isSelected ? 'border-streak/50 shadow-[0_0_20px_rgba(110,231,183,0.15)] ring-1 ring-streak/20' : 'border-transparent hover:bg-streak/5 hover:translate-x-1'}`}
                                >
                                    {isSelected ? 
                                        <CheckCircle size={22} className="text-white shrink-0 animate-in zoom-in-75 duration-300" /> : 
                                        <Circle size={22} className="text-muted-foreground shrink-0 group-hover:text-streak transition-colors" />
                                    }
                                    <span className={`text-left line-clamp-2 leading-tight ${isSelected ? 'font-bold text-gray-900' : 'font-normal text-muted-foreground'}`}>{task.text}</span>
                                </Button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">You've finished everything! Time to relax or add more tasks.</p>
                        <Link to="/" className="text-streak font-semibold hover:underline" onClick={() => setIsModalOpen(false)}>Go to Dashboard</Link>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CurrentTask;
