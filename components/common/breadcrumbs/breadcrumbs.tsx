import { IBreadcrumbLink } from "@components/marketplace/marketplace-hero/links";
import cn from "classnames";
import Link from "next/link";
import React from "react";

interface IProps {
  links: IBreadcrumbLink[];
}

export const Breadcrumbs = ({ links }: IProps) => {
  if (!links?.length) return <></>;

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {links.map((link, index) => (
          <li
            key={link.path}
            className={cn({
              "pr-4": index === 0,
              "px-4": index !== 0,
            })}
          >
            <Link href={link.path}>
              <a className="font-medium text-gray-500 hover:text-gray-900">
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
