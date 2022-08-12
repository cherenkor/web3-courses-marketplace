import { UiButton } from "@components/common/ui-button/ui-button";
import { CourseCard } from "@components/course/course-card/course-card";
import { CourseList } from "@components/course/course-list/course-list";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { OrderModal } from "@components/order/order-modal/order-modal";
import { WalletBar } from "@components/web3/wallet-bar/wallet-bar";
import { getAllCourses, ICourse } from "data/courses/fetcher";
import { useAccount, useNetwork } from "hooks/web3.hooks";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";

export default function Marketplace({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const { account } = useAccount();
  const { network } = useNetwork();

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
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <UiButton
                  variant="info"
                  onClick={() => setSelectedCourse(course)}
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
