(function(w) {
    function query(ele) {
        return query.prototype.init(ele);
    }
    query.prototype = {
        init: function(ele) {
            if (typeof ele == "string") { this.ele = window.document.querySelector(ele) }
            return this;
        },
        /**
         * @Author      ChenJun
         * @DateTime    2018-08-01
         * @Description 当抬起手指的时候触发，需要判断手指落下和手指抬起的事件间隔，如果小于500ms表示单击时间。如果是大于等于500ms，算是长按时间
         * @param       {[type]}        handle [description]
         * @return      {[type]}               [description]
         */
        tap: function(handler) {
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchend", touchFn);
            var startTime, endTime;

            function touchFn(e) {
                e.preventDefault()
                switch (e.type) {
                    case "touchstart":
                        startTime = new Date().getTime();
                        break;
                    case "touchend":
                        endTime = new Date().getTime();
                        if (endTime - startTime < 500) {
                            handler.call(this, e);
                        }
                        break;
                }
            }
        },
        longTap: function(handle) {
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchmove", touchFn);
            this.ele.addEventListener("touchend", touchFn);
            var timerId;

            function touchFn(e) {
                switch (e.type) {
                    case "touchstart": //500ms之后执行
                        timerId = setTimeout(function() {
                            handler.call(this, e);
                        }, 500)
                        break;
                    case "touchmove":
                        //如果中间有移动也清除定时器
                        clearTimeout(timerId)
                        break;
                    case "touchend":
                        //如果在500ms之内抬起了手指，则需要定时器
                        clearTimeout(timerId);
                        break;
                }
            }
        },
        slideLeft: function(handler) {
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchend", touchFn);
            var startX, startY, endX, endY;

            function touchFn(e) {
                e.preventDefault();
                var firstTouch = e.changedTouches[0];
                switch (e.type) {
                    case "touchstart":
                        startX = firstTouch.pageX;
                        startY = firstTouch.pageY;
                        break;
                    case "touchend":
                        endX = firstTouch.pageX;
                        endY = firstTouch.pageY;
                        //x方向移动大于y方向的移动，并且x方向的移动大于25个像素，表示在向左侧滑动
                        if (Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 25) {
                            handler.call(this, e);
                        }
                        break;
                }
            }
        },
        slideRight: function(handler) {
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchend", touchFn);
            var startX, startY, endX, endY;

            function touchFn(e) {
                e.preventDefault();
                var firstTouch = e.changedTouches[0];
                switch (e.type) {
                    case "touchstart":
                        startX = firstTouch.pageX;
                        startY = firstTouch.pageY;
                        break;
                    case "touchend":
                        endX = firstTouch.pageX;
                        endY = firstTouch.pageY;
                        if (Math.abs(endX - startX) >= Math.abs(endY - startY) && endX - startX >= 25) {
                            handler.call(this, e);
                        }
                        break;
                }
            }
        },

    }
    window.$ = window.query = query;
})(window);
