<template>
  <div class="accountPage">
    <account-top-area/>
    <div class="adBox"></div>
    <div class="funcBar">
      <div class="funcBarLabel">我的发布</div>
      <tools-bar :tools="toolsMyPost"/>
    </div>
    <div class="funcBar">
      <div class="funcBarLabel">咨询服务</div>
      <tools-bar :tools="toolsConsult"/>
    </div>
    <transition name="el-zoom-in-center">
        <div class="littleFixed" v-if="aboutUsShow" ref="aboutUs">
            <div class="fixedContent">
                <h3>关于我们</h3>
            </div>
        </div>
    </transition>
    <transition name="el-zoom-in-center">
        <div class="littleFixed" v-if="ourPhoneShow" ref="ourPhone">
            <div class="fixedContent">
                <h3>联系我们</h3>
                <h4 class="fa fa-phone"> 15500005555</h4>
                <h3> </h3>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
import AccountTopArea from '@/components/AccountTopArea.vue';
import ToolsBar from '@/components/ToolsBar.vue';

export default {
  components: { AccountTopArea, ToolsBar },
  name: 'AccountPage',
  data() {
    return {
      accountShowIndex: null,
      toolsMyPost: [
        {label: '权属方/发起人', logo: 'fa fa-user-plus', link: '/account/MyRelease?type=0'},
        {label: '碳交易', logo: 'fa fa-shopping-cart', link: '/account/MyRelease?type=1'},
        {label: '供应商', logo: 'fa fa-shopping-bag', link: '/account/MyRelease?type=2'},
      ],
      toolsConsult: [
        {label: '我的客服', logo: 'fa fa-headphones', action: 'showService'},
        {label: '关于我们', logo: 'fa fa-info-circle', action: 'showAboutUs'},
        {label: '联系我们', logo: 'fa fa-phone', action: 'showOurPhone'},
      ],
      aboutUsShow: false,
      ourPhoneShow: false,
    }
  },
  methods: {
    // 点击空白区域关闭小窗口
    blankClose(e) {
      if (this.$refs.aboutUs)
      if (!this.$refs.aboutUs.contains(e.target)) {
          this.aboutUsShow = false;
      }
      if (this.$refs.ourPhone)
      if (!this.$refs.ourPhone.contains(e.target)) {
          this.ourPhoneShow = false;
      }
    },
  },
  beforeMount() {
    // console.log('account bfm');
  },
  mounted() {
    // console.log('account mt');
    this.$bus.$on('showAboutUs', ()=>this.aboutUsShow=true);
    this.$bus.$on('showOurPhone', ()=>this.ourPhoneShow=true)
    document.addEventListener('mousedown', this.blankClose);
  },
  beforeDestroy() {
    // console.log('account bfd');
    this.$bus.$off('showAboutUs');
    document.removeEventListener('mousedown', this.blankClose);
  }
}
</script>

<style scoped>
.accountPage {
  /* max-width: 900px; */
  display: inline-block;
  background-color: rgb(245, 245, 245);
  /* padding: 0 10px;
  padding-bottom: 10px; */
}
.funcBar {
  margin: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 20px;
  color: rgb(69, 69, 69);
  max-width: 400px;
  display: inline-block;
}
.funcBarLabel {
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
  padding-left: 10px;
  text-align: left;
}
.adBox {
  margin: 15px;
  padding: 10px;
  background-color: rgba(76, 203, 173, 0.24);
  border-radius: 100px;
  height: 100px;
  color: rgb(198, 198, 198);
}
.littleFixed {
    position: fixed;
    width: 400px;
    /* height: 200px; */
    left: calc(50% - 200px);
    top: calc(50% - 200px);
    background-color: white;
    border-radius: 20px;
    box-shadow: 15px 15px 20px rgba(51, 78, 66, 0.386);
    color: #666;
}
.fixedContent {
    padding: 10px 20px;
}
</style>