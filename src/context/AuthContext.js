import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AUTH_KEY = 'mm_users';
const SESSION_KEY = 'mm_session';

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload };
    case 'logout':
      return { ...state, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage(AUTH_KEY, []);
  const [state, dispatch] = useReducer(reducer, { user: JSON.parse(localStorage.getItem(SESSION_KEY)) || null });

  const signup = useCallback((name, email, password) => {
    const exists = users.some((u) => u.email === email);
    if (exists) throw new Error('Email already registered');
    const newUsers = [...users, { name, email, password }];
    setUsers(newUsers);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    dispatch({ type: 'login', payload: { email, name } });
  }, [users, setUsers]);

  const login = useCallback((email, password) => {
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) throw new Error('Invalid credentials');
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: match.email }));
    dispatch({ type: 'login', payload: { email: match.email, name: match.name } });
  }, [users]);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    dispatch({ type: 'logout' });
  }, []);

  const value = useMemo(() => ({ user: state.user, signup, login, logout }), [state.user, signup, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
