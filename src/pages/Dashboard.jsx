import TaskList from '../components/features/TaskList'
import StatSummary from '../components/features/StatSummary'
import PickMood from '../components/features/PickMood'
import ActivityHeat from '../components/features/ActivityHeat'
import useApp from '../context/useApp'

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const Dashboard = () => {
  const greeting = getGreeting();
  const { state } = useApp();

  const incompleteCount = state.tasks.filter(t => !t.completed).length;
  const moodPart = state.mood ? ` and you're feeling ${state.mood.toLowerCase()}` : '';
  const subtitle = incompleteCount === 0 
    ? "You've finished all your tasks for today!" 
    : `You have ${incompleteCount} task${incompleteCount === 1 ? '' : 's'} remaining${moodPart}.`;

  return (
    <div className="space-y-5 px-4 py-4">
      <header className="rounded-card border border-border/50 bg-surface p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-streak/80 font-semibold">Keep Growing</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">{greeting}, Creator</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
            {subtitle}
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
