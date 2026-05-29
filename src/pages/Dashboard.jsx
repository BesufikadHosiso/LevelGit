import TaskList from '../components/features/TaskList'
import StatSummary from '../components/features/StatSummary'
import PickMood from '../components/features/PickMood'
import ActivityHeat from '../components/features/ActivityHeat'
import useApp from '../context/useApp'
import AnimatedEntrance from '../components/ui/AnimatedEntrance'

export function meta() {
  return [
    { title: "Today | LevelGit - Your Daily Dev Dashboard" },
    { name: "description", content: "Your personalized daily dashboard to track tasks, energy levels, and coding activity on LevelGit." },
  ];
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const Dashboard = () => {
  const greeting = getGreeting();
  const { state } = useApp();

  const incompleteCount = (state.tasks || []).filter(t => !t.done).length;
  const moodPart = state.mood ? `. Feeling ${state.mood.toLowerCase()}` : '';
  
  const subtitle = (!state.tasks || state.tasks.length === 0)
    ? "No commits added yet. What are you working on today?"
    : incompleteCount === 0 
    ? `All commits done today${moodPart}.`
    : `${incompleteCount} commit${incompleteCount === 1 ? '' : 's'} left today${moodPart}.`;

  return (
    <div className="w-full space-y-5">
      <AnimatedEntrance type="generic">
        <header className="rounded-card border border-border/50 bg-surface p-4">
          <p className="text-xs uppercase tracking-wider text-streak/80 font-semibold">today's commit</p>
          <h1 className="mt-3 text-2xl font-bold text-white">{greeting}, Creator</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {subtitle}
          </p>
          <div className="mt-4">
           <ActivityHeat />
          </div>
        </header>
      </AnimatedEntrance>

      

      <AnimatedEntrance staggerIndex={1} type="card">
        <StatSummary />
      </AnimatedEntrance>
      <AnimatedEntrance staggerIndex={2}>
        <TaskList />
      </AnimatedEntrance>
      <AnimatedEntrance staggerIndex={3}>
        <PickMood />
      </AnimatedEntrance>
    </div>
  )
}

export default Dashboard;
