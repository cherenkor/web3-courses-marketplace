import React from "react";

export const Breadcrumbs = () => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {/* <Link href={EMainRoute.Home}>
          <a className="font-medium text-gray-500 hover:text-gray-900">
            Home
          </a>
        </Link> */}
        <li className="pr-4">
          <a className="font-medium text-gray-500 hover:text-gray-900">Buy</a>
        </li>
        <li className="px-4">
          <a className="font-medium text-gray-500 hover:text-gray-900">
            My Courses
          </a>
        </li>
        <li className="px-4">
          <a className="font-medium text-gray-500 hover:text-gray-900">
            Manage Courses
          </a>
        </li>
      </ol>
    </nav>
  );
};
