<!--  -->
<template>
  <div class="debt-chain">
    <div class="debt-chain-title">债事链</div>
    <div class="debt-chain-search">
      <span>请输入债权人姓名</span>
      <input
        type="text"
        placeholder="请输入查询人姓名"
        class="debt-chain-search-form"
        v-model="PersonIdCard"
      />
      <button
        type="button"
        class="debt-chain-search-button"
        @click="GetDebtChain"
      >
        搜索
      </button>
    </div>
    <template> </template>
    <div class="debt-chain-content">
      <span class="debt-chain-content-title">债事链</span>
      <!-- 无数据时显示 -->
      <template v-if="!HasData">
        <div class="debt-chain-content-no-data">暂无数据</div>
      </template>
      <!-- 存在数据时显示 -->
      <template v-else>
        <div class="debt-chain-content-data">
          <div class="debt-chain-content-data-container">
            <echarts
              :optionData="RelationshipOption"
              :IsInitData="true"
            ></echarts>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Echarts from '@/views/currency/Echarts.vue'
export default {
  data() {
    return {
      HasData: false,
      PersonIdCard: '',
      // 人物关系图数据源
      RelationshipOption: {
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 600,
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 15,
            },
            dataZoom: false,
            // 移入动画
            hoverAnimation: false,
            silent: true,
            nodes: [
              {
                name: '角色名',
                x: 100,
                y: 100,
                symbolSize: 90,
                itemStyle: {
                  color: '#616789',
                  borderWidth: 5,
                  borderColor: '#CBD1F6',
                },
              },
              {
                name: '债事人1',
                x: 110,
                y: 95,
                symbolSize: 80,
                itemStyle: {
                  color: '#616789',
                },
              },
              {
                name: '债事人2',
                x: 110,
                y: 100,
                symbolSize: 80,
                itemStyle: {
                  color: '#616789',
                },
              },
              {
                name: '相对人1',
                x: 110,
                y: 105,
                symbolSize: 80,
                itemStyle: {
                  color: '#FC7F89',
                },
              },
              {
                name: '相对人2',
                x: 120,
                y: 90,
                symbolSize: 75,
                itemStyle: {
                  color: '#FC7F89',
                },
              },
              {
                name: '相对人3',
                x: 120,
                y: 95,
                symbolSize: 75,
                itemStyle: {
                  color: '#616789',
                },
              },
            ],
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [2, 10],
                label: {
                  color: '#000000',
                  show: true,
                  formatter: '债事人 50000',
                },
              },
              {
                source: 0,
                target: 2,
                symbolSize: [2, 10],
                label: {
                  color: '#000000',
                  show: true,
                  formatter: '债事人 50000',
                },
              },
              {
                source: 3,
                target: 0,
                symbolSize: [2, 10],
                label: {
                  color: '#000000',
                  show: true,
                  formatter: '相对人 50000',
                },
                lineStyle: {
                  color: '#AD94E2',
                },
              },
              {
                source: 4,
                target: 1,
                symbolSize: [2, 10],
                label: {
                  color: '#000000',
                  show: true,
                  formatter: '相对人 50000',
                },
                lineStyle: {
                  color: '#AD94E2',
                },
              },
              {
                source: 1,
                target: 5,
                symbolSize: [2, 10],
                label: {
                  color: '#000000',
                  show: true,
                  formatter: '相对人 50000',
                },
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              color: '#FC7F89',
            },
            left: 100,
          },
        ],
      },
    }
  },
  methods: {
    async GetDebtChain() {
      const formData = new FormData()
      formData.append('personIdCad', this.PersonIdCard)
      const { data: result } = await this.$http({
        method: 'POST',
        url: '/api/api/busReportController/queryListChain',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(result)
      // 设定债事链 样式初始值
      // const X1 = 100, Y1 = 100
      // RelationshipOption.series
      // for(let key in result ) {
      // }
      // 债事人默认样式
      // 相对人默认样式
      this.HasData = true
    },
  },
  components: {
    Echarts,
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.debt-chain {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;
  &-title {
    height: px2rem(10);
    line-height: px2rem(10);
    font-size: px2rem(4);
    color: #fc7f89;
    margin: 0 px2rem(4);
  }

  &-search {
    margin: 0 px2rem(4);
    background-color: #fff;
    border-radius: px2rem(2);
    display: flex;
    align-items: center;
    height: px2rem(16);
    span {
      font-size: px2rem(4);
      margin-left: px2rem(4);
    }
    &-form {
      margin: 0 px2rem(4);
      height: px2rem(8);
      width: px2rem(50);
      padding-left: px2rem(2);
      border-radius: px2rem(2);
      border: 1px solid #e9f0f5;
    }

    &-button {
      width: px2rem(16);
      height: px2rem(8);
      border-radius: px2rem(2);
      font-size: px2rem(3.5);
      border: none;
      background-color: #616789;
      color: #fff;
    }
  }

  &-content {
    margin: px2rem(4);
    padding: px2rem(4);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span {
      font-size: px2rem(3.5);
      margin-bottom: px2rem(4);
    }
    &-no-data {
      font-size: px2rem(4);
      text-align: center;
      height: px2rem(20);
      line-height: px2rem(20);
      background-color: #e9f0f5;
      color: #9faab3;
    }
    &-data {
      background-color: #e9f0f5;
      font-size: px2rem(3.8);
      box-sizing: border-box;
      width: 100%;
      padding-bottom: px2rfem(10);
      height: px2rem(110);
      border-radius: px2rem(2);
      &-container {
        margin-left: px2rem(8);
        width: px2rem(245);
        height: px2rem(105);
      }
    }
  }
}
</style>
