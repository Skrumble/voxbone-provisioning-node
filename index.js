'use strict';

const request = require('request-promise');

let _api = {
  user: '',
  password: '',
  url: 'https://api.voxbone.com/ws-voxbone/services/rest/'
};

let _version = module.exports.version;

var Voxbone = function(opts) {
  if (!(this instanceof Voxbone)) {
    return new Voxbone(opts);
  }

  _api.user = opts.user;
  _api.password = opts.password;

  if (typeof opts.url != 'undefined') {
    _api.url = opts.url;
  }

};

Voxbone.prototype = {
  listDid(opts) {
    return new Promise((resolve, reject) => {

      if (!opts || !opts.pageNumber || !opts.pageSize) {
        reject("pageNumber and pageSize are required parameters");
      }

      let url = _api.url + "inventory/did?pageNumber=" + opts.pageNumber + "&pageSize=" + opts.pageSize;

      if (opts.didIds) {
        opts.didIds.forEach(function(didId) {
          url += "&didIds=" + didId;
        });
      }

      if (opts.didGroupIds) {
        opts.didGroupIds.forEach((didgroupId) => {
          url += "&didGroupIds=" + didgroupId;
        });
      }

      if (opts.e164Pattern) url += "&e164Pattern=" + opts.e164Pattern;
      if (opts.regulationAddressId) url += "&regulationAddressId=" + opts.regulationAddressId;
      if (opts.voiceUriId) url += "&voiceUriId=" + opts.voiceUriId;
      if (opts.faxUriId) url += "&faxUriId=" + opts.faxUriId;
      if (opts.smsLinkGroupId) url += "&smsLinkGroupId=" + opts.smsLinkGroupId;
      if (opts.needAddressLink) url += "&needAddressLink=" + opts.needAddressLink;
      if (opts.serviceType) url += "&serviceType=" + opts.serviceType;
      if (opts.countryCodeA3) url += "&countryCodeA3=" + opts.countryCodeA3;
      if (opts.orderReference) url += "&orderReference=" + opts.orderReference;
      if (opts.portingReference) url += "&portingReference=" + opts.portingReference;
      if (opts.deliveryId) url += "&deliveryId=" + opts.deliveryId;
      if (opts.smsOutbound) url += "&smsOutbound=" + opts.smsOutbound;
      if (opts.webRtcEnabled) url += "&webRtcEnabled=" + opts.webRtcEnabled;

      resolve(sendRequest("GET", url));
    });
  },
  listDidGroup(opts) {
    return new Promise((resolve, reject) => {
      if (!opts || !opts.pageNumber || !opts.pageSize || !opts.countryCodeA3) {
        reject("countryCodeA3, pageNumber and pageSize are required parameters");
      }

      let url = _api.url + "inventory/didgroup?countryCodeA3=" + opts.countryCodeA3 + "&pageNumber=" + opts.pageNumber + "&pageSize=" + opts.pageSize;

      if (opts.didGroupIds) {
        opts.didGroupIds.forEach((didGroupId) => {
          url += "&didGroupIds=" + didGroupId;
        });
      }

      if (opts.featureIds) {
        opts.featureIds.forEach((featureId) => {
          url += "&featureIds=" + featureId;
        });
      }

      if (opts.stateId) url += "&stateId=" + opts.stateId;
      if (opts.cityNamePattern) url += "&cityNamePattern=" + opts.cityNamePattern;
      if (opts.rateCenter) url += "&rateCenter=" + opts.rateCenter;
      if (opts.areaCode) url += "&areaCode=" + opts.areaCode;
      if (opts.didType) url += "&didType=" + opts.didType;
      if (opts.showEmpty) url += "&showEmpty=" + opts.showEmpty;
      if (opts.featureIds) url += "&featureIds=" + opts.featureIds;

      resolve(sendRequest("GET", url));
    });
  },

  listCountries(opts) {
    return new Promise((resolve, reject) => {
      if (!opts.pageNumber || !opts.pageSize) {
        reject("pageNumber and pageSize are required parameters");
      }

      let url = _api.url + "inventory/country?pageNumber=" + opts.pageNumber + "&pageSize=" + opts.pageSize;

      if (opts.countryCodeA3) url += "&countryCodeA3=" + opts.countryCodeA3;
      if (opts.didType) url += "&didType=" + opts.didType;

      resolve(sendRequest("GET", url));
    });
  },

  listStates(countryCodeA3) {
    return new Promise((resolve, reject) => {
      if (!countryCodeA3) {
        reject("countryCodeA3 is required");
      }
      var url = _api.url + "inventory/country/" + countryCodeA3 + "/state";

      resolve(sendRequest("GET", url));
    });
  },

  listVoiceURI(opts) {
    return new Promise((resolve, reject) => {
      if (!opts.pageNumber || !opts.pageSize) {
        reject("pageNumber and pageSize are required parameters");
      }

      let url = _api.url + "configuration/voiceuri?pageNumber=" + opts.pageNumber + "&pageSize=" + opts.pageSize;

      if (opts.voiceUriId) url += "&voiceUriId=" + opts.voiceUriId;
      if (opts.backupUriId) url += "&backupUriId=" + opts.backupUriId;
      if (opts.voiceUriProtocol) url += "&voiceUriProtocol=" + opts.voiceUriProtocol;
      if (opts.uri) url += "&uri=" + opts.uri;
      if (opts.description) url += "&description=" + opts.description;

      resolve(sendRequest("GET", url));
    });
  },
  createOrUpdateVoiceURI(uri) {
    return new Promise((resolve, reject) => {
      if (!uri.voiceUriProtocol || !uri.uri) {
        reject("voiceUriProtocol and uri are required parameters");
      }

      let url = _api.url + "configuration/voiceuri";

      let body = {
        voiceUri: {
          voiceUriProtocol: uri.voiceUriProtocol,
          uri: uri.uri
        }
      };

      if (uri.voiceUriId) body.voiceUri.voiceUriId = uri.voiceUriId;
      if (uri.backupUriId) body.voiceUri.backupUriId = uri.backupUriId;
      if (uri.description) body.voiceUri.description = uri.description;

      resolve(sendRequest("PUT", url, body));
    });
  },

  deleteVoiceURI(uriId) {
    return new Promise((resolve, reject) => {
      if (!uriId) {
        reject("uriId is required");
      }

      var url = _api.url + "configuration/voiceuri/" + uriId;

      resolve(sendRequest("DELETE", url));
    });
  },
  applyConfiguration(config) {
    return new Promise((resolve, reject) => {
      if (!config.didIds || !Array.isArray(config.didIds)) {
        reject("didIds is a required parameter and must be array");
      }

      let url = _api.url + "configuration/configuration";

      let body = {
        didIds: config.didIds
      };

      if (config.voiceUriId) body.voiceUriId = config.voiceUriId;
      if (config.smsLinkGroupId) body.smsLinkGroupId = config.smsLinkGroupId;
      if (config.faxUriId) body.faxUriId = config.faxUriId;
      if (config.capacityGroupId) body.capacityGroupId = config.capacityGroupId;
      if (config.trunkId) body.trunkId = config.trunkId;
      if (config.deliveryId) body.deliveryId = config.deliveryId;
      if (config.srvLookup) body.srvLookup = config.srvLookup;
      if (config.cliPrivacy) body.cliPrivacy = config.cliPrivacy;
      if (config.ringback) body.ringback = config.ringback;
      if (config.dnisEnabled) body.dnisEnabled = config.dnisEnabled;
      if (config.blockOrdinary) body.blockOrdinary = config.blockOrdinary;
      if (config.blockCellular) body.blockCellular = config.blockCellular;
      if (config.blockPayphone) body.blockPayphone = config.blockPayphone;
      if (config.smsOutbound) body.smsOutbound = config.smsOutbound;
      if (config.webRtcEnabled) body.webRtcEnabled = config.webRtcEnabled;
      if (config.voxFaxEnabled) body.voxFaxEnabled = config.voxFaxEnabled;
      if (config.limitChannels) body.limitChannels = config.limitChannels;
      if (config.peer) body.peer = config.peer;
      if (config.callerId) body.callerId = config.callerId;

      resolve(sendRequest("POST", url, body));
    });
  },
  accountBalance() {
    return new Promise((resolve, reject) => {
      let url = _api.url + "ordering/accountbalance";

      resolve(sendRequest("GET", url));
    });
  },
  createCart(config) {
    return new Promise((resolve, reject) => {
      let url = _api.url + "ordering/cart";

      let body = {};

      if (config.customerReference) body.customerReference = config.customerReference;
      if (config.description) body.description = config.description;

      resolve(sendRequest("PUT", url, body));
    });
  },
  addToCart(config) {
    return new Promise((resolve, reject) => {
      if (!config.cartIdentifier) {
        reject("cartIdentifier is a required parameter");
      }

      let url = _api.url + "ordering/cart/" + config.cartIdentifier + "/product";

      let body = {};

      if (config.didCartItem) body.didCartItem = config.didCartItem;
      if (config.capacityCartItem) body.capacityCartItem = config.capacityCartItem;
      if (config.creditPackageCartItem) body.creditPackageCartItem = config.creditPackageCartItem;

      resolve(sendRequest("POST", url, body));
    });
  },
  listCart(config) {
    return new Promise((resolve, reject) => {
      if (!opts.pageNumber || !opts.pageSize) {
        reject("pageNumber and pageSize are required parameters");
      }
      var url = _api.url + "ordering/cart?pageNumber=" + opts.pageNumber + "&pageSize=" + opts.pageSize;

      if (opts.cartIdentifier) url += "&cartIdentifier=" + opts.cartIdentifier;
      if (opts.reference) url += "&reference=" + opts.reference;

      resolve(sendRequest("GET", url));
    });
  },
  removeFromCart(config) {
    return new Promise((resolve, reject) => {
      if (!config.cartIdentifier || !config.orderProductId || !config.quantity) {
        reject("cartIdentifier, orderProductId and quantity are required parameters");
      }

      let url = _api.url + "ordering/cart/" + config.cartIdentifier + "/product/" + config.orderProductId;

      let body = {
        cartIdentifier: config.cartIdentifier,
        orderProductId: config.orderProductId,
        quantity: config.quantity
      };

      resolve(sendRequest("POST", url, body));
    });
  },
  deleteCart(cartIdentifier) {
    return new Promise((resolve, reject) => {
      if (!cartIdentifier) {
        reject("cartIdentifier is a required parameter");
      }

      let url = _api.url + "ordering/cart/" + cartIdentifier;

      resolve(sendRequest("DELETE", url));
    });
  },

  checkoutCart(cartIdentifier) {
    return new Promise((resolve, reject) => {
      if (!cartIdentifier) {
        reject("cartIdentifier is a required parameter");
      }

      let url = _api.url + "ordering/cart/" + cartIdentifier + "/checkout?cartIdentifier=" + cartIdentifier;

      resolve(sendRequest("GET", url));
    });
  },

  listOrder(opts) {
    return new Promise((resolve, reject) => {
      if (!opts.pageNumber || !opts.pageSize) {
        reject("pageNumber and pageSize are required parameters");
      }

      let url = _api.url + "ordering/order?pageNumber=" + opts.pageNumber + "&pageSize=" + opts.pageSize;

      if (opts.reference) url += "&reference=" + opts.reference;
      if (opts.customerReference) url += "&customerReference=" + opts.customerReference;
      if (opts.status) url += "&status=" + opts.status;
      if (opts.dateFrom) url += "&dateFrom=" + opts.dateFrom;
      if (opts.dateTo) url += "&dateTo=" + opts.dateTo;

      resolve(sendRequest("GET", url));
    });
  },
  cancelDids: (dids) => {
    return new Promise((resolve, reject) => {
      if (!dids){
        reject("DID is required");
      }
      if(!Array.isArray(dids)) {
        reject("DID must be an array");
      }

      const url = `S{_api.url}ordering/cancel`;

      const body = {
        "didIds": dids
      }

      resolve(sendRequest("POST", url, body));
    });
  }
}

function sendRequest(type, url, body) {
  let header = {
    "Content-type": "application/json",
    "Accept": "application/json"
  };

  let auth = {
    'user': _api.user,
    'pass': _api.password
  };

  let opts = {
    auth: auth,
    url: url,
    body: body,
    json: true,
    headers: header,
    method: type.toUpperCase()
  };

  return request(opts).catch((err) => {
    return err.error;
  });
}

module.exports = Voxbone;
