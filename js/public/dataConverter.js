/**
 * Created by huchunbo on 16/6/15.
 */
define(function(){

    var dataPackagerForAliSmart = function(data) {
        var _data = {}
        for (var key in data) {
            _data[key] = {value: data[key]};
        }
        return _data;
    };

    var convertDataForPlatform = function(data, platform) {
        switch (platform.toLowerCase()) {
            case 'alismart':
                return dataPackagerForAliSmart(data);

            default:
                return {};
        }
    };

    return {
        convertDataForPlatform: convertDataForPlatform
    };
});