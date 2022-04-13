<template>
  <div>
    <div class="top">
      <span>啊啊啊啊啊啊</span>
      <div>
        aaa
      </div>
    </div>
    <div class="mid">
      <div class="nav">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #fff;
  padding: 0 10px;
}
.mid {
  min-height: calc(100vh - 50px);
  background-color: #eee;
}
.nav {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
