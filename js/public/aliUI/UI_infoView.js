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
    var InfoView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div \
                        class="status J-status"\
                        v-tap="directToUrl"\
                        >\
                            <div class="status-up clearfix">\
                                <div class="clock">\
                                    <template v-for="(_index, item) in bigContent" track-by="$index">\
                                        <div class="colon" v-if="_index!==0" ><i>:</i></div>\
                                        <div class="clock-minute">\
                                            <i class="minute">{{item}}</i>\
                                        </div>\
                                    </template>\
                                </div>\
                                <span class="clock-left">\
                                    {{badgeTitle}}\
                                </span>\
                                <span class="right-go iconfont" v-if="director">\
                                    \
                                </span>\
                            </div>\
                            <div class="status-down clearfix">\
                                <div class="status-value-target">\
                                    <template v-for="(_index, state) in status">\
                                        <div class="bottom-temp" v-if="_index!==0">{{state}}</div>\
                                        <div class="top-temp" v-else>{{state}}</div>\
                                    </template>\
                                    {{{description}}}\
                                </div>\
                                <div class="status-value status-value-step"></div>\
                            </div>\
                        </div>\
                        <div style="clear: both"></div>\
                    </div>',
        data: function() {
            return {
                description: "",
                bigContent: ['--','--','--'],
                bigNumber: -1,
                badgeTitle: "---",
                status: [],
                director: false,
                url: '',
                working: false,
                needAutoCountDown: false,
                params: {}
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            updateDisplayData: function() {
                var displayData = this.itemData.displayData(this.data);

                // 设定默认待机状态
                var defaultBigNumber = [];
                for (var i=0,len=displayData.bigNumberLength; i<len; i++) {
                    defaultBigNumber.push('--');
                }

                this.bigNumber = displayData.bigNumber;
                this.bigContent = displayData.bigNumber < 0 ? defaultBigNumber : this.timeToArray(displayData.bigNumber,displayData.bigNumberLength);

                this.badgeTitle = displayData.badgeTitle;
                this.status = displayData.status;
                this.director = displayData.director;
                this.url = displayData.url;
                this.params = displayData.params;

                this.working = displayData.working;
                this.needAutoCountDown = displayData.needAutoCountDown;
            },
            directToUrl: function () {
                if (this.url !== undefined && this.url !== '' && this.director) {
                    DA.loadPage(this.url, this.params);
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
            },
            updateCountDownTime: function() {
                if (this.needAutoCountDown) {
                    var self = this;
                    clearCountDOwnInterval();
                    countDownIntervalID = window.setInterval(function () {
                        if (!self.needAutoCountDown) {clearCountDOwnInterval();}

                        if (self.bigNumber > 0) {
                            self.bigNumber = self.bigNumber - 1;
                            self.bigContent = self.timeToArray(self.bigNumber,3);
                        }

                    }, 1000);
                } else {
                    clearCountDOwnInterval();
                }
            }
        },
        ready: function() {
            this.updateDisplayData();
        },
        watch: {
            'data': {
                handler: function(newVal, oldVal){
                    this.updateDisplayData();
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
    Vue.component('infoView', InfoView);

    return InfoView;
});

