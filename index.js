
//这里作为socket启动的主入口，是为了低耦合

import socket  from  './socket'
import Listener from './listener';        //导入监听器
import app from '../../main';


socket.connect();     //开启websocket
socket.on('message',(e) => {

  Listener.deliver(JSON.parse(e.data));     //发布数据
      //这里要判断下用户验证是否成功
  try {         //这里还要判断下当前页面是否在主系统，如果不在，就要捕获错误
    if(e.data.code == 2){   //失败
        app.$router.push('/');      //返回重新登录
        socket.close();
      }
  } catch (e) {
    socket.close();
  }

})
socket.on('close',(e) => {
  console.log('关闭了scocket',e.code);
})
