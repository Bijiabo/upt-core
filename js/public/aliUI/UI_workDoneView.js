/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){
    var publicComputed = _public.publicComputed;

    var WorkDoneView = Vue.extend({
        template: '<div :e="enable" :class="[show ? \'\' : \'hide\' ]" debug="{{show | json}}">\
                        <div :class="workDoneClass"></div>\
                    </div>',
        data: function() {
            return {
                workDoneClass: 'work-done'
            };
        },
        props: ['index', 'itemData', 'data'],
        watch: {
            data: {
                handler: function() {
                    console.warn('000');
                    console.log(this.itemData.backgroundImage);
                    if (this.itemData.backgroundImageClass) {
                        this.workDoneClass = this.itemData.backgroundImageClass(this.data);
                    }
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
    Vue.component('workDoneView', WorkDoneView);

    return WorkDoneView;
});

