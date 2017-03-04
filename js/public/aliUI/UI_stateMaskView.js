/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){
    var publicComputed = _public.publicComputed;

    var StateMaskView = Vue.extend({
        template: '<div :e="enable" :class="[show ? \'\' : \'hide\' ]">\
                        <div class="state-mask">\
                            <div \
                            class="lock"\
                            :style="{background: backgroundImage}"></div>\
                        </div>\
                    </div>',
        data: function() {
            return {};
        },
        props: ['index', 'itemData', 'data'],
        computed: {
            show: function() {
                return publicComputed.show(this);
            },
            enable: function() {
                return publicComputed.enable(this);
            },
            backgroundImage: function() {
                var backgroundString = this.itemData.backgroundImage || 'https://img.alicdn.com/tps/TB1MPamLXXXXXaOXFXXXXXXXXXX-520-384.png';
                return 'url(' + backgroundString + ')';
            }
        }
    });
    Vue.component('stateMaskView', StateMaskView);

    return StateMaskView;
});

