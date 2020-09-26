<!--  -->
<template>
  <div class="civil-media">
    <div class="civil-media-title">
      <span class="civil-media-title-go1">我的债行</span>
      <span class="civil-media-title-separator">/</span>
      <span class="civil-media-title-go2">调解审核</span>
    </div>
    <div class="civil-media-container">
      <div class="civil-media-container-form">
        <el-collapse>
          <!-- 调查报告 -->
          <el-collapse-item title="调解资料" name="1">
            <div class="civil-media-container-form-table-1-title" v-show="false">
              <span>序号</span>
              <span>录入号</span>
              <span>调解协议号</span>
              <span>债务人</span>
              <span>状态</span>
              <span>操作</span>
            </div>
            <div class="civil-media-container-form-table-1">
              <div
                class="civil-media-container-form-table-1-item"
                v-for="(item,index) in MediateMsg"
                :key="item.Id"
              >
                <span>{{index+1}}</span>
                <span>{{item.ReportNum}}</span>
                <span>{{item.AgreementNum}}</span>
                <span>{{item.Debtor}}</span>
                <span>{{item.ExamineStatus}}</span>
                <span>
                  <button>审核</button>
                </span>
              </div>
            </div>
            <div class="civil-media-container-form-submit"></div>
            <h3>调解审核</h3>
            <div>选择化解方式：双方化解</div>
            <h3>债权人信息</h3>
            <div class="civil-media-container-form-debtor-1">
              <div>
                甲方（债权人名称/姓名）：
                <input type="text" :disabled="true" :value="MediaUserMsg.debtName" />
              </div>
              <div>
                法定代表人/负责人：
                <input type="text" :disabled="true" :value="MediaUserMsg.debtLegalName" />
              </div>
              <div>
                身份证号码/信用代码：
                <input type="text" :disabled="true" :value="MediaUserMsg.debtIdCardCode" />
              </div>
            </div>
            <div class="civil-media-container-form-debtor-2">
              <div>
                所住地：：
                <input type="text" :disabled="true" :value="MediaUserMsg.debtAdd" />
              </div>
              <div>
                联系电话：
                <input type="text" :disabled="true" :value="MediaUserMsg.debtPhone" />
              </div>
              <div></div>
            </div>
            <h3>债务人信息</h3>
            <div class="civil-media-container-form-relative-1">
              <div>
                乙方（债务人名称/姓名）：
                <input type="text" :disabled="true" :value="MediaUserMsg.personalName" />
              </div>
              <div>
                法定代表人/负责人：
                <input
                  type="text"
                  :disabled="true"
                  :value="MediaUserMsg.personalLegalName"
                />
              </div>
              <div>
                身份证号码/信用代码：
                <input
                  type="text"
                  :disabled="true"
                  :value="MediaUserMsg.personalIdCardCode"
                />
              </div>
            </div>
            <div class="civil-media-container-form-relative-2">
              <div>
                所住地：
                <input type="text" :disabled="true" :value="MediaUserMsg.personalAdd" />
              </div>
              <div>
                联系电话：
                <input type="text" :disabled="true" :value="MediaUserMsg.personalPhone" />
              </div>
              <div></div>
            </div>
            <h3>担保人信息</h3>
            <div class="civil-media-container-form-new-guarantor">
              <!-- <button>新增担保人</button> -->
            </div>
            <!-- 表单2 担保人表单 -->
            <div class="civil-media-container-form-table-2-title">
              <span>序号</span>
              <span>单位类型</span>
              <span>担保人（姓名/企业名称）</span>
              <span>身份证号码/信用代码</span>
              <span>联系电话</span>
              <span>所住地</span>
              <span>操作</span>
            </div>
            <div class="civil-media-container-form-table-2">
              <div
                class="civil-media-container-form-table-2-item"
                v-for="(item,index) in GuarantorMsg"
                :key="index"
              >
                <span>{{index+1}}</span>
                <span>{{item.Type}}</span>
                <span>{{item.GuarantorName}}</span>
                <span>{{item.IDcard}}</span>
                <span>{{item.Phone}}</span>
                <span>{{item.Address}}</span>
              </div>
            </div>
            <h3>甲方、乙方、担保人共同对债权债务类型、本息的确认</h3>
            <div>
              债券债务类型:
              <label for="1">
                <input
                  type="radio"
                  name="debt-type"
                  id="1-1"
                  value="1-1"
                  :disabled="true"
                  v-model="civilType"
                />借款
              </label>

              <label for="2">
                <input
                  type="radio"
                  name="debt-type"
                  id="2"
                  :disabled="true"
                  :value="MediaData.civilType"
                />贷款
              </label>
              <label for="3">
                <input
                  type="radio"
                  name="debt-type"
                  id="3"
                  :disabled="true"
                  :value="MediaData.civilType"
                />工程款
              </label>
              <label for="4">
                <input
                  type="radio"
                  name="debt-type"
                  id="4"
                  :disabled="true"
                  :value="MediaData.civilType"
                />其他款项
              </label>
            </div>
            <h3>乙方尚欠甲方款项金额：</h3>
            <!-- 欠款金额 -->
            <div class="civil-media-container-form-own-amount">
              <div class="civil-media-container-form-own-amount-item-1">
                <span>
                  欠款总额（小写）：
                  <input type="text" :disabled="true" v-model="MediaData.amountTotal" />
                </span>
                <span>
                  欠款总额（大写）：
                  <input
                    type="text"
                    :disabled="true"
                    :value="MediaData.amountTotal | Uppercase"
                  />
                </span>
              </div>
              <div class="civil-media-container-form-own-amount-item">
                <span>
                  欠款总额中包含本金（小写）：
                  <input
                    type="text"
                    :disabled="true"
                    v-model="MediaData.amountPrincipal"
                  />
                </span>
                <span>
                  欠款总额中包含本金（大写）：
                  <input
                    type="text"
                    :disabled="true"
                    :value="MediaData.amountPrincipal | Uppercase"
                  />
                </span>
              </div>
              <div>
                <span>
                  欠款总额中包含利息（小写）：
                  <input
                    type="text"
                    :disabled="true"
                    v-model="MediaData.amountInterest"
                  />
                </span>
                <span>
                  欠款总额中包含利息（大写）：
                  <input
                    type="text"
                    :disabled="true"
                    :value="MediaData.amountInterest | Uppercase"
                  />
                </span>
              </div>
              <div>
                <span>
                  欠款总额中包含违约（小写）：
                  <input
                    type="text"
                    :disabled="true"
                    v-model="MediaData.amountBreach"
                  />
                </span>
                <span>
                  欠款总额中包含违约（大写）：
                  <input
                    type="text"
                    :disabled="true"
                    :value="MediaData.amountBreach | Uppercase"
                  />
                </span>
              </div>
            </div>
            <!-- 支付利息 -->
            <h3>乙方向甲方支付款利息：</h3>
            <div class="civil-media-container-form-interest">
              <div class="civil-media-container-form-interest-row1">
                <span>
                  约定月利率标准：
                  <input type="text" :disabled="true" v-model="MediaData.monthInterest" />
                </span>
                <span>
                  时间段：
                  <el-date-picker
                    :disabled="true"
                    align="left"
                    type="date"
                    placeholder="请选择开始日期"
                    :picker-options="pickerOptions"
                    v-model="MediaData.starDate"
                    value-format="yyyy-MM-dd hh-mm-ss"
                  ></el-date-picker>
                  <span class="civil-media-container-form-interest-row1-separator">—</span>
                  <el-date-picker
                    :disabled="true"
                    align="left"
                    type="date"
                    placeholder="请选择结束日期"
                    v-model="MediaData.endDate"
                    :picker-options="pickerOptions1"
                    value-format="yyyy-MM-dd hh-mm-ss"
                  ></el-date-picker>
                </span>
                <span>
                  利息：
                  <input type="text" :disabled="true" v-model="MediaData.interest" />
                </span>
              </div>
              <div class="civil-media-container-form-interest-row2">
                <span>
                  已支付利息：
                  <input type="text" :disabled="true" v-model="MediaData.interestPayment" />
                </span>
                <span>
                  违约截止时间：
                  <el-date-picker
                    :disabled="true"
                    align="left"
                    type="date"
                    placeholder="请选择结束日期"
                    v-model="MediaData.breachDate"
                    :picker-options="pickerOptions1"
                    value-format="yyyy-MM-dd hh-mm-ss"
                  ></el-date-picker>
                </span>
                <span>
                  已支付违约金额：
                  <input type="text" :disabled="true" v-model="MediaData.breachMoney" />
                </span>
              </div>
            </div>
            <!-- 担保人担保方式： -->
            <div>
              担保人担保方式：
              <label for="1">
                <input
                  type="radio"
                  name="debt-type"
                  id="1"
                  value="1"
                  :disabled="true"
                  v-model="MediaData.guaranteeMeth"
                />保证
              </label>
              <label for="2">
                <input
                  type="radio"
                  name="debt-type"
                  id="2"
                  value="2"
                  :disabled="true"
                  v-model="MediaData.guaranteeMeth"
                />质押
              </label>
              <label for="3">
                <input
                  type="radio"
                  name="debt-type"
                  id="3"
                  :disabled="true"
                  value="3"
                  v-model="MediaData.guaranteeMeth"
                />留置
              </label>
              <label for="4">
                <input
                  type="radio"
                  name="debt-type"
                  id="4"
                  :disabled="true"
                  value="4"
                  v-model="MediaData.guaranteeMeth"
                />定金
              </label>
            </div>
            <h3>甲方、乙方、担保人经协商一致约定信息</h3>
            <div class="civil-media-container-form-appoint">
              <div class="civil-media-container-form-appoint-row1">
                <span>
                  确认债权债务本息金额合计（小写）：
                  <input
                    type="text"
                    :disabled="true"
                    v-model="MediaData.interestAll"
                  />
                </span>
                <span>
                  确认债权债务本息金额合计（大写）：
                  <input
                    type="text"
                    :disabled="true"
                    :value="MediaData.interestAll | Uppercase"
                  />
                </span>
              </div>
              <div class="civil-media-container-form-appoint-row2">
                <span>
                  债事人自愿放弃的内容：
                  <input type="text" :disabled="true" v-model="MediaData.abandonContent" />
                </span>
                <span>
                  债务处理方式：
                  <el-select v-model="MediaData.treatmentMetho" placeholder="请选择" :disabled="true">
                    <el-option
                      v-for="item in handleTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>

                  <!-- <input
                    type="text"
                    :disabled="true"
                    :value="MediaData.treatmentMethod === '1' ? '（1）自行约定还款金额、还款时间、还款方式' : MediaData.treatmentMethod === '2' ? ('（2）共同委托第三方帮助处理') : MediaData.treatmentMethod === '3' ? ('（3）债权转让第三人')"
                  />-->
                </span>
                <span></span>
              </div>
            </div>
            <!-- <h3>选择调解员</h3>
                        <div class='civil-media-container-form-add-conciliator'>
                            <button>新增调解员</button>
            </div>-->
            <!-- 新增调解员表格 -->
            <!-- <div class='civil-media-container-form-table-3-title'>
                            <span>序号</span>
                            <span>民事调解员</span>
                            <span>操作</span>
                        </div>
                        <div class='civil-media-container-form-table-3'>
                            <div class='civil-media-container-form-table-3-item' v-for='(item,index) in ConciliatorMsg' :key='index'>
                                <span>{{index+1}}</span>
                                <span>{{item}}</span>
                                <span>
                                    <button>删除</button>
                                </span>
                            </div>
            </div>-->
            <!-- 上传凭证 -->
            <!-- <div class='civil-media-container-form-update-imgs'>
                            <span>上传凭证：</span>
                            <div class='civil-media-container-form-update-imgs-list'>
                                <img src="@imgs/home/baidu.png" alt="">
                                <img src="@imgs/home/baidu.png" alt="">
                                <img src="@imgs/home/baidu.png" alt="">
                                <img src="@imgs/home/baidu.png" alt="">
                            </div>
                            <button>点击上传</button>
            </div>-->
            <!-- 上传录音： -->
            <!-- <div class='civil-media-container-form-update-audio'>
                            <span>上传凭证：</span>
                            <div class='civil-media-container-form-update-audio-list'>
                                <span><img src="@imgs/home/audio.png" alt=""></span>
                                <span><img src="@imgs/home/audio.png" alt=""></span>
                                <span><img src="@imgs/home/audio.png" alt=""></span>
                                <span><img src="@imgs/home/audio.png" alt=""></span>
                            </div>
                            <button>点击上传</button>
            </div>-->
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="civil-media-check">
      <div class="civil-media-check-reason">
        <span>审批原因</span>
        <textarea maxlength="141" v-model="CommitApproveData.checkReason"></textarea>
      </div>
      <div class="civil-media-check-button">
        <button @click="RejectCheck">审核驳回</button>
        <button @click="PassCheck">审核通过</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否展示选择相对人列表
      IsPopSelectiveList: true,
      //         <!-- （1）。
      // （2）
      //                   （3）债权转让第三人。-->
      handleTypeList: [
        {
          label: '自行约定还款金额、还款时间、还款方式',
          value: '1',
        },
        {
          label: '共同委托第三方帮助处理。',
          value: '2',
        },
        {
          label: '债权转让第三人。',
          value: '3',
        },
      ],
      UserMsg: [
        {
          IsCoordinate: 'true',
          Type: 'debtor',
          Properties: 'person',
        },
      ],
      MediatorList: [
        {
          name: '民事调解员',
          value: '1',
        },
        {
          name: '债事处理专家',
          value: '2',
        },
        {
          name: '律师',
          value: '3',
        },
      ],
      IsSelect: false,
      RelativeMsg: [
        {
          IsCoordinate: 'true',
          Type: 'debtor',
          Properties: 'person',
        },
      ],
      MediateMsg: [
        // {
        //   Id: '1',
        //   ReportNum: 'Lzbb22020125',
        //   AgreementNum: '1232a121dss121',
        //   Debtor: '莫莫',
        //   ExamineStatus: '报备数据审核通过',
        // },
      ],
      // 担保人信息
      GuarantorMsg: [
        {
          Id: '1',
          Type: '类型1',
          GuarantorName: '默默',
          IDcard: '4212102122020210012',
          Phone: '12332123432',
          Address: '地址1',
        },
      ],
      // 相对人数据源
      RelativeList: [],
      // 确定选用正常模板还是多选模板
      isNormal: false,
      // 初始事件选择器
      TimeSelect: {
        TimeStart: '',
        TimeEnd: '',
        ClosingTime: '',
      },
      DebtTreatment: '',
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
      // 没有限制一定要之前时间
      pickerOptions1: {
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
      // 调解员信息
      ConciliatorMsg: ['调解员类型1', '调解员类型2'],
      // 新增民事调解信息源
      MediaData: {
        civilType: '1',
        guaranteeMeth: 'guaranteeMeth',
      },
      civilType: '1-1',
      // 相对人名称
      RelativeName: '',
      // 相对人ID
      relativePerId: '',
      // 获取返回的相对人、债事人信息
      MediaUserMsg: {},
      CommitApproveData: {
        civilId: '',
        status: '',
        checkReason: '',
      },
    }
  },
  created() {
    this.InitData()
  },
  methods: {
    // 选择调解员
    SelectMediator() {},
    // 调解信息初始化
    async InitData() {
      const { civilId, reportId, relativePerId } = this.$route.query
      this.civilId = civilId
      this.reportId = reportId
      this.relativePerId = relativePerId
      // 相对人信息初始化
      const formData = new FormData()
      formData.append('relativePerId', this.relativePerId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busRelativePersonController/selectByRelativePerId',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(result)
      this.MediaUserMsg = result.data

      // 民事调解信息初始化
      const MsgFormData = new FormData()
      MsgFormData.append('civilId', this.civilId)
      const { data: MsgResult } = await this.$http({
        method: 'post',
        url: '/api/api/busCivilController/selectByPrimaryKey',
        data: MsgFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      !MsgResult.data.treatmentMetho
        ? (MsgResult.data.treatmentMetho = '1')
        : ''
      this.MediaData = MsgResult.data

      // this.$set(this.MediaData, 'civilType', 1)
      this.$set(this.MediaData, 'guaranteeMeth', 1)
    },
    RejectCheck() {
      if (!this.CommitApproveData.checkReason)
        return this.$message.error('请先填写审核原因')
      this.UpdateCheckStatus('1')
      this.$emit('onChangeFragment', 'ReportInfo')
    },
    async PassCheck() {
      await this.UpdateCheckStatus('2')
      await this.$emit('onChangeFragment', 'ReportInfo')
      const StageUpdateformData = new FormData()
      StageUpdateformData.append('reportId', this.reportId)
      StageUpdateformData.append('stage', '3')
      this.$http({
        method: 'post',
        url: '/api/api/busReportController/updateDebtStage',
        data: StageUpdateformData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((StageUpdateResult) => {
        if (StageUpdateResult.data.resultCode !== '200')
          return this.$message.error(StageUpdateResult.data.resultMessage)
        this.$message.success('进入调解阶段')
        this.$router.push('/CivilMedia')
      })
    },
    // 调用报备状态更改接口
    async UpdateCheckStatus(status) {
      const formData = new FormData()
      this.CommitApproveData.civilId = this.civilId
      const CommitApproveData = this.CommitApproveData
      this.CommitApproveData.status = status
      for (const key in CommitApproveData) {
        formData.append(key, CommitApproveData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busCivilController/updateStatus',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(result)
      if (result.data !== '0' && result.resultCode === '200') {
        this.$message.success(result.resultMessage)
        this.$router.push('/CivilMedia')
      } else {
        this.$message.error('操作失败, 请重试')
      }
    },
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.civil-media {
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
    &-go1 {
      color: #616789;
    }
    &-separator {
      color: #616789;
    }
  }

  &-container {
    margin: px2rem(1) px2rem(4);
    &-form {
      border-radius: px2rem(2);
      background-color: #fff;
      padding: px2rem(2) px2rem(6);
      font-size: px2rem(3.2);
      input[type='radio'] {
        width: px2rem(4) !important;
        height: px2rem(4) !important;
        line-height: px2rem(4) !important;
        margin: px2rem(1) !important;
        vertical-align: middle;
        background-color: #fff;
      }
      input {
        border: 1px solid #e8eaec;
        border-radius: px2rem(1);
        height: px2rem(6);
        padding-left: px2rem(2);
        margin: px2rem(2);
      }
      input:disabled {
        background-color: #e0e3f8;
      }
      &-new {
        button {
          font-size: px2rem(3.5);
          border: none;
          background-color: #fc7f89;
          color: #fff;
          padding: px2rem(1) px2rem(2);
          border-radius: px2rem(1);
        }
      }
      // civil-media-container-form-table-1-item
      &-table-1-title {
        margin-top: px2rem(4);
        display: flex;
        height: px2rem(6) I;
        span {
          flex: 3;
          text-align: center;
          color: #fff;
          background-color: #616789;
          border: 0.5px solid #fff;
          box-sizing: border-box;
        }
        :nth-child(1) {
          flex: 1;
        }
      }
      &-table-1 {
        &-item {
          display: flex;
          justify-content: space-around;
          line-height: px2rem(7);
          span {
            flex: 3;
            text-align: center;
            border: 0.5px solid #fff;
            box-sizing: border-box;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(6) {
            button {
              flex: 1;
              font-size: px2rem(2);
              margin: px2rem(6);
              border: none;
              height: px2rem(5);
              line-height: px2rem(5);
              border-radius: px2rem(1);
              color: #fff;
              width: px2rem(12);
              margin: 0 px2rem(3);
            }
            :first-child {
              background-color: #616789;
            }
            :last-child {
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(odd) {
          background-color: #fff;
        }
        div:nth-child(even) {
          background-color: #e0e3f8;
          span {
            border: 0.5px solid #e0e3f8;
          }
        }
      }
      &-submit {
        text-align: center;
        margin-top: px2rem(6);
        button {
          font-size: px2rem(3.2);
          width: px2rem(50);
          height: px2rem(8);
          background-color: #616789;
          color: #fff;
          border: none;
          border-radius: px2rem(1);
        }
      }
      h3 {
        margin: px2rem(2) 0;
      }
      &-debtor-1 {
        display: flex;
        div {
          flex: 1;
        }
        :nth-child(1) {
          input {
            width: px2rem(50);
          }
        }
        :nth-child(2) {
          input {
            width: px2rem(60);
          }
        }
        :nth-child(3) {
          input {
            width: px2rem(58);
          }
        }
      }
      &-debtor-2 {
        display: flex;
        div {
          flex: 1;
        }
        :nth-child(1) {
          input {
            width: px2rem(73.7);
          }
        }
        :nth-child(2) {
          input {
            width: px2rem(74);
          }
        }
      }
      &-relative-1 {
        display: flex;
        div {
          flex: 1;
        }
        :nth-child(1) {
          input {
            width: px2rem(50);
          }
        }
        :nth-child(2) {
          input {
            width: px2rem(60);
          }
        }
        :nth-child(3) {
          input {
            width: px2rem(58);
          }
        }
      }
      &-relative-2 {
        display: flex;
        div {
          flex: 1;
        }
        :nth-child(1) {
          input {
            width: px2rem(73.7);
          }
        }
        :nth-child(2) {
          input {
            width: px2rem(74);
          }
        }
      }
      &-new-guarantor {
        button {
          border: none;
          font-size: px2rem(3.5);
          background-color: #616789;
          color: #fff;
          padding: px2rem(1) px2rem(2);
          border-radius: px2rem(1);
        }
      }
      &-table-2-title {
        margin-top: px2rem(4);
        display: flex;
        height: px2rem(6) I;
        span {
          text-align: center;
          color: #fff;
          background-color: #616789;
          border: 0.5px solid #fff;
          box-sizing: border-box;
        }
        :nth-child(1) {
          flex: 1.1;
        }
        :nth-child(2),
        :nth-child(5),
        :nth-child(6) {
          flex: 2;
        }
        :nth-child(3),
        :nth-child(4),
        :nth-child(7) {
          flex: 3;
        }
      }
      &-table-2 {
        &-item {
          display: flex;
          justify-content: space-around;
          line-height: px2rem(7);
          span {
            flex: 3;
            text-align: center;
            border: 0.5px solid #fff;
            box-sizing: border-box;
          }
          :nth-child(1) {
            flex: 1.1;
          }
          :nth-child(2),
          :nth-child(5),
          :nth-child(6) {
            flex: 2;
          }
          :nth-child(3),
          :nth-child(4),
          :nth-child(7) {
            flex: 3;
          }
          :nth-child(7) {
            button {
              font-size: px2rem(2);
              margin: px2rem(6);
              border: none;
              height: px2rem(5);
              line-height: px2rem(5);
              border-radius: px2rem(1);
              color: #fff;
              width: px2rem(12);
              margin: 0 px2rem(3);
            }
            :first-child {
              background-color: #616789;
            }
            :last-child {
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(odd) {
          background-color: #fff;
        }
        div:nth-child(even) {
          background-color: #e0e3f8;
          span {
            border: 0.5px solid #e0e3f8;
          }
        }
      }
      &-own-amount {
        div {
          display: flex;
          span:nth-child(1) {
            flex: 1;
            input {
              width: px2rem(45);
            }
          }
          span:nth-child(2) {
            flex: 2;
            input {
              width: px2rem(94);
            }
          }
        }
        div:nth-child(1) {
          display: flex;
          span:nth-child(1) {
            flex: 1;
            input {
              width: px2rem(61);
            }
          }
          span:nth-child(2) {
            flex: 2;
            input {
              width: px2rem(110);
            }
          }
        }
      }
      &-interest {
        &-row1 {
          display: flex;
          span {
            flex: 1;
          }
          span:nth-child(1) {
            input {
              width: px2rem(65);
            }
          }
          span:nth-child(3) {
            input {
              width: px2rem(80);
            }
          }
        }
        &-row2 {
          display: flex;
          span {
            flex: 1;
          }
          span:nth-child(1) {
            input {
              width: px2rem(71.3);
            }
          }
          span:nth-child(2) {
            input {
              width: px2rem(68.3);
            }
          }
          span:nth-child(3) {
            input {
              width: px2rem(64);
            }
          }
        }
      }
      &-appoint {
        &-row1 {
          display: flex;
          span:nth-child(1) {
            flex: 1;
            input {
              width: px2rem(36);
            }
          }
          span:nth-child(2) {
            flex: 2;
            input {
              width: px2rem(84.3);
            }
          }
        }
        &-row2 {
          display: flex;
          align-items: center;
          span:nth-child(1) {
            flex: 1;
            input {
              width: px2rem(55);
            }
          }
          span:nth-child(2) {
            flex: 2;
            .el-select {
              width: px2rem(74);
            }
          }
        }
      }
      &-add-conciliator {
        button {
          border: none;
          font-size: px2rem(3.5);
          background-color: #616789;
          color: #fff;
          padding: px2rem(1) px2rem(2);
          border-radius: px2rem(1);
        }
      }
      &-table-3-title {
        margin-top: px2rem(4);
        display: flex;
        height: px2rem(6) I;
        span {
          text-align: center;
          color: #fff;
          background-color: #616789;
          border: 0.5px solid #fff;
          box-sizing: border-box;
        }
        :nth-child(1) {
          flex: 1;
        }
        :nth-child(2) {
          flex: 10;
        }
        :nth-child(3) {
          flex: 3;
        }
      }
      &-table-3 {
        &-item {
          display: flex;
          height: px2rem(8);
          justify-content: space-around;
          line-height: px2rem(8);
          span {
            flex: 3;
            text-align: center;
            border: 0.5px solid #fff;
            box-sizing: border-box;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2) {
            flex: 10;
          }
          :nth-child(3) {
            flex: 3;
          }
          button {
            background-color: #fc7f89;
            font-size: px2rem(2);
            margin: px2rem(6);
            border: none;
            height: px2rem(5);
            line-height: px2rem(5);
            border-radius: px2rem(1);
            color: #fff;
            width: px2rem(12);
            margin: 0 px2rem(3);
          }
        }
      }
      &-update-imgs {
        margin-top: px2rem(6);
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        span {
          margin: 0 px2rem(2);
        }
        &-list {
          border: 0.5px solid #e8eaec;
          width: px2rem(160);
          display: flex;
          align-items: center;
          img {
            margin: 0 px2rem(1);
            width: px2rem(18);
            height: px2rem(12.5);
          }
        }
        button {
          margin: 0 px2rem(2);
          border: none;
          background: #616789;
          color: #fff;
          font-size: px2rem(3.4);
          width: px2rem(20);
          height: px2rem(7);
          border-radius: px2rem(1);
          box-sizing: border-box;
          margin: 0 px2rem(2);
          padding: px2rem(1) px2rem(2);
        }
      }
      &-update-audio {
        margin-top: px2rem(6);
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        span {
          margin: 0 px2rem(2);
        }
        &-list {
          border: 0.5px solid #e8eaec;
          width: px2rem(160);
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            width: px2rem(16);
            height: px2rem(16);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
              margin: 0 px2rem(1);
              width: px2rem(12);
              height: px2rem(12);
            }
          }
        }
        button {
          margin: 0 px2rem(2);
          border: none;
          background: #616789;
          color: #fff;
          font-size: px2rem(3.4);
          width: px2rem(20);
          height: px2rem(7);
          border-radius: px2rem(1);
          box-sizing: border-box;
          margin: 0 px2rem(2);
          padding: px2rem(1) px2rem(2);
        }
      }
      &-determine {
        margin-top: px2rem(6);
        button {
          font-size: px2rem(3.5);
          width: px2rem(50);
          height: px2rem(8);
          background-color: #616789;
          color: #fff;
          border: none;
          border-radius: px2rem(1);
        }
      }
    }
  }
  &-check {
    align-items: center;
    height: px2rem(60);
    background-color: #fff;
    width: px2rem(160);
    margin: px2rem(6) auto;
    border-radius: px2rem(2);
    &-reason {
      margin: px2rem(10) 0;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: px2rem(5);
        margin-right: px2rem(4);
      }
      textarea {
        width: px2rem(100);
        height: px2rem(20);
        border-radius: px2rem(1);
        font-size: px2rem(4);
        resize: none;
        border: 1px solid #e0e3f8;
        line-height: px2rem(6);
      }
    }
    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        margin: 0 px2rem(4);
        padding: px2rem(1.4) px2rem(4);
        height: px2rem(10);
        font-size: px2rem(3.2);
        border-radius: px2rem(1);
        color: #fff;
        border: none;
        font-size: px2rem(4);
      }
      :nth-child(1) {
        background-color: #616789;
      }
      :nth-child(2) {
        background-color: #fc7f89;
      }
    }
  }
}
</style>
