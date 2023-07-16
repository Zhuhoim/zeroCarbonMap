 <template>
    <div>
        <transition name="el-fade-in-linear">
            <el-upload
            v-show="$store.state.imgList.length < maxImgNum"
            action="#"
            :http-request="httpRequest"
            :before-upload="beforeUpload"
            :show-file-list="false">
                <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                <div class="el-upload__tip">仅限png、jpeg或jpg格式图片, 最多{{maxImgNum}}张</div>
            </el-upload>
        </transition>
        <div class="prevBox" v-show="$store.state.imgList.length > 0">
            <div class="previewImg" v-for="(img, index) in $store.state.imgList" 
            :key="index" @click="showBigImg(index)">
                <button circle class="fa fa-trash removeImg" 
                title="删除图片" @click.stop="removeImg(index)"></button>
                <img :src="img" style="width: 100%;"/>
            </div>
        </div>
        <transition name="el-zoom-in-center">
            <div class="bigImg"  v-show="bigImg">
                <div class="bigImgTop">
                    <button circle class="closeBigImg" @click="bigImg=null">×</button>
                </div>
                <img :src="bigImg">
            </div>
        </transition>
    </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
    name: 'GetImg',
    data() {
        return {
            bigImg: '',
        }
    },
    props: ['maxImgNum'],
    methods: {

        // 覆盖默认行为
        httpRequest() {
            // console.log(this.$store.state.imgList);
        },

        // 上传之前
        beforeUpload(file) {
            if (file.type == 'image/png' || file.type == 'image/jpeg') {
                const fileReader = new FileReader();
                // 将文件转为Base64
                fileReader.readAsDataURL(file);
                // 完成之后赋值
                fileReader.onload = () => {
                    if (-1 == this.$store.state.imgList.indexOf(fileReader.result)) {
                        // 用于预览
                        this.$store.commit('AddImg', fileReader.result);
                    }else {
                        Message({
                            message: '图片已存在，请勿重复上传',
                            type: 'warning',
                        })
                    }

                };
            }
            else {
                Message({
                    message: '仅限png或jpeg、jpg格式的图片，请重新选择',
                    type: 'error',
                })
            }
        },

        removeImg(index) {
            this.$store.commit('RemoveImg', index);
        },

        showBigImg(index) {
            this.bigImg = this.$store.state.imgList[index];
        },
    }

}
</script>

<style scoped>
.prevBox {
    padding: 10px 0;
    width: 100%;
}
.previewImg {
    width: 150px;
    height: 150px;
    display: inline-block;
    margin: 5px;
    overflow: hidden;
    position: relative;
    border: 1px solid #ddd;
    cursor: pointer;
}
.removeImg {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
    font-size: 20px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
}
.previewImg:hover .removeImg {
    display: block;
}
.bigImg {
    position: fixed;
    left: 10%;
    top: 10%;
    width: 80%;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 15px 15px 20px rgba(51, 78, 66, 0.386);
    max-height: 80%;
    overflow: auto;
}
.bigImg img {
    width: 100%;
}
.bigImgTop {
    position: sticky;
    top: 0;
}
.closeBigImg {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
    font-size: 20px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    border: 1px solid #eee;
}
.closeBigImg:hover {
    background-color: rgba(255, 255, 255, 0.8);
}
</style>