import AddInsight from "../components/features/AddInsight";
import LogTimeline from "../components/features/LogTimeline";
import useApp from "../context/useApp";
import AnimatedEntrance from "../components/ui/AnimatedEntrance";

const Logs = () => {
    const { state } = useApp();
    const logCount = (state.logEntries || []).length;
    const subtitle = `Your learning memory. ${logCount} insight${logCount === 1 ? '' : 's'} committed.`;

    return (
        <div className="w-full space-y-5">
            <AnimatedEntrance type="text" className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-streak/80 font-semibold">commit log</p>
                <h2 className="text-2xl font-bold text-white">Commit log</h2>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </AnimatedEntrance>
            
            <AnimatedEntrance staggerIndex={1}>
                <AddInsight />
            </AnimatedEntrance>

            <AnimatedEntrance staggerIndex={2} className="py-4 px-4 w-full bg-surface rounded-card border border-border/50">
                <LogTimeline />
            </AnimatedEntrance>
        </div>
    );
}

export default Logs;