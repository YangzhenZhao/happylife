<template>
  <el-row>
    <el-col :span="7">
      <el-card shadow="always">
        <el-link type="primary" :underline="false" href="unicode-to-chinese" target="_blank">Unicode 转 中文</el-link>
      </el-card>
    </el-col>
    <!-- <el-col :span="7">
      <el-card shadow="always">
        鼠标悬浮时显示
      </el-card>
    </el-col>
    <el-col :span="7">
      <el-card shadow="always">
        从不显示
      </el-card>
    </el-col>
    <el-col :span="7">
      <el-card shadow="always">
        从不显示
      </el-card>
    </el-col> -->
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
    margin-left: 100px;
    margin-top: 12px;
    text-align: center;
  }
  .el-link {
    font-size: 18px;
  }
  .el-col {
    margin-bottom: 10px;
    margin-right: 24px;
  }
</style>
