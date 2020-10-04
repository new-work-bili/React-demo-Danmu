import React, { Component } from 'react'
import '../assets/style/entrance_room.scss'
import image  from '../assets/二维码.png'
import socket from '../websocket.js'

//扫描的二维码；发的弹幕都在这里显示
export class Danmu_entrance_room extends Component {
	constructor(){
		super();
		this.state={
			// DanmuArr:[{data:'test',h:10}],
			DanmuArr:[],
			wrapper_height:0
		};
		this.Dom_wrapper = React.createRef();//dom
		
	}
	//socket接受数据
	componentDidMount(){
		socket.on('showDanmu',(data)=>{
			console.log(data)
			this.showDanmu(data.data)
		})
		//获取dom高度
		this.state.wrapper_height = this.Dom_wrapper.current.clientHeight;
	}
	//弹幕发送
	showDanmu(data){
		//随机高度
		let h = Math.random() * this.state.wrapper_height/2
		let obj={h,data}	
		let DanmuArr = this.state.DanmuArr
		DanmuArr.push(obj)
		this.setState({
			DanmuArr
		})
		
		//要点：判断,把完成的弹幕移出
		let that = this
		let childArr = that.Dom_wrapper.current.childNodes;
		for(var value of that.Dom_wrapper.current.childNodes){
			value.addEventListener('animationend',function(e){	
				console.log('移出:',value,e.target)
				//current：是否还有子元素
				if(that.Dom_wrapper.current.contains(e.target)){
					//坑点：注意动画完成要要移出的是e，他才是动画结束的元素，而不是绑定事件的value；
					//如果是value，在这种每次触发且循环遍历绑定的情况下，会出现一下子移出一大堆dom的情况
					that.Dom_wrapper.current.removeChild(e.target)	
				}
				
			})
		}
	}
	
	
	
	
	//关闭close链接
	componentWillUnmount(){
		socket.disconnect()
	}
	//每次更新数组要更新
	shouldComponentUpdate(){
			return true
	}
	render() {
		const DammuDom = this.state.DanmuArr.map((item,index)=>{
			
			var animationTime = 5;//越长，越快，时间越短;一个字是24px
			var vw = document.documentElement.clientWidth || document.body.clientWidth;
			console.log('item.data.length:',item.data.length,vw)
			var h = item.h
			var styleObj = {
				top:`${h}px`,
			}
			
			return <p className="Danmu_span" key={index} style={styleObj}>{item.data}</p>
		})
		const tips = '<--扫码发送弹幕'
		return (
			<div>
				<div className="wrapper" ref={this.Dom_wrapper}>
					{DammuDom}
				</div>
				<div className="QR">
					<p className="tips">{tips}</p>
					<img className="image" src={image}/>
				</div>
			</div>
		)
	}
}

export default Danmu_entrance_room
