import { Magic } from "magic-sdk";
import { Cache } from "./cache";

const magic =
  typeof window !== "undefined"
    ? new Magic(process.env.MAGIC_LINK_API_KEY || "")
    : null;

const ID_TOKEN_LIFESPAN_SECONDS = 15 * 60;
const ID_TOKEN_CACHE_LIFESPAN_SECONDS = ID_TOKEN_LIFESPAN_SECONDS - 60;
const ID_TOKEN_CACHE_KEY = "magic_token";

export const checkUser = async (setUser: Function) => {
  try {
    if (await magic?.user.isLoggedIn()) {
      const user = await magic?.user.getMetadata();
      setUser(user);
    }
  } catch (e) {
    throw e;
  }
};

export const isLoggedIn = async () => {
  if (!magic) return false;

  return await magic.user.isLoggedIn();
};

export const loginUser = async (email: string, setUser: Function) => {
  try {
    if (!magic) return;

    await magic.auth.loginWithMagicLink({ email });
    const user = await magic.user.getMetadata();
    setUser(user);
  } catch (e) {
    throw e;
  }
};

export const logoutUser = async () => {
  if (!magic) return;
  Cache.delete(ID_TOKEN_CACHE_KEY);
  await magic.user.logout();
};

export const getIdToken = async () => {
  if (!magic) return "";
  const cachedToken = Cache.get(ID_TOKEN_CACHE_KEY);

  if (cachedToken) {
    return cachedToken;
  } else {
    const idToken = await magic.user.getIdToken({
      lifespan: ID_TOKEN_LIFESPAN_SECONDS,
    });
    Cache.set(
      ID_TOKEN_CACHE_KEY,
      idToken || "",
      ID_TOKEN_CACHE_LIFESPAN_SECONDS
    );

    return idToken;
  }
};
