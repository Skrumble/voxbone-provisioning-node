# Voxbone Provisioning Node Api
The Voxbone Provisioning Node module will allow you to interface with Voxbone provioning api

## Instalation
To install the Voxbone Provisioning node module and its dependencies run the following command:
```javascript
'npm install git+https://github.com/DanielAudino/voxbone-provisioning-node.git'
```

## Usage

### Create the voxbone instance:
```javascript
var Voxbone = require('voxbone-provisioning-node')({user: '<Your Voxbone Username>', password: '<Your Voxbone Password>'})
```

### listCountries 

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/inventory/

Example:
```javascript
Voxbone.listCountries({pageNumber:"0", pageSize:"1"})
  .then(function(countries) {
	  console.log(countries);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### listDid 

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/inventory/

Example:
```javascript
Voxbone.listDid({pageNumber:"0", pageSize:"1"})
  .then(function(dids) {
	  console.log(dids);
	})
	.catch(function(err) {
    console.log(err);
	});
```


### listDidGroup

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/inventory/

Example:
```javascript
Voxbone.listDidGroup({pageNumber:"0", pageSize:"20", countryCodeA3: country, stateId: state, cityNamePattern: city, didType: "GEOGRAPHIC"}).then(function(groups) {
		console.log(groups);
	})
	.catch(function(err) {
	    console.log(err);
	});
```

### listStates

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/inventory/

Example:
```javascript
Voxbone.listStates(Country)
  .then(function(states) {
	  console.log(states);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### listVoiceURI

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/configuration/

Example:
```javascript
Voxbone.listVoiceURI(({pageNumber:"0", pageSize:"20"})
  .then(function(uris) {
	  console.log(uris);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### createOrUpdateVoiceURI

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/configuration/

Example:
```javascript
Voxbone.createOrUpdateVoiceURI({voiceUriProtocol:"SIP", uri: uri, description: description})
  .then(function(response) {
	  console.log(response);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### deleteVoiceURI

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/configuration/

Example:
```javascript
Voxbone.deleteVoiceURI(uriId)
  .then(function(response) {
	  console.log(response);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### applyConfiguration

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/configuration/

Example:
```javascript
Voxbone.applyConfiguration({didIds:["123", "124"], voiceUriId: uriId })
  .then(function(response) {
	  console.log(response);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### accountBalance

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
Voxbone.accountBalance()
  .then(function(balance) {
	  console.log(balance);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### createCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
Voxbone.createCart({customerReference: reference, description: description}).then(function(cart) {
  .then(function(cart) {
	  console.log(cart);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### addToCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
Voxbone.addToCart({cartIdentifier: cartID, didCartItem: {"didGroupId" : groupId, "quantity" : "1"}}).then(function(cart) {
  .then(function(cart) {
	  console.log(cart);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### listCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
Voxbone.listCart({pageNumber:"0", pageSize:"1"})
  .then(function(cart) {
	  console.log(cart);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### removeFromCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
Voxbone.removeFromCart({cartIdentifier:cartIdentifier, orderProductId:orderProductId, quantity:quantity})
  .then(function(response) {
	  console.log(response);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### deleteCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
Voxbone.deleteCart(cartId)
  .then(function(response) {
	  console.log(response);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### checkoutCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
Voxbone.checkoutCart(cartIdentifier)
  .then(function(cart) {
	  console.log(cart);
	})
	.catch(function(err) {
    console.log(err);
	});
```

### listOrder

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
Voxbone.listOrder({pageNumber:"0", pageSize:"1"})
  .then(function(orders) {
	  console.log(orders);
	})
	.catch(function(err) {
    console.log(err);
	});
```