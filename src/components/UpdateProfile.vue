<template>
    <div class="main">
        <button circle class="closeBigImg" @click="$store.commit('ChangeUpdateProfileShow', false)">×</button>
        <div class="center">
            <el-upload
            action="#"
            :http-request="httpRequest"
            :before-upload="beforeUpload"
            :show-file-list="false">
                <el-button slot="trigger" round class="fa fa-file-image-o"> 选取图片</el-button>
            </el-upload>
            <div style="width: 400px; height: 400px; display: inline-block; margin: 10px;">
                <vue-cropper 
                class="imgBox" 
                autoCrop :img="img" 
                ref="cropper" 
                centerBox 
                fixed
                @realTime="realTime"/>
            </div>
            <div>
                <div :style="previewStyle2" class="small"> 
                    <div :style="previews.div">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
                <el-button @click="getCropData()" class="fa fa-check"
                style="margin:0 30px; vertical-align: middle;" 
                round> 确定修改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import axios from 'axios';

export default {
    name: 'UpdatePrifile',
    data() {
        return {
            img: this.$store.state.profile,
            previews: {},
            previewStyle2: {},
            dealImage: '',
        }
    },
    methods: {
        getCropData() {
            this.$refs.cropper.getCropData(data => {
                axios({
                    method: 'POST',
                    url: '/update/profile',
                    data: {
                        new_profile: data
                    }
                }).then(res=>{
                        console.log(res.data);
                        if (res.data.code == 1) {
                            this.$store.commit('ChangeUpdateProfileShow', false);
                            this.$store.commit('SetProfile', data)
                            localStorage.setItem('profile', res.data.data);
                            Message({
                                message: '头像更新成功',
                                type: 'success'
                            });
                        }
                        else {
                            Message({
                                message: '上传失败,请稍候重试',
                                type: 'warning'
                            })
                        }
                    }).catch(err=>{
                        Message({
                            message: '操作失败,请稍候重试' + err,
                            type: 'error'
                        })
                    })
            })
        },
        httpRequest() {
        },
        beforeUpload(file) {
            if (file.type == 'image/png' || file.type == 'image/jpeg') {
                const fileReader = new FileReader();
                // 将文件转为Base64
                fileReader.readAsDataURL(file);
                // 完成之后赋值
                fileReader.onload = () => {
                    this.img = fileReader.result;
                };
            }
            else {
                Message({
                    message: '仅限png或jpeg、jpg格式的图片，请重新选择',
                    type: 'error',
                })
            }
        },
        realTime(data) {
            var previews = data
            this.previewStyle2 = {
                width: previews.w + "px",
                height: previews.h + "px",
                overflow: "hidden",
                margin: "0",
                zoom: 100/previews.w
            }
            this.previews = data
        }
    }
}
</script>

<style scoped>
.imgBox {
    width: 500px;
}
.main {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    z-index: 101;
    overflow: auto;
}
.center {
    width: 500px;
    margin-left: calc(50% - 250px);
    margin-top: 30px;
}
.small {
    height: 100px;
    width: 100px;
    overflow: hidden;
    display: inline-block;
    margin-right: 20px;
    border-radius: 50%;
    vertical-align: middle;
}
.closeBigImg {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    background-color: rgba(85, 85, 85, 0.5);
    color: rgb(255, 255, 255);
    font-size: 20px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    border: 1px solid #eee;
}
</style>