<template>
    <div class="main">
        <single-tool v-for="tool in tools" :key="tool.label" :toolInfo='tool' 
        class="singleTool" :style="{width: toolWidth}"/>
    </div>
</template>

<script>
import SingleTool from './SingleTool.vue'
export default {
    components: { SingleTool },
    name: 'ToolsBar',
    data() {
        return {
            toolWidth: ''
        }
    },
    props: ['tools'],
    methods: {
        setToolWidth() {
            this.toolWidth = 'calc(' + (1 / this.tools.length) * 100 + '% - 40px)';
            console.log(this.toolWidth);
        },
    },
    mounted() {
        // this.setToolWidth();
    }
}
</script>

<style scoped>
.main {
    width: calc(100% - 30px);
    padding: 15px;
}
.singleTool {
    display: inline-block;
    width: fit-content;
    cursor: pointer;
    border-radius: 10px;
}
.singleTool:hover {
    background-color: rgba(167, 167, 167, 0.36);
}
</style>