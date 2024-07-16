import { $http } from '@escook/request-miniprogram'
$http.baseUrl = 'http://21.6.188.48.devcloud.woa.com:8099'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {

	uni.showLoading({
		title:'数据加载中...'
	})
	return options
}

// 请求完成之后做一些事情
$http.afterRequest = function (result) {
	uni.hideLoading()
}

export default $http