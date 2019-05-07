import React from 'react';
import logo from './logo.svg';
import './App.css';
import Persons from './components/Persons';
import PersonsSubscription from './components/PersonsSubscription';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Persons/>
        <PersonsSubscription/>
      </header>
    </div>
  );
}

export default App;
