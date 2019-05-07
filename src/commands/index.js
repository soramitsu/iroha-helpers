import txHelper from '../txHelper'
import { signWithArrayOfKeys, sendTransactions } from '../util'
import validate from '../validate'

const DEFAULT_OPTIONS = {
  privateKeys: [''],
  creatorAccountId: '',
  quorum: 1,
  commandService: null,
  timeoutLimit: 5000
}

/**
 * wrapper function of queries
 * @param {Object} commandOptions
 * @param {Object} transactions
 */
function command (
  {
    privateKeys,
    creatorAccountId,
    quorum,
    commandService,
    timeoutLimit
  } = DEFAULT_OPTIONS,
  tx
) {
  let txToSend = txHelper.addMeta(tx, {
    creatorAccountId,
    quorum
  })

  txToSend = signWithArrayOfKeys(txToSend, privateKeys)

  let txClient = commandService

  return sendTransactions([txToSend], txClient, timeoutLimit)
}

/**
 * addAssetQuantity
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.assetId
 * @property {Number} params.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-asset-quantity
 */
function addAssetQuantity (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addAssetQuantity',
      validate(params, ['assetId', 'amount'])
    )
  )
}

/**
 * addPeer
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.address
 * @property {String} params.peerKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-peer
 */
function addPeer (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addPeer',
      {
        peer: validate(params, ['address', 'peerKey'])
      }
    )
  )
}

/**
 * addSignatory
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-signatory
 */
function addSignatory (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'addSignatory',
      validate(params, ['accountId', 'publicKey'])
    )
  )
}

/**
 * appendRole
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.roleName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#append-role
 */
function appendRole (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'appendRole',
      validate(params, ['accountId', 'roleName'])
    )
  )
}

/**
 * createAccount
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountName
 * @property {String} params.domainId
 * @property {String} params.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-account
 */
function createAccount (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createAccount',
      validate(params, ['accountName', 'domainId', 'publicKey'])
    )
  )
}

/**
 * createAsset
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.assetName
 * @property {String} params.domainId
 * @property {Number} params.precision
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-asset
 */
function createAsset (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createAsset',
      validate(params, ['assetName', 'domainId', 'precision'])
    )
  )
}

/**
 * createDomain
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.domainId
 * @property {String} params.defaultRole
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-domain
 */
function createDomain (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createDomain',
      validate(params, ['domainId', 'defaultRole'])
    )
  )
}

/**
 * createRole
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.roleName
 * @property {Number[]} params.permissionsList
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-role
 */
function createRole (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'createRole',
      validate(params, ['roleName', 'permissionsList'])
    )
  )
}

/**
 * detachRole
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.roleName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#detach-role
 */
function detachRole (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'detachRole',
      validate(params, ['accountId', 'roleName'])
    )
  )
}

/**
 * grantPermission
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.grantablePermissionName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#grant-permission
 */
function grantPermission (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'grantPermission',
      validate(params, ['accountId', 'grantablePermissionName'])
    )
  )
}

/**
 * removeSignatory
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#remove-signatory
 */
function removeSignatory (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'removeSignatory',
      validate(params, ['accountId', 'publicKey'])
    )
  )
}

/**
 * revokePermission
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.grantablePermissionName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#revoke-permission
 */
function revokePermission (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'revokePermission',
      validate(params, ['accountId', 'grantablePermissionName'])
    )
  )
}

/**
 * setAccountDetail
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {String} params.key
 * @property {String} params.value
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#set-account-detail
 */
function setAccountDetail (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'setAccountDetail',
      validate(params, ['accountId', 'key', 'value'])
    )
  )
}

/**
 * setAccountQuorum
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.accountId
 * @property {Number} params.quorum
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#set-account-quorum
 */
function setAccountQuorum (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'setAccountQuorum',
      validate(params, ['accountId', 'quorum'])
    )
  )
}

/**
 * substractAssetQuantity
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.assetId
 * @property {Number} params.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#subtract-asset-quantity
 */
function substractAssetQuantity (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'substractAssetQuantity',
      validate(params, ['assetId', 'amount'])
    )
  )
}

/**
 * transferAsset
 * @param {Object} commandOptions
 * @param {Object} params
 * @property {String} params.srcAccountId
 * @property {String} params.destAccountId
 * @property {String} params.assetId
 * @property {String} params.description
 * @property {Number} params.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#transfer-asset
 */
function transferAsset (commandOptions, params) {
  return command(
    commandOptions,
    txHelper.addCommand(
      txHelper.emptyTransaction(),
      'transferAsset',
      validate(params, ['srcAccountId', 'destAccountId', 'assetId', 'description', 'amount'])
    )
  )
}

export default {
  addAssetQuantity,
  addPeer,
  addSignatory,
  appendRole,
  createAccount,
  createAsset,
  createDomain,
  createRole,
  detachRole,
  grantPermission,
  removeSignatory,
  revokePermission,
  setAccountDetail,
  setAccountQuorum,
  substractAssetQuantity,
  transferAsset
}
