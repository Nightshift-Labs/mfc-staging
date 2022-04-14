import type { NextApiRequest, NextApiResponse } from "next";
import { oauth } from "./services/oauth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const state = oauth.getState();

  const url =
    `https://discord.com/api/oauth2/authorize?response_type=code` +
    `&client_id=${process.env.DISCORD_CLIENT_ID}` +
    `&scope=identify` +
    `&state=${state}` +
    `&redirect_uri=${encodeURI(process.env.DISCORD_RETURN_URL)}` +
    `&prompt=consent`;
  res.status(200).json({ verifier: "", challenge: "", url, state });
}
