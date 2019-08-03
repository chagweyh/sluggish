import React, { useReducer, useContext } from 'react';
import appReducer, { initialState } from '../reducers/appReducer';
import { isTokenValid, setToken, TOKEN_KEY } from '../API/APIUtils';
import { getLocalStorageValue } from '../utils';
import { logout } from '../API/AuthAPI';

const Context = React.createContext();

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  React.useEffect(() => {
    const token = getLocalStorageValue(TOKEN_KEY);

    if (!token) return;

    if (isTokenValid(token)) {
      setToken(token);
      dispatch({ type: 'LOGIN' });
    } else {
      dispatch({ type: 'LOGOUT' });
      logout();
    }
  }, []);

  return <Context.Provider value={{ state, dispatch }} children={children} />;
}

export function useAppState() {
  return useContext(Context);
}
