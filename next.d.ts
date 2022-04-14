import type {
    NextComponentType,
    NextPageContext,
    NextLayoutComponentType,
  } from 'next';
import type { AppProps } from 'next/app';
  
declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORIGIN: string;
      SENDINBLUE_API:string;
      SENDINBLUE_API_KEY:string;
      SENDINBLUE_LIST_IDS:string;
      MAGIC_LINK_API_KEY:string;
      RECAPTCHA_KEY:string;
      TWITTER_CLIENT_ID:string;
      TWITTER_RETURN_URL:string;
      DISCORD_CLIENT_ID:string;
      DISCORD_CLIENT_SECRET:string;
      DISCORD_RETURN_URL:string;
      MFC_API_BASE_URL:string;
    }
  }
}