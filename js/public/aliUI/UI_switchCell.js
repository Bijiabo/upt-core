/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public) {

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * 开关Cell
     * */
    var initSwitchCell = function(component) {
        var element = new DA.AlinkUI.Switch(ComponentName(component), {
            domhook : $('.switch_cell_'+component.$get('index')),
            datamodel: {
                title: component.$get('itemData.title'),
                subtitle: component.$get('itemData.subtitle'),
                key: component.$get('itemData.key'),
                value: component.$get('itemData.defaultValue'),
                map: component.$get('itemData.map') || {on: "1", off: "0"}
            },
            tpl:'switchItem',
            changed: function(){
                component.$set('currentValue', this.getValue());
                _setDeviceStatus(component);
            },
            onClickBefore: function () {
                var beforeAction = component.$get('itemData.beforeAction');
                if (beforeAction) {
                    beforeAction(component.$get('data'));
                }
            }
        });
    };
    var SwitchCell = Vue.extend({
        template: '<div \
                    class="switch_cell_container"\
                    :class="[show ? \'\' : \'hide\', itemData.marginTop ? \'margin-top-26\' : \'\' ]" :vv="value" :e="enable">\
                        <div class="switch_cell_{{index}}"></div>\
                        <div \
                        class="swtich_cell_interact_area"\
                        v-tap="tapSwitch"\
                        ></div>\
                    </div>',
        data: function() {
            return {
                _unwatch: false
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            tapSwitch: function () {
                if (this.itemData.beforeAction) {
                    var result = this.itemData.beforeAction(this.data);
                    if (!result) {return;}
                }

                if (this.currentValue == this.itemData.map.on) {
                    this.currentValue = this.itemData.map.off;
                } else {
                    this.currentValue = this.itemData.map.on;
                }

                _setDeviceStatus(this);
            }
        },
        ready: function() {
            initSwitchCell(this);

            if (this.itemData.customUpdate !== undefined) {
                var self = this;
                this._unwatch = this.$watch('data', function(newVal, oldVal){
                    self.itemData.customUpdate(newVal, self);
                }, {deep: true});
            }
        },
        beforeDestroy: function () {
            if (this._unwatch) {
                this._unwatch();
            }
        },
        watch: {
            currentValue: function(newVal, oldVal) {
                console.info(this.itemData.key + ': ' + oldVal + ' -> ' + newVal);
                DA.getUI(ComponentName(this)).setValue(newVal);
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
    Vue.component('switchCell', SwitchCell);


    return SwitchCell;
});