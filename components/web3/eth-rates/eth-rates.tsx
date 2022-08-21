import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LoadingIcon } from "@components/common/loading-icon/loading-icon";
import { COURSE_PRICE, useEthPrice } from "hooks/use-eth-price";
import { Loader } from "@components/common/loader/loader";

export const EthRates = () => {
  const { eth } = useEthPrice();
  const ethPerItem = eth.perItem;
  const isLoading = eth.isValidating;

  const Logo = () => (
    <Image
      layout="fixed"
      height="35"
      width="35"
      src="/small-eth.webp"
      alt="eth"
    />
  );

  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) setLoading(false);
  }, [isLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      <div className="flex flex-1 items-stretch text-center">
        <div className="w-full sm:w-11/12 p-6 min-h-rate border drop-shadow rounded-md">
          <div className="fadeIn">
            <div className="flex items-center justify-center">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Logo />
                  {eth?.data && (
                    <span className="text-xl font-bold"> = ${eth?.data}</span>
                  )}
                </>
              )}
            </div>
            <p className="text-lg text-gray-500">Current eth Price</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="w-full sm:w-11/12 p-6 min-h-rate border drop-shadow rounded-md">
          <div className="fadeIn">
            <div className="flex items-center justify-center">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Logo />
                  {ethPerItem && (
                    <span className="text-xl font-bold">
                      {ethPerItem} = {COURSE_PRICE}$
                    </span>
                  )}
                </>
              )}
            </div>
            <p className="text-lg text-gray-500">Price per course</p>
          </div>
        </div>
      </div>
    </div>
  );
};
