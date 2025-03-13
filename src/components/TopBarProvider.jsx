"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProviders = ({ children }) => {
  return (
    <div className="z-50">
      <ProgressBar
        height="8px"
        color="#E4080A"
        options={{ showSpinner: true }}
        shallowRouting
      />
      {children}
    </div>
  );
};

export default ProgressBarProviders;
