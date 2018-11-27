// for usage with grpc package use endpoint_grpc_pb file
import {
  QueryService_v1Client,
  CommandService_v1Client
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
      assetName: 'dollar10',
      domainId: 'test',
      precision: 2
    }),
  t =>
    txHelper.addMeta(t, {
      creatorAccountId: 'admin@test'
    })
)(txHelper.emptyTransaction())

let transaction2 = flow(
  t =>
    txHelper.addCommand(t, 'CreateAsset', {
      assetName: 'dollar11',
      domainId: 'test',
      precision: 2
    }),
  t =>
    txHelper.addMeta(t, {
      creatorAccountId: 'admin@test'
    })
)(txHelper.emptyTransaction())

// for usage with grpc package don't forget to pass credentials or grpc.credentials.createInsecure()
const txClient = new CommandService_v1Client(irohaAddress)

const batchArray = txHelper.addBatchMeta([transaction, transaction2], 0)

batchArray[0] = txHelper.sign(batchArray[0], adminPriv)
batchArray[1] = txHelper.sign(batchArray[1], adminPriv)

const txHash = txHelper.hash(batchArray[0])
const txHash2 = txHelper.hash(batchArray[1])

const batch = txHelper.createTxListFromArray(batchArray)

txClient.listTorii(batch, (err, data) => {
  if (err) {
    throw err
  } else {
    console.log(
      'Submitted transaction successfully! Hash: ' +
        txHash.toString('hex') + '\n' +
        txHash2.toString('hex')
    )
  }
})

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

// Creating query with queryHelper
let query = flow(
  (q) => queryHelper.addQuery(q, 'getAccount', { accountId: 'admin@test' }),
  (q) => queryHelper.addMeta(q, { creatorAccountId: 'admin@test' }),
  (q) => queryHelper.sign(q, adminPriv)
)(queryHelper.emptyQuery())

// for usage with grpc package don't forget to pass credentials or grpc.credentials.createInsecure()
const queryClient = new QueryService_v1Client(
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
