<template>
    <div class="fixBg">
        <div class="box">
            <button class="simple-btn" @click="closeGetPoint">×</button>
            <div id="Map" style="height: 100%; width: 100%;"></div>
            <div class="locationSelected"
            v-show="addr!=''">所选地点：{{addr}}</div>
            <el-button type="primary" class="confirm" @click="submitAddr">确定</el-button>
        </div>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
    name: 'MapGetPoint',
    data() {
        return {
            AMap: null,
            map: null, //地图实例
            location: '',
            address: null,
            searchKey: '',
            geocoder: null,
            addr: '',
            marker: null,
        }
    },
    props: ['closeGetPoint', 'setDetlAddr', 'cityCoord'],
    mounted() {
        this.initMap();
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
                    "AMap.Geocoder", //编码
                ],
            }).then((AMap) => {
                this.AMap = AMap;
                this.map = new AMap.Map("Map", { //设置地图容器id
                    viewMode: "3D", //是否为3D地图模式
                    zoom: 13 , //初始化地图级别
                    center: this.cityCoord, //初始化地图中心点位置
                    defaultCursor: 'default',
                });
                this.geocoder = new AMap.Geocoder({
                    radius: 200,
                    extensions: 'all'
                })
                this.map.on('click', this.clickMapHandler);
            }).catch(e => {
                console.log(e);
            })
        },

        // 点击地图选点
        clickMapHandler(e) {
            let self = this;
            // 获取经纬度
            var lng = e.lnglat.getLng();
            var lat = e.lnglat.getLat();
            // 赋值location
            this.location = lng + ',' + lat;
            // 创建标记
            if (this.marker) this.map.remove(this.marker);
            this.marker = new this.AMap.Marker({
                position: [lng, lat],
            });
            console.log(this.location);
            this.map.add(this.marker);
            // 在地图上显示地址信息
            this.geocoder.getAddress([lng, lat], function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.regeocode) {
                        self.addr = result.regeocode.formattedAddress;
                    }
                }
            })
        },

        // 提交选点信息
        submitAddr() {
            this.setDetlAddr(this.addr, this.location);
            this.closeGetPoint();
        }
    }
}
</script>

<style scoped>
.fixBg {
    position: fixed;
    width: 100%;
    height: calc(100% - 100px);
    top: 0;
    left: 0;
    text-align: center;
    background-color: rgba(255, 255, 255, 0);
    z-index: 1;
}
.box {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 400px;
    max-height: 450px;
    border-radius: 15px;
    border: 1px solid rgb(222, 222, 222);
    box-shadow: 10px 20px 40px rgba(102, 102, 102, 0.7);
    overflow: hidden;
    background-color: #fff;
}
.simple-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
    font-size: 20px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: rgba(255, 255, 255, 0.6);
}
.simple-btn:hover {
    background-color: rgba(255, 255, 255);
}
.locationSelected {
    padding: 10px;
    font-size: 14px;
    width: calc(100% - 20px);
    z-index: 1;
    position: absolute;
    bottom: 50px;
    background-color: rgba(255, 255, 255, 0.8);
}
.confirm {
    z-index: 1;
    position: absolute;
    right: 5px;
    bottom: 5px;
    border-radius: 12px;
}
</style>