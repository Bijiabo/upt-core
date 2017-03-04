/**
 * Created by huchunbo on 16/6/15.
 * 封装平台通用方法
 */
define(['./dataConverter'], function(dataConverter){

    var __currentPlatform = 'unknow';
    var __platforms = {
        alismart: 'alismart',
        jdsmart: 'jdsmart'
    };

    // 配置公共方法
    window.Platform = {
        query: {}
    };

    var init = function(platform) {

        platform = platform.toLowerCase();

        var packagePlatformInfo = function(_platform) {
            return {
                platform: _platform
            };
        };

        switch (platform) {
            case __platforms.alismart:
                if (DA.uuid === undefined) {
                    DA.uuid = 'UPT';
                }
                __currentPlatform = platform;
                /*
                var setupNavigationBar = function(title) {
                    if (title === undefined) {
                        title = 'loading'
                    }

                    DA.nativeCmp.topbar.setNavbar({
                        title:title,
                        type:'mixed',
                        rightButton:[{
                            iconfont:'&#x3042',
                            name:'iconCode',
                            handler:function(){
                                console.log('iconCode click');
                            }
                        }]
                    },function(){
                        console.log('set success');
                        DA.nativeCmp.topbar.removeRightBtnByName('iconCode',function(){
                            console.log('set success');
                        },function(){
                            console.log('set fail');
                        });
                    },function(){
                        console.log('set fail');
                    });

                };
                setupNavigationBar();

                DA.getDeviceInfo({
                    uuid: DA.uuid
                }, function(d) {
                    if (d.result.msg === "success") {
                        // success done;
                        var displayName = d.result.data.displayName;
                        setupNavigationBar(displayName);
                    } else {
                        // 可省略
                        // failure done;
                    }
                });
                */
                // 配置 URL 参数获取方法
                // Object.defineProperty(window.UPT.Platform, "query", { get: function () { return DA.query; } });

                break;

            default:
                break;
        }

        return packagePlatformInfo(__currentPlatform);
    };

    var setDeviceStatus = function(data) {
        console.debug(data);
        switch (__currentPlatform) {
            case __platforms.alismart:
                data = dataConverter.convertDataForPlatform(data, __currentPlatform);
                console.debug('setDeviceStatus:\n' + JSON.stringify(data, null, '\t'));
                DA.setDeviceStatus(DA.uuid, data);
                break;

            default:
                break;
        }
    };

    return {
        init: init,
        setDeviceStatus: setDeviceStatus
    };
});