<template>
  <div @click="istopRight=false"
       class="home">
    <div class="top">
      <div class="tleft">
        <img src="/favicon.ico"
             alt="">
        <span>梦辰号卡管理系统</span>
      </div>
      <div class="tright">
        <span class="name"
              @click.stop="istopRight=!istopRight">{{data.name}}</span>
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
                @click="toPage('UserUpPass')">修改密码</span>
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
              @click="toPage('UserHome')">首页</span>
        <span class="slash"
              v-show="pageText2">/</span>
        <span class="a"
              v-show="pageText2"
              @click="toPage2()">{{pageText2}}</span>
        <span class="slash">/</span>
        <span>{{pageText}}</span>
      </div>
      <div style="height:11px"
           v-show="pageText=='首页'"></div>
      <router-view :data="data" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      istopRight: false,
      pageText: '首页',
      pageText2: '',
      data: ''
    }
  },
  watch: {
    $route: {
      handler () {
        let text = this.$route.name
        this.pageText2 = ''
        if (text == 'UserHome') this.pageText = '首页'
        else if (text == 'UserEarnings') this.pageText = '收益管理'
        else if (text == 'UserGoods') this.pageText = '商品管理'
        else if (text == 'UserLevel') this.pageText = '等级管理'
        else if (text == 'UserLower') this.pageText = '下级管理'
        else if (text == 'UserOrder') this.pageText = '订单管理'
        else if (text == 'UserUpPass') this.pageText = '修改密码'
        else if (text == 'UserAddLower') { this.pageText = '新增下级'; this.pageText2 = '下级管理' }
        else if (text == 'UserAdmin') this.pageText = '管理中心'
        else if (text == 'UserAdminAddgoods') { this.pageText = '新增商品'; this.pageText2 = '管理中心' }
      },
      immediate: true,
      deep: true
    },
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      if (Number(token) + 86400000 < Date.now()) {
        this.$router.push({
          name: 'Login'
        })
        return
      }
    } else {
      this.$router.push({
        name: 'Login'
      })
      return
    }
    let data = JSON.parse(localStorage.getItem('userData'))
    if (data) this.data = data
  },
  methods: {
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
    toPage2 () {
      if (this.pageText2 == '下级管理') this.toPage('UserLower')
      else if (this.pageText2 == '管理中心') this.toPage('UserAdmin')
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #001938;
  color: #fff;
  padding: 0 15px;
  box-shadow: 0 1px 2px #b4b4b4;
  z-index: 10;
}
.tleft {
  font-weight: 800;
  font-size: 15px;
  display: flex;
  align-items: center;
}
.tleft img {
  width: 20px;
  margin-right: 5px;
}
.tright {
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
}
.tright .name {
  margin-right: 3px;
  font-size: 13px;
  line-height: 14px;
}
.trbox {
  width: 60px;
  position: absolute;
  top: 45px;
  right: -4px;
  background-color: #fff;
  color: #333;
  z-index: 200;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 25px;
  padding: 5px 5px;
  box-shadow: 0 1px 2px #c3c3c3;
}
.trbox span {
  margin-top: 2px;
}
.trboxtop {
  position: absolute;
  top: 35px;
  right: 15px;
  transform: rotate(-90deg);
  z-index: 201;
}
.mid {
  flex: 1;
  background-color: #eee;
  padding-top: 50px;
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
