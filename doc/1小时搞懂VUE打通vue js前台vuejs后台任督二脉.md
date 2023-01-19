# 1小时搞懂VUE,打通vue js前台vuejs后台任督二脉

前台电商

首页、搜索、商品列表、商品详情、添加购物车、结算、支付、我的订单、订单信息、登录、我的购物车、注册、个人中心

后台管理

权限管理、用户管理、角色管理、菜单管理、商品管理、分类管理、属性管理、品牌管理、spu管理、sku 管理
会员管理、订单管理、首页、登录

springboot
mybatis plus
springClound
swagger2
Elasticsearch
springsecurity
redis
mysql

vue 的模式:渐进式+MVVM
模板语法与响应式
插值语法
强制数据绑定与事件绑定指令
计算属性computed和侦听器watch
class 与 style 绑定操作
条件渲染与列表渲染
表单输入绑定：v-model指令
组件化：
组件定义，注册与使用
插槽：普通插槽，命名插槽，作用域插槽
组件间通信：props ,自定义事件，事件总线，插槽，pubsub,vuex
组件的生命周期钩子：11个生命周期，常用8个
特殊属性使用：key,ref,is 等
内置组件使用 <transition> <component> <keep-alive>等

自定义过滤器
自定义指令
自定义vue插件
自定义全局事件总线
自定义消息订阅与发布
自定义基于webpack的vue开发打包环境
vue 响应式数据与双向绑定原理源码分析 
vue 虚拟dom 与dom diff 算法原理分析
高级组件：动态组件，异步组件，递归组件，缓存组件
自定义高可复用组件：分页组件、轮播组件、图片放大镜等



vue 数据劫持，消息队列



vue 生态圈

vue-admin-template			vue-router

vue-cli4									vuex

webpack								element-ui

bable									vant

eslint									vue-lazyload

vue-dev-tools					vuex-persistedstate 		数据存储插件

vuelidate		数据验证插件



技术选型

webpack	vue-cli3 	eslint  4项目构建工程化

less 		5.css与编译器

lodash	store	uuidjs	6.其他

1.前台数据处理/交互/组件化	vue	vue-router	vuex	vue-lazyload	element-ui	swiper	moment

2.前后台交互	Ajax 请求  axios  async/await	mock 数据  mockjs	接口测试 	postman

3.模块化	es6 bable

前台路由

个人中心

/center

/pages/PersonCenter

子路由

我的订单

团购商品

/center/myorder

/pages/PersonCenter/MyOrder

/center/groupbuy

/pages/PersonCenter/GroupBuy

支付成功

/paysuccess

/pages/PaySuccess

支付

/pay

/pagesPay

登录

/login

pages/Login

注册

/register

pages/Register

首页

/

pages/Home

商品搜索页

/search

pages/Search

商品详情

/detail

pages/Detail

加入购物车成功页

/addcartsuccess

pages/AddCartSuccess

购物车

/shopcart

pages/ShopCart

订单交易

/trade

pages/Trade



后台项目的路由

登录

/login==>/views/login/index.vue

后台管理布局根路由

Layout

首页

/dashboard===>/views/dashboard/index.vue

权限管理

用户管理

/acl/user/list===>/views/acl/user/list.vue

角色管理

/acl/role/list===>/views/menu/role/list.vue

菜单管理

/acl/menu/list===>/views/menu/role/list.vue

分类管理

/category/list===>/views/category/index.vue

平台属性管理

/product/props===>/views/product/prop/list.vue

品牌管理

/product/trademark===>/views/product/trademark/list.vue

spu管理

/product/spu===>/views/product/trademark/list.vue

sku管理

/product/sku===>/views/product/sku/list.vue

会员管理

/user/list===>/views/user/index.vue

订单管理

order/list===>/views/order/index.vue

后台管理：路由与权限校验

router.beforEach

​																																  是重定向倒

​																							路由是否为/login 		否			获取用户角色

​																									是													|

​																																				动态生成路由

​																																						   |	

访问/xxx	-->cookie 获取 token      token 是否存在														replace模式访问路由--->访问路由/login?redirect=/xxx

​																									否						 是			访问路由 /xxx

​																							路由是否在白名单	  否			访问路由/login?redirect=xxx





计算属性的使用场景：通过搜索框搜索指定类型



data：{

​	searchName:'',

​	orderType:0,	//0 原本，1升序 2降序

​	persions:[

​		{name:'tom',age:18},

​		{name:'jack',age:16},

​		{name:'bob',age:19},

​		{name:'rose',age:17}

​	]

}

computed:{

​	filterPersons(){

​		//取出相关的数据

​		const {searchName,persons}=this

​		//最终要显示的数组

​		let fpersons;

​		//对persons 进行过滤

​		fPersons=persons.filter(p=>p.name.indexOf(searchName)  !==-1)

​		//排序

​		if(orderType!==0){

​			fPersons.sort(function(p1,p2){

​				//1.升序 2降序

​				if(orderType===2){

​						return p2.age-p1.age

​				}else{

​						return p1.age-p2.age

​				}

​			})

​		}

​		return fPersons

​	}

}









