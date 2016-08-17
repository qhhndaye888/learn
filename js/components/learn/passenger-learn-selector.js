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
        passengerCount: 1,
        childAges: []
    };

    /**
     * 乘客选择器
     * @constructor
     */
    var MyPassengerSelector = function(option) {

        $.extend(this, defaultSetting, option || {});

        //init
        this.passengerSelectorPannel = null;
        this.btnPassenger = null;
        this.txtPassenger = null;

        this.init();
    }

    /**
     * 继承BaseWidget,可以获取事件的注册和触发功能
     * @type {BaseWidget}
     */
    MyPassengerSelector.prototype = new BaseWidget();
    MyPassengerSelector.prototype.constructor = MyPassengerSelector;

    /**
     * 初始化乘客选择器
     */
    MyPassengerSelector.prototype.init = function() {

        this.passengerSelectorPannel = new MyPassengerSelectorPanel(
            {
                view: this.view.find("[sid=passengerPanel]"),
                minQuantity: this.minQuantity,
                maxQuantity: this.maxQuantity,
                adultCount: this.adultCount,
                childrenCount: this.childrenCount,
                childAges: this.childAges,
            });

        this.btnPassenger = this.view.find("[sid=btnPassenger]");
        this.txtPassenger = this.view.find("[sid=txtPassenger]");

        var that = this;
        this.passengerSelectorPannel.on("valueChangeEvent", new EventHandler(that.changePassengerTitle, that));
        this.btnPassenger.on("click",that, that.onBtnPassengerClick);
    }

    /**
     * 改变乘客选择器的标题
     */
    MyPassengerSelector.prototype.changePassengerTitle = function() {

        var passengersCount = this.passengerSelectorPannel.getPassengersCount();
        var title = passengersCount + " Passenger";

        if (passengersCount > 1)
            title += "s";

        this.txtPassenger.val(title);
    };

    /**
     * 点击添加乘客按钮的响应事件
     * @param event
     */
    MyPassengerSelector.prototype.onBtnPassengerClick = function (event) {

        var self = event.data;
        if(!self.passengerSelectorPannel.isShow()){

            self.passengerSelectorPannel.show();
        } else {

            self.passengerSelectorPannel.hide();
        }
    };




    window.MyPassengerSelector = MyPassengerSelector;
}($, window));