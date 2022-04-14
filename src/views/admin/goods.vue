<template>
  <div class="home">
    <van-list v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-grid :column-num="1"
                :gutter="10">
        <van-grid-item v-for="value in list"
                       :key="value">
          <div class="box">
            <van-image width="80"
                       height="80"
                       src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            <div class="bright">
              <div class="br1">
                标题
              </div>
              <div class="br2">
                <span>佣金：{{value}}</span>
              </div>
              <div class="br3">
                <van-switch v-model="checked"
                            inactive-color="#eee"
                            size="20px" />
              </div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      finished: false,
      list: 10
    }
  },
  created () {
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
    toClear () {
      localStorage.clear()
      this.$router.push({
        name: 'Login'
      })
    },
    toPage (name) {
      this.$router.push({
        name: name
      })
    },
    onLoad () {
      console.log(1);
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  display: flex;
}
.bright {
  flex: 1;
}
.br1 {
  height: 36px;
  line-height: 18px;
  margin-bottom: 4px;
  font-size: 14px;
}
.br2 {
  height: 18px;
  line-height: 18px;
  margin-bottom: 2px;
  font-size: 13px;
}
</style>