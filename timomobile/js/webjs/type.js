
// var appurl = 'http://192.168.3.4:8081';  //这个删除
$(function () {
	var userId = GetQueryString("userid");
	var gradesList = {};
	var gradesitemPhoto = [];
	var token = GetQueryString("token");


	//获取所有有效的科目简要信息 科目 足球 7个科目信息
	getallItemInfo();

	//点击 通过科目id查询科目的评级说明
	//fenItemList(1); //默认显示第一个
	
	$('.fenItem').click(function (e) {
		var index = $(this).index();
		console.log(index);
		$('.itemImg').css({'background-color':'#fff','border-radius':'50%'});
		$('.itemImg').eq(index).css({'background-color':'#ececec','border-radius':'50%'});
		var itemId = $(this).attr('data-itemId');
		var itemName = $(this).attr('data-itemName');
		console.log(itemId)
		console.log(itemName)
        itemGradeInfoByItemIdb(itemId,itemName); //默认显示第一个
        
	})

});



/*
获取所有有效的科目简要信息
*/

function getallItemInfo() {
	$.ajax({
		type: 'get',
		url: appurl + "/v1/itemGrade/get/allItemInfo",
		data: {},
		dataType: "json",
		async: false,
		success: function (res) {
			// console.log(res);
			if (res.code == '10000') {

				var dataHtmls = [];
				var data_responses = res.response;

				if (data_responses == null || data_responses.length == 0)
					return;

				for (var i = 0; i < data_responses.length; i++) {
					dataHtmls.push("<div id='itemGradeInfoByItemIda'  class='fenItem'  data-itemId=" + data_responses[i].itemId +" data-itemName = "+data_responses[i].itemName+">");
					if(i == 0){
						dataHtmls.push("<image class='itemImg' style=\"background-color:#ececec;border-radius:50%\" src='" + data_responses[i].itemPhotoAddress + "'></image>");
					}else{
						dataHtmls.push("<image class='itemImg' src='" + data_responses[i].itemPhotoAddress + "'></image>");
					}
					dataHtmls.push("<span class='c-zuqiu'>" + data_responses[i].itemName + "</span>");
					dataHtmls.push("</div>");

				}
				$('.fenItem').eq(0).css("background-color","#ccc");
				itemGradeInfoByItemIdb(data_responses[0].itemId,data_responses[0].itemName); //默认显示第一个
				$(".fenBox").html(dataHtmls.join(""));
			}

		},
		error: function (data) {
			console.log("请求失败，服务器错误")
		}
	})
}


//请求接口 接口名字是，通过科目id查询科目的评级说明
function itemGradeInfoByItemIdb(itemId,itemName) {
	//console.log('02 请求接口 接口名字是，通过科目id查询科目的评级说明');
	$.ajax({
		type: 'get',
		url: appurl + "/v1/itemGrade/get/itemGradeInfoByItemId",
		data: {
			itemId: itemId
		},
		dataType: "json",
		async: false,
		success: function (res) {

			if (res.code == '10000') {
				var dataHtmlsa = [];
				var data_responses = res.response;
				// console.log(data_responses);
				if (data_responses == null || data_responses.length == 0)
					return;
				//项目ID itemId  科目id  itemId 
				// itemGrade 参与项目能力级别 1、2、3、4、5、6 
				for (var i = 0; i < data_responses.length; i++) {
					dataHtmlsa.push("<div id='explain' style='clearfloat'><div class='iLblock-biaoti'>L" + data_responses[i].itemGrade + "-" + itemName + "</div>" + "<div class='iLblock-section'>" + data_responses[i].gradeInfo + "</div></div>");
				}
				$("#itemsLo_info_data2").html(dataHtmlsa.join(""));

			}
		},
		error: function (data) {
			console.log("请求失败，服务器错误")
		}
	})
}
