<!--  -->
<template>
  <div class='download'>
      <div class='download-title'>
          辅助债务信息
      </div>
      <div class='download-list'>
        <div class='download-list-search'>
            <span>输入债权人名称</span>
            <input type="text" placeholder="请输入想查的人的姓名" v-model='SearchForm.debtName'>
            <span>输入日期</span>
            <el-date-picker align="left" type="date" placeholder="请输入想查的日期" :picker-options="pickerOptions"  value-format="yyyy-MM-dd" v-model='SearchForm.time'></el-date-picker>
            <button @click='SearchData'>搜索</button>
            <button>下载表格</button>
        </div>
        <div class='download-list-content'>
            <div class='download-list-content-title'>
                <span>序号</span>
                <span>报备人姓名</span>
                <span>身份证号码</span>
                <span>电话</span>
                <span>类型</span>
                <span>相对人姓名</span>
                <span>金额</span>
            </div>
            <div class='download-list-content-tab'>
                <div class='download-list-content-tab-item' v-for='(item,index) in downloadMsg' :key='index'>
                    <span>{{index+1}}</span>
                    <span>{{item.debtName}}</span>
                    <span>{{item.idCard}}</span>
                    <span>{{item.priPhone ? item.priPhone : "/"}}</span>
                    <span>{{item.type === '1'?('债权人'):item.type === '2'?('债务人'):item.type === '3'?('债权债务人') : ''}}</span>
                    <span>{{item.personName ? item.personName : "/"}}</span>
                    <span>{{item.moeny ? item.moeny : "/"}}</span>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            // 分页器结构数据源
            bgc: true,
            queryInfo: {
                pageSize: 10
            },
            // 用户信息列表数据源
            downloadMsg: [],
            // 确定选用正常模板还是多选模板
            isNormal: true,
            SearchForm: {
                pageNum: '1',
                pageSize: '15',
                debtName: '',
                time: ''
            },
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [{
                    text: '今天',
                    onClick (picker) {
                        picker.$emit('pick', new Date())
                    }
                }, {
                    text: '昨天',
                    onClick (picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        picker.$emit('pick', date)
                    }
                }, {
                    text: '一周前',
                    onClick (picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', date)
                    }
                }]
            }
        }
    },
    methods: {
        async InitData () {
            const formData = new FormData()
            console.log(this.SearchForm)
            for (const key in this.SearchForm) {
                formData.append(key, this.SearchForm[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busRelativePersonController/selectDebtDow',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(result.data.list)
            this.downloadMsg = result.data.list
        },
        async SearchData () {
            this.InitData()
        }
    },
    created () {
        this.InitData()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.download {
    display: flex;
    flex-direction: column;
    background-color: #E9F0F5;
    height: 100%;
    width: 100%;
    &-title {
        height: px2rem(10);
        line-height: px2rem(10);
        font-size: px2rem(4);
        color: #FC7F89;
        margin: px2rem(1) px2rem(4);
    }
    &-list {
        height: px2rem(140);
        background-color: #fff;
        margin: 0 px2rem(4);
        padding: px2rem(4);

        &-search {
            height: px2rem(12);
            display: flex;
            align-items: center;
            font-size: px2rem(3.5);
            input {
                margin: 0 px2rem(4);
                border: 1px solid #E9F0F5;
                padding-left: px2rem(2);
                width: px2rem(40);
                height: px2rem(6);
                border-radius: px2rem(1);
            }
            button {
                color: #ffffff;
                border: none;
                margin: 0 px2rem(2);
                padding: px2rem(1) px2rem(4);
                border-radius: px2rem(1);
            }
            :nth-child(5) {
                background-color: #616789;
            }
            :nth-child(6) {
                background-color: #FC7F89;
            }
        }

        &-content {
            display: flex;
            flex-direction: column;
            &-title {
                display: flex;
                align-items: center;
                height: px2rem(8);
                span {
                    height: px2rem(8);
                    line-height: px2rem(8);
                    font-size: px2rem(3.5);
                    background-color: #616789;
                    flex:3;
                    text-align: center;
                    color:#fff;
                    border: 1px solid #fff;
                    display: inline-block;
                }
            }

            &-tab {
                display: flex;
                flex-direction: column;
                div:nth-child(odd) {
                    display: flex;
                    span {
                        flex: 3;
                        background-color: #fff;
                        height: px2rem(8);
                        line-height: px2rem(8);
                        font-size: px2rem(3.2);
                        flex:3;
                        text-align: center;
                        color:#000;
                        display: inline-block;

                        img {
                            width: px2rem(2.5);
                            height: px2rem(2.5)
                        }
                    }
                }
                div:nth-child(even) {
                    display: flex;
                    span {
                        flex: 3;
                        background-color: #E0E3F8;
                        height: px2rem(8);
                        line-height: px2rem(8);
                        font-size: px2rem(3.2);
                        flex:3;
                        text-align: center;
                        color:#000;
                        display: inline-block;
                        img {
                            width: px2rem(2.5);
                            height: px2rem(2.5)
                        }
                    }
                }
            }
        }
    }
}
</style>
