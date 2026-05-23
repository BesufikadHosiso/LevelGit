import { useState } from 'react';
import useApp from '../../context/useApp';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LANGUAGES = [
  "JavaScript",
  "React",
  "HTML",
  "CSS",
  "TypeScript",
  "Next.js",
  "Python",
  "Node.js",
  "Tailwind CSS",
  "SQL",
  "Java",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "PHP",
  "C#",
  "Vue.js",
  "OpenAI API",
  "Rust",
  "Go",
  "Supabase",
  "Angular",
  "Express.js",
  "React Native",
  "Flutter",
  "Django",
  "Ruby",
  "Svelte",
  "FastAPI",
  "PyTorch",
  "NestJS",
  "LangChain"
];

const AddInsight = () => {
    const { dispatch } = useApp();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState('');

    const toggleTag = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag) 
                : [...prev, tag]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError('Both title and description are required.');
            return;
        }

        const newInsight = {
            id: Date.now(),
            title,
            description,
            tags: selectedTags,
            createdAt: new Date().toISOString()
        };

        dispatch({ type: 'ADD_LOG', payload: newInsight });
        
        // Reset form
        setTitle('');
        setDescription('');
        setSelectedTags([]);
        setError('');
    }

    return(
        <form onSubmit={handleSubmit} className="p-4 bg-surface rounded-card border border-border/50 space-y-5">
            <h2 className="text-xl font-bold text-white">Save a New Discovery</h2>
            {error && <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded-lg">{error}</p>}
            <Input 
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <Input 
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Dive into the details. What did you learn(do)?"
                textarea
            />

            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pick a Category</label>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar active:cursor-grabbing">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => toggleTag(lang)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                                selectedTags.includes(lang)
                                    ? 'bg-streak text-black border-streak shadow-[0_0_15px_rgba(110,231,183,0.3)]'
                                    : 'bg-surface-20 text-muted-foreground border-border/50 hover:border-streak/40'
                            }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            <Button variant='primary' type="submit" className="w-full py-4 text-base font-bold">
                Keep this Knowledge
            </Button>
        </form>
    )
};

export default AddInsight;