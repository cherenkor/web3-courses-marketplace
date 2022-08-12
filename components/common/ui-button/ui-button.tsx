import React, { PropsWithChildren } from "react";
import cn from "classnames";
import { LoadingIcon } from "../loading-icon/loading-icon";

interface IProps extends PropsWithChildren {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  hoverable?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "info" | "warning";
}

export const UiButton = ({
  isLoading,
  children,
  className,
  hoverable = true,
  variant = "primary",
  ...props
}: IProps) => {
  const variants = {
    primary: cn("text-white bg-indigo-600", {
      "hover:bg-indigo-700": hoverable,
    }),
    secondary: cn("text-white bg-violet-600", {
      "hover:bg-violet-700": hoverable,
    }),
    danger: cn("text-white bg-red-600", {
      "hover:bg-red-700": hoverable,
    }),
    info: cn("text-indigo-700 bg-indigo-100", {
      "hover:bg-indigo-200": hoverable,
    }),
    warning: cn("text-white bg-orange-600", {
      "hover:bg-orange-700": hoverable,
    }),
  };

  return (
    <button
      type="button"
      {...props}
      className={cn(
        "disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 border cursor-pointer rounded-md text-base font-medium",
        className,
        variants[variant]
      )}
    >
      {isLoading ? (
        <span className="flex items-center">
          <span className="mr-2">
            <LoadingIcon />
          </span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
