<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>地图管理</el-breadcrumb-item>
			<el-breadcrumb-item>四维地图</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
        <div id="map">
            <div class="menu">

              <ul @click="drawDot()">打点</ul>
            </div>
        </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
#map{
  height: 800px;
  position: relative;
  .menu{
    position: absolute;
    right:0;
    top:0px;
    z-index: 9999;
    margin-right: 30px;
    margin-top:20px;
    ul{
      cursor: pointer;
      display: inline-block;
      border:2px solid blue;     
      padding-left: 0;
      margin-left: 0; 
      text-align: center;
      padding:5px 10px;
      font-weight: bold;
    }
  }
}
</style>

<script>
import $ from 'jquery'
import dotImg from '../../assets/imgs/p1.png'
export default {
  name:'Map',
  data(){
    return{
      center:[103.8583326,36.0503971],
      device:[
        {
          lng:103.841734,lat:36.0538395
        },
        {
          lng:103.8430607,lat:36.0488062
        },
        {
          lng:103.8409175,lat:36.052148
        },
        {
          lng:103.8397949,lat:36.0485999
        },
        {
          lng:103.836376,lat:36.0521893
        },
        {
          lng:103.834641,lat:36.0504978
        },
        {
          lng:103.8331102,lat:36.0481461
        },
        {
          lng:103.8460204,lat:36.0551596
        }
      ],
      map:null,
      markers:[],
      dotImg:dotImg,
      point:null
    }
  },

  mounted(){
    this.InitMap()
    this.makeTag()
  },
  methods:{
    InitMap(){      
      this.map = new minemap.Map({
          container: 'map',
          style: 'https://mineservice.minedata.cn/service/solu/style/id/12877', /*底图样式*/
          center: this.center, /*地图中心点*/
          zoom: 10, /*地图默认缩放等级*/
          pitch: 0, /*地图俯仰角度*/
          maxZoom: 17, /*地图最大缩放等级*/
          minZoom: 3,  /*地图最小缩放等级*/
          projection: 'MERCATOR',
          logoControl: false
      });
    },
    makeTag(){
        
    },
    drawRect(){},
    drawCircle(){},
    drawDot(){
      let lnglat=[103.8460204,36.0551596];
      if (map) {
          var el = document.createElement('div');
          el.id = 'marker';
          el.style["background-image"] = "url("+this.dotImg+")";
          el.style["background-size"] = "cover";
          el.style.width = "50px";
          el.style.height = "50px";
          el.style["border-radius"] = "50%";
          // Marker构造函数接收两个参数，一个为自定义的DOM元素，一个是Object参数，其中包括偏移量等
          // offset参数为标注点相对于其左上角偏移像素大小
          // 调用setLngLat方法指定Marker的坐标位置
          var _marker = new minemap.Marker(el, {offset: [-25, -50]}).setLngLat(lnglat).addTo(this.map);
          this.markers.push(_marker);
      }
    },
    clear() {
        if (this.map && this.markers.length !== 0) {
          for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].remove();
          }
        }
    }
  }
}
</script>

