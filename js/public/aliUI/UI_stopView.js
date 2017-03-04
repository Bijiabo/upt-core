/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public', './UI_timePicker', './UI_confirmView'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部信息显示控件
    var StopView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="start-view bottom-button-group">\
                            <div v-if="minorButton"\
                            class="minor-button ui-important-orange-btn"\
                            v-tap="tapMinorButton"\
                            >{{minorButton.title}}</div>\
                            \
                            <div v-if="majorButton"\
                            class="major-button ui-important-green-btn"\
                            v-tap="tapMajorButton"\
                            >{{majorButtonText}}</div>\
                        </div>\
                        \
                        <confirm-view \
                        :display="displayConfirm" \
                        index="stop-view" \
                        :item-data="confirm"\
                        ></confirm-view>\
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
                confirm: {
                    title: '取消工作',
                    text: '请确认是否取消工作',
                    confirm: {
                        text: '确定',
                        data: [
                            {
                                key: 'KG_Cancel',
                                value: '1'
                            }
                        ]
                    },
                    cancel: {
                        text: '取消'
                    }
                },
                displayConfirm: {
                    value: false
                }
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            tapMajorButton: function () {
                // 点击主按钮
                console.log('tapMajorButton');

                if (this.majorButton.customTapFunction) {
                    if (!this.majorButton.customTapFunction(this.data, this)) {
                        return;
                    }
                }

                // 二次确认弹窗
                if (this.majorButton.confirm) {
                    this.displayConfirm.value = true;
                    return;
                }

                // 获取要下发的命令
                var isCommandFunction = Object.prototype.toString.call( this.majorButton.command ) === '[object Function]';
                var command = {};
                var commandConfig = isCommandFunction ? this.majorButton.command(this.data) : this.majorButton.command;
                if (commandConfig) {
                    for(var i=0,len=commandConfig.length; i<len; i++) {
                        var currentItem = commandConfig[i];
                        command[currentItem.key] = currentItem.value;
                    }
                }
                _setDeviceStatus(false, command);
            },
            tapMinorButton: function () {
                // 点击次要按钮
                console.log('tapMinorButton');

                // 二次确认弹窗
                if (this.minorButton.confirm) {
                    this.displayConfirm.value = true;
                    return;
                }

                // 获取要下发的命令
                var command = {};
                var commandConfig = this.minorButton.command;
                if (commandConfig) {
                    for(var i=0,len=commandConfig.length; i<len; i++) {
                        var currentItem = commandConfig[i];
                        command[currentItem.key] = currentItem.value;
                    }
                }
                _setDeviceStatus(false, command);
            },
            updateConfig: function() {
                var currentConfig = this.itemData.config(this.data);
                this.majorButton = undefined;
                this.minorButton = undefined;
                if (currentConfig.majorButton) {
                    this.majorButton = currentConfig.majorButton;
                    if (currentConfig.majorButton.confirm) {
                        this.confirm = currentConfig.majorButton.confirm;
                    }
                }
                if (currentConfig.minorButton) {
                    this.minorButton = currentConfig.minorButton;
                    if (currentConfig.minorButton.confirm) {
                        this.confirm = currentConfig.minorButton.confirm;
                    }
                }

                // 更新按钮文字
                var majorButtonTitleIsFunction = Object.prototype.toString.call( currentConfig.majorButton.title ) === '[object Function]';
                if ( majorButtonTitleIsFunction ) {
                    this.majorButtonText = currentConfig.majorButton.title(this.data);
                } else {
                    this.majorButtonText = currentConfig.majorButton.title ;
                }

            }
        },
        ready: function() {
            this.updateConfig();
        },
        watch: {
            'data': {
                handler: function(newDataVal, oldVal) {
                    // var majorButtonTitleIsFunction = Object.prototype.toString.call( this.itemData.majorButton.title ) === '[object Function]';
                    // if ( majorButtonTitleIsFunction ) {
                    //     this.majorButtonText = this.itemData.majorButton.title(newDataVal);
                    // } else {
                    //     this.majorButtonText = this.itemData.majorButton.title ;
                    // }
                    this.updateConfig();
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
    Vue.component('stopView', StopView);

    return StopView;
});

