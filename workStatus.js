/**
 * Created by huchunbo on 2017/2/16.
 */
define(['./js/manager/workStatusManager'], function (workStatus) {
    workStatus.add(
        'isWorking',
        function (data) {
            return Number(data.WorkStatus) > 0;
        }
    );

    workStatus.add(
        'isStandby',
        function (data) {
            return data.WorkStatus === '0' || data.WorkStatus === '';
        }
    );
});