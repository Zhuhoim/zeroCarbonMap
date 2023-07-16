<template>
	<div class="content">
		<!-- 用来显示地图 -->
        <!-- 可以不写宽度，但一定要有高度 -->
		<div id="Map" style="height: 100%; width: 100%;">
		</div>
	</div>
</template>
 
 <script>
//引入高德地图
import AMapLoader from '@amap/amap-jsapi-loader';
 export default {
	name: 'MapIndex',
	data() {
			return {
                map: null, //地图实例
				lnglats: [
					[113.14,23.08],
					[121.29,31.14],
					[116.24,39.55],
					[114.07,22.33]
				],
			}
		},
		mounted() {
			this.initMap()
		},
		methods: {
			initMap() {
				AMapLoader.load({
					key: "126dae27d56194730b130d55e5df9e8f",
					version: "1.4.0",
					resizeEnable: true,
					plugins: [
						"AMap.ToolBar", //工具条
						"AMap.Scale", // 比例尺
						"AMap.Geolocation", //定位
					],
				}).then((AMap) => {
					this.map = new AMap.Map("Map", { //设置地图容器id
						viewMode: "3D", //是否为3D地图模式
						zoom: 4.5, //初始化地图级别
						center: [108, 34], //初始化地图中心点位置
					});
					var leaf_icon = new AMap.Icon({
						imageSize: new AMap.Size(15,15),
						image: require(`@/assets/slices/icon_leaf.png`),
					});
					for (var i = 0; i < this.lnglats.length; i++) {
						var marker = new AMap.Marker({
							position: this.lnglats[i],//不同标记点的经纬度
							map: this.map,
							icon: leaf_icon,
						});
						marker.content = '我是第' + (i + 1) + '个Marker';
						// marker.on('click', markerClick);
						// marker.emit('click', {target: marker});//默认初始化不出现信息窗体,打开初始化就出现信息窗体
					}
					console.log(this.map);
				}).catch(e => {
					console.log(e);
				})
			}
		}
 }
 </script>
 
 <style>
 
 </style>