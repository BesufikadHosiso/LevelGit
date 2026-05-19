import { createContext, useEffect, useReducer } from 'react';

const initialState = {
    tasks: [],
    streak: 0,
    mood: null,
    logEntries: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
           return {
                ...state,
                tasks: [...state.tasks, action.payload], 
            };
        default:
            return state;
    }
    
};

const AppContext = createContext();


const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        const persistedState = localStorage.getItem("appState");

        if (persistedState) {

            dispatch({ type: "LOAD_STATE", payload: JSON.parse(persistedState) });

        }

    }, []);

    useEffect(() => {

        localStorage.setItem("appState", JSON.stringify(state));

    }, [state]);

    return (

        <AppContext.Provider value={{ state, dispatch }}>

            {children}

        </AppContext.Provider>

    );

};

export { AppProvider };

export default AppContext;

 