/**
 * Created by bufan on 16-8-16.
 */
(function ($, window) {

    /**
     * 组件的默认设置
     */
    var defaultSetting = {
        view: null,
        minQuantity: 0,
        maxQuantity: 10,
        allowAdd: true,
        allowMinus: false
    };

    /**
     * 数量选择器
     * @param option
     * @constructor
     */
    var MyQuantitySelector = function (option) {

        $.extend(this, defaultSetting, option || {});

        //组件
        this.btnAdd = null;
        this.btnSub = null;
        this.txtValue = null;

        this.init();

    }

    /**
     * 继承BaseWidget,可以获取事件的注册和触发功能
     * @type {BaseWidget}
     */
    MyQuantitySelector.prototype = new BaseWidget();
    MyQuantitySelector.prototype.constructor = MyQuantitySelector;

    /**
     * 数量选择器的初始化方法
     */
    MyQuantitySelector.prototype.init = function () {

        this.btnAdd = this.view.find("[sid=btnAdd]");
        this.btnSub = this.view.find("[sid=btnSub]");
        this.txtValue = this.view.find("[sid=txtValue]");

        this.setValue(this.minQuantity);

        this.btnAdd.on("click", this, this.onBtnAddClick);
        this.btnSub.on("click", this, this.onBtnSubClick);
    };

    /**
     * 设置数量选择器的值
     * @param value
     */
    MyQuantitySelector.prototype.setValue = function (value) {

        // 判断最小值
        if (value <= this.minQuantity) {
            value = this.minQuantity;
            this.disableBtnSub();
        } else {
            this.enableBtnSub();
        }

        //判断最大值
        if (value >= this.maxQuantity) {
            value = this.maxQuantity;
            this.disableBtnAdd();
        } else {
            this.enableBtnAdd();
        }

        var beforeValue = this.getValue();
        this.txtValue.text(value);


        this.fire("valueChangeEvent", value - beforeValue);
    }

    /**
     * 获取数量选择器的值
     * @returns 数量选择器的值
     */
    MyQuantitySelector.prototype.getValue = function () {

        return Number(this.txtValue.text());
    }

    /**
     * 响应添加按钮
     * @param event
     * @returns {boolean}
     */
    MyQuantitySelector.prototype.onBtnAddClick = function (event) {

        var self = event.data;
        if (self.allowAdd) {
            var currentValue = self.getValue();
            if (currentValue < self.maxQuantity) {
                self.setValue(currentValue + 1);
            }
        }

        return false;
    };

    /**
     * 响应减少按钮
     * @param event
     * @returns {boolean}
     */
    MyQuantitySelector.prototype.onBtnSubClick = function (event) {

        var self = event.data;

        if (self.allowMinus) {
            var currentValue = self.getValue();
            if (currentValue > self.minQuantity) {
                self.setValue(currentValue - 1);
            }
        }

        return false;
    };

    MyQuantitySelector.prototype.enableBtnAdd = function () {

        this.btnAdd.removeClass("disabled");
        this.allowAdd = true;
    };

    MyQuantitySelector.prototype.disableBtnAdd = function () {

        this.btnAdd.addClass("disabled");
        this.allowAdd = false;
    };

    MyQuantitySelector.prototype.enableBtnSub = function () {

        this.btnSub.removeClass("disabled");
        this.allowMinus = true;
    };

    MyQuantitySelector.prototype.disableBtnSub = function () {

        this.btnSub.addClass("disabled");
        this.allowMinus = false;
    };

    window.MyQuantitySelector = MyQuantitySelector;
})($, window);
