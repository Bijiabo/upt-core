/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * 滑动组件
     * */
    var initSlider = function(component) {

        var min = component.$get('itemData.min'),
            max = component.$get('itemData.max'),
            step = component.$get('itemData.step'),
            unit = component.$get('itemData.unit');
        var labelForValue = component.$get('itemData.labelForValue');
        var serialMode = component.$get('itemData.serialMode');
        var minIndex = 0,
            maxIndex = 0;
        var pipsValue = []; // 对应下发的值
        var pipsDesc = []; // 显示标签
        for (var i = min; i <= max; i = i + step) {
            pipsValue.push(i.toString());
            if (labelForValue) {
                var label = labelForValue(i, unit);
                pipsDesc.push(label);
            } else {
                if (i===min || i===max) {
                    pipsDesc.push(i + unit);
                } else {
                    pipsDesc.push('');
                }
            }

            maxIndex++;
        }

        var _SliderConfig = {
            name: ComponentName(component),
            datamodel: {
                key: component.$get('itemData.key'),
                value: component.$get('itemData.defaultValue'),
                map: pipsValue
            },
            sliderLabel: component.$get('itemData.title'),
            element: $('.serial-pip-slider_'+component.$get('index')),
            min: minIndex,
            max: pipsValue.length-1,
            pipsValue: pipsValue,
            pipsDesc: pipsDesc,
            changed:function  () {
                component.$set('currentValue', this.getValue());
                if (component.itemData.sync !== false) {
                    // _setDeviceStatus(component);
                    var order = {};
                    order[component.$get('itemData.key')] = {value: this.getValue()};
                    DA.setDeviceStatus(DA.uuid, order);
                } else {
                    component.$set('data._'+component.itemData.key, this.getValue());
                }

                var didChangeHandler = component.$get('itemData.didChange');
                if (didChangeHandler) {
                    didChangeHandler(component.$get('data'), component);
                }

                return true;
            }
        };
        if (serialMode) {
            _SliderConfig.onSlide = function (x, index, y) {
                var currentDesc = pipsValue[index] + unit;
                var handler = $(component.$el).find('.ui-slider-handle');
                handler.attr('value', currentDesc);
            };
        }

        var _Slider = new DA.AlinkUI.PipsSlider('PipSlider', _SliderConfig);
    };
    var Slider = Vue.extend({
        template: '\
                <template v-if="itemData.showIfMode">\
                    <div :class="{\'serialMode\': itemData.serialMode, \'no-slider-label\': itemData.optimizeTitleStyle}" :vv="value" :e="enable" v-if="show">\
                        <div class="panel-title-cell" v-if="itemData.optimizeTitleStyle">{{itemData.title}}</div>\
                        <div class="serial-pip-slider_{{index}} ui-slider-item serial-pip-slider-item"></div>\
                    </div>\
                </template>\
                <template v-else>\
                    <div :class="{\'serialMode\': itemData.serialMode, \'hide\': !show, \'no-slider-label\': itemData.optimizeTitleStyle}" :vv="value" :e="enable">\
                        <div class="panel-title-cell" v-if="itemData.optimizeTitleStyle">{{itemData.title}}</div>\
                        <div class="serial-pip-slider_{{index}} ui-slider-item serial-pip-slider-item"></div>\
                    </div>\
                </template>\
        ',
        data: function() {
            return {
                show: true
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {},
        ready: function() {
            initSlider(this);
            if (this.itemData.sync === false) {
                DA.getUI(ComponentName(this)).setValue(this.itemData.defaultValue.toString());
                this.$set('data._'+this.itemData.key, this.itemData.defaultValue.toString());
            }
        },
        watch: {
            currentValue: function(newVal, oldVal) {
                // console.info(this.itemData.key + ': ' + oldVal + ' -> ' + newVal);
                if (this.itemData.sync === false) {
                    return;
                }
                DA.getUI(ComponentName(this)).setValue(newVal);
            },
            show: function(newVal, oldVal) {
                if (newVal != oldVal) {
                    if (this.itemData.sync === false) {
                        if (this.data['_'+this.itemData.key] > this.itemData.max) {this.data['_'+this.itemData.key] = this.itemData.max.toString();}
                        if (this.data['_'+this.itemData.key] < this.itemData.min) {this.data['_'+this.itemData.key] = this.itemData.min.toString();}
                        DA.getUI(ComponentName(this)).setValue(this.data['_'+this.itemData.key]);
                    } else {
                        if (this.currentValue > this.itemData.max) {this.currentValue = this.itemData.max.toString();}
                        if (this.currentValue < this.itemData.min) {this.currentValue = this.itemData.min.toString();}
                        DA.getUI(ComponentName(this)).setValue(this.currentValue);
                    }
                }
                if (this.itemData.showIfMode) {
                    initSlider(this);
                    DA.getUI(ComponentName(this)).setValue(this.currentValue);
                }
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
    Vue.component('serialPipSlider', Slider);

    return Slider;
});

