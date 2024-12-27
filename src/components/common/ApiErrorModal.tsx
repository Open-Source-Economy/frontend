import React from "react";
import cat from "../../assets/catimg.png";
import { IoCloseOutline } from "react-icons/io5";
import { ApiError } from "../../ultils/error/ApiError";
import { ShowApiError } from "./ShowApiError";

interface ErrorModalProps {
  error: ApiError | null;
  showError: boolean;
  setShowError: (value: boolean) => void;
}

export function ApiErrorModal(props: ErrorModalProps) {
  if (!props.error) return null;
  else if (!props.showError) return null;
  else {
    return (
      <div className="bg-[#0E1F35]/10 z-40 backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 size-full">
        <ShowApiError error={props.error} closeError={() => props.setShowError(false)} />
      </div>
    );
  }
}
