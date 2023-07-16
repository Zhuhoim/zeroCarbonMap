<template>
    <div class="blogDetail">
        <top-bar :bigTitle="'圈子'"/>
        <div class="mainArea">
            <div class="blogCard">
                <div class="blogTop">
                    <img class="profile" :src="require(`@/${blog.profile}`)">
                    <div class="info">
                        <span class="name">{{blog.name}}</span>
                    </div>
                    <div class="otherInfo">
                        <span class="postTime">发布于 {{blog.postTime}}</span>
                        <span class="viewNum">{{blog.viewNum}} 阅读</span>
                    </div>
                </div>
                <div class="blogText">{{blog.text}}</div>
                <div class="illustrationsBox">
                    <div v-for="(img, index) in blog.imgs" :key="index"
                    class="illustration">
                        <img :src="require(`@/assets/slices/illustration/${img}`)">
                    </div>
                </div>
            </div>
            <div style="width: 100%; height: 900px; background-color: #eee;"></div>
            <div class="cmdBox">
                <el-input 
                placeholder="我也来说两句"
                class="cmdInput"/>
                <el-button type="primary" round>发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
export default {
    components: { TopBar },
    name: 'BlogDetail',
    data() {
        return {
            blog: {
                profile: 'assets/slices/headpic/1.png', 
                name: '两眼不闻窗外事', 
                postTime: '2022-11-08 12:22', 
                text: `在单页面应用中，网页具体路径显示是由vue-router配置中 path决定的，path设置的是什么就显示什么，和name无关。
不同路由路径下页面渲染的内容，是根据component所对应的组件来进行渲染的，和name无关。
其实name就相当于给你的path取个别名，方便使用，路由并不是一定要设置name值。（如果不设置name，vue-router默认name值为 default）`, 
                id:'001',
                viewNum: 22,
                imgs: ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            },
        }
    },
}
</script>
<style scoped>
.blogDetail {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 101;
    background-color: white;
    overflow: auto;
}
.mainArea {
    display: inline-block;
    max-width: 900px;
    text-align: left;
    padding: 0 20px;
    margin-bottom: 50px;
}
.blogCard {
    min-width: 300px;
    padding: 10px 0px;
    padding-bottom: 15px;
    margin: 5px 0;
}
.blogTop {
    padding: 5px 0;
    text-align: left;
    margin-bottom: 5px;
}
.blogTop * {
    vertical-align: middle;
}
.profile {
    width: 40px;
    border-radius: 50%;
}
.info {
    display: inline-block;
    padding: 3px;
    margin-left: 5px;
}
.otherInfo {
    padding-top: 10px;
    font-size: 14px;
    color: #999;
}
.name {
    font-size: 16px;
    font-weight: bold;
}
.blogText {
    text-align: left;
}
.viewNum {
    float: right;
}
.illustrationsBox {
    width: 100%;
    margin-top: 10px;
    text-align: left;
}
.illustration {
    width: calc(33.3% - 10px);
    padding-top: calc(33.3% - 8px);
    margin: 4px 5px;
    overflow: hidden;
    text-align: center;
    display: inline-block;
    position: relative;
}
.illustration img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.cmdBox {
    position: sticky;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
}
.cmdInput {
    width: calc(100% - 86px);
    margin-right: 10px;
}
</style>