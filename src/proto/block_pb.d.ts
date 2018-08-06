// package: iroha.protocol
// file: block.proto

import * as jspb from "google-protobuf";
import * as primitive_pb from "./primitive_pb";
import * as transaction_pb from "./transaction_pb";

export class Block extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): Block.Payload | undefined;
  setPayload(value?: Block.Payload): void;

  clearSignaturesList(): void;
  getSignaturesList(): Array<primitive_pb.Signature>;
  setSignaturesList(value: Array<primitive_pb.Signature>): void;
  addSignatures(value?: primitive_pb.Signature, index?: number): primitive_pb.Signature;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    payload?: Block.Payload.AsObject,
    signaturesList: Array<primitive_pb.Signature.AsObject>,
  }

  export class Payload extends jspb.Message {
    clearTransactionsList(): void;
    getTransactionsList(): Array<transaction_pb.Transaction>;
    setTransactionsList(value: Array<transaction_pb.Transaction>): void;
    addTransactions(value?: transaction_pb.Transaction, index?: number): transaction_pb.Transaction;

    getTxNumber(): number;
    setTxNumber(value: number): void;

    getHeight(): number;
    setHeight(value: number): void;

    getPrevBlockHash(): Uint8Array | string;
    getPrevBlockHash_asU8(): Uint8Array;
    getPrevBlockHash_asB64(): string;
    setPrevBlockHash(value: Uint8Array | string): void;

    getCreatedTime(): number;
    setCreatedTime(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Payload.AsObject;
    static toObject(includeInstance: boolean, msg: Payload): Payload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Payload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Payload;
    static deserializeBinaryFromReader(message: Payload, reader: jspb.BinaryReader): Payload;
  }

  export namespace Payload {
    export type AsObject = {
      transactionsList: Array<transaction_pb.Transaction.AsObject>,
      txNumber: number,
      height: number,
      prevBlockHash: Uint8Array | string,
      createdTime: number,
    }
  }
}

