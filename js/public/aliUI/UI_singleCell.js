/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public) {

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * Cell
     * */
    var initSingleCell = function(component) {

        var itemListConfig = {
            domhook : $('.single_cell_'+component.$get('index')),
            datamodel: {
                map: [{
                    title: component.$get('itemData.title'),
                    after: '',
                    rightIcon: "&#xe617;"
                }]
            },
            onClickBefore:function(){
                return true;
            },
            onClickAfter:function(){
                return true;
            },
            onItemClick:function(targetItem,e){
                console.log('onItemClick');
                var onTapFunction = component.$get('itemData.onTap');
                if (onTapFunction !== undefined) {
                    console.log('xxx');
                    onTapFunction(component.$get('data'), component);
                }
            }
        };

        // 判断右侧图标显示
        var rightIcon = component.$get('itemData.rightIcon');
        switch (Object.prototype.toString.call(rightIcon)) {
            case '[object String]':
                itemListConfig.datamodel.map[0].rightIcon = rightIcon;
                break;
            case '[object Function]':
                itemListConfig.datamodel.map[0].rightIcon = rightIcon(component.$get('data'));
                break;
            default:
                break;
        }

        var itemList = new DA.AlinkUI.ItemList(ComponentName(component), itemListConfig);
        return itemList;
    };
    var SingleCell = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\', itemData.marginTop ? \'margin-top-26\' : \'\' ]" :vv="value" :e="enable">\
                        <div class="single_cell_{{index}}"></div>\
                    </div>',
        data: function() {
            return {
                componentInstance: undefined
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            updateView: function () {

                var updateConfig = {Index: 0};

                if (this.itemData.after) {
                    switch (Object.prototype.toString.call(this.itemData.after)) {
                        case '[object String]':
                            updateConfig.after =  this.itemData.after;
                            break;
                        case '[object Function]':
                            updateConfig.after = this.itemData.after(this.data);
                            break;
                        default:
                            break;
                    }
                }

                if (this.itemData.rightIcon) {
                    if (Object.prototype.toString.call(this.itemData.rightIcon) === '[object Function]') {
                        updateConfig.rightIcon = this.itemData.rightIcon(this.data);
                    }
                }

                DA.getUI(ComponentName(this)).updateUI(updateConfig);

            }
        },
        ready: function() {
            initSingleCell(this);
            this.updateView();
        },
        watch: {
            data: {
                handler: function() {
                    this.updateView();
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
    Vue.component('singleCell', SingleCell);


    return SingleCell;
});