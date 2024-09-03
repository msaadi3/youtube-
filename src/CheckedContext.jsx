import React, { createContext, useContext, useState } from 'react';

const CheckedContext = createContext();

export const useChecked = () => {
  return useContext(CheckedContext);
};

export const CheckedProvider = ({ children }) => {
  const [checked, setChecked] = useState();

  return (
    <CheckedContext.Provider value={{ checked, setChecked }}>
      {children}
    </CheckedContext.Provider>
  );
};
