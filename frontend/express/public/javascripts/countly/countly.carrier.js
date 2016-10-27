(function (countlyCarrier, $, undefined) {

    //Private Properties
    var _periodObj = {},
        _carrierDb = {},
        _carriers = [],
        _activeAppKey = 0,
        _initialized = false,
        _period = null;
        _carrierCodeMap = {"46000": "中国移动(GSM)", "46001": "中国联通(GSM)", "46002": "中国移动(TD-S)", "46003": "中国电信(CDMA)", "46005":"中国电信(CDMA)", "46006":"中国联通(WCDMA)", "46007":"中国移动(TD-S)", "46011":"中国电信(FDD-LTE)","460 11":"中国电信(FDD-LTE)"}

    //Public Methods
    countlyCarrier.initialize = function () {
        if (_initialized && _period == countlyCommon.getPeriodForAjax() && _activeAppKey == countlyCommon.ACTIVE_APP_KEY) {
            return countlyCarrier.refresh();
        }

        _period = countlyCommon.getPeriodForAjax();

        if (!countlyCommon.DEBUG) {
            _activeAppKey = countlyCommon.ACTIVE_APP_KEY;
            _initialized = true;

            return $.ajax({
                type:"GET",
                url:countlyCommon.API_PARTS.data.r,
                data:{
                    "api_key":countlyGlobal.member.api_key,
                    "app_id":countlyCommon.ACTIVE_APP_ID,
                    "method":"carriers",
                    "period":_period
                },
                dataType:"jsonp",
                success:function (json) {
                    _carrierDb = json;
                    setMeta();
                }
            });
        } else {
            _carrierDb = {"2012":{}};
            return true;
        }
    };

    countlyCarrier.refresh = function () {
        _periodObj = countlyCommon.periodObj;

        if (!countlyCommon.DEBUG) {

            if (_activeAppKey != countlyCommon.ACTIVE_APP_KEY) {
                _activeAppKey = countlyCommon.ACTIVE_APP_KEY;
                return countlyCarrier.initialize();
            }

            return $.ajax({
                type:"GET",
                url:countlyCommon.API_PARTS.data.r,
                data:{
                    "api_key":countlyGlobal.member.api_key,
                    "app_id":countlyCommon.ACTIVE_APP_ID,
                    "method":"carriers",
                    "action":"refresh"
                },
                dataType:"jsonp",
                success:function (json) {
                    countlyCommon.extendDbObj(_carrierDb, json);
                    extendMeta();
                }
            });
        } else {
            _carrierDb = {"2012":{}};

            return true;
        }
    };

    countlyCarrier.reset = function () {
        _carrierDb = {};
        setMeta();
    };

    countlyCarrier.getCarrierData = function () {

        var chartData = countlyCommon.extractTwoLevelData(_carrierDb, _carriers, countlyCarrier.clearCarrierObject, [
            {
                name:"carrier",
                func:function (rangeArr, dataObj) {
                    return countlyCarrier.getCarrierCodeName(rangeArr);
                }
            },
            { "name":"t" },
            { "name":"u" },
            { "name":"n" }
        ], "carriers");

        var carrierNames = _.pluck(chartData.chartData, 'carrier'),
            carrierTotal = _.pluck(chartData.chartData, 't'),
            carrierNew = _.pluck(chartData.chartData, 'n'),
            chartData2 = [],
            chartData3 = [];

        var sum = _.reduce(carrierTotal, function (memo, num) {
            return memo + num;
        }, 0);

        for (var i = 0; i < carrierNames.length; i++) {
            var percent = (carrierTotal[i] / sum) * 100;
            chartData2[i] = {data:[
                [0, carrierTotal[i]]
            ], label:carrierNames[i]};
        }

        var sum2 = _.reduce(carrierNew, function (memo, num) {
            return memo + num;
        }, 0);

        for (var i = 0; i < carrierNames.length; i++) {
            var percent = (carrierNew[i] / sum) * 100;
            chartData3[i] = {data:[
                [0, carrierNew[i]]
            ], label:carrierNames[i]};
        }

        chartData.chartDPTotal = {};
        chartData.chartDPTotal.dp = chartData2;

        chartData.chartDPNew = {};
        chartData.chartDPNew.dp = chartData3;

        return chartData;
    };

    countlyCarrier.clearCarrierObject = function (obj) {
        if (obj) {
            if (!obj["t"]) obj["t"] = 0;
            if (!obj["n"]) obj["n"] = 0;
            if (!obj["u"]) obj["u"] = 0;
        }
        else {
            obj = {"t":0, "n":0, "u":0};
        }

        return obj;
    };

    countlyCarrier.getCarrierBars = function () {
        return countlyCommon.extractBarData(_carrierDb, _carriers, countlyCarrier.clearCarrierObject);
    };

    countlyCarrier.getCarrierCodeName = function (code) {
        return _carrierCodeMap[code] ? _carrierCodeMap[code] : code;
    }
    function setMeta() {
        if (_carrierDb['meta']) {
            _carriers = (_carrierDb['meta']['carriers']) ? _carrierDb['meta']['carriers'] : [];
        } else {
            _carriers = [];
        }
    }

    function extendMeta() {
        if (_carrierDb['meta']) {
            _carriers = countlyCommon.union(_carriers, _carrierDb['meta']['carriers']);
        }
    }

}(window.countlyCarrier = window.countlyCarrier || {}, jQuery));