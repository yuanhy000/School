<template>
	<view>
		<view class="cu-bar tabbar bg-white">
			<view class="action" @click="NavChange" data-cur="information" @tap="Toggle" :data-class="'scale-up'" :class="[PageCur=='information'?'animation-fade':'']">
				<view>
					<image :src="'/static/tabbar/chat' + [PageCur=='information'?'-on':''] + '.png'" class="tab-img"></image>
				</view>
				<view :class="PageCur=='information'?'text-tabbar-on':'text-tabbar'">聊天</view>
			</view>
			<view class="action " @click="NavChange" data-cur="store" @tap="Toggle" :data-class="'scale-up'" :class="[PageCur=='store'?'animation-fade':'']">
				<view>
					<image :src="'/static/tabbar/store' + [PageCur=='store'?'-on':''] + '.png'" class="tab-img">
					</image>
				</view>
				<view :class="PageCur=='store'?'text-tabbar-on':'text-tabbar'">商城</view>
			</view>
			<view class="action add-action" @click="NavChange" data-cur="addition">
				<button class="cu-btn cuIcon-add addition-button shadow" @tap="Toggle" :class="[PageCur=='addition'?'animation-fade':'']">
				</button>
				<view :class="PageCur=='addition'?'text-addition-on':'text-addition'">发布</view>
			</view>
			<view class="action " @click="NavChange" data-cur="discovery" @tap="Toggle" :class="[PageCur=='discovery'?'animation-fade':'']">
				<view>
					<image :src="'/static/tabbar/discovery' + [PageCur=='discovery'?'-on':''] + '.png'" class="tab-img">
					</image>
				</view>
				<view :class="PageCur=='discovery'?'text-tabbar-on':'text-tabbar'">发现</view>
			</view>
			<view class="action " @click="NavChange" data-cur="user" @tap="Toggle" :class="[PageCur=='user'?'animation-fade':'']">
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
				PageCur: 'information',
				animation: 'scale-up',
			};
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
				this.$emit('navigate', {
					page: this.PageCur
				})
			},
			Toggle(e) {
				var anmiaton = e.currentTarget.dataset.class;
				this.animation = anmiaton;
				setTimeout(() => {
					this.animation = '';
				}, 400)
			},
		}
	}
</script>

<style scoped src="./tabbar.css">
</style>
