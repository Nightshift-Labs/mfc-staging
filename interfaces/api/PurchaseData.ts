import { PurchaseType } from "../../utils/constants";

export interface PurchaseData {
  type: PurchaseType;

  /**
   * If `type` is `solana`, a Solana Pay URL.
   * If `type` is `ethereum`, a Coinbase Commerce charge id.
   */
  accessor: string;

  /**
   * The address that the NFT will be airdropped to.
   */
  airdropAddress: string;

  /**
   * The UTC time at which the purchase was created.
   */
  createdAt: string;

  /**
   * The UTC time at which the purchase expires.
   */
  expiresAt: string;
}
