/* eslint no-underscore-dangle: "off" */

'use strict';

// const uuid = require('uuid');
const cloudant = require('./Cloudant');

class CloudantDB {
  constructor(databaseName) {
    this.databaseName = databaseName;
    this.cloudant = cloudant;
    this.initialized = new Promise((resolve) => {
      this.cloudant.create(this.databaseName)
      .then(() => {
        this.db = this.cloudant.use(this.databaseName);
        resolve();
      })
      .catch((error) => {
        this.db = this.cloudant.use(this.databaseName);
        resolve();
      });
    });
  }

  createIndex(name, fields) {
    const index = { name, type: 'json', index: { fields } };
    this.initialized
      .then(() => this.db.index(index));
  }

  createView(designDoc, view, mapFunction, reduceFunction, orderFunction) {
    const _id = `_design/${designDoc}`; // eslint-disable-line no-underscore-dangle
    return this.initialized
      .then(() => this.get(_id))
      .catch((err) => {
        return this.save({ _id });
      })
      .then((result) => {
        return this.update(`_design/${designDoc}`, {
          views: Object.assign({}, result.views, { [view]: { map: mapFunction, reduce: reduceFunction, order: orderFunction } }),
          language: 'javascript',
        });
      });
  }

  info() {
    return this.cloudant.get(this.databaseName);
  }

  get(id) {
    return this.db.get(id);
  }

  save(doc) {
    const promise = this.db.insert(doc);
    return promise
      .then((result) =>  Object.assign(dbDoc, result));
  }

  update(id, doc) {
    const docToSave = Object.assign({}, doc);
    if (docToSave._rev) {
      delete docToSave._rev;
    }

    if (!id) {
      console.log("sem id");
      return this.db.insert(docToSave);
    }

    return this.db.get(id)
      .then(
        dbDoc => this.db.insert(Object.assign({}, dbDoc, docToSave)),
	        () => this.db.insert(docToSave)
      );
  }
  

  delete(id) {
    return this.db.get(id).then(doc => this.db.destroy(doc._id, doc._rev)); // eslint-disable-line no-underscore-dangle
  }

  getAttachment(key, data) {
    return this.db.attachment.get(key, data);
  }

  insertAttachment(key, prop, data, contentType) {
    return this.db.attachment.insert(key, prop, data, contentType);
  }

  list(params) {
    return this.db.list(params);
  }

  find(selector) {
    return this.db.find({ selector });
  }

  view(design, view, key) {
    return this.db.view(design, view, key || {});
  }

  bulk(params) {
    return this.db.bulk(params);
  }

}

module.exports = CloudantDB;
