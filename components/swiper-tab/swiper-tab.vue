<template>
	<div class="tabbar-slide-wrapper">
		<div class="swiper-container" :class="options.container">
			<div class="swiper-wrapper">
				<div :style="[slideStyle, {'color': (index == slideOptions.slideIndex) ? slideStyle.checkedColor : slideStyle.color}]"
				 :class="[index == slideOptions.slideIndex ? 'swiper-slide-checked' : '', 'swiper-slide']" v-for="(item, index) in options.slideData"
				 :key="index">{{item}}</div>
				<!-- 下划线 -->
				<div :style="{width: slideStyle.width, height: downLineStyle.downLineHeight, background: downLineStyle.downLineColor}"
				 ref="slideDownLine" class="slide-down-line"></div>
			</div>
		</div>
		<div class="tabbar-slide-container"></div>
	</div>
</template>

<script>
	import vueTabbarSlide from './lib/vueTabbarSlide'
	export default {
		name: 'app',
		data() {
			return {
				options: {
					container: 'mySlide1',
					slideData: [],
					width: '80px',
					index: 1
				},
				options1: {
					container: 'mySlide2',
					slideData: [],
					width: '80px',
					index: 1
				},
				callbackHtml: '',
				callbackHtml1: ''
			}
		},
		// components: {
		// 	vueTabbarSlide: vueTabbarSlide,
		// 	vueTabbarSlide1: vueTabbarSlide
		// },
		methods: {
			getData() {
				this.options.slideData = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9', 'data10']
				this.options1.slideData = ['data11', 'data21', 'data31', 'data41', 'data51', 'data61']
			},
			callback(event, index, val) {
				this.callbackHtml = index + ';' + val
			},
			callback1(event, index, val) {
				this.callbackHtml1 = index + ';' + val
			},
		}
	}
</script>

<style>
</style>
