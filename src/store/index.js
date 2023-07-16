import Vue from 'vue'
import Vuex from 'vuex'

console.log(localStorage.getItem('isLogin'), localStorage.getItem('profile'), localStorage.getItem('nickname'));
 
//应用Vuex插件
Vue.use(Vuex)
 
// 准备 actions - 用于响应组件中的动作  例:提交x+value的操作
const actions = {
}
 
// 准备 mutations - 用于操作数据  例:操作x+value
const mutations = {
    SetLogin(state, value) {
        state.isLogin = value
    },
    SetProfile(state, value) {
        state.profile = value
    },
    SetNickname(s, v) {
        s.nickname = v
    },
    SetPswWarn(s, v) {
        s.msgPswWarn = v
    },
    AddImg(s, v) {
        s.imgList.push(v);
    },
    RemoveImg(s, v) {
        s.imgList.splice(v, 1);
    },
    ClearImgList(s) {
        s.imgList = [];
    },
    ChangeUpdateProfileShow(s, v) {
        s.updateProfileShow = v;
    }
}
 
// 准备 state - 用于存储数据
const state = { 
    // 个人信息
    isLogin: localStorage.getItem('isLogin')?parseInt(localStorage.getItem('isLogin')):false,
    profile: localStorage.getItem('profile')?localStorage.getItem('profile'):'/img/profile/default.png',
    nickname: localStorage.getItem('nickname')?localStorage.getItem('nickname'):'',

    // 登录页
    msgPswWarn: false, //防止连续提醒两次

    // 上传图片列表
    imgList: [],

    // 打开上传头像界面
    updateProfileShow: false,
}
 
// 可选配置项 getters, 作用类似于计算属性,例：返回一个10倍的x值
const getters = {
}
 
// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})