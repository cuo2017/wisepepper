// 百度地图API功能
var center = new BMap.Point(104.862946,31.333467);//伍佰村
var city = new BMap.Point(105.06,31.10);//三台

map.centerAndZoom(center,11);	//初始化地图，设置中心点坐标和地图级别 
map.enableScrollWheelZoom(true); //滚轮滑动

map.addControl(new BMap.NavigationControl());    
map.addControl(new BMap.ScaleControl());    
map.addControl(new BMap.OverviewMapControl());    //添加控件系列

var marker = new BMap.Marker(center);
var marker2 = new BMap.Marker(city);

map.addOverlay(marker);
map.addOverlay(marker2);

marker.addEventListener("click",function(){
	var opts = {
		width: 250,
		height: 100,
		title: "五佰村藤椒基地"
	}
	var content = "智慧藤椒系统使用基地";
	var infoWindow = new BMap.InfoWindow(content,opts);
	map.openInfoWindow(infoWindow,center);
});


marker2.addEventListener("click",function(){
	var opts = {
		width: 250,
		height: 100,
		title: "三台县"
	}
	var content = "基地所在县";
	var infoWindow = new BMap.InfoWindow(content,opts);
	map.openInfoWindow(infoWindow,city);
});