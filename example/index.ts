/* eslint-disable no-console */

// for usage with grpc package use endpoint_grpc_pb file
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport'
import {
  QueryService_v1Client as QueryService,
  CommandService_v1Client as CommandService
} from '../lib/proto/endpoint_pb_service'

import commands from '../lib/commands'
import queries from '../lib/queries'

const IROHA_ADDRESS = 'http://localhost:8081'

const adminPriv =
  '0f0ce16d2afbb8eca23c7d8c2724f0c257a800ee2bbd54688cec6b898e3f7e33'

const commandService = new CommandService(
  IROHA_ADDRESS,
  { transport: NodeHttpTransport() }
)

const queryService = new QueryService(
  IROHA_ADDRESS,
  { transport: NodeHttpTransport() }
)

commands.setAccountDetail({
  privateKeys: [adminPriv],
  creatorAccountId: 'admin@iroha',
  quorum: 1,
  commandService,
  timeoutLimit: 5000
}, {
  accountId: 'admin@iroha',
  key: 'jason',
  value: 'statham'
})
  .then(() => {
    console.log('datail is set')
    queries.getAccountDetail({
      privateKey: adminPriv,
      creatorAccountId: 'admin@iroha',
      quorum: 1,
      queryService,
      timeoutLimit: 5000
    }, {
      accountId: 'admin@iroha',
      key: 'jason',
      writer: 'admin@iroha',
      pageSize: 1,
      paginationKey: undefined,
      paginationWriter: undefined
    }).then(r => console.log(r))
  })
  .catch(e => console.log('11111', e))
