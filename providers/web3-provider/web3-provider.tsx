import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

interface IWeb3Api {
  web3: Web3 | null;
  provider: any | null;
  contract: any | null;
  isInitialized: boolean | null;
}

const Web3Context = createContext<IWeb3Api>({
  web3: null,
  provider: null,
  contract: null,
  isInitialized: null,
});

export const Web3Provider = ({ children }: PropsWithChildren) => {
  const [web3Api, setWeb3Api] = useState<IWeb3Api>({
    web3: null,
    provider: null,
    contract: null,
    isInitialized: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider: any = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);

        setWeb3Api({
          provider,
          web3,
          contract: null,
          isInitialized: true,
        });
      } else {
        setWeb3Api((prev) => ({
          ...prev,
          isInitialized: true,
        }));
        console.error("Please, install Metamask.");
      }
    };

    loadProvider();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
