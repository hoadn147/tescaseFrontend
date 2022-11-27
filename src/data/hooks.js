import { useContext } from "react";
import Context from "./Context";

export const useData = () => {
    const [state, dispatch] = useContext(Context)
    return [state, dispatch];
}
