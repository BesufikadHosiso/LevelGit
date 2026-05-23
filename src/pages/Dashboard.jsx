import TaskList from '../components/features/TaskList'
import StatSummary from '../components/features/StatSummary'
import PickMood from '../components/features/PickMood'
import ActivityHeat from '../components/features/ActivityHeat'

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const Dashboard = () => {
  const greeting = getGreeting();

  return (
    <div className="space-y-5 px-4 py-4">
      <header className="rounded-card border border-border/50 bg-surface p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-streak/80 font-semibold">Keep Growing</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">{greeting}, Creator</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
            Look at how much you have done. Here is your plan for today. Let's make it a great day!
        </p>
        <div className="mt-4">
         <ActivityHeat />
        </div>
      </header>

      

      <StatSummary />
      <TaskList />
      <PickMood />
    </div>
  )
}

export default Dashboard;
