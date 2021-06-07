const io = require('socket.io-client')
if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
	var url = 'http://localhost:3001'
	
	// var socket = require('socket.io-client')('http://localhost:3001');	//需要这样才能正常链接
}else{
	// var url = 'http://123.57.209.85:8080'
	
	// var socket = require('socket.io-client')('http://123.57.209.85:8080');	//需要这样才能正常链接
	// 新服务器
	var url = 'http://47.95.210.21:8080'
	// var socket = require('socket.io-client')('http://47.95.210.21:8080');	//需要这样才能正常链接
}
const options = {//选项
}
const socket = io(url)

//链接成功触发
socket.on('connect',()=>{
	console.log('链接')
})

//尝试重连时触发事件处理器
socket.on('reconnect_attempt', (attempt) => {
  console.log('尝试重连时触发事件处理器reconnect_attempt',attempt)
  if(attempt>3){
	  console.log('关闭')
	  socket.disconnect()
	  //提示
	  alert('网络链接错误，请刷新或者稍后重试!')
  }
});

socket.on('reconnect_error', (error) => {
  console.log('重连错误时触发事件处理器',error)
});


export default socket