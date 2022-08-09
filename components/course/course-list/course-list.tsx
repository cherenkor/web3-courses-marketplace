import { ICourse } from "data/courses/fetcher";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  courses: ICourse[];
}

export const CourseList = ({ courses = [] }: IProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      {courses.map(({ id, title, slug, type, coverImage, description }) => (
        <div
          key={id}
          className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
        >
          <div className="flex h-full">
            <div className="flex h-full">
              <Image
                className="object-cover"
                layout="fixed"
                width="200"
                height="230"
                src={coverImage}
                alt={title}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {type}
              </div>
              <Link href={`/courses/${slug}`}>
                <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                  {title}
                </a>
              </Link>
              <p className="mt-2 text-gray-500">{description} </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
