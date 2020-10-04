import React, { PureComponent } from 'react'
import '../assets/style/Home.scss'
import {Link} from 'react-router-dom'

export class Home extends PureComponent {
	render() {
		return (
			<div>
				<h1 className="test_p">主页测试</h1>
				<Link to="/enter_and_room">跳转至:公屏</Link><br />
				<Link to="/userSend">跳转至:弹幕输入页面</Link>
			</div>
		)
	}
}

export default Home
