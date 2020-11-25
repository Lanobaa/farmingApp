import React, {useRef, useEffect} from 'react';
import echarts from 'echarts';
import moment from 'moment';
import './index.scss'
import {isNotNull} from "../../utils";
// require('echarts/lib/chart/line');
// require('echarts/lib/chart/tooltip');

const Curve = props => {
  const chartRef = useRef(null);
  useEffect(() => {
    console.log('is-props--', props);
    const ele = chartRef.current;
    let lineChart = echarts.init(ele);
    let colors = ['#39BF45', '#F27C49', '#675bba'];
    let temperatureList = [],
        humidity = [],
        dates = [];
    const {data} = props;
    if (isNotNull(data)) {
      temperatureList = props.data.temperature.map(item => item.value);
      humidity = props.data.humidity.map(item => item.value);
      dates = props.data.temperature.map(item => item.date);
    }


    let option = {
      color: colors,
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['土壤温度', '土壤湿度'],
        right: true,
      },
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[2]
            }
          },
          data: dates
        },
        {
          type: 'category',
          axisLabel: {show: false,},
          axisTick: {show: false,},
          axisLine: {show: false},
          data: dates
        }
      ],
      yAxis: [
        {
          name: '耗时(秒)',
          type: 'value'
        }
      ],
      series: [
        {
          name: '土壤温度',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          data: temperatureList
        },
        {
          name: '土壤湿度',
          type: 'line',
          smooth: true,
          data: humidity
        }
      ]
    };
    if (option && typeof option === 'object') {
      lineChart.setOption(option, false);
    }
  });
  return (
      <div className="curve">
        <div className="c_title">土壤温湿度曲线图</div>
        <div ref={chartRef} className="curveChart" />
      </div>
  )
};

export default Curve;
