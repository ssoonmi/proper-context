import React from 'react';

import Context from './Context';
import Component from './Component';
import ConnectedComponent from './ConnectedComponent';

class AppWithContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      increment: this.increment
    };
  }

  increment = () => {
    this.setState((state) => ({ num: state.num + 1 }));
  }

  render() {
    console.log('App With Context is rendering')
    return (
      <Context.Provider value={this.state}>
        <App />
      </Context.Provider>
    );
  }
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