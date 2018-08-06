// package: iroha.protocol
// file: endpoint.proto

var endpoint_pb = require("./endpoint_pb");
var transaction_pb = require("./transaction_pb");
var queries_pb = require("./queries_pb");
var qry_responses_pb = require("./qry_responses_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("grpc-web-client").grpc;

var CommandService = (function () {
  function CommandService() {}
  CommandService.serviceName = "iroha.protocol.CommandService";
  return CommandService;
}());

CommandService.Torii = {
  methodName: "Torii",
  service: CommandService,
  requestStream: false,
  responseStream: false,
  requestType: transaction_pb.Transaction,
  responseType: google_protobuf_empty_pb.Empty
};

CommandService.ListTorii = {
  methodName: "ListTorii",
  service: CommandService,
  requestStream: false,
  responseStream: false,
  requestType: endpoint_pb.TxList,
  responseType: google_protobuf_empty_pb.Empty
};

CommandService.Status = {
  methodName: "Status",
  service: CommandService,
  requestStream: false,
  responseStream: false,
  requestType: endpoint_pb.TxStatusRequest,
  responseType: endpoint_pb.ToriiResponse
};

CommandService.StatusStream = {
  methodName: "StatusStream",
  service: CommandService,
  requestStream: false,
  responseStream: true,
  requestType: endpoint_pb.TxStatusRequest,
  responseType: endpoint_pb.ToriiResponse
};

exports.CommandService = CommandService;

function CommandServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CommandServiceClient.prototype.torii = function torii(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(CommandService.Torii, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

CommandServiceClient.prototype.listTorii = function listTorii(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(CommandService.ListTorii, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

CommandServiceClient.prototype.status = function status(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(CommandService.Status, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

CommandServiceClient.prototype.statusStream = function statusStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CommandService.StatusStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.CommandServiceClient = CommandServiceClient;

var QueryService = (function () {
  function QueryService() {}
  QueryService.serviceName = "iroha.protocol.QueryService";
  return QueryService;
}());

QueryService.Find = {
  methodName: "Find",
  service: QueryService,
  requestStream: false,
  responseStream: false,
  requestType: queries_pb.Query,
  responseType: qry_responses_pb.QueryResponse
};

QueryService.FetchCommits = {
  methodName: "FetchCommits",
  service: QueryService,
  requestStream: false,
  responseStream: true,
  requestType: queries_pb.BlocksQuery,
  responseType: qry_responses_pb.BlockQueryResponse
};

exports.QueryService = QueryService;

function QueryServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

QueryServiceClient.prototype.find = function find(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(QueryService.Find, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

QueryServiceClient.prototype.fetchCommits = function fetchCommits(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(QueryService.FetchCommits, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.QueryServiceClient = QueryServiceClient;

