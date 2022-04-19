<template>
  <div class="home">
    <div class="top">
      <img src="../assets/logo.png"
           class="logo"
           alt="" />
      <van-cell-group inset
                      class="inputBox">
        <van-field label="账号"
                   v-model="user"
                   placeholder="请输入账号" />
        <van-field label="密码"
                   v-model="pass"
                   type="password"
                   placeholder="请输入密码" />
      </van-cell-group>
      <van-button type="primary"
                  @click="toLogin"
                  class="btn">登录</van-button>
    </div>
    <div class="bot">©Copyright2022</div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data () {
    return {
      user: "",
      pass: "",
    };
  },
  created () {
    let token = localStorage.getItem("token");
    if (token && Number(token) + 86400000 > Date.now()) {
      this.$router.push({
        name: "AdminHome",
      });
      return;
    }
  },
  methods: {
    toLogin () {
      if (this.user == "")
        return Notify({ type: "danger", duration: "2000", message: "账号不能为空！" });
      if (this.pass == "")
        return Notify({ type: "danger", duration: "2000", message: "密码不能为空！" });
      this.$http.get("login.php", {
        user: this.user,
        pass: this.pass,
      }).then((res) => {
        if (res.code == 200) {
          localStorage.setItem("token", Date.now());
          localStorage.setItem("uid", res.data.id);
          Notify({
            type: "primary",
            message: "登录成功！",
            duration: "1500",
            onOpened: () => {
              setTimeout(() => {
                this.$router.push({
                  name: "AdminHome",
                });
              }, 500);
            }
          });

        } else {
          Notify({ type: "danger", duration: "2000", message: "账号或密码错误！" });
        }
      });
    },
  },
};
</script>

<style scoped>
.home {
  min-height: 100%;
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
