<template>
  <div class="app">
    <el-button type="primary" @click="gotoMonitoring">进入监控演示</el-button>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      searchText: '',
      scanning: false,
      qrCodeScanner: null
    }
  },
  methods: {
    gotoMonitoring() {
      this.$router.push({ name: 'Monitoring' })
    }
},

}
</script>

<style scoped>

</style>
