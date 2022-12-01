import logo from './logo.svg';
import './App.css';
import ChatSesh from './components/ChatShesh'
import {useState, useEffect} from 'react'

function App() {
  return (
    <div 
      className="App"
      >
      <ChatSesh/>
    </div>
  );
}

export default App;
