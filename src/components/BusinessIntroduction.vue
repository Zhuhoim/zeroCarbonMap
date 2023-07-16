<template>
    <transition name="el-zoom-in-center">
        <div class="fixedWindow" v-show="winShow == 0">
            <div class="top_bar">
                <el-button icon="el-icon-close" size="mini" circle class="close_btn" @click="btnClose"></el-button>
            </div>
            <h3>业务介绍</h3>
            <h4>“身份”作为用户在平台中获得的各项"权限"，每个身份都拥有不一样的用户体验</h4>
            <div class="wayItemsBox">
                <div class="wayItem"  v-for="(item, index) in wayItems" :key="item.title">
                <img :src="require(`@/assets/slices/role${index}.png`)" class="roleImg">
                <div class="itemTitle">{{item.title}}</div>
                <div class="itemText" v-for="text in item.texts" :key="text">{{text}}</div>
            </div>
            </div>
        </div>
    </transition>
    
</template>

<script>
    export default {
        name: 'BusinessInroduction',
        data() {
            return {
                wayItems: [
                    {title: '权属方', texts: ['将拥有的林业、草原、岩溶..等资产信息上传到平台，以"积木成林"的模式参与碳汇项目开发，获得一定价值的持续收益，最长收益期为25年']},
                    {title: '发起人', texts: ['发起人是个特殊的身份，自身可不需要拥有符合碳汇项目开发的资产，但需要拥有可开发资产的"资源信息"，项目开发成功，发起人将获得巨额的持续收益，最长收益期为30年']},
                    {title: '碳汇购售', texts: ['用户可在平台发布、查看全国碳交易市场当前价格情况为投资人、企业、碳中和参与者提供全面资源信息']},
                    {title: '寻求资源', texts: ['此身份基于自身拥有节能技术、设备生产研发、大型项目投标能力等，平台将提供各种节能减排方面的需求信息，助力企业拓展业务范围']}
                ]
            }
        },
        props:['winShow', 'btnClose']
    }
</script>

<style scoped>
    .fixedWindow {
        position: fixed;
        background-color: rgb(235, 255, 248);
        top: 3%;
        left: calc(10% - 20px);
        z-index: 100;
        padding: 20px 20px;
        height: 80%;
        width: 80%;
        border-radius: 20px;
        box-shadow: 20px 15px 20px rgba(73, 111, 93, 0.278);
        overflow: auto;
    }
    .top_bar {
        position: sticky;
        top: 0px;
    }
    .close_btn {
        position: absolute;
        top: 0;
        right: 0;
    }
    h3 {
        color: rgb(26, 132, 97);
        font-size: 25px;
        margin-bottom: 30px;
    }
    .wayItem {
        padding: 10px;
        max-width: 400px;
        display: inline-block;
        vertical-align: top;
    }
    .roleImg {
        width: 35px;
    }
    .itemTitle {
        margin-bottom: 10px;
        font-weight: bold;
    }
    .itemText {
        text-align: left;
        padding-bottom: 7px;
    }
</style>