import AddInsight from "../components/features/AddInsight";
import LogTimeline from "../components/features/LogTimeline";

const Logs = () => {

    return (
        <div className="p-4 bg-surface rounded-card border border-border/50 space-y-5">
            <h2 className="text-xl font-bold text-white">Your Growth History</h2>
            <p className="text-muted-foreground text-sm">Write down what you did. Every note helps you get better.</p>
            <AddInsight />
            <div className="space-y-4">
                <LogTimeline />
            </div>
        </div>
    );
}

export default Logs;