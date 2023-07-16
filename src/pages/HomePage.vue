<template>
    <div class="home">
        <div class="top_bar">
            <img src="@/assets/slices/logo.png" alt="" class="logo">
            <span class="xl_title top_title">零碳地图</span>
        </div>
        <div class="slideshow" ref="s">
            <div class="block">
                <el-carousel height="466px" :interval="4000" trigger="click">
                    <el-carousel-item v-for="(img, index) in slideImgs" :key="img" >
                        <img :src="require(`@/assets/slices/${img}`)" @click='showWin(index)'>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <CooperationWay :winShow="winShow" :btnClose="btnClose"></CooperationWay>
            <business-introduction :winShow="winShow" :btnClose="btnClose"></business-introduction>
        </div>
        <div class="homeMain">
            <div class="entrance">
                <img v-for="(img, index) in entranceImgs" :key="img" :src="require(`@/assets/slices/${img}`)" 
                @click="goToRelease(index)">
            </div>
            <div class="newsPlate">
                <h4 class="newsBigTitle">{{newsBigTitle}}</h4>
                <div class="newsTitleBox" v-for="(anews, index) in news" :key="anews.nid" :name="anews.nid">
                    <span class="newsIndex">{{index+1}}</span>
                    <span class="titleText">{{anews.titleText}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BusinessIntroduction from '@/components/BusinessIntroduction.vue';
    import CooperationWay from '@/components/CooperationWay.vue';
    // import { Message } from 'element-ui';
    export default {
        name: 'HomePage',
        computed: {
        },
        data() {
            return {
                slideImgs: ['banner.png', 'hezuo.png'],
                slideIndex: 0,
                entranceImgs: ['post.png', 'findchance.png'],
                newsBigTitle: '最新资讯',
                news: [
                    {nid: '00584', titleText: '国家能源局：中国积极推进能源绿色低碳转型 加快能源结构步伐调整'},
                    {nid: '00585', titleText: '福建省首个社会化碳汇造林项目成功“变现”'},
                    {nid: '00586', titleText: '福建省推进绿色经济发展行动计划出台！'},
                    {nid: '00587', titleText: '湖南：“点绿成金” 助力碳中和'},
                    {nid: '00588', titleText: '北京推出首家碳普惠超市 试点个人碳积分项目'},
                    {nid: '00589', titleText: '充电2小时存电2万度 看二氧化碳如何化身“零碳超级充电宝”'},
                    {nid: '00590', titleText: '山东荣成：海洋生态养殖催生“碳汇产业”'},
                    {nid: '00591', titleText: '重庆市建设绿色金融改革创新试验区总体方案'},
                ],
                winShow: -1
            }
        },
        components: {
            CooperationWay,
            BusinessIntroduction
        },
        methods: {
            showWin(index) {
                this.winShow = index;
            },
            blankClose(e) {
                if (this.$refs.s)
                if (!this.$refs.s.contains(e.target) && this.winShow != -1) {
                    this.winShow = -1;
                }
            },
            btnClose() {
                this.winShow = -1;
            },
            goToRelease(index) {
                // if (!this.$store.state.isLogin) {
                //     this.$router.push('/login');
                //     sessionStorage['needToGo'] = '/release'
                //     Message({
                //         message: "请先登录",
                //         type: "info",
                //         duration: 2000
                //     });
                // }
                // else {
                    if (index == 0) this.$router.push('/release');
                    else {
                        this.$router.push('/release/form?type=2');
                    }
                // }
            },
        },
        mounted() {
            document.addEventListener('click', this.blankClose);
        },
        beforeDestroy() {
            document.removeEventListener('click', this.blankClose);
        }
    }
</script>

<style scoped>
    .top_bar {
        padding: 10px;
        background-color: white;
        border-bottom: 1px solid rgb(235, 235, 235);
        position: sticky;
        top: 0;
        margin-bottom: 5px;
        z-index: 10;
    }
    .top_bar * {
        vertical-align: middle;
    }
    .logo {
        width: 22px;
    }
    .top_title {
        margin-left: 5px;
    }
    .slideshow {
        width: 500px;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        padding: 5px;
    }
    .slideshow img {
        width: 100%;
        cursor: pointer;
    }
    .homeMain {
        max-width: 500px;
        display: inline-block;
        vertical-align: top;
        padding: 5px;
    }
    .entrance img {
        width: calc(50% - 5px);
        margin: 0 2.5px;
        cursor: pointer;
    }
    .newsPlate {
        padding: 0 10px;
    }
    .newsTitleBox {
        text-align: left;
        padding: 5px 0;
        cursor: pointer;
        border-radius: 5px;
    }
    .newsTitleBox:hover {
        background-color: rgba(128, 128, 128, 0.1);
    }
    .newsIndex {
        margin-right: 8px;
        font-weight: bold;
        color: rgb(240, 114, 56);
    }
    .titleText {
        font-size: 14px;
    }
</style>