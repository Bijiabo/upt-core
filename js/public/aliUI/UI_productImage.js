/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部显示控件
    var ProductImage = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="product-img">\
                            <div class="product-mask"></div>\
                            <img :src="imageUrl" alt="" :class="itemData.imageUrl ? \'full\' : \'\'">\
                        </div>\
                    </div>',
        data: function() {
            return {
                imageUrl: ''
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {},
        ready: function() {

            var self = this;
            if (self.itemData.imageUrl === undefined) {
                DA.getDeviceInfo({
                    uuid: DA.uuid
                }, function(d) {
                    if (d.result.msg === "success") {
                        // success done;
                        self.imageUrl = d.result.data.image;
                    } else {
                        // 可省略
                        // failure done;
                    }
                });
            } else {
                if (Object.prototype.toString.call(this.itemData.imageUrl) === '[object Function]') {
                    this.$watch('data', function (newVal, oldVal) {
                        this.imageUrl = this.itemData.imageUrl(newVal);
                    }, {deep: true});
                } else {
                    this.imageUrl = this.itemData.imageUrl;
                }

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
    Vue.component('productImage', ProductImage);

    return ProductImage;
});

