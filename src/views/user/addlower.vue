<template>
  <div class="home">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="name"
                   name="姓名"
                   label-width="50"
                   label="姓名"
                   placeholder="请输入下级姓名" />
        <van-field v-model="user"
                   name="账号"
                   label-width="50"
                   label="账号"
                   placeholder="请输入下级账号" />
        <van-field v-model="pass"
                   name="密码"
                   label-width="50"
                   label="密码"
                   placeholder="请输入下级密码" />
        <van-field v-model="levelText"
                   is-link
                   label-width="50"
                   readonly
                   name="picker"
                   label="级别"
                   placeholder="点击选择下级级别"
                   @click="showPicker = true" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="primary"
                    native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup v-model:show="showPicker"
               position="bottom">
      <van-picker :columns="levelList"
                  @confirm="changeLevel"
                  @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data () {
    return {
      showPicker: false,
      levelList: [],
      levelText: '',
      levelId: 0,
      name: '',
      user: '',
      pass: ''
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created () {
    this.getLevel()
  },
  methods: {
    getLevel () {
      this.$http.get("getLevel.php").then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.levelList.push({
              text: res.data[i].name,
              value: res.data[i].id
            })
          }
        }
      })
    },
    changeLevel (e) {
      this.levelText = e.text
      this.levelId = e.value
      this.showPicker = false
    },
    onSubmit () {
      if (this.name == "")
        return Toast.fail('请输入姓名')
      if (this.user == "")
        return Toast.fail('请输入账号')
      if (this.pass == "")
        return Toast.fail('请输入密码')
      if (this.levelId == 0)
        return Toast.fail('请选择级别')
      this.$http.post("setLower.php", {
        name: this.name,
        user: this.user,
        pass: this.pass,
        leader: Number(this.data.id),
        level: Number(this.levelId),
      }).then((res) => {
        if (res.code == 200) {
          Toast.success('新增成功')
          this.$router.push({
            name: 'UserLower'
          })
        } else {
          Toast.fail('操作失败')
        }
      });
    }
  }
}
</script>

<style scoped>
</style>