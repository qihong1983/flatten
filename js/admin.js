function Admin(opt) {
	if (!(this instanceof Admin)) {
		return new Admin(opt);
	}

	this.allowQuery = true;
}

Admin.prototype = {
	init: function() {
		// this.ajax(this.dataUrl.tableUrl, 'post', data, this.setDownloadExcel.bind(this));

		this.clickEvent();
	},
	clickEvent: function() {
		$("button").off('click').on('click', function(e) {
			var title = $('#inputStandard').val();
			var content = $('#textArea2').val();

			// console.log(title);
			// console.log(content);


			if (this.allowQuery) {

				this.allowQuery = false;
				var data = {};
				if ($.trim(title) == "" || $.trim(content) == "") {
					alert("标题或内容为空");
				} else {
					data.title = title;
					data.content = content;

					this.ajax("/insert.php", 'post', data, this.insertStatus.bind(this));
				}

				setTimeout(function() {
					this.allowQuery = true;
				}.bind(this), 500);
			}

			$('#inputStandard').val("");
			$('#textArea2').val("");


		}.bind(this));
	},

	insertStatus(msg) {
		console.log(msg);
	},

	/**
	 * 基于jquery ajax 二次封装的ajax
	 */
	ajax: function(url, type, data, callback) {
		type = type || 'get';
		$.ajax({
			url: url,
			type: type,
			data: data,
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown) {
				// alert(textStatus);
			},
			success: function(respData, textStatus, jqXHR) {
				callback(respData);
			}.bind(this)

		});
	}
}