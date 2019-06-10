

//这里是利用发布订阅者模式发布数据来过滤socket返回的数据, 也是为了低耦合，一个单元只做自己的事

function Listener() {
  this.fndata = [];
}
Listener.prototype.deliver = function(newdata) {        //发布数据
  this.fndata.forEach(fns => {
    fns.fn(newdata);
  })
}
Listener.prototype.on = function(eventName,fn) {        //注册事件并监听

  let flag = this.fndata.filter(item => item.name == eventName);
  // !flag.length &&
  if(!flag.length){
    this.fndata.push({
      name:eventName,
      fn:fn
    });
    return;
  }
  this.fndata.forEach(item => {
      if(item.name == eventName){
        item.fn = fn;
      }
    })
}
Listener.prototype.un = function (eventName) {            //注销事件
  this.fndata.forEach((item,index) => {
    if(item.name == eventName){
      this.fndata.splice(index,1);
    }
  })
};

export  default new Listener();
