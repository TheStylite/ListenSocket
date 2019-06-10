## 引言



该目录下的三个文件各有自己的用处，

+ index.js是目录的主入口，
+ Listener.js是利用发布订阅模式封装的一个监听器，主要作用是订阅socket的数据,在系统内直接import defalut 导入到项目文件中
+ socket.js是封装的原生web socket，利用的是单例模式 + 发布订阅者模式 + 链式设计模式，导入方式见上。

上述三个文件抽离成每一个模块，主要是为了降低耦合，实现单一职责，一个模块只做自己的事，也便于维护





该目录下的index将在main入口里引入，打开全局的websocket，并利用socket去发布数据供监听器下的订阅者接收，

~~~javascript
socket.on('message',(e) => {

  Listener.deliver(JSON.parse(e.data));     //发布数据
    
})
~~~

这样在整个box系统中，将只会使用监听器来接收socket所发布的数据，只操作Listener而不是操作socket.js







## Socket.js



### API

#### connect()

连接websocket，，具体url可以在源码里更改，这里就暂时不抽离了，

~~~javascript
this._socket = new WebSocket("ws://192.168.1.105:8765" + namespace);
~~~





#### close()

关闭websocket





#### on

监听socket的事件

+ socket.on('open',callback(e))		打开事件。callback(e)为socket的原生事件				
+ socket.on('message'，callback(e))。               接收到服务器推送数据事件
+ socket.on('error'，callback(e))                       出现错误事件                
+ socket.on('close'，callback(e))                      当socket关闭事件



目前开发暂时只封装了这些，后面会根据需求继续封装其他事件









## listener.js



### API

#### deliver()

参数		anything



该方法是发布数据，





#### on()

参数  （eventName,callback）

参数eventName是订阅监听器的事件名，callback为回调函数，callback（data）来获取监听器发布的数据

该方法是在系统里来订阅监听器，并接收监听器发布的数据



#### un()

参数(eventName)

注销监听器内订阅过的事件。写这个方法是为了避免在系统内开发时，开发者在订阅数据时操作数据由于路由跳转，组件销毁，导致的错误的引用指向，所以建议在组件销毁时使用该方法将事件注销；









































