import { createContext, useEffect, useReducer } from 'react';

const initialState = {
  tasks: [],
  streak: 0,
  mood: null,
  logEntries: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, done: !task.done } : task
        ),
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
      };

    case 'ADD_LOG':
      return {
        ...state,
        logEntries: [action.payload, ...state.logEntries],
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        ),
      };

    case 'CLEAR_TASKS':
      return {
        ...state,
        tasks: [],
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
