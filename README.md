# Proper vs. Improper Way to do React Context with Dynamic Value

NOTE: The "improper" way still works and you might never notice the difference, 
but the "proper" way shown here is the most efficient performance-wise. The 
"improper" way is shown in the React docs here: https://reactjs.org/docs/context.html

## Improper

[Improper Use Code]

The way we currently teach students is that anytime we use context with a 
dynamic value, we tell them to wrap `App` with context's provider as a direct
child:

```js
// App.js
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
```

However, this causes a re-render for ALL the children of `App`, not just the
components that are wrapped by a consumer.

In the following image any component logged before the red line, are the
components that are initially rendered. But any component logged after the red
line are rendered after the value of the context is updated. `Component` is not 
wrapped by a consumer. `ConnectedComponent` is.

Since `App` and all of its children are shown after the red line, the `App` 
component and all its children are being rendered any time the context's value 
changes, regardless of if they are wrapped by a consumer. 

![AppWithContext Image]

## Proper

[Proper Use Code]

The proper way to use React context with a dynamic value is to make a wrapper
component.

```js
// Context.js
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
```

```js
// App.js
function Root() {
  console.log('Root is rendering');
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}
```

Here, we create a `ContextProvider` wrapper component that will handle state,
the provider, and the provider's value. Then we pass `App` as a child to the
`ContextProvider` wrapper component.

When the value of the context changes, only the components wrapped by the
context's consumer will re-render.

In the following image any component logged before the red line, are the
components that are initially rendered. But any component logged after the red
line are rendered after the value of the context is updated. `Component` is not 
wrapped by a consumer. `ConnectedComponent` is.

Only `ContextProvider` and `ConnectedComponent` show up after the red line, the 
`App` component and all the children that are not connected are NOT being 
rendered any time the context's value changes. 

![ContextProvider Image]

[Improper Use Code]: ./improper-use
[Proper Use Code]: ./proper-use
[AppWithContext Image]: ./improper-AppWithContext.png
[ContextProvider Image]: ./proper-ContextProvider.png