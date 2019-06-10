

                        //单例模式 + 发布订阅者模式 + 链式设计模式 封装socket，

const IO = {

  _socket:null,
  eventFn:[],
  heartflag:null,
  connect(){      //连接websocket
      let namespace = '/ws?token=' + localToken();
      if(this._socket){
        this._socket.close();
        this._socket = null;
      }
      this._socket = new WebSocket("ws://" + location.host + namespace);
      this._socket.onopen = (e) => {        //绑定监听原生socket事件
        this.eventFn.forEach(event => {
          event.name == 'open' &&  event.fn(e)
        })
        this.heartCheck();            //发送持续连接心跳
      }
      this._socket.onmessage = (e) => {
        this.eventFn.forEach(event => {
          event.name == 'message' &&  event.fn(e)
        })
      }
      this._socket.onerror = (e) => {
        this.eventFn.forEach(event => {
          event.name == 'error' &&  event.fn(e)
        })
      }
      this._socket.onclose = (e) => {
        this.eventFn.forEach(event => {
          event.name == 'close' &&  event.fn(e)
        })
        this.close();
      }

      return this;
  },
  on(fnName,callback){      //注册事件并监听回调
      let flag = this.eventFn.some(item => item.name == fnName);
      if(flag){
        this.eventFn.forEach(item => {
          if(item.name == fnName){
            item.fn = callback;
          }
        })
        return this;
      }
      this.eventFn.push({
        name:fnName,
        fn:callback
      })
      return this;
  },
  close(){
    this._socket.close();
    this._socket = null;
    clearInterval(this.heartflag);
    this.heartflag = null;
    // this.eventFn = [];
    return this;
  },
  heartCheck(){     //这里是心跳检测socket断线重连的，不过现在只需要每隔30秒发送一次数据给后端就可以了，socket就不会断开
    if(this._socket){
      this.heartflag = setInterval(() => {
        this._socket.send(1);
        console.log('这里发送了socket心跳');
      },30000)
    };

  }

}












// socket.open();                 //这里注释掉的是第三方包socket.io-client的方法，不用管
//
// socket.on('connect',() => {
//   console.log('打开websocket');
// })
// socket.on('connect_error', (error) => {         //这里是处理连接错误时的关闭socket连接的事件
//   console.log('连接异常,关闭socket');
//   socket.close();
// });
//
// socket.on('notice', function(msg) {
//     console.log('我收到信息socket了',msg);
//     Listener.deliver(msg);                       //发布数据
// });




export default IO;
