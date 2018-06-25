# botkit-storage-cloudant

A storage module for [Botkit](https://botkit.ai) which stores information in a Cloudant database.

This module conforms to [Botkit's storage plugin convention](https://github.com/howdyai/botkit/blob/master/docs/storage.md).

## Usage

Require `botkit-storage-cloudant` and pass it the connection details as documented in the [nodejs-cloudant](https://github.com/cloudant/nodejs-cloudant) library.

```js
const Botkit = require('botkit');
const cloudantStorage = require('botkit-storage-cloudant')({uri: 'http://admin:pass@localhost:8080'});

const bot = Botkit.slackbot({
    storage: cloudantStorage
});
```

## Testing

* Start a Cloudant instance in a [docker container](https://hub.docker.com/r/ibmcom/cloudant-developer/).
  ```shell
  docker run \
       --detach \
       --volume cloudant:/srv \
       --name cloudant-developer \
       --publish 8080:80 \
       --hostname cloudant.dev \
       ibmcom/cloudant-developer
  ```
* Run `npm test`
