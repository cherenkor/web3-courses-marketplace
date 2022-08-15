import { useWalletInfo } from "hooks/web3.hooks";
import { useWeb3 } from "providers/web3-provider/web3-provider";
import React from "react";

export const WalletBar = () => {
  const { requireInstall } = useWeb3();
  const {
    account,
    network: { data: networkData, target, isSupported, hasInitialResponse },
  } = useWalletInfo();
  const address = account.data;

  return (
    <section className="text-white bg-indigo-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-2xl">Hello, {address}</h1>
        <h2 className="subtitle mb-5 text-xl">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                Learn how to purchase
              </a>
            </div>
          </div>
          <div>
            {/* {!hasInitialResponse && <div>Loading...</div>} */}

            {hasInitialResponse && !isSupported && (
              <div className="fadeIn bg-red-400 p-4 rounded-lg">
                <div>Connected to the wrong network</div>
                <div>
                  Connect to: <strong className="text-2xl">{target}</strong>
                </div>
              </div>
            )}

            {requireInstall && (
              <div className="bg-orange-500 p-4 rounded-lg">
                Cannot connect to the Please install Metamask.
              </div>
            )}

            {isSupported && networkData && (
              <div className="fadeIn">
                <span>Currently on </span>
                <strong className="text-2xl">{networkData}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
