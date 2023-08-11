import React, {useRef, useEffect} from 'react';
import * as echarts from 'echarts';


export default function MixLineBar(props) {
  const chartRef = useRef();
  const initChart = () => {
    setTimeout(() => {
      const lineBar = echarts.init(chartRef.current);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['成交订单', '总订单', '转化率']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '订单数量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} 个'
            }
          },
          {
            type: 'value',
            name: '转化率',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '成交订单',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 个';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: '总订单',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 个';
              }
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: '转化率',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %';
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      };
      option && lineBar.setOption(option);
    }, 50);
  }
  useEffect(() => {
    initChart()
  },[props.data])

  return (
    <div style={props.style} ref={chartRef} />
  )
}
