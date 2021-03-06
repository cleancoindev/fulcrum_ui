import { SingleOrBatchRequest, SingleOrBatchResponse, Web3Callback } from "../types";
import { SendPayloadFunction } from "./sendPayload";
/**
 * Returns a "provider" which can be passed to the Web3 constructor.
 */
export declare function makeAlchemyHttpProvider(sendPayload: SendPayloadFunction): {
    sendAsync: (payload: SingleOrBatchRequest, callback: Web3Callback<SingleOrBatchResponse>) => void;
};
