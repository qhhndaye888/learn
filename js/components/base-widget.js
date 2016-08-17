/**
 * Created by lichao on 16/7/26.
 *
 * Widget的基类,目前仅实现了通用的事件发布订阅/机制
 */
var EventHandler = function (func,thisValue) {
    this.func = func;
    this.thisValue = thisValue;
};

var BaseWidget = function(){

};

BaseWidget.prototype = {
    on:function(type,handler){

        if(!(handler instanceof Function || handler instanceof EventHandler)){
            throw "thisValue must be a instance of EventHandler or function";
        }

        if(! this.handlers) this.handlers={};
        if(! this.handlers[type]) this.handlers[type] = [];

        this.handlers[type].push(handler);
    },
    fire:function(type,data){
        if(! this.handlers) return;

        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i=0,len=handlers.length;i < len;i++){
                var handler = handlers[i];
                var thisValue = handler.thisValue || this;
                var func = handler.func || handler;
                func.call(thisValue, data);
            }
        }
    },
    off:function(type,handler){
        if(! this.handlers) return;

        if(this.handlers[type] instanceof Array){
            var handlers=this.handlers[type];
            for(var i=0,len=handlers.length;i < len; i++){
                if(handlers[i] == handler){
                    break;
                }
            }
            handlers.splice(i,1);
        }
    },
    enhance:function () {

    }
};
