import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(Cookies.get('userSession') ? JSON.parse(Cookies.get('userSession')) : null);

  const saveSession = (userSession) => {
    setSession(userSession);
    Cookies.set('userSession', JSON.stringify(userSession), { expires: 1 });
    console.log(Cookies.get('userSession'));
  };

  const clearSession = () => {
    setSession(null);
    Cookies.remove('userSession');
  };

  return (
    <SessionContext.Provider value={{ session, saveSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};