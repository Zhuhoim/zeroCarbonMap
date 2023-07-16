<template>
    <div class="topArea">
      <logo-box/>
      <div class="citySelectorBox">
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
          placeholder="请选择：省 / 市 / 区"
          style="width: calc(100% - 55px)"
          :title="cityText"></el-cascader>
      <button class="clearCity" @click="clearCity">清除</button>
      </div>
      <div class="firmSelectorBox">
        <el-radio-group v-model="radio">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="碳开发"></el-radio-button>
          <el-radio-button label="碳交易"></el-radio-button>
          <el-radio-button label="供应商"></el-radio-button>
          <el-radio-button label="碳企信息"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
</template>

<script>
import {regionData, CodeToText} from 'element-china-area-data';
import LogoBox from './LogoBox.vue';
export default {
  components: {LogoBox},
  name: 'MapTopBar',
  data() {
    return {
      value: '',
      options: regionData,
      radio: '全部',
      cityText: '',
    }
  },
  methods: {
    handleChange(value) {
      var city = ''
      for (var i = 0; i < value.length; i++) {
        city += CodeToText[value[i]] + ' ';
      }
      this.cityText = city;
      console.log(city);
    },
    clearCity() {
      this.value = '';
      this.cityText = '';
    }
  },
  mounted() {
    console.log(this.options)
  }
}
</script>

<style scoped>
.topArea {
    width: 100%;
    /* height: 60px; */
    /* background-color: rgb(76, 203, 154); */
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(228, 228, 228);
    color: white;
    /* padding-bottom: 10px; */
    margin-bottom: 5px;
    padding: 10px;
}
.citySelectorBox {
  display: inline-block;
  vertical-align: middle;
  padding: 5px 21px;
  width: 416px;
}
.clearCity {
  border: solid 1px rgb(236, 236, 236);
  background-color: rgb(255, 255, 255);
  color: rgb(125, 125, 125);
  font-size: 14px;
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  vertical-align: top;
  margin-left: 5px;
  cursor: pointer;
}
.clearCity:hover {
  color: #2ACCAB;
}
.firmSelectorBox {
  display: inline-block;
  vertical-align: middle;
  padding: 5px;
  min-width: 446px;
}
</style>