var request = require('request');

var _api = {
  login: '',
  password: '',
  url : 'https://sandbox.voxbone.com/ws-voxbone/services/rest/'
};

var _version = module.exports.version;

var Voxbone = function(opts) {
  _api.login = opts.apiLogin;
  _api.password = opts.apiPassword;
  if(typeof opts.url != 'undefined'){
    _api.url = opts.url;
  }  
}; 
Voxbone.prototype = {
	listDid: function(opts) {
		if (!opts.pageNumber || !opts.pageSize){
			return "pageNumber and pageSize are required parameters";
		}
		var url = _api.url+"inventory/country?pageNumber="+opts.pageNumber+"&pageSize="+opts.pageSize;

		if (opts.didIds) {
			opts.didIds.forEach(function(didId) {
				url += "&didIds="+didId;
			});
		}
		if (opts.didgroupIds) {
			opts.didgroupIds.forEach(function(didgroupId) {
				url += "&didgroupIds="+didgroupId;
			});
		}
		if (opts.e164Pattern) {
			url += "&e164Pattern="+opts.e164Pattern;
		}
		if (opts.regulationAddressId) {
			url += "&regulationAddressId="+opts.regulationAddressId;
		}
		if (opts.voiceUriId) {
			url += "&voiceUriId="+opts.voiceUriId;
		}
		if (opts.faxUriId) {
			url += "&faxUriId="+opts.faxUriId;
		}
		if (opts.smsLinkGroupId) {
			url += "&smsLinkGroupId="+opts.smsLinkGroupId;
		}
		if (opts.needAddressLink) {
			url += "&needAddressLink="+opts.needAddressLink;
		}
		if (opts.serviceType) {
			url += "&serviceType="+opts.serviceType;
		}
		if (opts.countryCodeA3) {
			url += "&countryCodeA3="+opts.countryCodeA3;
		}
		if (opts.orderReference) {
			url += "&orderReference="+opts.orderReference;
		}
		if (opts.portingReference) {
			url += "&portingReference="+opts.portingReference;
		}
		if (opts.deliveryId) {
			url += "&deliveryId="+opts.deliveryId;
		}
		if (opts.smsOutbound) {
			url += "&smsOutbound="+opts.smsOutbound;
		}
		if (opts.webRtcEnabled) {
			url += "&webRtcEnabled="+opts.webRtcEnabled;
		}

		return sendRequest("GET", url);
	},
	listCountries: function(opts) {
		if (!opts.pageNumber || !opts.pageSize){
			return "pageNumber and pageSize are required parameters";
		}
		var url = _api.url+"inventory/did?pageNumber="+opts.pageNumber+"&pageSize="+opts.pageSize;

		if (opts.countryCodeA3) {
			url += "&countryCodeA3="+opts.countryCodeA3;
		}
		if (opts.didType) {
			url += "&didType="+opts.didType;
		}

		return sendRequest("GET", url);
	},
}
function sendRequest(type, url, body) {
	var header = {
		"Content-type": "application/json",
		"Accept": "application/json"
	}
	var auth = {
		'user': _api.login,
		'pass': _api.password
	}
	var opts = {
		auth: auth,
		url: url,
		body: body,
		json: true,
		headers: header,
		method: type.toUpperCase()
	};
	return request(opts);
}