const bodyParser = require('body-parser');
const { query } = require('express');
const express = require('express');
const airdata = require('./airdata'); //여기서 만들어논 함수를 가져올거다
const alarmdata = require('./alarmdata'); //여기서 만들어논 함수를 가져올거다
const lifezisu = require('./lifezisu');
const yellow = require('./yellow');
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}))



router.post('/location',function (req,res){ ///프론트에서 fetch와 연결될 locaton 친구

    console.log("연결 1!!!")    //확인용
    airdata(req.body.sidoName,(error, {air}={})=>{  //airdata함수에 fetch해준 req->body->sidoName포장을 뜯고 넣어준다.
        if(error){      //에러 발생시
            console.log("가나다라마바사!!");
            return res.send({error})
        }
        return res.send(air);   // air객체를 프론틀앤드로 보내준다. 
    })
})

router.post('/alarm',function (req,res){ ///프론트에서 fetch와 연결될 locaton 친구

    console.log("연결 1!!!")    //확인용
    alarmdata(req.body.year,(error, {alarm}={})=>{  //airdata함수에 fetch해준 req->body->sidoName포장을 뜯고 넣어준다.
        if(error){      //에러 발생시
            console.log("가나다라마바사!!");
            return res.send({error})
        }
        return res.send(alarm);   // air객체를 프론틀앤드로 보내준다. 
    })
})

router.post('/ozon',function (req,res){ ///프론트에서 fetch와 연결될 locaton 친구

    console.log("연결 1!!!")    //확인용
    lifezisu(req.body.year,(error, {ozon}={})=>{ 
        if(error){      //에러 발생시
            console.log("가나다라마바사!!");
            return res.send({error})
        }
        return res.send(ozon);   // air객체를 프론틀앤드로 보내준다. 
    })
})

router.post('/yellow',function (req,res){ ///프론트에서 fetch와 연결될 locaton 친구

    console.log("연결 1!!!")    //확인용
    yellow(req.body.year,(error, {yellow}={})=>{ 
        if(error){      //에러 발생시
            console.log("가나다라마바사!!");
            return res.send({error})
        }
        return res.send(yellow);   // air객체를 프론틀앤드로 보내준다. 
    })
})

module.exports = router;