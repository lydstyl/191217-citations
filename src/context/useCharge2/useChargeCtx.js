import React, { useContext, createContext, useReducer } from 'react';

import reducer from './reducer';

const initialState = { chargesLists: ['one', 'two'], otherStuff: 'other' };

const Context = createContext();

// CONTEXT
export const useChargeCtx = () => useContext(Context);

// CONTEXT PROVIDER
export const ChargeCtx2Provider = ({ children }) => {
  const [chargeStore, chargeDispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ chargeDispatch, chargeStore }}>
      {children}
    </Context.Provider>
  );
};
