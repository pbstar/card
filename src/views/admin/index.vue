<template>
  <div @click="istopRight=false">
    <div class="top">
      <div class="tleft">
梦辰号卡管理系统
      </div>
      <div class="tright">
        <span class="name"
              @click.stop="istopRight=!istopRight">小梦</span>
        <van-icon name="arrow-down"
                  @click.stop="istopRight=!istopRight"
                  v-show="!istopRight"
                  size="12" />
        <van-icon name="arrow-up"
                  @click.stop="istopRight=!istopRight"
                  v-show="istopRight"
                  size="12" />
        <van-icon name="play"
                  color="#fff"
                  v-show="istopRight"
                  class="trboxtop" />
        <div class="trbox"
             v-show="istopRight">
          <span style="border-bottom:1px solid #eee"
                @click="toPage('AdminUpPass')">修改密码</span>
          <span @click="toClear">退出登录</span>
        </div>
      </div>
    </div>
    <div class="mid">
      <div class="nav"
           v-show="pageText!='首页'">
        <van-icon name="wap-home"
                  style="margin-right:2px" />
        <span class="a"
              @click="toPage('AdminHome')">首页</span>
        <span class="slash">/</span>
        <span>{{pageText}}</span>
      </div>
      <div style="height:11px"
           v-show="pageText=='首页'"></div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      istopRight: false,
      pageText: '首页'
    }
  },
  watch: {
    $route: {
      handler () {
        let text = this.$route.name
        if (text == 'AdminHome') this.pageText = '首页'
        else if (text == 'AdminEarnings') this.pageText = '收益管理'
        else if (text == 'AdminGoods') this.pageText = '商品管理'
        else if (text == 'AdminLevel') this.pageText = '等级管理'
        else if (text == 'AdminLower') this.pageText = '下级管理'
        else if (text == 'AdminOrder') this.pageText = '订单管理'
        else if (text == 'AdminUpPass') this.pageText = '修改密码'
      },
      immediate: true,
      deep: true
    },
  },
  created () {
    let token = localStorage.getItem('token')
    if (token && Number(token) + 86400000 < Date.now()) {
      this.$router.push({
        name: 'Login'
      })
      return
    }
  },
  methods: {
    get () {
      this.$http.get('login.php', {
        user: Number(1234)
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
    }
  }
}
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #fff;
  padding: 0 10px;
  box-shadow: 0 1px 2px #b4b4b4;
}
.tleft{
  font-weight: 800;
  font-size: 15px;
}
.tright {
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
}
.tright .name {
  margin-right: 3px;
  font-size: 12px;
  color: #333;
}
.trbox {
  width: 60px;
  position: absolute;
  top: 58px;
  right: -4px;
  background-color: #fff;
  z-index: 200;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 25px;
  padding: 3px 3px;
  box-shadow: 0 1px 2px #c3c3c3;
}
.trboxtop {
  position: absolute;
  top: 48px;
  right: 15px;
  transform: rotate(-90deg);
  z-index: 201;
}
.mid {
  min-height: calc(100vh - 50px);
  background-color: #eee;
}
.nav {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 13px;
  color: #333;
}
.nav .a {
  font-weight: 800;
}
.nav .slash {
  margin: 0 3px;
}
</style>
