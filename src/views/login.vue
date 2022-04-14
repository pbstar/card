<template>
  <div class="home">
    <div class="top">
      <img src="../assets/logo.png"
           class="logo"
           alt="">
      <van-cell-group inset
                      class="inputBox">
        <van-field label="账号"
                   placeholder="请输入账号" />
        <van-field label="密码"
                   placeholder="请输入密码" />
      </van-cell-group>
      <van-button type="primary"
                  @click="toLogin"
                  class="btn">登录</van-button>
    </div>
    <div class="bot">
      ©Copyright2022
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token && Number(token) + 86400000 > Date.now()) {
      this.$router.push({
        name: 'AdminHome'
      })
      return
    }
  },
  methods: {
    get () {
      this.$http.get('OssFileApi/GetOrgResById', {
        resid: Number(1234)
      }).then(res => {
        if (res.code == 200) {
          console.log(res.data);
        }
      })
    },
    toLogin () {
      localStorage.setItem('token', Date.now())
      this.$router.push({
        name: 'AdminHome'
      })
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #eee;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}
.inputBox {
  margin-top: 40px;
}
.btn {
  margin: 30px 16px 0;
  width: calc(100% - 32px);
  border-radius: 8px;
}
.logo {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
}
.bot {
  font-size: 12px;
  margin-bottom: 16px;
  color: #666;
}
</style>
