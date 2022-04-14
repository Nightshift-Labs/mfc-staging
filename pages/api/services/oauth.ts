const crypto = require("crypto");

export const oauth = {
  base64URLEncode: (str: any) => {
    return str
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  },

  sha256: (buffer: any) => {
    return crypto.createHash("sha256").update(buffer).digest();
  },

  getCodeVerifier: () => {
    return oauth.base64URLEncode(crypto.randomBytes(32));
  },

  getCodeChallenge: (verifier: any) => {
    return oauth.base64URLEncode(oauth.sha256(verifier));
  },

  getState: () => {
    return crypto.randomBytes(20).toString("hex");
  },
};
