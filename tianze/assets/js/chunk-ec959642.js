(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ec959642"],{c49d:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"report-info"},[e._m(0),a("div",{staticClass:"report-info-list"},[a("div",{staticClass:"public-tabs"},[a("el-tabs",{on:{"tab-click":function(){return null}},model:{value:e.activeTabs,callback:function(t){e.activeTabs=t},expression:"activeTabs"}},e._l(e.SelectOption,(function(e){return a("el-tab-pane",{key:e.SelectName,attrs:{label:e.SelectName,name:e.SelectName}})})),1)],1),a("div",{staticClass:"report-info-list-search"},[a("div",{staticClass:"report-info-list-search-form"},[a("el-form",{ref:"form"},[a("el-form-item",{staticClass:"report-info-list-search-form-item1"},[a("span",[e._v("债权人/债务人：")]),a("el-input",{model:{value:e.tableQuery.debtName,callback:function(t){e.$set(e.tableQuery,"debtName",t)},expression:"tableQuery.debtName"}})],1),a("el-form-item",[a("span",[e._v("录入编号:")]),a("el-input",{model:{value:e.tableQuery.reportNo,callback:function(t){e.$set(e.tableQuery,"reportNo",t)},expression:"tableQuery.reportNo"}})],1),a("el-form-item",{attrs:{placeholder:"审核状态"}},[a("span",[e._v("审核状态:")]),a("el-select",{model:{value:e.tableQuery.status,callback:function(t){e.$set(e.tableQuery,"status",t)},expression:"tableQuery.status"}},[a("el-option",{attrs:{label:"全部",value:""}}),a("el-option",{attrs:{label:"审核通过",value:"2"}}),a("el-option",{attrs:{label:"审核驳回",value:"1"}}),a("el-option",{attrs:{label:"审核已提交",value:"0"}})],1)],1),a("el-form-item",[a("span",[e._v("时间:")]),a("el-date-picker",{attrs:{align:"left",type:"date",placeholder:"请选择开始日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.tableQuery.beginDate,callback:function(t){e.$set(e.tableQuery,"beginDate",t)},expression:"tableQuery.beginDate"}}),a("span",{staticClass:"report-info-list-search-time-select-separator"},[e._v("—")]),a("el-date-picker",{attrs:{align:"left",type:"date",placeholder:"请选择结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.tableQuery.endDate,callback:function(t){e.$set(e.tableQuery,"endDate",t)},expression:"tableQuery.endDate"}})],1),a("el-form-item",[a("el-button",{staticClass:"button-search",on:{click:function(t){return e.searchTbaleData()}}},[e._v(" 搜索 ")])],1)],1)],1),a("div",{staticClass:"report-info-list-search-time-select"})]),a("div",{staticClass:"report-info-list-content"},[e._m(1),a("div",{staticClass:"report-info-list-content-tab"},e._l(e.ReportInfoMsg,(function(t,s){return a("div",{key:s,staticClass:"report-info-list-content-tab-item"},[a("span",[e._v(e._s(s+1))]),a("div",[a("ul",[a("li",[e._v("录入编号: "+e._s(t.reportNo?t.reportNo:"/"))]),a("li",[e._v("债事人: "+e._s(t.debtName?t.debtName:"/"))]),a("li",[e._v(" 相对人: "+e._s(t.busRelativeCount?t.busRelativeCount:"/")+" ")]),a("li",[e._v("录入人: "+e._s(t.inputName?t.inputName:"/"))]),a("li",[e._v(" 推荐人: "+e._s(t.recommendName?t.recommendName:"/")+" ")])])]),a("span",[e._v(e._s(t.MeltTimes?t.MeltTimes:"/"))]),a("span",[e._v(e._s(t.MeltNumber?t.MeltNumber:"/"))]),a("span",[e._v(e._s(t.MeltMoney?t.MeltMoney:"/"))]),a("div",[a("span",[e._v(e._s(t.submitDate?t.submitDate:"/"))])]),a("div",[a("span",[e._v(e._s(t.checkDate?t.checkDate:"/"))])]),a("div",[a("ul",[a("li",[e._v(e._s(t.checkReason?t.checkReason:"/"))])])]),a("div",[a("span",{class:["2"===t.status||"5"===t.status?"pass":"1"===t.status||"6"===t.status?"unpass":"hassubmit"]},[e._v(e._s(""===t.status?"信息录入中":"0"===t.status?"未审核":"1"===t.status?"审核未通过":"2"===t.status?"审核通过":"3"===t.status?"暨尽调协议":"4"===t.status?"财务未审核":"5"===t.status?"财务审核通过":"财务审核未通过"))])]),a("span",["0"===t.status&&"7992691214771044352"===e.roleId?a("button",{on:{click:function(a){return e.CheckData(s,t)}}},[e._v(" 审核 ")]):e._e(),"3"===t.status&&"7992691295821774848"===e.roleId?a("button",{on:{click:function(a){return e.GoReportPayment(s,t)}}},[e._v(" 缴费 ")]):e._e(),"6"===t.status&&"7992691295821774848"===e.roleId?a("button",{staticClass:"enter-and-edit",on:{click:function(a){e.EditReportVoucher(s,t)}}},[e._v(" 录入缴费编辑 ")]):e._e(),"1"!==t.status&&""!==t.status||"7992691295821774848"!==e.roleId?e._e():a("button",{on:{click:function(){e.$router.push({path:"/EditReport",query:{reportId:t.reportId}})}}},[e._v(" 编辑 ")])])])})),0),a("div",{staticStyle:{"text-align":"right","margin-top":"25px"}},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.tablePage.total},on:{"current-change":e.searchTbaleData}})],1)])])])},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"report-info-title"},[a("span",{staticClass:"report-info-title-go1"},[e._v("我的审批")]),a("span",{staticClass:"report-info-title-separator"},[e._v("/")]),a("span",{staticClass:"report-info-title-go2"},[e._v("录入信息")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"report-info-list-content-title"},[a("span",[e._v("序号")]),a("span",[e._v("债事信息")]),a("span",[e._v("债权处理次数")]),a("span",[e._v("债权处理编号")]),a("span",[e._v("债权处理金额")]),a("span",[e._v("提交时间")]),a("span",[e._v("审核时间")]),a("span",[e._v("审批内容")]),a("span",[e._v("审核状态")]),a("span",[e._v("操作")])])}],n=(a("4160"),a("159b"),a("96cf"),a("1da1")),o={data:function(){return{ReportInfoMsg:[],tablePage:{pageSize:10,pageNum:1,total:0},tableQuery:{debtName:"",beginDate:"",endDate:"",reportNo:"",status:"",companyType:window.sessionStorage.getItem("companyType"),comId:window.sessionStorage.getItem("companyId")},isNormal:!1,roleId:window.sessionStorage.getItem("roleId"),pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]},dialogTableVisible:!1,activeTabs:"全部",SelectOption:[{SelectName:"全部",isSelect:!0},{SelectName:"待审核",isSelect:!1},{SelectName:"审核通过",isSelect:!1},{SelectName:"审核驳回",isSelect:!1}],IsCheckData:!1,UserCheckData:{reportId:"",status:"",checkReason:""}}},methods:{HandleSelect:function(e){this.SelectOption.forEach((function(e){e.isSelect=!1})),e.isSelect=!0},searchTbaleData:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s,r,n,o,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:for(n in t.tablePage.pageNum=e||1,s=Object.assign(t.tableQuery,t.tablePage),r=new FormData,s)r.append(n,s[n]);return a.next=6,t.$http({method:"post",url:"/api/api/busReportController/selectDebtInfos",data:r,headers:{"Content-Type":"multipart/form-data"}});case 6:o=a.sent,i=o.data,t.ReportInfoMsg=i.data.list,console.log(t.ReportInfoMsg),t.tablePage.total=i.data.total;case 11:case"end":return a.stop()}}),a)})))()},CheckData:function(e,t){var a=t.stage,s=t.status;"0"!==s&&"5"!==s||"1"!==a?"4"===s&&"1"===a&&this.$router.push({path:"/ReportVoucherApprove",query:{reportId:t.reportId}}):this.$router.push({path:"/ReportApprove",query:{reportId:t.reportId}})},CloseCheckPage:function(){this.UserCheckData.reportId="",this.UserCheckData.status="",this.UserCheckData.checkReason="",this.IsCheckData=!1},GoReportPayment:function(e,t){this.$router.push({path:"/ReportPayment",query:{reportId:t.reportId}})},addDate:function(){var e=new Date,t={year:e.getFullYear(),month:e.getMonth()+1,date:e.getDate()};this.tableQuery.endDate=t.year+"-"+t.month+"-"+t.date;var a=e-6048e5;e.setTime(a),t={year:e.getFullYear(),month:e.getMonth()+1,date:e.getDate()},this.tableQuery.beginDate=t.year+"-"+t.month+"-"+t.date},EditReportVoucher:function(e,t){this.$router.push({path:"/EditReportPayment",query:{reportId:t.reportId}})}},created:function(){this.searchTbaleData(),this.addDate()}},i=o,l=(a("d2d5"),a("2877")),c=Object(l["a"])(i,s,r,!1,null,"55f6d88d",null);t["default"]=c.exports},d2d5:function(e,t,a){"use strict";var s=a("e3cf"),r=a.n(s);r.a},e3cf:function(e,t,a){}}]);