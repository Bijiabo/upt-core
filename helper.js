/**
 * Created by huchunbo on 2017/2/17.
 */
define(['./js/manager/helperManager'], function (helper) {

    var workModeList = ['', '卸妆模式', '深层补水', '肌肤SPA', '晒后恢复', '敏感肌肤护理', '控油模式', 'DIY模式'];

    // 当前模式名称
    helper.add(
        'workModeName',
        function (data) {
            var workModeName = workModeList[Number(data.WorkMode)];
            if (workModeName) {
                return workModeName;
            } else if (Number(data.WorkMode) >= 8) {
                return '面膜模式';
            }
            return '未知模式';
        }
    );
    helper.add(
        '_workModeName',
        function (data) {
            var workModeName = workModeList[Number(data._WorkMode)];
            if (workModeName) {
                return workModeName;
            } else if (Number(data.WorkMode) >= 8) {
                return '面膜模式';
            }
            return '未知模式';
        }
    );

    // 模式名称
    helper.addFunction(
        'nameForWorkMode',
        function (data, params) {
            if (params.length === 0) { return 'params error for [nameForWorkMode] in helper manager'; }
            var workMode = Number(params[0]);
            var workModeName = workModeList[workMode];
            if (workModeName) {
                return workModeName;
            } else if (workMode >= 8) {
                return '面膜模式';
            }
            return '未知模式';
        }
    );

    // 当前模式启动说明
    helper.add(
        '_workModeStartTip',
        function (data) {
            var workModeTipList = [
                '',
                '卸妆模式启动说明',
                '深层补水启动说明',
                '肌肤SPA启动说明',
                '晒后恢复启动说明',
                '敏感肌肤护理启动说明',
                '控油模式启动说明',
                'DIY模式启动说明'
            ];
            var tip = workModeTipList[Number(data._WorkMode)];
            if (tip) {
                return tip;
            } else if (Number(data.WorkMode) >= 8) {
                return '面膜模式启动说明';
            }
            return '未找到对应模式启动说明';
        }
    );

    // 获取工作模式对应的名字 WF.extra.Steps[x].Action.Type
    helper.addFunction(
        'nameForActionType',
        function (data, actionType) {
            var typeNames = ['无', '预热', '热喷', '冷喷', '温喷', '敷面膜'];
            var name = typeNames[Number(actionType[0])];
            if (name) {
                return name;
            }
            return '未知动作';
        }
    )

    // 当前工作状态名称
    helper.add(
        'workStatusName',
         function (data) {
             var workStatusList = [
                 '待机',
                 '预热中',
                 '热喷中',
                 '冷喷中',
                 '温喷中',
                 '完成',
                 '敷面膜开始等待',
                 '敷面膜中',
                 '敷面膜时间到'
             ];
             var name = workStatusList[Number(data.WorkStatus)];
             if (name) {
                 return name;
             }
             return '未知状态' + data.WorkStatus;
         }
    )

    // 转化数字为对应 iconfont 代码
    helper.addFunction(
        'fontCodeForNumber',
        function (data, params) {
            if (params.length === 0 || params[0] === undefined) { return ''; }

            var targetNumber = params[0].toString();
            var fontCodeList = [
                '&#xe62c;',
                '&#xe62d;',
                '&#xe62e;',
                '&#xe62f;',
                '&#xe630;',
                '&#xe631;',
                '&#xe632;',
                '&#xe633;',
                '&#xe634;',
                '&#xe635;'
            ];
            var colonCode = '&#xe63a;'; // 冒号 :
            var asteriskCode = '&#xe692;'; // 星号 *

            var result = '';
            for (var i=0,len=targetNumber.length; i<len; i++) {
                var index = Number(targetNumber[i]);
                if (!isNaN(index)) {
                    result += fontCodeList[index];
                } else if (targetNumber[i] === ':') {
                    result += colonCode;
                } else {
                    result += asteriskCode;
                }
            }

            return result;
        }
    )

});