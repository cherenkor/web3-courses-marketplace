import { useAccount } from "hooks/web3.hooks";
import Link from "next/link";
import { useWeb3 } from "providers/web3-provider/web3-provider";
import React from "react";
import { EMainRoute } from "types/main-route";
import { UiButton } from "../ui-button/ui-button";

export const Navbar = () => {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account, isAdmin } = useAccount();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-0">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center">
            <div className="w-full px-8 sm:px-0 flex justify-between sm:justify-start items-center">
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
                <a className="font-medium mr-0 sm:mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div className="w-full px-8 sm:px-0 flex justify-between items-center sm:justify-end mt-4 sm:mt-0">
              <Link href={EMainRoute.Wishlist}>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>

              {isLoading ? (
                <UiButton onClick={connect} isLoading={true}>
                  Loading...
                </UiButton>
              ) : !!account.data ? (
                <UiButton hoverable={false} className="cursor-default">
                  <span className="flex">
                    <span className="mr-2">
                      {isAdmin ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="20px"
                          color="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.48"
                            d="M1 4C1 2.89543 1.89543 2 3 2H18.8571C20.0406 2 21 2.95939 21 4.14286V6H3C1.89543 6 1 5.10457 1 4Z"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1 4C1 5.10457 1.89543 6 3 6L21 6C22.1046 6 23 6.89543 23 8V20C23 21.1046 22.1046 22 21 22H3C1.89543 22 1 21.1046 1 20V4ZM21 14C21 15.1046 20.1046 16 19 16C17.8954 16 17 15.1046 17 14C17 12.8954 17.8954 12 19 12C20.1046 12 21 12.8954 21 14Z"
                          ></path>
                        </svg>
                      )}
                    </span>
                    <abbr title={account.data}>
                      {account.data.slice(0, 4)}...{account.data.slice(-4)}
                    </abbr>
                  </span>
                </UiButton>
              ) : requireInstall ? (
                <UiButton
                  onClick={() => window.open("https://metamask.io/", "_blank")}
                >
                  Install Metamask
                </UiButton>
              ) : (
                <UiButton onClick={connect}>Connect</UiButton>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};
