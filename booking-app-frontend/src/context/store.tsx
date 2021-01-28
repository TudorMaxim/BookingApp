import {
  createContext, useContext, useReducer, FunctionComponent, Dispatch,
} from 'react';
import initialState from './initialState';
import rootReducer, { IAction } from './rootReducer';
import { IState } from './types';

export interface IStore {
    state: IState;
    dispatch: Dispatch<IAction>;
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
