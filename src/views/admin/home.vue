<template>
  <div class="home">
    <div class="box">
      <van-grid :gutter="10">
        <van-grid-item icon="bag-o"
                       @click="toPage('AdminGoods')"
                       text="商品管理" />
        <van-grid-item icon="friends-o"
                       @click="toPage('AdminLower')"
                       text="下级管理" />
        <van-grid-item icon="todo-list-o"
                       @click="toPage('AdminOrder')"
                       text="订单管理" />
        <van-grid-item icon="cluster-o"
                       @click="toPage('AdminLevel')"
                       text="级别管理" />
        <van-grid-item icon="chart-trending-o"
                       @click="toPage('AdminEarnings')"
                       text="收益管理" />
        <van-grid-item icon="shop-o"
                       @click="toPage('Store')"
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
  created () {
  },
  methods: {
    toPage (name) {
      let nopageList = ['AdminEarnings', 'Store'];
      if (nopageList.includes(name)) return Toast.fail('开发中...')
      this.$router.push({
        name: name
      })
    }
  }
}
</script>

<style scoped>
</style>
