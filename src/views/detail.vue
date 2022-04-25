<template>
  <div class="home">
    <van-nav-bar title="详情"
                 fixed
                 left-arrow
                 @click-left="onClickRight" />
    <div class="body"
         v-if="info">
      <img :src="info.img"
           class="bimg"
           alt="">
      <van-form @submit="onSubmit">
        <h5 class="btitle">商品信息</h5>
        <van-cell-group inset>
          <van-field :model-value="info.title"
                     label="套餐类型"
                     label-width="60"
                     readonly />
        </van-cell-group>
        <h5 class="btitle">实名信息</h5>
        <van-cell-group inset>
          <van-field v-model="name"
                     label="姓名"
                     label-width="60"
                     placeholder="请输入姓名" />
          <van-field v-model="idcard"
                     label="身份证号"
                     label-width="60"
                     placeholder="请输入身份证号" />
        </van-cell-group>
        <h5 class="btitle">收货信息</h5>
        <van-cell-group inset>
          <van-field v-model="tel"
                     label="手机号"
                     label-width="60"
                     placeholder="请输入手机号" />
          <van-field v-model="area"
                     is-link
                     readonly
                     name="area"
                     label="地区"
                     label-width="60"
                     placeholder="请选择省市区"
                     @click="showArea = true" />
          <van-field v-model="address"
                     rows="2"
                     autosize
                     label="详细地址"
                     label-width="60"
                     type="textarea"
                     placeholder="请输入详细地址" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round
                      block
                      :plain="!(name&&idcard&&tel&&area&&address)"
                      type="primary"
                      @click="toSubmit"
                      native-type="submit">
            提交申请 免费领卡
          </van-button>
        </div>
      </van-form>
      <van-popup v-model:show="showArea"
                 position="bottom">
        <van-area :area-list="areaList"
                  @confirm="onConfirm"
                  @cancel="showArea = false" />
      </van-popup>
      <img :src="info.body"
           class="bbimg"
           alt="">
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
export default {
  data () {
    return {
      info: '',
      areaList: [],
      showArea: false,
      name: '',
      tel: '',
      idcard: '',
      area: '',
      area2: '',
      address: ''
    }
  },
  created () {
    this.areaList = areaList
    if (this.$route.query.gid) {
      this.getGoods()
    }
  },
  methods: {
    getGoods () {
      this.$http.get('getShopDetail.php', {
        id: Number(this.$route.query.gid)
      }).then(res => {
        if (res.code == 200) {
          this.info = res.data
        }
      })
    },
    onClickRight () {
      this.$router.push({
        name: 'Store',
        query: {
          uid: this.$route.query.uid
        }
      })
    },
    onConfirm (e) {
      this.area = e.map((item) => item.name).join(' / ');
      this.area2 = e.map((item) => item.name).join('');
      this.showArea = false
    },
    toSubmit () {
      if (this.name == "")
        return Toast.fail('姓名未填写')
      if (this.idcard == "")
        return Toast.fail('身份证未填写')
      if (this.tel == "")
        return Toast.fail('手机号未填写')
      if (this.area2 == "")
        return Toast.fail('地区未选择')
      if (this.address == "")
        return Toast.fail('详细地址未填')
      this.$http.post("setShopOrder.php", {
        uid: Number(this.$route.query.uid),
        gid: Number(this.$route.query.gid),
        name: this.name,
        tel: this.tel,
        idcard: this.idcard,
        area: this.area2,
        address: this.address,
      }).then((res) => {
        if (res.code == 200) {
          Toast.success('提交成功')
          this.$router.push({
            name: 'Store'
          })
        } else {
          Toast.fail('提交失败')
        }
      });
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
  padding: 46px 0 10px;
}
.bimg,
.bbimg {
  width: 100vw;
}
.btitle {
  line-height: 30px;
  margin: 10px 16px 0;
  color: #1989fa;
}
</style>