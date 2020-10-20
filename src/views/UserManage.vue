<!--  -->
<template>
  <div class="user-manage">
    <div class="user-manage-title">用户管理</div>
    <div class="user-manage-list">
      <div class="user-manage-list-button">
        <el-button class="user-manage-list-button-more" @click="SelectMore"
          >选择多项</el-button
        >
        <el-button
          class="user-manage-list-button-new"
          type="text"
          @click="dialogFormVisible = true"
          >添加员工</el-button
        >
        <el-button class="user-manage-list-button-edit">编辑</el-button>
        <el-button class="user-manage-list-button-del">删除</el-button>
      </div>
      <div class="user-manage-list-content">
        <!-- 正常显示模板 -->
        <template v-if="isNormal">
          <div class="user-manage-list-content-title">
            <span>序号</span>
            <span>公司名称</span>
            <span>用户名称</span>
            <span>用户类型</span>
            <span>类型</span>
            <span>年龄</span>
            <span>联系电话</span>
          </div>
          <div class="user-manage-list-content-tab">
            <div
              class="user-manage-list-content-tab-item"
              v-for="(item, index) in userMsg"
              :key="index"
            >
              <span>{{ index + 1 }}</span>
              <span>{{ item.companyName }}</span>
              <span>{{ item.personName }}</span>
              <span>{{ item.personType }}</span>
              <span>{{ item.companyType }}</span>
              <span>{{ item.age }}</span>
              <span>{{ item.tel }}</span>
            </div>
          </div>
        </template>
        <!-- 新增显示模板 -->
        <template v-else>
          <div class="user-manage-list-content-title">
            <span>序号</span>
            <span>公司名称</span>
            <span>用户名称</span>
            <span>用户类型</span>
            <span>类型</span>
            <span>年龄</span>
            <span>联系电话</span>
          </div>
          <div class="user-manage-list-content-tab">
            <div
              class="user-manage-list-content-tab-item"
              v-for="item in userMsg"
              :key="item.userId"
            >
              <span>
                <input
                  type="checkbox"
                  class="user-manage-list-content-tab-item-select"
                />
              </span>
              <span>{{ item.companyName }}</span>
              <span>{{ item.userName }}</span>
              <span>{{ item.personType }}</span>
              <span>{{ item.TypeNum }}</span>
              <span>{{ item.age }}</span>
              <span>{{ item.tel }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="user-manage-list-pagination">
        <el-pagination
          :background="bgc"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="1000"
          @current-change="handleCurrentChange"
        >
          <!--:current-page.sync="currentPage3" -->
        </el-pagination>
      </div>
      <!-- 新增用户 -->
      <div class="user-manage-list-pop">
        <el-dialog
          title="新增员工"
          :visible.sync="dialogFormVisible"
          class="user-manage-list-pop-container"
        >
          <div class="user-manage-list-pop-container-form">
              <el-form>
                <el-form-item>
                    <span class='col-label'>人员ID:</span>
                    <el-select v-model="AddEmployeeMsg.personId">
                        <el-option v-for='(item,index) in PersonsList'  :key='index' :label="item.personName" :value="item.personId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span class='col-label'>角色ID:</span>
                    <el-select v-model="AddEmployeeMsg.roleId">
                        <el-option v-for='(item,index) in RolesList'  :key='index' :label="item.rolename" :value="item.roleId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span class='col-label'>用户类型:</span>
                    <el-select v-model="AddEmployeeMsg.userType">
                        <el-option label="天泽" value="1"></el-option>
                        <el-option label="资产" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span class='col-label'>登陆名:</span>
                    <el-input v-model="AddEmployeeMsg.loginName" ></el-input>
                </el-form-item>
                <el-form-item>
                    <span class='col-label'>密码:</span>
                    <el-input v-model="AddEmployeeMsg.passwordMd5" />
                </el-form-item>
                <el-form-item>
                    <span class='col-label'>备注:</span>
                    <el-input v-model="AddEmployeeMsg.note" />
                </el-form-item>
            </el-form>
          </div>
          <div class="user-manage-list-pop-container-footer">
            <button type="button" @click="UserCancelled">取 消</button>
            <button type="button" @click="AddEmployee">确 定</button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import QS from 'qs'
import md5 from 'js-md5'
export default {
  data() {
    return {
      // 分页器结构数据源
      bgc: true,
      queryInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      // 用户信息列表数据源
      userMsg: [],
      // 确定选用正常模板还是多选模板
      isNormal: true,
      // 添加用户信息源
      // 用户原密码
      UserPassword: '',
      AddEmployeeMsg: {
        // 人员ID
        personId: '',
        // 角色ID
        roleId: '',
        // 登陆名
        loginName: '',
        // 密码
        passwordMd5: '',
        // 备注
        note: '',
        // 用户类型（1.天泽2.资产）
        userType: ''
      },
      // 是否打开新增用户页面
      dialogFormVisible: false,
      RolesList: [],
      PersonsList: []
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getUserMsg()
    },
    SelectMore() {
      this.isNormal = !this.isNormal
    },
    async getUserMsg() {
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubUser/queryList',
        data: QS.stringify(this.queryInfo),
      })
      this.userMsg = result.data.list
      console.log('this.userMsg', this.userMsg)
      // 查询所有角色
      const { data: RolesResult } = await this.$http({
        method: 'post',
        url: '/api/api/pubRoleController/queryRole'
      })
      this.RolesList = RolesResult.data
      // 查询所有人员
      const { data: PersonsResult } = await this.$http({
        method: 'post',
        url: '/api/api/pubPersonController/queryPer'
      })
      console.log(PersonsResult)
      this.PersonsList = PersonsResult.data
      console.log(this.PersonsList)
    },
    // 用户取消
    UserCancelled() {
      this.dialogFormVisible = false
      // 清除所有填写信息
      for (var i in this.AddEmployeeMsg) {
        this.AddEmployeeMsg[i] = ''
      }
    },
    // 用户确定添加
    async AddEmployee() {
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubUser/addPubUser',
        data: QS.stringify(this.AddEmployeeMsg),
      })
      console.log(result)
      if (result.resultCode === '200') {
        this.$message({
          message: '用户添加成功',
          type: 'success',
        })
      }
      // 清除所有填写信息
      for (var i in this.AddEmployeeMsg) {
        this.AddEmployeeMsg[i] = ''
      }
      this.dialogFormVisible = false
    },
  },
  created() {
    this.getUserMsg()
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.user-manage {
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

  &-list {
    height: px2rem(140);
    background-color: #fff;
    margin: 0 px2rem(4);
    padding: px2rem(4);

    &-button {
      height: px2rem(15);
      line-height: px2rem(15);
      display: flex;
      align-items: center;
      .el-button {
        padding: px2rem(2) px2rem(4);
      }
      &-more {
        background-color: #fc7f89;
        color: #fff;
      }

      &-new {
        color: #fff;
        background-color: #ad94e2;
      }

      &-edit {
        color: #fff;
        background-color: #ecc87f;
      }

      &-del {
        color: #fff;
        background-color: #616789;
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
          font-size: px2rem(4);
          background-color: #616789;
          flex: 2.5;
          text-align: center;
          color: #fff;
          border: 1px solid #fff;
          display: inline-block;
        }
        :nth-child(1) {
          flex: 1;
        }
        :nth-child(3){
            flex: 6
        }
        :nth-child(2) {
            flex: 5;
        }
      }
      &-tab {
        display: flex;
        flex-direction: column;
        div:nth-child(odd) {
          display: flex;
          span {
            flex: 2.5;
            background-color: #fff;
            height: px2rem(10);
            line-height: px2rem(10);
            font-size: px2rem(4);
            text-align: center;
            color: #000;
            display: inline-block;

            img {
              width: px2rem(2.5);
              height: px2rem(2.5);
            }
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(3){
            flex: 6
          }   
          :nth-child(2) {
            flex: 5;
          }
        }
        div:nth-child(even) {
          display: flex;
          span {
            flex: 2.5;
            background-color: #e0e3f8;
            height: px2rem(10);
            line-height: px2rem(10);
            font-size: px2rem(4);
            text-align: center;
            color: #000;
            display: inline-block;
            img {
              width: px2rem(2.5);
              height: px2rem(2.5);
            }
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(3){
            flex: 6
          }
          :nth-child(2) {
            flex: 5;
          }
        }
      }
    }
    &-pagination {
      padding: px2rem(5) 0;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: px2rem(8);
      line-height: px2rem(8);
      .el-pagination > .active {
        background-color: #616789;
      }
      &-button {
        width: px2rem(8);
        height: px2rem(5);
        padding: px2rem(1) px2rem(2);
        line-height: px2rem(5);
        display: inline-block;
        margin-left: px2rem(3);
        font-size: px2rem(3.5);
        color: #fff;
        text-align: center;
        background-color: #616789;
        border-radius: px2rem(1);
      }
    }
    // 添加员工
    &-pop {
      &-container {
        &-form {
            .col-label {
                flex-shrink: 0;
                line-height: 40px;
                height: 40px;
                margin-right: 20px;
            }
            /deep/.el-form-item {
                width: 100%;
                .el-select {
                    width: 100%;
                }
                .el-input {
                    width: 100%;
                }
                .el-date-editor {
                    width: 100%;
                }
            }
          &-content {
            margin: px2rem(4) 0;

            span {
              display: inline-block;
              width: px2rem(18);
              text-align: center;
            }
            input {
              padding-left: px2rem(2);
              height: px2rem(8);
              line-height: px2rem(8);
              border-radius: px2rem(1);
              border: 1px solid #e8eaec;
              width: px2rem(140);
              margin-left: px2rem(4);
            }
          }
        }
        &-footer {
          display: flex;
          justify-content: center;
          align-items: center;
          button {
            margin: 0 px2rem(4);
            margin-top: px2rem(6);
            width: px2rem(12);
            height: px2rem(8);
            line-height: px2rem(8);
            font-size: px2rem(3.5);
            box-sizing: border-box;
            border: none;
            border-radius: px2rem(1);
            background-color: #616789;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
