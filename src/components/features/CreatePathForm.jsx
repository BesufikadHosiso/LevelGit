import { useState } from 'react';
import useApp from '../../context/useApp';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Plus, X } from 'lucide-react';

const LANGUAGES = [
  "JavaScript", "React", "HTML", "CSS", "TypeScript", "Next.js", "Python", "Node.js",
  "Tailwind CSS", "SQL", "Java", "PostgreSQL", "MongoDB", "Firebase", "PHP", "C#",
  "Vue.js", "OpenAI API", "Rust", "Go", "Supabase", "Angular", "Express.js",
  "React Native", "Flutter", "Django", "Ruby", "Svelte", "FastAPI", "PyTorch",
  "NestJS", "LangChain"
];

const CreatePathForm = () => {
    const { dispatch } = useApp();
    const [title, setTitle] = useState('');
    const [selectedTech, setSelectedTech] = useState('');
    const [stepInput, setStepInput] = useState('');
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState('');

    const handleAddStep = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const trimmedInput = stepInput?.trim();
        if (trimmedInput) {
            setSteps(prev => [...prev, trimmedInput]);
            setStepInput('');
        }
    };

    const handleRemoveStep = (index) => {
        setSteps(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !selectedTech || steps.length === 0) {
            setError('Title, tech, and at least one step are required.');
            return;
        }

        const timestamp = Date.now();
        const newPath = {
            id: timestamp,
            title,
            tech: selectedTech,
            createdAt: new Date().toISOString(),
            steps: steps.map((text, index) => ({
                id: timestamp + index + 1,
                text,
                done: false
            }))
        };

        dispatch({ type: 'ADD_PATH', payload: newPath });
        
        // Reset form
        setTitle('');
        setSelectedTech('');
        setSteps([]);
        setError('');
    };

    return (
        <div className="space-y-10">
            <form onSubmit={handleSubmit} className="p-4 bg-surface rounded-card border border-border/50 space-y-5">
                <h2 className="text-xl font-bold text-white">Create a Learning Path</h2>
                {error && <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded-lg">{error}</p>}
                
                <Input 
                    label="Path Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master Frontend Development"
                />

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Tech</label>
                    <div className="flex gap-2 overflow-x-auto pb-3">
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setSelectedTech(lang)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                                    selectedTech === lang
                                        ? 'bg-streak text-black border-streak shadow-[0_0_15px_rgba(110,231,183,0.3)]'
                                        : 'bg-surface-20 text-muted-foreground border-border/50 hover:border-streak/40'
                                }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Steps to Completion</label>
                    <div className="flex gap-2">
                        <Input 
                            value={stepInput}
                            onChange={(e) => setStepInput(e.target.value)}
                            placeholder="Add a milestone..."
                            onKeyDown={(e) => e.key === 'Enter' && handleAddStep(e)}
                        />
                        <Button type="button" variant="secondary" onClick={(e) => handleAddStep(e)} className="shrink-0">
                            <Plus size={20} />
                        </Button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-3">
                        {steps.map((s, i) => (
                            <span key={i} className="flex shrink-0 items-center gap-1.5 bg-surface-20 px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 border border-border/50">
                                <span className="max-w-[150px] truncate">{s}</span>
                                <button type="button" onClick={() => handleRemoveStep(i)}><X size={14} /></button>
                            </span>
                        ))}
                    </div>
                </div>

                <Button variant='primary' type="submit" className="w-full py-4 text-base font-bold">Build Path</Button>
            </form>
        </div>
    );
};

export default CreatePathForm;