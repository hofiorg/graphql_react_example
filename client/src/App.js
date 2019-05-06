import React from 'react';
import logo from './logo.svg';
import './App.css';
import Persons from './components/Persons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Persons/>
      </header>
    </div>
  );
}

export default App;
