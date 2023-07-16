<template>
    <div class="main">
        <div class="topArea">
            <logo-box/>
            <div class="searchBox">
                <el-input 
                placeholder="请输入关键词"
                style="width: calc(100% - 50px)"></el-input>
                <button class="fa fa-search"></button>
            </div>
            <div class="right-bar">
                <div class="radioBox">
                    <el-radio-group v-model="radio">
                        <el-radio-button label="0">圈子</el-radio-button>
                        <el-radio-button label="1">国内</el-radio-button>
                        <el-radio-button label="2">国际</el-radio-button>
                    </el-radio-group>
                </div>
                <button class="simple-btn fa fa-bell-o"></button>
            </div>
        </div>
        <blog-area v-show="radio == 0"/>
    </div>
</template>

<script>
import LogoBox from "@/components/LogoBox.vue"
import BlogArea from '@/components/BlogArea'

export default {
    components: { LogoBox, BlogArea},
    name: 'NewsPage',
    data() {
        return {
            radio: 0
        }
    },
}
</script>

<style scoped>
.main {
    /* position: fixed; */
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 68px);
}
.topArea {
    width: calc(100% - 20px);
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(228, 228, 228);
    color: white;
    margin-bottom: 5px;
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 1;
}
.searchBox {
  display: inline-block;
  vertical-align: middle;
  padding: 5px 21px;
  width: 300px;
}
.radioBox {
  display: inline-block;
  vertical-align: middle;
  padding: 5px;
  min-width: 230px;
}
.fa-search {
    width: 30px;
    border: none;
    background: none;
    color: gray;
    cursor: pointer;
}
button:hover {
    color: #2ACCAB;
}
.fa-bell-o {
    font-size: 20px;
    vertical-align: middle;
    margin-left: 20px;
}
.right-bar {
    width: 300px;
    display: inline-block;
}
</style>