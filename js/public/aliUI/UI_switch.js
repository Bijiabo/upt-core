/**
 * Created by huchunbo on 2016/9/30.
 */


define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    var initSwitch = function(component) {
        var element = new DA.AlinkUI.Switch(ComponentName(component), {
            domhook : $('.switch_'+component.$get('index')),
            datamodel: {
                key: component.$get('itemData.key'),
                value: component.$get('itemData.defaultValue'),
                map: component.$get('itemData.map') || {on: "1", off: "0"},
            },
            tpl:'switch',
            changed: function(){
                component.$set('currentValue', this.getValue());
                _setDeviceStatus(component);

            }
        });
    };

    var Switch = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :vv="value">\
                        <div class="switch_{{index}}"></div>\
                    </div>',
        data: function() {
            return {};
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        ready: function() {
            initSwitch(this);
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
    Vue.component('switch', Switch);

    return Switch;
});

