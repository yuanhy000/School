<view><cu-custom vue-id="1" bgColor="bg-gradual-tab" isBack="{{true}}" bind:__l="__l" vue-slots="{{['backText','content']}}"><view slot="backText">返回</view><view style="font-size:28rpx!important;letter-spacing:1rpx;" slot="content">选择位置</view></cu-custom><map style="width:100%;height:300px;" id="map" longitude="113.324520" latitude="23.099994" scale="14" controls="{{controls}}" bindcontroltap="controltap" markers="{{markers}}" bindmarkertap="markertap" polyline="{{polyline}}" bindregionchange="regionchange" show-location></map></view>