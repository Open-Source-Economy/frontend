import { AuthenticateType } from "../../../views";
import isEqual from "lodash/isEqual";

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  termsChecked: boolean;
}

export const VALID_FORM_VALIDATION: FormValidation = {
  email: true,
  password: null,
  confirmPassword: true,
  terms: true,
};

export interface FormValidation {
  email: boolean;
  password: PasswordValidation | null;
  confirmPassword: boolean;
  terms: boolean;
}

export interface PasswordValidation {
  minLength: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  isEmpty: boolean;
}

export const NO_PASSPORT_ERROR: PasswordValidation = { minLength: true, hasNumber: true, hasSymbol: true, isEmpty: false };

export function validateForm(type: AuthenticateType, data: FormData): FormValidation {
  const isSignUp = type === AuthenticateType.SignUp;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): PasswordValidation | null => {
    const validation: PasswordValidation = {
      minLength: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*(),.?";:{}|<>_\-'\+\=\[\]~`\\]/.test(password),
      isEmpty: password.trim() === "",
    };

    return isEqual(validation, NO_PASSPORT_ERROR) ? null : validation;
  };

  const isEmailValid = validateEmail(data.email);

  if (isSignUp) {
    return {
      email: isEmailValid,
      password: validatePassword(data.password),
      confirmPassword: data.password === data.confirmPassword,
      terms: data.termsChecked || false,
    };
  } else {
    return {
      email: isEmailValid,
      password: null,
      confirmPassword: true,
      terms: true,
    };
  }
}
