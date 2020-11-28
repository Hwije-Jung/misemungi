const request = require('request')
const serviceKey = '7rloXxdcpjuUszWhliD8Ge20nEcInTTYOCCzOxtETM3H44poN7Sw7w1%2FS7ncIWuDUpdt6fM9zcumEz5auRIu8Q%3D%3D'
//공공데이터 포털에서 받은 나의 서비스키 

var parse = require('json-parse')
const airdata = (sidoName, callback) => {       // 시/도 이름을 여기서 받음.

    console.log("에어데이타!!!!!!");            //진입햇는지 확인용

    const url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?';
    //api사용하기 위한 url

    //api를 사용 하기 위한 기본 요청 값 들
    var queryParams = encodeURIComponent('ServiceKey') + '=' + serviceKey   //서비스키
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1');  
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY');    //데이터측정시간
    queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.3'); //버젼
    queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(sidoName);  //시도 이름
    queryParams += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json')   //josn으로 받기
    
    request(
        {
        url: url + queryParams, // url과 queryParams합쳐놓은거 
        method: 'GET'
        }, function (error, response, body) 
        {
        // console.log(url+queryParams);
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        console.log('Reponse received', body);  //데이터 수신 확인용

        callback(undefined,{    //body를 air이름으로 만들 어줌
            air:body
        })
        });
        
}

module.exports = airdata;