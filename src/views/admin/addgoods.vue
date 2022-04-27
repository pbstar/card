<template>
  <div class="home">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="name"
                   label-width="60"
                   label="标题"
                   placeholder="请输入商品标题" />
        <van-field v-model="user"
                   label-width="60"
                   label="头图地址"
                   placeholder="请输入头部图片地址" />
        <van-field v-model="pass"
                   label-width="60"
                   label="详图地址"
                   placeholder="请输入详细图片地址" />
        <van-field v-model="pass"
                   label-width="60"
                   label="佣金"
                   placeholder="请输入佣金金额" />

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
    }
  }
}
</script>

<style scoped>
</style>