import React, { PureComponent } from 'react'
import style from '../assets/style/userSend.module.scss'
import socket from '../websocket.js'

//用户扫码之后会跳转至这里，进行发送弹幕
export class userSend extends PureComponent {
	constructor(){
		super();
		this.state = {
			hotText:['哔哩哔哩干杯！','2333','AWSL','泪目','名场面','妙啊','逮虾户','我可以','欢迎回家','注入灵魂','正片开始'],
			inputText:'',
			date:new Date().getTime()	//放入全局
		};
		

	}
	//发送事件
	send=()=>{
		if(this.state.inputText !=''){
			socket.emit('sendDanmu',{data:this.state.inputText})
		}
		
	}	
	//节流
	jieliu = (e)=>{
		var that = this;
		return function(){
			var dateNow = new Date().getTime();
			if(dateNow - that.state.date>1000){
				that.send.apply(that);
				that.setState({
					date :dateNow
				})
			}
		}
	}
	//回车发送节流
	jieliuKey = (e)=>{
		if(e.keyCode === 13){
			this.jieliu()()
		}
	}
	//隔行背景颜色
	bgColor(index){
		if(index%2===0){
			//动态设置css module的className:
			//先用字符串模板相当于执行，得到对应的className字符串,然后返回出去
			return `${style.bgColor_li_red}`;
		}else{
			return `${style.bgColor_li_blue}`
		}
	}
	//点击事件
	cickhotText = (data)=>{
		this.setState({
			inputText:data
		})
	}
	
	inputChange = (event)=>{
		this.setState({
			inputText:event.target.value
		})
	}
	//离开时，关闭close链接
	componentWillUnmount(){
		socket.disconnect()
	}
	render() {
		// console.log('change')
		//循环JSX
		const listItems = this.state.hotText.map((item,index) =>
		  <li key={index} className={this.bgColor(index)} onClick={(e)=>this.cickhotText(item)} >{item}</li>//然后再这变引用的就是对应的字符串了
		);
		return (
			<div className={style.wrapper_div}>{/* jsx 这里写注释 */} 
				<div className={style.send_div}>
					<input type="text" value={this.state.inputText} onChange={this.inputChange} onKeyUp ={this.jieliuKey}></input>
					<button onClick={this.jieliu()}>点击发送</button>
				</div>
				<div className="hotText"></div>
				<ul className={style.hotText_ul}>{listItems}</ul>
			</div>
		)
	}
}

export default userSend
