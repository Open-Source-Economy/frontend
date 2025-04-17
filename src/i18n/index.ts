import { Language } from "./Language";

export * from "./serviceTypeLabels";
export * from "./Language";
export * from "./servicePriorityLabels";

export type Label = { label: string };
export type I18nMap<K extends string, V> = Record<Language, Record<K, V>>;
