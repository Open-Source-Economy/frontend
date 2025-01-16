export enum Audience {
  ALL = "ALL",
  DEVELOPER = "DEVELOPER",
  USER = "USER",
  STAKEHOLDER = "STAKEHOLDER",
}

export const textColorVariants: Record<Audience, string> = {
  [Audience.ALL]: "text-primary-all",
  [Audience.DEVELOPER]: "text-primary-developer",
  [Audience.USER]: "text-primary-user",
  [Audience.STAKEHOLDER]: "text-primary-stakeholder",
};

export const bgColorVariants: Record<Audience, string> = {
  [Audience.ALL]: "bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]",
  [Audience.DEVELOPER]: "bg-primary-user",
  [Audience.USER]: "bg-primary-developer",
  [Audience.STAKEHOLDER]: "bg-primary-stakeholder",
};
