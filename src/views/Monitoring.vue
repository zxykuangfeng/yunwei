<template>
    <div class="monitoring-page">
      <h2 class="title">新讯运维平台监控演示</h2>
   
      <table class="custom-table">
      <thead>
        <tr>
          <th>数据库</th>
          <th>类型</th>
          <th>连接状态</th>
          <th>监听状态</th>
          <th>实例状态</th>
          <th>启停状态</th>
          <th>表空间</th>
          <th>归档日志</th>
          <th>闪回空间</th>
          <th>数据文件</th>
          <th>文件系统</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dbList" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.connection }}</td>
          <td>{{ item.listener }}</td>
          <td>{{ item.instance }}</td>
          <td>{{ item.startup }}</td>
          <td>{{ item.tablespace }}</td>
          <td>{{ item.archivelog }}</td>
          <td>{{ item.flashback }}</td>
          <td>{{ item.datafiles }}</td>
          <td>{{ item.filesystem }}</td>
        </tr>
      </tbody>
    </table>


      <div class="charts">
        <div ref="connectionChart" class="chart"></div>
        <div ref="tablespaceChart" class="chart"></div>
        <div ref="cpuLoadChart" class="chart"></div>
        <div ref="cpuUsageChart" class="chart"></div>
        <div ref="trafficChart" class="chart"></div>
        <div ref="processChart" class="chart"></div>
      </div>

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
        timer: null,
        connectionData: [30, 45, 60],
tablespaceData: [60, 75, 52],
cpuLoadValue: 40,
cpuUsageValue: 55,
processValue: 88,
trafficIn: [30, 35, 33, 32, 38, 36],
trafficOut: [50, 48, 52, 51, 49, 53]
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
        generateStableValue(prev, range = 5, min = 0, max = 100) {
  const delta = Math.floor(Math.random() * (range * 2 + 1)) - range // -range ~ +range
  let newValue = prev + delta
  if (newValue > max) newValue = max
  if (newValue < min) newValue = min
  return newValue
},
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
  // 连接数图表
  this.connectionData = this.connectionData.map(v => this.generateStableValue(v))
  if (this.connectionChart) {
    this.connectionChart.setOption({
      series: [{ data: this.connectionData }]
    })
  }

  // 表空间
  this.tablespaceData = this.tablespaceData.map(v => this.generateStableValue(v))
  if (this.tablespaceChart) {
    this.tablespaceChart.setOption({
      series: [{
        data: this.dbList.map((db, i) => ({
          name: db.name,
          value: this.tablespaceData[i]
        }))
      }]
    })
  }

  // CPU 负载
  this.cpuLoadValue = this.generateStableValue(this.cpuLoadValue)
  if (this.cpuLoadChart) {
    this.cpuLoadChart.setOption({
      series: [{ data: [{ value: this.cpuLoadValue }] }]
    })
  }

  // CPU 使用率
  this.cpuUsageValue = this.generateStableValue(this.cpuUsageValue)
  if (this.cpuUsageChart) {
    this.cpuUsageChart.setOption({
      series: [{ data: [{ value: this.cpuUsageValue }] }]
    })
  }

  // 网络流量
  this.trafficIn.push(this.generateStableValue(this.trafficIn[this.trafficIn.length - 1]))
  this.trafficIn.shift()
  this.trafficOut.push(this.generateStableValue(this.trafficOut[this.trafficOut.length - 1]))
  this.trafficOut.shift()
  if (this.trafficChart) {
    this.trafficChart.setOption({
      series: [
        { data: this.trafficIn },
        { data: this.trafficOut }
      ]
    })
  }

  // 进程数
  this.processValue = this.generateStableValue(this.processValue, 3, 50, 100)
  if (this.processChart) {
    this.processChart.setOption({
      series: [{ data: [{ value: this.processValue }] }]
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
  
  .title {
    margin-bottom: 20px;
    color: #fff;
  }
  </style>
<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  background-color: #2b2b2b;
  color: #fff;
  font-size: 14px;
  border: 1px solid #444;
}

.custom-table thead {
  background-color: #3a3a3a;
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #444;
}

.custom-table tbody tr:nth-child(odd) {
  background-color: #2f2f2f;
}

.custom-table tbody tr:hover {
  background-color: #404040;
}

.title {
  color: #fff;
  margin-bottom: 20px;
}
</style>
