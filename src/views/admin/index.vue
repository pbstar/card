<template>
  <div class="home">
    <van-cell title="添加商品"
              @click="toAddgoods"
              is-link />
    <van-cell title="发送站内公告"
              @click="toMessage"
              is-link />
    <van-cell title="查看订单"
              is-link />
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
    toMessage () {
      Toast.fail('开发中！')
    },
    toAddgoods () {
      this.$router.push({
        name: 'UserAdminAddgoods'
      })
    }
  }
}
</script>

<style scoped>
</style>