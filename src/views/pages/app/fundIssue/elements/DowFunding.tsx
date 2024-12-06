import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { Button } from "src/components";
import { FundIssueBody, FundIssueParams, FundIssueQuery } from "src/dtos";
import { GetAvailableDowParams, GetAvailableDowQuery } from "src/dtos/user/GetAvailableDow";
import { IssueId } from "src/model";
import { getBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";
import { useDowCounter } from "src/views/hooks";
import { useAuth } from "src/views/pages/app/authenticate/AuthContext";

interface DowFundingProps {
  onIssueFundingSuccess: () => void;
  issueId: IssueId;
}

export function DowFunding(props: DowFundingProps) {
  const auth = useAuth();
  const backendAPI = getBackendAPI();

  const { counter, handleInputChange, increment, decrement } = useDowCounter();
  const [availableDoWAmount, setAvailableDoWAmount] = useState<Decimal>(new Decimal(0));
  const [enoughFund, setEnoughFund] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | string | null>(null);

  const fundIssue = async () => {
    if (!counter) {
      setError("Please enter a valid amount.");
    } else if (counter.lessThanOrEqualTo(availableDoWAmount)) {
      const params: FundIssueParams = {
        owner: props.issueId.repositoryId.ownerId.login,
        repo: props.issueId.repositoryId.name,
        number: props.issueId.number,
      };
      const body: FundIssueBody = {
        companyId: auth.authInfo?.company?.id.uuid,
        dowAmount: counter.toString(),
      };
      const query: FundIssueQuery = {};
      try {
        await backendAPI.fundIssue(params, body, query);
        //   TODO: reload
        // display success message
        props.onIssueFundingSuccess();
      } catch (error) {
        console.error("Error funding issue:", error);
        setError("Failed to fund issue. Please try again later.");
      }
    }
  };

  const getAvailableDoWs = async () => {
    try {
      const params: GetAvailableDowParams = {};
      const query: GetAvailableDowQuery = {
        companyId: auth.authInfo?.company?.id.uuid,
      };
      const dowAmount = await backendAPI.getAvailableDow(params, query);
      if (dowAmount instanceof ApiError) setError(dowAmount);
      else setAvailableDoWAmount(dowAmount);
    } catch (error) {
      setError(ApiError.from(error));
    }
  };

  useEffect(() => {
    getAvailableDoWs();
  }, []);

  useEffect(() => {
    if (availableDoWAmount.isZero()) setEnoughFund(false);
    else if (!counter) setEnoughFund(true);
    else setEnoughFund(counter.lessThanOrEqualTo(availableDoWAmount));
  }, [counter, availableDoWAmount]);

  return (
    <>
      <h2 className="text-end montserrat text-base md:text-base lg:text-[20px]">
        Your Credits <span className="text-[#8693A4] text-[20px]">-</span>{" "}
        <span className="text-[#FF518C] cursor-pointer hover:underline">{availableDoWAmount.toNumber()} DoW</span>
      </h2>
      <div className="!mt-5 lg:!mt-9 bg-[rgba(255,255,255,10%)] rounded-[10px] py-[15px] px-3 w-[100%]">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex-1">
            <h2 className="text-[#A1A7B0] text-lg">Fund</h2>

            {/*TODO: this part could be refactored with CounterInput*/}

            <input
              type="number"
              value={counter ? counter.toNumber() : undefined}
              placeholder="0.0"
              onChange={handleInputChange}
              className="border-0 outline-none md:text-[33px] text-[20px] w-full bg-transparent"
            />
          </div>
          <div
            className="
          flex items-center mt-4"
          >
            <div className="d-flex w-10 lg:w-14 flex-col gap-2 lg:!gap-4">
              {/* <img src={up} className="md:w-[22px] w-[18px] h-3 cursor-pointer " onClick={increment} alt="" /> */}
              <span className="w-full cursor-pointer " onClick={increment}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:min-w-[22px] lg:w-full sm:max-w-7 md:h-[18px] max-w-5"
                  width="100%"
                  height="100%"
                  viewBox="0 0 27 18"
                  fill="none"
                >
                  <path
                    d="M1.86396 17.3359C0.278298 17.3359 -0.549899 15.2506 0.406713 13.9035L0.548157 13.7258L11.7148 1.03638C12.0353 0.672247 12.4617 0.453503 12.914 0.421185C13.3663 0.388867 13.8134 0.545195 14.1715 0.860847L14.3464 1.03638L25.5131 13.7258L25.6676 13.9246L25.7681 14.0874L25.8686 14.2905L25.9002 14.3666L25.9505 14.5083L26.01 14.7367L26.0286 14.8488L26.0472 14.9757L26.0547 15.0963V15.3458L26.0454 15.4685L26.0286 15.5954L26.01 15.7053L25.9505 15.9338L25.9002 16.0755L25.7699 16.3546L25.649 16.545L25.5131 16.7163L25.3382 16.8918L25.1949 17.006L25.0162 17.1202L24.9492 17.1562L24.8245 17.2133L24.6235 17.2809L24.5249 17.3021L24.4132 17.3232L24.3071 17.3317L1.86396 17.3359Z"
                    fill="white"
                    fill-opacity="0.6"
                  />
                </svg>
              </span>
              {/* <img
                src={down}
                className={`md:w-[22px] w-[18px] h-3 cursor-pointer ${counter?.isZero() ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={decrement}
                alt=""
                style={{
                  pointerEvents: counter?.isZero() ? "none" : "auto",
                }}
              /> */}
              <span
                className={`w-full cursor-pointer ${counter?.isZero() ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={decrement}
                style={{
                  pointerEvents: counter?.isZero() ? "none" : "auto",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  className="md:min-w-[22px] lg:w-full sm:max-w-7 max-w-5 md:h-[18px]"
                  height="100%"
                  viewBox="0 0 27 17"
                  fill="none"
                >
                  <path
                    d="M24.1971 0.0258789C25.7827 0.0258789 26.6109 2.11117 25.6543 3.45837L25.5129 3.63602L14.3462 16.3254C14.0257 16.6896 13.5994 16.9083 13.1471 16.9406C12.6948 16.9729 12.2476 16.8166 11.8895 16.501L11.7146 16.3254L0.547932 3.63602L0.393459 3.43722L0.292959 3.27437L0.192459 3.07134L0.16082 2.9952L0.11057 2.8535L0.0510146 2.62509L0.0324031 2.513L0.0137924 2.38611L0.00634766 2.26556V2.016L0.0156534 1.89334L0.0324031 1.76644L0.0510146 1.65647L0.11057 1.42806L0.16082 1.28636L0.291098 1.00719L0.41207 0.816851L0.547932 0.645546L0.722876 0.470008L0.866182 0.355804L1.04485 0.241599L1.11185 0.205646L1.23654 0.148542L1.43754 0.0808664L1.53618 0.0597169L1.64785 0.0385674L1.75393 0.0301084L24.1971 0.0258789Z"
                    fill="white"
                    fill-opacity="0.6"
                  />
                </svg>
              </span>
            </div>
            <h2 className="gradient-texts select-none w-fit leading-[100%] font-bold md:text-[33px] text-[20px]" tabIndex={-1}>
              DoW
            </h2>
            <style>{`
                    .gradient-texts {
                      background: linear-gradient(90deg, #ff7e4b, #ff518c);
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                      userSelect: "none !important"
                    }
                  `}</style>
          </div>
        </div>
      </div>
      <div className="!mt-10 xl:!mt-14 flex flex-wrap sm:!flex-nowrap justify-center w-full items-center gap-3">
        <Button parentClassName="w-full" onClick={fundIssue} className="w-full" disabled={!enoughFund} level="SECONDARY" audience="DEVELOPER" size="MEDIUM">
          FUND THE ISSUE
        </Button>

        <Button
          parentClassName="w-full"
          audience="DEVELOPER"
          level="SECONDARY"
          className={` w-full ${enoughFund ? "opacity-50 pointer-events-none" : ""}`}
          size="MEDIUM"
        >
          GET MORE DoW
        </Button>

        {/* <Button audience="USER" level="PRIMARY" size="MEDIUM" asChild>
          <Link to="/fund-issues">USER PRIMARY</Link>
        </Button> */}
      </div>

      {error && <p className="!mt-5 text-center">{error instanceof ApiError ? error.toString() : error}</p>}
    </>
  );
}
