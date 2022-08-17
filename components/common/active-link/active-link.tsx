import React, {
  DetailedReactHTMLElement,
  PropsWithChildren,
  ReactElement,
} from "react";
import cn from "classnames";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface IProps extends LinkProps {
  children?: ReactElement<{ className?: string }>;
  activeLinkClassName?: string;
}

export const ActiveLink = ({
  children,
  activeLinkClassName,
  ...props
}: IProps) => {
  const { pathname } = useRouter();
  let className =
    children?.props.className ||
    "font-medium text-gray-500 hover:text-gray-900";

  if (pathname === props.href) {
    className = cn(
      className,
      {
        "text-indigo-600": !activeLinkClassName,
      },
      activeLinkClassName
    );
  }

  return (
    <Link {...props}>
      {children && React.cloneElement(children, { className })}
    </Link>
  );
};
