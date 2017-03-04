/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 分割控件
    var SeparatorView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="separator-view" :style="{ height: height, \'background-color\': backgroundColor }">\
                        </div>\
                    </div>',
        data: function() {
            return {};
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {},
        ready: function() {},
        computed: {
            height: function() {
                return this.itemData.height+'px' || '20px';
            },
            backgroundColor: function() {
                return this.itemData.backgroundColor || 'none';
            },
            show: function() {
                return publicComputed.show(this);
            },
            enable: function() {
                return publicComputed.enable(this);
            }
        }
    });
    Vue.component('separatorView', SeparatorView);

    return SeparatorView;
});

