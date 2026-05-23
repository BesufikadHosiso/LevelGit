import useApp from '../../context/useApp';
import { Activity, CheckCircle, ListChecks } from 'lucide-react';

const StatSummary = () => {
    const { state } = useApp();

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-surface rounded-card flex items-center gap-4 border border-border/50">
          <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
            <Activity size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ghost">Days in a Row</p>
            <h2 className="text-2xl font-bold text-[#e8eaf0]">{state.streak || 0} {state.streak === 1 ? 'day' : 'days'}</h2>
          </div>
        </div>
        <div className="p-4 bg-surface rounded-card flex items-center gap-4 border border-border/50">
          <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
            <ListChecks size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ghost">Total Lessons</p>
            <h2 className="text-2xl font-bold text-[#e8eaf0]">{state.logEntries.length}</h2>
          </div>
        </div>
        <div className="p-4 bg-surface rounded-card flex items-center gap-4 border border-border/50">
          <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
            <CheckCircle size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ghost">Goals Found</p>
            <h2 className="text-2xl font-bold text-[#e8eaf0]">{state.tasks.length}</h2>
          </div>
        </div>
      </div>

    )
}

export default StatSummary;