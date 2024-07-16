<template>
	<view class="content">
		<view style="width: 100%;">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
				<view v-for="item in videoTemplates" :class="`${item.key === selectKey?'active':''} scroll-view-item_H`" @touchstart="_select(item)">
					<video :src="item.url" object-fit="cover"></video>
				</view>
			</scroll-view>
		</view>
		<view class="uni-common-pb"></view>
		<view class="pd10">请选择一个视频</view>
		<view class="pd10">
			<button :disabled="Boolean(!selectKey)" @click="_addImage">上传图片进行合成</button>
		</view>
		
		<view v-if="currentVideoUrl">
			<video :src="currentVideoUrl" object-fit="cover" autoplay="autoplay" loop="" muted=""></video>
		</view>
		
	</view>
</template>

<script>
	import $http from '../../ajax'
	export default {
		data() {
			return {
				currentVideoUrl:'',
				videoTemplates: [],
				selectKey: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad() {
			// 拉取模板列表
			$http.get(`/template-list?_=${new Date().getTime()}`).then((result)=>{
				const res = result.data
				this.videoTemplates = res.data?.list ? res.data?.list : [];
			}).catch((e)=>{
				console.error('加载模板失败',e)
			})
		},
		methods: {
			_select(item){
				// console.log(item)
				this.selectKey = item.key;
				
			},
			scroll(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			// 添加图片
			async _addImage(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						const {tempFilePaths, tempFiles} = res;
						this.img = tempFilePaths[0]
						const tempFile = tempFiles[0];
						uni.showLoading({
							title:'正在合成...'
						})
						// 上传文件
						uni.uploadFile({
						  url: 'http://21.6.188.48.devcloud.woa.com:8099/render', // 上传的服务器接口地址
						  filePath: tempFile.path, // 要上传文件资源的路径
						  name: 'imageFile', // 文件对应的 key，服务器端通过这个 key 获取文件数据
						  formData: {
							templateKey: this.selectKey // 添加额外的字段
						  },
						  success: (uploadFileRes) => {
							
							const res = JSON.parse(uploadFileRes.data)
							const {data: {videoUrl, videoCropUrl, sourceImage}} = res
							console.log('上传成功', videoUrl, videoCropUrl, sourceImage);
							
							this.currentVideoUrl = `http://21.6.188.48.devcloud.woa.com:8099/${videoUrl}`
							
								
							uni.showToast({
								icon:'success',
								title: '渲染成功'
							})
							
							// 清除状态
							this.selectKey = ''
						  },
						  fail: (err) => {
							console.error('上传失败', err);
						  },
						  complete() {
						  	uni.hideLoading()
						  }
						});
					}
				})
			}
		}
	}
</script>

<style>
	.active{
		border: 2px solid red;
		background-color: red;
	}
	.pd10{
		padding: 40rpx 0;
	}
	.scroll-Y {
		height: 300rpx;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: auto;
	}
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 450rpx;
		line-height: 450rpx;
		text-align: center;
	}
	.box {
		display: flex;
		gap: 20rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30rpx;
	}

	
</style>
