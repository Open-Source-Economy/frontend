import React, { ReactNode, useState } from "react";

interface FormInputProps {
  fontAwesomeClassName: string;

  label?: string;
  isValid?: boolean;
  errorMessage?: string;
  children: ReactNode;
}

export function FormInput(props: FormInputProps) {
  const [isValid, _] = useState(true);

  return (
    <>
      <div className="form-group pb-2 m-0">
        {props.label && (
          <div className="px-lg- py-2">
            <label htmlFor="" className="helvetica text-white">
              {props.label}
            </label>
          </div>
        )}

        <div className={`form-control form-input helvetica border-0 ${props.isValid ? "" : "is-invalid"}`}>
          <div className="helvetica d-flex align-items-center color-70 m-0">
            {/* TODO: should use the react one ? */}
            {/*<FontAwesomeIcon icon="fa-solid fa-dollar-sign" />*/}
            <i className={`fa-solid ${props.fontAwesomeClassName} fs-5`} aria-hidden="true"></i>
            <div className="ps-2 fs-4 w-100">{props.children}</div>
          </div>
        </div>
        {!isValid && <div className="invalid-feedback">{props.errorMessage}</div>}
      </div>
    </>
  );
}
