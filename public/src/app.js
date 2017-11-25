var USER_LENGTH = 0;
var DELETE_LIST = [];

var wp = angular.module('wp',['ngCookies']);

wp.controller('wpController',['$scope','$http','$cookies','$cookieStore',function($scope, $http,$cookies,$cookieStore){
	// define
	// var LOGIN_NAME_SUC = 0;
	// var LOGIN_PASS_SUC = 0;

	var WEA1;
	//api:https://api.seniverse.com/v3/weather/now.json?key=5dj6pbdppzrc72kp&location=chengdu&language=zh-Hans&unit=c


	// -weather--report-
	$scope.wea = function(){
		


		// var api = 'https://api.seniverse.com/v3/weather/now.json?key=5dj6pbdppzrc72kp&location=chengdu&language=zh-Hans&unit=c';
		// $http.get(api).then(function(data){
		// 		var length = data.data.length;	
		// 		console.log(length);
		// });

		//weather:http://www.weather.com.cn/data/sk/101010100.html
		// 雅虎yql：雅虎提供的jsonp代理，用以解决jsonp获取json格式数据的数据格式问题。
	  	$.ajax({    
	        url: 'http://query.yahooapis.com/v1/public/yql',    
	        dataType: 'jsonp',    
	        data: {    
	            q: "select * from json where url=\"http://www.weather.com.cn/data/cityinfo/101270402.html\"",    
	            format: "json"    
	        },    
	        success: function (data) { 
	           	var cityName = JSON.stringify(data.query.results.weatherinfo.city);//远程json数据放在query.results下 
	           	cityName = cityName.replace(/\"/g,"");
	           	var weather = JSON.stringify(data.query.results.weatherinfo.weather);
	           	weather = weather.replace(/\"/g,"");//正则去掉双引号
				// moment.locale('zh-cn');
	           	// date = moment(date).format('LLLL');

	           	var temp1 = JSON.stringify(data.query.results.weatherinfo.temp1);
	           	temp1 = temp1.replace(/\"/g,"") ;
	           	var temp2 = JSON.stringify(data.query.results.weatherinfo.temp2);
	           	temp2 = temp2.replace(/\"/g,"") ;
	           	var ptime = JSON.stringify(data.query.results.weatherinfo.ptime);
	           	ptime = ptime.replace(/\"/g,"");
	           	
	           	console.log(JSON.stringify(data));

	           	$('#location').text(cityName);
	           	$('#temp1').text(temp1);
	           	$('#temp2').text(temp2);
	           	$('#ptime').text(ptime);
	           	$('#weather').text(weather);
	           	
	           	// lib/images/wea/snowy.png
	           	$('.wea1 img').attr('src','lib/images/wea/cloudy.png');

	        }    
	    }); 
       
      

	};
	$scope.wea();


	// weather-chart
	$scope.weaC = function(){
		var ctx = $("#myChart").get(0).getContext("2d");
		var myNewChart = new Chart(ctx);
		var data = {
			labels : ["周一","周二","周三","周四","周五","周六","周日"],
			datasets : [
				{
					// 空气温度
					label: "空气温度",
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
		            data: [18, 19, 20, 19, 17, 18, 16],
		            spanGaps: false,
				},
				{
					// 土壤温度
					label: "空气温度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#ff9966",
		            borderColor: "#ff6633",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#ff9966",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#ff9966",
		            pointHoverBorderColor: "#ff6633",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [23, 25, 22, 22, 24, 20, 19],
		            spanGaps: false,
				}
			]
		}
		new Chart(ctx, {
		    type:'line',
		    data: data
		});

		
	};
	$scope.weaC();


	// chart
	$scope.chart = function(){
		var ctx1 = $('#chart1').get(0).getContext("2d");
		var myNewChart = new Chart(ctx1);
		var data1 = {
			labels : ["周一","周二","周三","周四","周五","周六","周日"],
			datasets : [
				{
					// 空气温度
					label: "空气温度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#3333ff",
		            borderColor: "#3333ff",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#3333ff",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#3333ff",
		            pointHoverBorderColor: "#3333ff",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [18, 19, 20, 19, 17, 18, 16],
		            spanGaps: false,
				},
				{
					// 土壤温度
					label: "土壤温度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#ff9966",
		            borderColor: "#ff6633",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#ff9966",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#ff9966",
		            pointHoverBorderColor: "#ff6633",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [23, 25, 22, 22, 24, 20, 19],
		            spanGaps: false,
				}
			]
		}
		new Chart(ctx1, {
		    type:'line',
		    data: data1
		});




		var ctx4 = $('#chart4').get(0).getContext("2d");
		var myNewChart = new Chart(ctx4);
		var data4 = {
			labels : ["11.16","11.23","11.30","12.7"],
			datasets : [
				{
					// 空气温度
					label: "空气温度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#3333ff",
		            borderColor: "#3333ff",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#3333ff",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#3333ff",
		            pointHoverBorderColor: "#3333ff",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [18, 19, 20, 19],
		            spanGaps: false,
				},
				{
					// 土壤温度
					label: "土壤温度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#ff9966",
		            borderColor: "#ff6633",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#ff9966",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#ff9966",
		            pointHoverBorderColor: "#ff6633",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [23, 25, 22, 22],
		            spanGaps: false,
				}
			]
		}
		new Chart(ctx4, {
		    type:'bar',
		    data: data4
		});





		var ctx2 = $('#chart2').get(0).getContext("2d");
		var myNewChart = new Chart(ctx2);
		var data2 = {
			labels : ["周一","周二","周三","周四","周五","周六","周日"],
			datasets : [
				{
					// 空气湿度
					label: "空气湿度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#66ddff",
		            borderColor: "#66ddff",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#66ddff",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#66ddff",
		            pointHoverBorderColor: "#66ddff",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [33, 33, 48, 60, 67, 48, 46],
		            spanGaps: false,
				},
				{
					// 土壤湿度
					label: "土壤湿度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#dbdb70",
		            borderColor: "#dbdb70",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#dbdb70",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#dbdb70",
		            pointHoverBorderColor: "#dbdb70",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [27, 31, 42, 32, 34, 20, 19],
		            spanGaps: false,
				}
			]
		}
		new Chart(ctx2, {
		    type:'line',
		    data: data2
		});



		var ctx5 = $('#chart5').get(0).getContext("2d");
		var myNewChart = new Chart(ctx5);
		var data5 = {
			labels : ["11.16","11.23","11.30","12.7"],
			datasets : [
				{
					// 空气湿度
					label: "空气湿度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#66ddff",
		            borderColor: "#66ddff",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#66ddff",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#66ddff",
		            pointHoverBorderColor: "#66ddff",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [18, 19, 20, 19],
		            spanGaps: false,
				},
				{
					// 土壤湿度
					label: "土壤湿度",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "#dbdb70",
		            borderColor: "#dbdb70",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#dbdb70",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#dbdb70",
		            pointHoverBorderColor: "#dbdb70",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
		            data: [23, 25, 22, 22],
		            spanGaps: false,
				}
			]
		}
		new Chart(ctx5, {
		    type:'bar',
		    data: data5
		});




		var ctx3 = $('#chart3').get(0).getContext("2d");
		var myNewChart = new Chart(ctx3);
		var data3 = {
			labels : ["锈病","干旱","冻害","虫害"],
			datasets : [
				
				{
		            data: [20,30,40,10],
				}
			]
		};
		new Chart(ctx3, {
		    type:'polarArea',
		    data: data3
		});





		



	};


	$scope.chart();












	// function
	$scope.addUser = function(content){
		$http.post('/addUser',content);
	};
	$scope.deleteUser = function(num){
		$http.post('/deleteUser',num);
	};
	$scope.updateUser = function(content){
		$http.post('/updateUser',content);
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
	        // pageSize: 10,                       //每页的记录行数（*）
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
	        height:525,
	        showRefresh: true,  //刷新
	        // showColumns: true,  
	        clickToSelect: true, //启用点击选中行
	        uniqueId: "number",   //每一行的唯一标识，一般为主键列
			columns:[{
				field:"date",
				title:"日期",
			},{
		        field: 'name',
		        title: '姓名'
		    },{
		        field: 'data.airTem',
		        title: '空气温度'
		    },{
		        field: 'data.airHum',
		        title: '空气湿度'
		    },{
		        field: 'data.soilTem',
		        title: '土壤温度'
		    },{
		        field: 'data.soilHum',
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
				var obj = data.data
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
				console.log(content);
				$scope.addUser(content);
			});
		  	alert("注册成功！");
		  	$("#user_name").val("").removeClass('input-suc');
		  	$("#password").val("").removeClass('input-suc');
		  	$("#r_user_name").val("").removeClass('input-suc');
		  	$("#r_password").val("").removeClass('input-suc');
		  	$("#r_phone").val("").removeClass('input-suc');
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









	// Loading Event
	$scope.getTable();

		// 加载cookie
		var cookie = $cookies.get('userName');
		if(!cookie){
			$scope.username = '藤椒侠';
			alert('没有登录用户，使用默认用户');
		}
		else{
			$scope.username = $cookies.get('userName');
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
				'width':'100%',
				'height':'100%',
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
			$(this).parent('div').css('display','block').animate({
				'width':'490px',
				'height':'275px',
			}, 200);
			$('.chart-bar').animate({
				'margin-top':'0px'}, 200);

			$('.chart p').css('display', 'none');
			$('.invisible-chart').css('display', 'none');
			$('.chart-bar h1').css('display', 'none');


			flag = 1;
		}

	
	});
	
	
		// menu click
	$(function(){

		$('.menu ul li').click(function(event) {
			/* Act on the event */
			$('.menu ul li').children('a').css({
				"color":"#666",
			}).hover(function() {
				/* Stuff to do when the mouse enters the element */
				$(this).css('color', '#3c763d');
			}, function() {
				/* Stuff to do when the mouse leaves the element */
				$(this).css('color', '#666');
			});
			$('.menu ul li').css('border', 'none');
			$(this).children('a').css({
				"color":"#3c763d"
			}).hover(function() {
				/* Stuff to do when the mouse enters the element */
				$(this).css('color', '#3c763d');
			}, function() {
				/* Stuff to do when the mouse leaves the element */
				$(this).css('color', '#3c763d');
			});
			$(this).css('border-bottom', '2px solid #3c763d');
		});
		$('.menu ul li:nth-child(1)').click(function(event) {
			/* Act on the event */
			$('.board').hide();
			$('#board1').show();
		});
		$('.menu ul li:nth-child(3)').click(function(event) {
			/* Act on the event */
			$('.board').hide();
			$('#board3').show();
		});
		$('.menu ul li:nth-child(4)').click(function(event) {
			/* Act on the event */
			$('.board').hide();
			$('#board4').show();
		});
		$('.menu ul li:nth-child(5)').click(function(event) {
			/* Act on the event */
			$('.board').hide();
			$('#board5').show();
		});
		$('.menu ul li:nth-child(6)').click(function(event) {
			/* Act on the event */
			$('.board').hide();
			$('#board6').show();
		});
		$('.menu ul li:nth-child(7)').click(function(event) {
			/* Act on the event */
			$('.board').hide();
			$('#board7').show();
		});
		
	})
	





		// sign click
	$("#create").click(function(){
		check_register();
		return false;
	})
	$("#login").click(function(){
		check_login();
		return false;
	})
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
			console.log(content);
			$scope.addUser(content);
		});
		$('#addModal-all').modal('hide');
		window.location.reload();
		// alert($('#add-auth').val());
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
			
	});



	// 天气信息


}]);

