(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-98d2139e"],{"19ea":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"report-info"},[t._m(0),a("div",{staticClass:"report-info-list"},[a("div",{staticClass:"public-tabs"},[a("el-tabs",{on:{"tab-click":function(){return null}},model:{value:t.activeTabs,callback:function(e){t.activeTabs=e},expression:"activeTabs"}},t._l(t.SelectOption,(function(t){return a("el-tab-pane",{key:t.SelectName,attrs:{label:t.SelectName,name:t.SelectName}})})),1)],1),a("div",{staticClass:"report-info-list-search"},[a("div",{staticClass:"report-info-list-search-form"},[a("el-form",{ref:"form"},[a("el-form-item",[a("span",[t._v("录入编号：")]),a("el-input",{model:{value:t.tableQuery.debtNo,callback:function(e){t.$set(t.tableQuery,"debtNo",e)},expression:"tableQuery.debtNo"}})],1),a("el-form-item",[a("el-button",{staticClass:"button-search",on:{click:function(e){return t.searchTbaleData()}}},[t._v("搜索")])],1)],1)],1)]),a("div",{staticClass:"report-info-list-content"},[t._m(1),a("div",{staticClass:"report-info-list-content-tab"},t._l(t.PaymentMsg,(function(e,n){return a("div",{key:n,staticClass:"report-info-list-content-tab-item"},[a("span",[t._v(t._s(n+1))]),a("span",[t._v(t._s(e.reportNo))]),a("span",[t._v(t._s(e.payertName))]),a("span",[t._v(t._s(e.contractName))]),a("span",[t._v(t._s("1"===e.payType?"录入缴费":"3"===e.payType?"债权处理缴费":"4"===e.payType?"资产缴费":""))]),a("span",[t._v(t._s(e.payNo))]),a("span",[t._v(t._s(e.cost))]),a("span",t._l(e.voucher,(function(t,e){return a("img",{key:e,attrs:{src:t,alt:""}})})),0),a("span",[t._v(t._s("10"===e.status?"未审核":"1"===e.status?"审核未通过":"2"===e.status?"审核已通过":"/"))]),a("span",[a("button",{directives:[{name:"show",rawName:"v-show",value:"0"===e.status&&"4"!==e.payType,expression:"item.status === '0' && item.payType !=='4'"}],attrs:{type:"button"},on:{click:function(a){return t.CheckPayment(n,e)}}},[t._v(" 审核 ")])])])})),0)]),a("div",{staticStyle:{"text-align":"right","margin-top":"25px"}},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.tablePage.total},on:{"current-change":t.searchTbaleData}})],1)])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"report-info-title"},[a("span",{staticClass:"report-info-title-go1"},[t._v("我的审批")]),a("span",{staticClass:"report-info-title-separator"},[t._v("/")]),a("span",{staticClass:"report-info-title-go2"},[t._v("支付凭证")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"report-info-list-content-title"},[a("span",[t._v("序号")]),a("span",[t._v("录入号")]),a("span",[t._v("缴费人")]),a("span",[t._v("合同人")]),a("span",[t._v("类型")]),a("span",[t._v("支付号")]),a("span",[t._v("金额")]),a("span",[t._v("图片")]),a("span",[t._v("审核状态")]),a("span",[t._v("操作")])])}],i=(a("4160"),a("d81d"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),r={data:function(){return{activeTabs:"全部",tablePage:{pageSize:10,pageNum:1,total:0},tableQuery:{debtNo:"",companyType:window.sessionStorage.getItem("companyType"),comId:window.sessionStorage.getItem("companyId")},SelectOption:[{SelectName:"全部",isSelect:!0},{SelectName:"待审核",isSelect:!1},{SelectName:"审核通过",isSelect:!1},{SelectName:"审核驳回",isSelect:!1}],PaymentMsg:[],isNormal:!1,TimeSelect:{TimeStart:"2020-02-30",TimeEnd:"2020-04-28"},pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(t){t.$emit("pick",new Date)}},{text:"昨天",onClick:function(t){var e=new Date;e.setTime(e.getTime()-864e5),t.$emit("pick",e)}},{text:"一周前",onClick:function(t){var e=new Date;e.setTime(e.getTime()-6048e5),t.$emit("pick",e)}}]}}},methods:{SelectMore:function(){this.isNormal=!this.isNormal},HandleSelect:function(t){this.SelectOption.forEach((function(t){t.isSelect=!1})),t.isSelect=!0},searchTbaleData:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,s,i,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:for(i in e.tablePage.pageNum=t||1,n=Object.assign(e.tableQuery,e.tablePage),s=new FormData,n)s.append(i,n[i]);return a.next=6,e.$http({method:"post",url:"/api/api/busPayDetailController/selectPayInfoList",data:s,headers:{"Content-Type":"multipart/form-data"}});case 6:r=a.sent,o=r.data,e.PaymentMsg=o.data.list,e.PaymentMsg.map((function(t){t.voucher=t.voucher.split(",")})),console.log(e.PaymentMsg),e.tablePage.total=o.data.total;case 12:case"end":return a.stop()}}),a)})))()},CheckPayment:function(t,e){var a={payId:e.payId,reportId:e.reportId,cost:e.cost};"1"===e.stage?this.$router.push({path:"/ReportVoucherApprove",query:a}):(a.debtId=e.debtId||"",this.$router.push({path:"/UnlockPaymentApprove",query:a}))}},created:function(){this.searchTbaleData()}},o=r,c=(a("a0c9"),a("2877")),l=Object(c["a"])(o,n,s,!1,null,"191348d0",null);e["default"]=l.exports},"5bae":function(t,e,a){},a0c9:function(t,e,a){"use strict";var n=a("5bae"),s=a.n(n);s.a}}]);