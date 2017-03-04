/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 断网提示
    var initOffNetTipView = function(component) {
        var componentUI =  new DA.AlinkUI.OffNet(ComponentName(component),{
            domhook : $('.offnet_tipview_'+component.$get('index')),
            datamodel:{
                button:[]
            }
        });

        return componentUI;
    };
    var OffNetTipView = Vue.extend({
        template: '<div :e="enable" :class="[show ? \'\' : \'hide\' ]">\
                        <div class="offnet_tipview_{{index}} ui-offNet" id="ui-view-8" style="display: block; -webkit-transform-origin: 0px 0px; opacity: 1; -webkit-transform: scale(1, 1);">\
                            <div class="ui-offNet-box">\
                                <div class="section" aria-label="设备断网提示蒙层，请按照下面的文字进行操作">\
                                    <div class="refresh">\
                                    <div class="circle refreshIcon" v-tap="refresh">\
                                        <i class="iconfont"></i>\
                                    </div>\
                                    <p>刷新试试</p>\
                                    </div>\
                                </div>\
                                <div class="section bottom-section">\
                                    <h2>该设备已断开连接！</h2>\
                                    <p>请将设备连上您的网络，可尝试以下操作</p>\
                                    <ul class="tips">\
                                        <li>1.点击刷新按钮</li>\
                                        <li>2.检查家里的路由器是否成功联网，或尝试重启路由器</li>\
                                        <li>3.检查智能设备的电源插头是否插好</li>\
                                    </ul>\
                                    <div class="control-section"></div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                component: false
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            refresh: function() {
                location.reload();
            }
        },
        ready: function() {
            // this.component = initOffNetTipView(this);
            // this.component.showUI();
        },
        computed: {
            show: function() {

                if (this.data) {
                    if (this.data.onlineState == 'off') {
                        return true;
                    }
                }
                return false;
            },
            enable: function() {
                return publicComputed.enable(this);
            }
        }
    });
    Vue.component('offNetTipView', OffNetTipView);

    return OffNetTipView;
});

