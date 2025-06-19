<template>
    <div class="monitoring-page">
      <h2 class="title">新讯运维平台监控演示</h2>
      <div class="charts">
        <div ref="connectionChart" class="chart"></div>
        <div ref="tablespaceChart" class="chart"></div>
        <div ref="cpuLoadChart" class="chart"></div>
        <div ref="cpuUsageChart" class="chart"></div>
        <div ref="trafficChart" class="chart"></div>
        <div ref="processChart" class="chart"></div>
      </div>
      <el-table :data="dbList" stripe class="dark-table" style="width: 100%">
        <el-table-column prop="name" label="数据库" width="120" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="connection" label="连接状态" width="100" />
        <el-table-column prop="listener" label="监听状态" width="100" />
        <el-table-column prop="instance" label="实例状态" width="100" />
        <el-table-column prop="startup" label="启停状态" width="100" />
        <el-table-column prop="tablespace" label="表空间" />
        <el-table-column prop="archivelog" label="归档日志" />
        <el-table-column prop="flashback" label="闪回空间" />
        <el-table-column prop="datafiles" label="数据文件" />
        <el-table-column prop="filesystem" label="文件系统" />
      </el-table>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts'
  export default {
    name: "MonitoringPage",
    data() {
      return {
        dbList: [
          {
            name: 'DB1',
            type: 'MySQL',
            connection: '正常',
            listener: '正常',
            instance: '运行中',
            startup: '在线',
            tablespace: '使用率 60%',
            archivelog: '未满',
            flashback: '可用',
            datafiles: '8',
            filesystem: '稳定'
          },
          {
            name: 'DB2',
            type: 'Oracle',
            connection: '正常',
            listener: '正常',
            instance: '运行中',
            startup: '在线',
            tablespace: '使用率 75%',
            archivelog: '未满',
            flashback: '可用',
            datafiles: '12',
            filesystem: '稳定'
          },
          {
            name: 'DB3',
            type: '达梦',
            connection: '正常',
            listener: '正常',
            instance: '运行中',
            startup: '在线',
            tablespace: '使用率 52%',
            archivelog: '未满',
            flashback: '可用',
            datafiles: '5',
            filesystem: '稳定'
          }
          ],
        connectionChart: null,
        tablespaceChart: null,
        cpuLoadChart: null,
        cpuUsageChart: null,
        trafficChart: null,
        processChart: null,
        timer: null
      }
    },
    mounted() {
      this.initCharts()
      this.timer = setInterval(this.updateCharts, 2000)
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    methods: {
      initCharts() {
        this.connectionChart = echarts.init(this.$refs.connectionChart, 'dark')
        this.tablespaceChart = echarts.init(this.$refs.tablespaceChart, 'dark')
        this.cpuLoadChart = echarts.init(this.$refs.cpuLoadChart, 'dark')
        this.cpuUsageChart = echarts.init(this.$refs.cpuUsageChart, 'dark')
        this.trafficChart = echarts.init(this.$refs.trafficChart, 'dark')
        this.processChart = echarts.init(this.$refs.processChart, 'dark')

        this.connectionChart.setOption({
          title: { text: '连接数', textStyle: { color: '#fff' } },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: this.dbList.map(d => d.name),
            axisLabel: { color: '#ccc' }
          },
          yAxis: {
            type: 'value',
            axisLabel: { color: '#ccc' }
          },
          series: [{
            type: 'bar',
            data: this.dbList.map(() => Math.round(Math.random() * 100)),
            itemStyle: { color: '#2f9bff' }
          }]
        })
  
        this.tablespaceChart.setOption({
          title: { text: '表空间使用率', textStyle: { color: '#fff' } },
          tooltip: { trigger: 'item' },
          legend: { textStyle: { color: '#ccc' } },
          series: [{
            type: 'pie',
            radius: '50%',
            data: this.dbList.map(db => ({
              name: db.name,
              value: parseInt(db.tablespace.replace(/[^0-9]/g, ''))
            }))
          }]
        })

        this.cpuLoadChart.setOption({
          title: { text: 'CPU负载', textStyle: { color: '#fff' } },
          series: [{
            type: 'gauge',
            progress: { show: true },
            detail: { formatter: '{value}%' },
            data: [{ value: Math.round(Math.random() * 100) }]
          }]
        })

        this.cpuUsageChart.setOption({
          title: { text: 'CPU使用率', textStyle: { color: '#fff' } },
          series: [{
            type: 'gauge',
            progress: { show: true },
            detail: { formatter: '{value}%' },
            data: [{ value: Math.round(Math.random() * 100) }]
          }]
        })

        const baseData = Array.from({ length: 6 }, (_, i) => i + 1)
        this.trafficChart.setOption({
          title: { text: '网络流量', textStyle: { color: '#fff' } },
          tooltip: {},
          legend: { data: ['流入', '流出'], textStyle: { color: '#ccc' } },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: baseData,
            axisLabel: { color: '#ccc' }
          },
          yAxis: { type: 'value', axisLabel: { color: '#ccc' } },
          series: [
            { name: '流入', type: 'line', data: baseData.map(() => Math.round(Math.random() * 100)) },
            { name: '流出', type: 'line', data: baseData.map(() => Math.round(Math.random() * 100)) }
          ]
        })

        this.processChart.setOption({
          title: { text: '进程数', textStyle: { color: '#fff' } },
          series: [{
            type: 'gauge',
            progress: { show: true },
            detail: { formatter: '{value}' },
            data: [{ value: Math.round(Math.random() * 100) }]
          }]
        })
      },
      updateCharts() {
        if (this.connectionChart) {
          this.connectionChart.setOption({
            series: [{ data: this.dbList.map(() => Math.round(Math.random() * 100)) }]
          })
        }
        if (this.tablespaceChart) {
          this.tablespaceChart.setOption({
            series: [{ data: this.dbList.map(db => ({ name: db.name, value: Math.round(Math.random() * 100) })) }]
          })
        }
        if (this.cpuLoadChart) {
          this.cpuLoadChart.setOption({
            series: [{ data: [{ value: Math.round(Math.random() * 100) }] }]
          })
        }
        if (this.cpuUsageChart) {
          this.cpuUsageChart.setOption({
            series: [{ data: [{ value: Math.round(Math.random() * 100) }] }]
          })
        }
        if (this.trafficChart) {
          const baseData = Array.from({ length: 6 }, (_, i) => i + 1)
          this.trafficChart.setOption({
            xAxis: { data: baseData },
            series: [
              { data: baseData.map(() => Math.round(Math.random() * 100)) },
              { data: baseData.map(() => Math.round(Math.random() * 100)) }
            ]
          })
        }
        if (this.processChart) {
          this.processChart.setOption({
            series: [{ data: [{ value: Math.round(Math.random() * 100) }] }]
          })
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .monitoring-page {
    padding: 20px;
    background: #1e1e1e;
    min-height: 100vh;
    color: #fff;
  }
  
  .charts {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .chart {
    width: 48%;
    height: 300px;
    margin-bottom: 20px;
  }
  
  .dark-table >>> .el-table,
  .dark-table >>> .el-table__header-wrapper,
  .dark-table >>> .el-table__body-wrapper {
    background-color: #2b2b2b;
    color: #fff;
  }
  
  .title {
    margin-bottom: 20px;
    color: #fff;
  }
  </style>