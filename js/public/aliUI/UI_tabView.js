/**
 * Created by huchunbo on 2016/9/30.
 */
// 组件配置数据
/***
 viewData:
 [
    {
        title: 'tab name',
        data: [
            {
                    type: 'grid',
                    key: 'WorkMode',
                    gridNum:'4',
                    defaultValue:'0',
                    title:'其他',
                    linkToPage: './setting/app.html',
                    map:[
                        {
                            txt:'消毒',
                            value:'21'
                        },
                        {
                            txt:'保温',
                            value:'13'
                        }
                    ],
                    show: _workModeShowConfig,
                    enable: _workModeEnableConfig
            }
        ]
    }
 ]
 ***/

define(['./../vue', './public'], function(Vue, _public){
    var publicComputed = _public.publicComputed;

    var TabView = Vue.extend({
        template: '<div :e="enable" :class="[show ? \'\' : \'hide\' ]" debug="{{show | json}}">\
                        <div class="ui-tabs-title">\
                            <template v-for="(tabIndex, item) in itemData.map" track-by="$index">\
                                <a class="ui-tab-title" :class="{\'active\': tabIndex === activeIndex}" @click="setActive(tabIndex, item.value)">\
                                {{item.txt}}\
                                </a>\
                            </template>\
                        </div>\
                    </div>',
        data: function() {
            return {
                activeIndex: 0
            };
        },
        props: ['index', 'itemData', 'data'],
        methods: {
            setActive: function (targetIndex, value) {
                this.activeIndex = targetIndex;
                var key = 'data["'+this.itemData.key+'"]';
                this.$set(key, value);
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
        ready: function() {
            this.$set('data.ModeGroup', this.activeIndex);
            var key = 'data["'+this.itemData.key+'"]';
            this.$set(key, this.itemData.map[this.activeIndex].value);
        }
    });
    Vue.component('tabView', TabView);

    return TabView;
});

