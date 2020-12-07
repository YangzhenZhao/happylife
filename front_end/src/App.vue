<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark" style="background-color: #ff2121;">
      <a class="navbar-brand" href="#">HappyLife</a>
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">天气</a>
          <a class="nav-item nav-link" href="#">日历</a>
        </div>
      </div>
      <ul class="list-inline mb-0">
        <li class="list-inline-item"><a href="#" class="btn btn-outline-light">登录</a></li>
        <li class="list-inline-item"><a href="#" class="btn btn-outline-light">注册</a></li>
      </ul>
    </nav>
    <footer class="text-center py-4 text-black-50 bg-light">
      <small>&copy; 2020 不要香菜</small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

export default defineComponent({
  name: 'App',
  components: {
  }
})
</script>

<style>
</style>
