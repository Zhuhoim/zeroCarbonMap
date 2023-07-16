<template>
    <div class="main" @click='runEvent(toolInfo)'>
        <div class="logo" :class="toolInfo.logo"></div>
        <div class="label">{{toolInfo.label}}</div>
    </div>
</template>

<script>
export default {
    name: 'SingleTool',
    props: ['toolInfo'],
    methods: {
        runEvent(info) {
            if (info.link) {
                this.$router.push(info.link);
            }
            if (info.action) {
                this.$bus.$emit(info.action)
            }
        }
    }
}
</script>

<style scoped>
.logo {
    font-size: 25px;
    width: fit-content;
}
.label {
    font-size: 14px;
    padding: 5px;
}
</style>