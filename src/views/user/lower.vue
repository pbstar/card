<template>
  <div class="home">
    <div class="top">
      <van-button icon="plus"
                  size="small"
                  type="primary"
                  @click="toPage('UserAddLower')">新增下级</van-button>
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      levelList: [],
      activeNames: []
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
        }
      })
    },
    toPage (name) {
      this.$router.push({
        name: name
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