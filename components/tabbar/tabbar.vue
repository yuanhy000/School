<template>
	<view>
		<view class="cu-bar tabbar bg-white">
			<view class="action " @click="NavChange" data-cur="chat">
				<view>
					<image :src="'/static/tabbar/chat' + [PageCur=='chat'?'-on':''] + '.png'" class="tab-img"></image>
				</view>
				<view :class="PageCur=='chat'?'text-tabbar-on':'text-tabbar'">聊天</view>
			</view>
			<view class="action " @click="NavChange" data-cur="contacts">
				<view>
					<image :src="'/static/tabbar/contacts' + [PageCur=='contacts'?'-on':''] + '.png'" class="tab-img">
					</image>
				</view>
				<view :class="PageCur=='contacts'?'text-tabbar-on':'text-tabbar'">好友</view>
			</view>
			<view class="action add-action" @click="NavChange">
				<button class="cu-btn cuIcon-add addition-button shadow">
				</button>
				<view class="text-addition">发布</view>
			</view>
			<view class="action " @click="NavChange" data-cur="discovery">
				<view>
					<image :src="'/static/tabbar/discovery' + [PageCur=='discovery'?'-on':''] + '.png'" class="tab-img">
					</image>
				</view>
				<view :class="PageCur=='discovery'?'text-tabbar-on':'text-tabbar'">发现</view>
			</view>
			<view class="action " @click="NavChange" data-cur="user">
				<view>
					<image :src="'/static/tabbar/user' + [PageCur=='user'?'-on':''] + '.png'" class="tab-img"></image>
				</view>
				<view :class="PageCur=='user'?'text-tabbar-on':'text-tabbar'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'chat'
			};
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style scoped src="./tabbar.css">
</style>
