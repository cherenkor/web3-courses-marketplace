import { Alert } from "@components/common/alert/alert";
import { Loader } from "@components/common/loader/loader";
import { Modal } from "@components/common/modal/modal";
import { CourseHero } from "@components/course/course-hero/course-hero";
import { CourseKeypoints } from "@components/course/course-keypoints/course-keypoints";
import { Curriculum } from "@components/course/curriculum/curriculum";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { getAllCourses } from "data/courses/fetcher";
import { useOwnedCourse } from "hooks/use-owned-course";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { ECourseState, ICourse } from "types/course";

export default function Course({
  course,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, description, coverImage, wsl } = course;
  const { ownedCourse, isLocked, hasInitialResponse } = useOwnedCourse(course);
  const state = ownedCourse?.state;

  return (
    <>
      <div className="py-4">
        <CourseHero
          isOwner={!!ownedCourse}
          title={title}
          description={description}
          image={coverImage}
        />
      </div>

      <CourseKeypoints points={wsl} />

      {!hasInitialResponse && <Loader />}

      {hasInitialResponse && !!state && (
        <div className="max-w-5lg mx-auto mb-6">
          {state === ECourseState.Purchased && (
            <Alert type="warning">
              Course is purchased and waiting for the activation. Process can
              take up to 24 hours.
              <i className="block font-normal">
                In case of any questions, please contact buhanka1994@gmail.com
              </i>
            </Alert>
          )}

          {state === ECourseState.Activated && (
            <Alert type="success">
              Course is activated. Wish you happy learning.
            </Alert>
          )}

          {state === ECourseState.Deactivated && (
            <Alert type="danger">
              Course had been deactivated, due the incorrect purchase data. The
              functionality to wathc the course has been disabled.
              <i className="block font-normal">
                Please contact buhanka1994@gmail.com
              </i>
            </Alert>
          )}
        </div>
      )}

      {state && <Curriculum locked={isLocked} courseState={state} />}

      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();
  const paths = data.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  course: ICourse;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { data } = getAllCourses();
  const course = data.filter(({ slug }) => slug === String(params?.slug))[0];

  return {
    props: {
      course,
    },
  };
};

Course.Layout = BaseLayout;
