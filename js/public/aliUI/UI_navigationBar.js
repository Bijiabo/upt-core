/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue'], function(Vue){

    var NavigationBar = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]">\
                        <div class="navigation-bar">\
                            <div class="left">xx</div>\
                            <div class="title">{{title}}</div>\
                            <div class="right">x</div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                title: 'loading',
                _unwatch: false,
                debug: ''
            };
        },
        props: ['index', 'itemData', 'data'],
        methods: {
            updateNativeBar: function() {
                DA.nativeCmp.topbar.setNavbar({
                    title: this.title || 'loading',
                    type:this.itemData.componentType,
                    rightButton:[{
                        iconfont:'&#x3090',
                        name:'iconCode',
                        handler:function(){
                            alert('version: ' + window.data.version);
                        }
                    }]
                },function(){
                    if (!this.data.dev) {
                        DA.nativeCmp.topbar.removeRightBtnByName('iconCode', function () {
                        }, function () {
                        });
                    }
                },function(){});
            },
            updateNativeTitle: function () {
                var self = this;
                DA.getDeviceInfo({
                    uuid: DA.uuid
                }, function(d) {
                    if (d.result.msg === "success") {
                        // success done;
                        var displayName = d.result.data.displayName;
                        self.title = displayName;
                        self.updateNativeBar();
                    } else {
                        // 可省略
                        // failure done;
                    }
                });
            },
            getCloudCookbookTitle: function (callback) {
                DA.appstore_getAppDetailedInfo({
                    app_id: this.data.WF.extra.WF_ID,
                }, function(res) {
                    if (res.result.code == '1000') {
                        callback(res.result.data.name);
                    }
                });
            }
        },
        computed: {
            show: function() {
                return ['mixed', 'solid'].indexOf(this.itemData.componentType) < 0;
            }
        },
        ready: function () {
            var self = this;
            if (this.itemData.forceReload) {
                this._unwatch = this.$watch('data', function(newVal, oldVal){
                    if (this.itemData.isCloudMenu(this.data)) {
                        // 云菜谱
                        this.getCloudCookbookTitle(function(title) {
                            self.title = title;
                            DA.nativeCmp.topbar.setNavbar({
                                title: self.title || 'loading',
                                type: self.itemData.componentType,
                                rightButton:[]
                            },function(){},function(){});
                        });
                    } else {
                        switch (Object.prototype.toString.call(this.itemData.title)) {
                            case '[object String]':
                                this.title = this.itemData.title;
                                break;
                            case '[object Function]':
                                // 普通菜谱
                                self.title = self.itemData.title(newVal);
                                DA.nativeCmp.topbar.setNavbar({
                                    title: this.title || 'loading',
                                    type: this.itemData.componentType,
                                    rightButton: []
                                }, function () {
                                }, function () {
                                });
                                break;
                            default:
                                this.title = this.itemData.title;
                                break;
                        }
                    }
                }, {deep: true});
            } else {
                switch (Object.prototype.toString.call(this.itemData.title)) {
                    case '[object String]':
                        this.title = this.itemData.title;
                        break;
                    case '[object Function]':
                        var self = this;
                        this._unwatch = this.$watch('data', function(newVal, oldVal){
                            if (this.itemData.isCloudMenu(this.data)) {
                                // 云菜谱
                                this.getCloudCookbookTitle(function(title) {
                                    self.title = title;
                                    DA.nativeCmp.topbar.setNavbar({
                                        title: self.title || 'loading',
                                        type: self.itemData.componentType,
                                        rightButton:[]
                                    },function(){},function(){});
                                });
                            } else {
                                // 普通菜谱
                                self.title = self.itemData.title(newVal);
                                DA.nativeCmp.topbar.setNavbar({
                                    title: this.title || 'loading',
                                    type:this.itemData.componentType,
                                    rightButton:[]
                                },function(){},function(){});
                            }
                        }, {deep: true});
                        break;
                    default:
                        this.title = this.itemData.title;
                        break;
                }
            }


            if (['mixed', 'solid'].indexOf(this.itemData.componentType) >= 0) {
                this.updateNativeBar();
                if (this.title === undefined) {
                    this.updateNativeTitle();
                }

            }
        },
        beforeDestroy: function() {
            this._unwatch();
        }
    });
    Vue.component('navigationBar', NavigationBar);

    return NavigationBar;
});

