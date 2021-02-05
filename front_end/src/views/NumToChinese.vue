<template>
  <div>
    <div class="item">
      <el-input size="medium" placeholder="请输入数字" v-model="num">
        <template #prepend><span>数字</span></template>
      </el-input>
    </div>
    <div class="item">
      <el-input size="medium" v-model="moneyCN">
        <template #prepend><span>金额</span></template>
      </el-input>
    </div>
    <div class="item">
      <el-input size="medium" v-model="numCN">
        <template #prepend><span>汉字</span></template>
      </el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Nzh from 'nzh'
const nzhcn = Nzh.cn
export default defineComponent({
  name: 'NumToChinese',
  setup () {
    const num = ref()
    const moneyCN = ref()
    const numCN = ref()
    watch(num, () => {
      moneyCN.value = nzhcn.toMoney(num.value).slice(3)
      numCN.value = nzhcn.encodeS(num.value)
    })
    return {
      num,
      moneyCN,
      numCN
    }
  }
})
</script>

<style scoped>
  span {
    font-size: 20px;
    color: #409EFF;
  }
  .item {
    height: 50px;
    margin-bottom: 20px;
    font-size: 20px;
  }
  .el-input {
    margin-left: 300px;
    margin-top: 20px;
    margin-right: 50px;
    width: 600px;
  }
</style>
