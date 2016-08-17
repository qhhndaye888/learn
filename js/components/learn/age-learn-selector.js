/**
 * Created by bufan on 16-8-17.
 */
(function ($, window) {

    /**
     * 组件的默认设置
     */
    var defaultSetting = {
        view: null,
        age: -1,
        maxAge: 12
    };

    /**
     * 年龄选择器模板
     * @constructor
     */
    var MyAgeSelector = function(option) {

        $.extend(this, defaultSetting, option || {});

        //init
        this.ageArea = null;
        this.ageAreaShow = null;

        this.init();
    }

    /**
     * 年龄选择器模板
     */
    MyAgeSelector.template = null;

    /**
     * 初始化组件和注册组件的事件
     */
    MyAgeSelector.prototype.init = function() {

        // init view
        if (MyAgeSelector.template == null)
            MyAgeSelector.template = $("#age-select-template").html();

        this.view = $(MyAgeSelector.template);

        this.ageArea = this.view.find("[sid=ageArea]");
        this.ageAreaShow = this.view.find("[sid=ageAreaShow]");

        // 根据数据初始化组件中选项
        this.ageArea.children('option').remove();
        this.ageArea.append("<option value='-1'>Age</option>");
        for(var i = 1; i <= this.maxAge; i++) {
            var ageAreaOption = "<option value='" + i + "'>" + i + "</option>";
            this.ageArea.append(ageAreaOption);
        }

        new SelectShow(this.ageArea, this.ageAreaShow);

        this.setValue(this.age);
    }

    /**
     * 设置年龄
     * @param age
     */
    MyAgeSelector.prototype.setValue = function(age) {

        this.ageArea.val(age);
        this.ageArea.trigger("change");
    }

    /**
     * 获取年龄
     * @returns 年龄
     */
    MyAgeSelector.prototype.getValue = function() {

        return parseInt(this.ageArea.val());
    }

    /**
     * 改变警告效果
     */
    MyAgeSelector.prototype.warn = function() {

        this.view.addClass("on");
    }

    /**
     * 去掉警告效果
     */
    MyAgeSelector.prototype.cancelWarn = function() {

        this.view.removeClass("on");
    }

    window.MyAgeSelector = MyAgeSelector;
}($, window));