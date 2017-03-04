/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * 圆形多选模式组件
     * */
    var initFunctionCheck = function(component) {
        var functionRadio = new DA.AlinkUI.FunctionCheck(ComponentName(component),{
            domhook : $('.function-check_'+component.$get('index')),
            datamodel:{
                uiTitle:component.$get('itemData.title'),
                key:component.$get('itemData.key'),
                checkNum:component.$get('itemData.gridNum') || 4,
                value:component.$get('currentValue'),
                unCheckedValue:'0',
                map:component.$get('itemData.map') || []
            },
            onItemClick: function (item, index, e) {
                var targetData = {},
                    targetKey = item.key,
                    targetValue = item.checkedFlag ? item.checkedValue : item.uncheckedValue;
                targetData[targetKey] = targetValue;
                component.$set('data.'+targetKey, targetValue);
                exportObject.setDeviceStatusMethod(targetData);
                return true;
            },
            changed:function(){
                // component.$set('data.'+this.getViewModel().key,this.getValue());
                // this.setDeviceStatus();
            }
        })
    };
    var FunctionCheck = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :index="index" :uv="updateValue" :e="enable">\
                        <div class="function-check_{{index}}"></div>\
                    </div>',
        data: function() {
            return {};
        },
        props: ['index', 'itemData', 'data', 'currentValue'],
        methods: {},
        init: function() {
        },
        ready: function() {
            initFunctionCheck(this);
        },
        watch: {
            data: {
                handler: function(newVal, oldVal) {
                    console.info(this.itemData.key + ': ' + oldVal + ' -> ' + newVal);
                    var currentComponent = DA.getUI(ComponentName(this));

                    for(var i=0,len=this.itemData.map.length; i<len; i++) {
                        var item = this.itemData.map[i];
                        var targetKey = item.key;
                        if (this.data[targetKey]) {
                            currentComponent.setValue({
                                Index: i,
                                Value: this.data[targetKey]
                            });
                        }
                    }
                },
                deep: true
            }
        },
        computed: {
            show: function() {
                return publicComputed.show(this);
            },
            enable: function() {
                return publicComputed.enable(this);
            }
        }
    });
    Vue.component('functionCheck', FunctionCheck);

    return FunctionCheck;
});

