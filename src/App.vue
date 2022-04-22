<template>
  <div style="height:100%">
    <router-view v-if="isMobile" />
    <Pcindex v-if="!isMobile" />
  </div>

</template>
<script>
import Pcindex from './components/pcindex.vue'
export default {
  data () {
    return {
      isMobile: false
    }
  },
  components: {
    Pcindex
  },
  created () {
    this.isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>