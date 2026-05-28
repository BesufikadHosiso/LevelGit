import CreatePathForm from '../components/features/CreatePathForm';
import PathCard from '../components/features/PathCard';
import useApp from '../context/useApp';

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
            <p className="text-xs uppercase tracking-[0.24em] text-streak/80 font-semibold">your roadmap</p>
            <h1 className="text-2xl font-bold text-white -mt-2">Learning paths</h1>
            <p className="mt-2 mb-6 text-sm text-muted">{subtitle}</p>
            <CreatePathForm techOptions={TECH_OPTIONS} />
            <div className="mt-10">
                <PathCard paths={paths} />
            </div>
        </div>
    )
}

export default Path;