import React,{ useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import china from '@/utils/China.json'

const Map = (props) => {
  const chartRef = useRef()
  // const topNumber = props.data[0].value
  // const bottomNumber = props.data[props.data.length - 1].value

  const echartsMapClick = () => {
    //点击地图模块逻辑事件
  }
  const mapOption = (mapName, data) => {
    setTimeout(() => {
      const myChart = echarts.init(chartRef.current);
    
      echarts.registerMap(mapName, data);
      const option = {
        tooltip: {
          backgroundColor: 'rgba(21, 24, 45, 0.9)', // 提示框浮层的背景颜色。
          textStyle: {
            // 提示框浮层的文本样式。
            color: '#fff',
            fontSize: 14,
          },
          extraCssText: 'border-color: rgba(21, 24, 45, 0.9);',
          formatter: function (params) {
            //数据格式化
            const val = params.value ? params.value : 0;
            if (params.value) {
              return (
                params.name + '<br />' + params.seriesName + '：' + val
              );
            } else {
              return '暂无数据';
            }
          },
        },
        visualMap: {
          min: 0,
          // max: topNumber,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], //取值范围的文字
          calculable: true,
          inRange: {
            color: ['#D2DDFF', '#6E92FF'], //取值范围的颜色
          },
          show: true, //图注
        },
        geo: {
          map: 'china',
          roam: true, //不开启缩放和平移
          zoom: 1.2, //视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)',
            },
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            emphasis: {
              areaColor: '#4BD6C7', //鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        series: [
          {
            name:'人口',
            type: 'map',
            geoIndex: 0,
            data: props.data,
          },
        ],
      }
      myChart.setOption(option); //绘图
      //点击画布内还是画布外
      myChart.getZr().on('click', (params) => {
        if (params.target) {
          myChart.on('click', echartsMapClick); //增加点击事件
        }
      })
    },50)
    
  }
  const loadingChina = () => {
    mapOption('china', china) //初始化-创建中国地图
  };
 
  useEffect(() => {
    loadingChina()
  }, [props.data])
  return (
    <div style={props.style} ref={chartRef} />
  )
}
export default Map
