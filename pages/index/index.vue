<template>
	<view class="content">
		<view class="box">
			<button type="primary" @click="_addImage">上传渲染</button>
		</view>
		<view style="padding: 30rpx;">
			<video :src="videoUrl" object-fit="cover"></video>
		</view>
		<view class="uni-common-pb"></view>
		<view style="padding: 30rpx;" v-if="currentVideoUrl">
			<video :src="currentVideoUrl" object-fit="cover" autoplay="autoplay" loop="" muted=""></video>
		</view>
		<image :src="img" mode="aspectFill"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl: 'https://static.taishan.qq.com/test/ai-video/d0.mp4',
				img: '',
				tempFiles:  [],
				currentVideoUrl: ''
			}
		},
		onLoad() {

		},
		methods: {
			async _render(){
				console.log(this.img, this.tempFiles)
				
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
						})
						// 上传文件
						uni.uploadFile({
						  url: 'http://21.6.188.48.devcloud.woa.com:8099/render', // 上传的服务器接口地址
						  filePath: tempFile.path, // 要上传文件资源的路径
						  name: 'imageFile', // 文件对应的 key，服务器端通过这个 key 获取文件数据
						  formData: {
							templateKey: 'd1' // 添加额外的字段
						  },
						  success: (uploadFileRes) => {
							
							const res = JSON.parse(uploadFileRes.data)
							const {data: {videoUrl, videoCropUrl, sourceImage}} = res
							console.log('上传成功', videoUrl, videoCropUrl, sourceImage);
							
							this.currentVideoUrl = `http://21.6.188.48.devcloud.woa.com:8099/${videoUrl}`
							console.log(this.currentVideoUrl)
								
							uni.showToast({
								icon:'success',
								title: '渲染成功'
							})
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
	.scroll-view_H{
		display: inline-block;
		width: 100%;
		height: 225px;
		line-height: 225px;
		text-align: center;
		font-size: 18px;
	}
	.scroll-view_H{
		white-space: nowrap;
		width: 100%;
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
