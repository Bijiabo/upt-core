/**
 * upt.js
 * 核心输出文件
 * Created by huchunbo on 16/6/4.
 */
// require.config({
//     paths: {
//         'vue': 'js/public/vue'
//     }
// });

define([
        './../public/vue',
        './../public/vue-tap',
        './../public/aliUI',
        './../public/platform',
        './upt-template',
        'http://g.alicdn.com/aic/sdk/user.js','Q' // 获取用户数据
    ], function(Vue, vueTap, aliUI, platform, template, user, Q) {
    user.getUserData(function(data){
        console.log('user data:',data);
    });


    Vue.use(vueTap);

    var version = 'A1 (2017.02.15.16.17)';

    var appConfig = {};
    window.data = {
        version: version,
        dev: true
    };
    window.loadPageCount = 0; // 用于判断是否允许跳转

    var Container = Vue.extend({
        template: '<template v-for="(index,item) in appConfig.viewData">\
                        <li v-if="appConfig.debugView">{{item.type}} : {{item.key}} : {{data[item.key]}}</li>\
                        \
                        ' + template + '\
                    </template>',
        data: function() {
            return {
                data: window.data,
                appConfig: appConfig
            };
        },
        init: function() {
            var self = this;

            // 设定页面背景颜色
            if (appConfig.bodyBackgroundColor) {
                $('body').css('background-color', appConfig.bodyBackgroundColor);
            }

            // 添加断网处理VIEW
            appConfig.viewData.push({
                type: 'offnet_tipview',
                key: 'onlineState'
            });

            var hasAddedNavigationBar = false;

            // 注入参数和默认值到 data
            for (var i= 0,len=appConfig.viewData.length; i<len; i++){
                var item = appConfig.viewData[i];
                switch (item.type) {
                    case 'function-check':
                        // console.error(currentMapItem.key);
                        for (var index=0,_len=item.map.length; index<_len; index++) {
                            var currentMapItem = item.map[index];
                            window.data[currentMapItem.key] = currentMapItem.uncheckedValue;
                        }
                        break;
                    default:
                        // console.error(item.key);
                        // console.error(item);
                        if (item.key) {
                            window.data[item.key] = item.defaultValue;
                        }
                        break;
                }

                if (item.type === 'navigationBar') {
                    hasAddedNavigationBar = true;
                }
            }

            // 添加默认 navigation bar (若没有)
            if (!hasAddedNavigationBar) {
                appConfig.viewData.push({
                    type: 'navigationBar',
                    back: undefined,
                    title: undefined,
                    componentType: 'mixed'
                });
            }


            window.data.WorkStatus = ''; //todo: delete this test value

            // 根据平台绑定参数更新
            switch (appConfig.platform) {
                case 'aliSmart':
                    var updateDeviceStatus = function() {
                        DA.getDeviceStatus(DA.uuid, function (d) {
                            if (d) {
                                // delete d.uuid;
                                for(var key in d){
                                    var item = d[key];
                                    if (item.value && item.extra === undefined) {
                                        self.$set('data.'+key, item.value);
                                    } else {
                                        self.$set('data.'+key, item);
                                    }
                                }
                            }
                        });
                    };
                    updateDeviceStatus();

                    DA.bindPushData({
                        'deviceStatusChange': function(newData){
                            for(var key in newData){
                                var item = newData[key];
                                if (item.value && item.extra === undefined) {
                                    self.$set('data.'+key, item.value);
                                } else {
                                    self.$set('data.'+key, item);
                                }
                            }
                        },
                        'netWorkStatusChange': function(netWorStatusData){
                            window.data.onlineState = netWorStatusData ? 'on' : 'off';
                        }
                    });

                    // 处理返回前台的特殊情况
                    var isAndroid = function() {
                        var userAgent = navigator.userAgent;
                        var index = userAgent.indexOf("Android");
                        return index !== -1;
                    };

                    if (isAndroid()) {
                        //Android回到前台
                        document.addEventListener('backToFront', function() {
                            updateDeviceStatus();
                        });

                        document.addEventListener('webviewvisibilitychange', function() {
                            updateDeviceStatus();
                        });
                    } else {
                        //IOS回到前台
                        document.addEventListener('WV.Event.APP.Active', function() {
                            updateDeviceStatus();
                        });

                        document.addEventListener('visibilitychange', function() {
                            updateDeviceStatus();
                        });
                    }

                    break;
                default:
                    break;
            }

        },
        methods: {
            dataUpdated: function(){
                // 处理页面跳转配置逻辑
                // todo: 分离，兼容多平台
                if (Object.prototype.toString.call( appConfig.direction ) === '[object Array]') {
                    console.warn('xxxx');
                    for(var i=0,len=appConfig.direction.length; i<len; i++) {
                        var currentDirectionConfig = appConfig.direction[i];

                        if (currentDirectionConfig.condition(data)) {
                            switch (currentDirectionConfig.type) {
                                case 'load':
                                    console.warn('check load');
                                    if (window.loadPageCount > 0) {
                                        DA.loadPage(currentDirectionConfig.url, currentDirectionConfig.params);
                                        window.loadPageCount = 0;
                                    }
                                    break;
                                case 'back':
                                    DA.back(currentDirectionConfig.url);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        },
        ready: function() {

            this.$watch('data', function(newDataVal, oldVal){
                // console.warn(JSON.stringify(data,null,'\t'));
                this.dataUpdated();
            }, {
                deep: true
            });

        }
    });


    // 设定数据传输相关
    aliUI.setDeviceStatusMethod = function(targetData, force){
        // 若配置文件设定为 nonatomicSendData: false，则不自动发送数据; 若强制发送 force=true，则调用此方法时忽略此配置参数
        if (appConfig.nonatomicSendData && !force) {return;}
        if (appConfig.sendAllData) {
            // 一次性下发所有指令
            platform.setDeviceStatus(window.data);
        } else {
            // 下发单条指令
            platform.setDeviceStatus(targetData);
        }

    };

    window._setDeviceStatus = function(component, targetData) {
        /*
         * 一般控件仅需传入自身组建(component)包装对象
         * 若强制下发特定数据，则 传入 component = false, 给 targetData 赋值
         * 组建内部均调用此方法进行指令下发
         */
        if (component) {
            var key = component.$get('itemData.key'),
                value = component.$get('currentValue');
            targetData = {};
            targetData[key] = value;
        }

        aliUI.setDeviceStatusMethod(targetData, !component);

    };

    return {
        init: function(config) {

            appConfig = config;

            platform.init(appConfig.platform);

            Vue.component('container', Container);

            new Vue({
                el: '#view'
            });
        }
    }

});