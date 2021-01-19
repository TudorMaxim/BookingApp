import React, {
  createContext, useContext, useReducer, FunctionComponent,
} from 'react';
import initialState from './initialState';
import rootReducer, { IAction } from './rootReducer';
import { IState } from './stateTypes';

export interface IStore {
    state: IState;
    dispatch: React.Dispatch<IAction>;
}

const AppContext = createContext<IStore>({
  state: initialState,
  dispatch: () => null,
});

export const useStore = () : IStore => useContext(AppContext);

export const StoreProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store: IStore = { state, dispatch };
  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};
