<template>
    <div>
        <div class="btm">
            <div v-for="(tab, index) in tabs" :key="tab[1]" class="tab" :style="tab_width" @click="turnTo(index)" :class="{active: link[index] == getMainPath($route.path)}">
                <div :class="tab[1]" class="tab_icon"></div>
                <div>{{tab[0]}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BtmBar',
        data() {
            return {
                tabs: [['主页', 'fa fa-home'], ['地图', 'fa fa-map-marker'], ['社群', 'fa fa-group'], ['我的', 'fa fa-user-circle']],
                tab_width: {
                    width: '17%'
                },
                link: ['/home', '/map', '/news', '/account'],
            }
        },
        components: {
        },
        methods: {
            // 跳转到相应路由
            turnTo(index) {
                if (this.$router.currentRoute.path != this.link[index]) {
                    this.$router.push(this.link[index]);
                }
            },
            // 获取路由的主名称，以改变选项卡的active
            getMainPath(path) {
                return '/' + path.split('/')[1];
            }
        },
        mounted() {
        },
        beforeDestroy() {
        }
    }
</script>

<style scoped>
    .btm {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 10px 0;
        padding-bottom: 15px;
        border-top: 1px solid rgb(230, 230, 230);
        background-color: white;
        z-index: 100;
        color: rgb(85, 85, 85);
    }
    .tab {
        display: inline-block;
        font-size: 13px;
        cursor: pointer;
    }
    .tab:hover {
        color: rgb(111, 224, 186);
    }
    .active {
        color:rgb(136, 212, 187)
    }
    .tab_icon {
        font-size: 20px;
        margin-bottom: 3px;
    }

</style>