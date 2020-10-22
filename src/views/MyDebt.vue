<!--  -->
<template>
  <div class="my-debt">
    <div class="my-debt-title">我的债行</div>
    <div class="my-debt-list">
      <div class="public-tabs">
        <el-tabs v-model="activeTabs" @tab-click="() => null">
          <el-tab-pane
            :label="item.SelectName"
            :name="item.SelectName"
            :id="item.id"
            v-for="item in SelectOption"
            :key="item.SelectName"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="my-debt-list-search">
        <div class="my-debt-list-search-form">
          <el-form ref="form">
            <el-form-item>
              <span>债权人/债务人:</span>
              <el-input v-model="SelectForm.SearchName"></el-input>
            </el-form-item>
            <el-form-item>
              <span>录入编号:</span>
              <el-input v-model="SelectForm.ReportNum"></el-input>
            </el-form-item>
            <el-form-item placeholder="审核状态">
              <span>审核状态:</span>
              <el-select v-model="SelectForm.AuditState">
                <el-option label="全部" value></el-option>
                <el-option label="待审核" value="0"></el-option>
                <el-option label="审核通过" value="2"></el-option>
                <el-option label="审核驳回" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <span>时间:</span>
                <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择开始日期"
                    :picker-options="pickerOptions"
                    v-model="TimeSelect.TimeStart"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span class="my-debt-list-search-time-select-separator">—</span>
                <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择结束日期"
                    :picker-options="pickerOptions"
                    v-model="TimeSelect.TimeEnd"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button class='button-search' @click="searchTbaleData()">搜索</el-button>
                <el-button @click="GoAddReportForm" class='button-add' v-show="roleId === '7992691295821774848'">新增录入</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="my-debt-list-content">
        <!-- 正常显示模板 -->
        <div class="my-debt-list-content-title">
          <span>序号</span>
          <span>债事信息</span>
          <span>债权处理次数</span>
          <span>债权处理编号</span>
          <span>债权处理金额</span>
          <span>提交时间</span>
          <span>审核时间</span>
          <span>审批内容</span>
          <span>审核阶段</span>
          <span>审核状态</span>
          <span>操作</span>
        </div>
        <div class="my-debt-list-content-tab">
          <div
            class="my-debt-list-content-tab-item"
            v-for="(item, index) in MyDebtMsg"
            :key="index"
          >
            <span>{{ index + 1 }}</span>
            <div>
              <ul>
                <li>录入编号: {{ item.reportNo }}</li>
                <li>债事人: {{ item.debtName }}</li>
                <li>相对人数: {{ item.busRelativeCount }}</li>
                <li>录入人: {{ item.inputName }}</li>
                <li>推荐人: {{ item.recommendName }}</li>
              </ul>
            </div>
            <span>{{ item.resolveCount ? item.resolveCount : '/' }}</span>
            <span>{{ item.resolveNum ? item.resolveNum : '/' }}</span>
            <span>{{ item.cumulativeSum ? item.cumulativeSum : '/' }}</span>
            <div>
              <span>{{ item.submitDate ? item.submitDate : '/' }}</span>
            </div>
            <div>
              <span>{{ item.checkDate ? item.checkDate : '/' }}</span>
            </div>
            <div>
              <span>{{ item.checkReason ? item.checkReason : '/' }}</span>
            </div>
            <div>
              <span>{{
                item.stage === '1'
                  ? '录入阶段'
                  : item.stage === '2'
                  ? '调解阶段'
                  : item.stage === '3'
                  ? '债权处理阶段'
                  : item.stage === '3'
                  ? '债权处理阶段'
                  : item.stage === '4'
                  ? '资产处理阶段'
                  : '/'
              }}</span>
            </div>
            <div>
              <span
                :class="[
                  item.status === '2' || item.status === '5'
                    ? 'pass'
                    : item.status === '1' || item.status === '6'
                    ? 'unpass'
                    : 'hassubmit',
                ]"
                v-if="item.stage === '1'"
                >{{
                  item.status === '0'
                    ? '录入数据未审核'
                    : item.status === '1'
                    ? '录入数据审核未通过'
                    : item.status === '2'
                    ? '录入数据审核通过'
                    : item.status === '3'
                    ? ' 请缴费'
                    : item.status === '4'
                    ? '财务信息未审核'
                    : item.status === '5'
                    ? '进入调解阶段'
                    : item.status === '6'
                    ? '财务信息审核未通过'
                    : '/'
                }}</span
              >
            </div>
            <span>
              <button
                @click.stop="GoCivilMediaForm(index)"
                v-show="item.stage === '2' && item.status=== '5' && roleId === '7992691295821774848'"
              >
                调解
              </button>
              <button
                @click="GoInvestigation(index)"
                v-show="
                  item.status === '2' &&
                  item.stage === '1' &&
                  roleId === '7992691295821774848'
                "
              >
                暨尽调协议
              </button>
              <button
                @click="GoUnlockApplyForm(index)"
                v-show="item.stage === '3' && roleId === '7992691295821774848'"
              >
                债权处理
              </button>
              <button type="button" @click="DownloadDocumnet(item)">
                下载
              </button>
              <button
                type="button"
                v-show="item.status === '2' || item.status === '4'"
              >
                查看
              </button>
              <button
                v-if="(item.status === '1' || item.status === '') && roleId === '7992691295821774848'"
                @click="EditMsg(index)"
              >
                编辑
              </button>
            </span>
          </div>
        </div>

        <div style="text-align: right; margin-top: 25px">
          <el-pagination
            background
            @current-change="searchTbaleData"
            layout="prev, pager, next"
            :total="tablePage.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="my-debt-pop-download">
      <el-dialog title="下载" :visible.sync="dialogTableVisible">
        <el-table :data="gridData" stripe>
          <el-table-column type='index' property="Order" label="序号"></el-table-column>
          <el-table-column property="docName" label="文件名"></el-table-column>
          <el-table-column property="docType" label="类型"></el-table-column>
          <el-table-column width="247" label="操作">
            <template slot-scope="scope">
                <button class='my-debt-pop-download-button1'>查看</button>
                <!-- @click="Download(scope.$index, scope.row)" -->
                <button class='my-debt-pop-download-button2' @click="Download(scope.$index, scope.row)">下载</button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分页器结构数据源
      bgc: true,
      activeTabs: '全部',
      roleId: window.sessionStorage.getItem('roleId'),
      //表格分页
      tablePage: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      // 选项卡
      SelectOption: [
        {
          SelectName: '全部',
          id: '',
          isSelect: true,
        },
        {
          SelectName: '待审核',
          id: '1',
          isSelect: false,
        },
        {
          SelectName: '审核通过',
          id: '2',
          isSelect: false,
        },
        {
          SelectName: '审核驳回',
          id: '3',
          isSelect: false,
        },
      ],
      // 调解信息列表数据源
      MyDebtMsg: [],
      // 确定选用正常模板还是多选模板
      isNormal: false,
      // 是否显示相对人面板
      IsShowRelativePage: true,
      TimeSelect: {
        TimeStart: '',
        TimeEnd: '',
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      // 下载弹出窗的数据源
      gridData: [],
      dialogTableVisible: false,
      // 选择表单的数据源
      SelectForm: {
        // 查询人名
        SearchName: '',
        // 审核状态
        AuditState: '',
        // 选择相对人
        Relevant: '',
        // 录入编号
        ReportNum: '',
      },
    }
  },
  methods: {
    EnterContract() {
      this.$router.push({
        path: '/Assignment',
        query: { reportId: this.MyDebtMsg[index].reportId },
      })
    },
    // 前往新增报备
    GoAddReportForm() {
      this.$router.push({ path: '/AddReportForm' })
    },
    // 前往解锁申请界面
    GoUnlockApplyForm(index) {
      this.$router.push({
        path: '/UnlockApplyForm',
        query: { reportId: this.MyDebtMsg[index].reportId },
      })
    },
    // 前往民事调解界面
    GoCivilMediaForm(index) {
      this.$router.push({
        path: '/CivilMediaForm',
        query: { reportId: this.MyDebtMsg[index].reportId },
      })
    },
    GoInvestigation(index) {
      this.$router.push({
        path: '/Investigation',
        query: { reportId: this.MyDebtMsg[index].reportId },
      })
    },
    SelectRelative() {
      // window.sessionStorage.setItem('reportId', this.MyDebtMsg[index].reportId)
      this.$router.push({ path: '/ExamineReportForm' })
    },
    CloseSelectRelative() {
      this.IsShowRelativePage = false
    },
    EditMsg(index) {
      if (
        this.MyDebtMsg[index].status === '1' ||
        this.MyDebtMsg[index].status === ''
      ) {
        this.$router.push({
          path: '/EditReport',
          query: { reportId: this.MyDebtMsg[index].reportId },
        })
      }
    },
    // 搜索表格数据
    async searchTbaleData(page) {
      this.tablePage.pageNum = page || 1
      const formData = new FormData()
      const DataList = {
        companyType: window.sessionStorage.getItem('companyType'),
        comId: window.sessionStorage.getItem('companyId'),
        debtName: this.SelectForm.SearchName,
        status: this.SelectForm.AuditState,
        beginDate: this.TimeSelect.TimeStart,
        endDate: this.TimeSelect.TimeEnd,
        reportNo: this.SelectForm.ReportNum,
      }
      const queryData = Object.assign(DataList, this.tablePage)
      for (const key in queryData) {
        formData.append(key, queryData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busReportController/selectDebtInfos',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.MyDebtMsg = result.data.list
      this.tablePage.total = result.data.total
      console.log(this.MyDebtMsg)
    },
    async AddDate() {
      let nowDate = new Date()
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      this.TimeSelect.TimeEnd = date.year + '-' + date.month + '-' + date.date
      let nowDateTime = nowDate - 3600 * 1000 * 24 * 7
      nowDate.setTime(nowDateTime)
      date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      this.TimeSelect.TimeStart = date.year + '-' + date.month + '-' + date.date
    },
    async DownloadDocumnet (item) {
        const formData = new FormData()
        formData.append('reportId', item.reportId)
        formData.append('docType', '1')
        const { data: result } = await this.$http({
            method: 'post',
            data: formData,
            url: '/api/api/pubDocController/queryDoc',
        })
        this.gridData = result.data
        this.dialogTableVisible = true
    },
    async Download (index, row) {
        const formData = new FormData()
        formData.append('docId', row.docId)
        const { data: result } = await this.$http({
            method: 'post',
            data: formData,
            url: '/api/api/BusElectron/getBusElectronDoc'
        })
        let aLink = document.createElement("a")
        aLink.style.display = "none"
        if (result.data.slice(0,5) === '/root') {
            aLink.href = result.data
            console.log(aLink.href)
            return this.$message.error('正在下载未盖章文件')
        } else {
            aLink.href = result.data
        }
        aLink.setAttribute("download", row.docName)
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink) //下载完成移除元素
    }
  },
  created() {   
    this.AddDate()
    this.searchTbaleData()
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.my-debt {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;
  &-title {
    height: px2rem(12);
    line-height: px2rem(12);
    font-size: px2rem(4);
    color: #fc7f89;
    margin: 0 px2rem(4);
  }

  &-list {
    height: 100%;
    background-color: #ffffff;
    margin: 0 px2rem(4);
    padding: px2rem(4);
    &-search {
      display: flex;
      align-items: center;
      height: px2rem(16);

      &-form {
        display: flex;
        height: px2rem(14);
        line-height: px2rem(14);
        margin-left: px2rem(2);
        .el-form {
          display: flex;
          height: 100%;
          align-items: center;
          margin-bottom: 0;
          .el-form-item {
            display: flex;
            align-items: center;
            height: px2rem(10);
            line-height: px2rem(10);
            span {
              flex-shrink: 0;
              font-size: px2rem(3.2);
              display: inline-block;
              margin: 0 5px;
            }
            .el-date-editor{
                width: 170px;
            }
            .button-search {
                padding: 8px 15px;
                background-color: #616789;
                color: #fff;
                margin-left: 10px;
            }
            .el-input {
                width: 170px;
            }
            .el-select {
                width: 170px;
            }
            .button-add {
                padding: 10px 15px;
                background-color: #fc7f89;
                color: #fff;
            }
          }
        }
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      &-title {
        display: flex;
        height: px2rem(8);
        span {
          height: px2rem(8);
          line-height: px2rem(8);
          font-size: px2rem(3.2);
          background-color: #616789;
          flex: 2.1;
          text-align: center;
          color: #fff;
          display: inline-block;
          box-sizing: border-box;
          border-left: 0.5px solid #fff;
          border-right: 0.5px solid #fff;
        }
        :nth-child(1) {
          flex: 1;
        }
        :nth-child(2) {
          flex: 5;
        }
        :nth-child(8),
        :nth-child(4) {
          flex: 3.5;
        }
        :nth-child(3),
        :nth-child(5) {
          flex: 2.5;
        }
        :nth-child(9) {
          flex: 2.8;
        }
        :nth-child(10) {
          flex: 3;
        }
        :last-child {
          flex: 6;
        }
      }

      &-tab {
        display: flex;
        flex-direction: column;
        div:nth-child(odd) {
          display: flex;
          height: px2rem(28);
          line-height: px2rem(28);
          background-color: #fff;
          text-align: center;
          font-size: 10px;
          .pass {
            color: #17c67a !important;
          }
          .unpass {
            color: #ff0000 !important;
          }
          .hassubmit {
            color: #272a39 !important;
          }
          span {
            font-size: px2rem(2.8);
            flex: 2.1;
            text-align: center;
            color: #000;
            display: inline-block;
            margin: 0 0.5px;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2) {
            flex: 5;
            ul {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: px2rem(5) 0;
              background-color: #fff;
            }
            li {
              flex: 1;
              height: px2rem(4);
              line-height: px2rem(4);
              border: none;
              padding: none;
            }
          }
          :nth-child(8),
          :nth-child(4) {
            flex: 3.5;
            border: 1px solid #fff;
            background-color: #fff;
            ul {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: px2rem(5) 0;
              background-color: #fff;
            }
            li {
              flex: 1;
              height: px2rem(2);
              line-height: px2rem(2);
              border: none;
              padding: none;
              font-size: 10px;
              color: #4699ff;
            }
          }
          :nth-child(3),
          :nth-child(5) {
            flex: 2.5;
          }
          :nth-child(6),:nth-child(7) {
            flex: 2.1;
            background-color: #fff;
            span {
              text-align: center;
            }
          }
          :nth-child(9) {
            flex: 2.8;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              margin: 0 px2rem(3);
              height: px2rem(3);
              line-height: px2rem(3);
            }
          }
          :nth-child(10) {
            flex: 3;
            margin: 0 auto;
            background: #fff;
          }
          :nth-child(11) {
            flex: 6;
            margin: 0 auto;
            button {
              font-size: px2rem(3);
              color: #fff;
              border: none;
              border-radius: px2rem(1);
              margin: 0 px2rem(0.8);
              padding: px2rem(1.2) px2rem(3);
            }
            button:nth-child(1) {
              background-color: #ad94e2;
            }
            button:nth-child(2) {
              background-color: #ecc87f;
            }
            button:nth-child(3) {
              background-color: #616789;
            }
            button:nth-child(4) {
              background-color: #b3bcf2;
            }
            button:nth-child(5),
            button:nth-child(6),
            button:nth-child(7) {
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(even) {
          display: flex;
          height: px2rem(28);
          line-height: px2rem(28);
          background-color: #e0e3f8;
          text-align: center;
          font-size: 10px;
          .pass {
            color: #17c67a !important;
          }
          .unpass {
            color: #ff0000 !important;
          }
          .hassubmit {
            color: #272a39 !important;
          }
          span {
            font-size: px2rem(2.8);
            flex: 2.1;
            text-align: center;
            color: #000;
            display: inline-block;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2) {
            flex: 5;
            ul {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: px2rem(5) 0;
            }
            li {
              flex: 1;
              height: px2rem(4);
              line-height: px2rem(4);
              border: none;
              padding: none;
            }
          }
          :nth-child(8),
          :nth-child(4) {
            flex: 3.5;
            border: 1px solid #e0e3f8;
            ul {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: px2rem(5) 0;
            }
            li {
              flex: 1;
              height: px2rem(2);
              line-height: px2rem(2);
              border: none;
              padding: none;
              color: #4699ff;
            }
          }
          :nth-child(3),
          :nth-child(5) {
            flex: 2.5;
          }
          :nth-child(6),:nth-child(7) {
            flex: 2.1;
            background-color: #e0e3f8;
            span {
              text-align: center;
            }
          }
          :nth-child(9) {
            flex: 2.8;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e0e3f8;
            span {
              margin: 0 px2rem(3);
              height: px2rem(3);
              line-height: px2rem(3);
            }
            .pass {
              color: #17c67a !important;
            }
            .unpass {
              color: #ff0000 !important;
            }
            .hassubmit {
              color: #272a39 !important;
            }
          }
          :nth-child(10) {
            flex: 3;
            margin: 0 auto;
            background: #e0e3f8;
          }
          :nth-child(11) {
            flex: 6;
            button {
              font-size: px2rem(3);
              color: #fff;
              border: none;
              border-radius: px2rem(1);
              margin: 0 px2rem(0.8);
              padding: px2rem(1.2) px2rem(3);
            }
            button:nth-child(1) {
              background-color: #ad94e2;
            }
            button:nth-child(2) {
              background-color: #ecc87f;
            }
            button:nth-child(3) {
              background-color: #616789;
            }
            button:nth-child(4) {
              background-color: #b3bcf2;
            }
            button:nth-child(5),
            button:nth-child(6),
            button:nth-child(7) {
              background-color: #fc7f89;
            }
          }
        }
      }
    }
  }

  &-pop-select-relative {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    &-box {
      position: absolute;
      background-color: #ffffff;
      width: px2rem(100);
      height: px2rem(45);
      top: 45%;
      left: 45%;
      transform: translate(-50%, -50%);
      border-radius: px2rem(2);
      &-header {
        height: px2rem(10);
        background-color: #616789;
        display: flex;
        justify-content: space-between;
        font-size: px2rem(3.5);
        align-items: center;
        padding: 0 px2rem(4);
        box-sizing: border-box;
        color: #fff;
        img {
          width: px2rem(3);
          height: px2rem(3);
        }
      }
      &-body {
        margin: px2rem(4);
        display: flex;
        align-items: center;
        font-size: px2rem(4);
        &-item {
          display: flex;
          align-items: center;

          input {
          }
          label {
            margin-left: px2rem(2);
          }
          .radio_type:checked {
            color: '';
          }
        }
      }
      &-footer {
        display: flex;
        justify-content: space-around;
      }
    }
  }
  &-pop-download {
    button{
        border: none;
        padding: px2rem(1) px2rem(2.5);
        margin: 0 px2rem(3);
        border-radius: px2rem(1);
        color: #fff;
        font-size: px2rem(3.5);
    }
    &-button1 {
        background-color: #ad94e2;
    }
    &-button2 {
        background-color: #b3bcf2;
    }
  }
}
</style>
