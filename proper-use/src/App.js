import ExampleContextProvider from './context/ExampleContext';
import Component from './components/Component';
import ConnectedComponent from './components/ConnectedComponent';

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
    <ExampleContextProvider>
      <App />
    </ExampleContextProvider>
  );
}

export default Root;