import { Breadcrumbs } from "@components/common/breadcrumbs/breadcrumbs";
import { UiButton } from "@components/common/ui-button/ui-button";
import { CourseCard } from "@components/course/course-card/course-card";
import { CourseList } from "@components/course/course-list/course-list";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { OrderModal } from "@components/order/order-modal/order-modal";
import { EthRates } from "@components/web3/eth-rates/eth-rates";
import { WalletBar } from "@components/web3/wallet-bar/wallet-bar";
import { getAllCourses, ICourse } from "data/courses/fetcher";
import { useEthPrice } from "hooks/use-eth-price";
import { useWalletInfo } from "hooks/web3.hooks";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";

export default function Marketplace({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const { eth } = useEthPrice();
  const { account, network, canPurchaseCurse } = useWalletInfo();

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasInitialResponse,
          }}
        />
        <div className="mt-8">
          <EthRates
            eth={eth.data}
            ethPerItem={eth.perItem}
            isLoading={eth.isValidating}
          />
        </div>

        <div className="flex justify-center sm:justify-start flex-row sm:flex-row-reverse pb-4 px-4 sm:px-4 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCurse}
            Footer={() => (
              <div className="mt-4">
                <UiButton
                  variant="info"
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCurse}
                >
                  Purchase
                </UiButton>
              </div>
            )}
          />
        )}
      </CourseList>

      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();

  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
