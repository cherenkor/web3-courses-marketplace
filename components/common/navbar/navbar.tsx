import Link from "next/link";
import { useWeb3 } from "providers/web3-provider/web3-provider";
import React from "react";
import { EMainRoute } from "types/main-route";
import { UiButton } from "../ui-button/ui-button";

export const Navbar = () => {
  const { connect, isLoading, isWeb3Loaded } = useWeb3();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center ">
            <div>
              <Link href={EMainRoute.Home}>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href={EMainRoute.Marketplace}>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href={EMainRoute.Blogs}>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href={EMainRoute.Wishlist}>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>

              {isWeb3Loaded ? (
                <UiButton
                  onClick={connect}
                  isLoading={isLoading}
                >
                  Connect
                </UiButton>
              ) : (
                <UiButton
                  onClick={() =>
                    window.open(
                      "https://metamask.io/",
                      "_blank"
                    )
                  }
                >
                  Install Metamask
                </UiButton>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};
