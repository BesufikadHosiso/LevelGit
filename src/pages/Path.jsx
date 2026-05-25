import CreatePathForm from '../components/features/CreatePathForm';
import PathCard from '../components/features/PathCard';
import { useState } from 'react';

const Path = () => {
    const [paths, setPaths] = useState([]);
    const TECH_OPTIONS = [
    "JavaScript", "React", "HTML", "CSS", "TypeScript", "Next.js", "Python", "Node.js",
    "Tailwind CSS", "SQL", "Java", "PostgreSQL", "MongoDB", "Firebase", "PHP",
    "C#", "Vue.js", "OpenAI API", "Rust", "Go", "Supabase", "Angular",
    "Express.js", "React Native", "Flutter", "Django", "Ruby", "Svelte",
    "FastAPI", "PyTorch", "NestJS", "LangChain"
  ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-white mb-6">Create Your Learning Path</h1>
            <CreatePathForm techOptions={TECH_OPTIONS} />
            <div className="mt-10">
                <PathCard paths={paths} setPaths={setPaths} />
            </div>
        </div>
    )
}

export default Path;