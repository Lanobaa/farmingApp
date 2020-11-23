import React, {useRef, useEffect} from 'react';
import echarts from 'echarts';
import './index.scss'
// require('echarts/lib/chart/line');
// require('echarts/lib/chart/tooltip');

const Curve = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ele = chartRef.current;
    let lineChart = echarts.init(ele);
    let colors = ['#39BF45', '#F27C49', '#675bba'];


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
          data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
        },
        {
          type: 'category',
          axisLabel: {show: false,},
          axisTick: {show: false,},
          axisLine: {show: false},
          data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
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
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: '土壤湿度',
          type: 'line',
          smooth: true,
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
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
