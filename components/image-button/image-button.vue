<template>
	<button @getuserinfo="bindGetUserInfo" class="avatar-button" open-type="getUserInfo" plain=false>
		<slot name="img">
		</slot>
	</button>
</template>

<script>
	export default {
		props: {
			type: {
				type: String
			}
		},
		methods: {
			bindGetUserInfo(event) {
				this.$emit('bindGetUserInfo', {
					info: event.detail
				});
			}
		}
	}
</script>

<style>
</style>
