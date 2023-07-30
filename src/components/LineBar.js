import React,{ useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Line = (props) => {
	const chartRef = useRef()
	const { x, y, title } = props.data
	
  const lineInit = () => {
		// let echart = echarts.getInstanceByDom(chartRef.current)
		setTimeout(() => {
			const lineBar = echarts.init(chartRef.current)
		
			const option = {
				color: ['#D2DDFF', '#6E92FF'],
				textStyle: {
					color: '#595959'
				},
				title: {
					text: title,
					textStyle: {
						color: '#262626',
						fontSize: 14,
						fontWeight: 'lighter'
					},
					top: 14,
					left: 10
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				grid: {
					top: 68,
					right: 24,
					left: 55,
					borderColor: '#f9f9f9'
				},
				xAxis: [{
					type: 'category',
					data: x,
					axisPointer: {
						type: 'shadow'
					},
					axisLine: {
						lineStyle: {
							color: '#ddd',
						}
					},
				}],
				yAxis: [{
					type: 'value',
					min: 0,
					axisLabel: {
						formatter: '{value}'
					},
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					splitLine: { //分割线配置
						lineStyle: {
							type: 'dashed',
							color: "#E8E8E8",
						}
					}
				}],
				series: [{
					name: '订单量',
					type: 'bar',
					barWidth: 24,
					data: y,
					color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
						{
							offset: 0,
							color: '#D2DDFF'
						},
						{
							offset: 1,
							color: '#6E92FF'
						}
					])
				}]
			};
			lineBar && lineBar.setOption(option)
		},50)
	}
	useEffect(() => {
		lineInit()
	}, [props.data])
  return (
    <div style={props.style} ref={chartRef} />
  )
}

export default Line 
