<template>
  <div>
  <el-tag size="big" effect="plain">Unicode 转 中文</el-tag>
  <el-row>
    <el-col :span="12">
      <el-card shadow="hover">
        <el-input
          type="textarea"
          :rows="23"
          placeholder="请输入需要转换的内容"
          v-model="unicodeText">
        </el-input>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="hover">
        <el-input
          type="textarea"
          :rows="23"
          v-model="chineseText">
        </el-input>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import * as utils from '../hooks/utils'
export default defineComponent({
  name: 'UnicodeToChinese',
  setup () {
    const unicodeText = ref()
    const chineseText = ref()
    watch(unicodeText, () => {
      chineseText.value = utils.unicodeToChinese(unicodeText.value)
    })
    return {
      unicodeText,
      chineseText
    }
  }
})
</script>

<style scoped>
  .el-tag {
    font-size: 18px;
    margin-left: 20px;
    margin-top: 10px;
  }
  .el-row {
    height: 590px;
  }
  .el-col {
    height: 500px;
  }
  .el-card {
    height: 500px;
  }
</style>
