/**
 * Created by huchunbo on 2016/9/30.
 * v2.0
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    var timeToHHMMSS = function (time) {
        var sec_num = parseInt(time, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    };

    var timeToMMSS = function (time) {
        var sec_num = parseInt(time, 10); // don't forget the second param
        var minutes = Math.floor(sec_num / 60);
        var seconds = sec_num - (minutes * 60);

        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return minutes+':'+seconds;
    };

    // 头部信息显示控件
    var KDInfoView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="kd-info-view flex-left units-gap top-gap">\
                            <div class="info-container">\
                                <div class="time-explain">{{displayData.timeExplain}}</div>\
                                <div class="time">\
                                    <span class="iconfont">{{{timeString}}}</span>\
                                </div>\
                                <div class="link-button status-container" v-if="displayData.isWorking">\
                                    {{displayData.currentWorkModeName}}详情\
                                    <span class=\"iconfont\">&#xe617;</span>\
                                </div>\
                                <div class="standby-status status-container" v-else>\
                                    待机\
                                </div>\
                            </div>\
                            <div class="product-image">\
                                <img alt="xcatliu" src="https://img.alicdn.com/imgextra/i3/2780294612/TB2x0k6eNXkpuFjy0FiXXbUfFXa_!!2780294612.png" width="120"/>\
                            </div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                displayData: {
                    time: -1,
                    timeFormatLength: 2,
                    timeExplain: '护肤完成倒计时',
                    currentWorkModeName: '',
                    isWorking: false
                }
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
            timeString: function () {
                var _timeString = '';
                if (this.displayData.time < 0) {
                    for (var i=0,len=this.displayData.timeFormatLength; i<len; i++) {
                        _timeString += '--';
                        if (i + 1 < len) {
                            _timeString += ':';
                        }
                    }
                } else {
                    if (this.displayData.timeFormatLength === 3) {
                        _timeString = timeToHHMMSS(this.displayData.time);
                    } else if (this.displayData.timeFormatLength === 2) {
                        _timeString = timeToMMSS(this.displayData.time);
                    } else {
                        _timeString = this.displayData.time;
                    }
                }

                return helperManager.fontCodeForNumber(_timeString);
            }
        },
        watch: {
            'data': {
                handler: function(val) {
                    this.displayData = this.itemData.displayData(val);
                },
                deep: true
            }
        }
    });
    Vue.component('kdInfoView', KDInfoView);

    return KDInfoView;
});

