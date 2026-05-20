import useApp from '../../context/useApp';
import { Activity, CheckCircle, ListChecks } from 'lucide-react';

const StatSummary = () => {
    const { state } = useApp();

    return (
     // I don't like the alignment of items inside the card I want it to be aligned in modern way not ordnary top down so I want it to be fixed now
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-surface rounded-card text-center flex flex-col items-center">
            <Activity className="mx-auto mb-1" size={18} />
          <h2 className="text-base font-semibold mb-1 text-white">Current Streak</h2>
          <p className="text-xl font-bold text-streak">{state.streak} {state.streak === 1 ? 'day' : 'days'}</p>
        </div>
        <div className="p-3 bg-surface rounded-card text-center flex flex-col items-center">
            <ListChecks className="mx-auto mb-1" size={18} />
          <h2 className="text-base font-semibold mb-1 text-white">Logged Topics</h2>
          <p className="text-xl font-bold text-streak">{state.logEntries.length}</p>
        </div>
        <div className="p-3 bg-surface rounded-card text-center flex flex-col items-center">
            <CheckCircle className="mx-auto mb-1" size={18} />
            <h2 className="text-base font-semibold mb-1 text-white">Total Tasks</h2>
          <p className="text-xl font-bold text-streak">{state.tasks.length}</p>
        </div>
      </div>

    )
}

export default StatSummary;