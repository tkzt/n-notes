---
title: 小程序 Canvas 导出图片记
titleTemplate: 那些杀不死我的
---

# 小程序 Canvas 导出图片记

手上有个小程序编辑图片导出的小项目。在去年（2021）编码的时候，根据文档打算采用 `离屏 Canvas` 实现导出，但实际写的时候，一直报一个大致为 `xxx 没有 drawImage 属性` 的很不 intuitive 的错误，于是开始检索，最终在社区看见有老铁遇到了类似的问题，评论区看下来大致得出个 **当前离屏 Canvas 尚不支持** 的结论。本着心智负担最小化的原则，最终采用 DOM 里放一个 `position: fixed; top: -200vh;` 的 Canvas，利用此 Canvas 来导出的方案，因此埋坑。

到最近，开始收到导出图片不清晰的反馈，反复调参、检索、脱发、祷告后，发现社区有直接采用离屏 Canvas 的方案，试了一下，可行，大喜。特此记录。

## 主要代码如下

```js
const canvas = wx.createOffscreenCanvas({
    width, 
    height,
    type: '2d'
});
const ctx = canvas.getContext('2d');
const img = canvas.createImage();

img.src =  "an-image-src";
img.onload=()=>{
    ctx.drawImage(
        img,
        0,
        0,
        imageWidth,
        imageHeight,
        0,
        0,
        targetWidth,
        targetHeight
    );
    
    wx.canvasToTempFilePath({
        canvas,
        quality: 1,
        async success(res) {
            console.log(res.tempFilePath);
        },
    });
}
```

然而今天（2022/10/26）发现，IOS 端，`canvasToTempFilePath` 会报 `invalid viewId` 错误，于是改改写法：

```js
const base64 = canvas.toDataURL("image/png");
const tempPath = wx.env.USER_DATA_PATH+`/${new Date().getTime()}.png`;
const imgData = base64.split(',').slice(1).join('');
const fs = wx.getFileSystemManager();
fs.writeFileSync(tempPath, imgData, "base64");

console.log(tempPath);
```


## 参考

* [[开盖即食]小程序Canvas官方新版API实战](https://developers.weixin.qq.com/community/develop/article/doc/000242073903a04e082ab595b52013)
