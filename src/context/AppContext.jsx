import { createContext, useEffect, useReducer } from 'react';

const initialState = {
  tasks: [
    { id: 1, text: 'Initialize your development environment', done: false },
    { id: 2, text: 'Deconstruct current complexity into units', done: false },
  ],
  streak: 0,
  lastActiveDate: null,
  mood: null,
  logEntries: [],
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

    case 'CLEAR_TASKS':
      return {
        ...state,
        tasks: [],
        ...streakUpdate,
      };

    default:
      return state;
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const persisted = localStorage.getItem('DEVMEPATH');
    return persisted ? JSON.parse(persisted) : initialState;
  });

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
