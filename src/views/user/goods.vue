<template>
  <div class="home">
    <van-list v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-grid :column-num="1"
                :gutter="10">
        <van-grid-item v-for="(item,index) in list"
                       :key="index">
          <div class="box">
            <van-image width="80"
                       height="80"
                       :src="item.img" />
            <div class="bright">
              <div class="br1">
                {{item.title}}
              </div>
              <div class="br2">
                <span>佣金：{{item.comm}}元</span>
              </div>
              <div class="br3">
                <span>是否上架：</span>
                <van-switch v-model="item.isShow"
                            inactive-color="#eee"
                            @click="toClick(item.id,item.isShow)"
                            size="16px" />
              </div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data () {
    return {
      loading: false,
      finished: false,
      list: []
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    getGoods () {
      this.$http.get('getGoods.php', {
        uid: Number(this.data.id)
      }).then(res => {
        if (res.code == 200) {
          this.list = res.data
          this.finished = true
        }
      })
    },
    onLoad () {
      console.log(1);
    },
    toClick (id, val) {
      this.$http.post('upGoodsShow.php', {
        uid: Number(this.data.id),
        gid: Number(id),
        type: val ? 1 : 2
      }).then(res => {
        if (res.code == 200) {
          Toast.success(val ? '上架成功' : '下架成功');
        } else {
          Toast.fail('操作失败')
        }
        this.getOrder()
      })
    }
  }
}
</script>

<style scoped>
.home /deep/ .van-grid-item__content {
  padding: 8px;
}
.box {
  width: 100%;
  display: flex;
}
.bright {
  flex: 1;
  padding-left: 10px;
}
.br1 {
  height: 36px;
  line-height: 18px;
  margin-bottom: 4px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.br2 {
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  color: rgb(205, 0, 0);
}
.br3 {
  font-size: 12px;
  height: 16px;
  margin-top: 4px;
  display: flex;
  align-items: center;
}
</style>