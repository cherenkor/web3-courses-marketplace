import { OwnedCourseCard } from "@components/course/owned-course-card/owned-course-card";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { MarketplaceHero } from "@components/marketplace/marketplace-hero/marketplace-hero";

export default function OwnedCourses() {
  return (
    <>
      <MarketplaceHero />

      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </>
  );
}

OwnedCourses.Layout = BaseLayout;
