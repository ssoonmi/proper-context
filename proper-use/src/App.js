import React from 'react';

import { ContextProvider } from './Context';
import Component from './Component';
import ConnectedComponent from './ConnectedComponent';

function App() {
  console.log('App is rendering');
  return (
    <div>
      <Component />
      <ConnectedComponent />
    </div>
  );
}

function Root() {
  console.log('Root is rendering');
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}

export default Root;