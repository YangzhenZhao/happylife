<template>
  <el-row>
    <el-col :span="8">
      <el-card shadow="always">
        <el-link type="primary" :underline="false" href="http://www.shouce.ren/tool/yanse" target="_blank">颜色选择</el-link>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <el-link type="primary" :underline="false" href="https://codepan.egoist.sh/" target="_blank">前端代码编辑器</el-link>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <el-link type="primary" :underline="false" href="num-to-chinese" target="_blank">数字金额转中文金额</el-link>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <el-link type="primary" :underline="false" href="https://tool.oschina.net/" target="_blank">OSCHINA 工具列表</el-link>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <el-link type="primary" :underline="false" href="unicode-to-chinese" target="_blank">Unicode 转 中文</el-link>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'FindMore',
  setup () {
    const currentDate = ref(new Date())
    return {
      currentDate
    }
  }
})
</script>

<style scoped>
  .el-row {
    margin-top: 12px;
    text-align: center;
  }
  .el-link {
    display: block;
    font-size: 18px;
    text-decoration: none;
  }
  .el-col {
    margin-bottom: 10px;
    padding: 1em 1.5em;
  }
</style>
