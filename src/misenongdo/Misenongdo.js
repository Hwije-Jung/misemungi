import React, { Component } from 'react';
import './Misenongdo.css';
import bad from '../marine/bad.jpg';
import good from '../marine/good.jpg';
import middle from '../marine/middle.jpg';
import sobad from '../marine/sobad.jpg';
import logo from '../marine/logo.gif';
import CircularProgress from '@material-ui/core/CircularProgress';

class Misenongdo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTime:'',
            stationName:'',
            pm10Value:'',
            pm25Value:'',
            pm10Grade:'',
            pm25Grade:'',
            pm10Image:logo,
            pm25Image:logo,
            pm10Text:'...',
            pm25Text:'...',
            circle:'none',
        };
    }
    search=(e)=>{       //input창에 지역 쓰고 버튼 누르면 발동되는 함수
        e.preventDefault();

        const body = {
            sidoName: this.props.sidoName	// 현재 시,도이름을 body에 넣는다.
        }

        this.setState({
            circle:'inline'
        })

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
            
            this.setState({
                dataTime:json.list[0].dataTime,
                stationName:json.list[0].stationName,
                pm10Value:json.list[0].pm10Value,
                pm25Value:json.list[0].pm25Value,
                pm10Grade:json.list[0].pm10Grade,
                pm25Grade:json.list[0].pm25Grade,
                circle:'none'
            })

            if(json.list[0].pm10Grade === '1'){this.setState({pm10Image: good,pm10Text:'좋음'})}
            else if(json.list[0].pm10Grade === '2'){this.setState({pm10Image: middle,pm10Text:'보통'})}
            else if(json.list[0].pm10Grade === '3'){this.setState({pm10Image:bad,pm10Text:'나쁨'})}
            else{this.setState({pm10Image:sobad,pm10Text:'매우나쁨'})}

            if(json.list[0].pm25Grade === '1'){ this.setState({pm25Image: good,pm25Text:'좋음'})}
            else if (json.list[0].pm25Grade === '2'){this.setState({pm25Image: middle,pm25Text:'보통'})}
            else if (json.list[0].pm25Grade === '3'){this.setState({pm25Image: bad,pm25Text:'나쁨'})}
            else{this.setState({pm25Image: sobad,pm25Text:'매우나쁨'})}

        });
    }

    render() {
        return (
            <div className="mise_main">

                <div className="mise_left">
                <button className="mise_serchBtn" onClick={this.search}>클릭</button>
                    <div className="mise_title">측정 일시</div> 
                    <div className="mise_text">  {this.state.dataTime}</div>
                    <div className="mise_title">측정소명</div>
                    <div className="mise_text">  {this.state.stationName}</div>
                    <div className="mise_title">미세먼지농도</div>
                    <div className="mise_text">  {this.state.pm10Value} <span className="zisu">(PM10)</span></div>
                    <div className="mise_title">초미세먼지농도</div>
                    <div className="mise_text">  {this.state.pm25Value} <span className="zisu">(PM2.5)</span></div>
                </div>

                <CircularProgress color="secondary" style={{display:this.state.circle,marginTop:150,marginLeft:270, position:'absolute'}}/>

                <div className="mise_right">
                    <div className="mise_right_title">미세먼지 등급</div>
                    <div className="mise_right_back">
                        <img src={this.state.pm10Image} height="110" width='110' style={{borderRadius:'20px'}}/>
                    <span className="mise_right_text">{this.state.pm10Text}</span>
                    </div>
                   
                    <div className="mise_right_title">초미세먼지 등급</div>
                    <div className="mise_right_back">
                        <img src={this.state.pm25Image} height="110" width='110' style={{borderRadius:'20px'}}/>
                        <span className="mise_right_text">{this.state.pm25Text}</span>
                    </div>
                    
                </div>

            
                
            </div>
        );
    }
}

export default Misenongdo;