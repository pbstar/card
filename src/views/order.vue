<template>
  <div class="home">
    <van-search v-model="tel"
                show-action
                class="top"
                placeholder="请输入手机号"
                @search="onSearch">
      <template #left>
        <van-icon name="arrow-left"
                  style="margin-right:5px;margin-left:-5px"
                  @click="toStore"
                  size="22" />
      </template>
      <template #action>
        <div @click="getOrder">搜索</div>
      </template>
    </van-search>
    <van-grid :column-num="1"
              class="mid"
              :gutter="10">
      <van-grid-item v-for="(item,index) in list"
                     :key="index">
        <div class="box">
          <van-image width="60"
                     height="60"
                     :src="item.img" />
          <div class="bright">
            <div class="br1"><span class="leb">订单编号：</span>{{item.time}}{{item.id}}</div>
            <div class="br2"><span class="leb">套餐类型：</span>{{item.title}}</div>
            <div class="br4"><span class="leb">姓名：</span>{{item.name}}</div>
            <div class="br4"><span class="leb">身份证号：</span>{{item.idcard}}</div>
            <div class="br4"><span class="leb">手机号：</span>{{item.tel}}</div>
            <div class="br4"><span class="leb">地址：</span>{{item.address}}</div>
            <div class="br4"><span class="leb">订单状态：</span>
              <span style="color:rgb(220, 0, 0)">{{item.state==1?'待审核':(item.state==2?'已发货':(item.state==3?'已驳回':(item.state==1?'待结算':'已结算')))}}</span>
              <span v-show="item.stateText">（{{item.stateText}}）</span>
            </div>
            <div class="br3">{{formatDate(item.time)}}</div>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data () {
    return {
      list: [],
      tel: ''
    }
  },
  methods: {
    getOrder () {
      if (!this.tel) return Toast.fail('请输入手机号');
      this.$http.get('getOrderForTel.php', {
        tel: this.tel
      }).then(res => {
        if (res.code == 200) {
          this.list = res.data
          console.log(res.data);
        }
      })
    },
    formatDate (now) {
      if (now.length != 10) return
      now = new Date(now * 1000)
      var year = now.getFullYear();
      var month = this.addzoer(now.getMonth() + 1);
      var date = this.addzoer(now.getDate());
      var hour = this.addzoer(now.getHours());
      var minute = this.addzoer(now.getMinutes());
      var second = this.addzoer(now.getSeconds());
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },
    addzoer (e) {
      if (e < 10) return '0' + e
      else return e
    },
    toStore () {
      this.$router.push({
        name: 'Store',
        query: {
          uid: this.$route.query.uid
        }
      })
    },
  }
}
</script>

<style scoped>
.home {
  min-height: 100%;
  background-color: #eee;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}
.mid {
  padding-top: 64px;
  padding-bottom: 20px;
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
  font-size: 12px;
  color: #888;
  line-height: 19px;
  border-bottom: 1px solid #eee;
  padding-bottom: 3px;
  margin-bottom: 3px;
}
.br2 {
  max-height: 36px;
  line-height: 18px;
  margin: 2px 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.br3 {
  font-size: 12px;
  color: #888;
  line-height: 19px;
  border-top: 1px solid #eee;
  padding-top: 3px;
  margin-top: 3px;
}
.br4 {
  font-size: 12px;
  line-height: 18px;
  margin: 2px 0;
}
.leb {
  font-weight: 800;
  width: 60px;
  display: inline-block;
}
</style>