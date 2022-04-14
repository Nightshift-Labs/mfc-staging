import { EmailSettings } from "./EmailSettings";

export interface PlayerRegistrationBody {
  displayName: string;
  verificationCode: string;
  hasAcceptedTerms: boolean;
  emailSettings: EmailSettings;
}
