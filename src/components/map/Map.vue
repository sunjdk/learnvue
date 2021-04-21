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
      map:null
    }
  },

  mounted(){
    this.InitMap()
    this.map.on('load',this.makeTag)
  },
  methods:{
    InitMap(){      
        this.map = new minemap.Map({
            container: document.getElementById("map"),
            style: 'https://mineservice.minedata.cn/service/solu/style/id/12877',
            center: [103.8407609,36.0524353],
            zoom: 13,
            pitch: 0,
            maxZoom: 17,
            minZoom: 3,
            projection: 'MERCATOR'
        });
    },
    makeTag(){
      console.log(121313)
      this.addSources()
      this.addLayers()
    },
    addSources() {
        var center = this.map.getCenter();
        var jsonData = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [center.lng + 0.03, center.lat + 0.02]
                    },
                    "properties": {
                        "title": "大学",
                        "kind": "school"
                    },
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [center.lng + 0.01, center.lat - 0.01]
                    },
                    "properties": {
                        "title": "公园",
                        "kind": "park"
                    },
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [center.lng - 0.03, center.lat - 0.02]
                    },
                    "properties": {
                        "title": "医院",
                        "kind": "hospital"
                    }
                }
            ]
        };
        this.map.addSource("pointSource", {
            "type": "geojson",
            "data": jsonData
        });
    }
    ,
    addLayers() {
        this.map.addLayer({
            "id": "circleLayer",
            "type": "circle",
            "source": "pointSource",
            "layout": {
                "visibility": "visible",
            },
            "paint": {
                "circle-radius": 10,
                "circle-color": {
                    "type": "categorical",
                    "property": "kind",
                    "stops": [["school", "#ff0000"], ["park", "#00ff00"], ["hospital", "#0000ff"]],
                    "default": "#ff0000"
                },
                "circle-opacity": 0.8
            },
            "minzoom": 7,
            "maxzoom": 17.5
        });
    }
  }
  
}
</script>

