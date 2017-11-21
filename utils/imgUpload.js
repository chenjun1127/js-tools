function ImgUpload(ele) {
    this.ele = ele;
}
ImgUpload.prototype = {
    init: function() {
        this.handle();
    },
    handle: function() {
        var _this = this;
        var Orientation = null;
        this.ele.addEventListener('change', function() {
            var reader = new FileReader();
            reader.onload = function(e) {
                // 调用图片压缩方法：compress();
                _this.compress(this.result, fileSize);
            };
            reader.readAsDataURL(this.files[0]);
            var fileSize = Math.round(this.files[0].size / 1024 / 1024); // 以M为单位
            // this.files[0] 该信息包含：图片的大小，以byte计算 获取size的方法如下：this.files[0].size;
            console.log(this.files[0]);
            EXIF.getData(this.files[0], function() {
                // alert(EXIF.pretty(this));
                EXIF.getAllTags(this);
                // alert(EXIF.getTag(this, 'Orientation'));
                Orientation = EXIF.getTag(this, 'Orientation');
                // return;
            });
        }, false)
    },
    compress: function(res, fileSize) {
        var _this = this;
        var img = new Image(),
            maxW = 640; // 设置最大宽度

        img.onload = function() {
            var cvs = document.createElement('canvas');
            var ctx = cvs.getContext('2d');
            if (img.width > maxW) {
                img.height *= maxW / img.width;
                img.width = maxW;
            }
            cvs.width = img.width;
            cvs.height = img.height;
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var compressRate = _this.getCompressRate(1, fileSize);
            var dataUrl = cvs.toDataURL('image/jpeg', compressRate);
            //document.body.appendChild(cvs);
            console.log(dataUrl);
            _this.upload(dataUrl)
        }
        img.src = res;
    },
    getCompressRate: function(allowMaxSize, fileSize) {
        var compressRate = 1;
        if (fileSize / allowMaxSize > 4) {
            compressRate = 0.5;
        } else if (fileSize / allowMaxSize > 3) {
            compressRate = 0.6;
        } else if (fileSize / allowMaxSize > 2) {
            compressRate = 0.7;
        } else if (fileSize > allowMaxSize) {
            compressRate = 0.8;
        } else {
            compressRate = 0.9;
        }
        return compressRate;
    },
    // 图片上传
    upload: function(imgUrl) {
    	// 上传图片逻辑
        /*var sendData = imgUrl.split(",")[1];
        var id = 111;
        var _this = this;
        $.ajax({
            url: 'http://192.168.0.105:5555/pic_upload',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                id: id.toString(),
                pic: sendData
            }),
            success: function(res, status, statusObj) {
                console.log(statusObj.status)
                if (statusObj.status == "200") {
                    console.log(res)
                    $(".picArea img").attr("src", "http://" + res.url);
                    $(".picArea img").attr("data-status", res.result);
                    $(".buttonWrapper").hide();
                    $(".getPasswrord").show();
                } else {
                    $.MsgBox.Alert("服务器错误，请重新尝试！", function() {
                        $(".buttonWrapper").show();
                        $(".getPasswrord").hide();
                    });

                }
            }
        })*/
    }
}
var imgUpload = new ImgUpload(document.getElementById("img-upload"));
imgUpload.init();