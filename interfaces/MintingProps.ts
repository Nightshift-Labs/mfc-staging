import { MouseEventHandler } from "react";

export type MintingProps = {
  title?: string;
  pending?: number;
  mintedAmount?: number;
  mintedTotal?: number;
  priceInSol?: number;
  priceInUsd?: number;
  text?: string;
  buttonA?: MintingButton;
  buttonB?: MintingButton;
  buttonSideText?: string;
  windowTitle?: string;
  windowText?: string;
  hideMinted?: boolean;
  complete?: boolean;
  commerceData?: CommerceData;
};

type CommerceData = {
  startTransactionModal?: any;
  coinbaseChargeId?: string;
  showCommerceButton?: boolean;
  setShowCommerceButton?: any;
};

type MintingButton = {
  click: MouseEventHandler<HTMLButtonElement>;
  text: string;
};
