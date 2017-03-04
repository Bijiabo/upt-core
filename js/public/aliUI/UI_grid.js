/**
 * Created by huchunbo on 2016/9/30.
 * Grid v2.0
 */

define(['./../vue', './public', './../generalFunction'], function(Vue, _public, generalFunction) {
    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * 网格选择组件
     * */
    var initGrid = function(component) {
        var grid = new DA.AlinkUI.Grid(ComponentName(component),{
            domhook : $('.grid_'+component.$get('index')),
            datamodel:{
                key:component.$get('itemData.key'),
                gridNum:component.$get('itemData.gridNum') || 4,
                value:component.$get('currentValue'),
                uiTitle: component.$get('itemData.title') || '',
                map:component.$get('itemData.map') || []
            },
            onClickBefore: function (item, index) {
                // TODO: 添加跳转判断条件
                return true;
            },
            onClickAfter: function () {

            },
            onItemClick: function (item, index) {
                var customTapFunction = component.$get('itemData.customTapFunction');
                if (component.customTapFunction(index, item)) {
                    return;
                }

                var linkToPage = component.$get('itemData.linkToPage');
                if (linkToPage) {
                    var urlData = {};
                    urlData[component.$get('itemData.key')] = this.getValue();
                    DA.loadPage(linkToPage, urlData);
                }
            },
            changed:function(){
                if (component.$get('itemData.customTapFunction')) { return; }

                if (component.itemData.sync === false) {
                    component.$set('data._'+component.itemData.key, this.getValue());
                    return;
                }

                var linkToPage = component.$get('itemData.linkToPage');
                component.$set('currentValue', this.getValue());
                if (linkToPage === undefined) {
                    _setDeviceStatus(component);
                }
            }
        })
    };

    var Grid = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :index="index" :uv="updateValue"  :e="enable">\
                        <div class="grid_{{index}}"></div>\
                    </div>',
        data: function() {
            return {
                show: true,
                enable: true
            };
        },
        props: ['index', 'itemData', 'data', 'currentValue'],
        init: function() {
        },
        ready: function() {
            initGrid(this);
            if (this.itemData.sync === false) {
                this.$set('data._' + this.itemData.key, this.itemData.defaultValue);
                DA.getUI(ComponentName(this)).setValue(this.itemData.defaultValue);
            }
        },
        methods: {
            customTapFunction: function (index, item) {
                if (this.itemData.customTapFunction) {
                    return this.itemData.customTapFunction(index, item, this.data, this);
                }
                return false;
            },
            afterShow: function () {
                var newVal = this.currentValue;
                var _componentName = ComponentName(this);
                setTimeout(function () {
                    DA.getUI(_componentName).setValue(newVal);
                });
            },
            afterEnable: function () {
                var _componentName = ComponentName(this);
                DA.getUI(_componentName).enabled();
            },
            afterDisable: function () {
                var _componentName = ComponentName(this);
                DA.getUI(_componentName).disabled();
            }
        },
        watch: {
            currentValue: function(newVal, oldVal) {
                if (this.itemData.sync === false) {
                    return;
                }
                DA.getUI(ComponentName(this)).setValue(newVal);
            },
            data: {
                handler: function (val) {
                    // set show and enable
                    generalFunction.show(this);
                    generalFunction.enable(this);

                    if (this.itemData.enable) {
                        this.enable = this.itemData.enable(this.data);
                    }
                },
                deep: true
            }
        },
        computed: {
            updateValue: function() {
                var self = this;
                var updateValueConfig = this.itemData.updateValue;
                var didUpdate = false;
                if (updateValueConfig === undefined) {return false;}

                for(var key in updateValueConfig) {
                    var shouldUpdate = true;
                    var currentData = updateValueConfig[key];

                    for(var i= 0,len=currentData.length; i<len; i++) {
                        var showItem = currentData[i];

                        if (showItem.equal !== undefined) {
                            if (self.data[showItem.key] != showItem.equal) {shouldUpdate = false;}
                        }

                        if (showItem.in !== undefined) {
                            if (!showItem.in.includes(self.data[showItem.key])) {shouldUpdate = false;}
                        }
                    }

                    if (shouldUpdate) {
                        self.data[self.itemData.key] = key;

                        didUpdate = shouldUpdate;
                    }
                }

                return didUpdate;
            }
        }
    });
    Vue.component('grid', Grid);


    return Grid;
});