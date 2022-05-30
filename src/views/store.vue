<template>
  <div class="home">
    <van-nav-bar title="店铺中心"
                 fixed
                 right-text="订单"
                 @click-right="onClickRight" />
    <div class="body">
      <van-grid :gutter="10"
                :column-num="2">
        <van-grid-item v-for="(item,index) in list"
                       :key="index">
          <div class="box"
               @click="toDetail(item.id)">
            <img :src="item.img"
                 alt="">
            <div class="btitle">{{item.title}}</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <van-empty v-show="list.length==0"
               description="暂无商品" />
  </div>
</template>

<script>
// import { Toast } from 'vant';
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    if (this.$route.query.uid) {
      this.getGoods()
    }
  },
  methods: {
    getGoods () {
      this.$http.get('getGoods.php', {
        uid: Number(this.$route.query.uid)
      }).then(res => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].isShow) this.list.push(res.data[i])
          }
        }
      })
    },
    toOrder () {
      this.$router.push({
        name: 'Order',
        query: {
          uid: this.$route.query.uid
        }
      })
    },
    toDetail (id) {
      this.$router.push({
        name: 'Detail',
        query: {
          uid: this.$route.query.uid,
          gid: id
        }
      })
    },
    onClickRight () {
      //   Toast.fail('开发中...')
      this.toOrder()
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100%;
  background-color: #eee;
}
.body {
  padding-top: 58px;
}
.body :deep() .van-grid-item__content {
  padding: 8px;
}
.box {
  display: flex;
  flex-direction: column;
}
.box img {
  width: 100%;
  height: 41vw;
  margin-bottom: 8px;
}
.btitle {
  height: 40px;
  line-height: 20px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>