/*
Tests for storage modules.
This file currently test simple_storage.js, redis_storage, and firebase_storage.

If you build a new storage module,
you must add it to this test file before your PR will be considered.
How to add it to this test file:

Add the following to the bottom of this file:

// Test <your_storage_module>
<your_storage_module> = require('./<your_storage_module>.js')(<appropriate config object for your storage module>);
check(<your_storage_module>.users);
check(<your_storage_module>.channels);
check(<your_storage_module>.teams);
*/

const test = require('unit.js');

const testObj0 = {
  id: 'TEST0',
  foo: 'bar0'
};
const testObj1 = {
  id: 'TEST1',
  foo: 'bar1'
};

const testStorageMethod = function (storageMethod) {
  storageMethod.save(testObj0, (err) => {
    test.assert(!err);
    storageMethod.save(testObj1, (err) => {
      test.assert(!err);
      storageMethod.get(testObj0.id, (err, data) => {
        test.assert(!err);
        test.assert(data.foo === testObj0.foo);
      });
      storageMethod.get('shouldnt-be-here', (err, data) => {
        test.assert(err.reason === 'missing');
        test.assert(!data);
      });
      storageMethod.all((err, data) => {
        test.assert(!err);
        test.assert(data[0].foo === testObj0.foo && data[1].foo === testObj1.foo ||
          data[0].foo === testObj1.foo && data[1].foo === testObj0.foo);
      });
    });
  });
};

console.log('If no asserts failed then the test has passed!');

// Test simple_storage
const cloudantStorage = require('../lib/storage.js')({
  url: 'http://admin:pass@localhost:8080',
});

testStorageMethod(cloudantStorage.users);
testStorageMethod(cloudantStorage.channels);
testStorageMethod(cloudantStorage.teams);