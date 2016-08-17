/**
 * * 定义 SelectShow 对象
 */
var SelectShow = function(view, container) {

	// 初始化属性

	// 定义视图
	this.view = view;
	this.container = container;
	// 执行初始化操作
	this.init();
};

SelectShow.prototype.init = function() {

	// 注册事件
	this.view.bind("change", this, this.onChange);
};

SelectShow.prototype.onChange = function(e) {

	var self = e.data;
	var name = $.trim(self.view.find("option:selected").text());
	self.setValue(name);
};

SelectShow.prototype.setValue = function(name) {

	this.container.html(name);
};