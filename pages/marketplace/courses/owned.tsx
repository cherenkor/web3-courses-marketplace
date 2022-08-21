import { Alert } from "@components/common/alert/alert";
import { Loader } from "@components/common/loader/loader";
import { UiButton } from "@components/common/ui-button/ui-button";
import { OwnedCourseCard } from "@components/course/owned-course-card/owned-course-card";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { MarketplaceHero } from "@components/marketplace/marketplace-hero/marketplace-hero";
import { getAllCourses } from "data/courses/fetcher";
import { useOwnedCourses } from "hooks/use-owned-courses";
import { InferGetStaticPropsType } from "next";

export default function OwnedCourses({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { ownedCourses, error, isValidating } = useOwnedCourses(courses);
  const isLoading = !ownedCourses && !error;

  return (
    <>
      <MarketplaceHero />
      <section className="grid grid-cols-1">
        {isLoading && <Loader />}
        {!isLoading && !ownedCourses?.length && (
          <h2 className="subtitle mb-5 text-xl text-red-500">
            No purchased courses. Please go to the marketplace and buy one :)
          </h2>
        )}

        {(ownedCourses || []).map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            {/* <Alert>Purchased</Alert>  */}

            <UiButton>Watch the course</UiButton>
          </OwnedCourseCard>
        ))}
      </section>
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

OwnedCourses.Layout = BaseLayout;
