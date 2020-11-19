const request = require('request')
const serviceKey = '7rloXxdcpjuUszWhliD8Ge20nEcInTTYOCCzOxtETM3H44poN7Sw7w1%2FS7ncIWuDUpdt6fM9zcumEz5auRIu8Q%3D%3D'
//공공데이터 포털에서 받은 내 서비스키 

var parse = require('json-parse')
const alarmdata = (year, callback) => {       // 시/도 이름을 여기서 받았다.

    console.log("알람데이타!!!!!!");            //진입햇는지 확인용
    console.log(year);            //진입햇는지 확인용

    var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
    queryParams += '&' + encodeURIComponent('year') + '=' + encodeURIComponent(year); /* */
    // queryParams += '&' + encodeURIComponent('itemCode') + '=' + encodeURIComponent('PM10'); /* */
    queryParams += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json') 
    
    request(
        {
        url: url + queryParams, // url과 queryParams합쳐놓은거 
        method: 'GET'
        }, function (error, response, body) 
        {
        console.log(url+queryParams);
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        console.log('Reponse received', body);

        callback(undefined,{    //body를 air이름으로 만들어준다.
            alarm:body
        })
        });
        
}

module.exports = alarmdata;