import React from "react";

interface ModalBackdropProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ModalBackdrop(props: ModalBackdropProps) {
  if (!props.isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black bg-opacity-60"
          onClick={props.onClose}
        />
        <div className={props.className || "relative"}>
          {props.children}
        </div>
      </div>
    </>
  );
}
