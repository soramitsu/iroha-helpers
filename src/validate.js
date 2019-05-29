import isEqual from 'lodash.isequal'
import isPlainObject from 'lodash.isplainobject'

const assetIdDelimiter = '#'
const accountIdDelimiter = '@'

const accountDetailsKeyPattern = /^[A-Za-z0-9_]{1,64}$/
const accountDetailsValueLenght = 4096

const accountPattern = /^[a-z_0-9]{1,32}$/
const domainPattern = /^[a-z_0-9]{1,9}$/
const roleNamePattern = /^[a-z_0-9]{1,32}$/
const assetNamePattern = /^[a-z_0-9]{1,32}$/

const allowEmpty = [
  'key',
  'writer'
]

const schema = {
  amount: checkAmount,
  precision: checkPresission,
  accountName: checkAccountName,
  accountId: checkAccountId,
  domainId: checkDomain,
  assetId: checkAssetId,
  srcAccountId: checkAccountId,
  destAccountId: checkAccountId,
  description: checkDescription,
  quorum: checkQuorum,
  assetName: checkAssetName,
  roleName: checkRoleName,
  defaultRole: checkRoleName,
  key: checkAccountDetailsKey,
  value: checkAccountDetailsValue,
  roleId: checkRoleName,
  writer: checkAccountId,

  peerKey: toImplement,
  publicKey: toImplement,
  permissionsList: toImplement,
  grantablePermissionName: toImplement,
  txHashesList: toImplement,
  address: toImplement,
  pageSize: toImplement,
  firstTxHash: toImplement,
  height: toImplement
}

function toImplement () {
  return { isValid: true }
}

const compare = (a, b) => a - b

function validateParams (object, required) {
  if (!isPlainObject(object)) {
    throw new Error(
      `Expected type of arguments: object, actual: ${typeof object}`
    )
  }

  const isEquals = isEqual(
    Object.keys(object).sort(compare),
    required.sort(compare)
  )

  if (!isEquals) {
    throw new Error(
      `Expected arguments: ${required}, actual: ${Object.keys(object)}`
    )
  }

  const errors = required
    .map(property => {
      const validator = schema[property]

      // TODO: Create better way to handle not required arguments
      if (allowEmpty.includes(property)) {
        return [
          property,
          { isValid: true }
        ]
      }

      return [property, validator(object[property])]
    })
    .reduce((errors, pair) => {
      if (pair[1].isValid === false) {
        errors.push(
          new Error(
            `Field "${pair[0]}" (value: "${object[pair[0]]}") is incorrect\nReason: ${pair[1].reason}`
          )
        )
      }
      return errors
    }, [])

  if (errors.length) {
    throw errors
  }

  return object
}

function checkAmount (amount) {
  const formattedAmount = Number(amount)

  if (!Number.isFinite(formattedAmount)) {
    return {
      isValid: false,
      reason: 'Amount should be a number'
    }
  }

  if (formattedAmount < 0) {
    return {
      isValid: false,
      reason: 'Amount should be positive'
    }
  }

  if (formattedAmount > Number.MAX_SAFE_INTEGER) {
    return {
      isValid: false,
      reason: 'Amount does not fit into MAX_SAFE_INTEGER'
    }
  }

  return { isValid: true }
}

function checkPresission (precision) {
  if (precision < 0 || precision > 255) {
    return {
      isValid: false,
      reason: 'Precision should be 0 <= precision <= 255'
    }
  }

  return { isValid: true }
}

function checkAccountName (accountName) {
  if (!accountPattern.test(accountName)) {
    return {
      isValid: false,
      reason: `Account name should match ${accountPattern}`
    }
  }

  return { isValid: true }
}

function checkAssetName (assetName) {
  if (!assetNamePattern.test(assetName)) {
    return {
      isValid: false,
      reason: `Asset name should match ${assetNamePattern}`
    }
  }

  return { isValid: true }
}

function checkDomain (domain) {
  if (!domainPattern.test(domain)) {
    return {
      isValid: false,
      reason: `Domain should match ${domainPattern}`
    }
  }

  return { isValid: true }
}

function checkAccountId (accountId) {
  const parts = accountId.split(accountIdDelimiter)

  if (parts.length !== 2) {
    return {
      isValid: false,
      reason: 'Account ID should match account@domain'
    }
  }

  const vName = checkAccountName(parts[0])
  const vDomain = checkDomain(parts[1])

  if (!vName.isValid) {
    return vName
  }

  if (!vDomain.isValid) {
    return vDomain
  }

  return { isValid: true }
}

function checkAssetId (assetId) {
  const parts = assetId.split(assetIdDelimiter)

  if (parts.length !== 2) {
    return {
      isValid: false,
      reason: 'Asset ID should match asset#domain'
    }
  }

  const vName = checkAssetName(parts[0])
  const vDomain = checkDomain(parts[1])

  if (!vName.isValid) {
    return vName
  }

  if (!vDomain.isValid) {
    return vDomain
  }

  return { isValid: true }
}

function checkDescription (description) {
  if (description.length > 64) {
    return {
      isValid: false,
      reason: 'Description length should be smaller then 64 symbols'
    }
  }

  return { isValid: true }
}

function checkQuorum (quorum) {
  if (quorum < 0 || quorum > 128) {
    return {
      isValid: false,
      reason: 'Quorum should be 0 < quorum <= 128'
    }
  }

  return { isValid: true }
}

function checkRoleName (name) {
  if (!roleNamePattern.test(name)) {
    return {
      isValid: false,
      reason: `Role name should match ${roleNamePattern}`
    }
  }
  return { isValid: true }
}

function checkAccountDetailsKey (key) {
  if (!accountDetailsKeyPattern.test(key)) {
    return {
      isValid: false,
      reason: `Key should match ${accountDetailsKeyPattern}`
    }
  }
  return { isValid: true }
}

function checkAccountDetailsValue (value) {
  if (value.length > accountDetailsValueLenght) {
    return {
      isValid: false,
      reason: `Value length should be smaller then ${accountDetailsValueLenght}`
    }
  }
  return { isValid: true }
}

export default validateParams
