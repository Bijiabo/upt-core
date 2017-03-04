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

        var SliderConfig = {
            name: ComponentName(component),
            datamodel: {
                key: component.$get('itemData.key')
            },
            sliderLabel: component.$get('itemData.title'),
            element: $('.slider_'+component.$get('index')),
            value: component.$get('itemData.defaultValue'),
            min: component.$get('itemData.min'),
            max: component.$get('itemData.max'),
            step: component.$get('itemData.step'),  //滑动时跳动的步长
            changed:function  () {
                component.$set('currentValue', this.getValue());
                if (component.itemData.sync !== false) {
                    _setDeviceStatus(component);
                } else {
                    component.$set('data._'+component.itemData.key, this.getValue());
                }
                return true;
            },
            unit: component.$get('itemData.unit') || ''
        };

        var onSlide = component.$get('itemData.onSlide');

        if (onSlide) {
            SliderConfig.onSlide = onSlide;
            // SliderConfig.onSlide = function (x, index, y) {
            //     component.$set('currentValue', index.toString());
            // };
        }

        var _Slider = new DA.AlinkUI.Slider(SliderConfig);
    };
    var Slider = Vue.extend({
        template: '<div :class="{\'hide\': !show, \'no-slider-label\': itemData.optimizeTitleStyle}" :vv="value" :e="enable">\
                        <div class="panel-title-cell" v-if="itemData.optimizeTitleStyle">{{itemData.title}}</div>\
                        <div class="slider_{{index}} ui-slider-item"></div>\
                    </div>',
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
    Vue.component('slider', Slider);

    return Slider;
});

