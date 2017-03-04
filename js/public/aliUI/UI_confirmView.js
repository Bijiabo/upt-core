/**
 * Created by huchunbo on 2016/9/30.
 * v2.0
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * 开关按钮
     * 未确定添加方法：
     * itemData.forceDisplay
     * itemData.forceNotDisplay
     * */
    var initConfirmView = function(component) {

        var buttonConfig = [
            {
                text: component.$get('itemData.confirm.text'),
                click:function(){
                    var itemData = component.$get('itemData');
                    if (itemData.confirm.customTapFunction) {
                        // 执行自定义函数
                        itemData.confirm.customTapFunction(component.$get('data'), component);
                    } else {
                        // 解析 data 对象配置
                        var sendData = itemData.confirm.data;
                        if (sendData && sendData.length>0) {
                            var command = {};
                            for(var i=0,len=sendData.length; i<len; i++) {
                                var dataItem = sendData[i];
                                command[dataItem.key] = dataItem.value;
                            }

                            _setDeviceStatus(false, command);
                        }
                    }

                    component.$set('display.value', false);
                    ConfirmUI.closeModal();//或者 DA.getUI('modal1').openModal();
                    component.afterClose();
                }
            }];
        if (component.$get('itemData.cancel')) {
            buttonConfig.unshift({
                text: component.$get('itemData.cancel.text'),
                click:function(){
                    var itemData = component.$get('itemData');
                    var sendData = itemData.cancel.data;
                    if (sendData && sendData.length>0) {
                        var command = {};
                        for(var i=0,len=sendData.length; i<len; i++) {
                            var dataItem = sendData[i];
                            command[dataItem.key] = dataItem.value;
                        }

                        _setDeviceStatus(false, command);
                    }

                    component.$set('display.value', false);
                    ConfirmUI.closeModal();//或者 DA.getUI('modal1').openModal();

                    component.afterClose();
                }
            });
        }


        var ConfirmUI = new DA.AlinkUI.Modal(ComponentName(component), {
            domhook : $('.confirm-view_'+component.$get('index')),
            datamodel: {
                title: component.$get('itemData.title'),
                text: component.$get('itemData.text'),//text可省略
                button: buttonConfig
            }
        });
    };
    var ConfirmView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :vv="value">\
                        <div class="ui-modal confirm-view_{{index}}"></div>\
                    </div>',
        data: function() {
            return {
                show: true
            };
        },
        props: ['index', 'itemData', 'data', 'display'],
        methods: {
            afterClose: function() {
                if (this.itemData.afterClose) {
                    this.itemData.afterClose(this.data, this);
                }
            }
        },
        ready: function() {
            initConfirmView(this);
        },
        watch: {
            display: {
                handler: function(newVal, oldVal) {
                    if ((newVal === true || newVal.value === true) && this.show) {
                        DA.getUI(ComponentName(this)).openModal();
                        if(this.itemData.didOpenModal) {
                            this.itemData.didOpenModal(this);
                        }
                    } else {
                        DA.getUI(ComponentName(this)).closeModal();
                        if(this.itemData.didCloseModal) {
                            this.itemData.didCloseModal(this);
                        }
                    }
                },
                deep: true
            },
            data: {
                handler: function (val) {
                    if (this.itemData.needDisplay) {
                        if (this.itemData.displayData) {
                            var displayData = this.itemData.displayData(val);
                            // console.log(displayData);
                            DA.getUI(ComponentName(this)).setValue(displayData.title, displayData.text);
                        }
                        this.$set('display.value',this.itemData.needDisplay(val, this));


                    }
                },
                deep: true
            }
        }
    });
    Vue.component('confirm-view', ConfirmView);

    return ConfirmView;
});

