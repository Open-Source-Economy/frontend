export enum Audience {
  ALL = "ALL",
  DEVELOPER = "DEVELOPER",
  USER = "USER",
  STAKEHOLDER = "STAKEHOLDER",
}

export const textColorVariants = {
  [Audience.ALL]: "text-primary-all",
  [Audience.DEVELOPER]: "text-primary-developer",
  [Audience.USER]: "text-primary-user",
  [Audience.STAKEHOLDER]: "text-primary-stakeholder",
};
