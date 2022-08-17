import { Alert } from "@components/common/alert/alert";
import { UiButton } from "@components/common/ui-button/ui-button";
import { OwnedCourseCard } from "@components/course/owned-course-card/owned-course-card";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { MarketplaceHero } from "@components/marketplace/marketplace-hero/marketplace-hero";

export default function OwnedCourses() {
  return (
    <>
      <MarketplaceHero />
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Alert>Purchased</Alert>

          <UiButton>Watch the course</UiButton>
        </OwnedCourseCard>
      </section>
    </>
  );
}

OwnedCourses.Layout = BaseLayout;
