import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Request from './components/Request';


function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data.message)
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <Request/>
      </header>
    </div>
  );
}

export default App;
