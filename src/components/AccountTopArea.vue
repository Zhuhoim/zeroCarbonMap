<template>
    <div class="topArea">
        <info-bar/>
        <tools-bar :tools='tools'/>
    </div>
</template>

<script>
import InfoBar from './InfoBar.vue'
import ToolsBar from './ToolsBar.vue'
export default {
  components: { InfoBar, ToolsBar },
  name: 'AccountTopArea',
  data() {
    return {
        tools: [
                {label: '足迹', logo: 'fa fa-clock-o', link: '/account/footprint'},
                {label: '收藏', logo: 'fa fa-star-o', link: '/account/collect'},
                {label: '消息', logo: 'fa fa-bell-o', link: '/account/meassage'},
                {label: '发布', logo: 'fa fa-paper-plane-o', link: '/release'},
            ]
    }
  },
}
</script>

<style scoped>
.topArea {
    width: 100%;
    background-color: rgb(76, 203, 173);
    color: white;
    padding-bottom: 10px;
    margin-bottom: 15px;
}
</style>