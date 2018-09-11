
[![npm version](https://badge.fury.io/js/iroha-helpers.svg)](https://www.npmjs.com/package/iroha-helpers) [![Iroha 1.0 beta-3](https://img.shields.io/badge/iroha-1.0.0--beta4-e2232d.svg)](https://github.com/hyperledger/iroha/releases/tag/v1.0.0_beta-4)

# iroha-helpers

Some functions which will help you to interact with [Hyperledger Iroha](https://github.com/hyperledger/iroha) from your JS program

## Trying an example

 1. Clone this repository
 2. Run Iroha http://iroha.readthedocs.io/en/latest/getting_started/
 3. Run `grpc-web-proxy` for iroha https://gitlab.com/snippets/1713665
 4. `yarn build && node example`

## Known issues
 - Please be careful: API might and WILL change.
 - Please note that some of commands (e.g. addPeer, createRole) are not
   supported yet. We will support them after migrating to Protobuf.js.
   Stay tuned!

## TODO

 - [x] Create an example
 - [x] Implement Batch of Transactions
 - [ ] Field validation
 - [ ] Add tests
 - [ ] Integration tests with Iroha
 - [x] Add ability to use native GRPC, not grpc-web-client.
 - [ ] Use Protobuf.js
 - [ ] Implement all Transactions/Queries
 - [ ] Add more documentation
 - [ ] Minify/Uglify
