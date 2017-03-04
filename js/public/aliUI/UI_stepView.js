/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public', 'cookbook'+(window.____isTestEnv ? '_test':'')], function(Vue, _public, cookbook){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    function IntToChinese(num){
        var src = num.toString().split(""),
            units = ["十","百","千","万"],
            curUnits = [],
            tmp = [],   //保存转换的汉字
            ret = [],
            i = 0,
            len = src.length;

        for(; i<len; ++i){
            tmp.push("零一二三四五六七八九".charAt(src[i]));
            //用字符串的charAt()方法，将阿拉伯数字对应的汉字push进数组
        }

        curUnits = units.splice(0,len-1).reverse(); //当前需要用到的单位

        function joint(len){    //从十位数向高位拼接汉字与单位
            if(len>0){
                ret.push(tmp[len-1]);
                if(len>1){       //确保最高位之前没有单位
                    ret.push(curUnits[len-1-1]);    //curUints.length = len-1;
                }
                --len;
                arguments.callee(len);      //递归
            }
            return ret;     //  ret = ["零","十","三","百","零","千","二","万","一"];
        }

        return joint(len).reverse().join("").replace(/零+[千,百,十]/g,"零").replace(/零{1,3}/g,"零").replace(/零+$/g,"");
        //反转ret后,调用join()方法转化为字符串,去掉多余的零
    }

    // 头部信息显示控件
    var StepView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="step-view" v-tap.stop="displayTip(-1)">\
                            <div class="explain-cell" v-if="explain && explain!= \'\'">{{explain}}</div>\
                            <div class="step-list">\
                                <div class="step-list-item description" v-if="descriptions.length>0">\
                                    <div class="step-list-item-icon">\
                                        <i class="iconfont">&#xe605;</i>\
                                    </div>\
                                <span>步骤说明 : {{descriptions[stepNow]}}</span>\
                                </div>\
                                <template v-for="(_index, item) in list" track-by="$index">\
                                    <div class="step-list-item" :class="{\'active\': _index==stepNow, \'done\': _index < stepNow}">\
                                        <div class="step-list-item-icon">\
                                            <i class="iconfont" v-if="_index < stepNow">&#xe604;</i>\
                                            <i class="iconfont" v-if="_index===stepNow">&#xe641;</i>\
                                            <i class="iconfont" v-if="_index > stepNow">&#xe623;</i>\
                                        </div>\
                                        <span>{{item}}</span>\
                                        <span \
                                        v-if="descriptions.length>0 && descriptions[_index]"\
                                        class="iconfont step-list-item-info" \
                                        v-tap.stop="displayTip(_index)"\
                                        content="{{descriptions[_index]}}"\
                                        :class="{ \'active\': _index==activeStepInfoIndex }"\
                                        >&#xe605;</span>\
                                    </div>\
                                </template>\
                            </div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                explain: '',
                list:[],
                stepNow:0,
                didLoadCloudMenuData: false,
                cookbookInfo: {},
                descriptions: [],
                activeStepInfoIndex: -1,
                cloudMenuHasAppointment: false,
                cloudMenuAdditionalStep: []
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            renderData: function(newData) {
                var displayData = this.itemData.displayData(newData);
                this.stepNow = displayData.stepNow;
                this.cloudMenuHasAppointment = displayData.cloudMenuHasAppointment;
                this.cloudMenuAdditionalStep = displayData.cloudMenuAdditionalStep;
                this.explain = displayData.explain;

                if (displayData.isCloudMenu) {
                    if (!this.didLoadCloudMenuData) {
                        this.updateCookbookData();
                        // this.didLoadCloudMenuData = true;
                    }
                } else {
                    this.list = displayData.list;
                }
            },
            updateCookbookData: function() {
                var self = this;
                var appId = this.data.WF.extra.WF_ID;

                DA.appstore_getAppDetailedInfo({
                    app_id: appId
                }, function(res) {
                    if (res.result.code == 1000) {
                        self.cookbookInfo = res.result.data;

                        var steps = self.cookbookInfo.control_steps;
                        self.list.splice(0, self.list.length);
                        self.descriptions.splice(0, self.descriptions.length);

                        if (self.cloudMenuHasAppointment) { // 云食谱包含预约
                            self.list.push('第一步 : 预约');
                            self.descriptions.push('云食谱预约中...');
                        }

                        for (var key in steps) {
                            var item = steps[key];
                            self.list.push('第' + IntToChinese(Number(key)+(self.cloudMenuHasAppointment?1:0)) + '步' + (item.name === '' ? '' : (' : '+item.name)));
                            self.descriptions.push(item.description.toString());
                        }

                        // console.warn('xxxx11');
                        // console.warn(self.list.length);
                        // console.warn(self.data.WF.extra.StepNum);
                        // console.warn(self.itemData.cloudMenuStepAppendItem);
                        if (self.list.length < Number(self.data.WF.extra.StepNum) && self.itemData.cloudMenuStepAppendItem) {
                            console.warn('xxxx12');
                            for(var i=0,len=(Number(self.data.WF.extra.StepNum)-self.list.length); i<len; i++) {
                                self.list.push(self.itemData.cloudMenuStepAppendItem.title);
                                self.descriptions.push(self.itemData.cloudMenuStepAppendItem.description);
                            }
                        }

                        if (self.cloudMenuAdditionalStep.length > 0) {
                            self.list = self.list.concat(self.cloudMenuAdditionalStep);
                            console.warn(self.list);
                            console.warn(self.cloudMenuAdditionalStep);
                        }
                    }
                });
                /*
                DA.appstore_getAppControlInstructions({
                    app_id: appId,
                    uuid: DA.uuid
                }, function(res) {
                    if (res.result.code === '1000') {
                        this.cookbookControlInstructions = res.result.data;
                        console.warn(JSON.stringify(this.cookbookControlInstructions, null, '\t'));
                    }
                });
                */
            },
            displayTip: function(index) {
                if (this.activeStepInfoIndex === index) {
                    this.activeStepInfoIndex = -1;
                } else {
                    this.activeStepInfoIndex = index;
                }
            }
        },
        ready: function() {
            this.renderData(this.data);
        },
        watch: {
            'data': {
                // 监控数据变化，数更新则自动更新界面显示内容
                handler: function(newDataVal,oldVal) {
                    this.renderData(newDataVal);
                },
                deep: true
            },
            'list' : {
                handler: function (newVal, oldVal) {
                    // this.debug = newVal;
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
    Vue.component('stepView', StepView);

    return StepView;
});

