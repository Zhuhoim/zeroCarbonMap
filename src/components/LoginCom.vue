<template>
    <div class="loginForm">
        <el-form :model="formData" status-icon ref="formData" label-width="100px" class="demo-formData">
            <el-form-item>
                <div class="otherBtn" @click="setForm(1)">注册</div>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input type="text" v-model="formData.phone" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="formData.pass" autocomplete="on"></el-input>
            </el-form-item>
            <vcode-input/>
            <el-form-item>
                <div class="otherBtn" @click="setForm(2)">忘记密码</div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" round class="loginBtn" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';
import VcodeInput from './VcodeInput.vue';
    export default {
        components: { VcodeInput },
        name: 'LoginCom',
        data() {
            return {
                formData: {
                    phone: '',
                    pass: ''
                },
            };
        },
        methods: {
            setForm(index) {
                this.$emit('changeForm', index);
            },
            login() {
                if (this.formData.phone.length == 11) {
                    if (this.formData.pass.trim().length > 0) {
                        if (window.vCodeCorrect) {
                            axios({
                                method: 'POST',
                                url: '/login',
                                data: {
                                    phone: this.formData.phone,
                                    password: this.formData.pass,
                                }
                            }).then(
                                res => {
                                    if (res.data.code == 1) {
                                        var d = res.data.data;
                                        console.log(d);
                                        Message({
                                            message: "登陆成功！",
                                            type: "success",
                                            duration: 2000
                                        });
                                        this.$store.commit('SetNickname', d.nickname);
                                        this.$store.commit('SetLogin', true);
                                        this.$store.commit('SetProfile', d.profile);
                                        localStorage.setItem('isLogin', 1);
                                        localStorage.setItem('profile', d.profile);
                                        localStorage.setItem('nickname', d.nickname);
                                        this.$router.push(sessionStorage['needToGo']);
                                    }
                                    else {
                                        Message({
                                            message: "登录失败，密码或用户名错误，请重试",
                                            type: "warning",
                                            duration: 3000
                                        });
                                    }
                                }
                            ).catch(err => {
                                Message({
                                    message: '登录失败，稍后重试。'+err,
                                    type: 'error',
                                })
                            })
                        }
                        else {
                            Message({
                                message: "验证码错误，请重试",
                                type: "warning",
                                duration: 3000
                            });
                        }
                    }
                    else {
                        Message({
                            message: '密码不能为空',
                            type: "warning",
                        })
                    }
                }
                else {
                    Message({
                        message: '手机号格式错误',
                        type: "warning",
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .loginForm {
        display: inline-block;
        width: 450px;
        position: relative;
        left: -40px;
        margin-top: 20px;
    }
    .loginBtn {
        width: 100%;
    }
    .otherBtn {
        float: right;
        padding: 0 3px;
        font-size: 14px;
        color: gray;
        cursor: pointer;
        z-index: 10;
    }
    .otherBtn:hover {
        color: rgb(111, 224, 186);
    }
</style>