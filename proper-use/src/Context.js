import React from 'react';

const Context = React.createContext();

export class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      increment: this.increment,
    };
  }

  increment = () => {
    this.setState((state) => ({ num: state.num + 1 }));
  };

  render() {
    console.log("Context Provider is rendering");
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;