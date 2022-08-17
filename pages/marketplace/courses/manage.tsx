import { UiButton } from "@components/common/ui-button/ui-button";
import { CourseFilter } from "@components/course/course-filter/course-filter";
import { OwnedCourseCard } from "@components/course/owned-course-card/owned-course-card";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { MarketplaceHero } from "@components/marketplace/marketplace-hero/marketplace-hero";

export default function ManageCourses() {
  return (
    <>
      <MarketplaceHero />

      <CourseFilter />

      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <div className="flex mr-2 relative rounded-md">
            <input
              type="text"
              name="account"
              id="account"
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
              placeholder="0x2341ab..."
            />
            <UiButton>Verify</UiButton>
          </div>
        </OwnedCourseCard>
      </section>
    </>
  );
}

ManageCourses.Layout = BaseLayout;
