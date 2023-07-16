<template>
    <div class="main">
        <div style="padding: 10px">
            <el-button round @click="$router.push('/release/form?type=4')">发布一条圈子</el-button>
        </div>
        <div class="blogCard" v-for="(blog, index) in blogs" :key="index">
            <div class="blogTop">
                <img class="profile" :src="require(`@/${blog.profile}`)">
                <div class="info">
                    <span class="name">{{blog.name}}</span>
                    <span class="postTime">{{blog.postTime}}</span>
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'BlogArea',
    data() {
        return {
            blogs: [
                {profile: 'assets/slices/headpic/1.png', name: '两眼不闻窗外事', postTime: '2022-11-08 12:22', text: '需要用到压缩空气(空压机)的工厂企业、工业园区，或者相关资源介绍。', id:'001', imgs:['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg']},
                {profile: 'assets/slices/headpic/3.png', name: '程又青', postTime: '2022-11-07 12:22', text: '本企业有2030年碳排放降低35%的目标，需要在目前基础上在降低80%以上的碳排放量，由于建筑属地原因无法进行开发屋顶光伏，希望寻找能够提供更多适合工厂实际情况的降碳减排节能方案的方案解决商。', id:'002'},
                {profile: 'assets/slices/headpic/7.png', name: '东方清楚', postTime: '2022-11-07 09:22', text: '有没有针对煤矿企业实现减排场景控制措施和低碳发展路径的研究院吗？', id:'003'},
                {profile: 'assets/slices/headpic/8.png', name: '小茶', postTime: '2022-11-06 12:22', text: '我们是杭州的一家碳综合开发与碳系统运营的综合性公司，有中教能源研究院的系统和政策支持。也有东软科技的技术支持。需要跟同行共同合作开发碳资产项目暨绿色低碳项目的改造，自带资金入场。', id:'004'},
                {profile: 'assets/slices/headpic/9.png', name: '疯狂星期四', postTime: '2022-11-05 12:22', text: '国家核证自愿减排量CCER开发：林业碳汇、光伏发电、生物质能（发电、供热），我司出技术和资金开发，业主零风险零投资，项目开发签发后分成，期待全国有项目资源方合作。', id:'005'},
                {profile: 'assets/slices/headpic/10.png', name: 'coco', postTime: '2022-11-04 12:22', text: '根据集团整体的规划和布局，本财年下半年集团将专门针对再生能源等相关项目进行投资，例如风、光、水、生物质发电等，风电和光伏项目，尤其是装机量大的优先。集团公司将针对以上相关项目进行定向投资。有相关资源的可以联系我，15730198500（微信同号）', id:'006'},
                {profile: 'assets/slices/headpic/1.png', name: '两眼不闻窗外事', postTime: '2022-11-08 12:22', text: '需要用到压缩空气(空压机)的工厂企业、工业园区，或者相关资源介绍。', id:'001'},
                {profile: 'assets/slices/headpic/3.png', name: '程又青', postTime: '2022-11-07 12:22', text: '本企业有2030年碳排放降低35%的目标，需要在目前基础上在降低80%以上的碳排放量，由于建筑属地原因无法进行开发屋顶光伏，希望寻找能够提供更多适合工厂实际情况的降碳减排节能方案的方案解决商。', id:'002'},
                {profile: 'assets/slices/headpic/7.png', name: '东方清楚', postTime: '2022-11-07 09:22', text: '有没有针对煤矿企业实现减排场景控制措施和低碳发展路径的研究院吗？', id:'003'},
                {profile: 'assets/slices/headpic/8.png', name: '小茶', postTime: '2022-11-06 12:22', text: '我们是杭州的一家碳综合开发与碳系统运营的综合性公司，有中教能源研究院的系统和政策支持。也有东软科技的技术支持。需要跟同行共同合作开发碳资产项目暨绿色低碳项目的改造，自带资金入场。', id:'004'},
                {profile: 'assets/slices/headpic/9.png', name: '疯狂星期四', postTime: '2022-11-05 12:22', text: '国家核证自愿减排量CCER开发：林业碳汇、光伏发电、生物质能（发电、供热），我司出技术和资金开发，业主零风险零投资，项目开发签发后分成，期待全国有项目资源方合作。', id:'005'},
                {profile: 'assets/slices/headpic/10.png', name: 'coco', postTime: '2022-11-04 12:22', text: '根据集团整体的规划和布局，本财年下半年集团将专门针对再生能源等相关项目进行投资，例如风、光、水、生物质发电等，风电和光伏项目，尤其是装机量大的优先。集团公司将针对以上相关项目进行定向投资。有相关资源的可以联系我，15730198500（微信同号）', id:'006'},
                {profile: 'assets/slices/headpic/1.png', name: '两眼不闻窗外事', postTime: '2022-11-08 12:22', text: '需要用到压缩空气(空压机)的工厂企业、工业园区，或者相关资源介绍。', id:'001'},
                {profile: 'assets/slices/headpic/3.png', name: '程又青', postTime: '2022-11-07 12:22', text: '本企业有2030年碳排放降低35%的目标，需要在目前基础上在降低80%以上的碳排放量，由于建筑属地原因无法进行开发屋顶光伏，希望寻找能够提供更多适合工厂实际情况的降碳减排节能方案的方案解决商。', id:'002'},
                {profile: 'assets/slices/headpic/7.png', name: '东方清楚', postTime: '2022-11-07 09:22', text: '有没有针对煤矿企业实现减排场景控制措施和低碳发展路径的研究院吗？', id:'003'},
                {profile: 'assets/slices/headpic/8.png', name: '小茶', postTime: '2022-11-06 12:22', text: '我们是杭州的一家碳综合开发与碳系统运营的综合性公司，有中教能源研究院的系统和政策支持。也有东软科技的技术支持。需要跟同行共同合作开发碳资产项目暨绿色低碳项目的改造，自带资金入场。', id:'004'},
                {profile: 'assets/slices/headpic/9.png', name: '疯狂星期四', postTime: '2022-11-05 12:22', text: '国家核证自愿减排量CCER开发：林业碳汇、光伏发电、生物质能（发电、供热），我司出技术和资金开发，业主零风险零投资，项目开发签发后分成，期待全国有项目资源方合作。', id:'005'},
                {profile: 'assets/slices/headpic/10.png', name: 'coco', postTime: '2022-11-04 12:22', text: '根据集团整体的规划和布局，本财年下半年集团将专门针对再生能源等相关项目进行投资，例如风、光、水、生物质发电等，风电和光伏项目，尤其是装机量大的优先。集团公司将针对以上相关项目进行定向投资。有相关资源的可以联系我，15730198500（微信同号）', id:'006'},
                {profile: 'assets/slices/headpic/1.png', name: '两眼不闻窗外事', postTime: '2022-11-08 12:22', text: '需要用到压缩空气(空压机)的工厂企业、工业园区，或者相关资源介绍。', id:'001'},
                {profile: 'assets/slices/headpic/3.png', name: '程又青', postTime: '2022-11-07 12:22', text: '本企业有2030年碳排放降低35%的目标，需要在目前基础上在降低80%以上的碳排放量，由于建筑属地原因无法进行开发屋顶光伏，希望寻找能够提供更多适合工厂实际情况的降碳减排节能方案的方案解决商。', id:'002'},
                {profile: 'assets/slices/headpic/7.png', name: '东方清楚', postTime: '2022-11-07 09:22', text: '有没有针对煤矿企业实现减排场景控制措施和低碳发展路径的研究院吗？', id:'003'},
                {profile: 'assets/slices/headpic/8.png', name: '小茶', postTime: '2022-11-06 12:22', text: '我们是杭州的一家碳综合开发与碳系统运营的综合性公司，有中教能源研究院的系统和政策支持。也有东软科技的技术支持。需要跟同行共同合作开发碳资产项目暨绿色低碳项目的改造，自带资金入场。', id:'004'},
                {profile: 'assets/slices/headpic/9.png', name: '疯狂星期四', postTime: '2022-11-05 12:22', text: '国家核证自愿减排量CCER开发：林业碳汇、光伏发电、生物质能（发电、供热），我司出技术和资金开发，业主零风险零投资，项目开发签发后分成，期待全国有项目资源方合作。', id:'005'},
                {profile: 'assets/slices/headpic/10.png', name: 'coco', postTime: '2022-11-04 12:22', text: '根据集团整体的规划和布局，本财年下半年集团将专门针对再生能源等相关项目进行投资，例如风、光、水、生物质发电等，风电和光伏项目，尤其是装机量大的优先。集团公司将针对以上相关项目进行定向投资。有相关资源的可以联系我，15730198500（微信同号）', id:'006'},
            ]
        }
    },
    methods: {
        getBlogs() {
            axios({
                method: 'POST',
                url: '/get_blogs',
            }).then(
                res=>{
                    this.blogs = res.data.blogs;
                }
            )
        }
    }
}
</script>

<style scoped>
.main {
    text-align: center;
    color: #393939;
    font-size: 14px;
}
.blogCard {
    max-width: 400px;
    min-width: 300px;
    padding: 10px 15px;
    padding-bottom: 15px;
    margin: 5px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(234, 234, 234);
    border-radius: 10px;
    cursor: pointer;
    vertical-align: top;
    display: inline-block;
}
.blogCard:hover {
    border-color: #2ACCAB;
}
.blogTop {
    padding: 5px;
    text-align: left;
    margin-bottom: 5px;
}
.blogTop * {
    vertical-align: middle;
}
.profile {
    width: 30px;
    border-radius: 50%;
}
.info {
    display: inline-block;
    padding: 3px;
    margin-left: 5px;
}
.name {
    font-size: 16px;
    font-weight: bold;
}
.postTime {
    color: #999;
    margin-left: 15px;
}
.blogText {
    text-align: left;
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
</style>