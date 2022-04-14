import { PurchaseAPIResponse } from "./PurchaseAPIResponse";

export type MintStatusAPIResponse = PurchaseAPIResponse<{
  /**
   * The total number of mint passes for this drop
   */
  total: number;

  /**
   * The remaining number of mint passes for this drop
   */
  available: number;

  pending: number;

  claimed: number;

  /**
   * Whether or not the hatchlist is currently open for minting
   */
  hatchListOpen: boolean;

  /**
   * The UTC time at which the hatchlist opens for minting
   */
  hatchListOpensAtUtc: string;

  /**
   * Whether or not the waitlist is currently open for minting
   */
  waitListOpen: boolean;

  /**
   * The UTC time at which the waitlist opens for minting
   */
  waitListOpensAtUtc: string;

  /**
   * The price in SOL
   */
  priceInSol: number;

  /**
   * The price in USD
   */
  priceInUsd: number;

  /**
   * Address of the token mint for mint passes
   */
  mintAddress: string;
}>;
