<template>
	<view class="flex align-center justify-center">
		<view class="spinner">
			<view class="double-bounce1"></view>
			<view class="double-bounce2"></view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.spinner {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		margin: 20px auto 10px auto;
	}

	.double-bounce1,
	.double-bounce2 {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #39495E;
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-animation: bounce 2.0s infinite ease-in-out;
		animation: bounce 2.0s infinite ease-in-out;
	}

	.double-bounce2 {
		-webkit-animation-delay: -1.0s;
		animation-delay: -1.0s;
	}

	@-webkit-keyframes bounce {

		0%,
		100% {
			-webkit-transform: scale(0.0)
		}

		50% {
			-webkit-transform: scale(1.0)
		}
	}

	@keyframes bounce {

		0%,
		100% {
			transform: scale(0.0);
			-webkit-transform: scale(0.0);
		}

		50% {
			transform: scale(1.0);
			-webkit-transform: scale(1.0);
		}
	}
</style>
