import React from "react";

const ErrorMessage = ({ message = "An error occurred" }) => {
  return (
    <div className="bg-surface border border-status-error rounded-xl py-6 px-8 mx-auto my-10 max-w-[600px] text-status-error font-semibold text-center shadow-soft flex items-center justify-center gap-4 text-lg animate-shake">
      <span className="text-4xl animate-shake drop-shadow-[0_0_15px_rgba(214,104,83,0.5)]">⚠️</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
