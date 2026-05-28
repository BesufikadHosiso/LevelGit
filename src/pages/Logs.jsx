import AddInsight from "../components/features/AddInsight";
import LogTimeline from "../components/features/LogTimeline";
import useApp from "../context/useApp";

const Logs = () => {
    const { state } = useApp();
    const logCount = (state.logEntries || []).length;
    const subtitle = `Your learning memory. ${logCount} insight${logCount === 1 ? '' : 's'} committed.`;

    return (
        <div className="w-full space-y-5">
            <p className="text-xs uppercase tracking-[0.24em] text-streak/80 font-semibold">commit log</p>
            <h2 className="text-xl font-bold text-white -mt-2">Commit log</h2>
            <p className="text-muted text-sm">{subtitle}</p>
            <AddInsight />
            <div className="space-y-4 pt-8 px-4 w-full bg-surface rounded-card border border-border/50">
                <LogTimeline />
            </div>
        </div>
    );
}

export default Logs;