export interface UpdateSocialFromOAuthBody {
  code: string;
  redirectUri: string;
  codeVerifier: string;
}
