/**
 * Created by huchunbo on 2017/2/16.
 */
define(['./js/manager/commandManager'], function (command) {

    // 测试指令
    
    command.add('start', {
        KG_Action: '1'
    });

    command.add('stop', {
        KG_Cancel: '1'
    });

});