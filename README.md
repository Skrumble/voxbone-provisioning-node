# Voxbone Provisioning Node Api
The Voxbone Provisioning Node module will allow you to interface with Voxbone proviioning api

## Instalation
To install the Voxbone Provisioning node module and its dependencies run the following command:
'npm install git+https://github.com/DanielAudino/voxbone-provisioning-node.git'

## Usage

### Create the voxbone instance:
var Voxbone = require('voxbone-provisioning-node')({user: '<Your Voxbone Username>', password: '<Your Voxbone Password>'})

### listCountries 
List the countries available in the Voxbone coverage.

Example:
Voxbone.listCountries({pageNumber:"0", pageSize:"1"})
  .then(function(countries) {
	  console.log(countries);
	})
	.catch(function(err) {
    console.log(err);
	});

### listDid 
List the DID's within your own inventory.

Example:
Voxbone.listDid({pageNumber:"0", pageSize:"1"})
  .then(function(dids) {
	  console.log(dids);
	})
	.catch(function(err) {
    console.log(err);
	});
