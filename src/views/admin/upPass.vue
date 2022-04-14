<template>
  <div class="home">
    <van-cell-group inset>
      <van-field v-model="text"
                 label="账号"
                 readonly />
      <van-field v-model="text"
                 placeholder="请输入旧密码"
                 label="旧密码" />
      <van-field v-model="text"
                 label="新密码"
                 placeholder="请输入新密码" />
      <van-field v-model="text"
                 label="确认新密码"
                 placeholder="请再次输入新密码" />
    </van-cell-group>
    <van-button type="primary"
                @click="toLogin"
                class="btn">提交修改</van-button>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.btn {
  margin: 30px 16px 0;
  width: calc(100% - 32px);
  border-radius: 8px;
}
</style>
