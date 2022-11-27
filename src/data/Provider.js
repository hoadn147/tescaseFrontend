import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";

function Provider({ children }) {
    const [state, dispacth] = useReducer(reducer, initState)
    return (
        <Context.Provider value={[state, dispacth]}>
            {children}
        </Context.Provider>
    );
}

export default Provider;