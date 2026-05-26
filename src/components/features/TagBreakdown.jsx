import useApp from "../../context/useApp";
import Card from "../ui/Card";
import { Library } from "lucide-react";

const TagBreakdown = () => {
    const { state } = useApp();

    // 1. Calculate real tag counts from log entries
    // We use an empty object as the starting accumulator
    const tagCounts = state.logEntries.reduce((acc, entry) => {
        entry.tags?.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {});

    // 2. Filter and Sort
    // We only show tags that actually have at least 1 entry.
    const displayTags = Object.entries(tagCounts)
        .filter(([, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);

    const hasNoLogs = displayTags.length === 0;

    // Get max count for scaling bars (minimum 1 to avoid division by zero)
    const maxCount = Math.max(...Object.values(tagCounts), 1);

    return (
        <Card className="p-5 border border-border/50 shadow-sm flex flex-col min-h-[240px]">
            {hasNoLogs ? (
                <>
                    <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-streak/5 rounded-3xl text-streak/30">
                            <Library size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-[#e8eaf0] tracking-tight">Your growth story is waiting</h3>
                    </div>
                    <p className="text-[11px] text-ghost text-center uppercase tracking-widest leading-relaxed pt-5 border-t border-border/10">
                        Every expert started with one note. Write down what you learned today to see your journey bloom.
                    </p>
                </>
            ) : (
                <div className="space-y-6">
                    {displayTags.map(([tag, count]) => {
                // Get the color from tagColors
                const colorClass = (state.tagColors && state.tagColors[tag]) || "bg-streak text-black";
                const bgColor = colorClass.split(' ')[0]; // Get the bg color class

                // Calculate bar width
                const barWidth = (count / maxCount) * 100;

                return (
                    <div key={tag} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white/90 uppercase tracking-wider">{tag}</span>
                            <span className="ml-auto text-sm text-muted-foreground">{count}</span>
                        </div>
                        <div className="h-1.5 bg-surface-20 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${bgColor} transition-all duration-700 ease-out`} 
                                style={{ width: `${barWidth}%` }} 
                            />
                        </div>
                    </div>
                );
                    })}
                </div>
            )}
        </Card>
    );
};

export default TagBreakdown;
