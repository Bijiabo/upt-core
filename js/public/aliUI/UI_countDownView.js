/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;
    var countDownIntervalID = undefined;
    var clearCountDOwnInterval = function() {
        if (countDownIntervalID) {
            window.clearInterval(countDownIntervalID);
            countDownIntervalID = undefined;
        }
    };

    // 头部信息显示控件
    var CountDownView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div \
                        class="count-down-view"\
                        :class="{\'working\': working, \'pause\':pause}">\
                            <div class="circle-view">\
                                <div class="content-main-explain">{{{mainExplain}}}</div>\
                                <div class="content-main">{{{main}}}</div>\
                                <div class="content-state">{{state}}</div>\
                                <div class="content-alltime">{{allTime}}</div>\
                            </div>\
                            <div class="content-additional">{{{additional}}}</div>\
                            <div class="step-count" :class="[hideStep ? \'hide\' : \'\']">\
                                <div class="current-step">{{currentStep}}</div>\
                                <div class="all-step">{{allStep}}</div>\
                            </div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                mainExplain: '剩余时间',
                mainNumber: 0,
                main: '--:--:--',
                state: '加热中',
                allTimeNumber: -1,
                allTime: '总剩余 00:00:00',
                additional: '', // 附加信息
                currentStep: '-',
                allStep: '-',
                working: true,
                needAutoCountDown: true,
                mainNumberLength: 3,
                allTimeLength: 3,
                pause: false,
                hideStep: false
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            renderData: function(newData) {
                var displayData = this.itemData.displayData(newData);
                this.mainExplain = displayData.mainExplain;

                if (displayData.mainContent) {
                    this.main = displayData.mainContent;
                } else {
                    this.mainNumber = displayData.mainNumber;
                    this.mainNumberLength = displayData.mainNumberLength;
                    this.main = displayData.mainNumber < 0 ? '--:--' : this.timeToArray(displayData.mainNumber,this.mainNumberLength).join(':');
                }

                this.state = displayData.state;

                this.allTimeNumber = displayData.allTimeNumber;
                this.allTimeLength = displayData.allTimeLength;
                this.allTime = displayData.allTimeNumber < 0 ? '' : '剩余总时间 '+this.timeToArray(displayData.allTimeNumber,displayData.allTimeLength).join(':');

                this.additional = displayData.additional || '';
                this.currentStep = displayData.currentStep;
                this.allStep = displayData.allStep;

                this.working = displayData.working;
                this.needAutoCountDown = displayData.needAutoCountDown;

                this.pause = displayData.pause;
                this.hideStep = displayData.hideStep;
            },
            updateCountDownTime: function() {
                if (this.needAutoCountDown) {
                    var self = this;
                    clearCountDOwnInterval();
                    countDownIntervalID = window.setInterval(function () {
                        // console.warn(self.working);
                        if (!self.needAutoCountDown) {clearCountDOwnInterval();}

                        if (self.mainNumber >= 0) {
                            self.mainNumber = self.mainNumber - 1;
                            if (self.mainNumber >= 0) {
                                self.main = self.timeToArray(self.mainNumber,self.mainNumberLength).join(':');
                            }
                        }

                        if (self.allTimeNumber >= 0 && self.mainNumber >= 0) {
                            self.allTimeNumber = self.allTimeNumber - 1;
                            if (self.allTimeNumber >=0) {
                                self.allTime = '剩余总时间 '+self.timeToArray(self.allTimeNumber, self.allTimeLength).join(':');
                            }
                        }

                    }, 1000);
                } else {
                    clearCountDOwnInterval();
                }
            },
            timeToArray: function(time, arrayLength) {
                var timeArray = [];
                var _time = Number(time);
                var numberToString = function(n) {
                    if (n<10) {return '0'+n.toString();}
                    return n.toString();
                };

                if (time > 3600) {
                    timeArray.push(numberToString(Math.floor(_time/3600)));
                    _time = time % 3600;
                }
                if (time > 60) {
                    timeArray.push(numberToString(Math.floor(_time/60)));
                    _time = time % 60;
                }

                timeArray.push(numberToString(_time));

                if (arrayLength) {
                    if (timeArray.length < arrayLength) {
                        var additionalArray = [];
                        for (var i=0,len=arrayLength-timeArray.length; i<len; i++) {
                            additionalArray.push('00');
                        }
                        timeArray = additionalArray.concat(timeArray);
                    }
                }

                return timeArray;
            }
        },
        ready: function() {
            this.renderData(this.data);
        },
        watch: {
            'data': {
                // 监控数据变化，数更新则自动更新界面显示内容
                handler: function(newDataVal,oldVal) {
                    console.warn('new data value');
                    this.renderData(newDataVal);
                    this.updateCountDownTime();
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
    Vue.component('countDownView', CountDownView);

    return CountDownView;
});

