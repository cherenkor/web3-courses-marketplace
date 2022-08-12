import React, { PropsWithChildren } from "react";
import cn from "classnames";

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
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
