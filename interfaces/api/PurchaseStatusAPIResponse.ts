import { PurchaseStatus } from "../../utils/constants";
import { PurchaseAPIResponse } from "./PurchaseAPIResponse";
import { PurchaseStatusData } from "./PurchaseStatusData";

export type PurchaseStatusAPIResponse = PurchaseAPIResponse<{
  /**
   * This data will be set if the status isn't `not-created` or `expired`.
   */
  data?: PurchaseStatusData;

  /**
   * The status of the purchase.
   */
  status: PurchaseStatus;
}>;
