import CreatePathForm from '../components/features/CreatePathForm';
import PathCard from '../components/features/PathCard';
import useApp from '../context/useApp';
import AnimatedEntrance from '../components/ui/AnimatedEntrance';
import EmptyState from '../components/ui/EmptyState';
import { Target } from 'lucide-react';

const Path = () => {
    const { state } = useApp();
    const paths = state.paths || [];
    const TECH_OPTIONS = [
    "JavaScript", "React", "HTML", "CSS", "TypeScript", "Next.js", "Python", "Node.js",
    "Tailwind CSS", "SQL", "Java", "PostgreSQL", "MongoDB", "Firebase", "PHP",
    "C#", "Vue.js", "OpenAI API", "Rust", "Go", "Supabase", "Angular",
    "Express.js", "React Native", "Flutter", "Django", "Ruby", "Svelte",
    "FastAPI", "PyTorch", "NestJS", "LangChain"
  ];
    
    const subtitle = paths.length > 0 
        ? `${paths.length} active path${paths.length === 1 ? '' : 's'}. Keep leveling up.` 
        : "Define where you are going and commit to every step.";

    return (
        <div className="w-full">
            <AnimatedEntrance type="text" className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-streak/80 font-semibold">your roadmap</p>
                <h1 className="text-2xl font-bold text-white">Learning paths</h1>
                <p className="mt-2 mb-6 text-sm text-muted-foreground">{subtitle}</p>
            </AnimatedEntrance>
            
            <AnimatedEntrance staggerIndex={1}>
                <CreatePathForm techOptions={TECH_OPTIONS} />
            </AnimatedEntrance>

            <AnimatedEntrance staggerIndex={2} className="mt-10">
                {paths.length > 0 ? ( // Conditionally render PathCard or EmptyState
                    <PathCard paths={paths} />
                ) : (
                    <EmptyState 
                        icon={Target}
                        title="No roadmaps defined"
                        description="Define where you are going and commit to every step. Create a learning path to organize your progress and stay on track."
                    />
                )}
            </AnimatedEntrance>
        </div>
    )
}

export default Path;