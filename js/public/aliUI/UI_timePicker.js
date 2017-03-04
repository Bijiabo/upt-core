/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 时间单位类型
    var timeUnits = {
        hour: 'hour',
        minute: 'minute',
        second: 'second'
    };

    var maxValueForUnit = function(unit) {
        switch (unit) {
            case timeUnits.hour:
                return 23;
            case timeUnits.minute:
                return 59;
            case timeUnits.second:
                return 59;
            default:
                return 59;
        }
    };

    var timeUnitDisplay = function(unit) {
        // 返回时间单位类型对应展示单位
        switch (unit) {
            case timeUnits.hour:
                return '时';
            case timeUnits.minute:
                return '分';
            case timeUnits.second:
                return '秒';
            default:
                return '';
        }
    };

    var getArrayForTimeUnit = function (timeUnit, step, min, max) {
        if (min === undefined) {min = 0;}
        if (step === undefined) {step = 1;}
        var result = [];

        for (var i=min,len= max!==undefined ? max : maxValueForUnit(timeUnit); i<=len; i=i+step) {
            result.push(i.toString());
        }

        return result;
    };

    // 头部信息显示控件
    var timePicker = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable" :index="index">\
                        <div class="time-picker-component-container" v-if="shouldInit">\
                            <div class="title" v-if="itemData.title">{{itemData.title}}</div>\
                            <div class="ui-datetime time-picker_{{index}}"></div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                dateTimeConfigData: [],
                component: {},
                dateTimeConfigration: [
                    {
                        key: timeUnits.hour,
                        resource: [],
                        value: '0',
                        unit: '时'
                    },
                    {
                        key: timeUnits.minute,
                        resource: [],
                        value: '0',
                        unit: '分'
                    },
                    {
                        key: timeUnits.second,
                        resource: [],
                        value: '0',
                        unit: '秒'
                    }
                ],
                value: 0,
                shouldInit: true
            };
        },
        ready: function(){
            if (this.autoInit) {
                this.init();
                // 设定默认值
                this.setValue(Number(this.itemData.defaultValue));
            }
            // this.$set('data._'+this.itemData.key, this.itemData.stringValue ? this.itemData.min.toString() : this.itemData.min);
            this.$set('data._'+this.itemData.key, this.itemData.stringValue ? this.itemData.defaultValue.toString() : Number(this.itemData.defaultValue));

        },
        props: ['index', 'itemData', 'currentValue', 'data', 'display', 'autoInit'],
        methods: {
            getDataTimeConfiguration: function() {
                var config = [];
                for(var i=0,len=this.dateTimeConfigration.length;i<len;i++) {
                    var item = this.dateTimeConfigration[i];
                    if (item.resource.length > 0) {
                        config.push(item);
                    }
                }

                return config;
            },
            init: function() {
                this.setupDateConfiguration();

                var self = this;
                this.component = new DA.Datetime({
                    preset: 'diy', // date, datetime, time; defaults date
                    data:  this.getDataTimeConfiguration(),//dateTimeConfigData,
                    onChange: function(newData){
                        self.userChangedSelect(newData, this);
                    }
                });
                this.component.render($(".time-picker_"+this.index));
            },
            setupDateConfiguration: function () {
                // 初始化配置数据

                if (this.itemData.system12 === true) { // 时间选择
                    this.dateTimeConfigration[0] = {
                        key: 'halfDay',
                        resource: ['上午', '下午'],
                        value: '上午',
                        unit: ''
                    };
                    this.dateTimeConfigration[1].unit = '时';
                    this.dateTimeConfigration[2].unit = '分';
                    this.dateTimeConfigration[1].resource = getArrayForTimeUnit(timeUnits.hour, 1, 0, 11);
                    this.dateTimeConfigration[2].resource = getArrayForTimeUnit(timeUnits.minute, 1, 0, 59);
                    // 自动选中当前时间
                    var currentData = new Date();
                    if (currentData.getHours() >= 12) {
                        this.dateTimeConfigration[0].value = '下午';
                        this.dateTimeConfigration[1].value = (currentData.getHours()-12).toString();
                    } else {
                        this.dateTimeConfigration[0].value = '上午';
                        this.dateTimeConfigration[1].value = currentData.getHours().toString();
                    }
                    var minute = currentData.getMinutes().toString();
                    this.dateTimeConfigration[2].value = minute;


                } else if (this.itemData.system24 === true) {
                    this.dateTimeConfigration[0].resource = getArrayForTimeUnit(timeUnits.hour);
                    this.dateTimeConfigration[1].resource = getArrayForTimeUnit(timeUnits.minute);
                } else { // 自定义
                    var maxValue = this.itemData.max;
                    var hourIndex = 0,
                        minuteIndex = 1,
                        secondIndex = 2;
                    this.dateTimeConfigration[hourIndex].unit = '时';
                    this.dateTimeConfigration[minuteIndex].unit = '分';
                    this.dateTimeConfigration[secondIndex].unit = '秒';

                    switch (this.itemData.unit) {
                        case timeUnits.second:
                            if (maxValue > 60) { // > 1 minute
                                if (maxValue > 3600) { // > 1 hour
                                    this.dateTimeConfigration[hourIndex].resource = getArrayForTimeUnit(timeUnits.hour, 1, 0, Math.floor(this.itemData.max/3600));
                                    this.dateTimeConfigration[minuteIndex].resource = getArrayForTimeUnit(timeUnits.minute, 1);
                                } else { // <= 1 hour
                                    this.dateTimeConfigration[minuteIndex].resource = getArrayForTimeUnit(timeUnits.minute, 1, 0, Math.floor(this.itemData.max/60));
                                }

                                this.dateTimeConfigration[secondIndex].resource = getArrayForTimeUnit(timeUnits.second, this.itemData.step, this.itemData.min);

                            } else { // <= 1 minute
                                this.dateTimeConfigration[secondIndex].resource = getArrayForTimeUnit(timeUnits.second, this.itemData.step, this.itemData.min, this.itemData.max);
                            }
                            break;
                        case timeUnits.minute:
                            if (maxValue > 60) { // > 1 hour
                                this.dateTimeConfigration[hourIndex].resource = getArrayForTimeUnit(timeUnits.hour, 1, Math.floor(this.itemData.min/60)>0?1:0, Math.floor(this.itemData.max/60));
                                var remainder = (60-this.itemData.min)%this.itemData.step;
                                this.dateTimeConfigration[minuteIndex].resource = getArrayForTimeUnit(timeUnits.minute, this.itemData.step, Math.floor(this.itemData.min/60)>0?0:this.itemData.min, remainder===0?(60-this.itemData.step):(60-remainder));
                            } else { // <= 1 hour
                                this.dateTimeConfigration[minuteIndex].resource = getArrayForTimeUnit(timeUnits.minute, this.itemData.step, this.itemData.min, this.itemData.max);
                            }
                            break;
                        case timeUnits.hour:
                            this.dateTimeConfigration[hourIndex].resource = getArrayForTimeUnit(timeUnits.hour, this.itemData.step, this.itemData.min, this.itemData.max);
                            break;
                        default:
                            break;
                    }

                }

            },
            getCurrentValue: function() {
                // 获取当前控件值
                var _time = 0;
                var componentData = this.component.getTime();
                // console.warn(JSON.stringify(componentData, null, '\t'));

                for (var key in componentData) {
                    switch (key) {
                        case timeUnits.hour:
                            switch (this.itemData.unit) {
                                case timeUnits.second:
                                    _time += Number(componentData[key])*3600;
                                    break;
                                case timeUnits.minute:
                                    _time += Number(componentData[key])*60;
                                    break;
                                case timeUnits.hour:
                                    _time += Number(componentData[key]);
                                default:
                                    break;
                            }
                            break;
                        case timeUnits.minute:
                            switch (this.itemData.unit) {
                                case timeUnits.second:
                                    _time += Number(componentData[key])*60;
                                    break;
                                case timeUnits.minute:
                                    _time += Number(componentData[key]);
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case timeUnits.second:
                            _time += Number(componentData[key]);
                    }
                }

                // 处理 12 小时制问题
                if (componentData.halfDay && this.itemData.system12) {
                    if (componentData.halfDay === '下午') {
                        _time += 12*60;
                    }
                }

                if (this.itemData.fromNow) {
                    var _d = new Date();
                    var currentTimeValue = _d.getHours()*60 + _d.getMinutes();

                    if (_time - currentTimeValue < 0) {
                        _time = 24*60 + _time - currentTimeValue;
                    } else {
                        _time = _time - currentTimeValue;
                    }

                }

                this.time = _time;
                // console.warn(_time);
                return _time;
            },
            updateDataConfiguration: function() {
                this.getCurrentValue();

                if (this.itemData.system12) {return;}

                var hasHour = this.dateTimeConfigration[0].resource.length >0;
                var hasMinute = this.dateTimeConfigration[1].resource.length >0;
                var hasSecond = this.dateTimeConfigration[2].resource.length >0;
                if (!hasHour && !hasMinute) {return;}

                var hourResource = this.dateTimeConfigration[0].resource;
                var minuteResource = this.dateTimeConfigration[1].resource;
                var secondResource = this.dateTimeConfigration[2].resource;

                if (this.time <= this.itemData.max) {
                    var componentData = this.component.getTime();

                    if (hasHour) { // has hour
                        if (hasMinute) {
                            if (hasSecond) { // resum second
                                // 处理分钟
                                var targetMaxMinuteValue = Math.floor((this.itemData.max - componentData.hour*3600)/60);
                                if (targetMaxMinuteValue > 59) {targetMaxMinuteValue = 59;}
                                var currentMaxMinuteResourceValue = Number(minuteResource[minuteResource.length-1]);
                                if (currentMaxMinuteResourceValue != targetMaxMinuteValue) {
                                    var configItem = getArrayForTimeUnit(timeUnits.minute, 1, 0, targetMaxMinuteValue);
                                    this.dateTimeConfigration[1].resource = configItem;
                                    this.component.minute.updateData(configItem);
                                    var newTargetData = {};
                                    newTargetData.minute = componentData.minute;
                                    this.component.setData(newTargetData);
                                }

                                // 处理秒
                                componentData = this.component.getTime();
                                var targetMaxSecondValue = this.itemData.max - componentData.hour*3600 - componentData.minute*60;
                                if (targetMaxSecondValue > 59) {targetMaxSecondValue = 59;}
                                var minValueShouldBe = (Number(componentData.minute)>0 || Number(componentData.hour)>0) ? '0' : this.itemData.min.toString();
                                if (Number(secondResource[secondResource.length-1]) != targetMaxSecondValue || Number(secondResource[0]) != minValueShouldBe ) {
                                    var configItem = getArrayForTimeUnit(timeUnits.second, this.itemData.step, Number(minValueShouldBe));
                                    this.dateTimeConfigration[2].resource = configItem;
                                    this.component.second.updateData(configItem);
                                    var newTargetData = {};
                                    if (minValueShouldBe < componentData.second) {
                                        newTargetData.second = componentData.second;
                                    } else {
                                        newTargetData.second = minValueShouldBe;
                                    }
                                    this.component.setData(newTargetData);
                                }

                            } else { // resume minute
                                var targetMaxMinuteValue = this.itemData.max - componentData.hour*60;
                                if (targetMaxMinuteValue > 59) {targetMaxMinuteValue = 59;}
                                var currentMaxMinuteResourceValue = Number(minuteResource[minuteResource.length-1]);
                                if (currentMaxMinuteResourceValue != targetMaxMinuteValue || Number(minuteResource[0]) != (Number(componentData.hour)>0?0:this.itemData.min) ) {
                                    var targetMinMinuteValue = Number(componentData.hour) > 0 ? 0 : this.itemData.min;
                                    var configItem = getArrayForTimeUnit(timeUnits.minute, this.itemData.step, targetMinMinuteValue, targetMaxMinuteValue);
                                    this.dateTimeConfigration[1].resource = configItem;
                                    this.component.minute.updateData(configItem);
                                    var newTargetData = {};
                                    if (targetMinMinuteValue < componentData.minute) {
                                        newTargetData.minute = componentData.minute;
                                    } else {
                                        newTargetData.minute = targetMinMinuteValue.toString();
                                    }
                                    this.component.setData(newTargetData);
                                }
                            }
                        }
                    } else if (hasMinute) { // resume minute
                        if (hasSecond) { // resume second
                            var targetMaxSecondValue = Math.floor(this.itemData.max - componentData.minute*60);
                            if (targetMaxSecondValue > 59) {targetMaxSecondValue = 59;}
                            if (Number(secondResource[secondResource.length-1]) != targetMaxSecondValue || Number(secondResource[0]) != (Number(componentData.minute)>0?0:this.itemData.min) ) {
                                var targetMinSecondValue = Number(componentData.minute) > 0 ? 0 : this.itemData.min;
                                var configItem = getArrayForTimeUnit(timeUnits.second, this.itemData.step, targetMinSecondValue, targetMaxSecondValue);
                                this.dateTimeConfigration[2].resource = configItem;
                                this.component.second.updateData(configItem);
                                var newTargetData = {};
                                if (targetMinSecondValue < Number(componentData.second) ) {
                                    if (Number(componentData.second) < targetMaxSecondValue) {
                                        newTargetData.second = componentData.second;
                                    } else {
                                        newTargetData.second = targetMaxSecondValue.toString();
                                    }
                                } else {
                                    newTargetData.second = targetMinSecondValue.toString();
                                }

                                this.component.setData(newTargetData);
                            }
                        }
                    }
                    return;
                }

                var minuteMaxValue = Number(this.dateTimeConfigration[1].resource[this.dateTimeConfigration[1].resource.length-1]);

                if (this.dateTimeConfigration[0].resource.length >0) { // has hour
                    var hourMaxValue = Number(this.dateTimeConfigration[0].resource[this.dateTimeConfigration[0].resource.length-1]);

                    if (this.dateTimeConfigration[2].resource.length > 0) { // hour minute second

                        if (hourMaxValue*3600 + minuteMaxValue*60 > this.itemData.max) { // hour minute<needChange> second
                            var configItem = getArrayForTimeUnit(timeUnits.minute, 1, 0, Math.ceil((this.itemData.max-hourMaxValue*3600)/60));
                            this.dateTimeConfigration[1].resource = configItem;
                            this.component.minute.updateData(configItem);
                            var newTargetData = {};
                            newTargetData.minute = configItem[configItem.length-1];
                            this.component.setData(newTargetData);
                            this.updateDataConfiguration();
                        } else { // hour minute second<needChange>

                            var configItem = getArrayForTimeUnit(timeUnits.second, this.itemData.step, 0, Math.floor((this.itemData.max-hourMaxValue*3600-minuteMaxValue*60)));
                            this.dateTimeConfigration[2].resource = configItem;
                            this.component.second.updateData(configItem);
                            var newTargetData = {};
                            newTargetData.second = configItem[configItem.length-1];
                            this.component.setData(newTargetData);
                        }
                    } else { // hour minute<needChange>
                        var configItem = getArrayForTimeUnit(timeUnits.minute, this.itemData.step, 0, this.itemData.max-hourMaxValue*60);
                        this.dateTimeConfigration[1].resource = configItem;
                        this.component.minute.updateData(configItem);
                        var newTargetData = {};
                        newTargetData.minute = configItem[configItem.length-1];
                        this.component.setData(newTargetData);
                    }
                } else { // minute second<needChange>

                    var configItem = getArrayForTimeUnit(timeUnits.second, this.itemData.step, 0, Math.floor((this.itemData.max-minuteMaxValue*60)/60));
                    this.dateTimeConfigration[2].resource = configItem;
                    this.component.second.updateData(configItem);
                    var newTargetData = {};
                    newTargetData.second = configItem[configItem.length-1];
                    this.component.setData(newTargetData);
                }
            },
            userChangedSelect: function(newData, context) {
                var self = this;
                this.updateDataConfiguration();
                var time = this.getCurrentValue(newData);

                self.$set('data.'+self.itemData.key, self.itemData.stringValue ? time.toString() : time);
                self.$set('data._'+self.itemData.key, self.itemData.stringValue ? time.toString() : time);
            },
            setValue: function(value) {
                if (this.itemData.system12) {
                    // 12 小时值
                    // TODO: 完善 12 小时制默认值设定
                } else {
                    // 其他
                    switch (this.itemData.unit) {
                        case timeUnits.second:
                            var targetData = {};
                            if (value >= 3600) {
                                targetData.hour = Math.floor(value/3600);
                                targetData.minute = Math.floor((value-targetData.hour*3600)/60);
                                targetData.second = value-targetData.hour*3600-targetData.minute*60;
                            } else if (value >= 60) {
                                targetData.minute = Math.floor(value/60);
                                targetData.second = value%60;
                            } else {
                                targetData.second = value;
                            }
                            this.component.setData(targetData);
                            break;
                        case timeUnits.minute:
                            if (value >= 60) {
                                this.component.setData({
                                    hour: Math.floor(value/60),
                                    minute: value % 60
                                });
                            } else {
                                var targetData = {minute: value};
                                if (this.itemData.max >= 60) { targetData.hour = 0; }
                                this.component.setData(targetData);
                            }
                            break;
                        case timeUnits.hour:
                            this.component.setData({hour: value});
                            break;
                        default:
                            break;
                    }
                }
                this.updateDataConfiguration();
            }
        },
        computed: {
            show: function() {
                return publicComputed.show(this);
            },
            enable: function() {
                return publicComputed.enable(this);
            }
        },
        watch: {
            'display': function (val, oldVal) {
                // 当显示变更为 true 的时候，重新初始化渲染组件，以解决触摸失效的问题
                if (val) {
                    this.init();
                }
            },
            'data': {
                handler: function (newVal) {
                    // console.warn('time piacker data change...');
                    if (this.itemData.ifCondition) {
                        var old_shouldInit = this.shouldInit;
                        this.shouldInit = this.itemData.ifCondition(newVal);
                        if (this.shouldInit == old_shouldInit) {return;}
                        if (this.shouldInit) {
                            var self = this;
                            var defaultValue = Number(this.itemData.defaultValue);
                            setTimeout(function () {
                                self.init();
                                self.setValue(defaultValue);
                            }, 200);
                        }
                    }
                },
                deep: true
            }
        }
    });
    Vue.component('timePicker', timePicker);

    return timePicker;
});

