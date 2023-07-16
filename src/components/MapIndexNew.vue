<template>
	<div class="content">
		<!-- 用来显示地图 -->
        <!-- 可以不写宽度，但一定要有高度 -->
		<el-amap
            vid="amapDemo"
            :center="mapInfo.lnglat"
            :zoom="zoom"
            style="height: 100%; width: 100%;"
			class="amap-box">
			<el-amap-marker ref="marker" vid="component-marker" :position="mapInfo.lnglat"></el-amap-marker>
		</el-amap>
	</div>
</template>
 
 <script>
//引入高德地图
 export default {
	name: 'MapIndex',
	data() {
			return {
                mapInfo: {
					lng: 116.397451,
					lat: 39.909187,
					lnglat: [116.397451, 39.909187]
				},
				zoom: 12,
				events: {
					click: (e) => {
						this.mapInfo.lng = e.lnglat.lng;
						this.mapInfo.lat = e.lnglat.lat;
						this.mapInfo.lnglat = [e.lnglat.lng, e.lnglat.lat];
						this.getFormattedAddress();
					}
				}
			}
		},
		mounted() {
		},
		methods: {
		}
 }
 </script>
 
 <style>
 
 </style>