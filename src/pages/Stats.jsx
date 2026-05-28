import StatCards from "../components/features/StatCards";
import TagBreakdown from "../components/features/TagBreakdown";
import useApp from "../context/useApp";

const Stats = () => {
    const { state } = useApp();
    const streak = state.streak || 0;
    const topTag = state.mostStudiedTag || "nothing yet";
    const subtitle = `${streak}-day streak. Most committed to: ${topTag}.`;

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold text-white">Growth stats</h1>
            <p className="text-xs uppercase tracking-[0.24em] text-streak/80 font-semibold">your progress</p>
            <p className="text-sm text-muted -mt-2">{subtitle}</p>
            <StatCards />
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-white mb-2">What You Are Learning</h2>
                <TagBreakdown />
            </div>
        </div>
    )
}

export default Stats;