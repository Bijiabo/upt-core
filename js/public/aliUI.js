/**
 * Created by huchunbo on 16/6/4.
 */

define([
    './aliUI/UI_switch',
    './aliUI/UI_switchCell',
    './aliUI/UI_grid',
    './aliUI/UI_powerButton',
    './aliUI/UI_slider',
    './aliUI/UI_functionCheck',
    './aliUI/UI_functionRadio',
    './aliUI/UI_productImage',
    './aliUI/UI_infoView',
    './aliUI/UI_offNetTipView',
    './aliUI/UI_separatorView',
    './aliUI/UI_explainView',
    './aliUI/UI_timePicker',
    './aliUI/UI_startView',
    './aliUI/UI_stopView',
    './aliUI/UI_countDownView',
    './aliUI/UI_stepView',
    './aliUI/UI_confirmView',
    './aliUI/UI_cookbookCell',
    './aliUI/UI_stateMaskView',
    './aliUI/UI_workDoneView',
    './aliUI/UI_navigationBar',
    './aliUI/UI_tabView',
    './aliUI/UI_singleCell',
    './aliUI/UI_powerSetView',
    './aliUI/UI_KDInfoView',
    './aliUI/UI_KDCountDownView',
    './aliUI/UI_KDMaskSliderView'
], function(){

    var exportObject = {
        setDeviceStatusMethod: function () {
            
        }
    };

    var _setDeviceStatus = function(component) {
        var key = component.$get('itemData.key'),
            value = component.$get('currentValue');
        var targetData = {};
        targetData[key] = value;

        exportObject.setDeviceStatusMethod(targetData);
    };

    return exportObject;
});