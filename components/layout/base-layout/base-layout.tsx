import React, { PropsWithChildren } from "react";
import { Footer } from "@components/common/footer/footer";
import { Navbar } from "@components/common/navbar/navbar";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <Navbar />

        <div className="fit">{children}</div>
      </div>

      <Footer />
    </>
  );
};
