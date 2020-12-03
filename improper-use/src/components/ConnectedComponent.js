import { useContext } from 'react';
import ExampleContext from '../context/ExampleContext';

function ConnectedComponent() {
  const { increment, num } = useContext(ExampleContext);
  console.log('Connected Component is rendering');
  return (
    <>
      <h1>ConnectedComponent</h1>
      <button onClick={() => increment()}>
        {num}
      </button>
    </>
  );
}

export default ConnectedComponent