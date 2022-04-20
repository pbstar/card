<template>
  <div class="home">
    <van-cell-group inset>
      <van-field v-model="user"
                 label="账号"
                 readonly />
      <van-field v-model="pass0"
                 placeholder="请输入旧密码"
                 type="password"
                 label="旧密码" />
      <van-field v-model="pass1"
                 label="新密码"
                 type="password"
                 placeholder="请输入新密码" />
      <van-field v-model="pass2"
                 label="确认新密码"
                 type="password"
                 placeholder="请再次输入新密码" />
    </van-cell-group>
    <van-button type="primary"
                @click="toSend"
                class="btn">提交修改</van-button>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      user: '',
      pass0: '',
      pass1: '',
      pass2: ''
    }
  },
  created () {
    this.user = this.data.user
  },
  methods: {
    toSend () {
      if (this.pass0 == "")
        return Notify({ type: "danger", duration: "2000", message: "旧密码不能为空！" });
      if (this.pass1 == "" || this.pass2 == "")
        return Notify({ type: "danger", duration: "2000", message: "新密码不能为空！" });
      if (this.pass1 != this.pass2)
        return Notify({ type: "danger", duration: "2000", message: "两次密码输入不一致！" });
      this.$http.post("upPass.php", {
        uid: Number(this.data.id),
        pass: this.pass1,
      }).then((res) => {
        if (res.code == 200) {
          localStorage.clear()
          Notify({
            type: "primary",
            message: "修改成功，请重新登录！",
            duration: "1500",
            onOpened: () => {
              setTimeout(() => {
                this.$router.push({
                  name: 'Login'
                })
              }, 500);
            }
          });

        } else {
          Notify({ type: "danger", duration: "2000", message: "修改失败，请稍候再试！" });
        }
      });
    },
  }
}
</script>

<style scoped>
.btn {
  margin: 30px 16px 0;
  width: calc(100% - 32px);
  border-radius: 8px;
}
</style>
