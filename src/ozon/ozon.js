import React, { Component } from 'react';
import './ozon.css';
import bad from '../marine/bad.jpg';
import good from '../marine/good.jpg';
import middle from '../marine/middle.jpg';
import sobad from '../marine/sobad.jpg';
import logo from '../marine/logo.gif';

class ozon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataDate:'',
            issueTime:'',
            clearTime:'',
            districtName:'',
            moveName:'',
            issueVal:'',
            clearVal:'',
            maxVal:'',

            tmArea:'',
            dataTime:'',

            year:2020,
        };
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
            let sidoName = this.props.sidoName;
            console.log(sidoName);

            for(let i=0; i<100;i++){
                if(json.list[i].districtName == sidoName && count ==0){
                count++;
                console.log('발령일자:'+json.list[i].dataDate);
                console.log('발령시각:'+json.list[i].issueTime);
                console.log('해제시각:'+json.list[i].clearTime);
                console.log('발령지역:'+json.list[i].districtName);
                console.log('세부지역:'+json.list[i].moveName);
                console.log('발령농도:'+json.list[i].issueVal);
                console.log('해제농도:'+json.list[i].clearVal);
                console.log('최고농도:'+json.list[i].maxVal);

                this.setState({
                    dataDate: json.list[i].dataDate,
                    issueTime:json.list[i].issueTime,
                    clearTime:json.list[i].clearTime,
                    districtName:json.list[i].districtName,
                    moveName:json.list[i].moveName,
                    issueVal:json.list[i].issueVal,
                    clearVal:json.list[i].clearVal,
                    maxVal:json.list[i].maxVal,
                })
            }
            if(count == 0){
                this.setState({
                    dataDate: '데이터가 없습니다.',
                    issueTime:'데이터가 없습니다.',
                    clearTime:'데이터가 없습니다.',
                    districtName:'데이터가 없습니다.',
                    moveName:'데이터가 없습니다.',
                    issueVal:'데이터가 없습니다.',
                    clearVal:'데이터가 없습니다.',
                    maxVal:'데이터가 없습니다.',
                })
            }
            }
            count = 0;
        });

        fetch('http://localhost:5000/yellow',{
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(body),	
        })
        .then(res => res.json())    // 서버로부터 받음
        .then(json => { 
                console.log('황사지역:'+json.list[0].tmArea);
                console.log('발령일:'+json.list[0].dataTime);
                
                this.setState({
                    tmArea: json.list[0].tmArea,
                    dataTime: json.list[0].dataTime
                })
                }
        );
    }

    yellow=(e)=>{

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

    render() {
        return (
            <div className="ozon_main">
                     <div className="ozon_left">
          <button className="ozon_serchBtn" onClick={this.ozon}>{this.state.sidoName} 클릭</button>
                     <div className="ozon_title" style={{fontFamily:'gmarket',borderBottom:'1px solid black'}}>오존주의보</div>
                    <div className="ozon_title">최근 발령 일자</div> 
                    <div className="ozon_text">  {this.state.dataDate}</div>
                    <div className="ozon_title">발령 시각</div>
                    <div className="ozon_text">  {this.state.issueTime}</div>
                    <div className="ozon_title">해제 시각</div>
                    <div className="ozon_text">  {this.state.clearTime} <span className="zisu"></span></div>
                    <div className="ozon_title">세부지역</div>
                    <div className="ozon_text">  {this.state.moveName} <span className="zisu"></span></div>
                    <div className="ozon_title">발령시 오존지수</div>
                    <div className="ozon_text">  {this.state.issueVal} <span className="zisu"></span></div>


                </div>
                <div className="ozon_right">

       
                    <div className="ozon_title" style={{marginTop:15}}>해제시 오존지수</div>
                    <div className="ozon_text">  {this.state.clearVal} <span className="zisu"></span></div>
                    <div className="ozon_title">최고 농도</div>
                    <div className="ozon_text">  {this.state.maxVal} <span className="zisu"></span></div>
                    
                    <div className="ozon_title" style={{fontFamily:'gmarket', marginTop:20,borderBottom:'1px solid black'}}>황사주의보</div>
                    <div className="ozon_title">최근 발령일</div>
                    <div className="ozon_text">  {this.state.dataTime} <span className="zisu"></span></div>

                    <div className="ozon_title">발령 지역</div>
                    <div className="ozon_text_yellow" style={{fontSize:'10pt'}}>  {this.state.tmArea} </div>
                </div>
            </div>
        );
    }
}

export default ozon;