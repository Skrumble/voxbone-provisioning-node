'use strict';

var request = require('request-promise');

var _api = {
  user: '',
  password: '',
  url : 'https://sandbox.voxbone.com/ws-voxbone/services/rest/'
};

var _version = module.exports.version;

var Voxbone = function(opts) {
  _api.login = opts.user;
  _api.password = opts.password;
  if(typeof opts.url != 'undefined'){
    _api.url = opts.url;
  }  
};

Voxbone.prototype = {
	listDid: function(opts) {
		return new Promise(function(resolve, reject) {
			if (!opts || !opts.pageNumber || !opts.pageSize){
				reject("pageNumber and pageSize are required parameters");
			}
			var url = _api.url+"inventory/did?pageNumber="+opts.pageNumber+"&pageSize="+opts.pageSize;

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

			resolve(sendRequest("GET", url));
		});
	},
	listCountries: function(opts) {
		return new Promise(function(resolve, reject) {
			if (!opts.pageNumber || !opts.pageSize){
				reject("pageNumber and pageSize are required parameters");
			}
			var url = _api.url+"inventory/country?pageNumber="+opts.pageNumber+"&pageSize="+opts.pageSize;

			if (opts.countryCodeA3) {
				url += "&countryCodeA3="+opts.countryCodeA3;
			}
			if (opts.didType) {
				url += "&didType="+opts.didType;
			}

			resolve(sendRequest("GET", url));
		});
	},
	listVoiceURI: function(opts) {
		return new Promise(function(resolve, reject) {
			if (!opts.pageNumber || !opts.pageSize){
				reject("pageNumber and pageSize are required parameters");
			}
			var url = _api.url+"configuration/voiceuri?pageNumber="+opts.pageNumber+"&pageSize="+opts.pageSize;

			if (opts.voiceUriId) {
				url += "&voiceUriId="+opts.voiceUriId;
			}
			if (opts.backupUriId) {
				url += "&backupUriId="+opts.backupUriId;
			}
			if (opts.voiceUriProtocol) {
				url += "&voiceUriProtocol="+opts.voiceUriProtocol;
			}
			if (opts.uri) {
				url += "&uri="+opts.uri;
			}
			if (opts.description) {
				url += "&description="+opts.description;
			}

			resolve(sendRequest("GET", url));
		});
	},
	createOrUpdateVoiceURI: function(uri) {
		return new Promise(function(resolve, reject) {
			if (!uri.voiceUriProtocol || !uri.uri){
				reject("voiceUriProtocol and uri are required parameters");
			}
			var url = _api.url+"configuration/voiceuri";

			var body = {
				voiceUriProtocol: uri.voiceUriProtocol,
				uri: uri.uri
			};

			if (uri.voiceUriId) {
				body.voiceUriId = uri.voiceUriId;
			}
			if (uri.backupUriId) {
				body.backupUriId = uri.backupUriId;
			}
			if (uri.description) {
				body.description = uri.description;
			}

			resolve(sendRequest("PUT", url, body));
		});
	},
	applyConfiguration: function(config) {
		return new Promise(function(resolve, reject) {
			if (!config.didIds){
				reject("didIds is a required parameter");
			}
			var url = _api.url+"configuration/configuration";

			var body = {
				didIds: config.didIds
			};

			if (config.voiceUriId) {
				body.voiceUriId = config.voiceUriId;
			}
			if (config.smsLinkGroupId) {
				body.smsLinkGroupId = config.smsLinkGroupId;
			}
			if (config.faxUriId) {
				body.faxUriId = config.faxUriId;
			}
			if (config.capacityGroupId) {
				body.capacityGroupId = config.capacityGroupId;
			}
			if (config.trunkId) {
				body.trunkId = config.trunkId;
			}
			if (config.deliveryId) {
				body.deliveryId = config.deliveryId;
			}
			if (config.srvLookup) {
				body.srvLookup = config.srvLookup;
			}
			if (config.cliPrivacy) {
				body.cliPrivacy = config.cliPrivacy;
			}
			if (config.ringback) {
				body.ringback = config.ringback;
			}
			if (config.dnisEnabled) {
				body.dnisEnabled = config.dnisEnabled;
			}
			if (config.blockOrdinary) {
				body.blockOrdinary = config.blockOrdinary;
			}
			if (config.blockCellular) {
				body.blockCellular = config.blockCellular;
			}
			if (config.blockPayphone) {
				body.blockPayphone = config.blockPayphone;
			}
			if (config.smsOutbound) {
				body.smsOutbound = config.smsOutbound;
			}
			if (config.webRtcEnabled) {
				body.webRtcEnabled = config.webRtcEnabled;
			}
			if (config.voxFaxEnabled) {
				body.voxFaxEnabled = config.voxFaxEnabled;
			}
			if (config.limitChannels) {
				body.limitChannels = config.limitChannels;
			}
			if (config.peer) {
				body.peer = config.peer;
			}
			if (config.callerId) {
				body.callerId = config.callerId;
			}
			resolve(sendRequest("POST", url, body));
		});
	},
}
function sendRequest(type, url, body) {
	var header = {
		"Content-type": "application/json",
		"Accept": "application/json"
	}
	var auth = {
		'user': _api.user,
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

module.exports = Voxbone;