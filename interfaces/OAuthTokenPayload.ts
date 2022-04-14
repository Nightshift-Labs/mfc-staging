export interface OAuthPayload {
    verifier: string,
    challenge: string,
    url: string,
    state: string
}