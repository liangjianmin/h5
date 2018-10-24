import Util from '../util/index'

/**
 * 格式化日期
 * @param value
 * @returns {string}
 */
export const dateTimeFormate = (value) => {
    var date = new Date();
    date.setTime(value * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ';
}

/**
 * type 1 人民币  2：人数 3：笔数
 * @param value
 * @param type
 * @returns {Array|*}
 */
export const moneyFormate = (value, type) => {
    var formateval = Util.formateDate(value).split(",");
    if (formateval.length >= 3) {
        if (type == 1) {
            formateval = formateval[0] + '亿' + formateval[1] + '万元';
        } else if (type == 2) {
            formateval = formateval[0] + '亿' + formateval[1] + '万人';
        } else if (type == 3) {
            formateval = formateval[0] + '亿' + formateval[1] + '万笔';
        }
    } else if (formateval.length == 2) {
        if (type == 1) {
            formateval = formateval[0] + '万' + formateval[1] + '元';
        } else if (type == 2) {
            formateval = formateval[0] + '万' + formateval[1] + '人';
        } else if (type == 3) {
            formateval = formateval[0] + '万' + formateval[1] + '笔';
        }
    } else {
        if (type == 1) {
            formateval = formateval[0] + '元';
        } else if (type == 2) {
            formateval = formateval[0] + '人';
        } else if (type == 3) {
            formateval = formateval[0] + '笔';
        }
    }
    return formateval.toString();
}

/**
 * type 人民币 万
 * @param value
 * @param type
 */
export const money = (value) => {
    var formateval = Util.formateDate(value).split(",");
    if (formateval.length >= 1) {
        formateval = formateval[0];
    }
    return formateval.toString();
}
/**
 * 安全运营时间
 * @param value
 * @returns {string}
 */
export const reportTimeFormate = (value) => {
    var time_start = new Date("2015/04/28 00:00:00").getTime();
    var time_end = new Date().getTime();
    var time_distance = time_end - time_start;
    var report_time = '';
    if (time_distance > 0) {
        var int_year = Math.floor(time_distance / 31536000000)
        time_distance -= int_year * 31536000000;
        var int_day = Math.floor(time_distance / 86400000)
        time_distance -= int_day * 86400000;
        var int_hour = Math.floor(time_distance / 3600000)
        time_distance -= int_hour * 3600000;
        var int_minute = Math.floor(time_distance / 60000)
        time_distance -= int_minute * 60000;
        var int_second = Math.floor(time_distance / 1000)
        if (int_day < 10) {
            int_day = "0" + int_day;
        }
        if (int_hour < 10) {
            int_hour = "0" + int_hour;
        }
        if (int_minute < 10) {
            int_minute = "0" + int_minute;
        }
        if (int_second < 10) {
            int_second = "0" + int_second;
        }
        report_time = int_year + '年' + int_day + '天';
    } else {
        report_time = 0 + '年' + 0 + '天';
    }
    return report_time;
}

/**
 * 手机号星号***
 * @param value
 * @returns {string}
 */
export const mobile = (value) => {
    var phone = value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    return phone;
}
/**
 * 身份证号***
 * @param value
 * @returns {string}
 */
export const card = (value) => {
    return value.substr(0, 4) + "********" + value.substr(-4);
}
/**
 * 姓名**
 * @param value
 * @returns {string}
 */
export const name = (value) => {
    return value.substr(0, 1) + "**";
}
/**
 * 银行卡后四位
 * @param value
 * @returns {string}
 */
export const bank = (value) => {
    var str = value;
    return str.substr(str.length - 4);
}
/**
 * 银行单日限额去掉空格
 * @param value
 * @returns {string}
 */
export const bankLimit = (value, type) => {
    var arr = value.split('/');
    if (type == 1) {
        return arr[0];
    } else if (type == 2) {
        return arr[1];
    }
}

