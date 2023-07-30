import React,{ useEffect,useRef } from 'react'
import * as echarts from 'echarts'

 const Pie = (props) => {
  const chartRef = useRef()

  const getNum =(name) =>{
    let arr = props.data.filter(function (item) {
      return item.name === name
    })
    return arr[0].value
  }
  let total = props.data.reduce((accumulator, currentValue) => 
    accumulator + currentValue.value
  ,0)

  const initPie = () => {
    setTimeout(() => {
      const pie = echarts.init(chartRef.current)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          zlevel: 0,
          text: ['{name|用户总数(人)}', '{value|' + total + '}'].join('\n'),
          top: '47%',
          left: '30%',
          textAlign: 'center',
          textVerticalAlign: 'middle',
          textStyle: {
            rich: {
              value: {
                color: '#303133',
                fontSize: 24,
                lineHeight: 24,
              },
              name: {
                color: '#909399',
                fontSize: 14,
                lineHeight: 35,
              },
            },
          },
        },
        // color: ['#FF8040', '#975FE4', '#F2637B', '#FAD337', '#4DCB73', '#36CBCB', '#3BA0FF'],
        legend: {
          top: '35%',
          right: '10%',
          orient: 'vertical',
          icon: 'circle',
          textStyle: {
            padding: [8, 0]
          },
          formatter: function (name) {
            let val = getNum(name)
            // eslint-disable-next-line no-useless-concat
            return name + '   |   ' + (val / total * 100).toFixed(0) + '%' + '   ' + val;
          },
        },
        series: [
          {
            name: '用户统计',
            type: 'pie',
            radius: ['45%', '70%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              normal: {
                // padding: [20, 20, 20, 20],
                // backgroundColor: '#fff',
                show: false,
                formatter:`{b}:{c}`,
                // rich: {
                //   value: {
                //     color: '#303133',
                //     fontSize: 16,
                //     lineHeight: 24,
                //   },
                //   name: {
                //     color: '#909399',
                //     fontSize: 14,
                //     lineHeight: 35,
                //   },
                // },
              }
            },
            emphasis: {
              label: {
                show: false,
              },
              show: false,
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              show: false
            },
            data: props.data
          }
        ]
      };
      option && pie.setOption(option);
    }, 50);
  }
  useEffect(() => {
    initPie()
  },[props.data])
  return (
    <div ref={chartRef} style={props.style}></div>
  )
}
export default Pie 