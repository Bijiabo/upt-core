/**
 * Created by huchunbo on 16/9/26.
 */
var ComponentName = function(component) {
    return component.$get('itemData.type') + '_' + component.$get('itemData.key') + '_' + + component.$get('index');
};

var publicComputed = {
    show: function(_this) {
        if (_this.itemData === undefined) {return true;}
        if (_this.itemData.show === undefined) {return true;}

        var shouldShow = true;
        var type = _this.itemData.show.type;
        var showData = _this.itemData.show.condition;

        switch (type) {
            case '||':
                shouldShow = false;
                for(var i= 0,len=showData.length; i<len; i++) {

                    var showItem = showData[i];

                    if (showItem.equal !== undefined) {
                        if (_this.data[showItem.key] === showItem.equal) {shouldShow = true;}
                    }

                    if (showItem.in !== undefined) {
                        if (showItem.in.indexOf(_this.data[showItem.key]) >= 0) {shouldShow = true;}
                    }

                    if (showItem.not !== undefined) {
                        if (showItem.not.indexOf(_this.data[showItem.key]) < 0) {shouldShow = true;}
                    }
                }
                break;

            case '&&':
                shouldShow = true;
                for(var i= 0,len=showData.length; i<len; i++) {

                    var showItem = showData[i];

                    if (showItem.equal !== undefined) {
                        if (_this.data[showItem.key] != showItem.equal) {shouldShow = false;}
                    }

                    if (showItem.in !== undefined) {
                        if (showItem.in.indexOf(_this.data[showItem.key]) < 0 ) {shouldShow = false;}
                    }

                    if (showItem.not !== undefined) {
                        if (showItem.not.indexOf(_this.data[showItem.key]) >= 0) {shouldShow = false;}
                    }
                }
                break;

            default:
                break;
        }
        return shouldShow;
    },
    enable: function(_this) {
        if (_this.itemData === undefined) {return true;}
        if (_this.itemData.enable === undefined) {return true;}

        var type = _this.itemData.enable.type;
        var showData = _this.itemData.enable.condition;

        switch (type) {
            case '||':
                var shouldEnable = false;
                if (showData !== undefined) {
                    for(var i= 0,len=showData.length; i<len; i++) {
                        var showItem = showData[i];

                        if (showItem.equal !== undefined) {
                            if (_this.data[showItem.key] == showItem.equal) {shouldEnable = true;}
                        }

                        if (showItem.in !== undefined) {
                            if (showItem.in.indexOf(_this.data[showItem.key]) >= 0) {shouldEnable = true;}
                        }

                        if (showItem.not !== undefined) {
                            if (showItem.not.indexOf(_this.data[showItem.key]) < 0) {shouldEnable = true;}
                        }
                    }
                }

                var UIElement = DA.getUI(ComponentName(_this));
                if (UIElement) {
                    if (shouldEnable) {
                        UIElement.enabled();
                    } else {
                        UIElement.disabled();
                    }
                }

                return shouldEnable;

            case '&&':
                var shouldEnable = true;
                if (showData !== undefined) {
                    for(var i= 0,len=showData.length; i<len; i++) {
                        var showItem = showData[i];

                        if (showItem.equal !== undefined) {
                            if (_this.data[showItem.key] != showItem.equal) {shouldEnable = false;}
                        }

                        if (showItem.in !== undefined) {
                            if (showItem.in.indexOf(_this.data[showItem.key]) < 0 ) {shouldEnable = false;}
                        }

                        if (showItem.not !== undefined) {
                            if (showItem.not.indexOf(_this.data[showItem.key]) >= 0) {shouldEnable = false;}
                        }
                    }
                }

                var UIElement = DA.getUI(ComponentName(_this));
                if (UIElement) {
                    if (shouldEnable) {
                        UIElement.enabled();
                    } else {
                        UIElement.disabled();
                    }
                }

                return shouldEnable;

            default:
                break;
        }


    }
};

define(function(){
    return {
        ComponentName: ComponentName,
        publicComputed: publicComputed
    };
});