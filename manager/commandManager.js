/**
 * Created by huchunbo on 2017/2/16.
 * commandManager.js
 * 命令管理员
 * 主要用于管理、翻译操作动作为下发命令
 */
define([], function () {
    var commandManager = {};

    // 打包指令方法
    var package = function (command, additionalCommandKey) {
        // ali smart
        var commandReslt = {};
        for(key in command) {
            if (typeof command[key] === 'object') {
                commandReslt[key] = command[key];
                commandReslt[key].value = '1';
            } else {
                commandReslt[key] = {value: command[key]};
            }

        }

        if (additionalCommandKey && additionalCommandKey.length > 0) {
            for (var i=0,len=additionalCommandKey.length; i<len; i++) {
                var key = additionalCommandKey[i];
                if (window.data[key]) {
                    if (typeof window.data[key] === 'object') {
                        commandReslt[key] = window.data[key];
                        commandReslt[key].value = '1';
                    } else {
                        commandReslt[key] = {value: window.data[key]};
                    }

                }
            }
        }
        console.log('%c[runCommand-packageData]\n'+JSON.stringify(commandReslt, null, '\t'), "font-size:1em; background-color: #3E5266; color: #ffffff; ");
        return commandReslt;
    };

    // 下发指令方法
    var run = function (command, additionalCommandKey, customPackageFunction) {
        // ali smart
        var packagedData = package(command, additionalCommandKey);
        if (customPackageFunction) {
            packagedData = customPackageFunction(packagedData, window.data);
            console.log('%c[runCommand-customPackageData]\n'+JSON.stringify(packagedData, null, '\t'), "font-size:1em; background-color: #FFEA88; color: #3E5266; ");
        }
        DA.setDeviceStatus(DA.uuid, packagedData);
        return packagedData;
    };

    // 添加指令接口
    var command = {
        /*
        * additionalCommandKey: 附加的其他动态字段，如界面可以让用户控制的温度字段等
        * */
        add: function (commandName, data, additionalCommandKey, customPackageFunction) {
            Object.defineProperty(
                commandManager,
                commandName,
                {
                    get: function() {
                        console.log('%c[runCommand] '+commandName, "font-size:1em; background-color: #6638F0; color: #ffffff; padding: 4px;");
                        return run(data, additionalCommandKey, customPackageFunction);
                    }
                }
            );
        }
    };

    window.commandManager = commandManager;

    return command;
});