import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// Your WalletConnect Cloud project ID
export const projectId = "16efb93bfe124f9a6281d9c2ab5042ef";

// Create a metadata object
export const metadata = {
  name: "apescreener",
  description: "AppKit Example",
  url: "https://dapp.apescreener.xyz/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  auth: {
    email: false,
    socials: [],
    showWallets: true,
    walletFeatures: true,
  },
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
