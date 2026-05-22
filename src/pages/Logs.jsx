import AddInsight from "../components/features/AddInsight";
import LogTimeline from "../components/features/LogTimeline";

const Logs = () => {

    return (
        <div className="p-4 bg-surface rounded-card border border-border/50 space-y-5">
            <h2 className="text-xl font-bold text-white">Insight Log</h2>
            <p className="text-muted-foreground text-sm">Document your progress. Every entry brings you closer to your goal.</p>
            <AddInsight />
            <div className="space-y-4">
                <LogTimeline />
            </div>
        </div>
    );
}

export default Logs;