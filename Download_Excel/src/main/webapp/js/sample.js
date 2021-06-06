$(document).ready(function(){
	/*$(".nav-tabs a").click(function(){
		$(this).tab('show');
	  });*/
	//$("#startdate").datepicker();
	//$("#enddate").datepicker();
	sessionStorage.clear();
	$('#reset').click(function(){
		$('#projectname,#description').val("");
		$('.error-description,.error-projectname').html('');
		$("#projectname").focus();
	});
	$('#datereset').click(function(){
		$('#startdate,#enddate').val("");
		$('.error-startdate,.error-enddate,.error-nodate').html('');
	});
	$('#work_data,#excel_data').click(function(){
		$('#startdate,#enddate,#getdate').val("");
		$('#projectname,#description').val("");
		$('.error-description,.error-projectname').html('');
		$('.error-startdate,.error-enddate,.error-nodate').html('');
	});
	$('#button').click(function(){
		var res = formValid();
		console.log('gokul :'+res);
		if(res == true){
			//console.log('lavanya :');
			var projectName = $('#projectname').val();
			var desc = $('#description').val();
			var hour = $('#hours option:selected').val();
			var date = $('#getdate').val();
			var d = "";
			if(date != ""){
				d = date.split("/")[2]+"/"+date.split("/")[1]+"/"+date.split("/")[0];			
			}
			console.log('lavanya :'+date);
			console.log('lavanya1 :'+d);
			var request = {"projectName":projectName,"desc":desc,"hour":hour,"date":d};
			console.log('lavanya :'+JSON.stringify(request));
			$.ajax({
				type:"post",
				data:"jsonobj="+JSON.stringify(request),
				dataType:"JSON",
				url:"AjaxController1",
				success:function(successData,status,xhr){
					//console.log("success :"+successData.message);
					//alert(data.message);     
					if(successData.status == "1"){
						//$('#input').hide();
						  $('.success-message').html('').html('<div class="alert alert-success"><strong>Record inserted successfully!</strong></div>');
						  $('#projectname,#description,#getdate').val("");
						  $(".success-message").fadeOut(1000);
					}
					//$('#result').html("Hello "+successData.message+"...!!");
				},
				error:function(errorData){
					console.log("failure"+errorData);
				}
			});
		}else{
			console.log('Abinaya :');
		}
		/*$.ajax({
			type:"post",
			data:"jsonobj="+JSON.stringify(request),
			dataType:"JSON",
			url:"AjaxController",
			success:function(successData,status,xhr){
				console.log("success :"+successData.message);
				//alert(data.message);     
				if(successData.status == "1"){
					$('#input').hide();
				}
				$('#result').html("Hello "+successData.message+"...!!");
			},
			error:function(errorData){
				console.log("failure"+errorData);
			}
		});*/
	});
	$('#download').click(function(){
		var d1 = $('#startdate').val();
		var d2 = $('#enddate').val();
		console.log("startDate :"+d1);
		console.log("endDate :"+d2);
		var FromDt = moment(d1,"DD/MM/YYYY").startOf('hour').startOf('minute').startOf('second');
		var ToDt = moment(d2,"DD/MM/YYYY").startOf('hour').startOf('minute').startOf('second');
		var Expdate = moment(FromDt,"DD/MM/YYYY").add("30",'d');
		Expdate =  moment(Expdate,"DD/MM/YYYY").startOf('hour').startOf('minute').startOf('second');
		var date1 = d1.split('/');
		var date2 = d2.split('/');
		var fd = date1[1]+"-"+date1[0]+"-"+date1[2];
		var td = date2[1]+"-"+date2[0]+"-"+date2[2];
		var regExp = /(\d{1,2})\-(\d{1,2})\-(\d{2,4})/;
		
		d1 = fd.replace(regExp,"$3$1$2");
		d2 = td.replace(regExp,"$3$1$2");
		console.log("startDate1 :"+fd);
		console.log("endDate1 :"+td);
		console.log("ToDt :"+ToDt);
		console.log("Expdate :"+Expdate);
		if($('#startdate').val() == "" && $('#enddate').val() == ""){
			$('.error-nodate').html('').html('<span class="error text-danger">Please select <strong>date!</strong></span>');
			return false;
		}else if($('#startdate').val() == "" && $('#enddate').val() != ""){
			$('.error-nodate').html('');
			$('.error-enddate').html('');
			$('.error-startdate').html('').html('<span class="error text-danger">Please select <strong>from date!</strong></span>');
			return false;
		}else if($('#enddate').val() == "" && $('#startdate').val() != ""){
			$('.error-nodate').html('');
			$('.error-startdate').html('');
			$('.error-enddate').html('').html('<span class="error text-danger">Please select <strong>to date!</strong></span>');
			return false;
		}else if(d1>d2){
			$('.error-nodate').html('').html('<span class="error text-danger">From date should not be less than To date!</span>');
			return false;
		}else if(ToDt>Expdate){
			$('.error-nodate').html('').html('<span class="error text-danger">Duration should be one month!</span>');
			return false;
		}else{
			$('.error-nodate').html('');
			$('.error-startdate').html('');
			$('.error-enddate').html('');
			//window.history.forward();
			//window.open("excelreport.jsp");
			//window.sessionStorage();
			$('#startvalue').val($('#startdate').val());
			$('#endvalue').val($('#enddate').val());
			sessionStorage.clear();
			sessionStorage.setItem("startingdate", $('#startdate').val());
			sessionStorage.setItem("endingdate", $('#enddate').val());
			$("#exceldata").submit();
			$('#startdate,#enddate').val("");
			return true;
		}
	});
	function formValid(){
		var projectName = $('#projectname').val();
		var desc = $('#description').val();
		var hour = $('#hours option:selected').val();
		//console.log("hour :"+hour);
		if(projectName == "" && desc == "" && hour == ""){
			$('.error-projectname').html('').html('<span class="error text-danger">Please enter <strong>project name!</strong></span>');
			$('.error-description').html('').html('<span class="error text-danger">Please enter <strong>project description!</strong></span>');
			$('.error-hour').html('').html('<span class="error text-danger">Please select <strong>hours!</strong></span>');
			$("#projectname").focus();
			return false;
		}
		/*else if(projectName == "" && desc != ""){
			$('.error-description').html('');
			$('.error-projectname').html('').html('<span class="error text-danger">Please enter <strong>project name!</strong></span>');
			return false;
		}else if(desc == "" && projectName != ""){
			$('.error-projectname').html('');
			$('.error-description').html('').html('<span class="error text-danger">Please enter <strong>project description!</strong></span>');
			return false;
		}*/
		else if(projectName == "" || desc == "" || hour == ""){
			$('.error-description').html('');
			$('.error-projectname').html('');
			$('.error-hour').html('');
			if(projectName == ""){
				$('.error-projectname').html('').html('<span class="error text-danger">Please enter <strong>project name!</strong></span>');
				$("#projectname").focus();
				return false;
			}
			if(desc == ""){
				$('.error-description').html('').html('<span class="error text-danger">Please enter <strong>project description!</strong></span>');
				$("#description").focus();
				return false;
			}
			if(hour == ""){
				$('.error-hour').html('').html('<span class="error text-danger">Please select <strong>hours!</strong></span>');
				$("#hours").focus();
				return false;
			}
		
		}
		else{
			$('.error-description').html('');
			$('.error-projectname').html('');
			$('.error-hour').html('');
			return true;
		}
	}
	/*function dateValid(){
		var d1 = $('#startdate').val();
		var d2 = $('#enddate').val();
		console.log("startDate :"+d1);
		console.log("endDate :"+d2);
		var FromDt = moment(d1,"DD/MM/YYYY").startOf('hour').startOf('minute').startOf('second');
		var ToDt = moment(d2,"DD/MM/YYYY").startOf('hour').startOf('minute').startOf('second');
		var Expdate = moment(FromDt,"DD/MM/YYYY").add("30",'d');
		Expdate =  moment(Expdate,"DD/MM/YYYY").startOf('hour').startOf('minute').startOf('second');
		var date1 = d1.split('/');
		var date2 = d2.split('/');
		var fd = date1[1]+"-"+date1[0]+"-"+date1[2];
		var td = date2[1]+"-"+date2[0]+"-"+date2[2];
		var regExp = /(\d{1,2})\-(\d{1,2})\-(\d{2,4})/;
		
		d1 = fd.replace(regExp,"$3$1$2");
		d2 = td.replace(regExp,"$3$1$2");
		console.log("startDate1 :"+fd);
		console.log("endDate1 :"+td);
		console.log("ToDt :"+ToDt);
		console.log("Expdate :"+Expdate);
		if($('#startdate').val() == "" && $('#enddate').val() == ""){
			$('.error-nodate').html('').html('<span class="error text-danger">Please select <strong>date!</strong></span>');
			return false;
		}else if($('#startdate').val() == "" && $('#enddate').val() != ""){
			$('.error-nodate').html('');
			$('.error-enddate').html('');
			$('.error-startdate').html('').html('<span class="error text-danger">Please select <strong>from date!</strong></span>');
			return false;
		}else if($('#enddate').val() == "" && $('#startdate').val() != ""){
			$('.error-nodate').html('');
			$('.error-startdate').html('');
			$('.error-enddate').html('').html('<span class="error text-danger">Please select <strong>to date!</strong></span>');
			return false;
		}else if(d1>d2){
			$('.error-nodate').html('').html('<span class="error text-danger">From date should not be less than To date!</span>');
			return false;
		}else if(ToDt>Expdate){
			$('.error-nodate').html('').html('<span class="error text-danger">Duration should be one month!</span>');
			return false;
		}else{
			$('.error-nodate').html('');
			$('.error-startdate').html('');
			$('.error-enddate').html('');
			$("#exceldata").submit();
			return true;
		}
	}*/
});