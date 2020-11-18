<!--  -->
<template>
  <div class="user-manage">
    <div class="user-manage-title">用户管理</div>
    <!--  新增用户 -->
    <div class="user-manage-list">
        <div class='user-manage-list-nav'>
            人员列表
        </div>
        <div class="user-manage-list-button">
            <el-button class="user-manage-list-button-more" @click="isStaffNormal = !isStaffNormal"
            >选择多项</el-button
            >
            <el-button
            class="user-manage-list-button-new"
            type="text"
            @click="StaffDialogFormVisible = true"
            >新增员工</el-button
            >
            <el-button class="user-manage-list-button-del" @click='DeleteStaffMsg'>人员信息删除</el-button>
        </div>
        <div class="user-manage-list-content">
            <!-- 正常显示模板 -->
            <template v-if="isStaffNormal">
                <div class="user-manage-list-content-title">
                    <span>序号</span>
                    <span>公司名称</span>
                    <span>人员名称</span>
                    <span>人员类型</span>
                    <span>人员性别</span>
                    <span>年龄</span>
                    <span>联系电话</span>
                    <span>登录账号</span>
                    <span>账号类型</span>
                    <span>备注</span>
                    <span>操作</span>
                </div>
                <div class="user-manage-list-content-tab">
                    <div
                    class="user-manage-list-content-tab-item"
                    v-for="(item, index) in userMsg"
                    :key="index"
                    >
                        <span>{{ index + 1 }}</span>
                        <span>{{item.companyName}}</span>
                        <span>{{item.personName}}</span>
                        <span>{{item.personType === '1' ? '普通用户': 
                                item.personType === '2' ? '推荐人':
                                item.personType === '3' ? '调解员':
                                item.personType === '4' ? '债事处理专家':
                                item.personType === '5' ? '律师':
                                item.personType === '6' ? '总公司负责人':
                                item.personType === '7' ? '总公司司信息审核人员':
                                item.personType === '8' ? '总公司财务人员':
                                item.personType === '9' ? '分公司负责人':
                                item.personType === '10' ? '资产系统总公司负责人':
                                item.personType === '11' ? '资产系统总公司司信息审核人员':
                                item.personType === '12' ? '资产系统总公司财务人员':
                                item.personType === '13' ? '资产系统分公司负责人':
                                '资产系统分公司录入人员'
                        }}</span>
                        <span>{{item.sex === '1'? '男': '女'}}</span>
                        <span>{{item.age}}</span>
                        <span>{{item.tel}}</span>
                        <span>{{item.loginName}}</span>
                        <span>{{item.userType === '1' ? '天泽': '资产'}}</span>
                        <span>{{item.note}}</span>
                        <span>
                            <el-button class='normal-button' @click='DistributeAccount(item)'>
                                分配账号
                            </el-button>
                            <el-button class='edit-button'>
                                编辑
                            </el-button>
                        </span>
                    </div>
                </div>
            </template>
            <!-- 多选显示模板 -->
            <template v-else>   
                <div class="user-manage-list-content-title">
                    <span>序号</span>
                    <span>公司名称</span>
                    <span>人员名称</span>
                    <span>人员类型</span>
                    <span>人员性别</span>
                    <span>年龄</span>
                    <span>联系电话</span>
                    <span>备注</span>
                </div>
                <div class="user-manage-list-content-tab">
                    <div
                    class="user-manage-list-content-tab-item"
                    v-for="(item, index) in userMsg"
                    :key="index"
                    >
                        <span>
                            <input type="checkbox" v-model='item.isSelected'/>
                        </span>
                        <span>{{item.companyName}}</span>
                        <span>{{item.personName}}</span>
                        <span>{{item.personType}}</span>
                        <span>{{item.sex === '1'? '男': '女'}}</span>
                        <span>{{item.age}}</span>
                        <span>{{item.tel}}</span>
                        <span>{{item.note}}</span>
                    </div>
                </div>
            </template>
        </div>
        <div class="user-manage-list-pagination">
            <el-pagination
            :background="bgc"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="UserListTotal"
            @current-change="handleCurrentChange"
            :page-count='UserListMaxPage'
            >
            <!--:current-page.sync="currentPage3" -->
            </el-pagination>
        </div>
        <!-- 新增用户 -->
        <div class="user-manage-list-pop">
            <el-dialog
            title="新增员工"
            :visible.sync="StaffDialogFormVisible"
            class="user-manage-list-pop-container"
            >
            <div class="user-manage-list-pop-container-form">
                <el-form>
                    <el-form-item>
                        <span class='col-label'>人员名称:</span>
                        <el-input v-model='AddEmployeeMsg.personName'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司名称:</span>
                        <el-select v-model="AddEmployeeMsg.companyId" filterable>
                            <el-option v-for='(item,index) in ComanyList'  :key='index' :label="item.companyName" :value="item.companyId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>人员类型:</span>
                        <el-select v-model="AddEmployeeMsg.personType">
                            <el-option label="普通用户" value="1"></el-option>
                            <el-option label="推荐人" value="2"></el-option>
                            <el-option label="调解员" value="3"></el-option>
                            <el-option label="债事处理专家" value="4"></el-option>
                            <el-option label="律师" value="5"></el-option>
                            <el-option label="总公司负责人" value="6"></el-option>
                            <el-option label="总公司司信息审核人员" value="7"></el-option>
                            <el-option label="总公司财务人员" value="8"></el-option>
                            <el-option label="分公司负责人" value="9"></el-option>
                            <el-option label="资产系统总公司负责人" value="10"></el-option>
                            <el-option label="资产系统总公司司信息审核人员" value="11"></el-option>
                            <el-option label="资产系统总公司财务人员" value="12"></el-option>
                            <el-option label="资产系统分公司负责人" value="13"></el-option>
                            <el-option label="资产系统分公司录入人员" value="14"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>性别:</span>
                        <el-select v-model="AddEmployeeMsg.sex">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>年龄:</span>
                        <el-input v-model='AddEmployeeMsg.age'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>联系电话:</span>
                        <el-input v-model="AddEmployeeMsg.tel" />
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>备注:</span>
                        <el-input v-model="AddEmployeeMsg.note" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="user-manage-list-pop-container-footer">
                <button type="button" @click="StaffUserCancelled">取 消</button>
                <button type="button" @click="SubmitStaffMsg">确 定</button>
            </div>
            </el-dialog>
        </div>
        <!-- 分配账号 -->
        <div class="user-manage-list-pop">
            <el-dialog
            title="分配账号"
            :visible.sync="OpenDistributeAccountPage"
            class="user-manage-list-pop-container"
            >
            <div class="user-manage-list-pop-container-form">
                <el-form>
                    <el-form-item>
                        <span class='col-label'>登录名称：</span>
                        <el-input v-model='DistributeAccountMsg.loginName'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>登录密码：</span>
                        <el-input v-model='DistributeAccountMsg.passwordMd5'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>角色名称</span>
                        <el-select v-model="DistributeAccountMsg.roleId">
                            <el-option v-for='(item,index) in RolesList' :key='index' :label='item.rolename' :value='item.roleId'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>用户类型：</span>
                        <el-select v-model="DistributeAccountMsg.userType">
                            <el-option label="天泽用户" value="1"></el-option>
                            <el-option label="资产用户" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>是否有效：</span>
                        <el-select v-model="DistributeAccountMsg.isenable">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>备注：</span>
                        <el-input v-model='DistributeAccountMsg.note'></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="user-manage-list-pop-container-footer">
                <button type="button" @click="CloseDistributeAccountPage">取 消</button>
                <button type="button" @click="SubmitDistributeMsg">确 定</button>
            </div>
            </el-dialog>
        </div>
    </div>
    <!-- 新增公司 -->
    <div class="user-manage-list" style='margin-bottom: 40px'>
        <div class='user-manage-list-nav'>
            公司列表
        </div>
        <div class="user-manage-list-button">
            <el-button class="user-manage-list-button-more" @click="isCompanyNormal = !isCompanyNormal"
            >选择多项</el-button
            >
            <el-button
            class="user-manage-list-button-new"
            type="text"
            @click="CompanyDialogFormVisible = true"
            >新增公司</el-button
            >
            <el-button class="user-manage-list-button-del">删除</el-button>
        </div>
        <div class="user-manage-list-content">
            <!-- 正常显示模板 -->
            <template v-if="isCompanyNormal">
                <div class="user-manage-list-content-title">
                    <span>序号</span>
                    <span>公司名称</span>
                    <span>公司类型</span>
                    <span>公司法人</span>
                    <span>联系电话</span>
                    <span>操作</span>
                </div>
                <div class="user-manage-list-content-tab">
                    <div
                    class="user-manage-list-content-tab-item"
                    v-for="(item, index) in CompanyMsgList"
                    :key="index"
                    >
                        <span>{{ index + 1 }}</span>
                        <span>{{item.companyName}}</span>
                        <span>{{item.companyType === '1' ? '总公司': '分公司'}}</span>
                        <span>{{item.companyNameMax}}</span>
                        <span>{{item.companyTel}}</span>
                        <span>
                            <el-button class='edit-button' @click='OpenEditCompanyMsgPage(item)'>编辑</el-button>
                        </span>
                    </div>
                </div>
            </template>
            <!-- 多选显示模板 -->
            <template v-else>   
                <div class="user-manage-list-content-title">
                    <span>序号</span>
                    <span>公司名称</span>
                    <span>公司类型</span>
                    <span>公司法人</span>
                    <span>联系电话</span>
                </div>
                <div class="user-manage-list-content-tab">
                    <div
                    class="user-manage-list-content-tab-item"
                    v-for="(item, index) in CompanyMsgList"
                    :key="index"
                    >
                        <span>
                            <input type="checkbox" v-model='item.isSelected'/>
                        </span>
                        <span>{{item.companyName}}</span>
                        <span>{{item.companyType}}</span>
                        <span>{{item.companyNameMax}}</span>
                        <span>{{item.companyTel}}</span>
                    </div>
                </div>
            </template>
        </div>
        <div class="user-manage-list-pagination">
            <el-pagination
            :background="bgc"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="CompanyListTotal"
            @current-change="handleCurrentCompanyChange"
            :page-count='CompanyListMaxPage'
            >
            <!--:current-page.sync="currentPage3" -->
            </el-pagination>
        </div>
        <!-- 新增公司 -->
        <div class="user-manage-list-pop">
            <el-dialog
                title="新增公司"
                :visible.sync="CompanyDialogFormVisible"
                class="user-manage-list-pop-container"
            >
                <div class="user-manage-list-pop-container-form">
                    <el-form>
                    <el-form-item>
                        <span class='col-label'>公司名称</span>
                        <el-input v-model='AddCompanyMsg.companyName'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司所在区域:</span>
                        <el-cascader
                            :options="ProvinceList"
                            :props="cascader_props" v-model="AreaMsg">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司类型:</span>
                        <el-select v-model="AddCompanyMsg.companyType">
                            <el-option value="1" label='总公司'></el-option>
                            <el-option value="2" label='分公司'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司法人:</span>
                        <el-input v-model="AddCompanyMsg.companyLeperson" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司联系电话:</span>
                        <el-input v-model="AddCompanyMsg.companyTel" />
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司名称缩写（大写）:</span>
                        <el-input v-model="AddCompanyMsg.companyNameMax" />
                    </el-form-item>
                </el-form>
                </div>
                <div class="user-manage-list-pop-container-footer">
                    <button type="button" @click="CompanyUserCancelled">取 消</button>
                    <button type="button" @click="AddCompany">确 定</button>
                </div>
            </el-dialog>
        </div>
        <!-- 新增公司 -->
        <div class="user-manage-list-pop">
            <el-dialog
                title="公司信息编辑"
                :visible.sync="EditCompanyDialogFormVisible"
                class="user-manage-list-pop-container"
            >
                <div class="user-manage-list-pop-container-form">
                    <el-form>
                    <el-form-item>
                        <span class='col-label'>公司名称</span>
                        <el-input v-model='EditCompanyMsg.companyName'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司所在区域:</span>
                        <el-cascader
                            :options="ProvinceList"
                            :props="cascader_props" v-model="AreaMsg">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司类型:</span>
                        <el-select v-model="EditCompanyMsg.companyType">
                            <el-option value="1" label='总公司'></el-option>
                            <el-option value="2" label='分公司'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司法人:</span>
                        <el-input v-model="EditCompanyMsg.companyLeperson" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司联系电话:</span>
                        <el-input v-model="EditCompanyMsg.companyTel" />
                    </el-form-item>
                    <el-form-item>
                        <span class='col-label'>公司名称缩写（大写）:</span>
                        <el-input v-model="EditCompanyMsg.companyNameMax" />
                    </el-form-item>
                </el-form>
                </div>
                <div class="user-manage-list-pop-container-footer">
                    <button type="button" @click="EditCompanyDialogFormVisible = false">取 消</button>
                    <button type="button" @click="SubmitEditCompanyMsg">确 定</button>
                </div>
            </el-dialog>
        </div>
    </div>
  </div>
</template>

<script>
import QS from 'qs'
import md5 from 'js-md5'
import { GetProvince, GetCity } from '@js/common.js'
export default {
  data() {
    return {
        // 分页器结构数据源
        id: 0,
        bgc: true,
        queryInfo: {
            pageSize: 10,
            pageNum: 1
        },
        CompanyQueryInfo: {
            pageSize: 5,
            pageNum: 1
        },
        // 用户信息列表数据源
        cascader_props: {
            // 这里的value和label如果后台返回的为不确定的值
            // 就不应该绑死到areaId/areaName 上面, 而是应该
            // 根据每层返回的每层的值赋给value/label
            value: 'areaId',
            label: 'areaName',
            lazy: true,
            lazyLoad (node, resolve) {
                const level = node.level
                // 初始化请求结果
                let requestData = {}
                // 市、县区域接口
                if (level === 1 || level===2) {
                    // 获取城市信息
                    GetCity(node.value).then(CityResponse => {
                        requestData = CityResponse.data.data
                        requestData.forEach(item => {
                            item.leaf = level >= 2
                        })
                        resolve(requestData)
                    })
                }
                if (level === 0) {
                    // 获取省份信息
                    GetProvince().then(response => {
                        requestData = response.data.data
                        resolve(requestData)
                    })
                }
            }
        },
        userMsg: [],
        // 确定员工列表选用正常模板还是多选模板
        isStaffNormal: true,
        // 确定员工列表选用正常模板还是多选模板
        isCompanyNormal: true,
        // 添加用户信息源
        // 用户原密码
        UserPassword: '',
        AddEmployeeMsg: {
            // 人员名称
            personName: '',
            // 公司ID
            companyId: '',
            // 人员类型
            personType: '',
            // 性别
            sex: '',
            // 备注
            age: '',
            // 用户类型
            tel: '',
            // 备注
            note: ''
        },
        // 是否打开新增用户页面
        StaffDialogFormVisible: false,
        CompanyDialogFormVisible: false,
        // 是否打开编辑公司页面
        EditCompanyDialogFormVisible: false,
        RolesList: [],
        PersonsList: [],
        CompanyMsgList: [],
        value: [],
        options: [],
        // 省份信息列表
        ProvinceList: [],
        AreaMsg: [],
        AddCompanyMsg: {
            areaId: '',
            companyName: '',
            companyType: '',
            companyLeperson: '',
            companyTel: '',
            companyNameMax: ''
        },
        EditCompanyMsg: {
            areaId: '',
            companyName: '',
            companyType: '',
            companyLeperson: '',
            companyTel: '',
            companyNameMax: '',
            companyId: ''
        },
        ComanyList: [],
        DistributeAccountMsg: {
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
            userType: '',
            isenable: ''
        },
        // 分配账号页面
        OpenDistributeAccountPage: false,
        // 用户列表展示
        UserListMaxPage: 0,
        UserListTotal: 0,
        // 公司列表展示
        CompanyListMaxPage: 0,
        CompanyListTotal: 0
    }
  },
  methods: {
    handleCurrentChange(val) {
        this.queryInfo.pageNum = val
        this.getUserMsg()
    },
    handleCurrentCompanyChange (val) {
        this.CompanyQueryInfo.pageNum = val
        this.getCompanyMsgList()
    },
    async getUserMsg() {
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubUser/queryList',
        data: QS.stringify(this.queryInfo),
      })
      this.UserListMaxPage = result.data.navigateLastPage
      this.UserListTotal = result.data.total
      this.userMsg = result.data.list.map((v) => {
        return { ...v, isSelected: false }
      })
      // 获取角色信息
      const { data: RoleResult } = await this.$http({
        method: 'post',
        url: '/api/api/pubRoleController/queryRole',
        data: QS.stringify(this.queryInfo),
      })
      this.RolesList = RoleResult.data
    },
    async getCompanyMsgList () {
        const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/pubCompanyController/queryListPage',
            data: QS.stringify(this.CompanyQueryInfo),
        })
        this.CompanyMsgList = result.data.list
        this.CompanyListMaxPage = result.data.navigateLastPage
        this.CompanyListTotal = result.data.total
        // 查询所有公司信息, 用于用户新增
        const { data: CompanyListResult } = await this.$http({
            method: 'post',
            url: '/api/api/pubCompanyController/queryList'
        })
        this.ComanyList = CompanyListResult.data.map((v) => {
            return { ...v, isSelected: false }
        })
    },
    // 用户取消
    StaffUserCancelled() {
        this.StaffDialogFormVisible = false
        // 清除所有填写信息
        for (var i in this.AddEmployeeMsg) {
            this.AddEmployeeMsg[i] = ''
        }
    },
    // 公司取消
    CompanyUserCancelled() {
        this.CompanyDialogFormVisible = false
    },
    // 用户确定添加
    async SubmitStaffMsg() {
        const formData = new FormData()
        for ( const key in this.AddEmployeeMsg) {
            formData.append(key, this.AddEmployeeMsg[key])
        }
        console.log(this.AddEmployeeMsg)
        await this.$http({
            method: 'post',
            url: '/api/api/pubPersonController/insertSelective',
            data: formData,
        })
        this.$message({
            message: '用户添加成功',
            type: 'success'
        })
        // 清除所有填写信息
        for (var i in this.AddEmployeeMsg) {
            this.AddEmployeeMsg[i] = ''
        }
        this.getUserMsg()
        this.dialogFormVisible = false
    },
    // 新增公司
    async AddCompany () {
        const length = this.AreaMsg.length
        this.AddCompanyMsg.areaId = this.AreaMsg[length-1]
        console.log(this.AddCompanyMsg)
        const formData = new FormData()
        for ( const key in this.AddCompanyMsg) {
            formData.append(key, this.AddCompanyMsg[key])
        }
        await this.$http({
            method: 'post',
            url: '/api/api/pubCompanyController/insertSelective',
            data: formData
        })
        this.$message.success('新增成功')
        for (var i in this.AddCompanyMsg) {
            this.AddCompanyMsg[i] = ''
        }
        this.getCompanyMsgList()
        this.CompanyDialogFormVisible = false
    },
    async OpenEditCompanyMsgPage (item) {
        this.EditCompanyMsg.companyId = item.companyId
        this.EditCompanyDialogFormVisible = true
    },
    // 提交编辑公司信息
    async SubmitEditCompanyMsg () {
        const length = this.AreaMsg.length
        this.EditCompanyMsg.areaId = this.AreaMsg[length-1]
        console.log(this.EditCompanyMsg)
        const formData = new FormData()
        for ( const key in this.EditCompanyMsg) {
            formData.append(key, this.EditCompanyMsg[key])
        }
        await this.$http({
            method: 'post',
            url: '/api/api/pubCompanyController/updateByPrimaryKeySelective',
            data: formData
        })
        this.$message.success('修改成功')
        this.EditCompanyMsg = {
            companyId: '',
            areaId: '',
            companyName: '',
            companyType: '',
            companyLeperson: '',
            companyTel: '',
            companyNameMax: ''
        }
        this.getCompanyMsgList()
        this.EditCompanyDialogFormVisible = false
    },
    async DistributeAccount (item) {
        this.DistributeAccountMsg.personId = item.personId
        this.OpenDistributeAccountPage = true
        console.log(item)
    },
    CloseDistributeAccountPage () {
        this.OpenDistributeAccountPage = false
        // 清除所有填写信息
        for (var i in this.DistributeAccountMsg) {
            this.DistributeAccountMsg[i] = ''
        }
    },
    async SubmitDistributeMsg () {
        const formData = new FormData()
        for ( const key in this.DistributeAccountMsg) {
            formData.append(key, this.DistributeAccountMsg[key])
        }
        await this.$http({
            method: 'post',
            url: '/api/api/pubUser/addPubUser',
            data: formData
        })
        this.$message.success('分配权限成功')
        // 清除所有填写信息
        for (var i in this.DistributeAccountMsg) {
            this.DistributeAccountMsg[i] = ''
        }
        this.OpenDistributeAccountPage = false
    },
    // 人员信息群体删除
    async DeleteStaffMsg () {
        const DeleteList = this.userMsg.filter( v => {
            return v.isSelected === true
        })
        let DeleteUersIds = ''
        DeleteList.map((v) => {
            DeleteUersIds += v.personId + ','
        })
        DeleteUersIds = DeleteUersIds.substring(0, DeleteUersIds.length - 1)
        const formData = new FormData()
        formData.append('ids', DeleteUersIds)
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            this.$http({
                method: 'post',
                url: '/api/api/pubUser/delListPerson',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
        .then((result) => {
            if (result.data.resultCode === '200') {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.getUserMsg()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      })
    }
  },
  created() {
    this.getUserMsg()
    this.getCompanyMsgList()
    // 获取省份信息
  }
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
    background-color: #fff;
    margin: px2rem(2) px2rem(4);
    padding: px2rem(4);
    &-nav {
        font-size: 18px;
        color: #616789;
    }
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
        line-height: px2rem(8);
        span {
            font-size: px2rem(4);
            background-color: #616789;
            flex: 3.5;
            text-align: center;
            color: #fff;
            border: 1px solid #fff;
            display: inline-block;
            overflow: hidden;
            padding: 0 4px;
        }
        span:nth-child(1) {
            flex: 1;
        }
        :nth-child(2) {
            flex: 5;
        }
        :nth-child(3){
            flex: 6
        }
        :nth-child(7),:nth-child(8) {
            flex: 3
        }
        :nth-child(5),:nth-child(6),:nth-child(9){
            flex: 2
        }
      }
      &-tab {
        display: flex;
        flex-direction: column;
        .el-button {
            font-size: 16px;
            color: #fff;
            padding: 6px 12px;
        }
        div:nth-child(odd) {
          display: flex;
          span {
            flex: 3.5;
            background-color: #fff;
            height: px2rem(8);
            line-height: px2rem(8);
            padding: 0 4px;
            text-align: center;
            color: #000;
            display: inline-block;
            overflow: hidden;
            font-size: 18px;
            img {
              width: px2rem(2.5);
              height: px2rem(2.5);
            }
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2) {
            flex: 5;
          }
          :nth-child(3){
            flex: 6
          }
          :nth-child(7),:nth-child(8) {
            flex: 3
          }
          :nth-child(5),:nth-child(6),:nth-child(9){
            flex: 2
          }
        }
        div:nth-child(even) {
          display: flex;
          span {
            flex: 3.5;
            background-color: #e0e3f8;
            height: px2rem(8);
            line-height: px2rem(8);
            font-size: 18px;
            text-align: center;
            color: #000;
            display: inline-block;
            overflow: hidden;
            padding: 0 4px;
            img {
              width: px2rem(2.5);
              height: px2rem(2.5);
            }
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2) {
              flex: 5;
          }
          :nth-child(7),:nth-child(8) {
            flex: 3
          }
          :nth-child(3) {
            flex: 6
          }
          :nth-child(5),:nth-child(6),:nth-child(9){
            flex: 2
          }
        }
      }
    }
    &-pagination {
      padding: px2rem(4);
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: px2rem(8);
      line-height: px2rem(8);
      /deep/.el-pagination > .active {
        background-color: #616789;
      }
      /deep/.el-pager li {
          font-size: 16px;
      }
      &-button {
        width: px2rem(8);
        height: px2rem(5);
        padding: px2rem(1) px2rem(2);
        line-height: px2rem(5);
        display: inline-block;
        margin-left: px2rem(3);
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
    /deep/.el-dialog {
        width: 600px;
        font-size: 18px;
        .el-form-item {
            /deep/.col-label {
                font-size: 18px;
            }
            /deep/.el-cascader {
                width: 100%;
            }
        }
    }
}
</style>
