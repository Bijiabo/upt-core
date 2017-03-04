/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * 开关按钮
     * */
    var initPowerButton = function(component) {

        var powerBtn = new DA.AlinkUI.SwitchButton(ComponentName(component), {
            domhook : $('.power-button_'+component.$get('index')),
            datamodel: {
                key: component.$get('itemData.key'),
                value: component.$get('itemData.defaultValue'),
                map: component.$get('itemData.map') || {on: "1", off: "0"}
            },
            onClickBefore: function(){
                return true;
            },
            onClickAfter: function(){
                return true;
            },
            changed: function(){
                component.$set('currentValue', this.getValue());
                _setDeviceStatus(component);
            }
        });
    };
    var PowerButton = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :vv="value">\
                        <div class="power-button_{{index}} ui-switch-section"></div>\
                    </div>',
        data: function() {
            return {};
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {},
        ready: function() {
            initPowerButton(this);
        },
        watch: {
            currentValue: function(newVal, oldVal) {
                console.info(this.itemData.key + ': ' + oldVal + ' -> ' + newVal);
                DA.getUI(ComponentName(this)).setValue(newVal);
            }
        },
        computed: {
            show: function() {
                return publicComputed.show(this);
            }
        }
    });
    Vue.component('power-button', PowerButton);

    return PowerButton;
});

