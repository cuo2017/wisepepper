var USER_LENGTH = 0;
var DELETE_LIST = [];

var wp = angular.module('wp',['ngCookies']);

wp.controller('wpController',['$scope','$http','$cookies','$cookieStore',function($scope, $http,$cookies,$cookieStore){
	// define
	// var LOGIN_NAME_SUC = 0;
	// var LOGIN_PASS_SUC = 0;

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
			$scope.username = '没名字';
			alert('没名字');
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


}]);

