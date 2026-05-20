import { useEffect, useState } from 'react';
import useApp from '../../context/useApp';
import Card from '../ui/Card';

const moods = [
  {
    id: 'Rough',
    emoji: '😟',
    title: 'Rough',
    subtitle: 'Need a reset',
    accent: 'text-red-300',
  },
  {
    id: 'Okay',
    emoji: '🙂',
    title: 'Okay',
    subtitle: 'Stable and steady',
    accent: 'text-amber-300',
  },
  {
    id: 'Good',
    emoji: '😃',
    title: 'Good',
    subtitle: 'Feeling upbeat',
    accent: 'text-green-300',
  },
  {
    id: 'Pumped',
    emoji: '🚀',
    title: 'Pumped',
    subtitle: 'Ready to crush it',
    accent: 'text-sky-300',
  },
];

const moodMessages = {
  Rough: {
    heading: "Take a breath.",
    message: "10 minutes counts. You've got this.",
  },
  Okay: {
    heading: "Solid pace.",
    message: "Small wins add up. Stay steady.",
  },
  Good: {
    heading: "Great energy.",
    message: "Keep that momentum going. You’re on the right track.",
  },
  Pumped: {
    heading: "Let’s do it!",
    message: "Channel this power into your next move.",
  },
};

const PickMood = () => {
  const { state, dispatch } = useApp();
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (mood) => {
    dispatch({ type: 'SET_MOOD', payload: mood.id });
    setSelectedMood(mood);
  };

  const dismissToast = () => setSelectedMood(null);

  useEffect(() => {
    if (!selectedMood) return;

    const timer = window.setTimeout(() => {
      setSelectedMood(null);
    }, 15000);

    return () => window.clearTimeout(timer);
  }, [selectedMood]);

  return (
    <div className='p-3 bg-surface rounded-card mt-6 shadow-md'>
    <section className="mt-6">
      {selectedMood && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pointer-events-none sm:bottom-6">
          <div className="pointer-events-auto w-full max-w-sm rounded-card border border-border bg-surface bg-opacity-95 px-3 py-2 shadow-md backdrop-blur-sm transition-transform duration-300 ease-out animate-in slide-in-from-bottom">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedMood.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{selectedMood.title}</p>
                <p className="mt-1 text-xs text-gray-300 leading-snug">
                  {moodMessages[selectedMood.id]?.message}
                </p>
              </div>
              <button
                type="button"
                onClick={dismissToast}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-streak text-sm font-bold text-black transition hover:bg-streak/90"
                aria-label="Dismiss notification"
              >
                ✓
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-streak/80 font-semibold">
            Mood tracker
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            How are you feeling today?
          </h2>
        </div>

        <div className="rounded-card border border-border bg-surface-10 px-3 py-2 text-sm text-muted">
          Current mood:
          <span className="ml-2 font-semibold text-white">
            {state.mood ?? 'Not set yet'}
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {moods.map((mood) => {
          const isActive = state.mood === mood.id;
          return (
            <Card
              key={mood.id}
              onClick={() => handleMoodClick(mood)}
              className={`space-y-4 rounded-3xl border-2 transition-all duration-200 ${
                isActive
                  ? 'border-streak bg-streak-10 shadow-md'
                  : 'border-border bg-surface-10 hover:border-streak hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-2xl ${mood.accent}`}>{mood.emoji}</span>
                {isActive && (
                  <span className="rounded-full bg-streak/20 px-3 py-1 text-xs font-semibold text-streak">
                    Active
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-semibold text-white">{mood.title}</h3>
                <p className="mt-1 text-xs text-muted">{mood.subtitle}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
    </div>
  );
};

export default PickMood;