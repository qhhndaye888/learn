/**
 * Created by bufan on 16-8-17.
 */
(function ($, window) {

    /**
     * 组件的默认设置
     */
    var defaultSetting = {
        view: null,
        minQuantity: 1,
        maxQuantity: 10,
        adultCount: 1,
        childrenCount: 0,
        childAges: []
    };

    /**
     * 乘客选择器的面板
     * @constructor
     */
    var MyPassengerSelectorPanel = function (option) {

        $.extend(this, defaultSetting, option || {});

        //init
        this.adultQuantitySelector = null;
        this.childrenQuantitySelector = null;

        this.init();
    }

    /**
     * 继承BaseWidget,可以获取事件的注册和触发功能
     * @type {BaseWidget}
     */
    MyPassengerSelectorPanel.prototype = new BaseWidget();
    MyPassengerSelectorPanel.prototype.constructor = MyPassengerSelectorPanel;

    /**
     * 乘客选择器的初始化方法
     */
    MyPassengerSelectorPanel.prototype.init = function () {

        this.adultQuantitySelector = new MyQuantitySelector(
            {
                view: this.view.find("[sid=adultSelector]"),
                minQuantity: this.minQuantity,
                maxQuantity: this.maxQuantity
            });

        this.childrenQuantitySelector = new MyChildrenQuantitySelector(
            {
                view: this.view.find("[sid=childSelector]"),
                minQuantity: this.minQuantity - 1,
                maxQuantity: this.maxQuantity
            });


        var that = this;
        this.adultQuantitySelector.on("valueChangeEvent", new EventHandler(that.adultquantityChange, that));
        this.childrenQuantitySelector.on("valueChangeEvent", new EventHandler(that.childrenquantityChange, that));
    }

    /**
     * 设置乘客选择器的值
     * @param adultCount
     * @param childAges
     */
    MyPassengerSelectorPanel.prototype.setValue = function (adultCount, childAges) {

        this.adultCount = adultCount;
        this.childAges = childAges;
        this.childrenCount = childAges.length;

        this.btnStatusChange();

        this.adultQuantitySelector.setValue(this.childrenCount);
        this.childrenQuantitySelector.setValue(this.childAges);
    }

    /**
     * 成人数量改变事件
     */
    MyPassengerSelectorPanel.prototype.adultquantityChange = function () {

        this.adultCount = this.adultQuantitySelector.getValue();

        this.btnStatusChange();

        this.fire("valueChangeEvent");
    }

    /**
     * 孩子数量改变事件
     */
    MyPassengerSelectorPanel.prototype.childrenquantityChange = function () {

        this.childrenCount = this.childrenQuantitySelector.getChildCount();

        this.btnStatusChange();
        this.fire("valueChangeEvent");
    };

    /**
     * 根据成人和孩子数量改变而改变成人数量选择器和孩子数量选择器的按钮状态
     */
    MyPassengerSelectorPanel.prototype.btnStatusChange = function () {

        if (this.adultCount + this.childrenCount >= this.maxQuantity) {

            this.adultQuantitySelector.disableBtnAdd();
            this.childrenQuantitySelector.disableBtnAdd();
        } else {

            this.adultQuantitySelector.enableBtnAdd();
            this.childrenQuantitySelector.enableBtnAdd();
        }
    };

    /**
     * 获取乘客的数量
     * @returns 乘客的数量
     */
    MyPassengerSelectorPanel.prototype.getPassengersCount = function () {

        return this.adultCount + this.childrenCount;
    };


    MyPassengerSelectorPanel.prototype.show = function () {

        if (this.childrenQuantitySelector.validate()) {
            this.view.removeClass("dn");
        }
    };

    MyPassengerSelectorPanel.prototype.isShow = function () {

        return !this.view.hasClass("dn");
    };

    MyPassengerSelectorPanel.prototype.hide = function () {

        if (this.childrenQuantitySelector.validate()) {
            this.view.addClass("dn");
        }
    };

    window.MyPassengerSelectorPanel = MyPassengerSelectorPanel;
}($, window));