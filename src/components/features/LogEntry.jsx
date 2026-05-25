import { Edit2, Trash2 } from 'lucide-react';

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

const LogEntry = ({ id, title, description, tag, date, isLast, onEdit, onDelete }) => {

    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const formattedTime = new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Get the first tag for the timeline dot color
    const mainTag = Array.isArray(tag) ? tag[0] : tag;

    return(
        <div className="relative pl-10 pb-10 group">
            {/* Vertical Line Segment */}
            {!isLast && (
                <div className="absolute left-2.75 top-6 bottom-0 w-0.5 bg-border/40 group-hover:bg-streak/30 transition-colors" />
            )}

            {/* Timeline Node (Dot) */}
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-night flex items-center justify-center transition-all group-hover:scale-110 z-10 ${TAG_COLORS[mainTag] ? TAG_COLORS[mainTag].split(' ')[0] : 'bg-streak'}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-night" />
            </div>

            <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                        <span className="shrink-0 mt-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground bg-surface-20 px-2 py-1 rounded">
                            {formattedDate} <span className="mx-1 text-streak font-bold">*</span> {formattedTime}
                        </span>
                        <div className="flex gap-1.5 overflow-x-auto pb-3">
                            {Array.isArray(tag) ? (
                                tag.map((t) => (
                                    <span key={t} className={`shrink-0 whitespace-nowrap text-[10px] font-bold px-2 py-1 rounded border border-white/5 uppercase tracking-wider ${TAG_COLORS[t] || 'bg-gray-400/20 text-gray-400'}`}>
                                        #{t}
                                    </span>
                                ))
                            ) : (
                                tag && (
                                    <span className={`shrink-0 whitespace-nowrap text-[10px] font-bold px-2 py-1 rounded border border-white/5 uppercase tracking-wider ${TAG_COLORS[tag] || 'bg-gray-400/20 text-gray-400'}`}>
                                        #{tag}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Action Icons: Always visible on mobile, hover on desktop */}
                    <div className="flex items-center gap-1 transition-all duration-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                        <button onClick={onEdit} className="p-2 rounded-lg hover:bg-surface-20 text-muted-foreground hover:text-white transition-colors">
                            <Edit2 size={14} />
                        </button>
                        <button onClick={onDelete} className="p-2 rounded-lg hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
                <div className="p-4 bg-surface rounded-card border border-border/50 group-hover:border-streak/40 transition-colors shadow-sm">
                    <h4 className="text-base font-bold text-white leading-tight mb-2">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default LogEntry;