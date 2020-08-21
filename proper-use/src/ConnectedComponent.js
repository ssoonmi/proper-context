import React from 'react';
import Context from './Context';

class ConnectedComponent extends React.Component {
  static contextType = Context;

  render() {
    console.log('Connected Component is rendering');
    return (
      <>
        <h1>ConnectedComponent</h1>
        <button onClick={this.context.increment}>
          {this.context.num}
        </button>
      </>
    )
  }
}

export default ConnectedComponent