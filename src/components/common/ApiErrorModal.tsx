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
      <>
        <ShowApiError error={props.error} />
        <div
          className="size-8 text-xl absolute -top-3 -right-3 rounded-full bg-[#0E1F35] border !border-[#FF595B] grid place-items-center cursor-pointer"
          onClick={() => props.setShowError(false)} // Close modal on click
        >
          <IoCloseOutline />
        </div>
      </>
    );
  }
}
