import React from "react";
import Image from "next/image";
import { LoadingIcon } from "@components/common/loading-icon/loading-icon";

interface IProps {
  eth?: string | null;
  ethPerItem: string | null;
  isLoading: boolean;
}

export const EthRates = ({ eth, ethPerItem, isLoading }: IProps) => {
  const Logo = () => (
    <Image
      layout="fixed"
      height="35"
      width="35"
      src="/small-eth.webp"
      alt="eth"
    />
  );

  return (
    <div className="grid grid-cols-4 mb-5">
      <div className="flex flex-1 items-stretch text-center">
        <div className="w-11/12 p-6 min-h-rate border drop-shadow rounded-md">
          {isLoading && (
            <div className="fadeIn h-full flex items-center justify-center">
              <LoadingIcon className="text-indigo-500" />
            </div>
          )}
          {eth && (
            <div className="fadeIn">
              <div className="flex items-center justify-center">
                <Logo />

                <span className="text-2xl font-bold"> = ${eth}</span>
              </div>
              <p className="text-xl text-gray-500">Current eth Price</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="w-11/12 p-6 min-h-rate border drop-shadow rounded-md">
          {isLoading && (
            <div className="fadeIn h-full flex items-center justify-center">
              <LoadingIcon className="text-indigo-500" />
            </div>
          )}
          {ethPerItem && (
            <div className="fadeIn">
              <div className="flex items-center justify-center">
                <Logo />
                <span className="text-2xl font-bold">{ethPerItem} = 15$</span>
              </div>
              <p className="text-xl text-gray-500">Price per course</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
