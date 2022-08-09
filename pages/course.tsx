import { Modal } from "@components/common/modal/modal";
import { CourseHero } from "@components/course/course-hero/course-hero";
import { CourseKeypoints } from "@components/course/course-keypoints/course-keypoints";
import { Curriculum } from "@components/course/curriculum/curriculum";
import { BaseLayout } from "@components/layout/base-layout/base-layout";

export default function Course() {
  return (
    <>
      <div className="py-4">
        <CourseHero />
      </div>

      <CourseKeypoints />
      <Curriculum />

      <Modal />
    </>
  );
}

Course.Layout = BaseLayout;
