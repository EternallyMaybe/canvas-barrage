# canvas-barrage
通过canvas绘制弹幕

## 使用说明
```
// 初始对象
var barrage = new Barrage(video, canvas, {
    data: dataBarrage
});
// 添加弹幕
barrage.add({
    opacity: opacity,
    fontSize: fontSize,
    value: content,
    color: color,
    position: position,
    time: video.currentTime,
    speed: speed
});
```
## 参数说明
| 参数名 | 说明 | 默认值 | 
| ----- | ---- | -------|
| value | 文本内容 | 无 | 
| opacity | 透明度 | 100 | 
| fontSize | 字体大小 | 16 | 
| color | 颜色 | #ffffff | 
| position | 显示位置 | all | 
| time | 显示时间 | 无 | 
| speed | 移动速度 | 2 | 

## 其他说明 
* input.css重置radio、checkbox、range样式，暂只做chrome兼容
* input.js增加range的thumb移动时的数据提示

## 原文地址
[http://www.zhangxinxu.com/wordpress/2017/09/html5-canvas-video-barrage/](http://www.zhangxinxu.com/wordpress/2017/09/html5-canvas-video-barrage/)