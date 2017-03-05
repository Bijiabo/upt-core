/**
 * Created by huchunbo on 2016/12/27.
 */
define([], function(){
    var template = '\
                        <switch-cell \
                        v-if="item.type === \'switchCell\'"\
                        :current-value.sync="data[item.key]"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></switch-cell>\
                        \
                        <switch \
                        v-if="item.type === \'switch\'"\
                        :current-value.sync="data[item.key]"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></switch>\
                        \
                        <grid\
                        v-if="item.type === \'grid\'"\
                        :current-value.sync="data[item.key]"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></grid>\
                        \
                        <function-radio\
                        v-if="item.type === \'function-radio\'"\
                        :current-value.sync="data[item.key]"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></function-radio>\
                        \
                        <function-check\
                        v-if="item.type === \'function-check\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></function-check>\
                        \
                        <power-button\
                        v-if="item.type === \'powerButton\'"\
                        :current-value.sync="data[item.key]"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        >\
                        </power-button>\
                        \
                        <slider\
                        v-if="item.type === \'slider\'"\
                        :current-value.sync="data[item.key]"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        >\
                        </slider>\
                        \
                        <kd-mask-slider-view\
                        v-if="item.type === \'kd-mask-slider-view\'"\
                        :current-value.sync="data[item.key]"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        >\
                        </kd-mask-slider-view>\
                        \
                        <serial-pip-slider\
                        v-if="item.type === \'serialPipSlider\'"\
                        :current-value.sync="data[item.key]"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        >\
                        </serial-pip-slider>\
                        \
                        <product-image\
                        v-if="item.type === \'productImage\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        >\
                        </product-image>\
                        \
                        <info-view\
                        v-if="item.type === \'infoView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        >\
                        </info-view>\
                        \
                        <off-net-tip-view\
                        v-if="item.type === \'offnet_tipview\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></off-net-tip-view>\
                        \
                        <state-mask-view\
                        v-if="item.type === \'state-mask-view\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></state-mask-view>\
                        \
                        <navigation-bar\
                        v-if="item.type === \'navigationBar\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></navigation-bar>\
                        \
                        <work-done-view\
                        v-if="item.type === \'work-done-view\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></work-done-view>\
                        \
                        <separator-view\
                        v-if="item.type === \'separator-view\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></separator-view>\
                        \
                        <explain-view\
                        v-if="item.type === \'explainView\'"\
                        :index="index"\
                        :item-data="item"\
                        ></explain-view>\
                        \
                        <time-picker\
                        v-if="item.type === \'timePicker\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        auto-init="true"\
                        ></time-picker>\
                        \
                        <start-view\
                        v-if="item.type === \'startView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></start-view>\
                        \
                        <stop-view\
                        v-if="item.type === \'stopView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></stop-view>\
                        \
                        <count-down-view\
                        v-if="item.type === \'countDownView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></count-down-view>\
                        \
                        <kd-count-down-view\
                        v-if="item.type === \'KDCountDownView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></kd-count-down-view>\
                        \
                        <step-view\
                        v-if="item.type === \'stepView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></step-view>\
                        \
                        <cookbook-cell\
                        v-if="item.type === \'cookbookCell\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></cookbook-cell>\
                        \
                        <confirm-view \
                        v-if="item.type === \'confirmView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        :display="item.display"\
                        ></confirm-view>\
                        \
                        <tab-view\
                        v-if="item.type === \'tabView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></tab-view>\
                        \
                        <single-cell\
                        v-if="item.type === \'singleCell\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></single-cell>\
                        \
                        <power-set-view\
                        v-if="item.type === \'powerSetView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></power-set-view>\
                        \
                        <kd-info-view\
                        v-if="item.type === \'kdInfoView\'"\
                        :data.sync="data"\
                        :index="index"\
                        :item-data="item"\
                        ></kd-info-view>\
    ';

    return template;
});