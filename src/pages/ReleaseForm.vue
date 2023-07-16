<template>
    <div class="main">
        <top-bar :bigTitle="roles[$route.query.type] + '·发布'"/>
        <div class="form">

            <!-- 公司名 -->
            <div class="row" v-if="$route.query.type < 3">
                <div class="label">公司/个人</div>
                <el-input placeholder="请输入内容" class="inputBox" 
                v-model="firmOrPersonName"></el-input>
            </div>

            <!-- 发布意向：出售求购 -->
            <div class="row" v-if="$route.query.type == 3">
                <div class="label">发布意向</div>
                <div class="inputBox" style="padding: 10px 0">
                    <el-radio v-model="releasePurpose" label="出售">出售</el-radio>
                    <el-radio v-model="releasePurpose" label="求购">求购</el-radio>
                </div>
            </div>

            <!-- 项目类型 -->
            <div class="row" v-if="$route.query.type == 3">
                <div class="label">项目类型</div>
                <el-select v-model="projectType" placeholder="请选择"
                class="inputBox">
                    <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <!-- 城市 -->
            <div class="row" v-if="$route.query.type < 4">
                <div class="label" v-if="$route.query.type < 2">项目地区</div>
                <div class="label" v-if="$route.query.type == 2">所在地区</div>
                <div class="label" v-if="$route.query.type == 3">交易地区</div>
                <el-cascader
                    :options="cityOptions"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                    placeholder="请选择：省 / 市 / 区"
                    :title="cityText"
                    class="inputBox"
                    v-model="citySelected"
                    filterable
                    autocomplete="new-password" >
                </el-cascader>
                <div class="label"></div>
                <el-button class="inputBox fa fa-map-marker"
                style="margin-top:20px;"
                @click="getPointShow=true"> 选择详细地址</el-button>
                <div class="label"></div>
                <div class="inputBox" v-show="detailedAddress!=''" style="padding: 10px 0">
                    已选地址：{{detailedAddress}}
                </div>
            </div>

            <!-- 项目属性 -->
            <div class="row" v-if="$route.query.type < 2">
                <div class="label">项目属性</div>
                <el-select v-model="projectAttr" placeholder="请选择"
                class="inputBox">
                    <el-option
                    v-for="item in attrOptions"
                    :key="item.value"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <!-- 项目归属 -->
            <div class="row" v-if="$route.query.type < 2">
                <div class="label">项目归属</div>
                <el-select v-model="projectOwner" placeholder="请选择"
                class="inputBox">
                    <el-option
                    v-for="item in ownerOptions"
                    :key="item.value"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <!-- 需求方向 -->
            <div class="row" v-if="$route.query.type == 2">
                <div class="label">需求方向</div>
                <el-select v-model="demandDirection" placeholder="请选择"
                class="inputBox">
                    <el-option
                    v-for="item in demandOptions"
                    :key="item.value"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <!-- 需求描述 -->
            <div class="row" v-if="$route.query.type == 2">
                <div class="label">需求描述</div>
                <el-input
                class="inputBox"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="demandStatement">
                </el-input>
            </div>

            <!-- 价格 -->
            <div class="row" v-if="$route.query.type == 3">
                <div class="label">价格（选填）</div>
                <el-input placeholder="（请输入（元）" class="inputBox" type="number"
                v-model="releasePrice"></el-input>
            </div>

            <!-- 数量 -->
            <div class="row" v-if="$route.query.type == 3">
                <div class="label">数量</div>
                <el-input placeholder="请输入（吨）" class="inputBox" type="number"
                v-model="releaseNum"></el-input>
            </div>

            <!-- 圈子文字内容 -->
            <div class="row" v-if="$route.query.type == 4" style="min-width: 500px">
                <div class="label"></div>
                <el-input
                class="inputBox"
                type="textarea"
                :rows="8"
                placeholder="图文搭配能获得更多点赞哦~"
                v-model="blogText">
                </el-input>
            </div>

            <!-- 图片上传 -->
            <div class="row" v-if="$route.query.type < 2 || $route.query.type == 4">
                <div class="label" v-if="$route.query.type < 2">产权文件</div>
                <div class="label" v-if="$route.query.type == 4"></div>
                <div class="inputBox paddingBox">
                    <get-img :maxImgNum="maxImgNum"/>
                </div>
            </div>

            <div class="row"></div>

            <!-- 发布 -->
            <div class="row">
                <div class="label"></div>
                <el-button type="primary" round
                class="inputBox"
                @click="release">发布</el-button>
            </div>
        </div>

        <!-- 详细地址选择 -->
        <transition name="el-zoom-in-center">
            <map-get-point v-if="getPointShow" 
            :closeGetPoint='closeGetPoint'
            :setDetlAddr='setDetlAddr'
            :cityCoord='cityCoord'/>
        </transition>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import {regionData, CodeToText} from 'element-china-area-data';
import GetImg from '@/components/GetImg.vue';
import axios from 'axios';
import { Message } from 'element-ui';
import MapGetPoint from '@/components/MapGetPoint.vue';
import TopBar from '@/components/TopBar.vue';
export default {
  components: { GetImg, MapGetPoint, TopBar },
    name: 'ReleaseForm',
    data() {
        return {
            roles: ['权属方', '发起人', '供应商', '碳交易', '圈子'],
            cityOptions: regionData,
            cityText: '',
            cityCode: '',
            attrOptions: [
                {value: '林业-乔木林'},
                {value: '林业-竹林'},
                {value: '风电'},
                {value: '光伏'},
                {value: '生物质'},
                {value: '草原'},
            ],
            ownerOptions: [
                {value: '个人'},
                {value: '村集体'},
                {value: '国有'},
            ],
            typeOptions: [
                {value: '全国CEA'},
                {value: '全国CCER'},
                {value: '省份CEA'},
                {value: '省份CCER'},
            ],
            demandOptions: [],
            dialogImageUrl: '',
            dialogVisible: false,
            // 发布需要填写的信息
            firmOrPersonName: '',
            citySelected: '',
            detailedAddress: '',
            coord: '',
            projectType: '',
            projectAttr: '',
            projectOwner: '',
            projectCertificate: '',
            demandDirection: '',
            demandStatement: '',
            releasePrice: '',
            releaseNum: '',
            releasePurpose: '',
            blogText: '',
            getPointShow: false,

            // 地图定位相关
            geocoder: null,
            cityCoord: [116.396753, 39.917768], //默认北京天安门
        }
    },
    computed: {
        maxImgNum() {
            var index = parseInt(this.$route.query.type);
            if (index < 4) {
                return 3;
            }
            else if (index == 4) {
                return 9;
            }
            else return 3;
        }
    },
    props: ['setShowIndex'],
    methods: {
        handleChange(value) {
            let self = this;
            var city = ''
            for (var i = 0; i < value.length; i++) {
                if (i < value.length - 1) city += CodeToText[value[i]] + ' ';
                else city += CodeToText[value[i]];
            }
            this.cityText = city;
            // 将省市区坐标发给地图选点
            this.geocoder.getLocation(city, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    var loc = result.geocodes[0].location;
                    self.cityCoord = [loc.lng, loc.lat];
                }
            })
        },
        getOptions() {
            axios({
                method: 'POST',
                url: '/release/get_options',
            }).then(res => {
                var d = res.data;
                this.attrOptions = d.attrOptions;
                this.ownerOptions = d.ownerOptions;
                this.typeOptions = d.typeOptions;
            }).catch(err => {
                Message({
                    message: '获取选项失败' + err,
                    type: 'error'
                })
            })
        },
        release() {
            var data = {};
            if (this.$route.query.type < 2) {
                data = {
                    firmOrPersonName: this.firmOrPersonName,
                    citySelected: this.cityText,
                    detailedAddress: this.detailedAddress,
                    coord: this.coord,
                    projectAttr: this.projectAttr,
                    projectOwner: this.projectOwner,
                    imgList: this.$store.state.imgList,
                }
            }
            else if (this.$route.query.type == 2) {
                data = {
                    firmOrPersonName: this.firmOrPersonName,
                    citySelected: this.cityText,
                    detailedAddress: this.detailedAddress,
                    coord: this.coord,
                    demandDirection: this.demandDirection,
                    demandStatement: this.demandStatement,
                }
            }
            else if (this.$route.query.type == 3) {
                data = {
                    releasePurpose: this.releasePurpose,
                    projectType: this.projectType,
                    citySelected: this.cityText,
                    detailedAddress: this.detailedAddress,
                    coord: this.coord,
                    releasePrice: this.releasePrice,
                    releaseNum: this.releaseNum,
                }
            }
            else if (this.$route.query.type == 4) {
                data = {
                    text: this.blogText,
                    imgList: this.$store.state.imgList,
                }
            }
            else {
                console.log(-1)
            }
            var ok = true;
            for (var i in data) {
                console.log(data[i]);
                if (data[i].length == 0) {
                    if (i == 'releasePrice') continue
                    ok = false;
                    Message({
                        message: '填写信息不完整',
                        type: 'warning',
                    })
                    break;
                }
            }
            if (ok && this.$route.query.type > 5) this.releaseAxios(data);
        },
        releaseAxios(data) {
            axios({
                method: 'POST',
                url: '/release/type' + this.$route.query.type,
                data: data
            }).then(res => {
                if (res.data.code == 1) {
                    Message({
                        message: '发布成功',
                        type: 'success',
                    })
                } else {
                    Message({
                        message: '发布失败，稍后重试',
                        type: 'warning',
                    })
                }
            }).catch(err => {
                Message({
                        message: '发布失败，稍后重试' + err,
                        type: 'error',
                    })
            });
        },
        closeGetPoint() {
            this.getPointShow = false;
        },
        setDetlAddr(text, coord) {
            this.detailedAddress = text;
            this.coord = coord;
        },
        initMap() {
            AMapLoader.load({
                key: "126dae27d56194730b130d55e5df9e8f",
                version: "1.4.0",
                plugins: [
                    "AMap.Geocoder", //编码
                ],
            }).then((AMap) => {
                this.geocoder = new AMap.Geocoder({
                    radius: 1000,
                })
            })
        }
    },
    mounted() {
        this.initMap();
    },
    beforeDestroy() {
        this.$store.commit('ClearImgList');
    }
}
</script>

<style scoped>
.main {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: auto;
}
.form {
    display: inline-block;
    padding: 20px 0;
    position: relative;
    left: -40px;
    margin-bottom: 50px;
    max-width: 600px;
}
.row {
    padding: 10px;
    width: calc(100% - 20px);
}
.label {
    padding: 10px;
    display: inline-block;
    width: 80px;
    text-align: left;
    font-size: 15px;
    position: sticky;
    left: 0;
}
.inputBox {
    width: calc(100% - 100px);
    display: inline-block;
    vertical-align: top;
}
.paddingBox {
    width: calc(100% - 120px);
    padding: 10px;
}
</style>