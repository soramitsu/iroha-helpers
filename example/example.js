import {
  QueryServiceClient,
  CommandServiceClient
} from '../lib/proto/endpoint_pb_service'
import { queryHelper, txHelper } from '../lib'

import { TxStatus, TxStatusRequest } from '../lib/proto/endpoint_pb.js'

import flow from 'lodash.flow'

let irohaAddress = 'http://localhost:8080'

let adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

// Creating transaction with txHelper
let transaction = flow(
  t =>
    txHelper.addCommand(t, 'CreateAsset', {
      assetName: 'dollar3',
      domainId: 'test',
      precision: 2
    }),
  t =>
    txHelper.addMeta(t, {
      creatorAccountId: 'admin@test',
      createdTime: Date.now()
    }),
  t => txHelper.sign(t, adminPriv)
)(txHelper.emptyTransaction())

let transaction2 = flow(
  t =>
    txHelper.addCommand(t, 'CreateAsset', {
      assetName: 'dollar2',
      domainId: 'test',
      precision: 2
    }),
  t =>
    txHelper.addMeta(t, {
      creatorAccountId: 'admin@test',
      createdTime: Date.now()
    })
)(txHelper.emptyTransaction())

const txClient = new CommandServiceClient(irohaAddress)

const txHash = txHelper.hash(transaction)
const txHash2 = txHelper.hash(transaction2)

const batch = txHelper.createBatch([transaction, transaction2], 0)

txClient.listTorii(batch, (err, data) => {
  if (err) {
    throw err
  } else {
    console.log(
      'Submitted transaction successfully! Hash: ' +
        txHash.toString('hex')
    )
  }
})

// Submitting transaction
// txClient.torii(transaction, (err, data) => {
//   if (err) {
//     throw err
//   } else {
//     console.log(
//       'Submitted transaction successfully! Hash: ' +
//         txHash.toString('hex')
//     )
//   }
// })

// // Creating query with queryHelper
// let query = flow(
//   (q) => queryHelper.addQuery(q, 'getAccount', { accountId: 'admin@test' }),
//   (q) => queryHelper.addMeta(q, { creatorAccountId: 'admin@test' }),
//   (q) => queryHelper.sign(q, adminPriv)
// )(queryHelper.emptyQuery())

// const queryClient = new QueryServiceClient(
//   irohaAddress
// )

// // Sending query with queryHelper
// queryClient.find(query, (err, response) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log(JSON.stringify(response));
//   }
// });

const request = new TxStatusRequest()

request.setTxHash(txHash)

let stream = txClient.statusStream(request)

stream.on('data', function (response) {
  console.log(response.getTxStatus())
})

stream.on('end', function (end) {
  console.log('finish')
})

const request2 = new TxStatusRequest()

request2.setTxHash(txHash2)

let stream2 = txClient.statusStream(request2)

stream2.on('data', function (response) {
  console.log(response.getTxStatus())
})

stream2.on('end', function (end) {
  console.log('finish')
})
