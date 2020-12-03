# Proper vs. Improper Way to do React Context with Dynamic Value

NOTE: The "improper" way still works and you might never notice the difference,
but the "proper" way shown here is the most efficient performance-wise. The
"improper" way is shown in the React docs here: https://reactjs.org/docs/context.html

## Improper

[Improper Use Code]

The improper way to use context with a dynamic value is to wrap the children
directly inside of a context's provider. For example, wrapping the `App`
component directly inside of the provider.

```js
// ./src/App.js
// ...
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
```

This causes a re-render for ALL the children of `App`, not just the
components that are wrapped by a consumer. This is because when the component
state of `AppWithContext` changes, then `App` component re-renders.

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
component that will render all the children wrapped into the component.

```js
// ./src/context/ExampleContext.js
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
```

```js
// src/App.js
function Root() {
  console.log('Root is rendering');
  return (
    <ExampleContextProvider>
      <App />
    </ExampleContextProvider>
  );
}
```

Here, we create a `ExampleContextProvider` wrapper component that will handle
state, the provider, and the provider's value. Then we pass `App` as a child to
the `ExampleContextProvider` wrapper component. Instead of passing the `App`
directly as a child to the actual `Provider` of the context, `App` is wrapped
by a wrapper component that will indirectly pass `App` as a child to the
actual `Provider`.

When the value of the context changes, only the components wrapped by the
context's consumer will re-render.

In the following image any component logged before the red line, are the
components that are initially rendered. But any component logged after the red
line are rendered after the value of the context is updated. `Component` is not
wrapped by a consumer. `ConnectedComponent` is.

Only `ExampleContextProvider` and `ConnectedComponent` show up after the red
line, the `App` component and all the children that are not connected are NOT
being rendered any time the context's value changes.

![ContextProvider Image]

[Improper Use Code]: ./improper-use
[Proper Use Code]: ./proper-use
[AppWithContext Image]: ./improper-AppWithContext.png
[ContextProvider Image]: ./proper-ContextProvider.png