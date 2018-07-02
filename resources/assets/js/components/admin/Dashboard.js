
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
var $this;

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        $this=this;
        this.state={
            days:[],
            months:[
               'January',
               'February',
               'March',
               'April',
               'May',
               'June',
               'July',
               'August',
               'September',
               'October',
               'November',
               'December'
            ],
           years:[],
           cur_year:new Date().getFullYear(),
           cur_month: new Date().getMonth(),
           picked_date : '',
           show:true
        }
    }
    
    componentDidMount(){
        $this.showDay();
    }

    ShowCalendar(){
         $this.setState({show : !$this.state.show});
        // $this.showDay();
    }
    
    pickDate(event){
        alert('adf')
       var p = event.target;
       $this.setState({
           picked_date : p+'/'+($this.state.cur_month + 1 )+'/'+$this.state.cur_year,
           show : !$this.state.show
       })
    }
    showDay(){
        var arr=[[],[],[],[],[],[]];
        var day_template=[];
        var j=0;
        var index=0;
        var picked=1;
        var total_days = new Date(this.state.cur_year, this.state.cur_month + 1, 0).getDate();
        var this_day=new Date(this.state.cur_year, this.state.cur_month, 1).getDay();
        var current_date = new Date().getDate();
        
        for(var i=1; i<= total_days ; i++){
            if(j==0 && index==0 ){
               for(var k=0; k< this_day; k++){
                  arr[j][index]=<td key={-index}></td>;
                  index++;
               }
            }
            var styles={background : (current_date == i) ? '#3097D1' : ''}
        
            arr[j][index]=<td key={i} style={styles} onClick={this.pickDate.bind(this)} >{i}</td>;
            if(this_day == 6 ){
                j++;
                index=-1;
                this_day=-1;
            }
            index++;
            this_day++; 
            picked++;   
        }

        $this.setState({
             days : arr
        })
    }

    preMonth(){
        if(this.state.cur_month >= 1){
            $this.setState({
                'cur_month' : $this.state.cur_month - 1
            });
        }else{
            $this.setState({
                'cur_month' : 11,
                'cur_year' : $this.state.cur_year - 1
            });
        }
        setTimeout(() => {
            $this.showDay();
        },200);
    }

    nextMonth(){
        if($this.state.cur_month >= 11){
            $this.setState({
                cur_month:0,
                cur_year: $this.state.cur_year + 1
            })
        }else{
            $this.setState({
                'cur_month' : $this.state.cur_month + 1
            });
       }
       setTimeout(() => {
          $this.showDay();
       },200);
    }

    render(){
        return(
        <div className="container">
            <AdminNavBar/><br/>
              <div className="row">
                <div className="col-md-3">
                    <input className="form-control" type="text" onClick={this.ShowCalendar.bind(this)} value={$this.state.picked_date}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3" hidden={this.state.show}>
                   <table className="table table-bordered" id="myCalender">
                   <tbody>
                        <tr>
                            <td onClick={()=>this.preMonth()}><span className="glyphicon glyphicon-triangle-left"></span></td>
                            <td colSpan={5}>
                              <span style={{align : 'center'}}> 
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {$this.state.months[$this.state.cur_month]} &nbsp;&nbsp;
                                  {$this.state.cur_year} 
                              </span>
                            </td>
                            <td onClick={()=>this.nextMonth()}><span className="glyphicon glyphicon-triangle-right"></span></td>
                        </tr>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                        <tr>
                             {$this.state.days[0]}
                        </tr>
                        <tr>
                             {$this.state.days[1]}
                        </tr> 
                        <tr>
                             {$this.state.days[2]}
                        </tr> 
                        <tr>
                             {$this.state.days[3]}
                        </tr> 
                        <tr>
                             {$this.state.days[4]}
                        </tr>         
                        <tr>
                             {$this.state.days[5]}
                        </tr>               
                      </tbody>
                   </table>
                </div>
              </div>
        </div>
        )
    }
}