(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/information/information"],{

/***/ 43:
/*!********************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/information/information.vue ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _information_vue_vue_type_template_id_34b500aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./information.vue?vue&type=template&id=34b500aa&scoped=true& */ 44);
/* harmony import */ var _information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./information.vue?vue&type=script&lang=js& */ 46);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _information_css_vue_type_style_index_0_id_34b500aa_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./information.css?vue&type=style&index=0&id=34b500aa&scoped=true&lang=css& */ 48);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 15);






/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _information_vue_vue_type_template_id_34b500aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _information_vue_vue_type_template_id_34b500aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "34b500aa",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Users/yuanhy/Desktop/Chat/pages/information/information.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 44:
/*!***************************************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/information/information.vue?vue&type=template&id=34b500aa&scoped=true& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_template_id_34b500aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./information.vue?vue&type=template&id=34b500aa&scoped=true& */ 45);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_template_id_34b500aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_template_id_34b500aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 45:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/yuanhy/Desktop/Chat/pages/information/information.vue?vue&type=template&id=34b500aa&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 46:
/*!*********************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/pages/information/information.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./information.vue?vue&type=script&lang=js& */ 47);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 47:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/yuanhy/Desktop/Chat/pages/information/information.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



















































































































































































































































































var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = __webpack_require__(/*! vuex */ 27);


var _qqmapWxJssdk = _interopRequireDefault(__webpack_require__(/*! ../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js */ 31));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var qqmapsdk = new _qqmapWxJssdk.default({ key: 'QL7BZ-ZCJKK-72IJS-A6NA6-HRJ3F-ZYB6J' });var _default = { data: function data() {return { currentNav: 0, currentTab: 1, newsInfo: [], attentionInfo: [], articleInfo: [], activityInfo: [], recruitInfo: [], menu_list: ['关注', '活动', '动态', '招募'], scroll_height: 700, displayLocation: '', imageList: [], attention_height: 700, article_height: 700, activity_height: 700, recruit_height: 700, fixTabbar: false, tabbar_top: _vue.default.prototype.CustomBar, loadingItem: false, loading: true, attention_scroll: 1, activity_scroll: 1, article_scroll: 1, recruit_scroll: 1, page_scroll: 1, loadingNext: false, links: [], attentionCurrentPage: 1, activityCurrentPage: 1, articleCurrentPage: 1, recruitCurrentPage: 1, attentionComplete: false, activityComplete: false, articleComplete: false, recruitComplete: false };}, computed: { currentScrollHeight: function currentScrollHeight() {if (this.currentTab == 1) {return this.activity_height;} else if (this.currentTab == 2) {return this.article_height;} else if (this.currentTab == 3) {return this.recruit_height;} else {return this.attention_height;}} }, mounted: function mounted() {var _this = this;var that = this;setTimeout(function () {_this.getHeight();}, 100);_vue.default.prototype.$http.request({ url: '/information/recommend', method: 'POST' }).then(function (res) {_this.newsInfo = res.data.data.news.data;for (var item in _this.newsInfo) {for (var index in _this.newsInfo[item].news_images) {_this.imageList.push(_this.newsInfo[item].news_images[index].image_url);}}_this.attentionInfo = res.data.data.attentions.data;for (var _item in _this.attentionInfo) {for (var _index in _this.attentionInfo[_item].article_images) {_this.imageList.push(_this.attentionInfo[_item].article_images[_index].image_url);}}for (var _index2 in _this.attentionInfo) {_this.formatAttentionTime(_index2);}_this.articleInfo = res.data.data.articles.data;for (var _item2 in _this.articleInfo) {for (var _index3 in _this.articleInfo[_item2].article_images) {_this.imageList.push(_this.articleInfo[_item2].article_images[_index3].image_url);}}for (var _index4 in _this.articleInfo) {_this.formatArticleTime(_index4);}_this.activityInfo = res.data.data.activities.data;for (var _item3 in _this.activityInfo) {for (var _index5 in _this.activityInfo[_item3].activity_images) {_this.imageList.push(_this.activityInfo[_item3].activity_images[_index5].image_url);}}for (var _index6 in _this.activityInfo) {_this.formatActivityTime(_index6);}_this.recruitInfo = res.data.data.recruits.data;for (var _item4 in _this.recruitInfo) {for (var _index7 in _this.recruitInfo[_item4].recruit_images) {_this.imageList.push(_this.recruitInfo[_item4].recruit_images[_index7].image_url);}}for (var _index8 in _this.recruitInfo) {_this.formatRecruitTime(_index8);}_this.loading = false;});}, methods: { loadNextPage: function loadNextPage() {var _this2 = this;if (this.loadingNext) {return;}var currentPage = 0;if (this.currentTab == 1) {if (this.activityComplete) {return;}this.activityCurrentPage++;currentPage = this.activityCurrentPage;} else if (this.currentTab == 2) {if (this.articleComplete) {return;}this.articleCurrentPage++;currentPage = this.articleCurrentPage;} else if (this.currentTab == 3) {if (this.recruitComplete) {return;}this.recruitCurrentPage++;currentPage = this.recruitCurrentPage;} else {if (this.attentionComplete) {return;}this.attentionCurrentPage++;currentPage = this.attentionCurrentPage;}this.loadingNext = true;_vue.default.prototype.$http.request({ url: '/information/recommend?page=' + currentPage, method: 'POST' }).then(function (res) {if (_this2.currentTab == 1) {if (res.data.data.activities.data.length == 0) {_this2.activityComplete = true;_this2.loadingNext = false;return;}_this2.activityInfo.push.apply(_this2.activityInfo, res.data.data.activities.data);for (var item = (currentPage - 1) * 10; item < _this2.activityInfo.length; item++) {for (var index in _this2.activityInfo[item].activity_images) {_this2.imageList.push(_this2.activityInfo[item].activity_images[index].image_url);}_this2.formatActivityTime(item);}setTimeout(function () {var query = uni.createSelectorQuery().in(_this2);query.select('#activity').boundingClientRect(function (res) {console.log(res);_this2.activity_height = res.height;}).exec();}, 30);} else if (_this2.currentTab == 2) {if (res.data.data.articles.data.length == 0) {_this2.articleComplete = true;_this2.loadingNext = false;return;}_this2.articleInfo.push.apply(_this2.articleInfo, res.data.data.articles.data);for (var _item5 = (currentPage - 1) * 10; _item5 < _this2.articleInfo.length; _item5++) {for (var _index9 in _this2.articleInfo[_item5].article_images) {_this2.imageList.push(_this2.articleInfo[_item5].article_images[_index9].image_url);}_this2.formatArticleTime(_item5);}setTimeout(function () {var query = uni.createSelectorQuery().in(_this2);query.select('#article').boundingClientRect(function (res) {console.log(res);_this2.article_height = res.height;}).exec();}, 30);} else if (_this2.currentTab == 3) {if (res.data.data.recruits.data.length == 0) {_this2.recruitComplete = true;_this2.loadingNext = false;return;}_this2.recruitInfo.push.apply(_this2.recruitInfo, res.data.data.recruits.data);for (var _item6 = (currentPage - 1) * 10; _item6 < _this2.recruitInfo.length; _item6++) {for (var _index10 in _this2.recruitInfo[_item6].recruit_images) {_this2.imageList.push(_this2.recruitInfo[_item6].recruit_images[_index10].image_url);}_this2.formatRecruitTime(_item6);}setTimeout(function () {var query = uni.createSelectorQuery().in(_this2);query.select('#recruit').boundingClientRect(function (res) {console.log(res);_this2.recruit_height = res.height;}).exec();}, 30);} else {if (res.data.data.attentions.data.length == 0) {_this2.attentionComplete = true;_this2.loadingNext = false;return;}_this2.attentionInfo.push.apply(_this2.attentionInfo, res.data.data.attentions.data);for (var _item7 = (currentPage - 1) * 10; _item7 < _this2.attentionInfo.length; _item7++) {for (var _index11 in _this2.attentionInfo[_item7].article_images) {_this2.imageList.push(_this2.attentionInfo[_item7].article_images[_index11].image_url);}_this2.formatAttentionTime(_item7);}setTimeout(function () {var query = uni.createSelectorQuery().in(_this2);query.select('#attention').boundingClientRect(function (res) {console.log(res);_this2.attention_height = res.height;}).exec();}, 30);}_this2.loadingNext = false;});}, pageScroll: function pageScroll(e) {if (e.detail.scrollTop >= 50) {this.fixTabbar = true;} else {this.fixTabbar = false;}if (this.currentTab == 0) {this.attention_scroll = e.detail.scrollTop;} else if (this.currentTab == 1) {this.activity_scroll = e.detail.scrollTop;} else if (this.currentTab == 2) {this.article_scroll = e.detail.scrollTop;} else if (this.currentTab == 3) {this.recruit_scroll = e.detail.scrollTop;}}, navigateArticle: function navigateArticle(article_id, comment) {uni.navigateTo({ url: '/pages/article/article?article_id=' + article_id + '&comment=' + comment });}, navigateActivity: function navigateActivity(activity_id, comment) {uni.navigateTo({ url: '/pages/activity/activity?activity_id=' + activity_id + '&comment=' + comment });}, navigateRecruit: function navigateRecruit(recruit_id, comment) {uni.navigateTo({ url: '/pages/recruit/recruit?recruit_id=' + recruit_id + '&comment=' + comment });}, viewImage: function viewImage(e) {uni.previewImage({ urls: this.imageList, current: e.currentTarget.dataset.url });}, likeRecruit: function likeRecruit(index, recruit_id) {var _this3 = this;_vue.default.prototype.$http.request({ url: '/likes/recruit', method: 'POST', params: { recruit_id: recruit_id } }).

      then(function (res) {
        _this3.recruitInfo[index].recruit_like = !_this3.recruitInfo[index].recruit_like;
        _this3.recruitInfo[index].recruit_like ? _this3.recruitInfo[index].recruit_likes++ : _this3.recruitInfo[index].recruit_likes--;
        _this3.$refs.notification.open({
          type: 'success',
          content: '操作成功',
          timeout: 1500,
          isClick: false });

      });
    },
    likeActivity: function likeActivity(index, activity_id) {var _this4 = this;
      _vue.default.prototype.$http.request({
        url: '/likes/activity',
        method: 'POST',
        params: {
          activity_id: activity_id } }).

      then(function (res) {
        _this4.activityInfo[index].activity_like = !_this4.activityInfo[index].activity_like;
        _this4.activityInfo[index].activity_like ? _this4.activityInfo[index].activity_likes++ : _this4.activityInfo[index].activity_likes--;
        _this4.$refs.notification.open({
          type: 'success',
          content: '操作成功',
          timeout: 1500,
          isClick: false });

      });
    },
    likeArticle: function likeArticle(index, article_id) {var _this5 = this;
      _vue.default.prototype.$http.request({
        url: '/likes/article',
        method: 'POST',
        params: {
          article_id: article_id } }).

      then(function (res) {
        _this5.articleInfo[index].article_like = !_this5.articleInfo[index].article_like;
        _this5.articleInfo[index].article_like ? _this5.articleInfo[index].article_likes++ : _this5.articleInfo[index].article_likes--;
        _this5.$refs.notification.open({
          type: 'success',
          content: '操作成功',
          timeout: 1500,
          isClick: false });

      });
    },
    likeAttention: function likeAttention(index, article_id) {var _this6 = this;
      _vue.default.prototype.$http.request({
        url: '/likes/article',
        method: 'POST',
        params: {
          article_id: article_id } }).

      then(function (res) {
        _this6.attentionInfo[index].article_like = !_this6.attentionInfo[index].article_like;
        _this6.attentionInfo[index].article_like ? _this6.attentionInfo[index].article_likes++ : _this6.attentionInfo[index].article_likes--;
        _this6.$refs.notification.open({
          type: 'success',
          content: '操作成功',
          timeout: 1500,
          isClick: false });

      });
    },
    getHeight: function getHeight() {
      var that = this;
      var height = 0;
      uni.getSystemInfo({
        success: function success(res) {
          that.screen_height = res.windowHeight;
          that.screen_width = res.windowWidth;
          var otherHeight = 0;
          var query = uni.createSelectorQuery().in(that);
          query.select('#information').boundingClientRect(function (res) {
            that.scroll_height = that.screen_height - res.top;
          }).exec();
        } });

    },
    navSelect: function navSelect(index) {var _this7 = this;
      this.currentNav = index;
      if (this.currentNav == 1) {
        setTimeout(function () {
          var query = uni.createSelectorQuery().in(_this7);
          query.select('#attention').boundingClientRect(function (res) {
            console.log(res);
            _this7.attention_height = res.height;
          }).exec();
          query.select('#article').boundingClientRect(function (res) {
            console.log(res);
            _this7.article_height = res.height;
          }).exec();
          query.select('#activity').boundingClientRect(function (res) {
            console.log(res);
            _this7.activity_height = res.height;
          }).exec();
          query.select('#recruit').boundingClientRect(function (res) {
            console.log(res);
            _this7.recruit_height = res.height;
          }).exec();
        }, 300);
      }
    },
    tabSelect: function tabSelect(e) {
      this.currentTab = e.currentTarget.dataset.id;
      this.randomScrollHeight();
      this.setScrollHeight();
    },
    tabSwiper: function tabSwiper(e) {
      this.currentTab = e.detail.current;
      this.randomScrollHeight();
      this.setScrollHeight();
    },
    randomScrollHeight: function randomScrollHeight() {
      if (Boolean(Math.round(Math.random()))) {
        if (this.currentTab == 0) {
          this.attention_scroll += 1;
        } else if (this.currentTab == 1) {
          this.activity_scroll += 1;
        } else if (this.currentTab == 2) {
          this.article_scroll += 1;
        } else if (this.currentTab == 3) {
          this.recruit_scroll += 1;
        }
      } else {
        if (this.currentTab == 0) {
          this.attention_scroll -= 1;
        } else if (this.currentTab == 1) {
          this.activity_scroll -= 1;
        } else if (this.currentTab == 2) {
          this.article_scroll -= 1;
        } else if (this.currentTab == 3) {
          this.recruit_scroll -= 1;
        }
      }
    },
    setScrollHeight: function setScrollHeight() {var _this8 = this;
      this.loadingItem = true;
      if (this.currentTab == 0) {
        this.page_scroll = this.attention_scroll;
      } else if (this.currentTab == 1) {
        this.page_scroll = this.activity_scroll;
      } else if (this.currentTab == 2) {
        this.page_scroll = this.article_scroll;
      } else if (this.currentTab == 3) {
        this.page_scroll = this.recruit_scroll;
      }
      setTimeout(function () {
        _this8.loadingItem = false;
      }, 400);

    },
    formatAttentionTime: function formatAttentionTime(index) {
      var time = this.attentionInfo[index].article_created.split(' ');
      var currentTime = new Date().toLocaleDateString();
      var differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
      var differenceWeekDay = 7 - differenceDay;
      if (differenceDay === 0) {
        this.attentionInfo[index].display_time = '今天 ' + time[1];
      } else if (differenceDay === 1) {
        this.attentionInfo[index].display_time = '昨天 ' + time[1];
      } else if (differenceDay === 2) {
        this.attentionInfo[index].display_time = '前天 ' + time[1];
      } else {
        if (differenceWeekDay > 0) {
          var targetWeekDay = new Date(this.attentionInfo[index].article_created).getDay();
          switch (targetWeekDay) {
            case 0:
              this.attentionInfo[index].display_time = '星期天 ' + time[1];
              break;
            case 1:
              this.attentionInfo[index].display_time = '星期一 ' + time[1];
              break;
            case 2:
              this.attentionInfo[index].display_time = '星期二 ' + time[1];
              break;
            case 3:
              this.attentionInfo[index].display_time = '星期三 ' + time[1];
              break;
            case 4:
              this.attentionInfo[index].display_time = '星期四 ' + time[1];
              break;
            case 5:
              this.attentionInfo[index].display_time = '星期五 ' + time[1];
              break;
            case 6:
              this.attentionInfo[index].display_time = '星期六 ' + time[1];
              break;}

        } else {
          this.attentionInfo[index].display_time = this.attentionInfo[index].created_at;
        }
      }
    },
    formatArticleTime: function formatArticleTime(index) {
      var time = this.articleInfo[index].article_created.split(' ');
      var currentTime = new Date().toLocaleDateString();
      var differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
      var differenceWeekDay = 7 - differenceDay;
      if (differenceDay === 0) {
        this.articleInfo[index].display_time = '今天 ' + time[1];
      } else if (differenceDay === 1) {
        this.articleInfo[index].display_time = '昨天 ' + time[1];
      } else if (differenceDay === 2) {
        this.articleInfo[index].display_time = '前天 ' + time[1];
      } else {
        if (differenceWeekDay > 0) {
          var targetWeekDay = new Date(this.articleInfo[index].article_created).getDay();
          switch (targetWeekDay) {
            case 0:
              this.articleInfo[index].display_time = '星期天 ' + time[1];
              break;
            case 1:
              this.articleInfo[index].display_time = '星期一 ' + time[1];
              break;
            case 2:
              this.articleInfo[index].display_time = '星期二 ' + time[1];
              break;
            case 3:
              this.articleInfo[index].display_time = '星期三 ' + time[1];
              break;
            case 4:
              this.articleInfo[index].display_time = '星期四 ' + time[1];
              break;
            case 5:
              this.articleInfo[index].display_time = '星期五 ' + time[1];
              break;
            case 6:
              this.articleInfo[index].display_time = '星期六 ' + time[1];
              break;}

        } else {
          this.articleInfo[index].display_time = this.articleInfo[index].created_at;
        }
      }
    },
    formatActivityTime: function formatActivityTime(index) {
      var time = this.activityInfo[index].activity_created.split(' ');
      var currentTime = new Date().toLocaleDateString();
      var differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
      var differenceWeekDay = 7 - differenceDay;
      if (differenceDay === 0) {
        this.activityInfo[index].display_time = '今天 ' + time[1];
      } else if (differenceDay === 1) {
        this.activityInfo[index].display_time = '昨天 ' + time[1];
      } else if (differenceDay === 2) {
        this.activityInfo[index].display_time = '前天 ' + time[1];
      } else {
        if (differenceWeekDay > 0) {
          var targetWeekDay = new Date(this.activityInfo[index].activity_created).getDay();
          switch (targetWeekDay) {
            case 0:
              this.activityInfo[index].display_time = '星期天 ' + time[1];
              break;
            case 1:
              this.activityInfo[index].display_time = '星期一 ' + time[1];
              break;
            case 2:
              this.activityInfo[index].display_time = '星期二 ' + time[1];
              break;
            case 3:
              this.activityInfo[index].display_time = '星期三 ' + time[1];
              break;
            case 4:
              this.activityInfo[index].display_time = '星期四 ' + time[1];
              break;
            case 5:
              this.activityInfo[index].display_time = '星期五 ' + time[1];
              break;
            case 6:
              this.activityInfo[index].display_time = '星期六 ' + time[1];
              break;}

        } else {
          this.activityInfo[index].display_time = this.activityInfo[index].created_at;
        }
      }
    },
    formatRecruitTime: function formatRecruitTime(index) {
      var time = this.recruitInfo[index].recruit_created.split(' ');
      var currentTime = new Date().toLocaleDateString();
      var differenceDay = Math.abs(Math.ceil((new Date(currentTime) - new Date(time[0])) / (1000 * 60 * 60 * 24)));
      var differenceWeekDay = 7 - differenceDay;
      if (differenceDay === 0) {
        this.recruitInfo[index].display_time = '今天 ' + time[1];
      } else if (differenceDay === 1) {
        this.recruitInfo[index].display_time = '昨天 ' + time[1];
      } else if (differenceDay === 2) {
        this.recruitInfo[index].display_time = '前天 ' + time[1];
      } else {
        if (differenceWeekDay > 0) {
          var targetWeekDay = new Date(this.recruitInfo[index].recruit_created).getDay();
          switch (targetWeekDay) {
            case 0:
              this.recruitInfo[index].display_time = '星期天 ' + time[1];
              break;
            case 1:
              this.recruitInfo[index].display_time = '星期一 ' + time[1];
              break;
            case 2:
              this.recruitInfo[index].display_time = '星期二 ' + time[1];
              break;
            case 3:
              this.recruitInfo[index].display_time = '星期三 ' + time[1];
              break;
            case 4:
              this.recruitInfo[index].display_time = '星期四 ' + time[1];
              break;
            case 5:
              this.recruitInfo[index].display_time = '星期五 ' + time[1];
              break;
            case 6:
              this.recruitInfo[index].display_time = '星期六 ' + time[1];
              break;}

        } else {
          this.recruitInfo[index].display_time = this.recruitInfo[index].created_at;
        }
      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 80:
/*!***************************************************************************************!*\
  !*** /Users/yuanhy/Desktop/Chat/main.js?{"page":"pages%2Finformation%2Finformation"} ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _information = _interopRequireDefault(__webpack_require__(/*! ./pages/information/information.vue */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_information.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["createPage"]))

/***/ })

},[[80,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-qq/pages/information/information.js.map