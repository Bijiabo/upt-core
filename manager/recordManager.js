/**
 * Created by huchunbo on 2017/2/17.
 * recordManager.js
 * 数据埋点方法管理员
 * 主要负责为界面提供数据埋点服务
 */
define([], function () {
    var recordManager = {};

    var updateRecord = function(eventType, eventName) {
        console.log('%c[try to update record] ' + eventType + ':' + eventName, "font-size:1em; background-color: #3E5266; color: #ffffff; ");
        var params = {
            'model': DA.model, //设备model
            'uuid':DA.uuid,//设备uuid
            'account':DA.userId, //登录auid
            'evtType': eventName,//事件名称
            'time':+new Date,//当前时间
        };
        console.log(JSON.stringify(params, null, '\t'));
        DA.recordUT(eventType, params,function(){
            console.log('%c[update record success] ' + eventType + ' : ' + eventName, "font-size:1em; background-color: #3E5266; color: #ffffff; border-left: 20px solid #8FE254;");
        },function(){
            console.log('%c[update record failed] ' + eventType + ' : ' + eventName, "font-size:1em; background-color: #3E5266; color: #ffffff; border-left: 20px solid #F04440;");
        });
        return true;
    };

    var recorder = {
        add: function (recordName, eventName) {
            Object.defineProperty(
                recordManager,
                recordName,
                {
                    get: function() {
                        return updateRecord(recordName, eventName);
                    }
                }
            )
        },
        addWithSubtype: function (recordName, eventName) {
            Object.defineProperty(
                recordManager,
                recordName,
                {
                    get: function() {
                        return function (eventSubtype) {
                            return updateRecord(recordName, eventName + '-' + eventSubtype);
                        };
                    }
                }
            )
        }
    };

    window.recordManager = recordManager;
    return recorder;
});