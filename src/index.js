import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/style/reset.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'lib-flexible';//rem
import {BrowserRouter} from 'react-router-dom';//router-history

ReactDOM.render(
  <React.StrictMode>
	<BrowserRouter basename='/Danmu/'>{/* basename用来配合nginx配置二级目录 */}
		<App />
	</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
