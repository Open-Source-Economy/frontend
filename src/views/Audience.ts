export enum Audience {
  ALL = "all",
  DEVELOPER = "developer",
  USER = "user",
  STAKEHOLDER = "stakeholder",
}

export const textColorVariants = {
  [Audience.ALL]: "text-primary-all",
  [Audience.DEVELOPER]: "text-primary-developer",
  [Audience.USER]: "text-primary-user",
  [Audience.STAKEHOLDER]: "text-primary-stakeholder",
};
