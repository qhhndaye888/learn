/*
 * ajax请求
 */
function myAjax(options) {

	if (!options.dataType)
		options.dataType = 'json';

	if (!options.data)
		options.data = {};

	if (!options.data.timestamp)
		options.data.timestamp = new Date().getTime();

	options.data.userClient = "pc";

//	if (!accessToken) {
//
//		getAccessToken(function() {
//
//			options.data.accessToken = accessToken;
//			$.ajax(options);
//		});
//		return;
//	}

	//options.data.accessToken = accessToken;
	$.ajax(options);
}

function getAccessToken(callback) {

	$.ajax({
		type : "post",
		url : "/api/token?m=get",
		data : {
			userClient : "pc",
			timestamp : new Date().getTime()
		},
		dataType : 'json',
		success : function(data) {

			if (data.code == 200) {
				var accessToken = data.result;
				$.cookie("accessToken", accessToken);
				callback();
			}
		}
	});
}

function getUrlParam(name) {

	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}
