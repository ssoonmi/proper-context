import { useState } from 'react';

import ExampleContext from './context/ExampleContext';
import Component from './components/Component';
import ConnectedComponent from './components/ConnectedComponent';

function AppWithContext() {
  const [num, setNum] = useState(0);

  const increment = () => {
    setNum(num + 1);
  }

  console.log('App With Context is rendering');
  return (
    <ExampleContext.Provider value={{ num, increment }}>
      <App />
    </ExampleContext.Provider>
  );
}

function App() {
  console.log('App is rendering');
  return (
    <div>
      <Component />
      <ConnectedComponent />
    </div>
  );
}

export default AppWithContext;