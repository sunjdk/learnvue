/**
*	观察者模式
* 他分为2个角色
* 1.观察者,2.被观察者
* 观察者模式的目的对程序的内在变化进行观察,当其有变化的时候
* 你可以得知,并且可以做出相应的反应
*/
/**
* 需求
* 模拟订阅这 和报社之间的关系
* 实际的操作分为(推模式,拿模式)
* 推送-->长连接技术
* 那模式-->定时去后台去取得
*/
function BusinessOne(name){
	this.name = name;
	//订阅者的集合
	this.subscribers = new Array();
}
//订阅者的发送消息的方法(推模式)
BusinessOne.prototype.delive = function(news){
	var self = this;
	//给每一个订阅者发送消息
	this.subscribers.forEach(
		function(fn){
			//调用接受者处理信息的函数
			fn(news,self);
		}
	)
}
//扩展公共订阅的函数,和取消订阅的函数
Function.prototype.subscribe = function(publisher){
	var that = this;
	//some 访问数组度i型并且以参数的形式传回回调函数中
	//只要至少有一次返回是true那么some就是true
	var alreadyExists = publisher.subscribers.some(
		function(el){
			//处理不能重复订阅的功能
			if(el == that){
				return;
			}
		}
	);
	//没用订阅你就可以订阅
	if(!alreadyExists){
		publisher.subscribers.push(that);
	}
	return this;
}
//取消
Function.prototype.unsubscribe = function(publisher){
	var that = this;
	publisher.subscribers = publisher.subscribers.filter(
		function(el){
			if(el !== that){
				return el;
			}
		}
	);
	return this;
};
//创建发布者的实例
var b1 = new BusinessOne("CCTV");
var b2 = new BusinessOne("中国国防部报社");
//发布
//门面模式
function addEventFacade(el,type,fn){
	if(window.addEventListener){
		//firefox
		el.addEventListener(type,fn,false);
	}else if(window.attachEvent){
		//使用是IE
		el.attachEvent('on'+type,fn);
	}else{
		el["on"+type] = fn;
	}
}
//住应用函数
var init = function(){
	//创建观察者
	var pageOne = function(news){
		document.getElementById("info").value = 
			"我发现了: "+
			"["+arguments[1].name+"] 发来的信息-->"+news
	}
	//订阅
	pageOne.subscribe(b1).subscribe(b2);
	addEventFacade(document.getElementById("cctv"),"click",
	function(){
		b1.delive(document.getElementById("cctvText").value);
	})
	
	addEventFacade(document.getElementById("gfb"),"click",
	function(){
		b2.delive(document.getElementById("gfbText").value);
	})	
}














