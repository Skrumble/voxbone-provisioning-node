# Voxbone Provisioning Node 
This Voxbone Provisioning module will allow you to interface with [Voxbone Provioning API](https://developers.voxbone.com/docs/v3/overview/)

## Installation
To install the Voxbone Provisioning node module and its dependencies run the following command:

```sh
npm install @skrumble/voxbone-provisioning-node
```

## Usage

### Create the voxbone instance:
```javascript
const Voxbone = require('@skrumble/voxbone-provisioning-node');

let client = new Voxbone({ user: '<Your Voxbone Username>', password: '<Your Voxbone Password>' });
```

### listCountries 

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/inventory/

Example:
```javascript
client.listCountries({ pageNumber:"0", pageSize:"1" })
.then((countries) => {
  console.log(countries);
})
.catch((err) => {
  console.log(err);
});
```

### listDid 

Voxbone API docs for parameter list and descriptions: https://developers.client.com/docs/v3/inventory/

Example:
```javascript
client.listDid({ pageNumber:"0", pageSize:"1" })
.then((dids) => {
  console.log(dids);
})
.catch((err) => {
  console.log(err);
});
```


### listDidGroup

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/inventory/

Example:
```javascript
client.listDidGroup({
  pageNumber:"0", 
  pageSize:"20", 
  countryCodeA3: country, 
  stateId: state, 
  cityNamePattern: city, 
  didType: "GEOGRAPHIC"
})
.then((groups) => {
  console.log(groups);
})
.catch((err) => {
  console.log(err);
});
```

### listStates

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/inventory/

Example:
```javascript
client.listStates(Country)
.then((states) => {
  console.log(states);
})
.catch((err) => {
  console.log(err);
});
```

### listVoiceURI

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/configuration/

Example:
```javascript
client.listVoiceURI({ pageNumber:"0", pageSize:"20" })
.then((uris) => {
  console.log(uris);
})
.catch((err) => {
  console.log(err);
});
```

### createOrUpdateVoiceURI

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/configuration/

Example:
```javascript
client.createOrUpdateVoiceURI({ voiceUriProtocol:"SIP", uri: uri, description: description })
.then((response) => {
  console.log(response);
})
.catch((err) => {
  console.log(err);
});
```

### deleteVoiceURI

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/configuration/

Example:
```javascript
client.deleteVoiceURI(uriId)
.then((response) => {
  console.log(response);
})
.catch((err) => {
  console.log(err);
});
```

### applyConfiguration

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/configuration/

Example:
```javascript
client.applyConfiguration({ didIds:["123", "124"], voiceUriId: uriId })
.then((response) => {
  console.log(response);
})
.catch((err) => {
  console.log(err);
});
```

### accountBalance

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
client.accountBalance()
.then((balance) => {
  console.log(balance);
})
.catch((err) => {
  console.log(err);
});
```

### createCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
client.createCart({ customerReference: reference, description: description })
.then((cart) => {
  console.log(cart);
})
.catch((err) => {
  console.log(err);
});
```

### addToCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
client.addToCart({
  cartIdentifier: cartID, 
  didCartItem: {
  "didGroupId" : groupId, 
  "quantity" : "1"
  }
});
.then((cart) => {
  console.log(cart);
})
.catch((err) => {
  console.log(err);
});
```

### listCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
client.listCart({ pageNumber:"0", pageSize:"1" })
.then((cart) => {
  console.log(cart);
})
.catch((err) => {
  console.log(err);
});
```

### removeFromCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
client.removeFromCart({ 
  cartIdentifier:cartIdentifier, 
  orderProductId:orderProductId, 
  quantity:quantity
})
.then((response) => {
  console.log(response);
})
.catch((err) => {
  console.log(err);
});
```

### deleteCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
client.deleteCart(cartId)
.then((response) => {
  console.log(response);
})
.catch((err) => {
  console.log(err);
});
```

### checkoutCart

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
client.checkoutCart(cartIdentifier)
  .then((cart) => {
    console.log(cart);
  })
  .catch((err) => {
    console.log(err);
  });
```

### listOrder

Voxbone API docs for parameter list and descriptions: https://developers.voxbone.com/docs/v3/ordering/

Example:
```javascript
client.listOrder({ pageNumber:"0", pageSize:"1" })
.then((orders) => {
  console.log(orders);
})
.catch(function(err) {
  console.log(err);
});
```