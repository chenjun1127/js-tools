/*
 * @Author: chenjun
 * @Date:   2018-04-25 13:51:04
 * @Last Modified by:   chenjun
 * @Last Modified time: 2018-04-25 14:07:57
 */

class Utils {
    // 计算当月还剩余多少天
    static surplusDays() {
        let today = new Date();
        let now = today.getDate();
        let year = today.getYear();
        if (year < 2000) year += 1900;
        let month = today.getMonth();
        let monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) monarr[1] = "29";
        return "本月倒计时" + (monarr[month] - now) + "天";
    }
    // 判断手机号码格式是否正确
    static isPhoneNumberValid(phoneNumber) {

        if (phoneNumber === null || typeof phoneNumber === 'undefined' || phoneNumber === '') {
            return false;
        }
        const reg = /^[1][34578][0-9]{9}$/;
        const regExp = new RegExp(reg);

        if (!regExp.test(phoneNumber)) {
            return false;
        }
        return true;
    }

    // 整数或者两位小数
    static isIntOrDoubleDecimal(value) {
        const reg = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
        const regExp = new RegExp(reg);
        if (!regExp.test(value)) {
            return false;
        }
        return true;
    }

    // 判断是否包含表情
    static isEmojiCharacter(substring) {
        for (var i = 0; i < substring.length; i++) {
            var hs = substring.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        return true;
                    }
                }
            } else if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                if (ls == 0x20e3) {
                    return true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                } else if (0x2B05 <= hs && hs <= 0x2b07) {
                    return true;
                } else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                } else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
                    hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
                    hs == 0x2b50) {
                    return true;
                }
            }
        }
    }
}