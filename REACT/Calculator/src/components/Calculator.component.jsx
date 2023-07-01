import React, { useState } from 'react';

const Calculator = () => {
  const [result, setResult] = useState(0);
  const [input, setInput] = useState('');

  const handleNumberClick = (number) => {
    setInput(input + number);
  };

  const handleOperatorClick = (operator) => {
    setInput(input + operator);
  };

  const handleEqualClick = () => {
    setResult(eval(input));
  };

  const handleClearClick = () => {
    setInput('');
    setResult(0);
  };

  return (
    <div className='calculator'>
      <input type="text" value={input} readOnly />
      <button onClick={handleNumberClick.bind(null, '7')}>7</button>
      <button onClick={handleNumberClick.bind(null, '8')}>8</button>
      <button onClick={handleNumberClick.bind(null, '9')}>9</button>
      <button onClick={handleOperatorClick.bind(null, '+')}>+</button>
      <button onClick={handleNumberClick.bind(null, '4')}>4</button>
      <button onClick={handleNumberClick.bind(null, '5')}>5</button>
      <button onClick={handleNumberClick.bind(null, '6')}>6</button>
      <button onClick={handleOperatorClick.bind(null, '-')}>-</button>
      <button onClick={handleNumberClick.bind(null, '1')}>1</button>
      <button onClick={handleNumberClick.bind(null, '2')}>2</button>
      <button onClick={handleNumberClick.bind(null, '3')}>3</button>
      <button onClick={handleOperatorClick.bind(null, '*')}>*</button>
      <button onClick={handleNumberClick.bind(null, '0')}>0</button>
      <button onClick={handleOperatorClick.bind(null, '/')}>/</button>
      <button onClick={handleEqualClick}>=</button>
      <button onClick={handleClearClick}>Clear</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default Calculator;
