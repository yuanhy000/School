<view class="addition-container"><cu-custom vue-id="1" bgColor="bg-gradual-tab" isBack="{{true}}" bind:__l="__l" vue-slots="{{['backText','content']}}"><view slot="backText">返回</view><view slot="content">Addition</view></cu-custom><scroll-view style="{{'height:'+(scroll_height+'px')+';'}}" scroll-y id="scroll"><view class="padding-top"><view class="cu-tabbar-height bg-white margin-left margin-right  border-radius bg-white shadow flex align-center "><input class="margin-left margin-right text-sm" type="text" placeholder="活动名称" data-event-opts="{{[['input',[['__set_model',['','title','$event',[]]]]]]}}" value="{{title}}" bindinput="__e"/></view><view class="cu-form-group margin-left margin-top margin-right margin-bottom border-radius bg-white shadow"><textarea class="textarea-font-size" placeholder="填写活动内容..." maxlength="-1" data-event-opts="{{[['input',[['__set_model',['','content','$event',[]]]]]]}}" value="{{content}}" bindinput="__e"></textarea></view><view class="cu-form-group margin-left margin-top margin-right margin-bottom border-radius bg-white shadow"><textarea class="textarea-font-size-other" placeholder="活动注意事项(可选)" maxlength="-1" data-event-opts="{{[['input',[['__set_model',['','attention','$event',[]]]]]]}}" value="{{attention}}" bindinput="__e"></textarea></view><view class="cu-form-group margin-left margin-right margin-top margin-bottom border-rad ius bg-white border-radius shadow"><view class="grid col-4 grid-square flex-sub  margin-top"><block wx:for="{{selectImageList}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="bg-img" data-url="{{selectImageList[index]}}" data-event-opts="{{[['tap',[['ViewImage',['$event']]]]]}}" bindtap="__e"><image src="{{selectImageList[index]}}" mode="aspectFill"></image><view class="cu-tag bg-red" data-index="{{index}}" data-event-opts="{{[['tap',[['DelImg',['$event']]]]]}}" catchtap="__e"><text class="cuIcon-close"></text></view></view></block><block wx:if="{{selectImageList.length<9}}"><view data-event-opts="{{[['tap',[['ChooseImage',['$event']]]]]}}" class="solids" bindtap="__e"><text class="cuIcon-cameraaddfill text-theme-color"></text></view></block></view></view><view class="cu-btn bg-gradual-tab lg block shadow radius margin-xl" data-target="viewModal" data-event-opts="{{[['tap',[['Submit',['$event']]]]]}}" bindtap="__e">发布活动</view></view></scroll-view><view class="{{['cu-modal',showToast?'show':'']}}"><view class="cu-dialog"><view class="cu-bar bg-white justify-end"><view class="content">发布提示</view><view data-event-opts="{{[['tap',[['hideModal',['$event']]]]]}}" class="action" bindtap="__e"><text class="cuIcon-close text-theme-color"></text></view></view><view class="padding-xl" style="letter-spacing:2rpx;font-size:26rpx;">{{''+toastContent+''}}</view></view></view></view>