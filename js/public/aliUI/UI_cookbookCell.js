/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public', 'cookbook'+(window.____isTestEnv ? '_test':'')], function(Vue, _public, cookbook) {

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    /*
     * 开关Cell
     * */
    var initCookbookCell = function(component) {
        var cloudCook = new DA.AlinkUI.ItemList('cloudCook', {
            domhook: $('.cloudcook_cell_'+component.$get('index')),
            datamodel: {
                //uiTitle:'加热模式',//如果不需要title，可省略
                map: [{
                    title: '云食谱',
                    subtitle: "",
                    after: '',
                    leftIcon: "&#xe616;",
                    rightIcon: "&#xe617;"
                }]
            },
            onClickBefore: function() {
                return true;
            },
            onClickAfter: function() {
                return true;
            },
            onItemClick: function(targetItem, e) {
                cookbook.goCookbook();
            }
        });
        var myCook = new DA.AlinkUI.ItemList('nativeCook', {
            domhook: $('.nativecook_cell_'+component.$get('index')),
            datamodel: {
                //uiTitle:'加热模式',//如果不需要title，可省略
                map: [{
                    title: '我的食谱',
                    subtitle: "",
                    after: '',
                    leftIcon: "&#xe6dd;",
                    rightIcon: "&#xe617;"
                }]
            },
            onClickBefore: function() {
                return true;
            },
            onClickAfter: function() {
                return true;
            },
            onItemClick: function(targetItem, e) {
                cookbook.goMyCookbook();
            }
        });
    };
    var CookbookCell = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\', itemData.marginTop ? \'margin-top-26\' : \'\' ]" :vv="value" :e="enable">\
                        <div class="cloudcook_cell_{{index}}"></div>\
                        <div class="nativecook_cell_{{index}}"></div>\
                    </div>',
        data: function() {
            return {};
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {},
        ready: function() {
            initCookbookCell(this);
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
    Vue.component('cookbookCell', CookbookCell);


    return CookbookCell;
});