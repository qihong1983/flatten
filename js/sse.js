/**
 * @class Sse
 * @constructor
 * @param opt {object} 参数
 */

function Sse(opt) {
	if (!(this instanceof Sse)) {
		return new Sse(opt);
	}

	this.total = 0;
}

Sse.prototype = {
	init: function() {
		this.clearDbEvent();
		this.sseFn();
	},

	clearDbEvent: function() {
		$('#j_clearDB').off('click').on('click', function(e) {
			this.clearDb();
		}.bind(this))
	},

	clearDb: function() {
		var data = {};
		this.ajax("/clearDB.php", 'post', data, this.clearDBStatus.bind(this));
	},

	clearDBStatus(msg) {
		if (msg.status) {
			new PNotify({
				title: '成功',
				text: '数据已删除',
				shadow: true,
				opacity: 0.75,
				addclass: "stack_top_right",
				type: "warning",
				//type: "danger",
				// stack: Stacks[noteStack],
				width: "290px",
				delay: 1400
			});
		} else {
			new PNotify({
				title: '失败',
				text: '数据册除失败请排查',
				shadow: true,
				opacity: 0.75,
				addclass: "stack_top_right",
				type: "danger",
				//type: "danger",
				// stack: Stacks[noteStack],
				width: "290px",
				delay: 1400
			});
		}
	},
	sseFn: function() {
		var es = null;
		es = new EventSource("basic_sse.php");

		es.addEventListener("message", function(e) {

			if (this.total != parseInt(e.lastEventId, 10)) {
				var n = parseInt(e.lastEventId, 10) - this.total;
				if (e.data == "null") {
					e.data = '[]';
				} else {
					new PNotify({
						title: JSON.parse(e.data)[0].title,
						text: JSON.parse(e.data)[0].content,
						shadow: true,
						opacity: 0.75,
						addclass: "stack_top_right",
						type: "success",
						//type: "danger",
						// stack: Stacks[noteStack],
						width: "290px",
						delay: 1400
					});
				}



				this.total = parseInt(e.lastEventId, 10);
				this.data = JSON.parse(e.data);
				this.renderTable(JSON.parse(e.data));
			}


		}.bind(this), false);
	},



	renderTable: function(data) {
		var html = '';

		if (data != null) {
			$.each(data, function(k, v) {
				html += '<tr>' +
					'<td>' + v.title + '</td>' +
					'<td>' + v.content + '</td>' +
					'</tr>';
			});
		} else {
			html += '<tr><td colspan="2" class="text-center">数据库里没有数据</td></tr>'
		}



		$('#tbody').html(html);

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

};