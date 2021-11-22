import React, {createContext, useReducer, useEffect} from "react";              
import Reducer from './Reducer';
                                                                                                                                                     
export const Context = createContext(initialState); 
                                                                                                                                                         
const initialState = {walletData: [
        {wallet:"USD", symbol:"$", balance: 200},
        {wallet:"EUR", symbol:"€", balance: 150},
        {wallet:"GBP", symbol:"£", balance: 10}
]}                                                                            
                                                                                
const Store = ({children}) => {                                                 
    const [state, dispatch] = useReducer(Reducer, initialState);                                                                                                                                               
    return (                                                                    
        <Context.Provider value={[state, dispatch]}>                            
            {children}                                                          
        </Context.Provider>                                                     
    )                                                                           
};  

export default Store;