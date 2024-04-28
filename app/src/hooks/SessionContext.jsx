import React, { createContext, useState } from 'react';

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const saveSession = (userSession) => {
    setSession(userSession);
  };

  const clearSession = () => {
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, saveSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};