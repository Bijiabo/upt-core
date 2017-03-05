/**
 * Created by huchunbo on 2017/2/16.
 * workStatusManager.js
 * 工作状态管理员
 * 主要用于管理、翻译设备工作状态为人话
 */
define([], function () {
    var workStatusManager = {};

    var workStatus = {
        add: function (statusName, callback) {
            Object.defineProperty(
                workStatusManager,
                statusName,
                {
                    get: function() {
                        return callback(window.data);
                    }
                }
            )
        }
    };


    window.workStatusManager = workStatusManager;
    return workStatus;
});
