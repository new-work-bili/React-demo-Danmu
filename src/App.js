import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch,Router,Route,Link} from 'react-router-dom'
import Home from './pages/Home.js'

function App() {
  return (
    <div className="App">
		<Switch>
			<Route path="/" exact component={Home}></Route>
		</Switch>
    </div>
  );
}

export default App;
