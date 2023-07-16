<template>
    <div class="main">
        <div class="topArea">
            <el-button type="plain" round class="fa fa-chevron-left" size="mini"
            @click="back"> 返回</el-button>
            <div class="typeSelectorBox">
                <el-radio-group v-model="radio">
                    <el-radio-button label="0">开发</el-radio-button>
                    <el-radio-button label="1">交易</el-radio-button>
                    <el-radio-button label="2">供应商</el-radio-button>
                    <el-radio-button label="3">社群</el-radio-button>
                </el-radio-group>
            </div>
            <el-button type="primary" round class="releaseBtn" 
            @click="$router.push('/release')">我要发布</el-button>
        </div>
        <div class="pageTitle">我的发布 : {{types[this.$route.query.type]}}</div>
        <div class="largeBox" v-if="$route.query.type == 0 || $route.query.type == undefined">
            <div class="card" v-for="i in 60" :key="i">
                <h1 style="color: rgb(255,255,255,0.3);font-size: 60px;">{{i*0}}</h1>
            </div>
        </div>
        <div class="largeBox" v-if="$route.query.type == 1">
            <div class="card" v-for="i in 60" :key="i">
                <h1 style="color: rgb(255,255,255,0.3);font-size: 60px;">{{i*1}}</h1>
            </div>
        </div>
        <div class="largeBox" v-if="$route.query.type == 2">
            <div class="card" v-for="i in 60" :key="i">
                <h1 style="color: rgb(255,255,255,0.3);font-size: 60px;">{{i*2}}</h1>
            </div>
        </div>
        <div class="largeBox" v-if="$route.query.type == 3">
            <div class="card" v-for="i in 60" :key="i">
                <h1 style="color: rgb(255,255,255,0.3);font-size: 60px;">{{i*3}}</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyRelease',
    data() {
        return {
            radio: this.$route.query.type,
            types: ['权属方/发起人','碳交易','供应商','社群（圈子）'],
        }
    },
    props: [],
    methods: {
        handleChange() {
            console.log('handlechange')
        },
        back() {
            this.$router.push('/account');
        },
    },
    watch: {
        radio() {
            if (this.radio != this.$route.query.type)
            this.$router.push('/account/MyRelease?type=' + this.radio);
        }
    },
    beforeMount() {
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
    display: inline-block;
}
.topArea {
    width: calc(100% - 20px);
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(228, 228, 228);
    color: #666;
    margin-bottom: 5px;
    padding: 10px;
    position: sticky;
    top: 0;
}
.typeSelectorBox {
  display: inline-block;
  vertical-align: middle;
  padding: 5px;
  width: 300px;
  /* margin-right: 20px; */
}
.pageTitle {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
} 
.releaseBtn {
    position: absolute;
    top: 15px;
    right: 20px;
    z-index: -1;
}
.fa-chevron-left {
    position: absolute;
    left: 20px;
    top: 20px;
}

.largeBox {
    width: 100%;
    padding: 20px 0;
}
.card {
    display: inline-block;
    width: 300px;
    height: 160px;
    border-radius: 20px;
    background-color: rgba(76, 203, 173, 0.24);
    padding: 20px;
    margin: 6px 8px;
    cursor: pointer;
}
</style>