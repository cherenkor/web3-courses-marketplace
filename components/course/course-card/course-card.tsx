import React from "react";
import cn from "classnames";
import { ICourse } from "data/courses/fetcher";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  course: ICourse;
  disabled?: boolean;
  Footer?: () => JSX.Element;
}

export const CourseCard = ({ course, Footer, disabled = false }: IProps) => {
  const { coverImage, title, type, description, slug } = course;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex-1 next-image-wrapper">
          <Image
            className={cn("object-cover", {
              "filter grayscale": disabled,
            })}
            layout="responsive"
            width="200"
            height="230"
            src={coverImage}
            alt={title}
          />
        </div>
        <div className="flex-2 p-8 pb-4">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {type}
          </div>
          <Link href={`/courses/${slug}`}>
            <a className="h-12 block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {title}
            </a>
          </Link>
          <p className="mt-2 text-gray-500">
            {description.substring(0, 70)}...
          </p>

          {Footer && <Footer />}
        </div>
      </div>
    </div>
  );
};
