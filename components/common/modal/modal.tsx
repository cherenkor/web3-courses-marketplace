import React, { PropsWithChildren, useEffect, useState } from "react";
import cn from "classnames";

interface IProps {
  isOpen?: boolean;
}

export const Modal = ({
  isOpen = false,
  children,
}: PropsWithChildren<IProps>) => {
  return (
    <section>
      <div
        className={cn("fadeIn fixed z-10 inset-0 overflow-y-auto", {
          hidden: !isOpen,
        })}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {isOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          )}

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {children}
        </div>
      </div>
    </section>
  );
};
