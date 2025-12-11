import React from "react";

const LoadingSpinner = ({ message = "Loading news" }) => {
  return (
    <div className="flex flex-col justify-center items-center py-[100px] px-5 min-h-[500px]">
      <div className="w-[60px] h-[60px] border-4 border-surface-highlight border-t-accent-main rounded-full animate-spin shadow-soft relative"></div>
      <p className="mt-10 text-text-muted text-xl font-semibold animate-pulse tracking-wide">
        {message}
        <span>...</span>
      </p>
    </div>
  );
};

export default LoadingSpinner;
