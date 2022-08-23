import { Alert } from "@components/common/alert/alert";
import { Loader } from "@components/common/loader/loader";
import { UiButton } from "@components/common/ui-button/ui-button";
import { OwnedCourseCard } from "@components/course/owned-course-card/owned-course-card";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { MarketplaceHero } from "@components/marketplace/marketplace-hero/marketplace-hero";
import { getAllCourses } from "data/courses/fetcher";
import { useOwnedCourses } from "hooks/use-owned-courses";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { EMarketplaceRoute } from "types/main-route";

export default function OwnedCourses({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { ownedCourses, hasInitialResponse } = useOwnedCourses(courses);
  const router = useRouter();

  return (
    <>
      <MarketplaceHero />
      <section className="grid grid-cols-1">
        {!hasInitialResponse && <Loader />}
        {hasInitialResponse && !ownedCourses?.length && (
          <Alert type="warning">
            <div>You don&apos;t own any courses.</div>
            <Link href={EMarketplaceRoute.Main}>
              <a className="font-normal hover:underline">
                <i>Purchase Course</i>
              </a>
            </Link>
          </Alert>
        )}

        {(ownedCourses || []).map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <UiButton onClick={() => router.push(`/courses/${course.slug}`)}>
              Watch the course
            </UiButton>
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
