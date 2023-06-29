exports.success = function (payload, message, res) {
	const datas = {
		success: true,
		statusCode: res.statusCode,
		message,
		payload,
	};
	res.json(datas);
	res.end();
};

exports.error = function (message, uri, statusCode, res) {
	const data = {
		success: false,
		statusCode: statusCode,
		error: {
			message,
			uri,
		},
	};
	res.json(data);
	res.end();
};
