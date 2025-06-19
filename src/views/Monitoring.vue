<template>
    <div class="monitoring-page">
      <h2 class="title">新讯运维平台监控演示</h2>
      <div class="charts">
        <div ref="connectionChart" class="chart"></div>
        <div ref="tablespaceChart" class="chart"></div>
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
        ]
      }
    },
    mounted() {
      this.initCharts()
    },
    methods: {
      initCharts() {
        const connectionChart = echarts.init(this.$refs.connectionChart, 'dark')
        connectionChart.setOption({
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
  
        const tablespaceChart = echarts.init(this.$refs.tablespaceChart, 'dark')
        tablespaceChart.setOption({
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
  }
  
  .chart {
    width: 48%;
    height: 300px;
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