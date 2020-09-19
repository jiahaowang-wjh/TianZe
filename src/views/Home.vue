<!--  -->
<template>
  <div class='home'>
      <div class='home-header'>
            <div class='home-header-title'>首页</div>
            <div class='home-header-button'>
                <el-button v-for='(item,index) in buttonData' :key='index' :class="'bgc'+index" @click='Shortcut(item.path)'>{{item.title}}</el-button>
            </div>
      </div>

      <div class='home-charts'>
          <!-- 第一排图表 -->
          <div class='home-charts-first-row'>
              <div class='home-charts-first-row-chart1'>
                  <Echarts :optionData='option1' :IsInitData='IsInitData'></Echarts>
              </div>
              <div class='home-charts-first-row-chart2'>
                  <Echarts :optionData='option2' :IsInitData='IsInitData'></Echarts>
              </div>
          </div>
          <!-- 第二排图表 -->
          <div class='home-charts-second-row'>
              <div class='home-charts-second-row-chart3'>
                  <Echarts :optionData='option3' :IsInitData='IsInitData'></Echarts>
              </div>
              <div class='home-charts-second-row-chart4'>
                  <Echarts :optionData='option4' :IsInitData='IsInitData'></Echarts>
              </div>
              <div class='home-charts-second-row-chart5'>
                  <Echarts :optionData='option5' :IsInitData='IsInitData'></Echarts>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Echarts from '@c/currency/Echarts.vue'
import echarts from 'echarts'
export default {
    data () {
        return {
            buttonData: [
                {
                    title: '+新增录入',
                    path: 'AddReportForm'
                },
                {
                    title: '财务审查',
                    path: 'PaymentVoucher'
                },
                {
                    title: '录入信息',
                    path: 'ReportInfo'
                },
                {
                    title: '调解信息',
                    path: 'CivilMedia'
                },
                {
                    title: '债权处理',
                    path: 'UnlockApply'
                }
            ],
            // 图表1数据源
            option1: {
                title: {
                    text: '录入信息',
                    textStyle: {
                        fontSize: 16
                    }
                },
                xAxis: {
                    data: [],
                    color: '#62678A',
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 10
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    textStyle: {
                        fontSize: 14
                    },
                    confine: true
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        },
                        fontSize: 10
                    },
                    type: 'value',
                    nameTextStyle: {
                        fontSize: 8
                    },
                    min: 0,
                    splitNumber: 9,
                    boundaryGap: [0.2, 0.2]
                },
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {
                                        offset: 0, color: '#A898CD'
                                    },
                                    {
                                        offset: 0.5, color: '#837FAA'
                                    },
                                    {
                                        offset: 1, color: '#616789'
                                    }
                                ]
                            )
                        },
                        barCategoryGap: '80%',
                        data: [],
                        // 条纹形背景色
                        markArea: {
                            silent: true,
                            data: [
                                [
                                    {
                                        y: '15%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '24.375%'
                                    }
                                ],
                                [
                                    {
                                        y: '24.375%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '33.75%'
                                    }
                                ],
                                [
                                    {
                                        y: '33.75%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '43.125%'
                                    }
                                ],
                                [
                                    {
                                        y: '43.125%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '52.5%'
                                    }
                                ],
                                [
                                    {
                                        y: '52.5%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '61.875%'
                                    }
                                ],
                                [
                                    {
                                        y: '61.875%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '71.25%'
                                    }
                                ],
                                [
                                    {
                                        y: '71.25%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '80.625%'
                                    }
                                ],
                                [
                                    {
                                        y: '80.625%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '90%'
                                    }
                                ]
                            ]
                        },
                        label: {
                            show: true,
                            fontSize: 10,
                            position: 'top',
                            color: '#616789',
                            offset: [0, 3]
                        }
                    }
                ],
                grid: {
                    left: '6%',
                    right: '2%',
                    bottom: '10%',
                    top: '15%'
                }
            },
            // 图表2数据源
            option2: {
                xAxis: {
                    type: 'category',
                    data: ['6月01日', '6月02日', '6月03日', '6月04日', '6月05日', '6月06日', '6月07日', '6月08日', '6月09日', '6月10日'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        fontSize: 10
                    },
                    axisPointer: {
                        show: true,
                        type: 'line',
                        label: {
                            show: false
                        },
                        snap: true,
                        lineStyle: {
                            color: '#D2D0E8'
                        }
                    }
                },
                title: {
                    text: '调解信息',
                    textStyle: {
                        fontSize: 16
                    }
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        },
                        fontSize: 10
                    },
                    type: 'value',
                    nameTextStyle: {
                        fontSize: 8
                    },
                    min: 0,
                    splitNumber: 9,
                    boundaryGap: [0.2, 0.2]
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    textStyle: {
                        fontSize: 14
                    },
                    confine: true
                },
                series: [
                    {
                        data: [40, 60, 100, 90, 70, 120, 130, 50, 80, 30],
                        type: 'line',
                        lineStyle: {
                            color: '#7D7AA3',
                            width: 1
                        },
                        symbolSize: 3,
                        symbolColor: '#7D7AA3',
                        showSymbol: true,
                        color: '#7D7AA3',
                        textStyle: {
                            color: '#7D7AA3',
                            fontSize: '17'
                        },
                        animation: false,
                        // 条纹形背景色
                        markArea: {
                            silent: true,
                            data: [
                                [
                                    {
                                        y: '15%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '24.375%'
                                    }
                                ],
                                [
                                    {
                                        y: '24.375%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '33.75%'
                                    }
                                ],
                                [
                                    {
                                        y: '33.75%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '43.125%'
                                    }
                                ],
                                [
                                    {
                                        y: '43.125%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '52.5%'
                                    }
                                ],
                                [
                                    {
                                        y: '52.5%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '61.875%'
                                    }
                                ],
                                [
                                    {
                                        y: '61.875%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '71.25%'
                                    }
                                ],
                                [
                                    {
                                        y: '71.25%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '80.625%'
                                    }
                                ],
                                [
                                    {
                                        y: '80.625%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '90%'
                                    }
                                ]
                            ]
                        },
                        label: {
                            show: true,
                            fontSize: 10,
                            position: 'top',
                            color: '#616789',
                            offset: [0, 3]
                        }
                    }
                ],
                grid: {
                    left: '6%',
                    right: '2%',
                    bottom: '10%',
                    top: '15%'
                }
            },
            // 图表3数据源
            option3: {
                title: {
                    text: '债权处理',
                    textStyle: {
                        fontSize: 16
                    }
                },
                tooltip: {
                    textStyle: {
                        fontSize: 14
                    }
                },
                grid: {
                    left: '1%',
                    right: '2%',
                    bottom: '3%',
                    top: '14%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: 'false',
                    max: 500
                },
                yAxis: {
                    type: 'category',
                    data: ['12月12日', '6月9日', '6月8日', '6月7日', '6月6日', '6月5日', '6月4日', '6月3日', '6月2日', '6月1日'],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 12
                    }
                },
                series: [
                    {
                        type: 'bar',
                        data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
                        barGap: '-100%',
                        barCategoryGap: '50%',
                        silent: true,
                        itemStyle: {
                            color: '#E9F0F5',
                            barBorderRadius: [0, 5, 5, 0]
                        }
                    },
                    {
                        name: '2011年',
                        type: 'bar',
                        data: [156, 92, 142, 44, 155, 77, 133, 43, 145, 200],
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                1, 0, 0, 0,
                                [
                                    {
                                        offset: 0, color: '#A898CD'
                                    },
                                    {
                                        offset: 0.5, color: '#817EA8'
                                    },
                                    {
                                        offset: 1, color: '#616789'
                                    }
                                ]
                            ),
                            barBorderRadius: [0, 5, 5, 0] // （顺时针左上，右上，右下，左下）
                        },
                        barCategoryGap: '50%',
                        label: {
                            show: true,
                            position: 'right',
                            padding: [2, 0, 0, 0],
                            color: '#616789',
                            fontSize: 12
                        }
                    }
                ]
            },
            // 图表4数据源
            option4: {
                title: {
                    text: '资产评估',
                    textStyle: {
                        fontSize: 16
                    }
                },
                xAxis: {
                    data: ['6月01日', '6月02日', '6月03日', '6月04日', '6月05日', '6月06日', '6月07日'],
                    color: '#62678A',
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 9
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    textStyle: {
                        fontSize: 14
                    },
                    confine: true
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        },
                        fontSize: 10
                    },
                    type: 'value',
                    nameTextStyle: {
                        fontSize: 10
                    },
                    min: 0,
                    splitNumber: 9,
                    boundaryGap: [0.2, 0.2]
                },
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {
                                        offset: 0, color: '#A999CE'
                                    },
                                    {
                                        offset: 0.5, color: '#837FAA'
                                    },
                                    {
                                        offset: 1, color: '#616789'
                                    }
                                ]
                            )
                        },
                        barCategoryGap: '60%',
                        data: [40, 90, 70, 130, 50, 80, 30],
                        // 条纹形背景色
                        markArea: {
                            silent: true,
                            data: [
                                [
                                    {
                                        y: '15%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '24.375%'
                                    }
                                ],
                                [
                                    {
                                        y: '24.375%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '33.75%'
                                    }
                                ],
                                [
                                    {
                                        y: '33.75%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '43.125%'
                                    }
                                ],
                                [
                                    {
                                        y: '43.125%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '52.5%'
                                    }
                                ],
                                [
                                    {
                                        y: '52.5%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '61.875%'
                                    }
                                ],
                                [
                                    {
                                        y: '61.875%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '71.25%'
                                    }
                                ],
                                [
                                    {
                                        y: '71.25%',
                                        itemStyle: {
                                            color: '#F7F8FD'
                                        }
                                    },
                                    {
                                        y: '80.625%'
                                    }
                                ],
                                [
                                    {
                                        y: '80.625%',
                                        itemStyle: {
                                            color: '#ECEEFC'
                                        }
                                    },
                                    {
                                        y: '90%'
                                    }
                                ]
                            ]
                        },
                        label: {
                            show: true,
                            fontSize: 12,
                            position: 'top',
                            color: '#616789',
                            offset: [0, 3]
                        }
                    }
                ],
                grid: {
                    left: '10%',
                    right: '2%',
                    bottom: '10%',
                    top: '15%'
                }
            },
            // 图表5数据源
            option5: {
                title: {
                    text: '债行信息',
                    textStyle: {
                        fontSize: 16
                    }
                },
                tooltip: {
                    textStyle: {
                        fontSize: 14
                    }
                },
                grid: {
                    left: '1%',
                    right: '2%',
                    bottom: '3%',
                    top: '14%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: 'false',
                    max: 500
                },
                yAxis: {
                    type: 'category',
                    data: ['12月12日', '6月9日', '6月8日', '6月7日', '6月6日', '6月5日', '6月4日', '6月3日', '6月2日', '6月1日'],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 12
                    }
                },
                series: [
                    {
                        type: 'bar',
                        data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
                        barGap: '-100%',
                        barCategoryGap: '50%',
                        silent: true,
                        itemStyle: {
                            color: '#E9F0F5',
                            barBorderRadius: [0, 5, 5, 0]
                        }
                    },
                    {
                        name: '2011年',
                        type: 'bar',
                        data: [156, 92, 142, 44, 155, 77, 133, 43, 145, 200],
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                1, 0, 0, 0,
                                [
                                    {
                                        offset: 0, color: '#A898CD'
                                    },
                                    {
                                        offset: 0.5, color: '#817EA8'
                                    },
                                    {
                                        offset: 1, color: '#616789'
                                    }
                                ]
                            ),
                            barBorderRadius: [0, 5, 5, 0] // （顺时针左上，右上，右下，左下）
                        },
                        barCategoryGap: '50%',
                        label: {
                            show: true,
                            position: 'right',
                            padding: [2, 0, 0, 0],
                            color: '#616789',
                            fontSize: 12
                        }
                    }
                ]
            },
            // 是否开始渲染Echarts图形
            IsInitData: false
        }
    },
    components: {
        Echarts
    },
    methods: {
        Shortcut (path) {
            this.$emit('onChangeFragment', path)
        },
        // 获取相应信息
        async InitData () {
            // 报备信息
            const { data: ReportResult } = await this.$http({
                method: 'post',
                url: '/api/api/busReportController/selectDaysCount'
            })
            // 表单1数据处理
            this.option1.xAxis.data = ReportResult.data.map(v => v.days)
            this.option1.series[0].data = ReportResult.data.map(v => v.count)
            // 调解信息
            const { data: CivilResult } = await this.$http({
                method: 'post',
                url: '/api/api/busCivilController/selectDaysCount'
            })
            this.option2.xAxis.data = CivilResult.data.map(v => v.days)
            this.option2.series[0].data = CivilResult.data.map(v => v.count)
            // 解债申请
            const { data: UnlockResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubDebtController/selectDaysCount'
            })
            // 表单3数据处理
            this.option3.yAxis.data = UnlockResult.data.map(v => v.days)
            this.option3.series[1].data = UnlockResult.data.map(v => v.count)
            // 资产评估 Assess
            const { data: AssessResult } = await this.$http({
                method: 'post',
                url: '/api/api/busAssessmentController/selectDaysCount'
            })
            this.option4.xAxis.data = AssessResult.data.map(v => v.days)
            this.option4.series[0].data = AssessResult.data.map(v => v.count)
            // 债行信息
            const { data: DebtBankResult } = await this.$http({
                method: 'post',
                url: '/api/api/busReportController/selectDaysCount'
            })
            this.option5.yAxis.data = DebtBankResult.data.map(v => v.days)
            this.option5.series[1].data = DebtBankResult.data.map(v => v.count)
            // 开始渲染图形
            this.IsInitData = true
        }
    },
    created () {
        this.InitData()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.home {
    display: flex;
    flex-direction: column;
    background-color: #E9F0F5;
    overflow-x: hidden;
    overflow-y: overlay;
    &-header {
        padding: px2rem(4);
        height: px2rem(27);
        &-title {
            height: pxm2rem(4);
            line-height: px2rem(4);
            font-size: px2rem(4);
            color: #FC7F89;
        }
        &-button {
            margin-top: px2rem(4);
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #fff;
            padding: px2rem(2) px2rem(4);
            border-radius: px2rem(2);
            height: px2rem(20);
            .el-button {
                height: px2rem(14);
                width: px2rem(55);
                font-size: px2rem(3.5);
                color: #fff;
                font-weight: 600;
                border-radius: px2rem(2);
            }
            .bgc0 {
                background-color: #FC7F89
            }
            .bgc1 {
                background-color: #AD94E2
            }
            .bgc2 {
                background-color: #ECC87F
            }
            .bgc3 {
                background-color: #616789
            }
            .bgc4 {
                background-color: #B3BCF2
            }
        }
    }

    &-charts {
        height: px2rem(32);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin: 0 px2rem(4);
        height: 100%;
        &-first-row {
            display: flex;
            justify-content: space-between;
            margin: px2rem(4) 0;
            flex: 1;
            &-chart1 {
                flex:1;
                background-color: #fff;
                margin-right: px2rem(4);
                border-radius: px2rem(2);
            }
            &-chart2 {
                flex:1;
                background-color: #fff;
                border-radius: px2rem(2);
            }
        }
        &-second-row {
            display: flex;
            justify-content: space-between;
            flex: 1;
            margin-bottom: px2rem(4);
            &-chart3 {
                flex:1;
                border-radius: px2rem(2);
                margin-right: px2rem(4);
                background-color: #fff;
            }
            &-chart4 {
                flex:1;
                background-color: #fff;
                margin-right: px2rem(4);
                border-radius: px2rem(2);
            }
            &-chart5 {
                flex:1;
                background-color: #fff;
                border-radius: px2rem(2);
            }
        }
    }
}
</style>
