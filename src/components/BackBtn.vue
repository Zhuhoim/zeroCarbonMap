<template>
    <el-button type="plain" round class="fa fa-chevron-left" size="mini"
    @click="$router.back()"> 返回</el-button>
</template>

<script>
export default {
    name: 'BackBtn',
    data() {
        return {
        }
    },
    methods: {
    },
    beforeMount() {
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>
.fa-chevron-left {
    position: absolute;
    left: 15px;
    top: 15px;
}
</style>