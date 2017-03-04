/**
 * Created by huchunbo on 2016/9/30.
 * v2.0
 */

define(['./../vue', './public', './UI_slider'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部信息显示控件
    var KDMaskSliderView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="kd-mask-slider-view">\
                            <slider\
                            :current-value.sync="currentValue"\
                            :data.sync="data"\
                            :index="index"\
                            :item-data="sliderItemData"\
                            >\
                            </slider>\
                            <div class="patch">\
                                <div class="left-time-tip">3分钟</div>\
                                <div class="right-time-tip">3分钟</div>\
                                <div class="left-label">5分钟</div>\
                                <div class="right-label">30分钟</div>\
                                <div class="main-time-tip-des">敷面膜</div>\
                                <div class="main-time-tip">{{currentValue}}分钟</div>\
                            </div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                description: "",
                bigNumber: "0"
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {},
        computed: {
            show: function() {
                return publicComputed.show(this);
            },
            enable: function() {
                return publicComputed.enable(this);
            },
            sliderItemData: function () {
                var _itemData = this.itemData;
                var self = this;
                _itemData.onSlide = function (x, index, y) {
                    self.$set('currentValue', index.toString());
                };

                return _itemData;
            }
        }
    });
    Vue.component('kd-mask-slider-view', KDMaskSliderView);

    return KDMaskSliderView;
});

