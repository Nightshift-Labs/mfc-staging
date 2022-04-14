import { PurchaseData } from "./PurchaseData";

export interface PurchaseStatusData extends PurchaseData {
  /**
   * The Solana transaction id in which the mint token was transferred.
   *
   * This, along with `transferTxVerifiedAt` will be set if the purchase
   * status is `completed`.
   */
  transferTxId?: string;
  transferTxVerifiedAt?: string;

  /**
   * If `type` is `solana`, a Solana transaction id for the user's payment.
   * If `type` is `ethereum`, an Ethereum transaction id for the user's payment.
   *
   * This, along with `paymentTxVerifiedAt` will be set if the purchase
   * status is `confirmed`, `transferring`, or `completed`.
   */
  paymentTxId?: string;
  paymentTxVerifiedAt?: string;
}
