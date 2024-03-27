import React, { useState } from "react";
import { CheckInputHandle, EmailInput, NumberInput, SuccessModal } from "../../../../components";

interface FiatPaymentProps {}

export function FiatPayment(props: FiatPaymentProps) {
  const emailInputRef = React.useRef<CheckInputHandle>(null);
  const numberInputRef = React.useRef<CheckInputHandle>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const closeSuccessCallback = () => {
    emailInputRef.current?.clear();
    numberInputRef.current?.clear();
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent default form submission behavior

    const isEmailValid = emailInputRef.current?.check();
    const isNumberValid = numberInputRef.current?.check();

    if (isEmailValid && isNumberValid) {
      // TODO: You can trigger an API call, update states, etc.
      setShowSuccess(true);
    }
  };

  return (
    <>
      <form className="form-small mt-3 flex-column gap-1 align-items-center position-relative">
        <EmailInput label={"Your email"} ref={emailInputRef} />

        <NumberInput label={"Funding amount"} ref={numberInputRef} fontAwesomeClassName={"fa-dollar-sign"} />

        <button onClick={handleSubmit} className="connect__btn w-100 helvetica fw-700 fs-5 mt-4">
          Fund the issue
        </button>
      </form>
      <SuccessModal title={"Issue funded"} show={showSuccess} setShow={setShowSuccess} closeCallback={closeSuccessCallback} />
    </>
  );
}
