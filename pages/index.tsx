import { HomeHero } from "@components/common/home-hero/home-hero";
import { CourseList } from "@components/course/course-list/course-list";
import { BaseLayout } from "@components/layout/base-layout/base-layout";
import { getAllCourses } from "data/courses/fetcher";
import { InferGetStaticPropsType } from "next";
import { useWeb3 } from "providers/web3-provider/web3-provider";

export default function Home({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { web3, isInitialized } = useWeb3();
  console.log(web3);

  return (
    <>
      {isInitialized ? "Init" : "Waiting"}
      <HomeHero />
      <CourseList courses={courses} />
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

Home.Layout = BaseLayout;
