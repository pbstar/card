<template>
  <div class="home">
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in orderList"
                         :key="index"
                         :title="item.name"
                         :name="item.id">
        <template #title>
          <div class="box">
            <div class="btop">
              <span>订单编号：{{item.time}}{{item.id}}</span>
              <div>
                <span style="color:rgb(220, 0, 0)">{{item.state==1?'待审核':(item.state==2?'已发货':(item.state==3?'已驳回':(item.state==1?'待结算':'已结算')))}}</span>
                <span v-show="item.stateText">（{{item.stateText}}）</span>
              </div>
            </div>
            <div class="bmid">{{item.title}}</div>
            <div class="bbot">
              <span>{{formatDate(item.time)}}</span>
              <span style="color:rgb(235, 196, 4)">佣金：{{item.comm}}元</span>
            </div>
          </div>
        </template>
        <div class="box2">
          <p>姓名：{{item.name}}</p>
          <p>手机号：{{item.tel}}</p>
          <p>身份证号：{{item.idcard}}</p>
          <p>地址：{{item.address}}</p>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderList: [],
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
    this.getOrder()
  },
  methods: {
    getOrder () {
      this.$http.get("getOrder.php", {
        uid: Number(this.data.id)
      }).then((res) => {
        if (res.code == 200) {
          this.orderList = res.data
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
    }
  }
}
</script>

<style scoped>
.tip {
  margin: 10px;
  font-size: 14px;
  color: #222;
}
.btop {
  font-size: 12px;
  color: #888;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}
.bmid {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 85vw;
}
.bbot {
  font-size: 12px;
  color: #888;
  display: flex;
  justify-content: space-between;
}
.box2 {
  font-size: 12px;
  line-height: 20px;
}
</style>