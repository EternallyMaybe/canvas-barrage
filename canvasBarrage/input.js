(function() {
    // 处理input range
    var ranges = document.getElementsByName('range');
    for(var i = 0, total = ranges.length; i < total; i++) {
        (function() {
            var range = ranges[i],
                max = range.max,
                min = range.min,
                rangeDiv = document.createElement('div'),
                content = document.createElement('div'),
                parent = range.parentElement;
            range.value = min;
            rangeDiv.className = 'range-div';
            rangeDiv.appendChild(content);
            parent.insertBefore(rangeDiv, range);
            
            // 数据变化
            range.addEventListener('input', function() {
                setStyle(this);
            });
            // 设置提示显隐
            range.addEventListener('mousedown', function() {
                setStyle(this);
                rangeDiv.style.display = "inline";
            });
            range.addEventListener('mouseup', function() {
                rangeDiv.style.display = "none";
            });

            // 设置样式
            function setStyle(ele) {
                let width = parseInt(getComputedStyle(ele).width, 10),
                    percent = (ele.value - min) / (max - min);
                ele.style.backgroundSize = (percent * 100) + '% 100%';
                content.innerText = ele.value;
                // 去除滑块占据左右两边宽度
                content.style.left = (percent * (width - 14) + 2) + 'px';
            }
        })(i);
    }
})();