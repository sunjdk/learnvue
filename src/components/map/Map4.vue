<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>地图管理</el-breadcrumb-item>
			<el-breadcrumb-item>四维地图</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
        <div id="map">
            <!-- <div class="menu">
              <ul @click="drawRect()">框选</ul>
              <ul @click="drawCircle()">圈选</ul>
              <ul @click="clear()">清除</ul>
              <ul @click="drawDot()">打点</ul>
            </div> -->
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

import dotImg from '../../assets/imgs/p1.png'
export default {
  name:'Map',
  data(){
    return{
      map:null,
      route:[]
    }
  },

  mounted(){
    this.InitMap()
    this.map.on('load',this.makeTag)
    this.map.repaint = true;
  },
  methods:{
    InitMap(){      
        this.map = new minemap.Map({
            container: document.getElementById("map"),
            style: 'https://mineservice.minedata.cn/service/solu/style/id/12877',
            center: [103.8414315,36.0489343],
            zoom: 15,
            pitch: 0,
            maxZoom: 15,
            minZoom: 3,
            projection: 'MERCATOR'
        });
    },
    makeTag(){
      this.addSources()
      this.addLayers()
    },
    addSources() {
        var center = this.map.getCenter();
        //this.route = [[center.lng, center.lat], [center.lng, center.lat + 0.008], [center.lng - 0.008, center.lat + 0.008], [center.lng - 0.008, center.lat], [center.lng, center.lat]];
        this.route=[
            [103.8389284,36.0537506],
            [103.8453907,36.0525397],
            [103.8453352,36.0519343],
            [103.8453352,36.0519343],
            [103.8451411,36.0426729],
            [103.8356002,36.0439512],
            [103.8320779,36.0450052],
            [103.8383737,36.053033],
            [103.8389284,36.0537506]
        ]
        this.map.addSource('lineSource', {
            type: 'geojson',
            data: {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": this.route
                }
            }
        });


        var jsonData = minemap.Template.util.pointArrayToSymtrackingGeoJson(this.route, false);

        this.map.addSource('symtrackingSource', {
            type: 'geojson',
            data: jsonData
        });
    }
    ,
    addLayers() {
        this.map.addLayer({
            "type": "line",
            "source": 'lineSource',
            "id": 'lineLayer',
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-width": 3,
                "line-color": "#00ff00"
            }
        });

        this.map.addLayer({
            "type": "symtracking",
            "source": 'symtrackingSource',
            "id": 'symtrackingLayer',
            "layout": {
                "icon-image": "n-vehicle",
                "icon-allow-overlap": false,
                "icon-ignore-placement": true,
                "symbol-avoid-edges": false,
                "symbol-placement": "line",
                "symtracking-fps": 37,            //行动快慢，现在是1秒37帧
                "symtracking-time-segment": 10,   //总共要运行多少秒
                "compatible-mode": false          //notice  采用新的数据样式，保证小车不消失
            },
            "paint": {
                "icon-color": "#ff0000",
                "symtracking-delay": 0            //notice 小车更新延迟为零，保证小车能够循环播放，小车循环播放的条件是：此项为零 并且 symtracking-fps * symtracking-time-segment ≈ myGeojson.features.length
            }
        });
    }
  }
  
}
</script>

