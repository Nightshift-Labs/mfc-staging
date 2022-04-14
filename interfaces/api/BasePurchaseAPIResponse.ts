export interface BasePurchaseAPIResponse {
  /**
   * Whether or not the API call was successful.
   */
  success: boolean;

  /**
   * A message to be displayed to the user if the API call failed.
   */
  message?: string;
}
