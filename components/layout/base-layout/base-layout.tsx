import React, { PropsWithChildren } from "react";
import { Footer } from "@components/common/footer/footer";
import { Navbar } from "@components/common/navbar/navbar";
import { Web3Provider } from "providers/web3-provider/web3-provider";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <Web3Provider>
      <div className="max-w-7xl mx-auto px-4">
        <Navbar />

        <div className="fit">{children}</div>
      </div>

      <Footer />
    </Web3Provider>
  );
};
