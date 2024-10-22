import React from 'react';
import Hello from './Hello';
import './App.css';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24,
    padding: '1rem',
  };

  return (
    <>
      <Hello name='react'color ='red' />
      <Hello color ='pink' />
    </>
  );
}

export default App;
