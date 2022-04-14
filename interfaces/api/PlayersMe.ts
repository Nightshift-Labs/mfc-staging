import { EmailSettings } from "./EmailSettings";

interface Discord {
  username: string;
  id: string;
}

interface Twitter {
  username: string;
  id: string;
}

interface AirdropWallet {
  blockchain: string;
  address: string;
  addedOnUtc: string;
}

interface PaymentWallet {
  blockchain: string;
  address: string;
  addedOnUtc: string;
}

interface Status {
  batchId: string;
  hatchList: boolean;
  waitList: boolean;
  updatedOnUtc: string;
}

export interface PlayersMe {
  id: string;
  displayName: string;
  avatarColor: string;
  email: string;
  emailSettings: EmailSettings;
  paymentWallet: PaymentWallet;
  airdropWallet: AirdropWallet;
  twitter: Twitter;
  discord: Discord;
  status: Status;
}
