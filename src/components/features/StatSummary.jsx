import useApp from '../../context/useApp';
import { Activity, CheckCircle, ListChecks } from 'lucide-react';

const StatSummary = () => {
    const { state } = useApp();

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-surface rounded-card flex items-center gap-4 border border-border/50">
          <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Current Streak</p>
            <h2 className="text-lg font-bold text-white">{state.streak} {state.streak === 1 ? 'day' : 'days'}</h2>
          </div>
        </div>
        <div className="p-4 bg-surface rounded-card flex items-center gap-4 border border-border/50">
          <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
            <ListChecks size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Logged Topics</p>
            <h2 className="text-lg font-bold text-white">{state.logEntries.length}</h2>
          </div>
        </div>
        <div className="p-4 bg-surface rounded-card flex items-center gap-4 border border-border/50">
          <div className="p-2.5 bg-streak/10 rounded-xl text-streak">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Tasks</p>
            <h2 className="text-lg font-bold text-white">{state.tasks.length}</h2>
          </div>
        </div>
      </div>

    )
}

export default StatSummary;