import { useState } from 'react';
import useApp from '../../context/useApp';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';

const TAG_COLORS = {
  'JavaScript': 'bg-yellow-400 text-black',
  'React': 'bg-sky-400 text-black',
  'HTML': 'bg-[#E34F26] text-white',
  'CSS': 'bg-blue-600 text-white',
  'TypeScript': 'bg-blue-600 text-white',
  'Next.js': 'bg-zinc-950 text-white',
  'Python': 'bg-blue-700 text-white',
  'Node.js': 'bg-green-700 text-white',
  'Tailwind CSS': 'bg-cyan-500 text-white',
  'SQL': 'bg-orange-500 text-white',
  'Java': 'bg-orange-500 text-white',
  'PostgreSQL': 'bg-blue-600 text-white',
  'MongoDB': 'bg-green-600 text-white',
  'Firebase': 'bg-amber-400 text-black',
  'PHP': 'bg-indigo-400 text-white',
  'C#': 'bg-violet-700 text-white',
  'Vue.js': 'bg-emerald-500 text-white',
  'OpenAI API': 'bg-zinc-950 text-white',
  'Rust': 'bg-red-700 text-white',
  'Go': 'bg-sky-500 text-white',
  'Supabase': 'bg-emerald-400 text-black',
  'Angular': 'bg-rose-600 text-white',
  'Express.js': 'bg-zinc-950 text-white',
  'React Native': 'bg-sky-400 text-black',
  'Flutter': 'bg-blue-700 text-white',
  'Django': 'bg-emerald-950 text-white',
  'Ruby': 'bg-red-600 text-white',
  'Svelte': 'bg-[#FF3E00] text-white',
  'FastAPI': 'bg-teal-600 text-white',
  'PyTorch': 'bg-red-600 text-white',
  'NestJS': 'bg-rose-600 text-white',
  'LangChain': 'bg-[#1C3C3C] text-white'
};

/**
 * Component to display the learning paths journey.
 * Handles empty state and visualizes current learning paths.
 */
const PathCard = () => {
    const { state, dispatch } = useApp();
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, pathId: null });

    // Defensive check: Ensure paths is always an array to prevent crash if state is malformed
    const paths = Array.isArray(state?.paths) ? state.paths : [];

    const handleDeleteClick = (id) => {
        setDeleteModal({ isOpen: true, pathId: id });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.pathId) {
            dispatch({ type: 'DELETE_PATH', payload: deleteModal.pathId });
        }
        setDeleteModal({ isOpen: false, pathId: null });
    };

    if (paths.length === 0) {
        return (
            <div className="text-center py-12 bg-surface/30 rounded-card border border-dashed border-border/50">
                <p className="text-muted-foreground text-sm">No paths yet — create your first learning goal above.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white px-1">Your Journey</h3>
            <div className="space-y-6">
                {paths.filter(path => path && typeof path === 'object' && path.id).map(path => {
                    const steps = Array.isArray(path.steps) ? path.steps : [];
                    // Defensive check for steps to prevent blank page crash
                    const validSteps = steps.filter(s => s && typeof s === 'object' && 'done' in s);
                    const progress = validSteps.length > 0 
                        ? (validSteps.filter(s => s.done).length / validSteps.length) * 100 
                        : 0;

                    return (
                        <Card key={path.id} className="p-5 space-y-4 border border-border/50 group">
                            {/* Header Section */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-bold text-white">{path.title}</h4>
                                    <span className={`inline-block mt-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${TAG_COLORS[path.tech] || 'bg-streak text-black'}`}>
                                        {path.tech}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleDeleteClick(path.id)} 
                                    className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-400"
                                    aria-label="Delete path"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Progress Bar Section */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                    <span>Roadmap Progress</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1.5 bg-surface-20 rounded-full overflow-hidden">
                                    <div className="h-full bg-streak transition-all duration-500" style={{ width: `${progress}%` }} />
                                </div>
                            </div>

                            {/* Steps Section */}
                            <div className="grid grid-cols-1 gap-2 pt-2">
                                {steps.filter(s => s && typeof s === 'object' && s.id).map(step => (
                                    <div 
                                        key={step.id}
                                        onClick={() => dispatch({ type: 'TOGGLE_PATH_STEP', payload: { pathId: path.id, stepId: step.id } })}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                                    >
                                        {step.done ? <CheckCircle2 size={18} className="text-streak" /> : <Circle size={18} className="text-muted-foreground" />}
                                        <span className={`text-sm ${step.done ? 'text-muted-foreground line-through' : 'text-white/90'}`}>{step.text}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, pathId: null })}
                title="Delete Learning Path"
                variant="warning"
                confirmText="Delete"
                onConfirm={handleConfirmDelete}
            >
                Are you sure you want to delete this learning path? This action cannot be undone and all progress will be lost.
            </Modal>
        </div>
    );
};

export default PathCard;