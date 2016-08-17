/**
 * Created by bufan on 16-8-17.
 */
(function ($, window) {

    /**
     * 组件的默认设置
     */
    var defaultSetting = {
        view: null,
        myAgeSelectorArray: []
    };

    /**
     * 年龄选择器的容器
     * @constructor
     */
    var MyAgeSelectorContainer = function (option) {

        $.extend(this, defaultSetting, option || {});

        //init
        this.ageArea = null;
        this.ageAreaShow = null;

        this.init();
    }

    /**
     * 年龄选择器初始化方法
     */
    MyAgeSelectorContainer.prototype.init = function () {

    }

    /**
     * 增加年龄选择器
     * @param age
     */
    MyAgeSelectorContainer.prototype.addAgeSelector = function (age) {

        this.view.removeClass("dn");

        var ageSelector = new MyAgeSelector(age);
        this.myAgeSelectorArray.push(ageSelector);
        this.view.append(ageSelector.view);
    };

    /**
     * 减少年龄选择器
     */
    MyAgeSelectorContainer.prototype.removeAgeSelector = function () {

        this.view.children().last().remove();
        this.myAgeSelectorArray.pop();

        if (this.myAgeSelectorArray.length <= 0) {

            this.view.addClass("dn");
        }
    };

    /**
     * 获取年龄选择器容器的值
     * @returns 年龄的数组
     */
    MyAgeSelectorContainer.prototype.getValue = function () {

        // return children age array
        this.childAge = [];

        for (var i = 0; i < this.myAgeSelectorArray.length; i++) {

            this.childAge.push(this.myAgeSelectorArray[i].getValue());
        }

        return this.childAge;
    }

    /**
     * 验证年龄选择器的年龄
     * @returns 是否通过选择
     */
    MyAgeSelectorContainer.prototype.validate = function () {

        var flag = true;
        for (var i = 0; i < this.myAgeSelectorArray.length; i++) {
            if (this.myAgeSelectorArray[i].getValue() < 0) {

                this.myAgeSelectorArray[i].warn();
                flag = false;
            }  else {
                this.myAgeSelectorArray[i].cancelWarn();
            }
        }

        return flag;
    };


    window.MyAgeSelectorContainer = MyAgeSelectorContainer;
}($, window));