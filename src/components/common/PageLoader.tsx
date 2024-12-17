import React from "react";
import Loading from "./Loading";

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col overflow-hidden relative items-center justify-center h-screen w-full !bg-secondary">
      <div className="bg-gradient-to-r from-[#66319B] to-[#FF518C] -right-[30%] bottom-0 absolute max-w-[50%] w-full rounded-full max-h-[60%] h-full opacity-25 blur-3xl"></div>

      <div className="bg-gradient-to-r from-[#FF518C] to-[#66319B] -bottom-[30%] -left-[30%] absolute max-w-[50%] w-full rounded-full max-h-[60%] h-full opacity-25 blur-3xl"></div>
      <Loading message={message} />
    </div>
  );
};

export default PageLoader;
