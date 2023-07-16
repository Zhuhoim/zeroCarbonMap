<template>
    <div class="main">
        <div class="fixedWindow">
            <back-btn/>
            <h3>请选择您的身份，您是？</h3>
            <div class="wayItemsBox">
                <div class="wayItem"  v-for="item in wayItems" :key="item.title"
                @click="turnTo(item.type)">
                    <img :src="require(`@/assets/slices/role${item.type}.png`)" class="roleImg">
                    <div class="itemTitle">{{item.title}}</div>
                    <div class="itemText" v-for="text in item.texts" :key="text">{{text}}</div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import BackBtn from '@/components/BackBtn.vue';
// import { Message } from 'element-ui';
export default {
  components: { BackBtn },
    name: 'ReleasePage',
    data() {
        return {
            wayItems: [
                {title: '权属方', texts: ['拥有3000+权属方发布资源信息'], type: 0},
                {title: '发起人', texts: ['整合当地资源，利用资源换钱'], type: 1},
                {title: '供应商', texts: ['50万+资源信息为您解决业务难的问题'], type: 2},
                {title: '碳交易', texts: ['求购、出售大宗碳汇全国优质低价资源'], type: 3},
            ],
            showIndex: 0,
        }
    },
    props: [],
    methods: {
        setShowIndex(index) {
            this.showIndex = index;
        },
        turnTo(type) {
            this.$router.push('/release/form?type=' + type);
        }
    },
    beforeMount() {
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>
    .fixedWindow {
        position: fixed;
        background-color: rgb(235, 255, 248);
        top: 3%;
        left: calc(10% - 20px);
        padding: 20px 20px;
        height: 80%;
        width: 80%;
        border-radius: 20px;
        box-shadow: 20px 15px 20px rgba(73, 111, 93, 0.278);
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
        padding: 20px 10px;
        width: 40%;
        display: inline-block;
        vertical-align: top;
        border-radius: 20px;
        cursor: pointer;
    }
    .wayItem:hover {
        background-color: rgba(128, 128, 128, 0.132);
    }
    .roleImg {
        width: 100px;
    }
    .itemTitle {
        margin-bottom: 10px;
        font-weight: bold;
    }
    .itemText {
        padding-bottom: 7px;
    }
</style>