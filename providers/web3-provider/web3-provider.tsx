import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

interface IWeb3ApiState {
  web3: Web3 | null;
  provider: any | null;
  contract: any | null;
  isLoading: boolean;
}

interface IWeb3ApiContext extends IWeb3ApiState {
  isWeb3Loaded: boolean;
  connect: () => Promise<void>;
}

const initialWeb3State: IWeb3ApiState = {
  web3: null,
  provider: null,
  contract: null,
  isLoading: true,
};

const Web3Context = createContext<IWeb3ApiContext>(
  {} as IWeb3ApiContext
);

export const Web3Provider = ({
  children,
}: PropsWithChildren) => {
  const [web3Api, setWeb3Api] = useState<IWeb3ApiState>(
    initialWeb3State
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider: any = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);

        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
        });
      } else {
        setWeb3Api((prev) => ({
          ...prev,
          isLoading: false,
        }));
        console.error("Please, install Metamask.");
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    return {
      ...web3Api,
      isWeb3Loaded: !!web3Api.web3,
      connect: async () => {
        if (!web3Api.provider)
          return console.error("Cannot connect to Metamsk");

        try {
          await web3Api.provider.request({
            method: "eth_requestAccounts",
          });
        } catch {
          alert(
            "Cannot retreive account. Page will be reloaded."
          );
          location.reload();
        }
      },
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
