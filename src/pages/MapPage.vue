<template>
    <div class="main">
        <map-top-bar/>
        <map-index class="map"/>
    </div>
</template>

<script>
import MapIndex from '@/components/MapIndex.vue'
import MapTopBar from '@/components/MapTopBar.vue'
export default {
  components: { MapIndex, MapTopBar },
    name: 'MapPage',
}
</script>

<style scoped>
.main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 68px);
}
.map {
    display: inline-block;
    width: 100%;
    height: calc(100% - 78px);
}
</style>