import { BasePurchaseAPIResponse } from "./BasePurchaseAPIResponse";

export interface PurchaseAPIResponse<T> extends BasePurchaseAPIResponse {
  /**
   * The result of the response, if successful.
   */
  result?: T;
}
