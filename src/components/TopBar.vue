<template>
    <div class="topBar">
        <back-btn/>
        <div class="bigTitle">{{bigTitle}}</div>
    </div>
</template>

<script>
import BackBtn from './BackBtn.vue'
export default {
  components: { BackBtn },
    name: 'TopBar',
    props: ['bigTitle']
}
</script>

<style
BackBtn scoped>
.topBar {
    width: calc(100% - 30px);
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(228, 228, 228);
    color: rgb(87, 87, 87);
    margin-bottom: 5px;
    padding: 15px;
    display: inline-block;
    position: sticky;
    top: 0;
    z-index: 1;
}
.bigTitle {
    font-weight: bold;
    font-size: 18px;
}
</style>