<!--  -->
<template>
  <div ref='chart' class='container'></div>
</template>

<script>
import echarts from 'echarts'
export default {
    props: {
        optionData: {
            default: () => {
                return {}
            },
            required: true
        },
        // 数据是否加载完毕, 完成后再开始图形渲染
        IsInitData: {
            default: () => {
                return false
            },
            required: true
        }
    },
    data () {
        return {
        }
    },
    methods: {
        initChart (container, option) {
            if (this.IsInitData) {
                const myChart = echarts.init(container)
                myChart.setOption(option)
            }
        }
    },
    mounted () {
        this.initChart(this.$refs.chart, this.optionData)
    },
    watch: {
        IsInitData () {
            this.initChart(this.$refs.chart, this.optionData)
        }
    }
}

</script>
<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>
