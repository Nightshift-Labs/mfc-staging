export const STATE_KEY = "state";
export const VERIFIER_KEY = "verifier";

export const SOLANA = "solana";
export const ETHEREUM = "ethereum";

export const METAMASK: string = "MetaMask";
export const PHANTOM: string = "Phantom";

export enum PurchaseType {
  Solana = "solana",
  Ethereum = "ethereum",
}

export enum PurchaseStatus {
  NotCreated = "not-created",
  Waiting = "waiting",
  Confirmed = "confirmed",
  Transferring = "transferring",
  Completed = "completed",
  Expired = "expired",
}

export enum steps {
  basicInformation,
  connectWallet,
  connectTwitter,
}

export const AVATARS = {
  gray: "/avatars/gray.png",
  pink: "/avatars/pink.png",
  purple: "/avatars/purple.png",
  red: "/avatars/red.png",
  green: "/avatars/green.png",
  yellow: "/avatars/yellow.png",
};

export const GRAY = "gray";
export const PINK = "pink";
export const PURPLE = "purple";
export const RED = "red";
export const GREEN = "green";
export const YELLOW = "yellow";

export const MODAL_COOKIE_KEY = "modalCookie";
