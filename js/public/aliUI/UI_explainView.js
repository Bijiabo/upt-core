/**
 * Created by huchunbo on 2016/9/30.
 * v2.0
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部信息显示控件
    var ExplainView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="explain-view">\
                            <div class="title">{{itemData.title}}</div>\
                            <div class="content" v-if="itemData.content">\
                            <template v-if="descriptionIsArray">\
                                <template v-for="item in itemData.content" track-by="$index">\
                                    <p>{{{item}}}</p>\
                                </template>\
                            </template>\
                            <template v-else>\
                                {{{itemData.content}}}\
                            </template>\
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
            descriptionIsArray: function () {
                return /Array/.test(this.itemData.content.constructor);
            }
        }
    });
    Vue.component('explainView', ExplainView);

    return ExplainView;
});

