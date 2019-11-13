<!-- 
 *属性 isdistance 每个弹窗之间是否有间距
 *数组形式传值
 *type,类型 success warn info err loading（string）
 *content,内容（string）
 *timeout,消失时间（Number）
 *isClick,是否点击消失（Boolean）
 -->
<template>
	<view class="popup_list">
		<view v-for="(items,index) of popup_list" :id="items.uuid" :key="items.uuid" >
			<view class="mpopup" :style="{ background: items.color ,top:index*distance+75+'px'}" :class="[items.animator,items.typeClass]" @click="close(items.uuid,index)">
				<view class="pic"><image class="icon" mode="aspectFit" :src="items.icon"></image></view>
				<text class="text" :style="{ color: items.colortext }">{{ items.content }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				popup_list:[],//弹窗数组
				distance:65//每个弹窗之间间距
			}
		},
		props:{
			//是否有间距
			isdistance:{
				type:Boolean,
				default:true
			},
			
		},
		methods:{
			init:function(list){			
				if (list.type == 'success') {
					list.icon = '../../static/xuan-popup/success.png';
					list.typeClass='mpopup-success';
					return list;
				}
				if (list.type == 'warn') {
					list.icon = '../../static/xuan-popup/warn.png';
					list.typeClass='mpopup-warn';
					return list;
				}
				if (list.type == 'info') {
					list.icon = '../../static/xuan-popup/info.png';
					list.typeClass='mpopup-info';
					return list;
				}
				if (list.type == 'err') {
					list.icon = '../../static/xuan-popup/err.png';
					list.typeClass='mpopup-err';
					return list;
				}
				if (list.type == 'loading') {
					list.icon = '../../static/xuan-popup/loading.png';
					list.typeClass='mpopup-loading';
					return list;
				}
			},
			open:function(list){
				if(!this.isdistance){this.distance=0}
				//生成uuid
				let uuid=this.guid();
				list.uuid=uuid;
				//添加动画
				list.animator='fade_Down';
				//判断是否可点击消失/可控制消失
				if(typeof(list.isClick)!='boolean'){list.isClick=false;}
				//if(typeof(list.isControl)!='boolean'){list.isControl=false;}
				
				//初始化
				let new_list=this.init(list);		
				//添加进数组
				this.popup_list.push(new_list);
		
				if(!new_list.isClick){
					this.disappear(new_list.uuid,new_list.timeout);
				}//可点击消失
				else{
					this.$emit('uuidCallback',new_list.uuid);
				}
				// else if(new_list.isControl){
				// 	this.$emit('Callback',new_list.uuid);
				// }
				
			},
			//自动消失
			disappear:function(uuid,timeout){
				//退出动画之后，短暂延迟后移除本元素
				this.fade_out_animator(uuid,timeout).then(res=>{
					setTimeout(()=>{
						for(let i=0;i<this.popup_list.length;i++){
							if(this.popup_list[i].uuid==res){
								//移除本元素
								this.popup_list.splice(i,1);
								this.$forceUpdate()
							}
						}
					},250)
				});
			},
			fade_out_animator:function(uuid,timeout){
				//timeout秒后退出
				if(!timeout||typeof(timeout)!='number'){timeout=3000;}
				return new Promise(res=>{
					setTimeout(()=>{
						for(let i=0;i<this.popup_list.length;i++){
							if(this.popup_list[i].uuid==uuid){
								//添加退出动画
								this.popup_list[i].animator='fade_Top';
								res(uuid);
							}
						}
					},timeout)
				})
			},
			//可控制关闭的弹出框
			close:function(uuid,ind){
				if(ind){
					if(!this.popup_list[ind].isClick){return}
				}
				this.remove_element(uuid).then((res)=>{
					setTimeout(()=>{
						for(let i=0;i<this.popup_list.length;i++){
							if(this.popup_list[i].uuid==res){
								//移除本元素
								this.popup_list.splice(i,1);
								this.$emit('closeCallback',uuid);
								this.$forceUpdate()
							}
						}
					},250)
				})
			},
			//控制移除元素
			remove_element:function(uuid){
				return new Promise(res=>{
					for (var i = 0; i < this.popup_list.length; i++) {
						if(this.popup_list[i].uuid==uuid){
							this.popup_list[i].animator='fade_Top';
							res(uuid)
							break;
						} 
					}
				})
				
			},
			//更新
			update:function(update_list){
				for (var i = 0; i < this.popup_list.length; i++) {
					if(this.popup_list[i].uuid==update_list.uuid){
						this.popup_list[i].type=update_list.type;
						this.init(this.popup_list[i]);
						this.popup_list[i].content=update_list.content;
						break;
					} 
				}
			},
			//生成uuid
			guid:function() {
			    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			        return v.toString(16);
			    });
			}
		}
	}
</script>

<style lang="scss">
	.mpopup{
		display: flex;
		flex-direction: row;
		text-align: center;
		justify-content: center;
		align-items: center;
		min-height: 45px;
		width: 550rpx;
		transition :all .5s;
		position: fixed;
		left: 0;
		right: 0;
		margin: 0 auto;
		border-radius: 5px;	
		z-index:998;
		.pic{
			display: flex;
			text-align: center;
			justify-content: center;
			width: 15px;
			height: 15px;
			margin: auto 20px auto 0;
			.icon{
				width: 100%;
				height: auto;
			}
		}
		.text{
			margin: auto 20px auto 0;
			width: 65%;
			font-size: 16px;
		}
	}
	.mpopup-success{
		background: #f0f9eb;
		border: 1px solid #e1f3d8;
		color: #67c23a;
	}
	.mpopup-err{
		background: #fef0f0;
		border: 1px solid #fde2e2;
		color: #f56c6c;
	}
	.mpopup-warn{
		background: #fdf6ec;
		border: 1px solid #faecd8;
		color: #e6a23c;
	}
	.mpopup-info{
		background: #edf2fc;
		border: 1px solid #ebeef5;
		color: #909399;
	}
	.mpopup-loading{
		background: #e2f5ff;
		border: 1px solid #ceeeff;
		color: #5cbaff;
		image{
			animation: rotate360 1.5s ease infinite;
		}
	}
	.fade_Down{
		animation: fadeInDown 0.6s both;
	}
	.fade_Top{
		animation: fadeInTop 0.5s forwards;
	}
	/*从上到下*/
	@keyframes fadeInDown
	{
	    from {
	        opacity: 0;
	        -webkit-transform: translate(0,-100px); 
	        transform: stranslate(0,-100px); 
	    }
	    to {
	        opacity:1;
	        -webkit-transform: translate(0,10px);
	        transform: stranslate(0,10px);
	    }
	}
	/*从下到上*/
	@keyframes fadeInTop
	{
	    from {
	        opacity:1;
	        -webkit-transform: translate(0,10px); 
	        transform: stranslate(0,10px);
	    }
	    to {
	
			opacity: 0;
			-webkit-transform: translate(0,-100px);
			transform: stranslate(0,-100px);
	    }
	}
	@keyframes rotate360
	{
		from {
			transform: rotate(0);
		}
		to{
			transform: rotate(360deg);
		}
	}
</style>
