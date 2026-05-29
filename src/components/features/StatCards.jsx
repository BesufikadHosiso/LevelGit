import Card from '../ui/Card'
import { Activity, ListChecks, Tag, Smile } from 'lucide-react'
import useApp from '../../context/useApp'

const StatCards = () => {
    const { state } = useApp();

    // Calculate the most used tag from log entries
    const tagCounts = state.logEntries.reduce((acc, entry) => {
      entry.tags?.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    const mostUsedTag = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

    return (
        <section aria-label="Your Progress Highlights" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Streak Card */}
            <Card className="p-4 flex items-center gap-4 border border-border/50 shadow-sm">
                <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
                    <Activity size={24} strokeWidth={2.5} aria-hidden="true" />
                </div>
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-ghost">Days in a Row</h3>
                    <p className="text-2xl font-bold text-[#e8eaf0] leading-tight">
                        {state.streak} {state.streak === 1 ? 'day' : 'days'}
                    </p>
                </div>
            </Card>

            {/* Total Logs Card */}
            <Card className="p-4 flex items-center gap-4 border border-border/50 shadow-sm">
                <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
                    <ListChecks size={24} strokeWidth={2.5} aria-hidden="true" /> {/* Changed to p */}
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ghost">Ideas Saved</p>
                    <h2 className="text-2xl font-bold text-[#e8eaf0] leading-tight">{state.logEntries.length}</h2>
                </div>
            </Card>

            {/* Top Tag Card */}
            <Card className="p-4 flex items-center gap-4 border border-border/50 shadow-sm">
                <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
                    <Tag size={24} strokeWidth={2.5} aria-hidden="true" /> {/* Changed to p */}
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ghost">Main Focus</p>
                    <h2 className="text-2xl font-bold text-[#e8eaf0] leading-tight truncate max-w-20" title={mostUsedTag}>
                        {mostUsedTag}
                    </h2>
                </div>
            </Card>

            {/* Mood Card */}
            <Card className="p-4 flex items-center gap-4 border border-border/50 shadow-sm">
                <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
                    <Smile size={24} strokeWidth={2.5} aria-hidden="true" /> {/* Changed to p */}
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ghost">How You Feel</p>
                    <h2 className="text-2xl font-bold text-[#e8eaf0] leading-tight">{state.mood || 'N/A'}</h2>
                </div>
            </Card>
        </section>
    );
}

export default StatCards;
