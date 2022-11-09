import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import Request from './components/Request';
import Login from './components/Login';


function App() {
  const [data, setData] = useState(null)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Login/> */}
        <Request/>
      </header>
    </div>
  );
}

export default App;
