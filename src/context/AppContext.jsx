import { createContext, useEffect, useReducer } from 'react';

const initialState = {
  tasks: [
    { id: 1, text: 'Initialize your development environment', done: false },
    { id: 2, text: 'Deconstruct current complexity into units', done: false },
  ],
  paths: [],
  streak: 0,
  lastActiveDate: null,
  mood: null,
  logEntries: [],
  timer: {
    targetTime: null,
    isActive: false,
    duration: 1500, // 25 minutes default
    showModal: false,
  }
};

const getTodayKey = () => new Date().toISOString().split('T')[0];

const isYesterday = (dateString) => {
  if (!dateString) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === yesterday.toISOString().split('T')[0];
};

const buildStreakUpdate = (state) => {
  const today = getTodayKey();
  if (state.lastActiveDate === today) {
    return {};
  }
  if (isYesterday(state.lastActiveDate)) {
    return {
      streak: state.streak + 1,
      lastActiveDate: today,
    };
  }
  return {
    streak: 1,
    lastActiveDate: today,
  };
};

const reducer = (state, action) => {
  const activityActions = new Set([
    'ADD_TASK',
    'TOGGLE_TASK',
    'SET_MOOD',
    'ADD_LOG',
    'EDIT_TASK',
    'CLEAR_TASKS',
    'EDIT_LOG',
    'ADD_PATH',
    'TOGGLE_PATH_STEP',
    'START_TIMER',
    'STOP_TIMER',
    'RESET_TIMER',
    'COMPLETE_TIMER_TASK'
  ]);
  const streakUpdate = activityActions.has(action.type) ? buildStreakUpdate(state) : {};

  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        ...streakUpdate,
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, done: !task.done } : task
        ),
        ...streakUpdate,
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case 'SET_MOOD':
      return {
        ...state,
        mood: action.payload,
        ...streakUpdate,
      };

    case 'ADD_LOG':
      return {
        ...state,
        logEntries: [action.payload, ...state.logEntries],
        ...streakUpdate,
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        ),
        ...streakUpdate,
      };

    case 'DELETE_LOG':
      return {
        ...state,
        logEntries: state.logEntries.filter((log) => log.id !== action.payload),
      };

    case 'EDIT_LOG':
      return {
        ...state,
        logEntries: state.logEntries.map((log) =>
          log.id === action.payload.id
            ? { ...log, ...action.payload }
            : log
        ),
        ...streakUpdate,
      };

    case 'CLEAR_TASKS':
      return {
        ...state,
        tasks: [],
        ...streakUpdate,
      };

    case 'ADD_PATH':
      return {
        ...state,
        paths: [...(state.paths || []), action.payload],
        ...streakUpdate,
      };

    case 'TOGGLE_PATH_STEP':
      return {
        ...state,
        paths: (state.paths || []).map((path) =>
          path.id === action.payload.pathId
            ? {
                ...path,
                steps: (path.steps || []).map((step) =>
                  step.id === action.payload.stepId
                    ? { ...step, done: !step.done }
                    : step
                ),
              }
            : path
        ),
        ...streakUpdate,
      };

    case 'DELETE_PATH':
      return {
        ...state,
        paths: (state.paths || []).filter((path) => path.id !== action.payload),
      };

    case 'START_TIMER':
      if (state.timer.isActive && !action.payload) return state; 
      return {
        ...state,
        timer: {
          ...state.timer,
          isActive: true,
          targetTime: Date.now() + (Number(action.payload) || state.timer.duration) * 1000,
          showModal: false,
        },
        ...streakUpdate,
      };

    case 'STOP_TIMER': {
  const remaining = state.timer.targetTime ? Math.max(0, Math.floor((state.timer.targetTime - Date.now()) / 1000)) : state.timer.duration;
  return {
        ...state,
        timer: {
          ...state.timer,
          isActive: false,
          targetTime: null,
          duration: remaining,
        }
      };
    }

    case 'RESET_TIMER':
      return {
        ...state,
        timer: {
          ...state.timer,
          isActive: false,
          targetTime: null,
          duration: 1500,
          showModal: false,
        }
      };

    case 'TIMER_FINISHED':
      return {
        ...state,
        timer: {
          ...state.timer,
          isActive: false,
          targetTime: null,
          showModal: true,
        }
      };

    case 'CLOSE_TIMER_MODAL':
      return {
        ...state,
        timer: {
          ...state.timer,
          showModal: false,
        }
      };

    default:
      return state;
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const persisted = localStorage.getItem('DEVMEPATH');
    if (persisted) {
      try {
        const saved = JSON.parse(persisted);
        // Merge with initialState to ensure new properties like 'paths' exist
        return { ...initialState, ...saved };
      } catch { return initialState; }
    }
    return initialState;
  });

  // Global Timer Watcher
  useEffect(() => {
    if (!state.timer.isActive || !state.timer.targetTime) return;

    const checkTimer = () => {
      if (Date.now() >= state.timer.targetTime) {
        dispatch({ type: 'TIMER_FINISHED' });
      }
    };

    const interval = setInterval(checkTimer, 1000);
    checkTimer(); // Initial check
    return () => clearInterval(interval);
  }, [state.timer.isActive, state.timer.targetTime]);

  useEffect(() => {
    localStorage.setItem('DEVMEPATH', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
