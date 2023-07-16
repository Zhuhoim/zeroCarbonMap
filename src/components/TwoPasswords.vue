<template>
    <div>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="psw0" autocomplete="new-password" :placeholder="pswRequirement"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="pass">
            <el-input type="password" v-model="psw1" autocomplete="new-password" :placeholder="pswRequirement" @blur="pswWarn"></el-input>
        </el-form-item>
    </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
    name: 'TwoPasswords',
    data() {
        return {
            psw0: '',
            psw1: ''
        }
    },
    props: ['pswRequirement'],
    methods: {
        checkFormat() {
            var p0 = this.psw0;
            var p1 = this.psw1;
            var result = {
                equal: false,
                complex: false,
                value: p0
            }
            var isNum = false
            var isAlpha = false
            // 是否一致
            if (p0 != p1) {
                return result;
            }
            else {
                result.equal = true;
                // 是否够长
                if (p0.length < 8) {
                    return result;
                }
                else {
                    for (var i = 0; i < p0.length; i++) {
                        var c = p0.charCodeAt(i);
                        if ((isNum && isAlpha)) {
                            result.complex = true;
                            break
                        }
                        // 是否含数字
                        if (c >= 48 && c <= 57) {
                            isNum = true
                            continue
                        }
                        // 是否有字母
                        if (c >= 97 && c < 122) {
                            isAlpha = true
                            continue
                        }
                    }
                }
            }
            return result;
        },
        pswWarn() {
            if (!window.pswResult.equal) {
                this.$store.commit('SetPswWarn', true);
                Message({
                    message: '两次密码不一致',
                    type: 'warning',
                })
            }
            else {
                if (!window.pswResult.complex) {
                    this.$store.commit('SetPswWarn', true);
                    Message({
                        message: '请输入大于8位且含数字与字母的密码',
                        type: 'warning',
                    })
                }
            }
        }
    },
    mounted() {
    },
    watch: {
        psw0() {
            window.pswResult = this.checkFormat();
        },
        psw1() {
            window.pswResult = this.checkFormat();
        }
    }
}
</script>