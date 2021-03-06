var USER_LENGTH = 0;
var DELETE_LIST = [];

var wp = angular.module('wp',['ngCookies']);

wp.controller('wpController',['$scope','$http','$cookies','$cookieStore',function($scope, $http,$cookies,$cookieStore){
	

	var WEA1;
	




	// 1	LOADING FUNCTION
	// 2	CLICK FUNCTION
	// 3	




	// // -weather--report-
	$scope.wea = function(){
		

	

	   var url = '/getWeaByWeb';
	   $http.get(url).then(function(data){

	   		


	   		var wea =  JSON.parse(data.data);

	   		// console.log(wea);


	   		// data resolving
           	var cityName = JSON.stringify(wea.city);//远程json数据放在query.results下 
           	cityName = cityName.replace(/\"/g,"");//正则去掉双引号

           	var shidu = JSON.stringify(wea.data.shidu);//远程json数据放在query.results下 
           	shidu = shidu.replace(/\"/g,"");//正则去掉双引号

           	var weather = JSON.stringify(wea.data.forecast[0].type);
           	weather = weather.replace(/\"/g,"");//正则去掉双引号
			// // moment.locale('zh-cn');
         	// date = moment(date).format('LLLL');

           	var temp1 = JSON.stringify(wea.data.forecast[0].low);
           	temp1 = temp1.replace(/\"/g,"");//正则去掉双引号
           	var temp2 = JSON.stringify(wea.data.forecast[0].high);
           	temp2 = temp2.replace(/\"/g,"");//正则去掉双引号
           	var ptime = JSON.stringify(wea.data.forecast[0].date);
           	ptime = ptime.replace(/\"/g,"");//正则去掉双引号

           	var notice = JSON.stringify(wea.data.forecast[0].notice);
           	notice = notice.replace(/\"/g,"");

           	var sunrise = JSON.stringify(wea.data.forecast[0].sunrise);
           	sunrise = sunrise.replace(/\"/g,"");

           	var sunset = JSON.stringify(wea.data.forecast[0].sunset);
           	sunset = sunset.replace(/\"/g,"");

           	var fx = JSON.stringify(wea.data.forecast[0].fx);
           	fx = fx.replace(/\"/g,"");
       		var fl = JSON.stringify(wea.data.forecast[0].fl);
           	fl = fl.replace(/\"/g,"");

           	var pm25 = JSON.stringify(wea.data.pm25);
           	var pm10 = JSON.stringify(wea.data.pm10);
           	var sunset = JSON.stringify(wea.data.forecast[0].sunset);
           	sunset = sunset.replace(/\"/g,"");
           	var quality = JSON.stringify(wea.data.quality);

           	var ganmao = JSON.stringify(wea.data.ganmao);
           	ganmao = ganmao.replace(/\"/g,"");
           	var aqi = JSON.stringify(wea.data.forecast[0].aqi);
           	aqi = aqi.replace(/\"/g,"");
           	
           	$scope.wLocation = cityName;
           	$scope.wTime = ptime;
           	$scope.wWeather = weather;
           	$scope.wTemp1 = temp1;
           	$scope.wTemp2 = temp2;
           	$scope.wShidu = shidu;
           	$scope.wNotice = notice;
           	$scope.wSunrise = sunrise;
           	$scope.wSunset = sunset;
           	$scope.wFx = fx;
           	$scope.wFl = fl;
           	$scope.wPm25 = pm25;
           	$scope.wPm10 = pm10;
           	$scope.wQuality = quality;
           	$scope.wGanmao = ganmao;
           	$scope.wAqi = aqi;

           	// $('#location').text(cityName);
           	$('#temp1').text(temp1);
           	$('#temp2').text(temp2);
           	$('#ptime').text(ptime);
           	$('#weather').text(weather);
           	$('#notice').text(notice);
           	$('#fx').text(fx);
           	$('#pm25').text(pm25);
           	$('#quality').text(quality);
           	$('#ganmao').text(ganmao);

           	
           	// lib/images/wea/snowy.png
           	if(weather == "多云" || weather == "阴"){
           		$('.wea1 img').attr('src','lib/images/wea/cloudy.jpg');
           	}
           	else if(weather == "大雾"){
           		$('.wea1 img').attr('src','lib/images/wea/foggy.jpg');
           	}
           	else if(weather == "小雨"){
           		$('.wea1 img').attr('src','lib/images/wea/rainy.jpg');
           	}
           	else if(weather == "小雪"){
           		$('.wea1 img').attr('src','lib/images/wea/snowy.jpg');
           	}
           	else if(weather == "晴"){
           		$('.wea1 img').attr('src','lib/images/wea/sunning.jpg');
           	}

	   }); 
	};

	$scope.wea();

	// Data mining including Review

	$scope.dm = function(){
		var api = '/getDataByWeb';
		$http.get(api).then(function(data){
			// console.log(data.data);
			var dm = data.data;
			var wd = dm.wd + "°C";
			var sd = dm.sd + "%";
			$('#at').text(wd);
			$('#ah').text(sd);

			

			var review = {
				at: String,
	        	st: String,
	        	ah: String,
	        	sh: String,
			};
		// 可用遍历会更好
			if(dm.at == 0){review.at = "不适宜";}
			else if(dm.at == 1){review.at = "较适宜";}
			else if(dm.at == 2){review.at = "适宜";}
			if(dm.ah == 0){review.ah = "不适宜";}
			else if(dm.ah == 1){review.ah = "较适宜";}
			else if(dm.ah == 2){review.ah = "适宜";}
			if(dm.st == 0){review.st = "不适宜";}
			else if(dm.st == 1){review.st = "较适宜";}
			else if(dm.st == 2){review.st = "适宜";}
			if(dm.sh == 0){review.sh = "不适宜";}
			else if(dm.sh == 1){review.sh = "较适宜";}
			else if(dm.sh == 2){review.sh = "适宜";}

			$('#at1').text(review.at);
			$('#ah1').text(review.ah);
			$('#st1').text(review.st);
			$('#sh1').text(review.sh);
		});
	};
	$scope.dm();


	// Disaster-report

	$scope.rep = function(){
		var api = '/getDataBySys1';
		$http.get(api).then(function(data){
			// console.log(data.data);
			var report = data.data;
			$('#rep-type').text(report.type);
			$scope.warningType = report.type;
			$('#rep-degree').text(report.degree);
			$scope.warningDegree = report.degree;

			if(report.type == "干旱"){
				$('.wea4 img').attr('src','lib/images/new-disaster/3.jpg');
			}
			else if(report.type == "冻害"){
				$('.wea4 img').attr('src','lib/images/new-disaster/4.jpg');
			}
			else if(report.type == "锈病"){
				$('.wea4 img').attr('src','lib/images/new-disaster/5.jpg');
			}
			else if(report.type == "虫害"){
				$('.wea4 img').attr('src','lib/images/new-disaster/2.jpg');
			}
			else if(report.type == "正常"){
				$('.wea4 img').attr('src','lib/images/new-disaster/1.jpg');
			}

			// 缺少虫害图片
		});

	};
	$scope.rep();



	// weather-chart
	// $scope.weaC = function(){
	// 	var ctx = $("#myChart").get(0).getContext("2d");
	// 	var myNewChart = new Chart(ctx);
	// 	var data = {
	// 		labels : ["周一","周二","周三","周四","周五","周六","周日"],
	// 		datasets : [
	// 			{
	// 				// 空气温度
	// 				label: "空气温度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#33ccff",
	// 	            borderColor: "#3333ff",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#33ccff",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#33ccff",
	// 	            pointHoverBorderColor: "#3333ff",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [18, 19, 20, 19, 17, 18, 16],
	// 	            spanGaps: false,
	// 			},
	// 			{
	// 				// 土壤温度
	// 				label: "空气温度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#ff9966",
	// 	            borderColor: "#ff6633",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#ff9966",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#ff9966",
	// 	            pointHoverBorderColor: "#ff6633",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [23, 25, 22, 22, 24, 20, 19],
	// 	            spanGaps: false,
	// 			}
	// 		]
	// 	}
	// 	new Chart(ctx, {
	// 	    type:'line',
	// 	    data: data
	// 	});

		
	// };
	// $scope.weaC();


	// chart
	// $scope.chart = function(){
	// 	var ctx1 = $('#chart1').get(0).getContext("2d");
	// 	var myNewChart = new Chart(ctx1);
	// 	var data1 = {
	// 		labels : ["周一","周二","周三","周四","周五","周六","周日"],
	// 		datasets : [
	// 			{
	// 				// 空气温度
	// 				label: "空气温度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#3333ff",
	// 	            borderColor: "#3333ff",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#3333ff",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#3333ff",
	// 	            pointHoverBorderColor: "#3333ff",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [18, 19, 20, 19, 17, 18, 16],
	// 	            spanGaps: false,
	// 			},
	// 			{
	// 				// 土壤温度
	// 				label: "土壤温度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#ff9966",
	// 	            borderColor: "#ff6633",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#ff9966",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#ff9966",
	// 	            pointHoverBorderColor: "#ff6633",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [23, 25, 22, 22, 24, 20, 19],
	// 	            spanGaps: false,
	// 			}
	// 		]
	// 	}
	// 	new Chart(ctx1, {
	// 	    type:'line',
	// 	    data: data1
	// 	});




	// 	var ctx4 = $('#chart4').get(0).getContext("2d");
	// 	var myNewChart = new Chart(ctx4);
	// 	var data4 = {
	// 		labels : ["11.16","11.23","11.30","12.7"],
	// 		datasets : [
	// 			{
	// 				// 空气温度
	// 				label: "空气温度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#3333ff",
	// 	            borderColor: "#3333ff",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#3333ff",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#3333ff",
	// 	            pointHoverBorderColor: "#3333ff",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [18, 19, 20, 19],
	// 	            spanGaps: false,
	// 			},
	// 			{
	// 				// 土壤温度
	// 				label: "土壤温度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#ff9966",
	// 	            borderColor: "#ff6633",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#ff9966",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#ff9966",
	// 	            pointHoverBorderColor: "#ff6633",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [23, 25, 22, 22],
	// 	            spanGaps: false,
	// 			}
	// 		]
	// 	}
	// 	new Chart(ctx4, {
	// 	    type:'bar',
	// 	    data: data4
	// 	});





	// 	var ctx2 = $('#chart2').get(0).getContext("2d");
	// 	var myNewChart = new Chart(ctx2);
	// 	var data2 = {
	// 		labels : ["周一","周二","周三","周四","周五","周六","周日"],
	// 		datasets : [
	// 			{
	// 				// 空气湿度
	// 				label: "空气湿度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#66ddff",
	// 	            borderColor: "#66ddff",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#66ddff",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#66ddff",
	// 	            pointHoverBorderColor: "#66ddff",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [33, 33, 48, 60, 67, 48, 46],
	// 	            spanGaps: false,
	// 			},
	// 			{
	// 				// 土壤湿度
	// 				label: "土壤湿度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#dbdb70",
	// 	            borderColor: "#dbdb70",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#dbdb70",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#dbdb70",
	// 	            pointHoverBorderColor: "#dbdb70",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [27, 31, 42, 32, 34, 20, 19],
	// 	            spanGaps: false,
	// 			}
	// 		]
	// 	}
	// 	new Chart(ctx2, {
	// 	    type:'line',
	// 	    data: data2
	// 	});



	// 	var ctx5 = $('#chart5').get(0).getContext("2d");
	// 	var myNewChart = new Chart(ctx5);
	// 	var data5 = {
	// 		labels : ["11.16","11.23","11.30","12.7"],
	// 		datasets : [
	// 			{
	// 				// 空气湿度
	// 				label: "空气湿度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#66ddff",
	// 	            borderColor: "#66ddff",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#66ddff",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#66ddff",
	// 	            pointHoverBorderColor: "#66ddff",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [18, 19, 20, 19],
	// 	            spanGaps: false,
	// 			},
	// 			{
	// 				// 土壤湿度
	// 				label: "土壤湿度",
	// 	            fill: false,
	// 	            lineTension: 0.1,
	// 	            backgroundColor: "#dbdb70",
	// 	            borderColor: "#dbdb70",
	// 	            borderCapStyle: 'butt',
	// 	            borderDash: [],
	// 	            borderDashOffset: 0.0,
	// 	            borderJoinStyle: 'miter',
	// 	            pointBorderColor: "#dbdb70",
	// 	            pointBackgroundColor: "#fff",
	// 	            pointBorderWidth: 1,
	// 	            pointHoverRadius: 5,
	// 	            pointHoverBackgroundColor: "#dbdb70",
	// 	            pointHoverBorderColor: "#dbdb70",
	// 	            pointHoverBorderWidth: 2,
	// 	            pointRadius: 5,
	// 	            pointHitRadius: 10,
	// 	            data: [23, 25, 22, 22],
	// 	            spanGaps: false,
	// 			}
	// 		]
	// 	}
	// 	new Chart(ctx5, {
	// 	    type:'bar',
	// 	    data: data5
	// 	});




	// 	var ctx3 = $('#chart3').get(0).getContext("2d");
	// 	var myNewChart = new Chart(ctx3);
	// 	var data3 = {
	// 		labels : ["锈病","干旱","冻害","虫害"],
	// 		datasets : [
				
	// 			{
	// 	            data: [20,30,40,10],
	// 			}
	// 		]
	// 	};
	// 	new Chart(ctx3, {
	// 	    type:'polarArea',
	// 	    data: data3
	// 	});





		



	// };


	// $scope.chart();












	// function
	$scope.addUser = function(content){
		$http.post('/addUser',content);
	};
	$scope.deleteUser = function(num){
		$http.post('/deleteUser',num);
	};
	$scope.updateUser = function(content){
		$http.post('/updateUser',content);
		console.log('已经上传');
	};
	$scope.findUser = function(content){
		$http.post('/findUser',content).then(function(data){
			console.log(data);
			return data.data;
		});
	}

	$scope.getTable =function(){
		$("#table").bootstrapTable({
			url: '/getUser',
			toolbar: '#toolbar',
			striped: true, //行间隔色
			cache: false,// 不用缓存
			pagination: true,//分页
			// sortable: true, //排序
			sortOrder: "asc", //排序方式
			sidePagination: "client", //客户端分页
			pageNumber:1,                       //初始化加载第一页，默认第一页
	        pageSize: 10,                       //每页的记录行数（*）
	        pageList: [10],        //可供选择的每页的行数（*）
	        search: true,//客户端搜索
	        strictSearch: true,
	        minimumCountColumns: 2,             //最少允许的列数
	        // height:525,
	        showRefresh: true,  //刷新
	        // showColumns: true,  
	        clickToSelect: true, //启用点击选中行
	        uniqueId: "number",   //每一行的唯一标识，一般为主键列
			columns:[{
				checkbox:true,
			},{
				field:"number",
				title:"编号",
			},{
		        field: 'name',
		        title: '姓名'
		    }, {
		        field: 'auth',
		        title: '权限'
		    },{
		    	field: 'pepperNumber',
		    	title: '藤椒数量'
		    }],
		});

		$("#table-all").bootstrapTable({
			url: '/getUser',
			toolbar: '#toolbar-all',
			striped: true, //行间隔色
			cache: false,// 不用缓存
			pagination: true,//分页
			sortable: false, //排序
			sortOrder: "asc", //排序方式
			sidePagination: "client", //客户端分页
			pageNumber:1,                       //初始化加载第一页，默认第一页
	        pageSize: 10,                       //每页的记录行数（*）
	        pageList: [10],        //可供选择的每页的行数（*）
	        search: true,//客户端搜索
	        strictSearch: true,
	        minimumCountColumns: 2,             //最少允许的列数
	        // height:525,
	        showRefresh: true,  //刷新
	        // showColumns: true,  
	        clickToSelect: true, //启用点击选中行
	        uniqueId: "number",   //每一行的唯一标识，一般为主键列
			columns:[{
				checkbox:true,
			},{
				field:"number",
				title:"编号",
			},{
		        field: 'name',
		        title: '姓名'
		    },{
		        field: 'phone',
		        title: '手机号'
		    },{
		        field: 'password',
		        title: '密码'
		    },{
		        field: 'auth',
		        title: '权限'
		    },{
		        field: 'location',
		        title: '地理位置'
		    },{
		    	field: 'pepperNumber',
		    	title: '藤椒数量'
		    }],
		});



		$("#table-statistics").bootstrapTable({
			url: '/getData',
			// toolbar: '#toolbar-all',
			striped: true, //行间隔色
			cache: false,// 不用缓存
			pagination: true,//分页
			sortable: false, //排序
			sortOrder: "asc", //排序方式
			sidePagination: "client", //客户端分页
			pageNumber:1,                       //初始化加载第一页，默认第一页
	        pageSize: 10,                       //每页的记录行数（*）
	        pageList: [10],        //可供选择的每页的行数（*）
	        search: true,//客户端搜索
	        strictSearch: true,
	        minimumCountColumns: 2,             //最少允许的列数
	        // height:380,
	        showRefresh: true,  //刷新
	        // showColumns: true,  
	        clickToSelect: true, //启用点击选中行
	        uniqueId: "number",   //每一行的唯一标识，一般为主键列
			columns:[{
				field:"date",
				title:"统计日期",
			},{
		        field: 'at',
		        title: '空气温度'
		    },{
		        field: 'ah',
		        title: '空气湿度'
		    },{
		        field: 'st',
		        title: '土壤温度'
		    },{
		        field: 'sh',
		        title: '土壤湿度'
		    },{
		    	field: 'warning',
		    	title: '灾害预警'
		    },{
		    	field: 'degree',
		    	title: '灾害程度'
		    }],
		});

	}

	// sign
	function check_login(){
		var re_pass = /\w{6,30}$/; //包含六个以上三十个以下的大小写字母或者数字
		var pass=$("#password").val();
		var re_phone = /1{1}[0-9]{10}$/; //1开头，共11个数字
		var phone = $("#phone").val();

		var r_phone= phone.match(re_phone);
		var r_pass = pass.match(re_pass);

		var content = {
			"phone" : phone,
		}


		if(r_phone && r_pass){
			$http.post('/findUser',content).then(function(data){
				console.log(data.data);
				var obj = data.data;
				if(!jQuery.isEmptyObject(obj)){
					if(pass == obj[0].password){
						$("#phone").val("").removeClass('input-suc');
					  	$("#password").val("").removeClass('input-suc');
					  	$('.sign').animate({
							"top": "-100%",
						}, 300);
						// alert($('#remember').val());
						if($('#remember').val() == 'on'){
							$scope.username = obj[0].name;
							$cookies.put('userName', obj[0].name);
							$scope.username = $cookies.get('userName');

						}
						else{
							$cookies.remove("userName");
						}
						// alert($cookies.get('userName'));
						window.location.reload();

					}
					else{
						// 摇晃
						$("#login_form").removeClass('shake_effect');  
					  	setTimeout(function(){
					   		$("#login_form").addClass('shake_effect')
					  	},1);
					  	// 提示错误
					  	$("#password").addClass('input-err');
						$('#pass-err').css('display', 'block').html('密码不正确');
						$("#password").removeClass('input-suc');
					}
				}
				else{
					// 摇晃
					$("#login_form").removeClass('shake_effect');  
				  	setTimeout(function(){
				   		$("#login_form").addClass('shake_effect')
				  	},1);
				  	// 提示错误
				  	$("#phone").addClass('input-err');
					$('#phone-err').css('display', 'block').html('用户名不正确');
					$("#phoneword").removeClass('input-suc');
				}
				
				
			});
		}
		else{
			// 摇晃
			$("#login_form").removeClass('shake_effect');  
		  	setTimeout(function(){
		   		$("#login_form").addClass('shake_effect')
		  	},1);
		  	// 提示错误
		}
	}


	function check_register(){
		var re_phone = /1{1}[0-9]{10}$/; //1开头，共11个数字
		var re_name = /[\u4E00-\u9FA5]{2,4}$/; //只含有二到四个汉字
		var re_pass = /\w{6,30}$/;//包含六个以上三十个以下的大小写字母或者数字
		
		var name = $("#r_user_name").val();
		var pass = $("#r_password").val();
		var phone = $("#r_phone").val();
		var r_name = name.match(re_name);
		var r_pass = pass.match(re_pass);
		var r_phone = phone.match(re_phone);

		if(r_phone && r_name && r_pass){
		  	$http.get('/getUser').then(function(data){
				var length = data.data.length;	
				// console.log(length);
				var content = {
					number: length + 1,
					name:name,
					password: pass,
					phone:phone,
					auth:"普通用户",
				};
				var source1 = {
					name:name,
				};
				var source2 = {
					phone:phone,
				};
				var preUser = data.data;
				var result1 = $scope.traverseUser(preUser,source1);
				var result2 = $scope.traverseUser(preUser,source2);
				// console.log(result2);
				if(jQuery.isEmptyObject(result1[0])){
					if(jQuery.isEmptyObject(result2[0])){
						$scope.addUser(content);
						alert("注册成功！");
					  	$("#user_name").val("").removeClass('input-suc');
					  	$("#password").val("").removeClass('input-suc');
					  	$("#r_user_name").val("").removeClass('input-suc');
					  	$("#r_password").val("").removeClass('input-suc');
					  	$("#r_phone").val("").removeClass('input-suc');
					  	$('form').animate({
					        height: 'toggle',
					        opacity: 'toggle'
					    }, 'slow');
					}
					else{
						alert("手机号已经被注册");
					  	$("#r_user_name").removeClass('input-suc');
					  	$("#r_password").removeClass('input-suc');
					  	$("#r_phone").removeClass('input-suc').addClass('input-err');
					}
					
				}
				else{
					alert("用户名已经被注册");
				  	$("#r_user_name").removeClass('input-suc').addClass('input-err');
				  	$("#r_password").removeClass('input-suc');
				  	$("#r_phone").removeClass('input-suc');
				}

			});
		  	
	  	}
	  	else{
	  		// 摇晃
			$("#login_form").removeClass('shake_effect');  
		  	setTimeout(function(){
		   		$("#login_form").addClass('shake_effect')
		  	},1);
		  	// 提示错误
	  	}
		
	}

	$scope.traverseUser = function(collection,source){
		var arr = [];

		var prop = Object.keys(source);
		for(var i = 0; i < collection.length; i++){
			var flag = 1;
			for(var j = 0; j < prop.length; j++){
				if(collection[i].hasOwnProperty(prop[j]) && collection[i][prop[j]] == source[prop[j]]){
					continue;
				}
				else{
					flag = 0;
				}
			}

			if(flag){
				arr.push(collection[i]);
			}
			else{
				continue;
			}
		}


		return arr;
	};





	//SIGN with AUTH and Cookies;
	function auth(){
		var cookie = $cookies.get('userName');
		// alert(cookie);
		var content = {
			name: cookie,
		}
		$http.post("/findUser",content).then(function(data){
			// console.log(data.data);
			var user = data.data[0];
			$(".menu ul li").css('display', 'block');
			// switch(user.auth){
			// 	case "开发权限":
			// 		$(".menu ul li").css('display', 'block');
			// 		break;
			// 	case "管理权限":
			// 		$(".menu ul li:nth-child(1)").css('display', 'block');
			// 		$(".menu ul li:nth-child(3)").css('display', 'block');
			// 		$(".menu ul li:nth-child(4)").css('display', 'block');
			// 		$(".menu ul li:nth-child(6)").css('display', 'block');
			// 		$(".menu ul li:nth-child(7)").css('display', 'block');
			// 		$(".menu ul li:nth-child(8)").css('display', 'block');
			// 		$(".menu ul li:nth-child(9)").css('display', 'block');
			// 		break;
			// 	case "运营权限":
			// 		$(".menu ul li:nth-child(1)").css('display', 'block');
			// 		$(".menu ul li:nth-child(3)").css('display', 'block');
			// 		$(".menu ul li:nth-child(4)").css('display', 'block');
			// 		$(".menu ul li:nth-child(6)").css('display', 'block');
			// 		$(".menu ul li:nth-child(7)").css('display', 'block');
			// 		$(".menu ul li:nth-child(8)").css('display', 'block');
			// 		$(".menu ul li:nth-child(9)").css('display', 'block');
			// 		break;
			// 	case "普通用户":
			// 		$(".menu ul li:nth-child(1)").css('display', 'block');
			// 		$(".menu ul li:nth-child(3)").css('display', 'block');
			// 		$(".menu ul li:nth-child(4)").css('display', 'block');
			// 		$(".menu ul li:nth-child(7)").css('display', 'block');
			// 		$(".menu ul li:nth-child(8)").css('display', 'block');
			// 		$(".menu ul li:nth-child(9)").css('display', 'block');
			// 		break;
			// 	default:
			// 		$(".menu ul li").css('display', 'block');
			// 		break;
			// }

		});
		// alert("asd");
	}



	// Loading Event
	$scope.getTable();
	auth();


	// 加载cookie
	var cookie = $cookies.get('userName');
	if(!cookie){
		$scope.username = '藤椒侠';
		$('.sign').css('top', '0%');
		// alert('没有登录用户，使用默认用户');
	}
	else{
		$scope.username = $cookies.get('userName');
		$('.sign').css('top', '-100%');

		// alert('有名字');
	}
	

		



	// Change Event
	$('#phone').change(function(event) {
		/* Act on the event */
		var re_phone = /1{1}[0-9]{10}$/; //1开头，共11个数字
		var phone = $(this).val();
		var r_phone= phone.match(re_phone);
		if(r_phone){
			$(this).removeClass('input-err');
			$('#phone-err').css('display', 'none');
			$(this).addClass('input-suc');
		}
		else{
			// 摇晃
			$("#login_form").removeClass('shake_effect');  
		  	setTimeout(function(){
		   		$("#login_form").addClass('shake_effect')
		  	},1);
		  	// 提示错误
			$(this).addClass('input-err');
			$('#phone-err').css('display', 'block');
			$(this).removeClass('input-suc');
		}

	});

	$('#password').change(function(event) {
		/* Act on the event */
		var re_pass = /\w{6,30}$/; //包含六个以上三十个以下的大小写字母或者数字
		var pass = $("#password").val();
		var r_pass = pass.match(re_pass);
		if(r_pass){
			$(this).removeClass('input-err');
			$('#pass-err').css('display', 'none');
			$(this).addClass('input-suc');
		}
		else{
			// 摇晃
			$("#login_form").removeClass('shake_effect');  
		  	setTimeout(function(){
		   		$("#login_form").addClass('shake_effect')
		  	},1);
		  	// 提示错误
			$(this).addClass('input-err');
			$('#pass-err').css('display', 'block').html('密码由六个以上三十个以下字母与数字构成，请正确填写');
			$(this).removeClass('input-suc');
		}


		
	});


	$('#r_user_name').change(function(event) {
		/* Act on the event */
		var re_name = /[\u4E00-\u9FA5]{2,4}$/; //只含有二到四个汉字
		var name = $(this).val();
		var r_name = name.match(re_name);
		if(r_name){
			$(this).removeClass('input-err');
			$('#r-name-err').css('display', 'none');
			$(this).addClass('input-suc');
		}
		else{
			// 摇晃
			$("#login_form").removeClass('shake_effect');  
		  	setTimeout(function(){
		   		$("#login_form").addClass('shake_effect')
		  	},1);
		  	// 提示错误
			$(this).addClass('input-err');
			$('#r-name-err').css('display', 'block');
			$(this).removeClass('input-suc');
		}

	});


	$('#r_password').change(function(event) {
		/* Act on the event */
		var re_pass = /\w{6,30}$/; //包含六个以上三十个以下的大小写字母或者数字
		var pass = $(this).val();
		var r_pass = pass.match(re_pass);
		if(r_pass){
			$(this).removeClass('input-err');
			$('#r-pass-err').css('display', 'none');
			$(this).addClass('input-suc');
		}
		else{
			// 摇晃
			$("#login_form").removeClass('shake_effect');  
		  	setTimeout(function(){
		   		$("#login_form").addClass('shake_effect')
		  	},1);
		  	// 提示错误
			$(this).addClass('input-err');
			$('#r-pass-err').css('display', 'block');
			$(this).removeClass('input-suc');
		}

	});



	$('#r_phone').change(function(event) {
		/* Act on the event */
		var re_phone = /1{1}[0-9]{10}$/; //1开头，共11个数字
		var phone = $(this).val();
		var r_phone = phone.match(re_phone);
		if(r_phone){
			$(this).removeClass('input-err');
			$('#r-phone-err').css('display', 'none');
			$(this).addClass('input-suc');
		}
		else{
			// 摇晃
			$("#login_form").removeClass('shake_effect');  
		  	setTimeout(function(){
		   		$("#login_form").addClass('shake_effect')
		  	},1);
		  	// 提示错误
			$(this).addClass('input-err');
			$('#r-phone-err').css('display', 'block');
			$(this).removeClass('input-suc');
		}

	});









	// Click Event	
		// chart toggle

	var flag = 0;
	$('.chart').click(function() {
		/* Stuff to do every *odd* time the element is clicked */
		if( flag == 0){
			$('.chart').css('display', 'none');
			$(this).css('display','block').animate({
				'left':'25px',
				'top':'25px',
				'width':'800px',
				'height':'500px',
			}, 200);
			$('.chart-bar').animate({
				'margin-top':'70px'}, 200);
			$('.chart p').css('display', 'block');
			$('.invisible-chart').css('display', 'block');
			$('.chart-bar h1').css('display', 'block');



			flag = 1;
		}
		else{
			flag = 0;
		}
		
	});

	$('.chart p').click(function(event) {
		/* Act on the event */
		if( flag == 1){
			$('.chart').css('display', 'block');
			var left;
			var top;
			if($(this).attr('name') == 'c1'){
				left = '25px';
				top = '25px';
			}
			else if($(this).attr('name') == 'c2'){
				left = '430px';
				top = '25px';
			}
			else if($(this).attr('name') == 'c3'){
				left = '25px';
				top = '280px';
			}
			else if($(this).attr('name') == 'c4'){
				left = '430px';
				top = '280px';
			}
			$(this).parent('div').css('display','block').animate({
				'top':top,
				'left':left,
				'width':'395px',
				'height':'245px',
			}, 200);
			$('.chart-bar').animate({
				'margin-top':'0px'}, 200);

			$('.chart p').css('display', 'none');
			$('.invisible-chart').css('display', 'none');
			$('.chart-bar h1').css('display', 'none');


			flag = 1;
		}

	
	});




	
	
		
	





		// sign click
	$("#create").click(function(){
		check_register();
		return false;
	});

	$("#login").click(function(){
		check_login();
		return false;
	});
	$('.message a').click(function () {
	    $('form').animate({
	        height: 'toggle',
	        opacity: 'toggle'
	    }, 'slow');
	});

		// table click
	$('#addUser').click(function(event) {
		/* Act on the event */
		$http.get('/getUser').then(function(data){
			var length = data.data.length;	
			console.log(length);
			var content = {
				number: length + 1,
				name:$('#add-name').val(),
				phone:$('#add-phone').val(),
				auth:$('#add-auth').val(),
				pepperNumber:$('#add-pepperNumber').val(),
			};
			console.log(content);
			$scope.addUser(content);
		});
		$('#addModal').modal('hide');
		window.location.reload();
		// alert($('#add-auth').val());
	});

	$('#addUser-all').click(function(event) {
		/* Act on the event */
		$http.get('/getUser').then(function(data){
			var length = data.data.length;	
			console.log(length);
			var content = {
				number: length + 1,
				name:$('#add-name-all').val(),
				phone:$('#add-phone-all').val(),
				password:$('#add-password-all').val(),
				auth:$('#add-auth-all').val(),
				location:$('#add-location-all').val(),
				pepperNumber:$('#add-pepperNumber-all').val(),
			};
			// alert(content.password);
			// console.log(content);
			$scope.addUser(content);
			// alert("添加用户成功");
		});
		$('#addModal-all').modal('hide');
		window.location.reload();
		// alert($('#add-auth').val());
		// $scope.getTable();
		// $("#table-all").bootstrapTable("refresh",{
		// 	url:"/getUser"
		// });
	});


	$('#btn_delete').click(function(event) {
		/* Act on the event */
		// alert('123');
		var list=[];
		var k =0;
		$('input:checkbox:checked').each(function(index, el){
			list[k] = $(this).parent().parent().children(':nth-child(3)').text();
			DELETE_LIST[k] = $(this).parent().parent().children(':nth-child(2)').text();
			k++;

		});
		$('#deleteText').html("<span class='deleteTextSpan'>是否删除用户：</span>"+list);
	});

	$('#btn_delete-all').click(function(event) {
		/* Act on the event */
		// alert('123');
		var list=[];
		var k =0;
		$('input:checkbox:checked').each(function(index, el){
			list[k] = $(this).parent().parent().children(':nth-child(3)').text();
			DELETE_LIST[k] = $(this).parent().parent().children(':nth-child(2)').text();
			k++;

		});
		$('#deleteText-all').html("<span class='deleteTextSpan'>是否删除用户：</span>" + list);
	});

	$('#deleteUser').click(function(event) {
		/* Act on the event */
		var content;
		for(k in DELETE_LIST){
			content = {"number": DELETE_LIST[k]};
			$http.post('/deleteUser',content);
		}
		$('#deleteModal').modal('hide');
		window.location.reload();
	});

	$('#deleteUser-all').click(function(event) {
		/* Act on the event */
		var content;
		for(k in DELETE_LIST){
			content = {"number": DELETE_LIST[k]};
			$http.post('/deleteUser',content);
		}
		$('#deleteModal-all').modal('hide');
		window.location.reload();
	});
	
	// 修改
	$('#btn_update').click(function(event) {
		/* Act on the event */
		
		console.log($('input:checkbox:checked').length);
		if($('input:checkbox:checked').length == 1){
			var info = {
				"name" : $('input:checkbox:checked').parent().parent().children(':nth-child(3)').text(),
				// "number" : $('input:checkbox:checked').parent().parent().children(':nth-child(2)').text(),
				"auth" : $('input:checkbox:checked').parent().parent().children(':nth-child(4)').text(),
				"pepperNumber" : $('input:checkbox:checked').parent().parent().children(':nth-child(5)').text(),
			};
			console.log(info.name);
			$('#update-name').val(info.name);
			// $('#update-number').attr('value',info.number);
			$('#update-auth').attr('value',info.auth);
			$('#update-pepperNumber').attr('value',info.pepperNumber);
		}
		else{
			alert('一次只能修改一位用户的信息，请您重新勾选用户');
		}
	});

	$('#btn_update-all').click(function(event) {
		/* Act on the event */
		
		console.log($('input:checkbox:checked').length);
		if($('input:checkbox:checked').length == 1){
			var info = {
				"name" : $('input:checkbox:checked').parent().parent().children(':nth-child(3)').text(),
				"phone" : $('input:checkbox:checked').parent().parent().children(':nth-child(4)').text(),
				"pass" : $('input:checkbox:checked').parent().parent().children(':nth-child(5)').text(),
				"auth" : $('input:checkbox:checked').parent().parent().children(':nth-child(6)').text(),
				"location" : $('input:checkbox:checked').parent().parent().children(':nth-child(7)').text(),
				"pepperNumber" : $('input:checkbox:checked').parent().parent().children(':nth-child(8)').text(),
			};

			// console.log(info.name);
			$('#update-name-all').val(info.name);
			$('#update-phone-all').val(info.phone);
			$('#update-pass-all').val(info.pass);
			$('#update-auth-all').val(info.auth);
			$('#update-location-all').val(info.location);
			$('#update-pepperNumber-all').val(info.pepperNumber);
		}
		else{
			alert('一次只能修改一位用户的信息，请您重新勾选用户');

		}
	});


	$('#updateUser').click(function(event) {
		/* Act on the event */
		var content = {
			"number": $('input:checkbox:checked').parent().parent().children(':nth-child(2)').text(),
			"body":{
				"name" : $('#update-name').val(),
				"auth":$('#update-auth').val(),
				"pepperNumber":$('#update-pepperNumber').val(),
			}
		};
		console.log(content);
		$scope.updateUser(content);
		$('#updateModal').modal('hide');
		window.location.reload();
	});

	$('#updateUser-all').click(function(event) {
		/* Act on the event */
		var content = {
			"number": $('input:checkbox:checked').parent().parent().children(':nth-child(2)').text(),
			"body":{
				"name" : $('#update-name-all').val(),
				"phone" : $('#update-phone-all').val(),
				"password" : $('#update-pass-all').val(),
				"auth" : $('#update-auth-all').val(),
				"location" : $('#update-location-all').val(),
				"pepperNumber":$('#update-pepperNumber-all').val(),
			}
		};
		console.log(content);
		$scope.updateUser(content);
		$('#updateModal-all').modal('hide');
		window.location.reload();
	});


	$('#signout').click(function(event) {
		/* Act on the event */
		$('.sign').animate({
			"top": "0%",
		}, 300);
		$cookies.remove("userName");


			
	});



	// 






	// 个人信息读取
	$scope.userOne = function(){
		var url = '/findUser';
		var name = $scope.username;
		var data = {
			name: String,
		}
		data.name = name;
		if(name!= null){
			$http.post(url,data).then(function(data){
				// console.log(data.data[0]);
				var info  = data.data[0];
				$scope.name = info.name;
				$scope.auth = info.auth;
				$scope.phone = info.phone;
				$scope.password = info.password;
				$scope.location = info.location;
				$scope.pepperNumber = info.pepperNumber;

				// 更新用
				$scope.number = info.number;
			});


			
		}
		else{
			console.log(name);
		}

	};

	$scope.userOne();


	// 个人信息修改
	$scope.userUpdate = function(){
		var url = '/updateUser';
		var num = $scope.number;
		var data = {
			"number" : num,
			"body" : {
				"name" : $('#b7-name').val(),
				"auth" : $('#b7-auth').val(),
				"phone": $('#b7-phone').val(),
				"password": $('#b7-password').val(),
				"location": $('#b7-location').val(),
				"pepperNumber": $('#b7-pepperNumber').val(),
			}
		};

		if($scope.number != null){
			$scope.updateUser(data);
			console.log(data);
		}
		else{
			console.log('$scope.number = null');
		}


	};


	var b7_flag = 0;
	$('#b7-update').click(function(event) {
		/* Act on the event */
		if(b7_flag == 0){

			$(this).removeClass('btn-warning').addClass('btn-success').text('确认修改');
			b7_flag = 1;
			$('#user-one input')
			.removeAttr('disabled');
			
		}
		else{
			$scope.userUpdate();
			$cookies.remove("userName");
			$(this).removeClass('btn-success').addClass('btn-warning').text('修改');
			b7_flag = 0;
			$('#user-one input').attr('disabled','disabled');
			alert("修改成功");
			window.location.reload();

		}

	});


}]);

