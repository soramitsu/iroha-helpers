import { QueryServiceClient, CommandServiceClient } from '../lib/proto/endpoint_pb_service'
import { queryHelper, txHelper } from '../lib'

import flow from 'lodash.flow'

let irohaAddress = 'http://localhost:8080'

let adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

// Creating transaction with txHelper
let transaction = flow(
  (t) => txHelper.addCommand(t, 'CreateAsset', { assetName: 'dollar', domainId: 'test', precision: 2 }),
  (t) => txHelper.addMeta(t, { creatorAccountId: 'admin@test', createdTime: Date.now() }),
  (t) => txHelper.sign(t, adminPriv)
)(txHelper.emptyTransaction())

const txClient = new CommandServiceClient(
  irohaAddress
)

// Submitting transaction
txClient.torii(transaction, (err, data) => {
  if (err) {
    throw err
  } else {
    console.log('Submitted transaction successfully! Hash: ' + txHelper.hash(transaction).toString('hex'))
  }
})

// Creating query with queryHelper
let query = flow(
  (q) => queryHelper.addQuery(q, 'getAccount', { accountId: 'admin@test' }),
  (q) => queryHelper.addMeta(q, { creatorAccountId: 'admin@test' }),
  (q) => queryHelper.sign(q, adminPriv)
)(queryHelper.emptyQuery())

const queryClient = new QueryServiceClient(
  irohaAddress
)

// Sending query with queryHelper
queryClient.find(query, (err, response) => {
  if (err) {
    throw err
  } else {
    console.log(JSON.stringify(response))
  }
})
