import { useWeb3 } from "providers/web3-provider/web3-provider";
import { useEffect, useMemo } from "react";
import useSWR from "swr";

const NETWORKS_MAP: Record<number, string> = {
  0: "Unsupported Network",
  1: "Ethereum Main Network (Mainnet)",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
  43114: "Avanlanche Network",
};

const targetNetwork =
  NETWORKS_MAP[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as unknown as number];

export const useNetwork = () => {
  const { web3, provider } = useWeb3();
  const swrResponse = useSWR(web3 ? "web3/network" : null, async () => {
    const chainId = await web3?.eth.getChainId();

    return NETWORKS_MAP[chainId as number] || NETWORKS_MAP[0];
  });

  useEffect(() => {
    provider?.on("chainChanged", (chainId: string) => {
      swrResponse.mutate(parseInt(chainId, 16) as unknown as string);
    });
  }, [web3, provider, swrResponse]);

  return useMemo(
    () => ({
      network: {
        ...swrResponse,
        hasInitialResponse: !!swrResponse.data || !!swrResponse.error,
        isSupported: swrResponse.data === targetNetwork,
        target: targetNetwork,
      },
    }),
    [swrResponse]
  );
};

const whitelistedAddresses: Record<any, boolean> = {
  "0x9e9196bf4120c914e5046bb149bd0df8dc797a4b2eb737cd986d92bf4b2b1290": true,
};

export const useAccount = () => {
  const { web3, provider } = useWeb3();
  const swrResponse = useSWR(
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3?.eth.getAccounts();

      if (!accounts?.[0]) {
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      }

      return accounts[0];
    },
    {
      isPaused: () => !web3,
    }
  );

  useEffect(() => {
    const mutator = (accounts: string[]) =>
      swrResponse.mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider, swrResponse.mutate]);

  return {
    isAdmin:
      swrResponse.data &&
      whitelistedAddresses[web3?.utils.keccak256(swrResponse.data) || ""],
    account: {
      ...swrResponse,
      hasInitialResponse: !!swrResponse.data || !!swrResponse.error,
    },
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchaseCurse: !!(account.data && network.isSupported),
  };
};
