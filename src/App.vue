<template>
  <div id="app">
    <div class="appMainArea">
      <keep-alive include="MapPage">
        <router-view></router-view>
      </keep-alive>
    </div>
    <BtmBar v-show="btmShow"/>
  </div>
</template>

<script>
  import BtmBar from './components/BtmBar.vue';

  export default {
    name: 'App',
    components: {
        BtmBar,
    },
    data() {
      return {
        btmShow: true
      }
    },
    methods: {
    },
    beforeMount() {
      // 设置btm的显示与否
      this.$bus.$on('setBtmShow', (show) => this.btmShow = show);
    },
    mounted() {
      // 空页面自动跳转到home
      if (this.$router.currentRoute.path == '/') {
        this.$router.push('/home');
      }
      const redis = require('redis');
      const client = redis.createClient({
          socket: {
              host: 'http://139.159.216.46/',
              port: 9502
          },
          password: 'CZSCczsc123321.!'
      });

      client.on('error', err => {
          console.log('Error ' + err);
      });

    },
    beforeDestroy() {
    }
  }
</script>

<style>
    body {
      margin: 0;
    }
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    .appMainArea  {
      margin-bottom: 100px;
    }
    .inline_block {
      display: inline-block;
    }

    .mid_align {
      vertical-align: middle;
    }
    .m_title {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .l_title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 8px;
    }
    .xl_title {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .xxl_title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .mb_text {
        font-size: 13px;
        font-weight: bold;
    }
    .lb_text {
        font-size: 14px;
        font-weight: bold;
    }
    .xlb_text {
        font-size: 15px;
        font-weight: bold;
    }
    .xxlb_text {
        font-size: 18px;
        font-weight: bold;
    }

    .simple-btn {
      border: none;
      background: none;
      color: gray;
      cursor: pointer;
    }
</style>
