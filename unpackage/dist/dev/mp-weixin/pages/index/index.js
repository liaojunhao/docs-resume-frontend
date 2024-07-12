"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      videoUrl: "https://static.taishan.qq.com/test/ai-video/d0.mp4",
      img: "",
      tempFiles: [],
      currentVideoUrl: ""
    };
  },
  onLoad() {
  },
  methods: {
    async _render() {
      console.log(this.img, this.tempFiles);
    },
    // 添加图片
    async _addImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          const { tempFilePaths, tempFiles } = res;
          this.img = tempFilePaths[0];
          const tempFile = tempFiles[0];
          common_vendor.index.showLoading({});
          common_vendor.index.uploadFile({
            url: "http://21.6.188.48.devcloud.woa.com:8099/render",
            // 上传的服务器接口地址
            filePath: tempFile.path,
            // 要上传文件资源的路径
            name: "imageFile",
            // 文件对应的 key，服务器端通过这个 key 获取文件数据
            formData: {
              templateKey: "d1"
              // 添加额外的字段
            },
            success: (uploadFileRes) => {
              const res2 = JSON.parse(uploadFileRes.data);
              const { data: { videoUrl, videoCropUrl, sourceImage } } = res2;
              console.log("上传成功", videoUrl, videoCropUrl, sourceImage);
              this.currentVideoUrl = `http://21.6.188.48.devcloud.woa.com:8099/${videoUrl}`;
              console.log(this.currentVideoUrl);
              common_vendor.index.showToast({
                icon: "success",
                title: "渲染成功"
              });
            },
            fail: (err) => {
              console.error("上传失败", err);
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options._addImage && $options._addImage(...args)),
    b: $data.videoUrl,
    c: $data.currentVideoUrl
  }, $data.currentVideoUrl ? {
    d: $data.currentVideoUrl
  } : {}, {
    e: $data.img
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
