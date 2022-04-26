<template>
  <div class="home">
    <div class="box">
      <van-grid :gutter="10">
        <van-grid-item icon="bag-o"
                       @click="toPage('UserGoods')"
                       text="商品管理" />
        <van-grid-item icon="friends-o"
                       @click="toPage('UserLower')"
                       text="下级管理" />
        <van-grid-item icon="todo-list-o"
                       @click="toPage('UserOrder')"
                       text="订单管理" />
        <van-grid-item icon="cluster-o"
                       @click="toPage('UserLevel')"
                       text="级别管理" />
        <van-grid-item icon="chart-trending-o"
                       @click="toPage('UserEarnings')"
                       text="收益管理" />
        <van-grid-item icon="shop-o"
                       @click="toStore()"
                       text="店铺中心" />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created () {
  },
  methods: {
    toPage (name) {
      let nopageList = ['UserEarnings'];
      if (nopageList.includes(name)) return Toast.fail('开发中...')
      this.$router.push({
        name: name
      })
    },
    toStore () {
      this.$router.push({
        name: 'Store',
        query: {
          uid: this.data.id
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
