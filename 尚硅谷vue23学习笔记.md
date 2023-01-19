Object.defineProperty()


数据劫持
数据代理
计算属性



let person={
	name:'张三',
	sex:'男'
}
Object.defineProperty(person,'age',{
	enumerable:true,//是否可枚举
	writable:true,  //是否可被修改
	configurable:true, //是否可被删除
	get:function(){}
	set:function(){}
})

数据代理：通过一个对象代理对另一个对象中的属性的操作

let obj={x:100}
let obj2={y:200}


Object.defineProperty(obj2,'x',{
	get(){
		return obj.x
	}
	set(value){
		obj.x=value
	}
})



1.Vue 中的数据代理

通过 vm 对象来代理 data 对象中属性的操作(读/写)

2.Vue 中数据代理的好处

更加方便的操作 data 中的数据

3.基本原理

通过 Object.defineProperty() 把 data 对象中所有属性添加到 vm 上。
为每一个添加到 vm 上的属性，都指定一个 getter/setter
在 getter/setter 内部去操作 (读/写) data 中对应的属性



键盘事件


@keyup

@keyup.enter

e.keycode

监听属性





<script>
	Vue.config.productionTip=false
	
	const vm=new Vue({
		el:'#root',
		data:{
			isHot:true,
		},
		computed:{},
		method:{},
		watch:{
			immediate:true, //初始化时，让 handler 调用一下
			isHot:{
				handler(newValue,oldValue){
					console.log('isHot 被修改了')
				}
			}
		},
	})
</script>


vm.$watch('isHot',{
	immediate:true, //初始化时，让 handler 调用一下
	isHot:{
		handler(newValue,oldValue){
			console.log('isHot 被修改了')
		}
	}
})



监视属性 watch:

1.当被监视属性变化时，回调函数自动调用，进行相关操作

2.监视属性必须存在，才能进行监视

3.监视的两种写法：

（1）new Value 时传入 watch 配置
（2）通过 vm.$watch 监视



深度监听





<script>
	Vue.config.productionTip=false
	
	const vm=new Vue({
		el:'#root',
		data:{
			isHot:true,
			number:{
				a:1,
				b:2
			}
		},
		computed:{},
		method:{},
		watch:{
			immediate:true, //初始化时，让 handler 调用一下
			isHot:{
				handler(newValue,oldValue){
					console.log('isHot 被修改了')
				}
			}
			'number.a':{
				deep:true,//深度监听
				handler(){
					console.log('a变了')
				}
			}
		},
	})
</script>


深度监听：
（1）Vue 中的 watch 默认不检测对象内部值的改变（一层）
（2）配置 deep:true 可以检测对象内部值的改变(多层)

备注：
（1）Vue 自生可以监听对象内部值的改变，但 Vue 提供的 watch 默认不可以
（2）使用 watch 时根据数据的具体结构，决定是否采用深度监听





谈谈你对vue 的理解

1.它是渐进式的 js 框架
2.核心库+插件
3.动态创建用户界面

vue 的几个特点

1.它是 mvvm 模式
2.它代码简洁，体积小，能够提高运行效率
3.适合pc+移动开发
4.它本身只关注 ui 和 和 react 比较相似
5.它可以轻松的引入vue 插件及其他的第三方库进行开发


vue 借鉴了 angular 的模板和数据绑定技术
然后又借鉴了 react 的组件化 和 虚拟 dom 技术


数据绑定
虚拟dom 



什么是 mvvm

mvvm 全称是 model view  ViewModel

model 就是数据层
view 是试图层
viewmodel 它是连接 mode -  view 的桥梁

当数据发生改变更新的时候，它会通过 viewmodel 通知视图层的展示改变

同时如果视图层发生改变，也会通过 viewmodel 通知model 层改变数据



vue 是如何实现响应式数据的呢？

响应式数据原理



instance/state.js



initData  112

Observer/index.js

new Observer  124
this.walk(value)

defineReactive  134   循环对象属性定义响应式变化

Object.defineProperty  1345


引起js 数组变化的几个方法

pop
push
shift
unshift
splice 
sort
reverse

函数劫持的方法
 
 
改变了数组的原型链的方法


vue 的事件绑定原理

1.原生的 dom 事件的绑定  addEvenListener 实现
2.组件事件的绑定 $on  

createEml
invokeCreateHooks
updateDOMListener 的方法  add 方法

v-model 的实现原理  如何自定义 v-model


value+ input 方法的语法糖


为什么 vue 是异步渲染


vue 是组件级更新的，如果不采用异步更新  每次更新都会对当前的组件进行一次重新渲染

为了性能的提高，会在本轮数据更新后在异步更新视图的

他的一个核心思想就是  nextTick

异步+事件循环

nextTick 就是一个异步渲染方法，他利用的就是宏任务和微任务
来构建的一个异步方法
多次调用 nextTick 是会存入 一个队列，每次他都会通过这个异步的方法
来清空这个队列，然后达到异步更新的效果





















