var ctxLastMonth = $("#lastMonthChart").get(0).getContext("2d");
var ctxChart = $("#b3-chart").get(0).getContext("2d");

var dataLastMonth = {
	labels : ["锈病","虫害","冻害","干旱"],
	datasets : [
		{
			label: "发生次数",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#33ccff",
            borderColor: "#3333ff",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#33ccff",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#33ccff",
            pointHoverBorderColor: "#3333ff",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [7, 0, 2, 1],
            spanGaps: false,
		},
		
	]
};


var dataChartDay = {
	labels : ["周一","周二","周三","周四","周五","周六","周日"],
	datasets : [
		{
			label: "发生概率",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#33ccff",
            borderColor: "#3333ff",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#33ccff",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#33ccff",
            pointHoverBorderColor: "#3333ff",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [66, 67, 64, 61, 60, 62, 61],
            spanGaps: false,
		},
		
	]
}




new Chart(ctxLastMonth, {
    type:'bar',
    data: dataLastMonth,
});

// chart for chart
new Chart(ctxChart, {
    type:'bar',
    data: dataChartDay,
});
