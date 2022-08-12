import { ICourse } from "data/courses/fetcher";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { CourseCard } from "../course-card/course-card";

interface IProps {
  courses: ICourse[];
  children(course: ICourse): JSX.Element;
}

export const CourseList = ({ courses = [], children }: IProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => children(course))}
    </section>
  );
};
