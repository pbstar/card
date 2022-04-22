<template>
  <div class="home">
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in levelList"
                         :key="index"
                         :title="item.name"
                         :name="item.id">
        {{item.name}}级别代理，返佣比例为{{item.ratio}}%。
      </van-collapse-item>
    </van-collapse>
    <div class="tip">注：返佣比例为在你的佣金的基础的百分比。例如，电信北梦卡，你的佣金是50元，你的P1代理的佣金为50*10%=5元，也就是你赚取50-5=45元。</div>
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
  created () {
    this.getLevel()
  },
  methods: {
    getLevel () {
      this.$http.get("getLevel.php").then((res) => {
        if (res.code == 200) {
          this.levelList = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.tip {
  margin: 10px;
  font-size: 13px;
  color: #222;
  line-height: 20px;
}
</style>