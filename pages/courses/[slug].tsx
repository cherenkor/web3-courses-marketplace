import { Modal } from "@components/common/modal/modal";
import { CourseHero } from "@components/course/course-hero/course-hero";
import { CourseKeypoints } from "@components/course/course-keypoints/course-keypoints";
import { Curriculum } from "@components/course/curriculum/curriculum";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { getAllCourses, ICourse } from "data/courses/fetcher";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";

export default function Course({
  course,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, description, coverImage, wsl } = course;

  return (
    <>
      <div className="py-4">
        <CourseHero
          title={title}
          description={description}
          image={coverImage}
        />
      </div>

      <CourseKeypoints points={wsl} />

      <Curriculum locked={true} />

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
