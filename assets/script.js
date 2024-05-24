var ajax_request = null;
function refresh_table(){
	var loading = `
	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<g transform="rotate(0 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(30 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(60 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(90 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(120 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(150 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(180 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(210 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(240 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(270 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(300 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
			  </rect>
			</g><g transform="rotate(330 50 50)">
			  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
			    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
			  </rect>
			</g>
			</svg>

				`;
	$('#result').html(loading);
		$.ajax({
		url: 'tableData.php',
		method: 'POST',
		success: function(data){
			$("#result").html(data);
		},
		error: function(){

		}
		});
}

function _cancel(){
	var xhr = ajax_request.data('jqxhr');
	xhr.abort();
}

function _delete(event, id){
	var html = $(event.target).html();
	$(event.target).html('<div class="spinner-border spinner-border-sm"></div>').prop("disabled");
	var con = confirm("are You sure?");
	if (con) {
		$.ajax({
		url: 'delete.php',
		method: 'POST',
		data: {
			'id' : id
		},
		success: function(){
			refresh_table();
		},
		error: function(){
			alert('Something went wrong');
			$(event.target).html(html).removeAttr('disabled');
		}
	});
	}
	
}

$(document).ready(function(){
	$("#file").dropify();
	$("#file").change(function(){
		$("#upload_file").show();
	})
	$("#form").submit(function(event){
		event.preventDefault();

		ajax_request = $(this).ajaxSubmit({
			beforeSubmit: function(){
				$("#progress").slideDown();
				$(".progress-bar").width('0%');
			},
			uploadProgress: function(event, position, total, precentageComplete){
				$(".progress-bar").width(precentageComplete+"%").html(precentageComplete+"%");
			},
			success: function(data) {
				var data = JSON.parse(data);
				if (data.result) {
					refresh_table();
					$("#message").html(data.message);
					$("#file").val(null);
					$("#upload_file").hide();
					$("#progress").slideUp();
					$(".progress-bar").width("0%");
				}
			},
			error: function() {
				alert("Upload Canceled");
				$("#file").val(null);
					$("#upload_file").hide();
					$("#progress").slideUp();
					$(".progress-bar").width("0%");
			}
		});
		});
});
