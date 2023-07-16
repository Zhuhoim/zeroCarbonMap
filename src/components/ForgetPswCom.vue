<template>
    <div class="loginForm">
        <el-form :model="formData" status-icon ref="formData" label-width="100px" class="demo-formData">
            <el-form-item label="手机号">
                <el-input type="text" v-model="formData.phone" autocomplete="new-password"></el-input>
            </el-form-item>
            <vcode-input/>
            <svcode-input/>
            <two-passwords/>
            <el-form-item>
                <div class="otherBtn" @click="setForm">返回登录页</div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" round class="submitBtn" @click="submit">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import SvcodeInput from './SvcodeInput.vue';
import TwoPasswords from './TwoPasswords.vue';
import VcodeInput from './VcodeInput.vue';
    export default {
  components: { VcodeInput, SvcodeInput, TwoPasswords },
        name: 'ForgetPswCom',
        data() {
            return {
                formData: {
                    phone: '',
                },
                vCode: ''
            };
        },
        props: ['pswRequirement'],
        methods: {
            setForm() {
                this.$emit('changeForm', 0);
            },
            submit()  {
                if (this.formData.phone.length == 11) {
                    if (window.pswResult.value.trim() != '') {
                        if (window.pswResult.equal) {
                            if(window.pswResult.complex) {
                                if (window.vCodeCorrect) {
                                    console.log(
                                        {
                                            phone: this.formData.phone,
                                            password: window.pswResult.value,
                                        }
                                    )
                                    // axios({
                                    //     method: 'POST',
                                    //     url: 'http://localhost:8080/',
                                    //     data: {
                                    //         phone: this.formData.phone,
                                    //         password: window.pswResult.value,
                                    //     }
                                    //     }).then(
                                    //         res => {
                                    //             if (res.data.code == 1) {
                                    //                 Message({
                                    //                     message: "注册成功！",
                                    //                     type: "success",
                                    //                     duration: 2000
                                    //                 });
                                    //                 sessionStorage['login'] = 1;
                                    //                 this.$router.push(sessionStorage['needToGo']);
                                    //             }
                                    //             else {
                                    //                 Message({
                                    //                     message: "注册失败",
                                    //                     type: "warning",
                                    //                     duration: 3000
                                    //                 });
                                    //             }
                                    //         }
                                    //     )
                                }
                                else {
                                    Message({
                                        message: "图形验证码错误，请重试",
                                        type: "warning",
                                        duration: 3000
                                    });
                                }
                            }
                            else {
                                if (!this.$store.state.msgPswWarn)
                                Message({
                                    message: '请输入大于8位且含数字与字母的密码',
                                    type: 'warning'
                                });
                                this.$store.commit('SetPswWarn', false);
                            }
                        }
                        else {
                            if (!this.$store.state.msgPswWarn) {
                                Message({
                                    message: '两次密码不一致',
                                    type: "warning",
                                });
                            }
                            this.$store.commit('SetPswWarn', false);
                        }
                    }
                    else {
                        Message({
                            message: '密码不能为空',
                            type: 'warning',
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
        },
        mounted() {
            window.pswResult = {
                equal: true,
                complex: false,
                value: ''
            }
        },
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
    .submitBtn {
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