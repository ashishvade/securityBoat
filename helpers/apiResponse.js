/* eslint-disable linebreak-style */

exports.successResponse = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 200,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(200).json(resData);
};

exports.alreadyExist = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 606,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(606).json(resData);
};

exports.bodyNotExist = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 603,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(603).json(resData);
};

exports.successNoContentResponse = function (res, msg, data=null,metadata,error) {
	let resData = {
		status: 602,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(200).json(resData);
};

exports.successFieldAreEmptyResponse = function (res, msg, data=null,metadata,error) {
	let resData = {
		status: 604,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(604).json(resData);
};

exports.paginateResponse = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 200,
        data:null,
        error:null,
        message:null
	};

    if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }

	for (const key in data) {
		if (data[key]) {
			resData[key] = data[key];
		}
	}

	return res.status(200).json(resData);
};

exports.errorResponse = function (res, msg, data = null, metadata, error) {
	let resData = {
		status:422,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(422).json(resData);
};

exports.validationError = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 603,
		data:null,
        error:null,
        message:null
	};
    if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }

	return res.status(603).json(resData);
};

exports.unauthorizedResponse = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 401,
		data:null,
        error:null,
        message:null
	};
    if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(401).json(resData);
};

exports.serverErrorRes = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 500,
		data:null,
        error:null,
        message:null
	};
    if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(500).json(resData);
};

exports.notFoundResponse = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 404,
		data:null,
        error:null,
        message:null
	};
    if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(404).json(resData);
};

exports.alreadyPurchased = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 406,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(200).json(resData);
};

exports.successUrlResponse = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 1,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(200).json(resData);
};

exports.authorizationFailed = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 403,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(403).json(resData);
};

exports.successResponseForVersion = function (res, msg, data = null, metadata, error) {
	let resData = {
		status: 400,
        data:null,
        error:null,
        message:null
	};
	if (msg) {
		resData.message = msg;
	}
    if (error) {
		resData.error = error;
	}
	if (data) {
		resData.data = data;
	}
    if(metadata){
		resData.token = metadata
    }
	return res.status(400).json(resData);
};