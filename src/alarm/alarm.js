import React, { Component } from 'react';
import './alarm.css';
import bad from '../marine/bad.jpg';
import good from '../marine/good.jpg';
import middle from '../marine/middle.jpg';
import sobad from '../marine/sobad.jpg';
import logo from '../marine/logo.gif';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

class Alarm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issueDate:'',
            issueTime:'',
            clearDate:'',
            clearTime:'',
            districtName:'',
            moveName:'',
            issueGbn:'',
            issueVal:'',
            itemCode:'',
            pm10Image:logo,
            circle:'none',

            year:2020,
        };
    }

    alarm=(e)=>{
        e.preventDefault();

        const body = {
            year: this.state.year
        }

        this.setState({
            circle:'inline'
        })

        fetch('http://localhost:5000/alarm',{
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(body),	
        })
        .then(res => res.json())    // 서버로부터 받음
        .then(json => {
            let count = 0;
            for(let i=0; i<100;i++){
                if(json.list[i].districtName == this.props.sidoName && count ==0){
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

                this.setState({
                    issueDate: json.list[i].issueDate,
                    issueTime: json.list[i].issueTime,
                    clearDate: json.list[i].clearDate,
                    issueVal: json.list[i].issueVal,
                    clearTime: json.list[i].clearTime,
                    itemCode: json.list[i].itemCode,
                    moveName: json.list[i].moveName,
                    issueGbn: json.list[i].issueGbn,
                    circle:'none'
                })

                if(json.list[0].pm10Grade === '1'){this.setState({pm10Image: good,pm10Text:'좋음'})}
                else if(json.list[0].pm10Grade === '2'){this.setState({pm10Image: middle,pm10Text:'보통'})}
                else if(json.list[0].pm10Grade === '3'){this.setState({pm10Image:bad,pm10Text:'나쁨'})}
                else{this.setState({pm10Image:sobad,pm10Text:'매우나쁨'})}
            }
            }
            count = 0;
        });
    }

    render() {
        return (
            <div className="alarm_main">
                  <div className="alarm_left">
                <button className="alarm_serchBtn" onClick={this.alarm}>클릭</button>
                    <div className="alarm_title">최근 발령 일자</div> 
                    <div className="alarm_text">  {this.state.issueDate}</div>
                    <div className="alarm_title">발령 시각</div>
                    <div className="alarm_text">  {this.state.issueTime}</div>
                    <div className="alarm_title">세부지역</div>
                    <div className="alarm_text">  {this.state.moveName} <span className="zisu">(PM10)</span></div>
                    <div className="alarm_title">구별</div>
                    <div className="alarm_text">  {this.state.itemCode} <span className="zisu">(PM2.5)</span></div>
                </div>

                <CircularProgress color="secondary" style={{display:this.state.circle,marginTop:150,marginLeft:270, position:'absolute'}}/>

                <div className="alarm_right">
                    {/* <div className="alarm_right_title">미세먼지 등급</div>
                    <div className="alarm_right_back">
                        <img src={this.state.pm10Image} height="110" width='110' style={{borderRadius:'20px'}}/>
                    <span className="alarm_right_text">{this.state.pm10Text}</span>
                    </div> */}

                    <div className="alarm_title_r" style={{marginTop:50}}>해제 일자</div>
                    <div className="alarm_text_r">  {this.state.issueDate} <span className="zisu">(PM2.5)</span></div>

                    <div className="alarm_title_r">해제 시각</div>
                    <div className="alarm_text_r">  {this.state.clearTime} <span className="zisu">(PM2.5)</span></div>
                   
                    <div className="alarm_right_title">유형</div>
                    <div className="alarm_right_back">
                        <img src={this.state.pm10Image} height="110" width='110' style={{borderRadius:'20px'}}/>
                    <span className="alarm_right_text">{this.state.issueGbn}</span>
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default Alarm;   