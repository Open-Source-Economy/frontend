import React from "react";

import { Token } from "../../../../model/Token";

export class UserBalance extends React.Component<{ token: Token; userBalances: Map<Token, number>; onMaxClick?: () => void }> {
  render() {
    return (
      <p className="text-white text-end mb-0 helvetica">
        Balance: {this.props.userBalances.get(this.props.token)?.toFixed(3)}
        {this.props.onMaxClick && (
          <>
            {" "}
            <button className="text__primary bg-transparent nofocus  border-0" onClick={this.props.onMaxClick}>
              <span className="fw-600"> Max</span>
            </button>
          </>
        )}
      </p>
    );
  }
}
