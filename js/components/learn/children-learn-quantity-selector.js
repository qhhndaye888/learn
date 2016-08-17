/**
 * Created by bufan on 16-8-17.
 */
(function ($, window) {

    /**
     * 组件的默认设置
     */
    var defaultSetting = {
        view: null,
        minQuantity: 0,
        maxQuantity: 10,
    };

    /**
     * 孩子数量选择器
     * @constructor
     */
    var MyChildrenQuantitySelector = function (option) {

        $.extend(this, defaultSetting, option || {});

        //init
        this.quantitySelector = null;
        this.ageSelectorContainer = null;

        this.init();
    }

    /**
     * 继承BaseWidget,可以获取事件的注册和触发功能
     * @type {BaseWidget}
     */
    MyChildrenQuantitySelector.prototype = new BaseWidget();
    MyChildrenQuantitySelector.prototype.constructor = MyChildrenQuantitySelector;

    /**
     * 初始化孩子数量选择器
     */
    MyChildrenQuantitySelector.prototype.init = function () {

        this.quantitySelector = new MyQuantitySelector(
            {
                view: this.view.find("[sid=quantitySelector]"),
                minQuantity: this.minQuantity,
                maxQuantity: this.maxQuantity
            });
        this.ageSelectorContainer = new MyAgeSelectorContainer(
            {
                view: this.view.find("[sid=ageSelector]"),
            });

        var that = this;
        this.quantitySelector.on("valueChangeEvent", new EventHandler(that.quantityChange, that));
    }

    /**
     * 设置年龄的集合
     * @param ages
     */
    MyChildrenQuantitySelector.prototype.setValue = function (ages) {

        this.quantitySelector.setValue(ages.length);

        for (var i = 0; i < ages.length; i++) {

            this.ageSelectorContainer.addAgeSelector(ages[i]);
        }
    }

    /**
     * 根据数量改变增加或者减少年龄选择器
     * @param type
     */
    MyChildrenQuantitySelector.prototype.quantityChange = function (type) {

        if (type > 0) {
            this.ageSelectorContainer.addAgeSelector();

        } else if (type < 0) {

            this.ageSelectorContainer.removeAgeSelector();
        }

        this.fire("valueChangeEvent", type);
    };

    /**
     * 获取乘坐孩子数量
     * @returns 乘坐孩子数量
     */
    MyChildrenQuantitySelector.prototype.getChildCount = function () {


        return this.ageSelectorContainer.getValue().length;
    };

    MyChildrenQuantitySelector.prototype.enableBtnAdd = function () {

        this.quantitySelector.enableBtnAdd();
    };

    MyChildrenQuantitySelector.prototype.disableBtnAdd = function () {

        this.quantitySelector.disableBtnAdd();
    };

    MyChildrenQuantitySelector.prototype.enableBtnSub = function () {
        this.quantitySelector.enableBtnSub();
    };

    MyChildrenQuantitySelector.prototype.disableBtnSub = function () {
        this.quantitySelector.disableBtnSub();
    };

    MyChildrenQuantitySelector.prototype.validate = function () {

        return this.ageSelectorContainer.validate();
    }

    window.MyChildrenQuantitySelector = MyChildrenQuantitySelector;
}($, window));