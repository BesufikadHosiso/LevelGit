import StatCards from "../components/features/StatCards";
import TagBreakdown from "../components/features/TagBreakdown";
import useApp from "../context/useApp";
import AnimatedEntrance from "../components/ui/AnimatedEntrance";

const Stats = () => {
    const { state } = useApp();
    const streak = state.streak || 0;
    const topTag = state.mostStudiedTag || "nothing yet";
    const subtitle = `${streak}-day streak. Most committed to: ${topTag}.`;

    return (
        <div className="flex flex-col gap-4 w-full">
            <AnimatedEntrance type="text" className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-streak/80 font-semibold">your progress</p>
                <h1 className="text-2xl font-bold text-white">Growth stats</h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </AnimatedEntrance>
            
            <AnimatedEntrance staggerIndex={1}>
                <StatCards />
            </AnimatedEntrance>

            <AnimatedEntrance staggerIndex={2} className="mt-6">
                <h2 className="text-lg font-semibold text-white mb-2">What You Are Learning</h2>
                <TagBreakdown />
            </AnimatedEntrance>
        </div>
    )
}

export default Stats;