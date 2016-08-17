/**
 * date.format("ddd mmm dd") Thu,Nov 19
 * 
 * date.format("ddd,mmm dd yyyy") Thu,Nov 19 2015
 */

var dateFormat = function() {

	var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, timezoneClip = /[^-+\dA-Z]/g, pad = function(
			val, len) {

		val = String(val);
		len = len || 2;
		while (val.length < len)
			val = "0" + val;
		return val;
	};

	// Regexes and supporting functions are cached through closure
	return function(date, mask, utc) {

		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]"
				&& !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date))
			throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var _ = utc ? "getUTC" : "get", d = date[_ + "Date"](), D = date[_ + "Day"](), m = date[_
				+ "Month"](), y = date[_ + "FullYear"](), H = date[_ + "Hours"](), M = date[_
				+ "Minutes"](), s = date[_ + "Seconds"](), L = date[_ + "Milliseconds"](), o = utc ? 0
				: date.getTimezoneOffset(), flags = {
			d : d,
			dd : pad(d),
			ddd : dF.i18n.dayNames[D],
			dddd : dF.i18n.dayNames[D + 7],
			m : m + 1,
			mm : pad(m + 1),
			mmm : dF.i18n.monthNames[m],
			mmmm : dF.i18n.monthNames[m + 12],
			yy : String(y).slice(2),
			yyyy : y,
			h : H % 12 || 12,
			hh : pad(H % 12 || 12),
			H : H,
			HH : pad(H),
			M : M,
			MM : pad(M),
			s : s,
			ss : pad(s),
			l : pad(L, 3),
			L : pad(L > 99 ? Math.round(L / 10) : L),
			t : H < 12 ? "a" : "p",
			tt : H < 12 ? "am" : "pm",
			T : H < 12 ? "A" : "P",
			TT : H < 12 ? "AM" : "PM",
			Z : utc ? "UTC" : (String(date).match(timezone) || [ "" ]).pop().replace(timezoneClip,
					""),
			o : (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			S : [ "th", "st", "nd", "rd" ][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
		};

		return mask.replace(token, function($0) {

			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default" : "ddd mmm dd yyyy HH:MM:ss",
	shortDate : "m/d/yy",
	mediumDate : "mmm d, yyyy",
	longDate : "mmmm d, yyyy",
	fullDate : "dddd, mmmm d, yyyy",
	shortTime : "h:MM TT",
	mediumTime : "h:MM:ss TT",
	longTime : "h:MM:ss TT Z",
	isoDate : "yyyy-mm-dd",
	isoTime : "HH:MM:ss",
	isoDateTime : "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime : "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday",
			"Wednesday", "Thursday", "Friday", "Saturday" ],
	monthNames : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
			"Dec", "January", "February", "March", "April", "May", "June", "July", "August",
			"September", "October", "November", "December" ]
};

// For convenience...
Date.prototype.format = function(mask, utc) {

	return dateFormat(this, mask, utc);
};

function getNowDateStr() {

	return new Date().format("mm/dd/yyyy");
};

function getNowDate() {

	return new Date(getNowDateStr());
};
/**
 * 得到day天后的日期
 * 
 * @param nowdate
 *            例如 10/01/2014
 * @returns {String} 10/08/2014
 */
function getNextDateStr(dateStr, day) {

	if (!day) {
		day = 0;
	}
	if(!typeof(dateStr)=="string"){
		dateStr=dateStr.format("mm/dd/yyyy");
	}
	var date = new Date(dateStr);
	date.setDate(date.getDate() + day);// 当前日期+几天
	return date.format("mm/dd/yyyy");
};

/**
 * 得到day天后的日期
 * 
 * @param nowdate
 *            例如 10/01/2014
 * @returns {Date} 10/08/2014
 */
function getNextDate(dateStr, day) {

	if (!day) {
		day = 0;
	}
	if(!typeof(dateStr)=="string"){
		dateStr=dateStr.format("mm/dd/yyyy");
	}
	var date = new Date(dateStr);
	date.setDate(date.getDate() + day);// 当前日期+几天
	return date;
};

/**
 * 分钟转换为12小时制的时间格式
 * 
 * @param time
 *            分钟 int
 */
function minuteToStr(time) {

	var result = [];

	var hM = parseInt(time / 60);// 小时
	var m = parseInt(time % 60);// 分钟

	// 如果总的时间大于了24小时，说明数据错误，返回null
	if (time >= 1440)
		return null;

	if (hM >= 12) {
		result[0] = "PM";
		if (hM != 12)
			hM = hM - 12;
	} else {
		result[0] = "AM";
	}

	var hour = "";
	if (hM == 0)
		hour = "12";
	else if (hM < 10)
		hour = "0" + hM;
	else
		hour = hM;

	var minute = "";
	if (m < 10)
		minute = "0" + m;
	else
		minute = m;

	result[1] = hour + ":" + minute;

	return result[1] + " " + result[0];
};


/**
 * 比较两个日期字符串 如果第一个大于第二个 返回正数 反之 返回负数 相等返回0
 */
function compareDate(dateStr1, dateStr2) {

	var date1 = new Date(dateStr1);
	var date2 = new Date(dateStr2);
	return date1.getTime() - date2.getTime();
}


//TODO 感觉这个转换可能有问题!!!!!	copy的
function MillisecondToDate(msd) {

    var timeDic = {hour:"", min:"", sec:"", ampm:""};

    var time = parseFloat(msd) /1000; // 秒
    if (null!= time &&""!= time) {
        if (time >60&& time <60*60) {
            timeDic.hour = 0;
            timeDic.min = parseInt(time /60.0);
            timeDic.sec = parseInt((parseFloat(time /60.0) - parseInt(time /60.0)) *60);
        }else if (time >=60*60&& time <60*60*24) {
            timeDic.hour = parseInt(time /3600.0);
            timeDic.min = parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60);
            timeDic.sec = parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -
                parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60);

        }else {
            timeDic.hour = 0;
            timeDic.min = 0;
            timeDic.sec = parseInt(time);
        }
    }else{
        time = "0 时 0 分0 秒";
        timeDic.hour = 0;
        timeDic.min = 0;
        timeDic.sec = 0;
    }

    // am pm
    if (timeDic.hour > 12) {
        timeDic.hour = timeDic.hour -12;
        timeDic.ampm = "PM";
    }
    else {
        timeDic.ampm = "AM";
    }

    if (time / 60 < 720) { // 720是中午12点 即12:00PM
        timeDic.ampm = "AM";
    } else {
        timeDic.ampm = "PM";
    }

    if (timeDic.hour < 10) {
        timeDic.hour = '0' + timeDic.hour;
    }
    if (timeDic.min < 10) {
        timeDic.min = '0' + timeDic.min;
    }
    if (timeDic.sec < 10) {
        timeDic.sec = '0' + timeDic.sec;
    }
    return timeDic;
}