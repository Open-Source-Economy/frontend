import React from "react";

export interface BaseRef {
  validate: (showInputError: boolean) => boolean;
}

export interface BaseProps {
  label?: React.ReactNode;
  required?: boolean;
  renderError?: (errorMessage: string | undefined) => React.ReactNode;
  validator?: (value: string) => string | undefined;
}
