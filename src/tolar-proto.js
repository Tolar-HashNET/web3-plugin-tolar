/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.tolar = (function() {
    
        /**
         * Namespace tolar.
         * @exports tolar
         * @namespace
         */
        var tolar = {};
    
        tolar.proto = (function() {
    
            /**
             * Namespace proto.
             * @memberof tolar
             * @namespace
             */
            var proto = {};
    
            proto.SignatureData = (function() {
    
                /**
                 * Properties of a SignatureData.
                 * @memberof tolar.proto
                 * @interface ISignatureData
                 * @property {Uint8Array|null} [hash] SignatureData hash
                 * @property {Uint8Array|null} [signature] SignatureData signature
                 * @property {Uint8Array|null} [signerId] SignatureData signerId
                 */
    
                /**
                 * Constructs a new SignatureData.
                 * @memberof tolar.proto
                 * @classdesc Represents a SignatureData.
                 * @implements ISignatureData
                 * @constructor
                 * @param {tolar.proto.ISignatureData=} [properties] Properties to set
                 */
                function SignatureData(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * SignatureData hash.
                 * @member {Uint8Array} hash
                 * @memberof tolar.proto.SignatureData
                 * @instance
                 */
                SignatureData.prototype.hash = $util.newBuffer([]);
    
                /**
                 * SignatureData signature.
                 * @member {Uint8Array} signature
                 * @memberof tolar.proto.SignatureData
                 * @instance
                 */
                SignatureData.prototype.signature = $util.newBuffer([]);
    
                /**
                 * SignatureData signerId.
                 * @member {Uint8Array} signerId
                 * @memberof tolar.proto.SignatureData
                 * @instance
                 */
                SignatureData.prototype.signerId = $util.newBuffer([]);
    
                /**
                 * Creates a new SignatureData instance using the specified properties.
                 * @function create
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {tolar.proto.ISignatureData=} [properties] Properties to set
                 * @returns {tolar.proto.SignatureData} SignatureData instance
                 */
                SignatureData.create = function create(properties) {
                    return new SignatureData(properties);
                };
    
                /**
                 * Encodes the specified SignatureData message. Does not implicitly {@link tolar.proto.SignatureData.verify|verify} messages.
                 * @function encode
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {tolar.proto.ISignatureData} message SignatureData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SignatureData.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.hash);
                    if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
                    if (message.signerId != null && Object.hasOwnProperty.call(message, "signerId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signerId);
                    return writer;
                };
    
                /**
                 * Encodes the specified SignatureData message, length delimited. Does not implicitly {@link tolar.proto.SignatureData.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {tolar.proto.ISignatureData} message SignatureData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SignatureData.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a SignatureData message from the specified reader or buffer.
                 * @function decode
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tolar.proto.SignatureData} SignatureData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SignatureData.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tolar.proto.SignatureData();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.hash = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.signature = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.signerId = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a SignatureData message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tolar.proto.SignatureData} SignatureData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SignatureData.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a SignatureData message.
                 * @function verify
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SignatureData.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.hash != null && message.hasOwnProperty("hash"))
                        if (!(message.hash && typeof message.hash.length === "number" || $util.isString(message.hash)))
                            return "hash: buffer expected";
                    if (message.signature != null && message.hasOwnProperty("signature"))
                        if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                            return "signature: buffer expected";
                    if (message.signerId != null && message.hasOwnProperty("signerId"))
                        if (!(message.signerId && typeof message.signerId.length === "number" || $util.isString(message.signerId)))
                            return "signerId: buffer expected";
                    return null;
                };
    
                /**
                 * Creates a SignatureData message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tolar.proto.SignatureData} SignatureData
                 */
                SignatureData.fromObject = function fromObject(object) {
                    if (object instanceof $root.tolar.proto.SignatureData)
                        return object;
                    var message = new $root.tolar.proto.SignatureData();
                    if (object.hash != null)
                        if (typeof object.hash === "string")
                            $util.base64.decode(object.hash, message.hash = $util.newBuffer($util.base64.length(object.hash)), 0);
                        else if (object.hash.length >= 0)
                            message.hash = object.hash;
                    if (object.signature != null)
                        if (typeof object.signature === "string")
                            $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                        else if (object.signature.length >= 0)
                            message.signature = object.signature;
                    if (object.signerId != null)
                        if (typeof object.signerId === "string")
                            $util.base64.decode(object.signerId, message.signerId = $util.newBuffer($util.base64.length(object.signerId)), 0);
                        else if (object.signerId.length >= 0)
                            message.signerId = object.signerId;
                    return message;
                };
    
                /**
                 * Creates a plain object from a SignatureData message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {tolar.proto.SignatureData} message SignatureData
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SignatureData.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.hash = "";
                        else {
                            object.hash = [];
                            if (options.bytes !== Array)
                                object.hash = $util.newBuffer(object.hash);
                        }
                        if (options.bytes === String)
                            object.signature = "";
                        else {
                            object.signature = [];
                            if (options.bytes !== Array)
                                object.signature = $util.newBuffer(object.signature);
                        }
                        if (options.bytes === String)
                            object.signerId = "";
                        else {
                            object.signerId = [];
                            if (options.bytes !== Array)
                                object.signerId = $util.newBuffer(object.signerId);
                        }
                    }
                    if (message.hash != null && message.hasOwnProperty("hash"))
                        object.hash = options.bytes === String ? $util.base64.encode(message.hash, 0, message.hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.hash) : message.hash;
                    if (message.signature != null && message.hasOwnProperty("signature"))
                        object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                    if (message.signerId != null && message.hasOwnProperty("signerId"))
                        object.signerId = options.bytes === String ? $util.base64.encode(message.signerId, 0, message.signerId.length) : options.bytes === Array ? Array.prototype.slice.call(message.signerId) : message.signerId;
                    return object;
                };
    
                /**
                 * Converts this SignatureData to JSON.
                 * @function toJSON
                 * @memberof tolar.proto.SignatureData
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SignatureData.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for SignatureData
                 * @function getTypeUrl
                 * @memberof tolar.proto.SignatureData
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                SignatureData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tolar.proto.SignatureData";
                };
    
                return SignatureData;
            })();
    
            proto.tx = (function() {
    
                /**
                 * Namespace tx.
                 * @memberof tolar.proto
                 * @namespace
                 */
                var tx = {};
    
                tx.Transaction = (function() {
    
                    /**
                     * Properties of a Transaction.
                     * @memberof tolar.proto.tx
                     * @interface ITransaction
                     * @property {Uint8Array|null} [senderAddress] Transaction senderAddress
                     * @property {Uint8Array|null} [receiverAddress] Transaction receiverAddress
                     * @property {Uint8Array|null} [value] Transaction value
                     * @property {Uint8Array|null} [gas] Transaction gas
                     * @property {Uint8Array|null} [gasPrice] Transaction gasPrice
                     * @property {Uint8Array|null} [data] Transaction data
                     * @property {Uint8Array|null} [nonce] Transaction nonce
                     * @property {number|Long|null} [networkId] Transaction networkId
                     */
    
                    /**
                     * Constructs a new Transaction.
                     * @memberof tolar.proto.tx
                     * @classdesc Represents a Transaction.
                     * @implements ITransaction
                     * @constructor
                     * @param {tolar.proto.tx.ITransaction=} [properties] Properties to set
                     */
                    function Transaction(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Transaction senderAddress.
                     * @member {Uint8Array} senderAddress
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     */
                    Transaction.prototype.senderAddress = $util.newBuffer([]);
    
                    /**
                     * Transaction receiverAddress.
                     * @member {Uint8Array} receiverAddress
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     */
                    Transaction.prototype.receiverAddress = $util.newBuffer([]);
    
                    /**
                     * Transaction value.
                     * @member {Uint8Array} value
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     */
                    Transaction.prototype.value = $util.newBuffer([]);
    
                    /**
                     * Transaction gas.
                     * @member {Uint8Array} gas
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     */
                    Transaction.prototype.gas = $util.newBuffer([]);
    
                    /**
                     * Transaction gasPrice.
                     * @member {Uint8Array} gasPrice
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     */
                    Transaction.prototype.gasPrice = $util.newBuffer([]);
    
                    /**
                     * Transaction data.
                     * @member {Uint8Array} data
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     */
                    Transaction.prototype.data = $util.newBuffer([]);
    
                    /**
                     * Transaction nonce.
                     * @member {Uint8Array} nonce
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     */
                    Transaction.prototype.nonce = $util.newBuffer([]);
    
                    /**
                     * Transaction networkId.
                     * @member {number|Long} networkId
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     */
                    Transaction.prototype.networkId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
                    /**
                     * Creates a new Transaction instance using the specified properties.
                     * @function create
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {tolar.proto.tx.ITransaction=} [properties] Properties to set
                     * @returns {tolar.proto.tx.Transaction} Transaction instance
                     */
                    Transaction.create = function create(properties) {
                        return new Transaction(properties);
                    };
    
                    /**
                     * Encodes the specified Transaction message. Does not implicitly {@link tolar.proto.tx.Transaction.verify|verify} messages.
                     * @function encode
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {tolar.proto.tx.ITransaction} message Transaction message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Transaction.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.senderAddress != null && Object.hasOwnProperty.call(message, "senderAddress"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.senderAddress);
                        if (message.receiverAddress != null && Object.hasOwnProperty.call(message, "receiverAddress"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.receiverAddress);
                        if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.value);
                        if (message.gas != null && Object.hasOwnProperty.call(message, "gas"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.gas);
                        if (message.gasPrice != null && Object.hasOwnProperty.call(message, "gasPrice"))
                            writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.gasPrice);
                        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.data);
                        if (message.nonce != null && Object.hasOwnProperty.call(message, "nonce"))
                            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.nonce);
                        if (message.networkId != null && Object.hasOwnProperty.call(message, "networkId"))
                            writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.networkId);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Transaction message, length delimited. Does not implicitly {@link tolar.proto.tx.Transaction.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {tolar.proto.tx.ITransaction} message Transaction message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Transaction.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a Transaction message from the specified reader or buffer.
                     * @function decode
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {tolar.proto.tx.Transaction} Transaction
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Transaction.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tolar.proto.tx.Transaction();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.senderAddress = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    message.receiverAddress = reader.bytes();
                                    break;
                                }
                            case 3: {
                                    message.value = reader.bytes();
                                    break;
                                }
                            case 4: {
                                    message.gas = reader.bytes();
                                    break;
                                }
                            case 5: {
                                    message.gasPrice = reader.bytes();
                                    break;
                                }
                            case 6: {
                                    message.data = reader.bytes();
                                    break;
                                }
                            case 7: {
                                    message.nonce = reader.bytes();
                                    break;
                                }
                            case 8: {
                                    message.networkId = reader.uint64();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a Transaction message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {tolar.proto.tx.Transaction} Transaction
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Transaction.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a Transaction message.
                     * @function verify
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Transaction.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.senderAddress != null && message.hasOwnProperty("senderAddress"))
                            if (!(message.senderAddress && typeof message.senderAddress.length === "number" || $util.isString(message.senderAddress)))
                                return "senderAddress: buffer expected";
                        if (message.receiverAddress != null && message.hasOwnProperty("receiverAddress"))
                            if (!(message.receiverAddress && typeof message.receiverAddress.length === "number" || $util.isString(message.receiverAddress)))
                                return "receiverAddress: buffer expected";
                        if (message.value != null && message.hasOwnProperty("value"))
                            if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                                return "value: buffer expected";
                        if (message.gas != null && message.hasOwnProperty("gas"))
                            if (!(message.gas && typeof message.gas.length === "number" || $util.isString(message.gas)))
                                return "gas: buffer expected";
                        if (message.gasPrice != null && message.hasOwnProperty("gasPrice"))
                            if (!(message.gasPrice && typeof message.gasPrice.length === "number" || $util.isString(message.gasPrice)))
                                return "gasPrice: buffer expected";
                        if (message.data != null && message.hasOwnProperty("data"))
                            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                                return "data: buffer expected";
                        if (message.nonce != null && message.hasOwnProperty("nonce"))
                            if (!(message.nonce && typeof message.nonce.length === "number" || $util.isString(message.nonce)))
                                return "nonce: buffer expected";
                        if (message.networkId != null && message.hasOwnProperty("networkId"))
                            if (!$util.isInteger(message.networkId) && !(message.networkId && $util.isInteger(message.networkId.low) && $util.isInteger(message.networkId.high)))
                                return "networkId: integer|Long expected";
                        return null;
                    };
    
                    /**
                     * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {tolar.proto.tx.Transaction} Transaction
                     */
                    Transaction.fromObject = function fromObject(object) {
                        if (object instanceof $root.tolar.proto.tx.Transaction)
                            return object;
                        var message = new $root.tolar.proto.tx.Transaction();
                        if (object.senderAddress != null)
                            if (typeof object.senderAddress === "string")
                                $util.base64.decode(object.senderAddress, message.senderAddress = $util.newBuffer($util.base64.length(object.senderAddress)), 0);
                            else if (object.senderAddress.length >= 0)
                                message.senderAddress = object.senderAddress;
                        if (object.receiverAddress != null)
                            if (typeof object.receiverAddress === "string")
                                $util.base64.decode(object.receiverAddress, message.receiverAddress = $util.newBuffer($util.base64.length(object.receiverAddress)), 0);
                            else if (object.receiverAddress.length >= 0)
                                message.receiverAddress = object.receiverAddress;
                        if (object.value != null)
                            if (typeof object.value === "string")
                                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                            else if (object.value.length >= 0)
                                message.value = object.value;
                        if (object.gas != null)
                            if (typeof object.gas === "string")
                                $util.base64.decode(object.gas, message.gas = $util.newBuffer($util.base64.length(object.gas)), 0);
                            else if (object.gas.length >= 0)
                                message.gas = object.gas;
                        if (object.gasPrice != null)
                            if (typeof object.gasPrice === "string")
                                $util.base64.decode(object.gasPrice, message.gasPrice = $util.newBuffer($util.base64.length(object.gasPrice)), 0);
                            else if (object.gasPrice.length >= 0)
                                message.gasPrice = object.gasPrice;
                        if (object.data != null)
                            if (typeof object.data === "string")
                                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                            else if (object.data.length >= 0)
                                message.data = object.data;
                        if (object.nonce != null)
                            if (typeof object.nonce === "string")
                                $util.base64.decode(object.nonce, message.nonce = $util.newBuffer($util.base64.length(object.nonce)), 0);
                            else if (object.nonce.length >= 0)
                                message.nonce = object.nonce;
                        if (object.networkId != null)
                            if ($util.Long)
                                (message.networkId = $util.Long.fromValue(object.networkId)).unsigned = true;
                            else if (typeof object.networkId === "string")
                                message.networkId = parseInt(object.networkId, 10);
                            else if (typeof object.networkId === "number")
                                message.networkId = object.networkId;
                            else if (typeof object.networkId === "object")
                                message.networkId = new $util.LongBits(object.networkId.low >>> 0, object.networkId.high >>> 0).toNumber(true);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a Transaction message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {tolar.proto.tx.Transaction} message Transaction
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Transaction.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.senderAddress = "";
                            else {
                                object.senderAddress = [];
                                if (options.bytes !== Array)
                                    object.senderAddress = $util.newBuffer(object.senderAddress);
                            }
                            if (options.bytes === String)
                                object.receiverAddress = "";
                            else {
                                object.receiverAddress = [];
                                if (options.bytes !== Array)
                                    object.receiverAddress = $util.newBuffer(object.receiverAddress);
                            }
                            if (options.bytes === String)
                                object.value = "";
                            else {
                                object.value = [];
                                if (options.bytes !== Array)
                                    object.value = $util.newBuffer(object.value);
                            }
                            if (options.bytes === String)
                                object.gas = "";
                            else {
                                object.gas = [];
                                if (options.bytes !== Array)
                                    object.gas = $util.newBuffer(object.gas);
                            }
                            if (options.bytes === String)
                                object.gasPrice = "";
                            else {
                                object.gasPrice = [];
                                if (options.bytes !== Array)
                                    object.gasPrice = $util.newBuffer(object.gasPrice);
                            }
                            if (options.bytes === String)
                                object.data = "";
                            else {
                                object.data = [];
                                if (options.bytes !== Array)
                                    object.data = $util.newBuffer(object.data);
                            }
                            if (options.bytes === String)
                                object.nonce = "";
                            else {
                                object.nonce = [];
                                if (options.bytes !== Array)
                                    object.nonce = $util.newBuffer(object.nonce);
                            }
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.networkId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.networkId = options.longs === String ? "0" : 0;
                        }
                        if (message.senderAddress != null && message.hasOwnProperty("senderAddress"))
                            object.senderAddress = options.bytes === String ? $util.base64.encode(message.senderAddress, 0, message.senderAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.senderAddress) : message.senderAddress;
                        if (message.receiverAddress != null && message.hasOwnProperty("receiverAddress"))
                            object.receiverAddress = options.bytes === String ? $util.base64.encode(message.receiverAddress, 0, message.receiverAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.receiverAddress) : message.receiverAddress;
                        if (message.value != null && message.hasOwnProperty("value"))
                            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                        if (message.gas != null && message.hasOwnProperty("gas"))
                            object.gas = options.bytes === String ? $util.base64.encode(message.gas, 0, message.gas.length) : options.bytes === Array ? Array.prototype.slice.call(message.gas) : message.gas;
                        if (message.gasPrice != null && message.hasOwnProperty("gasPrice"))
                            object.gasPrice = options.bytes === String ? $util.base64.encode(message.gasPrice, 0, message.gasPrice.length) : options.bytes === Array ? Array.prototype.slice.call(message.gasPrice) : message.gasPrice;
                        if (message.data != null && message.hasOwnProperty("data"))
                            object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                        if (message.nonce != null && message.hasOwnProperty("nonce"))
                            object.nonce = options.bytes === String ? $util.base64.encode(message.nonce, 0, message.nonce.length) : options.bytes === Array ? Array.prototype.slice.call(message.nonce) : message.nonce;
                        if (message.networkId != null && message.hasOwnProperty("networkId"))
                            if (typeof message.networkId === "number")
                                object.networkId = options.longs === String ? String(message.networkId) : message.networkId;
                            else
                                object.networkId = options.longs === String ? $util.Long.prototype.toString.call(message.networkId) : options.longs === Number ? new $util.LongBits(message.networkId.low >>> 0, message.networkId.high >>> 0).toNumber(true) : message.networkId;
                        return object;
                    };
    
                    /**
                     * Converts this Transaction to JSON.
                     * @function toJSON
                     * @memberof tolar.proto.tx.Transaction
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Transaction.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for Transaction
                     * @function getTypeUrl
                     * @memberof tolar.proto.tx.Transaction
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    Transaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/tolar.proto.tx.Transaction";
                    };
    
                    return Transaction;
                })();
    
                tx.SignedTransaction = (function() {
    
                    /**
                     * Properties of a SignedTransaction.
                     * @memberof tolar.proto.tx
                     * @interface ISignedTransaction
                     * @property {tolar.proto.tx.ITransaction|null} [body] SignedTransaction body
                     * @property {tolar.proto.ISignatureData|null} [sigData] SignedTransaction sigData
                     */
    
                    /**
                     * Constructs a new SignedTransaction.
                     * @memberof tolar.proto.tx
                     * @classdesc Represents a SignedTransaction.
                     * @implements ISignedTransaction
                     * @constructor
                     * @param {tolar.proto.tx.ISignedTransaction=} [properties] Properties to set
                     */
                    function SignedTransaction(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * SignedTransaction body.
                     * @member {tolar.proto.tx.ITransaction|null|undefined} body
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @instance
                     */
                    SignedTransaction.prototype.body = null;
    
                    /**
                     * SignedTransaction sigData.
                     * @member {tolar.proto.ISignatureData|null|undefined} sigData
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @instance
                     */
                    SignedTransaction.prototype.sigData = null;
    
                    /**
                     * Creates a new SignedTransaction instance using the specified properties.
                     * @function create
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {tolar.proto.tx.ISignedTransaction=} [properties] Properties to set
                     * @returns {tolar.proto.tx.SignedTransaction} SignedTransaction instance
                     */
                    SignedTransaction.create = function create(properties) {
                        return new SignedTransaction(properties);
                    };
    
                    /**
                     * Encodes the specified SignedTransaction message. Does not implicitly {@link tolar.proto.tx.SignedTransaction.verify|verify} messages.
                     * @function encode
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {tolar.proto.tx.ISignedTransaction} message SignedTransaction message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    SignedTransaction.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                            $root.tolar.proto.tx.Transaction.encode(message.body, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.sigData != null && Object.hasOwnProperty.call(message, "sigData"))
                            $root.tolar.proto.SignatureData.encode(message.sigData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified SignedTransaction message, length delimited. Does not implicitly {@link tolar.proto.tx.SignedTransaction.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {tolar.proto.tx.ISignedTransaction} message SignedTransaction message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    SignedTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a SignedTransaction message from the specified reader or buffer.
                     * @function decode
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {tolar.proto.tx.SignedTransaction} SignedTransaction
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    SignedTransaction.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tolar.proto.tx.SignedTransaction();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.body = $root.tolar.proto.tx.Transaction.decode(reader, reader.uint32());
                                    break;
                                }
                            case 2: {
                                    message.sigData = $root.tolar.proto.SignatureData.decode(reader, reader.uint32());
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a SignedTransaction message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {tolar.proto.tx.SignedTransaction} SignedTransaction
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    SignedTransaction.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a SignedTransaction message.
                     * @function verify
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    SignedTransaction.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.body != null && message.hasOwnProperty("body")) {
                            var error = $root.tolar.proto.tx.Transaction.verify(message.body);
                            if (error)
                                return "body." + error;
                        }
                        if (message.sigData != null && message.hasOwnProperty("sigData")) {
                            var error = $root.tolar.proto.SignatureData.verify(message.sigData);
                            if (error)
                                return "sigData." + error;
                        }
                        return null;
                    };
    
                    /**
                     * Creates a SignedTransaction message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {tolar.proto.tx.SignedTransaction} SignedTransaction
                     */
                    SignedTransaction.fromObject = function fromObject(object) {
                        if (object instanceof $root.tolar.proto.tx.SignedTransaction)
                            return object;
                        var message = new $root.tolar.proto.tx.SignedTransaction();
                        if (object.body != null) {
                            if (typeof object.body !== "object")
                                throw TypeError(".tolar.proto.tx.SignedTransaction.body: object expected");
                            message.body = $root.tolar.proto.tx.Transaction.fromObject(object.body);
                        }
                        if (object.sigData != null) {
                            if (typeof object.sigData !== "object")
                                throw TypeError(".tolar.proto.tx.SignedTransaction.sigData: object expected");
                            message.sigData = $root.tolar.proto.SignatureData.fromObject(object.sigData);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a SignedTransaction message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {tolar.proto.tx.SignedTransaction} message SignedTransaction
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    SignedTransaction.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.body = null;
                            object.sigData = null;
                        }
                        if (message.body != null && message.hasOwnProperty("body"))
                            object.body = $root.tolar.proto.tx.Transaction.toObject(message.body, options);
                        if (message.sigData != null && message.hasOwnProperty("sigData"))
                            object.sigData = $root.tolar.proto.SignatureData.toObject(message.sigData, options);
                        return object;
                    };
    
                    /**
                     * Converts this SignedTransaction to JSON.
                     * @function toJSON
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    SignedTransaction.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for SignedTransaction
                     * @function getTypeUrl
                     * @memberof tolar.proto.tx.SignedTransaction
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    SignedTransaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/tolar.proto.tx.SignedTransaction";
                    };
    
                    return SignedTransaction;
                })();
    
                tx.TxExecutionResult = (function() {
    
                    /**
                     * Properties of a TxExecutionResult.
                     * @memberof tolar.proto.tx
                     * @interface ITxExecutionResult
                     * @property {Uint8Array|null} [gasUsed] TxExecutionResult gasUsed
                     * @property {Uint8Array|null} [gasRefunded] TxExecutionResult gasRefunded
                     * @property {Uint8Array|null} [newAddress] TxExecutionResult newAddress
                     * @property {Uint8Array|null} [output] TxExecutionResult output
                     * @property {boolean|null} [excepted] TxExecutionResult excepted
                     */
    
                    /**
                     * Constructs a new TxExecutionResult.
                     * @memberof tolar.proto.tx
                     * @classdesc Represents a TxExecutionResult.
                     * @implements ITxExecutionResult
                     * @constructor
                     * @param {tolar.proto.tx.ITxExecutionResult=} [properties] Properties to set
                     */
                    function TxExecutionResult(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * TxExecutionResult gasUsed.
                     * @member {Uint8Array} gasUsed
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @instance
                     */
                    TxExecutionResult.prototype.gasUsed = $util.newBuffer([]);
    
                    /**
                     * TxExecutionResult gasRefunded.
                     * @member {Uint8Array} gasRefunded
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @instance
                     */
                    TxExecutionResult.prototype.gasRefunded = $util.newBuffer([]);
    
                    /**
                     * TxExecutionResult newAddress.
                     * @member {Uint8Array} newAddress
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @instance
                     */
                    TxExecutionResult.prototype.newAddress = $util.newBuffer([]);
    
                    /**
                     * TxExecutionResult output.
                     * @member {Uint8Array} output
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @instance
                     */
                    TxExecutionResult.prototype.output = $util.newBuffer([]);
    
                    /**
                     * TxExecutionResult excepted.
                     * @member {boolean} excepted
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @instance
                     */
                    TxExecutionResult.prototype.excepted = false;
    
                    /**
                     * Creates a new TxExecutionResult instance using the specified properties.
                     * @function create
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {tolar.proto.tx.ITxExecutionResult=} [properties] Properties to set
                     * @returns {tolar.proto.tx.TxExecutionResult} TxExecutionResult instance
                     */
                    TxExecutionResult.create = function create(properties) {
                        return new TxExecutionResult(properties);
                    };
    
                    /**
                     * Encodes the specified TxExecutionResult message. Does not implicitly {@link tolar.proto.tx.TxExecutionResult.verify|verify} messages.
                     * @function encode
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {tolar.proto.tx.ITxExecutionResult} message TxExecutionResult message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TxExecutionResult.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.gasUsed != null && Object.hasOwnProperty.call(message, "gasUsed"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.gasUsed);
                        if (message.gasRefunded != null && Object.hasOwnProperty.call(message, "gasRefunded"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.gasRefunded);
                        if (message.newAddress != null && Object.hasOwnProperty.call(message, "newAddress"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.newAddress);
                        if (message.output != null && Object.hasOwnProperty.call(message, "output"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.output);
                        if (message.excepted != null && Object.hasOwnProperty.call(message, "excepted"))
                            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.excepted);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified TxExecutionResult message, length delimited. Does not implicitly {@link tolar.proto.tx.TxExecutionResult.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {tolar.proto.tx.ITxExecutionResult} message TxExecutionResult message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TxExecutionResult.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a TxExecutionResult message from the specified reader or buffer.
                     * @function decode
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {tolar.proto.tx.TxExecutionResult} TxExecutionResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TxExecutionResult.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tolar.proto.tx.TxExecutionResult();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.gasUsed = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    message.gasRefunded = reader.bytes();
                                    break;
                                }
                            case 3: {
                                    message.newAddress = reader.bytes();
                                    break;
                                }
                            case 4: {
                                    message.output = reader.bytes();
                                    break;
                                }
                            case 5: {
                                    message.excepted = reader.bool();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a TxExecutionResult message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {tolar.proto.tx.TxExecutionResult} TxExecutionResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TxExecutionResult.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a TxExecutionResult message.
                     * @function verify
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TxExecutionResult.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.gasUsed != null && message.hasOwnProperty("gasUsed"))
                            if (!(message.gasUsed && typeof message.gasUsed.length === "number" || $util.isString(message.gasUsed)))
                                return "gasUsed: buffer expected";
                        if (message.gasRefunded != null && message.hasOwnProperty("gasRefunded"))
                            if (!(message.gasRefunded && typeof message.gasRefunded.length === "number" || $util.isString(message.gasRefunded)))
                                return "gasRefunded: buffer expected";
                        if (message.newAddress != null && message.hasOwnProperty("newAddress"))
                            if (!(message.newAddress && typeof message.newAddress.length === "number" || $util.isString(message.newAddress)))
                                return "newAddress: buffer expected";
                        if (message.output != null && message.hasOwnProperty("output"))
                            if (!(message.output && typeof message.output.length === "number" || $util.isString(message.output)))
                                return "output: buffer expected";
                        if (message.excepted != null && message.hasOwnProperty("excepted"))
                            if (typeof message.excepted !== "boolean")
                                return "excepted: boolean expected";
                        return null;
                    };
    
                    /**
                     * Creates a TxExecutionResult message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {tolar.proto.tx.TxExecutionResult} TxExecutionResult
                     */
                    TxExecutionResult.fromObject = function fromObject(object) {
                        if (object instanceof $root.tolar.proto.tx.TxExecutionResult)
                            return object;
                        var message = new $root.tolar.proto.tx.TxExecutionResult();
                        if (object.gasUsed != null)
                            if (typeof object.gasUsed === "string")
                                $util.base64.decode(object.gasUsed, message.gasUsed = $util.newBuffer($util.base64.length(object.gasUsed)), 0);
                            else if (object.gasUsed.length >= 0)
                                message.gasUsed = object.gasUsed;
                        if (object.gasRefunded != null)
                            if (typeof object.gasRefunded === "string")
                                $util.base64.decode(object.gasRefunded, message.gasRefunded = $util.newBuffer($util.base64.length(object.gasRefunded)), 0);
                            else if (object.gasRefunded.length >= 0)
                                message.gasRefunded = object.gasRefunded;
                        if (object.newAddress != null)
                            if (typeof object.newAddress === "string")
                                $util.base64.decode(object.newAddress, message.newAddress = $util.newBuffer($util.base64.length(object.newAddress)), 0);
                            else if (object.newAddress.length >= 0)
                                message.newAddress = object.newAddress;
                        if (object.output != null)
                            if (typeof object.output === "string")
                                $util.base64.decode(object.output, message.output = $util.newBuffer($util.base64.length(object.output)), 0);
                            else if (object.output.length >= 0)
                                message.output = object.output;
                        if (object.excepted != null)
                            message.excepted = Boolean(object.excepted);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a TxExecutionResult message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {tolar.proto.tx.TxExecutionResult} message TxExecutionResult
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TxExecutionResult.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.gasUsed = "";
                            else {
                                object.gasUsed = [];
                                if (options.bytes !== Array)
                                    object.gasUsed = $util.newBuffer(object.gasUsed);
                            }
                            if (options.bytes === String)
                                object.gasRefunded = "";
                            else {
                                object.gasRefunded = [];
                                if (options.bytes !== Array)
                                    object.gasRefunded = $util.newBuffer(object.gasRefunded);
                            }
                            if (options.bytes === String)
                                object.newAddress = "";
                            else {
                                object.newAddress = [];
                                if (options.bytes !== Array)
                                    object.newAddress = $util.newBuffer(object.newAddress);
                            }
                            if (options.bytes === String)
                                object.output = "";
                            else {
                                object.output = [];
                                if (options.bytes !== Array)
                                    object.output = $util.newBuffer(object.output);
                            }
                            object.excepted = false;
                        }
                        if (message.gasUsed != null && message.hasOwnProperty("gasUsed"))
                            object.gasUsed = options.bytes === String ? $util.base64.encode(message.gasUsed, 0, message.gasUsed.length) : options.bytes === Array ? Array.prototype.slice.call(message.gasUsed) : message.gasUsed;
                        if (message.gasRefunded != null && message.hasOwnProperty("gasRefunded"))
                            object.gasRefunded = options.bytes === String ? $util.base64.encode(message.gasRefunded, 0, message.gasRefunded.length) : options.bytes === Array ? Array.prototype.slice.call(message.gasRefunded) : message.gasRefunded;
                        if (message.newAddress != null && message.hasOwnProperty("newAddress"))
                            object.newAddress = options.bytes === String ? $util.base64.encode(message.newAddress, 0, message.newAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.newAddress) : message.newAddress;
                        if (message.output != null && message.hasOwnProperty("output"))
                            object.output = options.bytes === String ? $util.base64.encode(message.output, 0, message.output.length) : options.bytes === Array ? Array.prototype.slice.call(message.output) : message.output;
                        if (message.excepted != null && message.hasOwnProperty("excepted"))
                            object.excepted = message.excepted;
                        return object;
                    };
    
                    /**
                     * Converts this TxExecutionResult to JSON.
                     * @function toJSON
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TxExecutionResult.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for TxExecutionResult
                     * @function getTypeUrl
                     * @memberof tolar.proto.tx.TxExecutionResult
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    TxExecutionResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/tolar.proto.tx.TxExecutionResult";
                    };
    
                    return TxExecutionResult;
                })();
    
                tx.LogEntry = (function() {
    
                    /**
                     * Properties of a LogEntry.
                     * @memberof tolar.proto.tx
                     * @interface ILogEntry
                     * @property {Uint8Array|null} [address] LogEntry address
                     * @property {Array.<Uint8Array>|null} [topics] LogEntry topics
                     * @property {Uint8Array|null} [data] LogEntry data
                     */
    
                    /**
                     * Constructs a new LogEntry.
                     * @memberof tolar.proto.tx
                     * @classdesc Represents a LogEntry.
                     * @implements ILogEntry
                     * @constructor
                     * @param {tolar.proto.tx.ILogEntry=} [properties] Properties to set
                     */
                    function LogEntry(properties) {
                        this.topics = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * LogEntry address.
                     * @member {Uint8Array} address
                     * @memberof tolar.proto.tx.LogEntry
                     * @instance
                     */
                    LogEntry.prototype.address = $util.newBuffer([]);
    
                    /**
                     * LogEntry topics.
                     * @member {Array.<Uint8Array>} topics
                     * @memberof tolar.proto.tx.LogEntry
                     * @instance
                     */
                    LogEntry.prototype.topics = $util.emptyArray;
    
                    /**
                     * LogEntry data.
                     * @member {Uint8Array} data
                     * @memberof tolar.proto.tx.LogEntry
                     * @instance
                     */
                    LogEntry.prototype.data = $util.newBuffer([]);
    
                    /**
                     * Creates a new LogEntry instance using the specified properties.
                     * @function create
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {tolar.proto.tx.ILogEntry=} [properties] Properties to set
                     * @returns {tolar.proto.tx.LogEntry} LogEntry instance
                     */
                    LogEntry.create = function create(properties) {
                        return new LogEntry(properties);
                    };
    
                    /**
                     * Encodes the specified LogEntry message. Does not implicitly {@link tolar.proto.tx.LogEntry.verify|verify} messages.
                     * @function encode
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {tolar.proto.tx.ILogEntry} message LogEntry message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LogEntry.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
                        if (message.topics != null && message.topics.length)
                            for (var i = 0; i < message.topics.length; ++i)
                                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.topics[i]);
                        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified LogEntry message, length delimited. Does not implicitly {@link tolar.proto.tx.LogEntry.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {tolar.proto.tx.ILogEntry} message LogEntry message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LogEntry.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a LogEntry message from the specified reader or buffer.
                     * @function decode
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {tolar.proto.tx.LogEntry} LogEntry
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LogEntry.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tolar.proto.tx.LogEntry();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.address = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    if (!(message.topics && message.topics.length))
                                        message.topics = [];
                                    message.topics.push(reader.bytes());
                                    break;
                                }
                            case 3: {
                                    message.data = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a LogEntry message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {tolar.proto.tx.LogEntry} LogEntry
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LogEntry.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a LogEntry message.
                     * @function verify
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    LogEntry.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.address != null && message.hasOwnProperty("address"))
                            if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                                return "address: buffer expected";
                        if (message.topics != null && message.hasOwnProperty("topics")) {
                            if (!Array.isArray(message.topics))
                                return "topics: array expected";
                            for (var i = 0; i < message.topics.length; ++i)
                                if (!(message.topics[i] && typeof message.topics[i].length === "number" || $util.isString(message.topics[i])))
                                    return "topics: buffer[] expected";
                        }
                        if (message.data != null && message.hasOwnProperty("data"))
                            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                                return "data: buffer expected";
                        return null;
                    };
    
                    /**
                     * Creates a LogEntry message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {tolar.proto.tx.LogEntry} LogEntry
                     */
                    LogEntry.fromObject = function fromObject(object) {
                        if (object instanceof $root.tolar.proto.tx.LogEntry)
                            return object;
                        var message = new $root.tolar.proto.tx.LogEntry();
                        if (object.address != null)
                            if (typeof object.address === "string")
                                $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                            else if (object.address.length >= 0)
                                message.address = object.address;
                        if (object.topics) {
                            if (!Array.isArray(object.topics))
                                throw TypeError(".tolar.proto.tx.LogEntry.topics: array expected");
                            message.topics = [];
                            for (var i = 0; i < object.topics.length; ++i)
                                if (typeof object.topics[i] === "string")
                                    $util.base64.decode(object.topics[i], message.topics[i] = $util.newBuffer($util.base64.length(object.topics[i])), 0);
                                else if (object.topics[i].length >= 0)
                                    message.topics[i] = object.topics[i];
                        }
                        if (object.data != null)
                            if (typeof object.data === "string")
                                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                            else if (object.data.length >= 0)
                                message.data = object.data;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a LogEntry message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {tolar.proto.tx.LogEntry} message LogEntry
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    LogEntry.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.topics = [];
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.address = "";
                            else {
                                object.address = [];
                                if (options.bytes !== Array)
                                    object.address = $util.newBuffer(object.address);
                            }
                            if (options.bytes === String)
                                object.data = "";
                            else {
                                object.data = [];
                                if (options.bytes !== Array)
                                    object.data = $util.newBuffer(object.data);
                            }
                        }
                        if (message.address != null && message.hasOwnProperty("address"))
                            object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
                        if (message.topics && message.topics.length) {
                            object.topics = [];
                            for (var j = 0; j < message.topics.length; ++j)
                                object.topics[j] = options.bytes === String ? $util.base64.encode(message.topics[j], 0, message.topics[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.topics[j]) : message.topics[j];
                        }
                        if (message.data != null && message.hasOwnProperty("data"))
                            object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                        return object;
                    };
    
                    /**
                     * Converts this LogEntry to JSON.
                     * @function toJSON
                     * @memberof tolar.proto.tx.LogEntry
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    LogEntry.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for LogEntry
                     * @function getTypeUrl
                     * @memberof tolar.proto.tx.LogEntry
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    LogEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/tolar.proto.tx.LogEntry";
                    };
    
                    return LogEntry;
                })();
    
                tx.ExecutedTransaction = (function() {
    
                    /**
                     * Properties of an ExecutedTransaction.
                     * @memberof tolar.proto.tx
                     * @interface IExecutedTransaction
                     * @property {tolar.proto.tx.ISignedTransaction|null} [signedTransaction] ExecutedTransaction signedTransaction
                     * @property {tolar.proto.tx.ITxExecutionResult|null} [executionResult] ExecutedTransaction executionResult
                     * @property {Array.<tolar.proto.tx.ILogEntry>|null} [logs] ExecutedTransaction logs
                     */
    
                    /**
                     * Constructs a new ExecutedTransaction.
                     * @memberof tolar.proto.tx
                     * @classdesc Represents an ExecutedTransaction.
                     * @implements IExecutedTransaction
                     * @constructor
                     * @param {tolar.proto.tx.IExecutedTransaction=} [properties] Properties to set
                     */
                    function ExecutedTransaction(properties) {
                        this.logs = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * ExecutedTransaction signedTransaction.
                     * @member {tolar.proto.tx.ISignedTransaction|null|undefined} signedTransaction
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @instance
                     */
                    ExecutedTransaction.prototype.signedTransaction = null;
    
                    /**
                     * ExecutedTransaction executionResult.
                     * @member {tolar.proto.tx.ITxExecutionResult|null|undefined} executionResult
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @instance
                     */
                    ExecutedTransaction.prototype.executionResult = null;
    
                    /**
                     * ExecutedTransaction logs.
                     * @member {Array.<tolar.proto.tx.ILogEntry>} logs
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @instance
                     */
                    ExecutedTransaction.prototype.logs = $util.emptyArray;
    
                    /**
                     * Creates a new ExecutedTransaction instance using the specified properties.
                     * @function create
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {tolar.proto.tx.IExecutedTransaction=} [properties] Properties to set
                     * @returns {tolar.proto.tx.ExecutedTransaction} ExecutedTransaction instance
                     */
                    ExecutedTransaction.create = function create(properties) {
                        return new ExecutedTransaction(properties);
                    };
    
                    /**
                     * Encodes the specified ExecutedTransaction message. Does not implicitly {@link tolar.proto.tx.ExecutedTransaction.verify|verify} messages.
                     * @function encode
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {tolar.proto.tx.IExecutedTransaction} message ExecutedTransaction message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ExecutedTransaction.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.signedTransaction != null && Object.hasOwnProperty.call(message, "signedTransaction"))
                            $root.tolar.proto.tx.SignedTransaction.encode(message.signedTransaction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.executionResult != null && Object.hasOwnProperty.call(message, "executionResult"))
                            $root.tolar.proto.tx.TxExecutionResult.encode(message.executionResult, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.logs != null && message.logs.length)
                            for (var i = 0; i < message.logs.length; ++i)
                                $root.tolar.proto.tx.LogEntry.encode(message.logs[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified ExecutedTransaction message, length delimited. Does not implicitly {@link tolar.proto.tx.ExecutedTransaction.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {tolar.proto.tx.IExecutedTransaction} message ExecutedTransaction message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ExecutedTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an ExecutedTransaction message from the specified reader or buffer.
                     * @function decode
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {tolar.proto.tx.ExecutedTransaction} ExecutedTransaction
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ExecutedTransaction.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tolar.proto.tx.ExecutedTransaction();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.signedTransaction = $root.tolar.proto.tx.SignedTransaction.decode(reader, reader.uint32());
                                    break;
                                }
                            case 2: {
                                    message.executionResult = $root.tolar.proto.tx.TxExecutionResult.decode(reader, reader.uint32());
                                    break;
                                }
                            case 3: {
                                    if (!(message.logs && message.logs.length))
                                        message.logs = [];
                                    message.logs.push($root.tolar.proto.tx.LogEntry.decode(reader, reader.uint32()));
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an ExecutedTransaction message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {tolar.proto.tx.ExecutedTransaction} ExecutedTransaction
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ExecutedTransaction.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an ExecutedTransaction message.
                     * @function verify
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ExecutedTransaction.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.signedTransaction != null && message.hasOwnProperty("signedTransaction")) {
                            var error = $root.tolar.proto.tx.SignedTransaction.verify(message.signedTransaction);
                            if (error)
                                return "signedTransaction." + error;
                        }
                        if (message.executionResult != null && message.hasOwnProperty("executionResult")) {
                            var error = $root.tolar.proto.tx.TxExecutionResult.verify(message.executionResult);
                            if (error)
                                return "executionResult." + error;
                        }
                        if (message.logs != null && message.hasOwnProperty("logs")) {
                            if (!Array.isArray(message.logs))
                                return "logs: array expected";
                            for (var i = 0; i < message.logs.length; ++i) {
                                var error = $root.tolar.proto.tx.LogEntry.verify(message.logs[i]);
                                if (error)
                                    return "logs." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates an ExecutedTransaction message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {tolar.proto.tx.ExecutedTransaction} ExecutedTransaction
                     */
                    ExecutedTransaction.fromObject = function fromObject(object) {
                        if (object instanceof $root.tolar.proto.tx.ExecutedTransaction)
                            return object;
                        var message = new $root.tolar.proto.tx.ExecutedTransaction();
                        if (object.signedTransaction != null) {
                            if (typeof object.signedTransaction !== "object")
                                throw TypeError(".tolar.proto.tx.ExecutedTransaction.signedTransaction: object expected");
                            message.signedTransaction = $root.tolar.proto.tx.SignedTransaction.fromObject(object.signedTransaction);
                        }
                        if (object.executionResult != null) {
                            if (typeof object.executionResult !== "object")
                                throw TypeError(".tolar.proto.tx.ExecutedTransaction.executionResult: object expected");
                            message.executionResult = $root.tolar.proto.tx.TxExecutionResult.fromObject(object.executionResult);
                        }
                        if (object.logs) {
                            if (!Array.isArray(object.logs))
                                throw TypeError(".tolar.proto.tx.ExecutedTransaction.logs: array expected");
                            message.logs = [];
                            for (var i = 0; i < object.logs.length; ++i) {
                                if (typeof object.logs[i] !== "object")
                                    throw TypeError(".tolar.proto.tx.ExecutedTransaction.logs: object expected");
                                message.logs[i] = $root.tolar.proto.tx.LogEntry.fromObject(object.logs[i]);
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an ExecutedTransaction message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {tolar.proto.tx.ExecutedTransaction} message ExecutedTransaction
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ExecutedTransaction.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.logs = [];
                        if (options.defaults) {
                            object.signedTransaction = null;
                            object.executionResult = null;
                        }
                        if (message.signedTransaction != null && message.hasOwnProperty("signedTransaction"))
                            object.signedTransaction = $root.tolar.proto.tx.SignedTransaction.toObject(message.signedTransaction, options);
                        if (message.executionResult != null && message.hasOwnProperty("executionResult"))
                            object.executionResult = $root.tolar.proto.tx.TxExecutionResult.toObject(message.executionResult, options);
                        if (message.logs && message.logs.length) {
                            object.logs = [];
                            for (var j = 0; j < message.logs.length; ++j)
                                object.logs[j] = $root.tolar.proto.tx.LogEntry.toObject(message.logs[j], options);
                        }
                        return object;
                    };
    
                    /**
                     * Converts this ExecutedTransaction to JSON.
                     * @function toJSON
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ExecutedTransaction.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for ExecutedTransaction
                     * @function getTypeUrl
                     * @memberof tolar.proto.tx.ExecutedTransaction
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ExecutedTransaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/tolar.proto.tx.ExecutedTransaction";
                    };
    
                    return ExecutedTransaction;
                })();
    
                return tx;
            })();
    
            return proto;
        })();
    
        return tolar;
    })();

    return $root;
});
