import React, { Component } from 'react';
import Chart from "react-google-charts";
import Graph from '../Styles/Graphs.js';
import SideMenu from '../SideMenu.js';
import Select from 'react-select';
import auth from '../../utils/Auth.js';
import axios from 'axios';

export default class AdminAnalyticsPage extends Component {
  constructor(props) {
    super(props);
     this.state ={
       years:[
        { label: "2015", value: 1 },
        { label: "2016", value: 2 },
        { label: "2017", value: 3 },
        { label: "2018", value: 4 },
        { label: "2019", value: 5 },
        
      ],
      incomingData: props.houseData,
       data:[
        ['x', 'H1', 'H2', 'H3', 'H4'],
        [0, 0,  0, 0,  0],
        [1, 10, 5,  4,  6],
        [2, 23, 15,  20,  26],
      
      ],
      options:{
        hAxis: {
          title: 'Time in Months' ,
        },
        vAxis: {
          title: 'Points',
        },
        series: {
          1: { curveType: 'function' },
        },
      }
     }
  }
  
  renderGraphs = () => {
    this.setState({
      options: this.state.options,
      date: [...this.state.data]
    })
  }
componentDidMount() {
  window.addEventListener('resize', this.renderGraphs);
  const {getAccessToken} = auth;
  const headers = {Authorization : `Bearer ${getAccessToken()}`}
   axios.get('http://localhost:5000/schools/houses/data', {headers})
        .then( response => {
          console.log(response.data);
        })
        .catch(err => {
           console.log(`Error message from analytics page`, err);
        });
}  

 
 componentUpdate() {
   window.addEventListener('resize', this.renderGraphs);
 }
  render() {
    
    return (
      <div className="analytics">
        <SideMenu />
        <div className="graphs">
           <form className="select" onSubmit={this.handleSubmit}>
             <Select options={this.state.years} />      
            </form>
            {/* <div>{this.state.incomingData}</div> */}
          <Graph>
            <Chart 
                chartType="LineChart"
                data={this.state.data}
                options={this.state.options}
                loader={<div>Loading Chart</div>}
                className="chart"
                max-width={"100%"}
                height={"480px"}
            />
          </Graph>             
        </div>     
      </div>
    )
  }
}


