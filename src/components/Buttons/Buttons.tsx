import { Link } from "react-router-dom";

export const PrimaryButton = ({ title, className, path }: { title: string; className: string; path: string }) => {
  return (
    <button
      className={`gradient-btn-bg font-mich  h-[61px] flex justify-center items-center rounded-md min-w-[210px] hover:bg-transparent duration-300 relative after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0 after:hover:opacity-100 after:duration-300  ${className}`}
    >
      <Link to={path}>
        <span className="relative z-20">{title}</span>
      </Link>
    </button>
  );
};

export const SecondaryButton = ({ title, className, path }: { title: string; className: string; path: string }) => {
  return (
    <button
      className={`gradient-btn-bg font-mich  h-[55px] flex justify-center items-center rounded-md w-[190px]  hover:bg-transparent duration-300 relative after:absolute after:w-[97%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%]  after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md  after:hover:opacity-0 after:duration-300  ${className}`}
    >
      <Link to={path}>
        <span className="relative z-20">{title}</span>
      </Link>
    </button>
  );
};
export const DeveloperButton = ({ title, className, path }: { title: string; className: string; path: string }) => {
  return (
    <button
      className={`hover:!bg-primary-developer text-[13px]   flex justify-center items-center  font-mich h-[55px] rounded-md px-3 duration-300 border-[2px] !border-primary-developer bg-transparent   ${className}`}
    >
      <Link to={path}>
        <span className="relative z-20">{title}</span>
      </Link>
    </button>
  );
};
export const SecondaryDeveloperButton = ({ title, className, path }: { title: string; className: string; path: string }) => {
  return (
    <button
      className={`!bg-primary-developer text-[13px]   flex justify-center items-center  font-mich h-[55px] rounded-md px-3 duration-300 border-[2px] !border-primary-developer hover:!bg-transparent   ${className}`}
    >
      <Link to={path}>
        <span className="relative z-20">{title}</span>
      </Link>
    </button>
  );
};
export const UserButton = ({ title, className, path }: { title: string; className: string; path: string }) => {
  return (
    <button
      className={`hover:!bg-primary-user text-[13px]  border-[2px] flex justify-center items-center !border-primary-user font-mich h-[55px] rounded-md px-3   bg-transparent duration-300  ${className}`}
    >
      <Link to={path}>
        <span className="relative z-20">{title}</span>
      </Link>
    </button>
  );
};
export const InvestorButton = ({ title, className, path }: { title: string; className: string; path: string }) => {
  return (
    <button
      className={`hover:!bg-primary-stakeholder text-[13px]  border-[2px] flex justify-center items-center !border-primary-stakeholder font-mich h-[55px] rounded-md  px-3  bg-transparent duration-300  ${className}`}
    >
      <Link to={path}>
        <span className="relative z-20">{title}</span>
      </Link>
    </button>
  );
};

//Latest code

// import React from "react";
// import { Link, LinkProps } from "react-router-dom";

// export enum ButtonType {
//   PRIMARY = "primary",
//   SECONDARY = "secondary",
//   DEVELOPER = "developer",
//   USER = "user",
//   INVESTOR = "investor",
// }

// export enum ButtonSize {
//   SMALL = "small",
//   MEDIUM = "medium",
//   LARGE = "large",
// }

// interface ButtonProps {
//   title: string;
//   type: ButtonType;
//   size?: ButtonSize;
//   className?: string;
//   onClick?: () => void;
// }

// // Core Button Component
// export const Button: React.FC<ButtonProps> = ({ title, type, size = ButtonSize.MEDIUM, className = "", onClick }) => {
//   const baseStyles = "font-mich flex justify-center items-center rounded-md duration-300 relative";
//   let typeStyles = "";
//   let sizeStyles = "";

//   switch (type) {
//     case ButtonType.PRIMARY:
//       typeStyles =
//         "gradient-btn-bg hover:bg-transparent after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0 after:hover:opacity-100";
//       break;
//     case ButtonType.SECONDARY:
//       typeStyles =
//         "gradient-btn-bg hover:bg-transparent after:absolute after:w-[97%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0";
//       break;
//     case ButtonType.DEVELOPER:
//       typeStyles = "hover:!bg-primary-developer border-[2px] !border-primary-developer bg-transparent text-[13px]";
//       break;
//     case ButtonType.USER:
//       typeStyles = "hover:!bg-primary-user border-[2px] !border-primary-user bg-transparent text-[13px]";
//       break;
//     case ButtonType.INVESTOR:
//       typeStyles = "hover:!bg-primary-stakeholder border-[2px] !border-primary-stakeholder bg-transparent text-[13px]";
//       break;
//   }

//   switch (size) {
//     case ButtonSize.SMALL:
//       sizeStyles = "h-[40px] px-3";
//       break;
//     case ButtonSize.MEDIUM:
//       sizeStyles = "h-[55px] px-5";
//       break;
//     case ButtonSize.LARGE:
//       sizeStyles = "h-[61px] px-6 min-w-[210px]";
//       break;
//   }

//   return (
//     <button className={`${baseStyles} ${typeStyles} ${sizeStyles} ${className}`} onClick={onClick}>
//       <span className="relative z-20">{title}</span>
//     </button>
//   );
// };

// interface LinkButtonProps {
//   title: string;
//   path: string;
//   buttonProps: Omit<ButtonProps, "title">;
// }

// export const LinkButton: React.FC<LinkButtonProps> = ({ title, path, buttonProps }) => (
//   <Link to={path}>
//     <Button title={title} {...buttonProps} />
//   </Link>
// );

// interface ExternalLinkButtonProps {
//   title: string;
//   href: string;
//   buttonProps: Omit<ButtonProps, "title">;
// }

// export const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({ title, href, buttonProps }) => (
//   <a href={href} target="_blank" rel="noopener noreferrer">
//     <Button title={title} {...buttonProps} />
//   </a>
// );
