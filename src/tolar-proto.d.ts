import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace tolar. */
export namespace tolar {

    /** Namespace proto. */
    namespace proto {

        /** Properties of a SignatureData. */
        interface ISignatureData {

            /** SignatureData hash */
            hash?: (Uint8Array|null);

            /** SignatureData signature */
            signature?: (Uint8Array|null);

            /** SignatureData signerId */
            signerId?: (Uint8Array|null);
        }

        /** Represents a SignatureData. */
        class SignatureData implements ISignatureData {

            /**
             * Constructs a new SignatureData.
             * @param [properties] Properties to set
             */
            constructor(properties?: tolar.proto.ISignatureData);

            /** SignatureData hash. */
            public hash: Uint8Array;

            /** SignatureData signature. */
            public signature: Uint8Array;

            /** SignatureData signerId. */
            public signerId: Uint8Array;

            /**
             * Creates a new SignatureData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SignatureData instance
             */
            public static create(properties?: tolar.proto.ISignatureData): tolar.proto.SignatureData;

            /**
             * Encodes the specified SignatureData message. Does not implicitly {@link tolar.proto.SignatureData.verify|verify} messages.
             * @param message SignatureData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tolar.proto.ISignatureData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SignatureData message, length delimited. Does not implicitly {@link tolar.proto.SignatureData.verify|verify} messages.
             * @param message SignatureData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tolar.proto.ISignatureData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SignatureData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SignatureData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tolar.proto.SignatureData;

            /**
             * Decodes a SignatureData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SignatureData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tolar.proto.SignatureData;

            /**
             * Verifies a SignatureData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SignatureData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SignatureData
             */
            public static fromObject(object: { [k: string]: any }): tolar.proto.SignatureData;

            /**
             * Creates a plain object from a SignatureData message. Also converts values to other types if specified.
             * @param message SignatureData
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tolar.proto.SignatureData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SignatureData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SignatureData
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Namespace tx. */
        namespace tx {

            /** Properties of a Transaction. */
            interface ITransaction {

                /** Transaction senderAddress */
                senderAddress?: (Uint8Array|null);

                /** Transaction receiverAddress */
                receiverAddress?: (Uint8Array|null);

                /** Transaction value */
                value?: (Uint8Array|null);

                /** Transaction gas */
                gas?: (Uint8Array|null);

                /** Transaction gasPrice */
                gasPrice?: (Uint8Array|null);

                /** Transaction data */
                data?: (Uint8Array|null);

                /** Transaction nonce */
                nonce?: (Uint8Array|null);

                /** Transaction networkId */
                networkId?: (number|Long|null);
            }

            /** Represents a Transaction. */
            class Transaction implements ITransaction {

                /**
                 * Constructs a new Transaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tolar.proto.tx.ITransaction);

                /** Transaction senderAddress. */
                public senderAddress: Uint8Array;

                /** Transaction receiverAddress. */
                public receiverAddress: Uint8Array;

                /** Transaction value. */
                public value: Uint8Array;

                /** Transaction gas. */
                public gas: Uint8Array;

                /** Transaction gasPrice. */
                public gasPrice: Uint8Array;

                /** Transaction data. */
                public data: Uint8Array;

                /** Transaction nonce. */
                public nonce: Uint8Array;

                /** Transaction networkId. */
                public networkId: (number|Long);

                /**
                 * Creates a new Transaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Transaction instance
                 */
                public static create(properties?: tolar.proto.tx.ITransaction): tolar.proto.tx.Transaction;

                /**
                 * Encodes the specified Transaction message. Does not implicitly {@link tolar.proto.tx.Transaction.verify|verify} messages.
                 * @param message Transaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tolar.proto.tx.ITransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Transaction message, length delimited. Does not implicitly {@link tolar.proto.tx.Transaction.verify|verify} messages.
                 * @param message Transaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tolar.proto.tx.ITransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Transaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Transaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tolar.proto.tx.Transaction;

                /**
                 * Decodes a Transaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Transaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tolar.proto.tx.Transaction;

                /**
                 * Verifies a Transaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Transaction
                 */
                public static fromObject(object: { [k: string]: any }): tolar.proto.tx.Transaction;

                /**
                 * Creates a plain object from a Transaction message. Also converts values to other types if specified.
                 * @param message Transaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tolar.proto.tx.Transaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Transaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Transaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SignedTransaction. */
            interface ISignedTransaction {

                /** SignedTransaction body */
                body?: (tolar.proto.tx.ITransaction|null);

                /** SignedTransaction sigData */
                sigData?: (tolar.proto.ISignatureData|null);
            }

            /** Represents a SignedTransaction. */
            class SignedTransaction implements ISignedTransaction {

                /**
                 * Constructs a new SignedTransaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tolar.proto.tx.ISignedTransaction);

                /** SignedTransaction body. */
                public body?: (tolar.proto.tx.ITransaction|null);

                /** SignedTransaction sigData. */
                public sigData?: (tolar.proto.ISignatureData|null);

                /**
                 * Creates a new SignedTransaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SignedTransaction instance
                 */
                public static create(properties?: tolar.proto.tx.ISignedTransaction): tolar.proto.tx.SignedTransaction;

                /**
                 * Encodes the specified SignedTransaction message. Does not implicitly {@link tolar.proto.tx.SignedTransaction.verify|verify} messages.
                 * @param message SignedTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tolar.proto.tx.ISignedTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SignedTransaction message, length delimited. Does not implicitly {@link tolar.proto.tx.SignedTransaction.verify|verify} messages.
                 * @param message SignedTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tolar.proto.tx.ISignedTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SignedTransaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SignedTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tolar.proto.tx.SignedTransaction;

                /**
                 * Decodes a SignedTransaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SignedTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tolar.proto.tx.SignedTransaction;

                /**
                 * Verifies a SignedTransaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SignedTransaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SignedTransaction
                 */
                public static fromObject(object: { [k: string]: any }): tolar.proto.tx.SignedTransaction;

                /**
                 * Creates a plain object from a SignedTransaction message. Also converts values to other types if specified.
                 * @param message SignedTransaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tolar.proto.tx.SignedTransaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SignedTransaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SignedTransaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a TxExecutionResult. */
            interface ITxExecutionResult {

                /** TxExecutionResult gasUsed */
                gasUsed?: (Uint8Array|null);

                /** TxExecutionResult gasRefunded */
                gasRefunded?: (Uint8Array|null);

                /** TxExecutionResult newAddress */
                newAddress?: (Uint8Array|null);

                /** TxExecutionResult output */
                output?: (Uint8Array|null);

                /** TxExecutionResult excepted */
                excepted?: (boolean|null);
            }

            /** Represents a TxExecutionResult. */
            class TxExecutionResult implements ITxExecutionResult {

                /**
                 * Constructs a new TxExecutionResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tolar.proto.tx.ITxExecutionResult);

                /** TxExecutionResult gasUsed. */
                public gasUsed: Uint8Array;

                /** TxExecutionResult gasRefunded. */
                public gasRefunded: Uint8Array;

                /** TxExecutionResult newAddress. */
                public newAddress: Uint8Array;

                /** TxExecutionResult output. */
                public output: Uint8Array;

                /** TxExecutionResult excepted. */
                public excepted: boolean;

                /**
                 * Creates a new TxExecutionResult instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TxExecutionResult instance
                 */
                public static create(properties?: tolar.proto.tx.ITxExecutionResult): tolar.proto.tx.TxExecutionResult;

                /**
                 * Encodes the specified TxExecutionResult message. Does not implicitly {@link tolar.proto.tx.TxExecutionResult.verify|verify} messages.
                 * @param message TxExecutionResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tolar.proto.tx.ITxExecutionResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TxExecutionResult message, length delimited. Does not implicitly {@link tolar.proto.tx.TxExecutionResult.verify|verify} messages.
                 * @param message TxExecutionResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tolar.proto.tx.ITxExecutionResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TxExecutionResult message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TxExecutionResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tolar.proto.tx.TxExecutionResult;

                /**
                 * Decodes a TxExecutionResult message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TxExecutionResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tolar.proto.tx.TxExecutionResult;

                /**
                 * Verifies a TxExecutionResult message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TxExecutionResult message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TxExecutionResult
                 */
                public static fromObject(object: { [k: string]: any }): tolar.proto.tx.TxExecutionResult;

                /**
                 * Creates a plain object from a TxExecutionResult message. Also converts values to other types if specified.
                 * @param message TxExecutionResult
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tolar.proto.tx.TxExecutionResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TxExecutionResult to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TxExecutionResult
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a LogEntry. */
            interface ILogEntry {

                /** LogEntry address */
                address?: (Uint8Array|null);

                /** LogEntry topics */
                topics?: (Uint8Array[]|null);

                /** LogEntry data */
                data?: (Uint8Array|null);
            }

            /** Represents a LogEntry. */
            class LogEntry implements ILogEntry {

                /**
                 * Constructs a new LogEntry.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tolar.proto.tx.ILogEntry);

                /** LogEntry address. */
                public address: Uint8Array;

                /** LogEntry topics. */
                public topics: Uint8Array[];

                /** LogEntry data. */
                public data: Uint8Array;

                /**
                 * Creates a new LogEntry instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LogEntry instance
                 */
                public static create(properties?: tolar.proto.tx.ILogEntry): tolar.proto.tx.LogEntry;

                /**
                 * Encodes the specified LogEntry message. Does not implicitly {@link tolar.proto.tx.LogEntry.verify|verify} messages.
                 * @param message LogEntry message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tolar.proto.tx.ILogEntry, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LogEntry message, length delimited. Does not implicitly {@link tolar.proto.tx.LogEntry.verify|verify} messages.
                 * @param message LogEntry message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tolar.proto.tx.ILogEntry, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LogEntry message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LogEntry
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tolar.proto.tx.LogEntry;

                /**
                 * Decodes a LogEntry message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LogEntry
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tolar.proto.tx.LogEntry;

                /**
                 * Verifies a LogEntry message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LogEntry message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LogEntry
                 */
                public static fromObject(object: { [k: string]: any }): tolar.proto.tx.LogEntry;

                /**
                 * Creates a plain object from a LogEntry message. Also converts values to other types if specified.
                 * @param message LogEntry
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tolar.proto.tx.LogEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LogEntry to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for LogEntry
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an ExecutedTransaction. */
            interface IExecutedTransaction {

                /** ExecutedTransaction signedTransaction */
                signedTransaction?: (tolar.proto.tx.ISignedTransaction|null);

                /** ExecutedTransaction executionResult */
                executionResult?: (tolar.proto.tx.ITxExecutionResult|null);

                /** ExecutedTransaction logs */
                logs?: (tolar.proto.tx.ILogEntry[]|null);
            }

            /** Represents an ExecutedTransaction. */
            class ExecutedTransaction implements IExecutedTransaction {

                /**
                 * Constructs a new ExecutedTransaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tolar.proto.tx.IExecutedTransaction);

                /** ExecutedTransaction signedTransaction. */
                public signedTransaction?: (tolar.proto.tx.ISignedTransaction|null);

                /** ExecutedTransaction executionResult. */
                public executionResult?: (tolar.proto.tx.ITxExecutionResult|null);

                /** ExecutedTransaction logs. */
                public logs: tolar.proto.tx.ILogEntry[];

                /**
                 * Creates a new ExecutedTransaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ExecutedTransaction instance
                 */
                public static create(properties?: tolar.proto.tx.IExecutedTransaction): tolar.proto.tx.ExecutedTransaction;

                /**
                 * Encodes the specified ExecutedTransaction message. Does not implicitly {@link tolar.proto.tx.ExecutedTransaction.verify|verify} messages.
                 * @param message ExecutedTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tolar.proto.tx.IExecutedTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ExecutedTransaction message, length delimited. Does not implicitly {@link tolar.proto.tx.ExecutedTransaction.verify|verify} messages.
                 * @param message ExecutedTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tolar.proto.tx.IExecutedTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ExecutedTransaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ExecutedTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tolar.proto.tx.ExecutedTransaction;

                /**
                 * Decodes an ExecutedTransaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ExecutedTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tolar.proto.tx.ExecutedTransaction;

                /**
                 * Verifies an ExecutedTransaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ExecutedTransaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ExecutedTransaction
                 */
                public static fromObject(object: { [k: string]: any }): tolar.proto.tx.ExecutedTransaction;

                /**
                 * Creates a plain object from an ExecutedTransaction message. Also converts values to other types if specified.
                 * @param message ExecutedTransaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tolar.proto.tx.ExecutedTransaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ExecutedTransaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ExecutedTransaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }
}
