import { AuthenticateType } from "../../../views";

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  termsChecked: boolean;
}

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

export const NO_PASSPORT_ERROR = { minLength: true, hasNumber: true, hasSymbol: true, isEmpty: false };

export function validateForm(type: AuthenticateType, data: FormData): FormValidation {
  const isSignUp = type === AuthenticateType.SignUp;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): PasswordValidation | null => {
    const validation = {
      minLength: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*(),.?";:{}|<>_\-'\+\=\[\]~`\\]/.test(password),
      isEmpty: password.trim() === "",
    };

    return JSON.stringify(validation) === JSON.stringify(NO_PASSPORT_ERROR) ? null : validation;
  };

  const isEmailValid = validateEmail(data.email);
  const passwordValidation = validatePassword(data.password);

  if (isSignUp) {
    return {
      email: isEmailValid,
      password: passwordValidation,
      confirmPassword: data.password === data.confirmPassword,
      terms: data.termsChecked || false,
    };
  } else {
    return {
      email: isEmailValid,
      password: { ...NO_PASSPORT_ERROR, isEmpty: !!passwordValidation?.isEmpty },
      confirmPassword: true,
      terms: true,
    };
  }
}
