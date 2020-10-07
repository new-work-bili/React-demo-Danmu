import React from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Home from './pages/Home.js'
import enter_and_room from './pages/enter_and_room.js'	////扫描的二维码；发的弹幕都在这里显示
import userSend from './pages/userSend.js'		//用户扫码之后会跳转至这里，进行发送弹幕
import NotFound from './pages/NotFound.js'		//用户扫码之后会跳转至这里，进行发送弹幕

function App() {
  return (
    <div className="App">
		<Switch>
			 <Route path="/" exact component={Home}></Route> 
			<Route path='/enter_and_room' exact  component={enter_and_room} />
			<Route path='/userSend' exact  component={userSend} />
			{/* <Route path='*' exact  component={NotFound} /> */}
		</Switch>
    </div>
  );
}

export default App;
