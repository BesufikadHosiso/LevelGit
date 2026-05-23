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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Streak Card */}
            <Card className="p-4 flex items-center gap-4 border border-border/50 shadow-sm">
                <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
                    <Activity size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Days in a Row</p>
                    <h2 className="text-lg font-bold text-white leading-tight">
                        {state.streak} {state.streak === 1 ? 'day' : 'days'}
                    </h2>
                </div>
            </Card>

            {/* Total Logs Card */}
            <Card className="p-4 flex items-center gap-4 border border-border/50 shadow-sm">
                <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
                    <ListChecks size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ideas Saved</p>
                    <h2 className="text-lg font-bold text-white leading-tight">{state.logEntries.length}</h2>
                </div>
            </Card>

            {/* Top Tag Card */}
            <Card className="p-4 flex items-center gap-4 border border-border/50 shadow-sm">
                <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
                    <Tag size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Main Focus</p>
                    <h2 className="text-lg font-bold text-white leading-tight truncate max-w-20" title={mostUsedTag}>
                        {mostUsedTag}
                    </h2>
                </div>
            </Card>

            {/* Mood Card */}
            <Card className="p-4 flex items-center gap-4 border border-border/50 shadow-sm">
                <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
                    <Smile size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">How You Feel</p>
                    <h2 className="text-lg font-bold text-white leading-tight">{state.mood || 'N/A'}</h2>
                </div>
            </Card>
        </div>
    );
}

export default StatCards;
