<template>
  <div class="home">
    <div class="top">
      <van-button icon="plus"
                  size="small"
                  type="primary"
                  @click="isAddShow=!isAddShow">新增下级</van-button>
    </div>
    <div class="mid">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item,index) in levelList"
                           :key="index"
                           :title="item.name+'（'+item.user+'）'"
                           :name="item.id">
          P{{item.level}}级别代理，订单总数为{{item.orderNum}}条。
        </van-collapse-item>
      </van-collapse>
      <van-popup v-model:show="isAddShow"
                 position="bottom">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="username"
                       name="姓名"
                       label="姓名"
                       placeholder="请输入下级姓名" />
            <van-field v-model="username"
                       name="账号"
                       label="账号"
                       placeholder="请输入下级账号" />
            <van-field v-model="password"
                       name="密码"
                       label="密码"
                       placeholder="请输入下级密码" />
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
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      levelList: [],
      activeNames: [],
      isAddShow: false
    };
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
      this.$http.get("getLower.php", {
        uid: Number(this.data.id)
      }).then((res) => {
        if (res.code == 200) {
          this.levelList = res.data
          console.log(res.data);
        }
      })
    }
  }
}
</script>

<style scoped>
.top {
  padding: 0 10px;
}
.mid {
  margin-top: 15px;
}
</style>