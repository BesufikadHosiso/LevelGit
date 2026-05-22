import AddInsight from "../components/features/AddInsight";
import LogTimeline from "../components/features/LogTimeline";

const Logs = () => {

    return (
        <div className="p-4 bg-surface rounded-card border border-border/50 space-y-5">
            <h2 className="text-xl font-bold text-white">Logs</h2>
            <p className="text-muted-foreground text-sm">This is where all your logs will be displayed. You can add new logs using the form below.</p>
            <AddInsight />
            <div className="space-y-4">
                <LogTimeline />
            </div>
        </div>
    );
}

export default Logs;