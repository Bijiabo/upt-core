/**
 * Created by huchunbo on 16/6/4.
 */
requirejs(['./../upt.js', './viewConfig'], function(upt, viewConfig) {
    var config = {
        platform: 'aliSmart',
        debugView: false,
        sendAllData: false,
        customFont: true,
        viewData: viewConfig,
        navigationBar: {

        }
    };

    upt.init(config);
});