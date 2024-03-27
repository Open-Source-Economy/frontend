import React from "react";
import * as model from "../../model";
import Sol from "../../assets/images/SOL.png";
import { Link } from "react-router-dom";

interface CollectProps {
  issueStatus: model.IssueStatus;
}

// TODO: to refactor
export function Collect(props: CollectProps) {
  if (props.issueStatus instanceof model.CollectApproved) {
    return (
      <>
        {/*TODO when implemented on the back-end*/}
        {/*<div className="top d-flex align-items-center gap-3">*/}
        {/*  <img src={props.issueStatus.currencyLogo} alt="" className="currency-image" />*/}
        {/*  <div className="text-box">*/}
        {/*    <p className="m-0 helvetica fs-4 text-white">*/}
        {/*      {props.issueStatus.amountCollected}{" "}*/}
        {/*      <span className="fw-bold color-70">*/}
        {/*        / {props.issueStatus.goalAmount} {props.issueStatus.currencySymbol} collected*/}
        {/*      </span>*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="bar my-3"></div>*/}
        {/*<p className="fs-6 helvetica color-70">Collect approved by at least one maintainer</p>*/}
      </>
    );
  } else if (props.issueStatus instanceof model.CollectToBeApproved) {
    return (
      <>
        <div className="top d-flex align-items-center gap-4">
          <div className="text-box">
            <p className="m-0 helvetica fs-4 text-white">
              {props.issueStatus.amountCollected} {props.issueStatus.currencySymbol} collected
            </p>
          </div>
        </div>
        <p className=" fs-6 helvetica color-70" style={{ fontStyle: "italic" }}>
          Collect needs to be approved by at least one maintainer
        </p>
        {/*<div className="text-center d-flex my-3">*/}
        {/*  <Link to="/this" className="register-btn helvetica fw-700 fs-5 text-decoration-none w-100">*/}
        {/*    Register as Maintainer{" "}*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </>
    );
  } else if (props.issueStatus instanceof model.Closed) {
    return (
      <>
        <div className="top d-flex align-items-center gap-4">
          <div className="text-box">
            <p className="m-0 helvetica fs-4 text-white">
              {props.issueStatus.amountCollected} {props.issueStatus.currencySymbol} collected
            </p>
          </div>
        </div>
        <p className=" fs-6 helvetica color-70" style={{ fontStyle: "italic" }}>
          Closed
        </p>
        {/*<div className="top d-flex align-items-center gap-4">*/}
        {/*  <img src={props.issueStatus.currencyLogo} alt="" className="currency-image" />*/}
        {/*  <div className="text-box">*/}
        {/*    <p className="m-0 helvetica fs-4 text-white">*/}
        {/*      {props.issueStatus.amountCollected}*/}
        {/*      {props.issueStatus.goalAmount && (*/}
        {/*        <span className="fw-bold color-70">*/}
        {/*          / {props.issueStatus.goalAmount} {props.issueStatus.currencySymbol} collected*/}
        {/*        </span>*/}
        {/*      )}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="bar2 my-3"></div>*/}
      </>
    );
  } else {
    return <></>;
  }
}
