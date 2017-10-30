'use strict';

var fs = require('fs');
const CloudantClient = require('cloudant');

let instance = null;

class Cloudant {
  constructor() {
    if (!instance) {
      let VCAP_SERVICES = process.env.VCAP_SERVICES || fs.readFileSync("./vcap-local.json", "utf-8");
      VCAP_SERVICES = (typeof VCAP_SERVICES === 'string') ? JSON.parse(VCAP_SERVICES) : VCAP_SERVICES;
      this.cloudant = CloudantClient({ vcapServices: VCAP_SERVICES, plugin: 'promises'}); // eslint-disable-line new-cap
      instance = this;
    }
    
    return instance;
  }

  get(name) {
    return this.cloudant.db.get(name);
  }

  create(name) {
    return this.cloudant.db.create(name);
  }

  use(name) {
    return this.cloudant.db.use(name);
  }
}

module.exports = new Cloudant();
