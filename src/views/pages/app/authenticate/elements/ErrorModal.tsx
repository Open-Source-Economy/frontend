import React from "react";
import cat from "../../../../../assets/catimg.png";
import { IoCloseOutline } from "react-icons/io5";

interface ErrorModalProps {
  showNetworkErrorModal: boolean;
  setShowNetworkErrorModal: (value: boolean) => void;
}

export function ErrorModal(props: ErrorModalProps) {
  if (!props.showNetworkErrorModal) return null;
  else
    return (
      <div className="bg-[#0E1F35]/10 z-40 backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 size-full">
        <div className="h-[173px] max-w-[476px] relative w-full px-3 sm:px-0">
          <img src={cat} className="size-20 absolute -top-12 z-50 right-6 object-contain" alt="Error Cat" />
          <div className="border !border-[#FF595B] p-4 bg-[#0E1F35] rounded-xl relative">
            <div className="grid grid-flow-col gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14V23.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M13.4167 8.23953C13.6032 8.19154 13.7987 8.16602 14.0001 8.16602C15.2888 8.16602 16.3334 9.21068 16.3334 10.4993C16.3334 10.7008 16.3079 10.8962 16.2599 11.0827"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M2.33325 2.33398L25.6666 25.6673" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M19.7853 7C20.555 8.01454 21 9.21434 21 10.5C21 11.7857 20.555 12.9855 19.7853 14M8.2147 14C7.445 12.9855 7 11.7857 7 10.5C7 9.67853 7.18167 8.89211 7.51365 8.16667"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.7018 4.66602C24.9428 6.33444 25.6666 8.34083 25.6666 10.4993C25.6666 12.6579 24.9428 14.6642 23.7018 16.3327M4.29802 4.66602C3.05701 6.33444 2.33325 8.34083 2.33325 10.4993C2.33325 12.6579 3.05701 14.6642 4.29802 16.3327"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex gap-1 flex-col">
                <h4 className="text-xl font-medium">ERR_NETWORK: Network error here</h4>
                <p className="text-red-500">If the error persists, please send a message to laurianegmail.com</p>
              </div>
            </div>
            <div
              className="size-8 text-xl absolute -top-3 -right-3 rounded-full bg-[#0E1F35] border !border-[#FF595B] grid place-items-center cursor-pointer"
              onClick={() => props.setShowNetworkErrorModal(false)} // Close modal on click
            >
              <IoCloseOutline />
            </div>
          </div>
        </div>
      </div>
    );
}
