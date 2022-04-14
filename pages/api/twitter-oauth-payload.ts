import type { NextApiRequest, NextApiResponse } from "next";
import { oauth } from "./services/oauth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const verifier = oauth.getCodeVerifier();
  const challenge = oauth.getCodeChallenge(verifier);
  const state = oauth.getState();

  const url =
    `https://twitter.com/i/oauth2/authorize?response_type=code` +
    `&state=${state}` +
    `&client_id=${process.env.TWITTER_CLIENT_ID}` +
    `&redirect_uri=${encodeURI(process.env.TWITTER_RETURN_URL)}` +
    `&scope=tweet.read%20users.read` +
    `&code_challenge=${challenge}` +
    `&code_challenge_method=S256`;
  res.status(200).json({ verifier, challenge, url, state });
}
