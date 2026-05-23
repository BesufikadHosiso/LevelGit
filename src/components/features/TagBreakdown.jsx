/*
A list of tags with a colored bar next to each one showing how many entries that tag has. The widest bar = most used tag. Each bar uses the tag's brand color from your tagColors object.
hints
First compute the counts object from logEntries — same reduce pattern as the most-used-tag calculation above.
Only show tags that have at least 1 entry — filter out zeros.
The bar width is a percentage — count for this tag divided by the max count, multiplied by 100. That gives you a 0–100% width. Use inline style for this since Tailwind can't generate dynamic widths.
The bar color comes from your tagColors object. How do you get the background color from a Tailwind class string like
"bg-[#61DAFB] text-black"
? Think about splitting the string.
 Done when: adding a React log entry on the Log page makes the React bar on Stats grow automatically.
*/

import useApp from "../../context/useApp";
import Card from "../ui/Card";

const POPULAR_LANGS = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "Tailwind CSS"
];

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

    // 2. Merge with popular languages (placeholders)
    // We ensure that popular languages appear with at least a 0 count
    const combinedCounts = { ...tagCounts };
    POPULAR_LANGS.forEach(lang => {
        if (combinedCounts[lang] === undefined) {
            combinedCounts[lang] = 0;
        }
    });

    // 3. Prepare display data
    // Sort by count descending and take the top 6. 
    // This automatically removes placeholders as user logs real data.
    const displayTags = Object.entries(combinedCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    // Get max count for scaling bars (minimum 1 to avoid division by zero)
    const maxCount = Math.max(...Object.values(combinedCounts), 1);

    return (
        <Card className="p-5 border border-border/50 shadow-sm space-y-6">
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
        </Card>
    );
};

export default TagBreakdown;
