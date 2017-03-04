/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public', './UI_serialPipSlider'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部信息显示控件
    var powerSetView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="start-view bottom-button-group">\
                            <div\
                            class="minor-button ui-important-orange-btn"\
                            v-tap="tapMinorButton"\
                            >取消</div>\
                            \
                            <div\
                            class="major-button ui-important-green-btn"\
                            v-tap="tapMajorButton"\
                            >确定</div>\
                        </div>\
                        \
                        <div class="start-view-appointment-view">\
                            <div class="shadow" v-tap="hidePowerSetUI"></div>\
                            <div class="appointment-view-content">\
                                <serial-pip-slider\
                                :current-value.sync="power"\
                                :data.sync="data"\
                                :index="index"\
                                :item-data="powerSlider"\
                                v-if="display"\
                                >\
                                </serial-pip-slider>\
                                \
                                <div class="bottom-button-group">\
                                    <div\
                                    class="minor-button ui-important-orange-btn"\
                                    v-tap="tapMinorButton"\
                                    >取消</div>\
                                    \
                                    <div\
                                    class="major-button ui-important-green-btn"\
                                    v-tap="tapMajorButton"\
                                    >确定</div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                majorButtonText: '取消',
                majorButton: {
                    title: '暂停',
                    command: []
                },
                minorButton: {
                    title: '取消',
                    command: []
                },
                powerSlider: {
                    type: 'slider',
                    sync: false,
                    key: this.itemData.key,
                    title: this.itemData.title,
                    min: 100,
                    max: 800,
                    step: 100,
                    defaultValue: this.data[this.itemData.key] || 800,
                    unit: 'W'
                },
                power: this.data[this.itemData.key],
                display: false
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            tapMajorButton: function () {
                // 点击主按钮
                var order = {};
                order[this.itemData.key] = {value: this.data['_'+this.itemData.key]};
                DA.setDeviceStatus(DA.uuid, order);
                this.hidePowerSetUI();
            },
            tapMinorButton: function () {
                // 点击次要按钮
                this.hidePowerSetUI();
            },
            updateConfig: function() {

            },
            hidePowerSetUI: function () {
                this.data[this.itemData.displayKey] = false;
            }
        },
        ready: function() {
        },
        computed: {
            show: function() {
                return publicComputed.show(this);
            },
            enable: function() {
                return publicComputed.enable(this);
            },
            display: function () {
                this.powerSlider.defaultValue = this.data[this.itemData.key] + '';
                return this.data[this.itemData.displayKey];
            }
        }
    });
    Vue.component('powerSetView', powerSetView);

    return powerSetView;
});

