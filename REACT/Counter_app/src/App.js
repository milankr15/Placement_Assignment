import { useState } from 'react';
import './App.css';

function App() {

  const [value, setValue] = useState(0);

  function increase(){
    setValue(value+1);
  }

  function decrease(){
    setValue(value-1);
  }
  return (
    <div className="App">
      <div>
        <span className='button' onClick={decrease}>-</span>
        <span className='value'>{value}</span>
        <span className='button' onClick={increase}>+</span>
      </div>
    </div>
  );
}

export default App;
