<template>
    <transition name="el-zoom-in-center">
        <div class="fixedWindow" v-show="winShow == 1">
            <div class="top_bar">
                <el-button icon="el-icon-close" size="mini" circle class="close_btn" @click="btnClose"></el-button>
            </div>
            <h3>合作方式</h3>
            <div class="wayItem"  v-for="item in wayItems" :key="item.title">
                <div class="itemTitle" :style="{'border-bottom': '10px solid' + titleColor[item.title]}">{{item.title}}</div>
                <div class="itemText" v-for="text in item.texts" :key="text">{{text}}</div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'CooperationWay',
        data() {
            return {
                wayItems: [
                    {title: '权属方', texts: ['1.在平台登记拥有的资源信息，并上传产权证书（平台将确保每一位权属方发布的信息为真实有效。', '2.资源发布后，平台将匹配当地范围内相同且可参与碳汇开发的资源，一旦满足开发条件，平台将联系权属方确认项目开发方案，并签订开发协议。']},
                    {title: '发起人', texts: ['1.由发起人邀请的好友成为权属方，平台将该权属方视为发起人的资源。', '2.资源发布后，平台将匹配当地范围内相同且可参与碳汇开发的资源，一旦满足开发条件，平台将联系发起人确认项目开发方案，并签订开发协议。', '注：发起人有其他方面的诉求可以联系在线客服']},
                    {title: '寻求资源', texts: ['1.用户可在平台上发布拥有的资源情况，平台提供需求企业的联系方式与需求情况。', '2.平台只提供信息资源，不参与双方项目的进展、资金等方面的事宜，不对项目后续出现的问题、纠纷等负责', '']},
                    {title: '碳汇购售', texts: ['1.用户可在平台上发布购售信息，平台提供双方的联系方式与需求情况。', '2.平台只提供信息资源，不参与双方项目的进展、资金等方面的事宜，不对项目后续出现的问题、纠纷等负责']}
                ],
                titleColor: {
                    '权属方': '#ff9900',
                    '发起人': '#b6d7a8',
                    '寻求资源': '#6d9eeb',
                    '碳汇购售': '#f74377'
                }
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
    .itemTitle {
        margin-bottom: 10px;
        font-weight: bold;
        width: 100px;
        display: inline-block;
    }
    .itemText {
        text-align: left;
        padding-bottom: 7px;
    }
</style>