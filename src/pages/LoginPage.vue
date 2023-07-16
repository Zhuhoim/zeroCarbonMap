<template>
    <div class="loginPage">
        <el-button round icon="fa fa-home" class="homeBtn" @click="backHome"> 主页</el-button>
        <back-btn v-if="false"/>
        <div class="topArea">
            <h1 style="color: #2ACCAB">LOGO</h1>
            <h4>欢迎来到零碳地图</h4>
        </div>
        <login-com v-if="formShow == 0" @changeForm="changeForm"/>
        <register-com v-if="formShow == 1" @changeForm="changeForm" :pswRequirement='pswRequirement'/>
        <forget-psw-com v-if="formShow == 2" @changeForm="changeForm" :pswRequirement='pswRequirement'/>
    </div>
</template>

<script>
    import LoginCom from "@/components/LoginCom.vue";
    import RegisterCom from '@/components/RegisterCom.vue';
    import ForgetPswCom from '@/components/ForgetPswCom.vue';
import BackBtn from '@/components/BackBtn.vue';
    export default {
        components: { LoginCom, RegisterCom, ForgetPswCom, BackBtn }, 
        name: 'LoginPage',
        data() {
            return {
                appName: '#应用名称#',
                formShow: 0,
                pswRequirement: '长度大于8位且包含数字和字母'
            };
        },
        methods: {
            changeForm(index) {
                this.formShow = index;
            },
            backHome() {
                this.$router.push('/home');
                this.$bus.$emit('setLinkIndex', '/home');
            },
        },
        mounted() {
            this.$bus.$emit('setBtmShow', false);
        },
        beforeDestroy() {
            console.log('loginpage即将销毁');
            this.$bus.$emit('setBtmShow', true);
        },
    }
</script>

<style scoped>
    .topArea {
        margin-top: 100px;
    }
    .homeBtn {
        position: absolute;
        top: 20px;
        left: 20px;
    }
</style>