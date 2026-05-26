import StatCards from "../components/features/StatCards";
import TagBreakdown from "../components/features/TagBreakdown";
import useApp from "../context/useApp";

const Stats = () => {
    const { state } = useApp();
    const streak = state.streak || 0;
    const subtitle = streak > 0 
        ? `You're on a ${streak} day streak!${state.mostStudiedTag ? ` Your top focus is ${state.mostStudiedTag}.` : ''}`
        : "Start your learning journey today to see your stats here.";

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-white">Your Growth Journey</h1>
            <p className="text-sm text-muted">{subtitle}</p>
            <StatCards />
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-white mb-2">What You Are Learning</h2>
                <TagBreakdown />
            </div>
        </div>
    )
}

export default Stats;