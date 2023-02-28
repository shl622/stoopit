import logo from './logo.svg';
import './App.css';

import { useEffect } from 'react'
import { themeChange } from 'theme-change'

const App = () => {

  // for use with themechange plugin – recommended by daisyui if we are using themes.
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-5xl font-bold underline">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
