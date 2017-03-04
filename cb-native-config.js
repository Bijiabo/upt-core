;define(function(){

    //工作状态配置
    function isWorkingStatus(data){
        data = JSON.parse(data);
        var status = 0;
        //0代表设备未工作，1代表云食谱工作中，2代表本地食谱工作中
        if (data.WorkMode.value == '1') {
            // 云菜谱
            status = 1;
        } else {
            if (data.WorkStatus.value == '0') {
                // 待机
                status = 0;
            } else {
                // 本地菜谱
                status = 2;
            }
        }

        return JSON.stringify({
            code: 1000,
            ret: {
                status: status
            }
        });
    }
    //跳转到详情页配置
    function goWorkingDetail(data){
        // data = JSON.parse(data);

        return JSON.stringify({
            code : 1000,
            ret : {
                url : '/work/app.html'
            }
        });
    }
    //启动食谱前配置
    function startWorkingBefore(data){
        data = JSON.parse(data);
        var errorText="";
        var cmd = 1;
        var ec = data.ErrorCode.value;
        var KG_Lock = data.WorkStatus.value;

        if(ec == '1'){
            errorText = '炉门开提醒';
            cmd = 0;
        }else if (ec == '2'){
            errorText = '微波异常';
            cmd = 0;
        }else if (ec == '3'){
            errorText = '温度感应异常';
            cmd = 0;
        }

        if(KG_Lock == '4'){
            errorText = '设备处于童锁状态，需要先解锁哦';
            cmd = 0;
        }
        return JSON.stringify({
            code: 1000,
            ret: {
                msg: "",
                cmd: 1
            }
        });
    }
    return {
        "isWorkingStatus":isWorkingStatus,
        "goWorkingDetail":goWorkingDetail,
        "startWorkingBefore":startWorkingBefore
    };
});