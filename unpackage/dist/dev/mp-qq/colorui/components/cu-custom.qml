<view><view class="cu-custom fixed" style="{{'z-index:99999;'+('height:'+(CustomBar+'px')+';')}}"><view class="{{['cu-bar fixed',bgImage!=''?'none-bg text-white bg-img':'',bgColor]}}" style="{{(style)}}"><block wx:if="{{isBack}}"><view data-event-opts="{{[['tap',[['BackPage',['$event']]]]]}}" class="action" bindtap="__e"><text class="cuIcon-back"></text><slot name="backText"></slot></view></block><view class="content" style="{{'top:'+(StatusBar+'px')+';'}}"><slot name="content"></slot></view><slot name="right"></slot></view></view></view>