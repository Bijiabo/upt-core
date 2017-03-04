/**
 * Created by huchunbo on 2017/2/17.
 * generalFunction.js
 * 通用方法
 */

define([], function () {
    var methods = {};

    // 公共判定方法


    // 公共 show 方法
    /*
    * 组件可设定方法：
    * afterShow()
    * afterHide()
    * */
    methods.show = function(context) {
        if (context.$get('itemData.show')) {
            var shouldShow = context.$get('itemData.show')(context.$get('data'));
            context.$set('show', shouldShow);
            if (shouldShow && context.$get('afterShow')) {
                context.$get('afterShow')();
            } else if (context.$get('afterHide')) {
                context.$get('afterHide')();
            }
        }
    };

    // 公共 enable 方法
    /*
     * 组件可设定方法：
     * afterEnable()
     * afterDisable()
     * */
    methods.enable = function(context) {
        if (context.$get('itemData.enable')) {
            var shouldEnable = context.$get('itemData.enable')(context.$get('data'));
            context.$set('enable', shouldEnable);
            if (shouldEnable && context.$get('afterEnable')) {
                context.$get('afterEnable')();
            } else if (context.$get('afterDisable')) {
                context.$get('afterDisable')();
            }
        }
    };

    return methods;
});
