/**
 * Created by huchunbo on 2017/2/17.
 * helperManager.js
 * 帮助方法管理员
 * 主要负责为界面提供给用户的附注说明数据等结果方法
 */
define([], function () {
    var helperManager = {};
    var helper = {
        add: function (helperName, callback) {
            Object.defineProperty(
                helperManager,
                helperName,
                {
                    get: function() {
                        return callback(window.data);
                    }
                }
            )
        },
        addFunction: function (helperName, callback) {
            Object.defineProperty(
                helperManager,
                helperName,
                {
                    get: function() {
                        return function () {
                            return callback(window.data, arguments);
                        };
                    }
                }
            )
        }
    };

    window.helperManager = helperManager;
    return helper;
});