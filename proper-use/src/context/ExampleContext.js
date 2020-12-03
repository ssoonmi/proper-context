import React, { useState, useContext } from 'react';

export const ExampleContext = React.createContext();

export const useExampleContext = () => {
  return useContext(ExampleContext);
};

function ContextProvider({ children }) {
  const [num, setNum] = useState(0);

  const increment = () => {
    setNum(num + 1);
  };

  console.log("Context Provider is rendering");
  return (
    <ExampleContext.Provider value={{ num, increment }}>
      {children}
    </ExampleContext.Provider>
  );
}

export default ContextProvider;