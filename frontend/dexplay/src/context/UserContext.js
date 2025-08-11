import { createContext } from 'react';

export const UserContext = createContext({
  isLoggedIn: false,
  userData: null,
  setIsLoggedIn: () => {},
  setUserData: () => {}
})

// using this is login.jsx