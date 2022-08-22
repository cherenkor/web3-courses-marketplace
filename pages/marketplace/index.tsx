import { UiButton } from "@components/common/ui-button/ui-button";
import { CourseCard } from "@components/course/course-card/course-card";
import { CourseList } from "@components/course/course-list/course-list";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { MarketplaceHero } from "@components/marketplace/marketplace-hero/marketplace-hero";
import { IOrder } from "@components/order/order-modal/initial-order";
import { OrderModal } from "@components/order/order-modal/order-modal";
import { useWeb3 } from "@providers/web3-provider/web3-provider";
import { contractParamsFromCourse } from "@utils/contract-params-from-course";
import { getAllCourses } from "data/courses/fetcher";
import { useAccount, useWalletInfo } from "hooks/web3.hooks";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import { ICourse } from "types/course";

export default function Marketplace({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const { canPurchaseCurse } = useWalletInfo();
  const { account } = useAccount();
  const { web3, contract } = useWeb3();

  const purchaseCourse = async (order: IOrder) => {
    if (!selectedCourse?.id || !web3 || !account.data) {
      console.error("Something went wrong, please try again");
      return;
    }

    const { hexCourseId, courseHash, emailHash, proof } =
      contractParamsFromCourse({
        web3,
        account: account.data,
        email: order.email,
        courseId: selectedCourse.id,
      });

    if (!emailHash || !courseHash) {
      console.error("emailHash or courseHash was not provided");
      return;
    }

    try {
      const value = web3.utils.toWei(String(order.price));

      await contract.methods.purchaseCourse(hexCourseId, proof).send({
        from: account.data,
        value,
      });
    } catch (err) {
      console.error("Purchase course failed: ", err);
    }
  };

  return (
    <>
      <MarketplaceHero />

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
          onSubmit={purchaseCourse}
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
