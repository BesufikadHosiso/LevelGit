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
        <p className="text-xs uppercase tracking-[0.24em] text-streak/80 font-semibold">Welcome back</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">{greeting}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
            Here's a quick overview of your progress and today's agenda. Keep up the great work and let's make today productive!
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
