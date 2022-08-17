import { IBreadcrumbLink } from "@components/marketplace/marketplace-hero/links";
import cn from "classnames";
import React from "react";
import { ActiveLink } from "../active-link/active-link";

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
            <ActiveLink href={link.path}>
              <a className="text-lg">{link.title}</a>
            </ActiveLink>
          </li>
        ))}
      </ol>
    </nav>
  );
};
