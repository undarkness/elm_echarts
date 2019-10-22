/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import echarts from 'echarts'
const install = function(Vue) {
	Object.defineProperties(Vue.prototype, {
		$chart: {
			get() {
				return {
					config: {
						colorList0: [
							"#6688EA",
							"#F39AC6",
							"#01DFF6",
							"#B74AE5",
							"#017AF6",
							"#EEE6A2",
							"#9DB3F4",
							"#EE9201",
							"#29AAE3",
							"#EFE42A",
							"#64BD3D",
							"#F39AC6",
							"#5D74FF",
							"#78E7F2"
						],
						colorList1: [
							"#9AF6FF",
							"#3DD4FF",
							"#F6FFC2",
							"#5C83FF",
							"#EFE42A",
							"#64BD3D",
							"#EE9201",
							"#29AAE3",
							"#B74AE5"
						]
					},

					xArr: {
						month: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月"
						],
						week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
					},

					//画一条简单的线
					line1: function(id) {
						this.chart = echarts.init(document.getElementById(id));
						this.chart.clear();

						const optionData = {
							xAxis: {
								type: 'category',
								data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
							},
							yAxis: {
								type: 'value'
							},
							series: [{
								data: [820, 932, 901, 934, 1290, 1330, 1320],
								type: 'line',
								smooth: true
							}]
						};

						this.chart.setOption(optionData);
					},

					/*折线图
					 *	dom：目标节点this.
					 *	tit：标题
					 *  xData: 竖轴数据
					 *	yData: 竖轴数据
					 */
					lineChart: function(dom, tit, xData, yData) {
						
						if (typeof xData == "string") {
							xData = this.xArr[xData];
						}

						let targetDom = document.getElementById(dom);
						let lineChart = echarts.init(targetDom);

						let option = {
							tooltip: {
								trigger: "item", // 'axis'
								formatter: "{b} {c}",
								textStyle: {
									color: "rgba(255, 255, 255, 0.85)",
									fontSize: "16"
								}
							},
							//图例名
							legend: {
								right: "1%", //----图例相对容器位置,top\bottom\left\right
								data: [tit],
								textStyle: {
									//----图例内容样式
									color: "#53C7FF" //---所有图例的字体颜色
									//backgroundColor:'black',  //---所有图例的字体背景色
								}
							},
							grid: {
								left: "2%", //图表距边框的距离
								right: "4%",
								top: "16%",
								bottom: "15%",
								containLabel: true
							},
							//x轴信息样式
							xAxis: {
								show: true, //---是否显示
								position: "bottom", //---x轴位置
								offset: 0, //---x轴相对于默认位置的偏移
								axisLine: {
									//---坐标轴 轴线
									show: true, //---是否显示
									symbol: ["none", "arrow"], //---是否显示轴线箭头
									symbolSize: [8, 8], //---箭头大小
									symbolOffset: [0, 7], //---箭头位置
									lineStyle: {
										color: "#0E5A7D",
										width: 1,
										type: "solid"
									}
								},
								axisTick: {
									//---坐标轴 刻度
									show: true, //---是否显示
									inside: true, //---是否朝内
									length: 3, //---长度
									lineStyle: {
										//color:'red',          //---默认取轴线的颜色
										width: 1,
										type: "solid"
									}
								},
								axisLabel: {
									//---坐标轴 标签
									show: true, //---是否显示
									inside: false, //---是否朝内
									rotate: 0, //---旋转角度
									margin: 5, //---刻度标签与轴线之间的距离
									color: "#53C7FF" //---默认取轴线的颜色
								},
								splitLine: {
									//---grilet 区域中的分隔线
									show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
									lineStyle: {
										//color:'red',
										//width:1,
										//type:'solid',
									}
								},
								splitArea: {
									//--网格区域
									show: false //---是否显示，默认false
								},
								data: xData
							},

							//----------------------  y轴  ------------------------
							yAxis: {
								show: true, //---是否显示
								position: "left", //---y轴位置
								offset: 0, //---y轴相对于默认位置的偏移
								type: "value", //---轴类型，默认'category'
								axisLine: {
									//---坐标轴 轴线
									show: true, //---是否显示

									//------------------- 箭头 -------------------------
									symbol: ["none", "arrow"], //---是否显示轴线箭头
									symbolSize: [8, 8], //---箭头大小
									symbolOffset: [0, 7], //---箭头位置

									//------------------- 线 -------------------------
									lineStyle: {
										color: "#0E5A7D",
										width: 1,
										type: "solid"
									}
								},
								axisTick: {
									//---坐标轴 刻度
									show: true, //---是否显示
									inside: false, //---是否朝内
									length: 3, //---长度
									lineStyle: {
										//color:'red',          //---默认取轴线的颜色
										width: 1,
										type: "solid"
									}
								},
								axisLabel: {
									//---坐标轴 标签
									show: true, //---是否显示
									inside: false, //---是否朝内
									interval: "auto",
									formatter: "{value}",
									rotate: 0, //---旋转角度
									margin: 8, //---刻度标签与轴线之间的距离
									color: "#53C7FF" //---默认取轴线的颜色
								},
								splitLine: {
									//---grilet 区域中的分隔线
									show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
									lineStyle: {
										color: "#666",
										width: 1,
										type: "dashed" //---类型
									}
								},
								splitArea: {
									//--网格区域
									show: false //---是否显示，默认false
								}
							},
							series: [
								//实线
								{
									name: tit,
									type: "line",
									smooth: false,
									stack: "a",
									symbol: "circle",
									symbolSize: 5,
									sampling: "average",
									itemStyle: {
										normal: {
											color: "#69CEFF",
											formatter: "{b}\n{c}",
											borderColor: "#69CEFF" //拐点边框颜色
										}
									},
									areaStyle: {
										normal: {
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: "rgba(105, 206, 255, .9)" // 0% 处的颜色
												},
												{
													offset: 1,
													color: "rgba(105, 206, 255, .01)" // 100% 处的颜色
												}
											])
											//color: '#69CEFF' //改变区域颜色
										}
									},
									data: yData
								}
							]
						};
						lineChart.setOption(option);
					},

					/*柱状图
					 *	dom：目标节点
					 *	tit：标题
					 *  xData: 横轴数据
					 *	yData: 竖轴数据
					 */
					barChart: function(dom, tit, xData, yData) {
						
						if (typeof xData == "string") {
							xData = this.xArr[xData];
						}

						let targetDom = document.getElementById(dom);
						let barChart = echarts.init(targetDom);
						option = {
							// title: {
							// 	text: tit,
							// 	textStyle: { //---主标题内容样式
							// 		color: '#90D1F2'
							// 	},
							// 	padding: [0, 40, 400, 915] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
							// },
							grid: {
								left: "10%",
								right: "5%",
								top: "10%",
								bottom: "14%"
							},
							xAxis: {
								type: "category",
								data: xData,
								splitLine: {
									show: false
								}, //去除网格线
								axisLine: {
									lineStyle: {
										type: "solid",
										color: "#90D1F2", //左边线的颜色
										width: "2" //坐标线的宽度
									}
								},
								axisLabel: {
									textStyle: {
										color: "#90D1F2", //坐标值得具体的颜色
										fontSize: "12"
									}
								}
							},
							yAxis: {
								type: "value",
								show: true,
								axisLine: {
									lineStyle: {
										type: "solid",
										color: "#90D1F2",
										width: "1"
									}
								},
								axisLabel: {
									textStyle: {
										color: "#90D1F2"
									}
								},
								splitLine: {
									//---grilet 区域中的分隔线
									show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
									lineStyle: {
										color: "#00EAFF",
										width: "1"
										// type:'dashed',          //---类型
									}
								}
							},
							series: [{
								data: yData,
								type: "bar",
								itemStyle: {
									normal: {
										color: function(params) {
											var colorList = [
												"#EFE42A",
												"#64BD3D",
												"#EE9201",
												"#29AAE3",
												"#B74AE5",
												"#EFE42A",
												"#64BD3D",
												"#EE9201",
												"#29AAE3",
												"#B74AE5",
												"#EFE42A",
												"#64BD3D",
												"#EE9201",
												"#29AAE3",
												"#B74AE5"
											];
											return colorList[params.dataIndex];
										},
										label: {
											show: true, //开启显示
											position: "top", //在上方显示
											textStyle: {
												//数值样式
												color: "#0FD5E7",
												fontSize: 12
											}
										}
									}
								},
								barWidth: 25 //柱图宽度
							}]
						};
						barChart.setOption(option);
					},

					ncbarCharts: function(dom, tit, xData, yData) {
						// var xData = xData;
						// if (typeof xData == "string") {
						//   xData = this.xArr[xData];
						// }

						var targetDom = document.getElementById(dom);
						var ncbarCharts = echarts.init(targetDom);
						option = {
							legend: {},
							tooltip: {},
							dataset: {
								dimensions: ["product", "视频巡视", "人力巡视"],
								source: [{
										product: "时间投入",
										视频巡视: 10.8,
										人力巡视: 70.3
									},
									{
										product: "人力投入",
										视频巡视: 5,
										人力巡视: 70
									}
								]
							},
							xAxis: {
								type: "category",
								axisLine: {
									lineStyle: {
										type: "solid",
										color: "#90D1F2", //左边线的颜色
										width: "2" //坐标线的宽度
									}
								},
								axisLabel: {
									textStyle: {
										color: "#90D1F2", //坐标值得具体的颜色
										fontSize: "12"
									}
								}
							},
							yAxis: {
								show: true,
								axisLine: {
									lineStyle: {
										type: "solid",
										color: "#90D1F2", //左边线的颜色
										width: "2" //坐标线的宽度
									}
								},
								axisLabel: {
									textStyle: {
										color: "#90D1F2", //坐标值得具体的颜色
										fontSize: "12"
									}
								}
							},
							// xAxis: [
							//   { type: 'category', gridIndex: 0 },
							//   { type: 'category', gridIndex: 1 }
							// ],
							// yAxis: [
							//   { gridIndex: 0 },
							//   { gridIndex: 1 }
							// ],
							// grid: [
							//   { bottom: '55%' },
							//   { top: '55%' }
							// ],

							series: [{
									data: yData,
									type: "bar",
									itemStyle: {
										normal: {
											color: "#EE9201",
											label: {
												show: true, //开启显示
												position: "top", //在上方显示

												textStyle: {
													//数值样式
													color: "#0FD5E7",
													fontSize: 12
												}
											}
										}
									},
									barWidth: 25 //柱图宽度
								},
								{
									data: yData,
									type: "bar",
									itemStyle: {
										normal: {
											color: "#29AAE3",
											label: {
												show: true, //开启显示
												position: "top", //在上方显示
												// formatter: function (val) {
												//   return val['人力巡视'] + "人次";
												// },
												textStyle: {
													//数值样式
													color: "#0FD5E7",
													fontSize: 12
												}
											}
										}
									},
									barWidth: 25 //柱图宽度
								}
							]
						};
						ncbarCharts.setOption(option);
					},

					taskChart: function(dom, taskType, dep, sArr) {
						var targetDom = document.getElementById(dom);
						var taskChart = echarts.init(targetDom);

						var option = {
							legend: {
								orient: "horizontal",
								top: "bottom",
								left: "center",
								icon: "circle",
								data: taskType,
								textStyle: {
									color: "#90D1F2"
								}
							},
							grid: {
								left: "80",
								right: "65",
								top: "20",
								bottom: "70"
							},
							xAxis: {
								position: "bottom",
								type: "category",
								data: dep,
								splitLine: {
									show: false
								}, //去除网格线
								axisLine: {
									//------------------- 箭头 -------------------------
									symbol: ["none", "arrow"], //---是否显示轴线箭头
									symbolSize: [8, 8], //---箭头大小
									symbolOffset: [0, 7], //---箭头位置
									lineStyle: {
										type: "solid",
										color: "#00EAFF", //左边线的颜色
										width: "2" //坐标线的宽度
									}
								},
								axisLabel: {
									textStyle: {
										fontSize: "14",
										lineHeight: "24",
										color: "#90D1F2" //坐标值得具体的颜色
									}
								}
							},
							yAxis: {
								type: "value",
								splitLine: {
									show: true,
									lineStyle: {
										type: "dashed",
										color: "rgba(0, 234, 255, .6)",
										width: "1"
									}
								}, //网格线
								axisLine: {
									//------------------- 箭头 -------------------------
									symbol: ["none", "arrow"], //---是否显示轴线箭头
									symbolSize: [8, 8], //---箭头大小
									symbolOffset: [0, 7], //---箭头位置
									lineStyle: {
										type: "solid",
										color: "#00EAFF",
										width: "2"
									}
								},
								axisLabel: {
									textStyle: {
										color: "#90D1F2"
									}
								}
							},
							series: sArr
						};
						taskChart.setOption(option);
					},

					/*扇形图
					 *	dom：目标节点
					 *	tit：标题
					 *	roseData：扇形数据
					 */
					roseChart: function(dom, tit, roseData) {
						var _self = this;
						var targetDom = document.getElementById(dom);
						var roseChart = echarts.init(targetDom);

						var pieData = _self.formatPieData(roseData, "name", "value");

						option = {
							title: {
								text: tit,
								x: "right",
								textStyle: {
									color: "rgba(105, 206, 255, .9)",
									fontSize: "12"
								}
							},
							tooltip: {
								trigger: "item",
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							itemStyle: {
								normal: {
									label: {
										show: true,
										textStyle: {
											fontSize: "16"
										},
										// formatter: function(val) { //让series 中的文字进行换行
										//     return val.name.split("-").join("\n");
										// }
										formatter: "{d}%"
									} //饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
								} //基本样式
							},

							// legend: {
							// 	x: 'center',
							// 	y: 'bottom',
							// 	data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
							// },
							// toolbox: {
							// 	show: false,
							// 	feature: {
							// 		mark: {
							// 			show: true
							// 		},
							// 		dataView: {
							// 			show: true,
							// 			readOnly: false
							// 		},
							// 		magicType: {
							// 			show: true,
							// 			type: ['pie', 'funnel']
							// 		},
							// 		restore: {
							// 			show: true
							// 		},
							// 		saveAsImage: {
							// 			show: true
							// 		}
							// 	}
							// },
							calculable: true,

							series: [{
								name: tit,
								type: "pie",
								label: {
									normal: {
										show: true
									},
									emphasis: {
										show: false
									},
									labelLine: {
										normal: {
											show: false
										},
										emphasis: {
											show: true
										}
									}
								},
								radius: [0, 55],
								center: ["50%", "50%"],
								// roseType: 'area',
								// selectedMode: 'single',
								data: pieData,
								color: function(params) {
									var colorList = [
										"#EFE42A",
										"#64BD3D",
										"#EE9201",
										"#29AAE3",
										"#B74AE5",
										"#EFE42A",
										"#64BD3D",
										"#EE9201",
										"#29AAE3",
										"#B74AE5",
										"#EFE42A",
										"#64BD3D",
										"#EE9201",
										"#29AAE3",
										"#B74AE5"
									];
									return colorList[params.dataIndex];
								}
							}]
						};
						roseChart.setOption(option);
					},

					//数据处理

					//移动巡检派工数据处理
					formatTaskData: function(dom, taskData) {
						taskData = [{
								task_name: "事故巡视",
								task_count: [{
										dep_name: "和华运维班",
										count: 0
									},
									{
										dep_name: "西固运维班",
										count: 2
									},
									{
										dep_name: "新城运维班",
										count: 2
									},
									{
										dep_name: "兰州运维班",
										count: 4
									},
									{
										dep_name: "开永运维班",
										count: 2
									},
									{
										dep_name: "盐海运维班",
										count: 4
									}
								]
							},
							{
								task_name: "特殊巡视",
								task_count: [{
										dep_name: "和华运维班",
										count: 2
									},
									{
										dep_name: "西固运维班",
										count: 0
									},
									{
										dep_name: "新城运维班",
										count: 2
									},
									{
										dep_name: "兰州运维班",
										count: 2
									},
									{
										dep_name: "开永运维班",
										count: 0
									},
									{
										dep_name: "盐海运维班",
										count: 2
									}
								]
							},
							{
								task_name: "监督性巡视",
								task_count: [{
										dep_name: "和华运维班",
										count: 2
									},
									{
										dep_name: "西固运维班",
										count: 2
									},
									{
										dep_name: "新城运维班",
										count: 5
									},
									{
										dep_name: "兰州运维班",
										count: 4
									},
									{
										dep_name: "开永运维班",
										count: 2
									},
									{
										dep_name: "盐海运维班",
										count: 2
									}
								]
							},
							{
								task_name: "定期巡视",
								task_count: [{
										dep_name: "和华运维班",
										count: 2
									},
									{
										dep_name: "西固运维班",
										count: 2
									},
									{
										dep_name: "新城运维班",
										count: 2
									},
									{
										dep_name: "兰州运维班",
										count: 2
									},
									{
										dep_name: "开永运维班",
										count: 2
									},
									{
										dep_name: "盐海运维班",
										count: 2
									}
								]
							}
						];

						let colorList = this.config.colorList1;
						let tArr = [];
						let dArr = [];
						let sArr = [];

						taskData[0].task_count.forEach(function(item, index) {
							dArr.push(item.dep_name);
						});

						taskData.forEach(function(item, index) {
							let sObj = {
								name: "",
								type: "bar",
								stack: "value", //折叠显示
								barWidth: 35,
								data: [],
								color: []
							};

							tArr.push(item.task_name);

							sObj.name = item.task_name;
							sObj.color = colorList[index];

							taskData[index].task_count.forEach(function(item, index) {
								sObj.data.push(item.count + item.count);
							});
							sArr.push(sObj);
						});

						this.taskChart(dom, tArr, dArr, sArr);
					},

					//扇形图数据处理
					formatPieData: function(data, k, v) {
						let pieData = data.map(function(item) {
							return {
								name: item[k] || "",
								value: item[v] || 0
							};
						});
						return pieData;
					},

				}
			}
		}
	})
}

export default {
	install
}
