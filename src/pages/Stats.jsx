import StatCards from "../components/features/StatCards";
import TagBreakdown from "../components/features/TagBreakdown";


const Stats = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-white">Your Growth Journey</h1>
            <StatCards />
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-white mb-2">What You Are Learning</h2>
                <TagBreakdown />
            </div>
        </div>
    )
}

export default Stats;