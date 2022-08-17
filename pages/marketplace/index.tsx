import { UiButton } from "@components/common/ui-button/ui-button";
import { CourseCard } from "@components/course/course-card/course-card";
import { CourseList } from "@components/course/course-list/course-list";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { MarketplaceHero } from "@components/marketplace/marketplace-hero/marketplace-hero";
import { IOrder } from "@components/order/order-modal/initial-order";
import { OrderModal } from "@components/order/order-modal/order-modal";
import { ICourse, getAllCourses } from "data/courses/fetcher";
import { useWalletInfo } from "hooks/web3.hooks";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";

export default function Marketplace({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const { canPurchaseCurse } = useWalletInfo();

  const purchaseCourse = (order: IOrder) => {
    console.log(order);
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
