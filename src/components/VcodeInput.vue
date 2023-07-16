<template>
    <el-form-item label="图形验证码">
        <div class="vCodeBox">
            <input type="text" class="vCodeInput" v-model="vCode" placeholder="4位验证码">
            <!-- <div class="vCode"></div> -->
            <verify-code class="vCode"/>
        </div>
    </el-form-item>
</template>

<script>
    import VerifyCode from './VerifyCode.vue'
    export default {
        components: { VerifyCode },
        name: 'VcodeInput',
        data() {
            return {
                vCode: ''
            }
        },
        methods: {
            // 判断输入验证码错对
            judgeVCode() {
                var input = this.vCode.trim().toLowerCase();
                var real = window.vCodeReal.toLowerCase();
                if (input == real) {
                    window.vCodeCorrect = true;
                }
                else {
                    window.vCodeCorrect = false;
                }
            }
        },
        mounted() {
        },
        watch: {
            vCode() {
                this.judgeVCode();
            }
        }
    }
</script>

<style scoped>
    .vCode {
        display: inline-block;
        background-color:beige;
        width: 100px;
        height: 38px;
        position: absolute;
        right: 1px;
        border-radius: 4px;
    }
    .vCodeBox {
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 14px;
        width: 100%;
        text-align: left;
    }
    .vCodeInput {
        display: inline-block;
        width: calc(100% - 110px);
        border: none;
        font-size: 15px;
    }
    .vCodeInput:focus {
        outline: none;
    }
    .vCodeInput::placeholder {
        color: #cccccc;
    }

</style>