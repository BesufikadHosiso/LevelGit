import AddInsight from "../components/features/AddInsight";
import LogTimeline from "../components/features/LogTimeline";
import useApp from "../context/useApp";

const Logs = () => {
    const { state } = useApp();
    const logCount = state.logEntries?.length || 0;
    const subtitle = `You have recorded ${logCount} learning insight${logCount === 1 ? '' : 's'} in your personal memory.`;

    return (
        <div className="p-4 bg-surface rounded-card border border-border/50 space-y-5">
            <h2 className="text-xl font-bold text-white">Your Growth History</h2>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
            <AddInsight />
            <div className="space-y-4">
                <LogTimeline />
            </div>
        </div>
    );
}

export default Logs;