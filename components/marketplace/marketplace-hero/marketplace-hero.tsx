import { Breadcrumbs } from "@components/common/breadcrumbs/breadcrumbs";
import { EthRates } from "@components/web3/eth-rates/eth-rates";
import { WalletBar } from "@components/web3/wallet-bar/wallet-bar";
import { MARKETPLACE_BREADCRUMBS_LINKS } from "./links";

export const MarketplaceHero = () => {
  return (
    <div className="py-4">
      <WalletBar />
      <div className="mt-8">
        <EthRates />
      </div>

      <div className="flex justify-center sm:justify-start flex-row sm:flex-row-reverse pb-4 px-4 sm:px-4 lg:px-8">
        <Breadcrumbs links={MARKETPLACE_BREADCRUMBS_LINKS} />
      </div>
    </div>
  );
};
