import React from 'react';
import './main.css';
import changwon from './changwon.gif';
import Navigation from './nav/nav';
import Bottom from './bottom/bottom';
import arrow from './arrow.png';
import Misenongdo from './misenongdo/Misenongdo';
import Alarm from './alarm/alarm';
import Ozon from './ozon/ozon';


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidoName:'',    //시,도의 이름을 받는 state값
            year:2020,
            titleText:'지역 선택',
            main_height:750,
            
            sideColor1:'white',
            sideColor2:'white',
            sideColor3:'white',




            //주의보,경보
            inputSido:'경남',
            issueDate0:'',  //발령날짜
            issueTime0:'',  //발령시각
            clearDate0:'',  //발령해제시각
            clearTime0:'',  //발령해제시각
            districtName:'',   //구역
            moveName:'',       //세부구역
            issueGbn:'',        //

            //스위치
            itemOn:'inline',
            miseOn:'none',
            alarmOn:'none',
            ozonOn:'none',
            asideOn:'none',

        };
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value ,   //  input창 입력값을 바로바로 state값 초기화
        })
        console.log(this.state.location);
    }

    search=(e)=>{       //input창에 지역 쓰고 버튼 누르면 발동되는 함수
        e.preventDefault();

        const body = {
            sidoName: this.state.sidoName		// 현재 시,도이름을 body에 넣는다.
        }

        fetch('http://localhost:5000/location',{ // localhost 서버 5000번 포트의 location에게 보낸다.
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(body),	// json화 해버리기
        })
        .then(res => res.json())    // 서버로부터 받음
        .then(json => {
            console.log('측정시간:'+json.list[0].dataTime);     //dataTime (측정시간) 콘솔 출력
            console.log('측정소:'+json.list[0].stationName);     //dataTime (측정시간) 콘솔 출력
            console.log('미세먼지:'+json.list[0].pm10Value);    //pm10Value 미세먼지 지수 콘솔출력
            console.log('초미세먼지:'+json.list[0].pm25Value);    //pm25Value 미세먼지 지수 콘솔출력
            console.log('미세먼지등급:'+json.list[0].pm10Grade);    //pm25Value 미세먼지 지수 콘솔출력
            console.log('초미세먼지등급:'+json.list[0].pm25Grade);    //pm25Value 미세먼지 지수 콘솔출력
            

        });
    }

    alarm=(e)=>{
        e.preventDefault();

        const body = {
            year: this.state.year
        }

        fetch('http://localhost:5000/alarm',{
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(body),	
        })
        .then(res => res.json())    // 서버로부터 받음
        .then(json => {
            let count = 0;
            for(let i=0; i<100;i++){
                if(json.list[i].districtName === this.state.inputSido && count ==0){
                count++;
                console.log('미세먼지발령날짜:'+json.list[i].issueDate);
                console.log('발령시각:'+json.list[i].issueTime);
                console.log('해제날짜:'+json.list[i].clearDate);
                console.log('해제시각:'+json.list[i].clearTime);
                console.log(json.list[i].itemCode);
                console.log('발령지역:'+json.list[i].districtName);
                console.log('상세지역:'+json.list[i].moveName);
                console.log('발령종류:'+json.list[i].issueGbn);
                console.log('발령시농도:'+json.list[i].issueVal);
            }
            }
            count = 0;
        });
    }

    ozon=(e)=>{
        e.preventDefault();

        const body = {
            year: this.state.year
        }

        fetch('http://localhost:5000/ozon',{
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(body),	
        })
        .then(res => res.json())    // 서버로부터 받음
        .then(json => {
            let count = 0;
            for(let i=0; i<100;i++){
                if(json.list[i].districtName === this.state.inputSido && count ==0){
                count++;
                console.log('발령일자:'+json.list[i].dataDate);
                console.log('발령시각:'+json.list[i].issueTime);
                console.log('해제시각:'+json.list[i].clearTime);
                console.log('발령지역:'+json.list[i].districtName);
                console.log('세부지역:'+json.list[i].moveName);
                console.log('발령농도:'+json.list[i].issueVal);
                console.log('해제농도:'+json.list[i].clearVal);
                console.log('최고농도:'+json.list[i].maxVal);
            }
            }
            count = 0;
        });
    }

    yellow=(e)=>{
        e.preventDefault();

        const body = {
            year: this.state.year
        }

        fetch('http://localhost:5000/yellow',{
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(body),	
        })
        .then(res => res.json())    // 서버로부터 받음
        .then(json => { 
                console.log('황사지역:'+json.list[0].tmArea);
                console.log('발령일:'+json.list[0].dataTime);
                
                }
        );
    }

    selectSido=(e)=>{
        e.preventDefault();

        this.setState({
            itemOn:'none',  //버튼들 안보이게 하기
            sidoName: [e.target.value],//밑에 버튼 누르면 sidoName 지역으로 초기화됨
            miseOn: 'block',
            titleText: '미세먼지농도 조회',
            asideOn:'block',
            main_height:500,
            sideColor1:'#c1d9f8',
            sideColor2: 'white',
            sideColor3: 'white'
        })
    }

    backArrow=(e)=>{
        e.preventDefault();

        this.setState({
            itemOn:'block',
            miseOn:'none',
            titleText: '지역 선택',
            asideOn: 'none',
            main_height:750,
            alarmOn:'none',
            ozonOn:'none',
        })
    }

    componentDidMount=()=>{
        // for(let i=0 ;i<1;i++){
        //     console.log(this.state.issueDate[i]);
        // }
    }

    clickMise=(e)=>{
        e.preventDefault();

        this.setState({
            miseOn:'block',
            alarmOn:'none',
            ozonOn:'none',
            titleText:'미세먼지농도 조회',
            sideColor1:'#c1d9f8',
            sideColor2:'white',
            sideColor3:'white',
        })
    }

    clickAlarm=(e)=>{
        e.preventDefault();

        this.setState({
            miseOn:'none',
            alarmOn:'block',
            ozonOn:'none',
            titleText:'미세먼지 경보/주의보',
            sideColor1:'white',
            sideColor2:'#c1d9f8',
            sideColor3:'white',
        })
    }
     clickOzon=(e)=>{
        e.preventDefault();

        this.setState({
            miseOn:'none',
            alarmOn:'none',
            ozonOn:'block',
            titleText:'오존,황사 경보/주의보',
            sideColor1:'white',
            sideColor2:'white',
            sideColor3:'#c1d9f8',
        })
    }

    
    render() {
        
        return (
            <div className="main">
                <Navigation/>
                <div className="main_h1" >미세먼지 기상정보알리미</div>
                <img src={arrow} onClick={this.backArrow} className="main_arrow" height='30' width='30'></img>
            <div className="select_text">▶ {this.state.titleText}</div>
        

                <body className="main_body" style={{height:this.state.main_height}}>
                    
            {/* 지역선택 */}
            <div className="body_items"  style={{display:this.state.itemOn ,height:this.state.main_height}}>                       
                <button className="item" value='경남' onClick={this.selectSido}>경남</button>
                <button className="item" value='서울' onClick={this.selectSido}>서울</button>
                <button className="item" value='부산' onClick={this.selectSido}>부산</button>
                <button className="item" value='대구' onClick={this.selectSido}>대구</button>
                <button className="item" value='인천' onClick={this.selectSido}>인천</button>
                <button className="item" value='광주' onClick={this.selectSido}>광주</button>
                <button className="item" value='대전' onClick={this.selectSido}>대전</button>
                <button className="item" value='울산' onClick={this.selectSido}>울산</button>
                <button className="item" value='경기' onClick={this.selectSido}>경기</button>
                <button className="item" value='강원' onClick={this.selectSido}>강원</button>
                <button className="item" value='충북' onClick={this.selectSido}>충북</button>
                <button className="item" value='충남' onClick={this.selectSido}>충남</button>
                <button className="item" value='전북' onClick={this.selectSido}>전북</button>
                <button className="item" value='전남' onClick={this.selectSido}>전남</button>
                <button className="item" value='경북' onClick={this.selectSido}>경북</button>
                <div className="item_bottom_box">
                <button className="item" value='제주' onClick={this.selectSido}>제주</button>
                <button className="item" value='세종' onClick={this.selectSido}>세종</button>
                </div>
            </div>

                    {/* 왼쪽 사이드 메뉴 */}
                    <aside className="mise_aside" style={{display:this.state.asideOn , height:this.state.main_height}}>
                        <div className="mise_item">{this.state.sidoName}</div>
                        <button className="sideMenu" onClick={this.clickMise} style={{backgroundColor:this.state.sideColor1}}> 미세먼지농도 조회</button>
                        <button className="sideMenu" onClick={this.clickAlarm} style={{backgroundColor:this.state.sideColor2}}> 미세먼지 경보/주의보 </button>
                        <button className="sideMenu" onClick={this.clickOzon} style={{backgroundColor:this.state.sideColor3}}> 오존,황사 경보/주의보</button>
                    </aside>

                    {/* 컴포넌트 껐다 켜지는 곳 */}
                    <div className="compoBack" style={{display:this.state.miseOn}}> <Misenongdo sidoName={this.state.sidoName}/></div>
                    <div className="compoBack" style={{display:this.state.alarmOn}}> <Alarm sidoName={this.state.sidoName}/> </div>
                    <div className="compoBack" style={{display:this.state.ozonOn}}> <Ozon sidoName={this.state.sidoName}/> </div>

                </body>
                <Bottom/>

            </div>
        );
    }
}


export default Main;


{/* <h1>미세먼지지수</h1>
                <form>
                    <input placeholder="측정장소" name="sidoName" onChange={this.onChange}/>
                    <button onClick={this.search}>Search</button>
                </form> */}

                // <form>
                //      <input placeholder="주의보/경보장소" name="inputSido" onChange={this.onChange}/>
                //     <button onClick={this.alarm}>경보</button>
                // </form>

                // <form>
                //      {/* <input placeholder="주의보/경보장소" name="inputSido" onChange={this.onChange}/> */}
                //     <button onClick={this.ozon}>오존</button>
                // </form>

                // <form>
                //      {/* <input placeholder="주의보/경보장소" name="inputSido" onChange={this.onChange}/> */}
                //     <button onClick={this.yellow}>황사</button>
                // </form>