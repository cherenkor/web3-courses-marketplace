import { Alert } from "@components/common/alert/alert";
import { Loader } from "@components/common/loader/loader";
import { UiButton } from "@components/common/ui-button/ui-button";
import { OwnedCourseCard } from "@components/course/owned-course-card/owned-course-card";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { MarketplaceHero } from "@components/marketplace/marketplace-hero/marketplace-hero";
import { useWeb3 } from "@providers/web3-provider/web3-provider";
import { getAllCourses } from "data/courses/fetcher";
import { useOwnedCourses } from "hooks/use-owned-courses";
import { useAccount } from "hooks/web3.hooks";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { EMarketplaceRoute } from "types/main-route";

export default function OwnedCourses({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { ownedCourses, isLoading, isEmpty } = useOwnedCourses(courses);
  const { account } = useAccount();
  const router = useRouter();
  const { requireInstall } = useWeb3();

  return (
    <>
      <MarketplaceHero />
      <section className="grid grid-cols-1">
        {isLoading && <Loader />}
        {isEmpty && (
          <div className="w-1/2">
            <Alert type="warning">
              <div>You don&apos;t own any courses.</div>
              <Link href={EMarketplaceRoute.Main}>
                <a className="font-normal hover:underline">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Alert>
          </div>
        )}

        {account.isEmpty && (
          <div className="w-1/2">
            <Alert type="warning">
              <div>Please connect to the Metamask</div>
            </Alert>
          </div>
        )}

        {requireInstall && (
          <div className="w-1/2">
            <Alert type="warning">
              <div>Please intall the Metamask</div>
            </Alert>
          </div>
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
