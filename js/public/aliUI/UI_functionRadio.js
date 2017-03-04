/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * 圆形单选模式组件
     * */
    var initFunctionRadio = function(component) {
        var functionRadio = new DA.AlinkUI.FunctionRadio(ComponentName(component),{
            domhook : $('.function-radio_'+component.$get('index')),
            datamodel:{
                key:component.$get('itemData.key'),
                gridNum:component.$get('itemData.gridNum') || 4,
                value:component.$get('currentValue'),
                unCheckedValue:'0',
                map:component.$get('itemData.map') || []
            },
            changed:function(){
                component.$set('data.'+this.getViewModel().key,this.getValue());
                _setDeviceStatus(component);
            }
        })
    };
    var FunctionRadio = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :index="index" :uv="updateValue">\
                        <div class="function-radio_{{index}}"></div>\
                    </div>',
        data: function() {
            return {};
        },
        props: ['index', 'itemData', 'data', 'currentValue'],
        methods: {},
        init: function() {
        },
        ready: function() {
            initFunctionRadio(this);
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
    Vue.component('functionRadio', FunctionRadio);

    return FunctionRadio;
});

