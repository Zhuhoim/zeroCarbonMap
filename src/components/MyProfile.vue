<template>
    <img :src="$store.state.profile" alt="" class="main">
</template>

<script>
export default {
    name: 'MyProfile',
    data() {
        return {
        }
    },
    props: [],
    computed: {
    },
    methods: {
    },
    mounted() {
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>
.main {
    width: 100%;
    background-color: white;
}
</style>