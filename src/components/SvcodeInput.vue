<template>
    <el-form-item label="短信验证码">
        <div class="vCodeBox">
            <input type="text" class="vCodeInput" v-model="sVCode">
            <div class="sVCode">获取验证码</div>
        </div>
    </el-form-item>
</template>

<script>
    export default {
        name: 'SvcodeInput',
        data() {
            return {
                sVCode: ''
            }
        },
        watch: {
            sVCode() {
                window.sVCodeInput = this.sVCode;
            }
        }
    }
</script>

<style scoped>
    .sVCode {
        display: inline-block;
        width: 80px;
        height: 38px;
        position: absolute;
        right: 1px;
        border-radius: 4px;
        color: gray;
        cursor: pointer;
    }
    .sVCode:hover {
        color: rgb(111, 224, 186);
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
        width: calc(100% - 90px);
        border: none;
        font-size: 15px;
    }
    .vCodeInput:focus {
        outline: none;
    }

</style>