import '@/assets/element_ui_theme/index.css'
import { Select, Option, Carousel, CarouselItem, Button, Form, FormItem, Input, Cascader, RadioGroup, RadioButton, Upload, Dialog, Radio } from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import store from './store/index.js'
import VueCropper from 'vue-cropper'

Vue.config.productionTip = false
// 配置高德地图安全密钥
window._AMapSecurityConfig = {
	securityJsCode: '84809d4c5a81b6****63dc89d34dcc04' //*  安全密钥
}

Vue.use(Select)
Vue.use(Option)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Button)
Vue.use(VueRouter)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Cascader)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(VueCropper)

new Vue({
  render: h => h(App),
  router: router,
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
