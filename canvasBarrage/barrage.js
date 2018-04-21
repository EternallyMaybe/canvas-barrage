var Barrage = function(video, canvas, options) {
    
    if (!video || !canvas) return;
    
    var defaults = {
            opacity: 100,
            fontSize: 16,
            color: '#ffffff',
            position: 'all',
            speed: 2,
            data: [],
            value: ''
        },
        positions =  {
            top: [0,0.3],
            center: [0.3,0.7],
            bottom: [0.7,1],
            all: [0, 1]
        },
        params = {},
        // 绘画内容
        canvasHeight = canvas.clientHeight,
        canvasWidth = canvas.clientWidth,
        context = canvas.getContext('2d'),
        top = this,
        // 存储实例
        store = [],
        // 暂停与否
        isPause = true,
        // 播放时长
        time = video.currentTime,
        play = false;

    options = options || {};

    for (let key of Object.keys(defaults)) {
        if (options[key]) {
            params[key] = options[key];
        } else {
            params[key] = defaults[key];
        }
        top[key] = params[key];
    }
    if(!top.data || !top.data.length) return;

    var colorRgb = function (color) {
        var reg = /^#[0-9a-f]{3}|[0-9a-f]{6}$/,
            rgbArr = [];
        if (color && reg.test(color.toLowerCase())) {
            var newColor = "#";
            if (color.length === 4) {
                for (var i = 1; i < 4; i++) {
                    newColor += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                }
                color = newColor;
            }
            for (var i = 1; i < 7; i += 2) {
                rgbArr.push(parseInt(color.slice(i, i + 2), 16))
            }
        }
        return rgbArr;
    }

    var barrage = function(obj) {
        this.value = obj.value;
        this.time = obj.time;
        this.init = function() {
            // 1. 移动速度
            var speed = obj.speed == undefined ? top.speed : parseInt(obj.speed);
            if (speed !== 0) {
                speed = speed + obj.value.length / 100;
            }
            // 2. 字号大小
			var fontSize = obj.fontSize || top.fontSize;
            // 3. 文字颜色
            var color = obj.color || top.color;
            // 转换成rgb颜色
            color = colorRgb(color);
            // 4. range范围
			var range = obj.range || top.range;
			// 5. 透明度
			var opacity = obj.opacity || top.opacity;
            opacity = opacity / 100;
            // 求得文字内容宽度
            var span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.whiteSpace = 'nowrap';
            span.style.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif';
            span.innerText = obj.value;
            span.textContent = obj.value;
            document.body.appendChild(span);
            this.width = span.clientWidth;
            document.body.removeChild(span);
            // 设置初始位置
            this.x = canvasWidth;
            if (speed == 0) {
                this.x = (canvasWidth - this.width) / 2;
            }
            var position = obj.position || top.position,
                area = positions[position],
                start = area[0] * canvasHeight + parseInt(fontSize),
                end = (area[1] - area[0]) * canvasHeight - parseInt(fontSize) * 2;
            this.y = start + end * Math.random();
            this.moveX = speed;
			this.opacity = opacity;
			this.color = color;
			this.area = area;
			this.fontSize = fontSize;
        }
        this.draw = function() {
            context.shadowColor = "rgba(0, 0, 0, " + this.opacity + ")";
            context.shadowBlur = 2;
            context.font = this.fontSize + 'px "microsoft yahei", sans-serif';
            context.fillStyle = "rgba(" + this.color.join(",") + "," + this.opacity +")";
            context.fillText(this.value, this.x, this.y);
        }
        
    }

    top.data.forEach((data, index) => {
        store[index] = new barrage(data);
    });

    function draw() {
        for (index in store) {
            var barrage = store[index];
            if (time > barrage.time && !barrage.disabled) {
                if (!barrage.inited) {
                    barrage.init();
                    barrage.inited = true;
                }
                if (barrage.x < -1 * barrage.width) {
                    barrage.disabled = true;
                }
                if(this.moveX !== 0 && barrage.x > -1 * barrage.width) {
                    barrage.x -= barrage.moveX;
                    barrage.draw();
                } 
            }
        }
    }

    function render() {
        // 更新已经播放时间
        time = video.currentTime;
        // 清空画布
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        // 绘制画布
        draw();
        // 继续渲染
		if (play) {
			requestAnimationFrame(render);
		}
    }

    video.addEventListener('play', function(){
        play = true;
        render();
    });
    video.addEventListener('pause', function(){
        play = false;
    });
    video.addEventListener('seeked', function(){
        top.reset();
    });
    
	// 添加数据的方法 
	this.add = function (obj) {
        store[store.length] = new barrage(obj);
    };
    
    this.reset = function() {
        time = video.currentTime;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        for (index in store) { 
            var barrage = store[index];
            if (barrage.time >= time) {
                barrage.disabled = false;
            } else {
                barrage.disabled = true;
            }
        }
    }
}