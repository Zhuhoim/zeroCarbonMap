<template>
    <div class="infoBar">
        <div class="profileBox" @click="profileClick" title="修改头像">
            <my-profile/>
        </div>
        <br>
        <div class="login" @click="login" v-if="!$store.state.isLogin">立即登录</div>
        <div class="nicknameBox" v-if="$store.state.isLogin" 
        ref="s" title="修改昵称">
            <span class="nickname" @click="changeNnShow=true">
                {{$store.state.nickname}}
                <div class="fa fa-pencil"></div>
            </span>
            <!-- 修改用户昵称 -->
            <transition name="el-zoom-in-center">
                <div class="littleFixed" v-if="changeNnShow">
                    <div class="fixedContent">
                        <el-button icon="el-icon-close" size="mini" circle class="close_btn"
                        @click="changeNnShow=false"></el-button>
                        <h4>修改昵称</h4>
                        <el-input placeholder="输入昵称" v-model="nickname"></el-input>
                        <el-button style="margin-top: 20px"
                        @click="changeNickname">确定</el-button>
                    </div>
                </div>
            </transition>
        </div>
        <div @click="serviceShow=true" ref="service">
            <img src="@/assets/slices/service.png" alt="客服" class="service" title="客服">
            <transition name="el-zoom-in-center">
                <div class="littleFixed" v-if="serviceShow">
                    <div class="fixedContent">
                        <h3>客服二维码</h3>
                        <img style="width:150px" src="@/assets/slices/serviceQRCode.png" alt="">
                        <h3> </h3>
                    </div>
                </div>
            </transition>
        </div>
        <div class="logout fa fa-sign-out" title="退出登录" v-if="$store.state.isLogin" @click="logout">
        </div>
        <transition name="el-fade-in-linear">
            <update-profile v-if="$store.state.updateProfileShow"/>
        </transition>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import MyProfile from './MyProfile.vue';
import axios from 'axios';
import UpdateProfile from './UpdateProfile.vue';
export default {
  components: { MyProfile, UpdateProfile },
    name: 'InfoBar',
    data() {
        return {
            nickname: '',
            changeNnShow: false,
            serviceShow: false,
        }
    },
    computed: {
    },
    methods: {
        login() {
            this.$router.push('/login');
            sessionStorage['needToGo'] = '/account';
        },
        profileClick() {
            if (this.$store.state.isLogin == 1) {
                this.$store.commit('ChangeUpdateProfileShow', true);
            }
            else {
                this.login();
            }
        },
        logout() {
            if (confirm('退出登录？')) {
                axios({
                    method: 'POST',
                    url: '/logout',
                }).then(
                    res => {
                        if(res.data.code == 1) {
                            this.$store.commit('SetLogin', false);
                            this.$store.commit('SetProfile', '/img/profile/default.png');
                            Message({
                                message: '退出成功！',
                                type: 'success',
                                duration: 3000
                            })
                            localStorage.removeItem('isLogin');
                            localStorage.removeItem('profile');
                            localStorage.removeItem('nickname');
                        }else {
                            Message({
                                message: '退出失败，稍候重试',
                                type: 'warning',
                                duration: 3000,
                            })
                        }
                    }
                ).catch(
                    err => {
                        Message({
                                message: '退出失败，稍候重试 ' + err,
                                type: 'error',
                                duration: 3000,
                            })
                    }
                )
            }
        },
        // 点击空白区域关闭小窗口
        blankClose(e) {
            if (this.$refs.s)
            if (!this.$refs.s.contains(e.target)) {
                this.changeNnShow = false;
            }
            if (this.$refs.s)
            if (!this.$refs.service.contains(e.target)) {
                this.serviceShow = false;
            }
        },
        changeNickname() {
            if (this.nickname.trim() != this.$store.state.nickname){
                axios({
                method: 'POST',
                url: '/update/nickname',
                data: {
                    nickname: this.nickname,
                },
                }).then(
                    res => {
                        if (res.data.code == 1) {
                            Message({
                                message: "修改昵称成功！",
                                type: "success",
                                duration: 2000
                            });
                            this.$store.commit('SetNickname', this.nickname.trim());
                            localStorage.setItem('nickname', this.nickname.trim());
                            this.changeNnShow = false;
                        }
                        else {
                            Message({
                                message: "修改失败，请稍候重试",
                                type: "warning",
                                duration: 3000
                            });
                        }
                    }
                )
            }
            else {
                Message({
                    message: "您未修改昵称",
                    duration: 2000
                });
            }
        }
    },
    beforeMount() {
    },
    mounted() {
        document.addEventListener('mousedown', this.blankClose);
        this.nickname = this.$store.state.nickname;
        this.$bus.$on('showService', ()=>this.serviceShow=true);
    },
    beforeDestroy() {
        document.removeEventListener('mousedown', this.blankClose);
        this.$bus.$off('showService');
    }
}
</script>

<style scoped>
.infoBar {
    width: calc(100% - 30px);
    padding: 15px;
    position: relative;
}
.profileBox {
    /* background-color: #fff; */
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: inline-block;
    margin-top: 50px;
    cursor: pointer;
    overflow: hidden;
}
.login {
    padding: 15px;
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
}
.nicknameBox {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    position: relative;
}
.nickname {
    display: inline-block;
    padding: 15px;
    cursor: pointer;
}
.fa-pencil {
    position: absolute;
    bottom: 17px;
    right: -6px;
    display: none;
}
.nickname:hover .fa-pencil {
    display: block;
}
.login:hover {
    color: rgb(188, 255, 233);
}
.service {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    cursor: pointer;
    border-radius: 7px;
    padding: 5px;
}
.service:hover {
    background-color: rgba(167, 167, 167, 0.36);
}
.logout {
    position: absolute;
    bottom: -100px;
    right: 25px;
    width: 30px;
    cursor: pointer;
    border-radius: 7px;
    padding: 5px;
    font-size: 25px;
}
.logout:hover {
    background-color: rgba(167, 167, 167, 0.36);
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
.close_btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>